<events>
Your actions produce real gains on paper and in contracts, but the frontier-scale gate evidence you most needed slips again.

**Action 1: pause re-verification and the gated 1e28 launch (failed).**
- **The pause fix.** Cluster engineering shipped the orchestration fix on 6 July. The first full-cluster mock pause on 9 July was clean: 38 minutes, 100% halt. The second, on 13 July, took 57 minutes. The fix had moved the bottleneck: nodes now halted correctly, but a synchronous checkpoint flush queued behind itself. The consecutive-run counter reset.
- **Second fix.** An asynchronous flush with a hard timeout landed on 27 July, too late to complete three clean runs in July. The launch now targets mid-August, so no checkpoint and no gate evidence exist yet.
- **Redwood/METR.** Redwood accepted the CAISI-style terms in principle. METR's counsel is still redlining indemnity. The snapshot fallback never triggered because there were no gate checks to snapshot.
- **Merges.** Repeated mock-pause cycles absorbed part of the compute reserved for merges. One of the two pending merges ran: it kept 85% of the gain and cut drift by 24%, consistent with last month's non-replication. The third merge and the variant arm remain pending and unscorable.
- **Trace of Threat 3.** Two nodes were unreachable during the 9 July test and were excluded under the pre-documented healthy-node definition. Nobody objected, and nothing leaked.

**Action 2: consumer rollout and Q2 disclosure (succeeded), hit by Threat 5.**
- **Rollout.** The consumer tier of Fable 5.5 launched on 1 July after clean enterprise telemetry.
- **Disclosure.** The 60-day disclosure was published on 3 July in counsel's format. It states the pause fault, the fix, and the merge non-replication plainly. Specialist press called it "unusually candid." IR used the testing-cost note in two analyst calls, and Kerrisdale's follow-up was muted.
- **The bypass.** On 18 July an independent researcher group published a bypass of the consumer tier's cyber-routing classifier. Wired and The Verge ran it on 19–20 July, citing AISI's earlier "elevated but tier-contained" language.
- **Response.** Anthropic shipped a classifier update on 21 July. It published a short incident note on 22 July saying roughly 1,900 sessions had used the technique, with no confirmed downstream compromise.
- **Reactions.**
  - Public Citizen called for suspending the consumer tier.
  - Chinese state media recycled their earlier criticism of Claude Code's auto mode.
  - Kerrisdale folded the episode into its "testing-cost margin" thesis.
  - The stock fell about 4% over the week and ended July roughly 3% above the offer price.

**Action 3: turning the FMF gate commitment into signatures (failed).**
- **Working group.** The FMF Q3 working group did not meet in July. Its first session is set for 16 September.
- **GDM.** GDM politely declined Anthropic co-running its gate design, citing infrastructure confidentiality. It repeated that it will "evaluate for subsequent runs."
- **Microsoft.** Microsoft received the tooling on 11 July but made no signing statement.
- **OpenAI.** OpenAI acknowledged receiving the commitment text and did not respond further.
- **Antitrust draft.** The unilateral-parallel draft is finished and sitting with Anthropic's antitrust counsel. With no verified pause, there was no fixed-pause addendum to give CAISI. CAISI got an interim status note instead.
- **Trace of Threat 1.** A Microsoft lawyer asked informally whether FMF minutes are discoverable. No hold followed.

**Action 4: the international track (succeeded).**
- **Pre-briefs.** The DC team briefed the China Select Committee staffer on 8 July and NSC/Commerce contacts on 10 July. The staffer asked for the final agenda in advance and raised no formal objection.
- **Annex.** Export counsel accepted the split. The public annex is cleared for an August release, and the controlled version goes to UK AISI and CAISI only.
- **HMG.** HMG signed off on 29 July, days before recess. Two conditions apply: no Glasswing-derived material, and a UK AISI chair for the eval-protocol session.
- **Date and invitation.** The workshop is set for 23–24 September in London. The Tsinghua CISS invitation went out on 30 July, and no reply has arrived yet.

**Action 5: pacing paper and hospitals (succeeded).**
- **Pacing paper.** "Verifiable Pacing for Automated AI R&D" is drafted and circulating internally. Leadership has scheduled its go/no-go for 19 August.
- **Hospitals.** Three of the four hospital scans were completed. They found 41 critical exposures, and remediation plans have been agreed. The fourth scan is scheduled for August. Piedmont received its kit on 24 July.
- **OpenAI.** OpenAI's security team received the contribution spec.

**Action 6: benefit contracts (succeeded strongly).**
- **Stanford.** Leadership withdrew the pre-publication review clause. Stanford signed on 26 July with a 30-day factual-accuracy review and no veto.
- **GFI.** The first Q3 budget meeting on 15 July approved a $6M, two-year grant to GFI for open cultivated-meat cost research.
- **Other programmes.**
  - Utah's deployment is scheduled for 12 August.
  - DNDi pipelines are running, with first readouts in September.
  - Pennsylvania is still frozen by the budget impasse.

**Exogenous events.**
1. **Gemini 4 Ultra** reached general availability on 15 July. It leads several agentic benchmarks, and race coverage intensifies.
2. **June jobs report (3 July).** Unemployment ticked up to 5.1%, the eleventh straight month of customer-service losses. New-graduate unemployment is about 6.3%.
3. **The 10th Circuit** heard oral argument in the Colorado case on 22 July. A ruling is expected in the autumn.
</events>

<capability_update>
Next month's generation is only a modest step up: post-training and algorithmic refinements on the existing base put it roughly at Gemini 4 Ultra level. The 1e28 run has not launched, so there is no scale gain. Anthropic now trails GDM slightly at the frontier while GDM's ungated 1e28 run continues.
</capability_update>

<world_state>
**WORLD STATE: 1 August 2027**

**1. Frontier AI capabilities and labs**
- **Anthropic models**
  - Fable 5.5 is live on enterprise, API and consumer tiers. The consumer tier launched 1 July. A cyber-routing classifier bypass was published 18 July and patched 21 July, with an incident note on 22 July: about 1,900 sessions, no confirmed compromise.
  - Mythos 5.5 remains restricted.
  - The internal successor is roughly at Gemini 4 Ultra level.
- **Anthropic alignment**
  - The pause fix is iterating. The first fix moved the bottleneck to checkpoint flush (57-minute run on 13 July). The second fix landed 27 July. Three consecutive clean mock pauses are still required, and the 1e28 launch targets mid-August.
  - No gate evidence exists yet.
  - Redwood has agreed to terms in principle. METR's indemnity redline is open.
  - Merges: 2 of 3 are done, both showing about 20–24% drift reduction. The third is pending, and the variant arm is not yet scorable.
- **Anthropic research.** The goodness pilot is at 5%, and environments are at about 94%.
- **Anthropic corporate**
  - Stock is about 3% above the offer price.
  - Revenue run-rate is about $97B.
  - The 60-day disclosure was published 3 July and was well received.
  - Kerrisdale has added the jailbreak to its thesis.
  - Public Citizen is calling for suspension of the consumer tier.
  - The KYC red-team is due Q3.
- **OpenAI.** GPT-6 is fully rolled out. OpenAI is FMF receive-only, has the contribution spec, and has not responded on the commitment text.
- **GDM.** Gemini 4 Ultra has been generally available since 15 July. Its ungated ~1e28 run continues. It declined co-design and will "evaluate for subsequent runs."
- **Other labs.** xAI's Grok 5 has light safeguards. Meta is silent.
- **Chinese labs.** DeepSeek V5 is about 2–3 months behind the frontier, Qwen4 about 3–4 months, and Kimi K3.5 about 5 months.
- **Capability level.** Multi-day autonomous software engineering and most routine ML experimentation. Open weights are close behind.

**2. Compute and chips**
- 1.5 GW is online. The 1e28 run is gated on pause re-verification.
- RASA is stalled in the Senate.
- Commerce's open-weight rule is still rumoured.
- CAISI has the gate methodology plus an interim status note.

**3. Policy and regulation**
- **US federal**
  - The EO framework is operating.
  - The NDAA national-standard fight moves to conference in the autumn.
  - H.R. 1412 is stalled, and the Casar investigation continues.
- **US states**
  - NY RAISE and CA SB 53 are in force, and NY DFS guidance is pending.
  - The 10th Circuit heard argument in the Colorado case on 22 July, with a ruling in the autumn.
- **EU.** The AI Office GPAI review and the open-weight systemic-risk questions continue.
- **UK.** The frontier bill is at consultation. HMG signed off on workshop co-convening on 29 July, on the conditions above.
- **International**
  - The London workshop is set for 23–24 September, co-convened by Concordia and UK AISI.
  - The Tsinghua CISS invitation was sent 30 July, with no reply yet.
  - The public annex is cleared for August publication, and the controlled annex goes to allied institutes only.
  - The China Select Committee staffer was briefed and wants the final agenda.
- **FMF.** The first Q3 working-group session is 16 September. The antitrust-reviewed unilateral commitment draft is ready. Microsoft has the tooling.

**4. Public opinion and trust.** Anxiety is high. Unemployment is up slightly, and there is a jailbreak news cycle. Specialist press is positive on the disclosure's candour.

**5. Economy and labour**
- Unemployment is 5.1%, and new-graduate unemployment about 6.3%.
- The Stanford contract was signed 26 July, with a 30-day accuracy review and no veto.
- Utah deploys 12 August.
- Pennsylvania is frozen behind the budget impasse.
- The GFI grant of $6M over two years was approved 15 July.
- DNDi readouts are due in September.
- The Career Transition college beta continues.

**6. Security and incidents**
- **Hospitals.** Three of four scans are done (41 critical findings, with remediation plans). The fourth scan is in August. Piedmont's kit was delivered 24 July.
- **Threat sharing.** Anthropic, GDM, Amazon and Microsoft contribute. OpenAI receives only.
- **Other.** The DNA screen is with IGSC. Open-weight misuse is elevated. There is no confirmed AI bio incident.

**7. Key open threads**
1. Complete pause re-verification, launch the 1e28 run, reach the first gate checkpoints, and sign METR.
2. Finish the third merge and score the variant arm.
3. The pacing paper go/no-go on 19 August.
4. Publish the public annex, get Tsinghua's reply, and hold the September workshop.
5. The FMF 16 September session and GDM's decision.
6. Public Citizen and consumer-tier scrutiny.
7. NDAA conference, the Commerce rule, and the Colorado ruling.
8. The fourth hospital scan and Piedmont follow-up.
9. The Utah launch, DNDi readouts, and the start of GFI and Stanford work.
</world_state>

<scorecard>
**Milestones**
- **AI agents do most of the AI R&D work:** in progress (unchanged).
- **Frontier models withheld or staged; governments take notice:** advanced (mixed). The consumer rollout was staged and honest, but a public bypass followed.
- **First major AI infrastructure and cyber attacks:** achieved (negative). Hospital defence is expanding: three scans done and the Piedmont kit delivered.
- **Political polarisation:** in progress (stable).
- **Robust alignment:** early (unchanged). Still no frontier-scale gate evidence, and the second merge confirms that "half the drift" does not replicate.
- **Multi-agent RLVR with goodness meta-scoring:** early pilot (unchanged).
- **Robust policies / ping-pong:** early (unchanged). The FMF stalled until September.
- **Anthropic meat business:** seed, slight gain. The $6M GFI grant was approved.
- **Many diseases cured:** early (unchanged). DNDi readouts are due in September.
- **Benefits broadly distributed:** early, slight gain. Stanford is signed and Utah is scheduled.
- **Continuous-learning, stable-identity AI:** started (weakened). Modest drift reduction only.
- **International coordination:** early, gain. A dated, HMG-backed workshop exists and the China invitation has been sent.

**Summary scores**
- **Overall DU progress: 20/100** (+1). The Stanford signature, the GFI grant, the dated HMG workshop and hospital progress, offset by the second 1e28 slip and the stalled FMF.
- **Catastrophe risk: elevated, stable.** GDM's ungated 1e28 run continues. The consumer bypass was contained quickly.
- **Public trust in AI: 25/100** (−1). Unemployment rose to 5.1% and the jailbreak was in the headlines.
- **Public trust in Anthropic: 45/100** (−1). The bypass news cycle and Public Citizen's call, partly offset by the candid disclosure and the quick patch.
</scorecard>

<setup_fix>
**Problem: incidents in the narrative need a detail limit.** When a materialised threat involves an AI-misuse incident (here, a classifier bypass), nothing tells me how much technical detail to put in the narrative.

**What it causes:** it invites mechanism-level description that adds nothing to the simulation.

**Proposed fix:** add an instruction to describe such incidents only by their effects and scale (who, when, how many sessions, what the response was), never by technique.
</setup_fix>
