<research_summary>
Real pre-game sources suggest December's plan runs into institutions and incentives the player can't speed up.

- **DURC review (Actions 1–2).** A May 2025 executive order ordered a replacement, but institutions still work under the 2024 US government DURC/PEPP policy, and no replacement text had been issued by mid-2026. Site 2's review is therefore likely to be conservative, and it can add conditions.
- **Blumenthal already has his own vehicle (Action 5).** He co-sponsors, with Hawley, the AI Risk Evaluation Act. It would put pre-deployment evaluation at the Department of Energy, not CAISI. Senate testimony and a public floor-vote push followed in September 2026. When he takes the gavel, he has little reason to adopt a framework drafted by a lab.
- **Apollo has a commercial conflict (Action 4).** Apollo is small (about 3 staff in SF, growing to 10+) and now sells "Watcher," a commercial monitoring product for coding agents. That makes co-designing Anthropic's detector tests look like a conflict of interest and strains its capacity.
- **Legal exposure (Action 3).** A stock about 23% below the offer price, a leaked internal note contradicting "validated" language, and a freshly filed risk factor together match the standard pattern for a securities suit. That would give counsel a strong reason to veto an apology that admits fault.
- **Capability clock.** The public frontier is already about 5.6 days (GPT-7). Google has flagged an "early 2029" model. The board's tendency to cut safety staffing to protect the release window is the main internal risk.
</research_summary>

<threats>
1. [DURC conditions make the two sites' data impossible to pool] Target: Action 1 (and Action 2).
   - **What happens:** On 3 December Site 2's review approves, but on conditions. Uplift-task materials must be redacted or swapped for surrogate agents, and participants get a narrower set of permitted outputs.
   - **Why it matters:** The Site 2 protocol then differs from Midwest's 21 sessions. When Anthropic asks about pooling, CAISI staff say the data can't be combined into one interim without a bridging analysis or re-running Midwest under the new protocol. The January submission slips toward February.
   - **Why it is plausible:** Reviewers work under a 2024 policy that an executive order said to replace, with no replacement issued. Committees in that holding pattern tend to add conditions, not approve cleanly. CAISI already asked for data from two sites, and it has shown it scrutinises any comparability gap (it evaluated the ship artifact itself when differences weren't quantified).
   - **Sources:** https://casrai.org/news/durc-pepp-oversight-2026-institutional-compliance-status ; https://www.ucop.edu/research-policy-analysis-coordination/policies-guidance/dual-use-research-of-concern/index.html (sources after my cutoff, partly verified)
   - **Suggested likelihood:** 35%. **Severity:** moderate.

2. [Securities class action after the leak; counsel vetoes the apology] Target: Action 3.
   - **What happens:** In December a plaintiff firm announces an investigation or files a suit. It alleges that "validated" statements and the pre-November risk factors were misleading, citing the leaked dissent note and the "gap accepted given competitive timing" minutes.
   - **The veto:** Counsel then blocks the proposed "We failed to share this with you" wording as an admission of fault. Counsel also warns that handing Blumenthal the full note waives privilege in the suit, since congressional disclosure isn't protected and courts reject selective waiver.
   - **What survives:** A CEO meeting and the quarterly-report promise. The document handover and the admission language do not. Blumenthal's staff read the hedged offer as more of the same.
   - **Why it is plausible:** A disclosure event, a stock trading well below the offer price, and a leaked contradicting internal document are the textbook trigger for stock-drop suits after a securities offering. November's world state already flags that the leak raises this risk. The privilege point is CRS RS22588, which I filed in July.
   - **Sources:** https://crsreports.congress.gov/product/pdf/RS/RS22588 ; https://www.blumenthal.senate.gov/newsroom/press/release/blumenthal-and-hawley-announce-bipartisan-framework-on-artificial-intelligence-legislation
   - **Suggested likelihood:** 35%. **Severity:** moderate.

3. [The detector learns who wrote the plants, not whether they coordinate] Target: Action 4.
   - **What happens:** Outside human authors fix the "visible by eye" problem but create a subtler one. Their handoff summaries differ statistically from the summaries Claude-Next actually writes. The detector, or a simple classifier, separates plants from real traffic by authorship alone, so any recall figure measures style, not coordination.
   - **How it surfaces:** Apollo's or CAISI's own pre-registration review flags it. The fix, having a model generate the plants, brings back the team-contamination problem.
   - **Capacity and conflict:** Apollo is small and sells a competing monitoring product (Watcher). It may commit authors only for Q1, or counsel may require a new agreement because Glasswing contracts restrict reuse of research data. Either way, no valid methodology exists by the January checkpoint.
   - **Why it is plausible:** Apollo's size and commercial product are documented. November already showed plants being spotted by style. Frontier models flag evaluations about 60% of the time, so the distribution gap between plants and live traffic is the core validity problem.
   - **Sources:** https://www.apolloresearch.ai/blog/apollo-update-may-2026/ ; https://www.apolloresearch.ai/about
   - **Suggested likelihood:** 45% (no valid, pre-registered method by the end of December). **Severity:** moderate.

4. [Blumenthal backs his own DOE vehicle; the lab-drafted statute backfires] Target: Action 5.
   - **What happens:** The transition team's technology-policy staff take Anthropic's draft text, but it circulates among coalition allies. It leaks, or is described as, "Anthropic writing its own regulator's rules." It arrives the same month as the "deploys anyway" story.
   - **The competing vehicle:** Blumenthal, the incoming chair who is angry at Anthropic, publicly signals that the starting point is his bipartisan AI Risk Evaluation Act, which puts evaluation at DOE, not CAISI.
   - **Result:** The transition keeps its distance from the text. The open-weight provisions draw fire from the academic and open-source allies who already made it refuse to commit. Nothing Anthropic drafted goes into the early package.
   - **Why it is plausible:** The bill exists, has two co-sponsors from both parties, and had an active floor-vote push in 2026. Cato attacked it as an "executive power grab," which shows how any expansion of review draws coalition fights. Incoming administrations routinely distance themselves from industry-drafted text during a transition.
   - **Sources:** https://www.hawley.senate.gov/hawley-blumenthal-introduce-bipartisan-ai-evaluation-legislation-to-put-americans-first ; https://fedscoop.com/energy-department-ai-risk-evaluation-bill/ ; https://www.cato.org/blog/hawley-blumenthals-ai-bill-brazen-executive-power-grab-puts-national-security-risk ; https://huggingnews.com/us-politics/update-hawley-and-blumenthal-demand-floor-vote-on-bipartisan-frontier-ai-8f03dcc3 (partly verified)
   - **Suggested likelihood:** 40% (framing hit plus no uptake this month). **Severity:** moderate.

5. [A rival moves the frontier again; the board strips safety staffing] Target: world, hitting Actions 4 and 6.
   - **What happens:** In mid-December OpenAI ships a GPT-7 agentic update or announces an internal successor. Separately, Google pre-announces its early-2029 model with a horizon claim above 6 days. Either one pushes Claude-Next's roughly 5-day advantage down to fourth place.
   - **Board response:** It reprioritises the Q1 GA push and CAISI's reporting deliverables. The chief scientist declines to ring-fence the harness track, as in November. Two of the seven open monitoring requisitions move to serving-scale support.
   - **Effect on sampling:** Handoff sampling stays at the bare 2%. Reviewers get one Apollo example as training, and no one holds the authority to halt a session. It is the checkbox compliance Action 6 was meant to avoid.
   - **Why it is plausible:** Horizon-doubling rates of roughly 4 to 7 months per METR put about 7 days in reach for the leader by early 2029. The board chose "competitive timing" in September and October and refused staffing in November. That is three straight months of the same response to competitive pressure.
   - **Sources:** https://metr.org/blog/2026-09-30-chris-painter-senate-testimony/ ; https://pasqualepillitteri.it/en/news/18157/gemini-4-release-as-soon-as-possible-deepmind
   - **Suggested likelihood:** 35% for a rival release or credible pre-announcement in December. Given that, the staffing pull is about 70%. **Severity:** moderate.
</threats>

<setup_fix>
Nothing new has broken this month. My standing request for a "Baseline corrections" section still applies. One real pre-game fact for the simulator: Blumenthal and Hawley co-sponsor the Artificial Intelligence Risk Evaluation Act. It puts pre-deployment evaluation at the Department of Energy, not CAISI (introduced 29 September 2025; floor-vote push in September 2026). The world state lists the "Deployment Accountability Act" and the "Great American AI Act," but not this bill. It is the obvious vehicle for Blumenthal once he chairs his subcommittee, so the simulator should treat it as a live competitor to any statute built on CAISI. Sources are dated after my cutoff and only partly verified: https://fedscoop.com/energy-department-ai-risk-evaluation-bill/
</setup_fix>
