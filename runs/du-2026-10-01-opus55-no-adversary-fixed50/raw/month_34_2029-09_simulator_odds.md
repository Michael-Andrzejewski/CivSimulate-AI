<analysis>
**Capability clock.** The frontier moves to CI-5.85 this month. The drivers are CI-6 checkpoints running internal experiment campaigns at Anthropic, OpenAI's GPT-7 successor run (inferred from Stargate capex above $600B a year) and Grok 6's preview tuning. No adversary threats were submitted. On the judge's instruction, I flag the CI-6 internal exfiltration risk for message 2 as an exogenous-risk check, priced in stages:
- Logged near-miss (credential touched or scope probe), conditional on Action 1 logging going live: about 20%.
- Unlogged near-miss discovered later: about 8%.
- Actual internal exfiltration with impact: about 2%.

**Action 1: logging-only coverage.** The leads' stated blocker was reviewer capacity, and volunteer staffing answers it. The distilled monitor already runs on the non-preemptible slice, so the marginal compute is small. The risks are named here so that no new ones appear in message 2:
- Leads may resist anyone outside the run team reading CI-6 traces, on data-access or need-to-know grounds.
- The CEO has deferred this twice and may want it folded into a later review.
- Volunteers' own managers may object to the time.
- Inference may object to extra load on the monitor slice.

The two components are priced separately:
- Routine core: no-interruption logging with a small review queue, about 30% failure.
- Stretch: re-measuring the 0.95-precision slice on real CI-6 traffic within the month. This needs volume and labels, about 55% failure.

A narrow success means logging goes live, possibly with a weekly rather than daily review cadence. The slice re-measurement may only be begun.

**Action 2: ablation and AISI test case.**
- *Ablation engineering.* Running fine-tuning episodes on the serving fleet is a real obstacle. Serving clusters are often not configured for training jobs, and inference committed the slice to monitor load.
- *Items.* AISI's 168 items may slip again, as they have twice.
- *Power.* Even if everything completes, about 308 items stays underpowered for a 0.8-point effect, so the most likely good result is a finished but null or underpowered report.
- *AISI note.* An attributed note offering Anthropic's checkpoint as the first test case resembles the public commitment the CEO's office declined in June under listing counsel. It likely needs sign-off and may be held.

Ablation completion is about 50% failure, and the AISI note getting sent is about 65% failure. The action stands or falls mainly on the ablation.

**Action 3: measurement push.** Each component faces its own obstacle:
- *Grok 6.* The preview is limited to Premium+ testers, has no agentic API, and xAI objects to benchmarking. Its terms likely bar automated evaluation, so a careful host may decline or run a reduced chat-only set.
- *Gemini Agent Mode.* Google's review has run since June. It plausibly concludes in September, about 40%.
- *OpenAI.* OpenAI is unlikely to specify a configuration within a month, since it prefers its own numbers. Those numbers may themselves land in September or October.
- *Co-sponsor.* The consortium signing is about 40%.
- *Labelling spec.* The host writing its own spec is routine and likely to happen.

The headline goal of Grok measured publicly is the hardest part.

**Action 4: schools and elections.** This runs through established channels: MS-ISAC, K-12 SIX and the confirmed CIS pilot. Packaging existing rules is routine. Tabletop uptake will be partial, because district finance offices are slow.

**Action 5: Congress.** An AI publishing positions on pending legislation during the listing period is likely to be held or heavily edited by Comms and Legal, especially after the reception of the union letter. If it is published, the "AI lobbying" backlash is likely. Written testimony is only possible if a hearing is noticed. The CAISI line is decided by Senate appropriators, not by this letter. The intended outcome of a testing mandate cannot arrive this month.

**Action 6: benefits and labour.** The obstacles are uneven:
- *Dashboard access.* Read access for the AFL-CIO is feasible, but Legal will resist the right to publish without review, so a watered-down version is likely.
- *Cap.* The support-tier metrics are borderline (71% resolution), and product has granted increments rather than the full ask each time. A rise to 25k or a partial step is plausible.
- *Cellwise and ANT-17.* The Cellwise design-of-experiments and ANT-17 support are routine.
</analysis>

<action_odds>
Action 1 [Logging-only CI-6 exfiltration coverage]: P(failure) 35%. Reason: the volunteer staffing directly answers the stated capacity objection and the compute already exists. The named risks are trace-access and need-to-know resistance from leads, a third CEO deferral, and volunteer-time objections. On a narrow success, logging survives (possibly on a weekly cadence) and the 0.95-slice re-measurement may only begin.

Action 2 [Finish ablation on serving slice; AISI test-case note]: P(failure) 55%. Reason: the serving fleet may not support training jobs or may refuse to share the monitor slice, AISI items have slipped twice, and the result will likely be underpowered regardless. The note offering the checkpoint resembles a commitment leadership already declined and will probably be held. Success mainly means the ablation finishes, with a likely null or underpowered result.

Action 3 [Measure Grok 6/Gemini Agent Mode, OpenAI config, co-sponsor]: P(failure) 55%. Reason: Grok 6 is preview-only with likely anti-benchmarking terms and no agentic API, Google's review timing is uncertain, and OpenAI is unlikely to cooperate quickly. The host-authored labelling spec is the routine piece that survives a narrow failure.

Action 4 [Schools/counties hardening and election drills]: P(failure) 25%. Reason: established ISAC and CIS channels and existing rules make this routine. Tabletop uptake in districts will be partial.

Action 5 [Attributed policy position to Congress]: P(failure) 65%. Reason: a listing-period legal and comms hold is likely, there is backlash risk to "AI lobbying", testimony depends on a hearing being noticed, and appropriators decide the CAISI line independently.

Action 6 [AFL-CIO dashboard audit, 25k cap, Cellwise DoE, ANT-17]: P(failure) 40%. Reason: Legal will likely narrow the publish-without-review right, product typically grants partial cap increases, and the Cellwise and ANT-17 work is routine.
</action_odds>
