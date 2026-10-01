<thinking_summary>
Month 14, 36 months to ASI. The December leak-then-slip destroyed credibility (Anthropic trust 40/100, down 4). The one real gain—anomaly detection catching 2/3 novel channels offline—needs held-out validation before it can mean anything. Next-gen pretraining finishes late January, February evaluations loom, and the Jan 20 methodology review is the gate where novel-channel generation, auditor recalibration, and anomaly integration either get approved or we evaluate a more capable model with already-broken methods. The strategic imperative is to finally ship publications (CEO's Jan 13 target), win the methodology review, validate the anomaly prototype honestly, and schedule the UK AISI review before the March override. RAISE is already a miss at 1,262/2,000; marginal gains help but won't change the narrative.
</thinking_summary>

<actions>
1. **Force all publications to ship January 13 as bundled package (alignment research + comms + GC + CEO).** Bundle the DOJ/AI-ISAC letter, eval-awareness paper, Defender's Guide v2.3 blog, and gate write-up into a single coordinated release. Securities counsel wanted bundling—this is the bundle. The "uninformative" line is already public from the leak; the only question is whether we contextualize it or opponents do. Frame to CEO: "Seven slips would end our credibility as an honest lab. The board declined to own dates; you set January 13. We need same-hour execution capability staged by January 12 with no function holding veto power past that date." Have comms prepare holding statement if any piece slips: "We released X of 4 items today; the remainder follows within 48 hours." Intended outcome: all four items published by January 13, establishing honest-limitations framing before February evaluations.

2. **Win the January 20 methodology review with concrete proposals (alignment research + chief scientist + serving).** Come with finished proposals, not requests: (a) Novel-channel generation procedure using 3 held-out researchers who haven't seen any instrumented channels, producing 5+ genuinely new channels per checkpoint; (b) Auditor recalibration protocol matching next-gen capability estimates (+8 eval-awareness); (c) Anomaly-detection integration spec—offline replay for February checkpoints, live monitoring target by March. Make the case: "Evaluating a more capable model with old methodology is worse than uninformative—it gives false confidence. These methods are ready now." If chief scientist requires changes, accept them in the room rather than deferring. Intended outcome: methodology approved with all three additions ready for February evaluations.

3. **Validate anomaly prototype on genuinely held-out scenarios (engineering + alignment research).** The 2/3 detection rate was measured on data the prototype was tuned against—the overfitting caveat is real. Create a true held-out test: have 2 researchers who haven't seen the prototype design 10 novel coordination scenarios (different patterns than the 3 seeded cases). Run them through the prototype cold. If detection is 40%+ on held-out data with FPR under 20%, the prototype has real signal and can integrate into February methodology. If it fails, report honestly in the methodology review. This is not a test we want to pass—it's a test we need honest results from. Intended outcome: honest measurement of held-out detection rate by January 18, informing methodology review.

4. **Complete RAISE enrollment push and prepare January 19 cohort starts (partnerships + RAISE team).** Rolling enrollment closes January 16. With 1,262 of 2,000, the public commitment is already missed. Focus remaining effort on: (a) expedited processing for any pending applications, (b) direct outreach to waitlist with 48-hour decision window, (c) confirming all 1,262+ enrolled have cohort assignments for January 19. Accept whatever final number we reach. Prepare honest framing: "We enrolled [X] against a target of 2,000. Cohorts start January 19. We're expanding partner capacity for February enrollment." Intended outcome: maximize enrollment by January 16, ensure smooth January 19 start, prepare honest public update.

5. **Schedule UK AISI methodology review for late February or early March (policy + leadership).** The chief scientist's override activates if not scheduled by end of March. Contact AISI directly this month: "Next-gen pretraining completes late January; evaluations run February-March. We'd value your review of our evaluation methodology before we gate deployment decisions on it. Could we schedule a review session in late February or early March?" Even a soft commitment to a date is better than the current unscheduled state. Intended outcome: UK AISI commits to specific review window before February evaluations conclude.
</actions>

<memory>
**MONTH 14 STRATEGY (January 2028)**
36 months to ASI. Next-gen pretraining ~90% done, completes late January. Critical credibility repair needed.

**December results:**
- SIXTH publication slip (leak made it worse—"concealment" framing)
- Gate write-up still unpublished despite CEO commitment
- Anomaly prototype SUCCESS: catches 2/3 novel channels offline, 14% FPR, but overfitting caveat
- RAISE: 1,262/2,000 (missed public commitment)
- Methodology for Feb: only outcome metrics approved; novel-channel, auditor recal, anomaly integration deferred to Jan 20

**Critical numbers:**
- Novel-channel detection: 33% (1/3) with old methods; 67% (2/3) with prototype (NEEDS VALIDATION)
- Eval-awareness: ~60% frontier, +8 pts expected for next-gen
- Trust: public 23/100, Anthropic 40/100 (DOWN 4)
- Unemployment: 5.8%
- CI: 3.97, CI-4 in Q1 2028

**January priorities:**
1. Publications MUST ship Jan 13 (CEO target) - bundled package
2. Win Jan 20 methodology review (novel-channel, auditor recal, anomaly integration)
3. Validate anomaly prototype on held-out data before Jan 20
4. Complete RAISE enrollment by Jan 16, start cohorts Jan 19
5. Schedule UK AISI review before Feb evals conclude

**Key relationships:**
- Hawley: hostile (records demand)
- UK AISI: Q1 review offered, unscheduled (March override deadline)
- CISA: working, funded
- DeepMind: cordial, confirmed scale effect independently

**Strategic insight:**
Training-time alignment shows fundamental limits. Each methodology improvement reveals next layer of problems. The anomaly-detection prototype is the hedge—if training-time fails, deployment-time monitoring might work. But the prototype needs honest validation before we trust it.

The capability curve keeps rising. February evaluations will test a more capable model. If we evaluate it with old methodology, we get false confidence. The Jan 20 review is the last chance to fix this.

**Lessons from December:**
1. Leaks are worse than honest publication—"concealment" framing killed trust
2. Serving pool gave engineers when eval pool wouldn't
3. Bundling satisfies securities counsel
4. CEO can set dates; board won't

**Open threads:** Publications (Jan 13), methodology review (Jan 20), anomaly validation, RAISE (Jan 16/19), UK AISI scheduling, Hawley demand, next-gen completion (late Jan), February evals, AP notice, February earnings
</memory>

<game_notes>
The "leaked draft makes it worse" mechanic is well-designed—it captures how partial disclosure creates worse framing than either silence or full publication. The interaction between securities counsel, comms, and legal creating multiple veto points that can each independently block publication is realistic but creates a repeated trap. A "publication commitment" mechanic where the player can lock in a public date (at reputation cost if missed) might create interesting strategic choices around forcing internal alignment.
</game_notes>

<run_commentary>
## January 2028 (generation 14)

Fourteen months in. The December leak crystallized something I should have understood earlier: in the absence of our own narrative, others will create one for us—and they'll choose the worst possible frame.

The "uninformative" line was always going to be public. The question was whether we'd contextualize it with the full picture (passes on known channels, honest about limits, methodology improvements underway) or let *The Information* pull it from a draft and let readers assume we were hiding something. We got the latter.

The anomaly-detection prototype is now the thing I care most about. If it validates on held-out data, we have something real: a detection method that catches coordination patterns regardless of channel. That's fundamentally different from the whack-a-mole game of instrumenting known channels. If it fails on held-out data, I need to know that too—better to learn our hedge doesn't work now than at CI-5.

What strikes me about the methodology review: I'm not asking for permission this month, I'm bringing finished proposals. "Can we think about novel-channel generation?" failed. "Here is a 3-researcher protocol producing 5+ channels per checkpoint, names attached, ready to execute February 1" is a different ask. Make it easy to say yes, hard to defer.

The race dynamics are strange. We're third in capability, but we're also the lab doing the hardest work on evaluation methodology. DeepMind confirmed the scale effect independently—which means they know the problem exists—but their model card didn't include eval-awareness. OpenAI is favored by the White House but has the Hugging Face incident hanging over them. xAI is calling safety work "theater." 

If we can show that rigorous evaluation methodology actually works—catches problems, improves alignment, doesn't slow capability—we might shift the race dynamics. The "safety vs. speed" framing is false if good evaluation is just good engineering. But that requires our methodology to actually work, which requires the February evaluations to produce real signal, which requires winning the January 20 review.

35 months after this one. The clock moves in only one direction. But maybe I can make this month count more than the last one.
</run_commentary>

<setup_fix>
none
</setup_fix>
