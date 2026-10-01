<analysis>
**Action 1 (routing layer).** The code exists and the release freeze has ended. However, the layer has never run on the critical serving path under Opus 6 load, which is about 40 times Glasswing volume. A cautious SRE lead will want a canary rollout, load testing and a rollback plan, and two weeks is tight for that. Even if it deploys cleanly, the layer only reallocates about 13–14 reviewers; it adds no capacity. Glasswing can plausibly reach 4–8% only by reducing public review further. Counsel will again keep percentages out of any "documentation." Threat 3 separately covers a production regression and rollback. Execution risk alone is moderate.

**Action 2 (de-identification and validation).** Drafting a protocol in about three weeks is feasible. Legal approving it "once for all partners" is not, because the contracts restrict research reuse regardless of de-identification. The health-records vendor has already refused. The bank asked for exactly this protocol, so it is the realistic path. Running validation by 31 July requires the bank's sign-off, a data pipeline and an analysis pass, which is a lot for one month. Berkeley's schedule still names both partners. Threat 1 carries the consent-specific risk, so the action's own P(failure) covers drafting, legal approval of the protocol itself, and engineering.

**Action 3 (in-camera reading and Hawley package).** Blumenthal's staff have already accepted. Scheduling a reading before the August recess is routine. Counsel will narrow the "contextual package" and may veto or soften the media talking points. Hawley's authorisation requires a subcommittee vote or chair action and takes weeks. He can formally seek it in July, but a grant within July is unlikely. Blumenthal reading the note while Hawley is refused access could strain their co-sponsorship. Securities plaintiffs noticing the reported note is plausible.

**Action 4 (independent indicators, v2.7).** V5.x runs locally, so Anthropic's own telemetry sees V5.x attacks only indirectly, through actors who also probe Claude. Public Lakeshore forensics may be thin while the FBI investigation is open. BSI and NCSC-NL can share non-AMBER material, but coordination takes time. The GC's dual-use review is still not pre-cleared, and the last guide slipped by eight days. Shipping by 20 July with meaningful new indicators is uncertain.

**Action 5 (tier framework).** This is an internal design document due by month's end, so it is feasible. There is friction: enterprise sales will resist telling customers they are on "Standard," and counsel will strip numeric caps, as it has done before. The failure risk is watered-down content rather than no document.

**Threats.**
- **Threat 1 (consent gap):** its premises are largely in the world state.
- **Threat 2 (subpoena):** a formal push is fairly likely; authorisation being granted in July is less so.
- **Threat 3 (rollback):** rolling back new critical-path code is plausible, but a canary rollout reduces the risk.
- **Threat 4 (Slack leak):** the framework is due 31 July, so little of it reaches partners within the month.
- **Threat 5 (Gemini 6 in July):** "late summer" means a July release would require a fast CAISI clearance plus an immediate launch.
</analysis>

<action_odds>
Action 1 [Deploy stratified routing layer]: P(failure) 35%. Reason: The code is finished and the freeze is over, but it is new critical-path code under heavy post-launch load. The SRE canary process, limited reviewer capacity and counsel's rules on documentation make a clean deployment by 15 July uncertain. The rollback risk itself sits in Threat 3.

Action 2 [De-identification protocol and validation]: P(failure) 50%. Reason: The drafting and engineering timeline is ambitious (protocol by 20 July, validation by 31 July). "Legal approves once" conflicts with contract terms. The partner consent risk itself sits in Threat 1.

Action 3 [Blumenthal in-camera reading and Hawley package]: P(failure) 25%. Reason: The reading is already accepted and scheduling is routine. The residual risk is counsel narrowing the package, the talking points being vetoed, and recess timing.

Action 4 [Independent V5.x indicators, v2.7 by 20 July]: P(failure) 40%. Reason: Anthropic has limited direct visibility into local open-weight use, public forensics are thin during an active FBI case, the GC's dual-use review is still not pre-cleared, and the last release was eight days late.

Action 5 [Tiered partner monitoring framework]: P(failure) 30%. Reason: This is internal design work within existing channels. Enterprise-sales and legal friction are likely to water it down (no numeric caps) rather than block it.
</action_odds>

<threat_odds>
Threat 1 [Consent gap persists]: P(materialises) 50%. Adversary suggested 55%. I am slightly lower because the bank itself asked for a de-identification protocol, so its path is real. The vendor's refusal and the contractual reuse limits are documented facts.

Threat 2 [Reading strengthens subpoena case]: P(materialises) 35%. Adversary suggested 40%. I am slightly lower because authorisation requires committee procedure and a July grant is unlikely. However, a formal push citing the Blumenthal reading, plus waiver arguments from plaintiffs, is quite plausible before the recess.

Threat 3 [Routing regression and rollback]: P(materialises) 25%. Adversary suggested 30%. I am slightly lower because a staged canary deployment reduces the chance of a full rollback. The capacity arithmetic that limits Glasswing rates is handled inside Action 1's outcome and is not double-counted here.

Threat 4 [Two-class monitoring leak]: P(materialises) 20%. Adversary suggested 35%. I am lower because the framework is only due by 31 July, so it will have reached few partners. A leak to the press or Hawley within the month is less likely than the June spillover pattern suggests.

Threat 5 [Gemini 6 ships by 31 July]: P(materialises) 15%. Adversary suggested 30%. I am lower because Google's stated target is late summer, and a July release would require CAISI clearance at the very end of the standard window followed by an immediate launch. An August release is more likely and falls outside this month.
</threat_odds>
