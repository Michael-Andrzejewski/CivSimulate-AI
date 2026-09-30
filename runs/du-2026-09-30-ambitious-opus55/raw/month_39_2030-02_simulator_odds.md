<analysis>
**Capability clock.** Last month the judge said the stated path of about CL-6.3 by late 2030 implied acceleration I had not justified. I am revising it. At the observed pace of about 0.04 CL per month, verified frontier reaches about CL-6.05 by December. Only named triggers push it higher: full V8, a Researcher 4 successor in March–April, Anthropic stage-1 landing, or Grok 6.5 being verified. Pueblo fallout carries forward independently of the player: the CISA final report, the Colorado utility-rule push, and EU/CERT and Chinese responses to V8-fork misuse.

**A1 (OIT ramp packet).**
- Building the packet and testing the mitigation on the fallback checkpoint is routine.
- The payoff depends on three things:
  - **Checkpoint timing.** Storage faults have slipped every checkpoint so far, 2–3 days each time. "Late February" could slide into March. I put that at about 30%.
  - **The sealed-batch result.** This is modelled separately by Threat 1.
  - **Leadership's discretionary go/no-go.** Priced here explicitly. Leadership chose 50% weight with an override, and the 30% camp's dissent is on file. The over-refusal of +1.1 pp gives cautious voices a hook. Moving from 50% to 100% after one clean 30-day review is a larger step than they have taken before. Even with clean data, I put approval to 100% at the March refresh at about 45%. A likelier outcome is "hold at 50%" or "75%".
- Combined, failure to get the recommendation adopted is about 60%.

**A2 (readout diffusion).**
- Comms and counsel have trimmed or held every outward OIT release since December.
- The code is already Apache, so a repo refresh is plausible. The attributed call on "every frontier developer" is what comms has cut before.
- The structural timing and export problems belong to Threat 2. The action's own risk covers comms and counsel trimming the statement and core content under *Buist* and the pre-IPO posture.

**A3 (arming and Pueblo post-mortem).**
- The Vermont statistics are easy.
- Eligible sites with 60+ days of clean baseline are few: western Massachusetts, perhaps Connecticut, and possibly co-op #2 only late in the month. Each needs site consent, counsel clearance and NRECA's view. Ten armed sites by March is ambitious.
- An attributed post-mortem conceding "3 of 5 stages" is live litigation exposure (Pueblo, plaintiffs). Counsel will probably slow or soften it.
- WaterISAC already has an incumbent vendor (Cyware).

**A4 (multi-agent scale-up).** This is a 14× increase in episodes and an 8× increase in task length inside a fixed 12% compute share, while OIT audits compete for the same compute. The deadline is 31 March, so February only needs substantial progress, but slippage is the base rate.

**A5 (Ohio and patient work).**
- Scheduling an auditor-witnessed deletion at short notice, plus restoring and purging archived snapshots, is hard to do by 20 February.
- The IRB has already returned the patient summaries twice.
- Minnesota's 5-day target has been missed twice.
- There are many components, and the record here is poor.

**Threats.**
- **T1.** The trend and a 0.003 margin make a fail plausible. The chance the checkpoint slips out of February lowers the in-month probability.
- **T2.** The 21-day review makes it structurally impossible to include late-February data, but the January checkpoint data could stand in. Counsel's informal BIS check is plausible.
- **T3.** Hawley's hearing is scheduled. The Monterrey material is credible and I reconcile it as a pre-game fact. Whether it becomes the dominant framing is uncertain.
- **T4.** Full V8 is expected in Q1, so a February release is roughly a one-in-three chance. With only one armed site and top-confidence IOCs, a disruptive false block is low probability.
- **T5.** Ohio could decline, but it has deferred before and may defer again.
</analysis>

<action_odds>
Action 1 [OIT canary-review and ramp packet]: P(failure) 60%. Reason: the packet itself is routine, but success requires the checkpoint to land in February (about 30% slip risk from storage faults) and leadership to approve the jump to 100%. That approval is a discretionary decision priced at about 45% even with clean data, given the 30% camp's dissent, the over-refusal hook, and the retained override. The framing outcome is modelled in Threat 1.

Action 2 [Readout as diffusion event]: P(failure) 45%. Reason: the repo refresh on existing Apache code is feasible. However, comms and counsel have trimmed every outward OIT release since December (*Buist*, the differentiator memo, pre-IPO caution), and the attributed "every developer should run OIT" call is exactly what gets cut. The timing and export risks are in Threat 2 and are not double-counted.

Action 3 [Arm consented sites and publish Pueblo post-mortem]: P(failure) 50%. Reason: the statistics are routine. Few sites have 60 or more clean days, and each needs consent, counsel sign-off and NRECA's view. A post-mortem admitting that the indicators would have flagged 3 of 5 stages is litigation exposure counsel will slow. WaterISAC has an incumbent vendor. Ten armed sites by March is unlikely.

Action 4 [Multi-agent scale-up]: P(failure) 50%. Reason: a 14× increase in episodes and an 8× increase in task length at fixed compute, competing with OIT audits during a faulty run. It also needs a new adversary instance and OLMo cross-lineage integration. Substantial February progress is plausible, but staying on track for the 31 March packet is a coin-flip.

Action 5 [Ohio witnessed purge and patient work]: P(failure) 55%. Reason: short-notice auditor witnessing and archive restore-and-purge by 20 February are hard. The IRB has twice returned the summaries, Minnesota's 5-day target has been missed twice, and each verification pass has found another storage tier. There are many components and a poor track record.
</action_odds>

<threat_odds>
Threat 1 [Fresh batch fails framing check]: P(materialises) 30%. Adversary suggested 40%; reason for difference: the rising residual and the 0.003 margin make a fail genuinely plausible (roughly 40% conditional on the check happening). About 30% of the time the checkpoint slips into March and the re-check is not run in-month. Leadership pausing OIT outright is a sub-branch, not the default.

Threat 2 [Readout trimmed or recipe held for export review]: P(materialises) 50%. Adversary suggested 50%; reason for matching: the 21-day review structurally excludes late-February data, though January checkpoint data can substitute. Counsel's informal BIS check before releasing frontier-run configs is quite plausible given the Commerce queries on file. Together these make a material trim or slip about even odds.

Threat 3 [Hawley hearing cites Claude/Monterrey and the post-mortem]: P(materialises) 30%. Adversary suggested 35%; reason for difference: the hearing is scheduled and the Monterrey material is credible (reconciled as a pre-game fact). But the hearing's focus is open weights, the post-mortem may not publish before the hearing, and pressure to widen scope to hosted APIs is less likely than a passing mention.

Threat 4 [Full V8 recall drop and/or false block]: P(materialises) 30%. Adversary suggested 30% and 15%; reason: full V8 landing in February with a recall drop is about 30% (Q1 guidance, with Preview in December). A disruptive false block is closer to 5%, because only one site is armed and only top-10 high-confidence IOCs are live. If the threat materialises, it is the recall-drop branch unless the resolution clearly supports the rarer one.

Threat 5 [Ohio declines before purge completes]: P(materialises) 35%. Adversary suggested 45%; reason for difference: Ohio has already deferred once and agencies often defer again when remediation is visibly under way. Declining or suspending enrolment is real but not the modal outcome. The secondary Minnesota add-on is included here. The multi-agent slip the adversary raised is execution risk already priced in Action 4.
</threat_odds>
