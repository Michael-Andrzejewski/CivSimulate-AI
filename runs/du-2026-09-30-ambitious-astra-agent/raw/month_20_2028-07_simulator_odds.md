<analysis>
**Action 1 (second update and durability).** The second update was about 40% trained at 45% throughput on 30 June. It still has to finish training, then pass blinded adjudication, by 12 July. That schedule is tight. Adjudication has slipped three times on this thread, and the extra interleaving update would have to run inside the same month on constrained capacity. The 5 July memo will almost certainly be delivered, but approval of the resources it asks for is Threat 1, not this action. The durability result itself is Threat 2. This P(failure) covers only execution: the evaluation finishing and the interleaving arm starting. If the evaluation does not finish, Threat 2 has no result to act on and is void. No favourable sub-results may be drawn from a void roll.

**Action 2 (filter and OpenAI).**
- Freezing an already-accepted filter into the recipe trial is routine, with low risk on its own.
- Auditing one more high-volume stream from existing logs is feasible, but expansion depends on what the audit measures.
- The OpenAI incorporate/reject decision by 26 July is the weak link. A platform engineer evaluating a 7–9% overhead adapter rarely produces a training decision within four weeks. That slippage belongs to this action's execution risk. Threat 5 only adds the announcement-driven reprioritisation.

**Action 3 (budget controller).** The redesign answers the owner's stated objection, because agents can still rescale within the envelope. That raises acceptance odds compared with June. Real barriers remain:
- scheduler integration for child jobs, which was unscoped in June
- concurrent admission and cancellation testing before 10 July
- the owner's resistance

Threat 3 covers acceptance in soft mode only. The routine sub-tasks resolve at their own lower rates unless a shared cause is named: re-attestation of a frozen artifact at about 20%, the older-host test-matrix gap at about 35%. This follows the judge's instruction.

**Action 4 (workers).** The record is roughly 1,100 new records per month against targets of 10,000–20,000. A target of 10,000 quality-checked outputs is very unlikely to be met. The 9 July legal decision may slip again. Training partner operators and closing the 5 complaints are achievable, so partial success is realistic, but the headline goal is not.

**Action 5 (costed oversight package).** Delivering a costed workload model is feasible, and staff have taken Claude's drafts before. A named champion or hearing before September is unlikely. Hawley is the one plausible champion, but he is hostile to Anthropic, which complicates it. Getting past CBO bracketing needs official scoring, which is slow.

**Action 6 (deployment plan and funded integration programme).** The plan itself is easy to deliver. Leadership funding engineering support and compute for a competitor's pipeline is unlikely under the competitive-response posture. Legal vetoing it on antitrust grounds is Threat 4, so it is not double-counted here.

**Threat conditioning.**
- Threat 2 is conditional on Action 1's evaluation completing.
- Threat 3 is conditional on Action 3 reaching a 10 July decision. If Action 3 fails, the controller is deferred and a soft-mode outcome is moot.
- Threat 5's announcement odds do not depend on any same-month action.
</analysis>

<action_odds>
Action 1 [Second update, blinded eval, compute memo]: P(failure) 45%. Reason: 60% of the second update remains at 45% throughput, and blinded evaluation must finish by 12 July against a history of three adjudication slips. The extra interleaving arm competes for the same owned capacity. Resource approval and the result's direction are handled by Threats 1 and 2.

Action 2 [S-7 filter freeze, stream audit, OpenAI decision]: P(failure) 40%. Reason: the filter freeze and stream audit are routine and low-risk. The main risk is that an incorporate/reject decision from a single evaluating engineer within four weeks is unlikely by base rate, and it is the action's headline outcome. Partial success is the likely mode.

Action 3 [Envelope budget controller, older hosts, re-attestation]: P(failure) 45%. Reason: the redesign addresses the owner's objection, but child-job scheduler integration and concurrency tests before 10 July are tight. Sub-parts resolve separately: re-attestation of the frozen artifact about 20%, older-host gap about 35%. Soft-mode acceptance belongs to Threat 3.

Action 4 [Worker next-step outputs, 10k target]: P(failure) 70%. Reason: 10,000 quality-checked outputs is roughly 9× last month's delivery. The legal decision has slipped before, and there is no new staff or money. Partner training and complaint closure are achievable partial outcomes.

Action 5 [Costed H.R. 9917 assessment package]: P(failure) 45%. Reason: the package is deliverable and staff have been receptive. A champion or hearing before the CR deadline is unlikely, and CBO scoring is slow. Success means the package is taken up into drafting, not enacted.

Action 6 [Deployment plan and funded competitor-integration programme]: P(failure) 55%. Reason: the plan is easy to deliver, but budget approval for engineering support and compute to a rival lab runs against the competitive-response posture and the CEO's record. The antitrust veto is modelled separately in Threat 4.
</action_odds>

<threat_odds>
Threat 1 [Compute doubling refused or token]: P(materialises) 75%. Adversary suggested 70%; reason for any difference: slightly higher. A 2× increase requested before the durability result exists, one month after the slot was handed back, with Gemini 4 and OpenAI agent pressure, is very likely to be refused or tokenised. The "token" band is broad.

Threat 2 [Second update erodes the effect]: P(materialises) 50%. Adversary suggested 45% (+20% slip); reason for any difference: slightly higher. Two prior interventions decayed, and concealment was marginal, so erosion is the modal outcome. The slip portion is excluded because it is already Action 1's execution risk. This threat is void if Action 1 fails and no evaluation completes.

Threat 3 [Controller accepted only as soft limit]: P(materialises) 40%. Adversary suggested 45%; reason for any difference: lower. The envelope design removes the owner's stated objection, which makes hard enforcement more acceptable than in June. Soft rollout remains a common compromise. The threat applies only if Action 3 reaches a decision; if Action 3 fails, deferral is already its outcome.

Threat 4 [Antitrust counsel blocks competitor-integration offer]: P(materialises) 45%. Adversary suggested 55%; reason for any difference: lower. Counsel is conservative and *Buist* is pending, but narrowing the offer to public-materials-only is the likelier form of the outcome, and the public adapter route is already cleared. Leadership budget refusal is Action 6's own risk and is not counted here.

Threat 5 [OpenAI automated-researcher announcement]: P(materialises) 20%. Adversary suggested 30% (60% decision missed); reason for any difference: lower. The March target already slipped and the security review only closed in June, so a formal milestone claim in this specific month is less likely than 30%. The 26 July decision being missed is already priced into Action 2's P(failure) and is not double-counted. The odds do not depend on any same-month action.
</threat_odds>
