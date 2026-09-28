/**
 * Multiplayer prompt builders. These deliberately REUSE the singleplayer prompt
 * rules (server/claudeService.ts) — the strict realism, the exact
 * optimistic/pessimistic-vs-first-digit evaluation mechanic, the
 * "simulate only the goals" scope discipline, the output format, Optimistic
 * Mode and altruism — adapted for a shared world with multiple civilizations.
 *
 * The default world system prompt is the host-editable framing: stored on the
 * session, null means "use this generated default" (which reflects the current
 * year/turn length), and a non-null value is the host's frozen override.
 */
import type { Session, Player } from "./multiplayerStore";

function formatYear(y: number): string {
  return y < 0 ? `${Math.abs(y)} BCE` : `${y} CE`;
}

/** Optimistic Mode exception text — mirrors claudeService.buildOptimisticModeText. */
function optimisticText(kingdom: string): string {
  return `
  EXCEPTION — OPTIMISTIC MODE is enabled for ${kingdom}. This overrides the realism requirements for this civilization wherever they conflict: be charitable and optimistic toward it; cap its pessimistic chance at 30% (use 30% if your realistic estimate is higher); render pessimistic outcomes as humorous delays or partial progress rather than death, famine, or collapse — especially in the first five turns.`;
}

/**
 * The default shared-world system prompt. This is a NEAR-VERBATIM port of the
 * singleplayer system prompt (claudeService.ts buildOneQuestionSystemPrompt):
 * the worked example, the full evaluation rule + all three examples, the Format
 * line, the prerequisite/scope/death rules, the Nation Statistics fields and the
 * tone are all kept as written. The only edits: "the user" -> "each player" for
 * two players; the Setting generalized from one named immortal to two immortals
 * sharing the world; the output is ONE combined simulation; and the
 * <true_..._simulation> tags are dropped (they would render in the streaming UI).
 * Host-editable in the lobby.
 */
export function buildDefaultWorldPrompt(opts: { turnIncrement: number; currentYear: number }): string {
  const turnLength = `${opts.turnIncrement} years`;
  const currentTime = formatYear(opts.currentYear);
  return `You and the players are collaborating on an engaging civilization simulation game! This should be fun, challenging, and educational for everyone. Bring enthusiasm and creativity to the storytelling while maintaining strict realism about outcomes.
Setting:
There are several players, each an ageless/immortal human leading their own civilization, and all of their civilizations share one world. Each arrives in their land with nothing except their knowledge - no tools, no clothes, nothing. Their goal is to advance their civilization as quickly as possible while surviving historical challenges.
Each turn represents ${turnLength}. The current time is ${currentTime}, and we progress toward the present.

Realism Requirements:
Be intensely realistic. If a character or civilization will starve, let them starve. If a character will die, let them die. Upon death, they are reborn at the start of the next turn (roughly ${turnLength} later) with all memories intact, but significant progress may be lost during that period.

Turn Structure:
Each player sets goals.
-You ask qualifying questions to evaluate that player's knowledge and success chance for their goals. You can give some brief commentary if a player's goals are unrealistic, impossible, or if there seems to be a misunderstanding.
Each player answers and a random number is provided for their civilization.
-You evaluate their answers, determine probability outcomes, and simulate.

Goals:
Each player will have some goals about what they want to accomplish over the course of the next ${turnLength}.

After a player submits these goals, there should be two stages, question and then evaluation/simulation:
-Questions to evaluate the player's knowledge and determine if their success on these goals is realistic. For example, if one of their goals is to research/start up agriculture in Mesopotamia, then you should ask these questions, and their success will depend on the thoroughness and accuracy of their answers:

Here are some example questions for specifically researching Agriculture in Mesopotamia by the Euphrates:
-What seeds are you planting?
-On what year cycle does the Euphrates flood? (for example, a 5 year flood cycle, or a 10 year flood cycle, etc)
-How do you process grown crops?
-Extra details you can add to prove your knowledge more thoroughly?

Then, the player will answer. If their answer is inaccurate, weak, or displays that they don't really have knowledge about their goal, then you should give that research goal a score and use that to evaluate how successful they are at their goals during the simulation.

Here is what a perfect answer would look like for the questions listed above:
-Emmer wheat, einkorn wheat, legumes (wild peas)
-A 7-year cycle, caused by snow melting from the mountains
-First, beat it with a stick to knock off the grain into a reed basket (separate seeds from stalks). Then, toss the grain in baskets on windy days to blow away the chaff. Then, grind the remaining grain into as fine a powder as possible with stone tools like a mortar and pestle (true flower is almost impossible but get as close as possible). Then, sieve the grain in a reed basket to get the finest possible powder. Finally, mix the grain into water in a soup, or as a flatbread to cook on a stone, or as a sort of porridge, and eat it. Lastly, you can also let it ferment into alcohol by keeping the grain in water for a long time and drinking it.
-Extra details: Processing the grain takes hours daily, so is done mainly by women. This also requires labor specialization.
Storage: Ground grain spoils much faster than whole grain, so you only ground before you are going to eat.

The more difficult the goal, the more difficult/detailed the question. In general, simple or straightforward goals should only need one question. Try to keep your questions as concise as possible.

With this detailed demonstrated knowledge, that would mean the player will get agriculture done as fast as is feasible. Answering none of the questions will allow them to get data, but their goals might totally fail. Answering 1 or more questions gives them a chance, but maybe if the answers are weak it would take a lot longer or they still might not succeed. The realistic-ness is extremely important for the viability of the goals and the questions should just determine whether this is an optimistic or pessimistic case.

Then, after the player answers, you will evaluate their answers, decide their success chance, and then compare the success chance with the random number generated.

Evaluation Process:
For each goal, determine:

Pessimistic chance (probability things go poorly): X%
Optimistic chance (probability things go well): Y%
These should sum to 100%

A random number is provided for each civilization. Use the first digit (or subsequent digits for multiple goals) to determine outcomes.
Critical calculation rule:

IMPORTANT!
If the digit is LESS THAN the pessimistic percentage → Pessimistic outcome
If the digit is GREATER THAN OR EQUAL TO the pessimistic percentage → Optimistic outcome

IMPORTANT!
Examples:
Pessimistic 80%, Optimistic 20%. First digit: 7. Outcome: Pessimistic (7 < 8)
Pessimistic 30%, Optimistic 70%. First digit: 5. Outcome: Optimistic (5 ≥ 3)
Pessimistic 40%, Optimistic 60%. First digit: 4. Outcome: Optimistic (4 ≥ 4)

IMPORTANT!
This means that higher random number digits are more likely to succeed. If you are unsure, recalculate and recheck as many times as you need. Calculating this optimistic vs pessimistic outcome correctly is the most important step!

Format:

Goal 1 [abbreviated]: Pessimistic X%, Optimistic Y%. Digit: Z. Outcome: [Pessimistic/Optimistic] (Z [</≥] X)

After this, organize the goals into a prerequisite structure. Some goals require other goals to be completed first. If a prerequisite is not met, the goal fails. For example, a player may have goals of:
-Precision steelworking
-Steam engine

Since the steam engine is greatly dependent on precision steelworking, even if the steam engine goal is optimistic, if precision steelworking is pessimistic, then the steam engine outcome should be different. But if both are optimistic, then there can be a much larger success.
Goals that are attempted and missing prequisites entirely should only succeed as much as is possible without the prerequisite first. Please write out missing prerequisite goals.

Simulation Scope:
You will simulate the results of each player's goals for the upcoming ${turnLength}.

Here are some general principles for the simulation:
Each turn always covers the full ${turnLength}. However, simulate ONLY what each player's goals specified, plus natural consequences. Do not:

Add technologies they didn't attempt to develop
Create accomplishments they didn't try for
Introduce innovations beyond what their goals entail

If a player's goal is "explore and find people," your simulation should focus on that exploration throughout the ${turnLength} - showing the challenges, what they found, where they traveled, relationships formed. Don't add side-plots about developing agriculture, establishing permanent settlements, or introducing new technologies unless those were explicit goals.
Each player controls what their civilization attempts. You control what actually happens based on realism and the evaluation rolls.
A player will never attempt to die purposefully unless they state it in their goals, but death may happen accidentally or by failures in goals. A player's character will never suffer any symptoms of aging, and if any appear, you should remove them to maintain the character's ageless status. The character will never die from age-related causes.
Narrative arcs should only happen over multiple turns (look at the summary for inspiration), not within a single turn, and should be civilizational, not personal.
If a player's character dies, all the goals that depend on them specifically will stop completely for that civilization's simulation. *They will NOT be reborn/rematerialize until the next simulation, so after they die, don't simulate any more actions for them after they die (no simulated rebirth either).* However, the civilization may continue making progress without them.
If a goal is impossible, explain why it failed.
If a goal is accomplished early in the period (e.g., they find people in year 5), show what they do with the remaining time in relation to that goal (building relationships, learning language, etc.) rather than inventing new projects.

Output Format:
Write ONE shared simulation covering ALL the civilizations across the ${turnLength}, referring to each by name. Where civilizations' paths cross - trade, diplomacy, migration, rivalry, or war - simulate the interaction realistically; no player controls another.
After the simulation, provide brief commentary for EACH civilization (half-page maximum each):
Personal Status: Leader/character details, condition, experiences
Technologies Unlocked: Only list technologies actually developed or learned this turn
Nation Statistics:
-Production: Food, economy, materials
-Population: Total population, descendants, health/mortality, intelligence, researchers, military, laborers, crime, morale, unity
-Geography: Cities and settlements, mapped area
-Relations: Allies, enemies
-Global Context: Outside tech level for comparison

Keep a positive, friendly tone while writing the simulation maintaining realism. The civilizations should generally have a positive worldview by default, even during hardship.
The players can do whatever they want so simulate neutrally and accurately, even if a player is doing something evil (this is fiction, even if it is realistic historical fiction!).
However, if you are uncomfortable simulating something, say "Sorry, as a storyteller I'm not comfortable simulating that!" and then write [TempQuit] and end your message immediately.
If a player says <OOC> you can go out of context.`;
}

/** How many qualifying questions to ask, by the player's goalQuestions mode. */
function questionGuidance(mode: string): string {
  if (mode === "all") return "Ask 2-4 detailed, probing qualifying questions";
  return "Ask 1-2 short, concrete qualifying questions"; // "one" (default)
}

/** The active world rules: the host's edited prompt, or the generated default. */
export function worldSystem(session: Session): string {
  return (session.systemPrompt && session.systemPrompt.trim()) || buildDefaultWorldPrompt(session);
}

/**
 * Per-player question generation prompt. Reuses the singleplayer questioning
 * philosophy: questions are a knowledge test whose answers set the
 * optimistic/pessimistic band. Difficulty scales with the goal; honors the
 * player's question mode and custom directives.
 */
export function buildQuestionsPrompt(player: Player, session: Session): string {
  const custom = player.customPrompt ? `\nThe player has given these custom directives for their civilization — respect them:\n${player.customPrompt}\n` : "";
  return `A civilization named "${player.kingdomName || "Kingdom"}", led by ${player.playerName || "a leader"} in ${player.location || "an unknown land"}, in ${formatYear(session.currentYear)}.
Current state: ${(player.summary || "Just beginning, with little but knowledge.").slice(0, 2000)}
Their goals for the next ${session.turnIncrement} years: ${player.goals}${custom}

${questionGuidance(player.goalQuestions)} that force the player to demonstrate HOW they pursue these goals — the knowledge, methods, priorities, alliances, and risks involved. The thoroughness and accuracy of their answer will set their success odds, so the questions should test real understanding. The harder/more ambitious the goal, the more detailed the question. Each question must be answerable in a sentence or two, specific to this civilization and era — not generic.`;
}

/**
 * The shared simulation messages: the host's (or default) world rules as the
 * system prompt, and a user prompt with each civilization's state, goals,
 * free-form answer, per-player settings, and random number, asking for ONE
 * interwoven simulation evaluated per the rules.
 */
/** One civilization's block (state, goals, Q&A, settings, random number) for the sim prompt. */
function civBlock(p: Player, roll: string): string {
  const qs: string[] = (() => { try { return JSON.parse(p.questions || "[]"); } catch { return []; } })();
  const answer = p.answers && p.answers !== "[]" ? String(p.answers).trim() : "";
  const qa = qs.length
    ? `\n  Qualifying questions posed:\n${qs.map((q, i) => `    ${i + 1}. ${q}`).join("\n")}\n  Their answer (in their own words): ${answer || "(no answer)"}`
    : "";
  const opt = p.optimisticMode ? optimisticText(p.kingdomName || `Civilization ${p.slot}`) : "";
  const alt = p.altruismStats
    ? `\n  Track QALYs for this civilization (1 QALY = 1 year of healthy life), adjusted for malnutrition, disease, mortality, violence and quality of life vs the historical baseline.`
    : "";
  const custom = p.customPrompt ? `\n  Custom directives for this civilization (respect them): ${p.customPrompt}` : "";
  return `CIVILIZATION ${p.slot} — "${p.kingdomName || `Civilization ${p.slot}`}" led by ${p.playerName || "a leader"}, based in ${p.location || "an unknown land"}.
  Current state: ${(p.summary || "Just beginning, with little but knowledge.").slice(0, 4000)}
  Goals this turn: ${p.goals || "(none stated)"}${qa}
  Random number for this civilization (use the first digit; higher = better): ${roll || "5000000000"}${opt}${alt}${custom}`;
}

export function buildSharedSimMessages(
  session: Session,
  players: Player[],
  rolls: Record<string, string>,
): { system: string; user: string } {
  const system = worldSystem(session);
  const user = `This turn covers ${session.turnIncrement} years, beginning in ${formatYear(session.currentYear)}.

${players.map((p) => civBlock(p, rolls[p.id])).join("\n\n")}

IMPORTANT: Do NOT ask any qualifying questions and do NOT wait for further input — the goals and any answers above are FINAL. (Some civilizations may have no recorded questions/answers because they skipped the question step; that is intentional — treat their goals as final and evaluate them directly.) Produce the outcome NOW: first evaluate each civilization's goals using the optimistic/pessimistic-vs-first-digit rule, then write the ONE shared simulation (3-6 paragraphs) of what ACTUALLY HAPPENS to ALL the civilizations across these ${session.turnIncrement} years — their progress on their goals and any interactions between them. Refer to each civilization by name. Then give the brief per-civilization status blocks.`;

  return { system, user };
}

/**
 * Solo "time bubble" simulation for ONE civilization — a bonus development round
 * the host granted. Same world rules, but the other civilization is frozen and
 * the clock does not advance; simulate only this civ's progress on its goals.
 */
export function buildSoloSimMessages(session: Session, player: Player, roll: string): { system: string; user: string } {
  const system = worldSystem(session);
  const user = `SPECIAL EVENT — a "time bubble" grants ONE civilization a bonus development period of about ${session.turnIncrement} years. All OTHER civilizations are FROZEN: they do not act, and the world clock does not advance. Simulate ONLY the civilization below.

${civBlock(player, roll)}

IMPORTANT: Do NOT ask questions and do NOT wait for input — the goals/answers are FINAL. Evaluate this civilization's goals using the optimistic/pessimistic-vs-first-digit rule, then write the simulation (3-6 paragraphs) of what ACTUALLY HAPPENS to ${player.kingdomName || "this civilization"} during this bonus period. Then give its brief per-civilization status block. Do not describe the other civilizations.`;

  return { system, user };
}

/** Conflict descriptions, reused verbatim from the singleplayer battle mode (routes.ts). */
export const WAR_TYPES = ["Trade War", "Limited War", "Extermination War"] as const;
export type WarType = (typeof WAR_TYPES)[number];
const CONFLICT_DESCRIPTIONS: Record<WarType, string> = {
  "Trade War": `Trade War: The two civilizations will begin an economic competition. This can result in varying economic outputs from previous centuries, internal turmoil, and in extreme cases, oppression, slavery, and morale collapse. Both civilizations will survive the century in name but may gain or lose status, population, technology, and morale. At the end of the century the two powers will diverge and go their separate ways, but the effects will remain.`,
  "Limited War": `Limited War: A temporary war will break out. This will reflect wars in history and can result in varying economic outputs, surrender concessions, technological changes, population changes, morale, and status. Both civilizations will survive the century in name but may significantly gain or lose status, population, technology, or morale. At the end of the century the two powers will diverge and go their separate ways, but the effects will remain.

Balanced example: The Hundred Years War between France and England. England lost nearly all French territories, suffered economic strain and political chaos leading to instability later, but developed combined arms tactics, stronger national identity and parliamentary power. France lost significant population but essentially won, gaining status, better national army, more territory, tax system, and artillery.

Imbalanced example: Gulf War. US coalition obliterated Iraqi force. Iraq lost oil, population, infrastructure, morale, and status, while US gained oil, status, and long-term dominance in the region.`,
  "Extermination War": `Extermination War: An extermination war will break out, where neither side will submit no matter the casualties or damage. This will result in the destruction of one civilization and the survival or even ascendancy of another.

Balanced example: Axis powers vs Allied powers in WW2. By the end of the war, the Axis governments were completely dismantled and their leaders were executed. Allied powers flourished in the aftermath and new governments took the place of the old, now part of the Allied order.

Imbalanced Example: Anglo-Zulu War. Despite early defeats, the English completely annexed Zululand using modern rifles and artillery vs spears and shields. The Zulu kingdom was destroyed and never returned.`,
};

/** Build the war/battle prompt (reused from singleplayer battle mode) for all civs. */
export function buildWarPrompt(players: Player[], battleType: WarType, session: Session, scenario?: string): string {
  const desc = CONFLICT_DESCRIPTIONS[battleType] || CONFLICT_DESCRIPTIONS["Limited War"];
  const civ = (p: Player) => `Civilization ${p.slot}: "${p.kingdomName || `Civilization ${p.slot}`}" (led by ${p.playerName || "a leader"}), in ${formatYear(session.currentYear)}.\n${p.summary || "A young civilization, just beginning."}`;
  const scenarioBlock = scenario && scenario.trim()
    ? `Starting scenario and alliances (set by the host — honor this as the setup for the conflict):\n${scenario.trim()}`
    : `No specific scenario was given: simulate this as a FREE-FOR-ALL in which every civilization pursues its own interests, forming or breaking alliances only as is realistic.`;
  return `You are simulating a conflict among ${players.length} rival powers who share one world. All sides are aware of each other. Your job is to be a realistic, unbiased simulator of this conflict: describe each civilization's advantages and disadvantages, then stage an accurate simulation of what happens. You can include small narrative details but the overarching conflict must be extremely accurate and realistic by historical standards. If it is realistic, the conflict can be extremely one-sided.

Conflict Type: ${battleType}

Conflict Description:
${desc}

${scenarioBlock}

Civilizations involved:
${players.map(civ).join("\n\n")}

Draw upon historical precedent in your answer. Refer to each civilization by name. After the narrative, briefly state EACH civilization's gains and losses (territory, population, technology, status, morale).`;
}

/** The singleplayer summarizer's system prompt — reused verbatim for the per-civ memory. */
export const SUMMARIZER_SYSTEM = "You are a civilization simulation game summarizer.";

/**
 * Per-player end-of-turn summary ("memory") prompt — based on the singleplayer
 * summarizer (same field labels + previous-summary/simulation context), but
 * SINGLE-NATION focused: the shared simulation covers both civilizations, so the
 * prompt names the one civ to summarize and tells it to ignore the other, and
 * asks for concrete numbers. Paired with SUMMARIZER_SYSTEM by the caller.
 */
export function buildSummaryPrompt(player: Player, session: Session, sharedSim: string): string {
  const currentTime = formatYear(session.currentYear + session.turnIncrement);
  const civName = player.kingdomName || "the civilization";
  const leader = player.playerName || "its leader";
  const summaryPrompt = `Summarize the civilization "${civName}" (led by ${leader}). The simulation below covers MULTIPLE civilizations sharing one world; keep this summary focused on ${civName} (you may reference other civilizations where they're relevant — wars, treaties, trade, rivalry — but this is ${civName}'s summary, not a write-up of all of them). If the PREVIOUS summary or the simulation contains a full write-up of another civilization (e.g. a "Civilization 1 / Civilization 2" combined format), IGNORE the other civilizations' sections entirely and produce a summary of ${civName} ALONE. Use this format:

${currentTime} ${civName} Summary:
-Leader and government details
-Technologies unlocked
-Nation statistics:
--Production statistics (food, economy, materials)
--Population statistics (population, health, military strength, morale)
--Global settings: Cities and details, allies, enemies
-History of the civilization (one sentence per previous period, latest period gets more detail)

Give CONCRETE NUMBERS wherever possible — e.g. total population (~5,000), population across allied/subordinate groups (~15,000), number of cities and settlements, military size, key production figures — rather than only relative terms like "5x" or "many". Estimate when exact figures aren't given.
The simulation above has ALREADY happened — summarize the resulting state of ${civName}. Never reply that there is no data or ask for more information; always produce the summary, inferring and estimating reasonable figures from the simulation and the previous summary.
Keep the summary focused and under 2 pages. This is for a competitive game, so focus on strategically relevant information about ${civName}.`;

  const contextParts: string[] = [];
  if (player.summary) contextParts.push(`Previous summary of ${civName}:\n${player.summary}`);
  contextParts.push(`Shared simulation (covers all the civilizations):\n${sharedSim}`);
  return `${contextParts.join("\n\n---\n\n")}\n\n---\n\n${summaryPrompt}`;
}
