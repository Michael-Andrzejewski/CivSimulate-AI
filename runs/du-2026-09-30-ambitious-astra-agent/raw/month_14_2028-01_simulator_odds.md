<analysis>
**Action 1 (small-model matched comparison).** Moving the pair off successor checkpoint slots and onto one short booking in the research pool removes the mechanism that killed October, November and December. The residual risks are:
- The written memo still arrives late or without bookings.
- Choosing and legally clearing a small Llama-family model for new checkpoints takes time. The adversary's point about Meta licence churn is credible.
- A complete pair plus blinded human adjudication must finish by 24 January, which is tight.

Power is the larger scientific problem. A small model can hit floor or ceiling effects, but Threat 5 models that. Execution risk alone is moderate.

**Action 2 (consent/authority curriculum).** This builds a new multi-agent curriculum with disjoint evaluation families and human adjudication in one month, on about 3% of compute that it shares with Actions 1 and 3. Base rate: a first curriculum build slips, or the comparison is too small to read. A runnable curriculum plus a failure analysis is achievable. A completed comparison is less likely.

**Action 3 (outside reproduction and frontier outreach).** EleutherAI's 1B run finishing and Toronto completing a comparison are both plausible, since the teams are already installed and support is routine. Sending an evaluation package to OpenAI and GDM is easy. A commitment from either during launch crunch is unlikely, and GC may again slow outreach to rival labs over *Buist* antitrust exposure. Success is defined as a completed outside comparison and/or a frontier commitment, so partial success is likely.

**Action 4 (broker GA, 70% coverage).** The nested-delegation export is a real engineering problem, and GA depends on the maintainers' cadence. Getting from 43% to 70% of known installs in one month is a large acceleration, and the denominator is growing. The Ohio deliverable is routine. Expect partial success at best, with GA possibly slipping to February.

**Action 5 (400-output audit, continuity).** Execution means freezing the version, drawing and adjudicating 400 outputs by 22 January, and running handoffs. December produced about 960 outputs, so a sample of 400 is feasible, but two reviewers plus the complaints load strain adjudication capacity. Whether the bar is passed, and the funder silence, are carried by Threat 1.

**Action 6 (remediation, publication, procurement annex).** The 27 January publication is already fixed. Remediating the bucket access and adding a second responder are ordinary operations work. Whether live-drill authorisation is granted is carried by Threat 2. An actual procurement adoption step within a month is unlikely, since procurement cycles run in quarters, but delivering the annex is easy.

**Threats.**
- **Threat 1.** My own arithmetic: if the frozen version brings the true failure rate to about 0.7–1%, P(≤2 failures in 400) is about 25–47%. Failing the bar is therefore more likely than not. Funder silence over the holidays is the base rate.
- **Threat 2.** Refusing a live drill 10 days before publication is a common institutional reflex. Residual gaps in the drill itself are also plausible.
- **Threat 3.** This is a niche scaffold, and no PoC has appeared in about 6 weeks since the advisory. Monthly odds are well below the adversary's figure.
- **Threat 4.** A January Ultra release is plausible within Q1 but not the likeliest month.
- **Threat 5.** Hedging clauses in written memos are very typical given three reallocations in a row.

**Per-branch structure, with margin selecting severity:**
- **Threat 1.** Mild branch: the audit fails the bar. Severe branch: some households are also uncovered on 31 January.
- **Threat 2.** Mild branch: live drill refused, replica label only. Severe branch: the drill shows queued writes completing after suspension.
- **Threat 4.** Mild branch: OpenAI pre-announcement or Ultra preview. Severe branch: Ultra GA with multi-month autonomy.
- **Threat 5.** Mild branch: a preemption clause. Severe branch: the clause plus an uninterpretable small-model null.
</analysis>

<action_odds>
Action 1 [small-model matched comparison]: P(failure) 45%. Reason: Moving off successor slots removes the recurring blocker. Written bookings, legal clearance of a small checkpoint and blinded adjudication by 24 January are still tight after three straight failures. Memo preemption and null-result risk are modelled in Threat 5, not here.

Action 2 [consent/authority curriculum]: P(failure) 55%. Reason: This is a new multi-agent curriculum with disjoint evaluation families and human adjudication, built on about 3% of compute shared with the other actions. The runnable curriculum is likely; a completed matched comparison within the month is not.

Action 3 [outside reproduction and frontier outreach]: P(failure) 45%. Reason: EleutherAI and Toronto completing a run or comparison is plausible with routine support. A frontier-team commitment during launch crunch is unlikely, and GC friction over rival-lab outreach under *Buist* is possible. The Threat 4 launch effect is not double-counted.

Action 4 [broker GA, 70% coverage]: P(failure) 50%. Reason: The nested-delegation fix and GA depend on the maintainers' cadence. Moving from 43% to 70% of a growing denominator in one month is a large jump. Partial progress is likely, full success is not.

Action 5 [audit decision and continuity]: P(failure) 40%. Reason: Freezing the version, adjudicating 400 outputs and consented handoffs is feasible but strains two reviewers and the complaints load. Whether the audit passes the bar and whether funders respond are covered by Threat 1.

Action 6 [remediation, publication, procurement annex]: P(failure) 30%. Reason: Publication is already fixed, remediation is ordinary operations work, and the annex is easy to deliver. An adoption step within one month is unlikely and caps the upside. Live-drill authorisation is covered by Threat 2.
</action_odds>

<threat_odds>
Threat 1 [audit fails and B cliff]: P(materialises) 58%. Adversary suggested 60% / 55%; reason for any difference: my binomial estimate at a plausible 0.7–1% true rate gives about 53–75% failure, discounted slightly because the frozen version targets the observed failure mode. Branches: mild (margin large) = audit misses the bar only; severe (margin small) = some households also uncovered on 31 January, which I put at about 45% on its own.

Threat 2 [live drill weaker than interim]: P(materialises) 35%. Adversary suggested 40%; reason for any difference: refusal before publication is a real reflex, but the replica label is already the norm, and remediation of a known holiday-latency gap often succeeds. Branches: mild = live drill refused, second limitation noted (about 25%); severe = drill shows queued writes completing after suspension (about 10%).

Threat 3 [public PoC against unprotected installs]: P(materialises) 12%. Adversary suggested 25%; reason for any difference: this is a niche scaffold, there has been no PoC in about 6 weeks since the advisory, and the advisory contains no exploit detail. Criminal crews already have simpler V5 attack paths.

Threat 4 [Ultra ships or OpenAI early win]: P(materialises) 35%. Adversary suggested 40% / 70%; reason for any difference: Q1 timing makes January possible but not modal. The "no frontier commitment" part belongs to Action 3's own risk and is not counted here. Branches: mild = OpenAI pre-announcement or Ultra preview; severe = Ultra GA with multi-month agents (index about +0.25).

Threat 5 [memo codifies preemption, small-model null]: P(materialises) 45%. Adversary suggested 50% / 45%; reason for any difference: three reallocations make a hedging clause likely, but the research lead's dissents and the board reporting channel create some counter-pressure. Branches: mild = preemption clause or reduced bookings only; severe = clause plus an uninterpretable small-model null.
</threat_odds>
