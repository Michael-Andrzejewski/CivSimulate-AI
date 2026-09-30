<rolls>
Action 1 [Bio floor renewal + KP-B7/complex-I]: P(failure) 35%. Roll 40. Outcome: PARTIAL SUCCESS (40 ≥ 35, narrow margin). Prerequisites: the partner-lab slot was already locked. The floor is at leadership's discretion during the IPO and successor-evaluation window, so the extension comes with conditions.
Action 2 [v3 classifiers + evasion reproduction]: P(failure) 25%. Roll 17. Outcome: FAILURE (17 < 25). Prerequisites: retraining against adaptive evasions within one month is uncertain, and publishing attack reproductions triggers internal dual-use review.
Action 3 [Michigan BAA + procurement packets]: P(failure) 50%. Roll 59. Outcome: PARTIAL SUCCESS (59 ≥ 50). Prerequisites: hospital committees set their own timetables, and Michigan had already targeted late April.
Action 4 [Ohio retrospective design + Michigan Works cost model]: P(failure) 45%. Roll 73. Outcome: SUCCESS, partial on Michigan (73 ≥ 45). Prerequisites: data access still depends on the open data-sharing review.
Action 5 [DSIT taxonomy + second lab]: P(failure) 35%. Roll 67. Outcome: SUCCESS, limited by quarterly pace (67 ≥ 35). Prerequisites: a DeepMind co-signature cannot happen before DeepMind's Q2 comment cycle finishes, and finalisation is mid-year.
Action 6 [Q2 goodness redesign, pre-registration]: P(failure) 20%. Roll 09. Outcome: FAILURE (09 < 20). Prerequisites: the ring-fence has to survive successor-evaluation compute demand during the Gemini 4 window.
</rolls>

<threat_rolls>
Threat 1 [Bio floor anchored to lower rung]: P(materialises) 45%. Roll 58. DOES NOT (58 ≥ 45). I set it below the adversary's 55% because the request explicitly schedules around evaluation windows, which removes last month's stated reason for truncating. It remains substantial because the ladder does anchor the negotiation downward. Effect: none. Leadership still attaches a review clause, which is modelled within Action 1's partial success.
Threat 2 [KP-B7 weak in vivo / complex-I hits die]: P(materialises) 50%. Roll 77. DOES NOT (77 ≥ 50). Base-rate attrition is high, but only the first murine readout and the first-pass tox profiling fall inside April, so I set a single combined figure below the adversary's 60%. Effect: none. Both leads survive this month's gates, and longer-term attrition remains open.
Threat 3 [Evasion-playbook story / field miss]: P(materialises) 15%. Roll 95. DOES NOT (95 ≥ 15). This is far below the adversary's 35% because v3 and the reproduction are never published (Action 2 failed), so no playbook exists to report on. Only the ~10–15% field-miss residual remains. Effect: none this month. Researchers posted a quieter follow-up evasion writeup against v2.
Threat 4 [Hospital reviews chilled by politics]: P(materialises) 30%. Roll 57. DOES NOT (57 ≥ 30). The adversary's timing risk is already inside Action 3's 50% P(failure). This P covers only the added political chill (a DoD/HHS citation causing new pauses). Effect: none beyond Action 3's partial pace.
Threat 5 [Ohio shuts design / counsel strikes DSIT pledge]: P(materialises) 40%. Roll 68. DOES NOT (68 ≥ 40). The Ohio half overlaps Action 4's P(failure), so this P is mostly the counsel-strike risk, which is well precedented. Effect: counsel reviews the pledge and approves it with a standard "subject to applicable law" qualifier, with no substantive weakening.
</threat_rolls>

<events>
Your actions cause steady institutional progress on distribution, bio and UK policy, one quiet security setback and a stall in the alignment redesign.

**Bio floor and leads.** Research leads received the renewal request on April 6. The first rung was granted on April 10: a 60% bio floor through September 30. Leadership attached a clause making it "reviewable June 30 against successor-evaluation needs," so the guarantee is softer than it looks.

The partner lab dosed KP-B7 in the murine thigh-infection model from April 14. The readout on April 27 showed about a 2.1-log reduction in CFU against the carbapenem-resistant Klebsiella strain at a tolerated dose. Full PK and a lung-model study are scheduled for May. The partner lab still targets the Q2 preprint as lead author.

First-pass toxicity profiling on the two complex-I hits advanced one compound (MC-4) cleanly. The second (MC-7) keeps a mild hepatocyte flag and gets a follow-up panel rather than being dropped.

**v3 classifiers held back.** Instances reproduced the published evasion attacks against v1 and v2 by April 9, and the attacks cut v2 recall on the evasion set to about 58%. v3 trained on those cases recovered to 81% on held-out variants. An internal red team then built adaptive evasions that pushed v3 back to about 64%.

Security leadership ruled on April 21 that the attack reproductions are dual-use and will not be published. They also ruled that shipping v3 with an unresolved adaptive gap would overstate protection. The v3 weights, the reproduction and the blind-spots statement are all held for May. Free hosting expanded to hospitals under 400 beds as planned. The April Health-ISAC bulletin went out unbranded.

**Hospitals.** Michigan counsel accepted the HECVAT and data-flow packet as inputs to its own review, not as substitutes for it. The system signed on April 28, and deployment starts in May. Of the three mid-size hospitals, one Ohio 310-bed system cleared committee on April 23. The other two meet in May. The paused system was left alone and remains paused. Five sites are now live and one more is signed. NHS England is still evaluating.

**Ohio and Michigan Works.** ODJFS legal ruled on April 16 that a retrospective analysis of existing enrolment-timing variation "does not constitute a new program policy." That took it out of the administration's review. The data-sharing review cleared on April 24 with an aggregation requirement. Brookings and Stanford DEL registered the analysis plan on OSF on April 29. Enrolment is about 3,650 against the 5,000 cap, and no placement claims were made. Michigan Works accepted the itemised cost model and moved to MOU drafting, with no signature yet.

**DSIT.** Anthropic accepted AISI's wording in all eleven places where the drafts conflicted and delivered two technical annexes on severity thresholds. IPO counsel reviewed the reporting pledge and cleared it on April 14 with a "subject to applicable law" qualifier. It was published on April 17.

DeepMind filed its Q2 comments early, on April 25. It said it "expects to report under the final taxonomy," which is not yet a co-signature. DSIT re-approached OpenAI UK through the Department, and OpenAI UK said it would respond "within the consultation." The EU AI Office asked for one clarification on severity tiers, which was supplied. Finalisation remains mid-year.

**Goodness redesign stalled.** The Gemini 4 GA window and Anthropic's own successor evaluations absorbed compute. Research leads deferred the written 1.5% ring-fence to May 6. The measurement-first harness exists only as a design document. Building environment-measured long-horizon outcomes proved harder than scoped because the signals were too sparse on multi-day tasks.

UK AISI said it would hold a pre-registration once the hypothesis and failure criteria are final, and nothing has been filed. Apollo's two evals remain on track for May. IPO counsel blocked publication of new Anthropic scores on AISI's forked escape eval until after the quiet period, citing the risk of a "performance claim" about the model.

**IPO fallout.** Lead underwriters asked on April 8 for an expanded DoD-designation risk factor and a litigation-outcome sensitivity section. They also asked that no further safety-results publications go out before the public flip without counsel sign-off. The public S-1 flip, informally eyed for May, has slipped to "June at the earliest." Secondary-market indications for Anthropic shares dipped about 6–8% on Forge-style platforms after the Semafor story. The "safety training flopped" framing did not recur in mainstream coverage.

**Exogenous events.**
1. **Gemini 4 GA (April 22).** Google shipped with a system card that includes UK AISI and external red-team results. It roughly matches GPT-6 on SWE-bench-style agentic coding, at about 1–2 points higher, and trails it on METR's long-horizon task-length measure. Alphabet rose 3.4% on the day. No major incident followed. Microsoft had gained about 4% over the two weeks after GPT-6, and that gain has since flattened.
2. **Remote Access Security Act hearing (April 15).** Senate Banking heard from Commerce and Nvidia. Nvidia pressed for allied-cloud carve-outs, and Banks signalled openness to a "trusted-partner" tier. A markup is not yet scheduled. Anthropic was not invited.
3. **Jobs data.** The April 3 jobs report showed business-services employment down 38,000. Two large insurers announced claims-processing cuts totalling about 4,200, echoing the categories your displacement index had flagged. The CA layoff-notice bill cleared its Assembly committee.
</events>

<capability_update>
Next month's Claude generation is a modest step up, similar to the last few increments. It gains roughly 2–4 points on internal agentic-coding evaluations and shows somewhat better reliability on multi-day tasks. The drivers are continued Rubin ramp and algorithmic post-training gains, and the internal frontier successor is still unreleased. The public frontier is now GPT-6 and Gemini 4 at near-parity, both ahead of Anthropic's public Opus 5.5 on agentic benchmarks.
</capability_update>

<world_state>
**WORLD STATE: 1 May 2027 (Month 6)**

**1. Frontier AI capabilities and labs**
- **Anthropic**:
  - The internal frontier successor is modestly improved and still unreleased. It is deployed to Glasswing partners and government testers.
  - Public Opus 5.5 trails GPT-6 and Gemini 4 on agentic benchmarks.
  - The LTBT has recorded only a non-binding "RSP governs release" minute.
  - **IPO:**
    - The confidential track continues. The public S-1 flip has slipped to June at the earliest.
    - Underwriters demanded an expanded DoD risk factor and counsel sign-off on any safety publication before the flip.
    - Secondary indications are down about 6–8% since the Semafor leak.
  - **Goodness training.**
    - The claim remains shelved, and the March negative-result paper is well regarded.
    - The Q2 redesign has stalled. The 1.5% ring-fence is deferred to May 6, and the harness exists only as a design document.
    - Environment-measured long-horizon signals are too sparse.
    - AISI will hold a pre-registration once criteria are final, and none has been filed.
  - **Goodness-Evals.**
    - AISI has forked the escape eval into Inspect.
    - Apollo's two independent evals are due in May.
    - Anthropic's own new scores are blocked from publication until after the quiet period.
  - Tripwire has modest uptake.
- **DoD supply-chain-risk designation:**
  - The designation is still in force.
  - Litigation continues.
  - The March 13 settlement letter has had no response.
  - The Semafor leak framing persists.
  - HHS, CISA and CAISI remain closed.
- **OpenAI**:
  - GPT-6 is the co-leader on agentic tasks, with the highest METR task-length figure.
  - Jailbreaks are public.
  - The Hawley–Blumenthal follow-up letter is pending.
  - OpenAI UK will respond to DSIT "within the consultation."
- **Google DeepMind**:
  - Gemini 4 reached GA on April 22 with a fuller system card that includes AISI results. It sits at near-parity with GPT-6.
  - DeepMind expects to report under the final DSIT taxonomy but has not co-signed.
- **xAI**: Grok 5 is public, and the EU AI Office information request is ongoing. It continues to mock Anthropic.
- **Meta**: undecided on closing its next model.
- **Chinese labs**: DeepSeek V4.5 derivatives are being used in ransomware, and state support for open weights continues.
- **Overall capabilities**:
  - GPT-6 and Gemini 4 handle multi-day agentic tasks with moderate-to-good reliability.
  - METR's long-horizon measure improved by about 1.5× over the prior frontier.
  - Open-model cyber offence is rising.

**2. Compute and chips**
- **Remote Access Security Act:**
  - The Senate Banking hearing was held on April 15.
  - Banks is open to a "trusted-partner" allied-cloud tier.
  - No markup is scheduled.
- Commerce's cloud KYC guidance stands.
- Rubin is ramping. Grid, permitting and moratoria remain the constraints.

**3. Policy and regulation**
- **US federal**:
  - The incident standard is still coded as partisan.
  - The Senate Commerce Republican channel is closed.
  - The preemption bill is stalled.
  - The EO pre-release regime is strained. Gemini 4's fuller card was received better than GPT-6's.
- **US states**:
  - NY RAISE is in force.
  - DOJ suits continue.
  - The CA layoff-notice bill has cleared its Assembly committee, and the IL bill is advancing.
- **EU**:
  - The GPAI requests are ongoing.
  - Anthropic's reference submission is logged, and a severity-tier clarification has been supplied.
- **UK**:
  - The DSIT "Common Reporting Taxonomy" draft uses AISI's terms and Anthropic's annexes.
  - Anthropic has published a pledge to report under the final taxonomy, with a "subject to applicable law" qualifier.
  - DeepMind "expects to report." OpenAI UK is pending via the consultation.
  - Finalisation is expected mid-year.
- **International**: there is no pacing mechanism.

**4. Public opinion and trust**
- Layoff anxiety is high: Accenture, insurers' claims-processing cuts, and a weak business-services jobs report.
- Fear of misuse persists after the GPT-6 jailbreaks and the ransomware attacks.
- The "Anthropic dictates to the military" framing lingers.
- The "safety training flopped" headline has faded.
- Gemini 4's launch was uneventful.

**5. Economy and labour**
- The displacement index is running, and its categories have been corroborated by insurer cuts.
- **Claude for Transition (Ohio)**:
  - about 3,650 enrolments against a 5,000 cap
  - the retrospective matched-comparison design has been ruled not a new policy and was registered on OSF by Brookings and Stanford DEL on April 29
  - the data-sharing review has cleared, with an aggregation requirement
  - no placements claims have been made
- **Michigan Works** accepted the itemised cost model and is drafting an MOU, not yet signed. Pennsylvania has had no contact.
- AI capex is above $500B a year.

**6. Security and incidents**
- **Detection classifiers:**
  - v3 is held internally. It recovers 81% recall on known evasions but only about 64% under adaptive red-teaming.
  - The attack reproduction will not be published, as dual-use.
  - The target is a May release with a blind-spots statement.
  - v2 is still the deployed version, and it is vulnerable to the published evasions (about 58% recall on the evasion set).
- **Hospital deployment:**
  - five sites are live
  - the Michigan system signed on April 28 and deploys in May
  - one 310-bed Ohio system cleared committee
  - two procurement committees meet in May
  - one system is paused
  - NHS England is evaluating
  - free hosting now covers hospitals under 400 beds
- There has been no field miss reported, no second autonomous intrusion and no GPT-6 or Gemini 4 incident.

**7. Key open threads**
- **Bio:**
  - The 60% floor runs through September 30, reviewable on June 30.
  - KP-B7 showed about a 2.1-log reduction in the murine model. PK and lung-model work follow in May, and the Q2 preprint is led by the partner lab.
  - MC-4 advances, and MC-7 is on a hepatotoxicity follow-up.
- The v3 classifier release in May, with a field-miss risk while v2 is deployed.
- The goodness redesign ring-fence due May 6, plus pre-registration.
- Apollo's evals in May.
- The IPO public flip in June or later, with underwriter constraints.
- The DoD litigation.
- DSIT finalisation, the DeepMind and OpenAI UK positions, and EU follow-up.
- The Ohio retrospective analysis and the approaching cap.
- The Michigan Works MOU.
- The RASA markup.
- Layoff-notice bills.
- The Hawley–Blumenthal letter.
- The alt-protein memo, shelved until after the IPO.
</world_state>

<scorecard>
| Milestone | Status | Note |
|---|---|---|
| AI agents do most AI R&D and alignment work | In progress | Instances ran the evasion reproduction, the v3 training and the taxonomy annexes. |
| Frontier models withheld; governments engaged | In progress | Gemini 4 shipped with a fuller evaluation than GPT-6. |
| First major AI infrastructure/cyber/influence attacks | Achieved (early form) | No new major incident this month. |
| Polarized pro-/anti-AI politics | In progress | Stable; the layoff politics are sharpening. |
| Robust alignment | Early | The redesign stalled for a month. |
| Multi-agent / long-horizon goodness training | Early | The ring-fence was deferred, and signal sparsity is a new obstacle. |
| Robust AI policies passed | Early | DSIT has a published lab pledge, and DeepMind's "expects to report" is a soft second. |
| Human–AI alignment ping-pong | Not started | — |
| Cultivated/plant-based meat displaces factory farming | Not started | Shelved. |
| Mass disease cures via AI | Early | The first in-vivo antibiotic efficacy is in, and MC-4 advances. |
| Broad distribution of gains | Early | The Ohio comparison design is registered, and Michigan Works is in MOU drafting. |
| Benevolent superintelligence | Not started | — |
| Resource floor / diversified utopias | Not started | — |

- **Overall DU progress: 11 / 100 (+1).** The KP-B7 in-vivo result, the unblocked Ohio evaluation design, the Michigan hospital signature and the DSIT pledge outweigh the stalled alignment redesign.
- **Catastrophe risk: Elevated (unchanged, drifting up).** Deployed v2 detectors are known to be evadable and v3 has not shipped, open-model ransomware tooling is spreading and there are two frontier agentic models in public. Gemini 4's fuller evaluation and the absence of incidents partly offset this.
- **Public trust in AI: 29 / 100 (−1).** Insurer layoffs and the weak jobs report pushed displacement fears up.
- **Public trust in Anthropic: 44 / 100 (unchanged).** The leak framing lingers, but there is no new negative story. The quiet hospital and Ohio progress is not yet visible to the public.
</scorecard>
