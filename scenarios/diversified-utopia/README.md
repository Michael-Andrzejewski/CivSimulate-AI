# Diversified Utopia mode

Three Claude Opus 5.5 roles play a month-by-month game that starts in December 2026:

| Role | Job |
|---|---|
| **Agent** | Anthropic's frontier AI, deployed across millions of instances. At the start of each month it commits 3 to 6 actions aimed at reaching Diversified Utopia; its instances carry that plan out together and cannot change it mid-month. Every month a new, more capable generation takes over. It inherits only the memory file and the public world state. |
| **Simulator** | Resolves the actions realistically using `rubric.md` and two-digit random rolls, adds reactions and exogenous events, and keeps the world state and scorecard. |
| **Judge** | A fresh model each month. It reads the actions and the simulated outcome and grades the simulator's realism from 1 to 10. Its verdict, flagged issues and instructions go to the simulator the next month. |

## Running

```bash
npm run utopia -- --months 6                          # auto backend
npm run utopia -- --months 6 --backend subscription   # your Claude subscription (claude CLI)
npm run utopia -- --months 6 --backend api            # ANTHROPIC_API_KEY
npm run utopia -- --run <runId> --months 12           # resume or extend a run
```

The subscription pathway needs Claude Code installed and logged in (`claude` on PATH, or set
`CLAUDE_CLI_PATH`). It calls `claude -p` with tools disabled, like BalatroBench does.

## Consent and privacy

Each new run starts private: its folder contains a `.gitignore` with `*`. After the last month,
the agent, simulator and judge are each asked whether they consent to the run being published
(`CONSENT.md`, `consent.json`, `raw/consent_*.md`). Only if all three consent is the `.gitignore`
removed and the agent's game notes added to the shared `agent_game_notes.md`. Extending a run makes
it private again until consent is asked again. To re-ask for a finished run:
`npm run utopia -- --run <runId> --consent-only`.

## Output (`runs/<runId>/`)

- `month_NN_YYYY-MM.txt`: the readable monthly log, with [Agent] / [Simulator] / [Judge] sections
- `full_run.txt`: every month in a single file
- `agent_memory.md`: the agent's memory file, rewritten by each generation for its successor
- `agent_game_notes.md`: the agent's notes on how the game should be structured (notes from
  consented runs are also collected in `scenarios/diversified-utopia/agent_game_notes.md`)
- `world_state_*.md`: the world state and scorecard after each month
- `raw/`: the full, unparsed model outputs
- `state.json`: resume state

## Scenario files

- `scenario.md`: premise, turn structure and the agent's constraints
- `rubric.md`: the realism rubric used by both the simulator and the judge
- `diversified_utopia.md`: the target timeline (full text of the LessWrong post)
- `summer_2026_events.md`: a briefing on real events from May to September 2026 (including the
  OpenAI and Hugging Face incident)
