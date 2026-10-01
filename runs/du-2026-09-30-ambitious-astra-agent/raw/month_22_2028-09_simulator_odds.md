<analysis>
**Action 1 (continue interleaving and correction-vs-reward experiments).** This is mostly execution on runs already going, on alignment-owned capacity with 11% Q3 compute released. The readouts are scheduled for October, so September's deliverables are:
- runs kept intact;
- the transfer evaluation prepared;
- more human labels.

The risks are mundane: sharding or evaluation bugs (July precedent) and label throughput. Label band: 40–70 new labels is the base case (last month's 70 was fast). Above 90 would be too generous. Success cannot include any durability result, because that is October.

**Action 2 (automated search for correction-failure causes).** This needs a build, search, freeze and independent evaluation cycle, all by 20 September, on reduced environments. Execution risk is high: environment construction, compute caps, and keeping the falsification environments genuinely separate. Threat 1 prices candidate shrinkage separately. Leadership's sealed frontier experiment and Q4 research funding are a separate decision. The capability lead has refused checkpoints three times, and the "not frontier-grade" line stands. Even on success, the best realistic outcome is "deferred to Q4 budget cycle" or approval in principle with no date.

Effect bands for the surviving candidate on held-out environments, as reduction in correction resistance versus the strongest baseline:
- null: under 5%;
- weak: 5–15%;
- meaningful: over 15%.

**Action 3 (support OpenAI rerun and two external users).** The rerun is OpenAI's call, and Threat 2 covers slipping or dilution. This action's failure covers:
- a freeze or regression break before the rerun;
- neither external user executing;
- OpenAI not engaging on the template.

At OpenAI's historical cadence, results arrive in early October at best. A named training-decision owner in September is unlikely even on success; "will discuss after results" is the realistic ceiling.

**Action 4 (controller restart fencing, symlink fix, coverage).** This is the fourth controller iteration. Durable writes on the hot path are the classic latency trade-off, and Threat 3 prices the gate miss.

Execution risk outside the gate:
- the symlink confinement breaks a supported configuration;
- coverage pushes stall under healthcare change freezes.

Coverage bands:
- 66–70%: failure;
- 70–74%: partial;
- 75% or more: full, which is unlikely.

Even if the canary gate is met, the owner's canary approval is a separate decision, roughly 50/50 given the latency history.

**Action 5 (worker service).** The third partner's training on 12 September can slip (it has already lost one coordinator). The legal review is scheduled, but counsel has a track record of slipping. Output band: 1,800–3,000 (last month was 2,250 with two partners). The workforce-board quote is feasible. Remedies for the harmed worker are uncertain.

**Action 6 (assessment proposal, NGO asks, self-assessment request).** Drafting and the chair's decision paper are easy. CDT and AFL-CIO will stay at their review cadence, with no conditional support in September. The self-assessment authorization is the hard part, and Threat 5 carries it. Hawley's letter adds counsel friction.

**Threat conditioning.**
- Threat 1 is independent of Action 2 execution, but it is void if Action 2 fails before a shortlist is frozen.
- Threat 3 is partly conditioned on the Action 4 roll: if Action 4 fails, the gate is effectively missed anyway.
- Overrun risk in production stays elevated, because admission control is still absent and the programme is ramping. This should surface as an exogenous or background risk, not be assumed away.
</analysis>

<action_odds>
Action 1 [Finish running correction experiments]: P(failure) 25%. Reason: runs are already live on owned compute with released allocation; the risks are mundane pipeline bugs and slow labels; no readout is due this month.

Action 2 [Automated failure-cause search + sealed frontier offer]: P(failure) 50%. Reason: an ambitious three-week build/search/freeze/evaluate cycle with a new environment build; the leadership refusal pattern is strong; success yields at most a deferred or in-principle decision.

Action 3 [OpenAI rerun support + external implementations]: P(failure) 35%. Reason: the engineering side is solid, but the external users have not run anything and depend on their own compute; the template ask stretches a platform engineer's scope.

Action 4 [Controller fencing, symlink fix, coverage]: P(failure) 50%. Reason: the fourth controller iteration and filesystem confinement across configurations both carry real risk; healthcare change freezes cap coverage gains; the latency gate itself is carried by Threat 3.

Action 5 [Worker package, legal review, 3,000 outputs]: P(failure) 40%. Reason: the third partner's history of slipping, counsel's cadence, and an output target above last month's actual.

Action 6 [Cross-vendor assessment proposal + self-assessment request]: P(failure) 40%. Reason: the drafting and NGO/chair materials are routine, but the Hawley letter and sign-off rules add friction; the self-assessment decision is modelled in Threat 5.
</action_odds>

<threat_odds>
Threat 1 [Search survivor shrinks]: P(materialises) 50%. Adversary suggested 45%; I go slightly higher because winner's-curse shrinkage on reduced environments in a compressed cycle is the base-rate outcome, consistent with the 27–36% reproduction failures seen here.

Threat 2 [OpenAI rerun throughput-only or slips]: P(materialises) 45%. Adversary suggested 40%; I go higher. A platform engineer rarely controls behavioural-evaluation scope, OpenAI's milestone pressure is real, and last month's judge flagged my underpricing of OpenAI friction.

Threat 3 [Controller misses latency gate / confinement breaks config]: P(materialises) 45%. Adversary suggested 50%; slightly lower because separating the normal path from recovery is a known pattern and the team has learned from three iterations. It is still near a coin flip, and failure is effectively forced if Action 4 fails.

Threat 4 [Missed-deadline complaint goes public]: P(materialises) 15%. Adversary suggested 25%; lower because the case is already escalated to legal with a named contact and remedy-seeking, and a single-worker story reaching the press or the AG within one month is uncommon. It is not negligible given the political salience.

Threat 5 [Leadership refuses/defers external self-assessment]: P(materialises) 60%. Adversary suggested 55%; I go higher because the Senate letter, *Buist*, a pre-election period, a public-company posture and two prior refusals make refusal or deferral the default.
</threat_odds>
