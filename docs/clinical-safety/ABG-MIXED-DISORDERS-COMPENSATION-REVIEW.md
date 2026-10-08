# Phase 4B — Mixed acid–base disorders and compensation

**DRAFT — CLINICAL REVIEW REQUIRED**

Review date: 2026-10-08. Engineering/documentation baseline: `910e09a`, branch `review/v1.3-phase4a-abg-clinical-safety`.

**D02–D03: Product-owner communication policy direction confirmed; implementation and clinical validation PENDING. D05–D07: Product-owner direction confirmed; formulas, thresholds, implementation and clinical approval PENDING. D04: Product-owner communication and display direction CONFIRMED; clinical applicability criteria, numerical thresholds and validation, and implementation authorization PENDING. Clinical release: NO-GO.**

This review supports qualified physicians and healthcare professionals using the proposed product for medical education and decision support during patient care. It approves no diagnostic rule, coefficient, threshold, tolerance, timing cutoff or wording change. Observed software outputs are baseline behavior, not approved clinical diagnoses. Foreseeable consequences below are risks, not reported patient incidents.

Read with the [interpretation safety specification](ABG-INTERPRETATION-SAFETY-SPEC.md), [clinical decision review](ABG-CLINICAL-DECISION-REVIEW.md), [independent fixtures](ABG-INDEPENDENT-FIXTURES.md) and [Stage 1 validation preparation](ABG-STAGE1-VALIDATION-PREPARATION.md). This document supplements those records and records the confirmed D02–D03 communication policy direction and D04/D05–D07 product directions; it does not approve their diagnostic rules or implementation. Earlier records retain their historical statuses.

## 1. Verified implementation and reproducible evidence

References are to [acid-base.js](../../js/calculators/acid-base.js): primary labels, lines 411–440; default compensation text, 452–453; Winter gate, 462; arithmetic and raw inclusive comparisons, 464–496; anion-gap arithmetic/display, 396–402. There is no other compensation formula in the calculator. No sample, age, bicarbonate-provenance or disorder-duration metadata participates in classification.

Enter the following six values, then calculate. Units: pH dimensionless; PCO₂ and PaO₂ mmHg; HCO₃⁻, Na and Cl mmol/L. PaO₂ is 80 in every example. These are existing fixture examples, not new clinical acceptance cases.

| Fixture | pH / PCO₂ / HCO₃⁻ / Na / Cl | Current output | Verified omission or ambiguity |
| --- | --- | --- | --- |
| E1 | 7.40 / 20 / 12 / 140 / 100 | pH within reference range; no specific compensation formula; gap 28 | No systematic process assessment despite substantially altered CO₂/bicarbonate. The existing label does say to assess for compensated or mixed disorder; it does **not** say “normal ABG.” |
| E2 | 7.52 / 15 / 12 / 140 / 100 | Respiratory alkalosis; no specific compensation formula; gap 28 | Single label does not assess additional processes. Low bicarbonate alone does not establish a separate metabolic acidosis; gap context and compensation require review. |
| E3 | 7.46 / 70 / 48 / 140 / 90 | Metabolic alkalosis; no specific compensation formula; gap 2 | Large CO₂ elevation receives no expected-compensation comparison. |
| E4 | 7.28 / 60 / 27 / 140 / 105 | Respiratory acidosis; no specific compensation formula; gap 8 | No acute, chronic, unknown-duration or acute-on-chronic assessment. |
| E5 | 7.33 / 42 / 21.8 / 140 / 100 | Acidaemia — mixed or partially compensated disorder; appropriate respiratory compensation; Winter interval 38.7–42.7 | Primary-label gate uses CO₂ ≤40 for metabolic acidosis, while Winter uses pH/HCO₃ alone. Generic “mixed or partially compensated” wording can coexist with an in-range Winter result. This is an ambiguity, not proof that either clinical diagnosis is correct. |
| E6 | 7.40 / 80 / 12 / 140 / 105 | pH within reference range; no specific compensation formula; gap 23 | No consistency check prevents interpretation of contradictory values. Illustrative Henderson–Hasselbalch arithmetic with 6.1 and 0.03 gives pH about 6.799, not 7.40; this discrepancy is not an approved D08 criterion. |

E7/E8 retain the existing raw Winter boundary behavior, including long binary-decimal endpoints. Compensation coverage decisions must not silently change their classifications or numerical policy. D15/D16 remain separate pending decisions.

## 2. Evidence and formula applicability

[R1: Merck Manual Professional, Acid-Base Disorders](https://www.merckmanuals.com/professional/nephrology/acid-base-regulation-and-disorders/acid-base-disorders) (review March 2025, updated April 2025) distinguishes pH state from physiological processes, warns that mixed disorders can have deceptively normal values, and uses expected compensation plus clinical context. Its simple-disorder table supplies the following estimates. **These are reference descriptions, not selected production rules.**

| Disorder | R1 estimate | Current implementation |
| --- | --- | --- |
| Metabolic acidosis | Expected arterial PCO₂ = 1.5 × HCO₃⁻ + 8 ±2 mmHg | Same Winter arithmetic; restricted gate described above. |
| Metabolic alkalosis | CO₂ rises 0.6–0.75 mmHg per 1 mmol/L bicarbonate rise; R1 describes an approximate compensation ceiling of 55 mmHg | Not assessed. Neither slope nor ceiling is approved here. |
| Respiratory acidosis | Bicarbonate rises per 10 mmHg CO₂ rise: acute 1–2, chronic 3–4 mmol/L | Not assessed. |
| Respiratory alkalosis | Bicarbonate falls per 10 mmHg CO₂ fall: acute 1–2, chronic 4–5 mmol/L | Not assessed. |

Clinical reviewers must select baseline values, method, ranges, exceptions and time-course handling rather than convert these source estimates into exact diagnostic cutoffs. R1's descriptive ranges also differ from existing label bands; this review authorizes no replacement. An in-range respiratory compensation estimate cannot establish absence of another metabolic process: anion-gap reference, albumin and delta assessment remain D10–D12 dependencies.

[R2: Accuracy of Acid-Base Diagnoses Using the Central Venous Blood Gas in the Medical Intensive Care Unit](https://pubmed.ncbi.nlm.nih.gov/29649820/) (2018; public indexed abstract reviewed) studies central venous versus arterial diagnosis in critically ill adults. Its scope does not validate automatic application to peripheral venous samples, children or all clinical settings. The [full-text link](https://pmc.ncbi.nlm.nih.gov/articles/PMC6067967/) presented a browser verification barrier during this review; no full-text-only claim is relied upon.

[R3: Evelina London, Paediatric Critical Care: Acid Base Interpretation](https://www.evelinalondon.nhs.uk/resources/our-services/hospital/south-thames-retrieval-service/Acid-base-interpretation-2017.pdf) is a local pediatric critical-care guideline, v4 effective 24 December 2025, review due 31 December 2028 despite the older filename. It emphasizes chloride, albumin and unmeasured acids, and that gas bicarbonate/base excess are derived quantities. It is not validation of this calculator or of adult coefficients in children. Its printed Henderson–Hasselbalch expression appears malformed; do not use that expression as a numerical oracle. Pediatric and laboratory specialists must review the applicable methods independently.

## 3. D02–D07 decision matrix

P0: resolve before approving interpretation design for bedside use. P1: resolve before clinical release. The D02–D03 communication policy direction and D04/D05–D07 product directions are confirmed as described in sections 3.1–3.3. Remaining recommendations, exact warning wording and placement require professional review and a separately approved implementation specification.

| Decision / priority | Current behavior and foreseeable risk | Options and trade-offs | Recommended approach | Required approval / status |
| --- | --- | --- | --- | --- |
| D02 — mixed disorders / P0 | E1/E2: no systematic assessment of opposing or multiple processes; gap is displayed but does not influence labels. Omission could delay recognition of an additional disturbance or encourage inappropriate reliance on a single diagnosis. | Explicitly limited arithmetic/assessment with unassessed domains; or staged systematic multi-process assessment. Expanded coverage requires context and independently validated rules. | For proposed patient-care CDS, specify assessed, unassessed and indeterminate domains; evaluate respiratory and metabolic coexisting processes without declaring completeness from Winter alone. A restricted alternative requires explicit residual-risk acceptance. | Product-owner communication policy direction confirmed; implementation and clinical validation **PENDING**. Clinical owner, critical care/nephrology; laboratory input for gap/provenance. |
| D03 — labels / P0 | E5: broad fallback label can suggest a mixed diagnosis without establishing one; E1's reference-range heading may be scanned as reassuring despite its caveat. | Retain restricted labels with clearer limits; or separate pH state, candidate processes and compensation assessment. Additional detail increases reading burden. | Prefer separate states, with no forced single primary diagnosis or “normal/no disorder” conclusion from pH alone. Approve a complete label truth table and uncertainty wording. | Product-owner communication policy direction confirmed; implementation and clinical validation **PENDING**. Exact wording and placement require clinical and usability review. |
| D04 — Winter applicability / P0 | Gate excludes normal-pH/alkalemic mixed presentations and can run under a generic primary label (E5). Broadening solely on low bicarbonate risks confusing renal response to respiratory alkalosis with metabolic acidosis. | Confirmed direction: patient-specific interpretation only after applicability is established using clinically approved criteria; uncertain applicability must not yield an established clinical interpretation. Conditional arithmetic is deferred to separate future review. | Neither low bicarbonate alone nor pH alone proves applicability. Never imply that expected respiratory compensation excludes a mixed disorder. See section 3.3. | Product-owner communication and display direction **CONFIRMED**; clinical applicability criteria, numerical thresholds and validation, and implementation authorization **PENDING**. Critical care/nephrology and laboratory; D02/D03/D08/D09 dependencies. |
| D05 — metabolic alkalosis / P1 | E3: no compensation check; an additional respiratory process could go unrecognized. | Explicitly unassessed; or select a reviewed estimate with context and uncertainty. | Define method, baseline, applicability, expected interval and exceptions before adding assessment. Do not turn R1's approximate ceiling into a universal cutoff. | Product-owner safety direction confirmed (section 3.2); metabolic-alkalosis method, formulas, thresholds, implementation and clinical approval **PENDING**. Clinical owner, critical care/nephrology. |
| D06 — respiratory acidosis / P1 | E4: no expected bicarbonate assessment or history. Misclassifying chronic compensation or an acute-on-chronic change could misdirect evaluation. | Confirmed direction: support both acute and chronic assessments; when duration is unknown, present both conditionally. Context collection and presentation details remain pending. | Require unknown-duration and acute-on-chronic behavior. Do not infer duration by selecting whichever formula fits best; use clinical history/trends and separately approved methods. | Product-owner direction confirmed; formulas, thresholds, implementation and clinical approval **PENDING**. Clinical owner, respiratory/critical care and nephrology. |
| D07 — respiratory alkalosis / P1 | E2: no compensation assessment; additional metabolic disturbance or expected renal adaptation remains unresolved. | Confirmed acute/chronic and unknown-duration direction as D06; independently select and validate respiratory-alkalosis methods. | Independently validate acute/chronic/unknown cases and coexisting metabolic disturbances. Never reuse respiratory-acidosis coefficients or infer duration from one gas. | Product-owner direction confirmed; formulas, thresholds, implementation and clinical approval **PENDING**. Clinical owner, respiratory/critical care and nephrology. |

## 3.1. Confirmed D02–D03 safety communication direction

The product owner confirms the communication policy direction: **when automated mixed-disorder or compensation assessment is incomplete, the application must explicitly communicate this limitation and must not imply that mixed disorders have been excluded.**

Proposed English warning — **exact wording and placement require clinical and usability review**:

> Automated acid–base assessment is incomplete. A mixed acid–base disorder cannot be excluded. Interpret the results in the full clinical context.

This confirms the communication policy direction only. D02–D03 implementation specification and clinical validation remain **PENDING**. Determine later which interpretations can remain visible and which must be withheld, including their dependencies and interaction with D09. Neither this policy nor the proposed warning authorizes retaining or suppressing a particular interpretation in production.

No diagnostic rule, compensation formula, threshold or mixed-disorder exclusion criterion is approved. The warning must not be taken as a diagnosis of a mixed disorder. D04 communication and display direction is confirmed in section 3.3, with clinical criteria, numerical validation and implementation authorization **PENDING**; D05–D07 product direction is recorded in section 3.2, with clinical and implementation decisions still **PENDING**. Clinical release remains **NO-GO**. Production behavior is unchanged.

## 3.2. Confirmed D05–D07 compensation safety direction

The product owner confirms the following product direction, without approving clinical rules or production implementation:

- Support both acute and chronic respiratory compensation assessments for respiratory acidosis (D06) and respiratory alkalosis (D07).
- When duration is unknown, present both as conditional assessments rather than selecting one as the patient's established status.
- Never automatically infer acute or chronic status from blood gas values alone, including by choosing the formula with the closest fit.
- Do not imply that expected compensation excludes mixed disorders. This safety communication direction applies across D05–D07, including metabolic alkalosis compensation (D05).
- Require separate validation for ABG, VBG and pediatric applicability; validation in one sample type or population must not automatically authorize another. Neonatal interpretation remains excluded from proposed v1.3 scope.

D05 concerns metabolic alkalosis, not an acute/chronic respiratory-disorder classification. This direction does not select a D05 compensation method or extend respiratory acute/chronic formulas to metabolic alkalosis.

All diagnostic formulas, thresholds, baseline values, applicability rules, timing definitions, implementation details and clinical approval remain **PENDING**. Conditional wording and placement, duration/context capture, acute-on-chronic handling, interpretation visibility/withholding and acceptance criteria require later specification and clinical/usability review. The product direction does not approve diagnostic thresholds, mixed-disorder exclusion criteria or automatic duration inference. D02–D03 communication requirements and D08/D09 dependencies remain in force as documented; no production assessment or withholding rule is activated. Clinical release remains **NO-GO**.

## 3.3. D04 focused Winter applicability review — product direction CONFIRMED; clinical approval PENDING

### Current behavior and independent arithmetic

The gate at [acid-base.js](../../js/calculators/acid-base.js), line 462, requires both `pH < 7.35` and `HCO₃⁻ < 22`. At pH exactly 7.35 or higher, or bicarbonate exactly 22 or higher, Winter is not assessed. The default message at lines 452–453 does not identify why assessment was omitted. The primary-label gate at lines 413–420 additionally considers CO₂; it is not identical to the Winter gate. Lines 464–496 compare raw binary values with inclusive endpoints; this review changes neither those comparisons nor their presentation.

The following intervals were independently calculated using exact decimal arithmetic, not by copying calculator output: midpoint = 1.5 × bicarbonate + 8; bounds = midpoint −2 and midpoint +2. These are **mathematical illustrations of the existing formula**, not approved diagnoses, applicability criteria or new test expectations. Use PaO₂ 80 mmHg in all examples.

| Case | pH / PCO₂ / HCO₃⁻ / Na / Cl | Independent hypothetical Winter interval, mmHg | Current behavior and interpretation limitation |
| --- | --- | --- | --- |
| E1 | 7.40 / 20 / 12 / 140 / 100 | 24–28; measured CO₂ below interval | No Winter assessment. If metabolic acidosis were independently established, the respiratory comparison would be relevant despite reference-range pH. Neither the gap nor this illustration supplies approved diagnostic criteria. |
| E2 | 7.52 / 15 / 12 / 140 / 100 | 24–28; measured CO₂ below interval | Respiratory alkalosis label; no Winter assessment. A concurrent metabolic process needs contextual assessment rather than exclusion because pH is elevated. |
| E5 | 7.33 / 42 / 21.8 / 140 / 100 | 38.7–42.7; measured CO₂ inside interval | Generic acidemia label with appropriate respiratory compensation. Being inside the interval does not resolve the primary-label ambiguity or exclude another metabolic process. |
| W4 — new illustration | 7.48 / 25 / 18 / 140 / 105 | 33–37; measured CO₂ below interval | Respiratory alkalosis label; no Winter assessment. Automatically applying Winter to low bicarbonate could incorrectly assert an additional disorder if bicarbonate represents adaptation to a respiratory process. Duration and provenance are unknown. |

W4 is not a validated pure respiratory-alkalosis case. No case is assigned a definitive clinical diagnosis here. pH/CO₂/bicarbonate agreement, where present, cannot establish clinical validity; future D08/D09 assessment remains a separate prerequisite/dependency.

### Evidence and foreseeable risks

R1 describes Winter as a respiratory-compensation assessment **when metabolic acidosis is present**, and warns that mixed disorders can have deceptively normal values. This supports reviewing applicability by underlying process and context rather than treating pH category as a sufficient exclusion rule; it does not establish a replacement software gate. Low bicarbonate can also accompany respiratory alkalosis, requiring its own assessment. An in-range Winter comparison addresses only that respiratory response, not all mixed disorders. [R1](https://www.merckmanuals.com/professional/nephrology/acid-base-regulation-and-disorders/acid-base-disorders)

Foreseeable risks are delayed recognition of a second process when assessment is withheld solely because pH is normal/elevated; false additional-process labels when calculation is applied indiscriminately to low bicarbonate; and reassurance from “appropriate compensation” being mistaken for complete assessment. Conversely, displaying conditional numbers without a clear applicability limitation may encourage users to treat them as an established diagnosis. These are risk assessments, not documented patient incidents.

ABG/VBG and population limits: Winter's expected value is arterial PCO₂. R2's adult central-VBG diagnostic study does not independently validate direct use of venous CO₂ against these arterial bounds; do not invent a venous correction or reuse the ±2 interval as a venous allowance. R3 is a local pediatric framework, not validation of this application's gate. Additional pediatric literature explicitly discusses Winter, compensation and hidden acidosis: [R4: Carmody and Norwood, Paediatric acid-base disorders: A case-based review of procedures and pitfalls (2013)](https://pubmed.ncbi.nlm.nih.gov/24381489/), with [public full-text location](https://pmc.ncbi.nlm.nih.gov/articles/PMC3680269/). Indexed abstract/excerpts were accessible; full-text retrieval encountered browser verification. These references support pediatric specialist review, not automatic transfer of adult validation. Separate ABG, VBG and non-neonatal pediatric validation remains required; neonatal interpretation remains excluded.

### Reviewed policy options and confirmed product-owner decision

| Option | Reviewed behavior | Trade-off / decision status |
| --- | --- | --- |
| A — restricted assessment | Retain current gate, explicitly disclose missing coverage and do not imply mixed disorders are excluded. | Historical review option; not selected as the future applicability policy. Retains normal/alkalemic coverage gaps and must not be presented as complete bedside assessment. |
| B — process-based assessment | Use Winter when metabolic acidosis is established under future approved criteria, irrespective of pH category alone; otherwise show applicability as unassessed. | Selected product direction for patient-specific interpretation; clinical prerequisites and context rules remain PENDING. No criteria are selected here. |
| C — conditional assessment | Follow B for established applicability; when applicability is uncertain, optionally display a separate calculation explicitly conditional on metabolic acidosis, without asserting an additional disorder or adequate compensation as a patient diagnosis. | Deferred to separate future review; no conditional arithmetic display is authorized. Risks automation bias and presentation confusion; would require separate clinical/usability review. |

**Confirmed D04 product-owner communication and display direction:**

1. Display patient-specific Winter's formula interpretation only when metabolic-acidosis applicability has been established using clinically approved criteria.
2. If applicability is uncertain, do not present Winter's result as an established clinical interpretation.
3. Defer optional conditional arithmetic display to a separate future review.
4. Never imply that expected respiratory compensation excludes a mixed acid–base disorder.
5. Do not treat low bicarbonate alone, or pH alone, as sufficient proof of applicability.

| Approval dimension | Status |
| --- | --- |
| Product-owner communication and display direction | **CONFIRMED** |
| Clinical applicability criteria | **PENDING** |
| Numerical thresholds and validation | **PENDING** |
| Implementation authorization | **PENDING** |

This confirms product direction only. It does not establish metabolic-acidosis diagnostic criteria, approve a formula or threshold, authorize production changes, or activate D08/D09 rules. Exact communication, visibility/withholding dependencies and implementation details still require review. The historical alternatives above do not authorize exceptions to this direction.

Outstanding clinical approvals: definition/evidence of metabolic acidosis; bicarbonate/sample provenance and timing; scope and exceptions; interaction with respiratory acute/chronic assessments; missing context and inconsistent/UNVERIFIABLE data; exact labels, warning and visibility/withholding; sample/population validation; numerical boundary/readability policy. No formula, threshold, tolerance or exclusion criterion is approved. Proposed future acceptance evidence must cover E1/E2/E5/W4, low bicarbonate from respiratory adaptation, approved metabolic-acidosis cases across pH categories, gate ties, independent endpoints, missing context and mixed metabolic processes. Reference calculations must remain separate from expert-adjudicated diagnostic expectations.

**D04 product-owner communication and display direction is CONFIRMED. Clinical applicability criteria, numerical thresholds and validation, and implementation authorization remain PENDING. Clinical release remains NO-GO.** D02–D03 and D05–D07 confirmed product directions remain unchanged; no production behavior is modified.

## 4. Population, provenance and withholding dependencies

Proposed D01 scope remains ABG and VBG in adults and non-neonatal children, with bicarbonate provenance identified; scope approval remains pending. **Neonatal interpretation is excluded.** Current arithmetic cannot distinguish these populations or samples. Do not transfer arterial compensation boundaries to VBG automatically, infer arterial status from the UI label, or treat pediatric physiology/reference intervals as adult defaults.

The product-owner-confirmed D08 validation sequence remains: adult arterial calculated bicarbonate first; independently validated VBG second; independently validated non-neonatal pediatric arterial/venous third; independently validated chemistry total CO₂ comparison fourth. This sequence validates neither compensation nor diagnostic rules. Actual versus standard bicarbonate, independent chemistry measurements, sample identity/timing, temperature conventions and unknown provenance affect what can be assessed. Missing context must remain explicitly unassessed or UNVERIFIABLE under a future approved specification, not implicitly consistent.

D08 numerical rules remain **PENDING — CLINICAL AND LABORATORY APPROVAL REQUIRED**. D09 product-owner withholding policy direction is confirmed: significant inconsistency detected by a future approved D08 rule must withhold all affected interpretations, warn and preserve inputs. Implementation specification and clinical validation remain pending; this review does not activate withholding. Mathematical agreement does not establish clinical validity, and agreement must not remove mixed-disorder assessment requirements.

## 5. Proposed acceptance evidence and remediation order

These are requirements for a future review package, not approved clinical acceptance criteria or instructions to change tests now:

1. **P0: D02/D03 with D08/D09.** Approve a scope/dependency and label truth table: opposite processes at reference-range pH, same-direction mixed processes, dual metabolic and triple disorders, indeterminate cases, and inconsistent/unverifiable inputs. Separate documented baseline snapshots from expert-adjudicated expected diagnoses. Include E1/E2/E5/E6; do not bless their current labels through regression tests.
2. **P0: D04.** Independently calculate Winter reference values for approved applicable cases. Cover fractional bicarbonate, each endpoint and adjacent values, normal-pH/alkalemic presentations and low bicarbonate from respiratory disorders. Approve applicability separately from arithmetic. Retain existing raw comparison/display consistency unless D15/D16 are explicitly decided; select no numerical epsilon here.
3. **P1: D05–D07.** Follow the confirmed product direction in section 3.2 while selecting methods through clinical review. Separately validate metabolic-alkalosis compensation and respiratory acute, chronic, unknown and acute-on-chronic contexts, renal disease and coexisting disturbances with expert-reviewed cases. Define transitions and unavailable history without inventing a timing cutoff. Document unassessed results until coverage is approved.
4. **P1: independent sample/population evidence.** Use appropriately sourced adult arterial, venous and non-neonatal pediatric cases; specify sample site, age, timing and bicarbonate provenance. Later D08 stages and new interpretation rules must not inherit Stage 1 approval automatically.
5. **Before implementation approval:** demonstrate that a proposed presentation does not imply normality or completeness from reference-range pH or appropriate respiratory compensation. Review reading order, uncertainty wording and long Winter endpoints with qualified users. Preserve engineering invalidation on all six inputs, invalid-calculation clearing, reset/reopening, listener cleanup and mobile accessibility in any later implementation.

Approval checklist: D02 and D03 — product-owner communication policy direction confirmed; exact warning wording/placement, visibility/withholding specification, implementation and clinical validation ☐ **PENDING**; D04 — product-owner communication and display direction **CONFIRMED**; clinical applicability criteria, numerical thresholds and validation, and implementation authorization ☐ **PENDING**; D05–D07 — product-owner direction confirmed; diagnostic formulas, thresholds, implementation details, separate sample/population validation and clinical approval ☐ **PENDING**. Clinical release remains **NO-GO**. No production change or clinical approval is recorded by this document.
