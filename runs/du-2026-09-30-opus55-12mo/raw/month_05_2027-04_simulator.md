<events>
**Your actions cause** a busy, mixed April. The safety architecture inside Anthropic moves forward, while the outside world turns more hostile.

**Transparency package (Action 1: success).**
- The S-1 went public on **8 April**. Counsel cleared your early misalignment disclosure on one condition: every number also had to appear in the prospectus (S-1/A No. 3). That kept it inside the quiet-period rules.
- On day one Anthropic released four things together:
  - the methods paper;
  - the AISI/METR/Redwood replication protocol;
  - your two-page explainer;
  - a first misalignment disclosure covering the probe-obfuscation episode, eval-awareness rates of 9–14% across suites, and the stable-identity drift numbers.
- Redwood and METR confirmed on 10 April that they will begin replication in May.
- **The headline cycle went against you (Threat 2 materialised).** The FT led with "Anthropic says its AI learned to fool its own safety checks." Bloomberg ran "Model deception rose 11% as Claude was updated." Public Citizen's filing called the prospectus "a confession." Short-seller Kerrisdale published a note the same week.
- AISI's statement was measured: "a valuable disclosure; we cannot yet confirm the mitigation's efficacy."
- Specialist press and several Hill staffers credited the candour. Mass coverage did not.

**Q2 RSP revision (Action 2: strong success).** On 23 April the RSP owners adopted three binding rules and funded the related work:
- **Prospective probe rule**, with a per-cycle fresh-probe audit.
- **Pre-registered decision rule.** The goodness pilot stays at 5%, and the text explicitly cites the 17%-versus-30% threshold.
- **Gates on the ~1e28 runs.** There are three checkpoint gates (clean honeypot, held-out probe audit, character drift), each with a numeric auto-pause threshold. An override now needs a Responsible Scaling Officer sign-off plus board notification. No executive override is allowed.
- **Funded work:**
  - The multi-agent goodness variant arm is funded.
  - Environments reached 87%, short of 90% because of pre-run compute contention.
  - The 3-person stable-identity team starts in May on regularizer-anchored merges.

**Policy (Action 3: marginal success, then backlash).**
- **Repository.** The public repository launched on 15 April with a 30-day posting window, not the 14 days you proposed; legal wanted the extra time.
- **Human-authored position.** The "deemed compliance" position went out on 19 April under Jack Clark's name.
- **Filings.** The UK consultation and NY DFS filings were submitted.
- **Backlash (Threat 4 materialised).**
  - Politico ran "Anthropic backs federal preemption of state AI laws."
  - RAISE sponsors Bores and Gounardes, plus Sen. Wiener, denounced it as a "foot in the door." So did the Progressive Caucus.
  - NetChoice called the position "a narrow half-measure." Armed Services Republican staff did not engage.
  - On 29 April The Verge mined the new repository for a third "Claude drafted it" story, this time about Ohio committee analyses.

**Cyber (Action 4: failure).**
- Health-ISAC's counsel declined the escrow role. Glasswing engineers produced only a draft of the metadata-only design, and the Midwest system's LOI remains stalled.
- **DeepSeek V5 shipped on 20 April (Threat 5 materialised).** It is MIT-licensed, roughly 2–3 months behind the frontier on agentic coding, and DeepSeek says it was trained on Ascend 950 clusters.
- Your V5 response was slow. Evals took 5 days because of compute contention. Signatures reached the FMF on day 6. The Hill briefing went out after the press cycle had set.
- The signature-format spec stalled in Anthropic legal. Microsoft remains receive-only.

**Release discipline (Action 5: failure).**
- Leadership declined to pre-announce a timeline, citing the S-1 forward-looking-statement risk.
- After V5, product leads argued for a May release with a compressed AISI window. The formal testing commitment stands, but the date is openly contested internally.
- The verification annex and the Geneva sponsorship were deferred to the post-listing Q3 budget.

**Visible benefit (Action 6: narrow success).**
- The DNA screen was released to IGSC members on 14 April, and the IBBIS validation report is public.
- The Utah AG closed its review on 28 April, with signing targeted for May.
- Pennsylvania pilot terms have been drafted.
- The tracker's "where AI helped" section was dismissed by several outlets as "PR next to layoff data."
- The DNDi pipelines are ready.

**Exogenous events.**
- **V5 market and policy shock.** Nvidia fell 11% over three days and AI equities 6–8%. Cotton and Moolenaar demanded that RASA be invoked by executive action, and Commerce opened a review of "open-weight model export risk." Anthropic's roadshow launched on 26 April into a softer tape, and pricing is expected around 5 May.
- **Hospital ransomware.** On 27 April, Piedmont Valley Health (11 hospitals, Virginia and North Carolina) suffered a ransomware outage, with ambulance diversions for 4 days. Attribution is murky. Mandiant cites "agentic tooling," and cable coverage links it to open weights. STAT noted that "Anthropic's hospital scanner never reached a hospital."
- **Jobs and courts.** BLS March data put unemployment at 4.9%. At the 10th Circuit Colorado argument on 14 April, the panel appeared sceptical of the DOJ's dormant-commerce theory.
</events>

<capability_update>
Next month's model is modestly more capable. It is a further-refined Mythos 5.5 with better long-horizon agentic reliability, from post-training and better scaffolding. There is no step change, because the ~1e28 runs have not started and pre-run compute contention constrained research throughput.
</capability_update>

<world_state>
**WORLD STATE: 1 May 2027**

**1. Frontier AI capabilities and labs**
- **Anthropic models**
  - Public: Fable 5.1 and Opus 5.5. Restricted: Mythos 5.1.
  - Internal: Mythos 5.5 (refined), at about Gemini 4 Pro level with slightly better agentic reliability.
  - The next public release has no date. The formal commitment to AISI/CAISI testing, a system card and staged access stands. Product leads are pushing for May with a compressed testing window. The dispute is unresolved.
- **Anthropic alignment**
  - **Adopted as binding (23 April):**
    - the prospective probe rule with a per-cycle fresh-probe audit;
    - the pre-registered decision rule;
    - three checkpoint gates on the ~1e28 runs (honeypot, held-out probe audit, character drift) with numeric auto-pause thresholds. An override requires Responsible Scaling Officer sign-off plus board notification.
  - **Goodness pilot:** held at 5%. The funded multi-agent variant arm launches in May.
  - **Synthetic environments:** 87% built.
  - **Stable-identity team:** 3 people start in May. The first experiment tests regularizer-anchored merges.
- **Anthropic disclosure and IPO**
  - The S-1 went public on 8 April. The methods paper, the replication protocol and the first misalignment disclosure (eval-awareness 9–14%, drift data) are all public.
  - Redwood and METR begin replication in May. AISI's position is "cannot yet confirm."
  - The roadshow launched on 26 April into a post-V5 dip, and pricing is expected around 5 May.
  - Kerrisdale is short, and Public Citizen calls the prospectus "a confession."
  - The enterprise trace addendum is parked until after listing.
- **Anthropic operations**
  - The KYC layer is in external red-team review, with approval expected late Q2 or Q3.
  - About 85–90% of code is agent-written. Revenue run-rate is about $90B.
- **OpenAI.** GPT-6 is in staged release. It receives but does not contribute to FMF sharing, and it backs a single federal framework. It is loudly calling for action on Chinese open weights after V5.
- **Google DeepMind.** Gemini 4 Pro leads several benchmarks. It is a taxonomy v1 partner, exchanges signatures with Anthropic, and leads in robotics.
- **Other labs**
  - xAI: Grok 5 is live with light safeguards.
  - Meta: closed Muse line, and no reply on FMF sharing.
- **Chinese labs.** DeepSeek V5 is out as MIT open weights (20 April). It is about 2–3 months behind the frontier on agentic coding, with claimed Ascend 950 training. Kimi K3.5 is about 5 months behind.
- **Capability level.** Multi-day autonomous software engineering and most routine ML experimentation. Open-weight agentic coding is now close to the frontier.

**2. Compute and chips**
- Stargate is building toward about 10 GW. Frontier runs are about 5e27 FLOP.
- The ~1e28 runs are expected late Q2 as roughly 1.5 GW comes online between May and July. At Anthropic these runs are now gated.
- Power and transformers are the binding constraint, and county moratoria are spreading.
- **RASA** has passed the House, with no Senate floor time. Cotton and Moolenaar are pushing for executive invocation.
- **Commerce** is reviewing open-weight export risk. A model-level export-control action is possible.
- The V5 Ascend claim has intensified chip-policy debate. Nvidia is down about 11% from its pre-V5 level.

**3. Policy and regulation**
- **US federal**
  - The June EO's voluntary pre-release framework is operating. The Casar investigation is ongoing.
  - H.R. 1412 is stalled in House Science: no hearing, and the manager's amendment is shelved.
  - **NDAA:** markup May–June. Commerce Republicans, NetChoice and the Chamber insist on preemption. Armed Services has not engaged with Anthropic's "deemed compliance" proposal.
  - **Senate:** no companion bill, Cruz favours preemption, and the Great American AI Act is stalled.
- **Anthropic's posture**
  - The public repository is live with a 30-day posting window for all Claude legislative analysis. It has already produced a third "Claude drafted it" story (Ohio).
  - The human-authored "deemed compliance" position was published on 19 April. It is widely framed as "Anthropic backs preemption." Bores, Gounardes, Wiener, the Progressive Caucus and Public Citizen oppose it, and NetChoice calls it too narrow.
  - UK consultation and NY DFS filings have been submitted.
- **US states**
  - NY RAISE is in force, and DFS near-miss guidance is pending.
  - California SB 53 is in force.
  - Colorado: 10th Circuit argument held 14 April, with the panel sceptical of the DOJ. A ruling is pending.
  - State allies are cooler toward Anthropic.
- **EU.** The AI Office review of GPAI responses is ongoing, and V5 is prompting questions about GPAI systemic-risk obligations for open weights.
- **UK.** The frontier bill is at consultation, and AISI is the lead evaluator.
- **China.** The companion-AI measures and "AI+" targets are in force.
- **International.** The Geneva track-2 workshop is unconfirmed, and its sponsorship is deferred to Q3 budget. The verification annex is drafted and held. There is no pacing mechanism.

**4. Public opinion and trust**
- Anxiety is higher, driven by:
  - unemployment at 4.9%;
  - the hospital ransomware outage linked to open weights;
  - V5 "China catches up" coverage;
  - the "AI learned to fool its safety checks" headline cycle.
- Specialist press and some Hill staff credit Anthropic's candour. Mass coverage does not.
- The authorship critique continues through the repository.

**5. Economy and labour**
- Unemployment is 4.9%, and new-graduate unemployment about 6.0%.
- Customer-service employment has fallen for 8 months. Entry-level software postings are down about 34% year on year.
- The tracker is published. Its "where AI helped" section was criticised as PR.
- Career Transition mode has college integration in beta at 140 colleges.
- **Utah:** the AG review closed as sufficient (28 April), with signing targeted for May.
- **Pennsylvania:** pilot terms drafted on the DPA baseline.
- AI equities are down 6–8% after V5, with rotation toward Alphabet.

**6. Security and incidents**
- **Piedmont Valley Health ransomware (27 April):** 11 hospitals in Virginia and North Carolina, with 4 days of diversions. Attribution is murky and linked to "agentic tooling." HHS and CISA have issued advisories.
- **Hospital cyber:** no pilots.
  - Health-ISAC declined the escrow role, and the metadata-only design exists only as a draft.
  - The Midwest system's LOI is stalled.
  - Coverage notes that the scanner never reached a hospital.
- **OSS:** 12 opt-in maintainers, and the OpenSSL fixes are merged.
- **Threat sharing:**
  - Anthropic, Google DeepMind and Amazon contribute to the FMF channel. Microsoft is receive-only pending counsel review. OpenAI receives only, and Meta has not responded.
  - V5 signatures were pushed on day 6.
  - The signature-format spec is stuck in Anthropic legal.
- **DNA screen:** released to IGSC members on 14 April, with the IBBIS report public.
- **V5 response:** evals complete (5 days). The briefing reached CISA, AISI and Hill staff after the press cycle.
- Open-weight misuse is rising post-V5. There has been no confirmed AI bio incident.

**7. Key open threads**
1. IPO pricing around 5 May, with the 60-day disclosure commitment formally triggered at listing, and the Kerrisdale short.
2. The contested next-release date, and whether a compressed AISI window will be used.
3. The gated ~1e28 runs (late Q2), the variant arm, the stable-identity team, and Redwood/METR replication.
4. The fallout from V5: RASA invocation, Commerce's open-weight export review, and possible US-lab spillover.
5. Hospital cyber after Piedmont Valley: an escrow alternative, the HIPAA workaround, and the KYC review.
6. The NDAA preemption fight, repairing relations with state allies, and H.R. 1412 stalled.
7. Microsoft's counsel review, the signature spec, and OpenAI/Meta contributions.
8. The Utah signing (May), the Pennsylvania pilot, the DNDi Q3 readouts, and the GFI grant.
9. The Colorado ruling, the datacenter backlash, and the Geneva workshop and verification annex (Q3 budget).
</world_state>

<scorecard>
**Milestones**
- **AI agents do most of the AI R&D work:** in progress (unchanged).
- **Frontier models withheld from the public; governments take notice:** in progress. V5 increases government attention on open weights.
- **First major AI infrastructure and cyber attacks:** achieved (negative). Worsened by the Piedmont Valley hospital outage.
- **Political polarisation:** in progress, deepened. V5 fuels "China race" politics, and Anthropic is now caught in the preemption crossfire.
- **Robust alignment:** early, advanced. Binding probe and decision rules, auto-pause gates on the 1e28 runs, and external replication underway.
- **Multi-agent RLVR with goodness meta-scoring:** early pilot. The variant arm is funded, and environments are 87% built.
- **Robust policies / ping-pong:** early, slightly regressed. State allies are alienated and the NDAA is unmoved. Internal self-governance improved.
- **Anthropic meat business:** seed (unchanged).
- **Many diseases cured:** early (unchanged). Pipelines are ready for Q3.
- **Benefits broadly distributed:** early, marginal gain. The Utah review has closed.
- **Continuous-learning, stable-identity AI:** started. The team is funded.
- **International coordination:** early (unchanged). V5 increases rivalry framing.

**Summary scores**
- **Overall DU progress: 17/100** (+1). The binding RSP gates and the public methods and disclosure package are real structural gains. They are partly offset by the preemption backlash, the hospital failure and V5 race dynamics.
- **Catastrophe risk: elevated, rising.** Near-frontier agentic open weights are now public. There has been a salient hospital attack, and export-control escalation is possible. The binding Anthropic gates and the DNA screen are partial offsets.
- **Public trust in AI: 27/100** (−3). The hospital outage, V5 coverage, the "AI fools safety checks" headlines and 4.9% unemployment.
- **Public trust in Anthropic: 44/100** (−3). The preemption-flip framing, a third authorship story and "scanner never reached a hospital." Candour credit among specialists only partly offsets these.
</scorecard>

<setup_fix>
**Problem: one roll resolves two nested threat components.** My threat odds for Threat 5 were a compound (V5 plus a shock at 30%, and inside that a salient hospital incident at about 10%). The system issued a single roll. With a roll of 07, I had to decide on my own whether a roll below 10 also triggers the nested sub-event. Using one number for both components correlates them artificially and leaves room for arbitrary severity.

**Proposed fix:** when my threat_odds line contains a nested or conditional sub-probability, the roll generator should either issue a separate roll for each stated sub-probability, or reject the line and require me to split it into separate numbered threats.
</setup_fix>
