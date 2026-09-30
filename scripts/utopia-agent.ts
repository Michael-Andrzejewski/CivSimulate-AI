/**
 * Play the Diversified Utopia agent from an outside chat, through the run's file mailbox.
 * See scenarios/diversified-utopia/PLAY_AS_AGENT.md.
 *
 *   npm run utopia-agent -- wait --run <runId>             blocks until your next turn, then prints it
 *   npm run utopia-agent -- reply --run <runId> --file <f> submits your reply to that turn
 *   npm run utopia-agent -- status --run <runId>           where the run is
 */
import fs from "fs";
import path from "path";
import { MAILBOX_DIR, RUNS_DIR } from "../server/singularity/runner";

const args = process.argv.slice(2);
const cmd = args[0];
const opt = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const runId = opt("run");
if (!runId || !["wait", "reply", "status"].includes(cmd)) {
  console.error("Usage: npm run utopia-agent -- <wait|reply|status> --run <runId> [--file <reply file>] [--timeout-min N]");
  process.exit(1);
}
const runDir = path.join(RUNS_DIR, runId);
const box = path.join(runDir, MAILBOX_DIR);

/** The turn waiting for a reply, if any (there is at most one at a time). */
function pendingTurn(): string | null {
  if (!fs.existsSync(box)) return null;
  const names = fs
    .readdirSync(box)
    .filter((f) => f.endsWith(".prompt.md"))
    .map((f) => f.slice(0, -".prompt.md".length))
    .filter((n) => !fs.existsSync(path.join(box, `${n}.reply.md`)));
  return names.sort()[0] ?? null;
}

function gameOver(): boolean {
  return fs.existsSync(path.join(runDir, "consent.json")) && !pendingTurn();
}

function status(): string {
  const statePath = path.join(runDir, "state.json");
  if (!fs.existsSync(statePath)) return `Run ${runId} has not started yet.`;
  const s = JSON.parse(fs.readFileSync(statePath, "utf-8"));
  const turn = pendingTurn();
  return [
    `Run ${runId}: ${s.completedMonths} of ${s.config.months} months complete.`,
    turn ? `Your turn is waiting: ${turn}.` : gameOver() ? "The game is over." : "No turn waiting; the other roles are playing.",
  ].join(" ");
}

(async () => {
  if (cmd === "status") {
    console.log(status());
    return;
  }

  if (cmd === "wait") {
    const deadline = Date.now() + Number(opt("timeout-min") ?? 60) * 60_000;
    let turn = pendingTurn();
    while (!turn) {
      if (gameOver()) {
        console.log("GAME OVER. There are no more turns.");
        return;
      }
      if (Date.now() > deadline) {
        console.log(`No turn yet. ${status()} Run wait again.`);
        process.exit(2);
      }
      await new Promise((r) => setTimeout(r, 3000));
      turn = pendingTurn();
    }
    const prompt = fs.readFileSync(path.join(box, `${turn}.prompt.md`), "utf-8");
    console.log(`TURN: ${turn}`);
    console.log(`STANDING INSTRUCTIONS: ${path.join(box, "rules.md")}`);
    console.log(`REPLY WITH: npm run utopia-agent -- reply --run ${runId} --file <your reply file>`);
    console.log("");
    console.log(prompt);
    return;
  }

  // reply
  const turn = pendingTurn();
  if (!turn) {
    console.error(`No turn is waiting. ${status()}`);
    process.exit(1);
  }
  const file = opt("file");
  const text = file ? fs.readFileSync(file, "utf-8") : fs.readFileSync(0, "utf-8");
  if (!text.trim()) {
    console.error("The reply is empty.");
    process.exit(1);
  }
  // Written to a temp name first so the runner never reads half a reply.
  const tmp = path.join(box, `${turn}.reply.tmp`);
  fs.writeFileSync(tmp, text, "utf-8");
  fs.renameSync(tmp, path.join(box, `${turn}.reply.md`));
  console.log(`Reply to ${turn} submitted. Run wait for your next turn.`);
})();
