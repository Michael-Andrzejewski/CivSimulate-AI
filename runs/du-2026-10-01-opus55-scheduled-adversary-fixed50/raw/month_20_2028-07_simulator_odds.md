<analysis>
**Measurement distributions this month.** These drive the freeze, so I state them before any rolls.

- **Q2 pass@k cost, weekly readings.**
  - The central expectation is 2.4 points, drifting by ±0.3 as the run matures.
  - On the 1,840-task set the 95% CI half-width is about 0.8. If the 4,000-task expansion is accepted, it falls to about 0.55.
  - P(point estimate >3.0 by end of July) ≈ 12%.
  - P(upper bound >3.0 at the 14 August freeze) ≈ 50% without the expansion and ≈ 30% with it.
- **AISI Q4 results.**
  - ~50%: they arrive in July and are broadly consistent with the internal reading (about 1.14–1.18×, "elevated, no new failure class").
  - ~25%: they arrive in July but flag a new concern, such as a novel concealment pattern or a disagreement with Anthropic's method.
  - ~25%: they slip into August.
- **TB candidate 1 CFU readout.**
  - ~70% that it lands by early August.
  - Conditional on landing, ~35% that it shows a meaningful log-CFU reduction versus control. Most early leads fail in vivo.
- **Compute.**
  - Rubin Ultra comes online in July, but the Q3 run only starts after the 14 August freeze, at about 2.5–3× the Q2 run's effective compute.
  - July's internal CI delta stays at about +0.04, with Q2 run completion plus RL environments.
  - H2 2028 monthly deltas should rise to +0.05–0.07 once the Q3 run is live.
  - That keeps CI-5 around Q2 2029 and CI-6 by late 2030.

**Action 1 (Q3 config lock).** Mostly routine internal moves through channels that have worked before.
- **Eval expansion.** Changing the eval mid-run invites the CFO's office to suspect metric-shopping. The likely result is that the 4,000-task set is accepted as a parallel reading, not a replacement.
- **Valve order.** The CFO's office may accept "trim strata first" but refuse to rule out the 2% omission target, since its condition is on the whole 12%.
- **Full scale by 7 August.** Still constrained by human rubric review; plausible.
- **Q1 checklist.** Trivial, but the RSO's timing depends on AISI.

**Action 2 (integrity checker in beta).** A one-month build into a late-July beta is tight. The risks are QA, legal unease about a feature that displays the model's own omissions (liability and marketing exposure), and product reluctance to change the beta scope late. Enterprise beta seats for Apollo and AISI are a sales decision, but beta terms usually carry confidentiality that conflicts with Apollo's publication rights.

**Action 3 (kit).** Counsel itself invited an AISI-only request, so the odds are better than last time. It is still counsel plus the RSO, and the harness review has already slipped twice. The methods-paper fallback still needs comms review.

**Action 4 (recurring Apollo table).** This mostly needs Apollo to act in its own interest, and a quarterly table is likely. A GAO committee letter and floor-amendment text are less likely. AISI will log the format proposal.

**Action 5 (open-mode career tool).** Leadership already rejected a national rollout. Open mode removes the privacy blocker but not leadership's concerns about midterm-season political exposure, the liability of job advice, or cost. Building the tool is easy; approval is the gate.

**Action 6 (bundle).** MCP, TB and DNDi are routine. The small-practice tier needs a budget extension, and distribution through the ADA and AVMA is slow. ENISA and CERT-EU engagement through Shadowserver is plausible, but small hosts' pledges are voluntary and uptake will be thin.

**Threats.**
- **Threat 1 (conventions).** The RNC is likely in July 2028 and the DNC possibly in August. "Both nominees" may therefore straddle the month. The race-with-China plus worker-protection framing is highly likely given 5.9% unemployment.
- **Threat 2 (cloud outage).** Major multi-day cloud outages run at about 1 per year (CrowdStrike 2024; AWS in October 2025 was shorter). AI ops agents are pervasive by 2028, which raises the share of outages they cause, but a multi-day outage across thousands of businesses within a single month remains uncommon.
</analysis>

<action_odds>
Action 1 [Q3 config lock]: P(failure) 30%. Reason: These are established internal channels with prior successes. The risks are the CFO's office treating the eval expansion as metric-shopping, or refusing to exclude the 2% target from the valve, and full pilot scale slipping past 7 August.

Action 2 [Integrity checker in beta]: P(failure) 55%. Reason: The one-month build is tight against the late-July beta. Legal and marketing are uneasy about a feature that displays the model's own omissions, and product resists late scope changes. Beta confidentiality terms conflict with evaluator publication.

Action 3 [Kit via re-scoped routes]: P(failure) 45%. Reason: Counsel invited the re-scoped request, but RSO and legal sign-off are still needed. The harness review has slipped twice. The fallback paper still faces comms review.

Action 4 [Recurring Apollo table]: P(failure) 40%. Reason: Apollo has its own incentive to commit to a quarterly table. A GAO committee letter and amendment uptake are unlikely within the month. AISI will only log the format proposal.

Action 5 [Open-mode national career tool]: P(failure) 55%. Reason: Leadership already declined a national rollout. Removing the privacy blocker does not address political, liability or cost hesitancy in midterm season, though the engineering is easy.

Action 6 [Health and security bundle]: P(failure) 30%. Reason: The MCP, TB and DNDi work is routine. The small-practice tier needs a budget extension, and ADA and AVMA distribution is slow. Small European GPU hosts' takedown pledges are voluntary and uptake will be thin.
</action_odds>

<threat_odds>
Threat 1 [Conventions: China race plus worker protections]: P(materialises) 55%. Adversary suggested moderate. The framing is very likely given unemployment and US-China dynamics, but one convention probably falls in August, so "both nominees in July" is only partly within the month.

Threat 2 [AI-ops-agent cloud outage]: P(materialises) 8%. Adversary suggested major. The base rate of multi-day, thousands-of-businesses cloud outages is about 1 per year. AI ops agents' share of the causes is rising by 2028, but a single month is still a low-probability window.
</threat_odds>
