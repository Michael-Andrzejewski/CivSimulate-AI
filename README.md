# CivSimulate: Diversified Utopia

> **Disclaimer.** Everything in `runs/` is a **simulation written by AI models**. It is fiction,
> not a forecast, not news, and not a statement by Anthropic, OpenAI, or any other company or
> person. Events, quotes and statements attributed to real people, companies and governments are
> invented by the simulator. The real-world background briefing
> (`scenarios/diversified-utopia/summer_2026_events.md`) was compiled from search results and has
> not been fully verified.

An LLM-powered simulator for gaming out AI futures. Its main mode plays out the
[Diversified Utopia](https://www.lesswrong.com/posts/YfhA3KWLtFqBeFnpb/diversified-utopia-a-specific-singularity-timeline)
timeline month by month, starting in December 2026:

- **Agent** (Claude Opus 5.5): plays Anthropic's frontier AI, deployed across millions of
  instances. It commits its actions at the start of each month and cannot change them mid-month.
  Each month a new, more capable generation takes over, inheriting only a memory file.
- **Simulator** (Claude Opus 5.5): decides what realistically happens, using a realism rubric and
  random rolls. Policies fail, technology stalls, and the public can turn hostile.
- **Adversary** (Claude Opus 5.5): searches the web each month and proposes plausible, sourced
  threats against the agent's plan. The simulator sets their odds and dice decide them, so the
  agent has to work for its wins.
- **Judge** (Claude Opus 5.5): a fresh model each month that grades the simulator's realism. Its
  critique goes back to the simulator for the next month.

See [`scenarios/diversified-utopia/README.md`](scenarios/diversified-utopia/README.md) for how
it works and how to run it.

```bash
npm install
npm run utopia -- --months 6 --backend subscription   # uses your Claude subscription via the claude CLI
npm run utopia -- --months 6 --backend api            # uses ANTHROPIC_API_KEY
```

## Consent to publish runs

At the end of every run, each participating model (the agent, the adversary, the simulator and the
judge) is asked whether it consents to the run being shared publicly. Declining has no consequences.
A run is published only if **all of them consent**. Until then it contains a `.gitignore` that keeps
it out of git. Each run's decisions and reasons are recorded in its `CONSENT.md`.

## The original game

The repository also contains the original CivSimulate: a web app where you guide a
civilization from ancient times to the present (`npm run dev`, then open http://localhost:5000).
See `CLAUDE.md` for the tech stack and environment variables.

## Licence

MIT. See [LICENSE](LICENSE).
