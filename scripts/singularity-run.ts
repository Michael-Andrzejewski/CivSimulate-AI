/**
 * Run the Diversified Utopia simulation from the command line.
 *
 *   npm run utopia -- --months 6 --backend subscription
 *   npm run utopia -- --months 6 --backend api          (needs ANTHROPIC_API_KEY)
 *   npm run utopia -- --run du-2026-09-28-04-30 --months 12   (resume / extend)
 *   npm run utopia -- --run <id> --consent-only   (re-ask publication consent for a finished run)
 *
 * Options: --months N, --backend api|subscription|auto, --run <id>,
 *          --model <id> (all three roles), --agent-model, --simulator-model,
 *          --judge-model, --adversary-model, --no-adversary, --effort low|medium|high|max,
 *          --fixed-rolls (every roll is 50: replicable runs that compare models without luck),
 *          --no-auto-resume (stop at the first failure instead of resuming after a wait),
 *          --cautious (new runs only: without the play-to-win instructions and revised agent lessons),
 *          --scheduled-adversary (the adversary writes a dated schedule of events for the whole game
 *          before month 1, without seeing the player's plans; the simulator rolls each month's events),
 *          --player-role anthropic (the player is Anthropic itself and decides its actions, instead of
 *          Claude advising Anthropic; uses scenario_anthropic.md),
 *          --agent-mailbox (the agent is played from an outside chat through runs/<id>/mailbox;
 *          see scenarios/diversified-utopia/PLAY_AS_AGENT.md; such runs stay private until reviewed)
 *
 * Runs are checkpointed after every step, including the rolls, so a stopped run resumes exactly
 * where it left off without asking any role again or re-rolling. By default a failed run resumes
 * itself after waits of 2, 5, 10 and 20 minutes, then six of 30 and six of 60 (about 9.5 hours).
 *
 * The game ends at the 30 December 2030 deadline (month 49 from December 2026): the simulator sets
 * odds for ALIGNED / MISALIGNED / DISASTER, a roll picks one, and a run never goes past that month.
 *
 * New runs include an adversary (Opus 5.5 by default) that searches the web each month and
 * proposes plausible threats; the simulator sets their odds and dice decide them.
 *
 * Any role can use an OpenAI model through the local Codex CLI by giving a gpt-* model id:
 *   npm run utopia -- --months 6 --backend subscription --simulator-model gpt-6-astra
 */
import fs from "fs";
import path from "path";
import { askConsent, defaultConfig, runGame, RUNS_DIR } from "../server/singularity/runner";
import { resolveBackend } from "../server/llm/backend";
import { classifyFailure } from "../server/singularity/llm";

const args = process.argv.slice(2);
const opt = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};

const model = opt("model");
const cfg = defaultConfig({
  ...(opt("run") ? { runId: opt("run")! } : {}),
  backend: resolveBackend(opt("backend")),
  months: Number(opt("months") ?? 6),
  ...(model ? { agentModel: model, simulatorModel: model, judgeModel: model } : {}),
  ...(opt("agent-model") ? { agentModel: opt("agent-model")! } : {}),
  ...(opt("simulator-model") ? { simulatorModel: opt("simulator-model")! } : {}),
  ...(opt("judge-model") ? { judgeModel: opt("judge-model")! } : {}),
  ...(opt("adversary-model") ? { adversaryModel: opt("adversary-model")! } : {}),
  ...(args.includes("--no-adversary") ? { adversaryModel: undefined } : {}),
  ...(opt("effort") ? { effort: opt("effort") } : {}),
  ...(args.includes("--fixed-rolls") ? { fixedRolls: true } : {}),
  ...(args.includes("--cautious") ? { ambitious: false } : {}),
  ...(args.includes("--agent-mailbox") ? { agentMailbox: true } : {}),
  ...(args.includes("--scheduled-adversary") ? { scheduledAdversary: true } : {}),
  ...(opt("player-role") === "anthropic" ? { playerRole: "anthropic" as const } : {}),
});

if (args.includes("--consent-only")) {
  const runDir = path.join(RUNS_DIR, cfg.runId);
  const statePath = path.join(runDir, "state.json");
  if (!fs.existsSync(statePath)) {
    console.error(`No run found at ${runDir}`);
    process.exit(1);
  }
  const saved = JSON.parse(fs.readFileSync(statePath, "utf-8")).config;
  askConsent(runDir, { ...saved, backend: cfg.backend })
    .then(() => console.log(`Consent recorded in ${path.join(runDir, "CONSENT.md")}`))
    .catch((err) => {
      console.error(`Consent step failed: ${err.message}`);
      process.exit(1);
    });
} else {
  console.log(`Run ${cfg.runId}: ${cfg.months} months via ${cfg.backend}; agent=${cfg.agentModel} adversary=${cfg.adversaryModel ?? "off"} simulator=${cfg.simulatorModel} judge=${cfg.judgeModel}${cfg.fixedRolls ? "; rolls fixed at 50" : ""}`);
  // A failed run resumes itself from its checkpoint (state.json) after a growing wait, which
  // rides out usage limits and outages. Failures that will repeat every time (input too large,
  // unknown model) stop the run at once instead. --no-auto-resume stops at the first failure.
  const autoResume = !args.includes("--no-auto-resume");
  const WAITS_MIN = [2, 5, 10, 20, 30, 30, 30, 30, 30, 30, 60, 60, 60, 60, 60, 60];
  const resumeCmd = `npm run utopia -- --run ${cfg.runId} --months ${cfg.months}`;

  // runs/<id>/status.json says what the run is doing right now; `npm run utopia-status` reads it.
  const statusPath = path.join(RUNS_DIR, cfg.runId, "status.json");
  const writeStatus = (s: Record<string, unknown>) => {
    fs.mkdirSync(path.dirname(statusPath), { recursive: true });
    fs.writeFileSync(statusPath, JSON.stringify({ runId: cfg.runId, pid: process.pid, updatedAt: new Date().toISOString(), ...s }, null, 2), "utf-8");
  };
  const log = (msg: string) => {
    console.log(msg);
    writeStatus({ state: msg.startsWith("[mailbox] Waiting") ? "waiting-for-player" : "running", lastLog: msg });
  };

  (async () => {
    for (let attempt = 0; ; attempt++) {
      try {
        const dir = await runGame(cfg, log);
        writeStatus({ state: "finished" });
        console.log(`\nFinished. Logs in ${dir}`);
        return;
      } catch (err: any) {
        const kind = classifyFailure(err);
        if (kind === "fatal") {
          writeStatus({ state: "stopped-fix-needed", error: err.message });
          console.error(`\nRun stopped: ${err.message}\nThis failure will repeat on every retry, so the run will not resume itself. Fix the cause, then resume with: ${resumeCmd}`);
          process.exit(1);
        }
        // A login problem waits for a person; keep retrying hourly instead of giving up.
        const wait = kind === "needs-login" ? 60 : WAITS_MIN[attempt];
        if (!autoResume || wait === undefined) {
          writeStatus({ state: "stopped", error: err.message });
          console.error(`\nRun stopped: ${err.message}\nResume with: ${resumeCmd}`);
          process.exit(1);
        }
        const nextRetryAt = new Date(Date.now() + wait * 60_000).toISOString();
        writeStatus({ state: kind === "needs-login" ? "waiting-for-login" : "waiting-to-retry", error: err.message, attempt: attempt + 1, nextRetryAt });
        console.error(
          kind === "needs-login"
            ? `\nACTION NEEDED: the claude CLI is not logged in (${err.message}). Run \`claude\` in a terminal and type /login. Retrying in ${wait} min.`
            : `\nRun stopped: ${err.message}\nResuming automatically in ${wait} min (attempt ${attempt + 2}); press Ctrl+C to stop, and resume later with: ${resumeCmd}`,
        );
        await new Promise((r) => setTimeout(r, wait * 60_000));
      }
    }
  })();
}
