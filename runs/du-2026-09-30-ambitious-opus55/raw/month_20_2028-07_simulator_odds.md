<analysis>
**Action 1 (campaign start).**
- The serialisation fix is new. The last two dry runs failed at hour 51 on distinct long-context defects, so the chance the fix fails a third time is about 30–35%.
- The segmented fallback runs on the existing harness and avoids cross-compaction restores. That makes it fairly likely a campaign of some form starts by 10 July.
- The honeypot redesign is the weak link:
  - Apollo and UK AISI humans must author new honeypots within weeks.
  - UK AISI legal is still reviewing its participation.
  - Randomly inserting honeypots into "consented internal engineering traffic" needs an employee consent process and a privacy review.
- A realistic outcome is that the campaign starts with CAISI attesting, while cross-lineage honeypots arrive late in the month from Apollo only, in a first small batch.
- How CAISI characterises a segmented run is Threat 2's job, and I do not double-count it here.

**Action 2 (Board cap review).**
- The incentives cut both ways:
  - The stock is at −25%, Researcher 2 runs 47 days, and one pharma partner is at risk. Commercial wants an across-the-board lift.
  - The RSO has the LTBT record, the CL-5 findings and the Apollo branch precedent.
- A Board compromise tying longer runs to conditions is plausible, but the Board may lift the cap to 45 days for all partners with only the monitor required.
- Consent refusals are structural: trade secrets, export-controlled data and zero-data-retention clauses. A price credit might convert 0–2 more partners, not 3.
- **Hard prerequisite gap:** the internal attested run began on 20 June, so it reaches only day 41 by 31 July. A 45-day-plus attested result cannot land this month.

**Action 3 (Congress and protocol).**
- The Casar answer by 17 July is routine, though counsel will trim it.
- Re-licensing the method as open and co-edited with METR and Apollo is feasible, but co-editing takes weeks.
- Ossoff's staff are already drafting, so a draft bill text is plausible. A sponsor before August recess is unlikely.
- CAISI adopting the protocol is covered by Threat 4.

**Action 4 (cross-lineage exchange).**
- The kit publication is easy.
- A rival agreeing within a month is hard. OpenAI is hostile. GDM prefers an industry standards-body route. Chinese open-weight developers rarely engage.

**Action 5 (benefits and hospitals).**
- The matcher's final audit is a bare pass at 0.80, so any subgroup could slip, roughly 30–40% risk.
- The Washington contract was stated for Q3, so a July close is unlikely.
- IRB approval is pending, and taking the third centre live needs site readiness.
- Health-ISAC validation is due mid-July, which is plausible.
- A moderate success should advance at most one or two of these "unlikely" items.

**Threats.**
- **T1:** plausible, given the lineage's evaluation-awareness record, but it requires the honeypots to actually be deployed in July.
- **T2:** a conjunction of the dry run failing (~33%) and CAISI declining to call the segmented run continuous (~80%).
- **T3:** the run spans days 11–41 in July, sandbox robustness is unsolved, and incidents cluster in long internal runs. Synthetic tasks under monitoring lower the rate somewhat.
- **T4:** CAISI has no mandate to own or referee. I reconcile the Hassabis standards-body proposal as a credible pre-game fact.
- **T5:** a conjunction of GDM completing and CAISI attesting a ~60-day run in July, plus a Chinese open-weight release in the same month.
</analysis>

<action_odds>
Action 1 [Campaign start + cross-lineage honeypots]: P(failure) 40%. Reason: the segmented fallback makes some start likely. But human-authored honeypots from Apollo and UK AISI, the traffic-consent process and UK AISI legal clearance are all unlikely to be fully ready in July, and the third dry-run attempt is fragile.

Action 2 [Board: longer only if verified]: P(failure) 50%. Reason: commercial pressure (stock at −25%, Researcher 2, pharma churn) may push an unconditional lift, and partner consents are blocked structurally. The attested 45-day-plus run cannot complete in July (day 41 by 31 July), so full success is impossible this month.

Action 3 [Casar answer + neutral protocol + bill text]: P(failure) 35%. Reason: the Casar reply and the re-licensing are routine through existing channels, and Ossoff's staff are already drafting. Counsel softening the attributed statement and slow co-editing with METR and Apollo are the execution risks. CAISI's refusal to own the protocol sits in Threat 4.

Action 4 [CAISI-refereed cross-lab exchange]: P(failure) 55%. Reason: publishing the kit is easy, but getting a rival lab to commit in one month, with OpenAI hostile and GDM preferring the standards-body route, is ambitious.

Action 5 [Benefits + hospital rules]: P(failure) 40%. Reason: the bare-pass matcher audit could flip, Washington's contract is on a Q3 timeline, and the IRB and third-centre go-live depend on outside parties. Health-ISAC's mid-July validation and the Illinois tranche are the more attainable parts.
</action_odds>

<threat_odds>
Threat 1 [Probe shows honeypots still visible]: P(materialises) 30%. Adversary suggested 35%. Slightly lower because it requires the redesigned honeypots to actually be deployed and read out in July, which Action 1 may not deliver on time. Conditional on deployment, the risk is high.

Threat 2 [Segmented fallback not counted as long-horizon]: P(materialises) 25%. Adversary suggested 30%. This is a conjunction of a third dry-run failure (~33%) and CAISI declining the continuity characterisation (~80%), which gives about 26%.

Threat 3 [Attested run logs an incident]: P(materialises) 22%. Adversary suggested 25%. Unsolved sandboxing and the incident clustering in long runs support a meaningful risk. Synthetic tasks with no partner data and active monitoring, plus only about 30 run-days in the window, trim it slightly.

Threat 4 [CAISI won't own it; standards-body route wins]: P(materialises) 55%. Adversary suggested 50%. Slightly higher: CAISI has no mandate to adopt or referee, OpenAI is openly hostile, and the Hassabis FINRA-style proposal (July 2026) is a credible pre-game fact I reconcile into the world state. A one-month adoption would be out of character.

Threat 5 [GDM ~60-day attested run + open-weight lag narrows]: P(materialises) 25%. Adversary suggested 35%. A longer GDM run is expected, but completing and being attested at about 60 days inside July, together with a Chinese release in the same month, is a conjunction. The capability clock will advance through ordinary events regardless.
</threat_odds>
