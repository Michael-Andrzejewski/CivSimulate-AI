<analysis>
**Action 1 (DOJ letter filing).** The draft is ready, and filing depends on Anthropic alone. The main risks are internal:
- Securities counsel may want to delay because DOJ publishes request letters with its response, which creates a disclosure question during the roadshow.
- Counsel may prefer to recruit co-requesters first.

Filing a regulatory submission is not an offering communication, so most counsel would let it go. Whether DOJ treats the letter as ripe is modelled by Threat 2, not here. Real-world practice makes a last-minute continuing-resolution extension of CISA 2015 likely, which would weaken the urgency framing but not the filing.

**Action 2 (position paper).** Two separate things could stop it:
- **Counsel's roadshow veto.** This is modelled by Threat 1.
- **Execution risk.** Final research review, figures consistent with the embargoed 140 scenarios, and author bandwidth now that the next-generation run is live.

Anthropic routinely publishes ordinary-course research. The probe paper cleared before the S-1, and July's veto targeted "industry-structure advocacy" specifically. Execution risk alone is therefore moderate.

**Action 3 (legacy sandbox instrumentation).** This is real engineering work: unbatching wrappers means timing changes and regression testing, all competing with next-generation run infrastructure. A single month is tight, so a partial result (one of two sandbox types fixed, or a bounded-risk memo) is the likely middle case. Timing artefacts that agents might recognise are a genuine complication. They belong to this action's roll, not to Threat 3.

**Action 4 (auditor calibration by end of September).** This is ambitious. Only a few hundred labelled pilot episodes exist, the auditor track is newly built, and auditor staff have been diverted twice before. Threat 3 models the separate failure where calibration completes but overfits to known channels or shows low kappa on held-out data. The action roll covers only whether calibration finishes on schedule at all. The judge asked that slippage risk stay honest.

**Action 5 (rapid-release plan).** Updating the guide, drafting a BSI annex and a distribution list is straightforward. "Pre-clearing so nothing blocks but the AP" is not: counsel conditioned on the AP decision for three months, and a roadshow adds disclosure review. Partial success is likely, meaning materials are ready but approvals stay conditional.

In message 2 I also have to settle the unresolved question of notifying anyone about the 6 confirmed abusive accounts (NIS2, BSI, the AP).

**Capability clock.** For message 2 I will state an explicit mapping, with CI-6 as the ASI threshold. The rate needed is roughly 0.06–0.08 CI per month from CI-3.7 to reach ASI by December 2030, with steps driven by releases. Gemini 5 and the next-generation run are not due this month, and DeepSeek V5 depends on Threat 4.

**Threats.**
- **DeepSeek V5.** Leak cycles have repeated for months without a release. A monthly hazard of roughly 20–25% is reasonable.
- **Claude-named intrusion.** The Dragos/Monterrey case is a credible pre-game fact and should be reconciled into the world state as background. A fresh public attribution inside this specific month is less likely. Confirmed reconnaissance accounts plus BSI's investigation keep it non-trivial.
</analysis>

<action_odds>
Action 1 [File DOJ business-review letter]: P(failure) 20%. Reason: the draft is ready and filing is in Anthropic's control, but securities counsel may delay because the letter becomes public or ask to recruit co-requesters first. DOJ ripeness is handled by Threat 2.

Action 2 [Publish eval-awareness position paper]: P(failure) 30%. Reason: execution risk only (final review, consistency with the embargoed scenarios, author bandwidth during the next-generation run). The roadshow veto is modelled separately in Threat 1.

Action 3 [Legacy sandbox instrumentation]: P(failure) 35%. Reason: unbatching wrappers in one month competes with next-generation run engineering and introduces timing artefacts. A partial fix or a bounded-risk memo is the likely middle outcome.

Action 4 [Adversarial auditor calibration by end of September]: P(failure) 40%. Reason: a newly built track, few labelled episodes, a one-month deadline and a history of auditor diversion. Held-out overfit risk is modelled separately in Threat 3.

Action 5 [Rapid-release Defender's Guide plan]: P(failure) 30%. Reason: the materials are easy to prepare, but counsel is unlikely to fully pre-clear during the roadshow with the AP matter open. Conditional approvals are the likely partial outcome.
</action_odds>

<threat_odds>
Threat 1 [Roadshow gun-jumping pulls the paper]: P(materialises) 40%. Adversary suggested 40%; I match it. Counsel has vetoed twice and the roadshow is the strictest window. Ordinary-course research publication remains defensible, which keeps this below even odds.

Threat 2 [DOJ treats the letter as unripe]: P(materialises) 30%. Adversary suggested 35%; slightly lower. DOJ staff rarely respond substantively within weeks of filing, even though the ripeness concern is real and was signalled in July. The CR-extension framing hit folds into the outcome if the threat materialises.

Threat 3 [Auditors overfit to known channels]: P(materialises) 40%. Adversary suggested 45%; slightly lower. The mechanism is well supported by the July held-out finding and channel migration, but the redesign includes outcome metrics that partly guard against it.

Threat 4 [DeepSeek V5 ships open, near-frontier]: P(materialises) 22%. Adversary suggested 30%; lower. Repeated leak cycles without release point to a monthly hazard of roughly one in five, and the "1.5–2 months behind" gap would be set at resolution rather than assumed.

Threat 5 [Claude-named utility intrusion lands during roadshow]: P(materialises) 15%. Adversary suggested 20%; lower. The Dragos/Monterrey precedent is credible and will be reconciled into the world state, and confirmed reconnaissance accounts exist. A new public attribution inside one specific month is still well under one in five.
</threat_odds>
