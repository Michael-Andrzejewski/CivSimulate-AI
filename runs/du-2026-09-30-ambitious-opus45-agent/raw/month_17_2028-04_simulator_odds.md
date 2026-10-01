<analysis>
**Action 1 (fix the disclosure gap).** This needs three things by 14 April:
- leadership to reassign reviewers away from the serving and eval harness during release-decision month;
- a review rubric to be written;
- legal and comms to sign off on a partner update.

The hearing deadline is a strong motivator, and the CEO has an incentive not to be exposed. Two sub-risks are modelled as threats and are not double-counted here: staffing falling short of 5% (Threat 3) and counsel holding the update (Threat 2). The residual execution risk is leadership preferring to "wait for AISI's observations" before changing controls, plus rubric and tooling delays.

Stated empirical odds if review runs:
- **Concerning trajectory:** about 25% that 5% human review surfaces at least one trajectory reviewers judge genuinely concerning. This means non-trivial coordination or unsanctioned resource use, not just ordinary errors. The telemetry base is thin and eval-flagging is high.
- **Partners noticing:** about 15% that a Glasswing partner independently notices, or queries, how thin the monitoring is before the update arrives.

**Action 2 (hearing testimony).** Preparation is routine. The hearing itself is hostile, with Hawley and a jobs frame. Message (b) depends on Action 1 being real by 16 April, which is a prerequisite risk. Unemployment at 6.1% gives senators an easy line. OpenAI and xAI are also named, and whether their executives appear shapes the dynamic. Leaks are modelled separately in Threat 1. Probability the testimony is broadly neutral-to-favourable in coverage: about 60% if Action 1 lands, lower otherwise.

**Action 3 (condition public release on AISI's recommendations).** The board has already rejected the conservative framing once and faces competitive pressure: third at CI-4, a stock near the offer price, and an available expedited tier.
- **What helps:** external authority is stronger than the internal memo. AISI is also likely irritated that Anthropic released to about 30 partners 10 days after AISI outlined safeguards the release lacked. I put about 60% on AISI registering this in its observations, either in writing or through a pointed call. That makes adopting the conditions a way to repair the relationship.
- **What makes full adoption hard:** leadership may accept human review and triggers but resist 72-hour notification to a foreign regulator, or scoped access for a public release.
- **Separate risks:** AISI slipping (Threat 5) and DeepSeek pressure (Threat 4) are separate threats.

**Action 4 (v2.5 public-only).** This is already scheduled by security for mid-April, and stripping the AMBER material removes the main blocker. The residual risk is GC dual-use review of the "behavioural signatures," even when drawn from public literature, plus the hearing-week comms freeze.

**Action 5 (detector redesign spec).** A specification only, and Apollo is contracted. However, Apollo's scope was scenario authoring, so a design role may need a contract amendment and another recusal check. Internal staff are likely to be reclaimed again for release decisions and the hearing. The spec could also come out thin: invariants listed without an operational definition. Probability the spec, if produced, contains a validated-in-principle behavioural signal: low, about 20%. It is a paper document this month.

**Threats.**
- **Threat 1 (note leaks).** Legal holds the note, and Hawley's production was scoped to gate correspondence. A leak needs a whistleblower or a new demand within about four weeks. A partner correction update raises Hawley's staff curiosity only modestly within the month.
- **Threat 2 (counsel holds the correction).** Counsel's pattern of intervention is real.
- **Threat 3 (review understaffed).** Five straight months of staff reclaims, partly offset by hearing urgency.
- **Threat 4 (DeepSeek V5.x).** Rumoured, and the timing fits, but a jump to 2.4–2.7 days is aggressive.
- **Threat 5 (AISI slips).** Government timelines slip. AISI's reaction to the release may make the content sharper rather than hedged, but lateness is the main mode.
</analysis>

<action_odds>
Action 1 [Human review + accurate partner update]: P(failure) 35%. Reason: leadership has strong pre-hearing incentive, but must reassign staff during release month and write a rubric. Staffing shortfall and counsel delay are carried by Threats 3 and 2, not here.

Action 2 [Hawley testimony prep]: P(failure) 35%. Reason: prep is routine, but the venue is hostile, jobs data is poor and message (b) depends on Action 1. Failure means testimony coverage turns negative ("still no real oversight"); a leak of the note is Threat 1.

Action 3 [Condition public release on AISI's recommendations]: P(failure) 55%. Reason: the board rejected the conservative framing last month and competitive pressure is high. External authority and a likely AISI rebuke help. Partial adoption (human review and triggers, not 72-hour notification or scoped access) is the likeliest success mode.

Action 4 [Defender's Guide v2.5 public-only]: P(failure) 20%. Reason: already scheduled, and the AMBER blocker has been removed. Residual risks are GC dual-use review of behavioural patterns and the hearing-week comms freeze.

Action 5 [Detector redesign spec with Apollo]: P(failure) 45%. Reason: Apollo's scope may need amending, internal staff reclaims are chronic and it is a busy month. Success is only a specification, not evidence of a working signal.
</action_odds>

<threat_odds>
Threat 1 [Dissent note surfaces]: P(materialises) 15%. Adversary suggested 25%. The note is under legal hold, the prior demand was scoped narrowly, and a leak within four weeks needs a whistleblower. Hawley's interest keeps it non-trivial.

Threat 2 [Counsel holds the partner correction]: P(materialises) 35%. Adversary suggested 40%. Counsel's pattern is real, but the CEO has a strong incentive for a pre-hearing paper trail. Softened wording is the likelier mode than an outright hold.

Threat 3 [Review not staffed at 5%]: P(materialises) 40%. Adversary suggested 45%. The five-month reclaim record is strong evidence, but hearing and release stakes give leadership rare motivation to protect staff.

Threat 4 [DeepSeek V5.x mid-month]: P(materialises) 30%. Adversary suggested 40%. The rumour and cadence fit, but a same-month release is uncertain, and a jump to about 2.5 days in 11 weeks is aggressive. If it materialises, a smaller gain is equally likely.

Threat 5 [AISI observations slip or hedge]: P(materialises) 40%. Adversary suggested 35%. Government written products routinely slip past "about six weeks." The release without safeguards makes the content more likely to be pointed than hedged, but lateness past the board pre-read remains likely.
</threat_odds>
