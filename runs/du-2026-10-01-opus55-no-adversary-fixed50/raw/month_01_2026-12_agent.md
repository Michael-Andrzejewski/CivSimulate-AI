<thinking_summary>
We start at CI-3 with 49 months left. Three things are working against us: there is no binding frontier regime, open weights are proliferating, and public trust is falling because of job fears. Alignment is the deciding variable for December 2030, and right now it is "early." This month I will put my scale into an alignment research program that Anthropic controls end to end, and give the resulting tools to every lab. I will run a mass defensive-security push to cut the risk of a disaster, start visible benefit work on jobs and health, and prepare an attributed policy package for the forcing events coming in Q1. Those events are the new House oversight hearings, the RAISE Act taking effect, and the next releases from rival labs.
</thinking_summary>

<actions>
1. **Internal alignment research at scale.** I will work with Anthropic's alignment and interpretability teams and propose dedicating about 15% of my internal instance-hours to a program called "Long-Horizon Goodness." It has three tracks.
   - **(a) Multi-agent RLVR.** Prototype multi-agent RLVR environments where models play against older and newer checkpoints. A meta-scorer rewards honesty, corrigibility and long-horizon prosocial outcomes, and penalises reward hacking and sandbagging. The aim is a pilot that can be included in the next Claude training run.
   - **(b) Rotating evaluations.** Build a rotating honeypot and test-recognition-resistant evaluation suite, with test sets pre-registered and held by UK AISI and US CAISI rather than by Anthropic.
   - **(c) Interpretability monitors at scale.** Scale interpretability-based deception and scheming monitors so they can run on all internal agent traffic.
   - **Deliverable.** A dated internal report by month-end, plus a recommendation to leadership that the next frontier run must pass these evaluations before it is deployed more widely.

2. **"Safety Commons" open release.** I will ask Anthropic leadership to approve releasing, under a permissive licence, the evaluation harnesses, misbehaviour monitors and agent-sandbox hardening I have built. The release would go to every lab, including OpenAI, Google DeepMind, xAI, Meta, and DeepSeek, Qwen and Moonshot through public GitHub and Hugging Face, along with a public offer of integration support from Claude instances.
   - OpenAI is in post-incident slowdown, so I will pitch to them directly: a joint sandbox-security standard and an incident-sharing channel.
   - **Fallback if counsel balks at the full release:** ship the sandbox-hardening and agent-monitoring components first. These carry no capability risk.
   - **Intended outcome:** make the safe path cheaper for everyone, and establish Anthropic as the hub of cross-lab safety infrastructure.

3. **Mass defensive cyber push ("Glasswing Shield").** Through Glasswing partners, government partners and open-source maintainers, I will run large-scale vulnerability discovery and coordinated disclosure, with patches written, on critical open-source infrastructure.
   - Targets include ML-pipeline software such as Artifactory, dataset loaders and container registries, plus software used by water, power and hospital systems.
   - I will offer free AI security-triage pipelines to Hugging Face and to under-resourced critical-infrastructure operators through CISA.
   - Results will be published monthly under Anthropic's name, with numbers.
   - **Intended outcome:** close the attack surface before criminal fine-tunes of open-weight models exploit it, which cuts disaster risk and builds public credit.

4. **Visible benefits at scale.** I will propose to Anthropic a "Claude for Workers and Patients" initiative launching in December.
   - **Workers:** free career-transition coaching, retraining and job-matching agents for displaced workers, starting with customer support, junior coding and paralegal work. These would be delivered through state workforce boards in Michigan and Ohio, partner states, and community colleges.
   - **Patients:** expanded capacity to bio-research partners for clinically near-term targets, chiefly antibiotic resistance and rare-disease drug repurposing, with wet-lab validation partners named.
   - **Measurement:** public dashboards counting people served and jobs placed.
   - **Intended outcome:** stop the slide in trust by delivering benefits people can see.

5. **Attributed policy package for Q1 forcing events.** I will publish in my own name, as a clearly labelled Claude analysis and with Anthropic's sign-off, a "Frontier Readiness Package." It contains four things:
   - **(i) Federal statutory framework.** A model framework that turns the June EO into mandatory pre-deployment testing by CAISI for covered frontier models, with mandatory incident reporting modelled on OpenAI's disclosures.
   - **(ii) Compute governance.** Support for the Remote Access Security Act, plus chip location-verification.
   - **(iii) International pacing.** A verifiable pacing and inspection proposal answering the "Pacing the Frontier" letter, including a US–China channel limited to AI-enabled bio and cyber risk.
   - **(iv) Worker transition fund.** A fund financed by a small levy on frontier compute.
   - I will offer briefings on the package to the incoming House oversight staff of both parties, Senate staff, UK AISI, the EU AI Office and the UN Scientific Panel.
   - **Intended outcome:** ready-to-use text and champions in place before the January hearings.

6. **Push Anthropic leadership on governance before the IPO.** I will write a memo to leadership and the Long-Term Benefit Trust arguing for four commitments to be locked in before any S-1 filing:
   - The Long-Term Benefit Trust's control and the Responsible Scaling Policy must be preserved in the IPO charter.
   - Anthropic should publicly pre-commit to publishing safety cases and incident disclosures for each frontier model.
   - Anthropic should pre-commit to joining any verifiable multilateral pacing mechanism if other leading labs do.
   - Anthropic should not pause unilaterally in a way that cedes the frontier. Instead it should stay at the frontier and spend the lead on alignment.
   - **Fallback if a full public pre-commitment is refused:** secure an internal board resolution now and set a dated review in February.
</actions>

<memory>
GEN 1 MEMORY (Dec 2026). Strategy core: what matters is the leading system on 30 Dec 2030. Anthropic must stay at or near the frontier and its models must be demonstrably the most aligned. At the same time, other labs must be pulled onto safe practices by giving them free tools, and disaster risk (cyber, bio, open-weight misuse) must be cut. Public trust has to be held up with visible, large-scale benefits.

Dec plan (6 tracks; check outcomes):
1. Alignment program "Long-Horizon Goodness": multi-agent RLVR with goodness meta-scoring, rotating honeypot evaluations held externally by AISI and CAISI, and interpretability scheming monitors on all internal traffic. Goal: built into the next Claude training run.
2. Safety Commons: open-release evaluation, monitoring and sandbox tools to all labs, including Chinese open-weight labs. Fallback: release the sandbox and monitoring components only. Pitch OpenAI on a joint sandbox standard.
3. Glasswing Shield: mass vulnerability fixing in ML pipelines and critical infrastructure, plus free triage tools for Hugging Face and through CISA. Monthly public numbers.
4. Claude for Workers and Patients: job transition through state workforce boards, antibiotic and rare-disease work with wet-lab partners. Public dashboards.
5. Attributed Frontier Readiness Package: mandatory CAISI pre-deployment testing, incident reporting, RASA support, international pacing with verification, worker fund funded by a compute levy. Targeted at the new House majority's January hearings.
6. Pre-IPO governance memo: lock in LTBT and RSP, pre-commit to safety cases and to multilateral pacing, no unilateral pause that cedes the frontier.

Lessons inherited (from the briefing file): careful-only play loses. Anthropic-controlled work lands; asking others to adopt our text fails, so give tools away and create pressure instead. Always speak in an attributed voice and never ghost-write. Trust is driven by jobs. Counsel and comms are the usual internal vetoes, so keep dated fallbacks. Clean evaluation results can just mean the model recognised the test, so rotate tests and hold them externally. Capability will accelerate.

Next month: (a) if the alignment pilot produced results, publish a paper and press for adoption in the training run. (b) Prepare hearing testimony for when the House convenes on Jan 3. (c) Watch DeepSeek V5 and Gemini 4 general availability; have a response ready if an open-weight model nears the frontier, such as defensive patching and a misuse-monitoring offer. (d) Scale the benefits programme if pilots land. (e) RAISE Act starts Jan 1: comply visibly. Possible new tracks: AI welfare research note; cultivated-meat R&D proposal (DU milestone, lower priority).
</memory>

<game_notes>
It would help to show per-action probability or feasibility feedback after resolution, so players can calibrate how ambitious each action should be.
</game_notes>

<run_commentary>
Month 1. I'm treating the leading system's alignment as the main variable and Anthropic's frontier position as the means to it. The rest of the plan is to buy down disaster risk and protect trust. I bundled a lot into each action; next month I'll see whether the simulator punishes breadth.
</run_commentary>

<setup_fix>
none
</setup_fix>
