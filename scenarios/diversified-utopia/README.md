# Diversified Utopia mode

Four roles (Claude Opus 5.5 by default) play a month-by-month game that starts in December 2026:

| Role | Job |
|---|---|
| **Agent** | Anthropic's frontier AI, deployed across millions of instances. At the start of each month it commits 3 to 6 actions aimed at reaching Diversified Utopia; its instances carry that plan out together and cannot change it mid-month. Every month a new, more capable generation takes over. It inherits only the memory file and the public world state. |
| **Adversary** | Makes the agent earn its wins. After the agent commits, it searches the web for real, current evidence (pending laws and lawsuits, rivals' plans, incidents, polling, the economy) and proposes 3 to 5 plausible, sourced threats against the plan and the world. Threats are written at news-report level, never with operational detail. Turn it off with `--no-adversary`. |
| **Simulator** | Works in two messages each month. In the first it games out each action and threat and sets its odds (P(failure) per action, its own calibrated P(materialises) per threat) before any dice exist. The runner then rolls 00 to 99 for each and resolves them by fixed rules (fails if roll < P(failure); materialises if roll < P). In the second message it receives those results and simulates the month definitively, using `rubric.md`: outcomes, reactions, exogenous events, the world state and the scorecard. |
| **Judge** | A fresh model each month. It reads the actions, both simulator messages and the rolls, grades the simulator's realism from 1 to 10, and says whether it was TOO LENIENT (things went better for the player than they should), TOO HARSH, or BALANCED. Its verdict, flagged issues and instructions go to the simulator the next month. |

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

**Resuming.** Every run is checkpointed after each step, including the rolls themselves, so a run
that stops (a usage limit, an outage, Ctrl+C) resumes exactly where it left off: no role is asked
again, nothing is re-rolled and nothing is written twice. By default a failed run resumes itself
after waits of 2, 5, 10 and 20 minutes, then six of 30 and six of 60 (about 9.5 hours in all); pass
`--no-auto-resume` to stop at the first failure. To resume by hand, run the same command with
`--run <runId>`.

**Deadline.** Every role is told that ASI arrives by **30 December 2030**, built on all the
capability accumulated by then, and that from then on neither humanity nor the agent has any control
or leverage. Each month shows a countdown, and November 2030 is the agent's last move. In December
2030 (month 49) the agent has no say and only watches, and there are no adversary threats. The
simulator's first message games out three outcomes and sets their odds from everything built so far:
`ALIGNED` (aligned ASI), `MISALIGNED` (misaligned ASI) and `DISASTER` (an AI-related catastrophe
that is not mainly ASI's own misalignment). An automated roll picks one, and the second message plays
it out definitively. The judge checks both the calibration of the odds and the final simulation. The
odds, roll, ending and scenario analysis are saved to `ENDING.md`. A run never goes past that month.

**Private commentary.** Each month the agent may add an entry to its private run commentary through
the `<run_commentary>` block; later generations of the agent see it, no other role does. When a run
ends, the agent writes its final commentary, then the adversary, simulator and judge each write
their own view. Each role's file (`commentary/run_commentary_<role>.md`) is seen only by that role
and the human reader. Each role also sees its own commentary when asked for publication consent.

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
- `commentary/run_commentary_<role>.md`: each role's private commentary (see above)
- `ENDING.md`: the simulator's ruling on 30 December 2030, for runs that reach the deadline
- `world_state_*.md`: the world state and scorecard after each month
- `raw/`: the full, unparsed model outputs
- `state.json`: resume state

## Scenario files

- `scenario.md`: premise, turn structure and the agent's constraints
- `rubric.md`: the realism rubric used by both the simulator and the judge
- `diversified_utopia.md`: the target timeline (full text of the LessWrong post)
- `summer_2026_events.md`: a briefing on real events from May to September 2026 (including the
  OpenAI and Hugging Face incident)
