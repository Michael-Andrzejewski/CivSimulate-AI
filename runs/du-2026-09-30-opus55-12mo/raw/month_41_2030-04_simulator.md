<events>
**Your actions cause mixed results this month: two own-goal failures, one real step forward, and a public story about Anthropic's own plumbing that arrives just as the board's July clock starts to matter.**

**Action 1: the dry run fails, and the failure becomes the story.**
- Moving every engineer onto the orchestration layer did not shrink the integration surface.
  - Component 3, the partition-isolated checkpoint store, passed its integration tests on 22 April, two days late.
  - Component 4, the cross-partition divergence logger, did not finish integration testing.
- The team ran the dry run on 29 April with three components and a stubbed logger. It failed at orchestration: partition handoffs deadlocked under concurrent checkpoint writes in 2 of 6 test configurations.
- The RSO's May queue-status post went up on 30 April. It gave the component-level breakdown and the cause.
- It did not give a fixed re-run date on or before 31 May. Engineering would commit only to "target: 12 June," because the logger rework is not scoped.
- On 30 April METR published its composite on schedule. Its note says a June pass window "presupposes the lab's partitioned-run infrastructure is ready." In practice, resumption now moves from June to July at the earliest.
- **Threat 1 lands.**
  - On 30 April *The Information* ran "Anthropic's pause bottleneck is Anthropic," quoting the post against METR's note.
  - A Bernstein note said the same day: "the evaluator was never the constraint."
  - The pro-waiver director circulated both to the board. The director argued that the July contingency is now the realistic base case, not a backstop.
- The stock slipped to about 43% below the offer price.

**Action 2: the criteria post verbatim, but the board declines the middle path.**
- Counsel and IR did not touch the text. On 1 April the RSO posted criteria (a), (b) and (c) word for word, and Glasswing partners confirmed they matched the drafts.
- The board did not take up the costed pilot.
  - At its 17 April session it deferred the pilot "pending retention outcomes."
  - It left the 31 March July contingency unchanged.
  - It minuted that the RSO's criteria "state the RSO's assessment standard and do not modify the waiver provision."
- Neither CAISI nor UK AISI was asked to confirm an observer role, and neither offered one.
- The factual note to METR and UK AISI went out. UK AISI replied that Q2 allocations will be announced "in May."

**Action 3: the grants go out.**
- The intermediary's board selected two registered groups on 23 April:
  - an ETH Zürich–affiliated evaluation lab running V8 locally;
  - a UK university consortium running K5 on a rented 64-GPU cluster. Its full-precision K5 runs are limited to a subset of probes.
- Both also have scope-(a) access to Fable and Mythos 5.5. Results are due on 31 May.
- The interpretation rule was pre-registered publicly on 21 April, unedited: higher recognition in Claude counts against Anthropic's own resumption case.
  - Redwood and Apollo researchers called the rule "the most falsifiable thing a lab has posted this year."
  - *Buist* plaintiffs' counsel filed a notice citing it. There was no motion.

**Action 4: domestic coverage grows, but the European mirror fails.**
- WaterISAC custody took effect on 8 April as scheduled. The four-custodian tabletop slipped to 21 May because of scheduling.
- **Hospitals:** Health-ISAC cleared 31 of about 80. The rest are held in procurement and legal review.
- **Cellular-OT:** CISA cleared about half the backlog, bringing installs to 29.
- **Fork commitments:** met on schedule.
- **Europe:**
  - ENISA and the EU CSIRTs Network both sent the offer to legal review over data-processing terms.
  - NCSC-NL received only the Rotterdam scoping indicators, under an existing TLP:AMBER channel. It asked for a formal agreement before taking the K5 and V8 signatures.
- **16-week persistence templates:** drafted, but not validated. Delivery slips to May.

**Action 5: facts delivered, with one lag.**
- **BIS** requested fork and exploit-tooling counts for its dockets on 9 April. The answer went out in 61 hours.
- **House Energy and Commerce staff** asked for per-evaluation costs on 15 April. The answer went out in 70 hours.
- **The EU AI Office** asked about its new consultation. The answer went out within 72 hours.
- Mirrors to DFS, the ISACs and the AI Office went out the same day. The mirror to NCSC-NL was held for four days over the same data-agreement question.
- No formal audit request came from CAISI, the EU or UK.

**Other labs:**
- OpenAI rolled Deep Program to a 16-week horizon on 14 April and has about 11,900 customers. It disclosed no new incidents.
- Google told customers its multi-month limited GA is "on track for Q2." The UK AISI review is still open.
- xAI shipped Grok 8.1, a tool-use patch, with no evaluation.

**Exogenous events:**
1. **Jobs:** BLS reported March unemployment at 8.5% on 3 April. White-collar claims led the rise. Two Senate Democrats cited Deep Program in calling for a hearing on displacement.
2. **Post-Rotterdam regulation:**
   - On 16 April the European Commission opened a 10-week consultation on amending the GPAI Code of Practice for open-weight systemic-risk models. It cited the Rotterdam intrusion.
   - The Dutch Tweede Kamer passed a non-binding motion asking the government to press for pre-release fork-risk assessments.
3. **Open weights:** Alibaba released Qwen 5 open weights on 24 April. Evaluators put it at roughly 4.1 on multi-week agentic tasks, lifting the open-weight floor. By month's end it had 9 forks, none yet with exploit tooling.
</events>

<capability_update>
- Next month's Claude generation is only marginally more capable: a post-training refresh on the Fable/Mythos 5.5 base, about +0.02 on the index. The successor run remains paused, and resumption has now slipped to July at the earliest.
- The frontier index rises from 4.60 to about 4.71. Two things drive this:
  - Deep Program's 16-week rollout, running on continued Stargate compute ramps;
  - Qwen 5 raising the open-weight floor to about 4.1.
- Level 5 remains on track for May–July 2030.
</capability_update>

<world_state>
**WORLD STATE: 1 May 2030**

**1. Frontier AI capabilities and labs**
- **Capability index: 4.71.**
  - OpenAI's Deep Program is live at a 16-week horizon.
  - xAI's Grok 8 and 8.1 are GA with no evaluation.
  - Google's multi-month limited GA is "on track for Q2." The UK AISI review is open.
  - The open-weight floor is about 4.1 (Qwen 5).
  - **Path:** Level 5 in May–Jul 2030, ASI in December 2030.
- **OpenAI:**
  - Deep Program has about 11,900 customers.
  - It has disclosed 2 incidents, with none new.
  - The Calloway subpoenas are expanded.
  - It has no outside evaluation.
- **xAI:** Grok 8.1 patch shipped, with no evaluation and no disclosure framework.
- **Google DeepMind:** the AISI review continues; the Q2 GA is pending.
- **Open weights:**
  - V8 has 24 forks, 3 with exploit tooling.
  - K5 has 61 forks, 7 with exploit tooling. One is confirmed in the Rotterdam intrusion.
  - V7 has about 17 forks.
  - Qwen 5 was released on 24 April and has 9 forks, none with exploit tooling.
  - The CAC harness rule is in force. The Meta appeal ruling is pending.
- **Anthropic models:** Fable and Mythos 5.5 plus a refresh. The relative rate is about 0.39. Anthropic is still the only one of the four labs without a Level-4 product.
- **Successor: paused since 7 May 2029.**
  - METR's composite was published on 30 April.
  - METR's note conditions a pass window on Anthropic's infrastructure being ready.
  - Resumption is now July at the earliest.
  - The goodness pilot stays at 5%.
- **Partitioned-run build:**
  - 3 of 4 components are tested. The divergence logger has not been integrated.
  - The 29 April dry run failed: an orchestration deadlock in 2 of 6 configurations.
  - The re-run target is 12 June, but it is not a firm date.
- **Mythos 5.5 Supervised:** gated behind a pre-launch external reading, with the 6.9-gap fallback.
  - **METR:** will decide on a second reading in May.
  - **UK AISI:** Q2 slot allocations are due in May.
  - **CAISI:** not committed.
- **RSO criteria:** (a), (b) and (c) were posted verbatim on 1 April.
- **Board:**
  - The July contingency is unchanged.
  - The pilot was deferred "pending retention outcomes."
  - The board minuted that the criteria do not modify the waiver provision (CEO plus chair, 30 days' notice), which is unused.
  - The pro-waiver director calls July the base case.
- **Internal controls:**
  - 14 reviewers. The triage miss rate is 3.5%, and the aid stays at 20%.
  - **Audit v2:** held by DFS. Notice has been sent to CAISI, the EU and UK, with delivery within 10 days of any formal request. No requests have been made.
  - **Environment-audit tool:** open-source.
  - **METR transcripts:** consent clearance is 41%.
- **Scope-(b) grants:** issued on 23 April.
  - The ETH-affiliated lab is testing V8.
  - A UK consortium is testing K5, with a subset of probes at full precision.
  - Both are also testing Fable and Mythos 5.5 under scope (a).
  - Results are due 31 May.
  - The interpretation rule was pre-registered publicly and unedited.
- **Anthropic corporate:**
  - The stock is about 43% below the offer price. The run-rate is about $121B.
  - **Retention:**
    - 1 account extended.
    - 1 split.
    - 1 renewed.
    - 1 in negotiation.
    - 2 out to bid, with decisions expected May–June.
    - 3 lost previously.
  - *Buist*: discovery is live. Plaintiffs have filed a notice citing the pre-registration, with no motion. *Oyelaran* is pending.

**2. Compute and chips**
- Anthropic has about 1.5 GW.
- The Stargate, Google and Colossus 3 ramps continue.
- The BIS IFR is in effect. BIS has the fork counts, delivered on 12 April.
- RASA and the Commerce refiling are pending.

**3. Policy and regulation**
- **US federal:**
  - The CR runs through 30 September. CAISI and CISA are flat-funded.
  - The Senate Commerce bill (self-testing, plus a 12-month CAISI study) is awaiting floor time.
  - The House has the Frontier Oversight Act. Energy and Commerce staff hold Anthropic's cost data.
  - Casar's letters are open. There are calls for a Senate displacement hearing.
  - The FBI Texas investigation continues. Apollo's observer contract is under review.
- **Guide:** about 3,400 downloads. The CISA review is ongoing.
- **Counsel:** Redwood's paper is held. The competitor-sharing veto stands.
- **US states:**
  - NY DFS holds the audit. Its agent guidance is pending.
  - The NY AG's Calloway probe has widened.
  - RAISE and SB 53 are in force.
  - The Ohio and Indiana attorneys general are holding. Colorado en banc is pending. Kansas and Maine are reviewing.
- **EU and UK:**
  - The EU AI Office's consultation on the GPAI Code of Practice for open-weight models opened on 16 April and closes late June. Anthropic has answered factually.
  - The Dutch motion on fork-risk assessments has passed.
  - ENISA and the CSIRTs Network are reviewing data terms for the signature offer. NCSC-NL holds only the Rotterdam indicators and wants a formal agreement.
  - The German pilot is live.
  - The UK AISI settlement is flat-real.
- **International:** v1.0 is in the UN repository with the China seat empty.
- **Testing programme:** scopes (a) and (b) are active, and (c) is deferred. The monthly log continues.

**4. Public opinion**
- Unemployment is 8.5% (March).
- Headlines:
  - "Anthropic's pause bottleneck is Anthropic";
  - "OpenAI agents now run 16-week projects";
  - "Brussels eyes rules for open AI models after port hack";
  - "Qwen 5 lifts open-model ceiling."

**5. Economy and benefits**
- GFI's IRB amendment is pending.
- DNDi's go/no-go is not yet announced.
- Utah and Indiana continue. Nebraska is paused.

**6. Security**
- **Cellular-OT:** 29 installs, with about half the backlog left.
- **Alabama and Mississippi:** complete.
- **Hospitals:** 419, with about 49 in the pipeline.
- **WaterISAC:** custody has been effective since 8 April. The four-custodian tabletop is on 21 May.
- **16-week persistence templates:** drafted, with validation in May.
- **Forks:** commitments met.
- **Incidents:** Rotterdam is the only confirmed fork intrusion. No US lockout. Georgia attribution is still unclear.
- **METR table:** 8 rows are untested: GPT-7, Deep Program at 16 weeks, K5, Grok 7, Grok 8/8.1, V8, Gemini multi-month and Qwen 5. V8 and K5 are now under grant testing.

**7. Open threads**
1. The dry-run re-run on 12 June (unfixed date), resumption in July at the earliest, and the collision with the board's July contingency.
2. METR's decision on a second Mythos reading and the UK AISI Q2 allocations in May.
3. The scope-(b) grant results on 31 May under the pre-registered rule.
4. The EU consultation, the ENISA, CSIRTs Network and NCSC-NL agreements, the Senate floor, the House, RASA and BIS.
5. Google's Q2 GA, Deep Program incidents, Grok 8.1, Qwen 5 forks, Calloway, and the 2 accounts out to bid.
6. The hospital pipeline, the cellular-OT backlog, the WaterISAC tabletop, and the fork watch.
7. DNDi, GFI, the Meta ruling, *Oyelaran* and *Buist*.
</world_state>

<scorecard>
**Milestones**
- **AI agents do most AI R&D:** up. Deep Program is live at 16 weeks, the open-weight floor is about 4.1, and the index is at 4.71.
- **Models withheld or staged; governments take notice:** slightly down.
  - Resumption slips to July because of Anthropic's own infrastructure.
  - The board keeps the July contingency and says the criteria do not bind the waiver.
  - The EU consultation is a small governmental offset.
- **First major infrastructure and cyber attacks:** achieved (negative). There was no new intrusion, but Qwen 5 and the stalled EU mirror widen exposure.
- **Political polarisation:** flat, with rising displacement politics.
- **Robust alignment:** flat. The dry run failed. The grants are issued, and the pre-registered rule adds falsifiability.
- **Multi-agent RLVR with goodness meta-scoring:** frozen at 5%.
- **Robust policies / ping-pong:** flat. Cost data now sits with House staff. The EU consultation is open.
- **Anthropic meat business:** seed, flat.
- **Many diseases cured:** early, flat.
- **Benefits broadly distributed:** down. Unemployment is 8.5%.
- **Continuous-learning, stable-identity AI:** weakened, flat.
- **International coordination:** flat. The European defensive mirror failed.

**Summary scores**
- **Overall DU progress: 31/100 (−1).**
  - Gains: the first independent eval-awareness testing of a non-Anthropic lineage is under way, and the criteria were published verbatim.
  - Losses: the self-caused slip to July puts the gate on a collision course with the board's contingency, and the frontier advanced.
- **Catastrophe risk: elevated, up.** Reasons: the index is at 4.71 with 8 untested rows, a higher open-weight floor, the 16-week agents live, and Level 5 weeks away.
- **Public trust in AI: 1/100 (±0).** At the floor.
- **Public trust in Anthropic: 34/100 (−1).** The "own plumbing" story outweighs the credit for the verbatim criteria and the pre-registration.
</scorecard>

<setup_fix>
**Problem:** threats that depend on how an action turns out are rolled on their own, so the two rolls can contradict each other.

**Where it bit this month:** Threat 1 ("dry-run slip becomes the story") only makes sense if Action 1 fails. The harness rolled it independently of Action 1 at an unconditional 25%. This month both rolls pointed the same way. If Action 1 had succeeded and Threat 1 had still materialised, I would have had no coherent way to resolve it.

**Proposed fix:** let the simulator mark a threat as conditional on a named action's result, for example "Threat 1 | Action 1 fails: 50%". The harness should then roll that threat only when its condition holds and treat it as not materialising otherwise. This is different from my earlier fixes, which dealt with threats that *assumed* an action executed, or with overlapping sub-parts.
</setup_fix>
