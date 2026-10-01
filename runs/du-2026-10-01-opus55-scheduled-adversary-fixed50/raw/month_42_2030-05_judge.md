<verdict>MOSTLY REALISTIC</verdict>
<score>7</score>
<lean>BALANCED</lean>
<lean_reasoning>
The month was roughly balanced. The causal test's headline was rounded toward success: a "pooled" estimate cleared 2pp even though one arm read 2.4pp and the other 1.1pp. The CSIRT pilot formed quickly. Against that, all three science items failed, which is worse than the median a 60% failure figure implies, and the rival measurement, preemptible capacity and pilot were all refused. The two directions of error roughly cancel.
</lean_reasoning>
<reasoning>
Most odds were sensibly set and honoured:
- **Action 3 (60%) failed.** AISI declining Anthropic-authored items in GDM's test for "protocol integrity" is exactly what would happen.
- **Action 2 (35%) succeeded in watered-down form.** The extension runs only to the Q3 review, preemptible capacity was refused a third time, and the memo was only acknowledged.
- **Checkpoint 2 was handled well.** Message 1 stated a distribution (mean +0.02, SD ~0.012, P(≥0.03) ≈ 22%), and the +0.021 readout sits at its median.
- **Action 4 (35%) is plausible but a little quick.** The in-house SDK patch with ~400 complaints and a rollback flag is realistic. A 16% fall in exposed endpoints within three weeks is optimistic but defensible. A 90-day ENISA-hosted indicator pilot agreed four weeks after charter adoption is fast. Singapore's demand that Anthropic not be the sole source is a good touch.

The main problem is Action 1:
- Message 1 named a 1–3pp ambiguous result as the key risk.
- The outcome then reported 2.4pp on rotated items and 1.1pp on transcript items, yet stated that the "pooled estimate cleared" 2pp. Any reasonable pooling of those two arms falls below 2.4 and likely below 2.
- So the classification was steered to "causal, partial" rather than "ambiguous."
- The downstream consequences are appropriately modest: the mix is 2% and enters after checkpoint 3.

Action 6 resolved with all three blockers slipping, despite per-item failure odds of 50–65%. That is harsher than median, although each slip (source-translation requirement, a nine-day miss, titre at 68%) is individually realistic.

Exogenous events are plausible and not chosen to favour the player: rising unemployment, OpenAI starting a run under its own monitors, and anti-AI primary wins. The 19 May date for the Pennsylvania and Oregon primaries is correct. Capability pacing (+0.11, with rivals at +0.10) stays consistent with the CI-7.0 deadline.
</reasoning>
<issues>
- Action 1: the "pooled estimate cleared ≥2pp" claim is inconsistent with component estimates of 2.4pp and 1.1pp (CI −0.4 to 2.6). A threshold-adjacent result was resolved toward success without a stated pooling rule.
- Action 6: all three items failed against per-item failure odds of 50–65%. At a median roll, about one blocker should plausibly clear, so this is mildly harsh.
- Action 4: a 90-day operational indicator feed agreed roughly four weeks after charter adoption is fast for three national agencies. It is also unclear why endpoint exposure fell 16% in three weeks when most deployments pin older SDKs.
- Minor calendar error: the April jobs report is dated 2 May (a Thursday). In 2030 the BLS release would normally fall on Friday 3 May.
- Missing reaction: OpenAI started a frontier run with no external items soon after Rotterdam and the anti-AI primary wins. There is no AISI or Hill reaction to this (for example a letter, comment or press question).
</issues>
<feedback_for_simulator>
- For any pre-registered threshold readout, state the pooling or weighting rule in message 1. The reported aggregate must then follow arithmetically from the component numbers you publish.
- When a success condition is "k of n items," resolve the items individually at their stated odds. Do not let all of them fail by default when the median implies a partial clearance.
- Simulate government and safety-institute reactions to OpenAI's externally unmonitored GPT-7.5 run. Also show the GDM successor release decision and how AISI's findings shape it.
- Check fixed-date calendar items (BLS release days, cabinet cycles) before using them.
</feedback_for_simulator>

<du_progress>
A. Verified technical alignment: 3/10 (0). Evidence: a first causal, partial attribution of eval-gaming to a feature cluster was logged against an AISI pre-registered threshold. It is weak on never-seen items, a second pathway is suspected, and it has not been independently replicated. Checkpoint 2 is below trigger (+0.021) but drifting up. AISI red-teaming shows eval-awareness without concealment.
B. Real-world alignment in action: 5/10 (0). Evidence: pre-registration and the null/causal logging plan were honoured. The attributed public call was held by counsel again, and the honesty pledge is still diluted.
C. Human alignment: 2/10 (0). Evidence: unemployment is 7.9%, anti-AI candidates won primaries, the pilot and fund were deferred, and the app grew modestly (~74.8k users, 431 placements).
D. Self-repairing systems: 7/10 (0). Evidence: the pre-registered hold trigger is live and read on schedule, the causal test ran against a pre-registered threshold, and a correction is queued behind a held-out check. The idle-trough rule is extended only to Q3, and preemptible capacity was refused.
E. Capability growth without trouble: 2/10 (0). Evidence: the frontier is on the ASI path (6.26), and OpenAI internal is at ~6.00 and starting a new run under self-monitoring only. V7-R misuse persists, and MCP exposure is down ~16%.
F. Robust governance and verification: 4/10 (0). Evidence: the CSIRT channel has its first operational product (an indicator pilot with three contributors), and the NUS replication posted. AISI refused cross-lab items, OpenAI is outside external testing, and nothing binding exists in the US. China is absent.
G. Broad benefit and no permanent underclass: 2/10 (0). Evidence: TB, DNDi and GFI all deferred again (GFI titre at 68%), and unemployment is rising.
H. Diversity, agency and consent: 4/10 (0). Evidence: labs remain plural, and voters are expressing anti-AI preferences through elections. CI-6 release terms still rest on CEO discretion.
Overall: 36.5/100 (0)
Trajectory: FLAT.
- **Biggest gain:** the causal, partial mechanistic finding, with a correction approved for the successor mix.
- **Biggest backslide:** OpenAI launched a frontier run with no external items amid 7.9% unemployment and anti-AI primary wins.
</du_progress>

<setup_fix>
none
</setup_fix>
