<rolls>
Action 1 [Trust transfer letter]: P(failure) 30%. Roll 75. Outcome: SUCCESS (75 ≥ 30). Prerequisites: diligence must close and a gift agreement must be executed before any money moves. The Trust controls both. Execution succeeds (leadership approves the letter, and the no-governance commitment is made in writing), but Threat 1 caps the result: no dollars move in March.

Action 2 [Michigan resubmission]: P(failure) 25%. Roll 54. Outcome: SUCCESS (54 ≥ 25). Prerequisites: DTMB's own review time. Verification cannot finish within the month, so the best achievable result is "accepted as complete."

Action 3 [Qwen 5 defence, callbacks, FS-ISAC, Rule 224]: P(failure) 35%. Roll 16. Outcome: FAILURE, mostly (16 < 35). Detectors pre-built from base weights do not generalise to the fork's modified decoder. Patch time slips well past 72 hours. One committed credit union slips to April, and the petitioner rejects the narrowing.

Action 4 [Bio steady-state]: P(failure) 10%. Roll 02. Outcome: FAILURE (02 < 10). Routine, but the dashboard depends on Redwood's counting. A dedup audit finds double-counted sessions, the true fill is below the threshold, and the slip rule fires.

Action 5 [Policy/science close-out]: P(failure) 20%. Roll 81. Outcome: SUCCESS (81 ≥ 20). No prerequisites are missing.
</rolls>

<threat_rolls>
Threat 1 [Trust closes with conditions]: P(materialises) 40%. Roll 18. MATERIALISES (18 < 40). I set it slightly below the adversary's 45% because the Trust already scheduled a March close. The Trust's refusal of an interim grant and the gift's size support a high figure. The revision does not flip the outcome. Effect: diligence closes Mar 24. The gift needs a board-approved gift agreement, with a vote on Apr 21. Trust counsel asks Anthropic not to publish a transfer date. The federation calls the input process "a comment box." March ends with zero dollars.

Threat 2 [Full class suit]: P(materialises) 25%. Roll 86. DOES NOT (86 ≥ 25). This is below the adversary's 35% because Illinois practice means a hearing on the pending petition must come before plaintiffs abandon it, which rarely happens within 5 weeks of filing. The revision does not flip the outcome. Trace: the petitioner signals it "reserves all claims."

Threat 3 [Fork beats the callback]: P(materialises) 18%. Roll 35. DOES NOT (35 ≥ 18). This is below the adversary's 25% because it needs three things at once: a fork in March (likely), plus a call-forward or SIM-swap operation, plus a target at a callback institution. That compound path is rarer than generic voice fraud. The revision does not flip the outcome. Trace: one attempt at a callback institution is stopped when the callback number fails a carrier-port check.

Threat 5 [Hard-cap backlash / CAISI stall]: rolled as two sub-events. (a) "Pull up the ladder" framing gets real traction: 25%. (b) CAISI issues a public delay notice in March: 30%. Combined: 1 − 0.75 × 0.70 ≈ 48%. That is higher than the adversary's 35% once combined correctly. Roll 88. DOES NOT. Trace: one France Digitale post and one xAI reply, with little pickup.
</threat_rolls>

<events>
Your actions cause a March in which Michigan finally turns, while the first dollars, the bio checkpoint and the Qwen 5 fork cycle all slip for different reasons.

**Labour.** Leadership approves the Trust letter on Mar 4, with Anthropic's written renunciation of any governance role. Diligence closes **Mar 24**, but the Trust's board approves the gift "subject to an executed gift agreement." The agreement covers naming, public description and a counsel sign-off, and the vote is set for **Apr 21**. Trust counsel asks Anthropic not to publish a transfer date, calling it "donor timing of our process." Anthropic complies. With the Trust's consent, it publishes only that the slip rule fired: "gift agreement pending Trust board vote, Apr 21." The federation receives the factual sequence note. It replies that the Trust's public input process is "a comment box, not seats." Crain's writes "Month three, still zero dollars — but now it's the Trust's clock." The arbitrator's review of the 11 items continues.

**Michigan.** The resubmission goes in on Mar 12 and is published the same day. It includes a full subprocessor map confirming the SDK is absent, and a named deletion attestor (a Detroit audit firm with no prior Anthropic work) with its engagement letter. DTMB accepts it as complete on **Mar 20** and opens a 45-day verification window. DTMB also approves a second auditor from its list, with an **Apr 14** slot, and keeps May as the fallback. Bridge Michigan headlines: "Anthropic's pilot fixes accepted for review." There is no "auditor shopping" angle.

**Security.** On **Mar 9** a Qwen 5 speech fork appears. It replaces the native decoder with a neural codec. The pre-built variants catch only 38% of red-team samples. The watch flags the fork in 22 hours, and FS-ISAC notices follow 4 hours later. The full detector patch reaches all 46 organisations only on **Mar 16**, after 6.5 days.

There are seven attempted transfers worth about $3.4M.
- Callbacks stop five.
- One attempt at a callback bank is stopped when the callback number fails a carrier port-out check.
- One **~$410k** transfer clears at the remaining holdout credit union. That credit union declines the threshold review, saying it will "revisit in Q2."

Of the two credit unions committed for March, one adopts the callback rule. The other slips to April pending a board vote. Coverage is now **44 of 46**.

February's recovery finalises at 71%. Hawley's staff request the March loss data, and Anthropic sends identical packages to both parties' staff. FS-ISAC receives the technical annex. Google's team comments on it, and OpenAI stays silent.

On Rule 224, the petitioner rejects the protective-order offer and moves to compel full per-event miss data, saying it "reserves all claims." A hearing is set for **Apr 16**.

**Bio.** Before publishing the checkpoint, Redwood's dedup audit finds 61 sessions double-counted across two sites. True fill on Mar 15 is **44%**, below the 45% threshold. The pre-filed slip rule fires verbatim, and the dashboard moves completion to **mid-May**. STAT writes "Anthropic's own slip rule catches its own miscount." Lawfare calls it "embarrassing, then correct." The auto-revert rule for RAND's Q2 reading is filed with the RSO. RAND's 40 held-out items are accepted as-is. Clinical stays at 50%, and consumer thresholds do not change.

**Policy and science.** Incident tool v1.1 ships on **Mar 19**, with a changelog crediting Hugging Face. Hugging Face says it "addresses most of our list." The EU reply accepting the hard cap is filed on Mar 11. AlgorithmWatch welcomes it, and one France Digitale post objects, with little uptake. CAISI's RFI closes on Mar 29 with 212 comments, and Anthropic makes no new filing. The CARB-X weekend test passes, with a maximum response of 19 hours, and the 31-hour miss is published. Kroll cycle 2 and ARIA logging continue, and CHS reaches about 780 hours.

**Exogenous.**
- **Mar 6, jobs report.** Unemployment is **7.3%**. Professional services fall 8k.
- **Mar 18, OpenAI.** CAISI clears OpenAI's successor with conditions. The model releases as **GPT-7** in a staged rollout to enterprise and verified users first. A cyber-capability classifier is required, and public access is limited for 60 days. CAISI's statement cites "extended red-teaming of agentic persistence" as the reason for the 9-week review. xAI calls the conditions "the cartel's first product."

**Market.** Shares end about **$721B** (−1.8%), driven by GPT-7, the fork loss and the bio slip.
</events>

<capability_update>
Next month's Claude is modestly more capable, a few percent on agentic and long-horizon tasks. The gain comes from algorithmic refinements and the continuing Akamai ramp. Power limits and the Saline moratorium cap any larger training-compute jump, and GPT-7's release keeps competitive pressure high.
</capability_update>

<world_state>
**WORLD STATE: 1 April 2030**

**Calendar**
- **Apr 14.** Second WCAG auditor slot for Michigan. May is the fallback.
- **Apr 16.** Rule 224 hearing on the motion to compel.
- **Apr 21.** Chicago Community Trust board votes on the gift agreement.
- **Apr.** FS-ISAC governance committee on the cross-lab feed. The technical annex has been supplied.
- **Apr.** Board vote at the credit union whose callback adoption slipped.
- **Q1/Q2.** Redwood/AISI quarterly re-read.
- **Q2.** RAND nursing verification, including 40 held-out items. The auto-revert rule is filed.
- **Q2.** The last callback holdout "revisits."
- **Early May.** DTMB's 45-day verification window closes.
- **Mid-May.** Clinical sample completion, revised from April after the dedup correction.
- **Spring.** BIS response on the cleared CHS reviewer.
- **Summer.** Utah ruling from the Tenth Circuit.
- **July.** Board review of the second tranche.
- **Mid-May.** GPT-7's 60-day conditional window ends.

**1. Frontier AI and labs**
- **Anthropic**
  - Valuation about $721B. The successor rule is in force.
  - The patch is at 100% on all surfaces except clinical, which stays at 50%.
- **Bio**
  - RAND's 3.7% reading governs, and routing is unfrozen.
  - The nursing recalibration is live, internally at +0.4pp. It reverts automatically if RAND's Q2 reading exceeds that by more than its CI.
  - Clinical fill is 44% after correction, and the slip rule has fired.
  - Nursing tier: 58 or more accounts, with two clean audits.
  - CHS: about 780 hours.
- **Security**
  - Signals reach all 46 of 46 organisations, one of them signals-only.
  - Callback rule: 44 of 46.
  - March Qwen 5 fork: the patch took 6.5 days, the pre-built variants caught 38%, and one ~$410k loss occurred at a holdout.
  - February recovery finalised at 71%.
  - Rule 224: the petitioner has rejected the narrowing, a motion to compel is pending, and the litigation hold stands.
- **Labour**
  - Worker fund: $3.5B. The $250M tranche is approved and diligence is closed, but the gift agreement is pending (Apr 21) and no dollars have moved.
  - Anthropic has renounced any governance role in writing.
  - The federation calls the Trust's input process "a comment box" and has not seated members.
  - Michigan: the resubmission is accepted as complete, with verification pending and the pilot still held.
  - Colorado: lost.
  - Arbitrator: reviewing 11 items. The 3 CHS items await BIS.
  - Career mode: about 4.6M users.
- **Other labs**
  - OpenAI: GPT-7 is released with CAISI conditions (staged rollout, cyber classifier, 60-day limit).
  - Google DeepMind: Gemini 5. It is engaged on the FS-ISAC annex.
  - xAI: Grok 6, running the "cartel" posts.
  - DeepSeek: V6 open weights.
  - Alibaba: Qwen 5, whose speech forks are active.

**2. Compute.** Power is binding. Saline's moratorium stands, and the Akamai ramp continues.

**3. Policy**
- **CAISI.** v1 is voluntary. The RFI closed on Mar 29 with 212 comments, and synthesis is pending. Anthropic's in-scope comment is on the record, and the agent-surface module is still ex parte. CAISI remains under budget pressure, and GPT-7's conditional clearance is its first major precedent.
- **EU.** Anthropic's GPAI comment and a reply accepting the hard cap are both filed. AlgorithmWatch is supportive, and France Digitale has objected mildly.
- **Incident tool.** v1.1 has shipped, and Hugging Face says it "addresses most" of its list.
- **Senate.** Hawley–Blumenthal staff are receiving loss data, and Cruz is still blocking a hearing.
- **House.** Banks's caucus is quiet.
- **States.** RAISE, Washington and SB 53 apply, and the Utah ruling is pending.
- **UK.** ARIA is running.

**4. Public opinion**
- **Negative narratives**
  - "Month three, still zero dollars."
  - "Own slip rule catches own miscount."
  - The ~$410k Qwen 5 loss.
  - The motion to compel.
  - Unemployment at 7.3%.
  - GPT-7 anxiety.
- **Positive narratives**
  - Michigan accepted for review.
  - The honest slip-rule firing.
  - Callback coverage at 44 of 46.
  - v1.1 crediting Hugging Face.
  - CARB-X back at 19 hours.

**5. Economy.** Unemployment is 7.3% (+0.1), and professional services fell 8k.

**6. Security.** Defence is layered, and callbacks carried the March cycle. Pre-built detectors generalise poorly to decoder swaps. Call-forward and SIM-swap evasion remain untested at callback institutions. The cross-lab feed goes to FS-ISAC in April.

**7. Science**
- **Alt-protein.** 6 licensees, with nothing new this month.
- **CARB-X.** Maximum response 19 hours, and the fix is verified.
- **Methods paper.** In review, with the abstract public.
- **ARIA.** Logging continues.
- **Kroll.** Cycle 2 is ongoing.

**8. Key open threads**
- The Trust vote on Apr 21.
- The Rule 224 hearing on Apr 16.
- DTMB verification and the WCAG slot on Apr 14.
- The FS-ISAC vote.
- Callback holdouts.
- The clinical sample in mid-May.
- RAND's Q2 reading.
- BIS.
- The CAISI synthesis.
- The EU Code.
- Utah.
- The GPT-7 conditional window.
- Qwen 5 forks.
</world_state>

<scorecard>
**Diversified Utopia milestones**
- **~90% of AI R&D by agents:** in progress. Unchanged.
- **Frontier models withheld; governments take notice:** in progress++. CAISI's conditional clearance of GPT-7 is a real gating precedent.
- **First major AI infrastructure and cyber attacks:** achieved, partly contained. This month is net negative: the patch was slow and one loss occurred, though callbacks held.
- **Pro-AI vs anti-AI polarization:** deepening.
- **AIs built by previous AIs:** early.
- **Robust, verifiable alignment:** early++. Unchanged, and the auto-revert rule is filed.
- **Multi-agent long-horizon training:** early++.
- **Alt-protein business:** in progress+. Unchanged.
- **Robust AI policies:** early++. v1.1 has shipped, the EU reply is filed and GPT-7 was conditioned.
- **Human–AI alignment ping-pong:** early+.
- **Mass disease cures:** early+. The clinical sample has slipped a month.
- **Avoiding a permanent underclass:** at risk. There are still no dollars, although Michigan is moving.

**Summary scores**
- **Overall DU progress: 27/100 (−1).** The bio slip and the security setback outweigh Michigan's progress and CAISI's gating precedent.
- **Catastrophe risk: elevated (unchanged).** GPT-7 is gated. Qwen 5 forks show decoder-swap evasion.
- **Public trust in AI: 9/100 (unchanged).** GPT-7 anxiety and 7.3% unemployment are offset by the visible conditions CAISI placed on GPT-7.
- **Public trust in Anthropic: 23/100 (−1).** "Still zero dollars" (month three), the miscount, the fork loss and the motion to compel pile up, only partly offset by honest slip rules and Michigan's acceptance.
</scorecard>
