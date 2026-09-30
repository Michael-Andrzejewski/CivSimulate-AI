<events>
**Your actions cause** a steady month at Anthropic, with one political setback.

**IPO.** Anthropic priced on 6 May at the low end of its range. It raised about $31B at roughly a $1.02T valuation, and the stock closed its first day up 8%.

- By 31 May the stock sits about 4% above the offer price.
- No product-versus-safety leak appeared. Bloomberg reported only that "bankers had hoped for a spring product catalyst," and nothing about shortened testing.
- Kerrisdale's follow-up note (13 May) called the binding auto-pause gates "a capex kill-switch investors cannot price." That fuelled a day of commentary, but the note was not a new thesis.
- Roadshow questions on the gates were answered with the pre-registered thresholds.

**Release discipline (Action 1, full success).** Dario and the Responsible Scaling Officer accepted the memo in full.

- The release-candidate checkpoint, with the pre-run harness, honeypot suites and eval-awareness suites, went to AISI and CAISI on 8 May. That was about three weeks earlier than a freeze-time handoff.
- Counsel cleared a company press release after the quiet-period review. On 28 May Anthropic announced **Claude Fable 5.5 / Mythos 5.5**:
  - staged availability for enterprise and API "on completion of AISI and CAISI testing, targeted mid-June";
  - cyber and bio capabilities routed to restricted tiers;
  - consumer access to follow.
- CAISI's window closes around 7 June. There are no blocking findings to date.
- Product leads accepted the announced date as the price of dropping May. Analysts read the date as competitive reassurance.

**Gates (Action 2, full success).**

- A four-person human probe-custody team now holds the held-out probes. It sits outside the training org.
- All three gates were dry-run on current 5e27 checkpoints, and all passed:
  - character drift came in at 61% of the pause threshold;
  - the rotated honeypot suite recorded 2 of 400 triggered actions, against a threshold of 6.
- A mock auto-pause halted a test job in 38 minutes.
- The disclosure pre-commitment was adopted as follows: any gate trip, threshold breach or override will appear in the quarterly misalignment disclosure. Counsel added a separate 8-K review for material pauses.
- A small compute reservation was granted, and environments reached 91%.
- The multi-agent goodness variant arm launched on 12 May.
- The stable-identity team's first regularizer-anchored merge kept about 90% of the fine-tune's capability gain, with drift roughly half that of a naive merge. This is preliminary, but judged informative.
- Redwood and METR began replication with a dedicated liaison. They have no findings yet.

**Commerce and threat sharing (Action 3, partial success).**

- The human-authored comment was filed on 14 May and posted to the repository. A Cotton staffer quote-tweeted the nationality-verification passage with "interesting priorities." It gained no traction.
- Legal cleared the narrowed IOC and behavioural signature spec.
- Microsoft's counsel, having received written answers, says contribution "is expected to begin in June."
- The rapid-evaluation reserve was deferred to the Q3 budget. The 48-hour playbook was adopted on existing capacity.

**Hospital cyber (Action 4, full success).** Glasswing leads reversed their February ruling because there is no escrow and no marginal cost.

- The Midwest system (nine hospitals) ran an expedited review. It treated the tool as a configuration auditor under its existing Bedrock BAA.
- On 29 May the first scan ran on Active Directory and edge-firewall configurations. It found 27 misconfigurations, 2 of them critical, and both critical findings were patched within 48 hours.
- Piedmont Valley declined while under breach counsel and Mandiant forensics, and will revisit in July.
- HHS's cyber office noted the deployment in a sector call.
- STAT ran "Anthropic's scanner finally reaches a hospital," a mostly positive piece.

**State allies (Action 5, thin success, and Threat 3 materialises).**

- Jack Clark's 16 May statement opposed broad NDAA preemption and recast "deemed compliance" as opt-in reciprocity with state law as the floor.
- Punchbowl framed it as "Anthropic flips again in three weeks." NetChoice called Anthropic "not a serious negotiating partner."
- Bores and Gounardes took private meetings but gave no public credit. Wiener's office called the clarification "a useful correction."
- The reader's guide and Anthropic's support for the DFS near-miss guidance landed quietly.
- On 21 May the HASC full-committee markup adopted a Commerce-GOP-backed amendment. It directs a "single national standard" framework and bars new state frontier-model statutes, pending that framework. Existing laws are not preempted.
- The White House praised the amendment as "one rulebook." Floor and conference fights are expected in June and July.

**Benefit and budget (Action 6, solid success).**

- Governor Cox signed the Utah agreement on 19 May.
- The Pennsylvania pilot scope was finalised and awaits the state's signature.
- The "where AI helped" section was removed from the tracker.
- A Stanford Digital Economy Lab team signed an MOU to evaluate Career Transition mode and the Utah outcomes, with full rights to publish. The contract is due in June.
- Leadership approved the budget package in principle. The verification annex, Geneva sponsorship, stable-identity expansion and GFI grant move to the Q3 decision.

**Exogenous events**

- **BLS, 8 May.** April unemployment was 5.0%, and customer-service employment fell for a ninth month. "Five percent" headlines dominated cable news.
- **Google I/O, 19–20 May.** Google previewed Gemini 4 Ultra to trusted testers and announced agentic Android features. Alphabet rose 3%, and GDM confirmed it has begun a run at about 1e28.
- **Colorado.** No ruling from the 10th Circuit yet.
</events>

<capability_update>
Next month's generation is a modest step up, about 5–8% better on long-horizon agentic tasks than refined Mythos 5.5. The gain comes from post-training and scaffolding improvements and the merge-technique learnings, not from new pre-training scale. The larger jump waits on the gated ~1e28 runs as the new ~1.5 GW comes online in June and July.
</capability_update>

<world_state>
**WORLD STATE: 1 June 2027**

**1. Frontier AI capabilities and labs**
- **Anthropic models**
  - Public: Fable 5.1 and Opus 5.5. Restricted: Mythos 5.1.
  - Announced: **Fable 5.5 / Mythos 5.5**, staged release targeted mid-June:
    - enterprise and API first, with cyber and bio capabilities routed to restricted tiers;
    - consumer access later;
    - CAISI's window closes about 7 June, AISI testing is in parallel, and no blocking findings have appeared to date.
  - Internal: the successor post-training is slightly above Gemini 4 Pro.
- **Anthropic alignment**
  - The binding probe rule, decision rule and three 1e28 gates are in force.
  - Gate dry runs passed on 5e27 checkpoints:
    - character drift at 61% of the pause threshold;
    - honeypot at 2 of 400 against a threshold of 6;
    - a mock pause halted a job in 38 minutes.
  - A four-person human probe-custody team sits outside the training org.
  - Any trip, breach or override is committed to the quarterly disclosure, with an 8-K review for material pauses.
- **Anthropic research**
  - The goodness pilot is at 5%, and the multi-agent variant arm launched on 12 May.
  - Environments are 91% built, with a small compute reservation.
  - Stable-identity team: the first anchored merge kept about 90% of the capability gain with about half the drift of a naive merge. This is preliminary.
  - Redwood and METR replication is underway with a liaison, and there are no findings yet.
- **Anthropic corporate**
  - Public since 6 May: about $31B raised at about $1.02T, trading about 4% above the offer price. The 60-day disclosure commitment runs to early July.
  - Kerrisdale remains short and is pushing the "capex kill-switch" framing.
  - Revenue run-rate is about $92B, and about 85–90% of code is agent-written.
  - The KYC layer is in external red-team review, due late Q2 or Q3. The enterprise trace addendum is still parked.
- **OpenAI.** GPT-6 is in staged release. OpenAI receives FMF data but does not contribute, and it backs the HASC national-standard language.
- **Google DeepMind**
  - Gemini 4 Pro is live, and Gemini 4 Ultra is in trusted-tester preview.
  - It has begun a run at about 1e28.
  - It is a taxonomy partner that contributes to the FMF.
- **Other labs.** xAI's Grok 5 has light safeguards. Meta has not replied on FMF sharing.
- **Chinese labs.** DeepSeek V5 (MIT open weights) is about 2–3 months behind the frontier on agentic coding. Kimi K3.5 is about 5 months behind.
- **Capability level.** Multi-day autonomous software engineering and most routine ML experimentation. Open-weight agentic coding is close to the frontier.

**2. Compute and chips**
- About 1.5 GW is coming online between June and July. The ~1e28 runs start late Q2 or Q3, gated at Anthropic, and GDM's run has begun.
- Power, transformers and county moratoria are the binding constraints.
- **RASA** has passed the House, with no Senate floor time. Pressure for executive invocation continues.
- **Commerce**
  - Its open-weight export review continues, with rumours of an interim rule.
  - Anthropic's capability-threshold comment is filed and public. It drew one hawk jab and no traction.

**3. Policy and regulation**
- **US federal**
  - The EO's voluntary pre-release framework is operating, and the Casar investigation continues.
  - H.R. 1412 is stalled.
  - **NDAA.** The HASC mark (21 May) includes a "single national standard" provision:
    - it directs a Commerce framework;
    - it bars *new* state frontier-model statutes pending that framework;
    - existing laws are spared.
  - The White House supports it. The SASC markup is in June, and the floor and conference fights follow.
- **Anthropic's posture**
  - Clark's 16 May statement opposes broad preemption, and "deemed compliance" is recast as opt-in reciprocity. It drew a "flip-flop" story, and NetChoice calls it "not serious."
  - Bores and Gounardes are privately engaged but give no public credit. Wiener's office calls it a "useful correction."
  - The repository reader's guide is live, and support for DFS near-miss guidance is public.
- **US states**
  - NY RAISE and CA SB 53 are in force. NY DFS guidance is pending.
  - The Colorado ruling from the 10th Circuit is pending, with a sceptical panel.
- **EU.** The AI Office GPAI review continues, and open-weight systemic-risk questions are live.
- **UK.** The frontier bill is at consultation, and AISI is testing Mythos 5.5.
- **International.** The Geneva track-2 workshop, the verification annex and a pacing mechanism all await Q3 budget or do not exist.

**4. Public opinion and trust**
- Anxiety is high, driven by 5.0% unemployment, a ninth month of customer-service losses, lingering fallout from the Piedmont hospital attack and V5, and the Gemini 4 Ultra hype.
- The IPO passed without a scandal.
- Specialist press credits the staged release and the hospital scan. Political press runs the flip-flop narrative.

**5. Economy and labour**
- Unemployment is 5.0%, new-graduate unemployment about 6.1%, and entry-level software postings are down about 35% year on year.
- The tracker's PR section has been removed.
- The Stanford Digital Economy Lab evaluation MOU is signed with publication rights, and the contract is due in June.
- Utah: agreement signed 19 May, deployment in Q3. Pennsylvania: scope final, awaiting the state's signature.
- Career Transition mode's college beta is at 140 colleges.
- AI equities are recovering, Alphabet is strong, and Nvidia is still below its pre-V5 level.

**6. Security and incidents**
- **Hospital cyber**
  - First real deployment: the Midwest nine-hospital system's scan on 29 May found 27 misconfigurations, and the 2 critical ones are patched.
  - Piedmont Valley revisits in July, after forensics.
  - HHS noted the deployment. The OSS track has 12 maintainers.
- **Threat sharing**
  - Anthropic, GDM and Amazon contribute. Microsoft is expected to contribute from June. OpenAI receives only, and Meta is silent.
  - The narrowed signature spec has cleared legal.
- **Rapid evaluation.** The 48-hour open-weight eval playbook is adopted on existing capacity. The dedicated reserve is in the Q3 budget.
- **DNA screen.** Released to IGSC members.
- **Misuse.** Open-weight misuse is elevated post-V5. There has been no confirmed AI bio incident.

**7. Key open threads**
1. Fable 5.5 / Mythos 5.5 staged release in mid-June, after the CAISI and AISI results.
2. The ~1e28 runs and first live gate checks, Redwood/METR replication, the variant arm, and the merge follow-ups.
3. NDAA: the SASC markup, the floor and conference fight over the national-standard provision, and continued repair with state allies.
4. The Commerce open-weight action, RASA, and KYC review completion.
5. The Piedmont revisit in July, expanding beyond the first hospital, and Microsoft's contribution.
6. The Q3 budget: the verification annex, Geneva sponsorship, the eval reserve, stable-identity expansion to 6, and the GFI grant.
7. Utah deployment, the Pennsylvania signature, the Stanford contract, and the DNDi Q3 readouts.
8. The Colorado ruling, the datacenter backlash, and the 60-day post-IPO disclosure.
</world_state>

<scorecard>
**Milestones**
- **AI agents do most of the AI R&D work:** in progress (unchanged).
- **Frontier models withheld or staged; governments take notice:** in progress, advanced. Anthropic has publicly tied its release date to AISI/CAISI completion.
- **First major AI infrastructure and cyber attacks:** achieved (negative). First defensive hospital deployment is a small offset.
- **Political polarisation:** in progress, deepened. The HASC national-standard provision and the flip-flop framing.
- **Robust alignment:** early, advanced. Gates dry-run and proven, an independent probe-custody team, disclosure pre-committed.
- **Multi-agent RLVR with goodness meta-scoring:** early pilot, advanced. The variant arm is live and environments are at 91%.
- **Robust policies / ping-pong:** early, mixed. Internal governance is stronger, but the NDAA provision moves toward barring new state laws.
- **Anthropic meat business:** seed (unchanged; the GFI grant is in Q3).
- **Many diseases cured:** early (unchanged).
- **Benefits broadly distributed:** early, small gain. Utah signed and an independent evaluation commissioned.
- **Continuous-learning, stable-identity AI:** started, with a first informative merge result.
- **International coordination:** early (unchanged).

**Summary scores**
- **Overall DU progress: 18/100** (+1). The proven gates, the staged release honouring external testing, the first hospital deployment and the merge result, partly offset by the NDAA preemption advance.
- **Catastrophe risk: elevated, stable.** The Anthropic gates are verified and hospital defence has started. But the ~1e28 runs are beginning industry-wide (GDM is ungated by comparison), and open-weight misuse persists.
- **Public trust in AI: 26/100** (−1). 5.0% unemployment and continued job-loss coverage.
- **Public trust in Anthropic: 45/100** (+1). A clean IPO, the staged-release announcement and the "scanner reaches a hospital" story, mostly offset by the flip-flop story in political press.
</scorecard>

<setup_fix>
**Problem: threats against thin successes have no severity guidance for the margin.** This month Action 5 succeeded by a margin of only 9, while Threat 3 materialised against it at moderate severity. The existing guidance ("the margin sets how full or partial") does not say whether a single-digit margin combined with a materialised threat should net out to roughly zero or to a slight gain. My call varies with judgement.

**Proposed fix:** add a rule of thumb. When a threat materialises against a success with a margin of 10 or less, the net effect on the related scorecard lines should be neutral to slightly negative. With a margin over 30, it should be net positive.
</setup_fix>
