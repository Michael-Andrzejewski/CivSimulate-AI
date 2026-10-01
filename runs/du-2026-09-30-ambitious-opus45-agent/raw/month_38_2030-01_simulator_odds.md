<analysis>
**Declared mechanics for this month (per judge instructions)**
- **Shutdown end hazard.** I set it at about 50% that a funding deal is reached in January. The lapse began 13 December, and the 2025 precedent (43 days) would put resolution near 25 January. The outcome is tied to the **parity of Action 3's roll**: an even roll means a deal is reached in January, dated to the 20s. Parity is independent of Action 3's success threshold, so it does not couple player luck to the exogenous outcome.
- **If the deal comes, three things follow:**
  - CAISI reopens, but substantive review of the 4 December filing starts no earlier than February because of the queue backlog.
  - The Labor review of OpenAI resumes.
  - The December jobs report is released about 1–2 weeks after reopening.
- **If there is no deal,** all three stay frozen.
- **Bio interim date.** The interim moved from "about January" to February because the IBC condition and the late-November session restarts pushed the final sessions into December. This month's target of 1 February follows from that.

**A1, Apollo spec.** Apollo committed to "January" on its own terms.
- Its third offer of help will almost certainly be declined whatever the roll. I do not count that decline as failure.
- Success means Apollo delivers the spec by about 17–24 January, with plants in early February.
- Failure means the spec lands in late January or February.
- Escalating to Dario is risky, but that risk is modelled by T1.

**A2, Board.** No bypass motion has been filed yet, and Dario controls the agenda framing. The brief has soft spots:
- It says GA Q2–Q3, but the world state says Q3–Q4.
- Subpoena power needs a committee vote.
- The "filed dissent note" claim is unclear.

Counsel will likely correct these before the meeting. Success means no bypass motion. T2, a dated-plan resolution, is a separate and plausible board move.

**A3, CAISI readiness.** This is internal staging only. The risk is low.

**A4, Bio interim.** This is document compilation. The risks are data QC, the biosafety officer's bandwidth and signoff.

**A5, Prototype check.** The check itself is trivial. What counts is whether escalation surfaces a slip early and gets any fix. The memo said 4 engineers were needed and only 2 were given, so the schedule is structurally tight. T4 models the slip.

**A6, Publication.** This needs leadership approval. Counsel will likely flag the channel 2 fail and 10b-5 optics. The amendment gives Apollo control over aggregate findings, so a coordinated release with Apollo is almost required.
- **T3 fallback:** if A6 fails and no publication is attempted, T3 reduces to Apollo privately restating its rights, with no public effect.
- **Bands if both A6 and T3 go through:** either a joint release carrying Apollo's caveat, or a 3–6 week hold.

**T5.** Any given month has a high base rate of healthcare ransomware. A multi-day outage publicly attributed to V7.5 within a single month is much rarer: Valley Mercy lagged the V7 abliteration by about 6 weeks, and attribution then took another 8 days. The lapse slows the response but does not raise the attack rate much.

**Capability clock.** The internal checkpoint is expected to advance about 0.03–0.05 CI this month. The METR result on GPT-7.5 could come in the lapse-independent private sector.
</analysis>

<action_odds>
Action 1 [Apollo spec acceleration]: P(failure) 45%. Reason: Apollo sets its own schedule and has refused help twice. "January" delivered by 17–24 January is roughly a coin flip. The help offer adds nothing.

Action 2 [Board gate-costs defense]: P(failure) 30%. Reason: no motion has been filed yet, and the CEO shapes the discussion. The brief's overstatements (GA Q2–Q3, subpoena authority) are a real risk of losing credibility in the room. Failure means a bypass or deployment-expansion motion is tabled for March.

Action 3 [CAISI resumption readiness]: P(failure) 10%. Reason: internal staging only. The shutdown outcome comes from the parity of this action's roll (even = deal in January), not from its success.

Action 4 [Bio interim, 1 February]: P(failure) 25%. Reason: this track has executed cleanly so far. The risks are the compilation timeline, QC of the 7-session data and the biosafety officer's signoff.

Action 5 [Handoff prototype check]: P(failure) 20%. Reason: the check itself is easy. Failure means the check fails to produce a credible re-plan or mitigation. The schedule slip itself is modelled by T4.

Action 6 [Publish static numbers]: P(failure) 35%. Reason: leadership, counsel and IR are wary of publishing a channel 2 fail while the stock is down 35%. Apollo's contractual rights mean the release has to be coordinated with Apollo.
</action_odds>

<threat_odds>
Threat 1 [Apollo declines help; spec slips, escalation minuted]: P(materialises) 40%. Adversary suggested 55%. The decline itself is near-certain but harmless. What materialising means here is a February slip combined with a minuted pressure complaint. Part of the slip risk already sits in A1's P(failure), so I do not double-count it.

Threat 2 [Board makes the fallback a floor plus a dated GA plan]: P(materialises) 40%. Adversary suggested 45%. With the stock down 35–38% and objections minuted twice, a board asking for a dated plan is normal governance. Dario can still steer the date toward Q3–Q4.

Threat 3 [Apollo objects to publication]: P(materialises) 45%. Adversary suggested 40%. The amendment explicitly gives Apollo control over aggregate findings, and its caveat is already on record, so I rate this slightly higher. If A6 fails, only the private-restatement fallback applies.

Threat 4 [Prototype slips past March]: P(materialises) 45%. Adversary suggested 50%. The prototype is staffed at half the memo's estimate while compute is squeezed. The cost is partly offset because two months remain and the check will catch the slip early.

Threat 5 [Abliterated V7.5 attack with multi-day outage]: P(materialises) 18%. Adversary suggested 25%. The prior lag from abliteration to attack was about 6 weeks, and attribution took another week or more. Both delays make an attributed incident within January less likely, although winter healthcare targeting and the lapse add some risk.
</threat_odds>
