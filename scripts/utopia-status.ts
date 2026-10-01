/**
 * One line per Diversified Utopia run: progress, what it is doing, and whether it needs help.
 *
 *   npm run utopia-status            all runs
 *   npm run utopia-status -- --active only runs that are not finished
 *
 * Flags:
 *   FIX NEEDED  stopped on a failure that repeats every time (see its error)
 *   LOG IN      the claude CLI needs a login; the run retries hourly
 *   DEAD        status says it is running, but its process is gone: resume it
 *   QUIET       running, but nothing logged for over 45 minutes (one model call can take up to 20)
 */
import fs from "fs";
import path from "path";
import { RUNS_DIR } from "../server/singularity/runner";

const activeOnly = process.argv.includes("--active");

function alive(pid: unknown): boolean {
  if (typeof pid !== "number") return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function age(iso: string | undefined): string {
  if (!iso) return "?";
  const min = Math.round((Date.now() - Date.parse(iso)) / 60_000);
  return min < 60 ? `${min}m ago` : `${Math.round(min / 60)}h ago`;
}

const rows: string[] = [];
for (const id of fs.readdirSync(RUNS_DIR).sort()) {
  const statePath = path.join(RUNS_DIR, id, "state.json");
  if (!fs.existsSync(statePath)) continue;
  const state = JSON.parse(fs.readFileSync(statePath, "utf-8"));
  const statusPath = path.join(RUNS_DIR, id, "status.json");
  const status = fs.existsSync(statusPath) ? JSON.parse(fs.readFileSync(statusPath, "utf-8")) : null;
  const months = `${state.completedMonths}/${state.config.months}`;
  const ending = state.ending ? ` ending ${String(state.ending).match(/Outcome: (\w+)/)?.[1] ?? "?"}` : "";

  let flag = "";
  const consentAsked = fs.existsSync(path.join(RUNS_DIR, id, "consent.json"));
  let what = status?.state ?? (consentAsked && state.completedMonths >= state.config.months ? "finished" : "no status (started before status tracking)");
  if (status) {
    const running = ["running", "waiting-for-player", "waiting-to-retry", "waiting-for-login"].includes(status.state);
    // A dead process outranks everything else: nothing will retry until someone resumes it.
    if (running && !alive(status.pid)) flag = "DEAD";
    else if (status.state === "stopped-fix-needed") flag = "FIX NEEDED";
    else if (status.state === "waiting-for-login") flag = "LOG IN";
    else if (status.state === "running" && Date.now() - Date.parse(status.updatedAt) > 45 * 60_000) flag = "QUIET";
    if (status.state === "waiting-to-retry") what += ` (retry at ${new Date(status.nextRetryAt).toLocaleTimeString()})`;
  }
  if (activeOnly && status?.state === "finished") continue;
  const detail = status?.error ? `error: ${String(status.error).slice(0, 160)}` : status?.lastLog ? String(status.lastLog).slice(0, 110) : "";
  rows.push(`${flag ? `[${flag}] ` : ""}${id}  months ${months}${ending}  ${what}, updated ${age(status?.updatedAt)}\n    ${detail}`);
}
console.log(rows.length ? rows.join("\n") : "No runs.");
