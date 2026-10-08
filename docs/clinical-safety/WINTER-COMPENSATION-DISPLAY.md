# Winter compensation display consistency

Baseline: `16326e1`. Scope: presentation only; no new diagnostic algorithm.

## Verified defect and correction

For HCO₃⁻ 15.1 mmol/L, the mathematical midpoint is 30.65 mmHg and the interval
is 28.65–32.65 mmHg. With PaCO₂ 32.63 mmHg, the previous display said
"Appropriate respiratory compensation. Expected PaCO₂ 30.6 ±2 mmHg". That
display implies an upper bound of 32.6, contradicting the classification.
With PaCO₂ 28.63, its implied lower bound of 28.6 similarly conflicts with
the additional-respiratory-alkalosis classification.

The result now shows the explicit interval used for comparison:
"Expected PaCO₂ interval 28.65–32.65 mmHg (inclusive)". The three existing
classification prefixes are unchanged. Winter's formula, inclusive comparisons,
application gate, intermediate arithmetic and other result text remain unchanged.
Phase 3B.1 input/change invalidation, explicit recalculation, invalid-input
clearing, reset and reopening remain in place.

## Why explicit bounds

A rounded midpoint ±2 forces the reader to reconstruct an interval that may
not match the calculated interval. Rounding explicit endpoints to a fixed
number of decimals can recreate the same discrepancy. Expanding or shrinking
the displayed interval would also misrepresent some adjacent values.

The implementation uses the shortest round-trip decimal representation of each
raw Number bound. Parsing either displayed endpoint as a Number recovers exactly
the value used for classification. No midpoint or endpoint is rounded with
toFixed, and display text is never reused for calculations. This consistency
claim uses the calculator's stored-binary numeric semantics, not exact decimal
input arithmetic.

## Remaining presentation and clinical decisions — PENDING

- Clinical review of explicit inclusive-bound wording and its suitability for
  point-of-care use remains PENDING. This software correction does not validate
  the diagnostic algorithm or imply greater physiological accuracy.
- Some fractional inputs expose long binary-decimal tails. For HCO₃⁻ 21.9,
  raw bounds display as 38.849999999999994–42.849999999999994. Shortening these
  to 38.85–42.85 would contradict the preserved classification at PaCO₂ 42.85.
  Any cleaner rounding/bounding presentation requires a separately reviewed
  specification with equivalent boundary safety; no arbitrary epsilon is added.
- Exact decimal arithmetic or changes to threshold comparisons are outside
  this correction and require separate engineering/clinical approval.
- A long decimal endpoint represents the implemented numerical comparison,
  not clinical measurement precision or certainty about compensation.
- Mixed-disorder coverage, compensation outside the current gate, input
  consistency, albumin/gap assessment and oxygenation context remain outside scope.

## Verification

`tests/abg-winter-display-test.js` uses precomputed rational reference bounds,
fractional HCO₃⁻/PaCO₂ cases, exact endpoints and adjacent binary values. It
checks agreement between all three classifications and displayed bounds, and
preserves known pre-change floating-point classifications and application gates.

The existing ABG result-safety tests remain unchanged. The browser result-safety
harness also covers fractional Winter display cases, raw endpoint inclusivity,
invalidation, reset and reopening. Passing these software checks does not
establish clinical validity or confer clinical approval.
