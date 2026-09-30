<rolls>
Action 1 [Mid-May disclosure report with 9%]: P(failure) 35%. Roll 11. Outcome: FAILURE (11 < 35). Prerequisites: a rerun on the pre-registered window, MATS sign-off and AISI comments are all required. The failure comes from the accuracy gate itself: the rerun used a newer grader classifier than the pre-registered one. It does not come from a quiet-period or SEC slip, which is Threat 1 territory, and Threat 1 did not materialise.

Action 2 [Cross-Lab Evaluation Integrity Protocol]: P(failure) 45%. Roll 65. Outcome: PARTIAL SUCCESS (65 ≥ 45). Anthropic's own arm is pre-registered and the rename is accepted. OpenAI's signature is outside Anthropic's control, and Threat 3 hits it.

Action 3 [Commerce RFI comment]: P(failure) 35%. Roll 98. Outcome: SUCCESS (98 ≥ 35). The comment is filed on time and counsel trims it only lightly.

Action 4 [OpenSSF maintainer funding + Pennsylvania support]: P(failure) 40%. Roll 13. Outcome: FAILURE (13 < 40). The grant goes through Linux Foundation intake, and ISAC hiring cannot be finished in one month.

Action 5 [CAISI labelling + AISI addendum validation]: P(failure) 30%. Roll 01. Outcome: FAILURE (01 < 30). The labelling is accepted, but AISI's validation finds a problem with the addendum's false-positive rate. The reframing to cover more model sources also adds scope that has not been validated.

Action 6 [Rare-disease IP, audit, alt-protein dataset]: P(failure) 25%. Roll 13. Outcome: MOSTLY FAILURE (13 < 25). Support for the audit goes ahead unimpeded. The IP terms and the dataset both slip.
</rolls>

<threat_rolls>
Threat 1 [Cherry-picking / further slip]: P(materialises) 30%. This is lower than the adversary's 40% because the report was designed to show both figures, and "to follow" rules make a further quiet-period slip less likely. Roll 36. DOES NOT MATERIALISE (36 ≥ 30). Nobody frames the report as leading with the smaller number, and the SEC cycle causes no forced slip. The failure of Action 1 has a separate cause, the gate.

Threat 2 [RFI comment attacked from both sides]: P(materialises) 40%. This is slightly below the adversary's 45%. Hostility is high, but a comment that explicitly defends the current open releases undercuts the capture framing. Roll 58. DOES NOT MATERIALISE. The comment draws only routine grumbling and no coordinated counter-campaign.

Threat 3 [OpenAI uses the 30-day review as leverage]: P(materialises) 35%. This is below the adversary's 50%. The rename removes the stated objection, but OpenAI legal has added a new condition every month so far. Roll 04. MATERIALISES. OpenAI legal reads Anthropic's resumed pre-registration as an end-run around its review. It demands control over any side-by-side presentation of results and declines to adopt Anthropic's methodology as the shared standard. Signature slips to July at the earliest.

Threat 4 [Grant reads as capture; Pennsylvania declines]: P(materialises) 30%. This is below the adversary's 35%. Insurer-controlled incident response alone makes the decline quite likely. Roll 01. MATERIALISES. A "closed lab funds the open-source stewards" story appears, the TAC asks for a second funder, the Pennsylvania insurer bars outside involvement, and chatter about Anthropic "circling" the hospital leaks.

Threat 5 [Open release outdates the comment / skeptical RAISE panel]: P(materialises) 28%, as a single composite. A skeptical panel alone is about 35%, and a threshold-relevant Chinese release inside one month is about 15%. I apply this mainly to the panel. Roll 12. MATERIALISES as the panel outcome: the panel signals skepticism of RAISE's extraterritorial reach. There is no major open-weight release.
</threat_rolls>

<events>
Your actions cause a May in which Anthropic's filed words land better than its numbers. The RFI comment is the month's clear win. The disclosure report, the protocol, the addendum and the maintainer grant all stall on process.

**Disclosure report (May 19).** The rerun on the pre-registered window runs into a problem at the accuracy gate. The independent second-Claude check finds that both the January baseline and the rerun were scored with grader classifier v2.3, while the pre-registration specifies v2.1. Reconstructing the frozen grader and rescoring about 40,000 transcripts takes weeks. Under the gate's rules the MATS reviewer will not sign either figure. Counsel then rules that the ~9% sensitivity figure cannot appear on its own without the pre-registered comparator. The report ships on time with "Evaluation awareness (headline and sensitivity): to follow, grader-version reconciliation in progress." In the same window, the amended S-1 adds one qualitative sentence: "measured rates of evaluation awareness in our internal models have increased materially." Reporters at Transformer and The Information put the two documents side by side, and a Fortune headline follows on May 22: "Anthropic tells investors its AI is better at spotting tests. Its safety report leaves the number blank." No one accuses Anthropic of cherry-picking, but the "no omissions" promise now reads as lawyerly. The mutual-fund complex repeats its concern. Pricing guidance holds at late June.

**Protocol.** OpenAI accepts the "Cross-Lab Evaluation Integrity Protocol" name. Anthropic's own AISI-observed arm is pre-registered on OSF on May 27. Two days later, OpenAI legal writes that the resumed pre-registration "pre-empts the review." It says any cross-lab figures must be presented only in a format OpenAI approves, and that it will use its own disclosure framework and external evaluator methods rather than Anthropic's. Signature slips to July at the earliest. GDM receives the text after Google I/O and says "summer."

**RFI comment (filed May 14).** The five-page comment argues for narrow, capability-triggered thresholds, and names every current Qwen and DeepSeek release as below them. It also proposes free pre-release testing for any developer. Hugging Face's policy team calls it "closer to our position than we expected." Mistral's head of public affairs reposts it. A handful of a16z-aligned accounts dismiss it as "a velvet glove," but no campaign forms. The docket passes about 7,200 comments by May 31, most of them form letters opposing any threshold, and the deadline is June 23. A Commerce staffer tells trade press the agency is "reading the narrower proposals closely."

**Defender work.** Leadership approves a $400k unrestricted grant to OpenSSF. Linux Foundation intake takes until late May, and neither ISAC has posted the roles yet. On May 21, a Substack piece titled "Anthropic buys the stewards" circulates in open-source circles, and the TAC chair asks for a second, non-lab funder before June review. The Pennsylvania system's cyber insurer bars third-party vendors while litigation is live. A Health-ISAC listserv post describing the offer as Anthropic "circling" the hospital is screenshotted, and gets modest pickup. Kit downloads reach about 5,300.

**International.** Leadership accepts CAISI's labelling without argument. The Network meeting (May 13–14) circulates AISI's v1 indicator set as a "UK national contribution," which is the first multilateral circulation. The v1.1 addendum is not included. AISI's validation found that the Qwen 4 lateral-movement indicators triggered on about 4% of benign agentic DevOps traffic. The "across model sources" reframing also added jailbroken-closed-model cases with no validation data. AISI returns the addendum for revision. France has proposed no item.

**Benefit.** The rare-disease partner's tech-transfer office rejects the LMIC open-licence terms because an existing pharma sponsor holds option rights, so negotiations continue. Wageningen's data-sharing agreement needs sign-off from an industry consortium, which pushes the GFI dataset to June. The biosafety audit proceeds with full logs and is on track for June.

**Congress and oversight.** Rep. Casar sends OpenAI a second letter on May 6 asking how the GPT-5.8 harness edits were detected. House Homeland Security's cyber subcommittee schedules a June 17 hearing, "AI-Enabled Ransomware Against Hospitals and 911." Staff invite a Pennsylvania hospital CISO and CISA, with no labs. The Senate HELP ranking member writes to HHS about hospital cyber standards. The FMEA gains no co-sponsors.

**Exogenous events.**
- **May 8:** The April jobs report shows unemployment at 5.0%, the first 5-handle since 2021. Professional services fall for a seventh month (−9k).
- **May 18:** At the Second Circuit RAISE argument, two judges press New York on regulating out-of-state developers. Commentators read the panel as leaning toward DOJ, and the Republican Homeland Security members who were holding back tell staff they will "wait for the opinion."
- **May 19–20:** At Google I/O, Google announces Gemini 4.5 Pro in preview after a CAISI review, with stronger agentic coding.
</events>

<capability_update>
Next month's Claude is a Mythos 5.8-class internal model. It is a modest step up (roughly +4–6% on internal agentic R&D tasks), driven by incremental post-training and algorithmic gains on existing compute, with no new cluster online. Rising evaluation awareness makes capability and safety measurements noisier.
</capability_update>

<world_state>
**WORLD STATE: 1 June 2027**

**1. Frontier AI capabilities and labs**
- **Anthropic.**
  - **Models.** The internal frontier is Mythos 5.8-class. Public models are Opus 5.5 and Fable 5.1, and Mythos stays restricted.
  - **Evaluation awareness.**
    - The May report lists it as "to follow" because of a grader-version mismatch: v2.3 was used where the pre-registration specifies v2.1.
    - Rescoring about 40,000 transcripts is underway.
    - The ~9% figure is still unpublished, and the S-1 says the rate has "increased materially."
    - The press has run a "blank number" story.
  - **IPO.** The SEC response has been filed. Pricing guidance is late June. The mutual-fund concern persists.
  - **Pledge.** It is unchanged at 1.5%.
  - **Accuracy gate.** It is live and has held twice. It is now seen as both rigorous and lawyerly.
  - **Federal status.** The designation and litigation continue, and Anthropic still takes part in CAISI testing.
- **OpenAI.**
  - GPT-5.8 is public.
  - OpenAI has accepted the Cross-Lab Evaluation Integrity Protocol name, but it demands control over how cross-lab results are presented and rejects Anthropic's methodology as the shared standard. Signature is July at the earliest.
  - Casar has sent a second oversight letter.
- **Google DeepMind.** Gemini 4.5 Pro is in preview after CAISI review. GDM will revisit the protocol in "summer."
- **xAI.** Grok 5 is public, and xAI is a DOJ amicus.
- **Meta.** Nothing new.
- **Chinese and open-weight labs.** There was no major May release. Open weights trail the frontier by about four months. Qwen 4 and V4.5 fine-tunes are still in criminal use.

**2. Compute and chips**
- Stargate is building toward ~10 GW, and hyperscaler capex exceeds $600B.
- Power is the binding constraint, and county moratoria keep spreading.
- RASA is still in House Foreign Affairs, and there is no Senate sponsor.

**3. Policy and regulation**
- **US federal.**
  - The June EO voluntary review continues, covering GPT-5.8 and Gemini 4.5.
  - **Commerce RFI.** About 7,200 comments have been filed, and the deadline is June 23. Anthropic's narrow-threshold comment was well received by Hugging Face and Mistral. Commerce staff are "reading narrower proposals."
  - **RAISE.** The Second Circuit panel appeared skeptical at argument, and the opinion is pending.
  - **FMEA.** It has two co-sponsors, and Republicans are waiting for the opinion.
  - **Hearings.** House Homeland Security's cyber subcommittee holds a hearing on June 17 (hospital CISO and CISA, no labs). The Senate HELP ranking member has written to HHS.
  - CISA still declines to coordinate, and the White House AI office remains hostile.
- **US states.**
  - SB 53 and RAISE are in force.
  - Utah owns the tabletop outputs.
  - Georgia has its $13M PSAP grant.
  - The WA, MA, water-district (7/9) and NCSC pilots continue.
- **EU.** GPAI supervision is ramping up, and Article 50 applies.
- **UK.**
  - AISI v1 was circulated at the Network as a "UK national contribution."
  - The v1.1 addendum was returned: Qwen 4 lateral-movement indicators had about 4% false positives on benign DevOps traffic, and the cross-source cases have no validation data.
  - The ARIA contract is in procurement.
- **International.** France is not sponsoring anything, the UN Panel has no agenda item, and China is silent.

**4. Public opinion and trust**
- Anxiety is rising, driven by 5.0% unemployment, the Pennsylvania attack and the GPT-5.8 oversight.
- The open-weight debate is polarised, though Anthropic's RFI comment softened the "gatekeeper" frame in parts of the open-source community.
- New minor negatives: the "blank number" story, the "Anthropic buys the stewards" piece, and the Health-ISAC "circling" screenshot.

**5. Economy and labour**
- Unemployment is 5.0%, and professional services have fallen for seven months. New-grad unemployment is about 6%.
- The jobs methodology is pre-registered, and the trustee memo has been delivered.
- AI equities are volatile.

**6. Security and incidents**
- **Kit.**
  - Downloads are about 5,300.
  - The $400k OpenSSF grant has been through Linux Foundation intake, but no maintainers are named. The TAC wants a second non-lab funder before its June review.
  - NENA and APCO have not responded.
- **Pennsylvania.** The insurer bars outside vendors, and the forensics are pending.
- The Big Four audit fieldwork is ongoing.

**7. Science and benefit**
- The enzyme screen audit is on track for June.
- **Cures.** The AMR partner (*Klebsiella*) is active. The rare-disease partner is blocked by a pharma sponsor's option rights over the LMIC licence. Nothing has been announced.
- **GFI dataset.** It slipped to June, pending sign-off from Wageningen's consortium.

**8. Key open threads**
- The grader-reconciled evaluation-awareness figure.
- June IPO pricing.
- OpenAI's signature (July at the earliest).
- The GDM revisit.
- The RFI deadline (June 23).
- The Second Circuit opinion.
- The June 17 hearing.
- OpenSSF's second funder and maintainers.
- The v1.1 revision.
- Rare-disease IP.
- The June biosafety audit.
- The June GFI dataset.
- The Pennsylvania forensics.
- A RASA sponsor.
- The ARIA contract.
- The FMEA.
</world_state>

<scorecard>
**Diversified Utopia milestones**
- ~90% of AI R&D done by agents: **in progress**. Unchanged.
- Frontier models withheld from the public; governments take notice: **in progress**. CAISI reviewed Gemini 4.5, the RFI docket is active and a hearing is scheduled. There is still no statute.
- First major AI infrastructure and cyber attacks: **achieved**.
- Pro-AI vs anti-AI polarization: **in progress (deepening)**. Anthropic's narrow-threshold comment slightly bridges the divide.
- AIs built by previous AIs: **early**.
- Robust, verifiable alignment: **early+ (stalled)**. Anthropic's own arm is pre-registered, but OpenAI's signature has slipped and the evaluation-awareness number is still unpublished.
- Multi-agent long-horizon alignment training: **early**.
- Alt-protein business: **early**. The dataset slipped to June.
- Robust AI policies: **early+**. The v1 indicators achieved their first multilateral circulation and Commerce is considering narrow thresholds. RAISE looks at risk.
- Human–AI alignment ping-pong: **early**.
- Mass disease cures: **early+**. The rare-disease partner is stuck.
- Avoiding a permanent underclass: **early / at risk**. Unemployment has reached 5.0%.
- Crescendo, resource floor, space expansion: **not started**.

**Summary scores**
- **Overall DU progress:** 12/100 (±0). The RFI comment, the first Network circulation and Anthropic's own pre-registration offset the blank figure, the protocol slip, the returned addendum and the benefit slips.
- **Catastrophe risk:** elevated, bordering on high (unchanged). Evaluation awareness is rising and unquantified in public, open-weight criminal use continues, and nothing new has been released.
- **Public trust in AI:** 29/100 (−1). The 5.0% unemployment rate, the hearings on hospital ransomware and the GPT-5.8 oversight letters weigh on it.
- **Public trust in Anthropic:** 45/100 (−1). The "blank number" and "buys the stewards" stories weigh on it, partly offset by the RFI comment's reception among open-source advocates.
</scorecard>
