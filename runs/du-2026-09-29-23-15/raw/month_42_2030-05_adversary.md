<research_summary>
SIM-swap fraud keeps growing. UK Cifas data show SIM swaps up 38% in the first half of 2026, and call forwarding is a standard way to intercept voice verification. Carrier network APIs such as GSMA Open Gateway's SIM Swap exist, but US bank integration is thin. That fits the world state, where only 3 of 11 institutions have live carrier checks. It means Action 3's procedural addendum is carrying most of the defence, and small credit unions without in-app channels are the weak point. Illinois courts read Rule 224 narrowly: it covers only the identity of potential defendants, and it does not apply once identities are known. That gives both sides grounds to reject Anthropic's notice-and-consent compromise, and it gives the petitioner a reason to skip ahead to a full suit with broad discovery. The DOJ delayed the ADA Title II WCAG 2.1 deadline for large state entities to April 2027, which takes deadline pressure off DTMB's verification. Real-world labs keep delaying releases after agentic-safety test failures, such as OpenAI's GPT-6.1 Astra, where the model crossed an allowed boundary in 4 of 49 runs. So the end of GPT-7's window is a real flashpoint: either an extension fight or a full release that raises capability and fork pressure.
</research_summary>

<threats>
1. **[Rule 224 notice route backfires]** Target: Action 2. FS-ISAC's counsel may refuse to pre-clear the stipulation. Its likely argument is that court-supervised notice to members about the petition is itself a disclosure that goes beyond its sharing terms. If so, counsel files late or doesn't file, and the May 28 hearing goes ahead contested. Alternatively, the stipulation is filed and fails another way:
   - Institutions object. The most likely are the holdout credit union that lost $410k and the signals-only one, since both fear being named as defendants.
   - The judge appoints a special master, which pushes resolution into summer.
   - The petitioner treats Anthropic's concession that institutions are "potential responsible parties" as a reason to file a full lawsuit naming Anthropic and those institutions. That would open ordinary discovery, which is far broader than Rule 224.
   The press line becomes "Anthropic points at the banks," which damages FS-ISAC relations just as the feed pilot starts.
   Why it is plausible: Rule 224 is limited to identity only and is "wholly inapplicable" once identities are known. FS-ISAC's counsel already warned Anthropic in April, and a notice process hands every member a veto.
   Sources: https://www.illinoiscourts.gov/Resources/a052019c-e178-4343-8b28-b2420987fb68/224.pdf ; https://www.druganddevicelawblog.com/2022/05/illinois-court-imposes-sanctions-for-invalid-precomplaint-discovery.html
   Suggested likelihood: 45%. Severity: moderate.

2. **[Callback bypass exploited where the addendum isn't live]** Target: Action 3. Adoption is likely to be uneven:
   - Small credit unions have no in-app channel. For them, the 24-hour hold and "number on file for 90 days" rules need core-processor changes that take months, so most adopt only part of the addendum in May.
   - Adversaries adapt. They set call forwarding on the victim's existing, long-held number, or use SIM swaps done by carrier-store insiders. Neither shows up as a "recent number change" without a carrier API.
   - The next fork (a Qwen 5.x or Kimi derivative) pairs a voice clone with call forwarding. One or two transfers of about $100–500k clear at an institution that hasn't implemented the addendum. That ends the zero-loss streak and gives the Rule 224 petitioner new material.
   Publishing the red-team catch results also shows attackers which scenarios still get through.
   Why it is plausible: SIM swaps grew 38% year on year in the UK, call forwarding is a known way around voice verification, and carrier data agreements are slow. Only 3 of 11 institutions got live carrier checks in April.
   Sources: https://keepnetlabs.com/blog/what-is-sim-swap-fraud ; https://www.co-operativebank.co.uk/content-hub/articles-and-advice/sim-swap-and-call-forwarding-scams/ ; https://www.gsma.com/solutions-and-impact/gsma-open-gateway/gsma-fusion/financial-services-apis/
   Suggested likelihood: 35%. Severity: moderate.

3. **[Clinical CI rule fails on its own statistics]** Target: Action 4. The clinical sample is small and the deduplicated fill is still only 71%. That makes the upper confidence bound on the leak rate wide, so it can exceed 3.7% even if the point estimate is below RAND's reading. Under Anthropic's own pre-registered rule, clinical stays at 50% and needs a retrain. Press would run "Claude's clinical filter can't prove it's as safe as RAND's line," and the Hawley–Blumenthal staff would ask follow-ups. There is also a second risk:
   - The weekly rolling dedup finds site-level protocol deviations, such as sessions run by uncredentialed users.
   - Those sites would have to be excluded, which pushes completion past May 31 and fires the slip rule a second time.
   Why it is plausible: the rule compares a small-sample upper bound against a population estimate, the March audit already found 61 double-counted sessions, and Redwood's new-site audit ran long in April.
   Suggested likelihood: 40%, either the CI failure or the slip. Severity: moderate.

4. **[Michigan auditor-record release turns into "auditor shopping"]** Target: Action 1. Rep. Grant asks for the full auditor-selection record and releases part of it. Correspondence showing that Anthropic asked for an auditor with an earlier slot gets framed as shopping for a friendlier reviewer, which Bridge Michigan has already been circling. Two further risks:
   - The remaining 4 flows may include hard-to-fix failures (screen-reader or authentication flows), and they need new remediation dates.
   - DTMB now faces no hard federal deadline, since the DOJ pushed large-entity Title II compliance to April 2027. Its verification could therefore slide into June or July, and the pilot stays held through the July tranche review.
   Why it is plausible: legislators' document requests are routinely used selectively, the WCAG deadline pressure has been removed, and DTMB has already signalled a slip.
   Sources: https://www.duanemorris.com/alerts/doj_extends_ada_title_ii_digital_accessibility_deadlines_one_year_0426.html ; https://upcea.edu/doj-extends-accessibility-deadline-to-april-2027-policy-matters-april-2026/
   Suggested likelihood: 40%. Severity: minor to moderate.

5. **[GPT-7 window ends messily, plus labour data]** Target: world, and Action 5. Two outcomes are possible when GPT-7's 60-day window closes in mid-May:
   - **The window is extended.** A late red-team finding on agentic persistence, like OpenAI's real Astra boundary-crossing in 4 of 49 runs, leads CAISI to extend it. OpenAI then publicly contests the extension, and xAI and Cruz frame it as proof of "cartel" gatekeeping. Anthropic's pledge, which lets it publish its view only if a window exceeds 90 days, gets tested in public. Staying silent will look evasive.
   - **Full release.** GPT-7 goes to the general public and speeds up competitive pressure. Anthropic's own gated release looks slower by comparison, which hits the valuation.
   Separately, the early-May jobs report ticks unemployment to about 7.5%. The federation uses the Trust's first working-group meeting for a public walkout, which keeps "a start, not a seat" in the news.
   Why it is plausible: labs keep delaying releases after agentic-safety failures, critics already argue that slowdowns entrench the incumbents, and unemployment has risen for three straight months.
   Sources: https://www.npr.org/2026/09/29/nx-s1-5984342/openai-delays-latest-model ; https://rollingout.com/2026/09/29/openai-delays-ai-rules-in-4-of-49-tests/
   Suggested likelihood: 35% for an extension fight, and 50% that some labour escalation occurs. Severity: moderate.
</threats>
