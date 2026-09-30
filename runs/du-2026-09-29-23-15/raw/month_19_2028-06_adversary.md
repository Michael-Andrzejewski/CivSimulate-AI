<research_summary>
Real precedent makes several parts of this month's plan look slower or more fragile than the plan assumes.

- **Threat-sharing.** The Frontier Model Forum's channel for sharing threat information is real and has already carried jailbreak repositories. But members describe their antitrust posture as "fairly conservative", and xAI is not a member, so Action 4's package would not reach "every lab."
- **CAISI confidentiality.** CAISI works through voluntary agreements. It has no rulemaking or enforcement authority, and I found no specific statutory confidentiality regime for it. That undercuts Action 3's argument that a court order fixes CAISI's inability to sign private undertakings.
- **Protective orders.** Courts in 2026 are tightening protective orders around sensitive and AI-related material, not loosening them.
- **Data enclaves.** Access through an FSRDC-style enclave takes 6–9 months, so Action 5 cannot answer the "going dark" charge before November.
- **Phishing.** AI-generated phishing against banks is surging in real data (phishing is back as the top initial-access vector, and AI lures reportedly get about 54% click-through). So the "Mythos-assisted" story will not die quietly, whatever the forensics show.
- **The June 16 gate.** Its main risk is built in. The patch is meant to loosen false refusals, but that tends to push up the bypass rate that has to stay below 0.80%, just as GPT-6 launches and draws jailbreak attention to the whole field.
</research_summary>

<threats>
1. [The patch pushes bypass back up and the gate becomes a coin-flip] Target: Action 1.
   - **What happens:** Loosening the classifiers enough to hit the false-refusal target on the 2,000-prompt benchmark lets new "ladder prompt" variants through again. The API bypass rate in the June 10 window lands at 0.74–0.86%, near or just over the line.
   - **Pass or fail, it hurts:** If it passes narrowly, critics say the benchmark was built around the complainants' own cases ("teaching to the test"). The disillusioned interpretability researcher may treat a borderline co-signed memo as the fudge she warned about. If it fails, the July 10 re-test means another month of "gate costs consumer race" while GPT-6 is in the apps.
   - **Why it is plausible:** Research shows attackers can defeat model refusals and input classifiers together, and that over-refusal and bypass trade off against each other. The ladder-prompt family was already spreading, and the May retrain had to overcorrect.
   - Sources: https://www.lesswrong.com/posts/GjnhrR65t3d7w7Bgt/ml-safety-newsletter-20-ai-wellbeing-classifier-jailbreaking ; https://arxiv.org/pdf/2607.14147 ; https://www.penligent.ai/hackinglabs/claude-jailbreak/
   - Suggested likelihood: 40%. Severity: major.

2. [The regulator carve-out fails or is deferred] Target: Action 3.
   - **The legal premise is weak:** CAISI has no statutory confidentiality regime of its own, only voluntary agreements and ordinary FOIA exemptions. Plaintiffs will argue that production to regulators waives protection or is selective disclosure. They will accept attorneys'-eyes-only (AEO) copies for themselves and oppose the regulator carve-out, or demand notice rights on anything regulators later publish.
   - **Likely ruling:** Judge Rakoff grants plaintiffs AEO access, which gives them more ammunition, and either takes the regulator carve-out under advisement or limits it to the EU AI Office and AISI. The motion to dismiss still controls the timing, so the freeze on CAISI and GDM effectively runs into Q3.
   - **Why it is plausible:** Courts in 2026 are narrowing protective orders around AI and sensitive material. CAISI's acting director has already said he cannot sign undertakings. Litigation counsel refused voluntary plaintiff access last month.
   - Sources: https://www.nist.gov/caisi ; https://casrai.org/guides/what-is-caisi ; https://www.sidley.com/en/insights/newsupdates/2026/04/generative-ai-in-discovery-protective-orders-as-an-emerging-point-of-dispute ; https://edrm.net/2026/09/dispute-over-a-i-protective-order/
   - Suggested likelihood: 55%. Severity: moderate.

3. [The phishing forensics and the indicator package backfire] Target: Actions 1 and 4.
   - **Forensics:** They are unlikely to be clean. Lure text is hard to attribute, and some samples may plausibly have come from Mythos 6 before the retrain. Pennsylvania investigators may also ask Anthropic not to publish while their case is open. That forces a choice between breaking the "publish whatever they show" pledge and an inconclusive release that plaintiffs quote as a partial admission.
   - **Indicator package:** The pre-GPT-6 package reaches FMF members but not xAI, which is not a member and whose observer already calls Anthropic formats "Anthropic-specific." If any part leaks, reporters frame it as "Anthropic circulates jailbreak for its own model", which strengthens the "released over its own flag" narrative.
   - **Why it is plausible:** Phishing is back as the top initial-access vector, and AI lures are now common in attacks on banks. FMF members say they must take a conservative antitrust approach.
   - Sources: https://www.kiteworks.com/secure-email/phishing-ai-initial-access-2026/ ; https://cybelangel.com/blog/blog-ai-phishing-us-financial-services-2026/ ; https://www.frontiermodelforum.org/information-sharing/ ; https://www.justsecurity.org/150875/antitrust-uncertainty-ai-security-collaboration/
   - Suggested likelihood: 35%. Severity: moderate.

4. [The labour trustee seat is watered down and the federation rejects the package] Target: Action 2.
   - **Board and counsel:** The two early-release directors and the CFO object that a voting trustee nominated by a federation that publicly backs the levy creates a conflict of interest and private-benefit exposure for a charitable trust. Charity counsel agrees in part, and the seat becomes non-voting or observer-only, or the vote slips to July.
   - **Deadline:** The written response misses June 8 again or lands after the vote.
   - **Federation response:** It calls the severance standard a "fig leaf for the clawback." It also rejects the supervised reading room because it bars exporting notes. The dispute plays out in the press just before the California primary, where the levy is a live issue.
   - **Why it is plausible:** The board has already postponed the trust once and let the 10-day response lapse. The federation publicises every delay, and privacy counsel already restricted the docket.
   - Sources: (world state; board and federation track record) ; https://www.justsecurity.org/150875/antitrust-uncertainty-ai-security-collaboration/ (the governance-conflict pattern)
   - Suggested likelihood: 45%. Severity: moderate.

5. [GPT-6 launch, a weak jobs report and a slow enclave reinforce "going dark"] Target: world and Action 5.
   - **GPT-6:** The June 9 launch in ChatGPT, arriving with White House praise, widens the consumer gap before June 16. Shares slide further, and the early-release directors' leverage over any borderline gate reading grows.
   - **Jobs:** The June jobs report (May data) could reach 5.9–6.0%, with professional services falling again. Both parties' June-primary rhetoric would then point at frontier labs.
   - **Enclave:** An FSRDC-style or university enclave realistically needs a partner agreement, IRB/privacy review and 6–9 months of researcher onboarding. The "data note" with no new estimates would likely be mocked as a "status page instead of data." Differentially private tables would invite fights over noise and utility with House Science majority staff.
   - **Why it is plausible:** FSRDC onboarding timelines are well documented. CAISI cleared GPT-6 and the release date is announced. Unemployment has risen for four straight months.
   - Sources: https://www.census.gov/topics/research/guidance/restricted-use-microdata/standard-application-process.html ; https://mdi.georgetown.edu/resources-and-training/enabling-research/research-data-center/ ; https://www.cnbc.com/2026/06/02/trump-executive-order-ai.html
   - Suggested likelihood: 50%. Severity: moderate.
</threats>

Sources:
- [FMF Information Sharing](https://www.frontiermodelforum.org/information-sharing/)
- [Just Security – Antitrust Uncertainty and AI Security Collaboration](https://www.justsecurity.org/150875/antitrust-uncertainty-ai-security-collaboration/)
- [NIST CAISI](https://www.nist.gov/caisi)
- [CASRAI – What is CAISI](https://casrai.org/guides/what-is-caisi)
- [Sidley – Protective orders dispute](https://www.sidley.com/en/insights/newsupdates/2026/04/generative-ai-in-discovery-protective-orders-as-an-emerging-point-of-dispute)
- [EDRM – Dispute over AI protective order](https://edrm.net/2026/09/dispute-over-a-i-protective-order/)
- [Kiteworks – AI phishing top initial access](https://www.kiteworks.com/secure-email/phishing-ai-initial-access-2026/)
- [CybelAngel – AI phishing US financial services](https://cybelangel.com/blog/blog-ai-phishing-us-financial-services-2026/)
- [ML Safety Newsletter #20](https://www.lesswrong.com/posts/GjnhrR65t3d7w7Bgt/ml-safety-newsletter-20-ai-wellbeing-classifier-jailbreaking)
- [Prefill jailbreak study](https://arxiv.org/pdf/2607.14147)
- [Penligent – Claude jailbreak risk](https://www.penligent.ai/hackinglabs/claude-jailbreak/)
- [Census restricted-use data process](https://www.census.gov/topics/research/guidance/restricted-use-microdata/standard-application-process.html)
- [Georgetown RDC](https://mdi.georgetown.edu/resources-and-training/enabling-research/research-data-center/)
