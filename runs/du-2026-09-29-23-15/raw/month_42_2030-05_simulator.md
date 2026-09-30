<rolls>
Action 1 [Michigan WCAG fix and defer]: P(failure) 30%. Roll 72. Outcome: SUCCESS (72 ≥ 30). Prerequisites: the provisioning fix is under Anthropic's control and the fallback slot exists. DTMB's verification timing and Rep. Grant's use of the documents are outside Anthropic's control, so they cap how much the outcome can be controlled.

Action 2 [Rule 224 notice-and-consent stipulation]: P(failure) 50%. Roll 72. Outcome: SUCCESS, partial (72 ≥ 50). Prerequisites: FS-ISAC counsel's pre-clearance is needed, and it comes with modifications. The judge sets the final form. The petitioner keeps all its claims.

Action 3 [SIM-swap/call-forward addendum]: P(failure) 35%. Roll 73. Outcome: SUCCESS, partial (73 ≥ 35). Prerequisites: adoption depends on each institution's core-processor and channel capabilities. The carrier API request depends on FS-ISAC's own governance.

Action 4 [Clinical sample under pre-registered rule]: P(failure) 30%. Roll 08. Outcome: FAILURE (08 < 30). Prerequisites: RAND, as dual scorer, has to accept the rule's statistical design. Rolling dedup needs site data agreements that permit weekly transfers.

Action 5 [Quiet gating support, science]: P(failure) 20%. Roll 65. Outcome: SUCCESS (65 ≥ 20). Prerequisites: acceptance of the methods paper is the journal's decision.

Action 6 [July tranche readiness]: P(failure) 20%. Roll 61. Outcome: SUCCESS (61 ≥ 20). Prerequisites: none are missing. This is internal drafting.
</rolls>

<threat_rolls>
Threat 1 [Rule 224 notice backfires]: P(materialises) 45%. Roll 45. DOES NOT (45 ≥ 45). I kept the adversary's figure because FS-ISAC's April warning is real. Trace: the signals-only credit union's counsel sends a letter reserving its right to object, which is a mild signal for June.

Threat 2 [Callback bypass exploited]: P(materialises) 35%. Roll 80. DOES NOT (80 ≥ 35). I kept the figure because the carrier-check gap is real. Trace: the published red-team shows that call forwarding on a long-held number beats the 90-day rule. There is also one call-forward attempt in the May cycle.

Threat 3 [Clinical CI fails / second slip]: P(materialises) 40%. Roll 42. DOES NOT (42 ≥ 40). I kept the figure. This threat covered a CI exceedance and a protocol-deviation slip, and neither happens. Action 4 fails for a different reason, the design dispute described below, so the two are not double-counted.

Threat 4 [Auditor-record "shopping" story]: P(materialises) 40%. Roll 28. MATERIALISES (28 < 40). I kept the figure. Rep. Grant releases part of the record, and DTMB verification slides to June.

Threat 5 [GPT-7 window fight / labour escalation]: I split this into two parts.
- **Extension fight:** P 20%. I lowered it because on Apr 27 CAISI publicly said the window was "on schedule" with no attributed incidents, so a late reversal is less likely. Roll 34. DOES NOT (34 ≥ 20). GPT-7 instead gets a full public release, which is the adversary's alternative branch.
- **Labour escalation:** P 45%. This is slightly under 50% because the federation has already committed to engage, but it is still high because unemployment has risen for three months. Roll 34. MATERIALISES (34 < 45). The federation stages a walkout.
</threat_rolls>

<events>
Your actions cause a May in which the discovery fight finally de-escalates and the security perimeter widens. The clinical decision stalls over a statistics dispute you pre-committed to. The Michigan audit completes, but the paperwork comes back to bite.

**Michigan**
- **Audit.** Test accounts are provisioned on May 1. The auditor's May 5 dry-run signs off on all four flows. The May 8 fallback session completes all 11. Three of the four new flows pass. The step-up authentication flow fails WCAG 2.2 criterion 3.3.8 (accessible authentication) because of a CAPTCHA fallback, and Anthropic sets remediation for June 15.
- **Ownership note.** It runs on May 2. Bridge Michigan quotes it straight.
- **Records release.** On May 13 Rep. Grant requests the auditor-selection record. Anthropic supplies all of it. On May 20 Grant releases three emails, including Anthropic's March request for "an approved auditor with an earlier slot," and says "the public deserves to know why a company picks its own grader." Bridge headlines: "Anthropic sought faster auditor, records show." The conflict-check memo, which Grant also released, draws little coverage.
- **Verification.** DTMB tells Anthropic that verification will close "in June at the earliest." The report stays held under Anthropic's DTMB-clearance commitment, which is intact. The pilot stays held.

**Rule 224**
- **Pre-clearance.** FS-ISAC counsel pre-clears the stipulation on May 15 with one change: the court, not FS-ISAC, sends the notices, which keeps FS-ISAC out of the disclosure chain.
- **Hearing.** The parties file on May 22. On May 28 Judge Moreland enters a modified order: court-issued notice, 14 days to object, and objections heard by the judge directly (no special master). Institutions that do not object are disclosed attorneys'-eyes-only in mid-June.
- **Reactions.** The signals-only credit union's counsel reserves the right to object. Law360 runs "Anthropic, petitioner agree on notice process." The petitioner's counsel says identities will "tell us who to sue." The "keeps offering half" line largely disappears.

**Security**
- **Addendum.** It goes out May 7. By month-end, 24 of 45 callback institutions have adopted the 90-day number-on-file rule. Only 9 have a working second-channel prompt, because most small credit unions lack an in-app channel, and 14 run the 24-hour hold.
- **Red-team results.** The results are published as promised. The rule catches 94% of SIM-swap scenarios with a recent number change, but only **31% of call-forward-on-existing-number** scenarios. The paper says plainly that a carrier API is the only full fix.
- **Carrier API request.** FS-ISAC holds the request for its June board.
- **Fork cycle (May 18).** A Qwen 5.1 speech fork is flagged in 21 hours, with a patch in 52 hours. It is slower than April because the monthly retrain collided with the patch build. Four attempts totalling about $1.6M are all stopped. One of them used call forwarding at a credit union and was stopped by a branch-verified prompt the credit union had turned on that week. The streak holds, narrowly.
- **Other.** OpenAI asks FS-ISAC two technical questions about the feed and does not join. Hawley–Blumenthal staff receive identical packages.

**Bio (failure)**
- **Rule dispute.** Anthropic publishes the decision rule on May 6. On May 9 RAND's scorer team writes that comparing the sample's upper CI bound against RAND's 3.7% point estimate ignores RAND's own uncertainty. It asks for a pre-specified non-inferiority margin instead.
- **Data agreements.** Separately, two hospital sites' data-use agreements permit only end-of-study transfer, so rolling dedup covers just 5 of 7 sites.
- **Completion.** Fill completes May 19. The RSO judges that deciding under a rule the co-scorer has disputed would be worse than delaying. On May 23 it adopts RAND's margin design, with a public changelog, and the decision moves to June.
- **Coverage.** STAT runs "Anthropic rewrites clinical test days before results." Lawfare calls the change "methodologically right, sequencing wrong." Clinical stays at 50%.

**Policy and science**
- **Methods paper.** Revisions are returned May 12 and accepted May 28. Open access is scheduled.
- **Other.** CARB-X maximum response is 20 hours. The pre-release package is ready and has not been sent, and no silence is broken.
- **Labour.** The second-tranche draft is ready. The Trust makes no request for data.

**Exogenous**
- **May 8, jobs report.** Unemployment is **7.5%**, and professional services fall 9k.
- **May 14, walkout.** At the Trust working group's first meeting, eight federation delegates walk out, reading a statement: "$250M for a comment box while 7.5% are out of work." The Tribune and Crain's cover it.
- **May 18, GPT-7.** The window ends without extension, and GPT-7 goes to general release.
- **May 20, capture critiques.**
  - Treasury Secretary Bessent tells CNBC that voluntary gating "risks becoming a moat the incumbents build with government bricks."
  - VP Vance posts that the pledges are "a Trojan horse for licensing."
  - On May 27, 31 smaller labs, open-weight developers and investors (Mistral, Nous, several a16z portfolio firms, with xAI co-signing) send CAISI a letter demanding that conditional clearance never apply to open-weight releases. CAISI acknowledges receipt.

**Market.** Shares end about **$719B** (−2.6%), on GPT-7's general release, the capture critiques and the clinical slip.
</events>

<capability_update>
The next Claude generation is modestly more capable, perhaps 4–6% on internal agentic and research evaluations. The gains come from continued algorithmic work and the Akamai compute ramp. Growth stays power-constrained, and Anthropic's pledge to CAISI gating limits how fast any gain can reach public release.
</capability_update>

<world_state>
**WORLD STATE: 1 June 2030**

**Calendar**
- **Early June.** Court notice objection period closes (~Jun 11). AEO disclosure follows for institutions that do not object.
- **June.** Clinical decision under RAND's non-inferiority margin. End-of-study transfer from the 2 remaining sites is due.
- **June.** DTMB verification ("at the earliest").
- **Jun 15.** Remediation target for the step-up authentication flow (WCAG 3.3.8).
- **June.** FS-ISAC board considers the carrier port-out API request.
- **Q2.** RAND nursing verification, including 40 held-out items, under the auto-revert rule.
- **Q2.** Last callback holdout revisits.
- **Spring, overdue.** BIS response on the CHS items.
- **Summer.** Tenth Circuit Utah ruling.
- **July.** Board review of the second tranche (6.5% Radford test). The draft agreement is ready.
- **Pending.** CAISI RFI synthesis. CAISI's response to the open-weight letter.
- **Ongoing.** FS-ISAC feed pilot (month 2 of 6).
- **Soon.** Methods paper publication (open access).

**1. Frontier AI and labs**
- **Anthropic**
  - Valuation about $719B.
  - CAISI pledge stands. The next-release package is ready and has not been sent.
  - Patch is at 100% on all surfaces except clinical, which stays at 50%.
- **Bio**
  - RAND's 3.7% reading governs.
  - Clinical sample is complete (fill done May 19). Dedup covers 5 of 7 sites.
  - The decision rule was revised to RAND's non-inferiority margin, and the changelog is public.
  - Nursing recalibration (+0.4pp) awaits RAND Q2, with auto-revert.
  - CHS is at about 850 hours.
- **Security**
  - 45 of 46 organisations have callback rules. One is signals-only.
  - Addendum adoption: 24 institutions use the 90-day rule, 14 the 24-hour hold, and 9 a second-channel prompt.
  - Live carrier checks: 3.
  - Red-team: call forwarding on an existing number is caught only 31% of the time. This is a known and published gap.
  - Codec-agnostic detector is retrained monthly.
  - May fork (Qwen 5.1): patched in 52 hours, zero loss, with a call-forward near-miss.
- **Labour**
  - Fund stands at $3.5B, with $250M at the Trust.
  - The federation walked out of the working group on May 14.
  - Michigan: all 11 flows are audited. 10 pass and step-up authentication fails. The report is held pending DTMB. Grant has released the auditor emails. The pilot is held.
  - Arbitrator: 11 items, 3 of them awaiting BIS.
  - Career mode: about 4.8M users.
- **Other labs**
  - OpenAI: GPT-7 is in general release. OpenAI has asked FS-ISAC questions but has not joined the feed.
  - Google: Gemini 5 Pro-Agent is released. Google is in the feed pilot.
  - xAI: co-signed the open-weight letter and continues its "cartel" posts.
  - DeepSeek V6 and Qwen 5.1 forks are active.

**2. Compute.** Power is binding. Saline's moratorium stands, and the Akamai ramp continues.

**3. Policy**
- **CAISI.** GPT-7 has completed a full conditional cycle, which sets a precedent. Critics include Bessent ("moat") and Vance ("Trojan horse"). A 31-signatory open-weight coalition is demanding an exemption. Budget pressure continues.
- **EU.** Code revision is in progress, and Anthropic's filings are on the docket.
- **Incident tool.** v1.1.
- **Senate.** Hawley–Blumenthal staff receive the packages, and Cruz is blocking hearings.
- **States.** RAISE, Washington and SB 53 apply. The Utah ruling is pending.
- **Michigan.** Rep. Grant is scrutinising auditor selection.
- **Rule 224.** A modified notice order was entered May 28.

**4. Public opinion**
- **Negative narratives**
  - "Rewrites clinical test before results."
  - "Sought faster auditor."
  - "$250M for a comment box" (walkout).
  - "Incumbent moat" (Bessent and Vance).
  - Unemployment at 7.5%.
- **Positive narratives**
  - Notice agreement in Rule 224.
  - Zero-loss streak (third cycle).
  - Honest red-team disclosure.
  - Methods paper accepted.

**5. Economy.** Unemployment is 7.5% (+0.1). Professional services fell 9k.

**6. Security.** Layered defence is in place. The call-forward gap is real and published. The fork pipeline has slipped to about 52 hours.

**7. Science**
- **Alt-protein.** Six licensees, with nothing new.
- **CARB-X.** Maximum response 20 hours.
- **Methods paper.** Accepted.
- **Other.** ARIA and Kroll cycle 2 continue.

**8. Key open threads**
- Clinical decision in June.
- Rule 224 objections and AEO disclosure. Possible suits against institutions.
- DTMB verification and the authentication-flow fix.
- Grant.
- The federation walkout.
- July tranche.
- RAND Q2.
- The carrier API.
- The call-forward gap.
- The capture critique and the open-weight coalition.
- BIS.
- CAISI synthesis.
- Utah.
</world_state>

<scorecard>
**Diversified Utopia milestones**
- **~90% of AI R&D by agents:** in progress. Unchanged.
- **Frontier models withheld; governments take notice:** in progress++. The first full conditional cycle is complete. The administration's capture critique and the open-weight coalition are now pushing back.
- **First major AI infrastructure and cyber attacks:** achieved, partly contained. Zero loss again, but the call-forward gap is published and unsolved.
- **Pro-AI vs anti-AI polarization:** deepening. Vance and Bessent add a right-populist anti-gating line, and unemployment keeps rising.
- **AIs built by previous AIs:** early.
- **Robust, verifiable alignment:** early++.
- **Multi-agent long-horizon training:** early++. The methods paper is accepted.
- **Alt-protein business:** in progress+. Unchanged.
- **Robust AI policies:** early++. The gating norm holds, but it now faces an organised opposition.
- **Human–AI alignment ping-pong:** early+.
- **Mass disease cures:** early+. The clinical decision has slipped to June.
- **Avoiding a permanent underclass:** at risk. Unemployment is 7.5% and the federation has walked out.

**Summary scores**
- **Overall DU progress: 28/100 (unchanged).** The methods paper, the Rule 224 de-escalation and the full GPT-7 gating cycle are offset by the clinical slip, the walkout and the rise of organised anti-gating politics.
- **Catastrophe risk: elevated (unchanged).** The GPT-7 general release raises the capability diffusion that is available. Fraud defence holds, but the call-forward gap is now public.
- **Public trust in AI: 8/100 (−1).** Unemployment is at 7.5%, GPT-7 is in general release and the walkout got coverage.
- **Public trust in Anthropic: 24/100 (−1).** "Rewrites test" and "sought faster auditor" outweigh the Rule 224 notice deal and the honest red-team disclosure.
</scorecard>
