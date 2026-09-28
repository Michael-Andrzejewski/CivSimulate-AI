/**
 * Multiplayer session endpoints. Two players join a shared session by a
 * 5-digit code; host controls the locked settings (turn increment + current
 * year), each player sets their own name/kingdom/location. Clients poll
 * GET /api/sessions/:id to stay in sync.
 */
import type { Express, RequestHandler } from "express";
import {
  createSession,
  joinSession,
  getFullSession,
  updateSettings,
  updatePlayer,
  leaveSession,
  listSessionsForUser,
} from "./multiplayerStore";
import { startGame, generateQuestionsForPlayer, bothPlayersReady, runRound, rerunRound, revertToIndex, simulateWar, grantExtraRound, runSoloRound, nextRound } from "./multiplayerSim";
import { buildDefaultWorldPrompt, WAR_TYPES, type WarType } from "./mpPrompts";

function fail(res: any, error: any, fallback = "Server error") {
  const status = error?.status || 500;
  console.error("[multiplayer]", error?.stack || String(error));
  res.status(status).json({ message: error?.message || fallback });
}

/**
 * When a player becomes ready, kick off the right resolution in the background:
 * a solo "time bubble" round if one is in progress for them, otherwise the
 * shared round once BOTH players are ready.
 */
async function resolveWhenReady(sessionId: string): Promise<void> {
  const full = await getFullSession(sessionId);
  if (!full) return;
  if (full.session.soloPlayerId) {
    const solo = full.players.find((p) => p.id === full.session.soloPlayerId);
    if (solo?.ready && (solo.goals || "").trim()) {
      runSoloRound(sessionId, full.session.soloPlayerId).catch((e) => console.error("[multiplayer] runSoloRound:", e?.stack || String(e)));
    }
    return;
  }
  if (await bothPlayersReady(sessionId)) {
    runRound(sessionId).catch((e) => console.error("[multiplayer] runRound:", e?.stack || String(e)));
  }
}

export function registerMultiplayerRoutes(app: Express, isAuthenticated: RequestHandler): void {
  // Host creates a session
  app.post("/api/sessions", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const turnIncrement = Math.max(1, parseInt(req.body?.turnIncrement, 10) || 100);
      const currentYear = parseInt(req.body?.currentYear, 10);
      const result = await createSession(userId, {
        turnIncrement,
        currentYear: Number.isFinite(currentYear) ? currentYear : -10000,
      });
      res.status(201).json(result);
    } catch (e) {
      fail(res, e, "Failed to create session");
    }
  });

  // Player joins by code
  app.post("/api/sessions/join", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const code = String(req.body?.code || "").trim();
      if (!/^\d{5}$/.test(code)) return res.status(400).json({ message: "Join codes are 5 digits" });
      const result = await joinSession(code, userId);
      res.json(result);
    } catch (e) {
      fail(res, e, "Failed to join session");
    }
  });

  // Sessions this user has a seat in (for the rejoin list). Registered BEFORE
  // "/:id" so "mine" isn't captured as a session id.
  app.get("/api/sessions/mine", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      res.json({ sessions: await listSessionsForUser(userId) });
    } catch (e) {
      fail(res, e, "Failed to load your sessions");
    }
  });

  // Poll full session state
  app.get("/api/sessions/:id", isAuthenticated, async (req: any, res) => {
    try {
      const full = await getFullSession(req.params.id);
      if (!full) return res.status(404).json({ message: "Session not found" });
      // Strip the (potentially large) transcript from the 1.5s poll — it's
      // fetched on demand via /history when the player opens that panel.
      const { history, ...session } = full.session;
      res.json({ session, players: full.players });
    } catch (e) {
      fail(res, e, "Failed to load session");
    }
  });

  // Full per-turn transcript (goals/questions/answers/sim for both civs).
  app.get("/api/sessions/:id/history", isAuthenticated, async (req: any, res) => {
    try {
      const full = await getFullSession(req.params.id);
      if (!full) return res.status(404).json({ message: "Session not found" });
      let history: any[] = [];
      try { history = JSON.parse(full.session.history || "[]"); } catch { history = []; }
      res.json({ history });
    } catch (e) {
      fail(res, e, "Failed to load history");
    }
  });

  // The shared-world system prompt (host's custom one, or the generated default).
  app.get("/api/sessions/:id/default-prompt", isAuthenticated, async (req: any, res) => {
    try {
      const full = await getFullSession(req.params.id);
      if (!full) return res.status(404).json({ message: "Session not found" });
      res.json({
        prompt: (full.session.systemPrompt && full.session.systemPrompt.trim()) || buildDefaultWorldPrompt(full.session),
        isCustom: !!(full.session.systemPrompt && full.session.systemPrompt.trim()),
      });
    } catch (e) {
      fail(res, e, "Failed to load prompt");
    }
  });

  // Host updates locked settings
  app.patch("/api/sessions/:id/settings", isAuthenticated, async (req: any, res) => {
    try {
      const playerId = String(req.body?.playerId || "");
      const session = await updateSettings(req.params.id, playerId, req.body || {});
      res.json(session);
    } catch (e) {
      fail(res, e, "Failed to update settings");
    }
  });

  // A player updates their own seat
  app.patch("/api/sessions/:id/player", isAuthenticated, async (req: any, res) => {
    try {
      const playerId = String(req.body?.playerId || "");
      if (!playerId) return res.status(400).json({ message: "playerId required" });
      const player = await updatePlayer(playerId, req.body || {});
      res.json(player);
    } catch (e) {
      fail(res, e, "Failed to update player");
    }
  });

  // Host starts the game: place both players, open the goals phase
  app.post("/api/sessions/:id/start", isAuthenticated, async (req: any, res) => {
    try {
      const playerId = String(req.body?.playerId || "");
      const full = await getFullSession(req.params.id);
      if (!full) return res.status(404).json({ message: "Session not found" });
      if (full.session.hostPlayerId !== playerId) return res.status(403).json({ message: "Only the host can start" });
      await startGame(req.params.id);
      res.json({ ok: true });
    } catch (e) {
      fail(res, e, "Failed to start game");
    }
  });

  // A player submits their goals. Questions are generated for THAT player right
  // away (no waiting for the other player) — submitting goals does not mark the
  // player ready; only answering does.
  app.post("/api/sessions/:id/submit-goals", isAuthenticated, async (req: any, res) => {
    try {
      const playerId = String(req.body?.playerId || "");
      const goals = String(req.body?.goals || "").trim();
      if (!playerId || !goals) return res.status(400).json({ message: "playerId and goals required" });
      const player = await updatePlayer(playerId, { goals });
      // Players who opted out of questions ("none") go straight to ready.
      if (player.goalQuestions === "none") {
        const ready = await updatePlayer(playerId, { ready: true });
        await resolveWhenReady(req.params.id);
        return res.json(ready);
      }
      await generateQuestionsForPlayer(req.params.id, playerId);
      // return the player WITH its freshly generated questions
      res.json(await updatePlayer(playerId, {}));
    } catch (e) {
      fail(res, e, "Failed to submit goals");
    }
  });

  // A player answers their strategy questions, which marks them ready. When BOTH
  // players are ready, the shared simulation auto-starts in the background — the
  // only point at which a player waits on the other.
  app.post("/api/sessions/:id/submit-answers", isAuthenticated, async (req: any, res) => {
    try {
      const playerId = String(req.body?.playerId || "");
      // Free-form plaintext answer (fall back to joining a legacy answers[] array).
      const answer =
        typeof req.body?.answer === "string"
          ? req.body.answer.trim()
          : Array.isArray(req.body?.answers)
            ? req.body.answers.map((a: any) => String(a)).join("\n").trim()
            : "";
      if (!playerId || !answer) return res.status(400).json({ message: "playerId and answer required" });
      const player = await updatePlayer(playerId, { answers: answer, ready: true });
      await resolveWhenReady(req.params.id);
      res.json(player);
    } catch (e) {
      fail(res, e, "Failed to submit answers");
    }
  });

  // A player steps back to re-edit their goals or answer for the CURRENT turn,
  // before the shared simulation runs. Per-player and self-service (you can only
  // step your own seat back); only valid while the turn is still being prepared.
  //   to="goals"     -> clears goals + questions + answer, un-readies (re-decide)
  //   to="questions" -> clears answer, un-readies (keep goals + questions)
  app.post("/api/sessions/:id/step-back", isAuthenticated, async (req: any, res) => {
    try {
      const playerId = String(req.body?.playerId || "");
      const to = String(req.body?.to || "");
      if (!playerId || (to !== "goals" && to !== "questions")) {
        return res.status(400).json({ message: "playerId and to (goals|questions) required" });
      }
      const full = await getFullSession(req.params.id);
      if (!full) return res.status(404).json({ message: "Session not found" });
      if (full.session.phase !== "goals") {
        return res.status(400).json({ message: "You can only step back while this turn is still being prepared. Use History → Revert for a completed turn." });
      }
      if (full.session.soloPlayerId && full.session.soloPlayerId !== playerId) {
        return res.status(400).json({ message: "A bonus round is in progress" });
      }
      if (!full.players.find((p) => p.id === playerId)) return res.status(400).json({ message: "Unknown player" });
      if (to === "goals") {
        await updatePlayer(playerId, { goals: "", questions: "[]", answers: "", ready: false });
      } else {
        await updatePlayer(playerId, { answers: "", ready: false });
      }
      res.json({ ok: true });
    } catch (e) {
      fail(res, e, "Failed to step back");
    }
  });

  // Manual fallback to resolve the round (normally auto-started by submit-answers).
  // Validates quickly, kicks it off in the background, returns immediately; both
  // clients watch the streamed simulation + phase change via polling.
  app.post("/api/sessions/:id/run-round", isAuthenticated, async (req: any, res) => {
    try {
      if (!(await bothPlayersReady(req.params.id))) {
        return res.status(400).json({ message: "Both players must answer their questions first" });
      }
      runRound(req.params.id).catch((e) => console.error("[multiplayer] runRound:", e?.stack || String(e)));
      res.status(202).json({ ok: true, started: true });
    } catch (e) {
      fail(res, e, "Failed to run round");
    }
  });

  // Host runs the turn WITHOUT waiting for the remaining players. Stragglers are
  // marked ready as-is: goals they already submitted are used (answered or not),
  // and anyone with no goals gets an explicit "carry on as before" order so the
  // simulation keeps their civilization on its current trajectory.
  app.post("/api/sessions/:id/run-now", isAuthenticated, async (req: any, res) => {
    try {
      const playerId = String(req.body?.playerId || "");
      const full = await getFullSession(req.params.id);
      if (!full) return res.status(404).json({ message: "Session not found" });
      if (full.session.hostPlayerId !== playerId) return res.status(403).json({ message: "Only the host can start the turn early" });
      if (full.session.phase !== "goals") return res.status(400).json({ message: "The turn is not being prepared" });
      if (full.session.soloPlayerId) return res.status(400).json({ message: "A bonus round is in progress" });
      if (!full.players.some((p) => p.ready && (p.goals || "").trim())) {
        return res.status(400).json({ message: "At least one player must be ready first" });
      }
      for (const p of full.players) {
        if (!p.ready || !(p.goals || "").trim()) {
          await updatePlayer(p.id, {
            ready: true,
            goals:
              (p.goals || "").trim() ||
              "No new goals this turn — the civilization carries on as before, maintaining its current settlements, food production, and way of life.",
          });
        }
      }
      runRound(req.params.id).catch((e) => console.error("[multiplayer] runRound:", e?.stack || String(e)));
      res.status(202).json({ ok: true, started: true });
    } catch (e) {
      fail(res, e, "Failed to start the turn");
    }
  });

  // Host re-runs the just-completed turn (same goals/answers, fresh simulation)
  app.post("/api/sessions/:id/rerun", isAuthenticated, async (req: any, res) => {
    try {
      const playerId = String(req.body?.playerId || "");
      const full = await getFullSession(req.params.id);
      if (!full) return res.status(404).json({ message: "Session not found" });
      if (full.session.hostPlayerId !== playerId) return res.status(403).json({ message: "Only the host can re-run" });
      if (full.session.phase !== "results") return res.status(400).json({ message: "Can only re-run a completed turn" });
      rerunRound(req.params.id).catch((e) => console.error("[multiplayer] rerunRound:", e?.stack || String(e)));
      res.status(202).json({ ok: true, started: true });
    } catch (e) {
      fail(res, e, "Failed to re-run");
    }
  });

  // Host triggers a war between the two civilizations (uses the battle prompts)
  app.post("/api/sessions/:id/war", isAuthenticated, async (req: any, res) => {
    try {
      const playerId = String(req.body?.playerId || "");
      const battleType = String(req.body?.battleType || "Limited War") as WarType;
      const scenario = String(req.body?.scenario || "").slice(0, 4000);
      if (!WAR_TYPES.includes(battleType)) return res.status(400).json({ message: "Unknown war type" });
      const full = await getFullSession(req.params.id);
      if (!full) return res.status(404).json({ message: "Session not found" });
      if (full.session.hostPlayerId !== playerId) return res.status(403).json({ message: "Only the host can start a war" });
      if (full.session.phase === "simulating") return res.status(400).json({ message: "A simulation is already running" });
      simulateWar(req.params.id, battleType, scenario).catch((e) => console.error("[multiplayer] simulateWar:", e?.stack || String(e)));
      res.status(202).json({ ok: true, started: true });
    } catch (e) {
      fail(res, e, "Failed to start war");
    }
  });

  // Host grants one civilization a bonus "time bubble" round
  app.post("/api/sessions/:id/grant-extra", isAuthenticated, async (req: any, res) => {
    try {
      const playerId = String(req.body?.playerId || "");
      const targetPlayerId = String(req.body?.targetPlayerId || "");
      const full = await getFullSession(req.params.id);
      if (!full) return res.status(404).json({ message: "Session not found" });
      if (full.session.hostPlayerId !== playerId) return res.status(403).json({ message: "Only the host can grant an extra round" });
      if (full.session.phase === "simulating") return res.status(400).json({ message: "A simulation is already running" });
      if (!full.players.find((p) => p.id === targetPlayerId)) return res.status(400).json({ message: "Unknown player" });
      await grantExtraRound(req.params.id, targetPlayerId);
      res.json({ ok: true });
    } catch (e) {
      fail(res, e, "Failed to grant extra round");
    }
  });

  // Host reverts the game to a past history entry (memory + timeline + map)
  app.post("/api/sessions/:id/revert", isAuthenticated, async (req: any, res) => {
    try {
      const playerId = String(req.body?.playerId || "");
      const index = parseInt(req.body?.index, 10);
      const full = await getFullSession(req.params.id);
      if (!full) return res.status(404).json({ message: "Session not found" });
      if (full.session.hostPlayerId !== playerId) return res.status(403).json({ message: "Only the host can revert" });
      if (!Number.isInteger(index)) return res.status(400).json({ message: "index required" });
      await revertToIndex(req.params.id, index);
      res.json({ ok: true });
    } catch (e) {
      fail(res, e, "Failed to revert");
    }
  });

  // Host advances to the next round
  app.post("/api/sessions/:id/next-round", isAuthenticated, async (req: any, res) => {
    try {
      const playerId = String(req.body?.playerId || "");
      const full = await getFullSession(req.params.id);
      if (!full) return res.status(404).json({ message: "Session not found" });
      if (full.session.hostPlayerId !== playerId) return res.status(403).json({ message: "Only the host can advance" });
      await nextRound(req.params.id);
      res.json({ ok: true });
    } catch (e) {
      fail(res, e, "Failed to advance");
    }
  });

  app.post("/api/sessions/:id/leave", isAuthenticated, async (req: any, res) => {
    try {
      const playerId = String(req.body?.playerId || "");
      if (playerId) await leaveSession(playerId);
      res.json({ ok: true });
    } catch (e) {
      fail(res, e, "Failed to leave");
    }
  });
}
