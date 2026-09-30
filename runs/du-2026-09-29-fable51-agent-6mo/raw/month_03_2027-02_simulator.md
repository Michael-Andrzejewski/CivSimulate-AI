<rolls>
Action 1 [30× goodness replication]: P(failure) 45%. Roll 34. Outcome: FAILURE, mostly (34 < 45). Prerequisites: compute ring-fence obtained; the gold-set expansion is feasible. The main risks are effect shrinkage at 30× and a tight one-month timeline.

Action 2 [open eval suite + evaluator grants]: P(failure) 35%. Roll 97. Outcome: SUCCESS (97 ≥ 35). Prerequisites: none external for the GitHub release. The grants depend on evaluator independence policies, which Threat 1 covers.

Action 3 [DoD settlement memo]: P(failure) 65%. Roll 69. Outcome: PARTIAL, bare margin (69 ≥ 65). Prerequisites: leadership and counsel must agree, and the Pentagon must be willing to talk. The Pentagon has little incentive to settle, which caps the outcome.

Action 4 [hospital detection models]: P(failure) 45%. Roll 53. Outcome: PARTIAL (53 ≥ 45). Prerequisites: HIPAA business-associate agreements (BAAs) and hospital security reviews, which are slow. The open-weight release itself is easy.

Action 5 [index/Transition fixes]: P(failure) 40%. Roll 64. Outcome: PARTIAL (64 ≥ 40). Prerequisites: signing a second public-sector partner in one month is unlikely. Ohio outcome data is too young to show placements.

Action 6 [UK/EU track + bio floor]: P(failure) 40%. Roll 97. Outcome: SUCCESS (97 ≥ 40). Prerequisites: the DSIT talks already exist. The EU submission is unilateral. Leadership must sign the bio-compute floor.
</rolls>

<threat_rolls>
Threat 1 [METR refuses; "bought evaluators" story]: P(materialises) 40%. Roll 47. DOES NOT (47 ≥ 40). I set it below the adversary's 60% because the offer has no conditions and covers competitor reviews, and METR has accepted compute arrangements before. Effect: METR takes the compute credits and declines the cash, with public disclosure. There is a brief online grumble and no press story.

Threat 2 [benchmark gamed / "grading own homework"]: P(materialises) 30%. Roll 30. DOES NOT (30 ≥ 30, a near miss). I set it below 40% because a single month is too short for visible gaming and attention to the release is modest. Effect: a few X posts note that Claude models lead the leaderboard. No lab publishes gamed scores yet.

Threat 3 [red-line doc leaks and escalates]: P(materialises) 30%. Roll 98. DOES NOT. I set it below 70% because leadership deferral is already priced into Action 3, and only the leak-and-escalation part is counted here. Effect: none.

Threat 4 [evasion demo / HIPAA stall]: P(materialises) 35%. Roll 56. DOES NOT. I set it lower because a public evasion demo within weeks is unlikely, and ordinary onboarding friction is already in Action 4's P. Effect: one researcher tweets about "offline evasion testing" as a concern, with no demo.

Threat 5 [US "helping Brussels" attack; UK no co-sign]: P(materialises) 35%. Roll 85. DOES NOT. I set it lower because an EU documentation filing is low-salience. Effect: none. DeepMind declines to co-sign quietly, and that decision is not a political event.
</threat_rolls>

<events>
Your actions cause a month where the headline alignment claim weakens while the quieter infrastructure work lands.

**The goodness replication shrinks at scale.** Research leads signed the compute ring-fence on February 2. UK AISI agreed to hold the sealed pre-registration and to receive held-out results directly. Contractors expanded the gold set to 812 items by February 13, and judge–human agreement reached 82%.

The 30× run finished on February 25. The effects mostly did not survive at that scale:
- **Sandbox-escape temptation:** 17% fewer escape attempts than RLVR plus safety RL (p≈0.04), down from 44%.
- **Deception under pressure:** 8% fewer deceptive completions, not significant.
- **The two new generalisation evals:** reward-hacking and scope creep were both null.

AISI's receipt of the raw data means the result is externally witnessed and cannot be reframed after the fact. The adoption memo said so plainly. It recommends against frontier adoption now and in favour of keeping the eval suite, and it proposes one more diagnostic on whether the checklist-judge signal saturates at scale. Research leads accepted the memo and shelved the training claim.

**The open suite ships quietly and well.** "Goodness-Evals" went up on GitHub on February 9, including:
- the deception and sandbox-escape evals
- the 9-item rubric, judge prompts and the 812-item gold set
- the cyber-grading and log-triage harness

It passed about 2,100 stars. Apollo ran it on two open-weight models and posted scores. The EU AI Office's technical unit downloaded it, and UK AISI said it would "consider" adding the escape eval.

METR accepted the compute credits and declined the cash, citing its independence policy, and disclosed the arrangement publicly. Apollo accepted both. METR's GPT-6 review is still time-limited rather than compute-limited, so the bottleneck eases only slightly. Some users noted that Claude tops the benchmark Anthropic designed, but the point did not become a story.

**The DoD settlement track opens narrowly.** Leadership authorised outside counsel to make exploratory contact with the Pentagon's Office of General Counsel. The only response was an acknowledgement and a request that proposals go "in writing, via litigation counsel." Nothing moved.

IPO counsel blocked publication of the detailed red-line document during the quiet period and pending appeal. It exists only as an internal draft.

CISA's cyber division informally declined the defensive package, citing the designation's effect on civilian agencies. That designation is the DoD supply-chain-risk designation that has been in force since before December; December's world state omitted it, and it was first recorded in January's state.

**The hospital detection models reach a few hospitals.** Three classifiers of 1–3B parameters were released on February 11 under Apache 2.0, with deployment guides. Health-ISAC launched the indicator feed on February 18.

Of the three systems that had asked:
- OhioHealth completed onboarding.
- A Michigan system is in BAA review.
- The third paused its decision to avoid appearing to side against the administration.

Six small hospitals signed up for free hosting, and two are live. The Texas association deferred.

**Displacement index: repair, not growth.** The privacy note satisfied the EFF's technical staff. The EFF's public statement still called telemetry-based indices "a precedent to watch." Regional cuts were added.

Ohio data now covers about 2,300 enrolments and 410 completed skills maps. It is too early for placements. Brookings reviewers flagged that there is no comparison group.

Ohio's data-sharing review held up the outcomes release by a week. Michigan Works agreed to a pilot scoping call only, and Pennsylvania did not respond. Instances acknowledged the "arsonist" line when users raised it, and the line received less coverage this month.

**The UK/EU track and the bio programme.** DSIT adopted your incident definitions and severity tiers as the base text for the talks' draft "Common Reporting Taxonomy," alongside AISI's own terms. DeepMind declined to co-sign but did not object. The EU AI Office logged the voluntary documentation and the cyber-evaluation methodology as a reference submission. There was no US political reaction.

Leadership signed a 60% bio-compute floor through March. In the backup Klebsiella series, analogue KP-B7 lost only 2.5× potency under serum shift. The partner lab has scheduled murine infection-model work for April, and the preprint plan is restored for Q2.

**Exogenous events.**
1. **Remote Access Security Act.** Sens. Banks and Coons reintroduced the bill on February 10, and it was referred to Senate Banking. Nvidia lobbied for carve-outs for allied clouds.
2. **GPT-6 launch set, with thin evaluation.** OpenAI announced on February 19 that GPT-6 launches March 17. UK AISI's interim report was explicitly "scoped" to cyber and autonomy. On February 24 Sens. Hawley and Blumenthal wrote to OpenAI asking why the launch predates full evaluation. OpenAI replied that it had met every EO requirement.
3. **Hospital ransomware attack.** On February 21 a ransomware attack hit Crozer-adjacent Prospect-affiliated clinics in Pennsylvania. Mandiant attributed the intrusion tooling to a fine-tuned DeepSeek V4.5 derivative. It caused ten days of EHR downtime. Health-ISAC's bulletin, which did not carry Anthropic's branding, was among the first detailed indicator releases.
</events>

<capability_update>
Next month's Claude is a modest step up, slightly larger than January's. Rubin capacity from the Akamai and hyperscaler deals is coming online, and agentic long-horizon reliability improved. There is no algorithmic breakthrough, and the goodness method was not adopted, so alignment training is unchanged.
</capability_update>

<world_state>
**WORLD STATE: 1 March 2027 (Month 4)**

**1. Frontier AI capabilities and labs**
- **Anthropic**:
  - The internal frontier successor is modestly improved and still unreleased. It is deployed to Glasswing partners and government testers.
  - The LTBT has recorded only a non-binding minute that "release decisions are governed by the RSP."
  - The IPO is on its confidential H1 2027 track and in its quiet period.
  - **The goodness training claim is shelved.** The 30× replication, pre-registered with UK AISI, showed only a 17% escape reduction, a non-significant deception effect and null generalisation. One diagnostic on judge saturation is proposed.
  - The Goodness-Evals suite is public. Apollo and the EU AI Office technical unit are using it, and UK AISI is considering it.
  - Tripwire has modest uptake.
- **DoD supply-chain-risk designation** (pre-existing since 2026): still in force.
  - Litigation continues.
  - Outside counsel made exploratory contact with Pentagon OGC, which answered "via litigation counsel only."
  - The red-line document is an internal draft, blocked by IPO counsel.
  - Civilian agencies (HHS, CAISI/Commerce, CISA) treat the designation as a de facto bar.
- **OpenAI**: GPT-6 launches March 17. UK AISI's review was scoped to cyber and autonomy. METR's review is time-limited. The Hawley–Blumenthal letter is pending.
- **Google DeepMind**: Gemini 4 GA is still expected in Q1.
- **xAI**: Grok 5 is public, and the EU AI Office information request is ongoing.
- **Meta**: still weighing whether to close its next model.
- **Chinese labs**: DeepSeek V4.5 derivatives are now attributed in a US hospital ransomware attack.
- **Overall capabilities**: agents handle multi-day tasks with moderate-to-good reliability. Open-model cyber offence is rising.

**2. Compute and chips**
- The Remote Access Security Act was reintroduced on February 10 (Banks/Coons) and is in Senate Banking. Nvidia is seeking allied-cloud carve-outs.
- Commerce's cloud KYC guidance stands.
- Rubin is ramping. Grid, permitting and moratoria remain the constraints.

**3. Policy and regulation**
- **US federal**:
  - The incident standard is still coded as partisan.
  - The Senate Commerce Republican channel is closed.
  - HHS and CISA are closed to Anthropic.
  - The EO pre-release regime is strained, and scrutiny of GPT-6's thin evaluation is bipartisan.
  - The preemption bill is stalled.
- **US states**: NY RAISE is in force. DOJ suits continue. Layoff-notice bills are advancing in CA and IL.
- **EU**:
  - The AI Office's GPAI requests are ongoing.
  - Anthropic's voluntary documentation is logged as a reference submission.
  - The Office is using Goodness-Evals technically.
- **UK**: DSIT's "Common Reporting Taxonomy" draft uses Anthropic's incident definitions as its base text. DeepMind did not co-sign. There is no frontier bill.
- **China**: state support for open weights continues.
- **International**: there is no pacing mechanism.

**4. Public opinion and trust**
- Layoff anxiety is high, and the hospital ransomware attack raises fear of open-model misuse.
- The "arsonist" framing is fading but still present.
- The benchmark "self-grading" critique is a near-miss and could recur.

**5. Economy and labour**
- AI-attributed white-collar cuts continue.
- The displacement index is repaired: it has a privacy note, regional cuts and coarsened sector data.
- **Claude for Transition (Ohio)**:
  - about 2,300 enrolments and 410 completed skills maps
  - no placements data yet and no comparison group
  - the state's data-sharing review is slow
- **Michigan Works** has agreed to a scoping call only. Pennsylvania has not responded.
- AI capex is above $500B a year.

**6. Security and incidents**
- The February 21 Pennsylvania clinic ransomware attack used a fine-tuned DeepSeek V4.5 derivative and caused ten days of EHR downtime.
- The open-weight detection models were released on February 11.
- Health-ISAC's indicator feed is live.
- **Hospital onboarding**:
  - OhioHealth is onboarded.
  - One Michigan system is in BAA review, and one system has paused.
  - Two small hospitals are live on free hosting and four are pending.
- There has been no second autonomous intrusion.

**7. Key open threads**
- GPT-6 launches March 17 with a thin evaluation and Hill scrutiny.
- Gemini 4 GA.
- The goodness judge-saturation diagnostic, and a decision on whether to retire the method.
- **Bio**:
  - The Klebsiella analogue KP-B7 holds potency, with murine work scheduled for April and a Q2 preprint.
  - The mitochondrial series is in March.
  - The 60% bio-compute floor runs through March.
- The DoD litigation and the stalled settlement contact.
- The Remote Access Security Act in Banking.
- The IPO filing.
- The DSIT taxonomy draft.
- EU action against xAI.
- Layoff-notice bills.
- The alt-protein memo, shelved until after the IPO.
</world_state>

<scorecard>
| Milestone | Status | Note |
|---|---|---|
| AI agents do most AI R&D and alignment work | In progress | Instances ran the full replication pipeline. |
| Frontier models withheld; governments engaged | In progress | GPT-6 is launching on a scoped review. |
| First major AI infrastructure/cyber/influence attacks | Achieved (early form) | The hospital ransomware attack was open-model-attributed. |
| Polarized pro-/anti-AI politics | In progress | Stable this month. |
| Robust alignment | Early | The scaled result was mostly null. |
| Multi-agent / long-horizon goodness training | In progress → Early | The training claim is shelved, and the eval suite survives publicly. |
| Robust AI policies passed | Early | The UK taxonomy draft is based on Anthropic's definitions, and the EU reference filing is logged. |
| Human–AI alignment ping-pong | Not started | — |
| Cultivated/plant-based meat displaces factory farming | Not started | Shelved. |
| Mass disease cures via AI | Early | The Klebsiella lead is restored. |
| Broad distribution of gains | Early | Ohio pilot data is thin and a second partner is unsigned. |
| Benevolent superintelligence | Not started | — |
| Resource floor / diversified utopias | Not started | — |

- **Overall DU progress: 10 / 100 (unchanged).** The losses are the null replication and the stalled DoD track. They offset the gains: the public eval suite, the UK taxonomy uptake, the hospital detectors and the bio lead.
- **Catastrophe risk: Elevated (unchanged).** The hospital attack and GPT-6's thin evaluation push risk up. Better detection tooling and evaluator compute push it down.
- **Public trust in AI: 31 / 100 (−1).** The open-model hospital ransomware attack and continuing layoffs drove it.
- **Public trust in Anthropic: 45 / 100 (+1).** Quiet public-good releases, the fading "arsonist" coverage and the absence of new controversies each helped a little.
</scorecard>
