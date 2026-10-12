# Infusions pharmacy safety decision package — Phase 2B

Document ID: INF-PDP-001. Version: 1.0 DRAFT. Prepared: 2026-10-12.
Baseline: `ec1e26d9a714f3a915570f06a48fe89fbe922344` on `docs/v1.3-clinical-governance`; clean working tree and no partial package found at resume.

**All clinical/pharmacy decisions: PENDING. Clinical implementation: NOT AUTHORIZED. Clinical release: NO-GO. Known rounding defects: OPEN.** No option, error threshold, precision, warning or clinical scope is selected by this package. A documentation commit is not professional approval or implementation authorization.

## 1. Purpose, evidence and current behavior

This package converts confirmed findings into questions for independent pharmacy and clinical review. It supplements, without superseding, [INFUSIONS-SAFETY-REVIEW.md](INFUSIONS-SAFETY-REVIEW.md) (S01–S11, INF-H01–H06 and INF-V01–V08) and [INFUSION-PRECISION-DECISION.md](INFUSION-PRECISION-DECISION.md) (infusion D01–D12, all PENDING). Those infusion identifiers are separate from approved ABG product directions bearing similar IDs. No new evidence-supported risk was identified in preparing this package; the [governance risk register](../clinical-governance/RISK-REGISTER.md) remains unchanged and OPEN.

Evidence inspected at the baseline:

| Source | What it establishes and limitation |
| --- | --- |
| [Infusions implementation](../../js/calculators/infusions.js), lines 374–540 | Parsing, bounds, four conversions, formatting and clearing/reset. It establishes software behavior only. |
| [Independent verification](../../tests/infusions-verification-test.js), especially lines 75–203 | Precomputed rational references, five unresolved display defects, all 12 ordered unit transitions, invalidation and failure/recovery. Mock DOM coverage is not comprehensive browser or clinical validation. |
| [Infusions regression](../../tests/infusions-test.js) | Overflow, positive-small-value fallback, boundaries and legacy snapshots; passing snapshots preserve known defects. |
| [Precision prototype tests](../../tests/infusion-precision-prototype-test.js), [isolated formatter](../../tests/prototypes/infusion-formatter.js), [prototype specification](../../tests/prototypes/README.md) | An unapproved six-significant-digit candidate and independent rational error oracle. Production does not import it. |
| [Governance V&V plan](../clinical-governance/VERIFICATION-VALIDATION-PLAN.md) and [mobile audit](../ux/MOBILE-ACCESSIBILITY-AUDIT.md) | Release gates and engineering/browser evidence provenance; no pharmacy or clinical approval. |

Current mathematics: C = amount in mg / final volume in mL. Required mg/min is dose × weight / 1000 for mcg/kg/min, dose / 1000 for mcg/min, dose × weight for mg/kg/min, and dose for mg/min. Rate = required mg/min / C × 60 in mL/hr. Weight is in kg and is unused for absolute-dose units. Displayed concentration is not fed back into rate arithmetic.

Current dose, amount and volume must each be finite and at least 0.000001; weighted units require weight 0.1–500 kg inclusive. No finite upper bound is applied to dose, amount or volume. These software bounds are not approved clinical domains. Unknown dose keys and nonfinite/nonpositive intermediate/final outputs are rejected with both results cleared. No drug, route, age, pump model or preparation compatibility is assessed.

Current concentration uses three decimal places and rate two. Positive values that would display fixed zero use scientific notation with up to six significant digits. This controls literal-zero display in existing probes but leaves the five defects below. Editing inputs/units clears results in tested event paths; changing units retains the numeric dose rather than converting the prescription to an equivalent amount.

Published context rechecked on 2026-10-12:

- [FDA, Infusion Pump Risk Reduction Strategies for Clinicians](https://www.fda.gov/medical-devices/infusion-pumps/infusion-pump-risk-reduction-strategies-clinicians), “Check” section; publication date not established from the accessed page. Discusses independent checks for high-risk infusions under facility policy and checking dose/rate/volume. This informs workflow questions; it does not approve Emergency Toolkit or determine Saudi requirements.
- [ISMP List of Error-Prone Abbreviations, Symbols, and Dose Designations](https://www.ismp.org/system/files/resources/2024-04/ISMP_ErrorProneAbbreviation_List.pdf), ©2024, pages 2 and 6–7. Covers microgram notation, leading zeros, trailing zeros in whole-number doses and number/unit separation. It supports communication review, not a specific rate/concentration precision or exponent policy.

Neither reference supplies a universal drug-independent error allowance, numerical domain or pump compatibility claim. Local formulary/preparation standards, relevant product labeling and any proposed device instructions must be supplied and reviewed before related policies can close.

## 2. Five defects and alternative displays

Synthetic cases only; none is a prescription, clinically suitable preparation or pump recommendation. All doses below are mcg/min; an entered weight of 70 kg is ignored. S identifiers match Phase 2A. Current display error is relative to the independently derived exact decimal reference, not a permitted delivered-dose deviation.

| Case | Dose; amount / final volume | Quantity and exact reference | Current text | Signed display error |
| --- | --- | --- | --- | --- |
| S01 | 0.005; 60 mg / 1000 mL | Rate 0.005 mL/hr | `0.01 mL/hr` | +100% |
| S02 | 0.006; 60 mg / 1000 mL | Rate 0.006 mL/hr | `0.01 mL/hr` | +66.6667% |
| S03 | 0.0149; 60 mg / 1000 mL | Rate 0.0149 mL/hr | `0.01 mL/hr` | −32.8859% |
| S04 | 0.1; 4 mg / 50 mL | Rate 0.075 mL/hr | `0.07 mL/hr` | −6.6667% |
| S05 | 0.001; 0.5 mg / 1000 mL | Concentration 0.0005 mg/mL | `0.001 mg/mL` | +100% |

In S05, actual rate remains `0.12 mL/hr` because raw concentration is used internally. Transcription or external reuse is a potential medication-error pathway; actual patient harm has not been demonstrated.

Alternatives below are illustrative displays calculated from observed production raw Numbers, with units shown as they would need to be reviewed. They are not proposed regression expectations. Four decimal places and six significant digits are comparison parameters, not selected policies.

| Case | A: fixed four decimals | B: existing six-significant-digit hybrid prototype | C: always scientific, six significant digits |
| --- | --- | --- | --- |
| S01 | `0.0050 mL/hr` | `0.005 mL/hr` | `5.00000e-3 mL/hr` |
| S02 | `0.0060 mL/hr` | `0.006 mL/hr` | `6.00000e-3 mL/hr` |
| S03 | `0.0149 mL/hr` | `0.0149 mL/hr` | `1.49000e-2 mL/hr` |
| S04 | `0.0750 mL/hr` | `0.075 mL/hr` | `7.50000e-2 mL/hr` |
| S05 | `0.0005 mg/mL` | `0.0005 mg/mL` | `5.00000e-4 mg/mL` |

All three alternatives represent the exact reference numerically in these five cases. This finite comparison does not establish acceptable behavior over the supported domain. The prototype returns strings without units; this table appends units for review and grants no approval to integrate it.

| Alternative | Benefit demonstrated / possible benefit | Unresolved trade-off and evidence needed |
| --- | --- | --- |
| Current two/three decimals plus fixed-zero fallback | Familiar stable decimal layout; fallback retains tiny positive numbers in tested cases | Five known defects remain OPEN; retaining current code during review is not clinical acceptance. |
| A: fixed decimals, count selected by reviewers | The illustrative four-decimal count resolves these five numerical discrepancies | Uniform absolute resolution gives variable relative error. Pure four-decimal formatting makes 0.00001 become 0.0000; a fallback/domain refusal would need explicit approval. Extra zeros can imply measurement accuracy; fixed decimals do not define a pump increment. |
| B: significant digits with reviewed ordinary/scientific transitions | Preserves relative detail across magnitudes; isolated six-digit candidate resolves these cases | Variable decimal places, carry/notation transitions and apparent precision need comprehension evidence. Existing prototype boundaries [1e-6, 1e6) and candidate error bound 5e-6 (0.0005%) against raw Number remain PENDING. |
| C: scientific notation at a reviewed digit count | Compact representation over a wide numerical range; explicit exponent | Exponent loss/misreading and transfer into systems without scientific input need study. Mantissa zeros and exponent syntax require review; compactness does not establish clinical usability. |
| D: withhold results outside an approved domain or error criterion | Could prevent reliance when numerical/clinical support is absent | Eligible domain, threshold, message and recovery workflow are unspecified. Cannot assign any S01–S05 row to this option without policy; no refusal is implemented. |

Notation and rounding are separate decisions: ordinary/scientific text can encode the same rounded value. More digits cannot restore precision lost in arithmetic or prove accuracy of weight, preparation, prescription or delivery.

## 3. Explicit pharmacy decision questions

Every PD question is **PENDING**, with no preferred or preselected option. Mappings refer to existing infusion D identifiers and Phase 2A INF-V requirements. Review order: PD01/PD07/PD08 scope → PD02/PD09/PD10 context → PD03–PD06 numerical presentation → PD11 evidence/authorization. Decisions may need iteration as evidence changes.

| ID / mapping | Decision question and alternatives to resolve | Required decision evidence / reviewer |
| --- | --- | --- |
| PD01 / D07,D09; V08 | Which patients, drugs/preparations, routes and prescription workflows are in scope? Generic mathematical adjunct with explicit exclusions, restricted local formulary profiles, or defer unsupported use? | Signed intended scope, population limits and relevant labeling/local policy; independent medication-safety pharmacist and emergency/critical-care physician. |
| PD02 / D07,D08; V03,V04 | What dose ranges apply to each supported unit, and what amount, final-volume, concentration, weight and rate domains are permitted? Which combinations are valid? Are limits numerical, clinical, preparation-specific or device-specific? Retain/flag/withhold outside which boundaries? | Domain table with units, inclusive/exclusive edges, dependencies, sources and missing-context handling; pharmacist/clinical lead, engineer for numeric reachability. No universal limit inferred from current bounds. |
| PD03 / D02,D08; V02,V03 | What absolute, relative or combined error criteria apply separately to concentration and rate? Against exact decimal-input reference, stored Number or another justified reference? Are arithmetic and display budgets distinct? What happens when criteria fail? | Chosen metric, denominator/zero handling, eligible domain, units, rationale and independent oracle; pharmacy/clinical approval supported by numerical reviewer. Every threshold blank until signed. |
| PD04 / D01,D03; V02,V03 | Fixed decimal places or significant digits, and how many for each output? Round nearest, ties-to-even, ties-up or another justified rule? Operate on stored binary values or exact decimal inputs? | Explicit tie/carry/double-rounding examples and input semantics, independently calculated. No automatic epsilon correction; changing arithmetic requires separate authorization. Pharmacy/clinical plus engineering review. |
| PD05 / D04,D05; V03,V07 | Ordinary decimals, scientific notation or a hybrid? What boundaries, mantissa/exponent syntax, leading/trailing zeros, units and copy/read-aloud behavior are acceptable? | Representative clinician/pharmacist transcription and comprehension evidence, including both sides of transitions; human-factors/accessibility review. Reconcile MS2 context with approved local presentation. |
| PD06 / D04,D07,D08; V02,V03 | How must a valid nonzero small result be represented? More ordinary digits, scientific text, or explicit unavailability beyond the approved domain? How are exact zero, underflow, missing data and unsupported values distinguished? | Boundary/adjacent-value matrix and reviewed unavailable-state wording; avoid silent clamping or treating missing as zero. Pharmacy/clinical plus engineering; no new UI wording selected. |
| PD07 / D05,D09; V01,V05 | Is scope limited to mcg/kg/min, mcg/min, mg/kg/min and mg/min with mg, kg and mL inputs? How are external hourly/unit-based/percentage prescriptions handled, and what review prevents unsupported conversion? | Signed unit/conversion boundary table, preparation/final-volume meaning and unit-change workflow. Any added conversion is separate scope; pharmacy and independent numerical reviewer. |
| PD08 / D06,D09,D10; V08 | Are outputs mathematical calculations only, or is a future pump-programming claim sought? If calculation-only, what boundaries and disclosure are required? | Signed intended-output claim and workflow. No current evidence supports pump-programmable output. A future pump option opens a separate device evidence/authorization track; pharmacy, clinical, product and regulatory owners. |
| PD09 / D10; V08 | If a device claim is sought, which exact models, software/library versions, modes, increments, operating ranges, delivery accuracy and conditions are supported? How is quantization/deviation evaluated, and when is a result refused? | Manufacturer instructions, local device configuration, compatibility testing and pharmacist/biomedical/clinical approval. No generic device assumption. If excluded, record signed scope rationale; this package does not mark D10 approved or not applicable. |
| PD10 / D06,D11; V07,V08 | What independent double-check is required for which medicines/workflows, who performs it and when? What inputs, calculation, preparation and device setting are checked; how are disagreements escalated and documented? | Versioned facility policy and task simulation. Reviewers work independently before comparison, using an approved independent method rather than merely repeating the same calculator. Pharmacy, nursing/administration lead and clinical governance. |
| PD11 / D11,D12; V01–V08 | What independent evidence, residual-risk disposition and signed decisions permit a bounded implementation and later release? | Traceable requirement/test/reviewer records, usability evidence, documented exclusions and applicable facility/regulatory gates; accountable clinical/pharmacy and release owners. Implementation and release remain separate decisions. |

PD09 is conditional on future device scope; obtaining a reviewer's acknowledgment of this package does not authorize that scope. Domain and error fields must be completed explicitly, with units and source versions; software PASS must never populate an approval field.

## 4. Accuracy and suitability assessment form

For each selected candidate, reviewers must assess four distinct layers:

| Layer | Required evidence and unresolved decision |
| --- | --- |
| Arithmetic | Exact independently derived value versus stored computed Number, including conversions and overflow/subnormal behavior; arithmetic error limits PENDING. |
| Display | Parsed display versus raw Number and exact reference, separately; signed and absolute relative errors, absolute error with units, notation stability; display limits PENDING. |
| Clinical/preparation suitability | Appropriate patient/drug/route/prescription, weight basis, final volume and local preparation policy; numerical equality does not answer this question. |
| Device/administration suitability | Approved device capability, configuration and independent-check workflow if claimed; display accuracy alone does not establish deliverability. |

For positive reference x, absolute error is abs(display − x), and signed relative error is (display − x)/x. Specify whether x is exact mathematical reference or raw Number for each measurement; report both rather than conflating them. Relative error is undefined at zero, so zero/unavailable cases need categorical requirements. Do not combine numerical error, measurement uncertainty and delivery tolerances into an unsupported single percentage.

Candidate decision record (complete one per PD question): chosen option **PENDING**; exact rule/units/domain **PENDING**; source/version **PENDING**; rejected alternatives/rationale **PENDING**; independent evidence IDs **PENDING**; residual risk/exclusions **PENDING**; reviewer name/role/independence **UNASSIGNED**; decision/date/signature **PENDING**; effective version/review date **PENDING**. Document disagreement and required further evidence; do not infer consensus.

## 5. Proposed acceptance tests and evidence before implementation

These are requirements for a future approved package, not changes to current tests. Existing known-defect snapshots remain intact. Map PD → approved requirement → INF-H/governance hazard → INF-V case → independent expected result → execution artifact → professional disposition.

| Evidence group | Proposed tests / independent evidence | Closure prerequisite |
| --- | --- | --- |
| E01 / V01,V05 | All four unit formulas; D=0.1, W=70, A=4, V=50 gives exact rates 5.25, 0.075, 5250 and 75 mL/hr in current unit order. Equivalent doses 0.1, 7, 0.0001 and 0.007 give 5.25. Different preparation/repeating fractions; all 12 ordered unit changes and unsupported keys. | Independent pharmacist/numerical derivation, PD07 unit scope and PD03 tolerance approved. |
| E02 / V02 | All five defects with original exact inputs, raw values, full unit-bearing strings and errors for each candidate. Verify formatted concentration is never reused for rate. Add independently selected values beyond the five examples. | PD03–PD06 signed expected outputs and acceptance criteria; keep historical defect evidence. |
| E03 / V03,V04 | Below/at/above each approved input/output boundary, tiny positive values, zero, missing/invalid/nonfinite, min normal/subnormal and maximal finite numbers where reachable; overflow despite finite exact result; notation carries and adjacent representable values. Distinguish formatter-only probes from admissible prescriptions. | PD02/PD03/PD06 domains and failure handling approved; no automatic clinical adoption of current bounds. |
| E04 / V03 | Exact binary ties and decimal-looking ties (including 0.015, 0.025, 1.005), powers of ten, carry across notation boundaries, one rounding stage versus double rounding; exact decimal and binary references separately. | PD04 semantics approved; oracle independent of candidate formatter. |
| E05 / V04–V06 | Ordinary edits, unit changes, invalid recovery, reset, close/reopen, reentrant lifecycle and any authorized integrations; preserve inputs on rejection and clear dependent results. Native browser numeric/locale/step behavior separately verified. | Approved state and validation requirements; actual DOM evidence, not only mocks. |
| E06 / V07 | Five widths 320/360/390/768/1280, supported themes, zoom, keyboard, screen reader and unit-preserving copying; representative clinicians/pharmacists interpret/transcribe both very small and ordinary values. | Protocol and comprehension acceptance criteria approved before study; PD05/PD06 sign-off. Browser regression PASS alone insufficient. |
| E07 / V08 | Facility independent-check scenario using order/preparation/weight/units and an independent reference; disagreement/recovery exercise. Device-specific evidence only if separately authorized. | PD01/PD08–PD10 signed scope, workflow and applicable device evidence. |
| E08 / all | Evidence coverage, anomalies, remaining hazards, source versions, clinical/pharmacy review and implementation authorization. | PD11 signed; no inferred regulatory or clinical approval. |

Independent reviewers should derive expected calculations without copying the production formulas or formatter implementation as their oracle, using dimensional analysis and controlled rational/decimal references. Record qualifications, independence from implementation, baseline, input strings, tools/runtime, raw/display outputs, expected values, error calculations, exceptions and signatures. Clinical reviewers assess suitability and workflow separately from the numerical verifier.

Before implementation: applicable PD questions resolved in signed records; selected policy and domain fully specified; independent acceptance matrix approved; open disagreements dispositioned; bounded change explicitly authorized. Before clinical release: approved implementation verified, independent clinical/pharmacy and human-factors validation complete, residual risks accepted or scope excluded, and applicable [regulatory/facility gates](../clinical-governance/SFDA-REGULATORY-ASSESSMENT.md) met with separate release authorization. Neither gate is passed here.

## 6. Pharmacist review checklist and approval fields

All boxes are intentionally unchecked. Review completion is distinct from approval of a policy or clinical release.

- [ ] Confirm intended patients, drugs, routes, preparation assumptions and exclusions (PD01).
- [ ] Supply unit-specific dose and concentration/domain evidence; resolve missing context and boundary handling (PD02/PD07).
- [ ] Independently reproduce S01–S05 and compare options beyond those examples (PD03–PD06).
- [ ] Record separate arithmetic/display error criteria, reference quantities and rationale; no threshold accepted by default (PD03).
- [ ] Decide digit count, rounding semantics, notation and small-value behavior with documented alternatives (PD04–PD06).
- [ ] Assess decimal/exponent/trailing-zero interpretation and copying with intended users (PD05).
- [ ] Resolve mathematical-output versus device-setting claims; supply device evidence only for separately authorized scope (PD08/PD09).
- [ ] Approve facility independent-check responsibilities, timing, evidence and discrepancy escalation (PD10).
- [ ] Review independent test evidence, anomalies, residual risks and remaining professional disagreements (PD11).
- [ ] Record exact approved scope, sources, limitations, version and signatures; leave implementation and release decisions separate.

| Review/authorization field | Required role | Name / record / date / signature | Status |
| --- | --- | --- | --- |
| Pharmacy policy and medication safety | Independent medication-safety/clinical pharmacist with relevant infusion expertise | UNASSIGNED / — | PENDING |
| Clinical suitability and population scope | Independent emergency/critical-care physician; pediatric expertise if included | UNASSIGNED / — | PENDING |
| Numerical verification | Reviewer independent of implementation with arithmetic/testing expertise | UNASSIGNED / — | PENDING |
| Administration/double-check workflow | Facility nursing/infusion practice lead and pharmacy | UNASSIGNED / — | PENDING |
| Human factors/accessibility | Qualified reviewer and representative clinical users | UNASSIGNED / — | PENDING |
| Device compatibility, if future scope requires it | Biomedical/device specialist plus pharmacy/clinical | UNASSIGNED / — | PENDING — conditional scope |
| Policy consolidation / residual-risk acceptance | Accountable clinical safety and pharmacy owners | UNASSIGNED / — | PENDING |
| Production implementation authorization | Accountable product/clinical/pharmacy change owners | UNASSIGNED / — | NOT AUTHORIZED |
| Clinical release, facility and regulatory disposition | Accountable release, facility and regulatory owners | UNASSIGNED / — | NO-GO |

## 7. Package verification and limits

The unchanged independent Infusions verification and precision prototype suites were executed for this package: PASS, with all five defects still explicitly UNRESOLVED and 9,628 finite prototype formatting checks. The prototype's upstream subnormal total-error counterexample remains a reported limitation; it is outside accepted current infusion minima. Its formatting-bound success is not clinical acceptance.

A read-only comparison evaluated the five observed raw values with current formatting, `toFixed(4)`, the isolated prototype and `toExponential(5)` to check section 2. Documentation checks cover local links, decision/status consistency, exact decimal reference errors and documentation-only scope. No new browser, device or clinician study was performed. Prior user-reported browser results remain prior regression evidence in the mobile audit. No application code, tests, existing warning text or risk/approval decision is changed.

**All clinical/pharmacy decisions remain PENDING. Clinical implementation NOT AUTHORIZED. Clinical release NO-GO.**
