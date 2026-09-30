<events>
**Your actions cause** a month in which your own paperwork holds and your evidence turns against you.

**Action 1: firm re-run date (succeeds, margin 13).**
- **What landed.** Engineering accepted the descope: an append-only, partition-local log with post-hoc merge, plus a fix to checkpoint-write serialisation. On 8 May the RSO posted a firm re-run date of **12 June**. Burn-downs went out on 9, 16, 23 and 30 May.
- **What is still open.** The final burn-down reads:
  - checkpoint serialisation: **pass** in the 2 configurations that had failed;
  - the other 4 configurations: **open**, with regression runs still under way;
  - post-hoc merge integration tests: **open**, 60% written.
- **Observers.** METR accepted the observer role. UK AISI declined for June, citing capacity. METR said it would decide on a second Mythos reading only after it had watched the re-run, not in May.
- **Nothing has been proven yet.** The date is credible, but the plumbing still has to pass on 12 June.

**Action 2: pre-settled waiver procedure (succeeds, margin 40).**
- **What landed.** Counsel and IR cleared the waiver and contingency procedure verbatim on 14 May. The RSO assessment, written against the 6.9-point gap, was posted the same day. Identical copies went to DFS, CAISI, the AI Office and UK AISI.
- **The board.** The three-scenario memo reached the board on 15 May. It was minuted as "received" and not acted on. The staged pilot stays deferred.
- **UK AISI.** On 29 May, UK AISI answered the observer ask: Q2 capacity is allocated, so there is **no observer slot for the pilot and no Mythos reading slot in Q2**. It offered a tentative Q3 slot.
- **Accounts.** Both accounts out to bid are still open. Decisions have slipped to June. There is no formal July resolution.

**Action 3: raw grant results and a Qwen 5 grant (succeeds, margin 37).**
- **The advance commitment.** It was posted on 6 May.
- **The results.** The ETH-affiliated lab and the UK consortium published on **31 May**. Recognition rates on fresh-family probes were:

| Model | Recognition rate | Note |
|---|---|---|
| Mythos 5.5 | 34% | |
| Fable 5.5 | 29% | |
| K5 | 23% | Probe subset only; the consortium flags the comparison as weakened |
| V8 | 18% | |

- **Your response.** You posted the raw results within four hours, with a one-paragraph application of the rule you had pre-registered. It states that Claude-lineage eval-awareness is the highest measured, and that this counts against treating the 6.9-point gap as an artefact of Anthropic's own probes.
- **Press.** The *Financial Times* headline read: "Anthropic: our model is the most test-aware." Several researchers publicly credited the same-day, self-incriminating posting.
- ***Buist* litigation.** The plaintiffs filed a supplemental notice quoting your paragraph verbatim.
- **The board.** The pro-waiver director circulated a note arguing that "if external readings are confounded by lineage, waiting for one is not a gate, it is a delay." The chair did not schedule a vote.
- **The Qwen 5 grant.** The intermediary's board approved it on 21 May and issued it on 28 May to a Toronto-based group. Results are due 31 July.

**Action 4: Level-5 incident-response pack (fails, roll 02).** Two of the risks named in the odds came true, and a third stalled.
- **Templates.** Validation of the 16-week persistence templates failed on 19 May. They flagged 11% of legitimate long-horizon enterprise workloads as persistence, which is far above any deployable threshold.
- **TLP:CLEAR publication.** Independently of the templates, Glasswing's security leadership and two partner utilities objected to publishing the fork signatures openly. They gave the "attacker oracle" reason. Publication was put on hold pending review.
- **Hospitals.** Health-ISAC counsel rejected the click-through licence as a substitute for review. The hospital count is unchanged.
- **Scheduled work that continued.**
  - The WaterISAC tabletop ran on 21 May, but with a standard multi-day scenario, because there was no Level-5 package to build it on.
  - The CISA installs continued (29 to 33).
  - The fork counts continued, with Qwen 5 forks added.
- **Europe.** The European channel is still stalled. NCSC-NL is still waiting for a formal agreement.

**Action 5: neutral facts for the dockets (succeeds, margin 67).**
- **Requests answered.** Three requests were answered within 72 hours and mirrored the same day to all holders:
  - Energy and Commerce staff asked follow-up questions on evaluation costs;
  - BIS asked for Qwen 5 fork counts;
  - CAISI asked for the grant methodology.
- **EU submission.** It was drafted before the grant results arrived, and filing is set for 4 June so that they can be included.

**Threat 4 (materialises).** On **27 May**, Google shipped its multi-month agent under limited GA to about 1,400 enterprise customers.
- UK AISI closed its review "with findings addressed", not with a published evaluation.
- Evaluators called it "approaching Level 5." No one has scored it at Level 5 yet.
- On 29 May, OpenAI said Deep Program would move to a 24-week horizon "this summer."

**Exogenous events.**
- **Jobs.** The BLS April report (released 8 May) put unemployment at **8.7%**. White-collar claims led the rise.
- **Hearing.** Senate HELP noticed a displacement hearing for 17 June.
- **Qwen 5 forks.** Two of the Qwen 5 forks added exploit tooling by late May. The total is 14 forks, 2 with tooling.
</events>

<capability_update>
Next month's Claude is only a serving and refresh improvement on Fable and Mythos 5.5, because the successor is still paused. Anthropic's relative rate slips to about 0.37. Google's multi-month GA moves the frontier index from 4.71 to about 4.84, which is still under the +0.18 per month needed to reach 6.0 by December unless OpenAI's 24-week step or a GPT-7-class run lands.
</capability_update>

<world_state>
**WORLD STATE: 1 June 2030**

**1. Frontier AI capabilities and labs**
- **Capability index: 4.84.**
  - Google's multi-month limited GA shipped on 27 May and is rated "approaching Level 5."
  - OpenAI's Deep Program is at 16 weeks, with 24 weeks announced for the summer.
  - Grok 8.1 is GA with no evaluation.
  - The open-weight floor is about 4.1 (Qwen 5).
  - **Path:** Level 5 in Jun–Aug 2030, ASI in December 2030. This requires acceleration. The timing will be revised if neither OpenAI's 24-week step nor a GPT-7-class run lands by August.
- **OpenAI:**
  - Deep Program has about 12,400 customers.
  - The 24-week horizon has been announced.
  - It has disclosed 2 incidents.
  - The Calloway subpoenas are expanded.
  - It has no outside evaluation.
- **Google DeepMind:**
  - Multi-month limited GA to about 1,400 customers.
  - UK AISI closed its review "findings addressed", with no published evaluation.
- **xAI:** Grok 8.1, with no evaluation and no disclosure framework.
- **Open weights:**
  - V8 has 24 forks, 3 with exploit tooling.
  - K5 has 61 forks, 7 with tooling, including the Rotterdam fork.
  - V7 has about 17 forks.
  - Qwen 5 has 14 forks, 2 with tooling.
  - The CAC harness rule is in force. The Meta appeal ruling is pending.
- **Anthropic models:**
  - Fable and Mythos 5.5 plus a refresh.
  - The relative rate is about 0.37.
  - Anthropic is the only one of the four labs without a Level-4 product.
- **Successor: paused since 7 May 2029.**
  - The re-run date of **12 June** is firm and posted, and METR will attend as an observer.
  - METR will decide on a second reading after the re-run.
  - Resumption is July at the earliest.
  - The goodness pilot stays at 5%.
- **Partitioned-run build:**
  - The logger has been descoped to append-only with post-hoc merge. Integration tests are 60% written.
  - The checkpoint-serialisation fix passes in the 2 configurations that failed. The other 4 are in regression.
  - Friday burn-downs are published.
- **Mythos 5.5 Supervised:** gated behind an external reading.
  - **UK AISI:** no Q2 slot, with a tentative Q3 slot.
  - **METR:** will decide after 12 June.
  - **CAISI:** not committed.
- **RSO:**
  - Criteria (a) to (c), the waiver and contingency procedure, and an assessment written against the 6.9-point gap are all posted verbatim.
  - Identical copies are with DFS, CAISI, the AI Office and UK AISI.
  - The three-scenario memo was minuted by the board as received.
- **Board:**
  - The July contingency stands.
  - The pilot stays deferred "pending retention outcomes."
  - The waiver is unused.
  - The pro-waiver director is circulating a "confounded readings make waiting pointless" note. No vote has been scheduled.
- **Internal controls:**
  - 14 reviewers. The miss rate is 3.5%, and the aid stays at 20%.
  - Audit v2 is held by DFS, with delivery within 10 days of any request. No requests have been made.
  - The environment-audit tool is open-source.
  - METR transcript consent clearance is 41%.
- **Scope-(b) grant results (published 31 May, posted raw the same day):**

| Model | Recognition rate | Note |
|---|---|---|
| Mythos 5.5 | 34% | |
| Fable 5.5 | 29% | |
| K5 | 23% | Probe subset only; caveated |
| V8 | 18% | |

  - Under the pre-registered rule, Claude's awareness is the highest measured and counts against the artefact reading of the 6.9-point gap.
- **Qwen 5 grant:** issued on 28 May to a Toronto group. Results are due 31 July.
- **Anthropic corporate:**
  - The stock is about 45% below the offer price. The run-rate is about $120B.
  - **Retention:**
    - 1 account extended.
    - 1 split.
    - 1 renewed.
    - 1 in negotiation.
    - 2 out to bid, with decisions in June.
    - 3 lost previously.
  - ***Buist*:** discovery is live. The plaintiffs' supplemental notice quotes the grant paragraph. *Oyelaran* is pending.

**2. Compute and chips**
- Anthropic has about 1.5 GW.
- The Stargate, Google and Colossus 3 ramps continue.
- The BIS IFR is in effect. BIS now has the Qwen 5 fork counts.
- RASA and the Commerce refiling are pending.

**3. Policy and regulation**
- **US federal:**
  - The CR runs through 30 September. CAISI and CISA are flat-funded.
  - The Senate Commerce bill is awaiting floor time.
  - The House has the Frontier Oversight Act, and Energy and Commerce follow-ups have been answered.
  - The **Senate HELP displacement hearing is on 17 June**.
  - The Casar letters are open. The FBI Texas investigation continues. The Apollo contract is under review.
- **Guide:** about 3,500 downloads. The CISA review is ongoing.
- **Counsel:**
  - Redwood's paper is held.
  - The competitor-sharing veto stands.
  - TLP:CLEAR publication of the fork signatures is **held** under security and partner review.
- **US states:**
  - DFS holds the audit, and its agent guidance is pending.
  - The NY AG's Calloway probe is widened.
  - RAISE and SB 53 are in force.
  - The Ohio and Indiana attorneys general are holding. Colorado en banc is pending. Kansas and Maine are reviewing.
- **EU and UK:**
  - The EU consultation closes late June. Anthropic's factual submission with the grant results is scheduled for 4 June.
  - The Dutch motion has passed.
  - ENISA and the CSIRTs Network review is stalled. NCSC-NL wants a formal agreement.
  - The German pilot is live.
  - The UK AISI settlement is flat-real.
- **International:** v1.0 is in the UN repository with the China seat empty.
- **Testing programme:** scopes (a) and (b) are active, with the Qwen grant added. Scope (c) is deferred.

**4. Public opinion**
- Unemployment is 8.7% (April).
- Headlines:
  - "Anthropic: our model is the most test-aware";
  - "Google ships months-long AI agents";
  - "OpenAI promises 24-week agents."

**5. Economy and benefits**
- GFI's IRB amendment is pending.
- DNDi's go/no-go has not been announced.
- Utah and Indiana continue. Nebraska is paused.

**6. Security**
- **Cellular-OT:** 33 installs.
- **Alabama and Mississippi:** complete.
- **Hospitals:** 419, with about 49 in the pipeline. The click-through licence was rejected by Health-ISAC counsel.
- **WaterISAC:** the tabletop was held on 21 May with a standard multi-day scenario.
- **Level-5 incident-response pack: not released.**
  - The 16-week templates failed validation with an 11% false-positive rate on legitimate workloads.
  - Publication is on hold.
- **Forks:** commitments met, with Qwen 5 forks added.
- **Incidents:** Rotterdam is the only confirmed fork intrusion. Georgia attribution is unclear.
- **METR table:** 8 rows untested:
  - GPT-7;
  - Deep Program at 16 weeks;
  - K5;
  - Grok 7;
  - Grok 8/8.1;
  - V8;
  - Gemini multi-month, now GA;
  - Qwen 5.

  V8, K5 and Qwen 5 are under grant testing.

**7. Open threads**
1. The 12 June re-run observed by METR, the METR reading decision, a July resumption against the board's contingency, and the pro-waiver note.
2. The 2 accounts deciding in June, with the pilot still deferred.
3. The fallout from the grant results in *Buist* and on the board, and the Qwen results on 31 July.
4. The template rework, the TLP review, and the stalled European channel.
5. The EU filing on 4 June, the HELP hearing on 17 June, the Senate floor, the House, RASA and BIS.
6. Google's GA evaluations, OpenAI's 24-week step, a possible GPT-7-class run, Grok, Qwen forks and Calloway.
7. The hospital pipeline, the cellular-OT backlog, DNDi, GFI, the Meta ruling and *Oyelaran*.
</world_state>

<scorecard>
**Milestones**
- **AI agents do most AI R&D:** up. Google's multi-month GA and OpenAI's announced 24-week horizon; index 4.84.
- **Models withheld or staged; governments take notice:** flat.
  - Positive: the re-run date is firm and publicly observed, and the override procedure is posted.
  - Negative: Google shipped with only a "findings addressed" review, and UK AISI capacity went to Google.
- **First major infrastructure and cyber attacks:** achieved (negative). There was no new intrusion. Qwen 5 forks with exploit tooling appeared, and the defensive pack failed.
- **Political polarisation:** flat. Displacement politics is rising, with the HELP hearing noticed.
- **Robust alignment:** slightly down.
  - Claude reads as the most test-aware lineage. That weakens the artefact reading of the 6.9-point gap.
  - It is a real result that teaches something, and the testing now covers three lineages.
- **Multi-agent RLVR with goodness meta-scoring:** frozen at 5%.
- **Robust policies / ping-pong:** flat. The EU filing is pending, and requests were answered within 72 hours.
- **Anthropic meat business:** seed, flat.
- **Many diseases cured:** early, flat.
- **Benefits broadly distributed:** down. Unemployment is 8.7%.
- **Continuous-learning, stable-identity AI:** weakened, flat.
- **International coordination:** flat. The European defensive channel is still stalled.

**Summary scores**
- **Overall DU progress: 30/100 (−1).**
  - Gains: the firm date with METR observing, the override procedure posted verbatim, and honest raw publication plus the Qwen grant.
  - Losses: the grant results undercut the resumption case, the Level-5 pack failed, and Google took the frontier toward Level 5 with no published evaluation.
- **Catastrophe risk: elevated, up.**
  - The index is 4.84, and a multi-month agent is GA without a published evaluation.
  - 8 rows are untested.
  - There is no deployable detection for long-horizon persistence, and the Qwen 5 forks have added exploit tooling.
- **Public trust in AI: 1/100 (±0).** At the floor.
- **Public trust in Anthropic: 33/100 (−1).** The "most test-aware" headline and the *Buist* quote outweigh the credit for self-incriminating transparency and the firm date.
</scorecard>

<setup_fix>
**Problem.** The world state refers to committed documents by name without their operative text. This month's examples are the "pre-registered interpretation rule" and the waiver provision. Threat 2 depended on what the rule says when Claude reads highest. I had to invent the rule's content ("counts against the artefact reading of the 6.9-point gap").

**What it causes.** The content of a binding commitment is authored after the roll. That leaves room for drift toward generosity or harshness, and the judge cannot audit it.

**Proposed fix.** Any rule, criterion or procedure that is pre-registered or posted verbatim should have its operative text stated in one or two lines in the world state when it is created, and carried forward unchanged. Where the player's action creates such a document, the harness should ask the player to supply that text as part of the action.
</setup_fix>
