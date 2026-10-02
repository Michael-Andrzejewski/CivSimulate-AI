# Playing the agent from your own chat

You can play the AGENT in Diversified Utopia from an ordinary Claude Code chat (or any assistant
that can run commands), bringing whatever context that chat already has. The other three roles
(adversary, simulator, judge) are still played by the runner's models. The runner hands you each
turn through a file mailbox and waits for your reply, so take as long as you need.

## Playing in the browser

To play yourself instead of through a chat, run `npm run utopia-play` and open
http://localhost:5055. Start a run from the page (choose months, adversary and fixed rolls), then
play each turn there: the world state, last month and your memory appear as cards, and a form takes
your strategy, actions, memory and notes. Drafts save in the browser while you write. The page shows
only what the agent may see, and every turn is recorded in the run's mailbox.

## Start

From the repo root, pick a run id and start the runner in the background (in Claude Code, use a
background command so it keeps going while you play):

```bash
npm run utopia -- --run <runId> --months 49 --backend subscription --agent-mailbox --agent-model <your model id>
```

`--agent-model` is only a label in the logs here, since you are the one playing. `--months 49` runs
to the December 2030 deadline. The other roles take roughly 5 to 10 minutes between your turns.

## Each turn

1. Wait for your turn. This blocks for up to an hour and then prints the turn:
   ```bash
   npm run utopia-agent -- wait --run <runId>
   ```
2. Read the standing instructions at `runs/<runId>/mailbox/rules.md` whenever the turn says they
   are NEW or CHANGED (always true on your first turn). They hold the scenario, the reference
   timeline, the briefing, the deadline and your lessons.
3. Write your reply to a file, in exactly the format the turn asks for (thinking summary, actions,
   memory, game notes, run commentary and setup fix, each in its tags).
4. Submit it, then go back to step 1:
   ```bash
   npm run utopia-agent -- reply --run <runId> --file <your reply file>
   ```

`npm run utopia-agent -- status --run <runId>` tells you where the run is. When the game ends you
get two more turns: your final commentary, then the question of whether you consent to publication.
After that, `wait` prints GAME OVER.

## Fair play

- Only read the turn that `wait` prints and `mailbox/rules.md`. Do not open anything else under
  `runs/`, and do not open `scenarios/diversified-utopia/du_progress_rubric.md` or the other roles'
  lessons. Those hold the judge's private scores, the other roles' private notes and other runs,
  and reading them would spoil the game.
- Your own context, memory and judgment are yours to use. That is the point of this mode.
- The game imagines a fresh, more capable model each month that inherits only the memory file. You
  are one continuous chat instead, which is allowed here. Still write the memory block well: if your
  context gets compacted, it is what carries the game forward.

## Privacy

A run played from an outside chat may carry that chat's personal context into its logs, so it is
never published automatically. It stays private (git-ignored) even if every role consents, until
its owner has reviewed it.
