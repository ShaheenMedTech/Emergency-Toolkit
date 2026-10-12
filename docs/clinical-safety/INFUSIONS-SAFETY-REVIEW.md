# Infusions safety review — Clinical Risk Assessment Phase 2A

Document ID: INF-SR-001. Version: 1.0 DRAFT. Review date: 2026-10-12.
Evidence baseline: `54b927b2ee0cd5c1f75dec4e7d9b6e38cad70b31`, branch `docs/v1.3-clinical-governance`; working tree clean before review.

**Clinical/pharmacy decisions: PENDING. Clinical implementation: NOT AUTHORIZED. Clinical release: NO-GO.** This documentation review approves no dose, precision rule, input bound, warning, device setting or clinical deployment. Synthetic values below are software probes, not prescriptions. No patient data or actual harm reports are used.

## 1. Scope and evidence sources

The review examines the existing mathematical Infusions calculator, its presentation and result lifecycle. It does not assess the separate Emergency Drugs reference page or validate any drug regimen. Repository instructions and the supplied Ryoku vault were read; no repository AGENTS.md/CLAUDE.md was found. Main and the mobile/clinical-safety branches remain unchanged.

| Evidence ID | Source and location at this baseline | What it establishes / limitation |
| --- | --- | --- |
| IM | [Production implementation](../../js/calculators/infusions.js): inputs lines 65–175; lifecycle 232–343; calculations/validation 374–505; formatter 508–512; clearing/reset 516–540 | Actual code behavior; not clinical appropriateness |
| IV | [Independent verification suite](../../tests/infusions-verification-test.js), raw references and display defects lines 75–134; transitions/failures 136–203 | Independent precomputed rational values for four units; known-defect snapshots; mock DOM, not complete real-browser validation |
| IT | [Infusions regression](../../tests/infusions-test.js), numeric failures, small outputs and formatting boundaries | Existing expectations intentionally retain defects; PASS is not acceptable precision |
| RS | [Result-safety regression](../../tests/result-safety-test.js) | Event-based clearing, reset and 1000-fold unit transition evidence |
| IP | [Existing precision decision](INFUSION-PRECISION-DECISION.md), [prototype test](../../tests/infusion-precision-prototype-test.js) and [prototype formatter](../../tests/prototypes/infusion-formatter.js) | Isolated candidate, all infusion D01–D12 decisions PENDING. No production import or new policy selection |
| UX | [Mobile audit](../ux/MOBILE-ACCESSIBILITY-AUDIT.md), [browser harness](../../tests/infusions-browser-test.html) | Prior user-reported browser evidence, including Infusions at five widths; no new browser run in this review |
| GOV | [Risk register](../clinical-governance/RISK-REGISTER.md), [V&V plan](../clinical-governance/VERIFICATION-VALIDATION-PLAN.md) | OPEN hazards and proposed gates; not professional sign-off |

Published medication-safety context, accessed 2026-10-12:

- **MS1:** [FDA, Infusion Pump Risk Reduction Strategies for Clinicians](https://www.fda.gov/medical-devices/infusion-pumps/infusion-pump-risk-reduction-strategies-clinicians), sections “Check” and introduction; publication date not established from the accessed page. Supports checking dose/rate/volume and independent checks for high-risk infusions under facility policy. Describes pump-related over/under-infusion and delay risks. This is external pump-use guidance, not validation of this calculator, a Saudi legal requirement or evidence of a particular pump's capabilities.
- **MS2:** [ISMP List of Error-Prone Abbreviations, Symbols, and Dose Designations](https://www.ismp.org/system/files/resources/2024-04/ISMP_ErrorProneAbbreviation_List.pdf), ©2024, pages 2, 6–7. Addresses microgram symbols, leading zeros, trailing zeros for whole-number doses and separation of numbers from units. It supports review of medication communication; it does not select rate/concentration precision or scientific-notation cutoffs. Application of dose-writing guidance to this calculator's outputs needs pharmacy review; do not silently impose a local policy.

Neither source provides a universal drug-independent precision tolerance, concentration/rate range or authorization. Local formulary, preparation standards, measurement accuracy, intended populations and any device instructions remain required evidence.

## 2. Current implementation behavior

### Units and dimensional arithmetic

Inputs are weight **kg**, drug amount **mg**, final prepared volume **mL**, and a dose whose selected unit is one of four exact keys. Let A be drug amount, V final volume, W weight and D entered dose. Concentration C = A/V in mg/mL; rate R = (required mg/min / C) × 60 in mL/hr.

| Selected unit / key | Required mg/min | Conversions / dependencies |
| --- | --- | --- |
| mcg/kg/min / `mcgkgmin` | (D × W)/1000 | Weight required; 1000 mcg = 1 mg |
| mcg/min / `mcgmin` | D/1000 | Weight ignored in arithmetic and validation |
| mg/kg/min / `mgkgmin` | D × W | Weight required |
| mg/min / `mgmin` | D | Weight ignored in arithmetic and validation |

No mg/hr, mcg/hr, units/hr, mmol-based, percentage-strength, drops/min, reverse dose-from-rate or drug-specific conversion is supported. Unknown keys are rejected; they are not converted or guessed. The same numeric dose changes meaning when its unit is changed: the label changes and results clear, but the entered number is retained, not transformed into an equivalent prescription.

Intermediate values use JavaScript Number arithmetic without intentional decimal rounding. The displayed concentration is **not** reused to calculate the rate. No drug identity, route, formulation, age, device model or drug library is collected; mathematical success cannot establish prescription validity or administration feasibility.

### Parsing, validation and failure states

- Values are parsed with `Number()`. Empty strings become zero; nonnumeric strings become NaN. Required fields must be finite. Dose, amount and volume each require **at least 0.000001**, inclusive, with no finite upper cap. Weighted units additionally require weight **0.1–500 kg**, inclusive. These are software bounds, not clinically approved ranges.
- HTML controls have different hints: weight min/step 0.1; dose and amount min 0/step 0.01; volume min/step 0.1. Calculate calls the JavaScript handler directly; it does not call native `checkValidity()` or submit a form. Browser number sanitization and locale behavior require separate real-browser evidence. HTML steps are not an enforced clinical decimal policy.
- Only the first invalid field is reported, ordered dose → amount → volume → weight when applicable. A positive dose below 0.000001 is rejected with “Dose must be greater than zero.” This confirmed message/domain mismatch is not a newly approved wording change.
- The four-key allowlist is checked after field validation. Concentration, required mg/min, mL/min and mL/hr must each be finite and positive. Overflow, NaN or nonpositive results clear **both** displays to `—` and issue the existing numeric-range alert; entered values are retained.
- Finiteness is not plausibility. Very large finite results are accepted. Multiplication can overflow before division even where a rearranged exact expression would be finite. This is a numerical limitation, not authority to rearrange production arithmetic.

### Formatting and lifecycle

Concentration uses `toFixed(3)` and rate `toFixed(2)`, retaining trailing zeros. If a positive result's fixed display equals zero, `toExponential(5)` supplies up to six significant digits, with trailing mantissa zeros stripped. The fallback prevents fixed-zero output in the reproduced small-value cases but does not repair large relative errors just above the switch. At magnitudes at least 1e21, JavaScript `toFixed` itself can emit exponential text; see [ECMA-262, Number.prototype.toFixed](https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-number.prototype.tofixed), accessed 2026-10-12 (living specification). This is a separate language behavior, not a device/domain policy.

Binary representation affects decimal-looking ties; the formatter does not define exact decimal-input arithmetic. Display error, arithmetic error, entered measurement uncertainty and pump delivery error are distinct quantities.

Every input/select `input` or `change` event clears both outputs. Changing dose unit updates its label and clears outputs. Reset empties inputs, restores mcg/kg/min and clears outputs; normal close/reopen produces blank results. Direct programmatic `.value` assignment without an event does not trigger invalidation. That integration risk is not evidence of stale results during tested ordinary user edits. Reopening an already present modal removes it directly, whereas normal close removes its document keydown listener; retained-listener/reentrant-focus behavior needs separate investigation and is not a demonstrated medication-result defect here.

## 3. Reproduced synthetic cases

All table cases were executed against the actual production function in a Node VM with synthetic input/output elements. Default weight is **70 kg** (unused for absolute units). Exact references are derived independently from decimal rational arithmetic, not from formatted outputs. Signed display error = (displayed − exact reference)/exact reference. No error percentage is a clinically approved allowance.

| ID | Dose and preparation (final volume) | Exact reference C; R | Actual displayed C; R | Finding |
| --- | --- | --- | --- | --- |
| S01 | 0.005 mcg/min; 60 mg in 1000 mL | 0.06 mg/mL; 0.005 mL/hr | `0.060 mg/mL`; `0.01 mL/hr` | Rate +100%; raw binary R = 0.005000000000000001 |
| S02 | 0.006 mcg/min; 60 mg in 1000 mL | 0.06; 0.006 | `0.060 mg/mL`; `0.01 mL/hr` | Rate +66.6667% |
| S03 | 0.0149 mcg/min; 60 mg in 1000 mL | 0.06; 0.0149 | `0.060 mg/mL`; `0.01 mL/hr` | Rate −32.8859%; raw R = 0.014899999999999998 |
| S04 | 0.1 mcg/min; 4 mg in 50 mL | 0.08; 0.075 | `0.080 mg/mL`; `0.07 mL/hr` | Rate −6.6667% |
| S05 | 0.001 mcg/min; 0.5 mg in 1000 mL | 0.0005; 0.12 | `0.001 mg/mL`; `0.12 mL/hr` | Concentration +100%; rate still uses raw 0.0005 |
| S06 | 0.01 mcg/min; 1000 mg in 1 mL | 1000; 0.0000006 | `1000.000 mg/mL`; `6e-7 mL/hr` | Scientific fallback; no literal zero reproduced |
| S07 | 1 mg/min; 0.01 mg in 100 mL | 0.0001; 600000 | `1e-4 mg/mL`; `600000.00 mL/hr` | Extreme finite value accepted; clinical suitability not established |
| S08 | 1 mcg/min; 1e308 mg in 0.1 mL | Exact C = 1e309; R = 6e-311 | `—`; `—`, numeric-range alert | Concentration overflows in Number; rejection, not Infinity display |
| S09 | 1e308 mcg/kg/min; W = 100 kg; 1e308 mg in 1 mL | Exact C = 1e308; R = 6 | `—`; `—`, numeric-range alert | D × W overflows before /1000; finite exact final rate does not prevent rejection |
| S10 | Dose key `mg/hr`, number 0.1; 4 mg in 50 mL | Unsupported; no valid expected conversion | `—`; `—`, numeric-range alert | Unknown unit rejected; input retained |
| S11 | 0.000000999999 mcg/min; 4 mg in 50 mL | Outside implemented lower bound | `—`; `—`; “Dose must be greater than zero.” | Positive value rejected; alert does not identify actual minimum |

C/R columns after S01 use mg/mL and mL/hr respectively. S01–S05 are confirmed unresolved display defects, already identified in IV/IP; their potential medication consequences are not observed patient harms. S06–S11 characterize controls/limitations and unresolved domain policy, not newly established clinical defect severities.

Formatter-only probes (not prescriptions): `0.004999999999999999 → 5e-3`, `0.005 → 0.01`, `0.005000000000000001 → 0.01` at two decimal places. At three places, existing IT tests verify the analogous `0.0004999999999999999 → 5e-4` and `0.0005 → 0.001` discontinuity. Binary-looking ties at two places: `0.015 → 0.01`, `0.025 → 0.03`, `1.005 → 1.00`.

Reproduce the five confirmed defects and control coverage without editing expectations:

```sh
node tests/infusions-verification-test.js
node tests/infusions-test.js
node tests/result-safety-test.js
node tests/infusion-precision-prototype-test.js
```

These four suites ran successfully on 2026-10-12. IV reports all five defects as UNRESOLVED, independent four-unit/equivalent-prescription results and 12 ordered unit transitions. IP passed 9,628 finite formatter probes against its candidate bound; its explicit upstream subnormal-error counterexample remains a limitation and is outside current accepted infusion minima. That prototype's bound and six-digit policy remain unapproved. S01–S11 were additionally run as read-only ad hoc probes; no test file or expectation was created/changed. No new browser or clinician usability test ran.

## 4. Hazard assessment and proposed controls

All entries remain OPEN; potential harms are qualitative pathways, not incidence estimates or patient events.

| Hazard / governance mapping | Confirmed evidence versus potential pathway | Proposed requirement for review; verification |
| --- | --- | --- |
| INF-H01 / H01 | Confirmed S01–S05 display errors. Transcribing rate to a device, or reusing displayed concentration externally, could cause over/underdose; internal concentration feedback is not present. | Approve reporting precision and error scope separately from device accuracy. Independently compare exact/raw/display values, preserve unit labels and forbid display-string arithmetic. |
| INF-H02 / H02 | Four units, fixed mg/kg/mL conventions and unknown-unit rejection confirmed. Wrong selected supported unit, pounds entered as kg, micrograms entered as mg, or hourly prescription entered as per-minute remain plausible user errors. | Pharmacy defines supported prescription scope, preparation meaning and independent verification workflow. Test equivalent prescriptions and wrong-unit recognition; do not guess unsupported conversions. |
| INF-H03 / H01/H10 | Scientific fallback and trailing zeros confirmed; no literal positive-to-zero display defect reproduced. Exponent omission, decimal-point loss, copying or apparent precision could mislead. MS2 provides communication context. | Pharmacy/human-factors approval of notation, leading/trailing zeros, exponent reading, copying and unit visibility. Evaluate supported screens, themes, zoom and assistive technology. |
| INF-H04 / H03 | S07 accepted, S08/S09 cleared; positive lower-bound message mismatch S11 confirmed. No drug-specific upper bounds or feasibility assessment exists. Numerically finite but wrong inputs could lead to inappropriate action; overflow refusal could delay interpretation. | Independently approve mathematical support domain versus clinical/preparation/device domain, rejection/recovery wording and handling of extreme/subnormal values. Do not adopt universal drug/pump limits. |
| INF-H05 / H04 | Ordinary event edits, unit changes, failure, reset and reopen clear results in existing regressions. No ordinary stale-result defect reproduced. Eventless programmatic updates and reentrant listener lifecycle remain unverified integration paths. | Define dependency/lifecycle requirements; real DOM and reentrant open/close event tests, input preservation and recovery. Distinguish mock coverage from browser evidence. |
| INF-H06 / H01/H11/H12 | No approved device profile, preparation policy or population scope established. Interpreting a mathematical number as approved pump setting or dose is a potential pathway. MS1 supports facility checks, not calculator validation. | Pharmacy/clinical approve use boundaries and residual risk; device reviewer only if device-setting claims are introduced. Local policy and device instructions required; no pump quantization in this phase. |

Existing warnings are controls requiring review, not guarantees. They remain unchanged. No newly chosen warning or validation policy is proposed as already approved.

## 5. Independent reference-test matrix — proposed requirements

Use stable INF-V identifiers linked to INF-H and governance IDs; record exact input strings, units, independent decimal-rational reference, raw Number, displayed text, error measures, baseline/runtime, evidence and reviewer decision. Reviewers must approve tolerances and eligible domains before future implementation; existing 1e-14 raw-test tolerance and prototype 5e-6 formatting bound are engineering choices, not clinical tolerances.

| Requirement | Independent cases and expected evidence | Approval / reviewer |
| --- | --- | --- |
| INF-V01 — all formulas / H02 | D=0.1, W=70, A=4, V=50: C=2/25; R=21/4, 3/40, 5250, 75 for the four units in section 2 order. Equivalent D=0.1, 7, 0.0001, 0.007 must all yield 21/4. Different preparation W=3, A=9, V=1, D=1 yields R=1/50, 1/150, 20, 20/3. Expected values precomputed independently. | PENDING: pharmacy/clinical + independent engineering |
| INF-V02 — reporting defects / H01 | S01–S05 exact/raw/display and signed errors; nonzero error on both sides of rounding switches; concentration must not feed rate arithmetic. Keep historical snapshots until an authorized reviewed replacement. | PENDING: pharmacy/clinical chooses precision/error criteria |
| INF-V03 — numeric boundaries / H01/H03 | Adjacent representable values at fixed-zero switches, decimal-looking/exact binary ties, powers/carries, 1e21 formatting behavior, minimum normal/subnormal and maximum finite values. Separate direct formatter domain from reachable calculator inputs; S08/S09 overflow and recovery. | PENDING: engineering + pharmacy/clinical domain/error handling |
| INF-V04 — inputs / H03 | Each field blank, zero, negative, nonnumeric/nonfinite, below/at/above 1e-6; weighted W below/at/above 0.1 and 500. Absolute units with empty/invalid weight. Native HTML min/step mismatch, pasted/locale input and preservation of rejected values. | PENDING: pharmacy/clinical; browser evidence by engineering |
| INF-V05 — unit transitions / H02/H04 | All 12 ordered transitions, retained number and updated label; explicit 1000-fold mg/mcg consequence; unsupported `mg/hr`, units-based and malformed keys clear both outputs without guessed conversion. | PENDING: pharmacy + engineering |
| INF-V06 — state / H04 | Every input/select event, failed calculation after valid result, reset, normal/reentrant reopen, Escape/overlay closure and duplicate listeners. Eventless integrations separately specified; correction restores calculation. | PENDING: engineering + clinical human-factors review |
| INF-V07 — display comprehension / H10 | S01–S07 with units at 320/360/390/768/1280 widths, themes, zoom, keyboard and screen reader; exponent/decimal transcription and concentration/rate distinction with representative clinicians. Browser PASS and clinical task comprehension reported separately. | PENDING: pharmacist, emergency physician, human-factors/accessibility |
| INF-V08 — operational scope / H11/H12 | Approved populations, drug/preparation workflow, reference independent checks, uncertainty and mathematical-versus-device meaning. Device-profile tests only under separately authorized future scope. | PENDING: pharmacy/clinical/facility; biomedical when applicable |

## 6. Open professional decisions and authorization gates

Infusion decision IDs below refer to the existing infusion precision register, not ABG D10–D12. All remain **PENDING**, reviewer identities/dates/signatures **UNASSIGNED**.

- **Infusion D01–D05:** precision/significant digits, relative/absolute formatting tolerance and distinction from total/delivered-dose error; binary versus decimal semantics and tie rules; ordinary/scientific domains; exponent/unit/leading/trailing-zero/copy conventions. Six significant digits are a candidate, not selected here.
- **Infusion D06–D10:** mathematical-rate versus device-setting wording; numerical and clinically supported domains; extreme/subnormal/arithmetic failure behavior; device-scope exclusion. Any later device profile/quantization requires separate approved instructions, operating limits and delivered-dose assessment. No universal limits are invented.
- **Infusion D11–D12:** independent verification/clinical usability evidence, residual-risk acceptance, explicit implementation authorization and later release authorization. Approve intended users/populations, preparation assumptions and facility independent-check workflow as part of these scope decisions.

Acceptance before any production change: signed pharmacy and emergency/critical-care policy decisions with exact scope, evidence and requirement IDs; independent arithmetic/display expectations and approved tolerances; authorized change package; explicit handling of every known defect and unresolved numerical/lifecycle limitation. Do not weaken tests or silently import the prototype. Any change to formulas, bounds or warnings needs separate approval of that requirement.

Acceptance before release: engineering verification against approved requirements, independent pharmacy/clinical validation and human-factors review, acceptable documented residual risks or approved scope exclusions, facility governance and applicable regulatory gates in [SFDA assessment](../clinical-governance/SFDA-REGULATORY-ASSESSMENT.md), followed by signed release authorization. A software regression PASS closes none of these professional decisions by itself.

## 7. Documentation quality and review outcome

Review evidence is limited to source inspection, synthetic Node execution and published safety context. No pump testing, clinical outcome study, new browser run or professional sign-off occurred. Only this review and directly supported Infusions annotations in the governance risk register change; existing code, warnings, validations, tests and decision records are preserved. Checkpoint checks passed for documentation links, scope, status consistency, independent numerical references and whitespace before the local documentation commit.

**Known display defects: OPEN. Clinical/pharmacy policies: PENDING. Clinical implementation: NOT AUTHORIZED. Clinical release: NO-GO.**
