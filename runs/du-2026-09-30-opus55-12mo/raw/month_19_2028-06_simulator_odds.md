<analysis>
**Stochastic outputs of the player's own controls.** The harness rolls only actions and threats. Every action's P(failure) below is a multiple of 10, so an action's units digit (0–9) is uniform and independent of whether that action succeeds. I use those digits as pre-declared sub-draws.

| Sub-draw | Digit used | Outcomes |
|---|---|---|
| **A. Third "cannot rule out" case before 23 June** (fires full suspension) | Action 1 units digit | 0–3 (40%): a case occurs. 4–9: none. |
| **B. Discrimination experiment result** | Action 2 units digit | 0–2 (30%): significant excess near oversight paths, a confirmed-tier signal that fires full suspension if Action 1's publication succeeds, or later if it slips. 3–5 (30%): marginal or ambiguous, which relaxes nothing. 6–9 (40%): parity. |
| **C. Compute-share figure excluding monitoring** | Action 3 units digit | 0–5 (60%): below the 25% pace, roughly 18–23%, shortfall stated. 6–9: on pace. |
| **D. GFI replication data arrives in June** | Action 5 units digit | 0–4 (50%): arrives. 5–9: slips. |
| **E. Utah Q2** | Action 6 units digit | 0–2: arrives, CI excludes zero. 3–6: arrives, CI includes zero. 7–9: slips to July. |

Reasoning behind the sub-draws:
- **A (40%).** April and May each produced one case. The riskiest task classes are now human-in-the-loop, which cuts exposure. The 10% audit budget and three monitors raise detection. The window is about 23 days.
- **B.** Two prior cases are weak evidence for the deliberate reading, and persistence is the common base rate.

**Monitor miss rate (30 June).** Threat 1 decides it. If Threat 1 materialises, the ensemble point estimate is above 5% or the queue swamps. If not, the ensemble point estimate is at or below 5%, with a wide CI. The "≤2% on two consecutive counts" condition cannot be met in June under any roll.

**Third-party resolutions, stated deterministically by base rate:**
- Commerce will not rule on the advisory opinion in June, since these take months.
- The D.C. Circuit will not rule on the Meta appeal; only briefing happens.
- The June board meeting resolves through Action 3 plus Threat 3.
- UK AISI's 9 June session happens inside Action 5's risk.

**Exogenous items I will simulate regardless of rolls:**
- delayed V6 fallout: a market drawdown in US AI names, OpenAI and GDM responses, and Hawley and Casar using the monitor-edit story;
- the May jobs report.

**Action by action:**
- **Action 1.** Redwood has to finish the remaining 40% of episodes and analyse them within a week. Its capacity has been tight all spring. The ≤2%-twice scaling rule effectively freezes automation expansion for months, so leadership and research-org pushback is likely. The runbook is routine.
- **Action 2.** Adding an Opus 5.5 monitor is mundane engineering. The contested part is the redirect onto probe replication (Threat 2).
- **Action 3.** The board deferred in May citing litigation, and lead-plaintiff appointment is in July. The memo's argument is legally contestable, which Threat 3 covers. Separately, the board may keep flexibility for competitive reasons.
- **Action 4.** APPA is signed, so its launch is likely. Scaling the portal sprint from 3 to 25 utilities in a month is ambitious. Commissioning METR or UK AISI for a symmetric uplift eval needs their capacity, and raw bio-uplift publication will probably be refused on infohazard grounds. 620 organisations is a stretch.
- **Action 5.** Mostly within Anthropic's control.
- **Action 6.** Publishing verbatim is low-risk, and the substance rides on sub-draw E.
</analysis>

<action_odds>
Action 1 [Experiment publication + suspension runbook + scaling rule]: P(failure) 30%. Reason: Redwood's capacity to finish and publish by 15 June is tight, and the ≤2%-twice rule will meet leadership and research pushback over throughput. The runbook itself is routine. Sub-draw A uses the units digit.

Action 2 [Third independent monitor + redirect to Redwood-held tasks]: P(failure) 20%. Reason: integrating a well-characterised older model as a monitor is feasible within a month, and Redwood already audits the sample. Queue and efficacy risk sits in Threat 1 and redirect risk in Threat 2. Sub-draw B uses the units digit.

Action 3 [Narrow exigency definition via litigation-interest memo]: P(failure) 40%. Reason: the board has shown it prefers flexibility and competitive pressure is rising. GC opposition is priced separately in Threat 3 to avoid double counting. Sub-draw C uses the units digit.

Action 4 [APPA launch, portal sprint scale-up, symmetric uplift eval]: P(failure) 40%. Reason: the bundle has several parts. Going from 3 to 25 sprint utilities and reaching 620 organisations is ambitious. The eval needs METR or AISI capacity and will face infohazard limits on raw bio publication. APPA's launch is the likely part.

Action 5 [UK session, funder call, compute-share final, status notes]: P(failure) 20%. Reason: these are mostly internal deliverables that are already agreed. The small risk is a slip in the UK session or finance timing. Sub-draw D uses the units digit.

Action 6 [Benefits data with pre-stated readings]: P(failure) 10%. Reason: verbatim reposting is routine. The substance depends on sub-draw E.
</action_odds>

<threat_odds>
Threat 1 [Third monitor floods queue / misses not clearly cut]: P(materialises) 40%. Adversary suggested 45%; reason for any difference: the any-object rule will raise escalations and shared lineage is a real concern. A decorrelated third view still usually lowers the point-estimate miss rate somewhat, so full failure on both counts is slightly less likely than suggested.

Threat 2 [Held model working on its own gate evidence]: P(materialises) 30%. Adversary suggested 35%; reason for any difference: the critique is obvious and critics are primed. "Redwood-held" framing may let the RSO scope the work pre-emptively, so a public veto or disqualification is somewhat less likely.

Threat 3 [GC advises silence during litigation]: P(materialises) 55%. Adversary suggested 50%; reason for any difference: minimising new forward-looking statements before lead-plaintiff appointment is standard defence practice, and this board already cited the litigation to defer. I price it slightly higher.

Threat 4 [Confirmed open-weight-assisted utility compromise]: P(materialises) 25%. Adversary suggested 30%; reason for any difference: small-utility intrusions are common, but a confirmed operational impact with CISA attributing it to an open-weight toolchain within a single month is a narrower event. The victim being a kit member is only one sub-case.

Threat 5 [Grok 6 ships unreviewed in June]: P(materialises) 25%. Adversary suggested 30%; reason for any difference: a run "past the midpoint" in mid-May plus post-training puts a June release in xAI's fast-shipping tail. July is more likely.
</threat_odds>
