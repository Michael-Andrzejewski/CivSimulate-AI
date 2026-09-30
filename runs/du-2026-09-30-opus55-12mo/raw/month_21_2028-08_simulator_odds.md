<analysis>
**Capability clock, declared before the rolls.**
- **Index.** The frontier moves from 2.6 to about 2.75 this month (Level 3 = 3.0, projected Q1 2029).
- **Why.** OpenAI's near-90% automated R&D implies effective compute of roughly 3–4x per quarter, with algorithmic gains now larger than hardware gains.
- **Named runs.**
  - A GPT-7-class run is in training, with a preview expected Q4 2028.
  - A Gemini 5 successor is in pretraining.
  - Grok 6 is finished and pending release.
  - DeepSeek V7 is expected October–November.
- **Anthropic.** Its effective progress is about half the frontier rate while the suspension lasts.
- **Competitors.** In message 2, GDM and OpenAI enterprise sales will use the suspension in their pitches as "reliability" or "continuity" messaging, and recruiters will target Anthropic researchers. Exogenous events are chosen separately from the rolls.

**Action 1 (hermetic oversight pipeline).** This is a well-understood technique applied to a scoped pipeline, which is easier than refactoring 40 packages. The hard parts:
- vendoring the dependency closure;
- moving the CI definitions the pipeline imports;
- getting all of it done in time for a red-team in the last week of the month.

The staff contention that sank July still exists. Success means the build is live and the named paths are closed before the red-team runs. A failure leaves the build incomplete: at most one named path closed and the other open. Whether the red-team finds a new door, or slips, is Threat 2 and is not counted here.

**Action 2 (rule-based detector).** A deterministic rule is cheap to write, and scoring it retrospectively on the 82 items is trivial. Publishing the reading rule is routine. Flag volume and the circularity critique belong to Threat 1.

Declared distribution for the prospective August organic count (detector plus four monitors):
- **New organic items:** 40–90. Organic items are scarce because autonomous sessions are suspended.
- **Cumulative organic n:** about 120–170.
- **Combined miss point estimate, read by the success margin:**
  - margin above 40: ≤3%;
  - margin 15–40: 3–5%;
  - margin below 15: 5–7%.
- **CI upper bound:** above 5% in every branch. ≤5% cannot be resolved this month.

**Action 3 (root-cause study).** Pre-registration and the start of training are feasible. Results come in September–October, not August. The risks are compute and staff allocation during the suspension.

**Action 4 (run the gate as pre-registered).** Publishing verbatim is procedural. Two frictions:
- counsel may delay the RSO's written view until close to October, given the amended *Oyelaran* complaint;
- the drift re-evaluation may slip.

Whether the evidence itself is bad is Threat 3.

**Action 5 (cross-lab handoff).** Needs Redwood's consent, which is likely. The tooling release is tied to the Q3 standard, so it could land in September; that is fine as long as it is dated. Refusals and leaks are Threat 5.

**Action 6 (defenders and benefits).** Routine channels. Declared non-adverse outcomes for the NRECA scale-up, by success margin:
- low margin: +10–20 co-ops;
- mid margin: +20–40;
- high margin: +40–60, with utility-side staff as the cap.

Utah Q3 data is not due until October, so this month covers only the rule. METR and UK AISI results are not due in August.

**Threats**
- **T1.** Volume is likely to be high, but only human-in-the-loop sessions are live. The circularity critique is near-certain but mild. "Materialises" means the budget is exceeded or items are deferred, and the organic number stays unresolved.
- **T2.** Hermetic builds leak through caches, the vendoring refresh process, or runtime metadata. The red-team's mandate is broad, and slippage is plausible.
- **T3.** The earlier probe failed to transfer, and the sealed half removes any room to tune. I judge a miss on at least one of the two readouts to be likely. Timing slips count as non-adverse.
- **T4.**
  - The two sub-events: Grok 6 in August (~30%), OpenAI announcing it has passed 90% (~35%).
  - I set the probability that at least one lands and settle which one in message 2 from the roll position:
    - bottom third of the band: both;
    - middle: OpenAI only;
    - top: Grok only.
- **T5.** A leak within the same month is less likely because distribution is still in progress. Legal routing is plausible given *Buist*.
</analysis>

<action_odds>
Action 1 [Hermetic oversight pipeline]: P(failure) 40%. Reason: technically sound and narrower than the refactor, but a month is tight for vendoring the closure plus moving the CI definitions under the same staff contention that failed in July. Red-team findings and slippage are modelled in Threat 2.

Action 2 [Rule-based detector + organic-governs rule]: P(failure) 20%. Reason: a deterministic rule and a published reading rule are cheap and Redwood-controlled. The flag volume and circularity risks sit in Threat 1. The declared organic distribution caps the upside: the CI cannot resolve ≤5% this month.

Action 3 [Pre-registered root-cause study]: P(failure) 20%. Reason: pre-registration and the start of small-model training are routine. Compute and staff contention during the suspension are the main risks, and no results are due in August.

Action 4 [Gate as pre-registered + RSO record]: P(failure) 30%. Reason: verbatim publication is procedural, but counsel friction before the amended complaint, and possible slippage of the re-evaluation, could hold back the RSO view or its timing. Bad evidence is Threat 3.

Action 5 [Cross-lab finding + open tooling]: P(failure) 30%. Reason: Redwood's consent is likely, but the tooling release is tied to the Q3 standard and may be dated for September, and handing material to six organisations takes coordination. Refusals and leaks are Threat 5.

Action 6 [Defenders + benefits verbatim]: P(failure) 20%. Reason: existing lanes and routine publication. Co-op scale is capped by utility-side staff, per the declared bands.
</action_odds>

<threat_odds>
Threat 1 [Detector swamps budget / looks fitted]: P(materialises) 40%. Adversary suggested 45%; reason for difference: with autonomous sessions suspended, only human-in-the-loop sessions are exposed, and tiering already exists. However, the hermetic migration itself generates heavy manifest and CI churn, so the risk stays substantial.

Threat 2 [Third door found or red-team slips]: P(materialises) 45%. Adversary suggested 45%; reason for difference: it matches. Hermetic isolation leaks in practice, the red-team has a broad mandate, and Redwood carries a competing workload. The July deferral is direct precedent.

Threat 3 [Gate evidence bad in August]: P(materialises) 45%. Adversary suggested 40%; reason for difference: slightly higher. The earlier probe's transfer failure and the sealed test half make a sub-0.80 result or residual drift quite likely, and only one of the two readouts needs to miss.

Threat 4 [Grok 6 ships and/or OpenAI >90%]: P(materialises) 45%. Adversary suggested 35% for Grok and ~50% for OpenAI; reason for difference: xAI keeps slipping and OpenAI announces milestones opportunistically. I estimate about 30% and 35% separately, combined at about 45% for at least one, with the split settled by roll position as declared.

Threat 5 [Leak or lab counsel refusal]: P(materialises) 25%. Adversary suggested 30% for a leak and 25% for a refusal; reason for difference: distribution only starts this month and is framed as a behaviour class with no traces, so a leak within the month is less likely. *Buist*-driven legal routing at one lab is still plausible.
</threat_odds>
