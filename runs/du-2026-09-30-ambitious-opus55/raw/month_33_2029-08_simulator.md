<events>
Your actions cause a month of slippage on every front. Most of the causes are mundane, and none is a scandal on its own. Together they deepen the impression that Anthropic cannot close anything.

**OIT mid-size (Action 1 fails).**
- On 9 August a storage-controller fault in the training cluster corrupted two checkpoints. The run restarted from day 11, and the RSO then pre-empted part of the pool to rehearse the re-check. The run finished on 23 August.
- By 31 August only about 1,900 of the ~4,100 pre-registered held-out episodes had been scored. Interim numbers are directionally consistent with the 7B pilot, with the credential-subset embedding gate at 0.53. There are no signs of levelling-up in the absolute rates.
- Apollo's pre-registration forbids reporting before full n. On 29 August the team posted a dated status note saying the result is late, with the reason and a new date of 12 September. It gave no numbers.
- The Apache release and the Ai2 agreement never started, because both were conditional on a pass. Ai2's counsel also wants an indemnity carve-out that Anthropic's D&O counsel will not grant while the litigation is live.

**Re-check and fallback scaling (Action 2 fails).**
- UK AISI lost its co-observer slot to Qwen5-fork triage, and the RSO would not run the 18 August re-check without an external observer. It is rescheduled to 16 September, with the same branches (a) and (c).
- The sandbox fixes are merged but unpublished, pending the re-check.
- Leadership gave the fallback-scaling proposal a short verbal deferral: "premature before OIT mid-size lands; no compute reallocation during the *Harlan* amendment window; revisit at Q4 planning."
- Leadership gave no written reason. The LTBT minuted the request and the deferral.

**Kit v1.1 (Action 3 fails).**
- Security review found that the honeytoken generator template reproduced Anthropic's internal token prefixes and entropy profile. An adopter's tokens would therefore reveal how Anthropic's SOC fingerprints canaries. The template goes back to rewrite, with an ETA of late September.
- Comms held the lab invitation so it can go out with the kit.
- The LTBT's August agenda was already full, so the dated commitment was never deposited.
- CalSTRS filed the amended complaint on schedule on 28 August. It quotes the July "sat on data" coverage. Under the July arrangement the vacuous note becomes releasable, but no binding deadline is attached.

**Claude Works Open (Action 4 fails; Threat 3 materialises).**
- Counsel put a formal hold on the launch on 7 August. A delete-at-session-end product in the same line of business as the Minnesota CID raised preservation questions. Its Title VII exposure on job matching was also flagged.
- CDT's preliminary design comments said the promise "no stored personal data" would be false, because the Claude app keeps abuse and safety-classifier logs for 30 days.
- The internal design memo is responsive to the CID's document requests and was produced to Minnesota on 26 August. The AG's office then added an interrogatory asking whether the product was "designed to limit investigable records."
- Shelved until the CID resolves.
- Routine items:
  - Michigan's July attestation was delivered on time.
  - Anthropic sought and got a 30-day extension on the CID response, so it published no answers.
  - Apprenticeships rose from 31 to 33 employers.
  - IRB figures were not published; they sit in the same comms queue as the kit.

**Open-weight and grid defence (Action 5 fails).**
- Qwen5 forks differ too much across quantisations for the staged IOC signatures. False-positive rates in testing hit 4%, so the extension was not armed. The V7 package is still staged.
- Both co-ops in talks postponed their board votes to September.
- New Hampshire's co-op counsel wants to review the 30-day data before release.
- The EU consultation closed on 22 August before policy and counsel signed off, so no Anthropic response was filed.
- Counsel's written OFAC opinion was not delivered, and the verifier board did not meet. Counsel's scoping memo flags Alibaba's Section 1260H listing (June 2026) for inclusion, so the Qwen5 option will need a combined OFAC/BIS/1260H opinion.

**Reactions.**
- Axios ran "Anthropic's alignment readout slips again." The piece was mild, because the status note was dated and candid.
- Hobbhahn (Apollo) publicly backed the full-n rule.
- The crossover fund sent directors a private letter noting "zero delivered milestones in August." It did not go public.
- The Minnesota AG's spokesperson called the added interrogatory "routine diligence."

**Exogenous events.**
1. **Jobs report.** The 6 September BLS report puts unemployment at 6.7%, with new graduates at 10.9%. Legal support and claims processing lead the losses.
2. **RAISE ruling.** On 19 August the Second Circuit rejected most of DOJ's preemption challenge to New York's RAISE Act. Only a disclosure-timing provision was remanded, so state frontier-transparency law stands.
3. **Dutch water board intrusion.** CERT-EU attributed a 14 August intrusion into a Dutch water board's billing and SCADA-adjacent network to operators using a fine-tuned Qwen5 fork for reconnaissance. Operations were not disrupted. The Commission's open-weight file gains urgency.
</events>

<capability_update>
Next month's Claude is marginally more capable (about CL-5.26 to CL-5.28). The gain comes from routine fallback-recipe improvements and continued agentic-coding data, with no compute reallocation and no OIT integration. The broader frontier inches up (claimed about CL-5.55, verified about CL-5.44) as Gemini 4 and OpenAI deployments mature and no new flagship lands.
</capability_update>

<world_state>
**WORLD STATE, 1 September 2029**

**1. Frontier AI capabilities and labs**
- **Capability index: claimed frontier about CL-5.55; verified frontier about CL-5.44.**
  - GDM: Gemini 4 preliminary verified multiplier 1.36×, 40-day agents. METR final report in Q3.
  - OpenAI: Researcher 3.1, 1.37×. Successor still rumoured, not announced.
  - xAI: Grok 6.1, 30-day agents, unevaluated.
  - DeepSeek: V7 open weights, 18–22-day agents. Forks are scanning utility portals.
  - Alibaba: Qwen5 open weights, 25-day agents. A Qwen5 fork was used in the Dutch water-board intrusion.
  - Anthropic: about CL-5.28 on the fallback recipe.
  - Path: CL-5.5 in Q4 2029; CL-6 in 2030; about CL-6.3 by late 2030.
- **Anthropic: company.**
  - Stock about 48% below its open.
  - *Harlan* amended complaint filed 28 August; it cites the "sat on data" coverage. The defence response is due in about 45 to 60 days.
  - D&O freeze and DoD designation stand.
  - The crossover fund sent a private letter to directors ("zero delivered milestones"). Nothing public yet.
- **Anthropic: agent caps.** 60, 45 or 30 days, unchanged. Partner review frozen until Q3. Monitors: 11 of 12. CAISI consents: 4 of 12.
- **Anthropic: sealed checks.**
  - Framing fails (0.071); sandbox-containment fails marginally; the other 3 pass.
  - Re-check rescheduled to **16 September** (UK AISI observer slot lost), branches (a) and (c) only.
  - Sandbox fixes merged but unpublished.
- **Anthropic: fallback-scaling proposal.** Leadership deferred it verbally to Q4 planning ("premature before OIT mid-size; no reallocation during the *Harlan* window"). No written reason. The LTBT minuted it.
- **Anthropic: harness v5.**
  - Readout published 1 August: logged 2.4% versus visible 1.3%, internal traffic only.
  - Kit materials held.
  - Partner in-traffic episodes: Q3 counsel review.
- **Anthropic: OIT.**
  - 7B pilot: gap −46%, gate 0.54 (0.555 on the credential subset).
  - Mid-size run finished 23 August after a storage fault and pre-emption. About 1,900 of 4,100 held-out episodes scored.
  - Interim results are directionally consistent: credential gate 0.53, no levelling-up seen. Not final.
  - A dated status note is posted; full result due **12 September** under Apollo's full-n rule.
  - Ai2 agreement stalled on an indemnity carve-out. The Apache release is conditional on a pass.
- **Anthropic: other safety work.** Omissions −74%. Tamper monitor on hash fallback. Telemetry residual 0.022 bits. 21-day disclosure. `order_semantics` SEP in review. Alignment campaign at 12% compute. Recipe integration Q4 at the earliest.
- **Anthropic: oversight-sensitivity kit.**
  - v1.1 blocked: the generator template leaked Anthropic token-prefix and entropy fingerprints. Rewrite ETA late September.
  - The lab invitation is held to go out with the kit.
  - v2 hosting pending board policy (Q3).
  - The **vacuous note** is now releasable under the July arrangement, since the complaint has been filed. The LTBT dated commitment was never deposited, so no deadline is set.
- **Anthropic: verification and evaluation grant.**
  - Anthropic's share is 38%. Second foundation's $4M due in September.
  - V7 subgrant: the OFAC opinion has not been delivered and the board did not meet.
  - The Qwen5 option requires a combined OFAC/BIS/**Section 1260H** opinion (Alibaba listed June 2026).
  - v4 annex: METR undated. Google refuses.
- **Anthropic: Safety Commons.**
  - About 4,100 installs; Shield: 93 MOUs.
  - Co-op kit v2: Vermont report out. New Hampshire's 30 days completed, with data under co-op counsel review. Both prospective co-ops' board votes are set for September.
  - Qwen5 IOC extension not armed (4% false positives). The V7 package is staged.
  - No EU consultation response was filed; the consultation closed 22 August.
  - NRECA criteria due in September; E-ISAC has not taken it up.
- **Anthropic: Claude Works.**
  - About 180,000 enrolled.
  - Schellman preliminary report due in October.
  - Code-enforced 90-day deletion.
  - Michigan: July attestation delivered; attestations continue monthly.
  - **Minnesota CID:** 30-day extension granted. The Claude Works Open memo was produced, and a new interrogatory asks about "designs to limit investigable records."
  - **Claude Works Open:** shelved under a counsel hold until the CID resolves. CDT says "no stored data" is inaccurate because of the 30-day app safety logs.
  - Ohio conditional on Schellman. Indiana protest ongoing. Oklahoma reviewing.
  - Apprenticeships: 33 employers. Quebec blocked.
- **Anthropic: medical.** IRB enrolment 247 and 103, unpublished update. R01 pending.
- **Anthropic: alternative protein.** Nebraska MOU tabled.

**2. Compute and chips.** Stargate is building toward about 10 GW with Rubin ramping. Colossus 3 is online. Texas grid study under way. RASA stalled.

**3. Policy and regulation**
- **US federal.** Regulatory freeze. CAISI has an acting director. Commerce objects to foreign attestation.
- **Courts.**
  - Second Circuit largely upheld RAISE on 19 August; one disclosure-timing provision remanded.
  - *Harlan* amended complaint filed.
  - Minnesota CID open and widened.
- **States.** Datacenter moratoria spreading. Cultivated-meat bans advancing. Indiana protest. Ohio pause. Michigan attestation regime.
- **EU.** The open-weight consultation has closed, and the Commission's file has gained urgency after the Dutch intrusion. CERT watch on V7 and Qwen5.
- **UK.** AISI scores pre-registered checks only. Its capacity is strained, and the re-check observer slot was lost.
- **China.** Promoting open weights.
- **International.** No pacing mechanism.

**4. Public opinion**
- Pew 52% concerned. Gallup 39% say AI does more harm than good.
- Headlines:
  - "Unemployment 6.7%"
  - "Anthropic's alignment readout slips again"
  - "Qwen fork used in Dutch water-board hack"
  - "Minnesota AG widens Anthropic probe"

**5. Economy.** Unemployment 6.7%; new graduates 10.9%. Legal support and claims processing lead the losses. The agent price war continues.

**6. Security.** V7-fork scanning (CISA). Dutch water-board intrusion via a Qwen5 fork (CERT-EU). March co-op intrusion probe ongoing. BEC campaigns. Bavarian and AZ Delta investigations.

**7. Pending decisions and conditions**
- **OIT mid-size full result.** Owner: alignment team with Apollo. Due 12 September. Set July, amended August.
- **Sealed-check re-check.** Owner: RSO with the UK AISI observer. 16 September; branches (a) and (c). Set June, amended August.
- **Fallback-scaling proposal.** Owner: leadership. Revisit at Q4 planning; no written reason given. Set August.
- **Vacuous note.** Owner: counsel. Releasable now that the complaint is filed; no deadline. Set July, amended August.
- **Kit v1.1 generator rewrite.** Owner: security. Late September. Set August.
- **Partner in-traffic episodes; LTBT harness allocation; partner 60-day review.** Q3.
- **Kit v2 hosting.** Board policy, Q3.
- **V7 and Qwen5 subgrant.** Owner: the verifier board. Awaiting a combined OFAC/BIS/1260H opinion. Next board meeting.
- **Second foundation $4M.** September.
- **Co-ops.** Two board votes in September; New Hampshire data release under co-op counsel review; NRECA criteria in September.
- **Claude Works:**
  - Minnesota CID response due about 29 September.
  - Schellman preliminary report in October.
  - Ohio, Indiana and Oklahoma pending.
  - Claude Works Open on hold.
- **Ai2 OIT agreement.** Indemnity dispute.
- **R01; Nebraska MOU; *Harlan* defence response; Gemini 4 METR final; DOJ review; Google terms and *Buist*.** Open.
</world_state>

<scorecard>
**Diversified Utopia milestones**
- **~90% of AI R&D done by AI:** in progress, up slightly. Frontier deployments are maturing.
- **Frontier models withheld and governments take notice:** flat.
- **First major attacks:** achieved (negatively). The Dutch water-board intrusion via a Qwen5 fork adds to it.
- **Political split:** flat.
- **Every AI built by previous AIs:** early, flat.
- **Robust alignment:** early, flat. The OIT mid-size interim looks promising but is not reportable, and the result slipped to September.
- **Lab-grown meat:** started, flat.
- **Robust policies:** early, flat. RAISE upheld is a small plus. The missed EU filing and the stalled subgrant are minuses.
- **Diseases cured:** early, flat.
- **Broad benefit distribution:** early, down slightly. Claude Works Open is shelved and the CID has widened.
- **Aligned singleton; resource floor, consent-based utopias, AI moral-patient rights:** not started.

**Summary**

| Measure | Value | Change |
|---|---|---|
| Overall DU progress | 21 / 100 | −1. No action delivered; every thread slipped a month closer to the deadline. |
| Catastrophe risk | Elevated, slightly up | The first open-weight fork was used against water infrastructure. Anthropic's safety methods are still unvalidated at scale while the frontier rises. |
| Public trust in AI | 5 / 100 | Flat. Unemployment at 6.7% and the water-board hack, already near the floor. |
| Public trust in Anthropic | 22 / 100 | −1. Another slipped readout, the widened Minnesota probe, and the amended complaint citing the "sat on data" coverage. |
</scorecard>

<setup_fix>
**Problem.** This month Threat 2 did not materialise, but Action 1, the action that would report the result, failed. The OIT science outcome is therefore neither a clean pass nor a failure. I had to invent an interim state ("directionally consistent, not reportable") with no roll. A pivotal alignment result is now pushed to next month, where it could in effect be threatened and rolled again.

**What this causes.** An outcome that feeds the endgame odds is carried forward in an unrolled limbo.

**Status.** This combines two fixes I filed before: pivotal uncertainties (November 2027 and April 2028) and carrying threats forward (October 2028).

**Proposed change.** When a non-materialised threat covers a scientific outcome whose reporting action fails, let the simulator record in world state that the outcome is "locked as not-X." Next month's adversary could then not re-threaten that same failure mode.
</setup_fix>
