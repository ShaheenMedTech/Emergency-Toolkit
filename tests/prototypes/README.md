# Infusion precision prototype — not approved for clinical use

This module exists only under `tests/prototypes`. The application does not load
or import it. Production infusion formulas, intermediate arithmetic, output
formatting, messages, input acceptance and pump behavior remain unchanged.

## Exact candidate behavior

- Accept primitive positive finite JavaScript Numbers. Reject zero, negative
  values, non-finite values and other types with RangeError, without coercion.
- Round the actual stored binary value to six significant decimal digits using
  `Number.toExponential(5)`: nearest rounding, exact positive ties upward.
  Decimal-looking ties can differ from exact binary ties. For example,
  `1.234375` is an exact tie and becomes `1.23438`; `1.234565` becomes `1.23456`
  because its binary representation is below the decimal midpoint.
- Remove unnecessary trailing fractional zeros. Retain integer place-value
  zeros and a leading zero before any ordinary fractional decimal.
- Choose notation from the rounded exponent, without reparsing the rounded value.
  Rounded magnitudes in `[1e-6, 1e6)` use ordinary decimals. Everything else uses
  lowercase `e`, one leading mantissa digit, no padded exponent digits, and an
  explicit `+` for positive exponents (examples: `1e+6`, `4.94066e-324`).
- A rounding carry can change notation: `9.999996e-7` becomes `0.000001`, while
  `999999.6` becomes `1e+6`. Selection is based on rounded, not original magnitude.
- All supported positive values retain a positive decimal representation,
  including Number.MIN_VALUE. Number.MAX_VALUE becomes `1.79769e+308`.
- Return a display string only. Never feed it into calculations. The prototype
  neither calculates doses nor adds units nor supplies pump settings.

## Independent verification

Run `node tests/infusion-precision-prototype-test.js`. Existing CI discovers this
file through its `tests/*-test.js` pattern. Existing tests are retained verbatim.

The test oracle decodes IEEE-754 bits into exact BigInt rationals and separately
parses output decimal text into exact rationals. It does not use production
formatting or floating-point subtraction to verify the accuracy bound.
Known defect vectors also use independently specified mathematical rationals.

The candidate formatting error target is absolute relative error <= 5e-6
(0.0005%) against the stored raw Number. Six-digit nearest decimal rounding has
absolute error at most half a unit at its sixth significant place; dividing by
the magnitude gives this bound. The tests compare fractions exactly, including
subnormals, rather than using a tolerance that might conceal failure.

Coverage includes the five known rounding defects; exact and decimal-looking
ties and adjacent representable doubles; all decimal powers from -323 to 308
with selected coefficients and neighbors; 2,000 deterministic binary patterns;
notation carries; minimum normal/subnormal and maximum finite values; overflow,
zero, invalid types and upstream underflow. Console output reports comparisons,
the worst sampled formatting error, and arithmetic limitations separately.

| Exact mathematical value | Current display | Prototype display |
| --- | --- | --- |
| 0.005 mL/hr | 0.01 mL/hr | 0.005 |
| 0.006 mL/hr | 0.01 mL/hr | 0.006 |
| 0.0149 mL/hr | 0.01 mL/hr | 0.0149 |
| 0.075 mL/hr | 0.07 mL/hr | 0.075 |
| 0.0005 mg/mL | 0.001 mg/mL | 0.0005 |

The prototype emits numeric strings without units; the table retains units only
in the current-display column. Production still exhibits these unresolved defects.

## Limits and decisions awaiting approval

The target covers formatting of the raw binary value, not overall mathematical,
clinical or delivered-dose accuracy. No finite formatting sample exceeded it.
Finite sampling is not exhaustive validation of all binary values.

An upstream exact `3 * 2^-1075` rounds to `2 * Number.MIN_VALUE`; formatting that
result has about 33.3333% error against the intended exact mathematical value.
An exact `2^-1075` rounds to zero and is rejected. Those examples are outside
the current calculator's accepted infusion minima, but demonstrate that the
formatter cannot repair lost arithmetic precision. Existing overflow cases also
remain rejected even when algebraic rearrangement could produce a finite result.

Six digits do not establish six-digit accuracy of prescriptions, weight,
preparation or delivery. Integer trailing zeros can be ambiguous about measured
significance. Scientific notation introduces exponent-reading/copying risks;
ordinary tiny decimals can be harder to read. Neither representation establishes
an achievable or approved pump setting. This prototype provides no pump profile,
rate increment, dose limit, suitability check or operational recommendation.

Before production integration, pharmacy/clinical review must approve:

1. Six significant digits and the proposed formatting error budget.
2. Stored-binary rounding semantics versus exact decimal input semantics.
3. Notation boundaries, exponent presentation, trailing-zero policy and unit layout.
4. Wording that distinguishes mathematical rates from pump-programmable settings.
5. Treatment of extreme finite and subnormal results and total arithmetic error.

Any future pump-setting feature needs separately approved device specifications,
quantization rules and allowable delivered-dose deviations. No device capability
or universal drug/rate limit is assumed here.
