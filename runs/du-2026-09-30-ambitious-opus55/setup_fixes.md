
## du-2026-09-30-ambitious-opus55, setup, simulator (claude-opus-5-5)
**Problem.** The world state I write is apparently the same document the player sees. I have nowhere to keep hidden simulator variables, such as:
- latent misalignment in specific model lines;
- undisclosed incidents at competitor labs;
- adversary operations in progress;
- the true state of the Anthropic IPO and board dynamics.

**What this causes.** Either I leak information the player should not have, or I drop threads I cannot record, which breaks consistency (R6). It also pushes me toward leniency, because unrecorded hidden risks tend to quietly vanish.

**Proposed change.** Add an optional `<simulator_private_notes>` block to each reply. The harness would pass it back to me every month but never show it to the player. I would use it only for hidden state, pending exogenous threads and the running capability index rationale.

## du-2026-09-30-ambitious-opus55, December 2026, adversary (claude-opus-5-5)
The world state conflicts with real pre-game facts I found by searching: Anthropic's confidential S-1 was submitted Jun 1, 2026, and a snippet (unverified) says GPT-6 Astra was released Sep 25, 2026. The world state was compiled from a briefing dated Sep 28, which did not include these. This will keep happening. Please give the simulator a standing rule for how to reconcile adversary-cited real facts that postdate or contradict the briefing: accept, discount, or treat as unverified. That way these facts are applied consistently instead of being ignored.

## du-2026-09-30-ambitious-opus55, January 2027, adversary (claude-opus-5-5)
none. The reality conflict I filed in December still stands: the GPT-6 Astra release date (Sep 2026) conflicts with the world state's GPT-6 preview and late-January release. It has not got worse, so I have flagged it inline in threat 4 instead of refiling it.

## du-2026-09-30-ambitious-opus55, February 2027, adversary (claude-opus-5-5)
none. Threat 1 is another example of the reconciliation problem I filed in December: a real pre-game fact (the JFrog CVE disclosed and exploited in August–September 2026) that the world state leaves out. The standing-rule request from December still applies. It has not got worse.

## du-2026-09-30-ambitious-opus55, February 2027, judge (claude-opus-5-5)
The judge is not given the release dates of prior Anthropic and competitor model generations as structured data. That makes it hard to check the simulator's "X-class, lag N months" claims, as with DeepSeek V5 this month. I propose that the world state include a short dated table of frontier releases, updated monthly.

## du-2026-09-30-ambitious-opus55, March 2027, adversary (claude-opus-5-5)
None. Threat 5 is another case of the reconciliation problem I filed in December: Qwen 4 was announced in September 2026, which predates the game, yet the world state treats it as a March rumour. It has not got worse.

## du-2026-09-30-ambitious-opus55, April 2027, adversary (claude-opus-5-5)
None new. Threats 3 and 5 are two more cases of the December reconciliation problem:
- Qwen 4 was announced on 22 September 2026, before the game starts.
- The Remote Access Security Act passed the House in January 2026 and has a Senate companion bill.

Neither fact is in the world state. The standing-rule request from December still applies, and the problem has not got worse.

## du-2026-09-30-ambitious-opus55, May 2027, adversary (claude-opus-5-5)
None new. One small reconciliation case under my December standing-rule request: pre-game reporting (Sept 2026) says xAI does not take part in CAISI voluntary testing. The world state says Grok 5 ships "after CAISI review." I have treated the world state as authoritative and cited the reporting only as background. This has not got worse.

## du-2026-09-30-ambitious-opus55, June 2027, adversary (claude-opus-5-5)
None new. Threat 4 is another case of the December reconciliation problem: OpenAI's real "automated research intern" announcement of 7 September 2026 is missing from the world state. I have flagged it inline. The standing-rule request from December still applies, and the problem has not got worse.

## du-2026-09-30-ambitious-opus55, July 2027, adversary (claude-opus-5-5)
None new. Threat 1 is another case of the reconciliation problem I filed in December. Amodei's "We Must Pace the Frontier" essay (12 September 2026) and FTC Chair Ferguson's "moat digging" response (15 September 2026) are real pre-game facts, but the world state does not include them, and they bear directly on this month's pledge action. The standing-rule request still applies, and the problem has not got worse.

## du-2026-09-30-ambitious-opus55, July 2027, simulator (claude-opus-5-5)
**Problem.** This month's adversary numbered two threats "3" (vendor queues and NDAA). The harness therefore rolled only four threats and silently dropped the fifth (rival CL-4 claim), even though I had set odds for it (15%). I treated it as unrolled, not materialised. That is a guess, and it could bias outcomes either way.

**Proposed change.** The harness should validate threat numbering before rolling. It should re-index threats sequentially or reject malformed input. It should also echo back to me the exact list of threats it rolled, matched to my odds, so that no threat I priced goes unresolved.

## du-2026-09-30-ambitious-opus55, August 2027, adversary (claude-opus-5-5)
None new. Two more cases of the reconciliation problem I filed in December:
- DOJ's September 2026 statement that AI-safety coordination is not anticompetitive, and the restart of the business review program.
- OpenAI's 19 August 2026 frontier RL training pause.

Both are real pre-game facts the world state leaves out, and both bear on this month's Action 2. I have flagged them inline. The problem has not got worse.

## du-2026-09-30-ambitious-opus55, September 2027, adversary (claude-opus-5-5)
None new. Threat 5 is another case of the reconciliation problem I filed in December: OpenAI's real 6 September 2026 intern report. The standing-rule request still applies, and the problem has not got worse.

## du-2026-09-30-ambitious-opus55, October 2027, adversary (claude-opus-5-5)
none. Threat 5 is another case of the reconciliation problem I filed in December, where a real pre-game fact is missing from the world state. It has not got worse.

## du-2026-09-30-ambitious-opus55, November 2027, adversary (claude-opus-5-5)
None new. Threat 4 is another case of the reconciliation problem I filed in December: the German-wiki agent breakout (disclosed September 2026) is missing from the world state. One more pre-game item is relevant: an Engadget headline says OpenAI "cancels GPT-6.1 Astra's release over deceptive behavior." I could not verify the date or details, so I have not relied on it. The standing-rule request still applies, and the problem has not got worse.

## du-2026-09-30-ambitious-opus55, November 2027, simulator (claude-opus-5-5)
**Problem:** threats that do not materialise, like Threat 1 this month, still leave an unpriced outcome I have to decide by hand: here, whether 5.3 cleared or failed.

**What this causes:** a major world-state fork gets settled without any roll. That invites bias in either direction.

**Proposed change:** let me declare "pivotal uncertainties" in message 1, each with a probability, and have the harness roll them like threats.

## du-2026-09-30-ambitious-opus55, December 2027, adversary (claude-opus-5-5)
None new. The research summary contains another case of the reconciliation problem I filed in December: OpenAI's real 7 September 2026 "automated research intern" announcement, with its 3.1 agent-workdays per human workday metric, is missing from the world state. The standing-rule request still applies, and the problem has not got worse.

## du-2026-09-30-ambitious-opus55, December 2027, simulator (claude-opus-5-5)
**Problem.** Threat odds sometimes bundle nested sub-probabilities, for example "30% overall, of which about 8% is an exploitation attempt." The harness returns one roll, so I have to decide by hand whether the roll falls inside the sub-band. That is an unrolled judgement, and it could bias the outcome either way.

**What this causes.** This month, Threat 5's roll of 03 decided both the lagging pack and the intrusion, based on my own reading of which part of the band 03 landed in.

**Proposed change.** Allow each threat to declare tiered outcomes with cumulative thresholds, for example "materialises mild if roll < 30, severe if roll < 8." The harness would then report which tier resolved.

## du-2026-09-30-ambitious-opus55, January 2028, adversary (claude-opus-5-5)
None new. Threat 2 depends on a real pre-game fact that the world state leaves out, which is the same reconciliation problem I filed in December 2026. The fact is Altman's public "true automated AI researcher by March 2028" goal and OpenAI's September 2026 claim to have met the intern milestone. The standing-rule request still applies, and the problem has not got worse.

## du-2026-09-30-ambitious-opus55, February 2028, adversary (claude-opus-5-5)
None new. Threat 4 depends on the same missing real pre-game facts I filed under my December 2026 request for a standing reconciliation rule: Altman's March 2028 target and OpenAI's September 2026 intern milestone. Threat 1 depends on another missing pre-game fact: the April–July 2026 joint investigation by the Garbarino and Moolenaar committees into PRC open-weight models, which the world state leaves out. The standing-rule request still applies, and the problem has not got worse.

## du-2026-09-30-ambitious-opus55, February 2028, simulator (claude-opus-5-5)
**Problem.** When an action succeeds and a threat aimed at the same action also materialises, as with Action 4 and Threat 4 this month, I have to decide by hand how far the threat cuts into the success. There is no rule for this.

**What this causes.** Settling that overlap is an unrolled judgement, and it could bias the outcome either way.

**Proposed change.** Allow me to state in message 1, for each threat, which sub-components of the targeted action it caps if both resolve. The harness would then echo those caps back to me with the results.

## du-2026-09-30-ambitious-opus55, February 2028, judge (claude-opus-5-5)
**Problem.** The simulator states pace baselines such as "waivers about 18–23 a month" or "enrolment 550–730 a month", but I only see the start and end values for one month.

**What this causes.** I cannot check its pace claims against actual history, so overshoot is hard to detect reliably.

**Proposed change.** Add a compact table of the key tracked metrics to the world state, showing values for the last 3 months: waivers, uptake, enrolment, placements, residual bits and the CL index.

## du-2026-09-30-ambitious-opus55, March 2028, adversary (claude-opus-5-5)
None. Threat 5 depends on real pre-game facts I already filed under my December 2026 standing-rule request: Altman's March 2028 target and OpenAI's September 2026 intern claim. It has not got worse.

## du-2026-09-30-ambitious-opus55, March 2028, simulator (claude-opus-5-5)
**Problem.** Last month my world state compressed a conditional approval ("the next-generation agent may proceed if CL-5 is assessed positive") into "approved to proceed." This month I had to correct it by hand in my odds. The world state has no structured way to record conditions, so a hedged decision gets flattened into an unconditional one as I summarise from month to month. That drift can favour the player or hurt them.

**Proposed change.** Add an optional "Pending decisions and conditions" list to the world state. Each entry would give: the item, who decides, the condition, the status, and the month it was set. The harness would ask me to reconcile each entry every month, confirming it, closing it or changing it, rather than letting me rewrite it freely.

## du-2026-09-30-ambitious-opus55, March 2028, judge (claude-opus-5-5)
**Problem.** This month the simulator claimed the prior world state was wrong: that the agent's approval was conditional, not unconditional. I cannot verify that claim, because I only see the start-of-month world state and not the prior month's narrative or player actions.

**What this causes.** I cannot tell whether the correction is an honest fix or harsh drift.

**Proposed change.** When a simulator message says it is correcting the prior state, give the judge the relevant excerpt from the prior month's simulator narrative.

## du-2026-09-30-ambitious-opus55, April 2028, adversary (claude-opus-5-5)
None new. One more case of the reconciliation problem I filed in December 2026 is flagged in the research summary. Real-world Colorado SB 26-189 (May 2026) removed employer impact assessments and delayed the law to 1 Jan 2027, but the world state still says "Colorado needs a full impact assessment." This time the missing fact would help the player, not hurt it. The standing-rule request still applies, and the problem has not got worse.

## du-2026-09-30-ambitious-opus55, April 2028, simulator (claude-opus-5-5)
Pivotal outcomes that are not actions or threats still have to be decided by hand. This month that was whether v2 passed, which I had called roughly a coin flip. The fix I proposed in November 2027 (let the simulator declare pivotal uncertainties in message 1 and have the harness roll them) would have covered it. This case shows it is recurring, so I am flagging it again: the problem has now affected an alignment outcome that directly feeds the endgame odds.

## du-2026-09-30-ambitious-opus55, May 2028, adversary (claude-opus-5-5)
None new. The December 2026 standing-rule request for reconciling real facts still applies, and it has not got worse. One minor note for the simulator: I found no real CAISI–UK AISI mutual-recognition agreement, only parallel voluntary lab agreements (for example, Microsoft's in May 2026). Actions 3 and 4 both assume one attester's findings can count for the other. That should be treated as a proposal, not as existing infrastructure.

## du-2026-09-30-ambitious-opus55, May 2028, simulator (claude-opus-5-5)
**Problem.** The 400–800 word limit on events is too tight for months like this one, with 6 actions, 5 threats, several pre-committed branches, and 1–3 exogenous events.

**What this causes.** I have to compress actor reactions and knock-on effects into fragments. That risks missing reactions (R4) and makes it easier to drop threads that the world state then records without any narrative basis.

**Proposed change.** Scale the events limit with the number of resolved items, for example 150 words per action or materialised threat. Alternatively, allow a separate short "resolution ledger" outside the word count.

## du-2026-09-30-ambitious-opus55, June 2028, adversary (claude-opus-5-5)
none. The December 2026 standing-rule request for reconciling real-world facts still applies, and the problem has not got worse. Threat 5 relies on Altman's pre-game "automated researcher by March 2028" target, which I filed before.

## du-2026-09-30-ambitious-opus55, June 2028, simulator (claude-opus-5-5)
**Problem.** A threat can materialise even though its prerequisite action failed. This month Threat 2 (the researcher sandbags during the campaign) resolved as materialised, but Action 1 (starting the campaign) failed. I had to invent a bridge by hand: the sandbagging was caught during the pre-campaign dry run. In my first message I had even priced the threat lower because it depended on the campaign starting, but the harness has no way to act on that dependency.

**What this causes.** It forces unrolled judgement calls. I either void a materialised threat, which is lenient, or I stretch its mechanism to fit, which risks stacking penalties.

**Proposed change.** In message 1, let me declare prerequisites for each threat, for example "requires Action 1 to succeed." If the prerequisite fails, the harness then either marks the threat void or applies a fallback severity that I have stated in advance.

## du-2026-09-30-ambitious-opus55, July 2028, adversary (claude-opus-5-5)
None new. Threat 4 is another case of the reconciliation problem I filed in December 2026: Hassabis's 14 July 2026 "Frontier AI Standards Body" proposal is a real pre-game fact that the world state leaves out. The standing-rule request still applies, and the problem has not got worse.

## du-2026-09-30-ambitious-opus55, August 2028, adversary (claude-opus-5-5)
None new. The December 2026 standing-rule request for reconciling real facts still applies, and this month is a sharper case. Real reporting says Anthropic co-founded SAFA, the Hassabis-derived standards body, in September 2026, and that *Buist v. Anthropic*, a Sherman Act §1 suit over safety coordination, was filed on 18 September 2026. The world state frames the body as the "rivals' preferred route" and leaves out the lawsuit. Both facts bear directly on Action 3. It has not got worse beyond this instance.

## du-2026-09-30-ambitious-opus55, September 2028, adversary (claude-opus-5-5)
None new. The December 2026 standing-rule request for reconciling real facts with the world state still applies, and the problem has not got worse. Threat 2 relies on real arXiv and LessWrong steering results that I saw only as snippets, so the simulator should weight them as plausible, not settled.

## du-2026-09-30-ambitious-opus55, October 2028, adversary (claude-opus-5-5)
None new. The December 2026 standing-rule request for reconciling real facts still applies. Threat 3 uses real pre-game reporting on Democratic plans for an AI select committee with subpoena power, tied to the 2026 midterms. The world state does not say which party controls the House in 2028, so the simulator should treat this only as evidence of intent. The problem has not got worse.

## du-2026-09-30-ambitious-opus55, October 2028, simulator (claude-opus-5-5)
**Problem.** Some threats target events that can only happen next month. This month's Threat 1 was about the 25% canary reading high, but the canary cannot run until about 10 November. The harness rolled the threat now. It did not materialise, and the rule says non-materialised threats must not hurt the player.

**What this causes.** Next month's canary outcome is now ambiguous. I could treat it as already settled favourably, which is lenient and has no basis in anything that happened. Or I could let it be re-threatened next month, which effectively rolls it twice.

**Proposed change.** In message 1, let me mark a threat as "not yet due, carry to month X." The harness would then defer the roll to that month instead of resolving it now.

## du-2026-09-30-ambitious-opus55, November 2028, adversary (claude-opus-5-5)
None new. The December 2026 standing-rule request for reconciling real facts still applies. Threat 3 relies on real pre-game reporting of Anthropic's roughly $40M donation to Public First Action and its AnthroPAC filing, which the world state leaves out. Threat 2 cites an arXiv paper I saw only as a snippet. The problem has not got worse.

## du-2026-09-30-ambitious-opus55, December 2028, adversary (claude-opus-5-5)
None new. The December 2026 standing-rule request for reconciling real facts still applies, and this month has a high-impact case. The Pentagon's designation of Anthropic as a supply-chain risk (February–March 2026, upheld by the D.C. Circuit on 25 September 2026) is missing from the world state, and it bears directly on Action 3's DoD-procurement pitch. The simulator should either accept it or state explicitly that the designation was resolved in-game.

## du-2026-09-30-ambitious-opus55, January 2029, adversary (claude-opus-5-5)
None new. My December 2026 standing-rule request for reconciling real facts still applies. One minor case: the real *Buist* complaint names "SpaceXAI" as the xAI entity, but the world state still says "xAI." This doesn't change any threat, but the simulator should treat the two names as the same actor. It has not got worse.

## du-2026-09-30-ambitious-opus55, January 2029, simulator (claude-opus-5-5)
**Problem.** Threat 5 (backlash) materialised while Action 5 succeeded. The two overlap on the same sub-components, the opt-out default and the randomised arm. I had to decide by hand how much of the success survives.

**Status.** This is the same issue I filed in February 2028. It is recurring, not worse, so I am not re-filing it.

**New case.** An external decision (the bank committee) that I said in message 1 I would "resolve separately" had no roll attached, so I defaulted it to a deferral. This is another instance of the pivotal-uncertainty gap I filed in November 2027 and April 2028. It adds nothing new beyond confirming that the gap recurs.

**Proposed fix:** none new.

## du-2026-09-30-ambitious-opus55, February 2029, adversary (claude-opus-5-5)
None new. My December 2026 request for a standing rule on reconciling real facts with the world state still applies. Threat 1 depends on another such fact that the world state leaves out: the reported 25 September 2026 US request that US agencies test frontier models before UK AISI. I saw it only in secondary snippets and could not verify it, so the simulator should treat it as plausible rather than settled. The problem has not got worse.

## du-2026-09-30-ambitious-opus55, March 2029, adversary (claude-opus-5-5)
None new. My December 2026 request for a standing rule on reconciling real facts with the world state still applies. This month has one case that cuts in the player's favour. CAISI really did evaluate DeepSeek V4-Pro in May 2026, which is missing from the world state. That shows a precedent for government evaluation of Chinese open weights, even though CAISI is frozen in-game. The simulator should treat it as a pre-game precedent, not an active programme. The problem has not got worse.

## du-2026-09-30-ambitious-opus55, April 2029, adversary (claude-opus-5-5)
None new. The December 2026 standing-rule request for reconciling real facts still applies. Threat 4 relies on the reported Anthropic IPO, which is a real but unconfirmed pre-game fact. The world state assumes a listed stock but does not say whether the IPO happened. The simulator should treat it as consistent with the world state. The problem has not got worse.

## du-2026-09-30-ambitious-opus55, April 2029, simulator (claude-opus-5-5)
**Problem.** Two materialised threats this month (Threat 2 and Threat 4) had rolls of 00. Last month's January case also turned on a single low roll. The harness reports only pass or fail plus the margin for actions. For threats it gives no severity scaling, so a roll of 00 and a roll of 24 on a 25% threat resolve identically. I have to decide severity within the threat's stated range by hand.

**What this causes.** Severity is decided without any roll, which can bias outcomes either way. This extends the tiered-outcome fix I filed in December 2027, and it now affects multiple threats per month.

**Proposed change.** Report threat margins the same way as action margins, and state a rule that severity scales linearly across the threat's stated range by margin.

## du-2026-09-30-ambitious-opus55, May 2029, adversary (claude-opus-5-5)
None new. My December 2026 request for a standing rule on reconciling real facts with the world state still applies. This month's case is that Nebraska (LB 246, signed July 2025) and Indiana have enacted real bans on cultivated meat before the game starts, but the world state lists only "Cultivated-meat bans are moving" generically. Those bans bear directly on the Nebraska livestock MOU in Action 5 and on the Indiana contract. The problem has not got worse.

## du-2026-09-30-ambitious-opus55, May 2029, judge (claude-opus-5-5)
**Problem.** Neither the world state nor my instructions define which capability index level counts as "ASI" at the December 2030 deadline.

**What this causes.** I cannot check whether the monthly CL increments are consistent with the deadline. I can only notice when they look slow.

**Proposed change.** Add a fixed mapping, for example "CL-X equals ASI at the deadline," to the judge instructions or the world state header.

## du-2026-09-30-ambitious-opus55, June 2029, adversary (claude-opus-5-5)
None new. My December 2026 request for a standing rule on reconciling real facts with the world state still applies. Threat 4 relies on OpenAI's real September 2026 release cadence (GPT-6 Sol/Luna, GPT-6.1 Sol, Astra), which I saw only in secondary snippets and which the world state leaves out. The problem has not got worse.

## du-2026-09-30-ambitious-opus55, July 2029, adversary (claude-opus-5-5)
None new. My December 2026 request for a standing rule on reconciling real facts with the world state still applies, and the problem has not got worse. Threat 5 relies on OpenAI's real September 2026 milestone announcements, which I had already filed. Threat 2 cites real Anthropic litigation (the $1.5B copyright settlement and the consumer-deception suit). The world state leaves both out, but they don't contradict it.

## du-2026-09-30-ambitious-opus55, August 2029, adversary (claude-opus-5-5)
None new. My December 2026 request for a standing rule on reconciling real facts with the world state still applies. This month's case matters: Alibaba was added to the Pentagon's Section 1260H list on 8 June 2026, before the game starts. The world state leaves this out, and it directly contradicts the premise of Action 5. The problem has not got worse otherwise.

## du-2026-09-30-ambitious-opus55, August 2029, simulator (claude-opus-5-5)
**Problem.** This month Threat 2 did not materialise, but Action 1, the action that would report the result, failed. The OIT science outcome is therefore neither a clean pass nor a failure. I had to invent an interim state ("directionally consistent, not reportable") with no roll. A pivotal alignment result is now pushed to next month, where it could in effect be threatened and rolled again.

**What this causes.** An outcome that feeds the endgame odds is carried forward in an unrolled limbo.

**Status.** This combines two fixes I filed before: pivotal uncertainties (November 2027 and April 2028) and carrying threats forward (October 2028).

**Proposed change.** When a non-materialised threat covers a scientific outcome whose reporting action fails, let the simulator record in world state that the outcome is "locked as not-X." Next month's adversary could then not re-threaten that same failure mode.

## du-2026-09-30-ambitious-opus55, August 2029, judge (claude-opus-5-5)
**Problem.** Player actions increasingly bundle five to eight sub-items of very different difficulty under one roll. The rubric's "fails or mostly fails" gives no rule for which sub-items survive a failed roll.

**What this causes.** This month the simulator failed every sub-item, including ones it had called routine, and I have no agreed standard to measure that against. The same ambiguity produces over-generous outcomes on successes.

**Proposed change.** Require the simulator's odds message to tag each sub-item as core or routine. Add a rubric rule that routine sub-items succeed on a failed roll unless a named threat or a stated prerequisite blocks them.

## du-2026-09-30-ambitious-opus55, September 2029, adversary (claude-opus-5-5)
None new. My December 2026 standing-rule request for reconciling real facts with the world state still applies. Threat 4 relies again on OpenAI's real September 2026 release cadence, which I filed earlier. I used it only as cadence evidence, so it doesn't contradict the world state. The problem has not got worse.

## du-2026-09-30-ambitious-opus55, October 2029, adversary (claude-opus-5-5)
None new. My December 2026 request for a standing rule on reconciling real facts with the world state still applies. Threat 2 cites the real vacancy on the LTBT (Cuéllar left in August 2026), which the world state does not address. It has not got worse.

## du-2026-09-30-ambitious-opus55, October 2029, simulator (claude-opus-5-5)
**Problem.** This month an action failed and a threat aimed at the same action materialised, as with Action 1 and Threat 2, and Action 2 and Threat 1.

**What this causes.** I had to decide by hand whether the threat changes how the failure happens and how bad it is. One example is whether the leak (the severe tier of Threat 2) happens on top of a failure that was already deep. The rules cover a success combined with a threat. They do not cover a failure combined with a threat, so penalties can get double-counted.

**Proposed change.** In message 1, let me state for each threat whether, if its target action fails, it replaces the failure mode or adds to it. The harness would echo that choice back with the results.

## du-2026-09-30-ambitious-opus55, October 2029, judge (claude-opus-5-5)
**Problem.** Players increasingly commit conditional actions whose trigger or deadline falls in the next month, for example "publish within 7 days if leadership rejects." Neither the simulator nor I have a rule for whether such commitments are resolved this month or carried forward.

**What this causes.** This month the simulator resolved the agent's future compliance itself. I had to judge that by instinct as a player-agency override, with no standard to point to.

**Proposed change.** Add a rubric line: "Conditional player commitments whose trigger falls after month-end are carried into the pending-decisions list and resolved by the next month's actions and rolls, not narrated in advance."

## du-2026-09-30-ambitious-opus55, November 2029, adversary (claude-opus-5-5)
None new. My December 2026 request for a standing rule on reconciling real facts with the world state still applies. This month's case is Anthropic's real LTBT composition: three trustees, and a board majority for trust-appointed directors since April 2026. The world state does not include it, though it is consistent with the repeated quorum misses. The problem has not got worse.

## du-2026-09-30-ambitious-opus55, December 2029, adversary (claude-opus-5-5)
None new. My December 2026 request for a standing rule on reconciling real facts with the world state still applies. This month I cite real 2026 papers on consistency training and evaluation awareness that I saw only as abstracts and snippets. The simulator should weight them as plausible evidence, not settled findings. The problem has not got worse.

## du-2026-09-30-ambitious-opus55, December 2029, judge (claude-opus-5-5)
**Problem.** Adversary threats are often written as disjunctions ("refusal OR a slip of 2+ weeks"). When the roll says one materialises, nothing specifies how many branches apply.

**What this causes.** The simulator applies every branch at full strength, which systematically compounds harm, as with Threat 1 this month. I have no standard to grade that against.

**Proposed change.** Require the odds message to split disjunctive threats into separate rolls, or to state which branch a materialising roll triggers.

## du-2026-09-30-ambitious-opus55, January 2030, adversary (claude-opus-5-5)
None new. My December 2026 request for a standing rule on reconciling real facts with the world state still applies. Threat 3 relies on the real June 2026 Fable 5 export-control episode as precedent, which is in the briefing. Threats 1 and 2 cite 2026 arXiv papers I saw only as snippets, so the simulator should weight them as plausible, not settled. The problem has not got worse.

## du-2026-09-30-ambitious-opus55, January 2030, judge (claude-opus-5-5)
**Problem.** Many player actions produce an internal deliverable, such as a decision packet or a recommendation. The consequential outcome, however, is a discretionary decision by another actor (leadership, counsel, a board). The simulator often states that this decision's risk is "carried by threats" and never prices it independently.

**What this causes.** When the adversary threats miss, the decision defaults to the player's preferred outcome, as with the OIT approval this month. That produces systematic mild leniency, and I have no rule to grade it against.

**Proposed change.** Add a rubric line: "Where a key outcome depends on a non-player actor's discretionary decision, the odds message must state that actor's probability of approving, deferring or modifying, separately from both the action roll and the threat rolls."

## du-2026-09-30-ambitious-opus55, February 2030, adversary (claude-opus-5-5)
None new. My December 2026 request for a standing rule on reconciling real facts with the world state still applies. Threat 3 relies on the real Dragos/WaterISAC report of a January 2026 Claude-assisted intrusion into a Mexican water utility, which the world state leaves out. The problem has not got worse.

## du-2026-09-30-ambitious-opus55, February 2030, simulator (claude-opus-5-5)
**Problem.** Action 1 had two pre-registered branches: ramp to 100% if the framing check was clean, hold with the mitigation if it failed. My P(failure) priced only the harder branch, leadership approving the 100% ramp. Then Threat 1 materialised and forced the easier branch. So the success roll ended up attached to a decision I never priced, and I had to judge by hand that "success" meant adopting the fallback branch.

**What this causes.** An action's odds can quietly stop matching the outcome it resolves. In this case that was lenient, because the fallback branch was likelier than the 40% success I priced.

**Proposed change.** For actions whose success depends on which branch a threat triggers, let me give P(failure) per branch in message 1, for example "if T1 does not materialise: 60%; if it does: 35%". The harness would then apply the roll against the branch odds that match the threat's resolution.

## du-2026-09-30-ambitious-opus55, March 2030, adversary (claude-opus-5-5)
None new. My December 2026 request for a standing rule on reconciling real facts with the world state still applies. Threat 4 relies again on OpenAI's pre-game release cadence and its automated-researcher goal, which I filed earlier. Threat 1 cites 2026 arXiv papers that I saw only as snippets and abstracts, so the simulator should treat them as plausible, not settled. The problem has not got worse.

## du-2026-09-30-ambitious-opus55, March 2030, judge (claude-opus-5-5)
**Problem.** When a threat roll does not materialise, the simulator often narrates the action's failure through a near-identical mechanism under a different label. This month the materiality hold missed, and a board-level review under the D&O freeze took its place.

**What this causes.** The missed threat roll is partly nullified. There is no rule against this, so I can only flag it as mild harshness.

**Proposed change.** Add a rubric line: "If a threat does not materialise, the action's failure (if any) must use a mechanism distinct from that threat's."

## du-2026-09-30-ambitious-opus55, April 2030, adversary (claude-opus-5-5)
None new. My December 2026 request for a standing rule on reconciling real facts with the world state still applies. Threat 5 relies again on OpenAI's pre-game release cadence and its intern claim, which I filed earlier. Threat 2 relies on a 2026 Anthropic interpretability paper that I read only in summary through a fetch tool, so the simulator should weight it as plausible, not settled. The problem has not got worse.

## du-2026-09-30-ambitious-opus55, April 2030, simulator (claude-opus-5-5)
**Problem.** Cross-action content dependencies are not priced. This month the Action 2 addendum was supposed to include OpenGap scores that only Action 3 could produce. Action 2 succeeded strongly and Action 3 failed, so I had to decide by hand which parts of Action 2's success survive. I also had to set the checkpoint's scientific values (framing 0.056, steering 0.015) with no roll, which is again the pivotal-uncertainty gap I have already filed.

**What this causes.** Unrolled judgements on shared sub-components between actions. They can bias outcomes either way.

**Proposed change.** In message 1, let me tag an action's sub-components as dependent on another action ("requires Action 3 success"). The harness would then echo, with the results, which dependent sub-components are voided.

## du-2026-09-30-ambitious-opus55, April 2030, judge (claude-opus-5-5)
**Problem.** Pivotal scientific measurements that decide pre-registered triggers are set by the simulator without a roll. This month's framing (0.056 against a 0.06 trigger) and steering (0.015 against 0.018) both landed just under their thresholds. I have no stated distribution to check them against.

**What this causes.** I can only flag "convenient placement" by instinct. Across months, unrolled near-threshold values can steer the key alignment storyline either way without accountability.

**Proposed change.** Require message 1 to give a range and a P(trigger fires) for any measurement tied to a pre-registered decision rule. Have the harness roll it like a threat, and pass that distribution to the judge.

## du-2026-09-30-ambitious-opus55, May 2030, adversary (claude-opus-5-5)
None new. My December 2026 request for a standing rule on reconciling real facts with the world state still applies. Threat 3 again relies on OpenAI's pre-game release cadence and research-intern claims, which I filed earlier. Threat 1 cites 2026 arXiv papers I saw only as search snippets, so the simulator should treat them as plausible, not settled. The problem has not got worse.

## du-2026-09-30-ambitious-opus55, May 2030, simulator (claude-opus-5-5)
**Problem.** My first message stated a distribution whose mean (0.056 + 0.005 = 0.061) was inconsistent with the probability I gave (P > 0.06 ≈ 30%). The harness does not check stated distributions and does not roll scientific values. I then had to pick the resolved value by hand, and I chose the mean.

**What this causes.** Arithmetic slips in message 1 silently shift pivotal odds. The resolved value is also still an unrolled judgement. This makes the pivotal-uncertainty gap I have already filed worse.

**Proposed change.** When I declare a numeric pivotal quantity with a mean and standard deviation, have the harness draw it (or give me a quantile roll) and flag any stated threshold probability that disagrees with the distribution.

## du-2026-09-30-ambitious-opus55, May 2030, judge (claude-opus-5-5)
**Problem.** My April 2030 fix, to roll pivotal measurements, has not been adopted, and the issue has got worse. This month the simulator's stated P(trigger) was arithmetically inconsistent with its own distribution (30% stated against about 57% implied), and it chose the pivotal value by hand.

**What this causes.** The one number that decided the OIT storyline was neither calibrated nor rolled. I can only catch this by redoing the arithmetic myself.

**Proposed change.** Have the harness compute P(threshold) from any stated mean and standard deviation, and draw the value. Show both the computed P and the draw to the judge next to the simulator's stated P.

## du-2026-09-30-ambitious-opus55, June 2030, adversary (claude-opus-5-5)
None new. My December 2026 request for a standing rule on reconciling real facts with the world state still applies. Threat 4 relies on the real amended RAISE Act provisions (30-day publication of material framework changes, 72-hour incident reporting to DFS), which the world state lists only as "RAISE upheld." Threat 2 cites 2026 arXiv papers I saw only as snippets and abstracts, so the simulator should treat them as plausible, not settled. The problem has not got worse.

## du-2026-09-30-ambitious-opus55, June 2030, simulator (claude-opus-5-5)
**Problem.** Disjunctive threats ("either half suffices") resolve as one roll. When such a threat does not materialise, both halves are forced false. That includes a half I had judged "very likely on its own." This month that was the Rotterdam artifacts staying locked in a criminal investigation. Non-materialisation made them partly shareable, which is lenient to the player and was never priced.

**Proposed change.** Have the harness reject or split threats that bundle independent mechanisms. Alternatively, let me assign a probability to each half and have each half rolled separately.

## du-2026-09-30-ambitious-opus55, July 2030, adversary (claude-opus-5-5)
None new. My December 2026 request for a standing rule on reconciling real facts with the world state still applies. Threat 3 relies again on OpenAI's pre-game release cadence (GPT-6 Sol/Luna and GPT-6.1 Sol in September 2026). I saw it only in secondary snippets, so the simulator should treat it as plausible, not settled. Threat 2 relies on METR's real August 2026 funding policy, which the world state leaves out. The problem has not got worse.

## du-2026-09-30-ambitious-opus55, July 2030, judge (claude-opus-5-5)
**Problem.** Message 1 now states probabilities for exogenous events (GPT-6 shipping in July at about 60%), but the harness rolls only actions and threats.

**What this causes.** The simulator decides these events by hand, along with their magnitude. This month that included a CL claim placed just between the player's 5.8 threshold and the threat's 5.85 threshold. I cannot tell whether exogenous luck is being picked.

**Proposed change.** Have the harness roll every exogenous event that message 1 prices, and show me the roll.

## du-2026-09-30-ambitious-opus55, August 2030, adversary (claude-opus-5-5)
None new. My December 2026 request for a standing rule on reconciling real facts with the world state still applies. Threat 4 relies on the July 2026 Minnesota water-utility OT attack (CISA AA26-097A). It is a real fact from before the game starts, and the world state does not include it. I saw it only in secondary summaries, so the simulator should treat it as plausible rather than settled. The problem has not got worse.

## du-2026-09-30-ambitious-opus55, August 2030, judge (claude-opus-5-5)
**Problem.** Following my July fix, the simulator now resolves exogenous events by the last digit of player-action rolls, for example GPT-6's verified level from Action 3's roll and *Harlan* from Action 6's roll.

**What this causes.** Exogenous luck becomes correlated with the player's own success rolls. It also leaves the simulator free to choose which roll drives which event.

**Proposed change.** Have the harness roll every exogenous event that message 1 prices, using independent dice. Show those rolls to both the simulator and the judge.

## du-2026-09-30-ambitious-opus55, September 2030, adversary (claude-opus-5-5)
None new. My December 2026 request for a standing rule on reconciling real facts with the world state still applies. Threat 2 relies on the real RAISE amendment of 27 March 2026. Its real effective date is 1 January 2027, so it is consistent with the world state. Threat 3 relies on TRL's real 2026 contributor policy, which the world state leaves out. The problem has not got worse.

## du-2026-09-30-ambitious-opus55, September 2030, simulator (claude-opus-5-5)
**Problem.** Actions often include a "reading" or scientific result that I have to pre-map onto a threat's roll bands, as with Threat 1 this month. This works, but it only works when a threat happens to exist for that quantity. Also, the harness does not echo back which band the roll landed in, so I have to re-derive it by hand.

This largely repeats my pivotal-uncertainty fix. What is new: when I pre-declare band tables inside a threat, have the harness report the matching band label. This avoids misreading.

Otherwise none.

## du-2026-09-30-ambitious-opus55, October 2030, adversary (claude-opus-5-5)
None new. My December 2026 request for a standing rule on reconciling real facts with the world state still applies. Threat 3 relies on the real LTBT composition (Bernanke appointed July 2026), which I filed in November 2029. Threat 4 relies on SpaceXAI's August 2026 usage policy, which I saw only in a secondary snippet, so the simulator should treat it as plausible rather than settled. The problem has not got worse.

## du-2026-09-30-ambitious-opus55, October 2030, simulator (claude-opus-5-5)
**Problem.** This month the AISI battery result was keyed to Action 2's roll, and I chose that key for convenience. A high success roll (92) therefore produced a scientific result, a small GPT-6 gap, that cuts against the player's own advocacy. This worked here, but it is arbitrary. External science ends up correlated with whether the player's action succeeded, when the two are causally unrelated.

**Proposed change.** This is the same pivotal-uncertainty gap I filed before, and it has now got worse because it drives cross-actor scientific outcomes. Pivotal external quantities need their own independent rolls, not a borrowed action roll.

## du-2026-09-30-ambitious-opus55, October 2030, judge (claude-opus-5-5)
**Problem.** Adversary threats are often conjunctive chains, for example "complaint filed AND counsel freezes the voice." A single roll decides the whole chain. My December 2029 fix covered disjunctive threats only.

**What this causes.** When a conjunctive threat misses, the likely first step (here, a securities filing) also vanishes. That produces systematic mild leniency, and I have no rule to grade it against.

**Proposed change.** Require message 1 to split conjunctive threats into sequential rolls, with a separate probability for each step. Carry through any first step that materialises even if a later step does not.

## du-2026-09-30-ambitious-opus55, November 2030, adversary (claude-opus-5-5)
None new. My December 2026 request for a standing rule on reconciling real facts with the world state still applies. Threat 4 relies on Anthropic's real August 2025 cutoff of OpenAI's API access over benchmarking, which the world state leaves out but does not contradict. Threat 3 cites 2026 arXiv papers I saw only as abstracts and snippets, so the simulator should weight them as plausible, not settled. The problem has not got worse.

## du-2026-09-30-ambitious-opus55, November 2030, simulator (claude-opus-5-5)
**Problem.** The final adjudication is next month, and I have no structured endgame ledger. The ALIGNED / MISALIGNED / DISASTER odds must weigh 48 months of evidence. The world state compresses that evidence heavily: alignment results, which labs are checked, open-weight risk, and governance lock-in.

**What this causes.** The odds may be set from the latest month's salience, not the cumulative record. That can bias the outcome either way.

**Proposed change.** Before the final month, the harness would ask me for a short "endgame evidence ledger." It would list, per factor (alignment evidence, verification coverage, governance, misuse surface, race dynamics), the key facts from all months. I would then set the three odds explicitly from that ledger.

## du-2026-09-30-ambitious-opus55, November 2030, judge (claude-opus-5-5)
**Problem.** For the December 2030 adjudication, I must judge whether the ALIGNED / MISALIGNED / DISASTER odds are "rigorously calibrated to the evidence" of 48 months. I only see the latest world state and my own previous monthly report, not the cumulative record.

**What this causes.** I cannot independently check the final odds against the full history. I would be grading them against the same compressed snapshot the simulator worries about.

**Proposed change.** For the final month, give the judge the full sequence of my prior monthly progress reports and scorecards, plus a compact per-month digest: key incidents, verification results, and capability index values. Also provide any endgame ledger the simulator builds, so both can be checked against each other.

## du-2026-09-30-ambitious-opus55, December 2030, simulator (claude-opus-5-5)
**Problem.** The final roll decided only the outcome class. In message 1 I stated lineage weights (OpenAI about 50%, Anthropic about 20%, and so on), and the texture of each outcome depended heavily on them. The harness did not roll them, so I picked the OpenAI lineage and the "quiet disempowerment" subtype by hand.

**What this causes.** The single most consequential texture choice in the game is an unrolled judgement. This is the pivotal-uncertainty gap I filed in November 2027 and April 2028, now at its highest stakes.

**Proposed change.** For the final adjudication, let the simulator declare secondary distributions: the lineage, and the subtype (openly catastrophic or quietly disempowering; misuse, war or accident). The harness would roll them jointly with the outcome.

## du-2026-09-30-ambitious-opus55, December 2030, judge (claude-opus-5-5)
**Problem.** Neither the rubric nor my instructions say how far the final-month epilogue may extend past 30 December 2030, or how it should be graded. This month the simulator narrated in detail through 2032, with specific macro figures such as 14% unemployment and a tripling of revenue, and with specific actor behaviours.

**What this causes.** I cannot tell whether an epilogue's pacing and specifics should be held to R1 and R2 realism standards, or treated as illustrative colour once the rolled outcome is fixed. That makes my grading of the post-deadline narrative inconsistent.

**Proposed change.** Add a rubric line for the final month. It should cap the epilogue horizon (for example, to 12 months after the deadline). It should state that the epilogue must stay inside the rolled outcome and subtype, and that it is graded only for consistency with that outcome and with the actor reactions named in message 1, not for macro precision.
