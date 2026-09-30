<research_summary>
The search index stops at 30 September 2026, so these threats extrapolate from pre-game evidence plus the world state.

**Buist lawsuit.** *Buist v. Anthropic* (N.D. Cal., filed 18 September 2026) treats Amodei's public statements on pacing as the "offer" and rival executives' replies as "acceptance." That makes any public Anthropic document read at a multi-lab forum the kind of evidence the plaintiffs want, and this month Anthropic presents at the FMF on 16 September and publishes a pacing-style paper. Its counsel said it is "reviewing" that paper.

**METR.** METR takes no payment from labs for assessments that identify a company, and it declines lab donations. So the player's "Anthropic-funded capped indemnity" offer to close METR's indemnity redline could itself breach METR's independence norms. In that case METR delays or refuses, and the fallback goes to AISI.

**NCC Group.** Its published AI red-team research says most high-impact AI risks sit in the architecture around the model, not in content filters. An honest report on KYC and consumer routing will therefore likely contain severe findings. Publishing it unedited invites a second round of news stories.

**Other risks this month.** Checkpoints 2–3 of the 1e28 run, a likely pre-publication slip from Redwood, GDM's ungated run nearing completion, and a September jobs report during a jobs-anxiety window.
</research_summary>

<threats>
1. [Buist plaintiffs seize the FMF presentation] Target: Action 5 (and 3). Plaintiffs' counsel amends the complaint or serves a subpoena for FMF session materials. They cite the 16 September presentation of Anthropic's thresholds to competitors, plus Microsoft's and GDM's "revisit after the session" replies, as evidence of a meeting of minds. The "lab → government" framing doesn't help, because the forum is still lab-to-lab. Microsoft's lawyer had already asked whether FMF minutes can be discovered. Microsoft or GDM counsel then advise their teams not to engage on thresholds until the motion to dismiss is decided, which freezes the 31 October Microsoft offer.
   Why it is plausible: the complaint is built entirely on public statements and treats public essays as offer and acceptance. The plaintiffs are already reviewing the August paper.
   Sources: https://thenextweb.com/news/buist-v-anthropic-antitrust-waiver-evidence-public-agreement ; https://casrai.org/news/ai-slowdown-antitrust-lawsuit-sherman-act ; https://thehill.com/policy/technology/6099571-lawsuit-accuses-anthropic-openai-spacexai-google-of-ai-pacing-collusion/
   Suggested likelihood: 35%. Severity: moderate.

2. [METR rejects funded indemnity; confirmations slip] Target: Action 1. METR refuses the Anthropic-funded indemnity on independence grounds, since it declines lab money. Redwood's confirmation of checkpoint 1 slips past 20 September because of its internal review, or it arrives with caveats, for example "consistent with, but unable to verify probe custody." AISI's use as the fallback confirmer needs DSIT or HMG approval and can't finish inside the month. The Q3 readout then ships with at most one hedged outside confirmation. Separately, the eval-awareness trend flag triggers at checkpoint 3, on reading drift from 12.4% toward the mid-teens. The added honeypot set costs about a week, and some specialist press reports it as "Anthropic's model increasingly knows it's being tested."
   Why it is plausible: METR's stated funding policy, the base rate of slips in the months-long METR contracting, and eval-awareness rising with scale in earlier system cards (11–15%).
   Sources: https://metr.org/risk-assessment/ ; https://casrai.org/guides/what-is-metr ; https://www.digitalapplied.com/blog/frontier-lab-independent-evaluation-arrangements-compared
   Suggested likelihood: 50%. Severity: moderate.

3. [NCC report creates a second news cycle] Target: Action 2. The unedited executive summary includes at least one high-severity finding on KYC or routing architecture, such as account-level evasion of Mythos-tier routing through API orchestration. Wired or The Verge frame it as "Anthropic's own auditor finds…". Sending the full report to the NY DFS and California AG offices gives the regulators a formal document to act on. DFS could cite it in its pending guidance, and Public Citizen's "assess the report" turns into a renewed call to suspend the tier. The dashboard's first edition, which shows three novel escapes, feeds the same story.
   Why it is plausible: NCC's published research says architecture flaws, not the models, are the main source of high-severity AI risk. External red-teams almost always report severe findings, and DFS guidance is pending.
   Sources: https://www.nccgroup.com/research/analyzing-secure-ai-architectures/ ; https://www.nccgroup.com/research/analyzing-secure-ai-design-principles/
   Suggested likelihood: 40%. Severity: moderate.

4. [GDM finishes an ungated 1e28 run, and the race resumes] Target: world and Action 5. GDM finishes its ungated run in late September or October and signals a Gemini 4.5/5 preview. OpenAI responds with reports of a GPT-6.5 schedule. Coverage presents Anthropic's gates as a competitive handicap. Kerrisdale revives its margin thesis, and gating "subsequent runs" is pushed to the vague future. With 40 months left, investors ask whether the next gate trip will cost Anthropic the frontier.
   Why it is plausible: DeepMind has said Gemini 4 will come "as soon as possible," GDM has declined three times, and the world state has the run finishing in the autumn.
   Sources: https://pasqualepillitteri.it/en/news/18157/gemini-4-release-as-soon-as-possible-deepmind ; https://thezvi.wordpress.com/2026/09/14/we-must-pace-the-frontier/
   Suggested likelihood: 35% in-month. Severity: moderate.

5. [The London workshop becomes a political target] Target: Action 4. Administration-aligned commentators, echoing the "regulatory capture in a lab coat" line and the "AI safety is a hoax" stance, attack the London workshop, where US labs design a "common eval protocol" alongside foreign governments. They call it a back door to foreign regulation. Separately, Chinese state media, recycling the CCTV-affiliated critique, dismiss the empty seat as proof of Western exclusion. At the same time, Shanghai AI Lab's approval is refused or goes unanswered. The output document gets few adopters beyond the attendees.
   Why it is plausible: there is already an adversarial White House and a16z response to the pacing paper, the September 2026 CCTV-account attack, and Tsinghua and Shanghai's silence and approval delays.
   Sources: https://legalinsurrection.com/2026/09/lawsuit-alleges-anthropic-openai-spacexai-and-google-made-illegal-agreement-for-ai-pacing/ ; https://www.lesswrong.com/posts/iWPDPWAPCGiSMiFA2/we-must-pace-the-frontier
   Suggested likelihood: 30%. Severity: minor to moderate.
</threats>

<setup_fix>
none (the frozen-web and canon-sheet issues I filed earlier still apply, especially whether Buist has been dismissed or amended by September 2027).
</setup_fix>
