<analysis>
**Action 1 (harness v3).**
- **Engineering scope.** A shared synthetic clock across tool outputs, logs, file metadata and API responses is tractable engineering. A full audit of every side channel is not something that finishes in three weeks.
- **External dependencies.** A paid Apollo red team needs contracting and a start date. Fine-tuning the current frontier model as a discriminator is cheap internally.
- **Allocation deposit.** Asking the RSO to deposit a fixed harness allocation with the LTBT goes to a board that declined the 60-day split on 24 March and whose minutes criticise Claude's memo. The RSO can deposit the request, but the board may treat a fixed allocation as a binding commitment it wants to review.
- **What the P(failure) covers.** Execution risk only: the fix ships, the gate is run properly, and the allocation is at least lodged. Whether a stronger discriminator finds a new channel is Threat 1 and is not double-counted here.
- **On Threat 1.** The two framings are both synthetic and run in the same harness, so "too clean" statistics should not separate observed from unobserved. That makes the task harder than general evaluation-versus-deployment detection. Still, a fine-tuned frontier discriminator facing a hard ≤0.55 bar is a demanding gate, and residual cues such as prompt scaffolding or task recurrence are likely.

**Action 2 (METR publication).**
- Mostly comms work on pre-written branches, which carries low risk.
- The main exposure is that METR has already slipped twice on capacity, and a May slip would leave the action partly unexecuted.
- Voice-discipline risk is modest, because rivals are no longer named.

**Threat 2 (strong Researcher 3, haircut Anthropic run).** This is a conjunction:
- Both results release in April.
- Researcher 3 is verified at 1.35× or above. The GDM precedent (1.34× claimed, 1.26× verified) suggests OpenAI's 1.42× claim also gets haircut, to perhaps about 1.3×.
- Anthropic's days are haircut, which is likely given the pauses and the clock cutover.
- The annex shows a framing gap.

Each piece is plausible, but together they are well under 45%.

**Action 3 (verifier institution).**
- Board seating is already scheduled, and the comment filings are routine.
- OFAC/BIS written guidance will not arrive within a month. This is a normal agency pace, not a failure.
- The subgrant option is simply the board's own choice.
- Main risks: a seat slips, or the second foundation's diligence stalls.

**Action 4 (co-op defence).**
- 200 co-ops by May is ambitious through incumbent DOE-funded channels (RC3, ICS-REC).
- The DoD designation gives risk-averse co-ops a concrete reason to hold back, which is the mechanism behind Threat 3.
- Going from 2 to 6 module adopters is a moderate stretch.
- Execution risk alone is moderate to high.

**Action 5 (benefits).**
- Indiana's LOI-to-contract is timed for Q2; April progress is likely, a signed contract less so.
- Enrolment rose by about 16,400 last month, helped by the encouragement launch. Reaching 170,000 needs +20,200, which is a stretch.
- The Nebraska MOU and the Kansas State output are plausible but slow.
- The pharma funding is already contracted, so low risk.

**Threat 4 (securities class action).**
- The drawdown is large and follows a discrete event, which is the classic trigger.
- However, the gate and the pre-commitment were disclosed publicly in January. That weakens any claim of misstatement, though plaintiff firms often file weak claims anyway.
- Filing within this specific month is uncertain.

**Threat 5 (rival capability jump).**
- The capability clock must accelerate toward CL-6 in 2030. Rubin capacity is ramping, and preview-to-GA cycles for Chinese labs run about two months.
- A notable rival step in any given month is roughly a coin flip.
- Planned deltas absent the threat:
  - OpenAI and GDM: about +0.04 CL each.
  - DeepSeek: +0.03.
  - xAI: +0.03.
  - Anthropic: +0.01 on the fallback recipe.
</analysis>

<action_odds>
Action 1 [Harness v3 + frontier-discriminator gate]: P(failure) 45%. Reason: the synthetic clock is feasible, but a full side-channel audit and Apollo contracting by about 20 April are tight, and the board may resist a binding fixed allocation after declining the split. Discriminator-driven failure is modelled separately in Threat 1.

Action 2 [Publish METR results on pre-written branches]: P(failure) 25%. Reason: this is mostly routine comms. The main risk is another METR capacity slip past April, which leaves the action largely moot.

Action 3 [Seat the grant board, v4 comment, V7 guidance/subgrant]: P(failure) 25%. Reason: seating and comments are already scheduled. Diligence for the second foundation and a quick subgrant decision are slower. OFAC/BIS guidance will not arrive this month; that is expected and does not count as failure.

Action 4 [Co-op defence packages + module adoption]: P(failure) 45%. Reason: 200 co-ops is ambitious through incumbent DOE-funded channels, open-weight maintainers adopt slowly, and 6 adopters is a stretch from 2.

Action 5 [Claude Works / medical / farms scale]: P(failure) 30%. Reason: the pharma tranche is contracted, but the Indiana contract is Q2-timed, 170,000 enrolled is above last month's pace, and Nebraska is uncertain.
</action_odds>

<threat_odds>
Threat 1 [Frontier discriminator finds a new channel]: P(materialises) 50%. Adversary suggested 55%. A fine-tuned frontier discriminator against a ≤0.55 bar is very demanding. Both framings are synthetic, though, which removes "too clean" cues, so this is slightly below the adversary's figure.

Threat 2 [Strong Researcher 3 / haircut Anthropic run]: P(materialises) 30%. Adversary suggested 45%. It is a conjunction: an April release of both, Researcher 3 surviving a GDM-style haircut at 1.35× or above, and a visible framing gap in the run. The Anthropic day-haircut part is likely on its own, but the full combination is less so.

Threat 3 [NRECA/E-ISAC decline; "helping Chinese labs" framing]: P(materialises) 35%. Adversary suggested 40%. The DoD designation and the incumbent DOE programmes give a concrete mechanism. Some co-ops will still take a free package directly, so outright blockage is less than likely.

Threat 4 [Securities class action]: P(materialises) 25%. Adversary suggested 30%. The drawdown and discrete event fit the pattern. However, the gate and the pre-commitment were publicly disclosed, which weakens a misstatement theory, and timing within this month is uncertain.

Threat 5 [Rival capability jump]: P(materialises) 45%. Adversary suggested 40%. The capability path must accelerate toward CL-6 by 2030, Rubin capacity is ramping, and DeepSeek's preview-to-GA cycles are about two months, so a notable step in April is close to even odds.
</threat_odds>
