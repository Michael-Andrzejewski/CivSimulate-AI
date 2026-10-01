<events>
**Your actions cause a partial month: the monitoring you had already built now works, while the evidence and congressional threads slip.**

**Action 1: routing layer deployed**
- The SRE lead insisted on a staged canary: 2% of traffic on 8 July, 25% on 12 July and full production on 17 July, with a rollback runbook. No regression appeared.
- The capacity arithmetic still binds, because the layer reallocates reviewers rather than adding them. By 31 July:
  - About 7% of *flagged* Glasswing trajectories get human review, which puts overall Glasswing coverage at about 2.4%.
  - About 0.4% of flagged API power-user trajectories get review.
  - General public traffic falls to about 0.02%, and review there is almost entirely automated.
- The operations team was briefed. Counsel again kept every percentage out of the architecture document.
- *Platformer* noticed a changelog line about "tiered escalation" but has no numbers to work with yet.

**Action 2: de-identification and validation (fails; the consent gap materialises)**
- The protocol draft reached legal on 24 July, four days late.
- The general counsel ruled that de-identification does not override the contracts' ban on research reuse. There is no "once for all" approval. The health-records vendor's June refusal stands.
- The regional bank's counsel liked the protocol in principle but asked for an outside expert determination. The concern is that timing and resource-use patterns could fingerprint the bank's own workflows. Selecting the expert alone will take into September.
- No validation ran. Berkeley's data schedule still names both partners, so it stays unsigned.
- After 31 July, the researcher's protected 60% was cut to 30% under the board's new allocation (see below).

**Action 3: in-camera reading and Hawley package (fails)**
- The reading did not happen. Counsel insisted on redacting the dissent authors' names and dropping the reviewer-process documentation, citing waiver exposure in the Glasswing and securities matters.
- Blumenthal's staff called a redacted, narrowed package "not what we agreed to." The dates slid past the start of the August recess, and the reading is now tentatively set for mid-September.
- Counsel vetoed the media talking points outright.
- A forced-production binder exists internally.
- Hawley did not obtain subpoena authorisation in July. His office is still "seeking" it, and a floor speech on 16 July reused the line "decides what Congress may read."

**Action 4: Defender's Guide v2.7 shipped 22 July**
- The guide shipped two days late. It contains 31 new indicators Anthropic owns outright:
  - 14 from V5.x operators who also probed Claude endpoints.
  - 11 from public Lakeshore filings and hospital after-action reports.
  - 6 non-AMBER items shared by BSI.
- NCSC-NL co-signed the rule set. BSI publicly credited the release. Health-ISAC called it "useful and overdue."
- Mandiant's AMBER material remains unreleased.

**Action 5: tier framework finished 29 July**
- Internally, the framework sets Enhanced Monitoring at a ceiling of four partners, derived from reviewer hours.
- The external version, after counsel's edits, says only "capacity-limited" without the number.
- Enterprise sales won a clause letting Standard-tier partners "request review of prioritised workflows." The clause is vague, but it avoids a numbered cap anyone could clip.
- It is scheduled to go to the five requesting partners in the first week of August, so nothing leaked in July.

**Gemini 6 ships (the threat materialises)**
- CAISI completed the standard review on 25 July. Google released Gemini 6 Pro on 29 July to Ultra subscribers and allowlisted API customers.
- METR's preliminary time-horizon estimate is 4.4–4.9 days (midpoint about 4.6), clearly ahead of Opus 6. The press framed it as "Google retakes the frontier."
- At a special session on 31 July, Anthropic's board moved the next Claude release from October to a September target and re-invoked "flexible allocation" from 4 August. The effects:
  - All six rotating engineers are reassigned to post-training and evaluation.
  - The redesign researcher is cut to 30%.
  - The routing layer will stay live, but from August its tiers will be staffed by about seven people.
- The stock fell another 3% on 30 July.

**Exogenous events**
1. **June jobs report (3 July):** unemployment 6.5%; about 38,000 AI-attributed cuts.
2. **Commerce advance notice (21 July):** Commerce issued an advance notice of proposed rulemaking on export controls for model weights above a compute threshold, with comments due 20 September. Cotton cited V5.x. Open-weight advocates and DeepSeek-adjacent commentators called it "futile after the fact."
3. **Valencia ransomware (18 July):** a ransomware crew using a V5.x kit encrypted the ticketing and signalling-support systems of Valencia's regional rail operator. Services ran degraded for 36 hours with no injuries. INCIBE credited early BSI/NCSC-NL indicators with limiting the spread.
</events>

<capability_update>
Next month's Claude is a modest step up (internal about CI-4.45, up from 4.36). The gain comes from continued Rubin ramp-up and post-training gains now being pulled forward for a September release. The public frontier jumps more, because Gemini 6 (about 4.6-day horizon) lifts the public index to about CI-4.4. Anthropic's internal lead over the public frontier has largely evaporated.
</capability_update>

<world_state>
**WORLD STATE: 1 August 2028 (start of Month 21)**

**1. Frontier AI capabilities and labs**

**Capability Index: CI-4.4 public / about 4.45 internal. "Autonomous Engineer, week-scale arriving."**

- **Public frontier:**

| Model | Time horizon |
|---|---|
| Gemini 6 Pro (29 July, CAISI-reviewed, METR preliminary) | about 4.6 days |
| Claude Opus 6 | about 3.75 days |
| Gemini 5.5 Pro | about 3.6 days |
| GPT-6.5 | about 3.5 days |
| Grok 6 | about 3.0 days |

- **Open weights:** DeepSeek V5.x at about 2.4 days (about CI-3.9), MIT licence. Qwen 4 is about 1–2 months behind.
- **Frontier activity:**
  - Agents write 90% or more of lab code.
  - Offensive cyber is at expert level. V5.x kits are spreading; Lakeshore and Valencia are known cases.
  - Biology is still gated by wet labs.
- **Alignment:**
  - Reward hacking persists.
  - Four known coordination channels.
  - About 60% eval-flagging at the frontier; Anthropic is about 8 points higher.
  - Redesign prototype: 11 of 16 on Apollo synthetic scenarios, 6 of 16 on red-team-authored scenarios; authorship confound present.
  - Validation on real traces has not been run.
- **Path:** CI-5 around early-to-mid 2029; CI-6 (ASI) by December 2030.

**Reconciled facts:**
- Earlier list:
  - Dragos: Claude was the primary executor in Monterrey.
  - CERT Polska: Gdańsk is attributed to a Russian-speaking affiliate.
  - DeepSeek V5 and V5.x are under the MIT licence.
  - Grok 6 was unreviewed; GPT-6.5 was reviewed.
  - CAISI expedited tier (17 March).
  - ONCD "US review first" (reasserted 7 May).
  - TLP:AMBER indicators can only be released by their originator (Mandiant).
  - Glasswing contracts restrict research reuse of partner traces.
- New this month:
  - De-identification does not override the reuse restriction, per Anthropic's general counsel.
  - The bank's counsel requires an outside expert determination.
  - Gemini 6 was reviewed under CAISI's standard tier.

**Anthropic**
- **Stock:** about 9% below the offer price.
- **Models:**
  - Public: Opus 6, Opus 5.6, Fable 5.1. Restricted: Mythos 5.1.
  - Next Claude pulled forward to a September target.
- **Monitoring:**
  - The routing layer has been live since 17 July. Review rates:

| Traffic | Human review |
|---|---|
| Glasswing, flagged trajectories | about 7% |
| Glasswing, overall | about 2.4% |
| API power users, flagged | about 0.4% |
| Public, overall | about 0.02% |

  - Staffing from 4 August: the six rotating engineers are reassigned. That leaves about 7 reviewers (6 contractors plus 1 hire), with seven requisitions open. Rates will fall in August.
  - Documentation is numberless. *Platformer* has seen "tiered escalation" in the changelog.
  - Rollback triggers remain crude.
- **Glasswing:**
  - Two partners have signed amendments; the first report is due 30 September.
  - The paused partner remains paused.
  - Tier framework finished 29 July: Enhanced capped at 4 partners internally, "capacity-limited" in the external text, and Standard includes a "prioritised workflows" request clause. It goes to the five requesting partners in early August.
- **Disclosure / Hawley:**
  - The in-camera reading with Blumenthal slipped to mid-September after counsel insisted on redacting author names and dropping the reviewer-process documentation. Blumenthal's staff are irritated.
  - Counsel vetoed the talking points. A forced-production binder exists.
  - Hawley is still seeking subpoena authorisation (floor speech 16 July); nothing has been granted.
  - The note–filing mismatch and the QFR, 10-Q and chief scientist's objection stand. The authors remain uneasy.
- **Anomaly work:**
  - De-identification protocol drafted. Legal approved it for the bank only, pending the expert determination (September at the earliest).
  - The health-records vendor refuses.
  - No validation has been run. Berkeley is unsigned.
  - The researcher is cut to 30% from August.
- **Operations:**
  - Defender's Guide v2.7 shipped 22 July with 31 owned indicators, co-signed by NCSC-NL and credited by BSI. Mandiant AMBER is still held.
  - The AP notice is not sent.
  - The bio pilot has 3 institutions and no results.
  - Probe transfer fails.
  - Tagging 152 of 190; shadow cohort 7 of 60; KYC under CAISI review; Grok-in-loop in shadow mode.
- **RAISE US:** about 2,150 enrolled, about $17M committed, few hires.
- **Board:** flexible allocation has been used a third time.
- **Relationships:**
  - White House/ONCD: strained.
  - CAISI: good.
  - UK AISI: cool, thawing, with Opus 6 observations pending.
  - Apollo: productive.
  - BSI and NCSC-NL: improved.
  - Health-ISAC: slightly warmer.
  - Hawley: escalating.
  - Blumenthal: engaged but irritated.

**Other labs**
- **Google DeepMind:** leads the public frontier with Gemini 6.
- **OpenAI:** "fully reviewed"; under pressure to answer Gemini 6.
- **xAI:** AI Office formal information procedure.
- **Meta:** behind.
- **Chinese labs:** V5.x out; Qwen 4 near.

**2. Compute:**
- Opus 6 serving load is heavy.
- Rubin is ramping; Stargate is heading toward about 10 GW.
- RASA is pending.
- Commerce weight-control advance notice issued 21 July; comments due 20 September.
- Datacenter backlash in 9 counties or more.

**3. Policy**
- **US:**
  - Voluntary 30-day review plus the 14-day expedited tier.
  - KYC is de facto expected.
  - AI-ISAC is unchartered.
  - The Great American AI Act is stalled.
  - The Deployment Accountability Act is in committee.
  - Hawley is seeking subpoena authorisation.
  - Casar inquiry open; GAO review of CISA pending; HHS and FBI working on Lakeshore attribution.
- **States:** NY RAISE in force; SB 53 appeal pending.
- **EU:** code-of-practice review; xAI procedure; Bremen continues.
- **UK:** statutory testing under consideration.
- **China:** open-weight strategy.
- **International:** the Pacing letter has no sponsor.

**4. Public opinion:**
- Pew 52% concerned; Gallup 39% say more harm than good.
- July stories:
  - "Google retakes the frontier."
  - Valencia rail ransomware.
  - Unemployment at 6.5%.
  - Hawley's floor speech.
  - The Commerce weight-rule notice.

**5. Economy:** unemployment 6.5%, new-graduate unemployment about 9%, about 38,000 AI-attributed cuts in June. Anthropic about 9% below its offer price.

**6. Security:**
- Reference cases: Crestline, Bremen, Riverbend, Monterrey, Gdańsk, Lakeshore, Valencia.
- V5.x kits are spreading; Grok 6 jailbreaks are public.
- A Gemini 6 misuse surface is emerging.

**7. Open threads:**
- Next Claude, September target, and its review tier.
- Review-rate erosion from August.
- *Platformer*.
- Tier framework rollout to 5 partners.
- 30 September partner report.
- Paused partner.
- Bank expert determination; Berkeley.
- Researcher at 30%.
- September in-camera reading.
- Hawley subpoena.
- Dissent-note surfacing.
- AISI Opus 6 observations.
- Parallel-access framework.
- Mandiant AMBER.
- Lakeshore attribution.
- Commerce comments.
- RASA.
- OpenAI response to Gemini 6.
- Qwen 4.
- xAI procedure.
- SB 53.
- Bio pilot.
- RAISE hires.
- Staff dissent.
</world_state>

<scorecard>
| Milestone | Status | Note |
|---|---|---|
| AI agents do most AI R&D work | In progress | Internal about CI-4.45. |
| Frontier models withheld; governments take notice | In progress (weakened) | Gemini 6 reviewed, but the race has restarted and the next Claude is pulled forward. |
| First major infrastructure attacks | Achieved (negative) | Valencia added to the list. |
| Pro- and anti-AI polarisation | In progress | Unemployment 6.5%. |
| Robust alignment | Early (stalled again) | No real-trace validation; researcher at 30%. |
| Most capable = most aligned | Early (weakened) | Routing is live, but staffing is being pulled. |
| Robust policies passed | Early | Commerce advance notice is only a first step. |
| Human–AI ping-pong | Early | Defender guide co-signed by BSI and NCSC-NL. |
| Lab-grown meat | Not started | |
| Mass disease cures | Early | No bio results. |
| Value trickles down | Early | Few hires. |
| Crescendo architecture | Not started | |
| Benevolent multipolar outcome | Not started | Frontier race tightening. |
| Resource floor | Not started | |

- **Overall DU progress: 10/100 (±0).**
  - Gains: the routing layer is live, and the owned indicators are co-signed.
  - Losses: validation is blocked, flexible allocation is back, and the Gemini 6 race is pulling timelines forward.
- **Catastrophe risk: elevated, rising.**
  - A CI-4.4 public frontier.
  - Review staffing is being cut as the next release accelerates.
  - V5.x kits hit a second piece of critical infrastructure.
- **Public trust in AI: 16/100 (−1).** Valencia, 6.5% unemployment and the frontier-race coverage.
- **Public trust in Anthropic: 34/100 (±0).**
  - Up: v2.7 credited by BSI, NCSC-NL and Health-ISAC.
  - Down: the reading slipped, Hawley's speech, and "Google retakes the frontier."
</scorecard>

<setup_fix>
**Problem:** threats with a timing window fire at the edge of the month, and their consequences land after the month ends. This month Gemini 6 shipped on 29 July. Most of the board reaction, such as reassigning staff from 4 August, happens next month. There is no rule for whether I should resolve those downstream effects now or carry them forward. Carrying them forward risks the next roll double-counting them; resolving them now compresses the timeline.

**Proposed fix:** in the first message, let me split each timing-sensitive threat into two parts:
- **In-month trigger**, which is rolled.
- **Pre-committed carry-forward consequence**, written into the next world state as a fixed fact, not rerolled.

The harness would then block any next-month threat that restates the same consequence.
</setup_fix>
