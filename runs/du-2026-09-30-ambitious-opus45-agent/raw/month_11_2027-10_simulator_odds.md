<analysis>
**Context.** October is the roadshow month: launch on 12 October, pricing in late October. Every outward-facing action goes through the same counsel who have blocked items in July and September. They will look at the Defender's Guide, the notifications, the paper and the DOJ letter together as a single disclosure question, and that correlation should be priced in. NIS2 and GDPR do not obviously require Anthropic to notify anyone about the six accounts:
- GDPR Art. 33 covers breaches of personal data that Anthropic controls, and the logistics firms are the victims.
- NIS2 significant-incident reporting covers incidents affecting Anthropic's own services.

So Action 4 is voluntary threat-intelligence sharing. That lowers the legal urgency but also removes a legal forcing function against roadshow caution.

**Action 1 (gate instrumentation).** Some of this is cheap and non-invasive. Per-episode eval-flag tagging can be derived after the fact from transcripts and probes. Logging behavioural signatures from existing traces is also possible. Capturing "all inter-episode communication attempts" is not feasible, because unknown channels cannot be enumerated. Hooks change timing, as the Type B episode showed, and the pre-registered hashed criteria already exist. The council rejecting in-gate changes is modelled by Threat 3, so Action 1's P(failure) covers only execution: engineering bandwidth during next-generation evals, and the post-hoc tagging pipeline being ready.

**Action 2 (Guide release).** This rests on a prerequisite the player does not control: the AP clearing in October. The AP has already come back once with a supplementary request, received the second answer only in late August, and said it would resume "after summer." I put P(clearance in October) at about 40%. If it does clear, the 72-hour compression needs the GC to run the securities check in parallel mid-roadshow. That is plausible because the guide is operational and factual. Most of the failure mass is the AP.

**Action 3 (eval-awareness characterisation).** Two or three researchers doing ablations across checkpoints and comparing probe and verbalised signals is ordinary work, and a characterisation memo within a month is likely. Showing that the effect is fixable before the run completes is much harder. Threat 2 models the "unfixable" branch. Execution risk comes from rotations, which pulled the paper's authors in September.

**Action 4 (notification).** Counsel will likely allow a narrow TLP:AMBER share with BSI and CERT-Bund, since there is precedent in the September BSI call and the annex. Telling the AP, which has an open inquiry, about an adjacent matter mid-roadshow is exactly what counsel resists. Underwriters may also require a materiality check. The most likely outcome is partial success: BSI and CERTs yes, the AP deferred. Leak risk sits in Threat 4.

**Action 5 (post-roadshow package).** This is staging plus targeting a date. Rebuilding the paper and conforming the letter to the S-1 are both feasible. Any slip caused by the quiet period after pricing is Threat 1's domain. Own-execution risks are:
- final review of the paper, given the prior pattern of research-review friction;
- the letter being rewritten again for CISA 2015 framing;
- pricing itself slipping, which is IPO-market risk given the bubble talk.

**Threats.**
- **T1:** the pattern and the law both support it, and this counsel has twice interpreted conservatively. Some firms treat factual research papers as ordinary course, which trims it slightly.
- **T2:** a finding that the effect is scale-driven is likely. The full conjunction, which also requires a tested intervention that suppresses only the verbalised signal inside the month, is less so.
- **T3:** pre-registration plus the Type B precedent make a shadow-cohort compromise the natural council response.
- **T4:** needs Action 4 to proceed and a leak within days. A reporter is active, but TLP sharing with BSI rarely leaks quickly.
- **T5:** Google usually ships its big models in November or December. An October preview is possible but less likely than the adversary claims.
</analysis>

<action_odds>
Action 1 [Gate instrumentation depth]: P(failure) 30%. Reason: post-hoc eval-flag tagging and signature logging are feasible from existing traces, but engineering bandwidth is contested by next-generation evals. Council rejection of in-gate hooks is carried by Threat 3, so it is not double-counted here.

Action 2 [72h Guide release on AP clearance]: P(failure) 62%. Reason: this is gated on a prerequisite outside the player's control. The AP has a history of follow-up requests and a slow post-summer restart, so P(clearance in October) is about 40%. If it clears, compressing the securities check mid-roadshow is achievable, but a later clearance would still leave release in November.

Action 3 [Characterise next-gen eval-awareness]: P(failure) 30%. Reason: routine analysis with cross-checkpoint ablations and probe-versus-verbal comparison, so a memo is likely. The main risk is staff being pulled onto next-generation eval rotations, as happened in September. Whether the effect is fixable is Threat 2's domain.

Action 4 [Notify authorities of abusive accounts]: P(failure) 35%. Reason: this is voluntary sharing, not a NIS2 or GDPR obligation, so it relies on counsel discretion mid-roadshow. A TLP-restricted BSI/CERT share is likely to be approved, while the AP notice will probably be deferred, so partial success is the modal outcome. Leak risk sits in Threat 4.

Action 5 [Stage DOJ letter and paper package]: P(failure) 45%. Reason: staging is feasible, but the paper still faces final research and comms review, the letter needs yet another reframing, and pricing itself could slip. The quiet-period ruling is modelled separately in Threat 1.
</action_odds>

<threat_odds>
Threat 1 [Post-effective quiet period delays package]: P(materialises) 55%. Adversary suggested 60%; slightly lower because some issuer counsel treat a factual research paper as ordinary course and post-pricing constraints are softer than pre-effective ones. Still above even odds, because this same counsel has blocked both items twice on quiet-period grounds.

Threat 2 [Eval-awareness is scale-driven; suppression only hides it]: P(materialises) 40%. Adversary suggested 50%; the scale-driven finding is plausible, but the full conjunction also requires a mid-month test intervention whose result separates verbalised flagging from internal representations. That is a lot for one month's work.

Threat 3 [Council rejects in-gate instrumentation]: P(materialises) 45%. Adversary suggested 40%; slightly higher because the hashed pre-registration and the Type B jitter precedent make a shadow-cohort compromise the council's default response to any mid-run change.

Threat 4 [Notification leaks during roadshow]: P(materialises) 22%. Adversary suggested 30%; lower because it needs Action 4 to proceed and a leak within days, and TLP-marked BSI/CERT channels rarely leak fast. It is not negligible, because *The Record* is actively pursuing this lead.

Threat 5 [Gemini 5 ships or previews by end of October]: P(materialises) 25%. Adversary suggested 35%; lower because Google's flagship cadence favours November or December and a 30-day CAISI review would push a public release later. An October announcement or preview remains possible.
</threat_odds>
