# Independent calculator review protocol — Phase 3A

Document IV-PROTOCOL-001 · Version 1.0 DRAFT · Prepared 2026-10-12.
Repository checkpoint: `2eeeea02258824a130651127c2c84e8819735bd1`, branch `docs/v1.3-clinical-governance`, working tree clean at entry. Supplied instructions and Ryoku vault reviewed; no additional repository instructions identified. This is a documentation preparation record, not approval of an executable clinical verification protocol.

**All unresolved clinical policies PENDING. Clinical implementation NOT AUTHORIZED. Clinical release NO-GO.** GCS, NEWS2 and Shock Index product decisions remain PENDING. Existing approved ABG product directions remain APPROVED; ABG clinical/laboratory and Infusions pharmacy decisions remain PENDING. No code, calculation, threshold, warning, input validation, application behavior or existing test expectation is changed.

## 1. Purpose, scope and traceability

Prepare case records that a qualified independent reviewer can challenge, complete and sign before any future implementation or release decision. No patient data or care intervention is authorized. Source-derived mathematical references, engineering observations, measurement reliability, clinical validity, licensing and regulatory/facility approval are different evidence layers.

| Candidate / evidence ID | Matrix | Cases | B: source-backed arithmetic/NT | Q: source-backed qualitative requirement | P: complete expectation PENDING |
| --- | --- | --- | --- | --- | --- |
| GCS / E01 | [GCS matrix](GCS-VERIFICATION-MATRIX.md) | 33 | 19 (12 sums, 7 NT patterns) | 0 | 14 |
| NEWS2 / E02 | [NEWS2 matrix](NEWS2-VERIFICATION-MATRIX.md) | 108 | 76 | 4 | 28 |
| Shock Index / E03 | [Shock Index matrix](SHOCK-INDEX-VERIFICATION-MATRIX.md) | 40 | 21 | 0 | 19 |
| Total | Three matrices | 181 | 116 | 4 | 61 |

These mutually exclusive counts describe reference readiness, not clinical pass rates. Every row's clinical approval is PENDING, including the 120 B/Q rows. P cases may contain known final arithmetic but lack an authoritative complete workflow/validator expectation. Q cases intentionally have no invented missing-data total. A valid mathematical ratio can coexist with unapproved formatting or interpretation.

Link each case to [Phase 2D](../clinical-safety/GCS-NEWS2-SHOCK-INDEX-SAFETY-REVIEW.md) G-V/N-V/S-V/X-V families and GNS-D decisions, [evidence matrix](../clinical-governance/CLINICAL-EVIDENCE-MATRIX.md) E01–E03, [risk register](../clinical-governance/RISK-REGISTER.md) H03/H04/H08/H10–H12, [intended-use draft](../clinical-governance/INTENDED-USE.md) and [V&V gates](../clinical-governance/VERIFICATION-VALIDATION-PLAN.md). IDs `IV-GCS-001` etc identify individual cases; `GNS-Dxx` remains the Phase 2D decision namespace. Do not reuse IDs for a changed clinical meaning; version the case and retain prior observations.

## 2. Independence and reviewer qualifications

Preparation and synthetic execution here were performed by Codex, not by an independent clinician. No reviewer identity, signature, appointment, license or clinical competence is asserted. A case being derived independently of production arithmetic is not independence of personnel.

| Role code | Required qualification / responsibility before appointment | Independence requirement |
| --- | --- | --- |
| G-review | Appropriately licensed/credentialed emergency, neurological or trauma clinician competent in structured GCS examination, NT assessment and the selected population; pediatric expertise if that scope is proposed | Independently assign observed response ratings and review terminology/limitations; must not approve clinical content merely because its author or software produced it. |
| N-review | Emergency/acute-care clinician experienced in NEWS2 and deterioration pathways, with respiratory review for Scale 2 and nursing deterioration-lead input for measurement/escalation workflow | Independently extract scoring/eligibility rules and adjudicate local applicability; no assumption that UK guidance alone validates Saudi facility deployment. |
| S-review | Emergency/critical-care or trauma clinician experienced in hemodynamic assessment, supported by an evidence-methods reviewer and population specialists when needed | Appraise outcome-specific evidence, exclusions and modifiers without selecting thresholds to match code. |
| Independent engineering verifier | Demonstrated competence in numerical/scoring verification, JavaScript/DOM events, reproducible evidence and negative testing | Separate expected-result derivation from execution. Someone other than the implementation author must review the oracle and discrepancies; disclose conflicts and appoint an additional reviewer if necessary. |
| Measurement and human-factors reviewers | Nursing/clinical measurement competence; relevant POCT/biomedical device knowledge; accessibility/usability expertise with representative emergency physicians | Verify measurement provenance, examination reliability, browser behavior and comprehension independently of numerical matching. |
| Accountable product/clinical safety, legal/regulatory and facility owners | Formally appointed authority for intended use, source rights, residual risks, applicable Saudi regulatory pathway and facility governance | Written decisions within their authority; a clinical reviewer or passing test cannot grant unrelated legal/regulatory or release approval. |

Record identity, role, credential verification, organization, scope of practice, training, independence/conflicts and appointment evidence before review. No numeric inter-rater reliability threshold or clinical tolerance is selected in this protocol; specialists must justify applicable criteria.

## 3. Source selection, version control and rights

Each matrix provides primary-source URLs and editions/sections. Adopt sources explicitly, not by familiarity, apparent agreement or “latest” assumptions. Retain controlled copies where permitted, full title/authors/publisher/edition, publication and access dates, exact page/table/row, file hash, source extraction and any errata. Preserve retrieval failures and partial access. Full appraisals, not search snippets alone, are required for clinical claims.

- GCS references use the official 2015 Assessment Aid and undated official FAQ for ratings/NT/sums. Generic impairment labels and the FAQ's `<8` versus previously reviewed NICE `≤8` head-injury wording remain unresolved. The original 1974 paper is provenance, not automatic equivalence to a later scale. Obtain controlled editions and independently reconcile terminology and scope.
- NEWS2 numerical references use RCP Chart 1 (2017). Chart 4 (2017) informs response review. The supplementary PDF is explicitly **Update: March 2020 / ©2020**; the resource page's April 2021 date is not its edition. Retain both dates; do not silently relabel the PDF as a 2021 clinical revision. No local escalation timing, default-state or fractional-input policy is selected.
- Shock Index uses the published HR/SBP definition from Rady et al. (1994), appraised at abstract level in Phase 2D. Current direct article retrieval was limited by PubMed429/publisher403 responses; indexed bibliographic results remained accessible. Obtain the full article and linked erratum plus the other primary studies identified in Phase 2D before approving any clinical band, inclusivity or population claim. Exact arithmetic references do not depend on adopting those bands.
- Preserve relevant rights evidence from [GCS permissions](https://www.glasgowcomascale.org/permissions/) and [RCP NEWS2 resource/copyright conditions](https://www.rcp.ac.uk/resources/national-early-warning-score-news-2/). The GCS source describes no-fee/no-license clinical/research use with attribution; RCP places conditions on reproduction. Legal/product review must resolve adapted digital display, attribution, distribution and translations. No licensing clearance, regulatory authorization or source-owner endorsement is claimed here.

The selected RCP/GCS PDFs and GCS FAQ were re-read on 2026-10-12; intermittent host failures were resolved with official www URLs. NICE direct retrieval failed in this phase and its earlier source conflict is retained, not independently revalidated. Source-version adoption and rights review remain PENDING.

## 4. Expectation derivation before execution

1. The expectation author first records inputs, units, context, source clause and applicable domain. Hide the actual-result and implementation columns from the independent reviewer until their derivation is frozen. Reviewers must be able to disagree with the draft references.
2. For GCS, independently map actual examination observations to authoritative component criteria; only then add the three numeric ratings. A categorical point-input case tests arithmetic, not the examination. Do not impute NT or missing entries as normal, zero or one.
3. For NEWS2, independently select each literal chart cell on its published measurement grid, include oxygen/consciousness and add integers. Record all seven contributions. Eligibility and contextual cases require separate adjudication. No interpolation, rounding or default normality is inferred where guidance is insufficient.
4. For Shock Index, convert the explicitly declared decimal strings to exact fractions and calculate HR/SBP independently. Keep exact rational value, actual binary value, display and clinical label separate. The documented binary-minus-rational difference is an observation, not an approved tolerance.
5. For missing, invalid, incompatible or unsupported states, identify what the source does and does not establish. Use PENDING when a complete expected behavior is unavailable. Proposed engineering controls (such as dismissed-instance listener cleanup) must be labeled as proposals, not clinical references.
6. A second qualified reviewer checks source extraction, arithmetic, scope and ambiguity. Version and sign the frozen expected-result record. Record later amendments and rationale without replacing the historical actual result to make a test pass.

This preparation batch froze a temporary expectation payload before the observation run. Its SHA256 was `650c2cb888cbe666d3c262bcbedb6cbab0cdb277db57136681c0d5a938a9a662`. This is preparation provenance, not independently witnessed clinical approval. The committed tables are the durable review records; temporary scripts/payloads are not release artifacts or a new regression suite. Final document review corrected the draft wording for IV-SI-035–038 from “final” to “baseline” ratio 3/5; IV-SI-037 explicitly records the independently calculable edited value 120/100=6/5. The digest identifies the original pre-observation draft, not that subsequent wording correction. Actual outputs were unchanged; complete workflow expectations remain PENDING.

## 5. Actual software observations and reproduction

Execution date 2026-10-12, Node v26.11.1, Python 3.14.8, baseline above. All 181 rows were exercised in temporary Node VM fixtures using unchanged production sources. Fresh context per case. The input and sequence cells specify every numeric/categorical value and state transition. Label keys expand to exact messages in each matrix. Context annotations are not fields the app accepts and are not proof that a clinical scenario was simulated.

The observer reused only the minimal DOM adapter from `tests/calculator-accuracy-test.js`, before its test blocks, not any expected results. Instrumentation registered modal IDs, counted document keyboard listeners by callback identity and counted focus calls. SI raw values were captured at the `formatShockIndex` call while retaining the original formatter result. GCS invalid-value cases explicitly changed a selected radio's value in the fixture. No repository code/test was edited. Browser number/select sanitization, actual event order, rendering and focus behavior are not modeled fully.

To independently reproduce:

1. Check out the recorded checkpoint in an authorized review workspace and verify the source hashes below. Use a separate approved browser/VM harness; do not use the actual column as its expected oracle.
2. For each case, open a fresh calculator, enter the complete tuple using the declared units, and perform the listed sequence. GCS uses change events; NEWS2/SI use Calculate. Distinguish input-only clearing from recalculation. Capture each intermediate output, component display, alert and retained/reset input.
3. For injected cases, first prove normal controls cannot offer the malformed value. In an isolated synthetic harness assign the value explicitly, record that injection, and capture behavior. Do not report this as an ordinary clinician-entry path.
4. For F01, calculate GCS, dismiss its backdrop, reopen and close normally; count calculator-owned document keydown callbacks after each step. For F02, invoke NEWS2/SI opener while already open, then close. Also independently test actual-browser Escape/Tab/focus and detached elements across calculators.
5. Attach timestamped outputs, screenshots where relevant, runner/environment versions, source hashes and case IDs. Compare source-backed components/sums separately from messages. A PENDING oracle receives OBSERVED/PENDING, never a fabricated PASS.

| Unchanged artifact | SHA256 |
| --- | --- |
| [GCS source](../../js/calculators/gcs.js) | `10cb59da883ecfd6dd1115324eefd18b05ec4d06b68f37502262f5415505c90d` |
| [NEWS2 source](../../js/calculators/news2.js) | `25cb053d902c066eb93ac5b24298c783391d5802932ce1f2ac00b84b356ad93f` |
| [Shock Index source](../../js/calculators/shock-index.js) | `3af69af502cba9ae5f13df8d58464ab9a5614d729496809ab37c13bd77c2a95c` |
| [Accuracy test / DOM adapter](../../tests/calculator-accuracy-test.js) | `ba72d9773fca4233ccb9a4c9e23cdb92700170b0a67562fd181c4683b83cfa75` |
| [Result-safety test](../../tests/result-safety-test.js) | `58e5a3f7109d139da115f58a118caa0307fc9df93c39f457a94483372837613d` |

The final temporary observation payload SHA256 was `d4cd2015e8ba437cbd8adf95629af8396dcd1790ef6c2c5fb3a3249621d03c13`. Tables preserve observed values and intermediate steps; this digest alone is not an independently reproducible evidence bundle or reviewer signature. A formal verification campaign must retain its own controlled runner and raw artifacts with signed provenance.

Executed unchanged supplementary checks:

```sh
node tests/calculator-accuracy-test.js
node tests/result-safety-test.js
python tests/smoke-test.py
```

All three passed. Accuracy includes 120 numeric GCS combinations/seven NT masks, NEWS2 saturation bands and SI boundary displays; result-safety's 93 transitions span Infusions/NEWS2/SI, not GCS or 93 per calculator. Smoke checked 30 scripts, 25 onclick functions and static duplicate IDs. Other suites were not re-executed in Phase 3A; Phase 2D evidence retains its original scope. No new browser execution or clinical validation occurred.

## 6. Discrepancy management and known open issues

| Discrepancy | Current evidence / scope | Required disposition and owner |
| --- | --- | --- |
| F01 / F02 | IV-GCS-033, IV-NEWS2-104, IV-SI-038 reproduce retained keyboard callbacks; GCS backdrop also bypasses focus restoration | Engineering/clinical safety: independent browser reproduction, causal assessment, authorized control specification and subsequent verification; OPEN, no fix authorized here. |
| DG-ENUM | IV-GCS-025–028: injected E0→total11; V6 or M7→16; E=NaN→NaN with SEV label | G-review/engineering: abnormal-state validation finding beyond Phase 2D source inspection. Normal radios do not offer these values. Approve defensive-state requirements and assess reachability; no clinical interpretation of these invalid scores. |
| DG-LABEL / DG-MISSING / DG-STATE | Sum/NT references agree, but labels, missing-selection semantics, examination reliability and recovery policy remain unapproved | G-review and product owner: source-version reconciliation, clinical vignettes, exact wording and population exclusions; PENDING. |
| DN-POLICY / DN-CONTEXT / DN-RESPONSE | Fractional inputs, empty-enum fallbacks, incomplete/unmeasurable observations, Scale2 eligibility, confusion/defaults and local response remain unresolved | N-review/facility/measurement leads: independently selected policies and contextual evidence, without silently adopting current fallback behavior. |
| DS-DOMAIN / DS-DISPLAY / DS-BOUNDARY / DS-CLAIM / DS-CONTEXT | Exact arithmetic available; numerical reporting, five labels, input domains, clinical inclusivity, paired measurements and populations unapproved | S-review/independent verifier: full source/erratum appraisal, signed intended claims and display semantics; no epsilon or familiar range promoted to policy. |

Log each discrepancy with case IDs, baseline, expected and actual evidence, reproducibility, ordinary versus injected path, potential harm, uncertainty, affected hazards/requirements, accountable role, proposed resolution, impact analysis and status. Classify arithmetic difference, source mismatch, input/workflow policy gap, implementation defect and unverified browser effect separately. Do not erase an anomaly by changing tests or retrospective source selection.

For disagreement: retain both interpretations, seek an independent specialty adjudicator, record rationale and any source-owner clarification. Unknown clinical significance remains unknown; no unsupported quantitative risk score. Closing an issue requires approved requirements, independent evidence, signed disposition and residual-risk review. A documented scope exclusion must remove unsupported claims/access from a future release through controlled change; documentation alone does not accomplish it.

## 7. Acceptance gates and sign-off record

Preparation acceptance only: every case has a unique ID, full inputs/units, source/version or explicit unavailable requirement, independent method, actual evidence with limitations, discrepancy, clinical significance and unassigned/PENDING reviewer fields; links and traceability resolve; changes are documentation only. These checks authorize this documentation checkpoint, not care use.

Before authorizing later implementation, appointed owners must approve intended scope, source/right conditions, clinical/input/precision/workflow policies, independently derived expectations, hazard controls and a bounded implementation plan. Before clinical release, additionally require independent conformance evidence on the final build, clinically adjudicated outcomes/messages, local measurement compatibility, intended-user/human-factors validation, discrepancy disposition, residual-risk acceptance and applicable regulatory/facility authorization. Numeric agreement alone closes none of these gates.

Required review coverage includes normal and severe observations; every score boundary; valid/invalid/missing/NT distinction; all legal GCS combinations and examination barriers; NEWS2 scales/oxygen/consciousness and incomplete data; SI numerical and contextual boundaries; recovery/reset/lifecycle; unknown/excluded populations; wrong units/patient/time; measurement reliability; five viewports and themes, keyboard/readers and clinician comprehension. The current matrices are representative preparation, not a declaration of exhaustive coverage.

| Sign-off field — complete per case set and decision | Current value |
| --- | --- |
| Case IDs / version / proposed clinical claim | Matrix scope only; final claim PENDING |
| Source edition, section, extraction, controlled-copy hash and rights record | References supplied; adoption/controlled-copy/rights sign-off PENDING |
| Expectation author and independent reviewer identities, credentials and conflicts | UNASSIGNED |
| Independent method / reference results / uncertainty | Draft matrices; professional review PENDING |
| Actual build, environment, runner and raw evidence | This checkpoint's VM observations only; formal campaign evidence PENDING |
| Discrepancy IDs, resolution evidence and residual risks | OPEN/PENDING as listed |
| Clinical, measurement and human-factors acceptance / limitations | PENDING |
| Product-owner / independent clinical reviewer signatures and dates | None / PENDING |
| Implementation authorization / accountable owner / date | NOT AUTHORIZED / UNASSIGNED |
| Regulatory/facility/release record, expiry and change triggers | PENDING; clinical release NO-GO |

Review source updates, altered populations/claims, UI/rounding changes, measurement methods, incidents and new evidence through controlled impact assessment. Preserve ABG/Infusions blockers and original product directions. A limited-release proposal must explicitly resolve accessible excluded functions and reference pages; it cannot waive their risks by approving these three calculators alone.

**All clinical policy decisions PENDING. Clinical implementation NOT AUTHORIZED. Clinical release NO-GO.**
