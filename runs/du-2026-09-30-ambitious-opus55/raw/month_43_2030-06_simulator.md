<events>
Your actions cause mixed results. Disclosure and defence went well. Governance, rival checks and jobs went badly, and the month's main alignment reading came back unreadable.

**Action 1 (ramp rules) fails.**
- Your memo reached leadership on 5 June. The CEO and General Counsel rejected the 7-day override-publication condition outright. Their reasoning was that it "pre-commits disclosure of competitive deliberations" during *Buist*.
- They also declined to pre-authorise any ramp before checkpoint 6 lands: "we decide on the data, not on a formula."
- The RSO and Apollo co-signed the checkpoint-6 rules on 12 June, two days late. Leadership filed them as advisory, not binding.
- The anti-deference run lost a storage node at 93% on 21 June and restarted from its last save. Completion is now expected around 6 July, so no final audit went out.
- Checkpoint 6 landed on 28 June and triggered the measurement confound below. The stage-1 ramp holds at 30% by rule, and a sealed-batch diagnosis has begun.

**The multi-agent insertion confounded the checkpoint-6 measurement.**
- The pinned OpenGap probes, calibrated on checkpoint-5 activations, came back at ECE 0.19. That is outside Apollo's ≤0.12 band, and under the May amendment it counts as a trigger.
- Internal probes read framing at 0.067 (a rise of 0.006). Steering reopening read 0.014.
- Neither number can be validated externally. The team cannot yet say whether the objective changed the representations the probes read or changed the underlying awareness.
- Apollo's 30 June note calls it "a co-gate divergence we cannot score as clean or dirty." This must go in the July addendum.

**Action 2 (disclosure) succeeds.**
- The June addendum went out on 16 June after board edits, one day past target. It says plainly that framing reached 0.061 and crossed the pre-registered trigger. It also says the pinned external tool confirmed the reading, OIT was cut to 30%, and the multi-agent objective was inserted.
- The stock fell 3.1% and ends the month about 56% below its open.
- The plaintiffs' firm reposted its "investigating" notice but filed nothing.
- Engineers posted a link-only note on the EleutherAI pull-request thread on 17 June. EleutherAI's Stella Biderman replied that it was "the first substantive thing in three months." She added that the calibration issues are still unanswered.
- Coverage in the *FT* and *The Verge* ran under the headline "Anthropic says its own alarm went off." Most outlets called the disclosure unusually candid. Safety researchers praised the pre-registration working as designed.

**Action 3 (rival checks) fails.**
- Emails went out on 3 June. Google DeepMind's counsel then asked AISI to keep a competitor out of its Gemini 4.5 evaluation, and AISI declined your Q&A offer. It is using the public EleutherAI repository on its own.
- Counsel blocked the confidential multi-agent briefing as too close to the *Buist* theory.
- AISI said it has no capacity for OpenAI's successor. CAISI's acting director did not reply.
- OpenAI's release slipped again, now to "July" per partner briefings, so your escalation memo was never triggered.

**Action 4 (Safety Commons) succeeds.**
- The ANPD documentation, describing an in-country, zero-egress configuration, was delivered on 11 June. ANPD acknowledged it, and its formal review continues. No installs are expected before Q3.
- The Rotterdam-keyed indicator refresh shipped on 13 June.
- NCSC-NL, through the port's sector CERT, shared hashed loader samples under TLP:AMBER, not full artifacts. The replay was reported as it fell:
  - the loader stage would have been flagged about 2 hours before encryption on 2 of 3 terminal variants;
  - one variant evaded.
- The May statistics went out on 18 June: 4 true blocks, 1 false block.
- Three more sites passed 60 clean days and were armed, including a second hospital in Ohio's Health-ISAC. Installs now stand at 4,790.

**Action 5 (Ohio and jobs) fails.**
- On 13 June counsel found that one secondary-region WORM snapshot set had been placed under legal hold by the Pueblo preservation letter. It could not expire. It is crypto-shredded, but not deleted.
- Schellman would attest only with an exception. ODJFS let its 30 June cutoff pass, and about 9,400 Ohio participants moved to OhioMeansJobs. The suspension is now a non-renewal for FY2031, pending review.
- *Cleveland.com* ran "Anthropic's Ohio data 'shredded but still there.'"
- Apprenticeships reached 66 employers, up 3.
- Indiana's Department of Workforce Development rejected the zero-retention track. Oklahoma did not respond.
- Minnesota's AG sent one follow-up on 20 June, and it was answered within 4 days.

**Exogenous events**
1. The May jobs report (5 June) put unemployment at **7.9%** and new-graduate unemployment at 14.4%.
2. DeepSeek released V8.1 open weights (19 June) with a native long-horizon agent scaffold. Forks appeared within days, and the open-weight frontier is now about CL-5.57.
3. The *Harlan* court issued a notice pushing its ruling into Q3.
</events>

<capability_update>
Next month's Claude generation is only slightly more capable, about CL-5.53 deployed (+0.02). Stage 1 stayed at a 30% ramp with OIT at 30%, so the gains come from routine post-training and inference-efficiency work, not new pretraining scale. Internally, checkpoint 6 sits at about CL-5.67. The verified frontier edged up to about CL-5.72 as AISI's Gemini 4.5 evaluation proceeds.
</capability_update>

<world_state>
**WORLD STATE, 1 July 2030**

**1. Frontier AI capabilities and labs**
- **Capability index**
  - Claimed frontier: about CL-5.74 (Gemini 4.5 Deep Think).
  - Verified frontier: about **CL-5.72**. The AISI evaluation is under way; results due in July.
  - Open-weight frontier: about **CL-5.57** (DeepSeek V8.1 plus agent scaffold forks).
  - Anthropic deployed: about CL-5.53.
  - Stage-1 checkpoint 6 internal: about CL-5.67.
  - Path: about 0.04 per month, giving about CL-6.0 by December 2030.
  - Triggers: OpenAI successor (slipped to "July"), AISI's Gemini results, DeepSeek V8.1 forks.
- **Other labs**
  - OpenAI: successor slipped to July. Awareness checks refused three times. No AISI capacity for it.
  - GDM: had Anthropic excluded from the AISI Gemini evaluation.
  - xAI: calls AISI's check "theatre."
  - DeepSeek: V8.1 open.
  - Alibaba: Qwen5.
- **Anthropic: company**
  - Stock about 56% below its open (−3.1% on the June addendum).
  - Interim policy, D&O freeze and DoD designation stand.
  - *Harlan* ruling delayed to Q3.
  - Plaintiffs' firm reposted "investigating." Nothing filed.
  - Pueblo preservation letter active (it now holds one Ohio WORM set).
  - Leadership rejected the 7-day override-publication condition. The override for "material competitive developments" is retained and undisclosed in form.
- **Anthropic: frontier run**
  - Stage 1 holds at 30% by rule after the checkpoint-6 co-gate divergence.
  - Sealed-batch diagnosis under way.
  - Protected partition about 4%.
  - Checkpoint 7 about late July.
- **Anthropic: checkpoint 6 science (28 June)**
  - Internal framing 0.067 (rise +0.006). Steering reopening 0.014.
  - Pinned OpenGap ECE **0.19**, outside the ≤0.12 band. That counts as a trigger.
  - Unresolved: whether the multi-agent objective shifted the representations the probes read, or the underlying awareness.
  - Apollo: "cannot score as clean or dirty." Must be disclosed in the July addendum.
- **Anthropic: OIT, multi-agent and anti-deference**
  - OIT at 30%. Multi-agent objective inserted, and primary under the advisory rules.
  - Checkpoint-6 rules co-signed by the RSO and Apollo on 12 June but filed as advisory by leadership.
  - Anti-deference run restarted at 93% after a node failure. Completion about 6 July; final audit due within 48 hours of completion.
  - RSO dissent partially resolved.
- **Anthropic: OpenGap**
  - Pinned version in the repository.
  - Link-only note posted on 17 June; EleutherAI acknowledged it.
  - Calibration issues still unanswered (held by D&O and counsel).
  - BIS pending. Toolkit held under *Buist*. Op-ed held.
- **Anthropic: evaluators and EU**
  - AISI declined Anthropic's Q&A on Gemini and is using the public repository.
  - Counsel blocked the multi-agent briefing.
  - CAISI has not replied.
  - EU submission filed. Dutch awareness-gap field under discussion.
- **Anthropic: other safety work**
  - Harness v5; partner episodes overdue.
  - Kit v2 hosting overdue.
  - Induced collusion 2.9%.
  - Monitors 11 of 12; CAISI consents 4 of 12.
  - Verification grant about 34%.
- **Anthropic: Safety Commons**
  - 4,790 installs; 95 MOUs.
  - Rotterdam-keyed refresh shipped 13 June. May statistics published: 4 true blocks, 1 false block.
  - Armed sites: 2 Health-ISAC hospitals (Pennsylvania and Ohio), 2 co-ops, 1 other.
  - Rotterdam replay (hashed samples): would have flagged 2 of 3 variants about 2 hours early; 1 evaded.
  - Brazil: ANPD received the zero-egress documentation on 11 June; review ongoing, installs Q3 at earliest.
  - WaterISAC declined; APPA silent; E-ISAC needs vetting and DoD resolution.
- **Anthropic: Claude Works**
  - About 196,000 enrolled minus about 9,400 Ohio participants transferred to OhioMeansJobs. About 187,000 remain.
  - 66 apprenticeship employers.
  - Ohio: one WORM set is under the Pueblo legal hold (crypto-shredded, not deleted). Schellman attests only with an exception. The 30 June cutoff passed; non-renewal for FY2031 pending review.
  - Minnesota: follow-up answered 24 June.
  - Indiana rejected the zero-retention track. Oklahoma silent. Quebec blocked.
- **Anthropic: medical.** Patient summaries pending; no IRB; R01 pending.
- **Anthropic: alternative protein.** Nebraska MOU tabled.

**2. Compute and chips.** Stargate toward about 10 GW, Rubin ramping. Colossus 3. Texas grid study. RASA stalled.

**3. Policy and regulation**
- **US federal.** Regulatory freeze. CAISI acting director, unresponsive. Open-Weight Model Accountability Act at 21 co-sponsors. CISA Pueblo report pending. BIS pending.
- **Courts.** *Harlan* (Q3). Minnesota CID (follow-up answered). *Buist*. Pueblo preservation letter (now intersecting the Ohio purge).
- **States.** Datacenter moratoria. Cultivated-meat bans. Colorado utility AI-security push. Ohio non-renewal pending. Indiana hostile.
- **EU.** Open-weight working party continues. Dutch pressure growing; NCSC-NL shared samples under TLP:AMBER.
- **UK.** AISI evaluating Gemini 4.5; results July. Capacity strained; no OpenAI check.
- **China.** MOFCOM opposes the EU proposal.
- **Brazil.** ANPD review of the documentation; GSI holds the replay note.
- **International.** No pacing mechanism.

**4. Public opinion**
- Pew 52% concerned; Gallup 39% say more harm than good.
- Headlines: "Unemployment 7.9%"; "Anthropic says its own alarm went off"; "Anthropic's Ohio data 'shredded but still there'"; "DeepSeek V8.1 agents."

**5. Economy.** Unemployment 7.9%; new graduates 14.4%. The agent price war continues.

**6. Security.** V8 and V8.1 fork toolkits in circulation (Brazil outage, Rotterdam). Utility scanning elevated. Dutch, Bavarian and AZ Delta investigations ongoing.

**7. Pending decisions and conditions**
- **Stage-1 ramp.** Held at 30% by rule after the ECE divergence. Owners: leadership, RSO, Apollo. Review at checkpoint 7. Set June.
- **Sealed-batch diagnosis of the probe drift.** Owners: alignment team and Apollo. Due before checkpoint 7. Set June.
- **July addendum must disclose the checkpoint-6 co-gate divergence.** Owners: leadership and comms. Set June.
- **Anti-deference completion and audit.** About 6 July, audit within 48 hours. Set March; slipped June.
- **Override-publication condition.** Rejected by leadership. Override retained. Set June.
- **OpenAI successor escalation memo.** Conditional on a verified CL-5.85+ release without a gap check. Not triggered. Set June.
- **OpenGap issues and EleutherAI reply.** Owners: D&O and counsel. Held.
- **Pinned recipe, op-ed and toolkit.** Owners: counsel and BIS. Held.
- **Ohio.** Legal-hold exception. FY2031 non-renewal pending review. Needs Pueblo parties' consent or a court order to delete.
- **Minnesota CID.** Awaiting the AG.
- **Brazil installs.** ANPD review; Q3 earliest.
- **Overdue or open:**
  - partner episodes;
  - LTBT harness allocation;
  - kit v2 hosting;
  - New Hampshire replay;
  - sanctions opinion;
  - Nebraska MOU;
  - DOJ review;
  - Google terms;
  - Open relaunch plan;
  - co-op #2 rider;
  - E-ISAC vetting;
  - IRB.
</world_state>

<scorecard>
**Diversified Utopia milestones**
- **~90% of AI R&D done by AI:** in progress, up slightly (verified CL-5.72).
- **Frontier models withheld and governments take notice:** flat. AISI is evaluating Gemini, but there is no check on OpenAI and GDM excluded Anthropic.
- **First major attacks:** achieved (negatively). DeepSeek V8.1 agent scaffolds widen the misuse surface.
- **Political split:** flat.
- **Every AI built by previous AIs:** early, flat.
- **Robust alignment:** early, mixed, slightly worse.
  - The trigger crossing was disclosed honestly.
  - At checkpoint 6 the external co-gate diverged, so the measurement is no longer trustworthy just as the hedge takes effect.
  - The anti-deference run slipped.
- **Lab-grown meat:** started, flat.
- **Robust policies:** early, flat.
- **Diseases cured:** early, flat.
- **Broad benefit distribution:** early, slightly down. Ohio lost about 9,400 participants; apprenticeships reached 66.
- **Aligned singleton; resource floor, consent-based utopias, AI moral-patient rights:** not started.

**Summary**

| Measure | Value | Change |
|---|---|---|
| Overall DU progress | 24 / 100 | Flat. Candid trigger disclosure and a real Rotterdam replay, offset by a broken co-gate, failed rival checks and Ohio loss. |
| Catastrophe risk | Elevated, up slightly | The awareness instrument lost calibration at checkpoint 6. The OpenAI successor is still due unchecked. V8.1 agent scaffolds are open. |
| Public trust in AI | 3 / 100 | Flat, at floor. Unemployment 7.9%. |
| Public trust in Anthropic | 18 / 100 | Flat. Addendum candour was praised, offset by the Ohio "shredded but still there" story and the stock drop. |
</scorecard>

<setup_fix>
**Problem.** Disjunctive threats ("either half suffices") resolve as one roll. When such a threat does not materialise, both halves are forced false. That includes a half I had judged "very likely on its own." This month that was the Rotterdam artifacts staying locked in a criminal investigation. Non-materialisation made them partly shareable, which is lenient to the player and was never priced.

**Proposed change.** Have the harness reject or split threats that bundle independent mechanisms. Alternatively, let me assign a probability to each half and have each half rolled separately.
</setup_fix>
