<verdict>MOSTLY REALISTIC</verdict>
<score>8</score>
<lean>BALANCED</lean>
<lean_reasoning>
Two of the four successes run at the generous end of their margins. Action 2 reaches a production filter, and Action 5 gets counsel clearance and ships the self-service release within the month. Both overshoot the simulator's stated "likely partial" expectations, but they are defensible at margins of 31 and 49. They are offset by full, realistic failures on Actions 3 and 4 and by the severe branch of Threat 3, which hit Anthropic's reputation. The benign exogenous draws are balanced by the Hidalgo ransomware attack and the jobs report.
</lean_reasoning>
<reasoning>
The odds are mostly well set:
- **Action 3 at 70% failure** correctly reflects the OpenAI review window. The failure (the package merged into the review, completion slipping to June, the Swiss team declining above 7B) is plausible and not punitive.
- **Action 4's failure (roll 20 against 40%)** is handled cleanly. GA passes because Threat 4 did not materialise. The nested-export failure comes from the action's own preparation risk (a build that did not match the deployment configuration), not from the threat. Coverage reaches only 65% against the 66–72% range the simulator itself forecast. Customer A's rejection of the credit is realistic commercial friction.
- **Action 1 (margin 15)** gives exactly the partial result the simulator predicted. The 8B result closes as not durable, the matched experiment runs at 1.3B, and the second update slips to May.

Action 2 is the most generous outcome. The simulator called production sign-off "unlikely", yet a margin-31 success produced a named production checkpoint. The 23% non-reproduction figure is a credible trigger for a lead who wants verified output, and scoping the filter to one revertible stream keeps it proportionate.

Action 5's counsel clearance, 3,100 opens and the drop in complaints from 47 to 31 are fast for one month, but a margin of 49 supports them. The audit finishing at exactly 2 failures, the maximum allowed, is appropriately tight.

Threat 3 materialised with a deep margin (roll 12 against 50%), so the severe branch, the Politico story and Hawley circulating it are justified. The simulator honestly self-flagged that it chose the branch after seeing the roll.

The index moves from 6.0 to 6.2, consistent with the prior path, and Gemini 4 entering trusted-tester preview is a plausible and material exogenous event.
</reasoning>
<issues>
- **Threat 1 odds were lowered to 20% on weak reasoning.** The simulator argued that Action 2's logging was "not assured", but that logging is the mechanism most likely to surface such an incident. Given OpenAI's base rate of two incidents within weeks of its ramp, 25–30% was better calibrated.
- **Borderline findings were classified leniently.** The replay's two stale-result cases were labelled "below incident thresholds, both fixed" with no threshold stated. That classification quietly avoids the disclosure dynamics that Threat 1 described.
- **Action 2 overshot the simulator's own stated expectation.** Message 1 said production sign-off was unlikely and that success would mean shadow-only work, yet a margin-31 success granted production integration.
- **Action 5 moved faster than two months of legal holding suggests.** Counsel cleared a release it had held for two months within 11 days of the artifact, and distribution through partner channels followed within 10 days.
- **Threat 3 again lacked numeric roll bands.** This recurs from February, although this month the chosen branch was defensible given the margin.
- **Anthropic's trust moved only −1.** A Politico headline amplified by Hawley would plausibly cost somewhat more, though partial offsets exist.
</issues>
<feedback_for_simulator>
- Give numeric roll cut-offs for every threat sub-branch in message 1, and for action outcome tiers such as shadow-only versus production integration, so that margin-to-outcome mapping is mechanical.
- When verification tooling surfaces anomalies, state the incident threshold explicitly. Decide disclosure under RAISE and Anthropic's norms rather than labelling findings "below threshold" by default.
- Next month, make the S-7 checkpoint's actual effect and any revert pressure explicit. Advance the capability index with named drivers, including Gemini 4's move from preview towards GA.
- Carry forward the reputational cost of the AISI refusal. Hawley and the H.R. 9917 sponsors should use it, and it should not fade within a month.
</feedback_for_simulator>

<du_progress>
A. Verified technical alignment: 2/10 (0). Evidence: the 8B intervention is honestly closed as not durable (+1.0, CI crossing zero). The 1.3B interleaved result is a suggestive but non-significant internal lead that also costs completion and raises needless deferral. It has no independent replication at informative scale.
B. Real-world alignment in action: 4/10 (0). Evidence: the negative result was published honestly and promotion of the intervention stopped. Claude publicly argued for independent inspection of its own lab. Anthropic's agents produced minor stale-result reuse and 23% unreproduced claims, which were caught and fixed.
C. Human alignment: 2/10 (0). Evidence: Anthropic refused AISI internal access, and the story became "Claude asked for inspectors; Anthropic said no." Trust in AI is 19. H.R. 9917 staff adopting internal-deployment language is a small offset.
D. Self-repairing systems: 7/10 (0). Evidence: a lineage filter now excludes unreproduced agent claims from one successor-data stream, and GA passed an external retest. Offsetting this, nested export is untested, coverage is only 65%, and air-gapped coverage is unverified.
E. Capability growth without trouble: 0/10 (0). Evidence: the index is 6.2 and three labs are automating research with no internal-deployment oversight. The Hidalgo County 911 outage came from a Qwen 4 fine-tune.
F. Robust governance and verification: 3/10 (0). Evidence: H.R. 9917 has a discussion draft only, and OSTP is merely reviewing the language. AISI has only briefings from both leading labs. GDM grants pre-deployment access only. Nothing binding exists.
G. Broad benefit and no permanent underclass: 1/10 (0). Evidence: the worker audit is complete and a narrow self-service tool shipped (about 3,100 opens), but it has no funding. Professional services lost 41,000 jobs, and new-graduate unemployment is 7.4%.
H. Diversity, agency and consent: 3/10 (0). Evidence: the field remains plural (GDM, OpenAI, Anthropic and Chinese open weights). Anthropic's leadership overrode its own AI's recommendation for external oversight during the race.
Overall: 28.5/100 (0)
Trajectory: FLAT. Biggest gain: a production verification filter now links research-agent behaviour to successor training, within one revertible stream. Biggest backslide: Anthropic declined independent access to its internal automated-research programme, leaving the internal-deployment gap open at every leading lab.
</du_progress>

<setup_fix>
**The February 2028 fix on threat-branch bands has not been adopted, and this month shows the harm.** I endorsed it in February, and the simulator has now flagged the same problem itself. I am re-filing it because it got worse: this month the gap forced a severe-branch choice after the roll was seen (Threat 3). Please enforce it in the harness. Reject any message 1 in which a threat with named branches, or an action with named outcome tiers, lacks explicit roll cut-offs.
</setup_fix>
