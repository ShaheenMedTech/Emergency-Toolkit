# ABG interpretation safety specification

**Status: PROPOSED — unresolved clinical policies are PENDING.**

Evidence baseline: `2b41cc3ba169fe9a7efcafc7c21f12531bfc4fec` (`2b41cc3`).
This is a documentation-only specification for review. It records existing
software behavior and proposes requirements for later approved work. It does
not approve a clinical algorithm, change any threshold, or authorize implementation.
No clinical reviewer, approval date or acceptance tolerance is assumed.

## 1. Evidence and authority

Repository paths and line numbers refer to the baseline:

| Evidence | File | Lines / scope |
| --- | --- | --- |
| Input labels and units | [acid-base.js](../../js/calculators/acid-base.js) | 40–125 |
| Clinical disclaimer | [acid-base.js](../../js/calculators/acid-base.js) | 155–161 |
| Immediate invalidation, calculation and reset | [acid-base.js](../../js/calculators/acid-base.js) | 279–304 |
| Numeric validation and failure clearing | [acid-base.js](../../js/calculators/acid-base.js) | 313–378 |
| Anion gap and primary labels | [acid-base.js](../../js/calculators/acid-base.js) | 386–435 |
| Winter formula, gate, intervals and classifications | [acid-base.js](../../js/calculators/acid-base.js) | 442–493 |
| PaO₂ contextual wording | [acid-base.js](../../js/calculators/acid-base.js) | 496–498 |
| Oxygenation, invalid recalculation and reset coverage | [abg-oxygenation-test.js](../../tests/abg-oxygenation-test.js) | Entire file |
| All six input/event lifecycle transitions | [abg-result-safety-test.js](../../tests/abg-result-safety-test.js) | Entire file |
| Independent rational Winter boundaries and binary neighbors | [abg-winter-display-test.js](../../tests/abg-winter-display-test.js) | Entire file |
| Browser lifecycle and fractional Winter cases | [ABG browser harness](../../tests/abg-result-safety-browser-test.html) | Entire file |
| Existing presentation rationale and pending decisions | [Winter display document](WINTER-COMPENSATION-DISPLAY.md) | Entire file |

Free clinical references checked for this specification:

| ID | Reference and provenance | Use and limitations |
| --- | --- | --- |
| R1 | [Merck Manual Professional: Acid-Base Disorders](https://www.merckmanuals.com/professional/nephrology/acid-base-regulation-and-disorders/acid-base-disorders), James L. Lewis III; peer reviewed by Glenn D. Braunstein; full review March 2025, updated April 2025 | Professional framework for mixed disorders, compensation and bicarbonate sources; reference thresholds are not automatically the application's approved thresholds |
| R2 | [Society of Hospital Medicine acid-base teaching handout](https://www.hospitalmedicine.org/globalassets/professional-development/clinical-quick-talks-pdfs/cqt-table-images/acid-base-mini-lecture-by-elizabeth-cerceo.pdf), Elizabeth Cerceo, MD, FACP, FHM | Compensation, albumin and delta-gap considerations; an educational handout, not a local protocol; no publication date visible in the document |
| R3 | [BTS guideline for oxygen use in adults in healthcare and emergency settings](https://www.brit-thoracic.org.uk/document-library/guidelines/emergency-oxygen/bts-guideline-for-oxygen-use-in-adults-in-healthcare-and-emergency-settings/), O'Driscoll and colleagues, Thorax 2017;72:i1–i90; DOI 10.1136/thoraxjnl-2016-209729 | Adult oxygen context, including device/flow recording, sampling and blood-gas interpretation; applicability and any subsequent/local guidance require clinical review |
| R4 | [Western University: Acid-Base Foundations](https://edassets.westernu.edu/acidbase/index.html), Edward Barnes, MD, FACP | University teaching resource for the bicarbonate-buffer equation; no publication date visible; use here is limited to mathematical consistency, not adoption of its classification framework |

References support review; they do not constitute local approval. Clinical
owners must select applicable versions, reconcile differing conventions, and
record review dates before changing behavior. Relevant links were accessible
during preparation; future release review must recheck currency.

## 2. Verified current software behavior

### 2.1 Inputs and validation

All six fields are mandatory. They are parsed as JavaScript Numbers and checked
for finiteness and the following inclusive software ranges:

| Field | Unit | Accepted software range |
| --- | --- | --- |
| pH | Dimensionless | 6.5–8.0 |
| PaCO₂ | mmHg | 5–150 |
| HCO₃⁻ | mmol/L | 1–60 |
| PaO₂ | mmHg | 1–500 |
| Na⁺ | mmol/L | 80–220 |
| Cl⁻ | mmol/L | 40–180 |

These are existing validation bounds, not normal ranges or newly approved
clinical limits. HTML input steps are not enforced by the Calculate click
handler; accepted fractional values can have more digits than those steps imply.
No mutually consistent sample or bicarbonate-source check is implemented.

Both input and change events immediately clear all four results without changing
entered values. Correction does not calculate automatically. Invalid recalculation
clears all results; reset empties inputs; closing/reopening starts a fresh dialog.
These engineering safeguards are retained requirements for any future work.

### 2.2 Primary interpretation truth table

The following is a description of code, not clinical approval of its boundaries:

| pH condition | Additional condition | Current label |
| --- | --- | --- |
| pH < 7.35 | HCO₃⁻ < 22 and PaCO₂ <= 40 | Metabolic acidosis |
| pH < 7.35 | PaCO₂ > 45 and HCO₃⁻ >= 22 | Respiratory acidosis |
| pH < 7.35 | Neither condition above | Acidaemia — mixed or partially compensated disorder |
| pH > 7.45 | HCO₃⁻ > 26 and PaCO₂ >= 40 | Metabolic alkalosis |
| pH > 7.45 | PaCO₂ < 35 and HCO₃⁻ <= 26 | Respiratory alkalosis |
| pH > 7.45 | Neither condition above | Alkalaemia — mixed or partially compensated disorder |
| 7.35 <= pH <= 7.45 | Any accepted PaCO₂/HCO₃⁻ | pH within reference range — assess for compensated or mixed disorder |

The gap does not influence these labels. The generic mixed/partial labels do
not enumerate disorders or distinguish the alternatives. The reference-range
pH message already asks users to assess for mixed disorders; it is not an
explicit statement that the blood gas is normal.

### 2.3 Compensation, gap and oxygenation

Winter assessment applies only when `pH < 7.35` AND `HCO₃⁻ < 22`:

- Midpoint: `1.5 × HCO₃⁻ + 8` mmHg.
- Bounds: midpoint minus/plus 2 mmHg.
- PaCO₂ inside the inclusive raw interval: appropriate respiratory compensation.
- PaCO₂ below it: additional respiratory alkalosis.
- PaCO₂ above it: additional respiratory acidosis.

Other cases display "No specific compensation formula applied." No metabolic
alkalosis or acute/chronic respiratory compensation formula is implemented.
An appropriate Winter result addresses respiratory compensation only; it does
not exclude another metabolic disorder.

Anion gap is `Na − (Cl + HCO₃⁻)`, excludes potassium, and displays one decimal.
No reference interval, explicit output unit, albumin correction or delta assessment
is supplied. The single bicarbonate field is also used in this calculation.

PaO₂ is echoed with the existing warning that it is not a standalone oxygenation
assessment and must be interpreted with FiO₂, device, sample type and local
protocol. No FiO₂/context fields, P/F ratio, A–a gradient or oxygenation diagnosis
are implemented. Prior standalone low/normal/high PaO₂ labels remain absent.

## 3. Reproducible observations and clinical-review questions

Enter each row into the six fields and press Analyze ABG. Units follow section 2.
These are software test examples, not patient diagnoses or treatment guidance.
Outputs below were reproduced directly from the baseline calculator.

| ID | pH / PaCO₂ / HCO₃⁻ / PaO₂ / Na / Cl | Verified output | Question for clinical review |
| --- | --- | --- | --- |
| E1 | 7.40 / 20 / 12 / 80 / 140 / 100 | AG 28.0; reference-range pH message; no compensation formula | Opposing respiratory/metabolic processes may coexist despite reference-range pH; current gate gives no specific assessment |
| E2 | 7.52 / 15 / 12 / 80 / 140 / 100 | AG 28.0; Respiratory alkalosis; no compensation formula | How should low bicarbonate and gap context affect assessment when pH is alkalemic? |
| E3 | 7.46 / 70 / 48 / 80 / 140 / 90 | AG 2.0; Metabolic alkalosis; no compensation formula | Is an additional respiratory process present? Current software does not evaluate that compensation |
| E4 | 7.28 / 60 / 27 / 80 / 140 / 105 | AG 8.0; Respiratory acidosis; no compensation formula | Acute versus chronic compensation cannot be selected from current inputs/history |
| E5 | 7.33 / 42 / 21.8 / 80 / 140 / 100 | AG 18.2; generic acidaemia mixed/partial label; appropriate Winter interval 38.7–42.7 | Different primary/compensation gates produce ambiguous combined messages, not proof of a second disorder |
| E6 | 7.40 / 80 / 12 / 80 / 140 / 105 | AG 23.0; reference-range pH message; no compensation formula | Individually accepted values are grossly inconsistent with the conventional bicarbonate-buffer equation, which predicts pH about 6.80 |
| E7 | 7.29 / 32.63 / 15.1 / 80 / 140 / 110 | Appropriate Winter interval 28.65–32.65 | Corrected display agrees with raw classification; previous rounded midpoint display did not |
| E8 | 7.33 / 42.85 / 21.9 / 80 / 140 / 105 | Additional respiratory acidosis; interval 38.849999999999994–42.849999999999994 | Binary-decimal tails preserve comparisons but may confuse readers |
| E9 | 7.30 / 30 / 15 / blank / 140 / 110 | Validation failure; all results cleared | Should missing oxygen data block acid-base analysis? PaO₂ 501 also blocks it under the current software range |

The omissions and exact outputs are verified engineering findings. Their
diagnostic significance and corrective policy require clinical review. No
patient harm or clinical approval is inferred from these examples.

## 4. Proposed clinical policy requirements — all PENDING

### 4.1 Interpretation scope and mixed disorders

R1 explains that mixed disorders can yield deceptively normal values and require
assessment of expected compensation. A future specification must distinguish
pH state, identified processes, compensation and uncertainty. It must not equate
reference-range pH or appropriate respiratory compensation with absence of disease.

Clinical owners must decide whether to retain an explicitly limited tool or expand
its diagnostic coverage. Approve behavior for E1/E2 and for ambiguous generic
labels before implementation. Do not apply Winter automatically to every low
bicarbonate value: a respiratory process and its compensation may also lower it.
Existing thresholds must not change solely because another reference uses
different normal ranges. Intended population, sample type and clinical context
must be specified; paediatric/pregnancy applicability is not established here.

### 4.2 Compensation coverage

| Disorder | Verified coverage | Proposed decision requiring approval |
| --- | --- | --- |
| Metabolic acidosis | Winter only within the current pH/bicarbonate gate | Applicability in normal/alkalemic mixed cases; context and limitations |
| Metabolic alkalosis | None | Approved formula/reference and scope, or explicit limitation of functionality |
| Respiratory acidosis | None | Acute/chronic assessment and handling of unknown/mixed time course |
| Respiratory alkalosis | None | Acute/chronic assessment and handling of unknown/mixed time course |

R1 describes distinct compensation responses for these categories and different
acute/chronic respiratory responses. This document selects no new formula,
tolerance, baseline or timing cutoff. If history is unavailable, any future
algorithm must not silently assume an acute or chronic state. Compensation
equations are contextual estimates, not definitive diagnoses.

### 4.3 pH / PaCO₂ / HCO₃⁻ consistency

R4 gives the conventional relationship `pH = 6.1 + log10(HCO₃⁻ / (0.03 × PaCO₂))`
with PaCO₂ in mmHg. It supplies a mathematical consistency reference, not an
approved rejection tolerance. R1 distinguishes blood-gas-calculated bicarbonate
from separately measured serum bicarbonate, which may disagree.

Before implementing a consistency check, approve:

- Whether the bicarbonate field means blood-gas-derived or serum chemistry value,
  and whether separate fields are needed for acid-base and gap assessment.
- Sample identity, collection timing and temperature/reporting assumptions.
- The applicable equation/constants and unit handling.
- A clinically justified discrepancy measure and tolerance, supported by the
  intended sample/analyzer context. No numeric tolerance is assigned here.
- Whether a discrepancy triggers a warning, withholding interpretation or another
  reviewed workflow; approve wording and correction behavior.

No value should be silently overwritten to force consistency. Approved failure
behavior must preserve entries, invalidate dependent results and allow recovery.
Do not require exact equality for independently measured observations.

### 4.4 Anion gap, albumin and delta assessment

R2 describes albumin's effect on gap and delta-gap assessment for additional
metabolic processes. Its cited albumin adjustment is 2.5 mmol/L per 1 g/dL
decrease; this source coefficient is not an approved local calculation.
Any integration must select albumin units/reference, correction formula, local
gap reference interval and bicarbonate source explicitly.

Specify whether a displayed gap remains uncorrected or becomes corrected; retain
the distinction and units. Decide what to do when albumin is unavailable rather
than assuming normal albumin. Approve treatment of implausible combinations and
negative gaps without treating every negative result as automatically invalid.

Delta-gap/ratio definitions and reference conventions vary. Clinical owners
must select an applicable method, prerequisites and interpretation boundaries.
Any ratio with a zero/near-zero denominator needs an approved numerical domain
and unavailable-result behavior; no denominator tolerance or ratio cutoff is
invented here. Gap findings alone must not produce etiologic diagnoses.

### 4.5 Oxygenation and mandatory PaO₂

R3 supports recording oxygen device/flow with oxygenation observations and
distinguishing sample context. The existing PaO₂ limitation is retained evidence,
not a substitute for such metadata.

Two policies remain open: retain mandatory PaO₂ within an explicitly limited
ABG-only workflow, or allow acid-base results without it while making oxygenation
unavailable. Neither is approved. Approve how missing versus supplied-but-invalid
oxygen data affects other results and review the current supported range.

Do not assume room air when FiO₂ is absent or equate device flow with an exact
FiO₂. Any later oxygenation calculation requires its own approved context,
units, sample restrictions and interpretation specification. No P/F, A–a,
oxygen-treatment or disease-severity algorithm is authorized here.

### 4.6 Winter interval presentation

The Phase 3B.2 change displays explicit inclusive raw bounds using shortest
round-trip decimal strings. Parsing an endpoint as a Number recovers the
comparison value. This corrects software display consistency without changing
Winter's formula or classifications; see the [Winter display document](WINTER-COMPENSATION-DISPLAY.md).

E8 exposes the unresolved readability risk: shortening the upper bound to 42.85
would conflict with the preserved additional-acidosis label at PaCO₂ 42.85.
Long endpoints are numerical representations, not physiological precision.

Approve final interval wording, units, readability/accessibility and copy behavior.
Any shorter display must retain classification consistency across neighboring
inputs. Exact decimal arithmetic, threshold changes or epsilon adjustments need
a separate approved specification; presentation alone must not change diagnosis.

## 5. Explicit acceptance criteria for later approved work

These requirements do not authorize implementing an unresolved policy.

| ID | Acceptance requirement and evidence |
| --- | --- |
| AC01 | Record clinical owner, approved scope/population, reference versions, decisions and review date; reconcile current software ranges with intended clinical scope |
| AC02 | Each changed interpretation has a clinically approved truth table and independent example expectations; keep pH state, disorder labels and compensation findings internally consistent |
| AC03 | Cover E1–E9 with observed baseline outputs and separately approved future expectations; retain baseline evidence rather than silently treating omissions as clinically acceptable |
| AC04 | Test pH around 7.35/7.45, HCO₃⁻ around 22/26 and PaCO₂ around 35/40/45; preserve current boundaries unless a separately approved decision changes them |
| AC05 | Preserve independent Winter references, exact inclusive bounds, binary neighbors and fractional cases; displayed information must agree with actual classification under approved numerical semantics |
| AC06 | For each approved new compensation method, independently test its formula, application gate, boundary cases, missing context and acute/chronic ambiguity; do not assign diagnostic expectations before approval |
| AC07 | Once a consistency tolerance is approved, test below/at/above it with matching/mismatched sample contexts, bicarbonate sources and units; preserve inputs and verify approved recovery behavior |
| AC08 | Verify uncorrected gap arithmetic independently; test approved reference/albumin policies, missing albumin, units and negative/extreme examples; label corrected versus uncorrected output unmistakably |
| AC09 | If delta assessment is approved, test prerequisites, approved interpretation boundaries and unavailable/zero-denominator cases against independent clinical/mathematical fixtures |
| AC10 | Test the selected PaO₂-mandatory/optional policy, missing and invalid data, sample/context restrictions and unit handling; retain the safety limitation unless replacement wording is explicitly approved |
| AC11 | Maintain all six inputs × input/change immediate invalidation, explicit recalculation, invalid clearing, reset/reopening and no stale partial interpretations |
| AC12 | Review Winter/other displays on desktop/mobile and supported display modes, with accessible reading and copy behavior; precision must not imply unwarranted clinical certainty |
| AC13 | Run every existing/new automated suite, syntax/structural checks and browser harness; report failures and unchanged coverage; passing tests is not clinical validation |
| AC14 | Document residual risks and numerical limitations, obtain recorded clinical review and separate release authorization; do not mark unresolved decisions approved through software test success |

## 6. Decision checklist — all unresolved policies PENDING

No approver or approval date is assigned. Review roles below identify proposed
ownership, not approvals. Clinical scope changes require a separate implementation
request after decisions are recorded.

| ID | Decision | Review roles | Status | Approver / date / record |
| --- | --- | --- | --- | --- |
| D01 | Intended population, samples, clinical use and exclusions | Clinical owner, laboratory | PENDING | — |
| D02 | Retain limited interpretation scope versus expand mixed-disorder assessment | Clinical owner | PENDING | — |
| D03 | Primary-label truth table, reference ranges and ambiguity wording | Clinical owner | PENDING | — |
| D04 | Winter applicability outside current gate and physiological limitations | Clinical owner | PENDING | — |
| D05 | Metabolic alkalosis compensation method and context | Clinical owner | PENDING | — |
| D06 | Acute/chronic respiratory acidosis assessment and unavailable history | Clinical owner, respiratory/critical care | PENDING | — |
| D07 | Acute/chronic respiratory alkalosis assessment and unavailable history | Clinical owner, respiratory/critical care | PENDING | — |
| D08 | Bicarbonate source, sample timing and consistency equation assumptions | Clinical owner, laboratory | PENDING | — |
| D09 | Consistency discrepancy measure, tolerance and failure workflow | Clinical owner, laboratory, engineering | PENDING | — |
| D10 | Gap reference interval, units, bicarbonate source and extreme/negative handling | Clinical owner, laboratory | PENDING | — |
| D11 | Albumin correction, units/reference and missing-albumin behavior | Clinical owner, laboratory | PENDING | — |
| D12 | Delta method, prerequisites, interpretation and numerical domain | Clinical owner, laboratory, engineering | PENDING | — |
| D13 | Mandatory versus optional PaO₂ and partial-result policy | Clinical owner, respiratory/critical care | PENDING | — |
| D14 | Oxygen/sample metadata, supported ranges and future oxygenation scope | Clinical owner, respiratory/critical care, laboratory | PENDING | — |
| D15 | Winter interval wording and readability without boundary contradiction | Clinical owner, engineering, accessibility review | PENDING | — |
| D16 | Any decimal arithmetic/threshold policy change, separately scoped | Clinical owner, laboratory, engineering | PENDING | — |
| D17 | Approved reference versions, independent clinical fixtures and residual-risk assessment | Clinical owner, laboratory, engineering | PENDING | — |
| D18 | Authorization for later implementation and subsequent release | Clinical owner, release reviewer | PENDING | — |

Current outcome: **PENDING — no clinical interpretation policy is approved by
this document; production and existing tests remain unchanged.**
