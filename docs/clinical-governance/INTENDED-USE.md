# Clinical Governance v1.0 — Intended Use

Version: 1.0 draft. Prepared: 2026-10-12. Document ID: CG-IU-001.

**Clinical release: NO-GO. Clinical/laboratory policies: PENDING unless explicitly recorded otherwise. Clinical implementation: NOT AUTHORIZED. No regulatory approval, certification or clinical validation is claimed.**

## Repository audit and evidence boundary

Repository: Emergency-Toolkit. At audit, branch was `feat/v1.3-mobile-ux-accessibility`, HEAD `190c15dbc5d4f9f17c19c0f67212b9f2a31a8d91`, working tree clean. Supplied instructions and Ryoku vault were read; no repository AGENTS.md/CLAUDE.md found. Branch `docs/v1.3-clinical-governance` was created from that checkpoint after confirming cleanliness. The mobile branch, clinical-safety branch and main are not modified by this phase. Only these five governance documents are added; no application/test/workflow changes are authorized. The subsequent documentation checkpoint authorizes one local commit of these five documents only.

Verified inventory: five calculator modules and 24 reference algorithm modules are loaded by [index.html](../../index.html); see the complete [clinical evidence matrix](CLINICAL-EVIDENCE-MATRIX.md). The current interface is English with light/dark themes. Calculators accept manually entered observations/preparation quantities; algorithm pages render clinical reference text. Current labels/thresholds, code presence and tests do not establish clinical approval. Deployment architecture, legal manufacturer, supported browsers/hardware, local laboratory profiles and approved clinical user population are unresolved. Static source review found no fetch/storage APIs in js modules; this is not a complete privacy/security assessment or assurance that deployment has no logging or data processing.

## Draft intended-use statement — proposal, not approved labeling

Emergency Toolkit is proposed as a browser-based adjunct for qualified emergency physicians assessing and managing patients in emergency departments in Saudi Arabia. Subject to independently approved function-specific scope, it would present calculations derived from clinician-entered observations or medication preparation data and selected emergency reference information to support the physician's review during clinical care. The physician must independently verify applicability, source inputs, units, outputs and compatibility with current local laboratory, pharmacy and clinical protocols before making a patient-care decision.

The proposed clinical-care purpose is explicit; this draft does not rebrand the product as education-only to avoid governance or regulatory assessment. No current function is released for that intended use by this document. Human oversight is a risk control, not proof of safety or exemption from regulatory requirements.

## Candidate outputs and workflow boundaries

| Function family | Present output / proposed workflow boundary |
| --- | --- |
| GCS, NEWS2, Shock Index | Component/total scores, ratio and existing textual interpretations/escalation messages. Candidate functions only; require independent clinical truth tables and intended-population validation before clinical claims. |
| ABG/acid–base | Uncorrected potassium-excluded gap, current primary/compensation text and contextual PaO₂ display. Existing output is not complete mixed-disorder assessment. Albumin/delta directions are approved product intent, not implemented/clinically validated features. |
| Infusions | Mathematical concentration/rate from selected dose units and preparation. Display rounding defects remain unresolved; no pump-programmable rate or administration authorization is implied. |
| 24 reference algorithms | Clinical assessment, treatment, drug/escalation reference text. Every recommendation/dose requires source/version/local-protocol review; static reference format does not automatically mean low clinical risk. |

Proposed workflow: assess patient independently → select applicable approved function → verify patient/context and contemporaneous inputs/units → calculate/read reference → compare with independent clinical assessment and local policy → resolve discrepancy or withhold reliance → physician makes and documents decision through the facility's approved workflow. This phase does not add logging, records, recommendations or UI changes.

## Oversight, excluded uses and open claims

Required oversight includes clinically competent interpretation; verification of drug, route, dose, concentration, units, weight and preparation by facility medication-safety procedures; laboratory source/timing validation for acid–base assessment; and escalation when results conflict with observations or context. The interface must never be treated as proof that an input is clinically valid because it passed software bounds.

Proposed exclusions pending final scope approval: autonomous diagnosis/triage/treatment; direct pump/device control; standalone prescribing or administration decisions; replacement of clinical judgment or emergency response; use by patients/lay users; unattended monitoring; and use outside approved age/specimen/clinical paths. Pediatric content exists, but its presence does not approve pediatric calculators. Existing ABG staged proposal excludes neonatal interpretation; future product-wide age boundaries, pregnancy contexts and other special populations require separate review. No global adult-only claim is invented to erase pediatric source content.

Unresolved claims: exactly which functions and reference pages are included in a clinical release; diagnostic versus numerical/reference claims; drug/pump scope; supported populations; independent versus local-baseline use; laboratory methods; language/Arabic labeling requirements; clinical performance and outcomes; hosting/offline behavior; data/privacy/security responsibilities; and regulatory qualification/classification. See [SFDA assessment](SFDA-REGULATORY-ASSESSMENT.md).

## Preserved decision hierarchy

[ABG Phase 4C](../clinical-safety/ABG-ANION-GAP-CLINICAL-REVIEW.md) records D10–D12 product direction **APPROVED**: excluded-potassium AG with units/formula/no universal interval/no normal-gap rule-out; valid uncorrected AG without mandatory albumin, optional compatible correction; numerical-only delta after independent validation, no automatic mixed diagnosis. D02–D07 product directions in [Phase 4B](../clinical-safety/ABG-MIXED-DISORDERS-COMPENSATION-REVIEW.md), D08 validation sequence and D09 affected-result withholding direction in [decision review](../clinical-safety/ABG-CLINICAL-DECISION-REVIEW.md) remain intact. Clinical criteria/thresholds/specimen rules/wording and implementation authorization remain pending. Infusion decisions use a separate register; do not confuse its D10–D12 with ABG IDs.

## Approval fields

| Field | Value |
| --- | --- |
| Product/legal manufacturer and accountable safety owner | Unassigned / PENDING |
| Clinical intended-use owner and Saudi facility sponsor | Unassigned / PENDING |
| Laboratory/pharmacy reviewers | Unassigned / PENDING |
| Regulatory reviewer | Unassigned / PENDING |
| Approved scope, date, signature and durable record | None / PENDING |
| Next review / expiry | To be assigned before approval |
| Change control | Version new claims/scope; assess risk/evidence/regulatory impact before authorizing changes |

Use the [risk register](RISK-REGISTER.md) and [V&V plan](VERIFICATION-VALIDATION-PLAN.md) for acceptance gates. This draft is not permission to deploy in clinical care.
