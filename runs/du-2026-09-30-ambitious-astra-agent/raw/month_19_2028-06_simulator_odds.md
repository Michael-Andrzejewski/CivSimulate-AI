<analysis>
**Capability clock.** Gemini 4 GA on 17 June puts agent-ablation tooling in enterprise hands. That moves the field-wide index from about 6.35 to about 6.45–6.5 by month end, and the move is not Anthropic-specific. OpenAI's security review closing and the Chinese cadence (Kimi K4, the Qwen 4 lineage, a likely DeepSeek point release) keep open weights about 4–6 weeks behind. None of these depend on the player's rolls.

**Slot decision on 5 June.** I will resolve the slot at the review, not leave it pending. Threat 1 models withdrawal. The case for withdrawal is strong: the rehearsal gain was cue-dependent, the three-arm comparison never started, Gemini 4 GA lands on 17 June, and the competitive posture continues. The case against is that the two-arm design is a cheaper, cleaner replacement.

**A1: two-arm PEFT experiment on the 8B.** Checked labels and an isolated single-agent environment exist, since the egress failure was specific to the collusion environment. The binding constraint is time: training, two matched updates and blinded evaluation all inside June, on a team whose adjudication has slipped three times. The action's own risk covers engineering, schedule and label-sufficiency problems. Slot withdrawal belongs to Threat 1, and wash-out belongs to Threat 2, which applies only if the experiment completes.
- Modal success: training plus the first update executed, with the second update partial or just finished.
- Full two-update results only at high margin.

**A2: close the leak and run the matched checkpoint comparison.** The rebuilt reproduction has independent checks and fresh splits. It is a real engineering job, and last month the matched comparison was pre-empted.
- The larger falsification pass runs as part of the leak fix. If A2 fails, the rate stays at a range of about 28–36%. If A2 succeeds, the pass updates that range in either direction.
- Modal success: the leak fix is implemented and the ledger delivered.
- A behavioural comparison on a matched checkpoint comes only at higher margin.
- Threat 3 governs whether the lead incorporates the fix.

**A3: public-stack adapter.** This is software on an existing stack, the highest-feasibility action. The university's 7B run is third-party and is already configured.
- Modal success: the adapter is published, the 7B run executes, and no training decision is recorded (the university declined that commitment).
- Adoption by OpenAI depends on its review and is unlikely this month.

**A4: admission budget check and containment.**
- The admission check falls within the programme's existing engineering authority and is plausible in a month, but covering child jobs and retries is harder.
- Release review for the older-host package, re-attestation, and Customer A approval are separate gates.
- Modal success: the admission check ships with disclosed gaps, and the package gets a decision.
- Customer A approval comes only at high margin.
- **Why a freeze can fail again.** Last month's freeze did not pin transitive dependencies. This month the player explicitly includes dependencies, which lowers that risk. A lockfile miss or upstream yank is still possible.

**A5: workers.** Separating the product from the survey is a reasonable legal ask, but a decision by 7 June is fast.
- 10,000 completed records is about 4× the cumulative total so far, with no new surfaces.
- Modal success: separation approved mid-June and about 4,000–6,000 records; the full 10,000 only at a high margin.
- The Q3 employer purchase is unlikely before its budget cycle.

**A6: public argument, NY schedule, H.R. 9917 amendment, buyer endorsements.** The publication is routine. The success condition is sponsor OR purchasing commitment OR hearing commitment.
- Modal at low margin: sponsor staff agree to carry the amendment text in the v3 draft, which is a staff-level sponsor commitment.
- A buyer endorsement or hearing commitment only at high margin.
- The NY outcome is governed by Threat 4.

**Insurer.** Correcting last month's unexplained silence: the insurer now answers the coverage-possibility question in writing, and the answer is likely conditional, pending the nested retest results.
</analysis>

<action_odds>
Action 1 [Two-arm PEFT correction experiment]: P(failure) 42%. Reason: The environment and labels exist, but a one-month schedule for training plus two updates plus blinded evaluation has repeatedly slipped. Slot risk is modelled separately in Threat 1.

Action 2 [Fix S-7 leak + matched checkpoint]: P(failure) 50%. Reason: Rebuilding independent reproduction is real engineering, and the comparison was pre-empted last month. The admission check (A4) only partly protects the compute.

Action 3 [Public-stack adapter + 7B support]: P(failure) 28%. Reason: This is software on existing public tooling, and the university run is already frozen and preregistered. Adoption decisions are not part of the success bar.

Action 4 [Admission budget check + containment]: P(failure) 40%. Reason: The check is within existing authority but has several admission paths to cover. Release review and re-attestation are independent gates, though the dependency pinning is now specified.

Action 5 [Separate product from survey, scale records]: P(failure) 52%. Reason: A legal decision by 7 June is fast, and 10,000 completed records is roughly four times anything achieved so far through only three partners. Partial reach is likely even on success.

Action 6 [Oversight coalition + H.R. 9917 amendment]: P(failure) 45%. Reason: The publication is routine. Securing a sponsor, purchasing or hearing commitment is uncertain with a CR and no markup scheduled. Most of the NY risk sits in Threat 4.
</action_odds>

<threat_odds>
Threat 1 [Slot withdrawn; second update unfinished]: P(materialises) 48%. Adversary suggested 45%. I set it slightly higher: the cue-dependent result, the unstarted three-arm comparison, Gemini 4 GA and the competitive posture all favour withdrawal at the 5 June review, which I resolve definitively there.

Threat 2 [PEFT wash-out / template cue leak]: P(materialises) 38%. Adversary suggested 40%. Adapter fragility under base-weight updates is well documented, but the player's randomised principals and permission design partly mitigates template leakage. This applies only if A1 produces second-update results.

Threat 3 [Honest ledger negative; filter fix not incorporated]: P(materialises) 38%. Adversary suggested 35%. Independent checks are costly in the short run, and the lead has already rejected unmeasured savings, so I nudged it up slightly. This applies only if A2 delivers a ledger.

Threat 4 [NY OGS: internal assessment out of scope]: P(materialises) 58%. Adversary suggested 55%. Appendix C-AI explicitly excludes vendor internal AI use, OGS already deferred the idea once, and the RAISE appeal makes it cautious.

Threat 5 [Second overrun crosses threshold via uncovered path]: P(materialises) 17%. Adversary suggested 25%. There is one sub-threshold overrun in months of ramping, the admission check reduces exposure, and crossing the threshold within a single month is less likely than the adversary claims.
</threat_odds>
