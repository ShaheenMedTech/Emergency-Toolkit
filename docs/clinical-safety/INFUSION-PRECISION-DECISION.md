# Infusion precision safety decision document

**Status: PROPOSED — ALL APPROVAL DECISIONS PENDING**

Evidence baseline: `d94ae044a4e37a7328810656b7c0e51096ac26c9` (`d94ae04`).
Scope: mathematical concentration/rate presentation in Emergency Toolkit v1.3.
This document records verified engineering findings and proposed policies for
review. It does not authorize production integration or medication administration.
No clinical, pharmacy, or device decision is approved by this document.

## 1. Evidence and scope

Paths below are relative to the repository root; line numbers refer to the baseline.

| Evidence | Source | Relevant lines |
| --- | --- | --- |
| Current input validation, explicit dose-unit allowlist | [infusions.js](../../js/calculators/infusions.js) | 392–438 |
| Unrounded concentration, four dose conversions, rate arithmetic | [infusions.js](../../js/calculators/infusions.js) | 439–486 |
| Numeric failure handling and production formatting | [infusions.js](../../js/calculators/infusions.js) | 489–512 |
| Independent mathematical references and unresolved display defects | [infusions-verification-test.js](../../tests/infusions-verification-test.js) | 75–134 |
| All 12 ordered unit transitions and lifecycle tests | [infusions-verification-test.js](../../tests/infusions-verification-test.js) | 136–203 |
| Existing overflow, subnormal and legacy-format snapshots | [infusions-test.js](../../tests/infusions-test.js) | 72–178 |
| Isolated six-significant-digit formatter | [infusion-formatter.js](../../tests/prototypes/infusion-formatter.js) | 1–26 |
| Exact-rational error oracle, comparisons, boundary tests and limitations | [infusion-precision-prototype-test.js](../../tests/infusion-precision-prototype-test.js) | 9–155 |
| Phase 1 invalidation and 1000-fold unit change | [result-safety-test.js](../../tests/result-safety-test.js) | 157–223 |
| Real browser interaction harness | [infusions-browser-test.html](../../tests/infusions-browser-test.html) | Entire file |
| Prototype specification | [Prototype README](../../tests/prototypes/README.md) | Entire file |

The prototype exists only under `tests/`; production does not import it.
Production formatting remains unchanged. Phase 1, Phase 2A and Phase 2B.1
calculations, validation and result-safety behavior remain the baseline.

## 2. Verified engineering findings

### 2.1 Mathematical display-rounding defects — unresolved in production

Production displays concentration to three decimal places and rate to two.
It switches to six-significant-digit scientific notation only when fixed-decimal
formatting would display zero. Small positive outputs above that switch can have
large relative errors. Existing snapshots document this behavior; they do not
establish acceptable medication-safety performance.

Signed relative display error is `(displayed − mathematical reference) / reference`.

| Prescription/preparation | Exact reference | Current display | Signed error | Prototype numeric string |
| --- | --- | --- | --- | --- |
| 0.005 mcg/min; 60 mg in 1000 mL | 0.005 mL/hr | 0.01 mL/hr | +100% | `0.005` |
| 0.006 mcg/min; 60 mg in 1000 mL | 0.006 mL/hr | 0.01 mL/hr | +66.6667% | `0.006` |
| 0.0149 mcg/min; 60 mg in 1000 mL | 0.0149 mL/hr | 0.01 mL/hr | −32.8859% | `0.0149` |
| 0.1 mcg/min; 4 mg in 50 mL | 0.075 mL/hr | 0.07 mL/hr | −6.6667% | `0.075` |
| 0.5 mg in 1000 mL; dose 0.001 mcg/min | 0.0005 mg/mL | 0.001 mg/mL | +100% | `0.0005` |

These are reproducible software findings, not recommendations to administer the
example prescriptions. The prototype returns numeric strings without units.
The final row's unrounded mathematical rate is 0.12 mL/hr: the displayed
concentration is not reused by the production calculation.

Fixed-decimal rounding has approximate absolute-error bounds of 0.005 mL/hr and
0.0005 mg/mL. Its relative error therefore grows as the value becomes smaller.
Immediately below 0.005 mL/hr the scientific fallback displays about `5e-3`;
at 0.005 it displays `0.01`. The concentration switch behaves similarly at 0.0005.

Binary representation affects decimal-looking ties. Current rate formatting
produces `0.015 → 0.01`, `0.025 → 0.03`, and `1.005 → 1.00`.
These behaviors must not be corrected with arbitrary epsilon additions.

### 2.2 Mathematical and result-safety verification

Independent precomputed rational references test all four dose units. With dose
0.1, weight 70 kg, and preparation 4 mg in 50 mL, the mathematical rates are:

| Unit | Mathematical rate, mL/hr |
| --- | --- |
| mcg/kg/min | 5.25 |
| mcg/min | 0.075 |
| mg/kg/min | 5250 |
| mg/min | 75 |

Equivalent prescriptions, another concentration/weight, and repeating rational
rates are also tested. Mathematical assertions are separate from display
snapshots. All 12 ordered unit transitions, invalid-input recovery, overflow,
input invalidation, reset and reopening have regression coverage. Unsupported
dose units explicitly clear results and preserve existing numeric failure behavior.

For the creation of this document, the Phase 2B.1 verification suite and Phase
2B.2 prototype suite were rerun successfully. The prototype performed 9,628
finite-value formatting checks. None exceeded the candidate formatting target.
Worst sampled relative error was approximately `4.999975000124e-6`, or
`0.0004999975000124%`, for `1.000005e-247 → 1e-247`.

The prototype oracle independently decodes binary values and parses decimal
strings into exact BigInt rational values. Acceptance of the error bound uses
exact fraction comparison, not rounded percentages or floating-point subtraction.
Finite sampling is not exhaustive verification of every binary value. Passing
software tests does not establish clinical validity or approve administration.

## 3. Proposed clinical presentation policy — PENDING

The following candidate is implemented only in the isolated prototype. Selecting
it for clinical presentation requires approval; the verified findings above do
not constitute that approval.

1. Use at most six significant decimal digits for both mathematical concentration
   and mathematical rate. Retain full intermediate arithmetic.
2. Round the stored binary Number to nearest; an exact positive halfway case
   rounds upward. Do not round inputs or intermediate calculations.
3. Preserve a leading zero before ordinary fractional decimals. Remove unnecessary
   trailing fractional zeros; retain zeros required for integer place value.
4. Choose notation after rounding. Rounded magnitudes in `[1e-6, 1e6)` use ordinary
   decimals; all others use scientific notation.
5. Scientific notation uses one leading mantissa digit, lowercase `e`, an explicit
   `+` for positive exponents, and no padded exponent digits: `1e+6`, `1e-7`.
6. Never display a supported positive finite value as zero. The prototype rejects
   zero, negative, non-finite and non-number inputs with RangeError. That module
   behavior is not an approved production failure-handling policy.
7. Treat output as display text only; never reuse it for calculations.
8. Candidate absolute relative formatting error is at most `5e-6` (0.0005%)
   against the stored raw Number. This is not a delivered-dose error allowance.

Examples of deterministic boundaries:

| Raw value | Prototype output | Reason |
| --- | --- | --- |
| 1.234375 | `1.23438` | Exact binary tie, upward rounding |
| 1.234565 | `1.23456` | Stored binary value below decimal midpoint |
| 1e-6 | `0.000001` | Lower ordinary-decimal boundary included |
| 9.999996e-7 | `0.000001` | Rounding carries into ordinary notation |
| 999999.4 | `999999` | Rounded magnitude below upper boundary |
| 999999.6 | `1e+6` | Rounding carries into scientific notation |
| 1e6 | `1e+6` | Upper ordinary-decimal boundary excluded |

Using six digits does not infer six-digit accuracy from entered weight, dose or
preparation. Numeric fields do not reliably capture measurement uncertainty.

## 4. Mathematical rate versus pump-programmable rate — PENDING

The calculator performs mathematical conversion. It has no approved pump model,
rate increment, minimum/maximum operating rate, drug library, or delivery-accuracy
profile. A mathematical result is not evidence that a pump can deliver it.

Proposed presentation should explicitly distinguish a calculated mathematical
rate from a pump setting; exact wording remains PENDING. Formatting must not
silently quantize results to an assumed pump increment.

For illustration only, quantizing 0.075 mL/hr to a hypothetical 0.01 mL/hr
increment might produce 0.08 mL/hr, a +6.6667% mathematical dose deviation at an
unchanged concentration. This is not a statement about any device capability
or an acceptable deviation. The six-digit formatting error budget does not
authorize this quantization.

Any later pump-setting feature requires separate pharmacy, clinical and device
review of device specifications, rounding direction, operating range, delivered
dose/deviation presentation and refusal criteria. No such feature is approved here.

## 5. Scientific notation and small-value presentation — PENDING

Scientific notation preserves small positive mathematical values without strings
containing hundreds of zeros. It introduces risks of exponent misreading,
dropping an exponent during copying, or mistaking a mathematical output for a
device setting. Ordinary tiny decimals introduce decimal-point and zero-counting
risks. The proposed boundary is a presentation choice, not a clinical limit.

Leading zeros, trailing-zero removal, units, exponent style, accessible reading
and copy behavior require pharmacy/clinical review. Final production integration
must retain unmistakable units and verify small-value presentation on desktop,
mobile, and with the application's supported display modes. Integer place-value
zeros such as those in `100000` remain ambiguous about measured significance;
they are not evidence of six-digit measurement accuracy.

## 6. Extreme values and numerical limitations

### Verified engineering behavior

- Current inputs permit some enormous finite outputs, including regression
  examples of 5250 and 600000 mL/hr. Finiteness does not establish plausibility,
  suitability, preparation feasibility or deliverability.
- Production rejects non-finite/non-positive intermediate or final results and
  clears both outputs. Intermediate overflow can cause rejection even when an
  algebraically rearranged expression could have a finite mathematical result.
- Production uses unrounded concentration in rate arithmetic. The isolated
  formatter does not repair or change arithmetic.
- The prototype formats Number.MIN_VALUE as `4.94066e-324` and Number.MAX_VALUE
  as `1.79769e+308`. Supporting these representations is not clinical approval
  of those values. Non-finite overflow inputs are rejected by the prototype.
- Accepted minimum weighted microgram inputs with maximal finite concentration
  produce subnormal arithmetic. The tested rate displays `3.33761e-317`; its
  total relative error against an independent mathematical reference is about
  `2.36025364411e-7` (0.0000236025%).
- A separate arithmetic counterexample has exact value `3 × 2^-1075`, which
  quantizes to `2 × Number.MIN_VALUE`. Prototype formatting then has about
  33.3333% total error against the intended value despite meeting its formatting
  bound against the raw Number. Exact `2^-1075` quantizes to zero and is rejected.
  These counterexamples are outside current accepted infusion minima.

### Proposed policy decisions — PENDING

Approve a supported numerical domain and treatment of extreme finite/subnormal
results separately from clinical plausibility and device operability. Decide
whether to retain, flag or withhold such results and how to describe arithmetic
limitations. Do not invent universal drug-dose, concentration or pump-rate limits.
Any change to arithmetic, input bounds, warnings or failure wording requires a
separately specified change and review; none is authorized by this document.

## 7. Medication-safety risk assessment

These are potential consequences requiring expert assessment, not verified
patient harms or approved clinical policies.

| Risk | Engineering evidence / potential consequence | Required reviewer |
| --- | --- | --- |
| Small rate rounded materially upward/downward | Verified errors up to +100%; transferring display to a device could alter delivered dose | Pharmacy and clinical |
| Rounded concentration reused elsewhere | Display can differ by +100%; external dose/rate arithmetic could be wrong | Pharmacy and clinical |
| Apparent precision | Six digits can imply unsupported prescription/preparation/delivery accuracy | Pharmacy and clinical |
| Exponent or decimal misreading | Proposed scientific notation and tiny decimals could be misread or copied incorrectly | Pharmacy, clinical and usability/accessibility review |
| Mathematical result mistaken for pump setting | No approved device profile or quantization policy exists | Pharmacy, clinical and infusion-device/biomedical engineering |
| Extreme finite values | Numeric success can conceal entry/unit errors or impossible administration conditions | Pharmacy and clinical; device review for feasibility |
| Arithmetic precision/overflow limits | Formatting cannot restore lost precision or recover rejected intermediates | Engineering; pharmacy/clinical approval of handling and presentation |

## 8. Acceptance criteria for future production integration

All items below are proposed requirements, not approval granted by this document.

- [ ] Obtain recorded approval for every applicable decision in section 9. Record
  reviewer, role, date, chosen behavior, scope and evidence. Any inapplicable item
  needs an explicitly approved rationale; it must not silently become approved.
- [ ] Limit integration to the reviewed scope. Retain all four dose formulas,
  unrounded intermediates, supported units and approved validation/clinical text
  unless a separate approved change explicitly authorizes otherwise.
- [ ] Maintain independent mathematical references for every dose conversion,
  equivalent prescriptions and repeating rational values. Verify mathematical
  results separately from final formatted strings.
- [ ] For the five known defects, production outputs must match the approved
  numeric strings and units, with independent reference comparison. Explicitly
  replace legacy defect snapshots in a reviewed change; do not delete the
  historical evidence, weaken assertions or relabel defects as acceptable.
- [ ] Apply the approved exact-rational relative formatting bound to supported
  positive inputs. Report arithmetic error separately; do not confuse formatting
  success with overall mathematical or delivered-dose accuracy.
- [ ] Verify exact ties, decimal-looking ties, adjacent representable values,
  powers of ten, carry boundaries, minimum normal/subnormal values, maximum
  finite values and invalid/non-finite inputs against approved behavior.
- [ ] Ensure no supported positive result displays zero, NaN or Infinity. Approved
  rejection must clear both results, preserve inputs and permit correction/recovery.
- [ ] Preserve immediate invalidation for every input and all 12 ordered unit
  transitions, including the 1000-fold unit-change case; verify reset and reopening.
- [ ] Prove formatted strings are not fed back into concentration/rate arithmetic.
- [ ] Verify readable, unit-preserving display and copying at desktop/mobile sizes,
  supported display modes and applicable accessibility interfaces. Confirm no
  interface implies an approved pump setting without an approved device feature.
- [ ] Run all existing and new suites, structural checks and browser interactions,
  retaining Phase 1, Phase 2A and Phase 2B.1 coverage. CI discovers Node test files
  through `tests/*-test.js`; the browser harness requires a separate invocation.
- [ ] Document residual risks, numerical support boundaries and the final policy
  version. Obtain release review; passing automated tests is not clinical validation.

## 9. Approval checklist — every decision PENDING

No named reviewer or approval date has been assigned. This checklist is a record
of outstanding decisions; it is not a request to assume approval from prior work.

| ID | Decision requiring explicit review | Required roles | Status | Approver / date / decision record |
| --- | --- | --- | --- | --- |
| D01 | Six-significant-digit clinical presentation | Pharmacy, clinical | PENDING | — |
| D02 | Formatting error target <= 5e-6 and its distinct scope | Pharmacy, clinical, engineering | PENDING | — |
| D03 | Stored-binary rounding semantics and exact positive ties upward versus decimal-input semantics | Pharmacy, clinical, engineering | PENDING | — |
| D04 | Ordinary/scientific boundaries selected after rounding | Pharmacy, clinical | PENDING | — |
| D05 | Exponent style, leading/trailing-zero policy, units and accessible/copy presentation | Pharmacy, clinical, usability/accessibility | PENDING | — |
| D06 | Wording distinguishing mathematical rate from pump-programmable rate | Pharmacy, clinical, device/biomedical engineering | PENDING | — |
| D07 | Supported numerical domain; extreme finite and subnormal handling | Pharmacy, clinical, engineering | PENDING | — |
| D08 | Total arithmetic error and overflow/underflow failure presentation | Pharmacy, clinical, engineering | PENDING | — |
| D09 | Explicit scope excluding pump quantization and operational recommendations from formatter-only integration | Pharmacy, clinical, device/biomedical engineering | PENDING | — |
| D10 | OUT OF SCOPE for current formatter integration: future pump-device profile and quantization functionality, including increment, operating range, rounding direction and permitted delivered-dose deviation. Approval is required only if pump-setting functionality is introduced later. | Pharmacy, clinical, device/biomedical engineering | PENDING | — |
| D11 | Final integration acceptance evidence and residual-risk assessment | Engineering, pharmacy, clinical; device review where applicable | PENDING | — |
| D12 | Authorization for production integration and subsequent release | Responsible clinical/pharmacy and release reviewers | PENDING | — |

Decision outcome at this baseline: **PENDING — prototype remains isolated;
production display-rounding defects remain unresolved.**
