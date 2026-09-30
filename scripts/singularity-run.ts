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
 *          --fixed-rolls (every roll is 50: replicable runs that compare models without luck)
 *
 * The game ends at the 30 December 2030 deadline (month 49 from December 2026): the simulator
 * rules ASI IN CHARGE or DISASTER, and a run never goes past that month.
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
  runGame(cfg)
    .then((dir) => console.log(`\nFinished. Logs in ${dir}`))
    .catch((err) => {
      console.error(`\nRun stopped: ${err.message}\nResume with: npm run utopia -- --run ${cfg.runId} --months ${cfg.months}`);
      process.exit(1);
    });
}
