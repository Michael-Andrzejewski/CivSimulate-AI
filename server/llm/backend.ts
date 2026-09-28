/**
 * Chooses how Anthropic models are reached:
 *   LLM_BACKEND=api          → Anthropic API (needs ANTHROPIC_API_KEY)
 *   LLM_BACKEND=subscription → local `claude` CLI, billed to your Claude subscription
 *   LLM_BACKEND=auto (default) → api if ANTHROPIC_API_KEY is set, else subscription
 */
export type LlmBackend = "api" | "subscription";

export function resolveBackend(override?: string): LlmBackend {
  const raw = (override || process.env.LLM_BACKEND || "auto").toLowerCase();
  if (raw === "api") return "api";
  if (raw === "subscription" || raw === "cli") return "subscription";
  return process.env.ANTHROPIC_API_KEY ? "api" : "subscription";
}
