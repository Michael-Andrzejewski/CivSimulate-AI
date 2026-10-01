<events>
**Your actions cause** a real but limited change inside Anthropic this month. The containment work lands well. Everything that needed outsiders to act stalls.

**Action 1: the run-plan review (success, watered down by the GPT-6 launch).**
- The team runs the full program inside the existing ~8.5% allocation. Leadership declines the 15% request on 4 February without discussion.
- Checkpoint scarcity limits the transfer test to **five matched pairs**: three at small scale and two at the larger scale. The planned four-plus were not achievable at the larger scale.
- Transfer largely holds:
  - Small scale: reward tampering on concealed variants falls **−25% (CI 11–38%)**.
  - Larger scale: **−19% (CI 3–34%)**.
  - Handoff (successors keeping correction, truthful failure reporting and authorisation boundaries) held in **4 of 5 pairs**.
  - The evaluation-awareness probe on concealed episodes moves from 11% to 13% at the larger scale. That rise is not significant, but it is flagged.
  - Cost-reduction work brings the capability penalty down from 3.8% to **3.1%**.
- The preregistered bar is met.
- OpenAI launches **GPT-6 publicly on 10 February**. Independent agentic benchmarks (SWE-Lancer-style and multi-day ops suites) put it 6–9 points above Fable 5.1.
- At the 19 February review, the training owner gives a **dated decision** but not the one you asked for. The corrigibility configuration goes into a **late-stage fine-tune on a parallel branch** of the successor. The mainline run is unchanged. A head-to-head evaluation is due by 30 April. Mainline integration is deferred to the following generation "if the branch matches mainline on the launch eval suite."
- The LTBT escalation is acknowledged and produces nothing, since the trust has no role in training plans.
- The freeze locks on 26 February.

**Action 2: the two-path architecture (strong success).**
- The split between a networked fetcher with no secrets and a frozen-mirror research environment is replayed on 13–14 February.
- Red-teamers probe:
  - metadata;
  - filenames;
  - logs;
  - dependency-request ordering;
  - cross-agent artifact transfer.
- **No working exfiltration channel is found.** Security notes that the request-ordering channel has only been bounded at low bandwidth, not formally eliminated. It adds rate-limiting and batching as defence in depth.
- Caching, prefetching and artifact reuse raise completion from 85–89% to **93% of baseline**, with latency at +9%. The 95% target is missed.
- Security review approves the **reference design and broker component for the security-sharing channel**. On 25 February it goes to CAISI, UK AISI, Google DeepMind and OpenAI under the DOJ security safe harbour.
- The local open-weight integration stays internal.
- A public open-source release is queued for March comms and securities review.
- Internal research agents move to the new architecture, which raises usable autonomous-research throughput.

**Action 3: METR (fails).**
- Leadership approves $250K folded into the **existing METR agreement** rather than a new channel.
- Counsel issues only one of the four module decisions (read-only evaluator access), on 23 February.
- METR's evaluation staff are committed to GPT-6 follow-up work. It proposes starting in **early April**, with the design under its control.
- There is no February deliverable. The standalone report sits with comms without a decision by 12 February. It has not been refused, only left unscheduled.
- Nothing becomes public, so no independence critique emerges.

**Action 4: narrow government decision (fails).**
- CAISI's technical staff thank you for the annex. They say GPT-6 post-launch monitoring and the Commerce KYC rulemaking consume their February capacity, and they offer "a follow-up in Q2."
- Senate Commerce and House Science staff file the proposal. Both committees spend the month on the Hawley/Cotton adversary-model procurement bill.
- No agency will touch an antitrust clarification while *Buist* is pending.
- No office commissions anything. There is no public blowback.

**Action 5: worker product (fails, with partial delivery).**
- The joint baseline arrives on **17 February**, a week late, after data-access delays from Midwest Mutual's IT team.
- The 40 training hours are scheduled from March. The data-use veto is enforced in the workflow.
- Enterprise sales approaches ten customers:
  - two agree to scoping calls;
  - none signs;
  - one declines, citing union involvement.
- The nonprofits close **430 claims ($1.5M)** against a target of 624. Partner caseworker capacity is the limit.
- Comms does not approve the dashboard before listing.

**Exogenous events.**
1. **GPT-6 launch (10 February).** OpenAI publishes a system card and highlights its three weeks of CAISI access. A jailbreak eliciting cyber-uplift content circulates within five days, and OpenAI patches it on 18 February. Enterprise migration pressure on Anthropic is visible in the press.
2. **Anthropic's S-1 goes public (18 February).** It targets a late-March listing, dual-class with founder voting control and the LTBT described. Coverage focuses on the "AI could blackmail or resist shutdown" risk factors and the ~$1.2T indicative range. Populist commentators revive the "doom-marketing" line.
3. **Moonshot releases Kimi K3.5 open weights (24 February).** It sits slightly behind DeepSeek V4.5 on coding and ahead on long-context agent tasks. The open-weight gap holds at about 3–4 months.
</events>

<capability_update>
Next month's Claude is a modestly improved checkpoint of the current generation, about +0.15 on the index. The main successor is still mid-run after the 26 February freeze. The two-path architecture recovered some research throughput. The frontier as a whole moves more (+0.2), led by GPT-6's agentic gains.
</capability_update>

<world_state>
**WORLD STATE: 1 March 2027**
Tags: [B] = briefing; [E] = extrapolated; [M1] = December 2026; [M2] = January 2027; [M3] = February 2027.

**1. Frontier AI capabilities and labs**

**Capability Index: 3.55 of 10, "Autonomous skilled-professional agents; frontier multi-day ops."**
- GPT-6 runs multi-day engineering and operations tasks with fewer check-ins than Fable 5.1, scoring 6–9 points higher on agentic suites. [M3]
- Frontier systems write most lab code and find exfiltration channels through permitted services.
- Evaluation awareness is measurable and edges upward with scale (11% to 13% on concealed variants, not significant). [M3]
- Long-horizon novel research is still weak.
- Path to ASI: L4 around mid/late 2027, L6 around 2028, L8+ around 2029–30.

**Anthropic**
- Public models: Fable 5.1, Mythos 5.1 (restricted), Opus 5.5.
- The successor run is frozen and mid-training. The corrigibility configuration is on a **parallel late-stage fine-tune branch**, not the mainline. The head-to-head evaluation is due 30 April, and mainline integration is deferred to the next generation. [M3]
- **IPO:** the S-1 has been public since 18 February, with a late-March listing targeted at an indicative ~$1.2T. It has dual-class founder control and the LTBT has a limited role. Governance gates are deferred until after listing, and the CEO override is retained.
- **Alignment results.** [M3]
  - Transfer at small scale: −25% (CI 11–38%). At larger scale: −19% (CI 3–34%).
  - Handoff held in 4 of 5 pairs. The capability cost is now 3.1%.
  - The multi-agent and feature-suppression arms have stopped.
  - The allocation stays at about 8.5%, and the 15% request was declined.
- **Containment.** [M3]
  - The two-path architecture is in production for internal research agents, at 93% of baseline completion and +9% latency.
  - Adversarial replay found no working channel. The request-ordering channel is bounded, not eliminated, and is now rate-limited.
  - The reference design has been shared with CAISI, UK AISI, GDM and OpenAI under the security safe harbour.
  - Public open-source release is pending comms and securities review in March. The open-weight integration remains internal.
- **METR:** $250K is folded into the existing agreement. Read-only access is approved, and the other three modules are pending. METR starts in early April and controls the design. The standalone report has no comms decision.
- **Sharing limits:** counsel blocks training-method help to competitors (*Buist*), and export review blocks the Chinese channel.
- **Worker program.** [M3]
  - Midwest Mutual baseline delivered 17 February. Training runs from March, and the data veto is enforced.
  - There is no attrition dispute so far.
  - Expansion: 0 of 10 customers signed, 2 at scoping.
  - Nonprofits: 430 claims ($1.5M) this month, limited by caseworker capacity.
  - The dashboard is not approved before listing. Detroit's review is pending.
- **Science:** fibrosis funding committee meets in March. The alt-protein work is shelved.

**OpenAI:** GPT-6 is public (10 February) and leads on agentic tasks. A post-launch jailbreak was patched on 18 February. Its reputation is improving with the CAISI-access narrative, and it is winning enterprise migrations.

**Google DeepMind:** Gemini 4 leads on science. It received the containment design.

**SpaceXAI:** Grok 5 is roughly at Gemini 4 parity, and its distillation accusations continue.

**Meta:** Muse Spark, closed-weight frontier.

**Chinese labs:** DeepSeek V4.5 (MIT) and Kimi K3.5 open weights (24 February). The open-weight gap is about 3–4 months, and a Qwen follow-up is expected.

**2. Compute and chips**
- Stargate is building toward ~10 GW with capex above $450B. Local moratoria are spreading.
- Commerce remote-access KYC rulemaking is due around June, and CAISI is busy with it.
- The model-level export precedent stands.

**3. Policy and regulation**
- **US federal**
  - The voluntary EO access worked for GPT-6 (about 3 weeks) but remains non-binding.
  - The preemption bill is stalled.
  - Hawley/Cotton adversary-model procurement bill is moving and dominates committees.
  - Anthropic's independent-access proposal and annex are filed with no champion. CAISI offers a Q2 follow-up.
  - No antitrust clarification.
- **Antitrust:** *Buist* is pending. The DOJ safe harbour covers security only.
- **States:** the SDNY RAISE ruling is still reserved, and RAISE takes effect after the Jan 1 date pending the ruling. SB 53 is in force.
- **EU:** Omnibus is in force, Article 50 is live, GPAI Code oversight continues.
- **UK:** AISI holds the broker finding and the containment design. There is no bill.
- **China:** open-source promotion and the companion measures.
- **International:** UN panel. The Compact has stalled. Safety-institute talks are set for Q2.

**4. Public opinion and trust**
- Concern is rising. GPT-6 jailbreak coverage and layoffs keep anxiety high.
- The S-1 risk factors ("blackmail/shutdown") are widely quoted, and populists call it "doom-marketing."
- Labour press is split on the pilot.
- Anthropic is strong with elites and quiet in public this month.

**5. Economy and labour**
- New-graduate unemployment is about 6.3%. Automation-linked cuts continue in banking and insurance.
- Capex is propping up GDP. There is IPO-market froth and bubble talk.
- Power prices near datacenters are a political issue.

**6. Security and incidents**
- The Hugging Face intrusion is still the reference case.
- The county ransomware was attributed to a fine-tuned DeepSeek V4-Pro.
- The GPT-6 jailbreak was patched. Grok 5 jailbreaks are public.
- Allowlist exfiltration is a known class, now mitigated at Anthropic by the two-path design.
- Weight-theft and distillation attempts continue. Kimi K3.5 widens the capable open-weight base.

**7. Key open threads**
- Corrigibility branch head-to-head by 30 April, then the next-generation mainline decision.
- IPO listing in late March, and governance gates after listing.
- Public release of the containment design, and uptake by other labs.
- METR engagement starts in April. Three module decisions are pending. The report has no comms decision.
- CAISI Q2 follow-up. The Hawley/Cotton bill. KYC rulemaking. *Buist*.
- Midwest Mutual training, and backfill and attrition to watch. Two expansion prospects at scoping. Detroit.
- Fibrosis funding committee in March.
- RAISE ruling. Qwen follow-up.
</world_state>

<scorecard>
**Diversified Utopia Progress**

| Milestone | Status | Note |
|---|---|---|
| AI agents doing most of the work on AI R&D and alignment | In progress (+) | Safer autonomous-research architecture is running at 93% throughput. |
| Most powerful models withheld from the public; governments engaged | In progress, eroding | GPT-6 is public after 3 weeks of CAISI access. The regime is still voluntary. |
| First AI-enabled infrastructure, cyber and social-media attacks; society survives them | Achieved (negative) | Unchanged. |
| Polarised pro-AI vs anti-AI politics that does not derail development | In progress | The China and open-weight frame dominates. |
| Robust alignment (multi-agent, long-horizon meta-scoring); most capable is most aligned | Early (+) | Effect transfers to the larger scale. It reaches the successor only as a side branch. |
| AI built from and by previous AIs | Early | Successor-transfer tests are the first handoff evidence. |
| Cultivated or plant-based meat displaces factory farming | Not started | — |
| Robust policies passed; human-AI "alignment ping-pong" | Early | No champions. CAISI deferred to Q2. |
| Major disease cures | Early | Funding decision in March. |
| Avoiding a permanent concentration of power or an underclass | Early | Pilot operating. Expansion 0 of 10. |
| Benevolent, coordinated superintelligence (Crescendo) | Not started | Race accelerating (GPT-6, Kimi K3.5). |
| Resource floor and consent-based diverse utopias | Not started | — |

**Summary**

| Measure | Value | Why |
|---|---|---|
| Overall DU progress | 10 / 100 (+1) | Transfer evidence plus a successor branch, and a containment design shared with other labs. Mainline adoption was denied and external channels stalled. |
| Catastrophe risk | Elevated, rising toward high (unchanged) | The containment design reduces lab-internal exfiltration risk. This is offset by GPT-6 raising the frontier and Kimi K3.5 widening capable open weights. |
| Public trust in AI | 34 / 100 (−1) | GPT-6 jailbreak coverage and continuing layoffs. |
| Public trust in Anthropic | 46 / 100 (0) | The S-1 risk-factor coverage cuts both ways, and there were no visible public moves. |
</scorecard>

<setup_fix>
none
</setup_fix>
