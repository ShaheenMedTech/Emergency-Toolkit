# ABG Anion Gap & Albumin Clinical Safety Review

Emergency Toolkit v1.3 — Phase 4C. Review date: 2026-10-12.

**D10–D12 product-owner direction: APPROVED. Clinical/laboratory policies: PENDING. Implementation: NOT AUTHORIZED. Release: CLINICAL NO-GO.** Confirmed product-owner directions are recorded in section 7 on 2026-10-12. They approve no correction coefficient, reference interval, input bound, diagnostic threshold, delta formula or cutoff, numerical tolerance or rounding policy. Product-owner scope direction cannot substitute for clinical and laboratory approval.

## 1. Repository verification and scope

At the initial clinical review, branch was `review/v1.3-phase4a-abg-clinical-safety`, HEAD was `4510d565e0638d17aaa4dc237d378ffe9230f5ea` (requested baseline `4510d56`), and `git status --porcelain=v1` was empty. The initial review added only this document. Before this decision-record update, the same branch and HEAD were verified; the only working-tree item was this existing untracked review document. This update preserves the earlier evidence and changes only this file. No unrelated working-tree changes were present. Production code, tests, workflows and the authoritative decision register are unchanged. No commit, push, merge or rebase is authorized or performed.

Reviewed against:

- [ABG interpretation safety specification](ABG-INTERPRETATION-SAFETY-SPEC.md), §4.4, AC08–AC09 and D10–D12.
- [Clinical decision review](ABG-CLINICAL-DECISION-REVIEW.md), gap policy options and affected-result dependencies; existing D08/D09 policy direction remains as recorded there.
- [Mixed disorders and compensation review](ABG-MIXED-DISORDERS-COMPENSATION-REVIEW.md), incomplete metabolic assessment despite respiratory compensation.
- [Independent fixtures scope](ABG-INDEPENDENT-FIXTURES.md), [fixture data](../../tests/fixtures/abg-baseline-fixtures.js), [independent rational oracle](../../tests/helpers/abg-numerical-reference.js), and [anion-gap numerical evidence](ANION-GAP-NUMERICAL-TESTS.md).

Code references below describe the verified HEAD, not future requirements. Source-informed recommendations and synthetic examples remain review proposals, not approved clinical acceptance cases. Section 7 records the subsequently confirmed product-owner directions; it supersedes earlier product options without approving their clinical or numerical details.

## 2. Current implementation behavior

All production references are to [acid-base.js](../../js/calculators/acid-base.js).

| Area | Observed behavior and code location | Safety implication |
| --- | --- | --- |
| Formula | Lines 396–402: `Na - (Cl + HCO3)`, displayed with `toFixed(1)` | Potassium is **excluded**. No potassium field or alternate convention exists. |
| Units/reference | Inputs label Na, Cl and HCO₃ in mmol/L, lines 67–125. Result label is only “Anion Gap”, lines 132–135 | Output has no explicit unit, potassium convention, reference interval or corrected/uncorrected label. No high/normal/low gap classification is computed. |
| Albumin/delta | Six input fields, lines 40–125; analysis, lines 331–509 | No albumin input, correction, delta gap or ratio; missing albumin is not detected or disclosed. |
| Bicarbonate | Same entered HCO₃ is used for gap and primary/compensation interpretation, lines 341–343, 396–397, 411–496 | No distinction between gas-derived actual bicarbonate, standard bicarbonate or chemistry total CO₂. |
| Population/provenance | Arterial wording, lines 27–28; no age, analyzer, collection time or specimen metadata | Arterial labeling does not verify sample identity, contemporaneous values or adult/pediatric applicability. |
| Validation | `Number(...)`, lines 333–355; finite/inclusive range checks, lines 358–389 | All six fields required even though gap arithmetic needs only Na, Cl, HCO₃. Individual bounds do not establish sample consistency or clinical plausibility. |
| Failure/lifecycle | Lines 293–296, 307–314, 323–327, 374–388 | Input/change and reset clear results; invalid calculation clears all outputs and preserves entries. No stale gap should survive these paths. |
| Interpretation dependency | Primary labels, lines 411–440, and Winter gate, line 462, do not use gap | A large gap cannot modify the primary label or trigger metabolic/delta assessment; an in-range Winter result does not exclude another metabolic process. |

Current accepted bounds are pH 6.5–8, PaCO₂ 5–150 mmHg, HCO₃ 1–60 mmol/L, PaO₂ 1–500 mmHg, Na 80–220 mmol/L and Cl 40–180 mmol/L. These are **software bounds, not clinically approved ranges**. They permit mathematical gaps from −160 to 179 mmol/L; no result-level plausibility check or etiologic warning exists.

Empty/whitespace strings convert to zero and are rejected by positive lower bounds; nonnumeric and nonfinite values are rejected. Zero is not silently accepted as a missing electrolyte. Only the first invalid field is reported. HTML step values do not impose decimal quantization in `calculateABG`; fractional Number values within bounds can reach calculation. Wrong units that happen to lie inside bounds are not detectable. There is no raw-entry precision policy or cross-field consistency gate.

## 3. External evidence and limits

References were checked online on 2026-10-12. Dates below are source dates where visible. These sources are evidence for professional review, not local approval.

| ID | Reference | Evidence and applicability limits |
| --- | --- | --- |
| R1 | [Merck Manual Professional: Acid-Base Disorders](https://www.merckmanuals.com/professional/nephrology/acid-base-regulation-and-disorders/acid-base-disorders), reviewed March 2025, updated April 2025 | Potassium-excluding formula; gas bicarbonate is calculated whereas chemistry bicarbonate is measured; mixed disorders can produce deceptively normal values. Uses “delta gap” for AG minus normal AG, then adds that increment to bicarbonate. Low/negative gaps have protein, cation and analytical explanations. Professional reference, not a local protocol. |
| R2 | [North Bristol NHS: Anion Gap](https://www.nbt.nhs.uk/severn-pathology/requesting/test-information/anion-gap), revision date not visible | Serum interval 3–11 mmol/L. Equation is not stated: potassium convention cannot be inferred. |
| R3 | [University Hospitals Sussex: Anion gap](https://pathology.uhsussex.nhs.uk/pug/biochemistry-immunology/biochemistry-tests/126-anion-gap), updated 24 December 2025 | Explicit potassium-inclusive equation and 10–20 mmol/L interval for clotted blood. Neither interval nor convention can be transferred to this calculator without laboratory agreement. Availability of pediatric tubes does not establish age-specific validation. |
| R4 | [Figge et al., Anion gap and hypoalbuminemia](https://pubmed.ncbi.nlm.nih.gov/9824071/), Critical Care Medicine, 1998;26:1807–1810, DOI 10.1097/00003246-199811000-00019 | Observational ICU study: 9 normal subjects, 152 critically ill patients, 265 measurements. Describes adjustment of observed gap by 0.25 × (normal minus observed albumin) with albumin in g/L, or coefficient 2.5 for g/dL. This does not validate every population, assay or diagnostic application. |
| R5 | [SRLF/SFMU: Diagnosis and management of metabolic acidosis](https://link.springer.com/article/10.1186/s13613-019-0563-2), 15 August 2019 | R1.3 favors corrected gap for separating acid load from base deficit (GRADE 2+, strong agreement); evidence is limited and observational. Specifies albumin reference 40 g/L and coefficient 0.25. Discusses misleading mixed presentations and poorer arterial/venous PCO₂ agreement. No local threshold is adopted. |
| R6 | [AJKD Blog: Test Your Knowledge — Anion Gap in Metabolic Acidosis](https://ajkdblog.org/wp-content/uploads/2014/08/ag-in-metabolic-acidosis-tyk1.pdf), Helbert Rondon, eAJKD contributor; source date not printed in PDF | Explains delta/delta limitations including intracellular buffering and urinary loss of acid anions with Na/K. A rigid one-to-one relationship between gap rise and bicarbonate fall is not universal. Teaching material does not approve diagnostic bands. |

The frequently quoted “normal gap” is not a universal constant: R2/R3 alone show why local equation, sample and laboratory method must accompany interpretation. Obtain the intended laboratory's current analyzer/assay documentation and validated population intervals; these are not available in the repository.

## 4. Clinical safety assessment

### Formula, units and potassium — D10

The current charge-difference formula matches R1's potassium-excluding convention. Na, Cl and HCO₃ are monovalent; their mmol/L and mEq/L values are numerically equivalent for this calculation. Albumin mass units are not interchangeable with these electrolyte units. Proposed future wording should explicitly identify **uncorrected, potassium-excluding AG, mmol/L**.

Potassium-inclusive AG is the current AG plus measured K. Adding a nominal K or using an interval validated for the other convention would create systematic bias. The product owner has selected potassium exclusion (section 7); laboratory approval of the associated specimen, validation and reference policies remains pending. No universal reference interval or high-gap threshold is approved here.

Low/negative values should not be silently clamped, converted to absolute values, or automatically diagnosed as error. Professional review must select repeat/verification guidance, warning versus rejection behavior, and preservation of measured values. Rejecting every negative gap risks discarding relevant findings; accepting extreme combinations without context risks presenting data-entry or assay artifacts as clinically meaningful. This is a D10 policy judgment, not an implementation instruction.

### Albumin correction and unavailable inputs — D11

Source formula for review:

`AGcorr = AGobserved + 2.5 × (Aref − Aobserved)` for albumin in **g/dL**.

Equivalent form: `AGcorr = AGobserved + 0.25 × (Aref − Aobserved)` for albumin in **g/L**. R4 provides the coefficients; R5 uses Aref = 40 g/L (= 4.0 g/dL). **Neither coefficient nor reference is locally approved.**

Required future inputs include measured albumin, explicit mass unit, approved reference and validity domain, identified assay/specimen/collection time, and compatible Na/Cl/bicarbonate provenance. Unknown albumin is not normal albumin. The product owner has selected optional correction and no albumin requirement for the basic calculation (section 7). Clinical/laboratory rules defining valid, compatible inputs and any interpretation prerequisites remain pending. Blank, zero, negative, nonfinite, wrong-unit, implausible and outdated albumin require distinct specified behavior; no albumin numerical bounds are proposed here.

Hypoalbuminemia can lower observed AG and conceal excess anions (R4/R5). Hyperalbuminemia can increase observed gap (R1). Extrapolating a linear correction above reference albumin, to extreme albumin values, severe pH disturbances or different populations needs review; the correction does not account for every unmeasured ion, assay artifact or disease process. The confirmed direction retains clearly labeled uncorrected output whenever valid inputs are available and optionally adds separately labeled corrected output when valid, compatible albumin data are supplied; provenance and validity rules remain pending. A corrected or uncorrected gap cannot identify etiology or safely replace direct lactate/ketone measurement and clinical assessment. R5 discusses limited comparative evidence; correction is not a universal rule-out test.

### Delta methods, prerequisites and mixed disorders — D12

Definitions must be chosen explicitly; “delta gap” is ambiguous across teaching sources. Candidate mathematical quantities are:

- `ΔAG = AGselected − AGreference` (R1 calls this delta gap).
- `ΔHCO3 = HCO3reference − HCO3observed`.
- Delta difference: `ΔAG − ΔHCO3`, in mmol/L.
- Delta ratio: `ΔAG / ΔHCO3`, dimensionless.
- Reconstructed bicarbonate: `HCO3observed + ΔAG`, in mmol/L; an analytical estimate, not a new measured bicarbonate or albumin-corrected AG.

These are options, not approved product formulas. Select whether AGselected is albumin-corrected, which reference represents it, and whether a known individual baseline or laboratory convention is appropriate. Do not mix a corrected AG with an incompatible baseline or automatically use the laboratory upper limit as the patient's baseline.

Delta assessment is an adjunct when an elevated-gap metabolic process is established under approved prerequisites. Additional bicarbonate depletion may suggest another normal-gap metabolic process; relative bicarbonate preservation may suggest metabolic alkalosis or a pre-existing elevated bicarbonate baseline. These are hypotheses, not standalone diagnoses. R6 describes why buffering and renal anion losses undermine fixed stoichiometry. Treatment, evolving illness and differing collection times further require clinical context. Respiratory disorders and chronic renal compensation can alter the baseline bicarbonate. A ratio alone does not identify a respiratory component or establish an etiology.

Zero denominator is undefined; a negative denominator does not satisfy the usual bicarbonate-depletion interpretation; a small positive denominator can magnify modest measurement errors. Missing inputs, unconfirmed elevated-gap process, uncertain baselines or incompatible samples must have explicit unavailable-result behavior. Engineering needs clinically agreed zero/near-zero domain rules; machine epsilon is not an acceptable physiological tolerance. Do not emit Infinity, NaN or a diagnostic ratio band in these cases. No ratio cutoffs or denominator threshold are approved here.

Existing E1/E2 have AG 28 with low HCO₃ yet no Winter assessment under the current gate. E5 pairs a generic mixed/partial label with “Appropriate respiratory compensation”; that phrase assesses only its respiratory formula, not metabolic completeness. E6 accepts inconsistent gas observations. These existing fixtures demonstrate unresolved D02–D09 dependencies; D10–D12 must not silently clear them or present an unassessed metabolic component as normal.

### Population and specimen provenance

D01 remains a prerequisite: select adults only versus separately validated pediatric/neonatal support, and explicit exclusions. No age is collected today. Adult reference assumptions and source coefficients do not establish pediatric validity; pediatric inclusion requires pediatric critical-care and laboratory review, age-specific evidence and independent examples.

Record ABG versus peripheral/central VBG, chemistry serum/plasma versus whole-blood point-of-care measurements, actual calculated versus standard bicarbonate versus measured chemistry total CO₂, analyzer and units. Chemistry total CO₂ is commonly used as the bicarbonate surrogate for chemistry-panel AG; approve that convention explicitly. A single generic HCO₃ field cannot establish equivalence. R1 distinguishes measured chemistry from calculated gas bicarbonate; R5 cautions about arterial/venous PCO₂ agreement.

Proposed policy: use compatible contemporaneous chemistry electrolytes/total CO₂ for a chemistry-based AG, or a separately validated point-of-care pathway. Define sample pairing/timing and action for discrepancies without inventing a time window. A consistent gas tuple does not validate a separate chemistry panel. A chemistry AG does not require PaO₂ mathematically, but optional/partial outputs depend on unresolved D13 policy. VBG substitution must not inherit arterial respiratory interpretation by label alone. Unknown/affected provenance should withhold dependent interpretations under the existing D08/D09 policy direction; whether any independently supported arithmetic remains visible requires explicit dependency rules.

## 5. Independent numerical examples

All electrolyte/gap values below are mmol/L; albumin units are explicit. Values are hand-derived mathematical examples, not clinically approved normal values, cutoffs, coherent patient cases or new test expectations. Unless stated, only the three gap operands are illustrated; the live UI also requires pH, PaCO₂ and PaO₂.

| Example | Independent calculation | Risk demonstrated |
| --- | --- | --- |
| Potassium convention | Na 140, Cl 104, HCO₃ 24: 140 − 128 = **12**. If measured K = 4, inclusive gap = 144 − 128 = **16** | Same sample changes by K; reference conventions must match. Current display would be 12.0. |
| Hypoalbumin correction | Na 140, Cl 110, HCO₃ 20: AG = **10**. Illustrative Aref 4.0, albumin 2.0 g/dL: 10 + 2.5 × 2 = **15** | Uncorrected value can conceal a rise; neither value receives a clinical category here. |
| Equivalent units | Same example with Aref 40 and albumin 20 g/L: 10 + 0.25 × 20 = **15** | Using 2.5 with g/L would produce 60: tenfold correction error. |
| Above-reference albumin | AG 16, illustrative Aref 4.0, observed 5.0 g/dL: 16 + 2.5 × (−1) = **13.5** | A signed adjustment lowers gap; future handling above reference needs approval. |
| Missing albumin | Na 140, Cl 110, HCO₃ 20 gives **10**, correction **unavailable** | Do not insert normal albumin and describe the result as corrected. |
| Delta method distinction | Na 140, Cl 100, HCO₃ 12 gives AG **28**. Illustrative AGref 12, HCO₃ref 24: ΔAG **16**, ΔHCO₃ **12**, difference **4**, ratio **4/3**, reconstructed HCO₃ **28** | Distinct methods, units and baseline assumptions; no ratio diagnosis assigned. |
| Baseline sensitivity | Same operands, illustrative AGref 8 instead: ΔAG **20**, difference **8**, ratio **5/3**, reconstructed HCO₃ **32** | A baseline choice changes every delta quantity without changing measured inputs. |
| Denominator domain | Na 140, Cl 100, HCO₃ 24; illustrative AGref 12, HCO₃ref 24: AG **16**, ratio **4/0 undefined**. HCO₃ 23.99 gives ratio **4.01/0.01 = 401**. HCO₃ 26 gives **2/(−2) = −1** | Undefined, unstable and negative cases must not receive routine ratio interpretation. |
| Numerical precision | Na 140, Cl 105, HCO₃ 21.15: exact decimal AG **13.85**; current binary value **13.849999999999994**, display **13.8** | Decimal half-up 13.9 is not the implemented or approved rounding policy. |
| Negative/extreme arithmetic | 80 − (80 + 1.25) = **−1.25**, displayed −1.3. Accepted operand extrema yield **−160** and **179** | Correct subtraction does not establish physiological validity; preserve sign and review handling. |

Existing exact-rational oracle evaluates finite decimal/exponent strings with BigInt fractions and precomputed references, independently of production Number arithmetic. Its raw-error allowance is an engineering comparison bound, not a clinical tolerance. Binary/display snapshots remain separate from exact arithmetic. Near-zero fixture gaps can display `0.0` or `-0.0`; rounding can hide a sign or small difference. Future classification must not be inferred from formatted text. D16 must settle any arithmetic/rounding change separately; the current formatter is untouched.

## 6. Clinical risk assessment

Priorities below are review judgments, not an approved severity/probability scoring system.

| Risk | Consequence | Priority and proposed control requiring approval |
| --- | --- | --- |
| Unknown/abnormal albumin with unlabeled uncorrected gap | False reassurance or misclassification of excess anions | High: explicit uncorrected label, albumin status and selected D11 policy. |
| Imported interval or potassium mismatch | False high/normal/low categorization | High: equation-matched laboratory interval and provenance; no generic default interpretation. |
| Combining gas/chemistry values, wrong bicarbonate type or unmatched times | Mathematically valid but clinically misleading gap/delta | High: approved sample dependencies and discrepancy workflow under D08/D09. |
| Normal-range pH or “appropriate” respiratory compensation treated as complete assessment | Missed additional metabolic process | High: disclose assessment scope; settle D02–D07 and approved delta applicability. |
| Unstable delta ratio or uncertain baseline | Spurious mixed-disorder claim | High: approved prerequisites, unavailable-result paths and independent boundary cases. |
| Negative/extreme gap automatically discarded or accepted without qualification | Relevant finding lost, or artifacts overinterpreted | High: laboratory verification policy and preserved signed values. |
| Unit/age/assay mismatch; excessive implied precision | Invalid correction or interpretation | High: explicit units, population gate and laboratory-supported precision. |
| All-field dependency despite valid chemistry operands | Gap unavailable when unrelated gas data are missing | Policy dependency: D13 partial-result decision; preserve invalidation safety. |

## 7. Confirmed product-owner decision record — 2026-10-12

Authority: the product owner's explicit Phase 4C Decision Record instruction in this session. No clinical or laboratory approver is assigned by that instruction. Earlier unselected product options are superseded by the directions below; source formulas and numerical examples in this review remain illustrative only.

| Approval layer | D10 | D11 | D12 |
| --- | --- | --- | --- |
| Product-owner direction | **APPROVED** | **APPROVED** | **APPROVED** |
| Clinical/laboratory policies and validation | **PENDING** | **PENDING** | **PENDING** |
| Implementation | **NOT AUTHORIZED** | **NOT AUTHORIZED** | **NOT AUTHORIZED** |
| Release | **CLINICAL NO-GO** | **CLINICAL NO-GO** | **CLINICAL NO-GO** |

### D10 — APPROVED PRODUCT DIRECTION

- Use potassium-excluded Anion Gap: `Na − (Cl + HCO3)`.
- Display numerical results with units and disclose the formula.
- Do not apply a universal laboratory reference interval.
- Support laboratory-specific reference intervals in future.
- Do not treat a normal uncorrected gap as excluding clinically important metabolic acidosis.
- Numerical thresholds, specimen compatibility, validation rules and clinical approval remain **PENDING**.

This selects the product's equation convention and presentation direction. It does not approve current software bounds, a laboratory interval, a high/normal/low interpretation, negative/extreme-result handling or reporting precision. Future laboratory-specific support requires an independently approved, equation-matched profile.

### D11 — APPROVED PRODUCT DIRECTION

- Display uncorrected Anion Gap whenever valid inputs are available.
- Optionally display albumin-corrected Anion Gap when valid, compatible albumin data are supplied.
- Do not require albumin for the basic calculation.
- Clearly label corrected versus uncorrected values.
- Explain the limitations when albumin is missing.
- Correction coefficients, units, validation limits and clinical approval remain **PENDING**.

Missing albumin does not block the basic calculation under this direction and must not be assumed normal. What constitutes valid inputs or compatible albumin data still requires professional specification, including specimen/source, timing, assay, units, reference and population limits. The example coefficients and albumin units in section 4 are not approved by this product decision. Existing all-six-field validation is unchanged; no new partial-result pathway is authorized.

### D12 — APPROVED PRODUCT DIRECTION

- Include numerical Delta Gap / Delta Ratio calculations only after independent clinical and laboratory validation.
- Do not automatically diagnose or classify mixed acid–base disorders.
- Clearly disclose calculation assumptions and limitations.
- Formulas, reference baselines, eligibility rules, numerical safeguards and clinical approval remain **PENDING**.

This confirms a conditional numerical adjunct, with no automatic mixed-disorder diagnosis or classification from delta calculations. It does not select among the candidate definitions in section 4, approve diagnostic bands, or authorize implementation before validation. Existing primary/compensation behavior is unchanged and its separate unresolved decisions remain in force.

### Pending specification matrix

| Decision | Current implementation | Professional specification and evidence still required | Approval record |
| --- | --- | --- | --- |
| D10 — interval, units, bicarbonate source, negative/extreme handling | Potassium-excluding uncorrected arithmetic; no output unit/formula disclosure or interval; generic HCO₃ and software-only bounds | Clinical owner + laboratory: units, analyzer/sample/population-specific profiles, HCO₃/total CO₂ convention, numerical thresholds, input/result validation, signed negative/extreme handling and precision; reconcile D01/D08/D09/D16 | Clinical/laboratory **PENDING**; approver/date: — |
| D11 — correction, albumin units/reference, missing behavior | No albumin input, correction or missing-albumin explanation | Clinical owner + laboratory: coefficient/reference, units, assay applicability, valid domain, sample compatibility/timing, population/extrapolation limits, invalid/unavailable behavior, approved wording and independent cases | Clinical/laboratory **PENDING**; approver/date: — |
| D12 — method, prerequisites and numerical domain | No delta calculation | Clinical owner + laboratory + engineering: selected formulas, reference baselines, corrected/uncorrected dependency, eligibility/context, zero/near-zero/negative denominator safeguards, unavailable-result behavior, assumptions/limitations and independent clinical/laboratory validation | Clinical/laboratory **PENDING**; approver/date: — |

Remaining product/scope details include adult versus pediatric support, supported laboratory profiles and gas/chemistry pathways, and presentation when required provenance is unknown. Professional reviewers must determine compatibility and validity rules. These remaining details do not reopen the confirmed directions above. D13 partial-result policy must be reconciled with displaying uncorrected AG when its valid inputs are available.

The existing specification and earlier reviews continue to show D10–D12 as PENDING at the clinical-policy layer. This dated record adds product-direction approval only; it does not amend their clinical acceptance criteria or approve implementation/release.

## 8. Required approvals, validation and remaining blockers

Required recorded approvals:

1. Responsible emergency/critical-care clinical owner, with nephrology/acid–base expertise as needed: intended use, mixed-disorder limitations, selected methods, wording, truth tables and residual risks.
2. Laboratory medicine/clinical biochemistry and point-of-care lead: potassium convention, analyzer/assay-specific intervals, albumin units/reference/coefficient, specimen compatibility, bicarbonate provenance, timing/discrepancy policy, negative/extreme handling and realistic reporting precision.
3. Pediatric/neonatal specialist and relevant laboratory reviewer if these populations are included; otherwise explicit approved exclusions.
4. Engineering: numerical domains, input and missing-value behavior, dependency/invalidation rules, independent arithmetic evidence and implementation conformance after a separate authorized implementation phase. Engineering sign-off cannot approve clinical thresholds.
5. Product owner: D10–D12 direction is now recorded as APPROVED in section 7; remaining scope details, subsequent clinical/laboratory sign-off and separate release authorization under D17/D18 remain outstanding. Record named approvers, dates, exact approved policy/reference versions, exclusions and review schedule.

Historical verification from the initial Phase 4C review, not rerun for this decision-record update: `node tests/abg-anion-gap-numerical-test.js` passed 14 gap vectors, binary/display snapshots, 54 invalid/recovery transitions, 24 input boundaries and oracle sensitivity. `node tests/abg-independent-fixtures-test.js` passed E1–E9 baseline fixtures, 30 primary boundaries, 28 Winter checks and independent gap arithmetic. Browser harnesses/full suite were not rerun for this documentation-only review. Passing these selected regressions is not clinical validation. No approved albumin/delta acceptance fixtures currently exist.

Remaining blockers are explicit:

- D10–D12 product directions are APPROVED, but clinical/laboratory policies, numerical specifications, independent clinical validation and named professional approval records remain PENDING.
- Local laboratory intervals, analyzer/assay evidence, bicarbonate/sample pathway and albumin applicability are unavailable; reference examples cannot fill that gap.
- D01 population/sample scope and D02–D09 mixed-disorder/consistency dependencies remain unresolved as described in the existing reviews; existing D08/D09 product direction does not establish approved numerical consistency rules.
- D13 partial-result policy and D16 precision semantics must be reconciled with any selected gap pathway.
- AC08/AC09 need independently calculated, clinically approved cases for unit conversions, missing/invalid albumin, boundaries, incompatible samples, negative/extreme values and zero/near-zero/negative denominators. Existing baseline fixtures cannot supply diagnostic approval.
- No production implementation of a newly selected policy, professional residual-risk acceptance or D17/D18 release authorization has occurred.

**D10–D12 product-owner direction: APPROVED. Clinical/laboratory policies: PENDING. Implementation: NOT AUTHORIZED. Release: CLINICAL NO-GO.**


## 9. Documentation-only validation of this decision-record update

Checked the confirmed D10–D12 directions against the product-owner instruction, the four approval layers, retained source/example sections, relative document links and whitespace. Branch and HEAD remain unchanged. The exact file changed in this update is `docs/clinical-safety/ABG-ANION-GAP-CLINICAL-REVIEW.md`; it remains untracked from the initial review. No production code, tests, workflows or other clinical-safety documents were changed. No executable tests or clinical-reference research were rerun for this documentation-only update. No commit, push, merge or rebase was performed; `main` was not changed.
