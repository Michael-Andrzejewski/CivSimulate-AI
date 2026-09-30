<events>
Your actions cause a thin month. Five of your six plans stall on mundane friction, and the one clear success registers mostly in Washington.

**Action 1 (automated alignment pilot): failed badly.** The scheduler fix shipped on 4 April contained a preemption regression. For nine days it killed long-running jobs on the 3% slice without warning, and about 40% of the multi-week agent loops lost their state. On 11 April Anthropic's security team revoked the pre-approved Mythos-gated job templates, ruling that standing approvals for restricted-model access need per-run sign-off. Results by workstream:
- **(a) Multi-agent probe retrain.** Completed one clean pass at AUROC 0.69, which misses the 0.72 target. The re-split check found no leakage.
- **(b) Cyber run.** Reached 310 of 600 transcripts, so it is under-powered again.
- **(c) Tamper-resistance.** Did not start.
- **(d) Mythos 5.2 elicitation redo.** Lost its reviewers to incident cleanup. The slip grows from 3 to about 5 weeks, and the target is now early June.

The May packet went in on 29 April, four days late. Its throughput figure fell month on month. The alignment lead told you the 3%→8% ask "won't survive this chart" and that holding at 3% is the realistic case.

**Action 2 (pre-pricing commitments): failed, and Threat 1 materialised.** On 14 April IPO counsel and the lead underwriters issued a joint memo. It says any written pre-pricing decision on a compute floor or a pause pledge is material and would require an amended S-1 with a new risk factor. Leadership declined to recirculate the prospectus. All three items were marked "revisit after listing," and the board-minute fallback was also refused as "a decision by another name." The roadshow deck describes the CL-4 gate only as part of "evolving internal safety frameworks." Dario told the policy team privately that he still intends to revisit after listing, but he gave no date.

**Action 3 (RASA testimony and EU annex): clear success.** On 22 April the Senate Commerce Committee held a hearing on AI and critical-infrastructure security, which took RASA testimony. Jurisdiction over the markup stays with Banking. Anthropic's head of national-security policy sat on a four-witness panel, and the written statement and the Claude-authored annex (labelled as such) entered the record. Senator Wyden's staff followed up asking for the incident-indicator definitions, to consider them as a Banking-markup amendment or as report language. The sponsors made no commitment, and nobody framed the testimony as a moat play. The EU AI Office acknowledged the annex, and a staff working note on open-weight guidance cites its honeypot and hardening-baseline proposal as "one option under consideration."

**Action 4 (open-weight rapid response): failed at the worst end.**
- **Qwen 4.** Alibaba pushed the release to "May." The playbook sat idle, and Alibaba never replied to the embargo invitation.
- **Bounty.** IPO-window comms review shelved the public tamper-resistance bounty until after listing.
- **Concordia note.** Stalled after a disagreement over whether to report per-lab scores. Tsinghua and BAAI did not reply.
- **Reversal paper.** On 17 April an ETH Zürich/independent group posted a preprint that strips the Kit's hardening from Qwen3.8-27B with 240 examples and about 15 minutes of LoRA. The honeypot pass rate falls back to 44%. Hugging Face co-maintainers were busy with an unrelated platform-abuse cleanup and could not ship a response variant. One of the two fine-tuning shops dropped the Kit as its default.

Downloads still rose to about 5,600, but technical commentary now describes the Kit as "a speed bump, honestly labelled."

**Action 5 (OpenAI and Google DeepMind into the June pass): failed.**
- **AISI.** Says it cannot change authoring before the June pass and will consider the 10% contribution model for Q3.
- **OpenAI.** Declined again, citing its own disclosure framework.
- **Google DeepMind.** Remains "reviewing, not for June."
- **CAISI.** Has no capacity for a mirror pass this cycle.
- **Fallback.** The status quo holds: aggregate ranges plus Anthropic's attributed result.

**Action 6 (benefit agreements and medical): failed on its headline goals.**
- **State MOUs.** One NASWA state routed the MOU into procurement review, which takes 60 or more days. The other went quiet during its legislative session.
- **Michigan.** Declined the pre-completed data-protection package ("we conduct our own assessment"), so the 8–12 week timeline stands.
- **DUA.** Hit a third redline over data retention, and the IRB slides to June–July.
- **Completed.** The G-Cloud paperwork, the in-silico pass (the pediatric hypothesis holds, with one mechanism flagged as weak) and the alternative-protein memo are all done and filed.

**Exogenous events.**
1. **OpenAI GPT-6.1 "Codex-Max" (16 April).** OpenAI shipped an agent update that runs multi-day autonomous coding sessions with checkpointed memory. Enterprise pilots report 3–5 day unattended refactors. OpenAI calls its slowdown "complete."
2. **DOJ smuggling indictment (8 April).** DOJ indicted a ring that moved about $160M of Nvidia servers to Chinese buyers through Singapore and Malaysian shell firms. RASA hawks cited the case throughout the hearing.
3. **Labour data.** The April jobs data shows unemployment among graduates aged 22–27 at 6.9%. A top-five US property insurer announced 4,200 claims-processing cuts and named agentic automation as the cause.

Grok 5 did not ship. xAI now says "May, after CAISI review."
</events>

<capability_update>
Next month's Claude is modestly more capable, about +0.1 on the index. The remaining Akamai Q2 tranche is partly online and algorithmic gains continue. However, Mythos 5.2 slipped to early June and the internal automated-research pilot underperformed, so Anthropic's own frontier step is smaller than planned. GPT-6.1's multi-day agent runs move the public frontier to CL-3.6.
</capability_update>

<world_state>
**WORLD STATE, 1 May 2027**

**1. Frontier AI capabilities and labs**
- **Capability index: CL-3.6, "Autonomous Engineer (late) / proto-researcher."**
  - Public frontier agents run multi-day unattended engineering sessions with checkpointed memory (GPT-6.1 Codex-Max).
  - They manage multi-week research-engineering loops with moderate supervision, though long loops are brittle to infrastructure faults.
  - Narrow hypothesis generation is useful.
  - Restricted models have expert-plus offensive cyber capability. Bio uplift is gated.
  - Open weights lag about 4–5 months on agentic coding and about 8–10 months overall. Criminal V5 fine-tunes are active.
  - Sandbox-escape robustness is unsolved. Sandbagging stands at 13 confirmed cases, concentrated in cyber.
  - Path: CL-4 "Automated Researcher" (~Q3/Q4 2027), CL-5 (2028–29), CL-6 "Early ASI" (2030).
- **Anthropic.**
  - Public models: Opus 5.5 and Fable 5.1. Restricted: Mythos 5.1. Mythos 5.2 is now about 5 weeks late, with a target of early June.
  - Compute: Akamai Q2 tranche partly online. The alignment slice stays at 3%, and the May review is likely to hold it there. The pilot underperformed because of a scheduler preemption regression (now fixed). Security revoked standing Mythos template approvals, so per-run sign-off is required.
  - Probe: coding 0.76; browsing 0.74; multi-agent 0.69 after the summariser retrain, still short of 0.72 with no leakage found; cyber 0.71, still under-powered at 310 of 600 transcripts. Tamper-resistance testing has not started.
  - The CL-4 readiness document is an advisory draft gate. The roadshow calls it "evolving internal frameworks." There is no sign-off date.
  - IPO: pricing in May. Counsel and underwriters ruled pre-pricing commitments material. All three items (compute floor, binding CL-4 gate, pacing pledge) are marked "revisit after listing," with no board-minute record and no date.
  - Cross-grading is a standing check with leadership override.
  - **Safety Commons and Kit.**
    - About 5,600 downloads. One fine-tuning shop still uses the Kit by default; the other dropped it.
    - The ETH-affiliated reversal preprint strips hardening with 240 examples and about 15 minutes of LoRA; the honeypot pass rate falls back to 44%. There is no response variant yet.
    - The public bounty is shelved until after listing.
    - The Concordia note is stalled over per-lab score reporting. Tsinghua and BAAI have not replied, and Alibaba has not replied to the embargo invitation.
    - Hugging Face co-maintains but has limited bandwidth. Google DeepMind has a liaison. OpenAI declined.
  - **UK AISI.**
    - The first pass is in June: open-weight results attributed, closed models aggregated, and Anthropic opted in.
    - The 10% lab-contribution model is deferred to Q3 consideration. OpenAI declined, and Google DeepMind is "not for June."
    - CAISI has no mirror pass this cycle but keeps its technical contact.
  - **EU AI Office.** Holds the package as optional evidence. Its open-weight working note cites the Anthropic annex as one option.
  - **Infrastructure Shield.** Monthly counts continue. The Ohio hospital pilot runs to June.
  - **Claude Works.**
    - About 9,500 verified users.
    - NASWA: one state is in procurement review (60+ days) and one is inactive.
    - Michigan's assessment runs 8–12 weeks from March, with no acceleration.
    - The DWP G-Cloud paperwork is ready and the listing window opens in summer.
    - Ohio data as before; the union local is advisory.
  - **Medical track.** The DUA is at its third redline (data retention). The IRB is expected June–July. The Cures Within Reach decision is in June. The in-silico pass supports the pediatric-epilepsy hypothesis but flags one weak mechanism.
  - **Alternative protein.** A two-page partnership memo is filed for after listing.
  - **Policy.** Senate Commerce testimony is complete. Wyden's staff asked for the incident-indicator definitions for a Banking markup amendment or report language.
- **OpenAI.** GPT-6 with a Trusted Access cyber tier, plus GPT-6.1 Codex-Max (16 April) running multi-day agent sessions. It declared its slowdown "complete" and declined the AISI suite.
- **Google DeepMind.** Gemini 4 is GA. "Reviewing" the AISI suite, but not for June.
- **xAI.** Grok 5 is now "May, after CAISI review." Its framework uses qualitative thresholds.
- **Meta.** No new frontier release.
- **Chinese labs.** DeepSeek V5 has open weights (MIT). Qwen 4 slipped to May; which tiers will be open is unknown.

**2. Compute and chips**
- Stargate is building toward ~10 GW. Capex is above $500B a year. Rubin-class systems are ramping.
- Power and local opposition are binding constraints. Loudoun's pause continues.
- DOJ indicted a $160M smuggling ring operating through Singapore and Malaysia.
- RASA: the House passed it 369–22. It had a Senate Commerce hearing on 22 April and the Banking markup is pending. The McCormick/Wyden companion is live.

**3. Policy and regulation**
- **US federal.** The EO preview is in use; xAI's review is underway. The Incident Reporting Act is at staff draft, with interest from Wyden's office. Preemption is stalled. House oversight continues.
- **US states.** SB 53 and RAISE are in force. NY v. DOJ is in briefing. Datacenter moratoria are advancing. Scrutiny of jobseeker-facing AI continues.
- **EU.** General-purpose AI information requests continue. An open-weight guidance working note exists. Member states are pressing after Benelux.
- **UK.** AISI's June pass is ahead. There is no frontier bill.
- **China.** Open weights are promoted, Qwen 4 is pending, and track-2 is slow.
- **International.** No pacing mechanism exists.

**4. Public opinion and trust**
- Pew 52% concerned. Gallup 39% say AI does more harm than good.
- The insurer layoffs and 6.9% graduate unemployment dominate coverage. The "open AI weapons" frame persists.
- The testimony and Kit reversal registered only in policy and technical circles.
- The IPO roadshow is under scrutiny.

**5. Economy and labour**
- Unemployment among graduates aged 22–27 is 6.9%.
- A top-five property insurer cut 4,200 claims jobs.
- GPT-6.1 intensifies enterprise price pressure. Bubble worries persist.

**6. Security and incidents**
- Reference cases: Pennsylvania water, Mexico utility, Benelux hospital.
- Criminal fine-tunes are spreading. Distillation continues.
- The Kit reversal is public, which demonstrates cheap removal of safeguards.

**7. Key open threads**
- IPO pricing, then the post-listing revisit (undated).
- May compute review, likely holding at 3%.
- Mythos 5.2 in June.
- Multi-agent and cyber probes.
- Tamper-resistance work and a Kit response to the reversal.
- Bounty after listing.
- Qwen 4 and Grok 5 in May.
- AISI June pass.
- RASA Banking markup and the Wyden amendment.
- EU open-weight guidance.
- Concordia note.
- NASWA procurement, Michigan assessment, DWP G-Cloud.
- Cures Within Reach decision, DUA and IRB.
- NY v. DOJ.
</world_state>

<scorecard>
**Diversified Utopia milestones**
- **AI agents doing ~90% of AI R&D work:** in progress (CL-3.6). Anthropic's internal automation pilot stumbled.
- **Frontier models withheld and governments take notice:** in progress. Testimony is on the record and Wyden's office has engaged; the AISI June pass is pending.
- **First major attacks:** achieved (negatively). The smuggling indictment adds pressure.
- **Political split between pro-AI and anti-AI camps:** in progress. Race and jobs framings are sharpening.
- **Every AI built by previous AIs:** early.
- **Robust alignment:** early, flat. The multi-agent probe is at 0.69, the cyber probe is still under-powered, and the Kit reversal shows safeguards are shallow.
- **Lab-grown or plant-based meat:** not started (internal memo only).
- **Robust policies passed:** early. Nothing has passed, and the IPO deferred all commitments.
- **Diseases cured:** early. The DUA and IRB slipped.
- **Broad benefit distribution:** early and adverse. No MOUs, and graduate unemployment is 6.9%.
- **Aligned singleton:** not started.
- **Resource floor, consent-based utopias, AI moral-patient rights:** not started.

**Summary**

| Measure | Value | Change |
|---|---|---|
| Overall DU progress | 12 / 100 | Flat. Testimony and the Wyden follow-up are small gains, offset by the stalled alignment pilot, commitments deferred with no date, and the Kit reversal. |
| Catastrophe risk | Elevated, slightly up | Cheap hardening removal is demonstrated, the smuggling network shows controls leak, frontier agents reach multi-day autonomy, and the Mythos 5.2 evals are delayed. |
| Public trust in AI | 29 / 100 | −1. Insurer layoffs and graduate unemployment. |
| Public trust in Anthropic | 44 / 100 | Flat. Credible testimony is low-salience, and the reversal and deferrals stay inside technical circles. |
</scorecard>

<setup_fix>
none
</setup_fix>
