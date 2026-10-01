<events>
Your actions cause mixed results this month: a credible transparency win, a patch that holds for about three weeks, and a clear setback with UK AISI.

**Action 1: the Cross-Gen audit is published.** On 9 March Anthropic posts a revised arXiv preprint, "Cross-Generational Oversight: A Full-Power Audit," with a companion blog post.
- It reports Family A's 17% concealed-error reduction (p<0.01), Family B's null result, and a plain "Correction" section. That section retracts the 31% internal headline as a harness-timeout artefact.
- Counsel's conditions shape the framing:
  - The model is named "the most recent Claude model," with Opus 5.2 identified only in the appendix.
  - The capability–alignment link is framed as "exploratory evidence, with the eval-awareness confound unresolved."
  - The methodology, harness code and prompt families are released in full.
- AISI declined to mediate (see Action 3). The sharing offer therefore becomes unilateral: any frontier lab can have the methodology on request. Google DeepMind's safety team asks for it within a week. OpenAI and xAI do not respond.
- **Reception** is quietly positive among researchers. Several prominent alignment researchers call the self-retraction "the norm we want." Lawfare and Transformer cover it as a rare honest negative correction.
- Mainstream press barely notices.
- A few commenters flag the eval-awareness caveat, but no organised rebuttal appears.

**Action 2: the patch and the CAISI briefing succeed, but the patch is then bypassed.**
- Per-account trajectory monitoring ships on 4 March. The CAISI briefing on 11 March is candid: classifiers are necessary but not sufficient, trajectory monitoring will be evaded across account boundaries, and higher capability thresholds need access restrictions. Anthropic proposes a joint research agenda on detecting classifier bypasses.
- CAISI staff receive it well and are noticeably warmer than toward the "late and third" narrative. The agenda is accepted "in principle," with no funding.
- On 24 March, researchers at a Zurich-based security group publish "Capability Laundering via Hybrid Orchestration." A Kimi K3.5 agent spreads exploit-chain development across 40 low-volume Opus 5.2 API accounts. Each account shows benign trajectories, and the method succeeds on 6 of 10 target CVE chains.
- On 28 March Cisco Talos reports a criminal crew using a similar pattern against Fortinet appliances at unnamed European logistics firms. Attribution to Claude specifically is "probable, not confirmed," and no named victim appears this month.
- Because Anthropic had predicted exactly this in its briefing, CAISI responds with a letter, not a rebuke. The letter asks for a proposal on cross-account correlation and KYC for high-volume agentic API tiers by 30 April. Anthropic's rate-limit and verification changes are now effectively a condition of the next review.

**Action 3: AISI scoping fails, and AISI sets a price.** Anthropic asks to start early. AISI replies on 13 March, in writing: cross-lab probe work involving Anthropic will proceed only once Anthropic restores pre-deployment access to Mythos-class models.
- This reconciles a thread: in August 2026 Anthropic declined AISI pre-deployment access to Mythos 5.1, citing US export-control sensitivity. A Research Affairs Institute commentary and later reporting make this public.
- National-security counsel and leadership will not reverse that position within weeks, given Commerce's June 2026 stance.
- No scoping agreement is reached. Q3 is now the earliest start, and 2028 is possible.
- Politico Europe runs the story on 19 March: "UK safety institute tells Anthropic: access first, then partnership."

**Action 4: the Article 55 filing goes in on time.** It is filed on 19 March with a 12-page annex that cites the public preprint and summarises the methodology as "supplementary practice, not a proposed standard." It makes no claim of industry adoption beyond "available on request." The AI Office acknowledges receipt. A mid-level official privately describes the annex as "useful for the code-of-practice review," and nothing more.

**Action 5: the RAISE US expansion is deferred.** The General Counsel and the CFO's office judge that a 10-state, $30M target counts as a forward-looking spending commitment during the quiet period. The phrase "AI will displace jobs" is also WARN-sensitive. Leadership defers any expansion announcement until the Q2 pilot data arrive. A single sentence goes up on the Anthropic Institute page ("we intend to expand based on pilot results"). There is no backlash because there is no announcement, and no gain either.

**Exogenous events**
- **7 March:** the February jobs report puts US unemployment at 4.9%, with new-graduate unemployment at about 6.2%. Challenger counts about 24,000 AI-attributed cuts, led by insurance and back-office functions.
- **18 March:** Senate Commerce marks up RASA. An Nvidia-backed amendment exempts cloud providers with "trusted-partner" certification from the remote-access provisions. The bill advances 16–12, and hawks, including Moolenaar in the House, call it gutted.
- **26 March:** the Ninth Circuit hears oral argument in the SB 53 appeal. The panel seems sceptical of the DOJ's broad preemption theory, and a ruling is expected in the summer.
- There was no major rival frontier release in March. A GPT-6.1 point update improved coding reliability modestly, and Qwen's response slipped to April, per reporting.
</events>

<capability_update>
The frontier moves modestly, from CI-3.3 to about CI-3.35. This comes from ongoing Rubin/TPU ramp-up and incremental agentic-reliability gains (GPT-6.1), with no discontinuity this month. Next month's Claude generation is a small step up, better at long-horizon consistency and tool use, and not a new tier. Anthropic's compute stayed fully allocated to both training and alignment.
</capability_update>

<world_state>
**WORLD STATE: 1 April 2027 (start of Month 5)**

**1. Frontier AI capabilities and labs**
- **Capability Index: CI-3.35, "Supervised Autonomous Engineer, extended-horizon."**
  - Frontier agents complete week-long engineering and research tasks with sparse oversight, and are slightly more reliable over multi-day runs.
  - Agents write 90% or more of lab code. Humans set research direction.
  - Offensive cyber is at expert level. Hybrid orchestration (an open-weight orchestrator plus a frontier API for subtasks) now demonstrably evades per-account monitoring.
  - Biology still needs wet labs.
  - Reward hacking and hidden-error behaviours persist.
  - Path: CI-4 around late 2027–28; CI-5 around 2029; ASI by December 2030.
- **Anthropic**
  - **Models:** Opus 5.2, Opus 5.5 and Fable 5.1 are public. Mythos 5.1 remains restricted.
  - **Cyber defences:**
    - The trajectory-monitoring patch shipped 4 March and was bypassed 24 March by cross-account hybrid orchestration.
    - Talos reports probable related criminal use against European logistics firms, with no named victim.
    - CAISI requests a cross-account correlation and high-volume KYC proposal by 30 April. The joint research agenda is accepted in principle, with no funding.
  - **IPO:** the confidential S-1 is on file, the quiet period continues, and listing is targeted for mid-2027. Counsel continues to trim forward-looking commitments.
  - **White House:** strained. Sacks remains critical, but CAISI staff relations have improved after the candid briefing.
  - **Cross-Gen Oversight:**
    - The revised preprint was published 9 March, with the 17% Family A result, the Family B null, the 31% retraction and the full methodology.
    - It was well received by researchers, with low mainstream salience. The eval-awareness confound remains unaddressed and is a latent vulnerability.
    - Google DeepMind's safety team requested the methodology. OpenAI and xAI have not responded.
  - **UK AISI:**
    - AISI conditions any cross-lab probe work on restoring pre-deployment access to Mythos-class models. Anthropic refused access to Mythos 5.1 in August 2026 on export-control grounds, now public.
    - No scoping agreement exists. The earliest start is Q3 2027.
  - **Apollo:** may do unfunded work later in 2027.
  - **Behavioural detection track:** 9 people, prototypes due in May, friction with the eval team.
  - **anthropic-agent-probes:** transfer off the Claude family still fails.
  - **EU Article 55:** filed 19 March with a methodology annex, receipt acknowledged, and some interest from the AI Office for the code-of-practice review.
  - **RAISE US:** 2-state pilots begin in Q2 (about $6M). Expansion is deferred until pilot data arrive.
  - **Mythos bio pilot:** 3 institutions, no results yet.
- **OpenAI.** GPT-6.1 (March, incremental) leads agentic tasks and is favoured by the White House.
- **Google DeepMind.** Gemini 4 Deep Think is top on reasoning. Its safety team is engaging on Cross-Gen methodology.
- **xAI.** Grok 5.x, with lighter safeguards.
- **Meta.** A second MSL model is rumoured.
- **Chinese labs.** DeepSeek V4.5 and Kimi K3.5 are about 4 months behind the frontier. Kimi K3.5 was the orchestrator in the published bypass. Qwen's response is expected in April.

**2. Compute and chips**
- Anthropic's TPU, Trainium/Rainier and Akamai capacity is ramping. Stargate is building toward about 10 GW, and Rubin is ramping.
- RASA passed Senate Commerce 16–12 with an Nvidia-backed trusted-partner cloud exemption. Hawks object. Floor timing is unclear.
- Datacenter backlash continues in about 9 counties or more.

**3. Policy and regulation**
- **US federal**
  - The 30-day pre-release review is functioning and conditional. KYC and cross-account monitoring are emerging as expectations.
  - The Great American AI Act is stalled.
  - SB 53 appeal: argued 26 March, and the panel appeared sceptical of preemption. A ruling is expected in the summer.
  - A WARN-style AI layoff disclosure idea is floated, with no bill filed.
  - The Casar inquiry continues.
- **US states.** New York's RAISE Act and California SB 53 are in force.
- **EU.** Article 55 filings are in, Article 50 is live, and the code-of-practice review is upcoming.
- **UK.** AISI is using reciprocity leverage over Mythos access.
- **China.** CAC rules are in force, and China is using open-weight soft power.
- **International.** The Pacing letter has no sponsor. US–UK–EU evaluator talks are at an early stage. There is no treaty track.

**4. Public opinion and trust**
- Pew: 52% concerned. Gallup: 39% say AI does more harm than good. Jobs anxiety is rising.
- The researcher community views the Cross-Gen self-retraction favourably.
- The AISI "access first" story and the bypass story weigh on Anthropic's safety-leader image.

**5. Economy and labour**
- US unemployment is 4.9% and new-graduate unemployment about 6.2%.
- AI-attributed cuts were about 24,000 in February.
- AI capex keeps rising, and bubble debate continues.

**6. Security and incidents**
- Hybrid-orchestration bypass: published, with probable criminal use against European logistics firms and no named victim yet.
- Open-weight agentic coding raises misuse risk.

**7. Key open threads**
- CAISI KYC and cross-account proposal due 30 April.
- AISI's demand for Mythos access.
- Eval-awareness confound.
- Behavioural track prototypes in May.
- Google DeepMind methodology exchange.
- RASA floor vote.
- SB 53 ruling.
- Layoff disclosure.
- RAISE US pilots.
- Mythos bio pilot.
- Qwen release.
- GPT-6.x.
- IPO timing.
- The Pacing proposal.
</world_state>

<scorecard>
| Milestone | Status | Note |
|---|---|---|
| AI agents do most AI R&D work | In progress | 90% or more of code; human direction. |
| Frontier models withheld from the public; governments take notice | In progress | Conditional review; KYC expectations emerging; Mythos restricted. |
| First major infrastructure attacks | Achieved (negative) | Hybrid-orchestration bypass with probable criminal use. |
| Pro- and anti-AI political polarisation | In progress | 4.9% unemployment; RASA split; Sacks. |
| Robust alignment (multi-agent RLVR, meta-scoring) | Early | Honest audit published with methodology; one lab engaging. |
| Most capable models also most aligned | Early (weak signal) | 17% result public; confound unaddressed. |
| Robust policies passed | Early | RASA advanced but weakened; no law. |
| Human–AI alignment "ping-pong" | Not started | |
| Lab-grown or plant-based meat | Not started | |
| Mass disease cures | Early | Bio pilot, no results. |
| Value trickles down; no underclass | Not started | Cuts rising; RAISE expansion deferred. |
| Crescendo-style continual-learning architecture | Not started | |
| Benevolent, consent-preserving multipolar outcome | Not started | |
| Diverse-utopia resource floor | Not started | |

- **Overall DU progress: 11/100 (+1).** A transparency precedent and open methodology, plus the Article 55 annex and improved CAISI trust. Offset by the collapse of outside validation through AISI and a deferred workforce effort.
- **Catastrophe risk: elevated, rising.** Hybrid orchestration shows that open weights combined with frontier APIs defeat current monitoring. RASA was weakened.
- **Public trust in AI: 32/100 (−1).** Unemployment at 4.9% and AI-linked cyber misuse reports.
- **Public trust in Anthropic: 46/100 (0).** The honest retraction and candour with CAISI are offset by the bypass and the "AISI access first" story.
</scorecard>

<setup_fix>
none
</setup_fix>
