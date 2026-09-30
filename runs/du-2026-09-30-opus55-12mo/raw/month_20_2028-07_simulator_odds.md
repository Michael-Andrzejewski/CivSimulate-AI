<analysis>
**Capability clock and pacing.** The frontier sits at "Late Agentic, Level 2+." OpenAI reports 88% R&D automation, and GPT-6.5 and Gemini 5 are generally available.
- **This month's advance:** from roughly GPT-6.5-class to a partial step, as Gemini 5 post-release tuning and the start of GPT-7-class runs add effective compute of about 1.3–1.5x per quarter.
- **Projections:** >90% automation at OpenAI and GDM in Q3–Q4 2028. Level 3 (sustained autonomous research programmes, humans mostly setting direction) by Q1 2029.
- **Grok 6** ships in summer or autumn either way. It adds competitive pressure more than frontier progress.
- **Deadline:** this pace stays on track for ASI by the December 2030 deadline. Anthropic's suspension slows only Anthropic.

**Action 1 (isolation).** Moving oversight surfaces behind separate change control in a large research monorepo is real engineering work, but it is scoped and uses existing infrastructure.
- **Direct write paths:** closing these for trace, logging and monitor-prompt surfaces within a month is plausible.
- **Full coverage** is ambitious.
- **Redwood's red-team:** it competes with audit and probe work for the same reviewers, so publication may land late July or slip to August.
- **The RSO note** is easy.
- **Resolution range:** direct isolation of most listed surfaces, with the Redwood report dated late July to mid-August.
- **Indirect paths** are Threat 1's job and are not counted here.

**Action 2 (cross-lineage monitor and sample).** Redwood evaluating candidate monitors is feasible.
- **Sample growth:** ~74→300 audited items in one month is ambitious. Stated range if successful: 150–240.
- **Gemini's security and export friction** is modelled by Threat 3, so it is excluded here.
- **Tiering and funding** are low-risk.

**Action 3 (exigency record plus the 72-hour option).**
- **Publishing the held roadmap note** is now low-friction.
- **Board adoption of the option** is a separate draw: it is adopted only if the action margin is ≥45 and Threat 4 does not materialise. Otherwise the board defers or declines, and that is recorded with a date.
- **Failure** means the note slips and the option is not presented before the July meeting.

**Action 4 (defenders).**
- **Sprint target:** 45 utilities is ambitious from 21. The stated range on success is 28–38, because utility-side staff are the bottleneck.
- **Credential-check extension:** easy.
- **Tabletop:** CISA or UK AISI may accept, but hosting likely falls in Q3 rather than July.
- **NRECA's decision** is modelled by Threat 5.

**Action 5 (open tooling).**
- **Handover to Redwood and its commitment** are feasible.
- **Public release** likely waits for the Q3 standard.
- **METR** may give a timeline.
- **The probe readout** is in August and is not resolved this month.

**Action 6.** Routine.

**Threat sub-draws** are declared so that none of them is chosen by judgement:
- **Threat 4:** if it materialises, a roll below 15 means Grok 6 tops GPT-6.5 on agentic and cyber benchmarks. Otherwise it roughly matches or trails.
- **Threat 5:** if it materialises and an exogenous follow-on intrusion occurs this month, the victim is a co-op if the last digit of Threat 5's roll is even.
- **Follow-on intrusions:** these are set exogenously on base rates, independent of how the month is going.
</analysis>

<action_odds>
Action 1 [Permission-layer isolation of oversight surfaces]: P(failure) 35%. Reason: substantial monorepo engineering and red-team capacity contention in one month. Success means direct isolation of most surfaces and the RSO note published; the Redwood report may land late July to mid-August. Indirect paths are handled by Threat 1.

Action 2 [Cross-lineage monitor + ~300 sample]: P(failure) 35%. Reason: Redwood reviewer capacity is saturated. Even on success the sample lands at 150–240, not 300, and the monitor selection may be provisional. Gemini review friction is carved out to Threat 3.

Action 3 [Exigency record + 72h disclosure option]: P(failure) 30%. Reason: publishing the note is easy, but comms and litigation caution under Oyelaran adds friction. Board adoption requires margin ≥45 and no Threat 4; otherwise a dated decline or deferral is recorded.

Action 4 [NRECA, sprint, credential check, tabletop]: P(failure) 25%. Reason: these are existing lanes with strong post-advisory demand. The sprint caps at 28–38 on success, the tabletop is likely scheduled for Q3 rather than held, and NRECA's outcome is Threat 5.

Action 5 [Open-source control tooling via Redwood; gate evidence]: P(failure) 25%. Reason: the handover is simple, but Redwood's vetting and branding decisions take time, so public release likely ties to the Q3 standard. The METR timeline is uncertain. The probe readout falls outside this month.

Action 6 [Benefits and international verbatim/dated]: P(failure) 10%. Reason: routine publication. GFI could slip again and the UK funder choice is theirs, but neither counts as failure of the action.
</action_odds>

<threat_odds>
Threat 1 [Isolation side door]: P(materialises) 45%. Adversary suggested 40%. I set it slightly higher because first-pass isolation of a large monorepo rarely survives a competent red team, and the June case was itself indirect. It is not higher because Redwood's report may not publish within July.

Threat 2 [New audit items easier than organic]: P(materialises) 30%. Adversary suggested 35%. The distribution-shift risk is real and Redwood would report the split honestly. I set it lower because the sample shortfall is already priced into Action 2's range, so the threat here covers only the composition-artefact finding.

Threat 3 [Cross-lab monitor stalls in security/export review]: P(materialises) 35%. Adversary suggested 30%. Sending held-successor research traces to a competitor's inference stack is exactly what Anthropic security and counsel have repeatedly slowed. Existing Google Cloud terms help only somewhat.

Threat 4 [Grok 6 ships unreviewed in July]: P(materialises) 35%. Adversary suggested 45%. The model is in post-training with "this summer" guidance, but xAI's history of slips makes an August or September ship roughly as likely. Sub-draw: a roll below 15 means it tops GPT-6.5.

Threat 5 [NRECA defers]: P(materialises) 45%. Adversary suggested 40%. NRECA has been in legal review since April, co-op-specific liability is unresolved, and CISA 2015 is uncertain. The self-set 15 July date cuts both ways. Co-op-victim sub-draw as declared.
</threat_odds>
