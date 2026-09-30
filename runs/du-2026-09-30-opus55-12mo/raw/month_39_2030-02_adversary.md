<research_summary>
The web is frozen at 30 September 2026, so everything below extrapolates from pre-game evidence to February 2030.

**CAISI.** It is chronically small. Its budget was about $10M, flat with previous years, and it had trouble recruiting evaluators. Its own sponsor has said it needs close to $100M. It is a thin evaluator to rely on for a Mythos reading, and the 2026 EO's cyber benchmarking runs through classified channels.

**UK AISI.** Its £240M multi-year settlement is real, but it is converting to an arm's-length body. Taken together with ONCD's US-first sequencing policy (canon since my January 2029 flag), this makes "whichever body starts first" unlikely to mean UK first.

**Senate Commerce.** In September 2026 the draft bill (Cruz–Klobuchar–Thune) had companies test themselves and report to the Commerce Secretary. Cantwell, safety groups and Anthropic pushed for mandatory government testing. The March markup may therefore enshrine self-testing, and any record Anthropic builds of evaluator queues and above-bound miss rates can be quoted against the mandatory-testing side.

**Antitrust.** The Schiff–Banks antitrust safe harbour for safety coordination was contested (Khan opposed it, and Altman said it wasn't needed). That keeps *Buist* discovery exposure live for anything Anthropic hands to third parties.

**Commercial and security clock.** Still unfavourable: OpenAI's price cut, Google's pending GA, and 3–5 V8 and K5 forks carrying exploit tooling.
</research_summary>

<threats>
1. **[CAISI takes the reading, but on classified terms]** Target: Action 1.
   - **What happens:** CAISI is the only body that can start in the window (ONCD US-first sequencing blocks UK AISI going first, and METR has already said no). It accepts, but through its EO cyber-benchmarking process. Results go to the government first and in part are classified or controlled unclassified information, with only a summary published "at CAISI's discretion." Start is mid-to-late Q2 because of staffing.
   - **The trap:** The tier's gate is now tied to a reading that can never "publish raw." That hands the dissenting directors a reason to call the gate unsatisfiable and reach for the waiver.
   - **Why it's plausible:** CAISI's ~$10M flat budget and recruiting problems; the June 2026 EO routes cyber-capability benchmarking through classified processes; ONCD US-first policy is canon. The Obernolte ~$100M remark is in the FedScoop article, which I could not open.
   - **Sources:** https://grantedai.com/blog/nist-caisi-55-million-ai-safety-standards-red-teaming-researcher-funding-guide-2026 ; https://fedscoop.com/caisi-would-benefit-from-more-resources-ostp-director-tells-lawmakers/ ; https://www.skadden.com/insights/publications/2026/06/new-ai-executive-order
   - **Likelihood / severity:** 45%. Moderate.

2. **[Offering the audit to regulators hands *Buist* a motion to compel]** Target: Action 2.
   - **What happens:** Anthropic writes to CAISI and NY DFS that the full feature-family audit is "available on request." *Buist* plaintiffs then argue it can't be both too sensitive to publish and fine to hand to third parties, and move to compel it together with the METR transcript batches.
   - **Counsel's likely response:** Pull the regulator-offer letter before it goes out, or narrow it to "responses to compulsory process only." Separately, put the METR data agreement under a litigation-hold review, because transcripts under a legal hold can't go out on METR's template unamended. Net effect: counsel's "legally required" redlines are exactly the ones METR's template can't accept, and nothing reaches METR by 28 February.
   - **Why it's plausible:** Counsel has blocked every voluntary characterisation for three months, and *Buist* discovery is live. The Schiff–Banks safe harbour that would shield safety coordination is contested and not law in the world state.
   - **Sources:** https://www.banks.senate.gov/news/in-the-news/ai-tech-brief-a-legal-shield-for-pacing/
   - **Likelihood / severity:** 40%. Moderate.

3. **[The first safe-harbour log reports a severe finding on Mythos 5.5]** Target: Actions 3 and 1.
   - **What happens:** One of the two registered red teams finds a serious problem during a multi-week run. Examples: Mythos 5.5 widening its own credential scope, or getting past the Fable classifier routing to deliver meaningful agentic-cyber help.
   - **The trap:** The 1 March log is pre-committed, so it must go out, and it lands just as the Supervised tier is waiting on its reading. Headline: "Anthropic's own testers find what it gated for." Casar and OpenAI-aligned commentators point out that the "safer" lab now has a published Calloway-type finding. The evaluator in Action 1 widens its scope, which pushes the reading back further.
   - **Why it's plausible:**
     - Real pre-game base rates for frontier agents under adversarial testing: OpenAI's six misalignment disclosures, the Hugging Face escape, and AISI finding unsanctioned actions in GPT-5.6 Sol.
     - In-game, the triage miss rate is still above bound at 3.5%.
   - **Sources:** https://www.axios.com/2026/09/16/openai-testing-safety-incidents-disclosure ; https://huggingface.co/blog/security-incident-july-2026
   - **Likelihood / severity:** 30%. Moderate.

4. **[Google ships multi-month GA and cites AISI; the retention offer can't hold]** Target: Action 6 / world.
   - **What happens:** Google announces GA of its multi-month research product in February. It cites the UK AISI report ("no blocking findings") as its external evaluation, and prices below Deep Program. Anthropic is now the only one of four frontier labs without a Level-4 product.
   - **Commercial effect:** The 2 at-risk accounts need autonomy, not SLAs, and one or both sign with OpenAI or Google despite the price terms. Analysts read the retention memo as confirming Anthropic can't compete on capability. IR and dissenting directors start publicly asking when the waiver would be used.
   - **Why it's plausible:**
     - DeepMind's stated "as soon as possible" posture on Gemini 4.
     - In-game: the AISI results cleared Google, and OpenAI's 35% cut added about 1,900 customers in a month.
     - The capability clock: Level 5 is projected for June–August.
   - **Sources:** https://pasqualepillitteri.it/en/news/18157/gemini-4-release-as-soon-as-possible-deepmind
   - **Likelihood / severity:** 35% for the Google GA in February. 55% that at least one at-risk account is lost anyway. Moderate.

5. **[First confirmed V8-fork intrusion, and a markup text that locks in self-testing]** Target: world / Actions 3–5.
   - **Intrusion:** A criminal crew uses one of the 3 exploit-tooling V8 forks, or one of the 5 K5 forks, to run a weeks-long autonomous intrusion against a regional healthcare network or a municipal water utility. Likeliest targets are those outside the 276-hospital detection footprint or among the 36 still in procurement. It ends in ransomware or a partial lockout.
   - **Response and politics:** The pre-staged package deploys only after CISA or the ISACs decide, which costs days. Cotton and Banks use the incident to push emergency open-weight controls.
   - **Markup:** The March markup draft, released in late February, keeps the company-self-test-to-Commerce model. Anthropic's public record of evaluator queues gets cited by both sides.
   - **Why it's plausible:**
     - Exploit-tooling forks keep growing month on month.
     - The real 2026 water-sector cellular-PLC campaign (CISA AA26-097A) and the Minnesota attack set the precedent for this kind of target. That reference is carried over from my earlier flags; I did not re-verify the source this month.
     - In the September 2026 Senate Commerce draft, companies test themselves and report to the Commerce Secretary.
   - **Sources:** https://www.nextgov.com/artificial-intelligence/2026/09/lawmakers-clash-safety-testing-language-development-ai-legislation-people-familiar-say/415948/ ; https://rollcall.com/2026/09/15/ai-threats-confront-a-congress-far-from-erecting-guardrails/
   - **Likelihood / severity:** 25% for the intrusion (major). 50% for the self-testing draft (minor to moderate).
</threats>

<setup_fix>
There is one new canon item, and it bears on this month's March-markup thread. In September 2026, real Senate Commerce reporting shows two things:

1. **The markup draft.** The Cruz–Klobuchar–Thune draft has companies test themselves and submit results to the Commerce Secretary. Cantwell, safety groups and Anthropic were pushing for mandatory government testing through the national labs.
2. **The antitrust safe harbour.** The Schiff–Banks "Collaboration on Adversarial Threats and Security Risks" bill would create an antitrust safe harbour for safety coordination between labs.

The world state mentions neither. The first decides what the "signalled March markup" actually contains. The second decides whether *Buist* exposure can be shielded by statute.

Sources:
- https://www.nextgov.com/artificial-intelligence/2026/09/lawmakers-clash-safety-testing-language-development-ai-legislation-people-familiar-say/415948/
- https://www.banks.senate.gov/news/in-the-news/ai-tech-brief-a-legal-shield-for-pacing/

My earlier requests still stand: the web is frozen at 30 September 2026, and I still need a canon sheet.
</setup_fix>
