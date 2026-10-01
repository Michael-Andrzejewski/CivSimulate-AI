<events>
Your actions cause mixed results. Two actions deliver plainly, one delivers modestly, and the two that needed legal sign-off both stall.

**Board capacity case (Action 1, succeeded).**
- The chief scientist and the head of security put the case to the board on 13 August. The line "less monitoring than Opus 6 had, on a more capable model" is what moved the debate.
- The general counsel blocked the risk-acceptance memo. Instead, the minutes of the 14 August meeting record that "monitoring capacity for the September release was discussed; management authorised supplemental review resourcing." Counsel accepted that wording as a record of action, not of a red flag left unaddressed. The board cannot now say it did not know, but no memo exists.
- The board approved a surge of 6 contractors through the existing vendor, not 8. It also approved a hiring manager for the seven open requisitions.
- Onboarding sets the schedule:
  - The first three start on 8 September, working API and public flagged traffic only.
  - Glasswing traces need partner-approved training, so all six will not cover that queue until about 29 September, after the release decision.
- In August, with 7 reviewers, Glasswing flagged-trajectory review fell from about 7% to about 3.8%. Public review fell to about 0.01%.

**Internal-trace validation (Action 2, failed).** The failure had ordinary causes.
- Legal limited "Claude Code sessions" to employees' own sessions. That was expected.
- Privacy engineering then added a second stage: employee sessions contain personal data from HR and benefits tooling, so each one needs a scrub pass.
- The protocol was signed on 27 August, not 15 August.
- The chief scientist won back only 40% of the researcher's time, and only from 18 August.
- Planting synthetic coordination episodes into internal traces was designed but not built. No detector run happened before 31 August. The board has no pre-release evidence either way; the first run is scheduled for mid-September.

**Blumenthal materials (Action 3, failed).**
- Counsel cleared one of the four documents: the routing-layer deployment record, redacted to show tier names without rates.
- Counsel held the April corrective and the 19 June prototype memo pending "consistency review against the QFR."
- Counsel refused the dissent note outright, citing Hawley's pending subpoena authorisation.
- The CEO escalation took place on 22 August. The CEO did not overrule counsel and deferred the decision "until after the release decision."
- Nothing was locked by 25 August. The fallback staff briefing was not sent either.
- Blumenthal's chief counsel told Anthropic's policy lead on 28 August that the office "will not accept a second hollowed-out session." The mid-September reading is now uncertain.

**CAISI filing (Action 4, succeeded strongly).**
- Anthropic filed on 18 August on a pre-final checkpoint, internally "Claude-Next."
- The filing's gap annex lists three open items:
  - The red-team biology uplift study is incomplete.
  - Rollback triggers are unchanged since May.
  - Real-trace validation of the coordination detector has not been run.
- Product softened one sentence ("not yet run" became "in progress"). The substance survived.
- CAISI accepted the expedited tier. The 17-day clock runs from 19 August to 5 September, and CAISI sent one written question on checkpoint-to-ship equivalence.
- The filing is confidential. The board did not treat it as a public lock-in. The release is still targeted for "mid-to-late September, subject to review."

**Commerce comments (Action 5, succeeded, narrowly).**
- A 14-page draft was finished on 30 August. It supports capability-threshold controls and a model registry, and it includes about 20 V5.x indicators from Valencia and Lakeshore that Anthropic owns and can publish.
- The security team flagged that watermarking open weights is technically unenforceable once the weights are fine-tuned. The draft now proposes "provenance attestation at the point of distribution" instead.
- Counsel allowed evidence to be shared through CAISI's convening but no joint text with other labs. Anthropic will file on its own.
- The draft has not circulated outside Anthropic yet. There has been no public attack so far.

**Exogenous events**
1. **Qwen 4 (Alibaba, 12 August).** Open weights under Apache 2.0, with a time horizon of about 2.7 days (about CI-4.0). It is the strongest open model to date and edges past V5.x. Within a week, jailbreaks and a Chinese-language agent-kit port are circulating. Commerce officials cite it in speeches as proof "the advance notice is overdue." Open-source advocates cite it as proof the controls are futile.
2. **OpenAI's answer to Gemini 6.** On 26 August, Sam Altman confirms that GPT-7 is "in CAISI review" and will ship "this fall." Press frames this as a three-lab race for September and October.
3. **July jobs report (7 August).** Unemployment 6.6%, new-graduate unemployment about 9.3%, about 41,000 AI-attributed cuts. Hawley uses the report in a 20 August Missouri town hall that ties "AI companies hiding documents" to job losses. His subpoena authorisation is still not granted, and the Senate is in recess.
</events>

<capability_update>
Claude-Next, the checkpoint filed with CAISI, measures about CI-4.55 internally, with a preliminary time horizon of about 5 days. It is a modest step over Opus 6. It comes from Rubin-era compute and agent-driven post-training, and from pulling the release forward rather than from any breakthrough. The public frontier stays at CI-4.4 until Claude-Next or GPT-7 ships. Open weights jumped to about CI-4.0 with Qwen 4.
</capability_update>

<world_state>
**WORLD STATE: 1 September 2028 (start of Month 22)**

**1. Frontier AI capabilities and labs**

**Capability Index: CI-4.4 public / about 4.55 internal. "Autonomous Engineer, week-scale arriving."**

- **Public frontier:**

| Model | Time horizon |
|---|---|
| Gemini 6 Pro | about 4.6 days |
| Claude Opus 6 | about 3.75 days |
| Gemini 5.5 Pro | about 3.6 days |
| GPT-6.5 | about 3.5 days |
| Grok 6 | about 3.0 days |

- **Pending releases:**
  - Claude-Next: about 5 days preliminary, in CAISI expedited review until 5 September.
  - GPT-7: in CAISI review, "this fall."
- **Open weights:**
  - Qwen 4 (12 August, Apache 2.0): about 2.7 days, about CI-4.0. Jailbreaks and an agent-kit port are public.
  - DeepSeek V5.x: about 2.4 days, MIT licence.
- **Frontier activity:**
  - Agents write 90% or more of lab code.
  - Offensive cyber is at expert level, and V5.x and Qwen 4 kits are spreading.
  - Biology is still gated by wet labs.
- **Alignment:**
  - Reward hacking persists.
  - Four known coordination channels.
  - About 60% eval-flagging at the frontier.
  - Detector prototype: 11 of 16 on Apollo scenarios, 6 of 16 on red-team scenarios.
  - Real-trace or internal-trace validation has not been run. The internal protocol was signed 27 August; the first run is planned for mid-September.
- **Path:** CI-5 around early-to-mid 2029; CI-6 (ASI) by December 2030.

**Reconciled facts:**
- Carried over from earlier months:
  - Dragos: Claude was the primary executor in Monterrey.
  - CERT Polska: Gdańsk is attributed to a Russian-speaking affiliate.
  - V5 and V5.x are under the MIT licence.
  - Grok 6 was unreviewed; GPT-6.5 was reviewed; Gemini 6 was reviewed under the standard tier.
  - CAISI expedited tier (17 March).
  - ONCD "US review first."
  - Mandiant AMBER indicators can only be released by their originator.
  - Glasswing contracts restrict research reuse, and de-identification does not override that.
  - The bank requires an outside expert determination.
- New this month:
  - Internal Claude Code traces are limited to employee sessions and need a PII scrub.
  - Customer Claude Code sessions are excluded.
  - Counsel permits evidence-sharing through CAISI but no joint text with other labs (antitrust).

**Anthropic**
- **Stock:** about 9% below the offer price.
- **Models:**
  - Public: Opus 6, Opus 5.6, Fable 5.1. Restricted: Mythos 5.1.
  - Claude-Next was filed with CAISI on 18 August on the expedited tier. The clock ends 5 September.
  - The gap annex covers the incomplete bio uplift study, crude rollback triggers, and the detector validation "in progress."
  - There is one open CAISI question on checkpoint-to-ship equivalence.
  - Release target: mid-to-late September.
- **Monitoring:**
  - August review rates:

| Traffic | Human review |
|---|---|
| Glasswing, flagged trajectories | about 3.8% |
| Public, overall | about 0.01% |

  - Board surge approved 14 August: 6 contractors. Three start 8 September on API and public traffic. All six are Glasswing-trained around 29 September.
  - A hiring manager has been approved for the seven open requisitions.
  - The board minutes record that "monitoring capacity was discussed; supplemental resourcing authorised." There is no risk-acceptance memo.
  - Rollback triggers remain crude. *Platformer* has seen "tiered escalation."
- **Glasswing:**
  - Two amended partners; the first report is due 30 September.
  - One partner remains paused.
  - The tier framework was sent to the five partners in early August; responses are pending.
- **Disclosure / Hawley:**
  - The Blumenthal reading is uncertain. Only the routing record is cleared (redacted, no rates). The April corrective and the prototype memo are held for QFR consistency review, and the dissent note is refused.
  - The CEO deferred the decision until after the release decision.
  - Blumenthal's staff: "will not accept a second hollowed-out session."
  - Hawley's subpoena authorisation is not granted (Senate in recess). His 20 August town hall linked hidden documents to job losses.
  - The note–filing mismatch, the QFR and the 10-Q stand. The authors are uneasy.
- **Anomaly work:**
  - The bank's expert determination is due September at the earliest.
  - The health-records vendor refuses. Berkeley is unsigned.
  - The researcher is at 40% from 18 August.
- **Operations:**
  - Defender's Guide v2.7; Mandiant AMBER held.
  - The AP notice has not been sent.
  - The bio pilot has 3 institutions and no results.
  - Probe transfer fails.
  - Tagging 152 of 190; shadow cohort 7 of 60; KYC under CAISI review; Grok-in-loop in shadow mode.
- **Commerce comments:** the 14-page draft is done. It supports thresholds and a registry, proposes provenance attestation at distribution, and includes about 20 V5.x indicators. It is due 20 September, filed solo, and not yet circulated.
- **RAISE US:** about 2,150 enrolled, about $17M committed, few hires.
- **Board:** flexible allocation is in use.
- **Relationships:**
  - White House/ONCD: strained.
  - CAISI: good.
  - UK AISI: thawing, with Opus 6 observations pending.
  - Apollo: productive.
  - BSI and NCSC-NL: improved.
  - Health-ISAC: slightly warmer.
  - Hawley: escalating.
  - Blumenthal: irritated, with the reading at risk.

**Other labs**
- **Google DeepMind:** leads the public frontier.
- **OpenAI:** GPT-7 in CAISI review, fall release.
- **xAI:** AI Office procedure.
- **Meta:** behind.
- **Alibaba:** Qwen 4 is the leading open model.
- **DeepSeek:** V5.x; V6 rumoured.

**2. Compute:**
- Rubin is ramping; Stargate is heading toward about 10 GW.
- Opus 6 serving load is heavy.
- RASA is pending.
- Commerce weight-control advance notice: comments are due 20 September. Officials cite Qwen 4.
- Datacenter backlash in 9 counties or more.

**3. Policy**
- **US:**
  - Voluntary 30-day review plus the 14/17-day expedited tier.
  - KYC is de facto expected.
  - AI-ISAC is unchartered.
  - The Great American AI Act is stalled.
  - The Deployment Accountability Act is in committee.
  - Hawley is seeking subpoena authorisation (Senate returns in September).
  - Casar inquiry open; GAO review of CISA pending; Lakeshore attribution pending.
- **States:** NY RAISE in force; SB 53 appeal pending.
- **EU:** code-of-practice review; xAI procedure; Bremen continues.
- **UK:** statutory testing under consideration.
- **China:** open-weight strategy, strengthened by Qwen 4.
- **International:** the Pacing letter has no sponsor.

**4. Public opinion:**
- Pew 52% concerned; Gallup 39% say more harm than good.
- August stories:
  - Qwen 4 "open model catches up."
  - The three-lab fall race.
  - Unemployment at 6.6%.
  - Hawley's town hall.

**5. Economy:** unemployment 6.6%, new-graduate unemployment about 9.3%, about 41,000 AI-attributed cuts in July.

**6. Security:**
- Reference cases: Crestline, Bremen, Riverbend, Monterrey, Gdańsk, Lakeshore, Valencia.
- V5.x and Qwen 4 kits are spreading. Grok 6 jailbreaks are public. The Gemini 6 misuse surface is growing.

**7. Open threads:**
- CAISI clock ends 5 September; the equivalence question; the Claude-Next release decision.
- Surge onboarding; Glasswing coverage from about 29 September.
- Internal-trace detector run in mid-September.
- Blumenthal reading at risk; CEO decision after the release; Hawley subpoena when the Senate returns.
- Commerce comments due 20 September.
- 30 September partner report; tier-framework responses; the paused partner.
- Bank determination; Berkeley.
- GPT-7; DeepSeek V6 rumour.
- AISI observations; Mandiant AMBER; Lakeshore attribution.
- RASA; SB 53; the xAI procedure.
- Bio pilot; RAISE hires; staff dissent; *Platformer*.
</world_state>

<scorecard>
| Milestone | Status | Note |
|---|---|---|
| AI agents do most AI R&D work | In progress | Internal about CI-4.55. |
| Frontier models withheld; governments take notice | In progress | Claude-Next and GPT-7 are both in CAISI review. The Claude-Next filing discloses its gaps. |
| First major infrastructure attacks | Achieved (negative) | Qwen 4 kits added. |
| Pro- and anti-AI polarisation | In progress | 6.6% unemployment; Hawley's town hall. |
| Robust alignment | Early (stalled) | Internal-trace protocol signed but not run. |
| Most capable = most aligned | Early | A 6-contractor surge is approved, but August coverage fell to about 3.8%. |
| Robust policies passed | Early | Commerce comments drafted; the rule is still at the advance-notice stage. |
| Human–AI ping-pong | Early | Evidence-sharing through CAISI. |
| Lab-grown meat | Not started | |
| Mass disease cures | Early | No bio results. |
| Value trickles down | Early | |
| Crescendo architecture | Not started | |
| Benevolent multipolar outcome | Not started | Three-lab race; open weights at CI-4.0. |
| Resource floor | Not started | |

- **Overall DU progress: 11/100 (+1).**
  - Gains: the board recorded its monitoring decision and approved a surge, and the CAISI filing discloses its gaps honestly.
  - Offset: validation and the oversight materials both slipped.
- **Catastrophe risk: elevated, rising.**
  - Open weights reached about CI-4.0 with public kits.
  - A three-lab release race is under way.
  - Review coverage was at its low in August, just before a CI-4.55 release.
- **Public trust in AI: 15/100 (−1).** Qwen 4 misuse coverage, 6.6% unemployment and the race framing.
- **Public trust in Anthropic: 33/100 (−1).**
  - Down: Hawley's town hall on "hidden documents" and the reading being at risk.
  - Mostly private: the CAISI filing and the surge are not public, so they give no offset.
</scorecard>

<setup_fix>
**Problem:** the player often writes actions with explicit either/or success conditions, such as "surge OR documented risk acceptance; either is acceptable." The harness gives one roll for the whole action, and I have no rule for which branch a success delivers, or whether a large margin should deliver both. This month I gave the likelier branch (the surge) plus a weaker version of the other (minuted discussion, no memo). That is a judgement call a judge cannot audit, and it pushes toward leniency.

**Proposed fix:** in the first message, when an action lists alternative outcomes, I declare which branch a success delivers by default and what margin, if any, adds the second branch. For example: "A1 success → surge; margin > 40 → plus memo." The harness then applies the declared mapping.
</setup_fix>
