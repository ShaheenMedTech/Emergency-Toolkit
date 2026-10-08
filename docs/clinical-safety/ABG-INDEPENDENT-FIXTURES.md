# Independent ABG fixtures: verification scope and remaining risks

Baseline: `fd26613d963d0b9eb4fa258357b93ac7dd58b079`.
Specification: [ABG interpretation safety specification](ABG-INTERPRETATION-SAFETY-SPEC.md).

**These are baseline software regressions, not approved clinical acceptance cases.**
No production code, formula, threshold, clinical text or existing test is changed.
No PENDING decision becomes approved by adding or passing these tests.

## Evidence files and independence

- [Fixture data](../../tests/fixtures/abg-baseline-fixtures.js) explicitly transcribes
  E1–E9 and 30 boundary outcomes from the specification's existing truth table.
  It contains no conditional diagnostic oracle. Each example identifies relevant
  PENDING decisions. Synthetic boundary combinations need not represent coherent
  patient samples; their labels are implementation snapshots only.
- [Node suite](../../tests/abg-independent-fixtures-test.js) uses exact BigInt
  rational arithmetic over entered decimal strings. It evaluates charge
  differences independently of production Number arithmetic. Winter endpoints
  are independently solved using `2L = 3H + 12` and `2U = 3H + 20`, then checked
  against precomputed decimal/rational references. No primary-classification
  branches are copied into the test oracle.
- [Browser suite](../../tests/abg-independent-fixtures-browser-test.html) loads
  the same static fixtures and actual calculator in Chromium. It checks both
  input events, values, explicit calculation, current oxygenation wording,
  invalid clearing, reset and reopening using real DOM controls. Independent
  mathematical reference calculations are in the Node suite, not browser snapshots.

For endpoints, the Node suite permits a small engineering difference of
`8 × Number.EPSILON × |reference|` when comparing the Number representation to
the independently exact decimal reference. This is solely a software arithmetic
comparison allowance; it is not a clinical pH/bicarbonate discrepancy tolerance,
physiological compensation range or permission to change classification.
Exact raw inclusivity and adjacent binary-value tests remain in the unchanged
[Winter display suite](../../tests/abg-winter-display-test.js).

## Coverage and interpretation

| Area | Added evidence | What this does not establish |
| --- | --- | --- |
| E1/E2 | Current labels and absent Winter assessment despite normal/alkalemic pH with low bicarbonate | Adequate mixed-disorder detection or an approved diagnosis |
| E3/E4 | Current labels and absent other compensation assessment | Metabolic alkalosis or acute/chronic respiratory compensation validity |
| E5 | Generic mixed/partial label alongside appropriate Winter compensation | Clinical consistency or approval of that combined wording |
| E6 | Current accepted label plus independently computed buffer ratio 5 and predicted pH about 6.80 | Any approved tolerance, rejection rule or diagnosis for mismatched observations |
| E7/E8 | Independent mathematical endpoints and exact current display snapshots | Physiological precision or approval of long binary-decimal tails |
| E9 | Missing PaO₂ clears populated results; PaO₂ 501 also remains rejected | Approval of mandatory PaO₂ or existing supported ranges |
| Primary boundaries | Below/at/above pH 7.35/7.45, bicarbonate 22/26, PaCO₂ 35/40/45 | Clinical validity of those thresholds or synthetic combinations |
| Winter mathematics | Seven independently specified endpoint pairs and 28 inside/outside checks | Authorization to apply Winter outside its existing gate |
| Safety lifecycle | E1–E9 through both input/change events, preservation, explicit recalculation, reset/reopening | Completion of broader clinical acceptance or release approval |

Baseline arithmetic assertions and display/label snapshots are separate. E8's
exact decimal upper reference is 42.85; current binary arithmetic produces a
slightly smaller upper bound and labels PaCO₂ 42.85 additional respiratory
acidosis. The tests retain that distinction rather than redefining the threshold.
E6 explicitly documents that the inconsistency is accepted today; it does not
assert that the reference-range pH label is a clinically correct diagnosis.

## Uncovered clinical risks and PENDING decisions

The authoritative decision register remains unchanged in the baseline specification.

| Decisions | Remaining risk / unavailable clinical acceptance evidence | Status |
| --- | --- | --- |
| D01 | Intended population, sample types and exclusions not clinically approved | PENDING |
| D02–D04 | Mixed-disorder scope, primary-label ambiguity and Winter gate applicability | PENDING |
| D05–D07 | Additional compensation methods and acute/chronic respiratory context | PENDING |
| D08–D09 | Bicarbonate source, timing, consistency tolerance and failure workflow | PENDING |
| D10–D12 | Gap reference, albumin correction, delta method and numerical prerequisites | PENDING |
| D13–D14 | Mandatory PaO₂, partial-result policy, oxygen metadata and supported ranges | PENDING |
| D15–D16 | Winter readability and any distinct decimal arithmetic/threshold policy | PENDING |
| D17–D18 | Clinical fixture approval, residual-risk assessment, implementation/release authorization | PENDING |

There are no new approved expectations for albumin correction, delta ratios,
inconsistent-sample rejection, alternative compensation or oxygenation diagnosis.
Those tests can only gain clinical acceptance assertions after explicit decisions
define the intended behavior. Neither baseline snapshots nor independently correct
arithmetic substitutes for that review.

## Running and assessing the evidence

Run `node tests/abg-independent-fixtures-test.js`; existing CI discovers the file
through `tests/*-test.js`. Run all other suites and structural checks unchanged.
Open the browser harness locally, or use Chromium headless with `--dump-dom` and
inspect `#verification` for PASS/FAIL. The harness intentionally records
`BASELINE ONLY`/PENDING status; process exit alone is not the browser assertion result.

Future clinically approved changes must explicitly revise affected snapshots and
retain historical limitation evidence. Do not remove coverage, reinterpret a
baseline assertion as a clinical acceptance criterion, or mark a policy approved
because software tests pass. Acceptance criteria AC01–AC14 remain in the baseline
specification; this phase adds evidence toward AC03–AC05 and AC11–AC13 without
claiming that all criteria are fulfilled.
