<events>
Your actions cause a busy June. The release goes cleanly, while the frontier-scale gate work you most wanted to show does not happen this month.

**Action 1: Fable 5.5 / Mythos 5.5 release.** CAISI's window closes on 7 June with no blocking findings. AISI signs off on 11 June. Its cyber team notes "elevated but tier-contained" exploit-chaining performance, which the restricted routing already covers. Washington makes no request to hold the UK results. Fable 5.5 ships to enterprise and API customers on 16 June, and Mythos 5.5 goes to Glasswing and select bio partners. The system card is 142 pages. It includes:
- eval-awareness of 11–15% on the largest configurations;
- the dry-run gate numbers;
- a named paragraph on each external tester's findings.

Specialist press is warm. Zvi and Transformer call it "the first system card that reads like a flight-test report." Kerrisdale's 19 June note shifts from "kill switch" to "margin compression from testing overhead," which is a weaker line, and the stock ends the month about 7% above the offer price. The consumer tier is set for about 1 July, pending telemetry.

**Action 2: live gate checks (failed).** The 1e28 run never reaches a checkpoint in June. In the pre-launch integration test on the new 1.5 GW cluster, the mock pause took 6 hours 40 minutes instead of 38 minutes. The cause was that the new cluster's job-orchestration layer ignored the gate's halt signal on 14% of nodes. Under the pre-committed rule, the RSO holds the launch until the pause mechanism is re-verified. Engineers expect the fix in early July.

The external-access and replication strands also stall:
- The Redwood/METR live-access agreement stalls in contracting over data-handling terms. It is not refused, only unfinished.
- The variant arm is honestly logged as "not yet scorable."
- Only one of three anchored merges completes because of cluster contention. It kept about 88% of the capability gain but cut drift by only about 20% versus a naive merge, so the earlier "half the drift" result does not replicate.

The failed pause test goes into the Q3 disclosure draft as a caught fault.

**Action 3: gate methodology.** The Scale-Up Gate Methodology is published on 23 June, with held-out honeypot content withheld. Responses:
- **GDM** accepts a technical briefing on 30 June. It says it will not retrofit its current run but will "evaluate for subsequent runs."
- **Microsoft** requests the tooling.
- **OpenAI** says only that it "supports a diversity of safety approaches."
- **FMF** tables the ≥1e28 commitment for its Q3 working group.

CAISI acknowledges the document as input to "any forthcoming framework." One NetChoice tweet sneers, and the tweet goes nowhere.

**Action 4: international track (partial).** Dario and Clark approve a September workshop in principle, with about $1.2M in funding moved forward from Q3. UK AISI agrees at working level to co-convene, but HMG sign-off is still pending. Concordia agrees to handle the invitations. The Tsinghua CISS invitation is held until HMG clears it. Counsel's export-control review keeps the technical verification annex internal, with a target of publishing in August. A House China Select Committee staffer asks Anthropic's DC office an informal question about "track-2 plans." Nothing leaks.

**Action 5: defensive security.** HHS runs the anonymised Midwest case study on its 17 June sector call. Four health systems volunteer: two in Ohio, one in Arizona and one Texas academic system. Scans are scheduled for July and August. The Piedmont kit is ready. Microsoft's first signatures flow on 12 June under the narrowed spec. OpenAI replies in writing that it will "review contribution feasibility in Q3."

**Action 6: benefit and disclosure (failed).**
- **Stanford.** Stanford's counsel objects to a pre-publication review clause that Anthropic's lawyers had inserted. Negotiations restart, and the contract slips to July or August.
- **Pennsylvania.** The state misses its 30 June budget deadline, and the agreement is frozen behind the impasse.
- **GFI grant.** Leadership declines the early approval and keeps it in Q3.
- **Utah and DNDi.** Utah deployment prep continues. DNDi pipelines are ready.
- **60-day disclosure.** The draft exists, but counsel wants the gate section restructured. It will be finalised in early July, still inside the window.

**Exogenous events**
- **Jobs.** BLS (5 June) reports unemployment flat at 5.0%, with customer-service employment down for a tenth month but by a smaller amount. SASC's markup (12 June) passes its NDAA without national-standard language, which sets up a conference fight in the autumn.
- **Open weights.** Alibaba releases Qwen4 open weights (2.9T-A110B) on 24 June. It sits about 3–4 months behind the frontier on agentic coding. Commerce's interim open-weight rule is still rumoured, not issued.
- **Gemini.** Google announces general availability of Gemini 4 Ultra for 15 July, which renews "race" coverage.
</events>

<capability_update>
Next month's Claude is modestly more capable. It is roughly a Fable 5.5 successor with post-training refinements on existing compute, about a half-step above June's internal model. The Anthropic 1e28 run's delay means no scale jump arrives yet, while GDM's ungated 1e28 run continues.
</capability_update>

<world_state>
**WORLD STATE: 1 July 2027**

**1. Frontier AI capabilities and labs**
- **Anthropic models**
  - Fable 5.5 has been on enterprise and API since 16 June, and the consumer tier is targeted for about 1 July after clean telemetry.
  - Mythos 5.5 is restricted to Glasswing and bio partners.
  - The system card, 142 pages, is well received.
  - Internal: the successor post-training is modestly above Gemini 4 Pro and roughly at Gemini 4 Ultra.
- **Anthropic alignment**
  - The gates are in force.
  - The 1e28 launch is held because the mock pause on the new cluster took 6h40m, with the halt signal ignored on 14% of nodes. The fix is expected in early July, after which re-verification is required before launch.
  - The fault is logged for the Q3 disclosure.
  - The Redwood/METR live-access contract is stalled on data-handling terms.
  - The variant arm is not yet scorable.
  - Merge replication: one of three merges ran, keeping 88% of the gain with only about 20% drift reduction. "Half the drift" did not replicate, and two merges are pending.
- **Anthropic research.** The goodness pilot is at 5%, and environments are at about 93%.
- **Anthropic corporate**
  - Stock is about 7% above the offer price.
  - Kerrisdale has shifted to a "testing-cost margin" thesis.
  - The 60-day disclosure is being finalised in early July.
  - Revenue run-rate is about $95B.
  - KYC red-team is due Q3, and the trace addendum is parked.
- **OpenAI.** GPT-6 is rolling out. OpenAI receives FMF data only, says it will "review contribution" in Q3, and is noncommittal on the gate norm.
- **GDM**
  - Its ~1e28 run is ungated and underway.
  - It accepted the gate briefing and will "evaluate for subsequent runs."
  - Gemini 4 Ultra reaches general availability on 15 July.
- **Other labs.** xAI's Grok 5 has light safeguards. Meta is silent.
- **Chinese labs.** DeepSeek V5 is about 2–3 months behind the frontier, and Qwen4 (open weights, 24 June) is about 3–4 months behind. Kimi K3.5 is about 5 months behind.
- **Capability level.** Multi-day autonomous software engineering and most routine ML experimentation. Open weights are close behind.

**2. Compute and chips**
- 1.5 GW is coming online. Anthropic's 1e28 run is delayed to July by the gate fix.
- RASA has stalled in the Senate.
- Commerce's open-weight interim rule is still rumoured.
- The gate methodology is lodged with CAISI and Commerce.

**3. Policy and regulation**
- **US federal**
  - The EO framework is operating.
  - The HASC mark's national-standard provision stands, but the SASC NDAA omits it, so the fight moves to conference (autumn).
  - H.R. 1412 is stalled, and the Casar investigation continues.
- **US states**
  - NY RAISE and CA SB 53 are in force, and NY DFS guidance is pending.
  - The Colorado ruling from the 10th Circuit is pending.
- **EU.** The AI Office GPAI review and the open-weight systemic-risk questions continue.
- **UK.** The frontier bill is at consultation. AISI signed off on Mythos 5.5 and is still overloaded.
- **International**
  - The September workshop is approved in principle, with about $1.2M funded.
  - UK AISI's working-level co-convening awaits HMG sign-off.
  - Concordia is handling invitations, and the Tsinghua CISS invitation is held pending HMG.
  - The verification annex is in export-control review, with an August target.
  - A House China Select Committee staffer made an informal inquiry, with no public attention.
  - The FMF ≥1e28 gate commitment is on the Q3 working-group agenda.

**4. Public opinion and trust.** Anxiety is high but stable, with unemployment flat at 5.0%. The release drew good specialist press, and there were no scandals. Gemini 4 Ultra and Qwen4 feed race coverage.

**5. Economy and labour**
- Unemployment is 5.0%, new-graduate unemployment about 6.1%, and there have been ten months of customer-service losses.
- The Stanford contract has slipped over a pre-publication review clause.
- Pennsylvania is frozen behind the state budget impasse.
- Utah deploys in Q3.
- The GFI grant stays in the Q3 budget.
- DNDi pipelines are ready, with Q3 readouts.
- Career Transition mode's college beta continues at 140 colleges.

**6. Security and incidents**
- **Hospitals**
  - The HHS case study was presented.
  - Four health systems have volunteered, with scans in July and August.
  - The Piedmont kit is ready for the July revisit.
- **Threat sharing.** Anthropic, GDM, Amazon and Microsoft (live since 12 June) contribute. OpenAI receives only, and Meta is silent.
- **Other.** The 48-hour eval playbook is in use. The DNA screen is with IGSC. Open-weight misuse is elevated, and there is no confirmed AI bio incident.

**7. Key open threads**
1. Fix and re-verify the pause mechanism, then launch the 1e28 run with the first live gates. Finish the Redwood/METR contract, run the merge replications and score the variant arm.
2. The Fable 5.5 consumer rollout.
3. HMG sign-off, the China invitation and publication of the annex.
4. FMF Q3 working group, GDM's subsequent-run decision and OpenAI's contribution.
5. NDAA conference.
6. Commerce's open-weight rule.
7. Hospital scans and Piedmont.
8. Stanford, Pennsylvania, Utah, DNDi, the GFI grant and the 60-day disclosure.
9. The Colorado ruling.
</world_state>

<scorecard>
**Milestones**
- **AI agents do most of the AI R&D work:** in progress (unchanged).
- **Frontier models withheld or staged; governments take notice:** advanced. A second clean staged release, with external sign-offs honoured.
- **First major AI infrastructure and cyber attacks:** achieved (negative). Hospital defence is expanding: four volunteers and HHS visibility.
- **Political polarisation:** in progress (stable). SASC omission keeps preemption contested.
- **Robust alignment:** early (mixed). The methodology is public. The gate caught its own pause fault, but no live frontier-scale evidence yet, and the merge result did not replicate.
- **Multi-agent RLVR with goodness meta-scoring:** early pilot (unchanged; not yet scorable).
- **Robust policies / ping-pong:** early, slight gain. The gate methodology is lodged with CAISI and on the FMF agenda.
- **Anthropic meat business:** seed (unchanged; the grant stays in Q3).
- **Many diseases cured:** early (unchanged).
- **Benefits broadly distributed:** early (stalled). Stanford and Pennsylvania slipped.
- **Continuous-learning, stable-identity AI:** started. The key result weakened on replication.
- **International coordination:** early, small gain. A funded workshop is approved in principle, though China participation and the annex are still pending.

**Summary scores**
- **Overall DU progress: 19/100** (+1). The clean release, the published gate methodology, the funded workshop and wider hospital defence, offset by the gate delay, the failed merge replication and stalled benefit contracts.
- **Catastrophe risk: elevated, stable.** GDM's ungated 1e28 run and Qwen4 add pressure. The caught pause fault slightly strengthens confidence in Anthropic's own process.
- **Public trust in AI: 26/100** (0). Flat jobs data and race coverage.
- **Public trust in Anthropic: 46/100** (+1). The clean staged release and system card, and no political hits this month.
</scorecard>

<setup_fix>
**Problem:** a failed action has no stated rule on what may cause the failure.

**Where it bit this month:** Action 2 failed (roll 01), but Threat 2, which described the most natural failure modes (an ambiguous reading, or counsel blocking live access), did not materialise.

**Effect:** I had to invent an unrelated failure cause, an orchestration fault, so that the failure did not simply replay the unmaterialised threat.

**Proposed fix:** add a rule that an action's failure must come from execution risks named in the simulator's own P(failure) reasoning. Failure modes that belong to an unmaterialised threat should appear only as traces.
</setup_fix>
