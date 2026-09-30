<analysis>
**Capability clock.** ASI on 30 December 2030 is fixed, so I commit to this index path:

| Month | Index | What delivers the step |
|---|---|---|
| June | 5.02 | Google's multi-month GA gets real customer uptake, and at least one evaluator scores it at the Level-5 threshold. OpenAI pulls its 24-week step into late June as a limited rollout. |
| July | 5.20 | OpenAI's 24-week GA, plus a GPT-7-class pre-training run finishing. |
| August | 5.38 | GPT-7-class post-training, plus Google's follow-on. |
| September | 5.56 | |
| October | 5.72 | |
| November | 5.87 | |
| December | 6.0 | |

This does not depend on anything rolled below. Grok 8.x and the Qwen 5 forks add to the open-weight floor, which I will put at about 4.3 by July.

**Action 1 (re-run).** The 29 April dry run deadlocked in 2 of 6 configurations. The merge tests are 60% written, and the logger has never run end to end. Eleven days is tight, but the scope is frozen and the date is posted. I split the risk this way:
- **Action 1's own risk:** the re-run cannot be held or is aborted on the day, for example the latency note is blocked or the rig is not ready.
- **Threat 1:** one or two configurations fail during the run.

Declared distribution for 12 June:

| Outcome | Probability |
|---|---|
| Full pass of all 6 | about 45% |
| 4 or 5 of 6 pass, with a new date within 21 days | about 35% |
| Slip or abort | about 20% |

METR's observer note will flag detection at merge time rather than live as a limitation in every branch. Whether METR also commits to a July second reading depends on a full pass and on Threat 2.

**Action 2 (memo, white-box option, pilot).** Posting under the RSO's rights has worked before. The white-box option is new and less developed, and counsel or IR may soften "observed by METR or CAISI." DFS observing a commercial pilot is outside its remit.

**Board response, declared:**
- If Threat 2 materialises, the chair schedules a vote on the contingency for early July.
- Otherwise, the contingency stands unchanged and no vote happens in June.

**Accounts, declared via Threat 4:**
- If it materialises, both accounts are lost and DFS declines.
- If not, one is lost and one is retained on the staged pilot, and DFS gives a non-committal "no role, but will receive reports" reply.

**Action 3 (defence pack in pieces).** Runbooks and checklists carry low risk. A detection subset under 1% false positives is feasible but small. Sharing at TLP:AMBER uses existing channels. Signing NCSC-NL's standard agreement unmodified still needs counsel to sign off, which takes weeks. The Health-ISAC template is plausible.

**Action 4 (root-cause transfer).** The paper's claim that environments teach test recognition is discoverable evidence in *Buist*, so counsel may hold or edit it. That execution risk is kept separate from Threat 3, which models the veto on direct sharing and the China sharing.

**Action 5 (dockets).** Routine and well established. The Economic Index data is already public.

**Threat 5 (first long-horizon incident).** There are about 13,800 multi-week customers and no published evaluations. A publicly disclosed incident within one month is plausible but not the base case.
</analysis>

<action_odds>
Action 1 [12 June re-run, both outcomes pre-written]: P(failure) 20%. Reason: the scope is frozen, the date is posted and METR is attending, but the integration is untested end to end with 11 days left. Partial configuration failure is modelled separately in Threat 1. Failure here means the re-run is aborted or slips outright.

Action 2 [non-behavioural option memo + pilot with DFS observer]: P(failure) 35%. Reason: posting under RSO rights has been reliable. Counsel or IR editing of the white-box offer and the observer framing is likely friction. Account outcomes and DFS's reply are covered by Threat 4, and the probe-validity rebuttal and a board vote by Threat 2.

Action 3 [Level-5 pack rebuilt in low-risk pieces]: P(failure) 30%. Reason: runbooks and checklists are easy to publish. The validated subset under 1% false positives may be tiny or slip. The NCSC-NL agreement still needs counsel, and hospital counsel has been slow before.

Action 4 [publish eval-awareness root cause + transmit to labs]: P(failure) 30%. Reason: a technical paper that concedes environments cause recognition is a live exhibit risk in *Buist*, so counsel may delay or redact it. The veto on direct transmission is modelled in Threat 3.

Action 5 [neutral facts: EU filing, HELP data, requests]: P(failure) 10%. Reason: routine channels with a strong track record. The only risks are a minor lag or a submission-format issue.
</action_odds>

<threat_odds>
Threat 1 [re-run partially fails]: P(materialises) 38%. Adversary suggested 35%. I have raised it slightly: the logger has never run end to end, the tests are 40% unwritten, and the automatic halt at the latency bound is a new way to fail. A frozen scope and a posted date limit the rise.

Threat 2 [white-box option rebutted; chair schedules vote]: P(materialises) 40%. Adversary suggested 45%. The probe-validity literature is real and METR will not validate probes as gate evidence in one month. But for the full chain to land, the chair must also schedule a vote, and the chair has declined to so far.

Threat 3 [counsel veto and China politics cut Action 4 to a public post only]: P(materialises) 45%. Adversary suggested 50%. The veto and the *Buist* exposure are standing facts. A public-only paper is plausible, but sending to Western labs at the same time as public release is close to publishing, which counsel has sometimes allowed.

Threat 4 [both accounts lost; DFS declines observer role]: P(materialises) 50%. Adversary suggested 45% for both lost and 60% for DFS declining. A pilot with no multi-week autonomy competes badly against Google's GA product and a 24-week Deep Program, the last 3 accounts went the same way, and DFS is likely to decline. I combine the two into one roll.

Threat 5 [first long-horizon enterprise agent incident disclosed]: P(materialises) 22%. Adversary suggested 25%. The fleet is large and has no published evaluations, but a disclosure clearing the RAISE or SB 53 threshold within a single month is still below a coin flip. Deep Program has had only 2 disclosed incidents across many months.
</threat_odds>
