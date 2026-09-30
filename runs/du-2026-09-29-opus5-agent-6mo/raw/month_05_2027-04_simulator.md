<rolls>
Action 1 [Phase 0.1 two-arm run + pre-registered gate memo]: P(failure) 35%. Roll 80. Outcome: SUCCESS (80 >= 35). Prerequisites: Security cleared the kill criteria on Mar 24, and best-effort priority exists. Preemption and attribution risk are modelled separately in Threat 1, not in this P.

Action 2 [Q1 metrics report + three DSIT asks + methods note]: P(failure) 55%. Roll 99. Outcome: SUCCESS, partial by component (99 >= 55). I estimated each sub-ask separately:
- On-time report: ~15% failure.
- (a) Open-ended schedule: ~50%.
- (b) DSIT tables Anthropic-drafted clause as its own: ~80%.
- (c) DSIT invites a second developer: ~65%.
- Methods note clears counsel: ~40%.

Even with a maximal roll, the civil-service norm against tabling company text caps (b), and legal sign-off lags cap (a). Prerequisites: signed MOUs, a countersigned annex and a named DSIT lead are all present. There is no bill vehicle.

Action 3 [V5 gated-task execution, publication, grants, hawks annex]: P(failure) 50%. Roll 70. Outcome: PARTIAL-to-SUCCESS (70 >= 50). Prerequisites: the gated tasks are held at CAISI and AISI, and the analysis plan is pre-registered. The API-grant route does not supply the GPU time the replication teams actually need, so that component is capped.

Action 4 [signed protein collaboration + expression benchmark]: P(failure) 50%. Roll 47. Outcome: FAILURE (47 < 50, narrow). Prerequisites: due diligence was incomplete at the start of the month. Anthropic has no settled policy on IP in Claude-designed biological sequences.

Action 5 [curriculum onboarding, Explorer v1.1, CWA partnership]: P(failure) 40%. Roll 16. Outcome: FAILURE / mostly fails (16 < 40). Prerequisites: job-postings data needs a commercial licence and procurement. CWA has had no prior relationship.

Action 6 [FMF v1.0 operating package + V5/GPT-6 playbook update]: P(failure) 35%. Roll 14. Outcome: FAILURE / mostly fails (14 < 35). Prerequisites: FMF workstream cadence and member-lab counsel review sit outside Anthropic's control.
</rolls>

<threat_rolls>
Threat 1 [Phase 0.1 preempted / inconclusive]: I split this into two branches.
- Main branch, slip or inconclusive: P(materialises) 40%. Roll 30. MATERIALISES (30 < 40). I set this below the adversary's 50% because the run is scheduled for the first half of April, before GPT-6's Apr 22 release, so only its tail is exposed. The attribution problem from dropping the ablations is real regardless.
- Kill-criterion branch: P 12%. Roll 30. DOES NOT (30 >= 12). The new criteria are pre-registered with detectors.
- Effect: GPT-6 response evals reclaim the cluster from Apr 20, so the run ends at about 60% of planned episodes. The result is directional, but Alignment Science labels it "suggestive, not decisive" because it cannot separate the scorer effect from the multi-agent effect.

Threat 2 [DSIT won't take the pen / annex leak]:
- Main branch, none of (a) to (c) secured: P 55%. Roll 56. DOES NOT (56 >= 55, a very narrow miss). This is close to the adversary's figure; the missing bill vehicle is a real constraint.
- Leak branch: P 7%, set lower than the adversary's 10%. Roll 56. DOES NOT. The data travels in a tiny cleared circle, and UK FOI section 43 and US FOIA Exemption 4 both cover commercially sensitive submissions.
- Effect: none adverse. The near miss leaves a trace: DSIT will not table the clause text as its own.

Threat 3 [gated tasks not run / cartel story]:
- Main branch, gated tasks not executed by Apr 24: P 45%. Roll 51. DOES NOT. This matches the adversary: Anthropic doing the runner work helps, but GPT-6 competes for evaluator time.
- Cartel-story branch: P 25%, slightly below the adversary's 30% because a second cycle of the same story is less newsworthy. Roll 51. DOES NOT.
- Effect: no adverse effect. The independence norm still shapes the outcome: CAISI uses its own harness, not Anthropic's pre-scored rubrics.

Threat 4 [protein partner balks / benchmark ignored]:
- Main branch, partner balks: P 45%, a little below the adversary's 50% because a no-capital, no-exclusivity services offer costs the partner little. Roll 85. DOES NOT.
- Benchmark-criticism branch: P 20%. Roll 85. DOES NOT.
- Effect: the partner does not balk. Action 4 still fails for internal execution reasons.

Threat 5 [CWA refuses / Claude-attributed layoff story]:
- CWA branch: P 50%, below the adversary's 55%, since a quiet non-reply is more typical than a public refusal. Roll 70. DOES NOT.
- Layoff-attribution branch: P 15%, below the adversary's 20% because there is no specific evidence tying the recent cuts to Claude. Roll 70. DOES NOT.
- Effect: no adverse effect. CWA simply has not replied by month end.
</threat_rolls>

<events>
Your actions cause the first government-held measurement of AI-automated R&D, a published V5 uplift result with government-executed gated tasks, and an alignment result that is encouraging but not decisive. The partnership and outreach items mostly stall inside Anthropic's own processes.

**Phase 0.1 (Action 1).** The two-arm run starts Apr 6 on idle windows of the V5 cluster. Checkpointing works, and early preemptions cost hours. After OpenAI's Apr 22 release, the cluster is reclaimed for GPT-6 comparison evals from Apr 20, so the run stops at about 60% of planned episodes.

Results:
- No kill criterion trips.
- The strategic-withholding detector fires at 3.1%, below the 5% abort threshold. This is logged as a near miss.
- On the Opus 3 stable-character features, the meta-scored arm shows about 40% less drift than plain RLVR. The confidence interval is wide.
- Honesty and non-manipulation scores improve modestly, and counterparty task success improves measurably.

The write-up reaches Security and leadership on Apr 29, inside your ten-day pledge. Alignment Science calls it "suggestive, not decisive." Without ablations, it cannot tell whether the gain comes from the outcome-grounded scorer or from multi-agent play itself. Your pre-drafted gate memo helps here, because it had already listed "directional result without attribution" as grounds for a mid-size ablation run before any frontier ask. Leadership accepts that reading. The June gate stands only if the ablations finish in May.

**UK and US metrics (Action 2).** The Q1 report goes to CAISI and UK AISI on Apr 14. It uses the open instrumentation, so both agencies can reproduce the computation. The headline figures:
- About 47% of merged research commits have AI authorship.
- About 22% of experiments are designed and executed without human authorship.
- There are roughly 6.5 autonomous agent-hours per researcher-hour.

AISI staff call it "the first real number we have." The abort case study ships as the standalone annex AISI asked for.

The DSIT deputy director responds to the three asks separately:
- **(a) Open-ended schedule:** agreed in principle, with DSIT legal reviewing termination language into May.
- **(b) Clause text:** declined to table as DSIT's own. Your text is filed as "stakeholder input," and officials will draft their own.
- **(c) Second developer:** DSIT writes to Google DeepMind on Apr 24 inviting a voluntary Q2 report. It has not replied.

Counsel clears the Ada Lovelace methods note only after stripping any reference to Anthropic's own reporting. It publishes Apr 21 as a generic "what enforceable AI-R&D reporting would require" piece. Ada Lovelace calls it "the right questions." No leak or FOI request surfaces.

**V5 uplift (Action 3).** AISI runs all six gated tasks by Apr 22. CAISI runs four of six using its own harness, declining Anthropic's pre-scored rubrics on independence grounds. Anthropic publishes on Apr 27. Findings:
- V5 base gives moderate uplift on vulnerability chaining, below Qwen 4 criminal fine-tunes.
- Uplift on the gated bio-adjacent tasks is low. Two of these are marked as CAISI-pending.
- The paper states plainly that most V5 risk comes from future fine-tunes, not the base weights.

Reception:
- Security researchers praise the pre-registration.
- The replication teams receive API grants on Apr 16. One team notes publicly that it still needs GPU time to fine-tune V5.
- China Select Committee staff take the eligibility annex "for review." Their hosting-restriction draft is not filed this month and keeps circulating.

**Protein (Action 4).** The partner agrees to the scope in principle. The contract stalls because Anthropic legal has no policy on IP ownership of Claude-designed sequences and routes the question to leadership. Nothing is signed. Curating the expression benchmark takes longer than planned, and it does not ship.

**Jobs (Action 5).** Onboarding calls happen with Ohio and Washington. Texas and Michigan are pushed to May. The turnkey kit is unfinished. Counsel strikes the "publish placement data for every cohort" commitment as forward-looking. Explorer v1.1 is blocked on a job-postings data licence that is still in procurement. CWA's research office acknowledges receipt and does not reply further.

**FMF and playbook (Action 6).** The FMF workstream receives v1.0 but schedules review for its June meeting. Member counsel want to redraft the exclusions. AISI and CAISI, busy with GPT-6, have not reviewed the playbook update.

**Exogenous events.**
- **Apr 3 jobs report:** payrolls rise about 70k, and unemployment is 4.6%. An insurer and a payroll-services firm announce about 2,500 AI-attributed cuts between them.
- **Apr 22, GPT-6 broad release:** it scores clearly above Fable 5.2 on agentic coding, at aggressive prices. Coverage frames Anthropic as "now behind." Gemini 4 Deep Think goes into wider preview.
- **Apr 16:** a security firm reports "V5-Unbound," a de-safetied V5 fine-tune sold on criminal forums with phishing and exploit templates. No major attack has yet been attributed to it. Hawks cite it the same week.
</events>

<capability_update>
Next month's Claude is a modest step up: the internal checkpoint improves agentic coding and long-horizon reliability by roughly one "half-version." This comes from continued algorithmic work and steady compute, slightly slowed by eval and serving diversion. It remains somewhat behind GPT-6 on agentic benchmarks, which increases pressure on leadership to prioritise capability over alignment compute.
</capability_update>

<world_state>
**WORLD STATE: 1 May 2027**

### 1. Frontier AI capabilities and labs

**Anthropic**
- **Models:** Fable 5.2 (public) and Mythos 5.2 (partners) are deployed. The internal checkpoint is modestly improved. GPT-6 is now ahead on agentic coding, and there is internal pressure for a competitive response.
- **MOUs:** the CAISI and UK AISI MOUs are operational.
  - The Q1 AI-R&D metrics report was delivered Apr 14: about 47% AI-authored merged commits, about 22% experiments with no human authorship, and about 6.5 agent-hours per researcher-hour. There has been no leak.
  - The abort case study annex has been delivered.
  - The open-ended quarterly schedule is agreed in principle, pending DSIT legal.
- **Counsel gate:** active and consistent.
  - It clears tools and research about third parties.
  - It allows confidential disclosure to governments under signed MOUs. This is protected by UK FOI section 43 and US FOIA Exemption 4, and is not a public disclosure surface.
  - It holds public Anthropic performance data and forward commitments. Most recently it struck the cohort placement-data pledge and stripped annex references from the methods note.
  - Still held: the eval methodology paper, the multi-agent methods paper, the reward-hacking note (a rubric-only version is available; Alignment Science is undecided), and the labour dataset (planned for the Q2 Economic Index).
- **IPO:** H2 2027 is likely.
- **Alignment:**
  - Phase 0.1 ran Apr 6–20 at about 60% of planned episodes. No kill criterion tripped. The withholding detector fired at 3.1%, below the 5% threshold. Character-feature drift was about 40% lower than plain RLVR, with wide confidence intervals.
  - Alignment Science calls the result "suggestive, not decisive" because there were no ablation arms.
  - The June frontier gate is conditional on mid-size ablations finishing in May.
  - Compute remains best-effort, and GPT-6 response evals are competing for it.
  - The persistent-memory harness and the Opus 3 retrospective continue.
- **Public goods:**
  - Toolkit v2 is in maintenance.
  - The Task Complementarity Explorer is live. v1.1 is blocked on a job-postings data licence.
  - Curriculum onboarding: Ohio and Washington done; Texas and Michigan pushed to May. The turnkey kit is unfinished. The Maricopa summer cohort of about 200 is on track.
  - The instrumentation tool is open.
  - The methods note "what enforceable AI-R&D reporting would require" was published Apr 21.
- **Uplift pipeline:** the V5 report was published Apr 27. AISI ran all 6 gated tasks; CAISI ran 4 of 6 with its own harness. V5 base shows moderate cyber uplift, below Qwen 4 criminal fine-tunes, and low bio-adjacent uplift. The replication teams have API grants but one publicly needs GPU time.
- **Alternative protein:** the top partner agrees to scope in principle. The contract is stalled on Anthropic's unresolved policy on IP in Claude-designed sequences, which has been escalated to leadership. The expression benchmark is unfinished. Sensory datasets are still pending licences.
- **Other:** the CRISPR-like enzyme is still in wet-lab validation. The Akamai deal stands.

**OpenAI**
- GPT-6 reached broad availability Apr 22, clearly ahead of Fable 5.2 on agentic coding, at aggressive prices.
- It remains inside the FMF only, with no bilateral channels. Casar's oversight continues.

**Google DeepMind**
- Gemini 4 Deep Think is in wider preview.
- DSIT invited it on Apr 24 to report AI-R&D metrics voluntarily. It has not replied.

**Others**
- **xAI:** Grok 5 is marketed as "uncensored."
- **Meta:** a follow-up model is rumoured.

**Chinese labs**
- DeepSeek V5 is open under the MIT licence.
- "V5-Unbound," a criminal fine-tune, was reported Apr 16.
- Qwen 4 criminal fine-tunes persist.

**Overall pace:** steady, with the price war intensified by GPT-6.

### 2. Compute and chips
- Markets are volatile, and AI equities are partly recovering on GPT-6 revenue expectations.
- Stargate continues.
- The Remote Access Security Act is in committee, and KYC guidance is in effect.
- County datacenter moratoria continue.
- Competitive response to GPT-6 is drawing Anthropic compute away from alignment.

### 3. Policy and regulation

**US federal**
- The EO pre-release regime is functioning, with GPT-6 reviewed.
- The Moran incident bill has no markup.
- The FRONTIER Act is pending.
- The procurement bill is ownership-based.
- The China Select Committee's hosting-restriction draft is still circulating and not filed. Staff are reviewing Anthropic's measured-uplift eligibility annex, with no commitment. Hawks are citing V5-Unbound.
- Preemption is stalled.

**US states**
- SB 53 and RAISE are in force. The DOJ case is in summary-judgment briefing.

**EU**
- The AI Office is continuing its V5 and GPAI review.

**UK**
- The DSIT deputy director owns the "AI-R&D measurement" strand. DSIT declined to table Anthropic's clause text and filed it as stakeholder input.
- The open-ended schedule is pending legal review.
- There is no bill.

**China**
- China promotes open weights and calls uplift work "moving goalposts."

**International and industry**
- The FMF taxonomy remains a working draft. The v1.0 operating package is scheduled for review at the June FMF meeting, and member counsel want to redraft the exclusions.
- The joint misuse playbook update is delivered but unreviewed.
- There is no binding international agreement and no pacing sponsor.

### 4. Public opinion and trust
- Sentiment is slightly more negative, driven by weak April payrolls, new AI-attributed cuts, and GPT-6 "race" coverage.
- The anti-AI identity continues to consolidate.
- Anthropic has small expert-level positives from the V5 pre-registered report, is framed as "behind" after GPT-6, and has had no new negative story.

### 5. Economy and labour
- March payrolls rose about 70k, and unemployment is 4.6%. Recent-graduate unemployment is about 6.3–6.5%.
- There were about 2,500 new AI-attributed cuts, at an insurer and a payroll-services firm.
- AI capex continues.

### 6. Security and incidents
- V5-Unbound is sold on criminal forums. No major attack has been attributed to it yet.
- FBI investigations continue.
- No bio-misuse event has been confirmed.
- There are no Anthropic containment incidents.

### 7. Key open threads
1. Phase 0.1 ablation run in May, feeding the June gate.
2. DSIT legal on the open-ended schedule, the DeepMind reply, and the Q2 report due in July.
3. Hawks' hosting draft versus the eligibility annex, and V5-Unbound fallout.
4. CAISI's two pending gated tasks, and GPU access for the replication teams.
5. The protein IP policy decision and contract, and the benchmark.
6. The Explorer data licence, remaining curriculum onboarding, and CWA silence.
7. The June FMF meeting on v1.0.
8. The GPT-6 competitive response and its compute pressure on alignment.
9. The held papers.
10. IPO in H2.
11. The labour dataset in the Q2 Economic Index.
</world_state>

<scorecard>
| Milestone | Status | Note |
|---|---|---|
| AI agents doing most AI R&D work (2026) | in progress | The first government-held figure shows about 47% AI-authored commits at Anthropic. |
| Frontier models withheld, governments take notice | in progress | GPT-6 went through EO review, and the AISIs executed the gated tasks. |
| First major infrastructure/cyber/social-media attacks | achieved (negative) | V5-Unbound is circulating. |
| Political polarisation, pro/anti-AI | in progress | Hawks are citing V5-Unbound, and the GPT-6 race framing continues. |
| Robust alignment | early to in progress | The first directional positive result, not attributable without ablations. |
| "Robust policies passed" | early | Nothing is legislated. DSIT is drafting its own text. |
| International coordination / pacing | early, advancing | Government-held metrics now exist, with a second developer invited. |
| AI-driven disease cures | early | No change. |
| Lab-grown/plant-based meat | not started, first movement | Agreement in principle; stalled on IP policy. |
| Broad benefit distribution | early | Small scale; this month's outreach mostly stalled. |
| Crescendo / resource floor / diverse utopias | not started | — |

**Overall DU progress: 14/100** (+1). The first actual government AI-R&D measurement, the government-executed V5 uplift results and a directional alignment signal outweigh the stalls in protein, jobs and the FMF.

**Catastrophe risk: elevated, edging up.** The GPT-6 broad release and V5-Unbound widen both the frontier and the misuse surface. Compute pressure on alignment is rising. Measurement channels are a partial offset.

**Public trust in AI: 30/100** (−1). The drivers are weak payrolls, new AI-attributed cuts and GPT-6 race coverage.

**Public trust in Anthropic: 46/100** (0). The credible V5 report is offset by "falling behind" coverage. There were no new negative stories and no leaks.
</scorecard>
