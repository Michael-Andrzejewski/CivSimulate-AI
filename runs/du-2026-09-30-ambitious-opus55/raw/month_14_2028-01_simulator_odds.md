<analysis>
**Action 1 (disclosure as release gate).** Securities counsel has had the correction review since early December, so a 20 January publication date is realistic. The risk lies in what the update contains, not whether it comes out. Counsel will fight hardest over two items: the 17 December trip and the no-rollback reasoning. The enum channel, the fix and the character-track miss are closed issues and should clear. Fallback 1, where AISI publishes its own summary, depends on AISI and is slow. Fallback 2, the RAISE filing, is modelled in Threat 1. Whether leadership accepts the gate is Threat 2 and is not double-counted here. Execution risk is moderate: the most likely failure is a watered-down update that omits the trip.

**Action 2 (non-canonicalised tools).** Sending AISI the method and monitoring plan by 15 January is routine. The adapters for the three customers and the classifier are ordinary engineering. The spec-process delay and the residual problem are modelled in Threat 4. Pre-registering the residual investigation at AISI is feasible. Low-to-moderate risk.

**Action 3 (scale the Automated Alignment Researcher, external audit).** Going from 11 to 30 runs on a 6% floor plus off-peak is achievable, though 30 runs may take the whole month. Read-only ledger access for Apollo and METR needs security and legal agreements: both have prior access frameworks, but ledgers of a model more capable than any public one are sensitive. Funding the audits is a small cost. Requiring outside sign-off before merges slows internal teams, and some pushback is likely. The multi-agent pilot launch is already pre-registered. Moderate risk.

**Action 4 (EU, RAISE, Congress).** Splitting the EU filing is exactly the narrower fallback that should clear more often: Part 1 contains no enum data, and the DOJ caution applies weakly to a regulatory consultation. The NY AG briefing and the RAISE report overlap with Threat 1. A pre-dated essay reacting to OpenAI runs into the rival-commentary rule that comms enforced twice before. The Congress re-brief is conditional on the update. The bundle is mixed.

**Action 5 (water).** Forensic support to CISA is easy. The joint CISA/EPA route through state primacy agencies is slow, CISA's capacity is cut, and CISA is reluctant to co-brand a vendor hotline. Extending waivers to all 250 jurisdictions uses existing money, but onboarding 227 more in a month is hard. vLLM kernel support is plausible, since upstream may land it anyway. The Moolenaar reply "in my own voice" is likely to be softened by comms. The 45% uptake target is ambitious from 30%.

**Action 6 (benefits).** ETPL filings are easy. Provisional listing within the month is unlikely. The medical data delivery is routine and should be resolved on its own merits. Enrolment needs about 710 new sign-ups against a recent pace of 550–550/month, and Canada is still blocked. Placements need +22 against a recent +7/month. The aggregate dashboard has a decent chance of clearing legal.

**Threats.**
- Threat 1: counsel is likely to argue the trip is not a "critical safety incident" (customer tools, residual below threshold). Materialising needs either a DFS inquiry or press contrast, which is less likely than counsel simply being cautious.
- Threat 2: the precedent is strong, but if the update lands around 20 January, the gate becomes moot.
- Threat 3: the customers learn their tools affected telemetry, but not necessarily that there was a rollback decision.
- Threat 4: a spec extension through the formal process cannot ship in one month, and closing the residual is hard. This one is structurally likely.
- Threat 5: the base rate is real, and there is scanning, but a second intrusion through this specific flaw in one month is moderate.
</analysis>

<action_odds>
Action 1 [Disclosure as release gate]: P(failure) 40%. Reason: counsel's review has been running since December and the update was publicly promised, so publication is likely, but content covering the trip and the no-rollback decision may be cut. Leadership's side of the gate is in Threat 2.
Action 2 [Close non-canonicalised-tool gap]: P(failure) 25%. Reason: the AISI deliverable and adapters are routine engineering. The spec-process and residual risks sit in Threat 4.
Action 3 [Scale AAR plus external audit]: P(failure) 35%. Reason: scaling compute is feasible. Ledger access for Apollo/METR and outside sign-off on merges need security/legal agreements and draw internal friction.
Action 4 [Government-held yardsticks]: P(failure) 45%. Reason: the split EU Part 1 is likely to clear. The pre-dated essay hits the rival-commentary rule, and the NY AG briefing and Congress steps are contingent.
Action 5 [Water remediation via primacy agencies]: P(failure) 45%. Reason: CISA's capacity cuts and vendor-neutrality concerns slow the joint route. The 45% uptake target is ambitious. vLLM support and waivers are feasible.
Action 6 [Visible benefits]: P(failure) 40%. Reason: filings, planning and medical data are routine, but the enrolment and placement targets exceed the recent pace, provisional listings are unlikely, and the dashboard is uncertain.
</action_odds>

<threat_odds>
Threat 1 [RAISE filing as late-violation admission]: P(materialises) 30%. Adversary suggested 50%; reason for difference: counsel can plausibly classify the trip as not a critical incident (customer-tool artefact, sub-threshold residual). Materialising needs press contrast or a DFS inquiry, not just caution.
Threat 2 [Leadership refuses disclosure gate, ships first]: P(materialises) 35%. Adversary suggested 50%; reason for difference: the precedent is strong, but the update's likely ~20 January timing largely removes the conflict. Materialising requires both a ship and a slip into February.
Threat 3 [Trip leaks via customer circle]: P(materialises) 15%. Adversary suggested 25%; reason for difference: outreach can be framed as a compatibility fix, customers need not learn of the no-rollback decision, and the window before 20 January is short.
Threat 4 [SEP stalls, residual not closed]: P(materialises) 50%. Adversary suggested 45%; reason for difference: the formal spec process structurally cannot ship in one month, and the equivalent-enum residual has no cheap canonical fix, so this is slightly more likely than suggested.
Threat 5 [Second small-utility intrusion]: P(materialises) 20%. Adversary suggested 30%; reason for difference: the playbook is public and scanning is rising, but one more intrusion through these specific flaws within a month is below the aggregate incident base rate.
</threat_odds>
