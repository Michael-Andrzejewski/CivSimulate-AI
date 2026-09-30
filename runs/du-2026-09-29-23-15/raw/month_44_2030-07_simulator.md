<rolls>
Action 1 [Clinical result on RAND's terms]: P(failure) 30%. Roll 58. Outcome: SUCCESS (58 ≥ 30). Prerequisites: the script is hash-locked and the data is complete and deduplicated, so both are met. RAND's publication policy is outside Anthropic's control, and Threat 1 models that risk.

Action 2 [Michigan Jul 14 retest]: P(failure) 25%. Roll 37. Outcome: SUCCESS (37 ≥ 25). Prerequisites: the fix has shipped, the magic link has been removed and the subprocessor map is delivered, so all are met. DTMB sets the clearance timing.

Action 3 [CAISI letter and docket filing]: P(failure) 35%. Roll 78. Outcome: SUCCESS (78 ≥ 35). Prerequisites: the package is ready and the docket opens Jul 15, so both are met. The execution succeeds, but the materialised Threat 3 makes the reception costly.

Action 4 [Scale the module and phishing signatures]: P(failure) 40%. Roll 76. Outcome: PARTIAL SUCCESS (76 ≥ 40). Prerequisites: the core processors control vendor-risk review and release windows, which caps adoption growth in July whatever the roll.

Action 5 [Rule 224 compliance and the July tranche]: P(failure) 30%. Roll 66. Outcome: SUCCESS (66 ≥ 30). Prerequisites: the board approves under a test that is now clarified (see the world state), and the Trust's template has already been executed once.
</rolls>

<threat_rolls>
Threat 1 [RAND won't go first, or a "hold" result]: P(materialises) 30%. Roll 06. MATERIALISES (06 < 30).
- **Why lower than 40%:** the sign-off date was already publicly set, which reduces the slip risk. The risk that remains is RAND's publication policy together with a random-effect model on 7 clusters producing a wide CI.
- **Effect:** RAND signs on time but will not host first. The result is inconclusive, so the pre-registered rule forces a hold.

Threat 2 [Retest finds a new issue]: P(materialises) 25%. Roll 54. DOES NOT (54 ≥ 25).
- **Why slightly lower than 30%:** the assisted-phone path was dry-run against DTMB's own checklist, which narrows the surprise surface.
- **Trace:** the auditor adds a non-blocking advisory about relay support.

Threat 3 [Docket filing reads as industry writing the standard]: P(materialises) 25%. Roll 00. MATERIALISES (00 < 25).
- **Why lower than 35%:** the filing was factual and invited CAISI's discretion. However, the attachments were not marked confidential, and public docket posting is the default.
- **Effect:** the harness appendix is posted publicly, the coalition attacks it, and the CAISI-date letter leaks.

Threat 4 [Processors stall, call-forward loss]: P(materialises) 25%. Roll 55. DOES NOT (55 ≥ 25).
- **Why lower than 50% and 20%:** the processor stall is already priced into Action 4's partial result. I set the combined risk of a first loss this cycle at about 25%.
- **Trace:** attackers shift to institutions that rely only on the 90-day rule, and there is a near-miss.

Threat 5 [Suits land before the board]: P(materialises) 25%. Roll 87. DOES NOT (87 ≥ 25).
- **Why lower than 30%:** suits need an investigation after AEO disclosure, and 5 weeks is short.
- **Trace:** private demand letters are sent to institutions, and none name Anthropic.
</threat_rolls>

<events>
Your actions cause a July in which every process runs on time, and one of them lands where nobody hoped.

**Clinical.**
- **Sign-off.** RAND runs the hash-locked script on Jul 8 and co-signs Jul 9, meeting the date. RAND's publications office will not host a sponsor's operational decision first: its independence policy allows only a methods note after the sponsor publishes.
- **Result.** The random-effect model on 7 site clusters puts the point estimate inside the non-inferiority margin, but the upper CI bound crosses it: 1.1pp against a 0.9pp margin. Under the pre-registered rule, the result is inconclusive, so clinical holds at 50%.
- **Publication.** Anthropic posts the pre-cleared "hold" text unedited on Jul 11, with a targeted retrain and a named re-read date of **Oct 15**, adding one line: "no rule changes, as committed." RAND's note follows the same day.
- **Coverage.** STAT runs "After three delays, Claude's clinical mode stays at half." Lawfare and two biostatisticians on Bluesky say that is exactly what pre-registration is for. The coverage is split, but the "changed the test" line is dead.

**Michigan.**
- **Retest.** The Jul 7 regression and dry-run are clean. The DTMB roster auditor retests on Jul 14 and passes 3.3.8 on both paths.
- **Advisory.** The auditor adds a non-blocking advisory recommending that the assisted-phone line support relay and TTY calls.
- **Clearance and publication.** DTMB clears on Jul 28. Anthropic publishes the full 11-flow report on Jul 30, covering the fail, the fix, the magic-link removal and the advisory.
- **Next step.** DTMB says the pilot can resume in late August after a restart plan is filed.
- **Coverage.** Bridge Michigan: "Independent retest clears Anthropic tool." Rep. Grant says the state-picked auditor "worked as it should."

**CAISI and the docket.**
- **Letter.** The letter goes out Jul 8. CAISI replies Jul 24: the package is received Aug 4, followed by a 45-day evaluation, so the earliest staged rollout is mid-September. Leadership accepts that as the readiness date.
- **Filing.** The docket filing is posted Jul 17. The harness appendix was not marked confidential, so regulations.gov publishes it along with everything else.
- **Coalition reaction.** On Jul 20 the 31-signatory coalition and xAI circulate it as "incumbent templates entered into the federal record, one month after CAISI asked them not to."
- **Leak.** On Jul 23 Politico obtains the CAISI letter and a paraphrase of the sales memo: "Anthropic asks regulator for release date as GPT-7 wins Wall Street."
- **OpenAI.** OpenAI notes that the phishing patterns "were in our own June report."
- **CAISI.** CAISI's director says the appendix "will be weighed like any comment." Staff privately tell Anthropic that the timing "didn't help."

**Security.**
- **Integration packages.** They go to the three largest credit-union core processors. Two open vendor-risk reviews that are expected to take a quarter. One mid-tier processor moves the module into a production pilot at 4 credit unions on Jul 25.
- **Catch rates.** The updated rates are published. Catch on new call-forward variants is 79%.
- **Signatures.** FS-ISAC re-labels the phishing signatures as "agentic LLM lure family," which is its house style.
- **Feed cooling.** Two member banks trim transaction detail in their feed submissions, citing Rule 224 discovery exposure.
- **Fork cycle.** A Kimi-derived speech fork is flagged Jul 12 and patched in **39 hours**. Attackers visibly shift to institutions that use only the 90-day rule. One $140K call-forward attempt at a Wisconsin credit union is stopped only by its 24-hour hold. All four attempts, worth about $1.3M, are stopped, making a **fifth zero-loss cycle**. FS-ISAC's bulletin calls it "narrower than the headline."
- **CTIA talks.** They schedule a technical working session for September.
- **Holdout.** The callback holdout defers to Q3.

**Rule 224 and labour.**
- **Hearing (Jul 16).** Judge Moreland sustains the signals-only credit union's objection, because it never processed the transfers. The judge overrules the small bank's objection, and the bank is disclosed AEO on Jul 23 without error.
- **Demand letters.** Law360 reports that the petitioner's counsel has sent private demand letters to "several" disclosed institutions. None name Anthropic.
- **Board.** On Jul 21 the board applies the Radford test. The tranche releases while unemployment is at or above 6.5%, and it is at 7.6%. The board approves 7–1, with one director noting "litigation climate."
- **Execution.** The agreement is executed Jul 24. The Trust announces on Jul 29, and the $250M clears Jul 31.
- **Federation.** It calls it "the second payment on a comment box." About 150 people rally.

**Exogenous.**
- **Jul 3, jobs report.** Unemployment rises to **7.6%**, and professional services fall 8k.
- **Jul 22, Tenth Circuit.** The court largely upholds Utah's AI law against the DOJ challenge and strikes one disclosure provision. The DOJ weighs en banc review.
- **Jul 16, House Appropriations.** The CJS subcommittee marks CAISI down 12%. Commerce says it will seek restoration.

**Market.** Shares end about **$707B** (−0.7%). The Politico leak and the clinical hold outweigh the CAISI date.
</events>

<capability_update>
Next month's Claude is a modest step up, roughly in line with recent months: gains in agentic reliability and long-context coding, driven by the continuing Akamai ramp and algorithmic efficiency work. Power limits (the Saline moratorium) and the self-imposed CAISI gating on the next frontier release keep deployed capability growth incremental. Internal research capability is ahead of what is deployed.
</capability_update>

<world_state>
**WORLD STATE: 1 August 2030**

**Calendar**
- **Aug 4.** The pre-release package goes to CAISI, starting a 45-day evaluation. The earliest staged rollout is mid-September.
- **Aug 7.** Jobs report.
- **Late Aug.** Michigan pilot restart plan is due to DTMB, with the pilot resuming in late August if accepted.
- **Sept.** CTIA/ATIS technical working session.
- **Oct 15.** Clinical re-read after the targeted retrain.
- **Q3.** The callback holdout revisit.
- **Ongoing.** FS-ISAC feed pilot, month 4 of 6. The CAISI open-weight docket (comment period open). Two core-processor vendor-risk reviews, expected to take about a quarter.
- **Pending.** CAISI synthesis. BIS response on the CHS items (overdue). DOJ decision on en banc review of Utah. CAISI appropriations restoration.

**1. Frontier AI and labs**
- **Anthropic.**
  - Valuation about $707B.
  - The CAISI pledge holds, with a CAISI-set date. Sales pressure is partly defused by the date, but the Politico "release date to win Wall Street" story is out.
  - The harness appendix is now public in the docket, against CAISI staff's earlier informal request. Staff relations are slightly cooler.
  - Patch is at 100% on all surfaces except clinical (50%).
- **Bio.**
  - Clinical result was inconclusive: the upper CI (1.1pp) exceeded the 0.9pp margin. It holds at 50% with a targeted retrain, and the re-read is Oct 15 under the same rule. RAND posts methods notes only after Anthropic publishes.
  - Nursing recalibration stands.
  - CHS is at about 940 hours.
- **Security.**
  - 45 of 46 organisations have callbacks.
  - Addendum adoption: 27 on the 90-day rule, 16 on the hold, 11 on a second channel.
  - The module is live at 2 credit unions, 1 sandbox and 1 mid-tier processor's production pilot (4 credit unions). Catch on new call-forward variants is 79%.
  - Fork patch time is 39 hours.
  - Five zero-loss cycles, narrowing. Attackers are targeting institutions that use only the 90-day rule, and the most recent save came from a 24-hour hold.
  - Feed cooling: two banks trimmed submission detail over discovery exposure.
- **Labour.**
  - Fund stands at $3.5B, with $500M delivered to the Trust in two tranches.
  - The federation stays outside and calls it "the second payment on a comment box."
  - The Radford test is clarified: tranches release while national unemployment is at or above 6.5%.
  - Michigan is cleared; the report was published Jul 30. The relay/TTY advisory is open.
  - Arbitrator: 11 items, 3 awaiting BIS.
  - Career mode: about 5M users.
- **Other labs.**
  - OpenAI: GPT-7 is in general release and gaining enterprise work. OpenAI is not in the feed and asks FS-ISAC questions.
  - Google: in the feed.
  - xAI and the coalition are attacking the docket appendix.
  - DeepSeek V6, Qwen 5.1 and Kimi-derived forks are active.

**2. Compute.** Power is binding. The Saline moratorium stands, and the Akamai ramp continues.

**3. Policy**
- **CAISI.** The GPT-7 precedent stands, the open-weight docket is live, and the House subcommittee cut CAISI 12%. Critics: Bessent, Vance, the 31-signatory coalition.
- **EU.** Code revision is in progress.
- **Incident tool.** v1.1.
- **Senate.** Cruz is blocking hearings. Hawley–Blumenthal staff receive packages.
- **States.** RAISE, Washington and SB 53 apply. Utah's law was largely upheld by the Tenth Circuit.
- **Rule 224.** 12 institutions are disclosed AEO, and the signals-only credit union's objection was sustained. The petitioner's counsel has sent private demand letters to several institutions. No suits have been filed, and none name Anthropic.

**4. Public opinion**
- **Negative narratives.**
  - "Clinical still at half after three delays."
  - "Release date to win Wall Street" (Politico).
  - "Incumbent templates in the federal record."
  - Unemployment at 7.6%.
  - The federation.
- **Positive narratives.**
  - "Independent retest clears Anthropic tool."
  - Pre-registration honoured (Lawfare).
  - Five zero-loss cycles.
  - Second tranche delivered.

**5. Economy.** Unemployment is 7.6% (up 0.1). Professional services fell 8k.

**6. Security.** Defence is layered, but attackers are adapting toward coverage gaps. Carrier talks are moving slowly. GPT-7 lure families are in the feed.

**7. Science.** Methods paper is out. CARB-X on-call is 24 hours or less. Six alt-protein licensees. ARIA and Kroll continue.

**8. Key open threads.** CAISI evaluation (Aug 4 to mid-Sept), docket fallout and CAISI staff relations, the Oct 15 clinical re-read, Michigan pilot restart and the relay advisory, possible Rule 224 suits, processor reviews, feed cooling, attacker adaptation, carrier talks, the federation, BIS, CAISI budget, Utah en banc.
</world_state>

<scorecard>
**Diversified Utopia milestones**
- **~90% of AI R&D by agents:** in progress.
- **Frontier models withheld; governments take notice:** in progress++. Anthropic's release is now formally in CAISI's queue. This is offset by the docket-appendix flap and the CAISI budget cut.
- **First major AI infrastructure and cyber attacks:** achieved, partly contained. Fifth zero-loss cycle, though narrowing.
- **Pro-AI vs anti-AI polarization:** deepening.
- **AIs built by previous AIs:** early.
- **Robust, verifiable alignment:** early++.
- **Multi-agent long-horizon training:** early++.
- **Alt-protein business:** in progress+.
- **Robust AI policies:** early++. The Utah ruling strengthens state authority.
- **Human–AI alignment ping-pong:** early+.
- **Mass disease cures:** early+. Clinical held at 50%, with a re-read in October.
- **Avoiding a permanent underclass:** at risk. Unemployment is 7.6%, $500M has been delivered, and the federation is still outside.

**Summary scores**
- **Overall DU progress: 28/100 (unchanged).** The CAISI-gated release date, the Michigan clearance and the second tranche are offset by the inconclusive clinical result and rising unemployment.
- **Catastrophe risk: elevated (unchanged).** Attackers are adapting toward coverage gaps and the feed is cooling slightly, offset by faster patching and a new production module deployment.
- **Public trust in AI: 8/100 (unchanged).** Rising unemployment and GPT-7 misuse keep it pinned.
- **Public trust in Anthropic: 23/100 (unchanged).** The Michigan clearance and honouring the pre-registered rule are cancelled out by the Politico leak and the "templates in the record" story.
</scorecard>
