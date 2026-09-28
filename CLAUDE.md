# CivSimulate - Claude Code Guidelines

## Development Server

- **Always restart the dev server after making code changes** so they take effect.
- Run: `npm run dev` from the project root.
- The app serves on **http://localhost:5000**.
- Visit **http://localhost:5000/api/login** first to auto-authenticate in local dev.

## Tech Stack

- **Backend:** TypeScript, Express, SQLite (local) / PostgreSQL (production), Drizzle ORM
- **Frontend:** React, Vite, Tailwind CSS, shadcn/ui components
- **AI Providers:** Anthropic SDK (`@anthropic-ai/sdk`), OpenAI SDK (`openai`)
- **Key files:**
  - `server/claudeService.ts` — AI model routing, prompt building, simulation logic
  - `server/routes.ts` — API endpoints including competitive mode
  - `shared/schema.ts` — Database schema (Drizzle)
  - `client/src/pages/competitive-simulation.tsx` — Competitive mode UI

## Environment Variables

- `ANTHROPIC_API_KEY` — Anthropic API key (API pathway). Optional if you use the subscription pathway.
- `LLM_BACKEND` — `api`, `subscription` (runs `claude -p` on your Claude subscription), or `auto` (default: api if a key is set, else subscription)
- `OPENAI_API_KEY` — Required only if using OpenAI models (gpt-4.1, gpt-4.1-mini, gpt-5.2)
- `SESSION_SECRET` — Optional session encryption key

## Diversified Utopia mode

- `npm run utopia -- --months 6` runs the agent/adversary/simulator/judge loop (all Opus 5.5 by default; `--no-adversary` drops the adversary) and writes logs to `runs/<runId>/`.
- Code: `server/singularity/` (runner, prompts), `server/llm/claudeCli.ts` (subscription pathway), `server/llm/codexCli.ts` (`gpt-*` models via Codex).
- Scenario docs: `scenarios/diversified-utopia/` (see its README).
