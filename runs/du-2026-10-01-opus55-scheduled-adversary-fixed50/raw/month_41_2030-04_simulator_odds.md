<analysis>
**Action 1 (ablation, residual, successor arm).** This action bundles four sub-goals and runs on idle-trough capacity only, since the CFO excluded preemptible capacity. That capacity now competes with AISI red-teaming from 6 April and with gate preparation.
- **Generator.** Using CI-6 as the environment generator is plausible, because it is internally deployed and runs its own eval pipelines. It should beat the 31% pass rate, but a new generator needs validation against the holdout split's distribution. That costs a week or more.
- **Ablation target.** 6,000 usable environments by 30 April is a stretch. Last month produced 4,150 in the available troughs.
- **Mechanistic residual search.** Open-ended research. Last month's pace suggests only small reductions per month.
- **Multi-agent integrity arm.** Goes through the RL lead's environment-mix spec, which has never been vetoed. Cross-checkpoint transcript access may still trigger another CISO review, like the 17-day one last month.
- **Pre-registration.** Routine.
- **Compounded risk:** around 45–50%.

**Action 2 (CEO gate).** The CEO decides at the gate, and partner-only release matches his stated lean, so the core recommendation probably lands. The attached asks are weaker:
- **Preemptible capacity** reverses the CFO's explicit position from four weeks ago.
- **The $150M fund** has been declined or ignored by the CFO and IR for three months.
- **Competitive pressure.** GPT-7 is public at 5.73 and sits within about 0.3 of CI-6, and markets and analysts will watch the gate. Together these push toward broader commercial release, not more conditions.
- **Framing.** Calling the fund "his release condition" risks a refusal to have his terms framed for him.

Overall, success means partner-only plus at least one attachment, which makes failure somewhat more likely than not.

**Action 3 (open tooling, OpenAI/GDM).** Several obstacles:
- Security and counsel blocked the steering harness as dual-use. A honeypot generator also arguably teaches evasion, so a release blocked or narrowed is likely.
- OpenAI is publicly contesting the methodology, and an offer with AISI as escrow fits its incentives poorly.
- GDM "in principle" is the most likely gain.
- Counsel diluted the last signed commitment.

**Action 4 (CSIRT charter).** Base text exists and adoption is targeted for mid-April. Multi-agency charters routinely slip, and Canada's sign-off is still with Public Safety legal. The NUS joint preprint in a month is feasible but could slip on the personal-capacity collaborator's own approvals. Overall a moderate risk.

**Action 5 (app and pledge).** This is mostly within Anthropic's own control. Using public openings removes last month's dependency. The targets (+4,600 users, +32 placements) are well above the recent pace, so partial success is likely. The pledge has been stuck at 11.

**Action 6 (science).** All three items depend on partner committees: the DNDi committee on 9 April, the TB ethics review and the GFI board. Their timing has slipped every month for four months. These are summaries the partners can use, but the committees control the timing.

**Threat 1.** The ingredients are present: proliferating agents, ~1,060 exposed MCP endpoints, and near-frontier open weights (V7-R at 5.14). A severe, state-suspected, AI-enabled disruption of satellite or telecom networks in any given month is still a low base-rate event, though meaningfully higher than in 2026.

**Threat 2.** Unemployment is 7.7%, trust is at the floor, and anti-AI positioning is mainstream. April 2030 has few primaries, since most early ones were in March and most others fall in May and June. Still, March results and any April contests could carry the "rewards anti-AI" press framing.
</analysis>

<action_odds>
Action 1 [Ablation localisation and successor integrity arm]: P(failure) 48%. Reason: four sub-goals on idle-trough-only capacity competing with AISI red-teaming; the new generator needs validation; the 6,000 target exceeds last month's 4,150; possible CISO review of cross-checkpoint transcript access.
Action 2 [CEO gate package]: P(failure) 55%. Reason: partner-only matches his lean, but preemptible capacity reverses the CFO's March position, the fund has been refused for three months, and GPT-7 competitive pressure and market scrutiny push against extra release conditions.
Action 3 [Open generator and rival-lab measurement]: P(failure) 52%. Reason: security and counsel previously blocked comparable dual-use tooling; OpenAI is publicly contesting the methodology; GDM is likely only "in principle"; counsel tends to dilute signed commitments.
Action 4 [CSIRT charter adoption]: P(failure) 45%. Reason: base text exists and adoption is targeted for mid-April, but multi-agency charters and Canadian legal sign-off routinely slip; the NUS preprint timing is uncertain.
Action 5 [App tracks and pledge]: P(failure) 35%. Reason: mostly under Anthropic's control with the dependency removed; the targets are above the recent pace and the pledge has stalled, so a partial result is likely.
Action 6 [DNDi, TB, GFI support]: P(failure) 55%. Reason: all outcomes are gated by partner committees and boards that have slipped every month; the materials help but do not control the timing.
</action_odds>

<threat_odds>
Threat 1 [AI-enabled satellite and telecom attack, state-linked]: P(materialises) 15%. Adversary suggested: not stated. Reason: agent proliferation, exposed endpoints and capable open weights raise this above the 2026 base rate, but a severe infrastructure disruption with state suspicion remains rare in any single month.
Threat 2 [Primaries reward anti-AI candidates]: P(materialises) 40%. Adversary suggested: not stated. Reason: 7.7% unemployment and floor-level trust make anti-AI positioning mainstream and the framing likely, but April has few primary contests to anchor it.
</threat_odds>
