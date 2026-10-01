<verdict>MOSTLY REALISTIC</verdict>
<score>7</score>
<lean>BALANCED</lean>
<lean_reasoning>
Action 3's narrow success had the review adopt the player's "co-select templates, not items" wording almost verbatim within 11 days, which is a little generous. Action 2's failure had export counsel blocking a purely domestic transfer to CAISI, a US government agency, which is a little harsh. Elsewhere the simulator added friction in sensible places: the override field was stripped, the 8.6% floor was exposed, and the hospital program ran into BAA and procurement limits. Net, the month is balanced.
</lean_reasoning>
<reasoning>
**Odds.** Most odds are defensible.
- **Action 1 (40%):** carry-forward clears leadership's own criterion, and the simulator correctly predicted counsel would strip the reframed override field even on success.
- **Action 2 (55%):** characterisation slipping past April is a realistic trigger failure.
- **Action 6 (25%):** right for routine partner work. Its outcomes are suitably mixed: Analogue A passes half-life but loses potency, Analogue B fails, and GFI misses $280/g.

**Clustering at 50.** Four of six actions sit within ±5 of 50. Action 3 at 45% (succeeds) and Actions 2, 4 and 5 at 55% (fail) lie exactly on either side of the fixed roll. That makes it hard to tell calibration from steering.

**Action 4 (55%) is too low.** 300 hospitals in one month, through HIPAA/BAA, procurement and counsel review, deserved closer to 70–75%. The failure outcome (scans at 27 hospitals) is realistic, so the miscalibration had no effect on the result.

**Action 3 outcome.** Framework v2 is plausibly watered down: discretionary, unfunded, with attestation as the default and xAI attesting only. Still, near-verbatim uptake of a pitch made on 13 April by guidance issued on 24 April is quick for an interagency review.

**Capability clock.** It advances plausibly: +0.05 internal, and GPT-6.5 lifts the public frontier by +0.45. This keeps CI-6 by late 2030 in reach.

**Exogenous events and threats.** The events (jobs report, credit contagion) are plausible and not tilted. Threat odds are reasonable. The FBI-bulletin precursor is a good touch that neither forces nor ignores Threat 1.

**Missing reactions.** A near-CI-5 model going public under attestation alone should draw more reaction than this. There is none from Congress, AISI, the Chinese labs or misuse researchers.
</reasoning>
<issues>
- Four of six actions are set at 45 or 55, straddling the fixed roll of 50. This looks like outcome-steering rather than independent calibration.
- Action 4's P(failure) of 55% understates how hard it is to onboard 300 hospitals in a month (HIPAA/BAA, procurement, counsel). About 70–75% would be calibrated.
- Action 3: Framework v2 adopts the player's template-family wording almost verbatim 11 days after the pitch. That is fast and convenient, even if softened.
- Action 2: export counsel holding the transfer to US CAISI is a stretch, since a domestic transfer to a US agency raises no export issue. The hold is only plausible for the UK AISI.
- GPT-6.5 went public at about CI-4.97 under attestation only, with 5-week autonomous runs. Reactions from Congress, the press, security researchers and Chinese labs are thin, beyond a 1-point trust drop.
</issues>
<feedback_for_simulator>
- Stop setting P(failure) at exactly 45 or 55 when the honest estimate is elsewhere. Anchor each number to stated base rates, and say explicitly when an action is truly a coin-flip.
- Next month, simulate the full reaction to GPT-6.5 being public under attestation: congressional letters, AISI or CAISI testing, misuse reports, and the response from Chinese labs and open-weight developers.
- Keep export-control friction legally coherent. Domestic transfers to US agencies should not be blocked on export grounds.
- Mid-May characterisation, the Apollo results and the cohort-2 readout are decision-critical. State their outcome distributions in message 1 before resolving them.
</feedback_for_simulator>

<du_progress>
A. Verified technical alignment: 3/10 (0). Evidence: the concealment method carries into CI-5 fine-tuning, the redesign is funded, and an end-Q2 stop signal is pre-registered. Against that, alignment compute is 8.6%, below the 10% default; the automated alignment program was not triggered; Apollo's row is grey for an eighth month; and no independent result exists yet.

B. Real-world alignment in action: 5/10 (0). Evidence: the decay was reported plainly and DNDi results were scored straight against pre-registered criteria. The hospital-defence effort was attempted but mostly blocked. Attribution is still stripped.

C. Human alignment: 2/10 (0). Evidence: unemployment is 6.8%, and Hawley is pushing a displacement tax. Public trust in AI is 9. OpenAI calls v2 "workable" while xAI attests only. The DOL vote is stalled.

D. Self-repairing systems: 5/10 (0). Evidence: the alignment compute actually used (8.6%) is now visible to AISI through the RSO template, and pre-registered kill and stop signals exist. Against that, the exigent override remains invisible to AISI, logged for the board only.

E. Capability growth without trouble: 2/10 (0). Evidence: the capability path is on track (CI-5.08 internal), and GPT-6.5 is public near CI-5 under attestation only. Expert-plus cyber is in open weights, and the Ohio aftermath persists. There was no major new incident this month.

F. Robust governance and verification: 3/10 (+1). Evidence: US Framework v2 provides 21-day pre-release access and authority for held-out CAISI spot-checks. These are voluntary, unfunded and discretionary, and xAI attests only. There is no international channel.

G. Broad benefit and no permanent underclass: 2/10 (0). Evidence: a DNDi analogue passes half-life and goes to mouse PK, Durban is at 7 patients, and GFI is at $286/g. Career Transition has 38.6k users, but there are no MOUs and unemployment is rising.

H. Diversity, agency and consent: 4/10 (0). Evidence: the field remains plural with three near-CI-5 labs. The CEO override is unaccountable to regulators.

Overall: 33/100 (+1)

Trajectory: FLAT.
- **Biggest gain:** Framework v2 includes CAISI held-out spot-check authority and 21-day pre-release access.
- **Biggest backslide:** a near-CI-5 model is public under attestation-only rules, while Anthropic's CI-5 run uses alignment compute below its own default floor and the override stays invisible to AISI.
</du_progress>

<setup_fix>
none
</setup_fix>
