<analysis>
**Capability clock.** Reaching CI-6 by December 2030 from CI-4.9 public needs about 0.055 CI per month over the next 20 months. Internal is at 5.2, which needs about 0.04 per month. Rubin is ramping and agents write more than 90% of lab code, so April should add about 0.05–0.06 publicly, putting the public frontier near CI-4.95. Google's reply to GPT-7 Agent is the likeliest driver of that increment. Anthropic's squeezed eval compute keeps its internal gain near the low end.

**Action 1 (board brief).** Writing and delivering the brief is easy. The real question is whether the board adopts conditions (a)–(c).
- The player framed the conditions as "before customer access," which the board can accept cheaply. So partial adoption is the modal outcome.
- Condition (a), 13 or more contractors, cannot be met by 9 April. The board will likely convert it into a target.
- Condition (c) contains wording that counsel struck last month. That risk sits in Threat 1 and is not double-counted here.

**Action 2 (Glasswing transcripts).**
- Enterprise security teams move slowly. January's review of synthetic traffic alone took about three weeks.
- Option (b), Anthropic-side redaction, or option (c), scaffold schemas, might get one partner to "agree in principle" by 25 April. Signed terms are less likely.
- Execution friction goes in the action's P(failure). An outright refusal of all three options, with schemas flagged as architecture-sensitive, is Threat 3.

**Action 3 (v4 pre-registration).** Filing with CAISI by 18 April is routine because the process already exists.
- Written pre-approval is not something the player controls. That belongs to Threat 4.
- A missing prerequisite remains: without raw transcripts from the two redacting partners, templating covers only one partner's scaffolding. The filing can go in, but its coverage claim will be qualified.

**Action 4 (hiring).** The three requisitions have been open for weeks, so a pipeline exists. Still, cleared or vetted security roles fill slowly. Getting two hires by 25 April is roughly a coin flip, somewhat against. Being Glasswing-ready by 10 May is harder still.

**Action 5 (Site 3).** Site 3 ran six sessions in March, so this is routine. The biosafety officer's availability is the usual failure mode.
- Note: Site 3 data is "reported, not pooled." These sessions do not move the n≥60 pooled count unless CAISI agrees to change that, so the player's framing overstates their value.

**Scheduled decisions (banded content odds, declared before rolling).**
- **9 April board.** Authorise a disclosure-basis request to CAISI now, with conditions deferred to pre-customer-access: 60% (resolved by the Threat 2 roll). Defer to May pending staffing and v4: 25%. Hold for the harness: 15%. If Threat 2 does not materialise, the Action 1 roll's margin decides between deferral and hold.
- **CAISI response to any formal request within April.** Acknowledgement with no decision: 60%. Formal letter restating the unchanged condition: 30%. Provisional acceptance: 10%, given two prior restatements and "validated before release." Resolved on the reversed digits of the Action 3 roll: 00–59 acknowledgement, 60–89 decline, 90–99 provisional.
- **Bank's Claude-Next request.** Still pending: 50%. Approved with conditions: 30%. Declined: 20%. Resolved on the reversed digits of the Action 5 roll: 00–49 pending, 50–79 approved, 80–99 declined.
- **Apollo SOW.** Signed in April for a mid-May start: 45%. Slips to June because of budget or Apollo's other commitments: 35%. Apollo declines, citing method concerns: 20%. Resolved on the reversed digits of the Action 2 roll: 00–44 signed, 45–79 slips, 80–99 declines.

**Competitor threads in April.**
- Enterprise uptake of GPT-7 Agent.
- Possible CAISI or Casar questions about OpenAI's "sandboxed handoffs" claim.
- Google's next move.
These will be chosen independently of how the rolls fall.
</analysis>

<action_odds>
Action 1 [Board brief with GA conditions]: P(failure) 45%. Reason: delivery is trivial, but the board is under stock and GPT-7 Agent pressure and already adopted option (b), so it will likely water the conditions down. Condition (a) cannot be staffed by 9 April. Success here means the conditions are minuted in some form.

Action 2 [Glasswing raw-transcript negotiation]: P(failure) 55%. Reason: the two partners already insisted on doing their own redaction, and partner contract review has historically taken three weeks or more. One partner agreeing in principle by 25 April is plausible; signed terms are less so. Outright refusal is modelled separately in Threat 3.

Action 3 [Harness v4 pre-registration]: P(failure) 25%. Reason: the filing channel with CAISI is established and Opus 6 generation is a known pipeline. The main risks are drafting slippage and templating that covers only the one side-letter partner. Written pre-approval is outside this action (Threat 4).

Action 4 [Contractor hiring sprint]: P(failure) 55%. Reason: an existing pipeline helps, but vetted security roles typically take months to fill, and Glasswing vetting adds more time. Two hires by 25 April is slightly less likely than not.

Action 5 [Bio Site 3 sessions]: P(failure) 20%. Reason: this is routine continuation at a site that ran six sessions in March. The failure modes are officer availability, no-shows and protocol deviations. Site 3 remains unpooled, so success does not advance the n≥60 count.
</action_odds>

<threat_odds>
Threat 1 [Overclaim wording reaches board or CAISI]: P(materialises) 30%. Adversary suggested 25%. I set it slightly higher because the player's committed text repeats the struck wording verbatim, and tighter document controls mean fewer reviewers see drafts. Counsel does review board materials and caught this exact phrase once, which keeps it well below 50%.

Threat 2 [Board authorises the request before staffing]: P(materialises) 60%. Adversary suggested 50%. I set it higher because the chair already put this on the agenda citing the bio clearance and GPT-7 Agent, the February minute adopted option (b), the stock is 28% below the offer price, and the player's own brief frames the conditions as "before customer access."

Threat 3 [All partners refuse and schemas are treated as sensitive]: P(materialises) 35%. Adversary suggested 55%. I set it lower because ordinary slowness is already in Action 2's P(failure). Refusing all three options, including consistent Anthropic-side redaction, is the stronger and less likely outcome, and at least one partner has commercial reasons to keep Anthropic satisfied.

Threat 4 [CAISI declines pre-approval and adds a leakage requirement]: P(materialises) 45%. Adversary suggested 45%. I independently land on the same figure. Declining binding written assurance is very likely on its own, but the threat also needs substantive new held-out and per-partner requirements in April comments. That is plausible, since source-to-derived leakage is a standard critique, though CAISI may instead defer detailed comments to May.

Threat 5 [Open-weight release reaches about 5 days]: P(materialises) 15%. Adversary suggested 30%. I set it lower because the best open model is at 3.6 days, and a jump of 0.9–1.4 days in one release inside a single month is large. A major Chinese release in any given month is about 25% likely, and only about half of those would clear 4.5 days.
</threat_odds>
