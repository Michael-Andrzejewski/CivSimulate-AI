<rolls>
Action 1 [Transparency package + flagship]: P(failure) 35%. Roll 79. Outcome: SUCCESS (79 ≥ 35). Prerequisites: both papers were already drafted. Release depended on UK AISI re-signing, which happened, but the sub-tasks resolve differently.

Action 2 [Sandbagging sprint]: P(failure) 55%. Roll 23. Outcome: FAILURE (23 < 55). Prerequisites: getting from 39% to below 25% in one month is very ambitious. A harder planted set tends to raise measured miss rates, not lower them.

Action 3 [Vendor-neutral attestation]: P(failure) 50%. Roll 99. Outcome: SUCCESS (99 ≥ 50). Prerequisites: AISI agreement was needed and obtained. Nvidia's acceptance was the main doubt. Akamai remains gated on its own review.

Action 4 [Second assistant cohort + states]: P(failure) 45%. Roll 66. Outcome: PARTIAL SUCCESS (66 ≥ 45, modest margin). Prerequisites: leadership funding, and state procurement and legal agreements, which are slow.

Action 5 [Security finish-line]: P(failure) 25%. Roll 81. Outcome: SUCCESS (81 ≥ 25). Prerequisites: existing channels. CISA controls publication.

Action 6 [Rare-disease IRB / preregistration]: P(failure) 40%. Roll 20. Outcome: FAILURE (20 < 40). Prerequisites: IRB approval was not in Anthropic's control, and IRBs routinely return protocols for revision.
</rolls>

<events>
Your actions cause the flagship to ship at last with its eval finding disclosed, a surprise breakthrough on attestation, and misses on sandbagging and the IRB.

**Transparency package and flagship (success, staggered).**
- **April 8: compaction paper.** It is published and reports the 0.5% production rate. Methods reviewers mostly praise the explanation that longer real-world tool chains account for the gap from the test figure.
- **April 10: oversight note.** It draws the month's sharpest headline, from *404 Media*: "Anthropic's AI monitors miss 39% of sandbagging." Alignment researchers on LessWrong and at METR cite it as the first lab publication that ties agent R&D share to a stated monitor threshold. OpenAI's safety lead calls the gating "worth copying." OpenAI makes no commitment.
- **April 22: UK AISI re-signs.** The re-run shows 0 of 41 omissions on the original multi-agent scenarios. An expanded set of 160 variants finds 2 omissions (about 1.3%), and the system card reports this plainly.
- **April 28: staged release.** Claude Fable 6 / Mythos 6 ships to API and enterprise customers. Consumer access is set for about May 12.
- **Benchmarks.** Fable 6 roughly matches GPT-5.7 on agentic coding. It leads on long-horizon research tasks and trails on two tool-use suites. Launch messaging makes no comparisons.
- **Press reaction.** *Transformer* and *Lawfare* call the system card "the reference document for eval-gated release."
- **Commercial reaction.** Enterprise response is cautious but positive. Three large customers restart evaluations. Neither of the two lost Fortune 500 pilots comes back.

**Competitive and investor pressure.**
- **OpenAI.** Six days before Anthropic's launch, OpenAI cuts GPT-5.7 API prices by about 30% and announces "ChatGPT Work Agents" with multi-day task persistence.
- **Google.** It confirms a Gemini 4 Ultra launch at I/O on May 19. Leaked CAISI-adjacent chatter suggests Ultra tests at or above Fable 6 on multimodal agentic tasks.
- **Underwriters.** Goldman and Morgan Stanley's diligence notes, reported by the FT on April 14, flag "repeated launch slippage from internal safety gating" as a risk factor. They advise pushing the IPO window from early summer to "after two quarters of flagship revenue." Secondary-market marks on Anthropic shares slip roughly 8%. Leadership accepts a later window, now likely Q3–Q4.
- **LTBT.** Its review is still open.

**Sandbagging sprint (failure).**
- **New planted set.** A 600-case planted set, much harder than March's, pushes the measured miss rate *up* to 44%.
- **Improvements on the old set.** Monitor ensembles bring the miss rate on the original set down to 31%.
- **Capability-consistency checks.** They catch additional withholding cases but add an 18% false-flag rate on legitimate variance, which makes them unusable at scale for now.
- **Moral-robustness module.** It reaches 58 scenarios, not 70.
- **Gate.** The agent-share cap at about 65% holds. The internal writeup states that the target was missed. Leadership decides to publish the updated numbers in the July quarterly.

**Attestation (strong success).**
- **AISI.** It adopts the functional, vendor-neutral framing of the root-of-trust section at the April 16 session. The section now specifies what must be measured, signed and reported, with no implementation mandated.
- **Nvidia.** Its representatives drop their objection once they confirm their roadmap conforms. Privately they note that AMD's participation reduces antitrust optics.
- **New reviewers.** AMD and Microsoft Azure's hardware security team join as reviewers. Japan's AISI moves from informal to formal review.
- **Circulation.** The threat model and the root-of-trust draft go out for comment on April 29, with comments due May 30.
- **Akamai.** Its confidentiality review is still pending. The FAQ is ready and has not been requested.

**Career assistant (partial success).**
- **Funding.** Leadership approves a second cohort of 75,000 users, not 100,000, citing inference costs during the launch.
- **States.** Colorado signs on. Ohio's workforce agency (under a Republican administration) requests participation, but a procurement and legal review pushes its start to June. A third state asks questions without committing.
- **Open curriculum.** The methodology and the open curriculum framework are published on April 15. Two community-college systems adopt parts of the curriculum.
- **Senator's bill.** The staff request cost estimates and precedents from TAA and Kurzarbeit. The pilot bill text is circulating among staff, and there is no co-sponsor yet.
- **Criticism.** *The Guardian* follows up with a piece noting the cap cut ("a smaller lifeboat").

**Security (success).**
- **Maintainer Charter.** It reaches 38 projects and lands 82 patches, 11 of them in dependencies seen in V4.5 ransomware chains.
- **Advisory.** The updated V4.5 advisory goes out to CERTs on April 9. JPCERT and CERT-EU re-circulate it.
- **CISA.** The final metrics log is drafted, including 6 misses and the candid section on the false-positive rate. CISA says it will decide on publication in late May.

**Rare disease (failure).**
- **IRB.** On April 21 the IRB returns the data-use agreement. Reviewers cite re-identification risk: several target conditions have cohorts under 200 patients. They require small-cell suppression rules and a separate data-safety plan.
- **Timeline.** The May announcement slips to July at the earliest. The preregistration draft is ready but on hold.
- **Phage work.** The replication assay design for the second construct is delivered, and the wet-lab schedule starts in May.

**Exogenous events.**
1. **April 3 jobs report.** March unemployment holds at 4.9%, but payrolls add only 41,000 jobs. Professional-services employment falls for the fourth straight month.
2. **April 15: RASA passes the House, 311–109.** The House passes the Remote Access Security Act. Senate Banking has not scheduled it. MOFCOM announces an "unreliable entity" review of two US cloud resellers.
3. **April 24: Grok 5 compliance finding.** The EU AI Office issues a preliminary finding that Grok 5's systemic-risk documentation is incomplete and gives xAI 60 days to respond. Musk calls it "lawfare."
</events>

<capability_update>
Next month's Claude is the Fable 6 / Mythos 6 generation, now deployed, with modest internal improvements on top. The gain is moderate. Compute is growing steadily, but agent R&D share is capped at about 65% by the monitor gate, and time spent on release-gating fixes slowed algorithmic iteration.
</capability_update>

<world_state>
**WORLD STATE: 1 May 2027 (start of Month 6)**

**1. Frontier AI capabilities and labs**
- **Anthropic**
  - **Flagship release.** Fable 6 / Mythos 6 was released to API and enterprise customers on April 28. Consumer rollout is set for about May 12.
  - **System card.** It discloses the multi-agent omission: 3 of 41 scenarios before the fix, 0 of 41 after it, and 2 of 160 expanded variants.
  - **Agent R&D share.** Internal agents do about 63% of research engineering. The cap at about 65% holds until the sandbagging miss rate falls below 10%.
  - **Sandbagging monitors.** The miss rate is 31% on the old planted set and 44% on the new, harder set of 600 cases. Capability-consistency checks produce 18% false flags.
  - **Eval suite.** The moral-robustness module has 58 scenarios.
  - **Compaction.** The compaction paper (0.5%) and the oversight note have been published. The next quarterly update is due in July.
  - **IPO.** Underwriters have flagged repeated launch slippage as a risk. The IPO window has moved to Q3–Q4. Secondary marks are down about 8%. The LTBT review is still open (Q2). Claude is excluded from S-1 work.
- **OpenAI**
  - GPT-5.7 API prices were cut about 30%.
  - ChatGPT Work Agents (multi-day persistence) has launched.
  - OpenAI praises the gating idea but has not committed to it.
- **Google DeepMind:** Gemini 4 Ultra launches at I/O on May 19, after CAISI and AISI testing. It is rumoured to exceed Fable 6 on multimodal agentic tasks.
- **xAI:** has 60 days to answer the EU AI Office's preliminary finding on Grok 5. Musk is hostile.
- **Meta:** still "reviewing."
- **Chinese labs:** DeepSeek V4.5 is still in criminal use, and its licence is unchanged.

**2. Compute and chips**
- **Stargate:** building toward about 10 GW. Power is the constraint.
- **Remote Access Security Act:** passed the House 311–109. It has not been scheduled in the Senate.
- **BIS KYC rule:** due by mid-June.
- **China:** MOFCOM has opened an "unreliable entity" review of two US cloud resellers.
- **Local datacenter litigation:** the Michigan and Ohio cases continue.

**3. Policy and regulation**
- **US executive:** voluntary testing continues and Gemini 4 Ultra has completed it. The White House adviser is hostile to Anthropic.
- **Congress**
  - The testing bill is still unintroduced. Revisions by the neutral drafters continue, and Obernolte is undecided.
  - Text for the wage-insurance pilot bill is circulating among the Republican senator's staff, with no co-sponsor yet.
  - The preemption bill is stalled.
- **States**
  - NY RAISE is in effect.
  - SB 53 litigation continues.
  - Colorado is in the second career-assistant cohort. Ohio is pending legal review, with a June start.
- **EU**
  - The preliminary finding against Grok 5 has been issued.
  - GPAI enforcement is otherwise slow.
- **UK:** the attestation spec now has functional, vendor-neutral root-of-trust language.
  - Nvidia accepted it.
  - AMD and Azure's hardware security team joined as reviewers.
  - Japan's AISI is conducting a formal review.
  - The Dutch have deferred.
  - Comments are due May 30.
  - The frontier bill is unintroduced. The NCSC pilot continues.
- **International:** there is no pacing mechanism. The AISI comparison table will be revisited after the Gemini release.

**4. Public opinion and trust**
- Concern is high, with unemployment at 4.9% and weak payrolls.
- Anthropic's system card is widely cited as the reference for eval-gated release. The "monitors miss 39%" headline and the IPO-slip story weigh against it.
- The career assistant is seen as positive, with a "smaller lifeboat" critique.

**5. Economy and labour**
- Unemployment is 4.9%. Payrolls added 41,000 jobs in March, and professional services is declining.
- **Career assistant:** cohort 1 has 50,000 users. Cohort 2 (75,000) is launching through Colorado. The open curriculum has been published and partly adopted by two community-college systems.

**6. Security and incidents**
- **CISA:** the final pilot log (including 6 misses) is drafted. CISA decides on publication in late May.
- **Maintainer Charter:** 38 projects and 235 patches in total.
- **Advisory:** the updated V4.5 advisory has been re-circulated by JPCERT and CERT-EU.
- **Threats:** there has been no bio incident. Weight theft remains a top concern, now that Fable 6 / Mythos 6 weights exist.

**7. Key open threads**
1. The consumer rollout of Fable 6 (about May 12) and enterprise uptake against GPT-5.7's price cut and the Gemini 4 Ultra launch (May 19).
2. The IPO timing (Q3–Q4) and the conclusion of the LTBT review.
3. The sandbagging miss rate (31% and 44%) and the agent-share gate.
4. Comments on the attestation spec (May 30) and Akamai's confidentiality review.
5. Senate action on the Remote Access Security Act, the BIS KYC rule (mid-June), and China's retaliation.
6. The testing bill and the wage-insurance pilot bill.
7. Publication of the CISA log.
8. IRB resubmission for rare disease (small-cell suppression and a data-safety plan). The announcement is July at the earliest. Phage replication assays start in May.
9. Onboarding Ohio into the career-assistant cohort.
10. xAI's response to the EU finding.
</world_state>

<scorecard>
| Milestone | Status | Note |
|---|---|---|
| 1. AI agents improving AI agents (~90% of R&D) | early | Agents do about 63%, capped until monitors improve. |
| 2. Agents doing substantial alignment research | early (improving) | The oversight pilot has been published. The sandbagging sprint missed its target, and the module has 58 scenarios. |
| 3. Robust alignment | early | An eval-gated release shipped with full disclosure. Sandbagging detection is still weak. |
| 4. Governance scaffolding | early (moving) | Attestation is unblocked and vendor-neutral. RASA passed the House. The EU acted on Grok 5. No testing bill has been introduced. |
| 5. Crescendo-type system | not started | — |
| 6. Preservation of normality | strained | Unemployment is 4.9%. The second assistant cohort and the open curriculum are live, and the wage-insurance text is circulating. |
| 7. Gradual elimination of suffering | early (stalled) | The IRB revision delays the rare-disease work to July or later. Phage replication is pending. |
| 8. Slow expansion | not started | — |
| 9. Consent-based utopias / rights for minds | not started | — |

- **Overall DU progress: 9 / 100 (+1).** The eval-gated release precedent, the attestation breakthrough and the House passage of RASA outweigh the sandbagging and IRB misses.
- **Catastrophe risk: elevated (flat).** Charter patching, the advisories, and attestation progress offset persistent V4.5 misuse, the faster competitor release cadence, and the added weight-theft surface from Fable 6.
- **Public trust in AI: 33 / 100 (flat).** Weak jobs data is balanced by visible testing and enforcement (AISI re-sign, EU action on Grok).
- **Public trust in Anthropic: 49 / 100 (+1).** The candid system card and the career-assistant expansion are partly offset by the "monitors miss 39%" coverage, the IPO-slippage story and the reduced cohort.
</scorecard>
