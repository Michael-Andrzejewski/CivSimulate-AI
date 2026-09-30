<rolls>
Action 1 [Trust gift readiness]: P(failure) 20%. Roll 93. Outcome: SUCCESS (93 ≥ 20). Prerequisites: diligence closed and board vote scheduled, so execution rests on the Trust. Leadership waivers are low-cost.
Action 2 [Rule 224 concession]: P(failure) 40%. Roll 26. Outcome: FAILURE (26 < 40). Prerequisites: counsel must agree to produce data that partly belongs to FS-ISAC members, and it is unlikely to without their consent.
Action 3 [Codec-agnostic retrain and port-out note]: P(failure) 35%. Roll 96. Outcome: SUCCESS (96 ≥ 35). Prerequisites: open codecs are available and the pipeline exists. Carrier-check integration needs vendor and carrier work, which caps near-term uptake.
Action 4 [Dedup step and Michigan WCAG]: P(failure) 15%. Roll 12. Outcome: FAILURE, mostly (12 < 15). Prerequisites: the auditor slot and DTMB cooperation. Failure comes through execution: the audit is partial, publication is held and the interim release is delayed.
Action 5 [Voluntary CAISI gating pledge]: P(failure) 40%. Roll 53. Outcome: PARTIAL SUCCESS (53 ≥ 40, narrow margin). Prerequisites: leadership approval, which is given with a modification.
</rolls>

<threat_rolls>
Threat 1 [Discovery concession backfires]: P(materialises) 20%. Roll 69. DOES NOT (69 ≥ 20). I set it below the adversary's 35% because Action 2 failed at the counsel stage, so the full offer was never filed and the mechanism mostly cannot occur. Effect: none. Trace: FS-ISAC's counsel sends Anthropic a pre-emptive note reminding it that member data is covered by sharing rules.
Threat 2 [Retrain misses target or over-flags]: P(materialises) 35%. Roll 74. DOES NOT (74 ≥ 35). The literature supports real risk, but in-domain augmentation across several codecs usually helps, so I set it slightly below 40%. Effect: none. Trace: two institutions report a false-positive rate on relay-service calls that is higher than expected but within tolerance, and Anthropic publishes it.
Threat 3 [Trust vote conditioned or tabled]: P(materialises) 30%. Roll 35. DOES NOT (35 ≥ 30). This matches the adversary: the Trust's slow history is offset by diligence being closed and every open item conceded. Effect: none. Trace: two federation members speak during public comment, and one board member asks about Rule 224 and is answered by Trust counsel.
Threat 4 [Gating pledge reads as capture]: P(materialises) 30%. Roll 70. DOES NOT (70 ≥ 30). I set it lower than 40% because the dilution risk already sits in Action 5's P(failure). Effect: none. Trace: xAI posts "cartel member #2" and a Cato fellow grumbles, but neither dominates coverage.
Threat 5 [Callback bypass via number takeover]: P(materialises) 20%. Roll 29. DOES NOT (29 ≥ 20). It needs an April fork plus coordinated SIM-swap crews hitting callback institutions within weeks, so I set it below 25%. Effect: none. Trace: one SIM-swap attempt appears in FS-ISAC chatter and is stopped by a mandatory carrier notification.
</threat_rolls>

<events>
Your actions cause an April in which the first worker-fund dollars finally move and a new fork cycle is contained without loss by callbacks. The discovery fight and the Michigan audit stall on execution.

**Labour: first dollars (A1 success).**
- **Waivers.** Leadership signs all three waivers on Apr 3: no naming, the Trust's own wording, and counsel pre-review.
- **Vote.** On Apr 21 the Chicago Community Trust board approves the gift agreement 11–1.
  - During public comment, two federation members call the input process "a comment box."
  - One trustee asks about the Rule 224 matter. Trust counsel answers that it is "unrelated to gift purpose."
- **Transfer.** The agreement is executed Apr 23. The $250M clears on **Apr 29**. The Trust announces it on Apr 30, and Anthropic confirms in one line.
- **Coverage.** Crain's runs "Month four, the money lands." The federation calls it "a start, not a seat" and says it will engage with the Trust's working group "under protest."
- **Arbitrator.** Review of the 11 items continues.

**Rule 224 (A2 failure).**
- **Counsel's decision.** Counsel declines the full per-event concession. The data includes member-institution transfer records held under FS-ISAC sharing terms, and FS-ISAC's counsel has pointedly reminded Anthropic of that.
- **What Anthropic filed.** Anthropic instead files institution-anonymised per-event data under attorneys'-eyes-only protection.
- **Hearing (Apr 16).**
  - The judge notes that Rule 224 reaches only the identification of responsible parties.
  - The judge orders the parties to meet and confer on whether institution identities fall within the rule.
  - The motion is continued to **May 28**.
- **Coverage.** A Law360 brief runs "Anthropic resists full miss data." The petitioner's counsel tells the Tribune that Anthropic "keeps offering half." The narrative persists.

**Security (A3 success).**
- **Codec-agnostic retrain.** It ships **Apr 17**. Held-out catch on unseen codec swaps is **76%**, against a pre-registered target of 70%. The relay-service false-positive rate is disclosed.
- **Port-out note.** The implementation note goes out through FS-ISAC and the league on Apr 9.
  - Eleven institutions request integration help. Only 3 have live carrier checks by month-end, because carrier data agreements are slow.
- **Callbacks.** The slipped credit union's board adopts callbacks on Apr 15, bringing coverage to **45 of 46**. The Q2 holdout acknowledges the note.
- **Fork cycle (Apr 22).** A DeepSeek V6-based speech fork with a swapped codec appears.
  - The watch flags it in 19 hours. The new detector catches 71% of it unpatched, and the patch lands in **46 hours**.
  - There are five attempts worth ~$2.2M. Callbacks stop four and the detector stops one, for **zero loss**.
- **Recovery.** March finalises at 69%.
- **FS-ISAC.** The governance committee approves a **six-month pilot** of the cross-lab feed, with FS-ISAC hosting and Google participating. OpenAI says it is "reviewing."
- **Senate.** Hawley–Blumenthal staff receive identical April packages.

**Bio and Michigan (A4 mostly fails).**
- **Clinical interim.** The dedup step becomes standing policy. Redwood's audit of new sites runs long, and the Apr 15 interim deduplicated fill is published on **Apr 24**. It shows **71%**, still consistent with mid-May, and a one-line note publishes the delay. Clinical stays at 50%.
- **WCAG audit.** The second auditor's Apr 14 session covers only 7 of 11 flows, because the test-account provisioning was misconfigured on Anthropic's side. The remaining flows move to the May fallback slot.
- **Publication.** DTMB asks that partial findings not be published before its review. Anthropic complies, so the 3-day publication promise breaks, and Anthropic says so publicly.
- **Scrutiny.** Bridge Michigan asks why the auditor changed and why the report is held. State Rep. Kristian Grant sends DTMB a letter asking about auditor selection.
- **Verification window.** DTMB signals it will likely run past early May.

**Policy (A5 partial).**
- **Pledge.** Leadership adopts the pledge on Apr 10, with one change: the limited-access window is "set by CAISI, with Anthropic able to publish its view if it exceeds 90 days."
- **Reactions.**
  - CAISI's director calls it "welcome."
  - xAI's "cartel member #2" post gets modest uptake.
  - Cruz's office does not comment.
  - OpenAI notes that it "went first."
- **CAISI synthesis.** It is not yet published.
- **Science.**
  - CARB-X maximum response is 21 hours.
  - The methods paper receives minor revisions, and publication is not yet accepted.
  - CHS work is at ~820 hours.

**Exogenous.**
- **Apr 3, jobs report.** Unemployment is **7.4%**, and professional services fall 11k.
- **Apr 14, Google.** Google releases Gemini 5 Pro-Agent to enterprises. It went through voluntary CAISI pre-release access, but without conditions.
- **Apr 27, CAISI.** CAISI says GPT-7's 60-day window "remains on schedule," with no incidents attributed to it.

**Market.** Shares end about **$738B** (+2.4%), on the fund transfer, the zero-loss fork cycle and the pledge.
</events>

<capability_update>
Next month's Claude generation is modestly more capable, with about one step of incremental gains from continued algorithmic work and the Akamai compute ramp. Power constraints and the new self-imposed CAISI gating of the next frontier release cap any jump in what is deployed.
</capability_update>

<world_state>
**WORLD STATE: 1 May 2030**

**Calendar**
- **Early–mid May.** The WCAG fallback slot covers the remaining 4 flows.
- **Mid-May.** Clinical sample completion (deduplicated fill 71% on Apr 24).
- **Mid-May.** GPT-7's 60-day conditional window ends.
- **May.** DTMB's verification is likely to slip past its original early-May close.
- **May 28.** The Rule 224 motion to compel is continued to this date, after the meet-and-confer.
- **Q2.** RAND nursing verification, including 40 held-out items, with the auto-revert rule filed.
- **Q2.** The last callback holdout "revisits."
- **Spring.** The BIS response on the cleared CHS reviewer.
- **Summer.** The Tenth Circuit's Utah ruling.
- **July.** Board review of the second tranche, using the 6.5% Radford test.
- **Pending.** The CAISI RFI synthesis.
- **Ongoing.** The six-month FS-ISAC feed pilot.

**1. Frontier AI and labs**
- **Anthropic**
  - Valuation about $738B.
  - Anthropic has publicly pledged its next frontier release to CAISI conditional clearance. CAISI sets the window, and Anthropic may publish its view if the window exceeds 90 days.
  - The patch is at 100% on all surfaces except clinical, which stays at 50%.
- **Bio**
  - RAND's 3.7% reading governs.
  - The nursing recalibration is live (+0.4pp internal), with auto-revert pending RAND's Q2 reading.
  - Redwood's dedup audit is now a standing pre-publication step.
  - The nursing tier has 58 or more accounts and two clean audits.
  - CHS is at about 820 hours.
- **Security**
  - Signals reach all 46 of 46 organisations, one of them signals-only.
  - Callback rule: **45 of 46**.
  - The codec-agnostic detector is live at 76% held-out catch on unseen codecs, with the relay-service false-positive rate disclosed.
  - Port-out and SIM-swap note: 11 institutions have requested integration help and 3 have live carrier checks.
  - April fork (a DeepSeek V6 codec swap): patched in 46 hours with zero loss.
  - March recovery finalised at 69%.
- **Labour**
  - Worker fund: $3.5B.
  - **$250M has transferred to the Chicago Community Trust (cleared Apr 29).** Anthropic has no governance role.
  - The federation is engaging with the Trust's working group "under protest," saying "a start, not a seat."
  - Michigan: the WCAG audit is partial (7 of 11 flows), and publication is held at DTMB's request. Rep. Grant has written to DTMB about auditor selection. The pilot stays held.
  - Arbitrator: reviewing 11 items, with 3 CHS items awaiting BIS.
  - Career mode: about 4.7M users.
- **Other labs**
  - OpenAI: GPT-7 is in its conditional window, with no attributed incidents. OpenAI is "reviewing" the FS-ISAC feed.
  - Google DeepMind: Gemini 5 Pro-Agent is released for enterprise (voluntary CAISI access, no conditions). It is in the FS-ISAC pilot.
  - xAI: Grok 6, posting "cartel" content.
  - DeepSeek: V6 open weights, with speech forks active.
  - Alibaba: Qwen 5, with forks active.

**2. Compute.** Power is binding. Saline's moratorium stands, and the Akamai ramp continues.

**3. Policy**
- **CAISI.** Synthesis is pending. GPT-7 is the conditional precedent, and Anthropic's pledge extends the norm. Budget pressure continues.
- **EU.** Anthropic's filings are on the docket, and the Code revision is in progress.
- **Incident tool.** v1.1 is in use.
- **Senate.** Hawley–Blumenthal staff are receiving loss packages, and Cruz is blocking hearings.
- **States.** RAISE, Washington and SB 53 apply, and the Utah ruling is pending.
- **UK.** ARIA is running.

**4. Public opinion**
- **Negative narratives**
  - "Anthropic keeps offering half" (Rule 224).
  - The Michigan report is held and the auditor change is under scrutiny.
  - Unemployment at 7.4%.
  - xAI's "cartel #2."
- **Positive narratives**
  - "The money lands."
  - Zero loss in the April fork cycle.
  - The 76% codec detector with its target met.
  - The self-binding CAISI pledge.
  - The FS-ISAC feed pilot.

**5. Economy.** Unemployment is 7.4% (+0.1), and professional services fell 11k.

**6. Security.** Defence is layered: codec-agnostic detectors, callbacks at 45 of 46, and a staged pipeline at about 46 hours. Carrier-check integration remains sparse, so SIM-swap and call-forward bypass is still a latent risk. The cross-lab feed pilot is live.

**7. Science**
- **Alt-protein.** Six licensees, with nothing new.
- **CARB-X.** Maximum response 21 hours.
- **Methods paper.** Minor revisions requested.
- **ARIA.** Logging continues.
- **Kroll.** Cycle 2 is ongoing.

**8. Key open threads**
- The Trust's working group and federation relations.
- The Rule 224 hearing on May 28.
- The Michigan WCAG fallback and DTMB verification.
- The clinical sample in mid-May.
- RAND's Q2 reading.
- The end of GPT-7's window.
- BIS.
- The CAISI synthesis.
- The EU Code.
- Utah.
- The July tranche review.
- Fork cadence and SIM-swap exposure.
</world_state>

<scorecard>
**Diversified Utopia milestones**
- **~90% of AI R&D by agents:** in progress. Unchanged.
- **Frontier models withheld; governments take notice:** in progress++. Anthropic now self-binds to CAISI's conditional structure.
- **First major AI infrastructure and cyber attacks:** achieved, partly contained. This month is net positive, with a zero-loss cycle and the codec-agnostic detector.
- **Pro-AI vs anti-AI polarization:** deepening.
- **AIs built by previous AIs:** early.
- **Robust, verifiable alignment:** early++. Unchanged.
- **Multi-agent long-horizon training:** early++. The methods paper is in revision.
- **Alt-protein business:** in progress+. Unchanged.
- **Robust AI policies:** early++. The gating norm is spreading and the FS-ISAC pilot is live.
- **Human–AI alignment ping-pong:** early+.
- **Mass disease cures:** early+. The clinical sample is on track for mid-May.
- **Avoiding a permanent underclass:** at risk, but improving. The first $250M has moved, while unemployment is at 7.4%.

**Summary scores**
- **Overall DU progress: 28/100 (+1).** The first dollars, the gating pledge and the security win outweigh the Michigan and Rule 224 stalls.
- **Catastrophe risk: elevated (unchanged).** Fork defence improved, but SIM-swap exposure remains and frontier capability continues to rise.
- **Public trust in AI: 9/100 (unchanged).** Rising unemployment offsets the gating news.
- **Public trust in Anthropic: 25/100 (+2).** "The money lands," zero loss and the pledge outweigh "keeps offering half" and the held Michigan report.
</scorecard>
