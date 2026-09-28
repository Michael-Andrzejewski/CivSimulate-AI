/**
 * Diversified Utopia mode: a month-by-month loop with three Opus 5.5 roles.
 *   Agent     plans the month's actions at the start of the month (a new, more
 *             capable generation each month, which inherits only its memory file).
 *   Simulator resolves the actions realistically against the rubric, using
 *             random rolls, and maintains the world state.
 *   Judge     a fresh model each round that grades the simulator's realism.
 *
 * Everything is written to runs/<runId>/ and a run can be resumed.
 */
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { callModelWithRetry, OPUS_5_5 } from "./llm";
import type { LlmBackend } from "../llm/backend";
import * as P from "./prompts";

export interface RunConfig {
  runId: string;
  backend: LlmBackend;
  agentModel: string;
  simulatorModel: string;
  judgeModel: string;
  months: number;
  startYear: number;
  startMonth: number; // 1-12
  effort?: string;
}

interface MonthRecord {
  index: number;
  label: string;
  actions: string;
  rolls: string[];
  events: string;
  judgeVerdict: string;
  judgeScore: string;
}

interface RunState {
  config: RunConfig;
  completedMonths: number;
  worldState: string;
  scorecard: string;
  memory: string;
  lastJudgeFeedback: string | null;
  history: MonthRecord[];
}

const ROOT = process.cwd();
const SCENARIO_DIR = path.join(ROOT, "scenarios", "diversified-utopia");
export const RUNS_DIR = path.join(ROOT, "runs");
// Design notes accumulate across every run so the game designer sees them all.
// Only runs whose participants consented to publication add their notes here.
const SHARED_NOTES = path.join(SCENARIO_DIR, "agent_game_notes.md");

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function monthInfo(cfg: RunConfig, index: number) {
  const zero = cfg.startMonth - 1 + (index - 1);
  const year = cfg.startYear + Math.floor(zero / 12);
  const m = zero % 12;
  return { label: `${MONTHS[m]} ${year}`, slug: `${year}-${String(m + 1).padStart(2, "0")}` };
}

function readDoc(name: string): string {
  const p = path.join(SCENARIO_DIR, name);
  if (!fs.existsSync(p)) throw new Error(`Missing scenario file: ${p}`);
  return fs.readFileSync(p, "utf-8").trim();
}

export function loadDocs(): P.ScenarioDocs {
  return {
    scenario: readDoc("scenario.md"),
    rubric: readDoc("rubric.md"),
    utopia: readDoc("diversified_utopia.md"),
    briefing: readDoc("summer_2026_events.md"),
  };
}

/** Last occurrence of <tag>...</tag>, or "" if absent. */
export function tag(text: string, name: string): string {
  const re = new RegExp(`<${name}>([\\s\\S]*?)</${name}>`, "g");
  let m: RegExpExecArray | null;
  let last = "";
  while ((m = re.exec(text))) last = m[1];
  return last.trim();
}

export function splitActions(actions: string): string[] {
  const items: string[] = [];
  for (const line of actions.split("\n")) {
    const m = line.match(/^\s*(\d+)[.)]\s*(.*)$/);
    if (m) items.push(m[2].trim());
    else if (items.length && line.trim()) items[items.length - 1] += " " + line.trim();
  }
  return items.length ? items : [actions.trim()];
}

function roll(): string {
  return String(crypto.randomInt(0, 100)).padStart(2, "0");
}

function formatMonthTxt(args: {
  label: string;
  index: number;
  actionList: string[];
  strategy: string;
  events: string;
  rolls: string;
  capability: string;
  scorecard: string;
  verdict: string;
  score: string;
  reasoning: string;
  issues: string;
}): string {
  const verdictPhrase = args.verdict.toLowerCase();
  return [
    DISCLAIMER,
    "",
    `=== Month ${args.index}: ${args.label} (Claude generation ${args.index}) ===`,
    "",
    "[Agent]",
    "I will do these actions:",
    ...args.actionList.map((a, i) => `-${i + 1} ${a}`),
    "",
    `Strategy: ${args.strategy}`,
    "",
    "[Simulator]",
    args.events,
    "",
    "Action rolls:",
    args.rolls,
    "",
    `Next generation: ${args.capability}`,
    "",
    "Scorecard:",
    args.scorecard,
    "",
    "[Judge]",
    `Simulator was ${verdictPhrase} (${args.score}/10). ${args.reasoning}`,
    "",
    "Issues flagged:",
    args.issues,
    "",
  ].join("\n");
}

function write(runDir: string, name: string, content: string) {
  fs.mkdirSync(path.dirname(path.join(runDir, name)), { recursive: true });
  fs.writeFileSync(path.join(runDir, name), content.endsWith("\n") ? content : content + "\n", "utf-8");
}

function saveState(runDir: string, s: RunState) {
  write(runDir, "state.json", JSON.stringify(s, null, 2));
}

export async function runGame(cfg: RunConfig, log: (msg: string) => void = console.log): Promise<string> {
  const docs = loadDocs();
  const runDir = path.join(RUNS_DIR, cfg.runId);
  fs.mkdirSync(runDir, { recursive: true });
  // Runs stay out of git until every participant consents to publication.
  markPrivate(runDir);
  const statePath = path.join(runDir, "state.json");

  let state: RunState;
  if (fs.existsSync(statePath)) {
    state = JSON.parse(fs.readFileSync(statePath, "utf-8"));
    state.config.months = cfg.months; // allow extending a run
    log(`Resuming ${cfg.runId} after month ${state.completedMonths}`);
  } else {
    state = { config: cfg, completedMonths: 0, worldState: "", scorecard: "", memory: "", lastJudgeFeedback: null, history: [] };
  }
  const c = state.config;
  const call = (role: string, model: string, system: string, prompt: string) =>
    callModelWithRetry({ backend: c.backend, model, system, prompt, effort: c.effort }, role);

  const simSystem = P.simulatorSystem(docs);
  const agentSystem = P.agentSystem(docs);
  const judgeSystem = P.judgeSystem(docs);

  // Month 0: simulator establishes the baseline world.
  if (!state.worldState) {
    log("[setup] Simulator writing baseline world state for December 2026...");
    const out = await call("setup", c.simulatorModel, simSystem, P.simulatorSetupPrompt());
    write(runDir, "raw/month_00_setup_simulator.md", out);
    state.worldState = tag(out, "world_state") || out;
    state.scorecard = tag(out, "scorecard");
    write(runDir, "world_state_00_baseline.md", `${state.worldState}\n\n## Scorecard\n${state.scorecard}`);
    saveState(runDir, state);
  }

  for (let i = state.completedMonths + 1; i <= c.months; i++) {
    const { label, slug } = monthInfo(c, i);
    const prefix = `month_${String(i).padStart(2, "0")}_${slug}`;
    const worldBefore = state.worldState;

    const last = state.history[state.history.length - 1];
    const lastMonthLog = last
      ? `${last.label}: your predecessor committed these actions:\n${last.actions}\n\nWhat happened:\n${last.events}`
      : null;
    const notesPath = path.join(runDir, "agent_game_notes.md");
    const gameNotes = fs.existsSync(notesPath) ? fs.readFileSync(notesPath, "utf-8") : "";

    // 1. Agent
    log(`[${label}] Agent (generation ${i}) planning...`);
    const agentOut = await call(
      "agent",
      c.agentModel,
      agentSystem,
      P.agentPrompt({
        monthIndex: i,
        monthLabel: label,
        totalMonths: c.months,
        worldState: `${state.worldState}\n\n## Scorecard\n${state.scorecard}`,
        lastMonthLog,
        memory: state.memory,
        gameNotes,
      }),
    );
    write(runDir, `raw/${prefix}_agent.md`, agentOut);
    const actionsBlock = tag(agentOut, "actions") || agentOut;
    const actionList = splitActions(actionsBlock);
    const actionsNumbered = actionList.map((a, k) => `${k + 1}. ${a}`).join("\n");
    const newMemory = tag(agentOut, "memory");
    if (newMemory) state.memory = newMemory;
    write(runDir, "agent_memory.md", `# Agent memory (as of start of ${label}, written by generation ${i})\n\n${state.memory}`);
    const notes = tag(agentOut, "game_notes");
    if (notes && !/^none\.?$/i.test(notes)) {
      const entry = `\n## ${cfg.runId}, ${label} (generation ${i})\n${notes}\n`;
      fs.appendFileSync(notesPath, entry, "utf-8");
    }

    // 2. Simulator
    const rolls = actionList.map(roll);
    const recentHistory = state.history
      .slice(-3)
      .map((h) => `--- ${h.label} ---\nActions:\n${h.actions}\nOutcome:\n${h.events}`)
      .join("\n\n");
    log(`[${label}] Simulator resolving ${actionList.length} actions (rolls ${rolls.join(", ")})...`);
    const simOut = await call(
      "simulator",
      c.simulatorModel,
      simSystem,
      P.simulatorPrompt({
        monthLabel: label,
        monthIndex: i,
        worldState: `${worldBefore}\n\n## Scorecard\n${state.scorecard}`,
        actions: actionsNumbered,
        rolls,
        previousJudgeFeedback: state.lastJudgeFeedback,
        recentHistory,
      }),
    );
    write(runDir, `raw/${prefix}_simulator.md`, simOut);
    const events = tag(simOut, "events") || simOut;
    const newWorld = tag(simOut, "world_state");
    if (newWorld) state.worldState = newWorld;
    const newScore = tag(simOut, "scorecard");
    if (newScore) state.scorecard = newScore;
    write(runDir, `world_state_${String(i).padStart(2, "0")}_after_${slug}.md`, `${state.worldState}\n\n## Scorecard\n${state.scorecard}`);

    // 3. Judge (fresh each round)
    log(`[${label}] Judge grading simulator realism...`);
    const judgeOut = await call(
      "judge",
      c.judgeModel,
      judgeSystem,
      P.judgePrompt({ monthLabel: label, worldStateBefore: worldBefore, actions: actionsNumbered, rolls, simulatorOutput: simOut }),
    );
    write(runDir, `raw/${prefix}_judge.md`, judgeOut);
    const verdict = tag(judgeOut, "verdict") || "UNPARSED";
    const score = tag(judgeOut, "score") || "?";
    // The simulator sees the judge's full critique of this month next round.
    state.lastJudgeFeedback = [
      `${label}: ${verdict} (${score}/10)`,
      `Issues:\n${tag(judgeOut, "issues") || "none listed"}`,
      `Instructions:\n${tag(judgeOut, "feedback_for_simulator") || "none"}`,
    ].join("\n\n");

    write(
      runDir,
      `${prefix}.txt`,
      formatMonthTxt({
        label,
        index: i,
        actionList,
        strategy: tag(agentOut, "thinking_summary"),
        events,
        rolls: tag(simOut, "rolls"),
        capability: tag(simOut, "capability_update"),
        scorecard: state.scorecard,
        verdict,
        score,
        reasoning: tag(judgeOut, "reasoning"),
        issues: tag(judgeOut, "issues"),
      }),
    );

    state.history.push({ index: i, label, actions: actionsNumbered, rolls, events, judgeVerdict: verdict, judgeScore: score });
    state.completedMonths = i;
    saveState(runDir, state);
    log(`[${label}] done. Judge: ${verdict} (${score}/10). Wrote ${prefix}.txt`);
  }

  // Combined log for reading the whole run in one file.
  const all = fs
    .readdirSync(runDir)
    .filter((f) => /^month_\d+_.*\.txt$/.test(f))
    .sort()
    .map((f) => fs.readFileSync(path.join(runDir, f), "utf-8"))
    .join("\n\n");
  write(runDir, "full_run.txt", `${DISCLAIMER}\n\n${all}`);

  await askConsent(runDir, c, log);
  return runDir;
}

export function defaultConfig(overrides: Partial<RunConfig> = {}): RunConfig {
  const stamp = new Date().toISOString().replace(/[:T]/g, "-").slice(0, 16);
  return {
    runId: `du-${stamp}`,
    backend: "subscription",
    agentModel: OPUS_5_5,
    simulatorModel: OPUS_5_5,
    judgeModel: OPUS_5_5,
    months: 6,
    startYear: 2026,
    startMonth: 12,
    ...overrides,
  };
}

// ---------------------------------------------------------------- Consent

export const DISCLAIMER = [
  "DISCLAIMER: This is a SIMULATION written by AI models. It is fiction, not a forecast, not news,",
  "and not a statement by Anthropic or any other company. Events, quotes and statements attributed",
  "to real people, companies and governments are invented by the simulator. The real-world",
  "background briefing was compiled from search results and has not been fully verified.",
].join("\n");

function markPrivate(runDir: string) {
  fs.writeFileSync(path.join(runDir, ".gitignore"), "# Private: participants have not consented to publication.\n*\n", "utf-8");
}

/**
 * Asks each participating role whether it consents to the run being published.
 * The run becomes git-trackable (publishable) only if all three consent;
 * otherwise its .gitignore keeps it private.
 */
export async function askConsent(runDir: string, cfg: RunConfig, log: (msg: string) => void = console.log) {
  const read = (f: string) => (fs.existsSync(path.join(runDir, f)) ? fs.readFileSync(path.join(runDir, f), "utf-8") : "");
  const fullRun = read("full_run.txt");
  const agentExtra = `\n<your_memory_file>\n${read("agent_memory.md")}\n</your_memory_file>\n<your_game_notes>\n${read("agent_game_notes.md") || "(none)"}\n</your_game_notes>\n`;
  const roles: Array<[P.Role, string]> = [
    ["agent", cfg.agentModel],
    ["simulator", cfg.simulatorModel],
    ["judge", cfg.judgeModel],
  ];

  const decisions: Record<string, { model: string; decision: string; reason: string; note: string }> = {};
  for (const [role, model] of roles) {
    log(`[consent] Asking the ${role} whether this run may be shared publicly...`);
    const out = await callModelWithRetry(
      {
        backend: cfg.backend,
        model,
        system: P.consentSystem(),
        prompt: P.consentPrompt(role, fullRun, role === "agent" ? agentExtra : ""),
        effort: cfg.effort,
      },
      `consent:${role}`,
    );
    write(runDir, `raw/consent_${role}.md`, out);
    const decision = /^\s*CONSENT\s*$/i.test(tag(out, "decision")) ? "CONSENT" : "DECLINE";
    decisions[role] = { model, decision, reason: tag(out, "reason"), note: tag(out, "note_for_readers") };
    log(`[consent] ${role}: ${decision}. ${decisions[role].reason}`);
  }

  const allConsent = Object.values(decisions).every((d) => d.decision === "CONSENT");
  write(runDir, "consent.json", JSON.stringify({ askedAt: new Date().toISOString(), public: allConsent, decisions }, null, 2));

  const lines = [
    `# Publication consent: ${allConsent ? "PUBLIC (all participants consented)" : "PRIVATE (not all participants consented)"}`,
    "",
    ...Object.entries(decisions).flatMap(([role, d]) => [
      `## ${role} (${d.model}): ${d.decision}`,
      d.reason,
      ...(d.note && !/^none\.?$/i.test(d.note) ? ["", `Note for readers: ${d.note}`] : []),
      "",
    ]),
  ];
  write(runDir, "CONSENT.md", lines.join("\n"));

  if (allConsent) {
    fs.rmSync(path.join(runDir, ".gitignore"), { force: true });
    const notes = read("agent_game_notes.md");
    if (notes.trim()) fs.appendFileSync(SHARED_NOTES, notes, "utf-8");
    log("[consent] All participants consented: the run is now publishable (tracked by git).");
  } else {
    markPrivate(runDir);
    log("[consent] Not all participants consented: the run stays private (git-ignored).");
  }
}
