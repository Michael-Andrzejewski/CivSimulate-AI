/**
 * Multiplayer round engine — the right half of the agreed flow:
 *   both players' goals + rolls -> ONE shared simulation -> the map AI
 *   allocates territory to both (appended to the session's deterministic
 *   map log) -> each kingdom summarized independently -> advance the timeline.
 *
 * Runs server-side so a single guarded call resolves the round for both
 * players; both clients poll the session and render the same result + map.
 */
import Anthropic from "@anthropic-ai/sdk";
import { getFullSession, patchSession, updatePlayer, type Session, type Player } from "./multiplayerStore";
import { buildQuestionsPrompt, buildSharedSimMessages, buildSoloSimMessages, buildSummaryPrompt, buildWarPrompt, worldSystem, SUMMARIZER_SYSTEM, type WarType } from "./mpPrompts";

const SIM_MODEL = "claude-sonnet-4-6"; // narrative + summaries
const QUESTION_MODEL = "claude-sonnet-4-6"; // strategy questions (Sonnet 4.6 across the board)
const MAP_MODEL = "claude-sonnet-4-6"; // geographic placement/allocation

// Distinct territory colors per slot (1..8).
const SLOT_COLORS: Record<number, string> = {
  1: "#d94b4b", // red
  2: "#3b82c4", // blue
  3: "#3fae5a", // green
  4: "#d98b2b", // orange
  5: "#9b59c6", // purple
  6: "#13b3b3", // teal
  7: "#d64f9b", // pink
  8: "#b5a01f", // gold
};

let _client: Anthropic | null = null;
function client(): Anthropic {
  if (!_client) {
    if (!process.env.ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY is required");
    _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return _client;
}

const placeTool: Anthropic.Tool = {
  name: "place_kingdom",
  description: "Place a civilization on the real-world map at its true geographic location.",
  input_schema: {
    type: "object",
    properties: {
      capital: { type: "object", properties: { name: { type: "string" }, lat: { type: "number" }, lon: { type: "number" } }, required: ["name", "lat", "lon"] },
      cities: { type: "array", items: { type: "object", properties: { name: { type: "string" }, lat: { type: "number" }, lon: { type: "number" } }, required: ["name", "lat", "lon"] } },
      approxAreaKm2: { type: "number" },
    },
    required: ["capital", "approxAreaKm2"],
  },
};

const allocateTool: Anthropic.Tool = {
  name: "allocate_territory",
  description: "Update each civilization's territory on the shared map based on the simulation outcome.",
  input_schema: {
    type: "object",
    properties: {
      operations: {
        type: "array",
        items: {
          type: "object",
          properties: {
            player: { type: "number", enum: [1, 2, 3, 4, 5, 6, 7, 8], description: "which player (slot) this op applies to" },
            type: { type: "string", enum: ["expand", "contract", "found_city"] },
            toward: { type: "object", properties: { lat: { type: "number" }, lon: { type: "number" } } },
            direction: { type: "string", enum: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] },
            areaKm2: { type: "number" },
            name: { type: "string" },
            lat: { type: "number" },
            lon: { type: "number" },
          },
          required: ["player", "type"],
        },
      },
    },
    required: ["operations"],
  },
};

const questionsTool: Anthropic.Tool = {
  name: "ask_questions",
  description: "Return short, pointed questions that pin down HOW this civilization pursues its stated goals. Ask only as many as the goals warrant — one question for a simple goal, more for ambitious ones (per the prompt's guidance).",
  input_schema: {
    type: "object",
    properties: {
      questions: { type: "array", items: { type: "string" }, minItems: 1, maxItems: 4 },
    },
    required: ["questions"],
  },
};

function toolInput(msg: Anthropic.Message, name: string): any {
  const b = msg.content.find((x) => x.type === "tool_use" && x.name === name);
  return b && b.type === "tool_use" ? b.input : null;
}

async function text(model: string, prompt: string, maxTokens = 1500, system?: string): Promise<string> {
  const r = await client().messages.create({
    model,
    max_tokens: maxTokens,
    ...(system ? { system } : {}),
    messages: [{ role: "user", content: prompt }],
  });
  const t = r.content.find((b) => b.type === "text");
  return t && t.type === "text" ? t.text : "";
}

/**
 * Stream a long text generation, persisting the accumulating text to the
 * session's `lastSimulation` on a throttle so BOTH polling clients can read it
 * as it arrives. The flush is single-flight (no overlapping writes, so partial
 * text never goes backwards) and the final text is always persisted.
 */
async function streamIntoSession(sessionId: string, model: string, prompt: string, maxTokens: number, system?: string): Promise<string> {
  let latest = "";
  let lastFlush = 0;
  let flushing = false;
  let dirty = false;
  const flush = async (): Promise<void> => {
    if (flushing) {
      dirty = true;
      return;
    }
    flushing = true;
    try {
      await patchSession(sessionId, { lastSimulation: latest });
    } catch {
      /* best effort — the next flush (or the final one) will catch up */
    } finally {
      flushing = false;
      if (dirty) {
        dirty = false;
        await flush();
      }
    }
  };

  const stream = client().messages.stream({
    model,
    max_tokens: maxTokens,
    ...(system ? { system } : {}),
    messages: [{ role: "user", content: prompt }],
  });
  stream.on("text", (delta: string) => {
    latest += delta;
    const now = Date.now();
    if (now - lastFlush >= 350) {
      lastFlush = now;
      void flush();
    }
  });
  await stream.finalMessage();
  await flush(); // guarantee the complete text is persisted
  return latest;
}

function formatYear(y: number): string {
  return y < 0 ? `${Math.abs(y)} BCE` : `${y} CE`;
}

const running = new Set<string>();
const generating = new Set<string>();

function parseArr(s: string | null | undefined): string[] {
  try {
    const v = JSON.parse(s || "[]");
    return Array.isArray(v) ? v.map((x) => String(x)) : [];
  } catch {
    return [];
  }
}

/** Place both players on the map and open the first goals phase. */
export async function startGame(sessionId: string): Promise<void> {
  const full = await getFullSession(sessionId);
  if (!full) throw Object.assign(new Error("Session not found"), { status: 404 });
  if (full.players.length < 2) throw Object.assign(new Error("Need two players to start"), { status: 400 });

  const yearText = formatYear(full.session.currentYear);
  const log: any[] = [];
  for (const p of full.players) {
    const desc = `Civilization "${p.kingdomName || "Kingdom"}" led by ${p.playerName || "a leader"}, based in ${p.location || "an unknown land"}, in ${yearText}. A young civilization just beginning.`;
    const resp = await client().messages.create({
      model: MAP_MODEL,
      max_tokens: 800,
      tools: [placeTool],
      tool_choice: { type: "tool", name: "place_kingdom" },
      messages: [{ role: "user", content: `Place this civilization on the real-world map at its true location. Use a small starting area for a young civilization.\n\n${desc}` }],
    });
    const input = toolInput(resp, "place_kingdom");
    if (input?.capital) {
      log.push({
        op: "place",
        player: p.slot,
        color: SLOT_COLORS[p.slot] || "#888",
        name: p.kingdomName || `Player ${p.slot}`,
        capital: input.capital,
        cities: input.cities || [],
        areaKm2: Math.min(input.approxAreaKm2 || 50000, 200000),
      });
    }
  }

  // A small positive seed (0 .. 1e9-1) so it always fits Postgres `integer`
  // (max ~2.1e9). It only needs to be shared between the two clients so their
  // organic territory spread renders identically — the map terrain itself is
  // fixed (world-terrain.bin); the seed just syncs the randomized growth.
  const seed = Math.floor(Math.random() * 1_000_000_000);
  // Reset each player for the first goals phase. In the lobby, `ready` means
  // "ready to start"; in the goals/questions phases it means "submitted". Clear
  // it (and any stale goals/Q&A) so the goals phase doesn't misread the lobby's
  // ready flags as already-submitted goals and stall.
  for (const p of full.players) {
    await updatePlayer(p.id, { ready: false, goals: "", questions: "[]", answers: "[]" });
  }
  await patchSession(sessionId, { mapLog: JSON.stringify(log), mapSeed: seed, phase: "goals", status: "started" });
}

/**
 * Generate strategy questions for ONE player as soon as they submit their goals
 * — independently of the other player, so no one waits at the goals step. Based
 * only on that player's own goals/state (the opponent is not revealed). Guarded
 * (per player) and idempotent (skips if questions already exist, so answers are
 * never clobbered).
 */
export async function generateQuestionsForPlayer(sessionId: string, playerId: string): Promise<void> {
  const key = `${sessionId}:${playerId}`;
  if (generating.has(key)) return;
  const full = await getFullSession(sessionId);
  if (!full) return;
  const p = full.players.find((x) => x.id === playerId);
  if (!p || !(p.goals || "").trim()) return;
  if (p.goalQuestions === "none") return; // this player opted out of questions
  if (parseArr(p.questions).length > 0) return; // already generated

  generating.add(key);
  try {
    const prompt = buildQuestionsPrompt(p, full.session);
    let questions: string[] = [];
    try {
      const resp = await client().messages.create({
        model: QUESTION_MODEL,
        max_tokens: 500,
        // Give the question-asker the full world rules (incl. the worked example)
        // as its system prompt, so MP questions are calibrated like singleplayer's.
        system: worldSystem(full.session),
        tools: [questionsTool],
        tool_choice: { type: "tool", name: "ask_questions" },
        messages: [{ role: "user", content: prompt }],
      });
      questions = (toolInput(resp, "ask_questions")?.questions || []).map((q: any) => String(q)).filter(Boolean);
    } catch {
      questions = [];
    }
    if (questions.length === 0) {
      questions = [
        `How does ${p.kingdomName || "your civilization"} prioritize these goals if it cannot pursue them all at once?`,
        `Who do you cooperate with, and who do you treat as a rival, to achieve them?`,
      ];
    }
    await updatePlayer(p.id, { questions: JSON.stringify(questions), answers: "[]" });
  } finally {
    generating.delete(key);
  }
}

/** True when ALL players (>=2) have answered everything and the shared sim can run. */
export async function bothPlayersReady(sessionId: string): Promise<boolean> {
  const full = await getFullSession(sessionId);
  return !!full && full.session.phase === "goals" && full.players.length >= 2 && full.players.every((p) => p.ready && (p.goals || "").trim());
}

function tenDigitRoll(): string {
  let s = "";
  for (let i = 0; i < 10; i++) s += Math.floor(Math.random() * 10);
  return s;
}

function capitalOf(log: any[], slot: number): { lat: number; lon: number } | null {
  const place = log.find((o) => o.op === "place" && o.player === slot);
  return place?.capital ? { lat: place.capital.lat, lon: place.capital.lon } : null;
}

/** Resolve the round: shared simulation -> map allocation -> summaries -> advance. */
export async function runRound(sessionId: string): Promise<void> {
  if (running.has(sessionId)) throw Object.assign(new Error("A round is already running"), { status: 409 });
  const full = await getFullSession(sessionId);
  if (!full) throw Object.assign(new Error("Session not found"), { status: 404 });
  if (full.session.phase !== "goals") throw Object.assign(new Error("Round already running or finished"), { status: 400 });
  if (full.players.length < 2 || !full.players.every((p) => p.ready && (p.goals || "").trim())) {
    throw Object.assign(new Error("Both players must answer their questions first"), { status: 400 });
  }

  running.add(sessionId);
  try {
    // Clear the previous turn's text so the simulating screen starts empty and fills in.
    await patchSession(sessionId, { phase: "simulating", lastSimulation: "" });
    const { session } = full;

    // Per-civilization random number (the evaluation mechanic uses the first
    // digit vs the pessimistic %). If the host fixed the luck digit (1-9, e.g.
    // all 5's), use it for everyone so outcomes ride on answer quality alone;
    // otherwise roll randomly per civ.
    const fixed = full.session.randomDigit;
    const rolls: Record<string, string> = {};
    for (const p of full.players) rolls[p.id] = fixed >= 1 && fixed <= 9 ? String(fixed).repeat(10) : tenDigitRoll();

    // Reuse the singleplayer rule set: host's (or generated default) world rules
    // as the system prompt; per-civ blocks with goals, free-form answers,
    // settings and random numbers as the user prompt.
    const { system, user } = buildSharedSimMessages(session, full.players, rolls);

    // Stream the shared simulation so both clients can read it as it generates.
    // max_tokens is only a CAP (we bill/stream only what's generated), so set it
    // well above any realistic two-civ evaluation + both narratives + status
    // blocks, to guarantee the turn never truncates mid-narrative.
    const sharedSim = await streamIntoSession(sessionId, SIM_MODEL, user, 32000, system);

    // The map allocation and the per-player summaries all depend only on
    // the shared simulation, not on each other — run them concurrently.
    const mapLogNow = JSON.parse(session.mapLog || "[]");
    const centers = full.players
      .map((p) => {
        const cap = capitalOf(mapLogNow, p.slot);
        return `Player ${p.slot} "${p.kingdomName || `Civilization ${p.slot}`}" centered near ${cap ? `(${cap.lat}, ${cap.lon})` : p.location || "its homeland"}`;
      })
      .join("; ");
    const allocPrompt = `Based on the simulation below, update each civilization's territory on the shared world map (real coordinates). ${centers}. Emit expand/found_city/contract operations per player reflecting their growth, new settlements, or losses this turn. If civilizations fought and one prevailed, expand the victor toward the loser and contract the loser. Keep changes proportional to ${session.turnIncrement} years.\n\nSIMULATION:\n${sharedSim}`;
    // Resilient: a transient API error on the map or a summary must NOT lose the
    // whole turn (the shared simulation already streamed). Each call catches and
    // degrades — no map change / keep the previous summary — rather than throwing.
    const allocP = client()
      .messages.create({
        model: MAP_MODEL,
        max_tokens: 1200,
        tools: [allocateTool],
        tool_choice: { type: "tool", name: "allocate_territory" },
        messages: [{ role: "user", content: allocPrompt }],
      })
      .then((r) => toolInput(r, "allocate_territory")?.operations || [])
      .catch((e) => {
        console.error("[multiplayer] territory allocation failed:", e?.stack || String(e));
        return [] as any[];
      });
    const summaryPs = full.players.map((p) =>
      text(SIM_MODEL, buildSummaryPrompt(p, session, sharedSim), 8000, SUMMARIZER_SYSTEM).catch((e) => {
        console.error("[multiplayer] summary failed, keeping previous:", e?.stack || String(e));
        return "";
      }),
    );
    const [ops, ...summaries] = await Promise.all([allocP, ...summaryPs]);

    const log = JSON.parse(session.mapLog || "[]");
    for (const op of ops) log.push(op);

    // Persist each player's new summary (parallel to full.players order)
    for (let i = 0; i < full.players.length; i++) {
      const newSummary = summaries[i];
      if (newSummary) await updatePlayer(full.players[i].id, { summary: newSummary, ready: false });
    }

    // Append this turn to the full transcript (goals/questions/answers/sim per civ).
    const history = JSON.parse(session.history || "[]");
    history.push({
      turn: session.turnNumber + 1,
      type: "turn",
      year: session.currentYear,
      yearLabel: formatYear(session.currentYear),
      yearAfter: session.currentYear + session.turnIncrement, // session state AFTER this entry (for revert)
      turnAfter: session.turnNumber + 1,
      mapOpsAdded: ops.length, // how many map ops this turn added (for re-run rewind)
      rolls: full.players.map((p) => ({ slot: p.slot, roll: rolls[p.id] })),
      simulation: sharedSim,
      players: full.players.map((p, i) => ({
        slot: p.slot,
        kingdom: p.kingdomName || `Civilization ${p.slot}`,
        leader: p.playerName || "",
        goals: p.goals || "",
        questions: parseArr(p.questions),
        answer: p.answers && p.answers !== "[]" ? String(p.answers) : "",
        summary: summaries[i] || p.summary || "",
      })),
    });

    await patchSession(sessionId, {
      mapLog: JSON.stringify(log),
      lastSimulation: sharedSim,
      history: JSON.stringify(history),
      currentYear: session.currentYear + session.turnIncrement,
      turnNumber: session.turnNumber + 1,
      phase: "results",
    });
  } catch (e) {
    // Roll back to the collecting (goals) phase; players stay ready with their
    // answers preserved, so the simulation can be retried.
    await patchSession(sessionId, { phase: "goals" }).catch(() => {});
    throw e;
  } finally {
    running.delete(sessionId);
  }
}

/**
 * Re-run the just-completed turn: rewind its effects (pop the history entry,
 * restore each civ's pre-turn summary, undo the map ops, step the year/turn
 * back) while KEEPING the same goals/questions/answers, then resolve the round
 * again. Use when a turn came out wrong (e.g. truncated) — same inputs, fresh
 * simulation.
 */
export async function rerunRound(sessionId: string): Promise<void> {
  const full = await getFullSession(sessionId);
  if (!full) throw Object.assign(new Error("Session not found"), { status: 404 });
  if (full.session.phase !== "results") throw Object.assign(new Error("Can only re-run a completed turn"), { status: 400 });
  const history = JSON.parse(full.session.history || "[]");
  if (!history.length) throw Object.assign(new Error("Nothing to re-run"), { status: 400 });

  const last = history.pop();
  const prev = history[history.length - 1]; // the turn before (now the latest), or undefined

  // Restore each civ to its PRE-turn summary; keep goals/questions/answers; mark
  // ready so the round can resolve again.
  for (const p of full.players) {
    const prevSummary = prev ? prev.players?.find((pp: any) => pp.slot === p.slot)?.summary || "" : "";
    await updatePlayer(p.id, { summary: prevSummary, ready: true });
  }

  // Undo the map ops this turn appended (they were pushed onto the end).
  const log = JSON.parse(full.session.mapLog || "[]");
  const removed = last.mapOpsAdded || 0;
  if (removed > 0) log.splice(log.length - removed, removed);

  await patchSession(sessionId, {
    mapLog: JSON.stringify(log),
    history: JSON.stringify(history),
    currentYear: full.session.currentYear - full.session.turnIncrement,
    turnNumber: Math.max(0, full.session.turnNumber - 1),
    lastSimulation: prev ? prev.simulation : "",
    phase: "goals",
  });

  await runRound(sessionId);
}

/**
 * Host grants one civilization a bonus "time bubble" round: clear that player's
 * goals/questions/answers and mark the session as solo for them, reopening the
 * goals phase so only they act. The other civilization is untouched.
 */
export async function grantExtraRound(sessionId: string, playerId: string): Promise<void> {
  const full = await getFullSession(sessionId);
  if (!full) throw Object.assign(new Error("Session not found"), { status: 404 });
  if (!full.players.find((p) => p.id === playerId)) throw Object.assign(new Error("Player not in session"), { status: 400 });
  await updatePlayer(playerId, { goals: "", questions: "[]", answers: "[]", ready: false });
  await patchSession(sessionId, { soloPlayerId: playerId, phase: "goals" });
}

/**
 * Resolve a solo "time bubble" round for one civilization: simulate only that
 * civ's bonus development, update its memory + map, record a history entry, and
 * clear the solo flag. Does NOT advance the year/turn (the bubble is free time).
 */
export async function runSoloRound(sessionId: string, playerId: string): Promise<void> {
  if (running.has(sessionId)) throw Object.assign(new Error("A round is already running"), { status: 409 });
  const full = await getFullSession(sessionId);
  if (!full) throw Object.assign(new Error("Session not found"), { status: 404 });
  if (full.session.soloPlayerId !== playerId) throw Object.assign(new Error("No extra round in progress for this player"), { status: 400 });
  const player = full.players.find((p) => p.id === playerId);
  if (!player || !player.ready || !(player.goals || "").trim()) throw Object.assign(new Error("Player must submit goals and answers first"), { status: 400 });

  running.add(sessionId);
  try {
    await patchSession(sessionId, { phase: "simulating", lastSimulation: "" });
    const { session } = full;
    const fixed = session.randomDigit;
    const roll = fixed >= 1 && fixed <= 9 ? String(fixed).repeat(10) : tenDigitRoll();

    const { system, user } = buildSoloSimMessages(session, player, roll);
    const narrative = await streamIntoSession(sessionId, SIM_MODEL, user, 32000, system);

    const cap = capitalOf(JSON.parse(session.mapLog || "[]"), player.slot);
    const allocPrompt = `Based on the bonus development below, update ONLY civilization "${player.kingdomName}" (Player ${player.slot}, centered near ${cap ? `(${cap.lat}, ${cap.lon})` : player.location}) on the shared world map. Emit expand/found_city operations for player ${player.slot} reflecting its growth and new settlements. Do not change the other civilization.\n\nDEVELOPMENT:\n${narrative}`;
    const allocP = client()
      .messages.create({ model: MAP_MODEL, max_tokens: 1200, tools: [allocateTool], tool_choice: { type: "tool", name: "allocate_territory" }, messages: [{ role: "user", content: allocPrompt }] })
      .then((r) => toolInput(r, "allocate_territory")?.operations || [])
      .catch((e) => { console.error("[multiplayer] solo allocation failed:", e?.stack || String(e)); return [] as any[]; });
    const newSummaryP = text(SIM_MODEL, buildSummaryPrompt(player, session, narrative), 8000, SUMMARIZER_SYSTEM).catch((e) => {
      console.error("[multiplayer] solo summary failed:", e?.stack || String(e));
      return "";
    });
    const [ops, newSummary] = await Promise.all([allocP, newSummaryP]);

    const log = JSON.parse(session.mapLog || "[]");
    for (const op of ops) if (op.player === player.slot) log.push(op); // safety: only this civ's ops
    if (newSummary) await updatePlayer(player.id, { summary: newSummary });

    const history = JSON.parse(session.history || "[]");
    history.push({
      turn: session.turnNumber,
      type: "extra",
      year: session.currentYear,
      yearLabel: `${formatYear(session.currentYear)} — ${player.kingdomName || `Civilization ${player.slot}`} bonus round`,
      yearAfter: session.currentYear,
      turnAfter: session.turnNumber,
      mapOpsAdded: ops.filter((o: any) => o.player === player.slot).length,
      simulation: narrative,
      players: [{
        slot: player.slot,
        kingdom: player.kingdomName || `Civilization ${player.slot}`,
        leader: player.playerName || "",
        goals: player.goals || "",
        questions: parseArr(player.questions),
        answer: player.answers && player.answers !== "[]" ? String(player.answers) : "",
        summary: newSummary || player.summary || "",
      }],
    });

    await updatePlayer(player.id, { ready: false });
    await patchSession(sessionId, { mapLog: JSON.stringify(log), lastSimulation: narrative, history: JSON.stringify(history), soloPlayerId: null, phase: "results" });
  } catch (e) {
    // Roll back to the goals phase of the bonus round so it can be retried.
    await patchSession(sessionId, { phase: "goals" }).catch(() => {});
    throw e;
  } finally {
    running.delete(sessionId);
  }
}

/**
 * Host-triggered war among the civilizations, using the singleplayer battle
 * prompts. Free-for-all by default; the host may supply a scenario describing
 * the conflict and any alliances. Streams the war narrative, then updates each
 * civ's memory and the map from the outcome. It's a between-turns EVENT — it
 * does NOT advance the year/turn; appends a history entry (type "war").
 */
export async function simulateWar(sessionId: string, battleType: WarType, scenario?: string): Promise<void> {
  if (running.has(sessionId)) throw Object.assign(new Error("A round is already running"), { status: 409 });
  const full = await getFullSession(sessionId);
  if (!full) throw Object.assign(new Error("Session not found"), { status: 404 });
  if (full.players.length < 2) throw Object.assign(new Error("Need two civilizations for a war"), { status: 400 });

  running.add(sessionId);
  try {
    await patchSession(sessionId, { phase: "simulating", lastSimulation: "" });
    const { session } = full;

    // Big budget on purpose — a war is a centerpiece the players read in full; it
    // streams live to both clients, so length isn't a UX problem.
    const narrative = await streamIntoSession(sessionId, SIM_MODEL, buildWarPrompt(full.players, battleType, session, scenario), 32000);

    // Preview mode: show the war but commit NOTHING — no memory, map, or history
    // change. Players read the "what-if"; the game state is left exactly as it was.
    if (!session.addToCanon) {
      await patchSession(sessionId, { phase: "results", lastSimulation: `**(Preview — this war was NOT added to canon)**\n\n${narrative}` });
      return;
    }

    const mapLogNow = JSON.parse(session.mapLog || "[]");
    const centers = full.players
      .map((p) => {
        const cap = capitalOf(mapLogNow, p.slot);
        return `Player ${p.slot} "${p.kingdomName || `Civilization ${p.slot}`}" centered near ${cap ? `(${cap.lat}, ${cap.lon})` : p.location || "its homeland"}`;
      })
      .join("; ");
    const allocPrompt = `Based on the war below, update each civilization's territory on the shared world map (real coordinates). ${centers}. Emit expand/contract/found_city operations reflecting conquests and losses — expand victors toward the losers and contract the losers; in an extermination war a loser may be largely erased.\n\nWAR:\n${narrative}`;
    const allocP = client()
      .messages.create({ model: MAP_MODEL, max_tokens: 1200, tools: [allocateTool], tool_choice: { type: "tool", name: "allocate_territory" }, messages: [{ role: "user", content: allocPrompt }] })
      .then((r) => toolInput(r, "allocate_territory")?.operations || [])
      .catch((e) => { console.error("[multiplayer] war allocation failed:", e?.stack || String(e)); return [] as any[]; });
    const summaryPs = full.players.map((p) =>
      text(SIM_MODEL, buildSummaryPrompt(p, session, narrative), 8000, SUMMARIZER_SYSTEM).catch((e) => { console.error("[multiplayer] war summary failed:", e?.stack || String(e)); return ""; }),
    );
    const [ops, ...summaries] = await Promise.all([allocP, ...summaryPs]);

    const log = JSON.parse(session.mapLog || "[]");
    for (const op of ops) log.push(op);
    for (let i = 0; i < full.players.length; i++) {
      if (summaries[i]) await updatePlayer(full.players[i].id, { summary: summaries[i] });
    }

    const history = JSON.parse(session.history || "[]");
    history.push({
      turn: session.turnNumber,
      type: "war",
      battleType,
      year: session.currentYear,
      yearLabel: `${formatYear(session.currentYear)} — ${battleType}`,
      yearAfter: session.currentYear, // war does not advance the clock
      turnAfter: session.turnNumber,
      mapOpsAdded: ops.length,
      simulation: narrative,
      players: full.players.map((p, i) => ({
        slot: p.slot,
        kingdom: p.kingdomName || `Civilization ${p.slot}`,
        leader: p.playerName || "",
        goals: `[${battleType}]`,
        questions: [],
        answer: "",
        summary: summaries[i] || p.summary || "",
      })),
    });

    await patchSession(sessionId, { mapLog: JSON.stringify(log), lastSimulation: narrative, history: JSON.stringify(history), phase: "results" });
  } catch (e) {
    await patchSession(sessionId, { phase: "results" }).catch(() => {});
    throw e;
  } finally {
    running.delete(sessionId);
  }
}

/**
 * Revert the whole game to the state at the end of a past turn: restore each
 * civ's memory (summary) to that turn's record, roll the timeline + map back,
 * and drop every later turn from the history. Lands in the "results" view of the
 * reverted turn so the host can continue from there. Host-confirmed in the UI.
 */
export async function revertToIndex(sessionId: string, index: number): Promise<void> {
  const full = await getFullSession(sessionId);
  if (!full) throw Object.assign(new Error("Session not found"), { status: 404 });
  const history: any[] = JSON.parse(full.session.history || "[]");
  if (index < 0 || index >= history.length) throw Object.assign(new Error("That entry isn't in the history"), { status: 400 });

  const target = history[index];
  const dropped = history.slice(index + 1); // entries after the target — undo these
  const kept = history.slice(0, index + 1);

  // Restore each civ's memory to the target entry's recorded summary.
  for (const p of full.players) {
    const summary = target.players?.find((pp: any) => pp.slot === p.slot)?.summary || "";
    await updatePlayer(p.id, { summary, goals: "", questions: "[]", answers: "[]", ready: false });
  }

  // Undo the map ops added by every dropped entry (all appended at the end).
  const removed = dropped.reduce((n: number, h: any) => n + (h.mapOpsAdded || 0), 0);
  const log = JSON.parse(full.session.mapLog || "[]");
  if (removed > 0) log.splice(log.length - removed, removed);

  await patchSession(sessionId, {
    mapLog: JSON.stringify(log),
    history: JSON.stringify(kept),
    currentYear: target.yearAfter ?? target.year + full.session.turnIncrement,
    turnNumber: target.turnAfter ?? target.turn,
    lastSimulation: target.simulation || "",
    phase: "results",
  });
}

/** Clear goals/questions/answers and reopen the goals phase for the next round. */
export async function nextRound(sessionId: string): Promise<void> {
  const full = await getFullSession(sessionId);
  if (!full) throw Object.assign(new Error("Session not found"), { status: 404 });
  for (const p of full.players) await updatePlayer(p.id, { goals: "", questions: "[]", answers: "[]", ready: false });
  await patchSession(sessionId, { phase: "goals" });
}
