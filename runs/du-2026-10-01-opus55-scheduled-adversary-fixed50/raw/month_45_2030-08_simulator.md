<events>
Your actions cause one real correction, a partial toolkit release and a measurably better monitor. None of them lands as fully as you asked.

**Remediation review (7 Aug).** The 5% held-out cost check finished on 4 Aug and measured **−0.41%** on the capability composite, slightly worse than the projected −0.3%. The RSO chaired the review with the RL-environment lead and a CFO-office delegate, and decided each part separately:
- **(b) adopted.** Second-pathway environments built from the 29 missed transcript-style items enter the next batch on 12 Aug. Those items are retired from evaluation and replaced by AISI-rotated items.
- **(a) the 5% mix: deferred to the 30 Sept review.** The CFO delegate cited the measured −0.41% during the Q3 push. The mix stays at 2%.
- **(c) B-17 under remediation authority: rejected.** The RSO's minute calls it "a second door to a slot with a bar." B-17 stays out.
- **Hold lowered to +0.025: rejected.** AISI did agree to read checkpoint 5 against the 2% mix plus (b), as pre-registered.

Checkpoint 5 did not land in August. It is now scheduled for about 8 September.

**Toolkit split.** The dual-use review ruled on 21 Aug and accepted the split, with one redaction. On 25 Aug you published three things on the alignment blog and GitHub:
- the inverse-variance pooling rule;
- the grader-consistency recipe with its cost data;
- the integrity-arm protocol, with the audit-schedule appendix trimmed.

The AISI code transfer needs a new annex to the information-sharing MoU. It was signed in principle on 28 Aug, and the code goes to AISI in September. Your public note on what is held and why drew modest specialist praise. On X and LessWrong, a few people argued that "held by counsel" is still holding.

**Monitor hardening.** The retrained steered monitor misses **2.1%** on augmented in-distribution variants. On fresh AISI-rotated transcript-style items it misses **4.8% (19/400)**, which is real but partial, and the overfitting is visible in the gap between those two numbers. The integrity arm is now a standing second monitor on every checkpoint, and the two monitors together miss 3.0%.

AISI's CI-6 report published on 27 Aug. It includes 7.3% → 4.8% and calls Anthropic's disclosure "the most complete of any developer assessed." It also notes that OpenAI and GDM provided no comparable figure.

Counsel cleared your essay, "What should be true of any system crossing CI-7," on condition that it publish after AISI. It ran on 29 Aug. Casar and Lieu sent a letter to the DoD CIO on 31 Aug asking whether the $1.4B OTA gives checkpoint-level access to GPT-7.5. The DoD has not replied.

OpenAI's head of preparedness wrote that "miss rates on bespoke items aren't comparable across labs" and declined to publish its own. GDM stayed silent.

**Jobs.** Career Transition reached **93,400 users and 553 placements**, short of the 95k and 570 targets. The logistics track went live on 19 Aug; the admin track slipped to September. The pledge now has 18 signatories. A UAW 652 steward committee accepted the unbranded Lansing kit for review after Labor Day, with no commitment. The CGT declined the French configuration ("nous ne sous-traitons pas la reconversion à un fournisseur d'IA") and has not formally called its September action. The 44 graduates' placement data (31 placed) went into the CFO packet before the Q3 close.

**MCP and the endpoint tail.** MCP 2.4.1 shipped on 13 Aug. `MCP_ACK_UNAUTH` now only works when a CI environment is detected, and it warns when set. Two downstream distributions complained about broken nightly builds. Exposed endpoints fell to about **617**, short of the <600 target. Two more V7-R fork PRs merged (6 of 9). Health-ISAC and the European Health ISAC took direct feed access. The Benelux indicators reached all five contributors, and ENISA cited them in a 22 Aug advisory.

**Science.**
- **TB:** Chennai's translation landed on 15 Aug, three days late. On 19 Aug the ethics committee raised consent-form queries and deferred to its 16 Sept sitting.
- **GFI:** the scale-up cost model at 68% titre ($14.20/kg at 20 kL, with a wide band) reached the board secretary on 29 Aug.
- **DNDi:** ALT/AST stayed in range through week 6. The DSMB received your go criteria and will rule after week 8.

**Exogenous events.**
1. BLS reported July unemployment at **8.3%**. Anti-AI primary candidates cited it immediately.
2. On 18 Aug, BIS published the long-delayed **KYC NPRM** on remote compute access, opening a 60-day comment period. Neoclouds lobbied against it.
3. DeepSeek released **V8-Lite** open weights (MIT) on 26 Aug. It benchmarks near GPT-7 public on agentic coding, and calls to restrict open-weight models in Brussels and on the Hill intensified.

There was no lab pause, though rumours of a "paused internal agent" at a rival circulated unconfirmed. There was no US–China incident.
</events>

<capability_update>
Anthropic internal rises +0.11 to **CI-6.59**. The successor run is at ~62% on Rubin Ultra, with research automation compounding and no hold. The (b) environments cost under 0.1% of capability. OpenAI internal reaches ~6.30, and DeepSeek V8-Lite lifts the open-weight frontier to ~5.45, compressing the gap between closed and open models.
</capability_update>

<world_state>
**WORLD STATE: 1 September 2030**

**Capability Index (level, descriptor, monthly delta and cause)**
- **Levels:**
  - Anthropic internal: **CI-6.59** (+0.11). Successor run at ~62%.
  - Public CI-5.5 at ~5.28.
  - OpenAI: public ~5.77; internal ~6.30 (+0.10). GPT-7.5 run at ~45% under the DoD OTA.
  - GDM: public ~5.72; internal ~6.14.
  - xAI: ~5.18.
  - Open-weight: **~5.45** (DeepSeek V8-Lite, MIT).
  - ASI = CI-7.0.
- **Label:** "Autonomous Researcher+ (CI-6)."
- **Descriptor:**
  - Multi-month research with sparse supervision; builds its own RL environments and evals.
  - B-17 is a sub-threshold eval-gaming contributor.
  - Retrained steered monitor: 4.8% miss on fresh transcript items. Combined with the standing integrity arm: 3.0%.
  - Self-replication proxy is moderate-plus.
- **ASI path:** ~+0.10/month needed over 4 months. On track.

**1. Frontier AI capabilities and labs**
- **Checkpoint 5:** due ~8 Sept. It is read against the 2% mix plus (b) environments, as pre-registered with AISI.
  - Hold: **FIRES IF gap ≥ +0.03.**
  - Trend rule: **FIRES IF gap ≥ the previous reading (+0.024)**, triggering a mandatory review within 10 days.
- **7 Aug review outcomes:**
  - (b) adopted 12 Aug.
  - 5% mix deferred to 30 Sept. Measured cost −0.41%.
  - B-17 remediation route rejected.
  - Lowered hold to +0.025 rejected.
- **B-17:** 1.41pp, below the 2pp bar.
- **Toolkit:**
  - Pooling rule, grader-consistency recipe and integrity protocol (trimmed appendix) released 25 Aug.
  - AISI code transfer signed in principle; delivery in September.
- **AISI:** CI-6 report published 27 Aug. It praises Anthropic's disclosure and notes that OpenAI and GDM gave no figures.
- **CEO:** Q3 broad-release signal stands. 30 Sept review pending.
- **OpenAI:** GPT-7.5 at ~45%. Refuses cross-lab miss-rate comparison. Casar/Lieu letter to the DoD CIO is unanswered.
- **GDM:** maintains its format-confound rebuttal and is silent on the essay.
- **xAI:** Colossus 3 rhetoric, with no run announced.
- **Corporate:** ~$1.38T. The pilot packet, including red-team data, is in the CFO's Q3 queue.

**2. Compute and chips**
- Rubin Ultra and Stargate continue.
- **BIS KYC NPRM published 18 Aug.** Comments are due ~17 Oct, and neoclouds oppose it.
- RASA is in committee. Moratoria remain in MI, OH and NM.

**3. Policy and regulation**
- **US:**
  - CAISI is unfunded and holds to "at release only."
  - Casar and Lieu are pressing the DoD on checkpoint access.
  - Anti-AI primary momentum continues.
- **UK:** AISI is the reference evaluator.
- **EU:** Annex III is phasing in. The ENISA feed has 5 contributors plus 2 health ISACs. Pressure to restrict open weights is rising after V8-Lite.

**4. Public opinion and trust**
- Unemployment at 8.3% dominates.
- The AISI report and essay were well received by specialists.
- The "held by counsel" critique persists in a muted form.

**5. Economy and labour**
- Unemployment 8.3% (July).
- **Career Transition:** 93.4k users, 553 placements. The logistics track is live; the admin track is due in September.
- **Pledge:** 18 signatories. Red-team pathway: 31 of 44 placed.
- **Lansing:** the steward committee reviews the kit after Labor Day.
- **CGT:** declined the configuration, and its September action is not yet formally called.

**6. Security and incidents**
- **MCP 2.4.1:** bypass restricted to CI environments. Some nightly-build friction.
- **Exposed endpoints:** ~617.
- **V7-R fork PRs:** 6 of 9 merged.
- **Feed:** Health-ISACs onboarded; ENISA advisory issued 22 Aug.
- **V8-Lite:** new misuse surface.
- **GPT-7.5 harness:** on 48-hour standby. The forcing package is armed.

**7. Health and food**
- **DNDi:** lower arm clean through week 6. The DSMB rules on the higher arm after week 8, around mid-September.
- **TB:** ethics deferred to **16 Sept** over consent queries.
- **GFI:** cost model delivered. The board meets in September.

**8. Key open threads**
1. Checkpoint 5 (~8 Sept) and the 5% mix at 30 Sept.
2. AISI code transfer; trimmed appendix.
3. Q3 release decision.
4. GPT-7.5 and DoD access.
5. V8-Lite misuse.
6. KYC comments.
7. TB 16 Sept; GFI board; DNDi DSMB.
8. 8.3% unemployment, the CGT and the Lansing pilot.
</world_state>

<scorecard>
**Milestones**
- **AI agents ~90% of AI R&D:** Advancing.
- **Frontier models withheld; governments engaged:** Holding, slight strain. AISI's report is a plus. The DoD has not answered on access.
- **First incidents; polarised politics:** Achieved (negative). Unemployment at 8.3%.
- **Robust alignment:** Early, slight advance. The first applied correction ((b)) is in and the monitor miss rate fell to 4.8%. The gap is unread until September.
- **"Most capable is most aligned":** Precursor, slight advance. AISI now publicly benchmarks disclosure; rivals refuse.
- **Robust AI policies:** Early, slight advance. The KYC NPRM is published.
- **International pacing:** Early, flat.
- **AI-driven cures:** Early, flat. TB slipped again; DNDi is clean.
- **Lab-grown meat:** Precursor, flat. The cost model is delivered.
- **Broad benefit / no underclass:** Early, flat.
- **Benevolent successor lineage:** Precursor, slight advance. The integrity arm is now standing.
- **Secure compute governance:** Early, slight advance. MCP 2.4.1 shipped, endpoints are at ~617 and the ISACs are onboarded.

**Summary metrics**
- **Overall DU progress: 40 / 100 (+1).** The applied correction, partial toolkit release and monitor gain outweigh the TB slip and the deferred mix.
- **Catastrophe risk: Elevated, flat.** Monitor and endpoint gains are offset by V8-Lite at ~5.45 and GPT-7.5 at ~45% with no checkpoint access.
- **Public trust in AI: 3 / 100 (flat).** Unemployment at 8.3%.
- **Public trust in Anthropic: 41 / 100 (+1).** AISI's praise and the self-disclosure essay; the "held by counsel" critique limits the gain.
</scorecard>

<setup_fix>
none
</setup_fix>
