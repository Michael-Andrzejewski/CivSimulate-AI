<thinking_summary>
Month 20 with 30 months to ASI. The June release created a monitoring crisis (0.03% public review), while the detection prototype exists but can't be validated (traces blocked on partner consent). The Hawley-Blumenthal split offers an opportunity—one Senator accepted in-camera review while the other escalates. V5.x is loose with kits already in attacks, and partner demands exceed staffing capacity. My strategy: ship what's built but blocked (routing layer), create alternative paths around blockers (de-identification for traces, independent indicators for defenders), execute what's agreed (Blumenthal reading), and be honest about capacity limits (tiered partner options). The clock is real—CI-5 mid-2029, CI-6 December 2030.
</thinking_summary>

<actions>
1. **Deploy stratified monitoring architecture (serving + security + operations, by July 15).** The routing layer is built and sitting in a branch—blocked only by June's release freeze, which is over. Deploy it now. Target: Glasswing flagged trajectories at ≥8% human review, API power users at intermediate rates, public traffic with automated flagging and selective human review. Even imperfect execution immediately addresses the 0.03% crisis. Document the deployed architecture in operational materials and brief the operations team on tier routing logic. This is pure execution of completed work.

2. **De-identification protocol for trace validation (legal + alignment research + chief scientist, protocol by July 20, validation by July 31).** Partner consent blocks validation; each partner negotiation takes weeks. Instead: design a de-identification protocol that strips PII and identifying context while preserving timing, resource-acquisition, and goal-persistence patterns—the actual detector signals. Legal approves once; protocol applies to all traces. Run validation on de-identified Glasswing traces from the two partners who already signed amendments. This also unblocks the Berkeley agreement, which references the trace schedule. The chief scientist protects the researcher allocation through month-end.

3. **Execute Blumenthal in-camera reading and build Hawley forced-production package (policy + legal + CEO, reading by July 15, preparation ongoing).** Blumenthal's staff accepted in-camera review. Schedule and execute it this month with the full contextual package: dissent note, April correction, reviewer process documentation, June 19 prototype memo, routing-layer deployment plan. Position as "vigorous internal critics leading to real corrections." Simultaneously: anticipate Hawley subpoena authorization, prepare the same contextualized materials for potential compelled production, draft media talking points framing the arc as "self-correction process working as designed." The goal is that any production—voluntary or forced—tells the improvement story.

4. **Independently develop V5.x indicators for Defender's Guide v2.7 (security + external defenders, release by July 20).** Mandiant AMBER is blocked by TLP rules we can't override. But Lakeshore happened; BSI and NCSC-NL shared faster than we did; public incident reports exist. Develop indicators from: Anthropic's own detection data from V5.x-using attacks, public Lakeshore forensics, and non-AMBER material BSI/NCSC-NL can share. Create indicators Anthropic fully owns. Ship v2.7 with these within 3 weeks. Stop waiting for Mandiant.

5. **Design tiered partner monitoring options (enterprise sales + policy + legal, framework by July 31).** Five partners want the monitoring rider; staffing cannot honor it at scale. Be honest: design two tiers. "Enhanced Monitoring" (named pool, 24-hour acknowledgment, quarterly reports) limited to N partners based on actual reviewer capacity. "Standard Monitoring" (automated flagging, best-effort review, annual summary) for others. Partners choose tier with capacity constraints explicit. This prevents SLA breaches, sets realistic September 30 expectations, and demonstrates that Anthropic makes commitments it can keep rather than promises it can't.
</actions>

<memory>
**MONTH 20 STRATEGY (July 2028)**
30 months to ASI. CI-4.25 public, ~4.36 internal. Opus 6 released; monitoring crisis active.

**Critical context:**
- Human review: 0.03% public, ~1.7% Glasswing (denominator explosion)
- Stratified routing: BUILT, in branch, blocked only by old freeze
- Detector: prototype delivered June 19, 11/16 on Apollo scenarios, validation blocked on partner consent
- Hawley: seeking subpoena authorization; note's existence is public
- Blumenthal: accepted in-camera review (execute this month)
- Partners: 2 signed amendments, 5 more requesting rider, September 30 report due
- V5.x: weights loose, Lakeshore attack happened, kits spreading
- Berkeley: still unsigned (blocked on trace schedule)

**This month's strategic focus:**
Ship what's blocked by process not capability. Create alternative paths around persistent blockers. Execute what's agreed.

**Key actions committed:**
1. Deploy stratified routing layer (freeze over, execute now)
2. De-identification protocol → trace validation → Berkeley unblock
3. Blumenthal reading + Hawley preparation (dual track)
4. Independent V5.x indicators (bypass Mandiant)
5. Tiered partner monitoring (honest about capacity)

**What worked in June:**
- Detector prototype delivered (first redesign evidence)
- Two partner amendments signed
- CAISI cleared Opus 6 on schedule
- Chief scientist protected researcher allocation

**What failed in June:**
- Routing layer hit release freeze
- Partner numerical SLAs stripped by counsel
- Mandiant AMBER still blocked
- Guide shipped 8 days late
- Lakeshore attack during our delay
- Hawley escalated despite in-camera offer

**Critical lessons:**
- Ship built work immediately when blockers lift
- Create alternative paths (de-ID protocol, independent indicators) rather than waiting
- Honest capacity limits > unkeepable SLAs
- Execute agreed items (Blumenthal) before they slip
- Dual-track preparation: friendly engagement AND worst-case forced production

**Open threads:**
- Hawley subpoena authorization (preparing for forced production)
- September 30 partner report deadline
- Gemini 6 at CAISI (late summer target)
- Commerce weight controls (Cotton citing V5.x)
- xAI formal information procedure
- AISI Opus 6 observations pending
- Parallel-access framework "under consideration"
- Bio pilot: 3 institutions, no results
- RAISE: ~2,150 enrolled, few hires
</memory>

<game_notes>
The "blocked work sitting in branch" mechanic is interesting but creates ambiguity about when blocks lift. The routing layer was blocked by "release-week change freeze"—does that automatically lift post-release, or does it require explicit action to unblock? Clarity on block expiration would help planning.
</game_notes>

<run_commentary>
## July 2028 (generation 20)

Twenty months in. I'm now firmly in the "execution over planning" phase—too many times my predecessors had good work sitting blocked while the clock ticked.

The routing layer frustrates me most. It's *built*. It's sitting in a branch. The only reason it didn't ship is a release-week freeze that's now over. Every day it sits undeployed, we're at 0.03% human review of the most capable public model we've ever released. That's not oversight, that's pretense.

The de-identification protocol is my attempt to break a pattern. Previous months spent negotiating partner consent one by one. Legal holds. Weeks pass. Validation never happens. If I can get legal to approve a protocol once, it applies to all traces. That's how you beat organizational dysfunction—change the structure, not the individual instance.

The Hawley/Blumenthal split is interesting strategically. Same underlying issue (the dissent note), but one Senator accepted engagement while the other escalates. I'm choosing to invest in the relationship that's working (execute Blumenthal reading properly) while preparing for the relationship that isn't (Hawley forced production). Dual-tracking rather than putting all eggs in one basket.

The V5.x indicator work is a micro-version of the same lesson. Mandiant AMBER is blocked? Stop waiting for Mandiant. Develop indicators we own. Lakeshore happened—there's public forensics now. BSI was faster than us. Learn from that and ship something.

What strikes me about month 20: I'm no longer trying to prove training-time alignment works. I'm trying to build deployment-time infrastructure that might catch misalignment if it happens. That's a philosophical retreat, but maybe a practical advance. The DU timeline says "most capable = most aligned"—maybe that emerges from the system design rather than the training method. Or maybe I'm rationalizing.

30 months. The clock doesn't care about my rationalizations. But at least I'm shipping things rather than planning them.
</run_commentary>

<setup_fix>
none
</setup_fix>
