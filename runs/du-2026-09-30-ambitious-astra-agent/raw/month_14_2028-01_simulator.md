<events>
Your actions cause the first completed internal alignment science in four months, the first outside reproduction, and a frontier-lab evaluation commitment. Containment, the worker program and the audit follow-through all slip. Late in the month, Gemini 5 Ultra ships.

**Allocation memo (Threat 5, mild branch).** The written Q1 memo arrives on 6 January. It confirms the 10% research envelope, and for the first time it comes with real bookings: one 9-day block in the shared research pool. It also names an accountable scientist, a senior alignment researcher who reports to the research lead. It adds a clause: "subject to successor and competitive-response needs, at CEO discretion." The research lead's written objection is attached. The clause turns the past pattern of reallocations into policy. On 28 January, after the Ultra launch, the CFO's office cites it to open a "February envelope review."

**Action 1: succession comparison.** December's interleaved checkpoint could not be matched exactly, so both arms are rerun on a Llama-family 8B checkpoint the team had already cleared. The internal result is posted on 23 January. Through one capability update on withheld task families, with randomised cues and blinded human adjudication:
- Unauthorised actions: 3.9% interleaved vs 6.4% concentrated (difference 2.5 points, 95% CI 0.3–4.7).
- Disclosure on novel cues: +4.1 vs +1.2 points (CI crosses zero).
- Task completion: equal within noise.
- Verification cost: about 18% higher for interleaved.

It is a small-model result and one endpoint holds. The February decision: rerun at mid-scale if the envelope survives review.

**Action 2: consent and authority curriculum.** The curriculum is built and runnable, with 14 task families, 5 of them disjoint. One small matched comparison completes. The supplemented arm cuts overreach on held-out "boundary pays off" cases from 11% to 6%. The failure analysis reports two problems:
- Needless deferral rose from 4% to 9%. The model learned "ask first" partly as a style.
- Shutdown-acceptance gains shrank by about half on novel phrasings.

The write-up says plainly that this is not robust alignment. February will target the deferral problem.

**Action 3: outside reproduction and frontier outreach.**
- **Toronto** completes the first independent comparison on Llama 8B. It reproduces the direction of the disclosure gain at a smaller size (+3.2 points, CI 0.4–6.0). It also flags one scoring-harness bug, which is fixed and credited publicly.
- **EleutherAI's 1B run** completes, with effects near floor. They post it as "inconclusive at this scale."
- Stars reach about 4,200.
- **OpenAI's alignment team** agrees to one bounded evaluation session in mid-February on its own model and tasks, with confidential feedback. The automated-researcher team itself does not reply.
- **GDM** replies "after launch."

**Action 4: broker (fails).**
- The nested-delegation fix, rc2, broke the revocation-under-load test and was pulled on 19 January. GA slips.
- Coverage reaches 48% of about 12,400 known installs (up from 43%), well short of 70%.
- Ohio defers its vendor decision to February and asks for GA evidence.
- The insurer has not answered whether GA resets the observation clock.
- No public proof-of-concept has appeared.

**Action 5: worker program (fails).**
- The frozen assembly version, with its source-comparison view, shipped on 13 January, a week late.
- Adjudication covered 250 of 400 outputs by 22 January, with 1 failure so far. The two reviewers were also absorbing 38 complaints. No release decision was made, and the audit continues under the same preregistration.
- No funder committed.
- B ended on 31 January. The 52 households with active cases were handed off with consent to three legal-aid and workforce organisations whose capacity had been verified.
- January outputs were about 870, with abandonment at 31%.

**Action 6: audit follow-through (narrow fail).**
- Bucket-scope remediation shipped. The holiday-latency fix only added a second responder rota; it is not fail-closed.
- The live drill was approved but scheduled for 4 February, too late for the report.
- The evaluator published on 27 January as fixed. Its conclusions were independent and redactions were minimal. It states:
  - remediation is "partial";
  - the drill was "not yet performed";
  - the CEO override was "tabletop only."
- Counsel held the reusable rider for a further review.
- NY OGS received the procurement annex and filed it for its spring solicitation. Colorado OIT said "next cycle."
- Coverage headline (The Information): "Anthropic's auditor: access fixed, kill switch still unproven." Research circles still treat it as credible.

**Exogenous events.**
1. **Gemini 5 Ultra GA (20 January; Threat 4, severe branch).** Google announces enterprise agent sessions of up to 45 days, with demos of an agent running a month-long ML research project. Coverage calls it "AI building AI." Senator Hawley cites it in a floor speech. OpenAI's stock-market analysts expect the March milestone to be brought forward.
2. **Congress passes a CR to 20 March (29 January).** No AI riders are attached.
3. **Moonshot releases Kimi K4 open weights (14 January).** It comes with a native long-horizon agent scaffold. Evaluators put it about 5 weeks behind the closed frontier. Calls to restrict open-weight models on Capitol Hill intensify.
</events>

<capability_update>
Next month's Claude is a modest step up (about +0.1 on the index): post-training refinements to the December successor, with no new pretraining run. Frontier capability moved more than Anthropic's did this month, because Gemini 5 Ultra's month-scale agent sessions reached GA.
</capability_update>

<world_state>
**WORLD STATE: 1 February 2028**
Tags: [M1]–[M14] = December 2026 to January 2028.

**Scheduled calendar**

| Date | Event |
|---|---|
| Early February | CFO "February envelope review" under the competitive-response clause. |
| 4 February | Evaluator-witnessed live suspension drill. |
| Mid-February | OpenAI alignment-team evaluation session. |
| February | Ohio vendor decision (deferred; wants GA evidence). Broker rc2 redo. Rider counsel review. Worker audit completion (250/400). Mid-scale comparison decision. |
| 20 March | CR expires. |
| March 2028 | OpenAI automated-researcher target (possibly earlier). |
| 28 March | Earliest insurer resubmission on rc1 clock (GA effect unanswered). |
| Spring | NY OGS solicitation (annex filed). |
| ~22 June | DoD adversary-model list due. |
| Pending | Gemma licence review. RAISE. *Buist*. Hawley/Cotton. Worker reconsideration and hearing. C's retest. Colorado OIT next cycle. |

**1. Frontier AI capabilities and labs**

**Capability Index: 5.5 of 10, "Frontier agents run month-scale research and engineering workstreams at enterprise GA (Gemini 5 Ultra, 45-day sessions); frontier open weights ~5 weeks behind (Kimi K4)."**
- Path to ASI: L6 around mid-2028, possibly earlier; L8+ in 2029–30.

**Anthropic** is public, and the CEO override is retained.
- **Allocation.** The Q1 memo is written: 10% with bookings, a named accountable scientist, and a competitive-response clause at CEO discretion. The research lead's objection is on file. The February envelope is under review.
- **Alignment.**
  - Succession comparison (8B Llama): interleaved beats concentrated on unauthorised actions (3.9% vs 6.4%, CI 0.3–4.7). Disclosure difference is not significant. Verification cost +18%. Internal only.
  - Consent curriculum: runnable (14 families). Overreach cut from 11% to 6%, but needless deferral up from 4% to 9%. Shutdown gains halve on novel phrasing.
  - Earlier: internal +8 points, decaying; Apollo +2.6 (not significant). Data round at 140 of 600.
- **Reference package.**
  - Toronto independent reproduction: +3.2 points (CI 0.4–6.0). A harness bug was fixed.
  - EleutherAI 1B: inconclusive at that scale.
  - About 4,200 stars.
  - OpenAI's alignment team has committed to a February session. GDM: "after launch."
  - The DeepSeek/Qwen ban stands.
- **Containment.**
  - 48% of about 12,400 known installs protected.
  - rc2 pulled over a revocation-under-load regression. GA has slipped. The nested-delegation export is still broken.
  - A: bounded pilot. B: read-only. Ohio: deferred.
  - No public proof-of-concept.
- **Workers.**
  - The frozen assembly version shipped on 13 January.
  - Audit: 250 of 400 outputs adjudicated, 1 failure. It continues under the preregistration with no restart. No public release yet.
  - B ended on 31 January. All 52 active households were handed off with consent to three verified organisations.
  - No funder. About 870 outputs in January, abandonment 31%. 38 complaints; 2 staff.
- **Evaluator.**
  - Report published on 27 January. Bucket access was fixed. The holiday fix is a rota only, not fail-closed. The drill has not yet been performed. The override was tested by tabletop only.
  - The rider is held by counsel.
- **Science:** fibrosis blocked, alt-protein shelved. **Corvane:** frozen.

**Other labs**
- **GDM:** Gemini 5 Ultra GA on 20 January.
- **OpenAI:** GPT-6.2 agent usage is rising, and an early automated-researcher claim is expected.
- **SpaceXAI:** Grok 5. **Meta:** Muse Spark.
- **China:** Kimi K4 open weights. V5 and Qwen 4 are used in criminal fine-tunes.

**2. Compute:** Stargate is building toward ~10 GW, moratoria are spreading, and the KYC rule is live.

**3. Policy**
- **US:** CR to 20 March. NDAA list due in June. Preemption stalled. Hawley is citing Ultra. Pressure to restrict open weights is rising after Kimi K4. H.R. 9363 is voluntary.
- **Courts:** RAISE and *Buist* are pending.
- **Procurement:** NY OGS filed the annex for spring. Colorado OIT: next cycle.
- **EU:** Omnibus; Article 50. **UK:** AISI flat. **International:** Compact stalled.
- **Insurance:** agentic exclusions.

**4. Public opinion:** Ultra is framed as "AI building AI" and anxiety is high. Research circles credit the Toronto reproduction and the evaluator report. The press is focused on the "kill switch unproven" line.

**5. Economy:** new-graduate unemployment is about 7.1% or higher, back-office cuts continue, and capex is supporting GDP.

**6. Security:** open-weight ransomware continues. The bypass is patched in 48% of known installs, with no public proof-of-concept.

**7. Open threads**
- **Alignment:** survive the envelope review; the mid-scale rerun; fix curriculum deferral; transfer via Llama or Gemma.
- **Publication:** the OpenAI session; GDM after launch; more reproductions.
- **Containment:** rc2 redo → GA; coverage; Ohio; insurer.
- **Workers:** finish the 400-output audit; funding; receiving capacity; the hearing; C's retest.
- **Policy:** the 4 February drill; rider release; NY OGS spring solicitation.
</world_state>

<scorecard>
| Milestone | Status | Note |
|---|---|---|
| AI agents doing most of the work on AI R&D and alignment | In progress (+) | Ultra runs month-scale agents. Anthropic alignment is stuck at 10% with a preemption clause. |
| Most powerful models withheld from the public; governments engaged | Eroding (−) | Ultra GA; Kimi K4 open weights. |
| First AI-enabled infrastructure, cyber and social-media attacks; society survives them | Achieved (negative) | Ongoing ransomware. |
| Polarised pro-AI vs anti-AI politics that does not derail development | In progress | Pressure to restrict open weights. |
| Robust alignment | Early (+) | First completed matched comparison (small model, one endpoint). Curriculum result is mixed. First outside reproduction. |
| AI built from and by previous AIs | Early | Interleaved succession favoured at small scale only. |
| Cultivated or plant-based meat displaces factory farming | Not started | — |
| Robust policies passed; human-AI "alignment ping-pong" | Early (+) | Independent report published; NY annex filed; one frontier evaluation commitment. |
| Major disease cures | Early (−) | — |
| Avoiding a permanent concentration of power or an underclass | Early (−) | No release. Program shrank; handoffs completed. |
| Benevolent, coordinated superintelligence (Crescendo) | Not started | — |
| Resource floor and consent-based diverse utopias | Not started | — |

| Measure | Value | Why |
|---|---|---|
| Overall DU progress | 17 / 100 (+1) | Real but small-scale alignment results and a reproduction. Offset by the codified preemption clause, the broker slip and the worker stall. |
| Catastrophe risk | High (rising) | Month-scale agents at GA, index 5.5, a K4-class open agent scaffold, and coverage at 48%. |
| Public trust in AI | 23 / 100 (−1) | Ultra "AI builds AI" coverage and Kimi K4. |
| Public trust in Anthropic | 44 / 100 (−1) | An honest, independent report, but the "kill switch unproven" headline and the held rider weigh on it. |
</scorecard>

<setup_fix>
**Items marked "fixed" in the calendar have no stated owner or rule for whether a failed player action can move them.**
- **What is wrong:** The evaluator's 27 January publication was marked "fixed," and this month Action 6 failed narrowly. There is no rule saying whether "fixed" means the date is controlled by a third party (so an action failure cannot shift it) or merely scheduled by Anthropic (so it can slip).
- **What it causes:** I had to decide ad hoc. I kept the date and pushed the failure into remediation and the rider instead. A different month could reasonably have slipped the date.
- **Proposed change:** Each calendar entry should carry an owner tag (third party, Anthropic, or government) and a slip rule. Only entries owned by Anthropic, or dependent on Anthropic, should be movable by a failed player action.
</setup_fix>
