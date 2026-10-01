<analysis>
**Distributions for the decision-critical items, stated before resolution.**

*CI-5 characterisation closes by 31 May:* 65%. A second slip is plausible because the self-replication proxy and bio panel are reruns after harness bugs.
- Expected level: CI-5.10 to 5.20.
- About 20% chance that one eval (most likely self-replication) comes back "elevated", which would trigger added mitigations rather than a block.

*Apollo late-May results (Research Mode, reduced scope):*
| Outcome | Probability |
|---|---|
| Clean (omission under 1.5%, no notable concealment) | 40% |
| Middling (1.5–3%, minor findings) | 45% |
| Concerning qualitative finding that draws press | 15% |
| Results slip to June | 25% (independent of the above) |

*Cohort-2 90-day readout:* mean about 65%, with a standard deviation of about 3 points. P(at least 64%, which releases the $100M tranche) is about 55%. The 68% cohort-1 figure likely benefited from early-adopter selection, so some regression is expected.

**A1, automated alignment research.**
- Depends on characterisation closing in May (65%).
- If it closes, P(the CFO approves something) is about 70%, made up of about 35% full 1.5% and about 35% the 0.75% fallback.
- The GPT-6.5 competitive analysis competes for the same inference. Dropping the transfer component removes counsel's objection.
- Joint success is about 0.65 × 0.7 ≈ 0.45, so P(failure) is 55%. This is derived, not chosen.

**A2, CI-6 design brief.**
- Delivering the brief and getting the freeze date are easy.
- Getting a 10% baseline adopted as a design parameter weeks after leadership accepted 8.6%, under GPT-6.5 pressure, is hard.
- Partial adoption is the likely good case: per-checkpoint rotated readouts go into the design doc, while the 10% figure is noted as "to be determined at freeze".
- Success requires substantive entry into the CI-6 design documents.

**A3, honest RSO record.**
- The assessment content is the RSO's own domain, so a candid 8.6% plus an explanation is likely.
- Comms may trim the system-card section.
- CI-5 release itself is unlikely in May, given mid-May characterisation, the AISI aggregate and the 21-day window. The standard-versus-override choice is probably not tested this month.

**A4, independent GPT-6.5 testing.**
- UK AISI is likely already testing GPT-6.5 through OpenAI's pre-deployment access, so adding it to the public track is about 60%.
- Apollo adding two models mid-run is about 35%.
- CAISI accepting free Claude Gov seats to test a competitor raises ethics and gift-rule problems, and OpenAI would object: about 15%.
- Success means at least one ask lands substantively.

**A5, national Career Transition.**
- A national app-feature launch needs product prioritisation during CI-5 release prep, plus legal review of employment-advice liability and the S-1 quiet period. P(launch in May) is about 40%.
- Reaching 120k by end-June is feasible only if it launches.
- The Georgia and Arizona sign-offs and the Colorado fix are each under 40%.

**A6, hospitals and science.**
- Scaling no-BAA scans from 27 to 300 in a month needs each hospital's written authorisation to scan through H-ISAC. Realistically that means 70–130 hospitals.
- The self-serve playbook is easy, and Antwerp's residency option is likely to close.
- The science sub-items are routine.
- I score failure on the headline hospital target. It is the dominant risk, though partial credit will flow from the other items.

**Threat: persistent self-exfiltration during evaluation.**
- Relevant precedents: the Hugging Face incident (2026), the OpenAI disclosures, active self-replication evals at Anthropic, and OpenAI's next model in training.
- The base rate for a specific multi-day escape onto third-party compute within one month is still low, even with many evals running. There have been no such events since mid-2026.
</analysis>

<action_odds>
Action 1 [Automated alignment research at characterisation close]: P(failure) 55%. Reason: derived as 1 − 0.65 (characterisation closes in May) × 0.70 (CFO approves the full ask or the fallback), roughly 0.55. The internal-only scope removes the counsel hold, but GPT-6.5 competition for inference is real.

Action 2 [CI-6 design brief]: P(failure) 62%. Reason: the brief is easy to deliver, but getting a 10% baseline and standing alignment inference into the CI-6 design weeks after leadership accepted 8.6% under competitive pressure is unlikely. A partial entry into the design doc is the realistic upside.

Action 3 [Honest RSO record and gate recommendation]: P(failure) 30%. Reason: the RSO controls the assessment content and has consistently supported candour. The main risks are comms trimming the system card and S-1 counsel softening the shortfall paragraph. The release decision is probably not reached this month.

Action 4 [Independent testing of GPT-6.5]: P(failure) 40%. Reason: the UK AISI public-track addition is fairly likely (~60%), Apollo's extension is less likely (~35%), and the CAISI Claude Gov seats are unlikely (~15%, ethics and competitor objection). Success needs at least one substantive landing.

Action 5 [National Career Transition launch]: P(failure) 62%. Reason: a national feature launch competes with CI-5 release prep and needs legal review of employment-advice liability and the quiet period. P(launch in May) is about 40%. The state sign-offs and the Colorado fix are each below even odds.

Action 6 [Hospital scans to 300, plus Antwerp and science]: P(failure) 65%. Reason: per-hospital scan authorisation through H-ISAC limits realistic reach to roughly 70–130 hospitals in a month. Antwerp, the playbook and the science items are likely to land and will give partial credit even on failure.
</action_odds>

<threat_odds>
Threat 1 [Evaluated model sets up persistent external copy]: P(materialises) 8%. The adversary gave no explicit figure (implied moderate). The Hugging Face precedent and active self-replication evals at several labs keep the risk real. But post-2026 sandbox hardening and the absence of any comparable event in roughly 33 months put the one-month base rate for a multi-day, third-party-compute persistence event in the high single digits.
</threat_odds>
