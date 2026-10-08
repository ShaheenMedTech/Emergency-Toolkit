# ABG clinical safety decision review

**DRAFT — CLINICAL REVIEW REQUIRED**

**Clinical release status: NO-GO. D09: Product-owner policy direction confirmed; implementation specification and clinical validation pending. D08 validation sequence is product-owner approved; consistency rules remain PENDING — CLINICAL AND LABORATORY APPROVAL REQUIRED. Other decisions D01–D07 and D10–D18 remain PENDING.**

Prepared 2026-10-08 against engineering baseline `a229252`. Intended users, supplied by the product owner: qualified physicians and healthcare professionals only. Intended purpose: medical education and clinical decision support during patient care. These statements establish the requested product intent; they do not establish clinical validation, approved populations, regulatory classification or permission to release.

This draft supplements, without replacing, the [ABG interpretation safety specification](ABG-INTERPRETATION-SAFETY-SPEC.md). Its original baseline line references are historical; the current references below apply to `a229252`. No production code, engineering test, numerical policy or diagnostic threshold is changed. No reviewer, approval date or signature is assumed.

## 1. Evidence categories and references

**IMPLEMENTED** means observed source/test behavior. **ESTABLISHED EVIDENCE** means a cited clinical source supports the stated principle, within that source's scope. **PROPOSAL** means a recommended product policy requiring approval. A source formula or teaching example does not become an approved application rule through citation.

References accessed 2026-10-08:

| ID | Free authoritative source and provenance | Evidence used; limitations |
| --- | --- | --- |
| R1 | [Merck Manual Professional: Acid-Base Disorders](https://www.merckmanuals.com/professional/nephrology/acid-base-regulation-and-disorders/acid-base-disorders), James L. Lewis III; reviewed by Glenn D. Braunstein; reviewed March 2025, modified April 2025 | Professional clinical reference, not a local guideline. Mixed disorders may coexist with reference-range pH. Expected compensation helps identify additional processes. Winter addresses respiratory compensation in metabolic acidosis; respiratory compensation differs with time course. Albumin and delta assessment matter to metabolic interpretation. This draft adopts no new numeric bands from this source. |
| R2 | [Western University: Acid-Base Foundations](https://edassets.westernu.edu/acidbase/index.html), Edward Barnes, MD, FACP; no publication/version date visible | University teaching source for the conventional bicarbonate-buffer relationship. Supports mathematical comparison, not a clinical discrepancy tolerance. |
| R3 | [BTS adult oxygen guideline](https://www.brit-thoracic.org.uk/document-library/guidelines/emergency-oxygen/bts-guideline-for-oxygen-use-in-adults-in-healthcare-and-emergency-settings/), O'Driscoll et al., Thorax 2017;72:i1–i90, DOI 10.1136/thoraxjnl-2016-209729 | Specialty-society guideline. Recommendation T2 requires blood-gas records to identify air or oxygen device/flow. Adult scope; clinical owner must check subsequent guidance and local applicability. Not authority to invent FiO₂ from flow. |
| R4 | [Royal Cornwall Hospitals: Bicarbonate](https://pathology.royalcornwallhospitals.nhs.uk/viewTest.php?ID=183), laboratory test information, updated 03-05-2024 | Serum chemistry bicarbonate is reported through total CO₂ measurement. Supports distinguishing source/sample context; not universal analyzer equivalence or discrepancy criteria. |
| R5 | [North Bristol NHS: Anion Gap](https://www.nbt.nhs.uk/severn-pathology/requesting/test-information/anion-gap), laboratory test directory; no revision date visible | Local serum reference interval 3–11 mmol/L. The page does not specify the equation; do not infer its potassium convention. |
| R6 | [University Hospitals Sussex: Anion gap](https://pathology.uhsussex.nhs.uk/pug/biochemistry-immunology/biochemistry-tests/126-anion-gap), updated 24 December 2025 | Specifies a potassium-inclusive equation and local interval 10–20 mmol/L. Demonstrates why another laboratory's interval cannot automatically be applied to this application's potassium-excluding gap. |

**ESTABLISHED EVIDENCE:** a blood-gas-derived bicarbonate and independently measured chemistry total CO₂ are not interchangeable provenance labels (R1, R4). Collection timing, sample identity and analyzer/reporting conventions must be known before interpreting an apparent mismatch. Differing published gap conventions require local laboratory agreement (R5, R6).

**PROPOSAL:** a clinical owner should select an applicable reference set and laboratory partner, record versions and reconcile conflicting conventions. R1–R6 are review inputs, not a claim that every recommendation is a guideline mandate. The older references in the baseline specification remain historical context; this draft does not silently supersede them.

## 2. Current implementation at a229252

| Behavior | Current source evidence |
| --- | --- |
| Six mandatory inputs; finite Numbers; inclusive bounds: pH 6.5–8.0, PaCO₂ 5–150 mmHg, HCO₃ 1–60 mmol/L, PaO₂ 1–500 mmHg, Na 80–220 and Cl 40–180 mmol/L | [acid-base.js](../../js/calculators/acid-base.js), lines 331–388 |
| No sample metadata, bicarbonate-source distinction, linked consistency check or cross-field plausibility assessment | Same input markup, lines 40–125; independent range validation, lines 358–372 |
| Potassium-excluding, uncorrected gap; one-decimal binary formatting | Same file, lines 396–402 |
| Primary label driven by pH/PaCO₂/HCO₃; gap does not affect label | Same file, lines 411–445 |
| Winter only when pH <7.35 and HCO₃ <22; raw inclusive comparisons; exact round-trip endpoints | Same file, lines 462–503 |
| No metabolic alkalosis or acute/chronic respiratory compensation method | Default message, lines 452–453, and sole compensation branch above |
| PaO₂ echo with contextual limitation; no oxygenation classification or FiO₂-derived calculation | Same file, lines 506–508 |
| Immediate clearing for all six inputs and both events; explicit recalculation; reset and modal cleanup | Same file, lines 199–319; existing lifecycle/result-safety tests |

The software bounds are not normal intervals, treatment targets or clinically approved plausibility limits. HTML steps do not restrict Calculate to integers or their nominal precision. Normal-range pH is already accompanied by a request to assess compensated/mixed disorders; it is not explicitly labeled a normal blood gas. However, that caveat does not provide a systematic assessment.

## 3. Reproducible behavior and foreseeable harms

Enter values in order **pH / PaCO₂ / HCO₃ / PaO₂ / Na / Cl** and click Analyze ABG. Units are those above. E1–E9 are preserved baseline fixtures, not approved patient diagnoses. Existing independent fixture and numerical suites were run on this baseline and passed. Their assertions document behavior, not clinical truth.

| Example | Inputs | IMPLEMENTED output | Foreseeable risk and review priority |
| --- | --- | --- | --- |
| E6 | 7.40 / 80 / 12 / 80 / 140 / 105 | Gap 23.0; “pH within reference range — assess for compensated or mixed disorder”; no compensation formula | **P0:** grossly incompatible values accepted as a complete result. Transcription, unit or mismatched-sample errors could underpin misleading reasoning and inappropriate patient-care decisions. |
| E1 | 7.40 / 20 / 12 / 80 / 140 / 100 | Gap 28.0; reference-range pH message; no compensation formula | **P0:** opposing processes may be missed if a user interprets the pH state as reassurance. The tool does not enumerate a mixed disorder. |
| E2 | 7.52 / 15 / 12 / 80 / 140 / 100 | Gap 28.0; “Respiratory alkalosis”; no compensation formula | **P0:** a single process label can draw attention away from a possible concurrent metabolic process. A final diagnosis requires laboratory/context review. |
| E5 | 7.33 / 42 / 21.8 / 80 / 140 / 100 | Gap 18.2; generic mixed/partial acidaemia label; appropriate Winter interval 38.7–42.7 | **P1:** users may mistake “appropriate” for exclusion of all mixed disorders or treat the primary label as a confirmed second disorder. |
| E3 | 7.46 / 70 / 48 / 80 / 140 / 90 | Gap 2.0; “Metabolic alkalosis”; no compensation formula | **P1:** another respiratory process is not assessed; ventilation-related interpretation may be incomplete. |
| E4 | 7.28 / 60 / 27 / 80 / 140 / 105 | Gap 8.0; “Respiratory acidosis”; no compensation formula | **P1:** acute/chronic/mixed time course is unavailable; a user might infer that compensation was checked when it was not. |
| E7 | 7.29 / 32.63 / 15.1 / 80 / 140 / 110 | Appropriate Winter interval 28.65–32.65 | Display consistency is fixed; an in-range respiratory response still does not assess a second metabolic process. |
| E8 | 7.33 / 42.85 / 21.9 / 80 / 140 / 105 | Additional respiratory acidosis; interval 38.849999999999994–42.849999999999994 | **P1:** long machine-precision tails may imply physiological precision. Layout overflow is fixed, but the clinical readability/numerical policy remains unresolved. |
| E9 | 7.30 / 30 / 15 / blank / 140 / 110 | “Please enter a valid PaO₂.”; every output cleared | **P1:** missing oxygen data blocks acid-base support and may encourage an invented placeholder. Entering PaO₂ 501 also blocks all results. |

**Independent mathematical observation for E6:** using R2's conventional expression, `6.1 + log10(12 / (0.03 × 80)) = 6.79897…`; given pH 7.40, the same expression implies HCO₃ about 47.9 mmol/L. This is a reproducible algebraic incompatibility under those assumptions. It is not an approved rejection cutoff, analyzer error diagnosis or instruction to replace the entered bicarbonate. Some other fixtures also differ from the equation because of rounding or source assumptions; do not accept them as tolerance-setting evidence.

**Additional numerical observation:** Na 140, Cl 105, HCO₃ 21.15 gives exact decimal gap 13.85, binary result 13.849999999999994 and displayed 13.8. Tiny nonzero gaps can display 0.0 or -0.0. These are documented in [numerical evidence](ANION-GAP-NUMERICAL-TESTS.md); no new rounding policy is adopted here.

Potential consequences are foreseeable hazards, not documented patient incidents. Qualified users reduce neither the need for truthful scope nor the risk of automation bias. No example supplies a treatment recommendation, etiologic diagnosis or drug/ventilator setting.

## 4. Clinical decision matrix — D09 policy direction confirmed; other recommendations are proposals

Priority P0 means resolve before bedside interpretation design is approved; P1 means resolve before clinical release; P2 concerns completion of governance evidence. Priorities do not authorize implementation. Options may be combined after review.

| Decision | Options and trade-offs | Recommended approach requiring approval | Status |
| --- | --- | --- | --- |
| D01 — population, samples, purpose | Proposed product scope is ABG and VBG for adults and non-neonatal children, with bicarbonate provenance explicitly identified. Scope breadth requires staged independent validation; it is not current validated coverage. | Honor the supplied professional education/patient-care CDS intent. Follow the D08 staged validation sequence while retaining D01 clinical scope approval as PENDING. Neonatal interpretation is excluded from proposed v1.3 scope; age boundaries, pregnancy, capillary samples and special contexts require separate review. P0. | PENDING |
| D02 — mixed-disorder scope | Retain a clearly limited calculator with explicit unassessed domains, or build systematic multi-process assessment. Expansion improves coverage but needs more context and validation; labels alone do not supply completeness. | For intended patient-care CDS, propose staged systematic assessment with uncertainty states and explicit unassessed components. A restricted alternative needs explicit acceptance of residual risks, not a blanket disclaimer. P0; R1. | PENDING |
| D03 — primary labels/ranges | Keep current primary-label snapshots with limitations; revise into separate pH state, possible processes and assessed compensation. Revising wording/rules changes interpretation. | Approve a complete truth table including E1/E2/E5, reference-range pH, boundary ties and unassessed/indeterminate states; do not force a single diagnosis or change current bands before approval. P0. | PENDING |
| D04 — Winter applicability | Keep current gate with visible limits; broaden only after identifying metabolic acidosis from validated context. Applying Winter to every low HCO₃ risks misreading respiratory compensation. | Review applicability in normal/alkalemic mixed cases after D02/D03/D08/D09; exclude “low bicarbonate alone” as sufficient evidence. Record prerequisites, exceptions and boundary handling. P0; R1. | PENDING |
| D05 — metabolic alkalosis compensation | Explicitly mark not assessed, or implement a selected reference method. A method adds coverage but estimates depend on clinical context. | Select the method and limitations through clinical review; until then, explicitly identify absent coverage in any proposed bedside presentation. No new coefficient/tolerance is selected. P1; R1. | PENDING |
| D06 — respiratory acidosis compensation | Ask for time-course context; show separately labeled candidate acute/chronic estimates; or mark not assessed. History prompts add burden; choosing one silently can mislead. | Do not infer acute/chronic status from the gas alone. Specify unknown and acute-on-chronic handling and approved reference methods before implementation. P1; R1. | PENDING |
| D07 — respiratory alkalosis compensation | Same alternatives as D06, with its own physiology and reference methods. Reusing respiratory-acidosis rules is unsuitable. | Approve independent acute/chronic/unknown behavior with reviewed fixtures; no arbitrary timing cutoff. P1; R1. | PENDING |
| D08 — bicarbonate/sample provenance | Product-owner approved validation sequence: adult arterial calculated bicarbonate; VBG; non-neonatal pediatric ABG/VBG; independent chemistry comparison. Each later stage requires independent validation. | Follow section 4.2 staged plan. Identify actual versus standard gas bicarbonate, chemistry source, sample identity/timing, units and temperature conventions. All rule parameters and acceptance criteria remain PENDING; no production consistency rule is authorized. P0. | Validation sequence approved by product owner; consistency rules PENDING — CLINICAL AND LABORATORY APPROVAL REQUIRED |
| D09 — consistency discrepancy/workflow | Product owner selected withholding all affected automated interpretations with a clear safety warning and preserved original inputs. Dependency definitions and handling of unverifiable data still require specification; withholding may interrupt assessment but prevents presenting affected conclusions as usable. | When significant inconsistency is detected by a future approved D08 rule, withhold all affected automated interpretations, display a clear safety warning, and preserve original entered values. See section 4.1 for proposed states, dependencies and acceptance criteria. No numerical criterion or clinical validation is approved. P0. | Product-owner policy direction confirmed; implementation specification and clinical validation pending. |
| D10 — gap reference/units/extremes | Arithmetic-only uncorrected result with units and limitations; or local reference interpretation. Interpretation requires equation-matched laboratory ranges. Rejecting all negative gaps may discard real findings. | Specify potassium-excluding convention, source and units; use a locally agreed interval only if interpretation is added. Review negative/extreme values without automatic invalidation or etiologic labels. P1; R5/R6. | PENDING |
| D11 — albumin correction | Stay explicitly uncorrected, or display both uncorrected and corrected results when albumin is supplied. Mandatory albumin can block access; assuming normal conceals uncertainty. | Propose optional, clearly separated correction after formula/reference/units are approved; never assume a missing albumin is normal. Make absent correction explicit. P1; R1. | PENDING |
| D12 — delta assessment | Omit with explicit limitation; add an approved delta-gap/delta-ratio method after prerequisites. Methods and intervals differ and can create denominator hazards. | Approve prerequisites, method, baseline conventions, missing data and zero/near-zero handling before adding it. Delta analysis must not become a standalone etiology claim. P1; R1. | PENDING |
| D13 — mandatory PaO₂ | Keep an explicitly arterial-only complete workflow; allow acid-base analysis without oxygenation. Separation improves availability but requires dependency-aware invalidation. | Prefer making PaO₂ optional for acid-base support, with oxygenation unavailable when absent; decide supplied-but-invalid behavior explicitly. No fabricated default; no change authorized now. P1; E9. | PENDING |
| D14 — oxygen/sample context | Keep contextual echo only; capture metadata; or implement a separately reviewed oxygenation module. Metadata adds effort; formulas require validated context. | Propose recording sample type and air/device/flow/known FiO₂, preserving the current limitation. Never infer room air or exact FiO₂ from an unspecified device. Any P/F or A–a assessment needs a separate approved specification. P1; R3. | PENDING |
| D15 — Winter wording/readability | Retain exact raw endpoints with explanatory wording, or adopt bounded/precision-aware presentation that remains consistent. Shortening endpoints alone can contradict classification. | Review bedside reading/copy/accessibility with E7/E8, make machine precision versus physiological uncertainty understandable, and retain classification consistency. Mobile engineering success is not wording approval. P1. | PENDING |
| D16 — numerical policy | Preserve binary behavior/snapshots; adopt specified decimal arithmetic/rounding; or introduce an explicitly approved boundary policy. Different policies can change a diagnosis at a tie. | Keep existing semantics until a written policy covers input precision, ties, signed zero, numerical domains and classification/display interaction. Engineering test allowances are not clinical tolerances. P1. | PENDING |
| D17 — references/fixtures/residual risk | Retain regression examples only; obtain an independently reviewed clinical truth set with versioned references and risk acceptance. Clinical fixtures require expert effort. | Clinical/laboratory owners review coherent and deliberately inconsistent cases, blinded against independent reference judgments where practical; approve labels separately from baseline snapshots and record residual hazards. P2, prerequisite to release. | PENDING |
| D18 — implementation/release authorization | Continue NO-GO; authorize a scoped implementation after decision approval; authorize release only after verification and clinical review. Implementation permission is not release permission. | Retain NO-GO. Record clinical, laboratory and release-owner sign-off, usability evidence, applicable regulatory assessment and intended-use compliance separately from engineering GO. P2. | PENDING |

These recommended approaches are design judgments, not instructions for patient management. No numerical discrepancy tolerance, acute/chronic timing boundary, gap interval, diagnostic threshold, delta cutoff or rounding policy is invented or approved.


### 4.1 D09 confirmed direction and pending safety specification

**D09 status: Product-owner policy direction confirmed; implementation specification and clinical validation pending.**

The product owner's confirmed direction is: **When a significant inconsistency is detected by a future approved D08 rule, withhold all affected automated interpretations, display a clear safety warning, and preserve the original entered values.** This is a product safety direction, not approval of a discrepancy threshold, clinical algorithm, warning wording or implementation. D08 thresholds, tolerances, source assumptions and applicability remain **PENDING**. No current behavior changes through this document.

#### Proposed consistency states

These states apply to the current input set and its provenance/context under a future approved rule. They are not diagnoses or a declaration that a sample is clinically valid.

| State | Proposed meaning | Proposed affected-result handling |
| --- | --- | --- |
| CONSISTENT | An applicable approved rule was evaluated successfully and no significant inconsistency was detected under its approved criteria. | Eligibility for further interpretation only; all other validation, scope and clinical prerequisites still apply. Mathematical consistency does not prove clinical validity or exclude mixed disorders. |
| INCONSISTENT | An applicable approved D08 rule detects a significant inconsistency. | Confirmed policy direction: withhold every affected automated interpretation, show a clear safety warning and preserve original entered values. |
| UNVERIFIABLE | Applicability, required provenance/context or required data is missing, unknown, unsupported, or the consistency assessment cannot be completed reliably. | Proposed fail-safe policy: withhold affected interpretations and explain why assessment is unavailable. Never silently map this state to CONSISTENT or infer missing context. Detailed clinical approval remains pending. |

An edit makes the previous assessment stale: clear its displayed state and interpretations immediately. No prior CONSISTENT state may authorize a new input set. Reassess the current values and metadata on explicit recalculation; do not calculate automatically on edit. Until assessment completes, interpretations remain unavailable. An inability to assess is UNVERIFIABLE, not a significant inconsistency diagnosed from missing data alone.

#### Proposed dependency map and fail-safe behavior

Clinical/laboratory owners must approve a dependency map before implementation. Dependencies include both values and provenance/context, rather than only the field containing a suspected error.

| Result domain | Proposed dependency treatment |
| --- | --- |
| Primary acid-base, mixed-disorder and compensation interpretations | Depend on the relevant pH/PaCO₂/bicarbonate combination and applicable sample/provenance assumptions. Withhold the entire affected interpretation chain; do not retain a primary label or compensation conclusion after its prerequisite fails. |
| Gap, albumin-corrected gap and delta interpretations | Depend on Na/Cl and the designated bicarbonate source; correction/delta also depend on their own prerequisites. Withhold interpretations when a required value or its source is affected or unverifiable. A separate chemistry sample is not automatically cleared for interpretation by a consistent blood gas. |
| Raw calculated numbers | Displaying an uncorrected gap or other raw arithmetic during an interpretation block requires an explicitly approved independent dependency path and clear non-diagnostic labeling. Pending that decision, the proposed default is to withhold affected calculated results; do not leave numbers styled as validated clinical conclusions. Original entered values remain visible. |
| PaO₂ and any future oxygenation interpretation | Distinguish entered PaO₂ from an automated clinical conclusion. Sample identity/type/timing errors can affect oxygenation too; absence of an acid-base algebra dependency does not establish an unaffected sample. Any preserved independent result requires approved prerequisites and truthful status. No new oxygenation algorithm is authorized. |

Retain the engineering safeguard that both `input` and `change` events on any of the six inputs clear all previous results immediately. Future provenance/context fields must likewise invalidate dependent assessments; final handling of independently unaffected results remains pending. Preserve input strings and selected metadata, including during blocked calculation, exceptions and correction. Do not replace HCO₃, pH or PaCO₂ to force agreement, invent sample timing, or silently drop an affected dependency.

If dependency ownership is uncertain, propose withholding rather than retaining an automated conclusion. Missing rule/configuration, calculation exceptions or unavailable assessment must never expose previous conclusions or silently continue as CONSISTENT. Explain the unavailable assessment through UNVERIFIABLE; significant inconsistency requires a successfully evaluated approved D08 rule. Failure wording and any independent-result exception need clinical and usability approval.

#### Sample, population and provenance considerations — PENDING

- **Sample type:** record arterial/venous/capillary/unknown and whether entered values come from the same identified sample. Approve type-specific applicability; do not assume arterial data from a field label.
- **Age group:** define supported age categories and special-population rules through D01/D08. **Neonatal interpretation is excluded from the proposed v1.3 scope.** Proposed fail-safe handling for neonatal, unknown-age or unsupported contexts is UNVERIFIABLE with affected interpretations unavailable; exact age-category boundaries and final wording remain pending.
- **Bicarbonate provenance:** distinguish actual gas-derived bicarbonate, standard bicarbonate and chemistry total CO₂; record units and source. Do not presume independently measured chemistry is algebraically identical to gas-derived bicarbonate.
- **Timing:** identify sample collection times and relevant intervening care. An acceptable timing relationship and handling of unknown timing need laboratory/clinical approval; no interval or tolerance is assigned here.
- **Reporting context:** approve analyzer, temperature correction, precision and unit assumptions before selecting a consistency metric. Unknown context must not be filled in with a default merely to enable interpretation.

These context recommendations do not establish a new current age restriction or implement a sample validator. Their clinical definitions and workflow remain pending.

#### Proposed English UI warning text — NOT APPROVED

**INCONSISTENT:**

> Safety warning: These entered values do not meet the approved consistency check. Affected automated interpretations have been withheld. Review the values, sample details, bicarbonate source and collection times before recalculating. Your original entries have been preserved.

**UNVERIFIABLE:**

> Consistency cannot be verified for these entries and their sample context. Affected automated interpretations are unavailable. Review the required sample details and supported scope before recalculating. Your original entries have been preserved.

For a future CONSISTENT state, proposed accompanying text is: “No significant inconsistency detected under this check. This does not establish clinical validity or exclude a mixed acid-base disorder.” Final wording, accessibility announcements and clinical comprehension need professional approval. The term “approved consistency check” must not appear as a claim until D08 is actually approved and implemented.

#### Testable future acceptance criteria — specification and approval PENDING

1. An independently reviewed D08 truth set covers approved scope, units, provenance and timing, plus below/at/above every approved discrepancy boundary. No acceptance tolerance is supplied by this draft or borrowed from engineering floating-point allowances.
2. A known INCONSISTENT case, including E6 under an applicable future rule, produces the approved warning, withholds every affected interpretation and preserves all input strings/metadata. No stale primary, mixed, compensation, gap/delta or affected oxygenation conclusion survives.
3. Missing/unknown context, unsupported sample or age, neonatal context, absent rule and assessment failure produce UNVERIFIABLE where applicable. They cannot produce CONSISTENT or usable affected interpretations by default.
4. A successfully evaluated CONSISTENT case receives no claim of clinical validity. Other clinical checks, mixed-disorder assessment and supported-scope requirements remain independent gates.
5. Verify CONSISTENT → edit → INCONSISTENT → correction → reassessment and CONSISTENT → edit → UNVERIFIABLE → completed context → reassessment. Both event types immediately invalidate old results; edits preserve values and never automatically recalculate. No old state authorizes new values.
6. Exercise dependency paths independently, including separate gas and chemistry sources, corrections/delta prerequisites and sample identity affecting oxygenation. Every claimed unaffected result must have an approved independent prerequisite path; absent that specification, withholding is the fail-safe default.
7. Verify exceptions and invalid numeric input clear prior interpretations, preserve entries and permit reviewed recovery. Retain existing reset/reopening, listener cleanup and mobile-layout behavior; no partial stale results may remain after failure.
8. Check warning visibility, accessible announcements, keyboard behavior and desktop/mobile presentation with populated and blocked states. Qualified-user comprehension review must confirm that unavailable, inconsistent and mathematically consistent are not read as interchangeable diagnostic states.

Clinical/laboratory reviewers must approve the rule, dependency map, state transitions, warning text, population/sample definitions and acceptance fixtures. Engineering implementation authorization and subsequent clinical validation remain separate and pending.

### 4.2 D08 focused physiological consistency review

**D08: PENDING — CLINICAL AND LABORATORY APPROVAL REQUIRED.** D09 retains its confirmed product-owner withholding direction; its implementation and clinical validation remain pending. This section is a proposed specification, not an approved algorithm. Clinical release remains NO-GO; neonatal interpretation remains excluded from proposed v1.3 scope.

#### Product-owner confirmed staged validation plan

**Approved validation sequence only — not approval of clinical interpretation rules or production implementation.** The proposed D01 product scope remains ABG and VBG in adults and non-neonatal children, with bicarbonate provenance explicitly identified. Stage 1 is the initial validation population/path, not a narrowing of the proposed overall scope or a claim of readiness for patient-care use.

| Stage | Confirmed validation sequence | Required independent evidence / status |
| --- | --- | --- |
| Stage 1 | Adult arterial blood gas with calculated bicarbonate, using a same-sample, analyzer-aware consistency assessment | Analyzer/reporting-specific rule, precision and provenance validation. Sequence confirmed; rule and acceptance criteria PENDING. |
| Stage 2 | Venous blood gas consistency | Independent VBG validation, including its sample/provenance context; must not inherit Stage 1 validation. Criteria PENDING. |
| Stage 3 | Pediatric arterial and venous blood gas consistency, excluding neonates | Age-appropriate independent validation for each supported age/sample group; must not inherit adult ABG or VBG validation. Age boundaries and criteria PENDING. |
| Stage 4 | Independently measured chemistry total CO₂ / bicarbonate comparison | Separate analytical and sample-provenance validation, including pairing, timing and method bias; must not inherit calculated-bicarbonate validation. Criteria PENDING. |

Later stages must not inherit Stage 1 validation automatically. Completion or approval of one stage does not establish another stage's clinical coverage. Each stage requires a documented evidence package and separate professional approval before any implementation authorization is considered.

**All numerical thresholds, tolerances, discrepancy metrics, analyzer-specific parameters, rounding rules and acceptance criteria remain PENDING. No D08 consistency rule is authorized for production.** Proposed algorithms and acceptance-test lists below are review candidates only, not approved requirements. Mathematical consistency does not prove clinical validity.

D09 remains **Product-owner policy direction confirmed; implementation specification and clinical validation pending.** Its withholding direction applies when a future approved, applicable D08 rule detects significant inconsistency; the validation sequence alone supplies no such rule. Unsupported or unvalidated stage/context must not be silently treated as CONSISTENT. Proposed UNVERIFIABLE handling still requires detailed specification and clinical approval.

#### Accessible laboratory evidence and its limits

The working manufacturer/regulatory PDF links below were opened during this review on 2026-10-08. They supplement R2/R4; device-specific claims must not be generalized to every analyzer.

- **R7:** [Abbott i-STAT CG8+ IFU, ART-784173-00A, 31 July 2025](https://www.globalpointofcare.abbott/content/dam/ardx/globalpointofcare/apoc/support/i-stat-1/cti-ifu/english-us/ifu/ART-784173-00A.pdf), US labeling, pages 3–4 and performance sections. It describes measured pH/PCO₂, calculated bicarbonate, arterial/venous specimen use, temperature correction and analyzer precision. Its equations include `log10(HCO₃) = pH + log10(PCO₂) − 7.608` and calculated `TCO₂ = HCO₃ + 0.03 × PCO₂`. This is a device convention, not this application's newly approved equation. Input reporting precision and temperature conventions therefore matter.
- **R8:** [FDA decision summary K200492, i-STAT CHEM8+](https://www.accessdata.fda.gov/cdrh_docs/reviews/K200492.pdf), 2020 regulatory device review. Describes total CO₂ and method/performance evaluation. A chemistry total-CO₂ measurement is a different quantity/method from a gas-derived bicarbonate. Regulatory clearance of that device does not validate this application's consistency policy.

R2 supplies the conventional educational relationship `pH = 6.1 + log10(HCO₃/(0.03 × PCO₂))`, with PCO₂ in mmHg. Constants and reporting conventions must match the selected rule; do not demand exact agreement between this approximation and every manufacturer's calculated result. R4 describes chemistry bicarbonate reporting as total CO₂. These sources justify separating provenance; they do not supply a universal significant-discrepancy cutoff.

**Review inference:** algebra applies within a suitable specimen under the chosen method assumptions; changing from arterial to venous does not justify mixing values from two specimens. A same-sample VBG internal check does not establish that VBG can replace ABG for arterial compensation thresholds or oxygenation. Likewise, an age-independent algebraic relationship does not validate pediatric diagnostic ranges. No general ABG↔VBG conversion, adult-to-pediatric tolerance transfer or timing window is supported by this review.

#### Concise D08 decision matrix

| Situation | Proposed approach and trade-off | Approval/state implication |
| --- | --- | --- |
| Same-sample actual gas-derived HCO₃ with identified analyzer/reporting convention | Recompute using the approved device-compatible relationship. Useful for transcription/reporting mismatch detection, but circular as physiological confirmation because HCO₃ already derives from pH/PCO₂. | Initial recommended path; device/precision rule PENDING. CONSISTENT means internal agreement only. |
| Standard bicarbonate or chemistry total CO₂ entered as actual bicarbonate | Do not apply the actual-bicarbonate equality check unchanged. Standard bicarbonate uses standardized conditions; total CO₂ includes additional CO₂ components. | UNVERIFIABLE for that check unless a separately approved provenance-specific rule exists. |
| Independently measured values from a documented comparable specimen | Separate method-comparison path accounting for measurand, bias and uncertainty; preserves potentially useful chemistry information but needs laboratory validation. | PENDING; do not treat method disagreement alone as confirmed physiologic inconsistency. |
| Different specimens/times or intervening ventilation/treatment | Compare only with an approved pairing/context policy; a real change can explain a mismatch. | Unknown or unapproved pairing remains UNVERIFIABLE, even if numbers happen to agree. No arbitrary allowable time interval. |
| Adult ABG versus same-sample VBG | Stage 1 validates adult arterial calculated bicarbonate; Stage 2 independently validates VBG consistency. Never substitute venous PCO₂ for PaCO₂ silently. | Validation order confirmed; clinical rules PENDING. Unvalidated VBG remains UNVERIFIABLE for affected interpretations. |
| Non-neonatal pediatric samples | Stage 3 independently validates pediatric ABG and VBG using age-appropriate evidence and pediatric/laboratory reviewers. | Proposed scope includes non-neonatal children; age boundaries, rules and acceptance criteria PENDING. Neonates excluded. |
| Rounded, temperature-corrected or method-unknown data | Use known reporting intervals and approved method conventions; do not assume displayed digits imply measurement accuracy. | Unknown requisite convention or unresolved boundary uncertainty remains UNVERIFIABLE under the proposed fail-safe policy. |

#### Proposed algorithm — not authorized for implementation

1. Invalidate prior assessments immediately after any value or context edit, preserving original strings/metadata; require explicit recalculation. Existing numeric validation remains a separate gate and is not weakened.
2. Check approved applicability: age group, sample type/identity, bicarbonate type/source, collection/analysis timing, method, units, reporting precision and temperature basis. Missing or unsupported required context produces UNVERIFIABLE. A neonatal case cannot enter the proposed v1.3 interpretation path.
3. Select a versioned rule by provenance. For actual gas bicarbonate, use the laboratory-approved relationship, for example `H_expected = α × PCO₂ × 10^(pH − pK)`. The values of α/pK are rule-specific and PENDING; the conventional R2 constants are explanatory only. Do not silently convert standard bicarbonate or total CO₂ into actual bicarbonate.
4. Normalize declared units through an approved conversion without altering entered values; current UI uses mmHg and mmol/L. Reject unknown units for assessment. Never treat a kPa number as mmHg. Use calculation values, not formatted output.
5. Evaluate the approved discrepancy metric and its uncertainty: absolute HCO₃ difference, absolute predicted-pH difference, or a relative/log-ratio metric are alternatives. Choose one primary metric; do not combine arbitrary cutoffs to make borderline cases pass.
6. Assign CONSISTENT only when the applicable approved criterion is satisfied; assign INCONSISTENT only when significant discrepancy is established by that rule. Proposed conservative handling for a criterion straddled by unresolved uncertainty is UNVERIFIABLE; final boundary/tie behavior requires approval. Exceptions, unavailable rules or non-finite intermediate arithmetic cannot yield CONSISTENT.
7. Apply D09: INCONSISTENT withholds all affected automated interpretations, displays the approved safety warning and preserves entries. Proposed UNVERIFIABLE withholding remains subject to detailed approval. Even CONSISTENT must pass separate scope/clinical prerequisites and does not exclude a mixed disorder.

#### Tolerance options — no numerical threshold approved

| Option | Evidence-supported basis | Trade-off and pending evidence |
| --- | --- | --- |
| Reporting-interval agreement | Printed precision creates an interval around each reported value. Propagate approved rounding intervals through the selected equation. R7 provides a concrete reporting/method context. | Detects transcription discrepancies without requiring exact equality. It cannot independently validate measured physiology; unknown rounding convention cannot be guessed. |
| Device-specific residual allowance | Combine the documented equation, local reporting precision and observed residuals for same-sample calculated HCO₃. | Recommended initial tolerance design. Calculated HCO₃ is correlated with pH/PCO₂; do not model all three as independent analytical measurements. Approve device/version coverage and boundary handling. |
| Laboratory-validated cross-method allowance | Paired local specimens establish method bias, precision, applicable concentration ranges and collection conditions for gas versus chemistry comparisons (R4/R8). | Useful later, but potentially broader uncertainty can hide errors. Do not reuse the same-sample allowance or equate total CO₂ directly with HCO₃. |
| Fixed absolute, relative or hybrid criterion | A simpler residual rule can be calibrated against the relevant local dataset and clinical consequences. | Easier to explain but a relative rule becomes unstable near zero, and fixed differences behave differently across the range. Metric, coefficients and significant discrepancy boundaries remain PENDING. |

For proposed reporting-interval propagation, a printed resolution q may imply ±q/2 **only if rounding to nearest is documented**; truncation needs a different interval. This is a mathematical model, not an approved clinical tolerance. Account separately for method bias, temperature/reporting convention and numerical representation. Device precision figures, proficiency-testing limits and published ABG–VBG limits of agreement must not be transplanted as this application's discrepancy cutoff. No universal ΔpH, ΔHCO₃, percentage or timing threshold is selected.

#### Mandatory UNVERIFIABLE cases and safety tests — proposed specification

Remain UNVERIFIABLE when required sample identity/type, bicarbonate provenance, units, timing or reporting context is unknown; when samples/time points are unapproved for pairing; when standard bicarbonate/total CO₂ lacks an applicable rule; for unsupported VBG/capillary or age contexts, including neonates; for unresolved uncertainty crossing a policy boundary; and when the rule/configuration or assessment fails. Numerical invalidity retains existing clearing behavior; it must not be relabeled CONSISTENT merely because consistency assessment is unavailable.

Foreseeable hazards include false withholding caused by legitimate cross-method/timing variation, false reassurance from a circular same-sample calculation, misclassifying a valid mixed disorder as inconsistent, and missing transcription errors under an overly broad allowance. A consistency failure cannot identify which value is wrong; no automatic correction is proposed.

Future acceptance fixtures must independently cover:

- E6 and coherent same-sample controls; matching gas bicarbonate must never be presented as independent clinical validation.
- Approved equation variants and displayed rounding/truncation intervals; every future discrepancy boundary below/at/above, ties and adjacent binary values.
- Gas-derived versus standard bicarbonate versus measured total CO₂; paired and unpaired specimens; unknown/different collection times and intervening treatment.
- Declared mmHg/kPa and concentration units; temperature conventions, missing method and differing report precision; conversions cannot change stored inputs.
- Adult and separately approved non-neonatal pediatric groups; unknown age, neonates and unsupported sample types; same-sample VBG never silently activates arterial interpretation rules.
- Failures/non-finite intermediate values and missing configuration; CONSISTENT → edit → INCONSISTENT/UNVERIFIABLE → correction → explicit reassessment.
- D09 dependency withholding for every affected label, clear warning, original input preservation and absence of stale partial conclusions. Any independently retained gap/oxygenation output needs its own approved prerequisites.

**Outstanding input and approvals:** the validation order is now confirmed and does not need reconfirmation. Identify the local laboratory/analyzers and clinical/laboratory reviewers for Stage 1, then agree the evidence requirements for each later stage. Professional reviewers must approve equations, precision conventions, discrepancy metrics/thresholds, sample pairing/timing, age boundaries, rounding rules and acceptance criteria separately. D08 clinical rules remain PENDING — CLINICAL AND LABORATORY APPROVAL REQUIRED; D09 direction remains confirmed but implementation pending.

## 5. Approval evidence and acceptance gates

Resolve in this order:

1. **D01/D08/D09:** establish sample/population/provenance requirements and inconsistency workflow. For a proposed criterion, provide analyzer/source-specific justification and independently reviewed below/at/above examples. E6 must not silently yield a reassuring interpretation under the approved workflow. Retain entered values; do not normalize input to fit an equation.
2. **D02/D03/D04:** approve systematic versus explicitly limited scope, primary/mixed truth tables, Winter prerequisites, missing-context states and clinician-facing wording. Include E1/E2/E5 and physiologically coherent examples of combined disorders; do not relabel all low HCO₃ as metabolic acidosis. Approve residual limitations explicitly.
3. **D05–D07/D10–D14:** approve compensation methods, gap/albumin/delta conventions and oxygen dependency rules. Distinguish estimated compensation from diagnosis and unassessed from normal. Match local laboratory units and reference methods.
4. **D15/D16:** approve presentation and numerical semantics independently. Boundary tests must exercise actual comparisons and visible output, including E8 and gap 13.85. Engineering precision bounds must never stand in for clinical consistency tolerances.
5. **D17/D18:** complete reviewed clinical fixtures, intended-user usability assessment, residual-risk acceptance and separate implementation/release authorization. Document applicable jurisdiction and regulatory review; this draft assigns no regulatory classification.

For every D01–D18 decision, the approval record must contain: selected option, rationale, clinical owner, laboratory reviewer where relevant, source/version, exact approved rules and wording or explicit limitation, validation evidence, residual risk, review date and approval record. Clinical approval records are presently **unassigned/PENDING**. D08 has a product-owner-approved validation sequence only; no consistency rule or acceptance criterion is approved. D09 has a confirmed product-owner policy direction only; its implementation specification and clinical validation remain pending. Product-owner intent alone does not sign off clinical content.

Preserve the existing independent math and baseline fixtures; add future approved clinical expectations separately. Preserve immediate invalidation, invalid-result clearing, explicit recalculation, reset/reopening, listener cleanup, mobile wrapping and strict browser failure checks. Re-run all engineering suites after any future implementation; a passing suite is necessary engineering evidence, not clinical approval.

## 6. Outcome

**DRAFT — CLINICAL REVIEW REQUIRED. Clinical release remains NO-GO.**

D09: **Product-owner policy direction confirmed; implementation specification and clinical validation pending.** D08 validation sequence is approved by the product owner; D08 consistency rules remain PENDING — CLINICAL AND LABORATORY APPROVAL REQUIRED. D01–D07 and D10–D18 remain PENDING. This review authorizes no implementation, treatment recommendation, threshold change, rounding change or release. The immediate professional review priorities are inconsistent input handling and incomplete/misleading mixed-disorder assessment.
