/**
 * Subscription pathway: runs Claude through the local `claude` CLI in headless
 * print mode (`claude -p`), so calls bill against the Claude subscription the
 * CLI is logged into instead of an ANTHROPIC_API_KEY. Same approach as
 * BalatroBench's consult.py: one stateless CLI call per completion, all tools
 * disabled so the model only returns text.
 *
 * Requirements: Claude Code installed and logged in (`claude` on PATH, or set
 * CLAUDE_CLI_PATH). Run `claude` once interactively and sign in if needed.
 */
import { spawn } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

export interface CliCompletionOptions {
  model: string;
  system?: string;
  prompt: string;
  timeoutMs?: number;
  /** Optional reasoning effort ("low" | "medium" | "high" | "max"). */
  effort?: string;
  /** Allow only web search and page fetches (no files, no shell). Off by default. */
  webSearch?: boolean;
}

export interface CliCompletionResult {
  text: string;
  hitTokenLimit: boolean;
  usage?: any;
  costUsd?: number;
}

const DEFAULT_TIMEOUT_MS = 20 * 60 * 1000;

// When this runs inside a Claude Code session (e.g. the desktop app), that
// session's env leaks into the child: session ids, messaging sockets, host
// auth flags and an ANTHROPIC_BASE_URL proxy. The child then tries the host's
// auth instead of the CLI's own login and fails with "OAuth access token has
// been revoked". The child should be a clean, standalone headless run, as if
// started from a plain terminal.
const KEPT_CLAUDE_VARS = new Set(["CLAUDE_CONFIG_DIR"]);

function childEnv(): NodeJS.ProcessEnv {
  const env = { ...process.env };
  const insideClaudeCode = Boolean(process.env.CLAUDECODE || process.env.CLAUDE_CODE_ENTRYPOINT);
  for (const key of Object.keys(env)) {
    if (key.startsWith("CLAUDE") && !KEPT_CLAUDE_VARS.has(key)) delete env[key];
  }
  if (insideClaudeCode) delete env.ANTHROPIC_BASE_URL;
  // Never let a stray API key silently switch the CLI to API billing.
  if (process.env.CLAUDE_CLI_KEEP_API_KEY !== "1") delete env.ANTHROPIC_API_KEY;
  return env;
}

/**
 * An old npm-installed `claude` can shadow the native install on PATH, and new
 * models refuse old CLIs. Prefer the native installer's binary when present.
 */
function findClaudeCli(): string {
  if (process.env.CLAUDE_CLI_PATH) return process.env.CLAUDE_CLI_PATH;
  const native = path.join(os.homedir(), ".local", "bin", process.platform === "win32" ? "claude.exe" : "claude");
  return fs.existsSync(native) ? native : "claude";
}

export async function claudeCliComplete(opts: CliCompletionOptions): Promise<CliCompletionResult> {
  // Run in an empty temp dir with no setting sources so no project CLAUDE.md,
  // hooks, skills or MCP servers leak into the prompt.
  const workDir = fs.mkdtempSync(path.join(os.tmpdir(), "civsim-cli-"));
  const args = [
    "-p",
    "--model", opts.model,
    "--output-format", "json",
    ...(opts.webSearch
      ? ["--tools", "WebSearch,WebFetch", "--allowedTools", "WebSearch,WebFetch"]
      : ["--tools", ""]),
    "--strict-mcp-config",
    "--disable-slash-commands",
    "--no-session-persistence",
    "--setting-sources", "",
  ];
  if (opts.system) {
    const sysFile = path.join(workDir, "system.txt");
    fs.writeFileSync(sysFile, opts.system, "utf-8");
    args.push("--system-prompt-file", sysFile);
  }
  if (opts.effort) args.push("--effort", opts.effort);

  const cliPath = findClaudeCli();
  const timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  // Windows installs `claude` as a .cmd shim, which needs a shell. The shell
  // joins args with spaces, so empty values (e.g. `--tools ""`) vanish and the
  // next flag gets read as their value; quote them explicitly.
  const useShell = process.platform === "win32" && !cliPath.toLowerCase().endsWith(".exe");
  const spawnArgs = useShell
    ? args.map((a) => (a === "" || /[\s"&|<>^]/.test(a) ? `"${a.replace(/"/g, '\\"')}"` : a))
    : args;

  try {
    const { stdout, stderr, code } = await new Promise<{ stdout: string; stderr: string; code: number | null }>(
      (resolve, reject) => {
        const child = spawn(cliPath, spawnArgs, {
          cwd: workDir,
          env: childEnv(),
          shell: useShell,
        });
        let stdout = "";
        let stderr = "";
        const timer = setTimeout(() => {
          child.kill("SIGKILL");
          reject(new Error(`claude CLI timed out after ${Math.round(timeoutMs / 60000)} min`));
        }, timeoutMs);
        child.stdout.on("data", (d) => (stdout += d));
        child.stderr.on("data", (d) => (stderr += d));
        child.on("error", (err) => {
          clearTimeout(timer);
          reject(new Error(`Could not start the claude CLI (${cliPath}): ${err.message}. Install Claude Code and log in, or set CLAUDE_CLI_PATH.`));
        });
        child.on("close", (code) => {
          clearTimeout(timer);
          resolve({ stdout, stderr, code });
        });
        child.stdin.end(opts.prompt, "utf-8");
      },
    );

    let data: any;
    try {
      data = JSON.parse(stdout);
    } catch {
      throw new Error(`claude CLI exited ${code} without JSON output: ${(stderr || stdout).trim().slice(0, 1500)}`);
    }
    if (data.is_error) {
      throw new Error(`claude CLI error: ${String(data.result ?? stderr).slice(0, 1500)}`);
    }
    const text = String(data.result ?? "").trim();
    if (!text) throw new Error("claude CLI returned an empty reply (possibly hit the output cap)");
    return {
      text,
      hitTokenLimit: data.stop_reason === "max_tokens",
      usage: data.usage,
      costUsd: data.total_cost_usd,
    };
  } finally {
    fs.rmSync(workDir, { recursive: true, force: true });
  }
}
