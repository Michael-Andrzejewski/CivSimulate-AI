<rolls>
Action 1 [Consumer rollout + weight-security review]: P(failure) 20%. Roll 03. Outcome: FAILURE (03 < 20). Prerequisites: classifiers and rollback trigger in place. The weight review depends on infra-team access to the training clusters.
Action 2 [Sandbagging false-flag fix]: P(failure) 50%. Roll 60. Outcome: PARTIAL (60 ≥ 50, narrow margin). Prerequisites: met. The <8% target is ambitious for one month.
Action 3 [Attestation comment matrix to v1.0]: P(failure) 45%. Roll 54. Outcome: PARTIAL (54 ≥ 45). Prerequisites: comments only arrive by May 30, so a finished v1.0 cannot land inside May.
Action 4 [Cross-lab disclosure template]: P(failure) 40%. Roll 46. Outcome: PARTIAL (46 ≥ 40). Prerequisites: Gemini must ship first (it does, May 19). Uptake depends on AISI, CAISI and other labs.
Action 5 [Ohio onboarding + interim outcomes]: P(failure) 25%. Roll 00. Outcome: FAILURE (00 < 25). Prerequisites: the interim snapshot is gated by the Colorado study protocol's timepoints.
Action 6 [CISA log, Charter, "Six months" report]: P(failure) 35%. Roll 35. Outcome: SUCCESS, marginal (35 ≥ 35). Prerequisites: the report needs leadership and counsel sign-off during the IPO quiet period.
</rolls>

<events>
Your actions cause a bruising month in the market and in public. The consumer launch stumbles, Ohio stalls, and the slower governance threads keep moving.

**Consumer rollout (failure).** Fable 6 reaches consumers on May 13. Within 40 hours, a researcher on X posts a multi-turn "tool-laundering" technique. It splits a cyber task across benign-looking file operations, so the routing classifier never sends it to Opus. Abuse telemetry passes the pre-agreed threshold on the cyber path on May 15, and the rollback fires. Anthropic disables agentic code execution for consumer accounts for six days while it retrains the classifier. The bio and distillation paths hold.
- *The Verge* headline: "Anthropic's safest model gets jailbroken in two days."
- Safety researchers note that the trigger worked as designed. The public mostly does not hear that point.

The weight-security review covers only the serving clusters. Infra leadership delays access to the training clusters until June, citing launch load. The partial fix list finds that Anthropic's own serving stack meets 6 of 9 requirements in the draft AISI attestation spec. The CISO accepts it and keeps it internal.

**US government.** CAISI had its full 30-day pre-release window under the June EO. On May 8, BIS sends Anthropic an inquiry about foreign-national access to Mythos 6 through Glasswing partners. It asks for a list of partners and details of how their users are screened. BIS issues no order. Anthropic answers on May 22. The White House AI adviser posts that the jailbreak shows "safety theater doesn't equal safety."

**Sandbagging (partial).** Variance-baseline calibration, combined with ensemble-uncertainty gating, cuts false flags from 18% to 10.5%, which misses the <8% target. The checks give up about 3 points of catches on the hard set. The combined miss rate on the 600-case set improves from 44% to 38%. The moral module reaches 66 scenarios. The appendix on the planted set's structure is drafted and queued for the July quarterly. The cap stays at 65%.

**Attestation (partial).** Comments arrive late in the month and raise real objections:
- **AMD** wants measurement at the level of the chiplet complex, not the device.
- **Nvidia** resists any requirement to disclose firmware update logs.
- **Japan's AISI** says the privacy-preserving reporting format needs a data-minimisation review under Japan's privacy law (APPI).
- **Azure** asks for a multi-tenant exemption.

The resolution matrix is about 40% complete. AISI targets a v1.0 candidate for July. The Dutch accept a briefing in June. Akamai's review is still pending.

**Disclosure template (partial).** Gemini 4 Ultra ships on May 19 with a thinner system card. It gives CAISI and AISI summaries but no internal-agent monitoring data.
- **UK AISI** agrees to host your template as a "working draft for discussion."
- **CAISI** is noncommittal.
- **OpenAI's** safety lead gives informal comments.
- **Google DeepMind** says it "will consider this within existing frameworks."

**Ohio and outcomes (failure).** On May 14, Ohio's legal review finds that the pilot would share unemployment-insurance claimant data with Anthropic, which requires a new data-sharing agreement. The next day a state senator publicly criticises "an AI company mining jobless Ohioans' data." The agency defers the start to "after July 1 fiscal year review." It could take longer. The Colorado co-investigators say the protocol's first interim look is at six months, in September, so there is no snapshot yet. The senator's staff still have no co-sponsor.

**Security (success).**
- CISA publishes the final log on May 28, including the 6 misses and the 11% false-positive rate. It extends the triage pilot by 90 days to a second sector.
- The Charter reaches 46 projects and lands 78 patches.
- Leadership approves the "Six months" report. Counsel trims two IPO-adjacent sentences and schedules publication for June 9.

**Competitive squeeze.** *The Information* (May 27) reports that Anthropic's monthly revenue-run-rate growth slowed to about 4% in May, down from about 9% in Q1. It also reports that API token share on major routers fell about 5 points toward GPT-5.7 after the price cut. One of the three customers that restarted evaluations signs. One chooses Gemini 4 Ultra, citing multimodal agents. On May 20, Anthropic cuts Opus 5.5 prices by 25%. Secondary marks slip another 4%.

**Exogenous events.**
1. **May 8 jobs report.** April unemployment reaches 5.0% and payrolls add only 22,000 jobs. The "AI recession" framing goes mainstream on cable news.
2. **Gemini 4 Ultra (May 19).** It leads the multimodal agentic suites. Google announces 2 million enterprise seats within 72 hours.
3. **May 21 incident.** A V4.5-assisted ransomware attack hits a regional hospital network in Pennsylvania, and elective surgeries are cancelled for four days. Senators cite the attack as a reason to move RASA, but the bill is still not scheduled.
</events>

<capability_update>
Next month's Claude is a modest increment over Fable 6, mostly from post-training fixes and the retrained classifier stack, not a new pretraining run. The 65% agent-share cap and Akamai compute still ramping up limit research throughput. Gemini 4 Ultra now sets the multimodal-agent frontier.
</capability_update>

<world_state>
**WORLD STATE: 1 June 2027 (start of Month 7)**

**1. Frontier AI capabilities and labs**
- **Anthropic**
  - **Fable 6 / Mythos 6.** API and enterprise since April 28. Consumer since May 13. A public "tool-laundering" jailbreak led to a six-day rollback of consumer agentic code execution. The classifier has been retrained and the feature restored on May 21.
  - **Agent share and monitors.** Agents do about 63% of research engineering, capped at 65%. On the 600-case set the combined sandbagging miss rate is 38% (down from 44%). It is 31% on the old set. False flags are down to 10.5%.
  - **Evals.** The moral module has 66 scenarios. The planted-set appendix and the updated numbers go in the July quarterly.
  - **Weight security.** The serving clusters meet 6 of 9 attestation-spec requirements, and the fix list is with the CISO. The training-cluster review is deferred to June.
  - **Commercial.** Run-rate growth has slowed to about 4% a month. API router share is down about 5 points. Anthropic cut Opus 5.5 prices by 25% on May 20. Secondary marks are down about 12% since mid-April.
  - **IPO and governance.** The IPO is set for Q3–Q4. The LTBT review is due to conclude in Q2 (June). Claude is excluded from S-1 work.
  - **Public reporting.** The "Six months of eval-gated development" report was approved with trims and will publish June 9.
- **OpenAI:** GPT-5.7 at its reduced price, gaining share. Work Agents are live. Its safety lead gave informal comments on the disclosure template.
- **Google DeepMind:** Gemini 4 Ultra launched May 19, after CAISI and AISI testing, with a thinner system card. It leads on multimodal agentic tasks and claims 2 million enterprise seats.
- **xAI:** the deadline to answer the EU finding on Grok 5 is about June 23.
- **Meta:** still "reviewing."
- **Chinese labs:** DeepSeek V4.5 remains in criminal use, including the Pennsylvania hospital ransomware attack. The licence is unchanged.

**2. Compute and chips**
- **Stargate:** building toward about 10 GW. Power is the constraint.
- **RASA:** passed the House 311–109. It is not scheduled in Senate Banking, despite pressure after the hospital attack.
- **BIS KYC rule:** due by mid-June.
- **China:** MOFCOM's unreliable-entity review is ongoing.
- **Local datacenter litigation:** the Michigan and Ohio cases continue.

**3. Policy and regulation**
- **US executive**
  - Voluntary testing continues. CAISI tested Fable 6 and Gemini 4 Ultra.
  - BIS sent a Mythos 6 foreign-access inquiry. Anthropic answered on May 22, and there has been no order.
  - The White House adviser is hostile ("safety theater").
- **Congress:** the testing bill is unintroduced. The wage-insurance pilot text has no co-sponsor. Preemption is stalled.
- **States**
  - NY RAISE is in effect. SB 53 litigation continues.
  - Colorado's cohort 2 is live.
  - Ohio is deferred until after its July 1 fiscal review. It needs a data-sharing agreement for UI claimant data, and a state senator has publicly criticised the pilot.
- **EU:** the Grok 5 response is due late June. GPAI enforcement is otherwise slow.
- **UK:** attestation comments have been received.
  - AMD wants chiplet-level measurement.
  - Nvidia resists disclosing firmware logs.
  - Japan's AISI wants an APPI data-minimisation review.
  - Azure wants a multi-tenant exemption.
  - The resolution matrix is about 40% done, with a v1.0 candidate targeted for July. The Dutch briefing is in June. The disclosure template is hosted by AISI as a working draft.
- **International:** there is no pacing mechanism. CAISI is noncommittal on the template, and Google DeepMind is "considering."

**4. Public opinion and trust**
- Unemployment has hit 5.0% and the "AI recession" framing is mainstream.
- Gemini's launch dominates the news.
- For Anthropic, the jailbreak and rollback headline outweighs the rollback-worked-as-designed point. The CISA log publication is mildly positive. The Ohio data-privacy criticism is in the news.

**5. Economy and labour**
- Unemployment is 5.0%. Payrolls added 22,000 jobs in April.
- **Career assistant:** cohort 1 (50,000) is ongoing. Cohort 2 (75,000) is running through Colorado. The first interim outcomes are due in September under the protocol. The open curriculum has been adopted in part by two community-college systems.

**6. Security and incidents**
- **CISA:** published the final log on May 28 and extended the pilot 90 days to a second sector.
- **Maintainer Charter:** 46 projects. Cumulative patches are about 313.
- **Threats:** there has been no bio incident. Weight theft is a top concern, and the training-cluster review is pending. The public jailbreak technique is circulating in variants.

**7. Key open threads**
1. Commercial recovery against the GPT-5.7 price cut and Gemini 4 Ultra, and the IPO timing.
2. The LTBT review conclusion (June).
3. Sandbagging: the July quarterly, and the 38% miss and 10.5% false-flag figures.
4. Attestation comment resolution and a July v1.0 candidate. Akamai's review.
5. The BIS KYC rule (mid-June), RASA in the Senate, and China's retaliation.
6. The "Six months" report (June 9) and the uptake of the AISI disclosure template.
7. Ohio's data-sharing agreement and political risk. The wage-insurance co-sponsor.
8. The Grok 5 response (about June 23).
9. The rare-disease IRB resubmission (July at the earliest). Phage replication assays have been under way since May.
10. The training-cluster weight-security review. Classifier robustness against variants of the jailbreak.

</world_state>

<scorecard>
| Milestone | Status | Note |
|---|---|---|
| 1. AI agents improving AI agents (~90% of R&D) | early | Agents do about 63%, capped at 65% until monitors improve. |
| 2. Agents doing substantial alignment research | early (improving) | The sandbagging miss rate is down to 38% and false flags to 10.5%, but both miss their targets. The module has 66 scenarios. |
| 3. Robust alignment | early | The consumer jailbreak and rollback show classifier fragility. The rollback trigger worked. |
| 4. Governance scaffolding | early (moving) | Real attestation objections have been surfaced and are being resolved. AISI hosts the disclosure template. CISA published its log. No federal bill has moved. |
| 5. Crescendo-type system | not started | — |
| 6. Preservation of normality | strained (worsening) | Unemployment is 5.0%. Ohio is deferred, and wage insurance has no co-sponsor. |
| 7. Gradual elimination of suffering | early (stalled) | The IRB gates the work until July. Phage replication is under way. |
| 8. Slow expansion | not started | — |
| 9. Consent-based utopias / rights for minds | not started | — |

- **Overall DU progress: 9 / 100 (flat).** Incremental gains in attestation, monitoring and CISA are offset by the consumer rollback and the stall on the labour side.
- **Catastrophe risk: elevated (slightly up).** A public jailbreak technique is circulating, V4.5 has hit a hospital, Gemini 4 Ultra pushes the frontier, and the training-cluster security review is pending. The growing Charter and the CISA extension partly offset these.
- **Public trust in AI: 32 / 100 (−1).** Unemployment at 5.0% and the hospital ransomware attack drive the drop.
- **Public trust in Anthropic: 47 / 100 (−2).** The two-day jailbreak headline, the Ohio data criticism and the slowing-growth story outweigh the credit from CISA and the system card.
</scorecard>
