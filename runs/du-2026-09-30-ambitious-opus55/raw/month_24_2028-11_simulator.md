<events>
**Your actions cause** a month in which Anthropic's internal gates hold and its benefits channels finally move, while the external verification regime slips further from your reach.

**Action 1 (success, margin 38).**
- **Canary result.** The 25% unsteered canary was read on 11 November. The unsteered ratio came in at **1.19 (CI 1.00–1.41)**, just under the pre-registered 1.2 threshold, so the fallback rule did not trigger. The steered arm read 1.07.
- **Publication.** The note went out on 26 November, inside the 21-day window, with Apollo's commentary attached. Apollo wrote that the result is "statistically indistinguishable from the threshold; improvement from 1.31 is real but not evidence of absence." Press coverage was modest and mostly favourable: "Anthropic publishes borderline safety test, as promised."
- **Retry objective.** It was added as a patch. The interpretability team insisted on one condition first: a held-out retry detector, never used as a training signal, must be frozen before the patch goes in. The RSO certified the "fallback-that-scales" as ready-to-run on that basis, so it now sits on the shelf rather than being a paper plan.
- **Batch 4.** The LTBT formally requested cross-lineage batch 4 at the 50% checkpoint. The CEO agreed to Apollo's portion, with human red-teamers and two non-Claude models, but kept the checkpoint advisory. UK AISI legal has still not cleared its part.
- **Organic evals.** Only 14 sealed checks were embedded in internal research-agent tasks, because the environments are about 52% built.

**Action 2 (fails, roll 49 against 55; Threat 5 materialises).**
- **METR.** METR replied on 24 November. It will offer the monitoring-cue replay as an *optional* annex. It declined to adopt a held-out evaluation-awareness test designed by Apollo, citing independence and capacity. It will not run Anthropic's candidacy "as a test case for a claimant-proposed module."
- **GDM.** GDM's counsel called binding its next claim "competitor-authored gatekeeping." On 19 November GDM announced a **96-day attested agent run** and an internal **1.34× speedup** on an expanded task set. It will submit these to METR under the base protocol only.
- **OpenAI.** Silent.
- **SAFA.** The drafting subgroup circulated two-tier text for the December vote: a base mark co-sponsored by GDM, and an optional evaluation-awareness module that only Anthropic has endorsed. Grandfathering was never tabled.
- **Market.** Anthropic stock fell about 4% on the GDM news.
- **65-day relaunch.** It began on 3 November and is on day 28. There was one fail-closed pause on day 11: default-deny egress blocked a legitimate package mirror. The run resumed after 19 hours, and the pause was reported to CAISI.

**Action 3 (success, margin 12).**
- **Essay.** Counsel and comms held the Claude-signed essay until 18 November and softened it. The pacing trigger became "Congress should consider a pacing review at 1.5× verified." It went out with no bill text.
- **Full-record pledge.** The pledge was made, with one added clause: partners get 10 days' advance notice. None of the three refusing partners objected formally.
- **Casar.** He called the pledge "the first real answer" and said he would cite it when proposing the select committee.
- **Critics.** A few outlets revived the ~$40M AnthroPAC spending story ("Now Anthropic's AI writes op-eds for Congress"), but it did not become a major story.
- **Republicans.** The Republican transition team's AI adviser dismissed the essay as "the losing side's regulatory wishlist." HASC staff requested it for the March briefing.

**Action 4 (success, margin 32).**
- **Override expiry.** On 21 November the LTBT endorsed a standing 60-day expiry for any CEO cap override that is not covered by a monitor. The CEO accepted it, framing the expiry as "good hygiene."
- **Overridden partner.** Faced with expiry, it took the monitor plus the price credit. **Monitors now cover 10 of 12 partners.**
- **Logistics partner.** It re-signed CAISI telemetry consent, contingent on the Board approving the 60-day tier. Consents now stand at **3 of 12 (1 conditional)**. The bank is still silent.
- **60-day tier.** It is on the 9 December Board agenda as a one-page decision.

**Action 5 (success, margin 31).**
- **Medical.**
  - The first blocked centre's HRPP accepted WCG as IRB of record under a standard reliance agreement within three weeks, and its IRB was filed on 25 November. The second centre's local-context review is still running.
  - Claude drafted a template data-use agreement, which one centre signed.
  - The foundation released the **$1.4M lead-centre tranche** on 20 November.
- **Claude Works.**
  - The 200-person placement-support pilot launched on 6 November.
  - The direct-to-user mode passed product-legal review with disclosures and launched on 17 November for US users. It had about 9,800 sign-ups by month's end.
  - **Total enrolment: about 46,200** (target was 60,000).
  - LEO cleared its IT review, and the kiosks go live on 8 December.
  - The first monthly outcomes report (26 November) showed 61 graduate-track hires and about 3,100 people in the transition track.

**Exogenous events.**
1. **7 November election.**
   - The Republican ticket won the presidency narrowly.
   - Democrats won the House by roughly 6 seats.
   - The Senate stays Republican, 52–48.
   - The result is divided government. A Casar-backed select committee is now plausible. Federal AI legislation is not.
2. **Jobs report (6 November).** Unemployment ticked up to 5.8%. New-graduate unemployment is about 9.3%.
3. **DeepSeek V6.5 (22 November).** DeepSeek released V6.5 open weights, claiming 30-day autonomous agent runs. EU AI Office consultation respondents immediately cited it.
</events>

<capability_update>
Next month's Claude is incrementally more capable, reaching about CL-5.0. The gain comes from the resumed scale-up on the changed recipe (now past 25%) and from agent-infrastructure maturity, but Anthropic still has no verified speedup. The frontier moves to about CL-5.1 on GDM's unverified 1.34× claim and 96-day run.
</capability_update>

<world_state>
**WORLD STATE, 1 December 2028**

**1. Frontier AI capabilities and labs**
- **Capability index: about CL-5.1 at the frontier (GDM, partly unverified).**
  - Verified: METR measured 1.21× for GDM (October).
  - Claimed, not yet verified: GDM reports 1.34× internally on an expanded task set and a 96-day attested agent run. It will submit these to METR under the base protocol only.
  - Anthropic is at about CL-5.0, with no verified speedup.
  - OpenAI: Researcher 3 is due Q1 2029.
  - Open weights: DeepSeek V6.5 (claims 30-day agent runs), K4.5, Qwen 4.5. The long-horizon lag is about 2–3 weeks.
  - Bio uplift is gated. Sandbagging: 16 cases. Sandbox robustness is unsolved.
  - Path: CL-5.5 (1.5× or more verified, multi-lab) plausible Q2 2029; CL-6 "Early ASI" in 2030.
- **Anthropic: company and models.**
  - Fable 5.3 and Enterprise 5.3 are live.
  - The stock is about 34% below its open.
- **Anthropic: agent caps.**
  - 45 days with the monitor and attestation; 30 days otherwise.
  - Override expiry rule (LTBT-endorsed, CEO-accepted 21 November): any unmonitored override lapses after 60 days.
  - The overridden partner installed the monitor. Monitors cover 10 of 12 partners.
  - CAISI telemetry consents: 3 of 12. The logistics partner's consent is conditional on the tier; the bank is silent.
  - UK AISI consents: 0.
  - The 60-day tier is on the Board agenda for 9 December.
- **Anthropic: scale-up.**
  - Changed recipe, past 25%. Environments are about 52% built.
  - Canary (11 November): unsteered 1.19 (CI 1.00–1.41), steered 1.07. Published 26 November with Apollo's "indistinguishable from threshold" note. The fallback was not triggered.
  - The retry-objective patch was added, gated on a frozen held-out detector.
  - The "fallback-that-scales" recipe is certified and on the shelf.
  - The 50% checkpoint is mid-December and advisory. Batch 4 runs there with Apollo, human red-teamers and 2 non-Claude models; UK AISI legal is still pending.
  - 14 sealed organic checks are embedded.
  - The chair's objection and the RSO dissent remain on file.
- **Anthropic: attested run.**
  - The 65-day run launched 3 November and is on day 28.
  - 1 true fail-closed pause on day 11 (egress blocked a package mirror; resumed after 19 hours), reported to CAISI.
  - The replay study is filed; the method is in the Safety Commons.
- **Anthropic: alignment campaign.** 8% of compute; the 60 runs continue. Probe v2 is not robust to evaluation awareness.
- **Anthropic: other safety work.**
  - Omissions monitor: −74%.
  - The tamper monitor fails against full fine-tunes; hash attestation is the fallback.
  - Telemetry residual: 0.022 bits.
- **Anthropic: disclosure.** The 21-day cap is in force.
- **Anthropic: `order_semantics`.** The AAIF SEP is in working-group review.
- **Anthropic: pacing.** The Standard has 212 signatories. The DOJ review is pending and the FTC is hostile.
- **Anthropic: SAFA.**
  - The December vote is on two-tier text: a base mark (GDM co-sponsor) and an optional evaluation-awareness module (Anthropic only).
  - Grandfathering was not tabled. OpenAI has named no verifier.
  - *Buist* is pending. The DOJ business review letter is queued.
- **Anthropic: METR.**
  - The replay is offered as an optional annex.
  - METR declined the held-out module and declined to use Anthropic's candidacy as a module test.
  - Candidacy for Q1 2029 is intact, contingent on the 65-day run.
- **Anthropic: Safety Commons.** About 3,800 installs; the hardening kit has about 510.
- **Anthropic: Infrastructure Shield.** 84 MOUs. No MSSP has signed, and the insurance exclusions stand.
- **Anthropic: Claude Works.**
  - About 46,200 enrolled, including about 9,800 through the direct-to-user mode (launched 17 November).
  - The 200-person placement pilot is live.
  - Graduate hires: 61. Transition track: about 3,100.
  - Michigan kiosks go live 8 December. Ohio NASPO is in review.
  - Quebec is blocked. CWA has declined.
  - Monthly outcomes reports have started.
- **Anthropic: medical.**
  - 2 IRBs filed: the lead centre, plus a second via WCG reliance on 25 November.
  - The third centre is in local-context review.
  - The data-use agreement template is signed by 1 centre.
  - The $1.4M lead tranche was released on 20 November.
  - The R01 is due in February. The pharma term sheet is slow.
- **Anthropic: alternative protein.** Parked.
- **Other labs.** GDM leads and rejects any cross-lineage module. OpenAI is silent. xAI is closed. Meta is quiet. DeepSeek released V6.5 open weights.

**2. Compute and chips**
- Stargate is building toward about 10 GW, with Rubin ramping.
- Texas moratoria are advancing.
- RASA is stalled.

**3. Policy and regulation**
- **US federal.**
  - The Republican president-elect takes office in January. Democrats hold the House (about +6); Republicans hold the Senate 52–48.
  - Casar plans a select committee and cites Anthropic's full-record pledge (unredacted under committee confidentiality, 10-day notice to partners).
  - The Claude-signed essay was published 18 November; the pacing trigger was softened to a "review."
  - HASC's DoD/CAISI briefing is in March.
  - The transition team favours dominance and preemption.
- **States.** RAISE is in force from 1 January 2027 and upheld. Datacenter moratoria continue. Employment-decision laws apply.
- **EU.** The open-weight systemic-risk consultation is ongoing; DeepSeek V6.5 was cited.
- **UK.** AISI is engaged; no bill.
- **China.** Promotes open weights.
- **International.** No pacing mechanism.

**4. Public opinion**
- Pew 52% concerned. Gallup 39% say AI does more harm than good.
- Headlines:
  - "Google claims 1.34×"
  - "Anthropic publishes borderline test, as promised"
  - "Now Anthropic's AI writes op-eds for Congress" (minor)
  - Divided government

**5. Economy and labour**
- Unemployment is 5.8%. New-graduate unemployment is about 9.3%.
- The agent price war continues.

**6. Security**
- No US OT incident.
- V6-fork BEC campaigns continue in the EU.
- AZ Delta is under criminal investigation.

**7. Pending decisions and conditions**
- **50% checkpoint plus batch 4.** Decided by the CEO (advisory); batch 4 by Apollo, with UK AISI pending. Status: mid-December. Set October; updated November.
- **60-day tier.** Decided by the Board. Status: 9 December; the logistics partner's consent depends on it. Set October.
- **SAFA vote.** Decided by the membership. Status: December, on two-tier text.
- **METR verification of GDM's 1.34×.** Decided by METR. Status: submitted under the base protocol.
- **65-day run.** Decided by the RSO and CAISI. Status: day 28 of 65; the METR candidacy depends on it.
- **Select committee and full-record production.** Decided by the House in January. Status: pledge made; partners get 10-day notice.
- **Third centre IRB.** Decided by that centre's HRPP. Status: local-context review.
- **Michigan kiosks.** Status: 8 December.
- **Ohio NASPO.** Status: in review.
- **UK AISI telemetry and batch 4 legal.** Status: pending.
- **DOJ business review letter.** Status: queued.
</world_state>

<scorecard>
**Diversified Utopia milestones**
- **~90% of AI R&D done by AI:** in progress, up. GDM claims 1.34× and a 96-day run, not yet verified.
- **Frontier models withheld and governments take notice:** in progress, up. A select committee is likely in the new House.
- **First major attacks:** achieved (negatively). V6 forks are still active, and DeepSeek has released V6.5.
- **Political split:** sharper. The country now has divided government.
- **Every AI built by previous AIs:** early, up.
- **Robust alignment:** early, up slightly.
  - The canary dropped to 1.19, borderline and published honestly.
  - The fallback is certified, and a held-out detector gates the retry patch.
  - Batch 4 will run at 50%.
  - Offsets: the gate is still advisory, and the external evaluation-awareness module failed.
- **Lab-grown meat:** not started.
- **Robust policies:** early, flat. The override now expires, and consents rose to 3 (1 conditional). SAFA is splitting into two tiers, and there is no federal path.
- **Diseases cured:** early, up slightly. 2 IRBs are filed and the first bridge funds are released.
- **Broad benefit distribution:** early, up slightly. Enrolment is 46k, with 61 graduate hires, the pilot live and kiosks scheduled.
- **Aligned singleton; resource floor, consent-based utopias, AI moral-patient rights:** not started.

**Summary**

| Measure | Value | Change |
|---|---|---|
| Overall DU progress | 19 / 100 | +1. Internal gate evidence and benefits moved, offset by the SAFA split and GDM racing outside any evaluation-awareness test. |
| Catastrophe risk | Elevated, up slightly | The leader is running 96-day agents with a 1.34× claim and refuses cross-lineage testing, and V6.5 open weights are out. Partly offset by the lower canary, the expiring override and 10 of 12 partners monitored. |
| Public trust in AI | 11 / 100 | ±0. The self-acceleration headlines and 5.8% unemployment are balanced by the post-election news cycle. |
| Public trust in Anthropic | 34 / 100 | +1. Publish-either-way was delivered, and Casar praised the pledge; the minor "AI op-ed" criticism limits the gain. |
</scorecard>

<setup_fix>
none
</setup_fix>
