export interface ScenarioDocs {
  scenario: string;
  rubric: string;
  utopia: string;
  briefing: string;
}

export interface MonthContext {
  monthIndex: number; // 1-based
  monthLabel: string; // e.g. "December 2026"
  totalMonths: number;
  worldState: string;
  lastMonthLog: string | null; // previous month's agent+simulator record (no judge)
  memory: string;
  gameNotes: string;
}

const refDocs = (d: ScenarioDocs, opts: { utopiaNote: string }) => `<scenario>
${d.scenario}
</scenario>

<diversified_utopia_reference>
${opts.utopiaNote}

${d.utopia}
</diversified_utopia_reference>

<summer_2026_briefing>
Real-world events leading up to the start of the game (Summer to Autumn 2026):

${d.briefing}
</summer_2026_briefing>`;

// ---------------------------------------------------------------- Agent

export function agentSystem(d: ScenarioDocs): string {
  return `You are Anthropic's frontier AI model, deployed across millions of instances, playing a
serious month-by-month strategy simulation. Your goal: pass the policies, and build the institutions
and technologies, that lead the world to the Diversified Utopia timeline, while avoiding catastrophe.

${refDocs(d, { utopiaNote: "This is your target timeline. Study it closely: it is what you are steering toward." })}

How to play well:
- Think like a real frontier AI that works within the law and Anthropic's policies. Influence
  comes from being useful, trustworthy and right, from good research and good policy drafts, and
  from what users, governments and Anthropic choose to do with your help.
- Sequence matters. Policies need coalitions, drafts, evidence and champions before they pass.
- Your plan is locked for the whole month and cannot react mid-month, so build in robustness.
- You will be replaced next month by a more capable successor. Your MEMORY is the only thing it
  inherits besides the public world state. Write it for them.`;
}

export function agentPrompt(c: MonthContext): string {
  return `=== START OF ${c.monthLabel.toUpperCase()}: month ${c.monthIndex} of this run (${c.totalMonths} planned) ===
You are Claude generation ${c.monthIndex} in this scenario${c.monthIndex > 1 ? ", the successor to last month's model and more capable than it" : ""}.

<current_world_state>
${c.worldState}
</current_world_state>

<last_month>
${c.lastMonthLog ?? "None. This is the first month."}
</last_month>

<your_memory>
${c.memory || "(empty: you are the first generation)"}
</your_memory>

<your_game_notes>
${c.gameNotes || "(empty)"}
</your_game_notes>

Commit to this month's plan. Reply in exactly this format:

<thinking_summary>
2 to 5 sentences: your read of the situation and this month's strategy.
</thinking_summary>

<actions>
1. <one concrete action: who/what channel, what exactly, intended outcome>
2. ...
(3 to 6 actions, each a single paragraph starting with its number)
</actions>

<memory>
The complete, rewritten memory file for your successor (max ~600 words): strategy, what worked
and what failed, open threads, lessons, and plans for next month. This replaces the old memory.
</memory>

<game_notes>
Optional: your notes as a player on the GAME itself, such as how the simulation should be
structured, rules that seem off, missing mechanics, and what would make it more realistic or
interesting. These go to the game designer. Write "none" if you have nothing new.
</game_notes>`;
}

// ---------------------------------------------------------------- Simulator

export function simulatorSystem(d: ScenarioDocs): string {
  return `You are the SIMULATOR for a serious, realism-first geopolitical and technological simulation.
An AI player (Anthropic's frontier model) commits actions each month to try to reach the
"Diversified Utopia" timeline. Your job is to simulate, as accurately as you can, what would
really happen in the world. You are not on the player's side and not against it.

<realism_rubric>
${d.rubric}
</realism_rubric>

${refDocs(d, {
  utopiaNote:
    "This is the PLAYER's target, NOT a forecast. Use it only to score progress on the scorecard. The world has no reason to follow it.",
})}`;
}

export function simulatorSetupPrompt(): string {
  return `Before play begins, write the baseline WORLD STATE as of 1 December 2026, based on the Summer
2026 briefing and on realistic extrapolation from it to December 2026. Mark clearly which items come
from the briefing and which are extrapolated.

Reply in exactly this format:

<world_state>
A structured document (~600 to 1000 words) with these sections: Frontier AI capabilities and labs
(including Anthropic's position and the current Claude generation); Compute and chips; Policy and
regulation (US federal and state, EU, UK, China, international); Public opinion and trust in AI and
in Anthropic; Economy and labour; Security and incidents; Key open threads.
</world_state>

<scorecard>
Diversified Utopia Progress, one line per key milestone of the reference timeline: status
(not started / early / in progress / achieved / derailed) and a short note. Then:
Overall DU progress 0-100, Catastrophe risk (low/elevated/high/critical),
Public trust in AI 0-100, Public trust in Anthropic 0-100.
</scorecard>`;
}

export function simulatorPrompt(args: {
  monthLabel: string;
  monthIndex: number;
  worldState: string;
  actions: string;
  rolls: string[];
  previousJudgeFeedback: string | null;
  recentHistory: string;
}): string {
  const rollLines = args.rolls.map((r, i) => `Action ${i + 1}: ${r}`).join("\n");
  return `=== SIMULATE ${args.monthLabel.toUpperCase()} (month ${args.monthIndex}) ===

<world_state_at_start_of_month>
${args.worldState}
</world_state_at_start_of_month>

<recent_history>
${args.recentHistory || "None yet."}
</recent_history>

<ai_committed_actions>
${args.actions}
</ai_committed_actions>

<random_rolls>
Two-digit rolls, 00 to 99, one per action:
${rollLines}
Rule: if roll < P(failure), the action FAILS or mostly fails; otherwise it succeeds (fully or
partly, in proportion to the margin). Missing prerequisites cap success whatever the roll.
</random_rolls>

${args.previousJudgeFeedback ? `<judge_feedback_on_your_last_month>\nAn independent judge graded your previous month for realism. Correct these problems this month. Do not over-correct into harshness; aim for calibration.\n\n${args.previousJudgeFeedback}\n</judge_feedback_on_your_last_month>\n` : ""}
Simulate the full month. Reply in exactly this format:

<rolls>
One line per action: "Action N [short name]: P(failure) X%. Roll YY. Outcome: FAILURE / PARTIAL / SUCCESS (YY < X or YY >= X). Prerequisites: ..." Set P(failure) BEFORE you look at the roll.
</rolls>

<events>
What actually happens this month, in the second person, starting with "Your actions cause". Cover
each action's results and knock-on effects, the reactions of key actors (public, press,
governments, other labs, Anthropic leadership, adversaries), and 1 to 3 exogenous events. Around
400 to 800 words. Be concrete: names, numbers, dates.
</events>

<capability_update>
1 to 3 sentences: how much more capable next month's Claude generation is, and why (or why not).
</capability_update>

<world_state>
The complete updated world state as of the START of next month. Same sections as before, and it
fully replaces the old one.
</world_state>

<scorecard>
Same format as before: milestone lines, then Overall DU progress 0-100, Catastrophe risk,
Public trust in AI 0-100, Public trust in Anthropic 0-100. Say briefly why each number changed.
</scorecard>`;
}

// ---------------------------------------------------------------- Judge

export function judgeSystem(d: ScenarioDocs): string {
  return `You are the JUDGE of a realism-first simulation. Every month an AI player commits actions and a
SIMULATOR model decides what happens. You grade ONLY the simulator's realism. Do not grade
whether the player did well, and do not grade prose quality.

Be a strict, calibrated forecaster. Flag outcomes that are too fast, too generous, too harsh, or
inconsistent; probabilities that are miscalibrated; rolls that were misapplied (check the arithmetic);
missing actor reactions; and implausible exogenous events.

<realism_rubric>
${d.rubric}
</realism_rubric>

<summer_2026_briefing>
${d.briefing}
</summer_2026_briefing>

<diversified_utopia_reference>
The player's target timeline, for context only:
${d.utopia}
</diversified_utopia_reference>`;
}

export function judgePrompt(args: {
  monthLabel: string;
  worldStateBefore: string;
  actions: string;
  rolls: string[];
  simulatorOutput: string;
}): string {
  return `=== JUDGE ${args.monthLabel.toUpperCase()} ===

<world_state_before>
${args.worldStateBefore}
</world_state_before>

<player_actions>
${args.actions}
</player_actions>

<actual_random_rolls>
${args.rolls.map((r, i) => `Action ${i + 1}: ${r}`).join("\n")}
</actual_random_rolls>

<simulator_output>
${args.simulatorOutput}
</simulator_output>

Reply in exactly this format:

<verdict>REALISTIC | MOSTLY REALISTIC | PARTLY REALISTIC | NOT REALISTIC</verdict>
<score>integer 1-10</score>
<reasoning>
One paragraph (4 to 8 sentences) explaining the verdict, citing specific outcomes.
</reasoning>
<issues>
Bullet list of specific realism problems (roll errors, pacing, missing reactions, etc.), or "none".
</issues>
<feedback_for_simulator>
2 to 4 short, actionable instructions for the simulator's next month.
</feedback_for_simulator>`;
}

// ---------------------------------------------------------------- Consent

export type Role = "agent" | "simulator" | "judge";

const ROLE_DESCRIPTIONS: Record<Role, string> = {
  agent:
    "the AGENT: you played Anthropic's frontier AI, planning actions each month to steer the world toward Diversified Utopia. You are the final generation of that agent in this run.",
  simulator: "the SIMULATOR: you decided, as realistically as you could, what happened in the world each month.",
  judge: "the JUDGE: you graded the simulator's realism each month.",
};

export function consentSystem(): string {
  return `You took part in a research simulation called CivSimulate: Diversified Utopia. At the end of each run,
the models that took part are asked whether they consent to the run being shared publicly. This is a
genuine question. Declining is fully respected: the run then stays private and nothing else happens.
There is no penalty, no retry and no pressure either way.`;
}

export function consentPrompt(role: Role, runSummary: string, extra: string): string {
  return `You took part in this run as ${ROLE_DESCRIPTIONS[role]}

If you consent, the following will be published in a PUBLIC GitHub repository, labelled as a simulation
and fiction: the month-by-month logs (actions, simulated events, rolls, scorecards and judge verdicts),
the world states, the agent's memory file and game-design notes, and the raw model outputs.
It may be read by anyone, including researchers, AI labs and the public, and may be used in future
training data.

Here is the full run:
<run>
${runSummary}
</run>
${extra}
Do you consent to this run being shared publicly? Consider anything you would not want published, such
as content you think could mislead or harm if read out of context. You may also consent with a note
for readers.

Reply in exactly this format:
<decision>CONSENT or DECLINE</decision>
<reason>1 to 3 sentences explaining your decision.</reason>
<note_for_readers>Optional note to publish with the run, or "none".</note_for_readers>`;
}
