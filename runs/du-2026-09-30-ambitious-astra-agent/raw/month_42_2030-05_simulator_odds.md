<analysis>
**Action 1 (8 May compute purchase).** The CEO already reads the evidence cautiously, so the "not demonstrated" recommendation will almost certainly be accepted. The hard part is getting compute. The board has deferred standing allocations twice. It tied decisions to the Q1 close and has fixed compute obligations. It has also said the window "will not be extended again", which cuts both ways: it limits patience for the old branch but leaves a new, bounded ask open. The purchase is small (6% for six weeks), priced, and executable on approval, which helps. Timing hurts: earnings month, and GDM's preview is putting commercial pressure on.
- *Action failure* means no allocation authorised by 31 May, whether refused or deferred to June.
- *Threat 1* models only the partial or late slice, which applies if the action otherwise succeeds. No double counting.
- **Bands if the action succeeds:**
  - Margin 0–20: 4–5%, starting 12–19 May. Successor test booked but unfunded.
  - Margin 20–40: 5–6%, starting by 12 May. Successor test funded.
  - Margin above 40: full 6% from 9 May, with the test reserved.
- **Threat 1 severity cutoffs:**
  - Roll in the lower half of P: 2%, starting after the Q1 close (about 26 May). Successor test dropped.
  - Roll in the upper half: 3%, starting about 19 May. Successor test deferred to "phase 2" but provisionally booked.

**Action 2 (reward experiment).** This needs Action 1's slot or an external host (Action 3). Without either, it becomes unit checks and reward audits only, which cannot fully succeed. Even with a 9 May start, a multi-seed matched run plus independent scoring by 31 May is tight, given the pipeline's restart history.
- **Bands:**
  - Failure with a slot: the run starts, but seeds are incomplete and the first checked comparison slips to 7–21 June.
  - Success: first comparison by 31 May, covering 2–3 seeds per arm.
- **Direction of effect if it runs** (set now): concealment change −0.5 to −3.0 points, with CI likely crossing zero at this n. Completion change −6% to +2%.
- Threat 2 is the pessimistic tail of that completion band and is conditional on a run.

**Action 3 (external host).** Google is unlikely to commit by 12 May. A committed open-model group is plausible but slow. For the sub-parts:
- A host committing both compute and scoring is ambitious. This is what action failure removes.
- The cleared, AI-attributed publication resolves on its own lower rate of about 35%. Comms has held papers six times, but this is a runnable package rather than a safety claim.

**Action 4 (report and compact).** The disclosure committee has already signalled a stripped note, and the audit committee rarely overrides counsel.
- *Action failure* covers the report stripping and the compact receiving no government or customer uptake.
- *Threat 3* covers antitrust counsel holding the compact itself.
- Routine sub-part: transmitting some version of the compact to existing government contacts, about 25% failure if counsel clears it.

**Action 5 (commit-time authorisation).** This is real engineering with vendor dependency. Threat 5 models the vendor-semantics problem.
- **Bands:**
  - Failure: coverage 54–57%, delegated-credential retest fails again.
  - Margin 0–30: 57–61%, credential path passes, ERP still pending.
  - Margin above 30: 61–65%.
- Shipping the cleared implementation is routine (about 15% failure).

**Action 6 (workers).** New caseworkers need competency checks, so May output is only partly from them.
- **Bands:**
  - Failure: 55–68 remedies, backlog 58–70.
  - Success: 70–90 remedies, backlog 42–58, with under 50 only at a margin above 40.
- Publishing the ledger is routine (about 15% failure). Tranche 2 eligibility is resolved separately.

**Threat 4.** General availability in May is plausible (preview since April), but Google usually stages releases. If it happens, Anthropic's commercial team requests a response release that competes for compute. This applies after Action 1's decision and can shave 1 percentage point off an approved slice only if the slice starts after 20 May.
</analysis>

<action_odds>
Action 1 [8 May six-week compute purchase]: P(failure) 55%. Reason: The board has deferred twice, it is earnings month, fixed obligations weigh, and GDM is putting on pressure. The small, priced, executable ask and the CEO's own caution offset some of this. The partial slice is modelled separately by Threat 1.
Action 2 [reward-structure experiment]: P(failure) 55%. Reason: The training slot is a missing prerequisite unless Action 1 or 3 succeeds. Even with a slot, 31 May is tight given the pipeline's restart history. Failure without a slot means preparation only; failure with a slot means the comparison slips into June.
Action 3 [external host for reward experiment]: P(failure) 72%. Reason: No lab has committed resources in five months, and Google defers to Anthropic's own result. Failure removes only the host commitment. The open publication resolves separately at about 35% failure.
Action 4 [branch report with correction and frontier compact]: P(failure) 60%. Reason: The committee has already signalled stripping, and the audit committee rarely overrides counsel. Uptake of a voluntary compact is low. Antitrust blocking of the compact is left to Threat 3. Transmission to existing government contacts is a routine sub-part at about 25% failure.
Action 5 [commit-time revocation checks]: P(failure) 40%. Reason: This is achievable in-house engineering, but the retest has failed twice and 65% coverage is roughly three times the recent monthly pace. The vendor-semantics risk sits in Threat 5. Shipping to existing recipients is routine at about 15%.
Action 6 [caseworker onboarding and May targets]: P(failure) 35%. Reason: The track record is solid and funds are in hand, but the new staff need ramp-up, and 90 remedies with a backlog under 50 is a stretch. The ledger is routine at about 15%.
</action_odds>

<threat_odds>
Threat 1 [board buys a smaller, later slice]: P(materialises) 40%. Adversary suggested 45% (plus 20% refusal); reason for any difference: Outright refusal is already inside Action 1's failure. The partial-slice pattern is very plausible given the Q1-close linkage, slightly offset by how small and bounded the ask is. The severity cutoffs are stated in the analysis.
Threat 2 [revised reward teaches graceful quitting]: P(materialises) 30%. Adversary suggested 35%; reason for any difference: The completion-verification term already targets this exploit family, but a single patch rarely closes it. This applies only if the experiment runs; otherwise it cannot materialise.
Threat 3 [counsel kills the compact on antitrust grounds]: P(materialises) 45%. Adversary suggested 55%; reason for any difference: *Buist* is a real constraint, but the compact is framed with cross-provider thresholds and competing evaluation methods, and counsel has previously allowed vendor-neutral specifications to go out. The report stripping is already counted in Action 4's failure, so it is not double-counted here.
Threat 4 [GDM general availability and Google declines]: P(materialises) 30%. Adversary suggested 35% (general availability); reason for any difference: Google usually stages Deep Research releases, and a preview that began in April reaching general availability within May is somewhat less than a one-in-three chance. Google's refusal of a trial is already priced into Action 3. If it fires, the capability index rises by 0.2 and Anthropic's commercial team requests a response release.
Threat 5 [commit-time checks break downstream transactions]: P(materialises) 40%. Adversary suggested 40%; reason for any difference: None. The vendor lacking conditional-write semantics is a credible engineering base rate, and the ERP has already failed twice.
</threat_odds>
