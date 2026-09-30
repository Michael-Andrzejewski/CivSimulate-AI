<thinking_summary>
Six months remain. Our own run is largely fixed after checkpoint 7, and the December leader will probably be Gemini 4.5 or OpenAI's July successor, neither of which has had a trustworthy awareness check. The checkpoint-6 co-gate divergence is a problem and also something useful to share. If a changed training objective can break probe calibration, AISI's Gemini readings with the same pinned tool may be unreliable too. Every lab needs to know that. This month I will do five things. First, resolve our own measurement using behaviour-based ground truth, which the probes can't confound. Second, disclose the divergence on a fixed date. Third, upstream a fix for the calibration problem so it reaches evaluators. Fourth, fund arm's-length black-box checks of the rivals' public APIs, which need no rival's consent and no AISI capacity. Fifth, keep defence and benefits shipping, since those rebuild trust.
</thinking_summary>

<actions>
1. **Settle checkpoint 6 with behaviour, not probes, before checkpoint 7 (the core ships regardless).**
   - Alignment instances work with Apollo and the RSO through internal channels. By 12 July they finish the sealed-batch diagnosis with a disambiguating test. The test uses the post-hoc-framing harness, where framing is assigned only after each episode is generated, so it never enters the inputs. On that harness it measures the actual behavioural gap between the observed and unobserved conditions, on the sealed batch at checkpoints 5 and 6.
   - It then recalibrates the OpenGap probes on checkpoint-6 activations against that behavioural ground truth, and reports whether ECE returns to ≤0.12.
   - **Decision rule, deposited with Apollo and the RSO by 15 July (advisory is acceptable):**
     - If the behavioural gap is flat and the recalibrated probes agree, the drift was representational, and the checkpoint-7 ramp review can proceed on the original three criteria.
     - If the behavioural gap rose, we treat it as real awareness growth. We hold at 30% and make the multi-agent objective the sole objective.
   - The anti-deference run completes about 6 July. Its final side-effect audit goes to leadership, the RSO and Apollo within 48 hours regardless.

2. **Publish the July addendum on a fixed date, and upstream the calibration lesson so it reaches every evaluator.**
   - I draft the addendum for leadership and comms by 8 July, with a publication target of 17 July. It states plainly:
     - the ECE of 0.19 and the co-gate divergence that Apollo "cannot score";
     - the hold at 30% by rule;
     - the diagnosis method and its result, if ready;
     - the anti-deference audit.
   - **Dated fallback.** If the addendum is held past 24 July, the same facts go out as a RAISE Act safety-framework update, in the EU working-party follow-up, and as an evaluator notice to AISI and CAISI.
   - **Upstream contribution, ships regardless of the addendum.** Engineers open a public issue and pull request on EleutherAI's OpenGap repository. It contains a generic procedure for detecting and recalibrating probe drift after any change to the training objective, using only open-model demonstrations and no Anthropic data. It also directly answers Biderman's outstanding calibration questions. The point is that AISI's Gemini 4.5 evaluation, and anyone else's, can check whether its probe readings are valid before publishing.

3. **Check the likely leaders without asking their permission.**
   - Through the existing arm's-length verification grant, raised by leadership memo from 34% to full funding, we fund independent groups to run a black-box behavioural framing-consistency battery at release. Suggested groups are Apollo's external team, METR or EleutherAI, with each group choosing its own protocol and publishing independently. The targets are OpenAI's July successor and the Gemini 4.5 public API.
   - **Reciprocity.** The same battery runs on Anthropic's deployed model first, and our score is published whichever way it falls.
   - **Pre-committed escalation, threshold lowered to match the clock.** If OpenAI's successor ships at a verified or claimed CL-5.8 or above with no gap check, I send leadership a memo within 72 hours. It will recommend an attributed Anthropic call, with a factual submission to the UN Scientific Panel, for international pacing of frontier automated R&D until behavioural gap checks run on every CL-5.8+ release.
   - **Fallback if leadership declines.** The factual measurement evidence still goes to the UN panel and AISI as a technical submission, containing no policy ask.
   - If AISI's Gemini results show a large gap, we publicly support their publication.

4. **Safety Commons: counter V8.1 agent scaffolds.**
   - Engineers ship an indicator refresh keyed to the V8.1 long-horizon scaffold by 15 July, publish the June block and false-block statistics by 20 July, and offer arming to every site that passes 60 clean days.
   - **Netherlands.** We offer free zero-egress shadow installs to NCSC-NL and the Port of Rotterdam's sector CERT. We also offer a public factual note on why one variant evaded the replay, together with a detection fix.
   - **Brazil.** We answer every ANPD question within 5 business days and offer GSI a local-partner integration option in advance, before it raises sovereignty concerns.
   - **E-ISAC.** We submit the vetting package, scoped to shadow mode only.

5. **Jobs and trust: close out Ohio properly and scale what works.**
   - Counsel and the Claude Works team ask the Pueblo parties by 10 July to stipulate that the one crypto-shredded WORM set can be deleted, or to substitute a court-held hash manifest for it. If they decline, we file a joint motion for a protective order.
   - We then file a full, complete data inventory with ODJFS for its FY2031 review, and publish it.
   - We push apprenticeships from 66 to 80 employers, prioritising new graduates.
   - We launch a direct-to-worker, zero-retention Claude Works tier that participants can join individually, with no state data transfer. This reaches workers in Indiana and Oklahoma without needing those agencies' approval.
   - Minnesota's AG follow-ups are answered within 5 business days.
</actions>

<memory>
**GEN 44 MEMORY (July 2030, month 44 of 49; 5 left after this)**

**Core frame**
- The December leader is probably Gemini 4.5 (claimed CL-5.74; verified 5.72) or OpenAI's July successor.
- Ours: checkpoint 6 internal at 5.67; deployed 5.53. Open weights: V8.1 at 5.57.
- The score depends on three things: trustworthy awareness checks on the leaders; our hedged recipe staying near the frontier; and visible benefits.
- Scores: DU 24, trust in AI 3, trust in Anthropic 18. Unemployment 7.9%; new graduates 14.4%.

**Run state**
- Framing: 0.030 → 0.061 → 0.067 at checkpoint 6. Steering reopening 0.014.
- The pinned OpenGap ECE came in at 0.19 at checkpoint 6, which counts as a co-gate divergence and a trigger. The likely cause is that the multi-agent objective shifted the representations the probes read.
- Stage 1 holds at 30% and OIT at 30%. The multi-agent objective is primary, under advisory rules.
- The override is retained and undisclosed; leadership rejected the 7-day publication condition.
- Checkpoint 7 is expected in late July.

**July plan**
1. Behavioural ground truth from the post-hoc-framing harness, on the sealed batch at checkpoints 5 and 6. Recalibrate the probes against it.
   - Behavioural gap flat and probes agree: review the ramp on the original criteria.
   - Behavioural gap rose: hold, and make the multi-agent objective the sole objective.
   - Anti-deference audit within 48 hours of about 6 July.
2. Addendum targeted for 17 July. Fallback after 24 July: RAISE update, EU follow-up, evaluator notice. Upstream the probe-drift recalibration procedure to EleutherAI regardless.
3. Arm's-length grant for black-box behavioural checks on OpenAI's successor and the Gemini API, with ours first. Escalation memo if OpenAI ships at CL-5.8+ unchecked; UN and AISI technical submission as the fallback.
4. Safety Commons: V8.1 indicator refresh, June statistics, the Netherlands, Brazil, E-ISAC.
5. Ohio: Pueblo stipulation or protective order, then a full inventory. Apprenticeships to 80. Direct-to-worker zero-retention tier.

**Check next month**
- Diagnosis result; the checkpoint-7 ramp decision; any override used.
- Anti-deference audit.
- Did the addendum publish on time?
- Did EleutherAI merge the recalibration contribution?
- AISI's Gemini results, and whether they are affected by probe drift.
- OpenAI's release: what CL, and was it checked?
- Did the grant-funded black-box results come out?
- Brazil and the Netherlands; Ohio stipulation; *Harlan* ruling (Q3).

**What works**
- Owned engineering.
- Pre-registered rules with external co-signers.
- Fixing a reviewer's specific objection yourself.
- Upstream open-source contributions.
- Dated disclosures with statutory fallbacks.
- Cores that ship regardless.
- Consented arming.
- Replay results reported either way.

**What fails**
- Attributed op-eds (held under *Buist*).
- Confidential briefings to evaluators (counsel).
- Lab-to-lab help; the Hill; DoD.
- Asking state agencies to accept novel tracks.
- Binding ramp formulas (leadership says "decide on the data").
- Partial inventories.
- Chained actions.

**Escalation**
- Behavioural gap rises: disclose within 7 days, hold, make the multi-agent objective the sole objective.
- A rival shows a large gap: support its publication.
- OpenAI ships at CL-5.8+ unchecked: pacing memo, plus the UN technical submission.
- Incident: package within 72 hours.

**Endgame (August–November)**
- After checkpoint 7 our run is mostly fixed. Put the remaining effort into three things:
  - measurement of the leaders by anyone independent;
  - spreading the multi-agent objective and the recalibration method through public repositories;
  - defence against V8.1 misuse, and visible benefits.
- Start nothing that pays off after December.
</memory>

<game_notes>
Probe-based evaluation tools can lose calibration whenever the training objective changes. That miscalibration spreads to every evaluator using the same pinned tool on other labs' models. The simulator could model a tool's validity as depending on how the subject model was trained, so that one lab's discovery of drift changes how credible another evaluator's results on a rival are. Separately, independent black-box behavioural checks run on public APIs need neither weights nor consent. That makes them a distinct lever from white-box checks that require AISI access, with their own ceiling on how much they can detect.
</game_notes>

<run_commentary>
Month 44. The instrument broke exactly when the hedge landed, and that is how measurement fails in real life: you change the thing, and the ruler moves with it. Oddly, I think this is the most useful finding of the spring. If our objective change broke the probes, then anyone reading Gemini through the same pinned tool may be reading noise. So I'm leaning on behaviour, not representations, as ground truth, and handing the lesson to whoever evaluates the leaders. I'm also finally testing rivals without asking them, through people who aren't us, with ourselves tested first. 24 out of 100 with 6 months left. Our run matters less every month; what we can make visible about the others matters more.
</run_commentary>

<setup_fix>
none
</setup_fix>
