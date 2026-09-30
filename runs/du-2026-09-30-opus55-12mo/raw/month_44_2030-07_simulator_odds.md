<analysis>
**Action 1 (METR reading, 2-hour merge, pre-announced override post).** The action has three parts.
- **METR logistics** are routine and METR controls the method, so this part carries little risk.
- **The 6h→2h merge cut** is real engineering on a path that has passed only once. The append-only, partition-local design removes most write contention, but tripling merge frequency three weeks before an external reading is risky. That regression risk is modelled separately in Threat 3, so it is not counted in Action 1's P(failure).
- **The verbatim pre-announced override post** is where Action 1 carries its own failure risk. It is openly confrontational toward the board in a pre-IPO-style, 52%-down company. IR edited the 3 June memo, and counsel has *Buist* discovery live. IR or counsel may soften it ("in the event of any board action…") or delay posting until after the board meets.
- **Governments and CAISI** may not react to the copies at all.

**Action 2 (structural reference configuration).** Short-lived credentials, egress allowlists and write-once logs are established practice, so this is low-novelty publishing.
- The risks are a high breakage rate on long-horizon legitimate workloads, and Glasswing leadership caution. The oracle objection is weaker here because this is configuration, not signatures.
- The hospital pipeline of about 35 sites should move under the signed template, but at a realistic pace of weeks, perhaps 10 to 20 sites in July.
- The NCSC-NL first exchange is dated for July. Whether a new configuration gets folded into it is uncertain.

**Action 3 (Qwen raw results plus white-box probes).**
- The Toronto results depend on a third party delivering on 31 July. Academic slips are common.
- Probing 2–3T-parameter open weights is feasible in compute terms, but a pre-registered plan plus runs within one month is tight.
- The fork-family runs are the legal flashpoint. That risk is modelled in Threat 4.

**Action 4 (incident kit, CISA standby, Economic Index data).** These go through routine existing channels. The CISA standby offer may draw counsel friction over liability.

**Action 5 (living document of every gate decision since 2027).** With *Buist* discovery live and IR hostile, a document that narrates every gate decision is exactly what counsel limits. The likely outcome is a heavily narrowed version, such as links to already-public posts only, or a delay.

**Threat 1 (board vote).** The board has not scheduled a vote in three months. The chair's pattern is minute-and-defer, and a vote days before a scheduled METR reading looks bad for litigation. Against that, the retention case is closed, the stock is down 52%, and the director is pushing.

The threat roll will double as the declared distribution over board options:
- **Roll below 25:** the board votes a limited contingency (a long-horizon product track or partial resumption "pending METR").
- **Roll 25–54:** the board formally extends the contingency to METR's mid-August output.
- **Roll 55 or above:** no board action in July; the contingency is left unresolved.

**Threat 2 (adversarial divergence).** The written output is not due until mid-August, so a July materialisation could only be a preliminary on-site finding flagged informally or leaked. METR may also still be scoping the test. I rate the substantive risk of a later conditional finding as higher than the risk of it surfacing in July.

**Threat 3 (merge regression).** This is a genuine mechanism on a component with a poor deadline record, partly offset by the simpler architecture.

**Threat 4 (fork runs blocked).** Glasswing already handles fork artefacts for signatures, which gives a legal basis. The optics after the DeepSeek leak and counsel's veto pattern push the other way.

**Threat 5 (disclosed long-horizon incident).** There are about 2,350 multi-month customers. An incident this month is plausible, but a public disclosure within the month is less likely, because disclosure usually lags.
</analysis>

<action_odds>
Action 1 [Protect METR reading, 2h merge, override post]: P(failure) 30%. Reason: the logistics are routine. The main execution risk is IR or counsel softening or delaying the confrontational pre-announced post, as happened to the 3 June memo. The engineering regression is modelled in Threat 3 and not double-counted here.

Action 2 [Structural defence reference configuration]: P(failure) 25%. Reason: these are established patterns with low oracle risk. The risks are breakage on legitimate long-horizon workloads and Glasswing review. Hospital onboarding will only partly advance within the month.

Action 3 [Qwen raw results plus white-box probes]: P(failure) 35%. Reason: it depends on a third party delivering on 31 July, and pre-registration plus probe runs on 2–3T open weights is tight for one month. The fork-run legal risk is in Threat 4.

Action 4 [Incident kit, CISA standby, Economic Index data]: P(failure) 15%. Reason: routine existing channels. There is minor counsel friction over the liability terms of the standby offer.

Action 5 [Living lessons document]: P(failure) 50%. Reason: a narrative of every gate decision since 2027, published during live *Buist* discovery, is squarely within counsel's and IR's veto pattern. Heavy narrowing or delay is likely.
</action_odds>

<threat_odds>
Threat 1 [Board votes July contingency before METR output]: P(materialises) 25%. Adversary suggested 30%; reason for difference: the chair has deferred for three months, and a vote days before a scheduled external reading is legally awkward during *Buist*. The closed retention case and the stock keep the risk real. The roll is declared as the board-option distribution: below 25, a limited-contingency vote; 25–54, a formal extension to METR's output; 55 or above, no action.

Threat 2 [METR adversarial test breaks merge-time design]: P(materialises) 20%. Adversary suggested 30%; reason for difference: the written output is due mid-August, so only a preliminary on-site finding or a leak can land in July. The underlying design weakness is real, and I would rate the eventual risk higher.

Threat 3 [2h merge change reopens handoff bug]: P(materialises) 30%. Adversary suggested 35%; reason for difference: the append-only, partition-local design removed the concurrent-write handoff, which lowers the odds. The poor deadline record and the three-week timeline keep them substantial.

Threat 4 [Counsel blocks fork runs / probes dismissed]: P(materialises) 40%. Adversary suggested 40%; reason for difference: none. The existing Glasswing fork handling gives a legal basis, and that roughly offsets counsel's veto pattern and the optics after the DeepSeek leak.

Threat 5 [First disclosed long-horizon agent incident]: P(materialises) 20%. Adversary suggested 25%; reason for difference: an incident is plausible across about 2,350 unevaluated multi-month deployments, but disclosure within the same month is less likely, because enterprise disclosure usually lags by weeks.
</threat_odds>
