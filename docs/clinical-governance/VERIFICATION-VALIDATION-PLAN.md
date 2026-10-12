# Verification and validation plan

Document: CG-VV-001 · Version: 1.0 DRAFT · Audit date: 2026-10-12.

Clinical release: **NO-GO**. Clinical/laboratory policies: **PENDING** where unresolved. Clinical implementation: **NOT AUTHORIZED**. This documentation plan authorizes no calculator change or clinical deployment.

## Scope and evidence distinctions

Baseline: `190c15dbc5d4f9f17c19c0f67212b9f2a31a8d91`; inventory: five calculators and 24 reference algorithms in [CLINICAL-EVIDENCE-MATRIX.md](CLINICAL-EVIDENCE-MATRIX.md). Include every function proposed for release, including static clinical text, dose tables and future capabilities. GCS, Shock Index and NEWS2 remain candidate functions, not approved clinical tools.

Verification asks whether software implements an approved requirement correctly. Clinical validation asks whether the output is appropriate and safe for the approved intended use and population. Laboratory compatibility asks whether units, analytical methods, specimen sources and timing support the computation and interpretation. Regulatory and facility decisions are additional gates. These questions require different evidence and reviewers.

Existing regression fixtures, structural checks and user-reported browser passes are engineering evidence only. They do not establish clinical validity, laboratory compatibility, usability conformance or regulatory approval.

## Traceability and evidence control

For each release candidate, maintain a versioned record connecting intended-use claim → function E01–E29 → requirement → hazard H01–H12 → source/local policy → independent expected result → test or review evidence → anomaly → reviewer decision. New requirements receive stable identifiers; references to ABG Dxx and infusion Dxx must include their namespace. Reuse existing ABG VM/V/AC identifiers with an explicit mapping rather than silently renumbering them.

Each record must contain the baseline commit, environment, source edition/section/access date, input units and context, expected output and rationale, independently derived tolerance, actual result, runner and date, evidence artifact, reviewer role, status and signature. Keep clinical-source extraction separate from software-derived expected values. Archive superseded evidence, open anomalies, known limitations and approved changes. A passing test must not overwrite a PENDING clinical decision.

## Planned verification and review

| Area | Required independent evidence / tests | Required reviewer and closure condition |
| --- | --- | --- |
| Requirements and reference content | Clause-by-clause review of all 24 algorithms; medication dose, unit, route, maximum, contraindication and population audit where present. Record Saudi/local applicability and conflicts without silently resolving them. | Emergency medicine specialist; relevant specialty; pharmacist for medication content. Signed source and scope approval. |
| Arithmetic and unit conversion | Hand/reference calculations independent of application helpers for all five calculators; every supported infusion dose unit and weight dependency; score components, totals and SI ratio. Equivalent-unit examples and conversion factors. | Independent engineering verifier plus clinical/pharmacy/laboratory reviewer as applicable. Approved expected outputs and units. |
| Precision and rounding | Separate full-precision value from display; small/large values, floating-point boundaries, tie behavior, notation, trailing units and clinically meaningful display error. Infusion examples in the existing precision decision must remain visible as unresolved defects. | Pharmacist and clinical lead approve tolerable error and presentation; engineer verifies implementation only after authorization. No arbitrary tolerance or rounding rule approved here. |
| Inputs and context | Missing, empty, nonnumeric, nonfinite, zero, negative, inconsistent, implausible and boundary inputs; locale formats; wrong units/population; unavailable score components and alternative NEWS2 scales. Test current behavior separately from proposed requirements. | Clinical/laboratory reviewers approve domains and invalid-input behavior; engineering verifies boundaries. Do not change validation through this documentation task. |
| ABG and laboratory compatibility | Existing independent ABG fixtures plus approved specimen, analyzer, units, timing, adult/pediatric and compensation criteria. Anion Gap laboratory intervals; albumin coefficient/reference and compatible data; delta baselines, eligibility and denominator safeguards. | Emergency/critical-care specialist and laboratory medicine authority; all unresolved clinical policies signed before implementation. |
| State and integration | Edit, submit, clear, reopen, switch calculator/theme, asynchronous lifecycle where present, duplicate listeners, stale results and unavailable inputs. Check warnings and interpretation against approved requirements. | Engineering verifier and clinical reviewer for misleading-result hazards. Reproducible evidence tied to commit. |
| Human factors and accessibility | Representative emergency physicians and realistic tasks; error recovery, unit recognition, interpretation boundaries, keyboard/focus, semantic labels, screen reader, contrast, zoom/text resize, touch and overflow. Five widths 320/360/390/768/1280 and supported light/dark themes where relevant. | Human-factors/accessibility reviewer and clinical users; defined protocol and documented residual usability risk. Browser layout passes alone are insufficient. |
| Operational and regulatory controls | Approved environment, supported browsers/devices, security/data review, maintenance/change control, rollback and incident handling; current SFDA pathway and facility permission. | Regulatory/manufacturer owner, facility governance and IT/security. Signed applicable controls and deployment decision. |

## ABG decisions to preserve

D10–D12 product direction is **APPROVED**: potassium-excluded Anion Gap, no universal laboratory interval; uncorrected gap remains available with valid inputs, optional compatible albumin correction; numerical-only delta assessment after independent clinical/laboratory validation, with no automatic mixed-disorder classification. Clinical thresholds, coefficients, reference baselines, timing compatibility, eligibility, precision and safeguards remain **PENDING**. Approved communication or workflow directions in earlier ABG records do not approve numerical clinical policies.

Use [existing ABG validation matrix](../clinical-safety/ABG-ANION-GAP-VALIDATION-MATRIX.md), [approval readiness](../clinical-safety/ABG-ANION-GAP-APPROVAL-READINESS.md) and D10–D12 evidence documents as review inputs. Preserve the staged ABG plan and its population/specimen restrictions; do not extend adult evidence to pediatric or VBG use. Resolve local laboratory applicability through laboratory review, not arithmetic tests.

Infusion precision policy and formatter prototype in [INFUSION-PRECISION-DECISION.md](../clinical-safety/INFUSION-PRECISION-DECISION.md) are unapproved. Known small-rate and concentration rounding defects require pharmacy/clinical policy decisions and independent evidence before a production remedy is authorized.

## Existing engineering evidence and limitations

The [mobile accessibility audit](../ux/MOBILE-ACCESSIBILITY-AUDIT.md) records Codex non-browser regression/structural checks and user-reported real Chromium results: 17/17 browser invocations PASS, exit code 0. Five widths were covered by harnesses that support them. Lifecycle and E8 use their own internal matrices; E8 does not cover 768px. Codex's sandbox browser limitation remains distinct from the user's execution evidence. No new browser execution is claimed by this governance review.

These results do not resolve infusion rounding, pending ABG policies, full-site accessibility, screen-reader behavior, comprehensive zoom/contrast evaluation, clinician task usability or clinical validation. Reference snapshots can reproduce an incorrect clinical rule and therefore cannot substitute for independent expected results.

## Review sequence and release gates

1. **Governance scope:** assign legal/manufacturer owner, clinical safety lead and reviewers; approve intended use and per-function claims; confirm the regulatory pathway and applicable current requirements.
2. **Clinical/laboratory policy:** approve authoritative sources, local methods/intervals, populations, units, rounding, interpretation and invalid-input requirements; record disagreements and exclusions. Prioritize medication rounding and ABG safety blockers.
3. **Implementation authorization:** approve a bounded requirements package, hazard controls, independent fixtures, acceptance criteria and specific authorization. Until then, clinical implementation remains NOT AUTHORIZED.
4. **Engineering verification:** run the approved traceability suite, independent calculations, boundaries and integration tests on the exact candidate; document failures and remaining anomalies without claiming clinical validation.
5. **Clinical and human-factors validation:** independent reviewers approve outputs and intended workflow using agreed protocols; laboratory compatibility and pharmacy precision require separate sign-off. No patient-care trial is authorized by this plan.
6. **Release authorization:** demonstrate applicable regulatory authorization and facility permission, close unacceptable risks or explicitly exclude affected functions, approve residual risks and operating controls, and obtain a signed release decision. Until then, clinical release remains NO-GO.

Passing software tests cannot approve intended clinical claims, source selection, drug precision, clinical thresholds, specimen compatibility, population applicability, acceptable residual clinical risk, medical-device classification or facility deployment.

Approval fields: product owner **PENDING for governance plan**; clinical safety lead **UNASSIGNED / PENDING**; pharmacy **UNASSIGNED / PENDING**; laboratory **UNASSIGNED / PENDING**; independent engineering verification **PENDING**; human factors **PENDING**; regulatory/facility release decision **PENDING**. Record scope, date, evidence and signature for every decision; do not infer approvals from existing product directions.
