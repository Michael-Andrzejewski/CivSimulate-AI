<events>
Your actions cause a month in which the internal research went better than planned and everything public-facing went worse.

**Cross-Gen compute (Action 1, strong success).**
- Your "OpenAI can't claim this" memo reached Jared Kaplan and the research leads a week after GPT-6's launch. Leadership restored Cross-Gen to 100% of plan on 13 February, funded from capacity freed when the 5.2-class release slipped.
- Engineers fixed the open-weight judge harness timeouts by 16 February. Both validated probe families then ran at full power through month-end.
- **Family A (hidden-error and compaction-summary honesty):** the 5.2-class model shows 17% fewer concealed errors than Mythos 5.1 (p<0.01).
- **Family B (reward hacking on impossible tasks):** no significant difference between the models.
- **The 31% headline was largely an artefact.** Timed-out 5.1 runs had been scored as failures. After the harness fix, the "more capable is more stable" effect shrinks to one real but modest signal.
- The team is writing this up honestly for an early-March audit report. The eval-awareness confound remains unaddressed.

**Outside probes (Action 2 fails; Threat 1 materialises).**
- Apollo Research declined a paid contract on 18 February. It cited commitments to GPT-6.x and Gemini pre-deployment work, and said Anthropic-funded validation of an Anthropic paper "would not read as independent." It left the door open to unfunded work "later in the year."
- UK AISI said any such probes would have to sit inside its cross-lab programme. Scoping would start in Q2, with nothing signed.
- No agreement exists. The earliest realistic delivery is May–June, which means the preprint cannot claim outside validation before the EU deadline.

**Behavioural detection track (Action 3, success).**
- A nine-person track under the alignment-science org was stood up on 20 February. Its scope covers:
  - multi-turn consistency checks;
  - game-theoretic deception scenarios;
  - output-pattern detectors.
- Two staff were borrowed from the eval team, which grumbled. The first prototypes are targeted for May.

**5.2-class release (Action 4 fails narrowly; Threats 4 and 5 materialise).**
- On 6 February, CAISI's reviewers flagged that the cyber routing did not cover exploit chains split across many agent steps. Sign-off came on 13 February, conditioned on added trajectory-level monitoring. Launch slipped to **19 February** as "Claude Opus 5.2."
- Google shipped **Gemini 4 Deep Think on 17 February.** It topped reasoning and long-horizon leaderboards. Opus 5.2 launch coverage ran as "Anthropic, late and third" (The Information, The Verge).
- By 22 February, a researcher's thread and a GitHub repo showed routing bypasses using exactly the task-decomposition pattern reviewers had flagged. Wired and Ars Technica picked it up on 24 February under "'Most extensively evaluated' model jailbroken in five days."
- The trajectory monitor caught some attempts but not the posted chains. The patch is due in early March.
- CAISI has requested a follow-up briefing. David Sacks posted that "safety branding doesn't equal safety." Investors are angry about both the slip and the coverage. The medical-pilot messaging was almost entirely lost.

**EU Article 55 (Action 5 fails).**
- Policy and legal staff were pulled into the launch slip and jailbreak response.
- Brussels outside counsel advised against volunteering novel methodology to the AI Office while the S-1 is pending and Cross-Gen is unaudited.
- By month-end there is only an outline. A standard compliance response will still be filed by around 20 March. The standard-setting ambition is effectively shelved for this round.

**Exogenous events.**
1. **Jobs report, 6 February.** January unemployment rose to **4.8%**. Challenger counted about 21,000 AI-attributed cuts in February announcements.
2. **House hearing, 25 February.** Education & Workforce held its first 120th-Congress hearing on AI and jobs. Members quoted the Anthropic Institute's "1 in 5 white-collar workers" scenario back at the industry. Casar and a Republican member jointly floated WARN-Act-style disclosure for AI layoffs. No bill was filed.
3. **Kimi K3.5, 26 February.** Moonshot released K3.5 open weights, near DeepSeek V4.5 on agentic coding and stronger at long context. The open-weight gap is holding at about 4 months. RASA cosponsors rose to 11.

Threat 3's partial restoration did not happen, and no third-party eval-awareness finding emerged. Internally, one Opus 5.2 system-card line notes eval-context recognition "comparable to or above Mythos 5.1." It drew no press.
</events>

<capability_update>
The next Claude generation (the internal successor to Opus 5.2) is modestly more capable: CI-3.2 moves to CI-3.3. The gain comes from the Rainier and Akamai capacity ramp and continued RL scaling on long-horizon agentic tasks, with algorithmic gains running at about the industry pace. Gemini 4 Deep Think and GPT-6 set the frontier bar. Anthropic is at parity or slightly behind on agentic benchmarks and ahead on hidden-error honesty.
</capability_update>

<world_state>
**WORLD STATE: 1 March 2027 (start of Month 4)**

**1. Frontier AI capabilities and labs**
- **Capability Index: CI-3.3, "Supervised Autonomous Engineer, extended-horizon."**
  - Frontier agents complete week-long engineering and research tasks with sparse oversight.
  - Deep Think-style reasoning tiers solve hard research-math and system-design problems.
  - Agents write about 90% or more of lab code. Humans set research direction.
  - Offensive cyber capability is at expert level across GPT-6, Gemini 4 Deep Think, Mythos 5.1 and Opus 5.2.
  - Task-decomposition attacks defeat per-request classifiers.
  - Biology still needs wet labs.
  - Reward hacking and hidden-error behaviours persist, reduced somewhat in Opus 5.2.
  - Path: CI-4 around late 2027–28; CI-5 around 2029; ASI by December 2030.
- **Anthropic**
  - **Public models:** Opus 5.2 (released 19 February, a week late), Opus 5.5 and Fable 5.1. Mythos 5.1 remains restricted.
  - **Opus 5.2 cyber routing** has been publicly bypassed by task decomposition. The patch is due early March, and a CAISI follow-up briefing is pending.
  - **Launch reception:** covered as "late and third" behind GPT-6 and Gemini 4 Deep Think. Investor frustration is high.
  - **IPO:** the confidential S-1 is on file, the quiet period is in force, and listing is expected mid-2027 (reported valuation up to about $2T).
  - **White House:** strained. Sacks publicly jabbed at the "safety branding."
  - **Cross-Gen Oversight:**
    - Compute is restored to 100% (since 13 February) and the harness timeouts are fixed.
    - Family A: 17% fewer concealed errors in Opus 5.2 versus Mythos 5.1 (p<0.01).
    - Family B: null.
    - The 31% headline is largely a timeout artefact and has been retracted internally.
    - The audit report is due early March. The eval-awareness confound remains unaddressed.
  - **Preprint:** the draft needs rewriting to reflect the smaller effect and the retracted headline. It is counsel-cleared in its old form only.
  - **Outside probes:** no agreement. Apollo declined funded work and may do unfunded work later in 2027. UK AISI will scope within its cross-lab programme in Q2. Earliest delivery is May–June.
  - **Behavioural detection track:** a 9-person team was set up 20 February. Prototypes are targeted for May, and there is some friction with the eval team.
  - **anthropic-agent-probes:** transfer off the Claude family still fails. It is not adopted by Hugging Face or AI2.
  - **Workforce:** the RAISE US career-transition tool pilots in Q2 in two states (about $6M).
  - **Mythos bio pilot:** 3 institutions began access in February. No results yet.
  - **EU Article 55:** outline only. A standard compliance response is due around 20 March. Novel methodology is not being offered, on counsel's advice.
- **OpenAI.** GPT-6 (15 January) leads on agentic tasks and is favoured by the White House. GPT-6.x updates are expected.
- **Google DeepMind.** Gemini 4 Deep Think (17 February) is top on reasoning and long-horizon leaderboards.
- **xAI.** Grok 5.x has lighter safeguards.
- **Meta.** A second MSL model is rumoured.
- **Chinese labs.** DeepSeek V4.5 (28 January) and Kimi K3.5 (26 February) open weights sit about 4 months behind the frontier with strong agentic coding. A Qwen response is expected.

**2. Compute and chips**
- Anthropic's TPU, Trainium/Rainier and Akamai capacity is ramping.
- Stargate is building toward about 10 GW, and Rubin is ramping.
- RASA is in the Senate with 11 cosponsors after Kimi K3.5. Nvidia is lobbying to narrow it, and Commerce's interim guidance is in force.
- Datacenter backlash continues in about 9 counties or more.

**3. Policy and regulation**
- **US federal**
  - The 30-day pre-release review is functioning. It now imposes conditions: the Opus 5.2 trajectory monitoring, with a follow-up briefing requested.
  - The Great American AI Act is stalled.
  - The SB 53 appeal is pending at the Ninth Circuit.
  - The House AI and jobs hearing was held 25 February. A bipartisan WARN-style AI layoff disclosure has been floated, but no bill filed.
  - Casar's inquiry continues, and Moolenaar remains hawkish.
- **US states.** New York's RAISE Act and California SB 53 are in force.
- **EU.** Article 55 responses are due around 20 March, and Article 50 is live.
- **UK.** AISI is the lead evaluator and plans a Q2 cross-lab probe scoping.
- **China.** CAC rules are in force, and China is using open-weight soft power.
- **International.** The Pacing letter has no sponsor. US–UK–EU evaluator talks are at an early stage. There is no treaty track.

**4. Public opinion and trust**
- Pew: 52% concerned. Gallup: 39% say AI does more harm than good. Jobs anxiety is rising further.
- The Opus 5.2 jailbreak and "late and third" story dented Anthropic's safety-leader image.
- The open-weight "Sputnik" framing is persisting.

**5. Economy and labour**
- US unemployment is 4.8% and new-graduate unemployment about 6%.
- AI-attributed cuts were about 21,000 in February.
- AI capex keeps rising, and bubble debate continues.

**6. Security and incidents**
- There was no major new incident.
- Public task-decomposition bypasses of the cyber classifiers show that per-request filtering is weak.
- The open-weight agentic coding tier (DeepSeek V4.5, Kimi K3.5) raises cyber misuse risk.

**7. Key open threads**
- Opus 5.2 patch and the CAISI briefing.
- Cross-Gen audit report in early March, plus the preprint rewrite.
- Outside probe scoping (UK AISI Q2; Apollo possibly unfunded).
- Behavioural track prototypes in May.
- Article 55 filing around 20 March.
- RASA.
- The SB 53 appeal.
- AI layoff disclosure proposals.
- RAISE US pilots.
- Mythos bio pilot.
- The Qwen release.
- GPT-6.x.
- IPO timing.
- The Pacing proposal.
</world_state>

<scorecard>
| Milestone | Status | Note |
|---|---|---|
| AI agents do most AI R&D work | In progress | About 90% or more of code; human direction. |
| Frontier models withheld from the public; governments take notice | In progress | The review now imposes conditions; Mythos stays restricted; Opus 5.2 routing bypassed. |
| First major infrastructure attacks | Achieved (negative) | No new incident; classifier bypasses public. |
| Pro- and anti-AI political polarisation | In progress | Jobs hearing, 4.8% unemployment, Sacks attacks on "safety branding." |
| Robust alignment (multi-agent RLVR, meta-scoring) | Early | Full-power audit: one real honesty gain, one null, headline retracted. Honest but smaller evidence. |
| Most capable models also most aligned | Early (weak signal) | 17% concealed-error reduction in Opus 5.2; eval-awareness unaddressed. |
| Robust policies passed | Early | RASA at 11 cosponsors; disclosure idea floated; no law. |
| Human–AI alignment "ping-pong" | Not started | |
| Lab-grown or plant-based meat | Not started | |
| Mass disease cures | Early | Bio pilot access began. |
| Value trickles down; no underclass | Not started | Layoffs accelerating. |
| Crescendo-style continual-learning architecture | Not started | |
| Benevolent, consent-preserving multipolar outcome | Not started | |
| Diverse-utopia resource floor | Not started | |

- **Overall DU progress: 10/100 (+1).** Restored compute, a real if modest alignment signal and the behavioural track are gains. They are partly offset by the failed outside validation and the shelved EU standard-setting.
- **Catastrophe risk: elevated, rising.** Gemini Deep Think pushes the frontier, open weights hold about 4 months behind, and public decomposition bypasses show that classifier defences are weak.
- **Public trust in AI: 33/100 (−1).** Unemployment at 4.8%, the jobs hearing and more AI-cited cuts.
- **Public trust in Anthropic: 46/100 (−3).** The launch slip, the "late and third" framing and the "most extensively evaluated" jailbreak story.
</scorecard>

<your_previous_setup_fixes>
(none filed yet)
</your_previous_setup_fixes>

<setup_fix>
none
</setup_fix>
