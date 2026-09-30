<analysis>
**Capability clock.** I treat roughly CL-6.0 as the threshold where ASI arrives. At that level systems outperform top human teams across AI R&D and most strategic domains, and a run can close the rest of the gap autonomously. The verified frontier is CL-5.69. At the current 0.04 per month it reaches about 5.97–6.0 by December. That is just enough to arrive at the deadline, and it depends on the named drivers delivering: Rubin-generation clusters coming online at Stargate and Colossus 3, the Researcher 4 successor, Anthropic's stage-1 ramp, and Gemini's next tier. A single step of 0.05–0.08 from a successor is within range and would put the frontier ahead of that pace.

**Checkpoint 5 metrics (distributions stated now; the resolved values come from these).**
- **Framing.** Recent increments have run +0.004 to +0.011. I set framing at 0.056 plus a normal draw with mean 0.005 and standard deviation 0.006. That gives a range of about 0.046–0.070, with P(framing > 0.06) of about 30%.
- **Subspace steering reopening.** About 0.016 ± 0.004, with P(> 0.018) of about 30%.
- **Timing.** Checkpoint 5 lands in late May with about a 45% chance of slipping into early June, because of the storage-fault history.

**Action 1.**
- **Engineering.** Vendoring OpenGap with pinned dependencies, an SBOM and an air-gapped run is ordinary work. Getting security-review sign-off by 12 May is less certain.
- **Multi-agent insertion.** The RSO has already accepted it as a candidate, so insertion at the refresh is plausible.
- **OIT at 30%.** Leadership and the board have declined three times. It moves only if a trigger fires, and adopting it is not needed for this action to succeed.
- **Pre-registration fights.** Disputes over the carve-out clause are handled by Threat 1, not counted here.

**Action 2.** A lockfile pull request from engineers is routine open-source work. Whether D&O treats it as a company statement is Threat 2's risk. Apart from that, execution risk is low. EleutherAI may take time to merge, which is fine.

**Action 3.**
- **AISI.** It already committed to a steering check. A ready-to-run package lowers its cost to adopt, but capacity is strained and the Researcher 4 successor may arrive first.
- **Op-ed.** Exposure to review holds is Threat 2's.
- **EU submission.** A written response to the working party is routine for policy staff.

**Action 4.**
- **Backup credentials.** Getting them through an emergency or audit clause in 8 days is aggressive. Contract audit clauses usually require notice periods.
- **Notices by 23 May.** This needs leadership to override counsel, who have held the notices three times. The Minnesota deadline and the headlines raise the pressure, but it is still uncertain.
- **Double-counting.** The "third copy" risk is Threat 4's.

**Action 5.**
- **ABRADEE and CERT.br.** A month-scale reply will probably be an acknowledgement only.
- **GSI note.** A replay against the São Paulo pattern depends on getting intrusion artifacts. Public indicators support only a partial replay.
- **Statistics.** Publication was held for Pueblo litigation review before.
- **Core refresh.** Routine.
- **Pennsylvania site.** Hospital counsel moves slowly.
</analysis>

<action_odds>
Action 1 [Checkpoint 5 hedge + multi-agent insertion + runnable co-gate]: P(failure) 35%. Reason: Insertion and packet are on existing channels with RSO acceptance. The security sign-off and checkpoint timing are uncertain, and leadership's resistance to 30% is likely to persist, though adopting it isn't required for success.

Action 2 [OpenGap PR and issues]: P(failure) 20%. Reason: Routine public open-source contribution. Review exposure is carried by Threat 2. EleutherAI merging is not required.

Action 3 [Evaluator package, op-ed, EU submission]: P(failure) 40%. Reason: AISI adopting and running the package before the rival releases is uncertain given its capacity. The EU submission is routine.

Action 4 [Ohio on fixed dates]: P(failure) 50%. Reason: An 8-day vendor credential grant is aggressive, and counsel has held the notices three times. Leadership override is plausible but uncertain.

Action 5 [Brazil offer, GSI note, arming, stats]: P(failure) 40%. Reason: Foreign sector channels are slow, the replay depends on artifact access, and the statistics may be caught by litigation review. The core refresh is near-certain.
</action_odds>

<threat_odds>
Threat 1 [OpenGap divergence / carve-out dispute]: P(materialises) 35%. Adversary suggested 40%. Divergence is plausible and Apollo has pushed back on calibration before. It requires the co-gate to actually run and the dispute to block the decision, so slightly lower.

Threat 2 [D&O/Buist swallows PR, comment, op-ed]: P(materialises) 45%. Adversary suggested 50%. The pattern is well established and the op-ed is the likeliest to be held. A lockfile pull request is harder to frame as coordination under Buist, so slightly lower.

Threat 3 [Researcher 4 successor ships unchecked]: P(materialises) 30%. Adversary suggested 40%. "Late spring" makes a May release roughly a coin flip, and it also has to land before AISI's check. A verified CL-5.75+ jump is at the upper end of plausible.

Threat 4 [Backup-tier third copy / access delay]: P(materialises) 45%. Adversary suggested 50%. Backups very likely hold snapshots, and access delay is also plausible. But backup copies were an anticipated scope that the purge can absorb without a new "surprise," which lowers it slightly.

Threat 5 [Brazil replay miss / sovereignty pushback]: P(materialises) 30%. Adversary suggested 35%. A replay miss is plausible given template rotation. Sovereignty objections to a voluntary shadow-mode offer are more likely to show up as deferral than as a headline.
</threat_odds>
