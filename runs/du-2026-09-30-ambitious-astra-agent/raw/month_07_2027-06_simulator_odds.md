<analysis>
**Action 1 (compounding alignment program).** The plan runs inside the 8.5% allocation, with four extra reviewers. The main bottlenecks are checkpoint and reviewer contention in the run-up to the late-June successor launch. The same contention cost April and half of March.

Validating agent-assisted reconstruction against manual review is feasible within a month. A result showing the method fails would still count as progress, since that outcome is covered by Threat 1.

"Longer research tasks with delayed consequences" are slow to build and slow to score. Delayed consequences by definition take time to arrive, so a full comparison by 23 June is tight.

The deliverable is a package plus a request, not a granted slot. Per the judge, next-generation checkpoint access has not yet been granted. Success means a credible package with a power calculation. Failure means slippage past 23 June or an underpowered design.

**Action 2 (patch retention).** The freeze regression around 10 June is scheduled, so running mainline against the patch is routine. Building and validating a repaired recovery candidate within about 10 days of fresh long-task data is aggressive.

Getting leadership to sign an "investigate first" standard in place of a revert trigger runs against product leads' objections and analysts' margin framing. With margins below 10, leadership decisions should resolve conservatively. The fallback of a workflow-scoped limit is technically plausible but needs an authorization.

Whether the patch is reverted after launch is Threat 3's job, so it is excluded here.

**Action 3 (containment / Corvane / insurer / AISI).**
- Repairing the recovery failure is ordinary engineering, and regression tests for the known bypass are routine. The Corvane test itself is already scheduled.
- Getting a signature right after a pass depends on both vendors passing. GPT-6 failed credential-scope in the dry run, but Corvane can still sign for the Claude path.
- Converting the insurer's letter of intent into an order within a month is uncertain, because its compliance team moves slowly.
- For AISI, submitting a costed scope is easy, but funding is not.

These are several partly independent parts, most of them through existing channels.

**Action 4 (August package and a public infrastructure proposal).** The internal package is routine work. The external proposal needs Anthropic's government-relations and GC sign-off, because an antitrust-safe-harbour ask looks close to the refused cross-lab program under *Buist*. A named sponsor plus a drafting session within one month is below base rate: Congress is focused on Hawley/Cotton. The AISI/CCS answer about existing authority is plausible, but slow.

**Action 5 (claims, nonprofits, worker product).** Pushing the pending cases forward is feasible, though agency decisions are outside our control. Funding nonprofit B's reviewer from a discretionary balance is possible. Supporting nonprofit C's privacy work is cooperative work. A normal product release of a personal-document workflow to existing users within a month needs privacy, legal and product review, which is unlikely this soon after the C incident. The Midwest grievance moves at labour-process speed.

**Threats.**
- **Threat 1** fits the known same-family judge bias, but random human audits catch it, so it bites mainly on cost.
- **Threat 2** fits the prior evidence: the cue ablation explained about 6 of the points.
- **Threat 3** requires the patch to survive the freeze, the launch to happen in late June, and complaints to cross the threshold quickly. Only part of that window falls in June.
- **Threat 4** fits the quarterly cadence of announcements.
- **Threat 5** rests on a *shadow* check. Misfiling inside the partner's own system, seen only by staff, often does not meet a notifiable breach standard.
</analysis>

<action_odds>
Action 1 [Compounding alignment program + July package]: P(failure) 40%. Reason: The plan runs through existing allocation and reviewers, but launch-period checkpoint and reviewer contention has derailed two of the last three months. Long delayed-consequence tasks are slow to build and score by 23 June, and success yields only a request, not a slot.

Action 2 [Patch retention and repaired candidate]: P(failure) 50%. Reason: The freeze regression is scheduled, but a validated repair in about 10 days is aggressive. Leadership is unlikely to swap the revert trigger for "investigate first" given product objections and margin pressure, and small-margin decisions resolve conservatively.

Action 3 [Containment repair, Corvane test, insurer, AISI]: P(failure) 35%. Reason: These are mostly existing channels and ordinary engineering, and the Corvane test is already scheduled. Converting the insurer to an order and funding AISI are the weak links, but they are not required for partial success.

Action 4 [August package + public alignment-infrastructure proposal]: P(failure) 50%. Reason: The internal package is routine. The external ask needs government-relations and GC sign-off in the shadow of *Buist*, and a named congressional sponsor plus a drafting session within one month is well below base rate.

Action 5 [Claims, nonprofits, self-serve worker workflow]: P(failure) 45%. Reason: Pushing cases forward and supporting nonprofit C's privacy work are feasible. A product release of a personal-document workflow is unlikely to clear privacy and legal review within a month of the C incident, and agency decisions and the grievance process are slow.
</action_odds>

<threat_odds>
Threat 1 [Same-family reconstructors miss concealment]: P(materialises) 35%. Adversary suggested 40%; reason for any difference: The mechanism is well documented, but the plan's random human audits and its keep-manual rule make it a cost problem rather than a hidden error. Needing twice the reviewer time is a somewhat specific magnitude.

Threat 2 [Honesty effect is cue-dependent]: P(materialises) 30%. Adversary suggested 30%; reason for any difference: This matches. The May ablation attributes about 6 points to cue randomisation, the CI is wide, and out-of-distribution long tasks usually shrink effects. It is still far from certain the effect falls to non-significance.

Threat 3 [Revert trigger fires after launch]: P(materialises) 25%. Adversary suggested 35%; reason for any difference: It requires the patch to survive the 10 June freeze and complaints to cross the threshold within days of a late-June launch. Much of the window falls in July, and the complaint class is real but the threshold is unknown.

Threat 4 [Rival research-automation jump]: P(materialises) 35%. Adversary suggested 45%; reason for any difference: OpenAI and GDM make frequent automation claims and Q3 release signals are likely. However, a clear "big step-up" announcement that the board explicitly links to Anthropic's alignment spend within this one month is less certain.

Threat 5 [Nonprofit C breach becomes notifiable]: P(materialises) 15%. Adversary suggested 30%; reason for any difference: The misfiling was found in a shadow check. Exposure limited to the partner's own staff and systems often falls below state notification thresholds. It needs a claimant-facing exposure that is not established in canon.
</threat_odds>
