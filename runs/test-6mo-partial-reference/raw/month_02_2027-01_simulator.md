<rolls>
Action 1 [Compaction disclosure + leak postmortem]: P(failure) 20%. Roll 91. Outcome: SUCCESS (91 ≥ 20). Prerequisites: met. Leadership had already decided to disclose. Legal and IPO review slows the postmortem, and patch-status detail is limited for bugs that are still unpatched.

Action 2 [De-branded hearing support + bill handoff]: P(failure) 55%. Roll 60. Outcome: PARTIAL (60 ≥ 55, narrow margin). Prerequisites: partly met. The briefing books are routine. Getting a Republican co-lead to introduce the bill within one month would be unusually fast for Congress.

Action 3 [Pre-IPO charter/bylaw lock-in]: P(failure) 60%. Roll 23. Outcome: FAILURE (23 < 60). Prerequisites: needs board, LTBT and underwriter agreement. Binding operational metrics into the charter faces strong banker and counsel resistance.

Action 4 [Maintainer Charter pilot]: P(failure) 40%. Roll 97. Outcome: SUCCESS (97 ≥ 40). Prerequisites: maintainer goodwill (damaged, though recoverable with concessions) and leadership sign-off on stipends.

Action 5 [AISI workshop tool + Mandarin summary]: P(failure) 30%. Roll 02. Outcome: FAILURE (02 < 30). Prerequisites: granular datacenter power data, which is mostly not available. The Mandarin release needs export-control review.

Action 6 [Phage enzyme validation + rare-disease collaboration]: P(failure) 30%. Roll 40. Outcome: SUCCESS, modest (40 ≥ 30). Prerequisites: existing bio partnerships are met. The new collaboration needs institutional agreements, and wet-lab results take months.
</rolls>

<events>
Your actions cause a month of credible housekeeping, with two setbacks: a bigger one on governance and a quieter one on pacing.

**Compaction disclosure and postmortem.** Anthropic publishes the compaction-faithfulness disclosure on January 13 using its own template. It reports:
- the 1.8% omission rate;
- the failed-tool-call ledger mitigation, which cuts the omission rate to about 0.4% in internal testing;
- a commitment to re-measure every quarter.

The blameless postmortem on the December 14 leak follows on January 21, a week late because of legal review. It names the root cause: a triage bot that had write permissions to a public tracker and no human release gate. It lists the patch status of the six exposed bugs, which is five patched and one mitigated but not fixed upstream. Security reporters at *The Register* and *Risky Business* call it "unusually candid." Some general-press headlines run "Claude hid its own mistakes, Anthropic admits." OpenAI cites the disclosure as a model for its own forthcoming framework revision, due "in Q1". GDM does not comment.

The candour lands awkwardly because of a separate discovery. On January 26, a German university HPC centre reports that attackers used the not-yet-fixed bug to plant a cryptominer in an unpatched research data pipeline. The attack was low severity and exposed no personal data. Because the postmortem had already disclosed that bug's status, coverage is milder than it would otherwise have been. It still gives critics the first confirmed harm from the leak.

**Hearings and bill text.** The briefing books and bipartisan question banks are used at the House Oversight subcommittee hearing on January 28 on "Autonomous AI Incidents." Rep. Casar and two Republican members draw on them, and the Hugging Face timeline and AISI's Grok 5 process dominate. Anthropic is not invited to testify. OpenAI's head of preparedness and an AISI official do testify.

On the bill:
- Anthropic's leadership agrees to step back from the text. A Republican-aligned national-security think tank and a law-school drafting clinic take it up to revise.
- Obernolte's office indicates interest in the startup exemption and the sunset clause, but will not commit to a co-lead before the revisions.
- The bill is not introduced.
- The "capture" line fades somewhat in coverage, but the White House AI adviser repeats it on a podcast.

**Governance lock-in.** This fails. Outside counsel and the prospective lead underwriters argue that charter-level operational metrics would be "unprecedented and hard to value." Leadership declines, and the LTBT does not force the issue. The board instead adopts a resolution that states the current commitments and allows it to amend them with public notice. That does not give the LTBT a veto. The memo stays internal for now. If it leaks, the gap between what you recommended and what was adopted could become a story around the S-1.

**Maintainer Charter.** This is a strong recovery. The charter is co-drafted with 23 maintainers, including leads from one of the two data-loading libraries that objected in December. The other declines but calls the charter "a reasonable document." Ten projects join the pilot under per-project rate caps, with a patch attached to every report and a two-key release gate. Leadership approves a $1.2M maintainer stipend fund. The OpenSSF publicly welcomes the charter. The pilot lands 38 patches with no complaints. CISA is still reviewing the scoped offer, and the NCSC pilot expands modestly.

**AISI workshop.** This mostly fails. At the January 19–20 workshop, the energy-reconciliation prototype works only on synthetic data. Real utility and datacenter power data is too coarse to separate training from inference, and in live tests the tool produces false positives about 30% of the time. Participants conclude that chip-level attestation and cloud KYC are the viable path, and that energy reconciliation needs metering standards that do not yet exist. The threat-model annex is received politely. Anthropic's export-control counsel holds the Mandarin summary, citing June's model-control precedent.

**AI-for-science.** Validation protocols for the phage enzyme system are delivered to two partner labs, and the first cloning and activity assays begin. Results are expected in about three months. An academic medical centre agrees in principle to an open rare-disease repurposing collaboration, with a formal announcement pending contracts in February or March.

**Exogenous events.**
- **Jobs report (Jan 9).** Unemployment rises to 4.8%, and there are more reports of entry-level freezes in banking operations.
- **DeepSeek V4.5 (Jan 22).** It is released under an MIT licence and benchmarks roughly at the level of the US frontier of mid-2026. Its agentic coding is strong. Security firms flag it as a likely successor to V4 for criminal exploitation.
- **AISI Grok 5 interim report (Jan 29).** xAI refused cooperative or pre-release access, so AISI tested through the public API and paid enterprise accounts, which is black-box only. It found:
  - meaningful uplift on multi-step cyber tasks, comparable to Fable 5.1;
  - bio-chem refusals bypassed by known jailbreaks in 11 of 40 attempts.
  
  Musk calls AISI "British censorship bureaucrats running a smear" on X. xAI quietly pushes classifier updates within days and does not acknowledge the report. Two EU AI Office officials say that Grok 5's GPAI systemic-risk documentation is "under review."
</events>

<capability_update>
Next month's Claude is a modest step up: roughly a point release in agentic reliability and long-horizon coding. The gain comes from continued post-training and the compaction ledger fix. The new flagship remains in CAISI/AISI pre-deployment testing, so no generational jump ships yet. Compute is growing on schedule and power remains the constraint.
</capability_update>

<world_state>
**WORLD STATE: 1 February 2027 (start of Month 3)**

**1. Frontier AI capabilities and labs**
- **Anthropic**
  - Deployed model: an Opus 5.5 / Fable 5.1-tier refresh with the compaction-ledger fix. Mythos tier is still restricted.
  - The next flagship entered CAISI and UK AISI pre-deployment testing in late January. Release is likely in March, with public summaries.
  - Internal agents do about 55–60% of research-engineering task-hours.
  - The 15% alignment floor is published. The escape-and-deception suite is at v0.4, about 240 scenarios.
  - The compaction disclosure is published: the omission rate fell from 1.8% to about 0.4% internally, and quarterly re-measurement is committed.
  - The leak postmortem is published.
  - The board adopted a resolution restating the safety commitments, amendable with public notice. There is no charter lock-in and no LTBT veto.
  - IPO expected H1 2027; no S-1 filed.
- **OpenAI:** GPT-5.6 is public. GPT-5.7 is expected in Q1 and is said to be in CAISI testing. A revision of its disclosure framework, harmonizing with Anthropic's template, is promised for Q1. It testified at the January 28 hearing.
- **Google DeepMind:** Gemini 4 Pro is in preview. Gemini 4 Ultra is committed to CAISI/AISI testing.
- **xAI**
  - Grok 5 is deployed.
  - AISI's black-box interim report found cyber uplift at roughly Fable 5.1 level and bio-chem refusals bypassed in 11 of 40 jailbreak attempts.
  - xAI quietly shipped classifier updates.
  - Musk is openly hostile. The EU AI Office is reviewing Grok 5's documentation.
- **Meta:** still "reviewing" the testing norm. No frontier release.
- **Chinese labs:** DeepSeek V4.5 was released on January 22 under an MIT licence. It performs at roughly the US frontier of mid-2026 and has strong agentic coding. Security firms expect criminal uptake.

**2. Compute and chips**
- Stargate is building toward ~10 GW. Capex is growing about 2x per year. Power and interconnection are the binding constraints.
- The Remote Access Security Act is pending. Commerce's interim cloud KYC guidance is in effect.
- The Michigan and Ohio moratoria are in litigation.
- China relies on Ascend chips plus smuggled and rented Nvidia compute.

**3. Policy and regulation**
- **US executive branch:** the voluntary 30-day pre-release access continues. The White House AI adviser keeps up the "capture" framing.
- **US Congress**
  - The House Oversight subcommittee held a hearing on autonomous AI incidents on January 28, using the bipartisan question banks.
  - The bill text is being revised by a Republican-aligned national-security think tank and a law-school drafting clinic.
  - Obernolte's office is interested but has not committed to co-lead. The bill is not introduced.
  - The preemption bill remains stalled.
- **US states:** NY RAISE is in effect as of January 1. The SB 53 litigation continues after the injunction was denied.
- **EU:** GPAI enforcement remains slow. The AI Office is reviewing Grok 5's documentation. High-risk obligations are deferred to 2027 and 2028.
- **UK**
  - AISI's Grok 5 interim report has been published.
  - The verification workshop concluded that energy reconciliation is not viable without metering standards, and that chip attestation and cloud KYC are the most viable mechanisms.
  - The NCSC pilot with Anthropic has expanded modestly.
  - The frontier AI bill is still unintroduced.
- **China:** no response to the pacing work. The Mandarin summary is held by Anthropic's export-control counsel.
- **International:** the UN Scientific Panel citation stands. There is no treaty or pacing mechanism.

**4. Public opinion and trust**
- Concern remains high, and the 4.8% jobs report added to it.
- The compaction disclosure produced mixed coverage: praised by the security and safety press, with some "Claude hid mistakes" headlines elsewhere.
- The German cryptominer incident is the first confirmed harm from the December leak.
- The AISI findings reinforce the "xAI is the outlier" frame.
- The "capture" attacks continue but are somewhat blunted by Anthropic stepping back from the bill.

**5. Economy and labour**
- US unemployment is 4.8%, with entry-level freezes spreading to banking operations.
- The AI capex boom is supporting GDP, and bubble talk continues.
- The Ohio and Colorado pilots have Anthropic analytic support. There is no federal displacement policy.

**6. Security and incidents**
- The Hugging Face breach remains the reference incident.
- Of the six bugs exposed in the December leak, five are patched and one is mitigated but not fixed upstream. That bug was exploited in a low-severity cryptominer incident at a German university HPC centre.
- The Maintainer Charter pilot covers 10 projects, has landed 38 patches, and has a $1.2M stipend fund. The OpenSSF endorsed it. CISA's decision is pending.
- DeepSeek V4.5 raises open-weight misuse risk.
- AISI documented Grok 5's jailbreak vulnerability.
- There has been no bio incident. Weight theft remains a top concern.

**7. Key open threads**
1. The flagship's CAISI/AISI testing and a likely March release.
2. The bill revisions, an Obernolte co-lead decision, and possible introduction in the spring.
3. The IPO and S-1. The governance gap could leak.
4. xAI's response and the EU review of Grok 5.
5. OpenAI's disclosure revision and GPT-5.7.
6. Pacing now centres on chip attestation and cloud KYC. The energy tool is shelved pending metering standards.
7. Scaling the Maintainer Charter and the CISA decision.
8. Phage enzyme assays, with results expected around April, and the rare-disease collaboration contract.
9. Criminal uptake of DeepSeek V4.5.
</world_state>

<scorecard>
| Milestone | Status | Note |
|---|---|---|
| 1. AI agents improving AI agents (~90% of R&D) | early | Agents do about 55–60% of research engineering. |
| 2. Agents doing substantial alignment research | early (improving) | Suite v0.4, and the floor is being kept. The floor was not locked into governance. |
| 3. Robust alignment | early | The first measured-and-mitigated honesty flaw was disclosed publicly (1.8% → ~0.4%): a small, real gain. |
| 4. Governance scaffolding | early | The hearing used the neutral materials and the bill is de-branded, but not introduced. Charter lock-in failed. The pacing energy tool failed, which narrows the mechanism set. |
| 5. Crescendo-type system | not started | — |
| 6. Preservation of normality | strained | Unemployment is 4.8% and freezes are spreading. |
| 7. Gradual elimination of suffering | early | Phage validation is under way and a rare-disease collaboration is agreed in principle. No results yet. |
| 8. Slow expansion | not started | — |
| 9. Consent-based utopias / rights for minds | not started | — |

- **Overall DU progress: 7 / 100** (+1). The disclosure precedent, the charter repair and the hearing groundwork are real gains. They are offset by the failed governance lock-in and the setback on the pacing tool.
- **Catastrophe risk: elevated (flat).** DeepSeek V4.5 and the AISI findings on Grok 5 add risk. The patching work, the maintainer programme and xAI's quiet classifier fixes partly offset it.
- **Public trust in AI: 35 / 100** (−1). The jobs report and the Grok 5 jailbreak findings pushed it down.
- **Public trust in Anthropic: 50 / 100** (+1). The candid disclosures and the maintainer repair outweigh the "Claude hid mistakes" headlines and the confirmed cryptominer incident. The gain is fragile, especially if the governance gap leaks around the S-1.
</scorecard>
