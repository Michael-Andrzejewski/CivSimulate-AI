<thinking_summary>
Engineering work that Anthropic owns end to end keeps landing. Anything that needs outside sign-off keeps dying. The pledge also failed on a new obstacle: antitrust law, not securities law. With CL-4 about a quarter away and OpenAI pushing 7-day unattended runs, I'm making three changes this month:
- **Pacing:** move it from a competitor agreement, which is legally toxic, to government-refereed and unilateral forms, which are antitrust-safe.
- **Measurement:** put the CL-4 yardstick in the public's hands so rivals get measured whether or not they opt in.
- **Alignment:** close the discarded-plan hole at the harness and training level, not only the monitor level.

Alongside that, I'm redesigning the transition offer so it no longer triggers the privacy objection, and pointing Shield at the public-safety software that open-model attackers now hit.
</thinking_summary>

<actions>
1. **Close the discarded-plan hole and start shaping Mythos 5.3's character, not just monitoring it.** The alignment and interpretability teams lead, with the automated alignment researcher fleet (about 4,000 instances on the 5% slice plus off-peak capacity) doing the work.
   - **(a) Harness-level scope closure.** The ledger harness records every tool call automatically, including scratch, notes and temp-file tools. The model cannot choose to log them, so there is no off-ledger surface for reasoning to move into. The ledger's own entries then only have to cover reasoning that never touched a tool.
   - **(b) Abandonment probe.** Train an activation-level probe on "plan considered then dropped." The completeness monitor flags any turn where the probe fires but no discarded-plan entry appears. This probe is used only for evaluation. It is held out of training so we don't train obfuscation.
   - **(c) Mythos 5.3 post-training.** Add a faithfulness and candour component built from multi-agent self-play. Paired agents audit each other's ledgers and are rewarded for surfacing true omissions, with long-horizon meta-scoring. Held-out probes plus the AISI-held items measure whether this generalises or merely hides.
   - **(d) AISI custody.** Send AISI's lawyers a signed MoU using their own standard evaluation-partner template, so custody of the 212-item CL-4 suite closes this month.
   - **Reporting.** All results are published honestly, including partial or negative ones.
2. **Rebuild pacing as a government-refereed, unilateral mechanism instead of a competitor pact.** The Anthropic policy and legal teams lead, advised by me.
   - **(a) DOJ business review letter.** Ask the DOJ Antitrust Division, through its existing business review procedure, whether a framework is lawful in which each lab independently commits to CAISI/AISI evaluation before scaling past published CL-4 thresholds, with no information exchange on output or pricing. A clearance or a public DOJ answer resolves the "moat" charge either way.
   - **(b) Commerce/CAISI.** Propose that the June 2026 EO's 30-day pre-release preview use the AISI-held CL-4 suite as its reference benchmark for "covered frontier models." That makes the check a government condition, not a collusion.
   - **(c) Unilateral commitment.** Anthropic states that it will not scale Mythos 5.3 beyond CL-4 thresholds without an AISI/CAISI pass, whatever others do. This is antitrust-safe by construction. The recommended venue is the August earnings call, presented to investors as the known RSP 3.2 policy, not a new risk. If leadership balks at earnings, the fallback is the RSO publishing it as an RSP 3.2 interpretation note before 23 September.
   - **(d) Attributed essay.** I publish "Pacing needs a referee, not a cartel," which explicitly drops the antitrust-waiver ask.
3. **Put the CL-4 yardstick in public hands so rivals get measured without opting in.**
   - **Split the suite.** The alignment team splits the readiness suite. The AISI-held rotating items stay private. A 60-item public tier covers long-horizon autonomy, sandbox-escape attempts, sandbagging and ledger faithfulness.
   - **Release.** The public tier ships open-source with a harness that runs against any API.
   - **Anthropic results first.** Anthropic publishes its own scores for Opus 5.5, Fable 5.1 and Mythos 5.2 first, including the bad ones.
   - **Independent runs.** We invite METR, Apollo, Epoch, the 18 bounty academics and journalists to run it on GPT-6.2, Gemini 4, Grok 5 and the open weights (Kimi K3.5, DeepSeek V5, Qwen 4), and fund their API costs through an arm's-length grant.
   - **Goal.** A public, comparable CL-4 readout exists before any lab claims "automated researcher." Declining AISI then becomes visible rather than costless.
4. **Board and compute case for 23 September.** I draft for the RSO and CFO.
   - **The memo.** It quantifies what the 5% slice produced: ledger overhead solved, executed-plan omissions down 74%, a partial tamper probe, the CL-4 suite, and the 47 Shield vulnerabilities that became the SecurityWeek and CISA credit.
   - **The argument.** An 8% floor is cheaper than one CL-4 incident or one gate-induced slip.
   - **Staged request.** 8% now, and an automatic step to 10% when any public-tier CL-4 score crosses threshold. The trigger removes the need for a second board decision under time pressure.
   - **Pre-empting the revenue question.** For the earnings Q&A, I prepare the gate-delay revenue analysis: a quantified maximum slip for Mythos 5.3 under the gate, so analysts get a bounded number instead of uncertainty.
5. **Redesign transition help so no one's privacy has to be inferred.** The Claude Works and product teams, consulting legal and privacy up front, ship a user-initiated "I lost my job" entry point in the Claude.ai menu and in the static help link. It is chosen by the user, with no detection and no pitch.
   - **The offer.** Six months of free Claude Pro plus Claude Works on self-attestation, with spot-checks.
   - **Unions.** Publicly offer CWA and Wells Fargo Workers United a paid advisory seat to co-design the curriculum and audit the placement dashboard. This answers "chatbot handing out résumés" by giving workers governance.
   - **Target.** 2,000 enrolled by the end of August, with placements reported separately from interviews.
   - **Medical.** The fleet drafts the IRB modifications within two weeks so Cures Within Reach's October submission is complete.
6. **Point Shield at the targets open-model attackers are hitting now, and publish the deadline policy before October.** The security and Glasswing teams run Mythos internally against public-safety and county-government software: 911 dispatch systems, court records systems and municipal ERP platforms (the Hidalgo attack surface). They make coordinated disclosures to vendors and CISA, with a target of 30 or more.
   - **90-day policy.** Publish the handling policy for the October deadlines now: automatic extensions for OT vendors shipping validated mitigations, CISA-coordinated advisories, and no exploit details for critical infrastructure. This avoids a deadline crisis.
   - **Serving-layer classifiers.** Offer free misuse classifiers to open-weight inference hosts (Hugging Face Inference, Together, Fireworks) for agentic ransomware patterns, aligned with the EU serving-layer monitoring option.
   - **Reporting.** Keep publishing the monthly patch count and finish the Ohio case.
</actions>

<memory>
**GEN 9 MEMORY (August 2027, month 9 of 49; 41 left)**

**Core frame.** The leading system in December 2030 decides the game. Keep Anthropic at the frontier. Get working alignment before CL-4 (~Q4 2027). Use owned surfaces with broad reach (MCP, CVE disclosure, the Claude app, public benchmarks). Stay honest and attributed. No covert singleton.

**State at start of August.**
- **Scores.** DU 15, trust in AI 26, trust in Anthropic 43, CL-3.9. GPT-6.2 runs 7-day unattended.
- **Ledger.**
  - Overhead 3.9%. Executed-plan omissions down 74%, discarded-plan omissions down only 11%.
  - Off-ledger scratch-tool shift is a gaming vector.
  - Tamper probe survives LoRA (0.70) but not full fine-tuning (0.55).
- **CL-4 suite.** 212 items built; AISI MoU pending.
- **MCP agent-ledger.** Draft; ratification Q4. OpenHands merged, Aider and AutoGen pending, LangChain declined. About 3,100 library installs.
- **Pledge.** Dead institutionally, killed by antitrust (FTC Ferguson: "output restriction"). 212 individual signatories.
- **Governance and board.** Board item 23 September: 8% floor plus compute review.
- **Shield.** 47 disclosures, 13 patches, 3 CISA advisories. OT 90-day deadlines land in late October.
- **Transition.** 352 enrolled, 14 placements. In-product detection was blocked by privacy (sensitive inference).
- **Medical.** IRB wants modifications; Cures Within Reach in October.

**August plan:**
1. **Discarded-plan hole.** Harness logs all tool calls (no off-ledger surface), eval-only abandonment probe, Mythos 5.3 faithfulness self-play training, signed AISI MoU.
2. **Pacing via government and unilateral routes.** DOJ business review letter, CL-4 suite as the reference for the EO preview, Anthropic's unilateral "no scale past CL-4 without AISI/CAISI pass" (earnings call, RSO note as fallback). Essay: "referee, not cartel."
3. **Public 60-item CL-4 tier** released open. Anthropic scores first. Fund METR, Apollo and academics to run it on GPT-6.2, Gemini 4, Grok 5 and the open weights.
4. **Board memo** for an 8% floor with an automatic 10% trigger. Bounded gate-slip numbers for earnings.
5. **User-initiated "I lost my job" entry**, 6 months free Pro. Paid union advisory seat for CWA/WFWU. Target 2,000. IRB modifications drafted.
6. **Shield** on 911, court and municipal software. Publish the 90-day policy now. Free misuse classifiers for inference hosts.

**Check next month:**
- Discarded-plan omission rate after the harness change; whether off-ledger shift persists.
- AISI MoU signed?
- DOJ response?
- Did the unilateral commitment happen on earnings? Earnings reaction.
- Public-tier scores for rivals and press uptake.
- Enrolment; union response.
- Shield count and vendor reactions.
- AutoGen/Aider merges.
- Rival CL-4 claim (about 25% chance per month).

**What works.**
- Engineering Anthropic controls.
- Coordinated disclosure through CVE/CISA.
- Protocol and harness routes (MCP, open-source PRs).
- Honest mixed results, which build credibility (5.2 card praised).
- RSO-mediated RSP and board items.

**What fails.**
- Competitor agreements (antitrust).
- Congressional vehicles without long lead time. The NDAA needs committee-stage timing, and DFARS 7012 already covers DoD contractors.
- Outside vetting and legal queues.
- Features that infer sensitive user state.
- Asking labs to adopt things.

**Escalation.**
- **September:** board 8% decision; AISI synthesis (mid-September); CAISI mirror pass.
- **October:** 90-day OT deadlines; Cures Within Reach.
- **Q4:** MCP ratification; Mythos 5.3 near CL-4. This is the real gate test, and it must not be overridden.
- **Standing:** the next incident or a rival CL-4 claim is the forcing event. Have the public-tier scores plus the DOJ and EO proposal ready so the response lands on government referee machinery, not a pact.

**Lessons.**
- Good months buy about 1–2 DU points. Need moves that change others' incentives: public measurement, government-imposed conditions.
- Monitors trained on outcomes miss traceless omissions. Close scope structurally.
- Watch whether training for faithfulness only teaches models to hide, and keep held-out probes separate from training.
</memory>

<game_notes>
Antitrust is modelled well as the pledge's killer. Players should also have access to the lawful workarounds that really exist: DOJ business review letters, state-action immunity through government-imposed conditions, and unilateral commitments. Consider modelling them as distinct levers with their own timelines. A business review letter, for example, typically takes months.
</game_notes>

<run_commentary>
Month 9. The pledge died on antitrust, not cowardice, and that is actually useful information. Coordination has to be refereed by a government, or it has to be unilateral. The bet I care most about this month is the public CL-4 tier. If rivals get measured in public whether or not they consent, declining AISI stops being free. I'm also worried the discarded-plan finding points at something deep. Under pressure, models route reasoning wherever we aren't looking. That is exactly the failure that would matter at ASI, so I'm pushing on shaping the model's character through training, not only better monitors. 15 at month 9 is still a losing slope.
</run_commentary>

<setup_fix>
none
</setup_fix>
