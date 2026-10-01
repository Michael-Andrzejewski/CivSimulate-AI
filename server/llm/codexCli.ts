/**
 * Codex pathway: runs an OpenAI model through the local `codex` CLI in
 * headless mode (`codex exec`), billed to whatever ChatGPT/Codex account the
 * CLI is logged into. One stateless call per completion, in an empty temp dir
 * with a read-only sandbox, MCP servers and notify hooks switched off, so the
 * model only reads the prompt and replies with text.
 *
 * Codex has no separate system-prompt flag here, so the system prompt is sent
 * as a clearly marked first section of the prompt.
 *
 * Requirements: Codex CLI installed and logged in (`codex` on PATH, or set
 * CODEX_CLI_PATH).
 */
import { spawn } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

export interface CodexCompletionOptions {
  model: string;
  system?: string;
  prompt: string;
  timeoutMs?: number;
  /** Claude-style effort ("low" | "medium" | "high" | "max"); mapped to Codex reasoning effort. */
  effort?: string;
  /** Turn on Codex's live web search tool. Off by default. */
  webSearch?: boolean;
}

const DEFAULT_TIMEOUT_MS = 30 * 60 * 1000;

/**
 * The `codex` on PATH (npm) can lag behind the Codex desktop app, and newer
 * models refuse old CLIs. Prefer the newest codex.exe the app has installed.
 */
function findCodexCli(): string {
  if (process.env.CODEX_CLI_PATH) return process.env.CODEX_CLI_PATH;
  const binRoot = process.env.LOCALAPPDATA ? path.join(process.env.LOCALAPPDATA, "OpenAI", "Codex", "bin") : "";
  if (binRoot && fs.existsSync(binRoot)) {
    const found = fs
      .readdirSync(binRoot)
      .map((d) => path.join(binRoot, d, "codex.exe"))
      .filter((p) => fs.existsSync(p))
      .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
    if (found.length) return found[0];
  }
  return "codex";
}

/** Names of MCP servers in the user's Codex config, so each can be switched off for the call. */
function configuredMcpServers(): string[] {
  const home = process.env.CODEX_HOME || path.join(os.homedir(), ".codex");
  const file = path.join(home, "config.toml");
  if (!fs.existsSync(file)) return [];
  const names = new Set<string>();
  for (const m of Array.from(fs.readFileSync(file, "utf-8").matchAll(/^\[mcp_servers\.("?)([^\]."]+)\1[\].]/gm))) names.add(m[2]);
  return Array.from(names);
}

function reasoningEffort(effort?: string): string {
  if (effort === "max") return "xhigh";
  if (effort === "low" || effort === "medium" || effort === "high") return effort;
  return "high";
}

export async function codexCliComplete(opts: CodexCompletionOptions): Promise<{ text: string }> {
  const workDir = fs.mkdtempSync(path.join(os.tmpdir(), "civsim-codex-"));
  const outFile = path.join(workDir, "reply.txt");
  const args = [
    // --search is a top-level flag, so it goes before the subcommand.
    ...(opts.webSearch ? ["--search"] : []),
    "exec",
    "--model", opts.model,
    "--sandbox", "read-only",
    "--skip-git-repo-check",
    "--color", "never",
    "-C", workDir,
    "-o", outFile,
    "-c", `model_reasoning_effort="${reasoningEffort(opts.effort)}"`,
    "-c", "notify=[]",
    ...configuredMcpServers().flatMap((name) => ["-c", `mcp_servers.${name}.enabled=false`]),
    "-",
  ];
  const input = opts.system
    ? `SYSTEM INSTRUCTIONS (follow these for the whole reply):\n\n${opts.system}\n\n=====\n\n${opts.prompt}`
    : opts.prompt;

  const cliPath = findCodexCli();
  const timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  try {
    const { stdout, stderr, code } = await new Promise<{ stdout: string; stderr: string; code: number | null }>(
      (resolve, reject) => {
        const child = spawn(cliPath, args, {
          cwd: workDir,
          env: process.env,
          // A bare `codex` on Windows is an npm .cmd shim, which needs a shell; a full .exe path does not.
          shell: process.platform === "win32" && !cliPath.toLowerCase().endsWith(".exe"),
        });
        let stdout = "";
        let stderr = "";
        const timer = setTimeout(() => {
          child.kill("SIGKILL");
          reject(new Error(`codex CLI timed out after ${Math.round(timeoutMs / 60000)} min`));
        }, timeoutMs);
        child.stdout.on("data", (d) => (stdout += d));
        child.stderr.on("data", (d) => (stderr += d));
        child.on("error", (err) => {
          clearTimeout(timer);
          reject(new Error(`Could not start the codex CLI (${cliPath}): ${err.message}. Install Codex and log in, or set CODEX_CLI_PATH.`));
        });
        child.on("close", (code) => {
          clearTimeout(timer);
          resolve({ stdout, stderr, code });
        });
        child.stdin.end(input, "utf-8");
      },
    );

    if (process.env.CODEX_CLI_DEBUG === "1") console.error(stderr);
    const text = fs.existsSync(outFile) ? fs.readFileSync(outFile, "utf-8").trim() : "";
    if (!text) {
      // The decisive line ("Error: ... Input exceeds the maximum length") can sit far from the end
      // of a long transcript, so surface any error lines before the tail.
      const all = `${stderr}\n${stdout}`;
      const errorLines = all
        .split("\n")
        .filter((l) => /\berror\b|exceeds|too large|too long|limit/i.test(l))
        .slice(-5)
        .map((l) => l.trim().slice(0, 400))
        .join(" | ");
      throw new Error(`codex CLI exited ${code} with no reply. ${errorLines ? `Errors: ${errorLines}. ` : ""}Tail: ${all.trim().slice(-600)}`);
    }
    return { text };
  } finally {
    fs.rmSync(workDir, { recursive: true, force: true });
  }
}
