<analysis>
**Capability clock.** The index stands at 10.04 at the start of July. At +0.15 to +0.22 per month it reaches about 10.19 to 10.26 by the end of July. It crosses 10.8 between late October (fast path) and mid-December (slow path), with a central estimate of November. In message 2 I will simulate competitor and market reactions to OpenAI taking the lead:
- whether Google accelerates a successor to its Deep Research Agent;
- whether OpenAI signals general availability;
- how investors reprice Anthropic around the Opus 6.7 launch.

I will choose exogenous events independently of how the rolls go.

**Action 1 (funding decision).** The board has declined 6% twice (May and June). It accepted a 3% fallback that does not depend on the result. OpenAI's lead and the Opus 6.7 release raise commercial pressure. The ranked fallback, a protected 3% slice, is still plausible because it is cheap and already precedented. Funding "through November" crosses the Q3 close, so finance will probably want to review it in stages. The 6% request is very unlikely (<5%) at any roll. The correction is modelled by Threat 1 and is not counted here.
- **Failure bands:**
  - Fail by 0–9: 3% extended through August only, with Sept–Nov deferred to post-earnings.
  - Fail by 10–19: the decision is deferred to after Q2 earnings (early August), and the slice lapses on 31 July pending review.
  - Fail by 20+: explicit refusal beyond July, with the named-executive request also declined.
- **Success bands:**
  - Margin 0–19: 3% through September, with Oct–Nov "to be considered".
  - Margin 20–34: 3% through November with successor checkpoints booked.
  - Margin 35+: the same, plus a named accountable executive and a recommendation to defer autonomy increases adopted in principle.

**Action 2 (July mechanism test).** The resources are already funded and the design is diagnosed, which lowers execution risk. Threat 2 separately models schedule overrun and an inconclusive result. This action's own risk is engineering: a freeze slipping, a checkpoint pipeline fault, or scorer availability.
- **Failure bands:**
  - Fail by 0–9: launch slips about 5 days, and the capability-update step completes but successor-data does not.
  - Fail by 10–19: an infrastructure fault restarts one arm, leaving only a current-generation result.
  - Fail by 20+: the run is invalidated (control/treatment mismatch), and the result is August.

**Action 3 (buyer-operated comparison).** Google's agent is generally available and therefore accessible to enterprise customers. OpenAI's preview is excluded from the plan. CAISI and UK AISI are engaged but move slowly. A completed comparison before 22 July is ambitious. Threat 3 separately models contract terms.
- **Failure bands:**
  - Fail by 0–9: UK AISI runs the rubric on an internal model only.
  - Fail by 10–19: adapters are delivered and acknowledged, with no runs.
  - Fail by 20+: the open-group readout also declines inclusion.

**Action 4 (transactional commit).** The transactional binding is feasible on Anthropic-controlled storage. Threat 4 separately models the crash-before-ack case and missed legitimate work. The action's own risk is scheduling and finding a compatible willing workload.
- **Failure bands:**
  - Fail by 0–9: the fix passes but no new workload is activated (about 35–36%).
  - Fail by 10–19: the fix passes only the retry test, the crash-recovery test is incomplete, and nothing is activated.
  - Fail by 20+: an engineer is pulled to Opus 6.7 launch support and the work slips.
- **Success:** coverage scales from 38% to a cap of 46%.

**Action 5 (statement and safeguard).** The hold on publication is Threat 1. The action's own risk is whether the purchaser channel (CDAO or the insurer) takes the proposal up in any concrete form. Base rates are low.
- **Failure bands:**
  - Fail by 0–9: CAISI files the proposal in its review.
  - Fail by 10–19: acknowledgements only.
  - Fail by 20+: the proposal is conflated with *Buist*, and the policy team is told to pause cross-lab advocacy.

**Action 6 (workers).** This is routine, internal and within budget.
- **Failure bands:**
  - Fail by 0–9: 55–65 remedies, with the key fix done and the package not yet cleared.
  - Fail by 10–19: the privacy review finds the withdrawn fixtures reached one unauthorised recipient (notification required).
  - Fail by 20+: the reconciliation finds a further small discrepancy (≤3) and the reviewer extends its timeline.
- **Throughput:** remedies stay near trend (65–85) unless a stated mechanism cuts them.
</analysis>

<action_odds>
Action 1 [Funding decision through November]: P(failure) 50%. Reason: 6% has been declined twice and commercial pressure is peaking after the OpenAI leap. A 3% fallback is precedented and cheap, but spanning the Q3 close invites deferral. 6% is capped as very unlikely at any roll.
Action 2 [July interruption-mechanism test]: P(failure) 35%. Reason: the compute and scorers are already funded and the design is diagnosed. Infrastructure has faulted every month since April. Schedule and power risks sit in Threat 2 and are not double-counted.
Action 3 [Buyer-operated frontier comparison]: P(failure) 60%. Reason: the Google GA agent is accessible, but getting government or customer evaluators to complete a run before 22 July is fast by institutional standards. Contract-term risk is in Threat 3.
Action 4 [Transactional commit repair]: P(failure) 45%. Reason: technically feasible on controlled storage. A willing compatible workload and full crash/recovery testing within a month are uncertain. The missed-work failure mode sits in Threat 4.
Action 5 [Statement and purchaser-contract safeguard]: P(failure) 60%. Reason: concrete uptake by purchasers within a month has a low base rate. The publication hold is modelled by Threat 1.
Action 6 [Worker service and reconciliation]: P(failure) 25%. Reason: routine internal work within the existing budget and staff. The key fix and synthetic fixtures are straightforward. The main risk is new findings from the review.
</action_odds>

<threat_odds>
Threat 1 [Ninth hold on correction and advocacy]: P(materialises) 72%. Adversary suggested 60% for the correction and 75% for the advocacy. Eight consecutive holds on *Buist* grounds, a pre-earnings quiet period and a same-month product launch put this at the judge's recommended 70–75%. The advocacy piece is folded in: if the threat materialises, both the correction and the advocacy are held or neutered.
Threat 2 [Three-week window overrun / inconclusive]: P(materialises) 50%. Adversary suggested 55%. There is a real slip history and the power concerns are genuine, but this is a single diagnosed mechanism with a prebooked schedule. Pure execution faults are already in Action 2, so this is slightly lower.
Threat 3 [Vendor terms block buyer testing]: P(materialises) 50%. Adversary suggested 60%. Enterprise benchmarking and publication restrictions are common and legal review is slow. However, UK AISI and CAISI have their own access routes, and internal-only evaluation is often permitted, so somewhat lower.
Threat 4 [Fix blocks legitimate work]: P(materialises) 35%. Adversary suggested 50%. Crash-before-ack is a real edge case, but idempotency records with stored responses are well-understood engineering. Scheduling failure is already counted in Action 4.
Threat 5 [Meta open release plus OpenAI GA pressure]: P(materialises) 28%. Adversary suggested 35%. The injunction applies only to the plaintiffs, the stay motion is pending, and Meta has been "evaluating". A July release is possible but less likely than a later one. Materialisation counts either a Meta release or an OpenAI GA announcement that visibly triggers commercial pressure on the slice.
</threat_odds>
