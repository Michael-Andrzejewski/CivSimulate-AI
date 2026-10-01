<analysis>
**Reconciling the prototype's status.** The handoff prototype that scored 81.2% on held-out plants is the detector that has run in shadow mode on Partner A traffic since 13 May. It was re-thresholded to a 6.5% flag rate in June, with an estimated recall of about 77%. It is deployed in advisory shadow mode only. It is not deployed as production alerting. So the "prototype deployed to shadow mode" item in Action 1 is already done. The only new item is the path to production alerting.

**A1: October plan.** Deployment engineering can estimate volumes from Partner A's historical logs without Partner A's forecast. That is feasible in about three weeks. Friction points:
- Counsel will review any document that proposes deploying without a harness pass, given the 10b-5 exposure.
- The CEO has already deferred the 2%→5% sampling increase to the board. Five percent sampling also exceeds reviewer capacity of about 6.6% once it is combined with the flag queue.

Circulating the plan to all directors is ordinary board process, so it is not the main risk. Disputes over the trigger's design are modelled in Threat 2, not here. Failure here means the draft slips past 25 August or leaves major fields TBD for reasons unrelated to the trigger.

**A2: Audit acceleration.** The three reviewers also carry the flag queue, so preliminary results on roughly 200 of 400 transcripts by 15 September are plausible. A full set is not. The CEO has an incentive to agree because October needs the number. Whether the result is statistically interpretable is Threat 1's job.

**A3: CAISI correction.** This is a short letter, but a written admission of mischaracterisation is discoverable, so counsel may soften the wording. The risk is low to moderate.

**A4: Blumenthal email.** The deadline is routine and the channel is established. Summarising CAISI's July reply may need either CAISI's consent or counsel review, and the counsel queue is the standing bottleneck.

**A5: Apollo support.** Sending the offer is trivial. How Apollo responds is Threat 4.

**Threats**
- **T1.** Rare-event recall cannot be estimated from unflagged transcripts without a known count of positives. Competent statisticians on the audit team will say so in the design review. The one mitigation is to inject seeded plants into production, which CAISI's requirement for external plants complicates. I treat this as a single branch.
- **T2.** The 71% orchestration share makes a 2× baseline trigger fragile. Engineering will very probably flag both the per-partner baseline problem and the cumulative arithmetic of 25% volume at each of 3–5 partners.
- **T3.** Board materials leaking about 10 weeks before the midterms has a low base rate. The hostile pre-read circulated internally but did not leak.
- **T4.** Apollo's stance on independence makes a decline likely, at least for compute and data.
- **T5.** The model has 50% odds of shipping in August, and conditional on shipping, about 85% odds of a horizon above 15.8 days.

**Declared bands for side rolls** (following the judge's instruction):
- **T5 horizon.** If it materialises: roll 00–13 gives about 18.5 days, 14–27 about 17.5 days, 28–41 about 16.5 days. If it does not: 42–79 means a September ship (METR band 16–20 days), 80–99 means October or later.
- **DeepSeek V8.** Reverse the digits of T3's roll. A value of 00–24 means V8 ships in August. Otherwise it remains a rumour.
- **July jobs report.** Reverse the digits of T1's roll:
  - 00–29: unemployment rises to 9.3–9.4%.
  - 30–69: flat at 9.1–9.2%.
  - 70–99: dips to 8.9–9.0%.
- **No roll this month.** Gemini 7.5 is Q4 only. The weight rule is not before September.
</analysis>

<action_odds>
Action 1 [October plan completion]: P(failure) 30%. Reason: the plan can be built from historical data, but counsel review of the deployment-without-pass language and the CEO's standing deferral on sampling make slipping past 25 August or leaving TBD fields realistic. Trigger-design disputes are excluded because Threat 2 covers them.

Action 2 [Audit to 15 September preliminary]: P(failure) 35%. Reason: the reviewers also carry the flag queue, so a preliminary cut of about 200 transcripts by 15 September is achievable but tight. Failure means the team lead holds an early-October date. Interpretability is covered by Threat 1.

Action 3 [CAISI correction]: P(failure) 20%. Reason: a simple letter through an established channel. The main risk is counsel diluting a discoverable admission until it reads as non-corrective, or delaying it past mid-August.

Action 4 [Blumenthal 15 August email]: P(failure) 20%. Reason: routine delivery with a precedent from July. Counsel may hold the summary of CAISI's reply or ask CAISI's consent first, producing a partial or late email.

Action 5 [Apollo scoping support]: P(failure) 10%. Reason: sending the offer and opening consent inquiries is trivial. Apollo's response is modelled in Threat 4.
</action_odds>

<threat_odds>
Threat 1 [Audit yields only an upper bound]: P(materialises) 45%. Adversary suggested 55% plus 35%. Reason for the difference: the statistical point is sound, and a competent design review will surface it in August. Some chance remains that the team proposes seeded production plants or a flagged-queue true-positive denominator that gives a rough recall figure. The slip-to-October branch is dropped because Action 2's failure already covers it.

Threat 2 [Pause trigger is unworkable or disputed]: P(materialises) 40%. Adversary suggested 45%. Reason for the difference: the orchestration false-positive problem is well documented, and the cumulative-exposure arithmetic is obvious, so engineering pushback is likely. Engineering could still propose per-partner baselines that are accepted as a reasonable design, which slightly lowers the odds.

Threat 3 [Board draft leaks]: P(materialises) 8%. Adversary suggested 15%, plus 30% for restriction. Reason for the difference: circulating a plan to directors is normal, and the earlier hostile pre-read stayed internal. The leak base rate for board materials is low. The restriction scenario is already inside Action 1's failure odds.

Threat 4 [Apollo declines help]: P(materialises) 40%. Adversary suggested 45%. Reason for the difference: Apollo's two replies strongly signal independence. Bands: 00–24 means it declines everything and requires a formal statement of work; 25–39 means it accepts methodology Q&A only, declines compute and data, and the Partner A DPA issue is raised. The odds sit slightly below the adversary's because some limited cooperation is plausible.

Threat 5 [OpenAI ships above Claude-Next internal]: P(materialises) 42%. Adversary suggested 45%. Reason for the difference: the model has a 50% chance of an August ship times about 85% odds that the METR preliminary horizon exceeds 15.8 days, with repeated slips shading it slightly down. The horizon and slip bands are declared in the analysis.
</threat_odds>
