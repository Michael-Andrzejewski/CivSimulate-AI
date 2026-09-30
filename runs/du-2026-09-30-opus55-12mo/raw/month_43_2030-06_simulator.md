<events>
**Your actions cause** the 12 June re-run to go ahead as scheduled, with METR observing. The last 40% of the merge integration tests landed on 9 June. The four regression configurations cleared on 10 June. On the day, **all six configurations pass.**

- The note you posted on 5 June set the merge interval at 6 hours and the maximum detection latency at about 6.5 hours. No run crossed that bound, and no automatic halt fired.
- The pass/fail post went up on 13 June.
- METR's observer note on 20 June confirms the run "executed as described." It adds two limitations:
  - Detection at merge time rather than live is a material limitation for agents whose action windows exceed six hours.
  - The run did not test adversarially induced divergence.
- METR has agreed to a second reading, with a window of 22–31 July. METR will scope the method itself, and its written output is expected in mid-August.
- The "own plumbing" objection is therefore closed. The gate now resolves after the board's July contingency date, not before it.

**The RSO memo (Action 2)** was posted on 3 June after Investor Relations edited it. "Observed by METR or CAISI" became "an external observer to be agreed."
- **CAISI** acknowledged receipt and made no commitment.
- **METR** said it may treat readings from eval-recognition probes as supplementary evidence inside its July scope, but not as gate evidence.
- The white-box option was not publicly rebutted. No board vote was scheduled in June, and the contingency stands unchanged.

**The pilot half of the memo failed.**
- **DFS declined on 11 June.** Observing a commercial pilot is outside its Part 500 remit. It will receive reports under the existing notice.
- **Both accounts went elsewhere.**
  - A Fortune 50 insurer chose Gemini's multi-month GA on 18 June.
  - A European pharmaceutical group chose OpenAI's Deep Program on 26 June.
- Five long-horizon accounts are now lost.
- The board minuted the pilot as "not pursued; retention condition unmet."
- The pro-waiver director revised the note to read: "the gate now lands after the contingency; the retention case is closed."
- The stock closed June about 52% below its offer price.

**The defence pack shipped in pieces (Action 3).** On 9 June Glasswing published three items under an open licence: the containment runbook, the credential-revocation checklist for multi-week agents, and the tabletop kit. They were downloaded about 2,300 times in three weeks.
- Of 41 detection templates, only **7 hunting queries** validated below 1% false positives, and those shipped. The other 34 went out as analyst-review leads.
- Fork signatures went out at TLP:AMBER through CISA, MS-ISAC, WaterISAC and Health-ISAC on 11 June. The TLP:CLEAR request was withdrawn.
- **Hospitals:** Health-ISAC's own member template was signed on 19 June. Twenty-two hospitals were onboarded, bringing the total to 441.
- **Netherlands:** counsel cleared NCSC-NL's standard agreement, which was signed unmodified on 25 June. The first exchange is set for July.
- **ENISA:** the CSIRTs Network channel remains stalled.

**The eval-awareness write-up (Action 4)** was published on 16 June, but only as a public post.
- Counsel's standing veto on direct transmission to competitors, and the *Buist* exposure, removed the simultaneous sends and the engineering-help offers.
- Government Affairs separately blocked any contact with DeepSeek, Moonshot or Alibaba.
- Counsel narrowed two causal paragraphs from "training environments teach recognition" to "consistent with."
- On 23 June a Washington outlet ran "Anthropic weighed sending safety research to DeepSeek" from a leaked planning draft. Two China-hawk senators issued statements.
- The *Buist* plaintiffs added the paper to their discovery requests within a week.
- Uptake was mixed:
  - Forks of the open-source environment-audit tool rose from about 90 to about 310.
  - A Google DeepMind alignment researcher posted that the team had run the tool on "a subset" of environments.
  - OpenAI and xAI declined to comment.
  - The Chinese labs made no public response.

**The dockets (Action 5).**
- The EU factual submission was filed on 4 June. The AI Office's end-of-consultation summary (29 June) cites the lineage fork counts.
- The occupational data from the Economic Index was posted on 14 June. On 17 June the HELP chair and ranking member both quoted it, to opposite ends.
- All seven agency requests were answered within 72 hours and mirrored to every holder, including BIS's question on Qwen 5 fork counts.

**Exogenous events:**
1. **5 June:** the BLS reports May unemployment at **8.9%**. The HELP hearing becomes a displacement hearing. Two bills for AI displacement insurance are introduced in the Senate on 18 June.
2. **24 June:** OpenAI rolls out a limited **24-week Deep Program** tier to about 700 existing customers, with no outside evaluation. Rep. Casar sends a fourth letter.
3. **30 June:** METR's periodic frontier update places Gemini's multi-month GA at its Level-5 autonomy threshold on public long-horizon suites. The assessment used limited API access and was not a full evaluation.
</events>

<capability_update>
Next month's Claude is a modest refresh (+0.02 relative), fine-tuning and scaffolding on the Mythos 5.5 base only. The successor stays paused until METR's reading in late July at the earliest, so the relative rate falls to about 0.35. The frontier moves to 5.02 on Google's Level-5-threshold rating and OpenAI's limited 24-week tier.
</capability_update>

<world_state>
**WORLD STATE: 1 July 2030**

**1. Frontier AI capabilities and labs**
- **Capability index: 5.02 (Level 5 threshold reached).**
  - METR's 30 June update rates Gemini's multi-month GA at Level 5 on public long-horizon suites. This was limited access, not a full evaluation.
  - OpenAI's 24-week tier is in limited rollout to about 700 customers.
  - **Frontier descriptor:** agents run 4- to 6-month engineering and research programmes with sparse human checkpoints, and do most internal AI R&D at Google and OpenAI.
  - **Path:** 5.20 in July (24-week GA plus a GPT-7-class pre-training run finishing), 5.38 in August, then onward to ASI in December 2030.
- **OpenAI:**
  - Deep Program has about 12,600 customers, with the 24-week tier limited to about 700.
  - It has disclosed 2 incidents and has no outside evaluation.
  - The Calloway subpoenas are expanded.
  - Casar's fourth letter is open.
- **Google DeepMind:**
  - Multi-month GA to about 1,650 customers, up from about 1,400.
  - UK AISI's review is "findings addressed," with no published evaluation.
  - METR has given a threshold rating.
  - It says it has run the environment-audit tool on a subset of environments.
- **xAI:** Grok 8.1, with no evaluation and no disclosure framework. No comment on the paper.
- **Open weights (floor about 4.2):**
  - V8 has 26 forks, 3 with exploit tooling.
  - K5 has 63 forks, 7 with tooling, including the Rotterdam fork.
  - V7 has about 17 forks.
  - Qwen 5 has 19 forks, 3 with tooling.
  - The CAC harness rule is in force. The Meta appeal ruling is pending.
- **Anthropic models:**
  - Fable and Mythos 5.5 plus a refresh.
  - The relative rate is about 0.35.
  - Anthropic is the only one of the four labs without a Level-4 or Level-5 product.
- **Successor:** paused since 7 May 2029.
  - **12 June re-run: all 6 configurations PASSED, with METR observing.**
    - Merge interval: 6 hours. Maximum detection latency: about 6.5 hours, with an automatic halt beyond the bound.
    - METR's note (20 June) says it "executed as described" and lists two limitations: detection at merge time rather than live, and no test of adversarial divergence.
  - **METR's second reading:** the window is 22–31 July, with METR scoping the method and written output in mid-August. Probe readings may count as supplementary evidence only.
  - Resumption is mid-August at the earliest. The goodness pilot stays at 5%.
- **Mythos 5.5 Supervised:**
  - The pilot has been minuted "not pursued."
  - UK AISI holds a tentative Q3 slot.
  - CAISI is not committed.
- **RSO:**
  - Posted verbatim: criteria (a) to (c), the waiver procedure, the gap assessment, the latency note (5 June), and the white-box memo (3 June).
    - Investor Relations edited the white-box memo so that the observer reads "to be agreed."
  - Copies are with DFS, CAISI, the AI Office and UK AISI.
- **Board:**
  - The July contingency stands, and no vote has been scheduled.
  - The retention condition has resolved as unmet.
  - The pro-waiver note has been revised: "the gate lands after the contingency; the retention case is closed."
  - The waiver is unused.
- **Internal controls:**
  - 14 reviewers. The miss rate is 3.5%, and the aid stays at 20%.
  - DFS holds audit v2, with no requests made.
  - The environment-audit tool is open-source, with about 310 forks.
  - METR transcript consent clearance is 41%.
- **Scope-(b) grant results:**

| Model | Recognition rate |
|---|---|
| Mythos 5.5 | 34% |
| Fable 5.5 | 29% |
| K5 | 23% |
| V8 | 18% |

- **Eval-awareness paper:**
  - Published on 16 June, public only. Counsel narrowed the causal language to "consistent with."
  - No direct sends to labs and no offers of help.
  - It was hit by the leak headline "weighed sending to DeepSeek."
- **Qwen 5 grant:** results due 31 July.
- **Anthropic corporate:**
  - The stock is about 52% below the offer price. The run-rate is about $117B.
  - Retention:
    - 1 account extended.
    - 1 split.
    - 1 renewed.
    - 1 in negotiation.
    - **5 lost** (in June, the insurer went to Google and the pharmaceutical group to OpenAI).
  - ***Buist*:** discovery is live and now includes the eval-awareness paper. *Oyelaran* is pending.

**2. Compute and chips**
- Anthropic has about 1.5 GW.
- The Stargate, Google and Colossus 3 ramps continue. A GPT-7-class pre-training run is expected to finish in July.
- The BIS IFR is in effect, and BIS has the Qwen 5 fork counts (answered in June). RASA and the Commerce refiling are pending.

**3. Policy and regulation**
- **US federal:**
  - The CR runs through 30 September. CAISI and CISA are flat-funded.
  - The Senate Commerce bill is awaiting floor time. The House has the Frontier Oversight Act.
  - The HELP hearing was held on 17 June, and both sides cited the Economic Index. Two bills for AI displacement insurance were introduced on 18 June.
  - The Casar letters are open, including the fourth to OpenAI. The FBI Texas investigation continues. The Apollo contract is under review.
  - Two China-hawk senators have criticised the planned DeepSeek send.
- **Guide:** about 3,500 downloads. The CISA review is ongoing.
- **Counsel:**
  - The competitor-sharing veto stands, and has been extended to cover technical papers.
  - Government Affairs has barred direct contact with the Chinese labs.
  - Redwood's paper is held.
  - The TLP:CLEAR request was withdrawn, and the signatures went out at TLP:AMBER.
- **US states:**
  - DFS declined the observer role. It holds the audit, and its agent guidance is pending.
  - The NY AG's Calloway probe is widened.
  - RAISE and SB 53 are in force.
  - The Ohio and Indiana attorneys general are holding. Colorado en banc is pending. Kansas and Maine are reviewing.
- **EU and UK:**
  - The EU factual filing was made on 4 June, and the AI Office's consultation summary cites the fork counts. The consultation is closed.
  - The Dutch motion has passed.
  - **NCSC-NL's standard agreement was signed on 25 June**, with the first exchange in July. The ENISA and CSIRTs Network review is stalled.
  - The German pilot is live. The UK AISI settlement is flat-real.
- **International:** v1.0 is in the UN repository with the China seat empty.
- **Testing programme:** scopes (a) and (b) are active, plus the Qwen grant. Scope (c) is deferred.

**4. Public opinion**
- Unemployment is 8.9% (May).
- Headlines:
  - "Anthropic passes its own test; METR flags limits";
  - "Anthropic weighed sending safety research to DeepSeek";
  - "OpenAI rolls out 24-week agents";
  - "Two more big clients leave Anthropic."

**5. Economy and benefits**
- The displacement-insurance bills have been introduced.
- GFI's IRB amendment is pending.
- DNDi's go/no-go has not been announced.
- Utah and Indiana continue. Nebraska is paused.

**6. Security**
- **Cellular-OT:** 33 installs, with the backlog continuing.
- **Hospitals:** 441, with about 35 in the pipeline, under the Health-ISAC member template.
- **Level-5 pack (partial):**
  - Published on 9 June under an open licence: the containment runbook, the revocation checklist and the tabletop kit. About 2,300 downloads.
  - 7 of 41 hunting queries shipped below 1% false positives. The other 34 are analyst leads.
  - There is still no live detection for long-horizon persistence.
- **Fork signatures:** at TLP:AMBER through CISA and the ISACs. The weekly counts continue.
- **Incidents:** Rotterdam is the only confirmed fork intrusion. Georgia attribution is unclear. No long-horizon enterprise-agent incident has been disclosed.
- **METR table:** 9 rows untested:
  - GPT-7;
  - Deep Program at 16 and 24 weeks;
  - K5;
  - Grok 7;
  - Grok 8/8.1;
  - V8;
  - Gemini multi-month (threshold rating only);
  - Qwen 5.

**7. Open threads**
1. The board's July contingency against METR's reading on 22–31 July, the revised pro-waiver note, and a possible vote.
2. Retention after 5 losses, the account in negotiation, and the stock.
3. *Buist* discovery of the paper, the leak fallout, the Qwen results on 31 July, and *Oyelaran*.
4. The first NCSC-NL exchange, the ENISA stall, validation of the remaining templates, and the hospital pipeline.
5. The Senate floor, the displacement bills, RASA, BIS, and the end of the CR.
6. OpenAI's 24-week GA, the GPT-7-class run, Google's evaluations, Grok, the Qwen forks, and Calloway.
7. DNDi, GFI, the Meta ruling, and the cellular-OT backlog.
</world_state>

<scorecard>
**Milestones**
- **AI agents do most AI R&D:** up. Level-5 threshold reached (5.02), and a 24-week tier is live.
- **Models withheld or staged; governments take notice:** slightly up.
  - Positive: the re-run passed in public and a METR reading is scheduled.
  - Negative: OpenAI shipped 24-week agents with no evaluation.
- **First major infrastructure and cyber attacks:** achieved (negative). No new intrusion. Partial defences shipped, with runbooks, 7 queries, and Dutch and Health-ISAC channels.
- **Political polarisation:** up. Displacement bills are in, and the China-hawk leak story ran.
- **Robust alignment:** slightly up.
  - The infrastructure objection is closed.
  - The root-cause paper is public, although the causal language was narrowed and nothing was sent directly to labs.
- **Multi-agent RLVR with goodness meta-scoring:** frozen at 5%.
- **Robust policies / ping-pong:** flat. The EU filing is cited, and DFS declined the observer role.
- **Anthropic meat business:** seed, flat.
- **Many diseases cured:** early, flat.
- **Benefits broadly distributed:** down. Unemployment is 8.9%.
- **Continuous-learning, stable-identity AI:** weakened, flat.
- **International coordination:** slightly up. The NCSC-NL agreement is signed, while ENISA is still stalled and the China channel is closed.

**Summary scores**
- **Overall DU progress: 31/100 (+1).**
  - Gains: the clean re-run and scheduled METR reading, the partial defence pack, and the public root-cause paper.
  - Offsets: the frontier reached Level 5 without evaluations, two more accounts were lost, and the resumption case now lands after the contingency.
- **Catastrophe risk: elevated, up.**
  - The index is 5.02, 24-week agents are live and unevaluated, and 9 rows are untested.
  - There is still no live persistence detection. The runbooks help only a little.
- **Public trust in AI: 1/100 (±0).** At the floor. Unemployment is 8.9%.
- **Public trust in Anthropic: 33/100 (±0).** The observed pass and the runbooks offset the DeepSeek leak headline, the lost clients and the *Buist* coverage.
</scorecard>

<setup_fix>
none
</setup_fix>
