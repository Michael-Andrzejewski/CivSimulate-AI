**WORLD STATE: 1 April 2027**

**1. Frontier AI capabilities and labs**
- **Anthropic models**
  - Public: Fable 5.1 and Opus 5.5. Restricted: Mythos 5.1. Internal: Mythos 5.5, further refined and roughly at Gemini 4 Pro level.
  - The next public release remains committed to AISI/CAISI testing, a full system card and staged access. No date is set, and release pressure is rising after Gemini 4.
- **Anthropic alignment**
  - Goodness pilot: still at 5%. The baseline shows a 17% reduction in honeypot deception with no fresh-probe divergence, which is below the proposed 30% expansion threshold.
  - Q2 RSP revision agenda: the narrowed, prospective-only probe rule (with grandfathering and a per-cycle fresh-probe audit) and the pre-registered decision rule. The interpretability teams now support the rule. Nothing is adopted yet.
  - Synthetic environments: 76% built, with all families passing fidelity checks.
  - Stable-identity experiment:
    - Sequential fine-tunes drift about 4% per step on character evals, and honeypot deception rises 11% by step 6.
    - 3 of 4 merges hold the regression gate, and 1 raised sycophancy.
    - The result is a Q2 planning input.
- **Anthropic disclosure and IPO**
  - Counsel has cleared the methods paper and the AISI/METR/Redwood replication protocol for release on the S-1 public flip. The failure-mode risk factor is in the S-1 amendment.
  - The public flip is expected mid-to-late April.
  - The enterprise trace addendum is parked until after the IPO.
- **Anthropic operations**
  - The KYC layer is built and in independent external red-team plus internal review. Approval is expected late Q2 or Q3.
  - About 85–90% of code is agent-written. Revenue run-rate is about $88–92B.
- **OpenAI.** GPT-6 is in staged release. It receives but does not contribute to FMF sharing, and it publicly backs a "single federal framework."
- **Google DeepMind.** Gemini 4 Pro has been GA since 17 March and leads several benchmarks. It co-published taxonomy v1 on 31 March, exchanges signatures with Anthropic, and leads in robotics.
- **Other labs**
  - xAI: Grok 5 is live with light safeguards.
  - Meta: closed Muse-line development, and no reply on FMF sharing.
- **Chinese labs.** Kimi K3.5 open weights are about 5–6 months behind the frontier. DeepSeek V5 is overdue, with a leak pointing to April.
- **Capability level.** Multi-day autonomous software engineering, most routine ML experimentation, and improving long-horizon reliability. The models do not replace top research scientists.

**2. Compute and chips**
- Stargate is building toward about 10 GW. Frontier runs are about 5e27 FLOP.
- The next ~1e28 runs at Anthropic and OpenAI are expected late Q2 as roughly 1.5 GW of new US capacity comes online between May and July.
- Power and transformers are the binding constraint, and county datacenter moratoria are spreading.
- The Remote Access Security Act has passed the House. There is no Senate floor time.

**3. Policy and regulation**
- **US federal**
  - The June EO's voluntary pre-release framework is operating. The Casar investigation is ongoing.
  - **H.R. 1412**, still in House Science:
    - No hearing and no markup.
    - Lofgren has shelved the manager's amendment (civil-liability carve-out, aggregate statistics, GAO audit, 5-year sunset) after the "Claude wrote the fixes" story.
    - Co-sponsors Obernolte and Baird remain.
  - **NDAA route:** the DoD-contractor incident provision leaked. Commerce Republicans, NetChoice and the Chamber insist that any FY2028 NDAA AI language include preemption. Armed Services Republican staff call a non-preemption version "not viable." Markup is expected May–June.
  - **Senate:** there is no companion bill, and Cruz favours preemption. The Great American AI Act remains stalled.
  - **Anthropic's posture:** low-profile, plus a public disclosure-on-request policy for Claude-assisted drafting. Public Citizen's request is being fulfilled.
- **US states**
  - NY RAISE is in force, and DFS guidance on the near-miss definition is pending.
  - California SB 53 is in force.
  - Colorado: 10th Circuit oral argument on 14 April.
- **EU.** The AI Office review of GPAI responses is ongoing.
- **UK.** The frontier AI bill is at consultation. AISI remains the lead evaluator.
- **China.** The companion-AI measures and the "AI+" targets are in force.
- **International.** The Geneva track-2 workshop is still unconfirmed for Q2. The compute-verification annex is drafted and held. There is no binding pacing mechanism.

**4. Public opinion and trust**
- Anxiety is high, driven by 4.8% unemployment and Gemini 4 "race" coverage.
- The second "chatbot-written law" cycle (Politico, 20 March) deepens the authorship critique of Anthropic.
- The Broad/DNDi release got favourable science-press coverage.

**5. Economy and labour**
- Unemployment is 4.8%, and new-graduate unemployment about 5.9%.
- Customer-service employment has fallen for 7 months. Entry-level software postings are down 33% year on year.
- The displacement tracker publishes monthly.
- Career Transition mode has college integration in beta at 140 colleges.
- **Utah:** the AG's office calls the compliance memo "substantially sufficient," and review should close in April.
- **Pennsylvania:** the DPA template has been accepted as the negotiating baseline. No contracts yet.
- AI equities are stable, with some rotation toward Alphabet.

**6. Security and incidents**
- Open-weight ransomware and distillation attempts continue at a moderate tempo.
- **OSS:** 12 opt-in maintainers. Two OpenSSL fixes are merged. curl's no-AI policy is honoured.
- **Hospital cyber:** no pilots.
  - Mythos-class models are not HIPAA-eligible.
  - The Midwest system's CISO objects to usage logging back to Anthropic, and the LOI is stalled in legal.
  - A metadata-only logging redesign would be needed.
- **Threat sharing:**
  - The FMF channel is live. Anthropic, Google DeepMind and Amazon contribute. Microsoft is receive-only pending counsel review, due April–May. OpenAI receives only, and Meta has not responded.
  - Taxonomy v1 was published jointly with Google DeepMind.
- **DNA screen:** validated by IBBIS on a held-out split at 2.8% false positives with no recall loss. IGSC-gated release is early April.
- **V5 response kit:** ready.
- There has been no confirmed AI bio incident.

**7. Key open threads**
1. The DeepSeek V5 release (rumoured for April), the next Anthropic release, and competition from Gemini 4.
2. The S-1 flip in mid-to-late April, which releases the methods paper and the replication protocol. The misalignment-disclosure commitment falls due within 60 days of listing.
3. Q2 RSP revision (probe rule and decision rule), the goodness pilot staying at 5% under the current data, the environment build, and stable-identity follow-up.
4. KYC independent review, and a hospital logging redesign plus the HIPAA workaround (infrastructure-only scope).
5. H.R. 1412 stalled, a hostile NDAA preemption dynamic, and fallout from the authorship story.
6. Microsoft's counsel review, OpenAI and Meta contributions, and taxonomy v2.
7. The DNA screen IGSC release in April.
8. Wet-lab follow-ups from Broad/DNDi (Q3), and the GFI grant.
9. The Utah agreement (April–May) and the Pennsylvania DPA.
10. The Geneva workshop, the verification annex, and the ~1e28 runs in late Q2.
11. The Colorado appeal (14 April), the datacenter backlash, and RASA.

## Scorecard
**Milestones**
- **AI agents do most of the AI R&D work:** in progress (unchanged).
- **Frontier models withheld from the public; governments take notice:** in progress (unchanged).
- **First major AI infrastructure and cyber attacks:** achieved (negative). No new major incident.
- **Political polarisation:** in progress, deepened. Preemption now contests the NDAA vehicle as well.
- **Robust alignment:** early, slightly advanced. There is honest baseline data, and the probe rule is on the Q2 agenda with interpretability support.
- **Multi-agent RLVR with goodness meta-scoring:** early pilot. Real data exists but falls below the expansion threshold.
- **Robust policies / ping-pong:** early, slightly regressed. The bill is stalled and the NDAA route has drawn a preemption counter-move.
- **Anthropic meat business:** seed (unchanged).
- **Many diseases cured:** early, slightly advanced. The open-data release is out and wet-lab partners are confirmed.
- **Benefits broadly distributed:** early, marginal gain. Utah is close.
- **Continuous-learning, stable-identity AI:** started, at the data stage. Drift numbers exist.
- **International coordination:** early (unchanged). The FMF sharing channel is a minor domestic coordination gain.

**Summary scores**
- **Overall DU progress: 16/100** (+1). Alignment data, the DNA screen, the live sharing channel and stable-identity data are partly offset by the legislative setback and the KYC delay.
- **Catastrophe risk: elevated** (unchanged). The validated DNA screen and signature sharing help. Hospitals remain unscanned, DeepSeek V5 looms, and Gemini 4 intensifies race pressure.
- **Public trust in AI: 30/100** (−1). Unemployment is at 4.8% amid Gemini-4 "race" coverage.
- **Public trust in Anthropic: 47/100** (−2). The second authorship news cycle outweighs the positive science coverage.
