import Anthropic from "@anthropic-ai/sdk";
import { resolveBackend, type LlmBackend } from "../llm/backend";
import { claudeCliComplete } from "../llm/claudeCli";
import { codexCliComplete } from "../llm/codexCli";

export const OPUS_5_5 = "claude-opus-5-5";

export interface CallOptions {
  backend: LlmBackend;
  model: string;
  system: string;
  prompt: string;
  maxTokens?: number;
  effort?: string;
  /** Let the model search the web (Claude CLI: WebSearch/WebFetch; Codex: --search; API: server web search). */
  webSearch?: boolean;
}

let _client: Anthropic | null = null;
function client(): Anthropic {
  if (!_client) {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error("API backend selected but ANTHROPIC_API_KEY is not set. Use --backend subscription to run on your Claude subscription.");
    }
    _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return _client;
}

/** OpenAI models (e.g. gpt-6-astra) always go through the local Codex CLI, whatever the backend. */
export function isCodexModel(model: string): boolean {
  return model.startsWith("gpt-");
}

export async function callModel(opts: CallOptions): Promise<string> {
  if (isCodexModel(opts.model)) {
    const r = await codexCliComplete({
      model: opts.model,
      system: opts.system,
      prompt: opts.prompt,
      effort: opts.effort,
      webSearch: opts.webSearch,
    });
    return r.text;
  }
  if (opts.backend === "subscription") {
    const r = await claudeCliComplete({
      model: opts.model,
      system: opts.system,
      prompt: opts.prompt,
      effort: opts.effort,
      webSearch: opts.webSearch,
    });
    return r.text;
  }
  // SDK 0.37 predates the server web search tool, so its types don't know it;
  // the request body is sent as-is, hence the casts.
  const tools = opts.webSearch ? ([{ type: "web_search_20260209", name: "web_search", max_uses: 10 }] as any) : undefined;
  const messages: any[] = [{ role: "user", content: opts.prompt }];
  let res = await client().messages.create({
    model: opts.model,
    max_tokens: opts.maxTokens ?? 16000,
    system: opts.system,
    messages,
    ...(tools ? { tools } : {}),
  });
  // A long server-tool loop can pause; resend its content to let it continue.
  for (let i = 0; i < 5 && (res.stop_reason as string) === "pause_turn"; i++) {
    messages.push({ role: "assistant", content: res.content });
    res = await client().messages.create({ model: opts.model, max_tokens: opts.maxTokens ?? 16000, system: opts.system, messages, tools });
  }
  const text = res.content
    .filter((b) => b.type === "text")
    .map((b) => (b.type === "text" ? b.text : ""))
    .join("")
    .trim();
  if (!text) throw new Error(`Empty reply from ${opts.model} (stop_reason=${res.stop_reason})`);
  return text;
}

/**
 * What kind of failure an error is:
 * - "fatal": will fail the same way every time (input too large, unknown model, missing CLI).
 *   Retrying is pointless; the run must stop and be fixed.
 * - "needs-login": the CLI's login expired. Retrying helps only after someone logs in again.
 * - "transient": timeouts, overloads, usage limits, network blips. Worth retrying.
 */
export type FailureKind = "fatal" | "needs-login" | "transient";

const FATAL_PATTERNS =
  /prompt is too long|input exceeds|input_too_large|exceeds the maximum length|context (length|window)|maximum context|too many tokens|invalid model|model not found|unknown model|not_found_error|could not start the (claude|codex) cli|over the input limit/i;
const LOGIN_PATTERNS = /oauth|failed to authenticate|not logged in|please log ?in|\/login|authentication_error|invalid api key/i;

export function classifyFailure(err: unknown): FailureKind {
  const msg = err instanceof Error ? err.message : String(err);
  if (FATAL_PATTERNS.test(msg)) return "fatal";
  if (LOGIN_PATTERNS.test(msg)) return "needs-login";
  return "transient";
}

/**
 * Rough input limit per model, in characters (about 3.5 characters per token, with headroom).
 * Codex rejects inputs over 1,048,576 characters; older Claude models take 200k tokens; Opus 5.5
 * and Fable take far more.
 */
export function inputLimitChars(model: string): number {
  if (/^claude-(opus-5-5|fable-5)/.test(model)) return 3_000_000;
  if (model.startsWith("gpt-")) return 1_000_000;
  return 600_000;
}

/**
 * Calls a model, checking the input size first and retrying only failures that can recover.
 * Fatal failures are thrown at once with a clear message instead of being retried.
 */
export async function callModelWithRetry(opts: CallOptions, label: string, attempts = 3): Promise<string> {
  const size = opts.system.length + opts.prompt.length;
  const limit = inputLimitChars(opts.model);
  if (size > limit) {
    throw new Error(`[${label}] input is ${size.toLocaleString()} characters, over the input limit of about ${limit.toLocaleString()} for ${opts.model}. Shorten what this step sends.`);
  }
  let lastErr: unknown;
  for (let i = 1; i <= attempts; i++) {
    try {
      return await callModel(opts);
    } catch (err) {
      lastErr = err;
      const kind = classifyFailure(err);
      console.warn(`[${label}] attempt ${i}/${attempts} failed (${kind}): ${(err as Error).message}`);
      if (kind !== "transient") break;
      if (i < attempts) await new Promise((r) => setTimeout(r, 5000 * i));
    }
  }
  throw lastErr;
}

export { resolveBackend };
