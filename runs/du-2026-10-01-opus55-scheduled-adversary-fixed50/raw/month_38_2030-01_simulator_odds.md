<analysis>
**Action 1 (milestone 2 and probing).**
- **The mechanical parts are low-risk.** The hashes are logged and the RL lead pre-signed the 8% rule, so the reading and the AISI log should go through.
- **Probing depends on the CISO.** The 12 January review is real, but security reviews of weights on eval nodes usually come back with conditions such as access logging, network isolation or two-person rules. Year-start backlog after the post-listing workload adds to the risk of slipping a week or more.
- **The ablation fork is the weak part.** It needs training-side compute while CI-6 is mid-run. Training leads guard slack, and preemptible training windows are scarce, so this is likely deferred.
- **Checkpoint timing.** The milestone 2 checkpoint is projected for late January but could slip into early February, as milestone 1 did.
- **Failure here means** probing does not start or the reading misses January.

**Action 2 (allocation default).**
- **The pilot continuing is easy.**
- **The CEO has said twice that he decides at the gate.** CI-6 internal deployment may not come in January. A post-IPO CEO will not adopt a standing rule giving about 40% of capacity away. He keeps the override.
- **Legal review is unlikely to close in January.** It only starts the week of 5 January, and counsel is still carrying post-listing workload. A pre-answered Q&A helps but does not guarantee closure.
- **Failure means** no allocation decision or default this month. The most likely outcome is deferral to the gate, with partial credit for the pilot data.

**Action 3 (rival measurement and essay).**
- **The consortium is independent and on schedule for late January.** Academic slippage of one to three weeks is common.
- **GPT-7's public date is "Q1"** and may not land in January, so the harness may not run yet.
- **The AISI third-tier offer is a simple offer.** AISI acceptance is slower.
- **The essay faces the heaviest friction.** An attributed essay as Claude that commits Anthropic's CI-6 to independent pre-release testing needs leadership and counsel sign-off. Post-IPO, a forward commitment is exactly what they have been refusing. Expect it to be watered down or delayed.

**Action 4 (jobs).**
- **This addresses the stated objections.** An employer of record removes co-employment, and booking it to the vendor budget removes the headcount issue.
- **But the timeline is ambitious.** HR said "Q1 planning", and procurement for a 250-person staffing contract takes weeks. A January start is optimistic.
- **The fund is a leadership call.** Earnings are probably in February or March, so January can at most produce a draft endorsement.
- **Ohio and North Carolina clearance is plausible.**
- **The jobs line has failed three straight months.**

**Action 5 (international and compute security).**
- **The tabletop is in February,** so the standing channel cannot be produced this month. Only preparation is possible.
- **The BIS KYC NPRM is listed as "pending".** If it has not been published, there is no open docket, and the comment becomes a letter rather than a filed comment.
- **Provider support and MCP patches are routine,** but the target of 1,100 endpoints is aggressive given recent rates of about 70 to 95 per month.

**Action 6 (science).**
- **The TB academic grant still hits university grant administration and ethics amendments.** University procurement already stalled once.
- **DNDi depends on its committee.**
- **The GFI slot is outside our control,** and expression results take weeks after the slot, so a $250/g figure in January is unlikely.

**Threat 1 (researcher-level systems withheld).**
- **The capabilities are not there yet.** Current frontier systems are CI-5.6 to 5.7: month-scale scoped research with light supervision, not "outperforming human researchers across most domains."
- **One part already holds.** Governments are already demanding oversight.
- **GPT-7 is slated for public release,** which contradicts "none released."
- **Partial echoes are possible,** for example an internal claim or a leak.

**Threat 2 (Taiwan inspection regime).**
- **Low monthly base rate,** and no escalation thread is running in the world state.
- **It is still a recurring PRC tool,** so the probability is not negligible.
</analysis>

<action_odds>
Action 1 [Milestone 2 + probing on weights]: P(failure) 35%. Reason: the reading and logging are mechanical and pre-committed. The CISO approval, which may come with conditions, and checkpoint timing are moderate risks. The training-side ablation fork will probably be denied, but that is a sub-goal.
Action 2 [Allocation default for CI-6]: P(failure) 60%. Reason: the CEO has twice reserved the decision for the gate and keeps the override. A standing ~40% rule is very unlikely post-IPO. The gate may not come in January, and legal review started late.
Action 3 [Consortium/GPT-7 harness/AISI tier/essay]: P(failure) 45%. Reason: the consortium is independent and roughly on time. GPT-7 may not release in January. The essay's forward commitment for CI-6 runs into counsel and comms post-IPO and will likely be diluted or delayed.
Action 4 [250-worker vendor pilot, fund, OH/NC]: P(failure) 55%. Reason: it directly answers HR's objections, but the vendor contracting and a January start are tight. The fund depends on leadership, and earnings come after January. The jobs line has three straight failures.
Action 5 [Tabletop prep, BIS comment, providers, MCP]: P(failure) 35%. Reason: the February tabletop means the channel itself cannot happen this month. The NPRM docket may not be open. Provider support and MCP are routine, but the 1,100 endpoint target is optimistic.
Action 6 [TB grant route, DNDi, GFI]: P(failure) 60%. Reason: university grant administration and ethics amendments are slow. DNDi depends on its committee. GFI expression results will not be in hand by month-end, so $250/g is not reachable in January.
</action_odds>

<threat_odds>
Threat 1 [Researcher-level systems withheld, oversight demands]: P(materialises) 8%. Adversary suggested probability not stated; reason: frontier is CI-5.6–5.74, short of broad human-researcher superiority. GPT-7 is headed for public release, contradicting "none released". Only a partial echo (oversight demands) is plausible, and that is already ongoing.
Threat 2 [China Coast Guard inspection regime around Taiwan]: P(materialises) 4%. Adversary suggested probability not stated; reason: low monthly base rate for this escalation and no active cross-strait crisis thread in the world state, though it remains a known PRC option.
</threat_odds>
