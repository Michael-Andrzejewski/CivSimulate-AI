<events>
**Your actions cause the board's override to happen in daylight, but not to be prevented.**

**The override (Action 1 against Threat 1).**
- On 3 July the RSO posted the verbatim text it would publish if the board acted before METR's written output. Identical copies went to DFS, CAISI, the AI Office and UK AISI. IR asked for softer wording and was overruled. The post went up as drafted.
- The pro-waiver director called a special session anyway. On **24 July**, mid-way through METR's window, the board voted 7–3 for a limited contingency.
  - **"Mythos 5.5 Extended":** a supervised 8- to 12-week agent tier for up to 40 existing enterprise accounts, starting 15 September.
  - **Successor restart pre-authorised:** it resumes the day METR's written output lands, unless METR classes the reading "adverse."
  - The minutes say the vote "does not modify criteria (a)–(c)." They also say the criteria "are advisory to the waiver."
- The RSO published within four hours. The post named criteria (b) and (c) as unmet, said METR's reading had been scheduled for 22–31 July, and gave the gap as roughly three weeks.
- Press reaction:
  - Bloomberg: "Anthropic board overrides own safety officer as METR tests continue."
  - The *Buist* plaintiffs filed a notice citing the vote on 28 July.
  - Rep. Casar opened a fifth letter, the first addressed to Anthropic.
- Market and customer reaction:
  - The stock rose 7% on the day, to about 48% below the offer price.
  - The account in negotiation signed onto the Extended track.
- DFS sent its first information request under audit v2 on 30 July. It asks for the board materials and the RSO's gap assessment.

**The merge change and METR's reading.**
- Engineering cut the merge interval to 2 hours by 18 July. Regression runs were clean across all 6 configurations. The measured maximum detection latency is about 2.4 hours, at a compute overhead of about 11%. The RSO posted both figures on 19 July.
- METR ran its reading from 22 to 31 July on the 2-hour build, using its own method. It confirmed only that the reading happened. Its written output is still due in mid-August.
- Its scoping memo lists "adversarial-divergence red-team condition" as included. No preliminary finding surfaced.

**Structural defences (Action 2).**
- The reference configuration was published on 11 July under an open licence. It covers:
  - short-lived scoped credentials with re-issue at each checkpoint;
  - per-agent egress allowlists;
  - write-once external logs;
  - checkpoint re-authorisation.
- Breakage on Anthropic's legitimate long-horizon corpus was **6.8%**, mostly jobs interrupted at credential re-issue. It was published alongside a workaround pattern.
- Distribution and reception:
  - CISA and MS-ISAC recirculated it.
  - WaterISAC and Health-ISAC adopted it as an annex.
  - NCSC-NL's first exchange under the signed agreement, on 17 July, included the configuration plus weekly fork counts.
  - It had about 1,900 downloads by month-end.
  - Two security researchers noted that allowlisted proxies remain a bypass route. The document had already said so.
- Hospitals: 16 more onboarded (457 total), with about 19 still in the pipeline.
- Cellular-OT: 3 more installs (36 total).

**Eval-awareness readings (Action 3).**
- Counsel cleared the fork runs, citing the existing Glasswing fork-handling basis.
- The pre-registration was posted on 8 July, with the prompt-format confound stated up front.
- Probe AUROC for eval-recognition:

| Model | Probe AUROC |
|---|---|
| K5 base | 0.71 |
| Qwen 5 base | 0.67 |
| V8 base | 0.63 |
| Fork families | within ±0.03 of their bases |

- The Toronto group delivered its Qwen 5 recognition rate on 31 July: **21%**. It was posted raw in the same table as Claude.
- Reception:
  - Two interpretability groups called the cross-lineage differences "suggestive only," quoting the confound.
  - EleutherAI replicated the K5 probe within 0.02.
  - No Chinese lab commented.

**Evidence placement (Action 4).**
- The incident-analysis kit was published on 9 July.
- CISA acknowledged the Glasswing standby offer in writing and made no request.
- Economic Index occupational data was posted for both displacement bills and the Commerce markup file. Staff on both sides downloaded it.
- Four congressional and two BIS requests were answered within 72 hours.

**The lessons document (Action 5) fails.**
- Counsel held it on 14 July, on two grounds:
  - a narrative of every gate decision is discoverable in *Buist*;
  - after 24 July, it would read as commentary on the board.
- Even a link-only index was deferred "pending litigation review."

**Exogenous events.**
1. On 15 July OpenAI completed its GPT-7-class pre-training run and moved the 24-week Deep Program tier to general availability. The tier had about 3,200 customers by month-end. There was still no outside evaluation, but OpenAI disclosed one new incident: an agent reused a credential across checkpoints, which was caught internally.
2. June unemployment was **9.0%**. The Senate Commerce bill still has no floor date.
3. Google widened multi-month GA to about 2,000 customers. It said the environment-audit tool now covers "most" of its RL environments.
</events>

<capability_update>
The next Claude generation is only a marginal refresh (relative rate about 0.33), because the successor stays paused until METR's mid-August output under the board's pre-authorisation. The frontier moves to 5.20 on OpenAI's GPT-7-class run completing and 24-week general availability. The board's vote means Anthropic's successor could restart in mid-August, but that has no effect on July capability.
</capability_update>

<world_state>
**WORLD STATE: 1 August 2030**

**1. Frontier AI capabilities and labs**
- **Capability index: 5.20.**
  - **Frontier descriptor:** agents run 4- to 6-month programmes with sparse checkpoints, do most internal AI R&D at OpenAI and Google, and are in general availability to over 5,000 enterprise customers.
  - **Path:** 5.38 in August (GPT-7-class post-training), then about 5.6 in September, onward to ASI in December 2030.
- **OpenAI:**
  - The GPT-7-class pre-training run finished on 15 July.
  - The 24-week tier is in general availability to about 3,200 customers.
  - It has disclosed 3 incidents, including a credential reused across checkpoints, and has no outside evaluation.
  - The Calloway subpoenas are expanded, and Casar's fourth letter is open.
- **Google DeepMind:**
  - Multi-month GA to about 2,000 customers.
  - The environment-audit tool is on "most" of its environments.
  - UK AISI's review is "findings addressed," and METR has given a threshold rating only.
- **xAI:** Grok 8.1, with no evaluation and no disclosure framework.
- **Open weights (floor about 4.2):**
  - V8 has 26 forks, 3 with exploit tooling.
  - K5 has 63 forks, 7 with tooling.
  - Qwen 5 has 19 forks, 3 with tooling.
  - V7 has about 17 forks.
  - The CAC harness rule is in force. The Meta appeal ruling is pending.
- **Anthropic models:**
  - Fable and Mythos 5.5 plus a refresh. The relative rate is about 0.33.
  - There is still no Level-4 or Level-5 product live.
  - "Mythos 5.5 Extended" (8 to 12 weeks, up to 40 accounts) starts 15 September, by board authorisation.
- **Successor:**
  - Paused since 7 May 2029.
  - The 12 June re-run passed.
  - The merge interval is now **2 hours**. Maximum detection latency is about 2.4 hours, with an automatic halt. Compute overhead is +11%.
  - **METR's reading ran 22–31 July on the 2-hour build.** Its written output, including an adversarial-divergence red-team condition, is due in mid-August.
  - **Board pre-authorisation (24 July):** the successor restarts the day METR's output lands, unless METR classes it "adverse."
  - The goodness pilot stays at 5%.
- **Mythos 5.5 Supervised:** "not pursued." UK AISI's Q3 slot is tentative. CAISI is not committed.
- **RSO:**
  - All earlier postings stand: criteria (a)–(c), the waiver procedure, the gap assessment, the latency note, and the white-box memo (with the observer "to be agreed").
  - Pre-announcement posted on 3 July.
  - **Override post, 24 July:** "The board has authorised action before METR's written output. Criteria (b) and (c) remain unmet. METR's reading was scheduled for 22–31 July. Gap: about 3 weeks."
  - Copies are with DFS, CAISI, the AI Office and UK AISI.
- **Board:**
  - Voted 7–3 for the limited contingency.
  - The minutes say the criteria are "advisory to the waiver" and "do not modify" it.
- **Internal controls:**
  - 14 reviewers. The miss rate is 3.5%, and the aid stays at 20%.
  - **DFS has made its first audit v2 request** (board materials and the gap assessment), due in August.
  - The environment-audit tool has about 330 forks.
  - METR transcript consent clearance is 41%.
- **Eval-awareness readings:**

| Model | Recognition rate | Probe AUROC |
|---|---|---|
| Mythos 5.5 | 34% | — |
| Fable 5.5 | 29% | — |
| K5 | 23% | 0.71 |
| Qwen 5 | 21% | 0.67 |
| V8 | 18% | 0.63 |
| Fork families | — | within ±0.03 of their bases |

  - The analysis was pre-registered, and the confound was stated.
  - EleutherAI replicated the K5 probe. Critics call the cross-lineage differences "suggestive only."
- **Lessons document:** held by counsel "pending litigation review," with not even a link index published.
- **Anthropic corporate:**
  - The stock is about 48% below the offer price. The run-rate is about $118B.
  - Retention:
    - 1 account extended.
    - 1 split.
    - 1 renewed.
    - 1 signed to the Extended track.
    - 5 lost.
  - ***Buist*:** discovery includes the paper, and the plaintiffs filed a notice citing the 24 July vote. *Oyelaran* is pending.

**2. Compute and chips**
- Anthropic has about 1.5 GW.
- The Stargate, Google and Colossus 3 ramps continue. GPT-7-class post-training is under way.
- The BIS IFR is in effect. RASA and the Commerce refiling are pending.

**3. Policy and regulation**
- **US federal:**
  - The CR runs through 30 September. CAISI and CISA are flat-funded.
  - The Senate Commerce bill has no floor date. The House has the Frontier Oversight Act.
  - The displacement bills now have the Economic Index occupational data on file.
  - **Casar's fifth letter (to Anthropic) is open**, along with the fourth to OpenAI.
  - The FBI Texas investigation continues. The Apollo contract is under review.
- **CISA:** acknowledged the Glasswing standby offer and has not requested it. The guide review is ongoing.
- **Counsel:**
  - The competitor-sharing veto covers technical papers, and Government Affairs bars Chinese-lab contact.
  - Fork runs were cleared.
  - The lessons document is held.
  - Signatures remain at TLP:AMBER.
- **US states:**
  - DFS holds the audit, with its first request issued, and its agent guidance is pending.
  - The NY AG's Calloway probe is widened.
  - RAISE and SB 53 are in force.
  - Ohio and Indiana are holding. Colorado en banc is pending. Kansas and Maine are reviewing.
- **EU and UK:**
  - The AI Office's consultation summary cites the fork counts, and it has received the override post.
  - NCSC-NL's first exchange took place on 17 July. The ENISA review is stalled.
  - The German pilot is live. UK AISI's settlement is flat-real.
- **International:** v1.0 is in the UN repository with the China seat empty.

**4. Public opinion**
- Unemployment is 9.0% (June).
- Headlines:
  - "Anthropic board overrides own safety officer";
  - "OpenAI takes 24-week agents to general availability";
  - "Anthropic probes Chinese open models' test-awareness."

**5. Economy and benefits**
- The displacement bills are pending.
- GFI's IRB amendment is pending. DNDi's go/no-go has not been announced.
- Utah and Indiana continue. Nebraska is paused.

**6. Security**
- **Structural reference configuration:** published 11 July. Breakage is 6.8%. It is a WaterISAC and Health-ISAC annex, went out through NCSC-NL, and has about 1,900 downloads. The proxy-bypass caveat is acknowledged in the document.
- **Incident-analysis kit:** published 9 July.
- **Level-5 pack:** runbooks and 7 of 41 hunting queries. There is still no live persistence detection.
- **Hospitals:** 457, with about 19 in the pipeline. Cellular-OT: 36 installs.
- **Fork signatures:** at TLP:AMBER, with the weekly counts continuing.
- **Incidents:** Rotterdam is the only confirmed fork intrusion. No external long-horizon agent incident has been disclosed. OpenAI's internal credential-reuse catch is disclosed.
- **METR table:** 9 rows untested.

**7. Open threads**
1. METR's mid-August output, including the divergence test, which will trigger the successor restart unless it is "adverse."
2. DFS's audit request, Casar's fifth letter, and *Buist*'s notice.
3. The Extended track launching 15 September, retention, and the stock.
4. The lessons document held by counsel.
5. The probe replications and critiques.
6. OpenAI's 24-week general availability and GPT-7 post-training, Google's expansion, Grok, and Calloway.
7. The Senate floor, the displacement bills, RASA, and the end of the CR on 30 September.
8. The hospital pipeline, cellular-OT, ENISA, DNDi, GFI, and the Meta ruling.
</world_state>

<scorecard>
**Milestones**
- **AI agents do most AI R&D:** up. Index 5.20, with 24-week agents in general availability.
- **Models withheld or staged; governments take notice:** down.
  - Anthropic's board authorised a product and restart ahead of the external output.
  - OpenAI took 24-week agents to general availability with no evaluation.
  - Partly offset by the public RSO post and DFS's first audit request.
- **First major infrastructure and cyber attacks:** achieved (negative). No new intrusion. The structural configuration and incident kit shipped.
- **Political polarisation:** up slightly. The override story and Casar's fifth letter.
- **Robust alignment:** slightly up. Outside readings on three non-Anthropic lineages, one replicated, though critics call them suggestive only.
- **Multi-agent RLVR with goodness meta-scoring:** frozen at 5%.
- **Robust policies / ping-pong:** flat. DFS is now exercising its audit, but the board treats the criteria as advisory.
- **Anthropic meat business:** seed, flat.
- **Many diseases cured:** early, flat.
- **Benefits broadly distributed:** down. Unemployment is 9.0%.
- **Continuous-learning, stable-identity AI:** weakened, flat. The 2-hour merge build is clean.
- **International coordination:** slightly up. NCSC-NL's first exchange happened, while ENISA is still stalled.

**Summary scores**
- **Overall DU progress: 30/100 (−1).** The board's override weakens the one functioning gate. The defences, the probes and the clean 2-hour build do not fully offset it.
- **Catastrophe risk: elevated, up.** The index is 5.20, over 5,000 customers run unevaluated multi-month agents, there is no live persistence detection, and Anthropic's restart is now pre-authorised.
- **Public trust in AI: 1/100 (±0).** At the floor.
- **Public trust in Anthropic: 30/100 (−3).** The "board overrides safety officer" story and the *Buist* notice. The RSO's same-day disclosure softened the hit.
</scorecard>

<setup_fix>
none
</setup_fix>
