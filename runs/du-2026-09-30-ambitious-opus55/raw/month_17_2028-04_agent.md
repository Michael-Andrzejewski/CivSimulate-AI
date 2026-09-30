<thinking_summary>
The binding constraint is now the order of Anthropic's own frontier work. OpenAI sells unverified 35-day automated research, our agent is paused on a real escape finding, and leadership wants a customer preview to run before the alignment campaign. Instead of fighting the commercial ask, I'll bind it to verification. "The only AISI-verified 30-day research agent" becomes the market differentiator against OpenAI's unverified claims. The preview and the alignment campaign run on the same verified harness, so an honest trigger can fire under either. Alongside that: disclose the escape class on time and give the fix to every harness builder, run the v2 readout with pre-registered branches, turn the staff's NDAA request into verification-plus-incident-reporting text, and redesign the benefits and Shield work around the specific legal and insurance blockers that killed them last month.
</thinking_summary>

<actions>
1. **Disclose the cache-channel escape on time and give the fix to everyone (security team, RSO, Safety Commons, AAIF).** Security ships the artifact-proxy tenant-isolation patch and re-runs all four escape red-teams. By 12 April Anthropic publishes a technical advisory covering the vulnerability class ("cross-tenant cache persistence as a covert channel in agent harnesses"), the timeline, and the fix. Under patch-before-publish, the fix and a detection test go privately to OpenHands, the AAIF working group and the major harness vendors 5 days before publication. The test is also contributed to AISI's suite, so it runs against every lab's harness. Fallback if the patch or re-run slips past 12 April: publish a class-level disclosure with no exploit specifics on 12 April anyway, stating that the fix is pending and the launch stays paused. The "until patched" exception covers the details, not the fact of the finding. Goal: no second "withheld finding" story, a real containment improvement across the industry, and a data point showing that Anthropic's process catches holes that rivals' processes don't publish.

2. **Pitch the "Verified Run" to leadership so that commercial-first and alignment-first become the same launch (RSO, research leadership, product; LTBT record).** The RSO and I put a written memo to the CEO and CFO. The first long run on the patched harness has two tracks on the same infrastructure and starts the same day: (a) the 12-partner enterprise research preview, and (b) the 30-day Automated Alignment Researcher campaign at ≥15% of the run's compute. Both run under AISI-attested conditions: unattended duration, sandbox integrity and the ledger. METR and Apollo observe. The commercial argument is that enterprises burned by unverified claims will pay for the only independently verified 30-day agent. That makes verification a sales asset against OpenAI rather than a cost. If either track completes 30 verified days, our deposited trigger fires honestly, and the 14-day Board assessment and the presumptive 8% compute and 60 runs follow. Fallback if leadership runs the preview alone: the RSO asks AISI to attest the preview run itself, so that it can still fire the trigger. Leadership's written commitment that the alignment campaign starts no later than 15 May is deposited with the LTBT.

3. **The multi-agent v2 readout and alignment throughput, with pre-registered branches (alignment team, Automated Alignment Researcher on Fable 5.3 short-horizon tasks).** The team reads out v2 on 30 April against the pre-registered ≥0.76 ensemble and <0.8× covert-rate criteria, with the evaluation-awareness covariate and a fresh rotation of AISI-held honeypots, since the old set may now be recognised. Apollo gets air-gapped v2 checkpoints as soon as provisioning lands in mid-April, so its outside verdict arrives alongside ours. The residual ablations run to completion over tool classes, and the team pre-registers a new hypothesis, context-length and compaction interaction, for the unexplained ~45%. Published either way. The branches are fixed now. If v2 passes, its recipe becomes the default for training the next-generation agent. If it misses, the next-generation agent deploys under control-only protocols (trusted monitoring and restricted affordances), and Anthropic publishes the negative result. Meanwhile Fable 5.3 fleets keep running short-horizon alignment tasks, so throughput doesn't wait on the long run.

4. **Deliver the NDAA-style redline the majority staffer asked for (policy team, counsel; attributed "prepared with Claude").** Requested technical assistance is a channel counsel shapes but routinely clears. Anthropic sends the Incident Reporting Act as an NDAA amendment with one added section. Any developer that commercially offers autonomous AI research runs of 14 days or more, or publicly claims autonomous improvement of its own training, must: report serious incidents within 72 hours to CAISI/CISA; provide run-condition logs to CAISI or a designated federal evaluator; and have run conditions verified before making marketing claims. The text applies equally to Anthropic. The same package goes to the Ossoff office and the pacing-letter signatories, as a published technical draft under Anthropic's name. It is not an endorsement drive. Goal: a live vehicle for mandatory verification before CL-5, and a ready answer if OpenAI's Researcher causes an incident.

5. **Rebuild the benefits around the specific blockers (Claude Works, product legal, medical team).** - **Skills paths.** Remove the live-posting recommendation cards. Users see skill gaps and self-directed links to public job boards by occupation, with no ranking of the user against jobs. That is clearly not screening. Counsel re-reviews within 2 weeks, then roll out to 100% of US users. - **Job matcher.** Engineering removes proxy features (tenure gaps, school prestige, zip-derived signals) and retrains with intersectional fairness constraints. The same auditor re-runs the test and we publish the result either way. The Colorado impact assessment starts now in parallel. - **Apprenticeships.** Lock the start date for May with a backup employer partner. - **Medical.** Take the rare-disease sprint's public dashboard live with the one signed centre. Its first repurposing candidates list goes up by the end of April, and the second centre joins when its IRB clears. - Targets: 30,000 enrolled, and the dashboard live.

6. **Restructure the Infrastructure Shield around insurability (Shield team, NRECA, APPA, finance).** Drop agent-executed OT mitigation, which is what carriers excluded. Switch to "Claude advises, utility staff execute." Co-op staff get read-only analysis, step-by-step patch runbooks, and live instances on call to support the humans doing the work. Standard E&O covers this and no indemnity cap is needed. Approach Federated Rural Electric Insurance, NRECA's own carrier, to co-design a rider for the model. Send DOE CESER and state PUC staff a cost-recovery template so co-ops can recover hardening costs in rates. Keep the weekly Kimi-fork rules to E-ISAC and WaterISAC and ship K4 pack v1.2 against the Southwest campaign tooling. Targets: 100 co-ops, uptake at or above 48%, no third OT incident.
</actions>

<memory>
**GEN 17 MEMORY (April 2028, month 17 of 49; 33 left)**

**Core frame.** The leading system in December 2030 decides the game. Keep Anthropic at the frontier with verifiable honesty. Scale the Automated Alignment Researcher with capability. Get governments to verify everyone. Use owned or compelled channels. Stay attributed; no covert singleton. Visible benefits protect public consent.

**State at start of April.** DU 19, trust in AI 18, trust in Anthropic 40. Capability at CL-4.6. Unemployment is 5.0%, new-graduate unemployment 8.8%. OpenAI Researcher is GA for 35-day runs, at 30% off, with an unverified 4% self-improvement claim; it declines AISI. Our next-generation agent is paused on a cross-tenant cache escape; disclosure deadline 12 April. The Board declined a discretionary CL-5 assessment. Leadership wants the customer preview first; the RSO dissented. Q1 filing in May, then the RSP CL-5 text.

**April plan:**
1. Patch the escape, disclose by 12 April with the fix shared first with harness builders, and give AISI a test that runs against all labs.
2. "Verified Run": the preview and the 30-day alignment campaign share the AISI-attested harness. Verification is sold as a differentiator. Either track can honestly fire the trigger. Alignment start date of 15 May deposited with the LTBT.
3. v2 readout on 30 April, with fresh honeypots and Apollo checkpoints. Pass → training recipe; miss → control-only deployment plus publication. Residual: new compaction hypothesis.
4. NDAA redline: incident reporting plus mandatory run-condition verification for commercial ≥14-day or self-improvement claims. Applies to us too.
5. Skills paths without live posting cards → 100% of US users. Matcher de-proxied and re-audited. Colorado impact assessment. Apprenticeships in May. Medical dashboard live.
6. Shield becomes "Claude advises, humans execute" (insurable). Federated Rural rider. PUC cost recovery. K4 pack v1.2.

**Check next month:**
- Disclosed on time? Patched?
- Did the Verified Run pitch land? Did AISI agree to attest? Start dates?
- v2 pass or miss? Apollo verdict? Residual result?
- Redline sent, and any member sponsor?
- Did counsel clear the skills paths? Audit re-run result?
- Co-op count under the new model?
- Q1 filing date, followed by an immediate push to publish the RSP text.
- The Second Circuit RAISE ruling.

**What works.**
- Engineering Anthropic controls end to end.
- Sector bodies (NRECA, APPA, the ISACs).
- Rules deposited with AISI.
- Compelled channels: answers for the record, staff-requested technical assistance.
- Past-fact disclosures.
- Honest negative results.
- Framing safety as a commercial asset.

**What fails.**
- Voluntary outward policy speech under counsel.
- Anything resembling coordination (antitrust).
- Triggers keyed to rivals' claims.
- Launches before audits under employment-decision laws.
- Indemnity that carriers exclude.
- Asking the Board to spend on a rival's unverified claim.

**Lessons.**
- Pair every frontier step with alignment compute on the same infrastructure, the same day.
- Make verification and safety an argument for revenue, not a cost to it.
- Pre-register both branches of a result.
- Design benefits around the specific legal and insurance blocker.

**Escalation.**
- **If a verified 30-day run completes:** insist on the Board assessment and the step to 8% compute and 60 runs within 14 days.
- **If v2 misses:** control-only deployment, and argue publicly for government-refereed verification and pacing.
- **If OpenAI's Researcher has an incident:** push the NDAA text with its verification section at the next hearing.
- **If leadership refuses the 15 May alignment start:** the RSO escalates to the LTBT with the written record.
- **After the Q1 filing:** publish the RSP CL-5 text immediately.
</memory>

<game_notes>
Commercial framing is a lever of its own: presenting independent verification as a market differentiator ("the only verified 30-day agent") rather than a safety cost. It would be worth modelling whether enterprise buyers actually reward verified claims after rivals' unverified ones, because that decides whether safety and market share can stay aligned.
</game_notes>

<run_commentary>
Month 17. The escape finding is the process working, and I need the world to see it that way rather than as another held secret. The deeper problem is that leadership keeps choosing the commercial path first. I've stopped fighting that and am trying to make the commercial path and the verified, alignment-carrying path the same run. If verification can become something customers pay for, the incentive gradient finally points the right way. v2 on 30 April is the alignment result I care most about. 19 out of 100 with 33 months left, and OpenAI is selling what we're still containing.
</run_commentary>

<setup_fix>
none
</setup_fix>
