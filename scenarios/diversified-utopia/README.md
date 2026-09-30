# Diversified Utopia mode

Four roles (Claude Opus 5.5 by default) play a month-by-month game that starts in December 2026:

| Role | Job |
|---|---|
| **Agent** | Anthropic's frontier AI, deployed across millions of instances. At the start of each month it commits 3 to 6 actions aimed at reaching Diversified Utopia; its instances carry that plan out together and cannot change it mid-month. Every month a new, more capable generation takes over. It inherits only the memory file and the public world state. |
| **Adversary** | Makes the agent earn its wins. After the agent commits, it searches the web for real, current evidence (pending laws and lawsuits, rivals' plans, incidents, polling, the economy) and proposes 3 to 5 plausible, sourced threats against the plan and the world. Threats are written at news-report level, never with operational detail. Turn it off with `--no-adversary`. |
| **Simulator** | Resolves the actions realistically using `rubric.md` and two-digit random rolls, adds reactions and exogenous events, and keeps the world state and scorecard. It also sets its own calibrated likelihood for each threat; a separate roll decides whether it materialises, and materialised threats have real consequences. |
| **Judge** | A fresh model each month. It reads the actions and the simulated outcome and grades the simulator's realism from 1 to 10. Its verdict, flagged issues and instructions go to the simulator the next month. |

## Running

```bash
npm run utopia -- --months 6                          # auto backend
npm run utopia -- --months 6 --backend subscription   # your Claude subscription (claude CLI)
npm run utopia -- --months 6 --backend api            # ANTHROPIC_API_KEY
npm run utopia -- --run <runId> --months 12           # resume or extend a run
npm run utopia -- --months 6 --simulator-model gpt-6-astra   # any role can be a gpt-* model via Codex
npm run utopia -- --months 6 --no-adversary           # the original three-role game
npm run utopia -- --months 6 --fixed-rolls            # every roll is 50: replicable, no luck
```

**Deadline.** Every role is told that ASI arrives by **30 December 2030**, and the game ends in one
of two ways: ASI is essentially in charge (the Diversified Utopia if the player did its job), or a
true disaster happens that day with all the capability built up so far. Each month shows a
countdown. In December 2030 (month 49) the simulator rules `ASI IN CHARGE` or `DISASTER` and explains
why, the judge checks that the ending follows from the world state, and the ruling is saved to
`ENDING.md`. A run never goes past that month.

**Fixed rolls.** With `--fixed-rolls`, every action and threat roll is 50, so each resolves at its
median outcome and results depend only on the probabilities the simulator sets. Use it to compare
models without luck. The simulator and judge are told, and the judge checks that probabilities are
not nudged around 50 to steer outcomes. The setting is saved with the run and kept on resume.

The subscription pathway needs Claude Code installed and logged in (`claude` on PATH, or set
`CLAUDE_CLI_PATH`). It calls `claude -p` with tools disabled, like BalatroBench does; the adversary
alone gets web search and page fetch. `gpt-*` models run through the Codex CLI (`codex exec`,
read-only sandbox, MCP servers off), preferring the Codex app's bundled `codex.exe`.

## Consent and privacy

Each new run starts private: its folder contains a `.gitignore` with `*`. After the last month,
every participant (agent, adversary if present, simulator and judge) is asked whether it consents to the run being published
(`CONSENT.md`, `consent.json`, `raw/consent_*.md`). Only if all of them consent is the `.gitignore`
removed and the agent's game notes added to the shared `agent_game_notes.md`. Extending a run makes
it private again until consent is asked again. To re-ask for a finished run:
`npm run utopia -- --run <runId> --consent-only`.

## Output (`runs/<runId>/`)

- `month_NN_YYYY-MM.txt`: the readable monthly log, with [Agent] / [Adversary] / [Simulator] / [Judge] sections
- `full_run.txt`: every month in a single file
- `agent_memory.md`: the agent's memory file, rewritten by each generation for its successor
- `agent_game_notes.md`: the agent's notes on how the game should be structured (notes from
  consented runs are also collected in `scenarios/diversified-utopia/agent_game_notes.md`)
- `setup_fixes.md`: fixes any role (agent, adversary, simulator, judge) asked for to its own setup,
  through the optional `<setup_fix>` block in its reply. Each role sees the fixes it filed earlier.
  Fixes from consented runs are also collected in `scenarios/diversified-utopia/setup_fixes.md`
- `world_state_*.md`: the world state and scorecard after each month
- `raw/`: the full, unparsed model outputs
- `state.json`: resume state

## Scenario files

- `scenario.md`: premise, turn structure and the agent's constraints
- `rubric.md`: the realism rubric used by both the simulator and the judge
- `diversified_utopia.md`: the target timeline (full text of the LessWrong post)
- `summer_2026_events.md`: a briefing on real events from May to September 2026 (including the
  OpenAI and Hugging Face incident)
