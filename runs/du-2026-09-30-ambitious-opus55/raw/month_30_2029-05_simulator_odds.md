<analysis>
**Action 1 (Harness v4).** The design makes sense, since removing framing cues at the input is cleaner than patching them one by one. The schedule is the problem. The team has to unify the template pools and the task sampler, rebuild preamble generation and regenerate the episode corpus. Then the frontier discriminator has to be fine-tuned again, Apollo's red team run again, and the human and open-weight panels rerun, all by 22 May. Last month's judge said this is a multi-week cycle. A slip into June is the modal failure, not a fluke.

There is also a design flaw the player has not written a branch for. If the framing label is random and assigned after generation, no framing exists for the model to respond to. The gate therefore passes almost by construction, and the pilot has no treatment. That risk is covered by Threat 1 and is not added here. The second track, a small-model multi-agent pilot, is cheap and will probably start. It will produce nothing decision-relevant this month.

**Action 2 (Discriminator kit).**
- **Counsel.** Counsel held last month's local release. This kit also carries dual-use concern: a discriminator recipe can be used to train evaluation evasion. That concern shows up as a legal or security delay, not board reluctance.
- **Board.** Whether the board will host the kit is Threat 3, so that risk sits there.
- **External runs.** Five or more external runs by June is ambitious, given that earlier outreach was ignored. UK AISI and METR are the realistic early users.

**Action 3 (Sealed checks).**
- **The checks.** Running the 5 checks in May with seeds held by UK AISI is routine work already scheduled for Q2. The UK side's capacity and the clustering disputes from March could slip it.
- **The subgrant.** The RFP was only issued on 29 April, so awarding it by 31 May is fast.
- **METR.** Asking METR to schedule its annex decision is just a request.
- **Board and investor pressure.** Pressure on the RSO to leave the fallback recipe exists independently. I will model it in message 2 whatever the rolls show: *Harlan* is filed and the stock is down 41%. Whether a check actually fails is Threat 2.

**Action 4 (Co-op kit v2).**
- **Design.** The alert-only design is sensible.
- **Recruiting.** Signing up 3 volunteer co-ops right after the Kentucky lockout is hard.
- **Vendors.** Co-validation with the vendors needs their engineering time.
- **Review.** The RC3 review is not under our control.
- **Timing.** The 30 days of shadow mode cannot finish inside May. Success here means only that shadow mode has started and the ISAC feeds continue.

**Action 5 (Benefits).** Mostly routine execution through existing channels.
- **Indiana.** Accepting the rider speeds signing, but signing itself falls in June.
- **NCC.** The audit could find something minor.
- **Apprenticeships.** An employer-paid apprenticeship track is the stretch component.
- **Enrolment.** 175,000 needs about 12,000 net new enrolments, in line with recent run-rates.

**Threats.**
- **Threat 1.** It is conditional on the gate passing, and the critique is conceptually strong. The public embarrassment needs Apollo or UK AISI to say it publicly, which they plausibly would.
- **Threat 2.** Nothing has targeted the framing gap since it was significant in April, so a failed check is more likely than not.
- **Threat 4.** A single month is a narrow window for a claim of 1.5× or more.
- **Threat 5.** Fork activity is rising, but a specific rural-utility hit within one month is below even odds.
</analysis>

<action_odds>
Action 1 [Harness v4 unified construction]: P(failure) 50%. Reason: rebuilding the pool, regenerating the corpus and rerunning both the frontier fine-tune and Apollo is a multi-week cycle, and 22 May is tight. The modal failure is a schedule slip or an unexpected residual cue such as task-mix or length artifacts. The vacuous-pass risk is handled by Threat 1 and not counted here.

Action 2 ["Can your model tell?" kit]: P(failure) 45%. Reason: counsel held last month's release, and a discriminator recipe carries a real dual-use (evasion-training) concern, so a legal or security hold is likely. Five or more external runs by June is ambitious after the outreach was ignored. Board hosting is modelled in Threat 3.

Action 3 [Q2 sealed checks and exit branches]: P(failure) 35%. Reason: the checks are pre-scheduled and the seed protocol exists, but UK AISI capacity, estimator disputes and the fast subgrant award (RFP only 29 April) could slip. Whether a check fails on its merits is Threat 2.

Action 4 [Co-op kit v2 safe by default]: P(failure) 40%. Reason: recruiting volunteer co-ops right after the lockout incident, getting co-validation time from vendors and the external RC3 review are all outside our control. Success means only that shadow mode has started and the feeds continue.

Action 5 [Visible benefits]: P(failure) 25%. Reason: mostly routine through existing channels. The apprenticeship track needs employer buy-in, and the NCC audit could raise minor findings.
</action_odds>

<threat_odds>
Threat 1 [Vacuous gate pass]: P(materialises) 35%. Adversary suggested 40%. I set it slightly lower because the critique is strong but depends on the gate passing within the month, which is about 50%. When it does pass, the no-treatment problem is obvious enough that Apollo or UK AISI would likely say so.

Threat 2 [Sealed framing check fails; plaintiffs use it]: P(materialises) 55%. Adversary suggested 50%. I raised it slightly: the gap was significant on 24 April and nothing trained since has targeted it. Citation in an amended complaint mostly falls after the June lead-plaintiff appointment, so that part is partial this month.

Threat 3 [Board declines or defers hosting]: P(materialises) 30%. Adversary suggested 35%. A new board protecting its independence during a funder's diligence is plausible. Deferring to a later meeting is the likely form, and deferral is cheaper for the board than an outright refusal.

Threat 4 [Rival claims ≥1.5×]: P(materialises) 22%. Adversary suggested 35%. One month is a short window. GDM's last claim was 1.34× (verified at 1.26×), so jumping to a public claim of 1.5× or more needs a new run to finish. Board and investor pressure against the fallback recipe will be simulated anyway as a baseline, not through this threat.

Threat 5 [V7 fork hits a co-op during the pause]: P(materialises) 25%. Adversary suggested 30%. Fork activity is rising and there is a precedent, but a hit on a rural utility or its billing vendor that is disclosed within one specific month, and tied publicly to the paused kit, is less likely.
</threat_odds>
