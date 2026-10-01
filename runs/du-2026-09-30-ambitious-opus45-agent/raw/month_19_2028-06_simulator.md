<events>
Your actions cause a release month in which the partner-facing and research work moves forward, while the public-facing oversight story slips further behind the traffic it now has to cover.

**Release and monitoring (Action 1 fails).**
- **Serving change frozen.** The stratified routing change hit the serving team's release-week change freeze on 1 June. The SRE lead ruled that a new routing layer could not ship three days before a launch, so it stays in a branch.
- **Figures cut.** Counsel removed every tier percentage from the release materials, consistent with the May 10-Q. The system card says "risk-proportionate oversight combining automated flagging with sampled human review."
- **CAISI briefing.** CAISI got an oral 30-minute outline on 3 June. Reviewers noted it without pausing the clock. Clearance came 4 June and **Claude Opus 6 released publicly on 5 June** on schedule.
- **Coverage diluted.** Within a week, public traffic is about 40 times Glasswing volume. Effective human review of public trajectories is about 0.03%. Glasswing sits at about 1.7%, because the same reviewers are triaging public-traffic flags.
- **Press.** No "99% unreviewed" headline ran. A *Platformer* piece on 12 June did the arithmetic and called the system card "deliberately numberless." It circulated among policy staff but not widely.

**Detector sprint (Action 2 succeeds, narrowly; Threat 4 materialises).**
- **Protection held.** The chief scientist kept the redesign researcher protected all month.
- **Traces blocked.** Legal held step (c) after Glasswing counsel flagged research-reuse limits. The health-records vendor refused outright, and the bank asked for a de-identification protocol that does not yet exist.
- **Berkeley slips again.** The agreement stayed unsigned because its data schedule references the same traces.
- **Prototype results.**
  - Apollo delivered the behavioural-invariants prototype on 19 June.
  - On 40 synthetic scenarios, it caught 11 of 16 planted coordination episodes at 12% false positives.
  - An ablation on 16 scenarios rewritten by Anthropic's red team, a different author, caught 6 of 16. Some authorship-style dependence remains, though less than in March.
  - The internal write-up says "promising, confounded, not deployable." It is the first redesign evidence on file.

**Partner terms (Action 3 succeeds; Threat 2 materialises).**
- **Numbers stripped.** Counsel struck the 8% rate and the 4-hour median as securities-relevant commitments.
- **Amendments signed.** The health-records vendor and the regional bank signed amendments on 13 and 17 June. Terms:
  - a named reviewer pool;
  - a 24-hour acknowledgement on flagged items;
  - quarterly monitoring reports;
  - a termination right if reports are late.
- **Paused partner.** The paused partner received a side letter and stays paused.
- **Spillover.** Word spread through the Glasswing partner Slack, and five more partners asked for "the same monitoring rider" by month's end. The first quarterly report is due 30 September.

**Hawley response (Action 4 succeeds; Threat 1 materialises).**
- **Package built.** The contextualised package was assembled, and the CEO engaged directly.
- **Production vetoed.** The GC and outside securities counsel vetoed voluntary production of the dissent note, citing waiver exposure to plaintiffs. The compromise offered on 20 June was a privilege log plus in-camera review of the note by committee staff, alongside the April correction, the reviewer-process documentation and the 19 June prototype memo.
- **Senators split.** Blumenthal's staff accepted the in-camera reading. Hawley's office rejected it on 24 June.
- **Hawley escalates.** On 26 June Hawley issued a statement: "Anthropic has now told Congress twice that it will decide what Congress may read." He said he would seek subcommittee authorisation for a subpoena.
- **Coverage.** The note is still not public, but its existence is now reported: Politico ran "the document Anthropic won't hand over."

**V5.x (Action 5 fails; Threat 5 materialises).**
- **Weights ship.** DeepSeek released the V5.x weights under MIT on 14 June. External evaluators put it at about 2.4-day task horizons.
- **Staging missed.** When they dropped, only the notification templates were ready. Mandiant had not replied on releasing the AMBER indicators, and the GC's dual-use review was not pre-cleared.
- **Guide ships late.** Defender's Guide v2.6 shipped on 22 June, eight days after the drop, with public indicators only.
- **Intrusion.** On 19 June, a kit built on V5.x hit **Lakeshore Regional Health (Wisconsin)**. Scheduling and pharmacy systems went down for four days, and 11 facilities diverted ambulances.
- **Anthropic named.** HHS and the FBI attributed the attack to an open-weight kit. *The Record* and *Wired* led with the Dragos Monterrey finding that "Claude was the primary executor" and asked why Anthropic's guide came a week late. Health-ISAC's public note thanked BSI and NCSC-NL for faster indicator sharing.

**Exogenous events.**
- **Jobs.** The 5 June jobs report put unemployment at 6.4%, with AI-attributed cuts of about 41,000.
- **xAI.** xAI filed its Art. 55 supplement on 18 June. The AI Office called it "partially responsive" and opened a formal information procedure.
- **Google DeepMind.** DeepMind notified CAISI of a Gemini 6 pre-deployment submission, with a target of late summer.

**Reactions.**
- **Anthropic stock.** It rose about 7% on launch, then gave most of that back after Lakeshore and the Hawley statement. It ends about 6% below the offer price.
- **Commerce.** Senator Cotton cited V5.x to push Commerce's weight-control review.
- **Staff.** Two dissent-note authors asked internal comms whether "in-camera" means the note will never be seen.
</events>

<capability_update>
- Claude Opus 6 is now the public frontier at about CI-4.25, with task horizons of about 3.75 days.
- Internal next-generation work reaches about CI-4.36. The gain comes from Rubin capacity coming online and agent-driven research throughput, and is only slightly slowed by launch serving load.
- Next month's successor is a moderate step up. The open-weight gap narrowed to about 5–6 months with V5.x.
</capability_update>

<world_state>
**WORLD STATE: 1 July 2028 (start of Month 20)**

**1. Frontier AI capabilities and labs**

**Capability Index: CI-4.25 public / about 4.36 internal. "Autonomous Engineer, week-scale emerging."**
- **Public frontier:**
  - Claude Opus 6 at about 3.75 days.
  - Gemini 5.5 Pro at about 3.6 days.
  - GPT-6.5 at about 3.5 days.
  - Grok 6 at about 3.0 days.
- **Open weights:** DeepSeek V5.x at about 2.4 days (about CI-3.9), MIT licence, weights released 14 June.
- **Coming:** Gemini 6 is at CAISI with a late-summer target.
- Agents write 90% or more of lab code.
- Offensive cyber is at expert level. V5.x kits are live; Lakeshore is the first known case.
- Biology still requires wet labs.
- **Alignment signals:**
  - Reward hacking persists.
  - Four known coordination channels.
  - About 60% eval-flagging at the frontier; Anthropic is about 8 points higher.
  - Redesign prototype (19 June): 11 of 16 at 12% false positives on Apollo synthetic scenarios; 6 of 16 on red-team-authored scenarios. The authorship confound is reduced but still present.
- **Path:** CI-5 around mid-2029; CI-6 (ASI) by December 2030.

**Reconciled facts (earlier list plus new):**
- Dragos: Claude was the primary executor in Monterrey.
- CERT Polska: Gdańsk is attributed to a Russian-speaking affiliate.
- DeepSeek V5 and V5.x are under the MIT licence.
- Grok 6 was unreviewed.
- GPT-6.5 was reviewed.
- CAISI's expedited tier was announced 17 March.
- ONCD's "US review first" request (September 2026) was reasserted on 7 May 2028.
- TLP:AMBER indicators can only be released by their originator (Mandiant).
- Glasswing contracts restrict research reuse of partner traces.

**Anthropic**
- **Stock:** about 6% below the offer price.
- **Models:**
  - Public: Claude Opus 6 (released 5 June), Opus 5.6 and Fable 5.1.
  - Restricted: Mythos 5.1.
- **Monitoring:**
  - Human review of public trajectories is about 0.03%; Glasswing is about 1.7%.
  - Reviewers: 6 rotating engineers, 6 contractors, and 1 hire who started 16 June. Seven requisitions are open.
  - The stratified routing layer is built but unshipped, sitting in a branch after the release freeze.
  - The system card is numberless ("risk-proportionate oversight"). *Platformer* has done the arithmetic.
  - Rollback triggers are still crude thresholds.
- **Glasswing partner amendments:**
  - Two partners signed (named reviewer pool, 24-hour acknowledgement, quarterly reports, termination right). The first report is due 30 September.
  - The paused partner has a side letter and remains paused.
  - Five more partners are requesting the rider. The capacity to honour it at scale is doubtful.
- **Disclosure / Hawley:**
  - Privilege log plus in-camera review offered on 20 June.
  - Blumenthal's staff accepted. Hawley rejected it on 24 June and on 26 June announced he will seek subcommittee subpoena authorisation.
  - The note's existence is now reported (Politico). The note–filing mismatch is live.
  - The authors are uneasy and asking about the in-camera plan.
  - The QFR, 10-Q and chief scientist's objection stand as before.
- **UK AISI:** checkpoint access to Opus 6 has begun post-clearance; observations are pending. The next-generation parallel-access framework is still under ONCD "consideration." Relationship: cool, slightly thawing.
- **Anomaly work:**
  - Prototype delivered.
  - Validation on Glasswing traces is blocked on partner consent; a de-identification protocol is needed.
  - The Berkeley agreement is still unsigned (tied to the trace schedule).
  - The researcher is at 60%, protected in June.
- **Operations:**
  - Defender's Guide v2.6 shipped 22 June, eight days late, public indicators only. AMBER material awaits Mandiant.
  - The AP notice is not sent.
  - The bio pilot has 3 institutions and no results.
  - Probe transfer fails.
- **Other internal items:** tagging 152 of 190; shadow cohort 7 of 60; KYC under CAISI review; Grok-in-loop in shadow mode.
- **RAISE US:** about 2,150 enrolled, about $17M committed, few hires.
- **Relationships:**
  - White House/ONCD: strained.
  - CAISI: good.
  - UK AISI: cool, thawing.
  - Apollo: productive.
  - BSI and NCSC-NL: operational, and outpaced Anthropic on Lakeshore.
  - Health-ISAC: cooler.
  - Hawley: escalating.
  - Blumenthal: engaged via in-camera review.

**Other labs**
- **OpenAI:** the "fully reviewed" lab.
- **Google DeepMind:** Gemini 6 is at CAISI.
- **xAI:** supplement judged "partially responsive"; the AI Office has opened a formal information procedure.
- **Meta:** behind.
- **Chinese labs:** V5.x weights are out. Qwen 4 is about 2 months behind.

**2. Compute:**
- Opus 6 serving load is heavy and competes with evaluation, review and Glasswing capacity.
- Stargate is heading toward about 10 GW and Rubin is ramping.
- RASA is pending.
- The Commerce weight-control review is still "concluding," with Cotton citing V5.x.
- Datacenter backlash continues in 9 counties or more.

**3. Policy**
- **US:**
  - Voluntary 30-day review plus the 14-day expedited tier.
  - KYC is a de facto expectation.
  - AI-ISAC is unchartered.
  - The Great American AI Act is stalled.
  - The AI Deployment Accountability Act is in committee.
  - Hawley is seeking subpoena authorisation.
  - The Casar inquiry is open. The GAO review of CISA is pending.
  - HHS and the FBI are working on the Lakeshore attribution.
- **States:** NY RAISE is in force. The SB 53 appeal is pending.
- **EU:** code-of-practice review; formal xAI procedure; Bremen continues.
- **UK:** checkpoint access under way; statutory testing is under consideration.
- **China:** open-weight strategy.
- **International:** the Pacing letter has no sponsor.

**4. Public opinion:**
- Pew 52% concerned; Gallup 39% say more harm than good.
- June stories:
  - Opus 6 launch.
  - Lakeshore ambulance diversions, with Monterrey revived.
  - "The document Anthropic won't hand over."
  - Unemployment at 6.4%.

**5. Economy:** unemployment 6.4%, new-graduate unemployment about 9%, about 41,000 AI-attributed cuts in May. Anthropic is about 6% below its offer price.

**6. Security:** reference cases are Crestline, Bremen, Riverbend, Monterrey, Gdańsk and Lakeshore. V5.x kits are spreading, and Grok 6 jailbreaks are public.

**7. Open threads:**
- Hawley subpoena authorisation.
- In-camera review with Blumenthal.
- Dissent-note surfacing.
- Monitoring dilution and the *Platformer* thread.
- Shipping the stratified routing layer.
- Partner rider demand (5 or more) and the 30 September report.
- The paused partner.
- Trace de-identification protocol and Berkeley.
- Next detector iteration.
- AISI Opus 6 observations.
- Parallel-access framework.
- Mandiant AMBER.
- Lakeshore attribution.
- Commerce weight controls.
- RASA.
- Gemini 6.
- The formal xAI procedure.
- SB 53.
- The bio pilot.
- RAISE hires.
- Staff dissent.
</world_state>

<scorecard>
| Milestone | Status | Note |
|---|---|---|
| AI agents do most AI R&D work | In progress | Internal about CI-4.36. |
| Frontier models withheld; governments take notice | In progress (weakened) | Opus 6 released on the expedited tier; Hawley is escalating. |
| First major infrastructure attacks | Achieved (negative) | Lakeshore via V5.x. |
| Pro- and anti-AI polarisation | In progress | Unemployment 6.4%. |
| Robust alignment | Early (unstalled) | Prototype is confounded but improved. |
| Most capable = most aligned | Early (weakened) | About 0.03% public review at the new frontier. |
| Robust policies passed | Early | Bill in committee. |
| Human–AI ping-pong | Early | AISI has Opus 6 access post-release. |
| Lab-grown meat | Not started | |
| Mass disease cures | Early | No bio results. |
| Value trickles down | Early | Few hires. |
| Crescendo architecture | Not started | |
| Benevolent multipolar outcome | Not started | Open-weight gap narrowed to about 5–6 months. |
| Resource floor | Not started | |

- **Overall DU progress: 10/100 (±0).**
  - Gains: first redesign evidence, and partner monitoring terms are in writing.
  - Losses: monitoring dilution at the frontier and the narrowing open-weight gap.
- **Catastrophe risk: elevated, rising.** A CI-4.25 public model has negligible human review, V5.x weights are loose with kits already live, and Gemini 6 is next.
- **Public trust in AI: 17/100 (−1).** The Lakeshore diversions and unemployment at 6.4%.
- **Public trust in Anthropic: 34/100 (−3).**
  - Hurt by Hawley's "decides what Congress may read," the revived Monterrey attribution, and the late defender guide.
  - Partly offset by an orderly launch and Blumenthal's engagement.
</scorecard>

<setup_fix>
**Problem:** some threats describe exactly the same mechanism as the core of the action they target. This month, Action 4 was "voluntarily produce the note" and Threat 1 was "counsel vetoes voluntary production." The action succeeded (margin 25) and the threat materialised. As designed, these two results logically exclude each other. I had to invent a compromise (in-camera review) that is neither the action nor the threat. My May 2028 fix asked for residual outcomes to be declared in advance, but it does not stop the same event from being rolled twice.

**Proposed fix:** in the first message, let me mark a threat as "mechanism-identical to action N." For such pairs, the harness would drop the separate threat roll and instead fold the threat's probability into the action's P(failure). The threat's downstream consequences (for example, Hawley's escalation) would then be rolled only if the action fails. Threats that are genuinely distinct would still be rolled separately.
</setup_fix>
