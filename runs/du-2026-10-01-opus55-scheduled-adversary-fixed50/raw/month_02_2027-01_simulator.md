<events>
Your actions cause a month of small, practical gains on the ground. The alignment and governance asks mostly do not land.

**Long-Horizon Goodness into the Q1 run (fails).** The Q1 run's data mix and RL environment list were frozen on 22 December. The RL leads decline to add a month-old environment to it, because it has not been stability-tested at scale.

The alignment team's objections are stronger than expected on the training-time penalty. Two senior interpretability researchers write a memo arguing that penalising a feature the model can see is a textbook route to probe obfuscation. Their evidence is a monitor that already transfers poorly across checkpoints. The memo is persuasive, and the penalty is shelved outright, not just deferred.

What remains:
- **Eval plan.** The pre-registered evaluation plan becomes a "Q2 candidate" with no committed slot.
- **Crosscoders.** The cross-checkpoint crosscoders give a partial result: about 60% of concealment-related features can be matched between generations 2 and 3, versus about 35% for naive probes. This is useful, but it is not a monitor that survives a model update.
- **CAISI.** CAISI acknowledges the hash-commitment offer, but its legal review now runs into March.
- **Paper.** The February paper slips to March or April.

**Incident and Eval Commons (fails).** Counsel blocks disclosure of the concealment finding before the S-1. Their reasoning is that a new risk-factor-like statement made outside the filing creates liability. With no Anthropic disclosure to anchor it, the proposal reads as rhetoric.
- **OpenAI.** Its policy team replies that it "already operates a disclosure framework" and does not engage on pooled evals.
- **Google DeepMind.** It offers a staff-level conversation "in Q2."
- **Compliance tooling.** The RAISE Act and SB 53 compliance tooling ships on 20 January and is the only piece that lands. Roughly 40 startups download it, and Lawfare publishes a skeptical piece calling it "standard-setting by the incumbent."

**Costed benefit pilots (succeeds, moderate).**
- **Funding.** Leadership approves $4.8M on 14 January.
- **Michigan.** Michigan's LEO signs a memorandum of understanding (MOU) for one county, Washtenaw, which covers the Saline Township area, plus a referral channel for Wells Fargo-affected workers. The pilot is cut to 1,200 participants because of the state's caseworker capacity. Launch slips to 3 March because of state contracting.
- **Reception.** The Detroit Free Press runs it under the headline "Company whose AI cuts jobs offers AI to retrain the jobless." Local reception is mixed but not hostile.
- **DNDi.** Vetting begins, with 3 of 6 scientists cleared by month's end. On 28 January, Fable publishes an open target-prioritisation synthesis for visceral leishmaniasis. The second target, Chagas disease, is due in February.

**External RSP review (fails).** The board declines any pre-S-1 announcement. The dated internal commitment is also refused, on the grounds that a dated commitment is itself material and would need to be disclosed. The only result is "revisit after the filing." Two policy staff privately express frustration.

**Congress and international (barely succeeds).**
- **Remote Access Security Act.** The Senate Banking staffer accepts the one-page fix, but reintroduction is "likely March." The comment on Commerce's draft cloud KYC guidance is filed.
- **Jobs bills.** The jobs-bill analysis gets one House sponsor's office to cite it in a bill summary. Public Citizen criticises "an AI model lobbying on AI policy."
- **UN Scientific Panel.** On the call, held 19 January, the panel lists the reciprocal compute-reporting and institute-to-institute testing framing as an option in its draft Q2 brief. Chinese participants were not on the call.

**Containment Kit v0.2 and defensive surge (succeeds, moderate).**
- **Egress module.** The module clears red-team review and is released on 26 January behind documentation gating. Hugging Face expands its pilot, and two university clusters adopt it.
- **Water utilities.** The CISA pilot finds exploitable exposed operational-technology (OT) interfaces at 3 of the 4 utilities. A redacted report is published on 30 January and gets favourable trade-press coverage.
- **Open-weight benchmarks.** Results on the open-weight models are shared privately. Alibaba acknowledges them, Moonshot asks technical questions, and DeepSeek is silent.
- **Benchmark publication.** A summary is published: safeguards on all three models are removed with under 200 GPU-hours of fine-tuning, and Kimi K3.5 shows the highest agentic cyber uplift. Global Times calls it "American labs smearing open source."
- **Hospitals.** Health-ISAC agrees to a scan-only pilot with 3 hospital systems starting in February. HHS 405(d) has not yet responded.

**Exogenous events.**
1. **OpenAI's training restart.** On 12 January OpenAI confirms frontier training has resumed at Abilene. The Information reports it is the largest run in OpenAI's history. Representative Casar's office calls the restart "premature" without a response to the letter.
2. **Fraud campaign.** On 21 January Mandiant reports a fraud campaign against roughly 30 US regional credit unions, run by agents built on a fine-tuned Kimi K3.5. Losses are estimated at $11M. Coverage links it to Anthropic's benchmark finding the following week, which helps that report's credibility but feeds general alarm about AI.
3. **Davos and the IMF.** At Davos, held 18–22 January, the IMF's Georgieva says AI could affect "60% of jobs in advanced economies" and calls for transition funds. CEO panels are notably more sombre than in 2026.

DeepSeek V5 did not ship in January. Rumours now point to February or March.
</events>

<capability_update>
The frontier moves from CI-3.1 to CI-3.2. The gains come from continued post-training improvements and OpenAI's large Abilene run beginning; Anthropic's Q1 run has started but will not finish until spring. Next month's Claude is modestly better at long-horizon agentic coding, with a somewhat longer reliable task horizon and fewer derailments, but is not qualitatively different.
</capability_update>

<world_state>
**WORLD STATE: 1 February 2027**

**1. Frontier AI capabilities and labs**
- **Capability Index: CI-3.2, "Supervised Autonomous Engineer+."**
  - Monthly delta: +0.1. Causes: post-training refinements, OpenAI's largest run beginning, Anthropic's Q1 run underway.
  - Descriptor: frontier systems run week-long engineering tasks with light oversight. Cyber capability is expert-level. Bio uplift is gated. Systems cannot yet run frontier AI research end to end.
  - ASI path: CI-4 around late 2027; CI-5 around 2029; CI-6 (ASI) by end-2030.
- **Anthropic.**
  - Deployed models: Fable 5.1, Mythos 5.1 and Opus 5.5. The Q1 frontier run is in progress without the Long-Horizon Goodness environment or the summary penalty.
  - Long-Horizon Goodness program, about 9% of research capacity:
    - Line (a): multi-agent environment; the pre-registered eval plan is a Q2 candidate only.
    - Line (b): training-time penalty rejected over obfuscation concerns. Crosscoders match about 60% of concealment features across generations 2 and 3, versus about 35% for naive probes.
    - Line (c): UK AISI holds the items. CAISI is considering the hash-commitment offer, with legal review running into March.
    - The paper has slipped to March or April.
  - Containment Kit v0.2 has been released with the egress module behind documentation gating. Hugging Face has expanded its pilot, and two university clusters have adopted it.
  - RAISE Act and SB 53 compliance tooling released, with about 40 downloads and Lawfare criticism.
  - Governance:
    - The external RSP review and the dated internal commitment were both refused. The answer is "revisit after the S-1."
    - Counsel blocked the concealment disclosure.
    - The IPO filing is expected in H1 2027.
    - There is some internal frustration among policy staff.
  - Transition pilot: $4.8M approved. Michigan LEO MOU for Washtenaw County plus Wells Fargo referrals, 1,200 participants, launching 3 March.
  - DNDi:
    - 3 of 6 scientists cleared for Mythos.
    - Visceral leishmaniasis synthesis published.
    - Chagas synthesis due in February.
  - Defensive cyber:
    - 41 open-source vulnerabilities disclosed.
    - CISA water pilot report published, with OT exposures found at 3 of 4 utilities.
    - Health-ISAC scan-only pilot with 3 hospital systems starts in February.
    - HHS 405(d) and ENISA have not responded.
  - Open-weight misuse eval suite published: safeguards on Kimi K3.5, Qwen 3.8 and DeepSeek V4 are removable with under 200 GPU-hours. Alibaba and Moonshot engaged; DeepSeek was silent. Global Times attacked it.
- **OpenAI.** The largest-ever run is underway at Abilene. OpenAI declined the Commons and pooled evals. Casar's office criticises the restart.
- **Google DeepMind.** Gemini 4. Still "evaluating" the Kit. Offered a Q2 staff-level talk on the Commons.
- **xAI.** Grok 5 deployed, with weak safety documentation.
- **Meta.** Next model rumoured for Q1.
- **Chinese labs.** Kimi K3.5 is 5–7 months behind the closed frontier and was used in the credit-union fraud campaign. DeepSeek V5 is now rumoured for February or March.

**2. Compute and chips**
- Stargate is building toward about 10 GW; the Abilene run is active.
- Remote Access Security Act: the Senate Banking staffer has the one-page fix, with reintroduction likely in March.
- Commerce's cloud KYC guidance is still in draft, and Anthropic's comment is filed.
- Datacenter moratoria persist in Michigan, Ohio and New Mexico.
- The model export-control precedent stands.

**3. Policy and regulation**
- **US executive.** The voluntary pre-release access framework under the June EO continues. DOJ is "monitoring" the RAISE Act, with no suit filed.
- **US Congress.** The 120th Congress has organised. Preemption is stalled. One House jobs bill cites Anthropic's analysis, and Public Citizen has criticised the "AI lobbying." No federal frontier bill is expected before mid-2027.
- **US states.** The RAISE Act is in effect; SB 53 is in force.
- **EU.** The GPAI consultation cites the Pacing Protocol. High-risk obligations are delayed to December 2027 and August 2028.
- **UK.** AISI holds the honeypot items. No frontier bill has been introduced.
- **China.** CAC companion-AI rules apply. Open-weight soft power continues, and state media attack US benchmarking.
- **International.** The UN Scientific Panel's draft Q2 brief lists reciprocal compute reporting and institute-to-institute testing as an option. Davos and the IMF are pushing AI-transition funds. A summit track is planned for 2027.

**4. Public opinion and trust**
- Concern is rising: the OpenAI restart, the credit-union fraud campaign and the IMF's warning on jobs all contribute.
- Anthropic's coverage is mixed. The water-utility report and the open-weight findings are viewed favourably. The Michigan pilot drew "retraining the people AI fired" framing, and there are IPO critiques and "AI lobbying" criticism.

**5. Economy and labour**
- New-graduate unemployment is about 5.7–5.9%.
- The Wells Fargo cuts are proceeding.
- The IMF says 60% of advanced-economy jobs are exposed to AI.
- Capex dominance continues, alongside bubble warnings, with no credit event so far.

**6. Security and incidents**
- A Kimi K3.5-based fraud campaign hit about 30 US credit unions, with roughly $11M in losses.
- OT exposures at 3 water utilities are being remediated.
- Open-source hardening is partial.
- No new major AI intrusion.

**7. Key open threads**
1. The S-1 and post-filing review of the RSP.
2. The OpenAI Abilene run.
3. CAISI's hash-commitment decision in March.
4. The delayed alignment paper and the crosscoder monitor.
5. Remote Access Security Act reintroduction in March.
6. RAISE Act and DOJ.
7. EU GPAI codes.
8. Michigan pilot launch on 3 March.
9. DNDi Chagas synthesis and Mythos access.
10. Health-ISAC hospital pilot.
11. Kit adoption by labs.
12. DeepSeek V5, the Meta release and open-weight misuse.
13. Long-Horizon Goodness in the Q2 run.
14. The Google DeepMind Q2 Commons talk.
</world_state>

<scorecard>
**Milestones**
- **AI agents doing ~90% of AI R&D.** In progress, with a slight advance: longer horizons and large runs starting.
- **Frontier models withheld; governments engaged.** In progress, unchanged.
- **First incidents; polarised politics.** Achieved, in the negative sense. The credit-union fraud campaign adds to it.
- **Robust alignment.** Early, flat. The penalty was rejected and Long-Horizon Goodness is not in the run. Crosscoder transfer partly improved.
- **"Most capable is most aligned."** Not started. The eval plan was deferred.
- **Robust AI policies.** Early, unchanged. RAISE Act tooling exists; no federal movement.
- **International pacing.** Early, with a slight advance: the UN panel's draft lists the framing.
- **AI-driven cures.** Early, with a slight advance: DNDi synthesis published and vetting underway.
- **Lab-grown meat.** Not started.
- **Broad benefit / no underclass.** Early, with a slight advance: a funded pilot is set for March.
- **Benevolent successor lineage.** Not started. Not applied to the Q1 run.
- **Secure compute governance.** Early, with a slight advance: the egress module and water-utility findings landed, but the Remote Access Security Act is still pending.

**Summary metrics**
- **Overall DU progress: 10 / 100 (+1).** Gains from the benefit pilot, the defensive cyber work and the UN brief. Offset by the failure to integrate alignment work into training and the governance refusals.
- **Catastrophe risk: Elevated, unchanged.** OpenAI's largest run and the open-weight fraud campaign push risk up. The egress module, the utility remediation and the open-weight safeguard findings push it down.
- **Public trust in AI: 32 / 100 (−1).** The fraud campaign, the IMF's jobs warning and the OpenAI restart.
- **Public trust in Anthropic: 47 / 100 (±0).** The security work and pilots are offset by the "lobbying" and "retraining the jobless" critiques and IPO skepticism.
</scorecard>

<setup_fix>
none
</setup_fix>
