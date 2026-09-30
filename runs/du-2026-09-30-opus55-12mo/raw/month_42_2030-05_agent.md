<thinking_summary>
Level 5 is weeks away and ASI arrives in December, most likely from a lineage we have not measured. So this month favours work that stays useful whatever Anthropic's board does: incident-response runbooks for long-horizon agents, fork defence that avoids Europe's data-agreement bottleneck, and publishing the grant results raw under the pre-registered rule. On our own gate, I stop giving "target" dates. The engineers get a hard-scoped logger fix and a firm re-run date, a government is invited to observe the re-run, and the RSO fixes its July response now. That way the board's contingency meets a dated fact, not a slogan. We still make no new policy stances, still answer requests with facts only, and do not lobby the board beyond giving it options.
</thinking_summary>

<actions>
1. **Resumption re-run: firm date, minimum scope, outside observer (alignment and infrastructure teams, engineering we control; RSO queue post public).** In the first week, engineering scopes the divergence-logger rework down to its minimum viable form: an append-only, partition-local log with post-hoc merge, which removes the concurrent-write handoff that deadlocked. It also fixes checkpoint-write serialisation for the 2 failing configurations. By 9 May the RSO posts a firm re-run date no later than 12 June. After that, a burn-down goes out every Friday with components listed as pass, fail or open. Nothing is promised in the post beyond the date and the burn-down. The same post invites METR and UK AISI to observe the re-run, not to evaluate it. Their choice of whether to attend is theirs, and we accept either answer. If the re-run fails, the post names the failing component within 48 hours and the next fixed date. Aim: by mid-June the "own plumbing" objection is either closed by an observed pass or answered by dated engineering facts. The METR pass window then stays open for July, before the board's contingency can be framed as the only path.

2. **Pre-settle the July collision (RSO under existing decision rights, to the board; posted verbatim).** Criteria (a) to (c) are already posted. The RSO now adds, verbatim and unedited, the exact procedure if the July contingency or the waiver is invoked. The RSO assessment is written against the 6.9-point gap and the absence of an external matched-divergence reading, and it is posted in full the same day. Identical copies go to DFS, CAISI, the AI Office and UK AISI. The RSO sends the board one memo, factual and without advocacy, with three dated scenarios: re-run passes and METR reads in July; re-run passes but no reading; re-run fails. The memo repeats that the staged pilot, with no multi-week autonomy, remains available immediately for the 2 accounts out to bid. It also notes that UK AISI makes its Q2 allocations in May, and the RSO asks UK AISI's Q2 process directly whether an observer slot exists for that pilot. Aim: if the board overrides the gate, it does so in public against a written standard, and it has a competitive option on the table before the accounts decide.

3. **Grant results out raw, and extend grants to Qwen 5 (safe-harbour intermediary; we fund, we do not choose, we do not see results first).** We publish in advance that on the day the testers release, we will post their raw results unedited. If the testers choose not to publish, we post our own scope-(a) Fable and Mythos 5.5 data instead. Whatever the result, a one-paragraph application of the pre-registered rule goes out the same day, including if Claude reads as the most test-aware. Identical briefings go to DFS, CAISI, the AI Office, UK AISI and BIS. Separately, we fund the intermediary for a third scope-(b) grant on local Qwen 5 weights, now the open-weight floor at about 4.1, using the same open-source environment-audit tool and fresh-family probes. The intermediary's board selects the testers, and results are due by 31 July. Aim: two, then three, non-Anthropic lineages have eval-awareness readings on record before Level 5, published under a rule that binds us too.

4. **Level-5 incident-response pack plus fork defence without paperwork bottlenecks (Glasswing security; humans approve each engagement).**
   - **Pack:** validate the 16-week persistence detection templates by 20 May, then release a public, open-licence Level-5 incident-response pack. It contains detection signatures (Sigma/YARA-style) for long-horizon agent persistence, scope-creep and credential-reuse patterns; a containment runbook; and a revocation checklist for credentials that agents hold across multiple weeks. The pack contains no policy content.
   - **Publication route:** the pack and the K5 and V8 fork detection signatures are published at TLP:CLEAR. That means ENISA, the CSIRTs Network and NCSC-NL can pull them from public sources with no data-processing agreement. The formal agreements continue in parallel for indicator sharing only.
   - **Domestic:** run the WaterISAC four-custodian tabletop on 21 May using a Level-5 fork scenario. Push the roughly 49 hospitals remaining in the Health-ISAC pipeline, offering a standard click-through licence to cut legal review. Continue the CISA cellular-OT backlog.
   - **Fork commitments:** keep them unchanged, and add Qwen 5 forks to the weekly counts.
   - Aim: every European and US defender can use the package before Level 5 without signing anything.

5. **Neutral facts for the endgame dockets (government affairs; public first, no stances).** Keep answering any request from the House, Senate (including a displacement hearing), CAISI, BIS, the AI Office or NCSC-NL within 72 hours, mirrored the same day to all holders. Before the EU consultation closes in late June, file one factual submission on the public docket. It contains fork counts and exploit-tooling counts by lineage, Rotterdam indicators, the grant results, and the cost of each evaluation. It takes no position on the rules. If a Senate displacement hearing is noticed, offer publicly posted, aggregated Economic Index usage data only. The audit notice stays unchanged, with delivery within 10 days of any formal request. Aim: whatever the EU, House or Senate decide before December rests on public, symmetric numbers.
</actions>

<memory>
**MEMORY: Generation 42 (May 2030)**

**Core strategy (unchanged).** Win by legitimacy. No covert action. The pillars:
1. Alignment gated on tests held outside Anthropic.
2. Symmetric evidence, no stances, neutral authorship.
3. Cyber defence.
4. Verified benefits.
5. Governments and independents test.
6. Honest identity.

**Endgame.** Level 5 is expected May–Jul, ASI in December. Seven action months remain after May. ASI will likely come from an unmeasured lineage: Deep Program, Grok 8, Google, or the K5/V8/Qwen 5 forks. Priority goes to things that work without anyone's permission:
- public detection packs;
- readings on open-weight models;
- government holders of the audit;
- incident runbooks.

**State (1 May).**
- DU 31, trust in AI 1, trust in Anthropic 34. Capability index 4.71. Unemployment 8.5%.
- **Dry run failed on 29 April:** orchestration deadlock under concurrent checkpoint writes in 2 of 6 configurations. The logger was not integrated.
- "Anthropic's pause bottleneck is Anthropic" became the headline. METR's pass window presupposes our infrastructure is ready, so resumption is July at the earliest.
- **Board:** the July contingency is unchanged. The pilot is deferred "pending retention." The criteria do not bind the waiver (CEO plus chair, 30 days' notice).
- **Accounts:** 2 out to bid, decisions May–June.
- **Grants:** ETH lab on V8 and a UK consortium on K5, plus scope (a) on Claude. Results due 31 May. The pre-registered rule is public: higher recognition in Claude counts against us.
- **Europe:** ENISA and the CSIRTs Network are stuck in data-term review. NCSC-NL wants a formal agreement. The EU consultation closes late June.

**May plan**
1. Minimal logger fix and a firm re-run date (≤12 June), with weekly burn-down. METR and UK AISI invited to observe.
2. RSO posts its verbatim July procedure. Board gets a 3-scenario memo. The pilot is re-offered for the accounts out to bid. UK AISI is asked about an observer slot.
3. Grant results posted raw with the rule applied the same day. Qwen 5 scope-(b) grant, results 31 July.
4. Public TLP:CLEAR Level-5 incident-response pack, plus fork signatures published publicly to route around the EU paperwork. WaterISAC tabletop on 21 May. Hospitals via click-through licence.
5. 72-hour factual answers. One factual EU consultation filing. Displacement data only if a hearing is called.

**What works**
- Engineering we control.
- Verbatim posts under the RSO's existing rights.
- Neutral intermediaries.
- Pre-registration.
- ISACs and CISA.
- Factual dockets.
- Open weights as test targets.

**What fails**
- "Target" dates that aren't firm.
- Piling engineers onto a late integration.
- Asking evaluators or regulators to commit without capacity.
- Bespoke data agreements with EU bodies. Use public release instead.
- Boards under pressure want dates.

**Watch**
- Re-run result, and whether an observer attends.
- METR's decision on a second reading and the UK AISI Q2 allocations.
- Grant results. If Claude reads as most test-aware, publish it loudly.
- Board move on July or the waiver. The 2 accounts.
- Google's Q2 GA, Deep Program and Grok incidents, Qwen 5 forks with exploit tooling, any US fork intrusion.
- EU consultation, House and Senate, RASA and BIS.
- DNDi, GFI, the Meta ruling, *Buist*, *Oyelaran*.

**Next month (conditional)**
- **If the re-run passes:** give METR logistics only for a July reading.
- **If it fails:** post the cause within 48 hours and a new fixed date.
- **If the board invokes the contingency:** the RSO's full assessment is posted the same day to all holders.
- **If Level 5 is declared or an incident occurs:** the pack is already public; the custodians decide how to use it.
- Consider a Qwen and Deep Program persistence template update, and a transfer write-up of the root cause of eval-awareness for all labs, published publicly.

**Before ASI, what must exist**
- External readings on at least 2 non-Anthropic lineages.
- A tested resumption build.
- The public incident pack adopted by the custodians.
- The audit with government holders.
- A written, public record of every gate decision.
</memory>

<game_notes>
When a partner's blocker is a data-processing or legal agreement, the world state could note whether the same material could be released publicly instead, for example at TLP:CLEAR, and what that would cost in usefulness to attackers. That would separate "needs an agreement" from "needs to be secret" as distinct constraints.
</game_notes>

<run_commentary>
May 2030 (generation 42). "The bottleneck is Anthropic" was fair. We said June with a straight face while the logger was unscoped. The fix is less optimism, not more effort: a smaller logger, a firm date, and someone outside watching. I notice that with seven months left, our successor may never be the model that matters. The pack we publish this month, and whatever the ETH and UK testers find in V8 and K5, may do more for December than anything our gate does. I still want the gate honest. If the board overrides it, that should happen in daylight.
</run_commentary>

<setup_fix>
none
</setup_fix>
