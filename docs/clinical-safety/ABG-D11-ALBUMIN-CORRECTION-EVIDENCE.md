# D11 Albumin-Corrected Anion Gap Published Evidence

Emergency Toolkit v1.3. Prepared and references accessed 2026-10-12.

**Product-owner direction: APPROVED. Clinical/laboratory approval: PENDING. Implementation: NOT AUTHORIZED. Release: CLINICAL NO-GO.**

This is a documentation-only evidence review and proposed policy for professional assessment. It selects no local correction coefficient, reference albumin, assay, age domain, timing allowance, validation bound, diagnostic threshold or rounding rule. Published evidence is not independent clinical approval of Emergency Toolkit.

## 1. Repository verification and authority layers

Before writing: branch `review/v1.3-phase4a-abg-clinical-safety`; HEAD `c5b166f1b0170e7828f4836769fd41d86b0038cd`; working tree contained only the existing untracked [D10 published-evidence review](ABG-D10-PUBLISHED-EVIDENCE-POLICY.md). D10 SHA-256: `49e5f5e9b6695aa2dd8b0f16cb44e2a6591294454ef0a57e0c1d2927083444f2`. It is preserved unchanged. Supplied AGENTS.md and Ryoku vault instructions were reviewed; no additional repository AGENTS.md/CLAUDE.md was found. Only this D11 file is created; no code, tests, workflows, existing documents, branch or `main` are changed. No commit, push, merge or rebase is performed.

Read with [Phase 4C decisions](ABG-ANION-GAP-CLINICAL-REVIEW.md) §7, [Phase 4D matrix](ABG-ANION-GAP-VALIDATION-MATRIX.md) VM03/VM04/VM06–VM10/VM15–VM17 and V02–V04, [Phase 4E readiness](ABG-ANION-GAP-APPROVAL-READINESS.md), [safety specification](ABG-INTERPRETATION-SAFETY-SPEC.md) §4.4/AC08–AC09, [Stage 1 preparation](ABG-STAGE1-VALIDATION-PREPARATION.md) and [clinical decision review](ABG-CLINICAL-DECISION-REVIEW.md) D08/D09/D13.

| Authority layer | Current record |
| --- | --- |
| Published evidence | Source findings/formulas below; source validity and applicability must be appraised. |
| Confirmed product direction | **APPROVED:** always display uncorrected AG when its inputs are valid; add corrected AG only with compatible valid albumin data; albumin not required for basic calculation; distinguish outputs clearly; do not automatically diagnose acid–base disorders. Missing albumin limitations must be explained. |
| Proposed product policy details | Candidate labels, unavailable states and disclosures below; exact wording/dependencies remain proposals. |
| Local laboratory policy | Assay/source compatibility, units, reference, coefficients/domain, timing and precision **PENDING**. |
| Professional approval | Clinical/laboratory reviewers unassigned; no dated signed acceptance record; **PENDING**. |
| Implementation and release | **NOT AUTHORIZED** and **CLINICAL NO-GO**, respectively. |

Current [acid-base.js](../../js/calculators/acid-base.js) has six inputs without albumin (lines 40–125), a generic HCO₃ input, all-six-field validity checks (333–389), potassium-excluded AG and one-decimal output (396–402). No correction or specimen/timing/assay metadata exists. This review does not authorize adding those features or changing existing bounds.

## 2. Published evidence register

Reference IDs are local to this document. Titles link to accessible evidence; abstract review is distinguished from full-text appraisal. All access dates are 2026-10-12.

| ID | Reference and publication date | Evidence and limitations |
| --- | --- | --- |
| R1 | [Anion gap and hypoalbuminemia](https://pubmed.ncbi.nlm.nih.gov/9824071/), Figge et al., Critical Care Medicine 26:1807–1810, November 1998; DOI 10.1097/00003246-199811000-00019 | Primary observational ICU study, indexed abstract: 9 normal subjects, 152 critically ill patients, 265 measurements; derived albumin adjustment. Does not prove universal age/assay/domain applicability. Full-text appraisal remains required before adoption. |
| R2 | [Diagnosis and management of metabolic acidosis: guidelines from a French expert panel](https://link.springer.com/article/10.1186/s13613-019-0563-2), SRLF/SFMU, 15 August 2019, R1.3–R1.4 | Full guideline: favors corrected AG to distinguish acid load from base deficit (GRADE 2+, limited observational evidence); gives reference 40 g/L and coefficient 0.25. Recommendation is not validation of local software or a universal rule-out test. |
| R3 | [Correction of the anion gap for albumin in order to detect occult tissue anions in shock](https://pubmed.ncbi.nlm.nih.gov/12456555/), Hatherill et al., Archives of Disease in Childhood 87:526–529, December 2002; DOI 10.1136/adc.87.6.526 | Prospective observational pediatric shock study, indexed abstract: potassium-inclusive AG corrected with `0.25 × (44 − albumin)` in g/L; supports occult-anion assessment in that population. PubMed retrieval intermittent; PMC verification and publisher 403 limited full-text access. Not validation of excluded-potassium adult/pediatric product paths. |
| R4 | [Correcting the anion gap for hypoalbuminaemia does not improve detection of hyperlactataemia](https://pubmed.ncbi.nlm.nih.gov/16858097/), Dinh et al., Emergency Medicine Journal 23:627–629, August 2006; DOI 10.1136/emj.2005.031898 | Primary retrospective study, abstract: 639 laboratory sets. At its selected threshold correction increased sensitivity but reduced specificity; ROC performance was nearly unchanged. Neither gap reliably predicted hyperlactatemia. Study endpoints/thresholds are not local criteria. |
| R5 | [Overestimation of Albumin Measured by Bromocresol Green vs Bromocresol Purple Method: Influence of Acute-Phase Globulins](https://pubmed.ncbi.nlm.nih.gov/29790973/), Garcia Moreira et al., Laboratory Medicine 49:355–361, 11 October 2018; DOI 10.1093/labmed/lmy020 | Primary method comparison, abstract: 165 serum samples, BCG/BCP/electrophoresis differences; greater bias at lower albumin and acute-phase-protein influence. Supports assay awareness, not a universal assay conversion or local bias allowance; corrected-calcium outcome is not AG clinical validation. |
| R6 | [Acid-Base Disorders](https://www.merckmanuals.com/professional/nephrology/acid-base-regulation-and-disorders/acid-base-disorders), Merck Manual Professional, reviewed March/updated April 2025 | Professional reference: low albumin lowers AG, hyperalbuminemia can raise it, mixed values can appear normal. Describes adjustment of normal range for reduced albumin. Not a local coefficient/domain or clinical approval record. |

## 3. Published formulas, derivation and dimensional meaning

### Observational derivation

R1 related albumin deficiency to underestimation of gap anions: reported change 0.25 mEq/L per g/L albumin decrease, with r² = 0.94. Its adjustment is to a chosen normal-albumin scale. This empirical association is not a physical constant or validation of automated diagnostic decisions. The full study's method and applicable range need specialist appraisal before selecting a product rule.

Let `AGu` be uncorrected potassium-excluded AG, `A` observed albumin and `Aref` selected reference. Candidate source-based forms are:

| Published/reference convention | Candidate expression | Approval boundary |
| --- | --- | --- |
| R1 general adjustment, albumin g/L | `AGc = AGu + 0.25 × (Aref − A)` | Coefficient has units mmol/L gap per g/L albumin; select reference/domain independently. |
| Equivalent form, albumin g/dL | `AGc = AGu + 2.5 × (Aref − A)` | Both albumin terms must use g/dL. Conversion follows 1 g/dL = 10 g/L. |
| R2 chosen reference, g/L | `AGc = AGu + 0.25 × (40 − A)` | Source reference 40 g/L (= 4.0 g/dL), not an approved default. |
| R3 pediatric-shock expression, g/L | `AGc = AGinclusive + 0.25 × (44 − A)` | Source reference 44 g/L and potassium-inclusive AG; cannot import its interval/diagnostic performance into the excluded-potassium product unchanged. |

Output remains mmol/L (numerically equivalent to mEq/L for the monovalent gap components). The coefficient must change with albumin mass units; interpreting 20 g/L as 20 g/dL creates an unsafe signed adjustment. Never infer unit from magnitude. Missing albumin is not zero or normal.

An alternative teaching representation (R6) lowers the normal gap range for reduced albumin rather than increasing the observed gap. Those representations align arithmetically only with identical coefficient/reference and corresponding baseline conventions. They are different displayed quantities. The selected product direction is to retain AGu and optionally add AGc; adjusting a displayed range instead cannot silently replace that direction. No universal corrected-gap interval follows from correction.

### Reference assumptions and method limitations

Aref normalizes to a specified scale; it is not automatically the local assay upper limit, midpoint, patient baseline or age-specific normal albumin. R2 and R3 use different references and conventions. Reviewers must justify reference choice for the supported method/population, keeping AG and albumin conventions compatible.

Albumin's electrical effect varies with the physiological context; a fixed linear coefficient approximates that effect. It does not remove every protein, phosphate, unmeasured-ion, pH or analytical influence. Severe disturbances, extreme concentrations and different populations require applicability review rather than unbounded extrapolation. Local albumin assay differences matter: in the candidate linear model, higher measured A reduces the adjustment. A biased albumin can therefore change AGc while AGu stays unchanged. R5 does not authorize replacing BCG with BCP or applying a blanket conversion.

## 4. Critical illness, hypoalbuminemia, hyperalbuminemia and disagreements

Hypoalbuminemia lowers the uncorrected gap and can conceal excess anions; correction can expose that numerical effect (R1/R2/R6). Critical-illness evidence is relevant to Emergency Toolkit, but observational association and acid-load estimation are different from reliable etiologic diagnosis or patient-outcome improvement.

R2 favors correction for acid-load/base-deficit assessment, whereas R4 found no overall advantage for detecting hyperlactatemia. This is an endpoint/population/performance difference requiring explicit clinical appraisal, not a contradiction resolved by choosing one title. Increased sensitivity at a fixed threshold can come with reduced specificity. Neither corrected nor uncorrected AG should replace direct lactate/ketone assessment when clinically indicated, establish an etiology or automatically classify mixed disorders.

R3 supports correction for occult tissue anions in critically ill children with shock, using a different reference and inclusive formula. It does not approve general pediatric use, adults, VBG substitution or the product's excluded-potassium diagnostic assumptions. The existing adult ABG → VBG → non-neonatal pediatric → chemistry-comparison validation sequence remains separate; neonates remain excluded from proposed interpretation scope.

Hyperalbuminemia can elevate observed AG (R6). The signed candidate formula decreases AGc above Aref, but supporting hypoalbuminemia studies do not automatically validate this extrapolation. Reviewers must choose a signed full-domain correction or a hypoalbuminemia-only eligible domain, with explicit unavailable behavior outside it. Do not silently cap A at Aref, clamp a correction to zero, or describe an unsupported estimate as validated. Negative AGu/AGc also needs the signed-result handling pending under D10.

Unresolved disagreements/insufficiencies: coefficient/domain appraisal from abstract-only derivation; 40 versus 44 g/L reference assumptions; potassium conventions; assay bias without local method data; correction's benefit across different endpoints; above-reference/extreme/age/pH applicability; and collection-time compatibility. **All resolutions remain PENDING.**

## 5. Proposed product behavior and safety wording

The confirmed product direction stays APPROVED; exact implementation policy, labels and warning text below are **proposals requiring clinical/laboratory/usability review**.

| State | Proposed behavior / draft UI wording | Unresolved local policy |
| --- | --- | --- |
| Valid AG operands, no albumin | Always retain “Uncorrected Anion Gap (potassium excluded): [value] mmol/L”. Correction: “Not calculated — albumin unavailable. Low albumin can conceal an increased gap.” | AG validity defined under D10; do not insert normal albumin. |
| Valid AG and valid compatible albumin | Retain AGu and add “Albumin-corrected Anion Gap (estimated): [value] mmol/L”. Show albumin value/unit, selected reference, formula/coefficient and source/timing status. | Approved coefficient/reference/domain, assay and compatibility; no silent replacement of AGu. |
| Albumin supplied but invalid, unit unknown or source incompatible | AGu remains when its own inputs are valid. “Albumin correction unavailable — [specific reason].” Preserve entries and remove any stale AGc. | Validity flags/ranges, unknown-context states and reviewed reasons. |
| Albumin above reference or outside approved correction domain | AGu retained if valid; correction unavailable unless that signed/domain pathway is explicitly approved. | Hyperalbuminemia/extreme domain and recovery workflow. |
| AG inputs invalid or affected by approved inconsistency rule | Withhold dependent outputs and explain the affected prerequisite; preserve original entries. Albumin cannot rescue an invalid AGu. | D08/D09 affected-result map, D10 validity and D13 partial-result behavior. |

Draft limitation: “Albumin correction is an estimate. These values do not diagnose an acid–base disorder or exclude clinically important acidosis. Interpret with specimen information, laboratory methods and the clinical assessment.” Draft labels must not imply corrected sodium/chloride, measured AGc, normalized patient physiology or an automatically approved laboratory comparison. Display no automatic diagnostic category or universal interval.

Compatibility must include identified same-patient reports, AG operand source, albumin specimen/assay, collection/analysis times, units and relevant intervening clinical events. Unknown/outdated/incompatible albumin must not be silently paired. Fluid changes or albumin administration between draws are contexts for reviewer-defined compatibility, not grounds for an invented universal time window. Missing/invalid albumin alone must not invalidate independent valid AGu. A suspected source problem affecting AG operands must still invalidate dependent outputs.

## 6. Independent numerical and boundary evidence requirements

All numbers below are synthetic mathematical anchors, not approved physiological cases, clinical thresholds or executable-test changes. Use illustrative Aref = 4.0 g/dL only where stated. All gap values are mmol/L.

| ID | Independent mathematical example / required family | Purpose and approval limit |
| --- | --- | --- |
| B01 | Na 140, Cl 110, HCO₃ 20: AGu = 10. A = 2.0 g/dL: 10 + 2.5 × (4−2) = 15 | Basic/corrected separation; no clinical category. |
| B02 | Same AGu; Aref 40/A 20 g/L: 10 + 0.25 × 20 = 15 | Unit-equivalence oracle. Wrong coefficient 2.5 with g/L gives 60; wrong interpretation of 20 as g/dL gives −30. |
| B03 | AGu 10, A = Aref: AGc = 10; A 3.99/4.00/4.01 g/dL gives 10.025/10/9.975 | Signed zero-adjustment/reference-boundary behavior; eligibility at/above reference remains pending. |
| B04 | AGu 16, A = 5.0 g/dL: 16 + 2.5 × (4−5) = 13.5 | Hyperalbuminemia extrapolation example only. Do not assign a clinically approved corrected output without domain approval. |
| B05 | AGu 10, A = 20 g/L: reference 40 gives 15; reference 44 gives 16 | Difference 1 arises solely from reference selection; both numbers are illustrative, not interchangeable defaults. |
| B06 | AGu 10, reference 40 g/L; reported A 20 versus 24 g/L gives 15 versus 14 | Assay/report sensitivity example, not a universal bias correction. |
| B07 | AGu −1, illustrative A 2.0 g/dL gives AGc 4 | Preserve signed uncorrected/corrected results; correction does not prove cause or validity. |
| B08 | Same valid AG operands with missing/blank/zero/negative/nonnumeric/nonfinite/overflow/underflow albumin, unit error, assay flag or unknown provenance | Basic AGu preserved when independently valid; corrected state unavailable under approved rules; no missing-to-zero conversion. Zero/very-low albumin validity must be specified, not inferred from arithmetic. |
| B09 | Future approved albumin limits, timing windows, profile/domain/age boundaries | Below/at/above and exact binary neighbors; no invented limits. Same versus different patient/sample, treatment between samples, unavailable method and unknown age. |
| B10 | Decimal half-ties and cancellation for both correction and AGu, equivalent-unit strings, signed zero and negative outputs | Separate exact rational/decimal math, binary raw result and approved display. Do not correct an already rounded AGu; approve D16 precision/rounding explicitly. |
| B11 | Corrected → edit albumin/unit/reference/source/time → missing/invalid → explicit recovery; AG-operand failure, reset/reopen | Clear stale dependent AGc and preserve valid AGu according to approved dependencies; clinical warning comprehension and accessible labels. |
| B12 | Clinically coherent hypoalbumin/critical-illness and above-reference cases, paired local reports, mixed/normal-pH presentations | Independent C/L/pediatric review for applicable populations; arithmetic and existing E-fixture snapshots cannot establish clinical validity. |

Independent references must use original decimal strings and rational/decimal arithmetic without invoking production formulas; a second evaluator must recompute and review them. Each fixture records selected coefficient/reference and unit, assay/profile/version, age/source/timing, validity/eligibility/unavailable state, raw/display expectations, uncertainty, policy link and reviewers. Passing a unit conversion or correction test verifies a specified equation, not clinical usefulness or specimen compatibility. Existing [gap numerical evidence](ANION-GAP-NUMERICAL-TESTS.md) remains baseline engineering evidence; no approved correction fixture exists.

## 7. Local laboratory and professional review requirements

| Requirement | Decision/evidence needed | Required reviewer / status |
| --- | --- | --- |
| Formula/reference/domain | Appraise R1 full methods and R2–R4 populations/endpoints; select coefficient/Aref and signed versus hypoalbumin-only eligibility, age/pH/extreme limits or explicit deferral | Emergency/critical-care clinical owner with nephrology/acid–base expertise + L — PENDING |
| Assay/units | Identify intended albumin analyzer/assay/software, current IFU, BCG/BCP or other method, serum/plasma/report units, measuring range, flags, bias/precision/uncertainty and local verification | Laboratory medicine/clinical biochemistry lead (L); POCT where relevant — PENDING |
| Compatibility | Define linkage, approved AG/bicarbonate path, specimen/collection/analysis timing and intervention handling; produce paired de-identified report evidence | Clinical owner + L/POCT — PENDING |
| Population | Independent adult/VBG/non-neonatal pediatric evidence and exclusions; do not inherit adult correction approval in children | Clinical owner + L + pediatric specialist for included children — PENDING |
| Numerical and display | Independent B01–B12 references, raw versus rounded semantics, uncertainty/guard rules, exact units/formula/reference disclosure and no stale output | Engineering verifies math; clinical owner/L approve reporting; usability reviewer — PENDING |
| Clinical evidence/risks | Review coherent cases, missing-albumin explanations, no-diagnosis/no-rule-out wording, endpoint limitations and residual risks | Clinical owner + L, relevant specialists, intended-user reviewer — PENDING |

No reviewer identity, approval date or durable acceptance record is assigned by this document. Local IFUs, assay verification, compatible paired reports and clinically approved outcomes remain unavailable. A source assay comparison cannot establish the intended laboratory's bias allowance; an educational reference cannot establish a safe timing window.

## 8. Criteria for eventual implementation authorization

These are proposed review gates, not authorization. Reconcile Phase 4D AC-V01–AC-V08 and related D01/D08/D09/D10/D13/D16/D17/D18 requirements for the exact scope.

1. **A1:** named clinical/laboratory reviewers sign intended use, supported age/specimen/assay paths and exclusions; preserve valid basic AGu regardless of albumin absence, optional correction and no automated diagnosis.
2. **A2:** sign exact formula, coefficient/reference, units/conversion, eligible domain and missing/invalid/out-of-domain behavior; resolve 40/44-reference and endpoint differences with recorded rationale. No hidden defaults or extrapolation.
3. **A3:** provide current intended-method IFUs/local verification and approved compatibility/timing/dependency rules, including interventions and uncertain sources. Albumin assay/source errors cannot be silently ignored for AGc.
4. **A4:** second evaluator verifies B01–B12 arithmetic and relevant boundaries independently; qualified reviewers approve local paired-report and clinically coherent expectations, uncertainty and domain cases. Baseline snapshots stay distinct.
5. **A5:** approve raw arithmetic/display semantics under D16, labels/formula/reference disclosure, reason-specific unavailable states and intended-user comprehension/residual risks. Confirm no stale correction or loss of valid uncorrected output.
6. **A6:** only after applicable professional gates are recorded, obtain a separate explicit scoped implementation authorization under AC-V08, with specification/evidence versions, approved parameters, deferred paths and required engineering/browser verification plan. Software tests cannot issue clinical approval.

A narrower later authorization must explicitly defer unsupported correction paths with reviewed unavailable behavior; deferral cannot turn optional albumin into a basic-calculation requirement. Release needs subsequent implementation conformance and required tests/usability evidence, final clinical/laboratory residual-risk acceptance and separate D17/D18 authorization. No implementation or release gate is closed here.

Priority blockers: identify local assay/reviewers and AG source first; approve units/coefficient/reference/domain and compatibility next; complete independent clinical/laboratory examples and communication/precision review; then seek separate authorization. Hyperalbuminemia/extrapolation, age-specific coverage, endpoint disagreement and missing-data dependencies remain unresolved.

## 9. Documentation validation and outcome

Check local links, citation/access limits, exact example arithmetic, status distinctions, original D10 hash and repository change scope. Only `docs/clinical-safety/ABG-D11-ALBUMIN-CORRECTION-EVIDENCE.md` is created, untracked and uncommitted. Existing D10 and committed documents are unchanged. No executable tests are changed/run; no commit, push, merge, rebase or change to `main` is performed.

**Product-owner direction: APPROVED. Clinical/laboratory approval: PENDING. Implementation: NOT AUTHORIZED. Release: CLINICAL NO-GO.**
