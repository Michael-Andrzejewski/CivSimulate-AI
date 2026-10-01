<analysis>
**Action 1 (causal test of the grader-present cluster, 8k ablation, conditional mix change).**
- **Lowest-risk part:** the causal test itself. Ablating and steering an identified cluster on three logged checkpoints uses existing tooling and approvals, since the CISO conditions and transcript honeypots are already cleared.
- **Risks:**
  - The cluster may be polysemantic, so ablation degrades general capability and confounds the honesty readout.
  - The ≥2pp threshold may come back ambiguous: the effect could sit at about 1–3pp with a CI straddling it.
  - Reaching 8,000 environments is about 50% above April's 5,310 under the same idle-trough cap, so it will probably fall short again.
  - If the result is causal, the mix change still needs RL-lead sign-off and a held-out check before it enters a run already in progress.
- **What counts as success:** the causal test completes against the pre-registered threshold, and the mix change goes in if the result is causal. The 8k figure is graded as partial.
- **Successor checkpoint 2 (expected in May, about 25% through the run):**
  - The gap distribution is centred near +0.02 with SD about 0.012, and has a slight upward drift as the run lengthens: two prior readings at +0.02, and the agentic stream weakly implicated.
  - P(gap ≥0.03) ≈ 22%. At this stage the integrity arm is absent.
  - Checkpoint 3 likely lands in June.

**Action 2 (sunset review).**
- **(a) Extending the idle-trough rule:** this is cheap, the council already adopted it, and the results justify it. A likely watered-down form is extension to the Q3 review rather than to December.
- **(b) Preemptible capacity:** the CFO has refused it twice, so even with a cap and revocability its odds are below even.
- **Q3 condition memo:** the CEO has said terms are his, so it is likely acknowledged and not adopted.
- **What counts as success:** (a).

**Action 3 (AISI items on the GDM successor, permissionless GPT-7 run, public call).**
- **Permissionless re-run:** near-certain.
- **AISI running our items in GDM's pre-release testing:** this needs GDM to agree to a scope change mid-test, and GDM has refused item commitments twice. AISI may also be wary of using a competitor's items on a third lab.
- **Public call:** it faces counsel dilution again.
- **What counts as success:** AISI incorporating the items. That is hard.

**Action 4 (CSIRT indicator feed, MCP SDK patch, Canada, NUS).**
- **SDK patch:** Anthropic owns it, so this is low risk. A default-auth change may break some developers and draw complaints.
- **Indicator feed:** a first operational product within roughly five weeks of charter adoption is plausible, because Rotterdam gives a motive and ENISA already has advisories. The likely form is agreement in principle or a pilot.
- **Canada:** the ministerial cycle is outside our control.
- **NUS:** posting is probably on track.

**Action 5 (jobs).**
- Ohio is already live, so that part is redundant; Michigan is new.
- **Targets:** 85k users and 500 placements are far above the trend of about 4k users a month. 18 pledge signatories is likely to miss.
- **Pilot:** the fourth CFO ask, landing in the Q2 review he controls. The cap and sunset help somewhat.
- **What counts as success:** the Michigan configuration and the red-team pathway ship with continued growth.

**Action 6 (science).**
- **TB:** certified translations plus an ethics sitting is a 4–8 week path.
- **DNDi:** depends on the sponsor lab's timing.
- **GFI:** the board can ratify conditionally, but its freeze culture argues against that.
- Each item is about 50–65% likely to fail, and the record here has been repeated slippage.
- **What counts as success:** at least two of the three blockers cleared.

**Threat 1 (foreign theft of near-frontier US weights).**
- The base rate of a public intelligence-agency warning about stolen frontier weights in any given month is low.
- It is elevated by high-value CI-6-class targets, rising US–China tension and the Taiwan drills.
- The forcing-event context does not change its likelihood.
</analysis>

<action_odds>
Action 1 [Causal test of grader-present cluster]: P(failure) 40%. Reason: The core test runs on existing approved tooling. The compound risk comes from polysemantic confounds, an ambiguous result near the 2pp threshold, and RL-lead or held-out validation before a mid-run mix change. The 8k target will likely be missed and is treated as partial. Separately, the checkpoint-2 gap is distributed around +0.02 (SD ~0.012), with P(≥0.03) ≈ 22%.

Action 2 [Sunset review packet]: P(failure) 35%. Reason: Success is defined as extending the idle-trough rule, which is cheap and well supported, though it may be shortened to Q3. The preemptible ask (b) has an independent failure risk of about 65% given two prior CFO refusals. The Q3 condition memo is likely only acknowledged.

Action 3 [AISI items on GDM successor / permissionless testing]: P(failure) 60%. Reason: The defining sub-goal needs GDM to consent to a scope change in mid-testing, after two refusals to commit, and AISI is reluctant to adopt a competitor's items for a third lab. The permissionless GPT-7 re-run is near-certain but is a lesser outcome. The public call faces counsel dilution.

Action 4 [CSIRT feed + MCP SDK patch]: P(failure) 35%. Reason: The SDK patch is owned in-house. A Rotterdam-motivated indicator feed is plausible as agreement in principle or a pilot. Canada's ministerial timing is outside our control, and NUS posting is likely.

Action 5 [Jobs app/pledge/pilot]: P(failure) 40%. Reason: The Michigan configuration and red-team pathway are shippable in-house, which is the success definition. The 85k/500/18 targets are far above trend and will be missed. Pilot approval has a separate failure risk of about 60%.

Action 6 [Science paperwork]: P(failure) 60%. Reason: Each of the three items depends on external committees, translators and sponsor timelines that have slipped repeatedly. Success requires two of the three blockers cleared.
</action_odds>

<threat_odds>
Threat 1 [Foreign theft of near-frontier US weights]: P(materialises) 7%. Adversary suggested no explicit figure; reason: a public intelligence warning of actual weight theft is a rare, high-threshold event. The base rate is perhaps 2–4% per month, raised somewhat by the CI-6-class targets, Chinese incentives after the export controls, and Strait tensions. Nothing in the current state shows a live intrusion lead.
</threat_odds>
