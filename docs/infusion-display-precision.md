# Infusion display precision — proposed production integration

Status: **DRAFT; mathematical verification passed, clinical/pharmacy display review pending.** Depends on engineering extraction #5. Does not authorize release or pump programming.

The previous fixed three decimal places for concentration and two for rate can turn small non-zero results into zero or introduce large relative display errors. The formatter now uses six significant decimal digits of the stored positive finite Number. All four dose-unit conversion formulas and unrounded intermediate arithmetic remain unchanged; display text is never fed back into calculations.

| Mathematical reference | Previous display | Proposed display |
|---|---|---|
| 0.005 mL/hr | 0.01 mL/hr | 0.005 mL/hr |
| 0.006 mL/hr | 0.01 mL/hr | 0.006 mL/hr |
| 0.0149 mL/hr | 0.01 mL/hr | 0.0149 mL/hr |
| 0.075 mL/hr | 0.07 mL/hr | 0.075 mL/hr |
| 0.0005 mg/mL | 0.001 mg/mL | 0.0005 mg/mL |

## Exact numerical policy

- Reject non-number, non-finite, zero or negative formatter inputs without coercion.
- `Number.toExponential(5)` rounds the stored binary Number to six significant decimal digits. Exact positive ties round upward; decimal-looking ties can lie on either side when represented in binary.
- Strip unnecessary fractional zeros while preserving integer place-value zeros and a leading zero for ordinary fractions.
- Choose notation after rounding. Rounded exponents −6 through 5 use ordinary decimals; other magnitudes use lowercase `e` and an explicit plus for positive exponents. Carries such as `999999.6` become `1e+6`.
- Preserve the existing mg/mL and mL/hr units. The safety note explicitly identifies results as mathematical calculations rather than pump settings.

The engineering target is relative formatting error at most 5e-6 (0.0005%) against the stored Number, not total dose accuracy. Tests independently decode IEEE-754 values and parse output decimal strings into BigInt rationals to verify that bound. They cover 9,628 finite examples, ties and adjacent values, notation transitions, normals/subnormals, extreme values, invalid inputs and known defect vectors. End-to-end tests also check the four unit conversions, equivalent prescriptions, invalidation and numeric rejection.

## Remaining review and limitations

Six displayed digits do not establish six-digit accuracy of the prescription, preparation, weight, device or delivered dose. Scientific notation and long decimal fractions need clinical/pharmacy readability review. No pump increments, device profiles or universal minimum rate are assumed.

Formatting cannot recover precision already lost through floating-point intermediate arithmetic. Tests separately expose subnormal quantization, underflow and overflow limits instead of claiming the formatting bound covers total mathematical error. Existing numeric guards continue to withhold invalid results.

Before merging or release, record acceptance of: six significant digits and its formatting budget; binary versus exact decimal rounding; notation cutoffs and readability; unit presentation and mathematical-result wording; and handling of extreme values. This proposal does not change ABG, NEWS2, GCS or Shock Index clinical behavior or approve draft #2.
