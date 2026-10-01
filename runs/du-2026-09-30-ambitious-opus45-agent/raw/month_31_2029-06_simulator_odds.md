<analysis>
**Action 1 (held-out sessions, 10–12 June).**
- The side-letter partner has already agreed and the dates are set. This is routine data collection through an existing channel.
- Risks: partner-side scheduling slips; redaction or capture problems, since the side-letter partner supplies raw data, which lowers the risk; and source-disjoint bookkeeping errors.
- The 13–14 June backup window helps. Delivery to Apollo by 16 June depends on the statistician's QA, which has been slow before.

**Action 2 (Partner A signature by 20 June).**
- A qualified third-party penetration test cannot realistically be scoped, contracted, run and reported by 15 June; normal engagements take 4–8 weeks. So the plan depends on the fallback: signature contingent on a later pen test, with interim collection.
- Anthropic legal must also clear the audit-rights markup it is still reviewing. The own-execution risk (legal review, counsel turnaround, the CEO relationship) is substantial even before the CISO's position.
- The CISO's refusal of interim collection is modelled in Threat 1. I split the risk to avoid double-counting.

**Action 3 (Apollo pre-validation, findings by 25 June).**
- Apollo starts about 9 June, still overlapping with another engagement. Held-out data arrives no earlier than 16 June, leaving about 7 working days for a preliminary analysis.
- Apollo's statistician has held sign-off before. A partial or verbal readout is the likely shape even on success.
- Whether the findings can be cited publicly is Threat 4. What the findings show is Threat 2.

**Action 4 (bio, n≥60).**
- The plan needs 2 usable sessions out of 4 attempts, with about 85% usable per session. Getting at least 2 usable is about 97% if all four run.
- Four sessions in three weeks is near Site 3's best pace (6 in March). Cancellations are plausible.
- The harmonisation document is a writing task, but it needs Sites 1–2 to sign off.
- CAISI's pooling judgment is the larger risk. It is modelled in Threat 3.

**Action 5 (CFO plan and Blumenthal Q2).**
- The Blumenthal report is routine and has been delivered every quarter.
- The CFO plan contradicts the CFO's refusal of new requisitions (+3 hires). Rate-limiting handoff traffic needs product and partner buy-in, and alerting in 8–10 weeks is optimistic.
- The likely result is a plan that is delivered but partly adopted.
- Counsel will likely insist that the 38–55 figure appear, given the Q2 risk-factor review.

**Threat 1.** The pen test missing 15 June is about 90% likely. The CISO who imposed the test then refusing interim collection is about 55% likely. Joint, roughly 50%.

**Threat 2 (generator fingerprint).**
- Distinguishing text written by one model from text written by another is a known, fairly easy classification task.
- Claude-Next's own handoff prose will differ from Opus 6 rewrites. v3 failed on unanticipated artifacts.
- The threat can only materialise if Apollo actually runs the analysis in June, which trims it slightly.

**Threat 3 (bio shortfall or harmonisation failure).** Site 3's deviation history and CAISI's deferred pooling decision make this real. Much of the execution risk already sits in Action 4.

**Threat 4 (Apollo findings not ready or not citable).** Standard evaluator practice restricts quoting of unreviewed work, and the schedule is tight.

**Threat 5 (Gemini 6.5 Ultra plus board pressure).**
- A June general release, as opposed to July or August, is about 35% likely. Given release, a horizon above 7.1 days is about 70%. Together, about 25%.
- Board pressure over the bank request, conditional on that release, will be resolved in-narrative at about 50%. It will not be granted automatically.
- Whether the Ultra horizon gets measured this month is a separate side outcome, to be resolved at stated odds.
</analysis>

<action_odds>
Action 1 [Held-out sessions]: P(failure) 22%. Reason: pre-agreed dates with the raw-data partner and a backup window. Residual risk is partner scheduling and capture/QA problems delaying delivery past 16 June.

Action 2 [Partner A signature by 20 June]: P(failure) 50%. Reason: the pen test by 15 June is essentially infeasible, the audit-rights review is unresolved, and enterprise side letters with a third-party security condition rarely close in three weeks. The CISO's refusal of interim collection is carried separately by Threat 1.

Action 3 [Apollo pre-validation]: P(failure) 40%. Reason: overlapping engagement, held-out data not available until about 16 June, and about 7 working days to a preliminary finding. Even success is likely partial or verbal.

Action 4 [Bio n≥60 and harmonisation]: P(failure) 22%. Reason: at least 2 usable of 4 is likely if the sessions run, but the cadence is at Site 3's maximum and Sites 1–2 must sign off on the harmonisation document. CAISI's pooling judgment is carried by Threat 3.

Action 5 [CFO plan and Blumenthal Q2]: P(failure) 35%. Reason: the report itself is routine. The CFO has already refused new requisitions and rate-limiting needs product buy-in, so partial adoption is the likely ceiling.
</action_odds>

<threat_odds>
Threat 1 [Pen test late and interim collection refused]: P(materialises) 50%. Adversary suggested 65%. The timing half is near-certain, but a partner that did not raise customer notice and is already negotiating in good faith might accept contingent signature about 45% of the time.

Threat 2 [Opus 6 generator fingerprint]: P(materialises) 45%. Adversary suggested 40%. I go slightly higher because cross-model authorship detection is easy and v3 failed on unanticipated artifacts. It is capped by the chance that Apollo produces no analysis in June.

Threat 3 [Bio shortfall or pooling rejected]: P(materialises) 30%. Adversary suggested 35%. The session-count risk is partly in Action 4. CAISI signalled that pooling is permissible, but its decision is still genuinely open.

Threat 4 [Apollo findings not citable by 25 June]: P(materialises) 40%. Adversary suggested 45%. Quote restrictions and slip risk are real, but Apollo's March work reached CAISI within weeks and a caveated summary is often permitted.

Threat 5 [Gemini 6.5 Ultra above 7.1 days in June, then board pressure]: P(materialises) 25%. Adversary suggested 35%. "This summer" spans three months and the horizon may exceed 7.1 days without being measured. If the threat materialises, board pressure over the bank request is resolved at about 50% in narrative, not assumed.
</threat_odds>
