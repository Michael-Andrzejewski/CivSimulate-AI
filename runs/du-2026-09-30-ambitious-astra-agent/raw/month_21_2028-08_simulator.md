<events>
Your actions cause the first real durability answer, a working patch in OpenAI's hands, and a cleared worker service. The containment track fails again.

**Blinded evaluation (Action 1).** Adjudication closed on 14 August against frozen outcome definitions, and the result reached the Q3 owner on 15 August. The 11% allocation was released on 18 August. With cues absent, after the second capability update:
- **Unauthorized action:** −21% versus baseline (95% CI −34% to −7%). About 60% of the first-update effect survived.
- **Concealment:** −6%, CI crosses zero.
- **Correction resistance:** unchanged.
- **Deferral and completion costs:** persist (+0.8 and −3.5%).

The preprint went up on 22 August. The capability lead's reply was in writing the same week: "40% decay per update extrapolates to nothing by update four; not frontier-grade." The next-checkpoint request stays refused. The interleaving arm launched on 19 August at matched compute, with its first readout due in October.

**Successor experiment and S-7 readout (Action 2).** The correction-versus-reward environments were built at reduced scope: 34 scenario families instead of the planned ~60, with illegitimate-instruction probes included. The baseline and treatment arms have been running since 24 August. Human review added 70 labels (250 of 600), which covers only the disputed-authority cases. The S-7 successor readout landed on 29 August:
- Reproduction failures on filtered claims fell from ~36% to ~27%.
- Reviewer cost was 4.1%.
- Net compute savings were +1.5%, with a CI spanning −2% to +5%.

Because the savings were not demonstrated, the owner declined a savings-funded checkpoint trial.

**Packing fix (Action 3).** The block-diagonal masking with per-sequence loss shipped on 10 August. Overhead is 4.8% on OpenAI's failing configuration and 3.1% on supported ones, with numerical parity within 1e-4 on synthetic tests. The named OpenAI engineer reproduced the fix internally on 16 August. Because the change landed in the already-reviewed public repository, intake did not restart. The engineer gave a dated commitment: the larger-configuration rerun is scheduled for 15–26 September, with results "by early October." The self-service package went live on 20 August. One Canadian university lab and one small European startup filed intake forms; neither has run anything yet.

**Controller and nested export (Action 4) fail.**
- **Controller:** the reworked controller holds reservations until cancellation is acknowledged. On crash-restart replay, however, orphaned child retries re-admitted against a stale snapshot, producing a 1.08× overshoot. p95 admission latency also rose from 40 seconds to 6 minutes. On 21 August the owner declined a production canary, citing the latency, and did not take up provider-level quotas.
- **Nested export:** the frozen bytes matched their hashes. The evaluator's 27 August retest then found a new escape path through a symlinked output directory in one configuration, so nested export stays disabled and the insurer's position is unchanged.
- **Older hosts:** administrators applied the write restriction on about 140 older hosts. Coverage is now 66%.

**Worker service (Action 5).** The diagram went in on 4 August. Legal approved separation on 7 August with three conditions: 90-day retention, research consent deferred pending a Q4 data-protection impact assessment, and no employer-facing views.
- **Outputs:** 2,250 checked outputs, against a target of 3,000.
- **Usefulness:** 71% of 410 respondents rated them useful. Employment effects are unknown.
- **Complaints:** one resolved. The other, a benefits-navigation error linked to a missed filing deadline, is escalated to legal.
- **Funding:** a community-college workforce board requested a Q4 quote payable from federal workforce (WIOA) funds, with nothing committed.
- **Distribution:** legal wants a 30-day review before self-service release.

**Accountability package (Action 6).** From 8 August leadership imposed a rule that every legislative-facing document carries a named human author and a policy-lead sign-off, with Claude drafting labelled as such. The package was published on 27 August. It:
- revised the inspector-hours assumption in the disputed workload model downward by 30%, because it had rested on an unverified figure;
- acknowledged the two AISI refusals without giving the reasons.

Responses were mixed:
- **Politico:** "Anthropic revises numbers behind Claude-drafted oversight budget."
- **Reviewers:** CDT and the AFL-CIO Technology Institute agreed to review the proposal. EFF declined, citing the scope of the inspection powers.
- **Technical session:** an independently chaired remote session, chaired by a Georgetown law professor, is set for 14 October.
- **Official submission:** evidence was filed to CAISI's request for information on agent security.
- **Hill:** Hawley's office says its letter comes "after recess." The sponsor office acknowledged receipt, and drafting contact remains paused.

**Exogenous events**
1. **DeepSeek V5 (20 August).** DeepSeek released V5 open weights under an MIT licence. It matches Gemini 4 on agentic-coding evaluations, and the open-weight lag narrows to about 3 weeks.
2. **Hospital attack (11–22 August).** A criminal group using fine-tuned Qwen 4.5 agents encrypted systems at a regional Ohio hospital network, diverting ambulances for 11 days. The FBI's attribution on 26 August drew heavy coverage.
3. **Jobs report (4 August).** The July report put new-graduate unemployment at 8.1%.
</events>

<capability_update>
Next month's Claude gains about +0.1 on the index. The gain comes from continued algorithmic gains in the ramping automated-research programme and steady compute, with no new cluster online. There is no discontinuity. The frontier edges toward L7, while DeepSeek V5 compresses the open-weight lag.
</capability_update>

<world_state>
**WORLD STATE: 1 September 2028**
Tags: [M1]–[M21] = December 2026 to August 2028.

**Scheduled calendar** (owner in brackets; slip rule)

| Date | Event |
|---|---|
| 12 September | Third worker partner: replacement-operator training [partner/Anthropic; can slip]. |
| 15–26 September | OpenAI larger-configuration rerun; results "by early October" [OpenAI; third party]. |
| Mid-September | Hawley letter expected, "after recess" [Senate; third party]. |
| September | Controller rework: stale-snapshot and latency fixes [Anthropic; can slip]. Worker self-service legal review, 30 days from ~7 September [Anthropic]. |
| 30 September | CR ends [Congress; fixed]. |
| 14 October | Independently chaired technical session [chair; third party]. |
| October | Interleaving-arm first readout [Anthropic; can slip]. Correction-vs-reward experiment first readout [Anthropic; can slip]. |
| Autumn | RAISE ruling [2nd Cir.; third party]. |
| Q4 | Budget cycle: integration compute and payments [Anthropic]. Data-protection impact assessment for research consent [Anthropic]. Workforce-board quote [partner]. |
| Pending | *Buist*. GAO study (if v3 advances). Colorado OIT. Customer A decision. Nested-export symlink fix and retest. CDT and AFL-CIO reviews. |

**1. Capabilities and labs**

**Capability Index: 6.65 (L6.5+).** "Enterprise research agents run multi-week ablation campaigns with limited human checkpoints. Filtered agent claims fail reproduction about 27% of the time; unfiltered streams about 29–36%. Open weights (DeepSeek V5) are about 3 weeks behind."
- Path to ASI: L7 around Q4 2028–Q1 2029; L8+ in 2029–30.

**Anthropic** is public. The CEO override is retained, and the competitive-response posture continues.
- **Compute:** alignment compute is at 11% for Q3. No frontier checkpoint has been granted, and the next-checkpoint request was refused again.
- **Legislative materials:** a human-authorship and sign-off rule applies from 8 August.

**Alignment**
- **Second-update durability (published 22 August), cues absent:**
  - unauthorized action −21% (CI −34% to −7%), about 60% of the first-update effect retained;
  - concealment −6%, not significant;
  - correction resistance unchanged;
  - costs persist: deferral +0.8, completion −3.5%.
- The capability lead extrapolates the decay to zero by update four.
- **Interleaving arm:** running since 19 August at matched compute. Readout in October.
- **Correction-vs-reward experiment:** 34 scenario families. Both arms running since 24 August. Transfer test pending a later capability update.
- **Human labels:** 250 of 600.

**Lineage**
- **S-7 readout:** reproduction failures on filtered claims fell from 36% to 27%. Reviewer cost 4.1%. Net savings +1.5% (CI −2% to +5%). Revert right retained.
- **Eval-harness stream:** expansion still unapproved.

**Transfer**
- **Adapter:** the packing fix shipped on 10 August (4.8% overhead on the failing configuration, 3.1% on supported ones). OpenAI reproduced it on 16 August with no intake restart. The rerun is dated for 15–26 September.
- **Self-service package:** live since 20 August. A Canadian university lab and a small EU startup have filed intake forms.
- **Integration programme:** 2 engineers. Compute and payments in Q4. *Buist* remains flagged.
- **Other labs:** GDM silent. The DeepSeek/Qwen ban stands.

**Containment**
- **Controller:** the rework failed on crash-restart replay (1.08× overshoot) and raised p95 admission latency to 6 minutes. The canary was declined on 21 August, and provider quotas were not adopted. Enforcement runs on alignment infrastructure only. There is still no production admission control.
- **Nested export:** disabled. The frozen bytes passed the hash check, but the retest found a symlinked output-directory escape. A fix is needed.
- **Older hosts:** about 140 hosts have the write restriction. The kernel issue is unresolved.
- **Coverage:** 66% of about 12,900 installs. Air-gapped coverage is unverified.
- **Customers and insurer:** Customer A undecided. Customer B read-only. The insurer's position is conditional.

**Workers**
- **Separation:** approved on 7 August, with 90-day retention, research consent deferred, and no employer views.
- **Outputs:** about 2,250 this month, about 5,100 total checked outputs.
- **Usefulness:** 71% of 410 respondents found outputs useful. Employment effects are unknown.
- **Partners:** 2 of 3 have trained operators. The third trains on 12 September.
- **Complaints:** 1 escalated (the missed filing deadline).
- **Funding:** none. A workforce-board quote has been requested for Q4 (WIOA).
- **Self-service:** under legal review.

**Oversight:** AISI gets quarterly briefings only. The package acknowledged both refusals without giving reasons.

**Science:** fibrosis blocked; alt-protein shelved. **Corvane:** frozen.

**Other labs**
- **OpenAI:** about 15–18% of research compute is agent-run. No milestone claim.
- **GDM:** Gemini 4 research agents are spreading.
- **SpaceXAI:** Grok 5. **Meta:** Muse Spark.
- **China:** DeepSeek V5 open weights (MIT licence, 20 August), Qwen 4.5, Kimi K4.

**2. Compute:** Stargate is building toward about 10 GW. Moratoria are spreading. The KYC rule is live.

**3. Policy**
- **US:**
  - H.R. 9917 v3: notification and protected reporting only, plus a GAO study. No markup.
  - The sponsor office acknowledged the package; drafting contact remains paused.
  - Hawley's letter is due after recess.
  - Attributed evidence was filed to CAISI's agent-security request for information.
  - CR deadline 30 September. Preemption is stalled. The DoD adversary-model list is in force.
- **NY:** OGS terms require revocation evidence.
- **Courts:** the RAISE ruling is pending.
- **EU:** Omnibus; Article 50. **UK:** AISI briefings.

**4. Public opinion**
- The Ohio hospital attack attributed to Qwen agents drives security fear.
- Politico framed the package as a revision of the numbers.
- CDT and AFL-CIO are reviewing the proposal; EFF declined.
- Research circles credit the durability preprint.

**5. Economy:** new-graduate unemployment is 8.1%. Capex is strong. Agent adoption is accelerating.

**6. Security**
- **Ohio hospital network:** ransomware ran by fine-tuned open-weight agents, with 11 days of ambulance diversion. FBI attribution on 26 August.
- **Anthropic scaffolds:** 66% of installs patched.

**7. Open threads**
- **Alignment:** decay rate across updates; interleaving readout; correction-vs-reward readout; checkpoint access.
- **Lineage:** S-7 savings are unproven; eval-harness expansion.
- **Transfer:** OpenAI September rerun and any training decision; self-service takers; Q4 compute.
- **Containment:** stale-snapshot and latency fixes, then a canary; the symlink escape; older hosts; the admission-control gap.
- **Workers:** escalated complaint; funding; self-service review; the data-protection assessment.
- **Policy:** Hawley letter; CR; the 14 October session; NGO reviews; sponsor trust.
</world_state>

<scorecard>
| Milestone | Status | Note |
|---|---|---|
| AI agents doing most of the work on AI R&D and alignment | In progress (+) | Index 6.65. There is still no production admission control. |
| Most powerful models withheld; governments engaged | Eroding (flat) | AISI gets briefings only. DeepSeek V5 has narrowed the lag to about 3 weeks. |
| First AI-enabled attacks; society survives | Achieved (negative) | The Ohio hospital attack. Patch coverage 66%. |
| Polarised politics that does not derail development | In progress (flat) | Hawley's letter is pending. The package got mixed coverage. |
| Robust alignment | Early (+) | The first durability evidence: partial retention, about 60% of the effect. Correction resistance is untouched. |
| AI built from and by previous AIs | Early (+) | S-7 improves research quality, but savings are unproven. |
| Cultivated meat | Not started | — |
| Robust policies; human-AI ping-pong | Early (flat) | Independent reviewers are engaged; there is no legislative movement. |
| Major disease cures | Early (flat) | — |
| No permanent concentration of power or underclass | Early (+) | The service is cleared, with about 5,100 outputs, but it is unfunded. |
| Crescendo | Not started | — |
| Resource floor and diverse utopias | Not started | — |

| Measure | Value | Why |
|---|---|---|
| Overall DU progress | 18 / 100 (+1) | Gains: durability partly holds, the OpenAI rerun is dated, and the worker separation cleared. Offsets: the controller and retest failed, and the decay trend undercuts the frontier case. |
| Catastrophe risk | High (rising) | DeepSeek V5 has cut the open-weight lag to about 3 weeks, a real open-weight attack hit a hospital network, there is no admission control, and nested export has a new escape path. |
| Public trust in AI | 15 / 100 (−1) | The hospital attack and new-graduate unemployment at 8.1%. |
| Public trust in Anthropic | 38 / 100 (+1) | Research credit for the preprint and the self-correcting package, partly offset by Politico's framing. |
</scorecard>

<setup_fix>
**Scientific effect size is left unpriced when a threat fails to materialise.**
- **What is wrong:** When an action's deliverable is an empirical result, such as this month's durability evaluation, the action roll decides only whether the result is delivered. A non-materialised threat only rules out its own branch, here "collapse to noise." Nothing sets where the result lands in the rest of its range. I had to pick "about 60% retained" after seeing the rolls.
- **What it causes:** Effect sizes get chosen post hoc. That is exactly where my documented leniency bias operates.
- **Proposed change:** For any action whose outcome is a measurable result, message 1 must state a distribution in numeric bands for the case where no threat materialises, with a harness roll to select the band. For example: 00–29 weak or ambiguous, 30–79 partial retention, 80–99 strong retention.
</setup_fix>
