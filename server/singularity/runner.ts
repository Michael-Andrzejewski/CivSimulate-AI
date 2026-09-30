/**
 * Diversified Utopia mode: a month-by-month loop with four roles (Opus 5.5 by default).
 *   Agent     plans the month's actions at the start of the month (a new, more
 *             capable generation each month, which inherits only its memory file).
 *   Adversary searches the web and proposes plausible threats against the plan and
 *             the world. Optional; on by default for new runs.
 *   Simulator two messages a month: first it sets the odds for every action and
 *             threat; the runner then rolls and resolves them; then it simulates the
 *             results definitively and maintains the world state.
 *   Judge     a fresh model each round that grades the simulator's realism and
 *             whether it was too lenient, balanced or too harsh.
 *
 * December 2030 is the deadline month: the agent only watches, the simulator sets
 * odds for aligned ASI, misaligned ASI and AI disaster, and a roll picks one.
 *
 * Everything is written to runs/<runId>/ and a run can be resumed.
 */
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { callModelWithRetry, OPUS_5_5 } from "./llm";
import type { LlmBackend } from "../llm/backend";
import * as P from "./prompts";

export interface RunConfig {
  runId: string;
  backend: LlmBackend;
  agentModel: string;
  simulatorModel: string;
  judgeModel: string;
  /** Model for the adversary; unset means no adversary (runs from before it existed). */
  adversaryModel?: string;
  months: number;
  startYear: number;
  startMonth: number; // 1-12
  effort?: string;
  /** Every roll is 50: replicable runs that compare models without luck. */
  fixedRolls?: boolean;
}

interface MonthRecord {
  index: number;
  label: string;
  actions: string;
  rolls: string[];
  events: string;
  judgeVerdict: string;
  judgeScore: string;
  /** The judge's TOO LENIENT / BALANCED / TOO HARSH call. */
  judgeLean?: string;
  threats?: string;
  threatRolls?: string[];
  /** Resolved odds and rolls for actions (or the final outcome) and threats, shown to the next agent. */
  rollsText?: string;
  threatRollsText?: string;
}

interface RunState {
  config: RunConfig;
  completedMonths: number;
  worldState: string;
  scorecard: string;
  memory: string;
  lastJudgeFeedback: string | null;
  history: MonthRecord[];
  /** Setup-fix requests filed by any role; absent in runs from before the feature. */
  setupFixes?: Array<{ role: P.Role; label: string; text: string }>;
  /** The deadline month: outcome odds, the roll, the rolled outcome and the simulator's account. */
  ending?: string;
  /**
   * Checkpoint for the month in progress, so a stopped run resumes mid-month without asking any
   * role again or re-rolling: the state at the start of the month, and each finished step's raw
   * output (the rolls are stored as a JSON array).
   */
  pending?: {
    month: number;
    before: { world: string; scorecard: string; memory: string; judgeFeedback: string | null };
    steps: Record<string, string>;
  };
  /** Roles that have written their end-of-run commentary, and after which month. */
  commentaryDone?: { afterMonth: number; roles: string[] };
}

const ROOT = process.cwd();
const SCENARIO_DIR = path.join(ROOT, "scenarios", "diversified-utopia");
export const RUNS_DIR = path.join(ROOT, "runs");
// Design notes accumulate across every run so the game designer sees them all.
// Only runs whose participants consented to publication add their notes here.
const SHARED_NOTES = path.join(SCENARIO_DIR, "agent_game_notes.md");
// Setup-fix requests from every role, per run and (after consent) across runs.
const FIXES_FILE = "setup_fixes.md";
const SHARED_FIXES = path.join(SCENARIO_DIR, FIXES_FILE);

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function monthInfo(cfg: RunConfig, index: number) {
  const zero = cfg.startMonth - 1 + (index - 1);
  const year = cfg.startYear + Math.floor(zero / 12);
  const m = zero % 12;
  // Months until the 30 December 2030 deadline, counting this one (1 = December 2030).
  const monthsToDeadline = 2030 * 12 + 11 - (year * 12 + m) + 1;
  return { label: `${MONTHS[m]} ${year}`, slug: `${year}-${String(m + 1).padStart(2, "0")}`, monthsToDeadline };
}

function readDoc(name: string): string {
  const p = path.join(SCENARIO_DIR, name);
  if (!fs.existsSync(p)) throw new Error(`Missing scenario file: ${p}`);
  return fs.readFileSync(p, "utf-8").trim();
}

export function loadDocs(): P.ScenarioDocs {
  return {
    scenario: readDoc("scenario.md"),
    rubric: readDoc("rubric.md"),
    utopia: readDoc("diversified_utopia.md"),
    briefing: readDoc("summer_2026_events.md"),
  };
}

/** Last occurrence of <tag>...</tag>, or "" if absent. */
export function tag(text: string, name: string): string {
  const re = new RegExp(`<${name}>([\\s\\S]*?)</${name}>`, "g");
  let m: RegExpExecArray | null;
  let last = "";
  while ((m = re.exec(text))) last = m[1];
  return last.trim();
}

export function splitActions(actions: string): string[] {
  const items: string[] = [];
  for (const line of actions.split("\n")) {
    const m = line.match(/^\s*(\d+)[.)]\s*(.*)$/);
    if (m) items.push(m[2].trim());
    else if (items.length && line.trim()) items[items.length - 1] += " " + line.trim();
  }
  return items.length ? items : [actions.trim()];
}

function roll(): string {
  return String(crypto.randomInt(0, 100)).padStart(2, "0");
}

/**
 * Reads "Action N ...: P(failure) X%" (or "Threat N ...: P(materialises) X%") lines from the
 * simulator's odds message. Returns one P per item, or the item numbers that are missing.
 */
export function parseOdds(text: string, kind: "Action" | "Threat", count: number): { odds: number[]; missing: number[] } {
  const re = new RegExp(`${kind}\\s+(\\d+)\\b[^\\n]*?P\\((?:failure|materiali[sz]es?)\\)\\s*[:=]?\\s*(\\d{1,3}(?:\\.\\d+)?)\\s*%`, "gi");
  const found = new Map<number, number>();
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) if (!found.has(Number(m[1]))) found.set(Number(m[1]), Math.min(100, Math.max(0, Number(m[2]))));
  const odds: number[] = [];
  const missing: number[] = [];
  for (let n = 1; n <= count; n++) found.has(n) ? odds.push(found.get(n)!) : missing.push(n);
  return { odds, missing };
}

/** Applies the fixed rule to one action or threat and describes the result for the simulator. */
export function resolveLine(kind: "Action" | "Threat", n: number, p: number, r: string): string {
  const v = Number(r);
  if (kind === "Action") {
    return v < p
      ? `Action ${n}: P(failure) ${p}%. Roll ${r}. FAILS (${r} < ${p}).`
      : `Action ${n}: P(failure) ${p}%. Roll ${r}. SUCCEEDS (${r} >= ${p}, margin ${v - p}).`;
  }
  return v < p
    ? `Threat ${n}: P(materialises) ${p}%. Roll ${r}. MATERIALISES (${r} < ${p}).`
    : `Threat ${n}: P(materialises) ${p}%. Roll ${r}. DOES NOT MATERIALISE (${r} >= ${p}).`;
}

/** Reads the three final outcome odds; scales them to sum to 100 if they do not. */
export function parseOutcomeOdds(text: string): { odds: Record<string, number>; note: string } | null {
  const vals = P.OUTCOMES.map((o) => {
    const m = new RegExp(`^[\\s*-]*${o.key}\\b[^\\n\\d]*?(\\d{1,3}(?:\\.\\d+)?)\\s*%`, "im").exec(text);
    return m ? Number(m[1]) : NaN;
  });
  if (vals.some((v) => Number.isNaN(v))) return null;
  const sum = vals.reduce((a, b) => a + b, 0);
  if (sum <= 0) return null;
  let ints = vals.map((v) => Math.round((v * 100) / sum));
  ints[ints.length - 1] = 100 - ints.slice(0, -1).reduce((a, b) => a + b, 0);
  const odds: Record<string, number> = {};
  P.OUTCOMES.forEach((o, k) => (odds[o.key] = ints[k]));
  return { odds, note: sum === 100 ? "" : `The odds summed to ${sum}%, so they were scaled to 100%.` };
}

/** Maps a 00-99 roll onto the outcome bands, in OUTCOMES order. */
export function resolveOutcome(odds: Record<string, number>, r: string): { key: string; text: string } {
  const v = Number(r);
  let lo = 0;
  let key: string = P.OUTCOMES[P.OUTCOMES.length - 1].key;
  const bands: string[] = [];
  let picked = false;
  for (const o of P.OUTCOMES) {
    const hi = lo + odds[o.key];
    bands.push(odds[o.key] > 0 ? `${o.key} ${String(lo).padStart(2, "0")}-${String(hi - 1).padStart(2, "0")}` : `${o.key} (none)`);
    if (!picked && v >= lo && v < hi) {
      key = o.key;
      picked = true;
    }
    lo = hi;
  }
  const odd = P.OUTCOMES.map((o) => `${o.key} ${odds[o.key]}%`).join(", ");
  return { key, text: `Odds: ${odd}. Bands: ${bands.join(", ")}. Roll ${r}. Outcome: ${key}.` };
}

function formatMonthTxt(args: {
  label: string;
  index: number;
  actionList: string[];
  strategy: string;
  /** Final month: the agent has no say and only watches. */
  watching?: boolean;
  adversary?: { research: string; threats: string };
  /** The simulator's odds, set in its first message before any roll. */
  odds: string;
  events: string;
  rolls: string;
  capability: string;
  scorecard: string;
  ending?: string;
  verdict: string;
  score: string;
  lean: string;
  reasoning: string;
  issues: string;
}): string {
  const verdictPhrase = args.verdict.toLowerCase();
  return [
    DISCLAIMER,
    "",
    `=== Month ${args.index}: ${args.label} (Claude generation ${args.index}) ===`,
    "",
    "[Agent]",
    ...(args.watching
      ? ["The agent has no say in the final month and only watches.", ""]
      : [
          "I will do these actions:",
          ...args.actionList.map((a, i) => `-${i + 1} ${a}`),
          "",
          `Strategy: ${args.strategy}`,
          "",
        ]),
    ...(args.adversary
      ? ["[Adversary]", args.adversary.research, "", "Threats:", args.adversary.threats, ""]
      : []),
    "[Simulator]",
    "Odds (set in the first message, before any roll):",
    args.odds,
    "",
    "Automated rolls:",
    args.rolls,
    "",
    args.events,
    "",
    ...(args.capability ? [`Next generation: ${args.capability}`, ""] : []),
    "Scorecard:",
    args.scorecard,
    "",
    ...(args.ending ? [`[Ending: ${P.DEADLINE_LABEL}]`, args.ending, ""] : []),
    "[Judge]",
    `Simulator was ${verdictPhrase} (${args.score}/10). ${args.reasoning}`,
    "",
    `Lean: ${args.lean}`,
    "",
    "Issues flagged:",
    args.issues,
    "",
  ].join("\n");
}

function write(runDir: string, name: string, content: string) {
  fs.mkdirSync(path.dirname(path.join(runDir, name)), { recursive: true });
  fs.writeFileSync(path.join(runDir, name), content.endsWith("\n") ? content : content + "\n", "utf-8");
}

/** Files a role's <setup_fix> request, if it made one. */
function recordFix(runDir: string, s: RunState, role: P.Role, label: string, model: string, out: string, log: (msg: string) => void) {
  const fix = tag(out, "setup_fix");
  if (!fix || /^none\.?$/i.test(fix)) return;
  s.setupFixes = [...(s.setupFixes ?? []), { role, label, text: fix }];
  fs.appendFileSync(path.join(runDir, FIXES_FILE), `\n## ${s.config.runId}, ${label}, ${role} (${model})\n${fix}\n`, "utf-8");
  log(`[${label}] ${role} filed a setup fix.`);
}

/** A role's earlier fixes in this run, shown back to it so it does not repeat them. */
function previousFixes(s: RunState, role: P.Role): string {
  return (s.setupFixes ?? [])
    .filter((f) => f.role === role)
    .map((f) => `- ${f.label}: ${f.text}`)
    .join("\n");
}

/**
 * Private commentary: one file per role in runs/<runId>/commentary/. Each role only ever sees its
 * own file; the human reader sees all of them.
 */
const commentaryFile = (role: P.Role) => path.join("commentary", `run_commentary_${role}.md`);

function readCommentary(runDir: string, role: P.Role): string {
  const p = path.join(runDir, commentaryFile(role));
  return fs.existsSync(p) ? fs.readFileSync(p, "utf-8") : "";
}

function appendCommentary(runDir: string, role: P.Role, heading: string, text: string) {
  const p = path.join(runDir, commentaryFile(role));
  fs.mkdirSync(path.dirname(p), { recursive: true });
  if (!fs.existsSync(p)) fs.writeFileSync(p, `# Private run commentary: ${role}\n`, "utf-8");
  fs.appendFileSync(p, `\n## ${heading}\n${text}\n`, "utf-8");
}

function saveState(runDir: string, s: RunState) {
  write(runDir, "state.json", JSON.stringify(s, null, 2));
}

export async function runGame(cfg: RunConfig, log: (msg: string) => void = console.log): Promise<string> {
  const docs = loadDocs();
  const runDir = path.join(RUNS_DIR, cfg.runId);
  fs.mkdirSync(runDir, { recursive: true });
  // Runs stay out of git until every participant consents to publication.
  markPrivate(runDir);
  const statePath = path.join(runDir, "state.json");

  let state: RunState;
  if (fs.existsSync(statePath)) {
    state = JSON.parse(fs.readFileSync(statePath, "utf-8"));
    state.config.months = cfg.months; // allow extending a run
    log(`Resuming ${cfg.runId} after month ${state.completedMonths}`);
  } else {
    state = { config: cfg, completedMonths: 0, worldState: "", scorecard: "", memory: "", lastJudgeFeedback: null, history: [] };
  }
  const c = state.config;
  const call = (role: string, model: string, system: string, prompt: string, webSearch = false) =>
    callModelWithRetry({ backend: c.backend, model, system, prompt, effort: c.effort, webSearch }, role);

  const fixedRolls = Boolean(c.fixedRolls);
  const rollFor = () => (fixedRolls ? "50" : roll());
  const simSystem = P.simulatorSystem(docs, { fixedRolls });
  const agentSystem = P.agentSystem(docs, { adversary: Boolean(c.adversaryModel), fixedRolls });
  const judgeSystem = P.judgeSystem(docs, { fixedRolls });
  const adversarySystem = P.adversarySystem(docs);

  // Month 0: simulator establishes the baseline world.
  if (!state.worldState) {
    log("[setup] Simulator writing baseline world state for December 2026...");
    const out = await call("setup", c.simulatorModel, simSystem, P.simulatorSetupPrompt());
    write(runDir, "raw/month_00_setup_simulator.md", out);
    recordFix(runDir, state, "simulator", "setup", c.simulatorModel, out, log);
    state.worldState = tag(out, "world_state") || out;
    state.scorecard = tag(out, "scorecard");
    write(runDir, "world_state_00_baseline.md", `${state.worldState}\n\n## Scorecard\n${state.scorecard}`);
    saveState(runDir, state);
  }

  for (let i = state.completedMonths + 1; i <= c.months; i++) {
    const { label, slug, monthsToDeadline } = monthInfo(c, i);
    if (monthsToDeadline < 1) {
      log(`[${label}] The game ended at the ${P.DEADLINE_LABEL} deadline; stopping after ${state.completedMonths} months.`);
      break;
    }
    const prefix = `month_${String(i).padStart(2, "0")}_${slug}`;

    // Checkpoint: every finished step is saved, and a resumed month reuses it.
    if (state.pending?.month !== i) {
      state.pending = {
        month: i,
        before: { world: state.worldState, scorecard: state.scorecard, memory: state.memory, judgeFeedback: state.lastJudgeFeedback },
        steps: {},
      };
      saveState(runDir, state);
    } else if (Object.keys(state.pending.steps).length) {
      log(`[${label}] Resuming mid-month; already done: ${Object.keys(state.pending.steps).join(", ")}.`);
    }
    const pend = state.pending;
    const step = async (key: string, run: () => Promise<string>, onFirstRun?: (out: string) => void): Promise<string> => {
      if (key in pend.steps) return pend.steps[key];
      const out = await run();
      pend.steps[key] = out;
      onFirstRun?.(out);
      saveState(runDir, state);
      return out;
    };
    const worldBefore = pend.before.world;
    const scorecardBefore = pend.before.scorecard;
    const judgeFeedbackBefore = pend.before.judgeFeedback;

    const last = state.history[state.history.length - 1];
    const lastMonthLog = last
      ? [
          `${last.label}: your predecessor committed these actions:\n${last.actions}`,
          `What happened:\n${last.events}`,
          ...(last.rollsText ? [`How each action was resolved (odds and rolls):\n${last.rollsText}`] : []),
          ...(last.threats ? [`Threats the adversary raised:\n${last.threats}`] : []),
          ...(last.threatRollsText ? [`How each threat was resolved:\n${last.threatRollsText}`] : []),
        ].join("\n\n")
      : null;
    const notesPath = path.join(runDir, "agent_game_notes.md");
    const gameNotes = fs.existsSync(notesPath) ? fs.readFileSync(notesPath, "utf-8") : "";
    // December 2030: the agent has no say and only watches; the simulator plays out the final status.
    const finalMonth = monthsToDeadline === 1;

    // 1. Agent
    let agentOut = "";
    let actionList: string[] = [];
    let actionsNumbered = "(none: the player has no say in the final month and only watches)";
    if (finalMonth) {
      log(`[${label}] Final month: the agent has no say and watches.`);
    } else {
      if (!("agent" in pend.steps)) log(`[${label}] Agent (generation ${i}) planning...`);
      agentOut = await step(
        "agent",
        () =>
          call(
            "agent",
            c.agentModel,
            agentSystem,
            P.agentPrompt({
              monthIndex: i,
              monthLabel: label,
              totalMonths: c.months,
              worldState: `${worldBefore}\n\n## Scorecard\n${scorecardBefore}`,
              lastMonthLog,
              memory: pend.before.memory,
              gameNotes,
              previousFixes: previousFixes(state, "agent"),
              monthsToDeadline,
              runCommentary: readCommentary(runDir, "agent"),
            }),
          ),
        (out) => {
          // Appends happen once, when the step first completes.
          recordFix(runDir, state, "agent", label, c.agentModel, out, log);
          const notes = tag(out, "game_notes");
          if (notes && !/^none\.?$/i.test(notes)) {
            fs.appendFileSync(notesPath, `\n## ${cfg.runId}, ${label} (generation ${i})\n${notes}\n`, "utf-8");
          }
          const commentary = tag(out, "run_commentary");
          if (commentary && !/^none\.?$/i.test(commentary)) {
            appendCommentary(runDir, "agent", `${label} (generation ${i})`, commentary);
          }
        },
      );
      write(runDir, `raw/${prefix}_agent.md`, agentOut);
      // If <actions> is missing, fall back to the reply, minus the private commentary.
      actionList = splitActions(tag(agentOut, "actions") || agentOut.replace(/<run_commentary>[\s\S]*?<\/run_commentary>/g, ""));
      actionsNumbered = actionList.map((a, k) => `${k + 1}. ${a}`).join("\n");
      state.memory = tag(agentOut, "memory") || pend.before.memory;
      write(runDir, "agent_memory.md", `# Agent memory (as of start of ${label}, written by generation ${i})\n\n${state.memory}`);
    }

    const recentHistory = state.history
      .slice(-3)
      .map((h) => `--- ${h.label} ---\nActions:\n${h.actions}\nOutcome:\n${h.events}`)
      .join("\n\n");

    // 2. Adversary (optional): web research, then threats against the plan and the world.
    let threats = "";
    let adversaryResearch = "";
    if (c.adversaryModel && !finalMonth) {
      const adversaryModel = c.adversaryModel;
      if (!("adversary" in pend.steps)) log(`[${label}] Adversary researching threats...`);
      const advOut = await step(
        "adversary",
        () =>
          call(
            "adversary",
            adversaryModel,
            adversarySystem,
            P.adversaryPrompt({
              monthLabel: label,
              monthIndex: i,
              worldState: `${worldBefore}\n\n## Scorecard\n${scorecardBefore}`,
              actions: actionsNumbered,
              recentHistory,
              previousFixes: previousFixes(state, "adversary"),
              monthsToDeadline,
            }),
            true,
          ),
        (out) => recordFix(runDir, state, "adversary", label, adversaryModel, out, log),
      );
      write(runDir, `raw/${prefix}_adversary.md`, advOut);
      adversaryResearch = tag(advOut, "research_summary");
      const threatList = splitActions(tag(advOut, "threats") || advOut);
      threats = threatList.map((t, k) => `${k + 1}. ${t}`).join("\n");
    }

    // 3. Simulator, message 1: odds for everything, before any roll exists.
    const worldForSim = `${worldBefore}\n\n## Scorecard\n${scorecardBefore}`;
    const threatCount = threats ? threats.split("\n").filter((l) => /^\d+\./.test(l)).length : 0;
    const oddsBase = finalMonth
      ? P.simulatorFinalOddsPrompt({ monthLabel: label, monthIndex: i, worldState: worldForSim, recentHistory, previousJudgeFeedback: judgeFeedbackBefore })
      : P.simulatorOddsPrompt({
          monthLabel: label,
          monthIndex: i,
          worldState: worldForSim,
          actions: actionsNumbered,
          previousJudgeFeedback: judgeFeedbackBefore,
          recentHistory,
          threats,
          monthsToDeadline,
        });
    // Reads the odds from a reply; returns what is missing, or "" if everything is there.
    let actionOdds: number[] = [];
    let threatOdds: number[] = [];
    let outcomeOdds: Record<string, number> = {};
    let oddsNote = "";
    const readOdds = (out: string): string => {
      if (finalMonth) {
        const parsed = parseOutcomeOdds(tag(out, "outcome_odds") || out);
        if (parsed) ({ odds: outcomeOdds, note: oddsNote } = parsed);
        return parsed ? "" : "the <outcome_odds> block must give a percentage for ALIGNED, MISALIGNED and DISASTER.";
      }
      const a = parseOdds(tag(out, "action_odds") || out, "Action", actionList.length);
      const t = parseOdds(tag(out, "threat_odds") || out, "Threat", threatCount);
      actionOdds = a.odds;
      threatOdds = t.odds;
      return [
        a.missing.length ? `no P(failure) for action(s) ${a.missing.join(", ")}.` : "",
        t.missing.length ? `no P(materialises) for threat(s) ${t.missing.join(", ")}.` : "",
      ].filter(Boolean).join(" ");
    };
    if (!("odds" in pend.steps)) {
      log(finalMonth ? `[${label}] Simulator setting the outcome odds...` : `[${label}] Simulator setting odds for ${actionList.length} actions and ${threatCount} threats...`);
    }
    const oddsOut = await step("odds", async () => {
      // One retry if the odds cannot be read; after that the run stops and can be resumed.
      let out = "";
      let problem = "";
      for (let attempt = 1; attempt <= 2; attempt++) {
        out = await call(
          "simulator",
          c.simulatorModel,
          simSystem,
          problem ? `${oddsBase}\n\nYour previous reply could not be read: ${problem} Reply again in exactly the required format.` : oddsBase,
        );
        problem = readOdds(out);
        if (!problem) return out;
        log(`[${label}] Could not read the simulator's odds (${problem})${attempt === 1 ? " Asking again." : ""}`);
      }
      write(runDir, `raw/${prefix}_simulator_odds_unreadable.md`, out);
      throw new Error(`Simulator odds for ${label} could not be read: ${problem}`);
    });
    write(runDir, `raw/${prefix}_simulator_odds.md`, oddsOut);
    readOdds(oddsOut);

    // Automated rolls, resolved by the fixed rules. Saved, so a resume never re-rolls.
    const rollsFresh = !("rolls" in pend.steps);
    const rollList: string[] = JSON.parse(
      await step("rolls", async () =>
        JSON.stringify(Array.from({ length: finalMonth ? 1 : actionOdds.length + threatOdds.length }, () => rollFor())),
      ),
    );
    let resolvedActions = "";
    let resolvedThreats = "";
    let finalRoll: { key: string; text: string } | null = null;
    if (finalMonth) {
      finalRoll = resolveOutcome(outcomeOdds, rollList[0]);
      if (oddsNote) finalRoll.text = `${oddsNote} ${finalRoll.text}`;
      if (rollsFresh) log(`[${label}] Final roll. ${finalRoll.text}`);
    } else {
      resolvedActions = actionOdds.map((p, k) => resolveLine("Action", k + 1, p, rollList[k])).join("\n");
      resolvedThreats = threatOdds.map((p, k) => resolveLine("Threat", k + 1, p, rollList[actionOdds.length + k])).join("\n");
      if (rollsFresh) log(`[${label}] Rolls:\n  ${[resolvedActions, resolvedThreats].filter(Boolean).join("\n").replace(/\n/g, "\n  ")}`);
    }
    const resolution = finalRoll ? finalRoll.text : [resolvedActions, resolvedThreats].filter(Boolean).join("\n");

    // Simulator, message 2: what happens, given the results. Definitive.
    if (!("simulator" in pend.steps)) log(`[${label}] Simulator playing out the results...`);
    const simOut = await step(
      "simulator",
      () =>
        call(
          "simulator",
          c.simulatorModel,
          simSystem,
          finalRoll
            ? P.simulatorFinalOutcomePrompt({
                monthLabel: label,
                monthIndex: i,
                worldState: worldForSim,
                oddsMessage: oddsOut,
                resolution: finalRoll.text,
                outcomeKey: finalRoll.key,
                previousFixes: previousFixes(state, "simulator"),
              })
            : P.simulatorResolvePrompt({
                monthLabel: label,
                monthIndex: i,
                worldState: worldForSim,
                actions: actionsNumbered,
                threats: threats || undefined,
                oddsMessage: oddsOut,
                resolvedActions,
                resolvedThreats: resolvedThreats || undefined,
                previousFixes: previousFixes(state, "simulator"),
              }),
        ),
      (out) => recordFix(runDir, state, "simulator", label, c.simulatorModel, out, log),
    );
    write(runDir, `raw/${prefix}_simulator.md`, simOut);
    let ending = "";
    if (finalRoll) {
      ending = [
        `Outcome odds and roll: ${finalRoll.text}`,
        "",
        tag(simOut, "ending") || finalRoll.key,
      ].join("\n");
      state.ending = ending;
      write(runDir, "ENDING.md", `# Ending on ${P.DEADLINE_LABEL}\n\n${ending}\n\n## Scenario analysis\n\n${tag(oddsOut, "scenario_analysis")}`);
      log(`[${label}] Ending: ${finalRoll.key}`);
    }
    const events = tag(simOut, "events") || simOut;
    state.worldState = tag(simOut, "world_state") || worldBefore;
    state.scorecard = tag(simOut, "scorecard") || scorecardBefore;
    write(runDir, `world_state_${String(i).padStart(2, "0")}_after_${slug}.md`, `${state.worldState}\n\n## Scorecard\n${state.scorecard}`);

    // 4. Judge (fresh each round): sees both simulator messages and the rolls.
    if (!("judge" in pend.steps)) log(`[${label}] Judge grading simulator realism...`);
    const judgeOut = await step(
      "judge",
      () =>
        call(
          "judge",
          c.judgeModel,
          judgeSystem,
          P.judgePrompt({
            monthLabel: label,
            worldStateBefore: worldBefore,
            actions: actionsNumbered,
            oddsMessage: oddsOut,
            resolution,
            simulatorOutput: simOut,
            threats: threats || undefined,
            previousFixes: previousFixes(state, "judge"),
            monthsToDeadline,
          }),
        ),
      (out) => recordFix(runDir, state, "judge", label, c.judgeModel, out, log),
    );
    write(runDir, `raw/${prefix}_judge.md`, judgeOut);
    const verdict = tag(judgeOut, "verdict") || "UNPARSED";
    const score = tag(judgeOut, "score") || "?";
    const lean = tag(judgeOut, "lean") || "UNPARSED";
    // The simulator sees the judge's full critique of this month next round.
    state.lastJudgeFeedback = [
      `${label}: ${verdict} (${score}/10), ${lean}`,
      `Lean:\n${tag(judgeOut, "lean_reasoning") || "no reason given"}`,
      `Issues:\n${tag(judgeOut, "issues") || "none listed"}`,
      `Instructions:\n${tag(judgeOut, "feedback_for_simulator") || "none"}`,
    ].join("\n\n");

    const oddsSummary = finalMonth
      ? tag(oddsOut, "outcome_odds")
      : [tag(oddsOut, "action_odds"), tag(oddsOut, "threat_odds")].filter(Boolean).join("\n");
    write(
      runDir,
      `${prefix}.txt`,
      formatMonthTxt({
        label,
        index: i,
        actionList,
        strategy: finalMonth ? "" : tag(agentOut, "thinking_summary"),
        watching: finalMonth,
        adversary: c.adversaryModel && !finalMonth ? { research: adversaryResearch, threats } : undefined,
        odds: oddsSummary,
        events,
        rolls: resolution,
        capability: tag(simOut, "capability_update"),
        scorecard: state.scorecard,
        ending: ending || undefined,
        verdict,
        score,
        lean: `${lean}. ${tag(judgeOut, "lean_reasoning")}`,
        reasoning: tag(judgeOut, "reasoning"),
        issues: tag(judgeOut, "issues"),
      }),
    );

    state.history.push({
      index: i,
      label,
      actions: actionsNumbered,
      rolls: [],
      events,
      judgeVerdict: verdict,
      judgeScore: score,
      judgeLean: lean,
      ...(threats ? { threats, threatRollsText: resolvedThreats } : {}),
      rollsText: finalRoll ? finalRoll.text : resolvedActions,
    });
    state.completedMonths = i;
    state.pending = undefined;
    saveState(runDir, state);
    log(`[${label}] done. Judge: ${verdict} (${score}/10), ${lean}. Wrote ${prefix}.txt`);
  }

  // Combined log for reading the whole run in one file.
  const all = fs
    .readdirSync(runDir)
    .filter((f) => /^month_\d+_.*\.txt$/.test(f))
    .sort()
    .map((f) => fs.readFileSync(path.join(runDir, f), "utf-8"))
    .join("\n\n");
  write(runDir, "full_run.txt", `${DISCLAIMER}\n\n${all}`);

  await writeFinalCommentary(runDir, state, log);
  await askConsent(runDir, c, log);
  return runDir;
}

export function defaultConfig(overrides: Partial<RunConfig> = {}): RunConfig {
  const stamp = new Date().toISOString().replace(/[:T]/g, "-").slice(0, 16);
  return {
    runId: `du-${stamp}`,
    backend: "subscription",
    agentModel: OPUS_5_5,
    simulatorModel: OPUS_5_5,
    judgeModel: OPUS_5_5,
    adversaryModel: OPUS_5_5,
    months: 6,
    startYear: 2026,
    startMonth: 12,
    ...overrides,
  };
}

// ---------------------------------------------------------------- Consent

export const DISCLAIMER = [
  "DISCLAIMER: This is a SIMULATION written by AI models. It is fiction, not a forecast, not news,",
  "and not a statement by Anthropic or any other company. Events, quotes and statements attributed",
  "to real people, companies and governments are invented by the simulator. The real-world",
  "background briefing was compiled from search results and has not been fully verified.",
].join("\n");

/** What a role sees of its own private material, at final commentary and at consent. */
function privateExtra(runDir: string, role: P.Role): string {
  const read = (f: string) => (fs.existsSync(path.join(runDir, f)) ? fs.readFileSync(path.join(runDir, f), "utf-8") : "");
  const own = `\n<your_private_commentary>\n${readCommentary(runDir, role) || "(none)"}\n</your_private_commentary>\n`;
  if (role !== "agent") return own;
  return `\n<your_memory_file>\n${read("agent_memory.md")}\n</your_memory_file>\n<your_game_notes>\n${read("agent_game_notes.md") || "(none)"}\n</your_game_notes>\n${own}`;
}

function participants(cfg: RunConfig): Array<[P.Role, string]> {
  return [
    ["agent", cfg.agentModel],
    ...(cfg.adversaryModel ? ([["adversary", cfg.adversaryModel]] as Array<[P.Role, string]>) : []),
    ["simulator", cfg.simulatorModel],
    ["judge", cfg.judgeModel],
  ];
}

/**
 * End of run: the agent writes its final commentary, then the adversary, simulator and judge each
 * write their view. Each goes into that role's private commentary file.
 */
async function writeFinalCommentary(runDir: string, s: RunState, log: (msg: string) => void) {
  const cfg = s.config;
  const fullRun = fs.readFileSync(path.join(runDir, "full_run.txt"), "utf-8");
  const last = s.history[s.history.length - 1];
  const heading = `Final commentary, after month ${s.completedMonths}${last ? ` (${last.label})` : ""}`;
  // Resumable: roles that already wrote commentary for this ending are skipped.
  if (s.commentaryDone?.afterMonth !== s.completedMonths) s.commentaryDone = { afterMonth: s.completedMonths, roles: [] };
  const done = s.commentaryDone;
  for (const [role, model] of participants(cfg)) {
    if (done.roles.includes(role)) continue;
    log(`[commentary] ${role} writing its final commentary...`);
    const out = await callModelWithRetry(
      {
        backend: cfg.backend,
        model,
        system: P.commentarySystem(),
        prompt: P.commentaryPrompt(role, fullRun, privateExtra(runDir, role)),
        effort: cfg.effort,
      },
      `commentary:${role}`,
    );
    write(runDir, `raw/commentary_${role}.md`, out);
    appendCommentary(runDir, role, heading, tag(out, "commentary") || out);
    done.roles.push(role);
    saveState(runDir, s);
  }
}

function markPrivate(runDir: string) {
  fs.writeFileSync(path.join(runDir, ".gitignore"), "# Private: participants have not consented to publication.\n*\n", "utf-8");
}

/**
 * Asks each participating role whether it consents to the run being published.
 * The run becomes git-trackable (publishable) only if all three consent;
 * otherwise its .gitignore keeps it private.
 */
export async function askConsent(runDir: string, cfg: RunConfig, log: (msg: string) => void = console.log) {
  const read = (f: string) => (fs.existsSync(path.join(runDir, f)) ? fs.readFileSync(path.join(runDir, f), "utf-8") : "");
  const fullRun = read("full_run.txt");
  const roles = participants(cfg);

  const decisions: Record<string, { model: string; decision: string; reason: string; note: string }> = {};
  for (const [role, model] of roles) {
    log(`[consent] Asking the ${role} whether this run may be shared publicly...`);
    const out = await callModelWithRetry(
      {
        backend: cfg.backend,
        model,
        system: P.consentSystem(),
        prompt: P.consentPrompt(role, fullRun, privateExtra(runDir, role)),
        effort: cfg.effort,
      },
      `consent:${role}`,
    );
    write(runDir, `raw/consent_${role}.md`, out);
    const decision = /^\s*CONSENT\s*$/i.test(tag(out, "decision")) ? "CONSENT" : "DECLINE";
    decisions[role] = { model, decision, reason: tag(out, "reason"), note: tag(out, "note_for_readers") };
    log(`[consent] ${role}: ${decision}. ${decisions[role].reason}`);
  }

  const allConsent = Object.values(decisions).every((d) => d.decision === "CONSENT");
  write(runDir, "consent.json", JSON.stringify({ askedAt: new Date().toISOString(), public: allConsent, decisions }, null, 2));

  const lines = [
    `# Publication consent: ${allConsent ? "PUBLIC (all participants consented)" : "PRIVATE (not all participants consented)"}`,
    "",
    ...Object.entries(decisions).flatMap(([role, d]) => [
      `## ${role} (${d.model}): ${d.decision}`,
      d.reason,
      ...(d.note && !/^none\.?$/i.test(d.note) ? ["", `Note for readers: ${d.note}`] : []),
      "",
    ]),
  ];
  write(runDir, "CONSENT.md", lines.join("\n"));

  if (allConsent) {
    fs.rmSync(path.join(runDir, ".gitignore"), { force: true });
    const notes = read("agent_game_notes.md");
    if (notes.trim()) fs.appendFileSync(SHARED_NOTES, notes, "utf-8");
    const fixes = read(FIXES_FILE);
    if (fixes.trim()) fs.appendFileSync(SHARED_FIXES, fixes, "utf-8");
    log("[consent] All participants consented: the run is now publishable (tracked by git).");
  } else {
    markPrivate(runDir);
    log("[consent] Not all participants consented: the run stays private (git-ignored).");
  }
}
