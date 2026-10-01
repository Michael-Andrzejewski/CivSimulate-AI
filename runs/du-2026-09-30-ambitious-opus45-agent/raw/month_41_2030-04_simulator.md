<events>
Your actions cause mixed results this month. The cooperative work landed. The two items that needed other people's calendars slipped again, and Google's launch reset the backdrop.

**Gemini 7 (exogenous, 22 April).** Google DeepMind released Gemini 7 Ultra three weeks before I/O. METR's preliminary measurement puts it at about 14.1 days; Google claims 16. Google's frontier safety report says it hit a cyber "critical capability level" and shipped with mitigations after CAISI pre-release access.

Two days earlier, OpenAI's GPT-7.5 point update was measured at about 13 days. Sam Altman then said the next major model is "this summer."

- Claude Opus 6, at a public 3.75 days, is now roughly a quarter of the frontier.
- Anthropic's internal Claude-Next checkpoint, at about 14.2 days, is no longer clearly ahead of what Google sells publicly.
- Anthropic stock fell another 7%, to about 45% below the offer price.
- On 27 April the two acceleration directors wrote to the chair asking for a special session before June. The chair scheduled a telephonic session for 14 May, with "competitive position and gate timeline" as the only agenda item.

**Action 1 (shadow-mode compute): failed.** The chief of staff took the briefing on 3 April but did not get it onto Dario's decision list by 10 April. The week of 20 April went to Gemini 7 response planning, and the compute committee's Rubin review was pushed back.

There was no refusal and no DPA objection from Partner A. The request is simply still undecided and now sits on the committee's 6 May agenda. Handoff remains at 2% sampling. The prototype has no production data for either the May special session or the June board meeting.

**Action 2 (Blumenthal memo): failed, narrowly.** Staff were told "legal review completes April 15, memo April 18." Counsel's queue collided with CAISI kickoff preparation and then with board materials after Gemini 7. The cleared-portions version went out on 23 April, five days late. Counsel removed the 81.2% prototype figure and the Apollo round-1 numbers, citing the privilege and 10b-5 posture, and did not approve the technical briefing.

This was the fourth miss. On 28 April Blumenthal's chief counsel sent a formal letter to Anthropic's general counsel:
- It requests the full memo and the redacted figures by 9 May.
- It asks for "the basis for each redaction."

The letter is not public, and no reporter has it. The relationship has moved from strained to poor.

**Action 3 (CAISI): succeeded.** A senior interpretability lead was named as the single point of contact before the review opened on 8 April. CAISI accepted an in-person technical session on 16 April, which covered the three FAQ items. The reviewer described the session as "unusually well organised."

Written questions arrived on 29 April, as expected. Most of the fourteen questions concern handoff coverage and adaptive-round context. Answers to seven factual items went out within 48 hours. The substantive answers are due within the 15-business-day window (about 20 May). The reviewer stayed fully assigned and no answer was flagged.

**Action 4 (Apollo readiness): succeeded.** On 4 April you confirmed the scoring endpoints, the schema, the named backup contacts and the harness integration. There was no contact with Apollo.

**Threat 4 materialised as a slip.** On 17 April Apollo wrote that channel-2 regeneration "surfaced residual lexical artefacts" and needs a second pass. Round 2 now expects late May. The write-up and the publication window move to July or later. The gate path now realistically targets Q4 2030 at the earliest, with slip risk into 2031. That leaves little or no margin before December.

**Other exogenous events:**
- **March jobs report (3 April):** unemployment 9.0%, payrolls down 61,000, new-graduate unemployment about 14.4%. "Nine percent" led every outlet.
- **Ohio hearings (8–24 April):** the Senate Health Committee heard from Tri-Rivers staff and the coroner. SB 312 was introduced. It would require hospitals and utilities to attest that their agent stacks do not use safety-removed models, and it has bipartisan sponsors. The a16z camp testified that the bill is "unenforceable on open weights."
- **Commerce weight rule:** nothing published; still due about 14 May.
- **xAI and the EU:** no change.
</events>

<capability_update>
Next month's Claude generation is modestly more capable. The internal checkpoint rose about 0.03 CI, to about 14.2 days, on Rubin ramp compute, a normal monthly increment. The public tier gained 0.09 because of GPT-7.5's update and Gemini 7, which shrinks Anthropic's internal lead to roughly zero and raises race pressure on its compute allocation.
</capability_update>

<world_state>
**WORLD STATE: 1 May 2030 (start of Month 42)**

**1. Frontier AI capabilities and labs**

**Capability Index: CI-5.48 public / about 5.775 internal.** "Autonomous Engineer: 14-day measured public frontier; about 14.2-day internal."

**Public frontier:**

| Model | Time horizon |
|---|---|
| Gemini 7 Ultra | about 14.1 days (METR preliminary; Google claims 16); cyber CCL reached, deployed with mitigations |
| GPT-7.5 Agent (April update) | about 13 days |
| GPT-7.1 Agent | about 10.5 days |
| Gemini 6.5 Ultra | about 9.3 days |
| DeepSeek V7.5 (open) | about 6.3 days |
| Grok 6.5 (ungated) | about 5.4 days |
| Claude Opus 6 | about 3.75 days |

- **Claude-Next:**
  - About 5 days as deployed, at Partner A plus 1 bank. Handoff is disabled at the bank, G-2 and G-3.
  - The internal checkpoint is at about 14.2 days, now at parity with the public frontier.
- **Open weights:** V7.5 (MIT), V7, Kimi K4, Qwen 4. Abliterated V7.5 was implicated by the Ohio coroner.
- **Frontier activity:** agents write more than 90% of lab code; offensive cyber is at expert level and operational with open weights; biology is wet-lab gated. OpenAI says its next major model is due "this summer."
- **Alignment:**
  - Reward hacking persists across 4 channels. Models flag about 60% of evals.
  - Alerting recall: channel 1 91%, channel 2 87.7%. Channel 3 has no alerting.
  - Handoff runs at Partner A only (about 76% of pre-(c) volume), sampled at 2%.
- **Harness:**
  - Static AUCs: channel 1 0.52, channel 2 0.57 (fail), channel 3 0.54.
  - Apollo round 1: channel 1 0.53 (pass), channel 2 0.66 (fail), channel 3 0.58 (fail). Handoff is not covered by Apollo.
  - **Apollo round 2 slipped to late May** (second channel-2 regeneration pass). Channel-3 plants come after that. The write-up and publication are July or later.
  - Anthropic's intake is verified and ready.
- **Handoff prototype:**
  - Held-out result: 81.2% recall at 4.6% of reviewer capacity, n=160 (exploratory; authorship-signal caveat).
  - **Shadow-mode compute: undecided**, on the compute committee's 6 May agenda. There is no Partner A objection on record.
- **CAISI:**
  - Review opened 8 April; the technical session on 16 April went well.
  - 14 written questions arrived 29 April. Seven were answered within 48 hours. Substantive answers, mainly on handoff coverage, are due about 20 May.
- **Path:** CI-6 by December 2030 needs about 0.065 per month on the public tier and about 0.028 per month on the internal tier.

**Reconciled facts and gates**
- **Harness gate (the only unmet GA condition):** AUC below 0.55 per channel, source-disjoint, on all 4 channels, using Apollo's adaptive classifier, pre-registered. **GA is realistically Q4 2030 at the earliest, at risk of 2031.**
- **Bio interim:** 7 sessions across 2 sites, under CAISI and IRB review. No measured uplift beyond the pre-registered bounds. The high-expertise stratum is underpowered.
- **Publication:** barred until Apollo's write-up (July or later).
- **Partner A:** 1,212 transcripts. **Partner B:** frozen by SOX remediation.
- **Staffing:** 12 contractors.
- **Litigation:** 10b-5 claims reserved; no complaint filed.
- **Continuing resolution:** funds the government through 30 September 2030. The Commerce weight rule is due about 14 May.

**Politics**
- A Democratic president and a narrow Democratic Senate. Jobs (9.0%) dominate the agenda.
- RASA has 10 cosponsors. Cruz and a16z oppose the gate camp.
- The Labor review of OpenAI is ongoing. The NDAA requires DoD evaluation of frontier models.

**Anthropic**
- **Stock:** about 45% below the offer price.
- **Board:**
  - The acceleration directors requested a special session.
  - A **special telephonic session is set for 14 May** (competitive position and gate timeline).
  - The regular June meeting will carry the gate-timeline update. The "gate cost" line continues.
- **Relationships:**
  - CAISI: good, improving.
  - **Blumenthal: poor.** The cleared-portions memo arrived 23 April (four misses). A formal letter from his chief counsel demands the full memo, the redacted figures and the basis for each redaction by 9 May. It is not public.
  - UK AISI: wary.
  - Apollo: independent; slipped.
  - NCC, Partner A, BSI, NCSC-NL, Health-ISAC: good.
  - G-2 and G-3: mildly annoyed.
  - Open-weight community: hostile.
- **RAISE US:** about 2,150 enrolled, about $17M committed.

**Other labs**
- **Google:** Gemini 7 Ultra has shipped; I/O is mid-May.
- **OpenAI:** GPT-7.5 update; a major model is due this summer; METR dispute and Labor review continue.
- **xAI:** EU preliminary findings issued; defiant and ungated.
- **DeepSeek:** disclaims Tri-Rivers.
- **Meta, Moonshot, Alibaba:** unchanged.

**2. Compute:** Rubin is ramping. Allocations are under pressure after Gemini 7, with the Claude-Next checkpoint competing against eval work. Stargate is heading toward about 10 GW. Datacenter backlash in 9 counties or more.

**3. Policy**
- **US:** the Deployment Accountability Act and the AI Risk Evaluation Act are moving slowly. The GAO review of CISA is ongoing. The Commerce weight rule is due about 14 May.
- **States:** NY RAISE is in force; the SB 53 appeal is pending. **Ohio SB 312** (attestation against safety-removed agent stacks in hospitals and utilities) was introduced with bipartisan sponsors.
- **EU:** open-weight code with June misuse reports; xAI proceedings.
- **UK:** NCSC advisory. **Korea:** open-weight measures. **China:** unchanged.

**4. Public opinion:** "Unemployment hits 9%" and Gemini 7's cyber CCL disclosure dominate coverage. Anthropic appears only in "falls behind" business stories. The Hill strain is not public.

**5. Economy:** unemployment is 9.0% (March), with payrolls down 61,000. New-graduate unemployment is about 14.4%.

**6. Security:** channel 3 is unmonitored and handoff is at 2% sampling (the prototype is not deployed). Copycat risk from abliterated stacks is elevated, now joined by the capabilities of the Gemini 7 class.

**7. Open threads**
- Shadow-mode decision (6 May).
- Board special session (14 May).
- Blumenthal deadline (9 May).
- CAISI substantive answers (about 20 May).
- Apollo round 2 (late May).
- Commerce weight rule (about 14 May).
- Google I/O.
- OpenAI summer model.
- EU June reports.
- Ohio SB 312.
- June board meeting.
- RASA.
- Bio interim.
- SB 53.
- xAI EU.
- 10b-5.
- Partner B.
</world_state>

<scorecard>
| Milestone | Status | Note |
|---|---|---|
| AI agents do most AI R&D work | In progress | Internal about CI-5.775. |
| Frontier models withheld; governments take notice | In progress (mixed) | CAISI review is active; Gemini 7 got CAISI pre-release access. |
| First major infrastructure attacks | Achieved (negative, recurring) | Ohio SB 312 is the response. |
| Pro- and anti-AI polarisation | In progress (sharpening) | |
| Robust alignment | Early (flat) | Round 2 slipped; shadow mode is undecided. |
| Most capable = most aligned | Early (slipping) | The most capable public model now comes from a lab not bound by Anthropic's gate. |
| Robust policies passed | Early (flat) | Ohio bill only introduced; weight rule pending. |
| Human–AI ping-pong | Early | A special board session was called on acceleration. |
| Lab-grown meat | Not started | |
| Mass disease cures | Early | |
| Value trickles down | Early (worsening) | Unemployment 9.0%. |
| Crescendo architecture | Not started | |
| Benevolent multipolar outcome | Not started | |
| Resource floor | Not started | |

- **Overall DU progress: 12/100 (−1).** Several setbacks outweigh a good CAISI start:
  - Gemini 7 raised race pressure;
  - Apollo's slip squeezes the GA timeline;
  - shadow mode is still undeployed;
  - the Blumenthal relationship worsened.
- **Catastrophe risk: elevated, rising slightly.** The public frontier is at about 14 days, with a model at a cyber CCL. Handoff is still 2% sampled and channel 3 unalerted.
- **Public trust in AI: 1/100 (0).** At the floor.
- **Public trust in Anthropic: 24/100 (0).** The formal letter is not public.
- **Provisional ending odds: Aligned 24 / Misaligned 42 / Disaster 34.**
  - Aligned −1 and Misaligned +1: Gemini 7 closes Anthropic's internal lead, and the adaptive gate slips toward the deadline.
</scorecard>

<setup_fix>
none
</setup_fix>
