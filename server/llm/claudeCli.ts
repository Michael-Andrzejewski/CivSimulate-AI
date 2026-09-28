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
}

export interface CliCompletionResult {
  text: string;
  hitTokenLimit: boolean;
  usage?: any;
  costUsd?: number;
}

const DEFAULT_TIMEOUT_MS = 20 * 60 * 1000;

// Env vars that would make the child CLI think it is a nested session of
// whatever Claude Code process launched this server (session reuse, remote
// messaging sockets). The child should be a clean, standalone headless run.
const STRIPPED_ENV_PREFIXES = ["CLAUDE_CODE_SESSION", "CLAUDE_CODE_REMOTE_SESSION", "CLAUDE_CODE_MESSAGING"];

function childEnv(): NodeJS.ProcessEnv {
  const env = { ...process.env };
  for (const key of Object.keys(env)) {
    if (STRIPPED_ENV_PREFIXES.some((p) => key.startsWith(p))) delete env[key];
  }
  // Never let a stray API key silently switch the CLI to API billing.
  if (process.env.CLAUDE_CLI_KEEP_API_KEY !== "1") delete env.ANTHROPIC_API_KEY;
  return env;
}

export async function claudeCliComplete(opts: CliCompletionOptions): Promise<CliCompletionResult> {
  // Run in an empty temp dir with no setting sources so no project CLAUDE.md,
  // hooks, skills or MCP servers leak into the prompt.
  const workDir = fs.mkdtempSync(path.join(os.tmpdir(), "civsim-cli-"));
  const args = [
    "-p",
    "--model", opts.model,
    "--output-format", "json",
    "--tools", "",
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

  const cliPath = process.env.CLAUDE_CLI_PATH || "claude";
  const timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  try {
    const { stdout, stderr, code } = await new Promise<{ stdout: string; stderr: string; code: number | null }>(
      (resolve, reject) => {
        const child = spawn(cliPath, args, {
          cwd: workDir,
          env: childEnv(),
          // Windows installs `claude` as a .cmd shim, which needs a shell.
          shell: process.platform === "win32",
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
