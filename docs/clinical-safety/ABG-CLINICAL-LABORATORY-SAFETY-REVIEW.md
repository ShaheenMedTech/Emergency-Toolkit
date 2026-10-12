# ABG clinical and laboratory safety review — Phase 2C

Document ID: ABG-CL-001. Version: 1.0 DRAFT. Reviewed: 2026-10-12.
Baseline: `ca5b8f5b5366969812eeb850924fb20ff3cff7d2`, branch `docs/v1.3-clinical-governance`; working tree clean before review. Supplied instructions and Ryoku vault reviewed; no repository AGENTS.md/CLAUDE.md found.

**D10–D12 product-owner directions: APPROVED. All unresolved clinical/laboratory policies: PENDING. Clinical implementation: NOT AUTHORIZED. Clinical release: NO-GO.** No new formula, threshold, interval, clinical diagnosis, warning or implementation is approved here. Synthetic examples describe mathematics or current software, not patient-care advice.

## 1. Scope, records and authority

This consolidates the current ABG calculator and proposed gap/correction/delta work for independent emergency-medicine and laboratory review. It preserves all earlier decisions and their evidence limitations. Historical document statements about their then-current branch, untracked status and no-commit scope are historical provenance, not present repository state.

| Existing record reviewed | Authority / contribution |
| --- | --- |
| [ABG interpretation safety specification](ABG-INTERPRETATION-SAFETY-SPEC.md) | D01–D18 clinical-policy register and AC01–AC14 acceptance framework; unresolved clinical policies remain PENDING. |
| [Clinical decision review](ABG-CLINICAL-DECISION-REVIEW.md) | D08 product-approved validation order; D09 confirmed affected-interpretation withholding direction; clinical criteria/dependencies pending. |
| [Mixed-disorders and compensation review](ABG-MIXED-DISORDERS-COMPENSATION-REVIEW.md) | Later D02–D07 product directions; no approved numerical methods or clinical truth table. |
| [Stage 1 validation preparation](ABG-STAGE1-VALIDATION-PREPARATION.md) | Analyzer-aware adult arterial, actual calculated bicarbonate, same-specimen preparation; local analyzer and tolerance unknown. |
| [Phase 4C gap review](ABG-ANION-GAP-CLINICAL-REVIEW.md), section 7 | Confirmed D10–D12 product directions, separate from clinical/laboratory approval. |
| [Phase 4D matrix](ABG-ANION-GAP-VALIDATION-MATRIX.md) | VM01–VM17, V01–V14 and AC-V01–AC-V08 remain applicable. |
| [Phase 4E readiness](ABG-ANION-GAP-APPROVAL-READINESS.md) | All 17 requirements and X1–X7 evidence conflicts; readiness does not mean approval. |
| [D10 published evidence](ABG-D10-PUBLISHED-EVIDENCE-POLICY.md) | Potassium convention, method-specific intervals, bicarbonate sources, negative/extreme results. |
| [D11 correction evidence](ABG-D11-ALBUMIN-CORRECTION-EVIDENCE.md) | Empirical correction, units, reference/assay/domain limits and endpoint disagreements. |
| [D12 delta evidence](ABG-D12-DELTA-ASSESSMENT-EVIDENCE.md) | Ambiguous terminology, baselines, eligibility and denominator safeguards; numerical-only direction. |
| [Independent fixtures](ABG-INDEPENDENT-FIXTURES.md) | E1–E9 and boundary snapshots establish behavior, not independently approved patient diagnoses. |
| [Anion Gap numerical tests](ANION-GAP-NUMERICAL-TESTS.md) | Exact-decimal versus raw binary/display distinctions, signed zero and engineering error bounds. |
| [Winter display record](WINTER-COMPENSATION-DISPLAY.md) | Historical rounded-midpoint contradiction corrected; raw-bound readability remains unresolved. |

The [risk register](../clinical-governance/RISK-REGISTER.md) already covers these findings in H03–H07 and H10–H12. This review identifies no newly supported risk requiring a register update. No existing clinical-safety record is modified. [Governance V&V](../clinical-governance/VERIFICATION-VALIDATION-PLAN.md) and [intended use](../clinical-governance/INTENDED-USE.md) remain drafts; clinical use in Saudi emergency departments is not authorized by this review.

## 2. Implemented inventory at this checkpoint

References are to [acid-base.js](../../js/calculators/acid-base.js): fields and unit labels 40–125; result headings 132–150; clinical note 155–161; listener lifecycle/clearing 199–327; parsing/validation 333–389; AG 396–402; labels 411–445; compensation 452–503; oxygen text 506–508. These describe code, not approved clinical rules.

### Inputs and validation

All six inputs are mandatory, parsed with `Number()`, finite and within inclusive bounds. HTML steps do not enforce quantization in the Calculate click handler.

| Input | Displayed unit | Current software bounds | HTML step |
| --- | --- | --- | --- |
| pH | Dimensionless | 6.5–8.0 | 0.01 |
| PaCO₂ | mmHg | 5–150 | 1 |
| HCO₃⁻ | mmol/L | 1–60 | 0.1 |
| PaO₂ | mmHg | 1–500 | 1 |
| Na⁺ | mmol/L | 80–220 | 1 |
| Cl⁻ | mmol/L | 40–180 | 1 |

These are validation bounds, not reference intervals, treatment targets or physiological validity criteria. Blank/whitespace becomes zero and is rejected; NaN/Infinity and values outside bounds are rejected. Only the first invalid field is reported. Nonfinite/zero values produce a valid-field alert; other out-of-range values produce a bounds alert. All four results clear and input entries remain. A wrong-unit number within the accepted range is not detected as wrong-unit. There is no unit selector/conversion, age, sample identity/type, collection time, analyzer, albumin, clinical history, temperature or FiO₂ input.

### Arithmetic, reference values and interpretation

- **Uncorrected AG:** `Na − (Cl + HCO3)`, potassium excluded, `toFixed(1)` output. The result heading supplies no unit, equation, potassium convention or corrected/uncorrected label. There is no gap reference interval or high/normal/low category. Permitted operands produce exact mathematical extrema −160 and 179 mmol/L, which are not clinically approved limits. The same HCO₃ entry serves AG and gas interpretation; AG never changes the primary or compensation label.
- **Primary labels:** the following exhaustive truth table inventories current cutoffs; it approves none of them.

| pH condition | Additional condition, evaluated in order | Current text |
| --- | --- | --- |
| pH < 7.35 | HCO₃ < 22 and PaCO₂ ≤ 40 | Metabolic acidosis |
| pH < 7.35 | Otherwise PaCO₂ > 45 and HCO₃ ≥ 22 | Respiratory acidosis |
| pH < 7.35 | Otherwise | Acidaemia — mixed or partially compensated disorder |
| pH > 7.45 | HCO₃ > 26 and PaCO₂ ≥ 40 | Metabolic alkalosis |
| pH > 7.45 | Otherwise PaCO₂ < 35 and HCO₃ ≤ 26 | Respiratory alkalosis |
| pH > 7.45 | Otherwise | Alkalaemia — mixed or partially compensated disorder |
| 7.35 ≤ pH ≤ 7.45 | Any accepted PaCO₂/HCO₃ | pH within reference range — assess for compensated or mixed disorder |

- **Winter:** only if pH < 7.35 AND HCO₃ < 22. Expected midpoint = 1.5 × HCO₃ + 8 mmHg; bounds midpoint ±2. Within raw inclusive bounds: “Appropriate respiratory compensation.” Below: “Additional respiratory alkalosis.” Above: “Additional respiratory acidosis.” Each appends the explicit raw interval and mmHg, marked inclusive. Other inputs receive “No specific compensation formula applied.” No metabolic-alkalosis or acute/chronic respiratory compensation calculation exists.
- **Oxygen:** echoes entered PaO₂ and the current limitation: “PaO₂ alone is not a standalone oxygenation assessment. Interpret with appropriate clinical and contextual information, including FiO₂, oxygen-delivery device, sample type, and local protocol.” No low/normal/high oxygenation label, saturation, P/F ratio, A–a gradient or oxygen-treatment advice is calculated. No assumption of room air is implemented.
- **General note:** calls the calculator an adjunct that should not replace bedside assessment or local protocols. It does not provide the missing validity/provenance rules.
- **State:** all six fields × input/change events clear all outputs; explicit calculation required after edits. Invalid calculation and reset clear outputs; reset empties inputs. Close/replacement/reopen removes tracked listeners and restores focus in existing lifecycle coverage. No ordinary stale-result defect was reproduced in the tests below; future metadata and partial outputs need a new approved dependency map.

## 3. Implemented versus product-approved future direction

| Decision | Present implementation | Preserved product direction | Professional policy still PENDING |
| --- | --- | --- | --- |
| D10 | Excluded-potassium arithmetic only; one-decimal bare result | APPROVED: exclude K, disclose equation/units, no universal laboratory interval, future local intervals, no normal-uncorrected-gap rule-out of important acidosis | Units/schema, valid/compatible sources, local profiles, domains, negative/extreme handling and numerical reporting. |
| D11 | No albumin input/correction or missing-albumin explanation | APPROVED: retain uncorrected AG whenever its inputs are valid; optional separately labeled correction with valid compatible albumin; albumin not required; explain missing-albumin limits | Coefficient/reference, mass units, assay, domain including above-reference albumin, timing and unavailable states. |
| D12 | No Delta Gap or Delta Ratio, baselines or guards | APPROVED: numerical adjunct only after independent clinical/lab validation; disclose assumptions/limits; no automatic mixed-disorder diagnosis/classification | Exact definitions, corrected/uncorrected numerator, baselines, eligibility, zero/negative/near-zero denominator safeguards and precision. |

D10 arithmetic already exists; its broader approved product direction is not fully implemented. D11/D12 remain future features. Their approval does not authorize any clinical change or validate today's labels. Missing albumin must not become a mandatory prerequisite for independently valid basic AG; current all-six-field gas validation and D13 partial-output policy still require reconciliation.

Earlier product directions remain intact: D02–D03 require communication that incomplete assessment does not exclude mixed disorders; D04 requires established clinical applicability before patient-specific Winter interpretation and defers optional conditional arithmetic to separate review; D05–D07 require limitations and acute/chronic respiratory pathways with conditional handling of unknown duration, without inferring duration from gas values. D08 validation order is adult ABG actual calculated bicarbonate → independently validated VBG → independently validated non-neonatal pediatric ABG/VBG → independent chemistry comparison. Neonatal interpretation remains excluded from the proposed scope. D09 requires a future approved significant-inconsistency rule to withhold affected interpretations, warn and preserve entries. Clinical parameters, exact wording, detailed dependencies and implementation remain PENDING; no such consistency rule runs today.

Historical blanket PENDING registers refer to unresolved clinical policy and predate later product approvals. Do not downgrade those product directions or promote them to clinical approval. The early Phase 4C population-options wording does not reopen the staged records' neonatal exclusion.

## 4. Clinical/laboratory evidence and unresolved assumptions

The following selected sources were accessed on 2026-10-12. This is a focused evidence review, not a systematic guideline update. Existing D10–D12 registers retain additional sources and access limitations; no abstract-only source is promoted to full-study appraisal.

| ID | Source, date and scope | Evidence-supported point and limitation |
| --- | --- | --- |
| R1 | [SRLF/SFMU, Diagnosis and management of metabolic acidosis: guidelines from a French expert panel](https://link.springer.com/article/10.1186/s13613-019-0563-2), 15 August 2019, R1.1/R1.3 | Supports process/context assessment, Winter estimates and consideration of albumin correction; low bicarbonate may accompany respiratory alkalosis. Arterial/venous PCO₂ agreement is limited. Its source thresholds and recommendations do not validate this application's gate or population. |
| R2 | [Abbott i-STAT CG8+ IFU ART-784173-00A](https://www.globalpointofcare.abbott/content/dam/ardx/globalpointofcare/apoc/support/i-stat-1/cti-ifu/english-us/ifu/ART-784173-00A.pdf), 31 July 2025, pp. 3–4, US labeling | Example of calculated HCO₃ and calculated TCO₂, direct-method and temperature conventions. Not the intended Saudi laboratory's analyzer, a complete AG panel or local validation evidence. |
| R3 | [Figge et al., Anion gap and hypoalbuminemia](https://pubmed.ncbi.nlm.nih.gov/9824071/), November 1998, indexed abstract | Observational ICU correction derivation: 0.25 per g/L albumin deficit, equivalent 2.5 per g/dL. Not universal coefficient/domain, age/assay validation or diagnostic approval. |
| R4 | [Chionh et al., Serum anion gap revisited: a verified reference interval for contemporary use](https://pubmed.ncbi.nlm.nih.gov/34028972/), September 2022 issue, indexed abstract | Excluded-potassium interval study; transfer restricted to comparable electrolyte reference methods. Its published interval is not a universal default or an approved local profile. |
| R5 | [Laakman et al., Data on the clinical, analytical, and laboratory factors associated with negative anion gaps at an academic medical center](https://pubmed.ncbi.nlm.nih.gov/35757515/), June 2022, indexed abstract | Negative gaps have clinical/analytical associations across sample/method contexts. A negative arithmetic value cannot by itself identify artifact or disease; local flag/verification policy remains required. |
| R6 | [Paulson and Gadallah, Diagnosis of mixed acid-base disorders in diabetic ketoacidosis](https://pubmed.ncbi.nlm.nih.gov/8238083/), November 1993, indexed abstract | Fixed delta-ratio bands overdiagnosed mixed disorders in the studied groups. Neither its bands nor alternative criterion is adopted; population-specific evidence does not validate generic delta eligibility. |
| R7 | [Dinh et al., Correcting the anion gap for hypoalbuminaemia does not improve detection of hyperlactataemia](https://pubmed.ncbi.nlm.nih.gov/16858097/), August 2006, indexed abstract | Correction did not improve overall hyperlactatemia discrimination in this retrospective dataset. Acid-load assessment and lactate detection are different endpoints; do not treat corrected AG as a universal rule-out test. |
| R8 | [BTS guideline for oxygen use in adults in healthcare and emergency settings](https://www.brit-thoracic.org.uk/document-library/guidelines/emergency-oxygen/bts-guideline-for-oxygen-use-in-adults-in-healthcare-and-emergency-settings/), Thorax 2017;72:i1–i90 | Supports adult oxygen-device/flow and blood-gas context. Does not validate pediatric oxygenation, VBG-to-arterial oxygen substitution or an oxygenation calculation in this tool. Current/local applicability requires professional review. |

Required assumptions to resolve:

- **Units and methods:** mmHg numbers cannot be replaced by kPa numbers without a specified conversion. Numerically equivalent monovalent mmol/L and mEq/L conventions still need declared units. Albumin g/L and g/dL require a factor-of-ten conversion and correspondingly different coefficients. No unit inference from magnitude is justified.
- **Bicarbonate:** actual gas-derived HCO₃, standard bicarbonate, measured chemistry total CO₂ and calculated gas TCO₂ are different provenance paths. R2 demonstrates that “TCO₂” can itself be calculated. Combining chemistry electrolytes with gas HCO₃ requires local compatibility evidence; same-sample calculated-HCO₃ agreement is circular as physiological confirmation.
- **Identity/timing/handling:** establish same patient, specimen site/type, collection/analysis time, intervention between draws, analyzer/version, temperature basis, report precision and laboratory flags. Review local collection/handling procedures and uncertainty; do not invent a pairing window or assume agreement proves matching specimens.
- **Reference values:** a local interval, diagnostic decision threshold and individual delta baseline are different concepts. Match potassium convention, specimen, method and population. No high/low category or universal interval is selected. Retain the D10 evidence of differing methods rather than importing a familiar range.
- **Mixed disorders/compensation:** neither reference-range pH nor an in-range Winter comparison establishes absence of additional processes. Low HCO₃ alone cannot establish Winter applicability. Metabolic-alkalosis and acute/chronic respiratory methods, unknown duration and acute-on-chronic cases require independent selection and review. Current generic labels are not a complete disorder assessment.
- **Albumin:** hypoalbuminemia can conceal a raised uncorrected gap; correction is an estimate. Missing albumin is neither zero nor normal. Reference albumin, assay bias, hyperalbuminemia and extreme/pediatric applicability remain unresolved. A correction cannot validate incompatible electrolytes or replace direct disease-specific assessment.
- **Delta:** AG increment and delta difference can both be called “Delta Gap”; disclose the chosen formula. ΔAG/ΔHCO₃ is dimensionless. Zero denominator is undefined; negative and small positive denominators require eligibility/uncertainty policies. Do not replace the denominator, infer baselines, use rounded AG or derive clinical guards from machine epsilon. Respiratory compensation remains a separate assessment.
- **Oxygenation and availability:** PaO₂ alone lacks FiO₂/device/sample context; a venous PO₂ must not be treated as arterial. Missing/invalid PaO₂ currently blocks unrelated arithmetic. Whether independently valid acid–base/AG output remains available requires D13/D09 approval; no placeholder or room-air assumption is endorsed.
- **Population:** adult, venous and non-neonatal pediatric paths require separate evidence; age-independent algebra does not establish age-independent clinical validity. Analyzer identification, local performance data and named clinical/laboratory reviewers remain unavailable.

Evidence disagreements remain open: the Phase 4E X1 source-preference issue between general gas/chemistry references; X2 equation/interval mismatch; X3 delta terminology; X4 different albumin-based quantities; X5 malformed pediatric teaching expression versus device-specific buffer constants; X6 evidence reach; X7 historical scope/status wording. D11 additionally records 40 versus 44 g/L references, assay differences and R1/R7 endpoint distinctions. D12 records unsettled individual versus population baselines and an incompletely appraised newer baseline study. This review selects no convenient formula or tolerance to erase a conflict; intended-method IFUs and independent clinical/lab appraisal must resolve applicable issues.

## 5. Confirmed behavior, defects and clinical risk

Units in the following synthetic input order are **pH / PaCO₂ mmHg / HCO₃ mmol/L / PaO₂ mmHg / Na mmol/L / Cl mmol/L**. E1–E9 were reproduced by the unchanged independent-fixture suite. They are deliberately preserved software snapshots; some tuples are not coherent same-specimen patient observations.

| Case | Exact synthetic inputs | Confirmed current output / limitation | Clinical risk or decision still unresolved |
| --- | --- | --- | --- |
| E1 | 7.40 / 20 / 12 / 80 / 140 / 100 | AG 28.0; reference-range pH caveat; no Winter | Additional processes unassessed; current text does not explicitly call the gas normal. |
| E2 | 7.52 / 15 / 12 / 80 / 140 / 100 | AG 28.0; Respiratory alkalosis; no Winter | Single label may obscure coexisting processes; no definitive mixed diagnosis assigned here. |
| E3 | 7.46 / 70 / 48 / 80 / 140 / 90 | AG 2.0; Metabolic alkalosis; no compensation formula | Missing metabolic-alkalosis compensation coverage confirmed; chosen method pending. |
| E4 | 7.28 / 60 / 27 / 80 / 140 / 105 | AG 8.0; Respiratory acidosis; no compensation formula | No acute/chronic/history assessment; do not infer time course from one gas. |
| E5 | 7.33 / 42 / 21.8 / 80 / 140 / 100 | AG 18.2; generic mixed/partial acidaemia label; appropriate Winter 38.7–42.7 | Different primary/Winter gates create ambiguous combined wording; not proof of a second disorder. |
| E6 | 7.40 / 80 / 12 / 80 / 140 / 105 | AG 23.0; reference-range pH caveat; no consistency check | Accepted incompatible triple under the illustrative buffer model; no approved analyzer-specific rejection threshold or attribution of erroneous field. |
| E7 | 7.29 / 32.63 / 15.1 / 80 / 140 / 110 | AG 14.9; Metabolic acidosis; appropriate Winter 28.65–32.65 | Historical rounded-midpoint display defect remains corrected; applicability/wording still unapproved. |
| E8 | 7.33 / 42.85 / 21.9 / 80 / 140 / 105 | AG 13.1; generic mixed/partial label; additional respiratory acidosis, raw interval 38.849999999999994–42.849999999999994 | Exact decimal upper anchor 42.85 differs from raw binary bound. Display matches actual comparison; clinical meaning/readability at this precision remains unresolved. |
| E9 | 7.30 / 30 / 15 / blank / 140 / 110 | Valid-PaO₂ alert; all four outputs cleared; PaO₂ 501 also rejected | Confirmed all-field blocking; mandatory versus optional oxygen input is a clinical dependency decision. |

Additional confirmed numerical observations: Na/Cl/HCO₃ 140/105/21.15 has exact AG 13.85, raw 13.849999999999994 and display 13.8. Nearby accepted input 21.149999999999995 displays 13.9. Tiny signed gaps can display `0.0`/`-0.0`. These are representation effects under existing semantics; decimal half-up is not the approved oracle. No new arithmetic defect, ordinary stale-result failure or restored standalone oxygenation diagnosis was found in this review.

The confirmed safety gaps are absent consistency/provenance checks, incomplete compensation/mixed-process coverage, ambiguous E5 communication and incomplete D10 disclosure. Clinical harm pathways—false reassurance, inappropriate reliance, unnecessary withholding, wrong-source interpretation and future correction/delta misuse—remain plausible risks, not recorded patient harms or independently adjudicated diagnostic errors. Current bounds cannot establish that a severe result is erroneous, and negative AG is not automatically an invalid calculation. Existing controls and regression PASS do not close H03–H07/H10–H12.

## 6. Independent synthetic verification and clinical evidence plan

Keep three evidence layers separate: (1) exact arithmetic versus raw/display computation, (2) laboratory measurand/specimen compatibility, (3) clinically adjudicated applicability and interpretation. No numerical example approves a coefficient, reference interval, ratio baseline, threshold or future test expectation. A second independent evaluator and qualified clinical/laboratory reviewers must sign the applicable layer before implementation authorization.

| ID / existing mapping | Independent numerical anchor or required family | Required professional evidence |
| --- | --- | --- |
| CL-V01 / VM01–02, V01 | 140−(104+24)=12 mmol/L; adding measured K=4 would give 16, a different convention. For chemistry-source sensitivity, HCO₃/TCO₂ 24 versus 22 with Na140/Cl105 gives 11 versus 13. | Approved units and source/profile mapping; the difference is not a permitted gas/chemistry discrepancy. |
| CL-V02 / AC04–05 | Independently solved Winter endpoints `2L=3H+12`, `2U=3H+20`: H15.1 → 28.65–32.65; H21.9 → 38.85–42.85. Test exact raw endpoints and adjacent binary values separately from decimal references. pH7.35/H22 gate ties remain current exclusions. | Applicability truth set, numerical/reporting semantics and reviewed uncertainty; no epsilon-derived clinical boundary. |
| CL-V03 / D08–09, VM06–10 | Illustrative model only: pH=6.1+log10(H/(0.03×PCO₂)). E6 gives 6.7989700043…; pH7.4/PCO₂80 implies H≈47.88629556. Closed-form pH7.10/PCO₂40 gives H12. | Selected analyzer equation/constants, actual HCO₃, temperature/precision and local residual data. Do not force input agreement or treat matching computed HCO₃ as independent physiology. |
| CL-V04 / VM11,VM15 | Na/Cl/H: 80/80/1.25 → −1.25; 140/119/21 → 0; extrema −160/179; exact 13.85/binary/display case above; cancellation and signed zero. | Reviewed signed/extreme handling and lab-confirmed low/negative/artifact cases; no clamp or local limits invented. |
| CL-V05 / VM03–04,VM16 | Illustrative Aref4 g/dL: AGu10, A2 → 10+2.5×2=15. Equivalent Aref40/A20 g/L with 0.25 gives15. Wrong 2.5 coefficient with g/L gives60. AGu16/A5 g/dL gives13.5 if the signed model were eligible. | Coefficient/reference/assay and hypo-/hyperalbumin domains; missing/invalid/incompatible albumin must not remove independently valid basic AG. |
| CL-V06 / VM12–14 | Illustrative AGref12/Href24: Na140/Cl100/H12 gives AG28, ΔAG16, ΔH12, difference4, ratio4/3. AGref8 gives ratio5/3. | Exact definition, matched baseline and corrected/uncorrected eligibility; no diagnostic band. |
| CL-V07 / VM14–15 | Same Na140/Cl100, H24 gives4/0 undefined; H23.99 gives4.01/0.01=401; H26 gives2/(−2)=−1. Na140/Cl104/H24 gives0/0 undefined. | Approved zero/negative/near-zero domain and correlated uncertainty; 0.01 is an example, not a guard. |
| CL-V08 / AC03–04,VM16–17 | Preserve E1–E9 and 30 primary boundary snapshots separately from future expert expectations; add coherent combined, opposing, dual-metabolic, acute/chronic/unknown and treatment-evolution cases. | Independent expert adjudication with source/context; no automatic duration inference or metabolic completeness claim. |
| CL-V09 / VM06–10,VM17 | Same/different patient/specimen/time, gas actual/standard/chemistry measured or gas calculated TCO₂, unknown units, kPa-as-mmHg, analyzer flags and intervention between draws. | Local report-field dictionary, current jurisdiction-specific IFUs, QC/bias/precision, paired reports and approved unavailable/withholding map; no universal timing window. |
| CL-V10 / D01,D13–14,VM08–09 | Missing/invalid PaO₂, PaO₂ at1/500 and outside; valid AG operands with absent gas inputs; adult arterial versus central/peripheral venous, non-neonatal pediatric and excluded/unknown populations. | Separate population/sample validation and partial-output policy; FiO₂/device/sample context for any future oxygenation feature, no venous arterial substitution. |
| CL-V11 / AC11–13,VM15,VM17 | Each field blank/zero/negative/nonnumeric/nonfinite/overflow; below/at/above bounds; input/change, failure/recovery/reset/reopen; future metadata edits; five widths/themes/zoom/readability. | Approved dependency and numerical policy, actual browser and intended-user evidence; retain original input strings and explicit recalculation. |

Do not build expected results by calling production code. Use original decimal strings and independent rational/decimal calculations with literal anchors; separate binary implementation tolerance from laboratory uncertainty and physiological applicability. Obtain de-identified local reports under appropriate governance, not patient data in this task. For each future case record policy/VM/CL-V/hazard IDs, sample/population/method/time, source/version, expected raw/display/unavailable state, evidence limitations, independent reviewer and sign-off.

## 7. Decision matrix and approval queue

Roles are proposed ownership/reviewer functions, not assigned people. C = accountable emergency/critical-care clinical owner; L = laboratory medicine/clinical biochemistry owner; P = POCT lead; N = independent nephrology/acid–base expert; R = respiratory specialist; Ped = pediatric specialist where included; E = independent numerical/engineering verifier; U = human-factors/accessibility reviewer; G = release/facility/regulatory governance. All clinical/laboratory approval records remain **PENDING**; no owner name/date/signature is assigned. Each row requires independent review, not self-approval by implementation authors.

| Decision / owner | Independent reviewer | Evidence | Acceptance criterion for closing professional policy | Status |
| --- | --- | --- | --- | --- |
| D01 scope / C | L,P,Ped,R as applicable | Stage 1; VM07–08; CL-V09–10 | Signed population/specimen paths and exclusions with age/context evidence; staged validation, neonatal exclusion retained. | PENDING |
| D02 mixed coverage / C | N,L,U | Mixed review; E1/E2; CL-V08 | Approved assessed/unassessed scope and limitations; cannot imply mixed disorders excluded. | Product direction confirmed; clinical policy PENDING |
| D03 primary labels / C | N,L,U | Truth table; E5; CL-V08 | Independently adjudicated truth table, uncertainty and exact communication without forced unsupported diagnosis. | Product direction confirmed; clinical policy PENDING |
| D04 Winter eligibility / C | N,R,L | R1; E1/E2/E5; CL-V02/08 | Clinical criteria establish applicability; uncertain status not established interpretation; conditional arithmetic remains deferred. | Product direction confirmed; clinical criteria PENDING |
| D05 metabolic alkalosis / C | N,R,L | E3; mixed review | Selected method/baselines/context and reviewed cases or explicit limited scope; no completeness inference. | Product safety direction confirmed; method PENDING |
| D06 respiratory acidosis / C | R,N,L | E4; mixed review | Approved acute/chronic/unknown/acute-on-chronic method, history and conditional displays; no inference of duration from gas alone. | Product direction confirmed; rules PENDING |
| D07 respiratory alkalosis / C | R,N,L | E2; mixed review | Separately validated respiratory-alkalosis methods and unknown-duration behavior. | Product direction confirmed; rules PENDING |
| D08 consistency / L with C | P,N,E | R2; Stage 1; E6; CL-V03/09 | Identify method; sign equation/constants, uncertainty, discrepancy metric/domain and independent paired evidence for each stage. | Validation order approved; clinical/lab rules PENDING |
| D09 withholding / C with L | P,N,U,E | Decision review; VM09–10; CL-V09/11 | Signed affected-result dependencies, inconsistent/unverifiable states and recovery preserving entries; retained arithmetic needs its own valid path. | Product direction confirmed; detailed policy PENDING |
| D10 basic AG / L with C | P,N,E,U | D10 evidence; VM01–02/05–11/15–17; CL-V01/04 | Approved source/units/domain/signed handling and disclosure; no universal interval; matching local profiles only if in scope. | Product direction APPROVED; clinical/lab PENDING |
| D11 correction / L with C | N,P,Ped,E,U | R3/R7; D11 evidence; VM03–04/16; CL-V05 | Signed coefficient/reference/units, assay/population/domain/timing and missing states; retain valid uncorrected AG. | Product direction APPROVED; clinical/lab PENDING |
| D12 delta / C with L | N,P,E,U | R6; D12 evidence; VM12–17; CL-V06–07 | Independent clinical/lab validation of exact definitions/baselines/eligibility/guards; numerical-only, no automatic diagnosis/classification. | Product direction APPROVED; clinical/lab PENDING |
| D13 partial results / C | L,R,P,U,E | E9; VM09–10; CL-V10–11 | Signed absent versus invalid PaO₂ and independent-output dependency policy aligned with D09/D11; no fabricated data. | PENDING |
| D14 oxygen context / C | R,L,P,U | R8; current echo; CL-V10 | Approved sample/context/range and output scope; any new oxygenation calculation separately specified and validated. | PENDING |
| D15 Winter presentation / C | L,U,E | Winter display; E7/E8; CL-V02/11 | Readable, uncertainty-aware display consistent with actual classification across boundary neighbors. | PENDING |
| D16 numerical semantics / C with L | E,U,P | AG numerical evidence; VM15; CL-V02/04–07 | Signed raw/decimal/display/tie/signed-zero policy and independent numerical bounds; no borrowed clinical tolerance. | PENDING |
| D17 evidence/residual risks / C with L | Independent specialists,E,U | All clinical records; VM17; CL-V01–11 | Complete traceability, local compatibility and independently reviewed clinical truth set; resolve or explicitly defer unsupported paths and accept residual risks. | PENDING |
| D18 authorization / accountable release owner | C,L,G | AC01–14; AC-V01–08; governance V&V | Exact scope/policy/evidence signatures before separate implementation authorization; subsequent conformance, clinical validation and facility/regulatory release gates. | Implementation NOT AUTHORIZED; release NO-GO |

Priority order: (1) name clinical/laboratory owners and establish D01/D08 source/population evidence; (2) jointly settle D02–D04/D09/D13 dependency and communication rules with D16 semantics; (3) approve separately scoped D05–D07 and D10–D12 methods, retaining all approved product directions; (4) complete clinical/lab truth sets, human-factors review and D17 residual-risk assessment; (5) seek distinct D18 implementation and later release authorization. Priorities are dependency planning, not quantitative risk scores. No gate is closed here.

Each approval record must identify selected policy/exclusion, rationale, source and IFU/profile versions, exact parameters and boundary inclusivity, CL-V/VM/AC evidence links, remaining uncertainty/disagreement, owner and independent reviewers, dated signatures, effective scope and review/expiry date. Product-direction approval, publication, mathematical agreement and software PASS cannot populate these fields.

## 8. Verification performed and final limits

Executed unchanged on this baseline:

| Node suite | Result / scope |
| --- | --- |
| [abg-anion-gap-numerical-test.js](../../tests/abg-anion-gap-numerical-test.js) | PASS: 14 independent gap vectors, binary/display snapshots, 54 invalid/recovery transitions, 24 input boundaries and oracle sensitivity. |
| [abg-independent-fixtures-test.js](../../tests/abg-independent-fixtures-test.js) | PASS: E1–E9 baseline-only cases, 30 primary boundaries, 28 independent Winter checks and exact gap arithmetic. |
| [abg-modal-lifecycle-test.js](../../tests/abg-modal-lifecycle-test.js) | PASS: 20 open/replace/close/reopen cycles, listener cleanup, detached controls, Escape/Tab/focus. |
| [abg-oxygenation-test.js](../../tests/abg-oxygenation-test.js) | PASS: contextual oxygen output and invalid/recovery/reset behavior. |
| [abg-result-safety-test.js](../../tests/abg-result-safety-test.js) | PASS: six fields × both event types, invalid/corrected/recalculated transitions, preservation/reset/reopen. |
| [abg-winter-display-test.js](../../tests/abg-winter-display-test.js) | PASS: independent rational endpoints, 84 boundary checks, fractional cases, raw classifications and gate. |

No new browser, device/laboratory comparison, clinical study or independent professional validation occurred. Earlier user-reported browser passes retain their original scope in the mobile audit and do not validate clinical rules. Existing regression expectations and clinical text are unchanged. Synthetic future correction/delta arithmetic is review evidence only; no D10–D12 feature was implemented.

Documentation checks cover relative links, D01–D18 and CL-V coverage, preservation of product directions, exact arithmetic anchors, whitespace and single-document change scope. Remaining blockers are named professional owners, intended laboratory methods/paired evidence, signed applicability/dependency/precision policies, approved correction/delta parameters and safeguards, independent clinical truth sets and residual-risk/authorization records.

**D10–D12 product direction APPROVED. Clinical/laboratory policies PENDING. Clinical implementation NOT AUTHORIZED. Clinical release NO-GO.**
