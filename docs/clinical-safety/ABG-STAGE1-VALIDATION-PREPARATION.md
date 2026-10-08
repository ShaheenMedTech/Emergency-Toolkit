# Stage 1 analyzer-agnostic validation preparation

**DRAFT — CLINICAL AND LABORATORY REVIEW REQUIRED**

**Clinical release: NO-GO. D08 rules and numerical acceptance thresholds remain PENDING. D09 withholding is not activated.**

Prepared 2026-10-08 on `review/v1.3-phase4a-abg-clinical-safety`. The hospital analyzer model is currently unknown. This framework permits mathematical preparation and evidence planning; it cannot validate an unknown device or authorize a production consistency check.

The [clinical decision review](ABG-CLINICAL-DECISION-REVIEW.md) records the approved validation sequence. Stage 1 concerns adult arterial blood gas, actual calculated bicarbonate, the same identified specimen and analyzer-aware assessment. VBG, non-neonatal pediatric ABG/VBG and independent chemistry comparisons require their own later-stage validation. Neonatal interpretation remains excluded from proposed v1.3 scope. Manufacturer-independent preparation means a common evidence process, not an assumption that all manufacturers use identical calculations.

## 1. Mathematical relationship and assumptions

The conventional educational Henderson–Hasselbalch expression is:

```text
pH_expected = pK + log10(HCO3 / (alpha × PCO2))
HCO3_expected = alpha × PCO2 × 10^(pH − pK)
Illustrative reference model: pK = 6.1; alpha = 0.03
```

pH is dimensionless; PCO₂ is in mmHg; HCO₃ is in mmol/L. Alpha carries the corresponding dissolved-CO₂ concentration/pressure units. For this monovalent ion, mmol/L and mEq/L have the same numerical value, but the declared unit must still be recorded. A kPa value must not be read as mmHg. Any future conversion and equation constants need explicit specification and review.

The illustrative constants describe a conventional physiological-temperature model; they are not approved universal analyzer parameters. Both logarithm arguments and PCO₂/HCO₃ must be positive. Temperature basis, actual versus standard bicarbonate, sample identity and method conventions matter. Use compatible pH and PCO₂ reporting conditions; do not mix patient-temperature-corrected values with an incompatible bicarbonate calculation.

Calculated bicarbonate is derived from measured pH/PCO₂. Recalculation can reveal transcription, source or reporting mismatch, but is not an independent physiological measurement. A mathematically matching triple can still have sampling errors, clinical disease or a mixed acid-base disorder. Conversely, disagreement does not identify which input is wrong. Do not overwrite values to force agreement.

Standard bicarbonate and independently measured chemistry total CO₂ are not Stage 1 substitutes for actual gas-derived bicarbonate. Missing or incompatible provenance needs an unavailable assessment rather than an invented assumption. The proposed UNVERIFIABLE behavior remains subject to the pending implementation specification.

## 2. Accessible references and authority

URLs were opened on 2026-10-08. References support evidence planning, not application approval.

| Reference | Relevant evidence and limits |
| --- | --- |
| [Western University: Acid-Base Foundations](https://edassets.westernu.edu/acidbase/index.html), Edward Barnes, MD, FACP; no version date visible | University teaching reference for the conventional buffer equation. Used only for mathematics here; its diagnostic teaching framework and numerical ranges are not adopted. |
| [Abbott CG8+ IFU ART-784173-00A](https://www.globalpointofcare.abbott/content/dam/ardx/globalpointofcare/apoc/support/i-stat-1/cti-ifu/english-us/ifu/ART-784173-00A.pdf), 31 July 2025, US labeling | Primary manufacturer example: measured pH/PCO₂, calculated bicarbonate, temperature conventions and performance data. Its `log10(HCO3) = pH + log10(PCO2) − 7.608` illustrates why device conventions must be checked. Not an endorsement or identification of the hospital analyzer. |
| [Royal Cornwall Hospitals: Bicarbonate](https://pathology.royalcornwallhospitals.nhs.uk/viewTest.php?ID=183), updated 03-05-2024 | Laboratory reference describing serum bicarbonate reporting as total CO₂. Supports provenance separation, not a universal difference allowance. |
| [FDA K200492 decision summary](https://www.accessdata.fda.gov/cdrh_docs/reviews/K200492.pdf), 2020 | Primary regulatory review of an independent chemistry measurement method and performance. Device-specific evidence, not validation of Emergency Toolkit or a Stage 1 tolerance. |

Applicable manufacturer instructions and local laboratory verification must ultimately take priority for the selected method. Resolve conflicting constants/report conventions explicitly rather than enlarging a tolerance until they appear compatible.

## 3. Independent mathematical reference cases

These are synthetic arithmetic fixtures, not patient cases, approved diagnostic expectations or production acceptance criteria. Constants are the illustrative model above. Values are mathematical reference approximations, not physiological precision claims.

| ID | pH | PCO₂ (mmHg) | HCO₃ expected (mmol/L) | Mathematical purpose |
| --- | --- | --- | --- | --- |
| M1 | 7.10 | 40 | 12 exactly in the decimal reference model | Exponent equals 1: closed-form anchor |
| M2 | 7.10 | 80 | 24 exactly | Doubling pressure doubles calculated bicarbonate at fixed pH |
| M3 | 7.10 | 5 | 1.5 exactly | Lower pressure anchor; not a clinical plausibility endorsement |
| M4 | 7.40 | 40 | 23.943147779626555… | Non-integer exponent, conventional nominal gas |
| M5 | 7.20 | 60 | 22.660657412295010… | Acidemic input with fractional exponent |
| M6 | 7.60 | 20 | 18.973665961010276… | Alkalemic input; no diagnosis inferred |
| M7 | 7.35 | 35.5 | 18.938675716914528… | Fractional pressure and reporting boundary context |
| M8 | 7.00 | 100 | 23.829847041728445… | Wider mathematical range, not a new supported limit |
| M9 | 7.80 | 10 | 15.035617008818169… | Wider mathematical range, not a new supported limit |

Independent preparation used Python's standard-library Decimal arithmetic at 45-digit working precision, decimal input strings and a decimal power calculation. It did not call calculator code or derive expectations from displayed production results. A second evaluator should independently recompute and review these cases before they become executable fixtures. Finite precision for irrational powers must be accounted for in a future engineering test specification; no numerical test allowance is approved here.

Additional reference observations:

- E6 from the baseline fixtures (pH 7.40, PCO₂ 80, entered HCO₃ 12) gives predicted pH `6.798970004336019…`, or HCO₃ expected `47.886295559253110…` at the entered pH. This demonstrates algebraic discrepancy under this model, not an approved INCONSISTENT cutoff or permission to activate D09.
- If M4's bicarbonate is printed as 23.9, the residual versus the illustrative calculation is about −0.04314778 mmol/L. This is a reporting example, not an approved discrepancy limit. Printed pH/PCO₂ may themselves be rounded.
- Preserve original strings such as `7.40` in reporting-resolution studies; converting to a Number discards information about printed digits. More digits do not establish greater analytical accuracy.
- Prepare future cases for rounding ties, truncation versus nearest rounding, binary neighbors, unit conversion and both sides of each *subsequently approved* boundary. Undefined boundaries must not be invented to complete a fixture list.

## 4. Rounding and uncertainty evidence plan

Keep three questions separate:

1. **Mathematical verification:** does an implementation evaluate the selected equation correctly, with independently justified numerical error bounds?
2. **Reporting/method compatibility:** can printed values and the device's formula reconcile after its documented precision, constants and temperature conventions are considered?
3. **Clinical validation:** does the approved rule and resulting workflow safely support intended users in the specified clinical population/context?

An exact-decimal reference and a binary implementation can differ without a clinically significant discrepancy. A displayed resolution q suggests a ±q/2 interval only when rounding to nearest is documented; truncation or other conventions require different treatment. This interval is not the analyzer's analytical uncertainty.

For a future selected model, possible residual metrics include absolute bicarbonate difference, predicted-pH difference or a relative/log ratio. Their clinical meaning differs; relative metrics need a defined domain near zero. Selection, thresholds, ties and ambiguous uncertainty handling remain PENDING. Do not borrow unrelated proficiency-testing limits, chemistry-versus-gas differences or ABG–VBG agreement limits as a Stage 1 cutoff.

Calculated HCO₃ shares its measurement inputs with pH/PCO₂. Do not propagate all three as independent measurements; an uncertainty model must account for this dependency. Laboratory reviewers should separate input measurement uncertainty from internal recomputation/report rounding error, and examine method bias and range-dependent behavior. Analyzer software revisions and patient-temperature correction can alter compatibility. The present reference model alone cannot resolve those dependencies.

## 5. Information required from laboratory specialists

| Required information | Why it blocks a final Stage 1 rule |
| --- | --- |
| Manufacturer/model, cartridge/method, software version and current jurisdiction-specific IFU | Establish the calculation convention and applicable performance evidence |
| Actual calculated bicarbonate field name; distinction from standard bicarbonate and total CO₂ | Ensure the correct measurand is entered |
| pH/PCO₂ measurement and reporting temperature; correction algorithms | Prevent mixing incompatible values |
| Units, display resolutions, rounding/truncation rules and availability of unrounded/exported values | Define reporting intervals without guessing precision |
| Reported equation/constants and known method-dependent adjustments | Distinguish method differences from transcription errors |
| Local analytical verification, QC, bias/precision across the relevant ranges and uncertainty model | Support an applicable numerical criterion; manufacturer claims alone do not establish local performance |
| Same-patient/sample identifiers, collection/analysis times and report linkage | Confirm that all three values belong to one Stage 1 specimen |
| Sampling, anticoagulant, handling/storage, air contamination and transport procedures | Identify preanalytical limitations that algebraic agreement cannot exclude |
| Intended adult clinical context, special conditions and applicable analyzer flags | Define supported population/context and safe unavailable-result behavior |
| De-identified paired reports spanning routine, abnormal and discrepancy cases | Build an independently reviewed truth set without exporting patient-identifying data |

No sample identity, collection-time allowance, adult age boundary, analyzer constant or discrepancy tolerance is assigned by this framework.

## 6. Required approvals and blockers

- **Clinical owner:** approve intended context, consequences of false acceptance/withholding, limitations and the distinction between mathematical agreement and clinical validity.
- **Laboratory specialist:** identify the analyzer/source, reconcile equation/reporting conventions, approve uncertainty approach and justify discrepancy metric/thresholds using local evidence.
- **Clinical and laboratory reviewers jointly:** approve independent fixtures, scope/age boundaries, unavailable states, significant inconsistency criteria and dependency handling.
- **Engineering and usability reviewers:** specify numerical computation and error bounds, preservation of entered data, warning accessibility, stale-result invalidation and acceptance-test implementation *after* policy approval.
- **Release owner and applicable regulatory reviewer:** assess intended-use obligations and separately authorize release; engineering verification does not supply this authorization.

The analyzer model may remain unknown during mathematical preparation, but its applicable method/reporting evidence is a blocker to final analyzer-aware Stage 1 validation. An alternative generic rule would require a separate, justified multi-method validation and professional approval; it is not approved by this document.

D09's product-owner direction remains confirmed: a future approved D08 rule detecting significant inconsistency must withhold affected automated interpretations, warn clearly and preserve original entries. Detailed dependencies, UNVERIFIABLE behavior and clinical validation remain pending. **No D08 rule is authorized for production and D09 withholding is not activated.**

All thresholds, tolerances, discrepancy metrics, analyzer-specific parameters, rounding rules and acceptance criteria remain PENDING. Later stages cannot inherit Stage 1 validation. Clinical release remains **NO-GO**.
