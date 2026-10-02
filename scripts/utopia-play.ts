/**
 * A local website for playing the Diversified Utopia agent yourself. The adversary, simulator and
 * judge stay AI; you get each agent turn in the browser and your replies go back through the run's
 * file mailbox (see PLAY_AS_AGENT.md), so every turn is recorded in runs/<runId>/mailbox.
 *
 *   npm run utopia-play            then open http://localhost:5055
 *
 * The page only shows what the agent is entitled to see: your turns, your own past replies, the
 * standing instructions and the runner's progress (with the judge's private progress bar removed).
 */
import { spawn } from "child_process";
import express from "express";
import fs from "fs";
import path from "path";
import { MAILBOX_DIR, RUNS_DIR } from "../server/singularity/runner";

const PORT = Number(process.env.UTOPIA_PLAY_PORT ?? 5055);
const ROOT = process.cwd();
const app = express();
app.use(express.json({ limit: "2mb" }));

const runDir = (id: string) => path.join(RUNS_DIR, id);
const box = (id: string) => path.join(runDir(id), MAILBOX_DIR);
const validId = (id: string) => /^[A-Za-z0-9._-]{3,80}$/.test(id);

function readJson(p: string): any {
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf-8")) : null;
}

function alive(pid: unknown): boolean {
  if (typeof pid !== "number") return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

/** The turn waiting for a reply, if any. */
function pendingTurn(id: string): string | null {
  if (!fs.existsSync(box(id))) return null;
  return (
    fs
      .readdirSync(box(id))
      .filter((f) => f.endsWith(".prompt.md"))
      .map((f) => f.slice(0, -".prompt.md".length))
      .filter((n) => !fs.existsSync(path.join(box(id), `${n}.reply.md`)))
      .sort()[0] ?? null
  );
}

function runSummary(id: string) {
  const state = readJson(path.join(runDir(id), "state.json"));
  const status = readJson(path.join(runDir(id), "status.json"));
  const running = status && ["running", "waiting-for-player", "waiting-to-retry", "waiting-for-login"].includes(status.state);
  // Runs from before status tracking: finished once every month is played and consent was asked.
  const doneWithoutStatus = !status && state && state.completedMonths >= state.config.months && fs.existsSync(path.join(runDir(id), "consent.json"));
  return {
    id,
    months: state ? `${state.completedMonths}/${state.config.months}` : "starting",
    state: status?.state ?? (doneWithoutStatus ? "finished" : state ? "no status (started before status tracking)" : "starting"),
    // Before the runner writes its first status, fall back to the pid this site launched.
    processAlive: running
      ? alive(status.pid)
      : !status && fs.existsSync(path.join(runDir(id), "runner.pid"))
        ? alive(Number(fs.readFileSync(path.join(runDir(id), "runner.pid"), "utf-8")))
        : false,
    error: status?.error ?? null,
    turnWaiting: pendingTurn(id),
    finished: status?.state === "finished" || Boolean(doneWithoutStatus),
  };
}

/** Starts (or resumes) the runner for a run in the background, logging to runs/<id>/runner.log. */
function startRunner(id: string, opts: { months: number; adversary: string; fixedRolls: boolean; role?: string }) {
  fs.mkdirSync(runDir(id), { recursive: true });
  fs.writeFileSync(path.join(runDir(id), "runner-options.json"), JSON.stringify(opts), "utf-8");
  const log = fs.openSync(path.join(runDir(id), "runner.log"), "a");
  const args = ["run", "utopia", "--", "--run", id, "--months", String(opts.months), "--backend", "subscription", "--agent-mailbox", "--agent-model", "human"];
  if (opts.adversary === "none") args.push("--no-adversary");
  if (opts.adversary === "scheduled") args.push("--scheduled-adversary");
  if (opts.fixedRolls) args.push("--fixed-rolls");
  if (opts.role === "anthropic") args.push("--player-role", "anthropic");
  // Node runs the CLI directly. Going through npm with a shell loses the detached process on
  // Windows (the run never starts and its log stays empty).
  const cli = [path.join(ROOT, "node_modules", "tsx", "dist", "cli.mjs"), path.join(ROOT, "scripts", "singularity-run.ts"), ...args.slice(args.indexOf("--") + 1)];
  const child = spawn(process.execPath, cli, { cwd: ROOT, detached: true, stdio: ["ignore", log, log], windowsHide: true });
  child.on("error", (err) => fs.appendFileSync(path.join(runDir(id), "runner.log"), `Could not start the runner: ${err.message}\n`));
  if (child.pid) fs.writeFileSync(path.join(runDir(id), "runner.pid"), String(child.pid));
  child.unref();
}

// Runs that were played from the mailbox (the ones you can play here).
app.get("/api/runs", (_req, res) => {
  const ids = fs.existsSync(RUNS_DIR) ? fs.readdirSync(RUNS_DIR) : [];
  // Mailbox runs, plus runs this site just started (they have a runner.log before their state.json).
  const playable = ids.filter((id) => readJson(path.join(runDir(id), "state.json"))?.config?.agentMailbox || fs.existsSync(path.join(runDir(id), "runner.log")));
  // Runs set aside with an ABORTED.md note stay on disk but leave the list.
  const listed = playable.filter((id) => !fs.existsSync(path.join(runDir(id), "ABORTED.md")));
  res.json(listed.sort().reverse().map(runSummary));
});

app.post("/api/runs", (req, res) => {
  const { runId, months = 49, adversary = "reactive", fixedRolls = false, role = "anthropic" } = req.body ?? {};
  if (!validId(runId)) return res.status(400).json({ error: "Run ids may use letters, numbers, dots, dashes and underscores." });
  if (fs.existsSync(path.join(runDir(runId), "state.json"))) return res.status(400).json({ error: "That run already exists; resume it instead." });
  startRunner(runId, { months: Math.max(1, Math.min(49, Number(months))), adversary, fixedRolls: Boolean(fixedRolls), role: role === "claude" ? "claude" : "anthropic" });
  res.json({ ok: true });
});

app.post("/api/runs/:id/resume", (req, res) => {
  const id = req.params.id;
  const state = readJson(path.join(runDir(id), "state.json"));
  // A run that never got going has no state yet; use the settings it was started with.
  const saved = readJson(path.join(runDir(id), "runner-options.json"));
  if (!state && !saved) return res.status(404).json({ error: "No such run." });
  const s = runSummary(id);
  if (s.processAlive) return res.json({ ok: true, note: "Already running." });
  startRunner(
    id,
    state
      ? {
          months: state.config.months,
          adversary: state.config.adversaryModel ? (state.config.scheduledAdversary ? "scheduled" : "reactive") : "none",
          fixedRolls: Boolean(state.config.fixedRolls),
          role: state.config.playerRole ?? "claude",
        }
      : saved,
  );
  res.json({ ok: true });
});

app.get("/api/runs/:id/turn", (req, res) => {
  const id = req.params.id;
  const turn = pendingTurn(id);
  const state = readJson(path.join(runDir(id), "state.json"));
  if (!turn) return res.json({ summary: runSummary(id), turn: null });
  const prompt = fs.readFileSync(path.join(box(id), `${turn}.prompt.md`), "utf-8");
  res.json({
    summary: runSummary(id),
    turn,
    kind: turn.startsWith("consent") ? "consent" : turn.startsWith("commentary") ? "commentary" : "month",
    prompt,
    rulesChanged: /NEW or CHANGED/.test(prompt.split("\n")[0]),
    memory: state?.pending?.before?.memory ?? state?.memory ?? "",
  });
});

app.get("/api/runs/:id/rules", (req, res) => {
  const p = path.join(box(req.params.id), "rules.md");
  res.type("text/plain").send(fs.existsSync(p) ? fs.readFileSync(p, "utf-8") : "No rules yet.");
});

app.post("/api/runs/:id/reply", (req, res) => {
  const id = req.params.id;
  const { turn, text } = req.body ?? {};
  const pending = pendingTurn(id);
  if (!pending || pending !== turn) return res.status(409).json({ error: "That turn is no longer waiting. Reload." });
  if (!String(text ?? "").trim()) return res.status(400).json({ error: "The reply is empty." });
  // Written to a temp name first so the runner never reads half a reply.
  const tmp = path.join(box(id), `${turn}.reply.tmp`);
  fs.writeFileSync(tmp, text, "utf-8");
  fs.renameSync(tmp, path.join(box(id), `${turn}.reply.md`));
  res.json({ ok: true });
});

// Your own past turns: what you were shown and what you replied.
app.get("/api/runs/:id/history", (req, res) => {
  const id = req.params.id;
  if (!fs.existsSync(box(id))) return res.json([]);
  const names = fs
    .readdirSync(box(id))
    .filter((f) => f.endsWith(".reply.md"))
    .map((f) => f.slice(0, -".reply.md".length))
    .sort();
  res.json(
    names.map((n) => ({
      turn: n,
      prompt: fs.readFileSync(path.join(box(id), `${n}.prompt.md`), "utf-8"),
      reply: fs.readFileSync(path.join(box(id), `${n}.reply.md`), "utf-8"),
    })),
  );
});

// The runner's progress, minus the judge's private progress bar.
app.get("/api/runs/:id/log", (req, res) => {
  const p = path.join(runDir(req.params.id), "runner.log");
  const lines = fs.existsSync(p) ? fs.readFileSync(p, "utf-8").split("\n") : [];
  res.type("text/plain").send(
    lines
      .filter((l) => l.trim() && !/Private DU progress|DEP0190|trace-deprecation/.test(l))
      .slice(-60)
      .join("\n"),
  );
});

app.get("/", (_req, res) => res.sendFile(path.join(ROOT, "scripts", "utopia-play.html")));

app.listen(PORT, "127.0.0.1", () => console.log(`Diversified Utopia: play the agent at http://localhost:${PORT}`));
