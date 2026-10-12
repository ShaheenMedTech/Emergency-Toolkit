# SFDA regulatory assessment — preliminary

Document: CG-REG-001 · Version: 1.0 DRAFT · Audit date: 2026-10-12.

Clinical release: **NO-GO**. Clinical/laboratory policies: **PENDING**. Clinical implementation: **NOT AUTHORIZED**. No regulatory qualification, classification, authorization or certification is established by this document.

## Assessment boundary

This assessment concerns the repository at `190c15dbc5d4f9f17c19c0f67212b9f2a31a8d91` and the proposed intended use in [INTENDED-USE.md](INTENDED-USE.md). Five calculators and 24 reference algorithms were identified. Patient-specific calculations supporting physicians during clinical care require a substantive medical-device qualification review. Calling the site educational, retaining human oversight or distributing it without charge does not resolve that question. This is a preliminary assessment, not a legal determination.

## Official evidence and currency limitations

All URLs below were accessed on 2026-10-12. Version dates refer to the inspected PDF covers; a hosting update is not necessarily a revised requirement. Regulatory review must confirm current applicable requirements and authoritative Arabic text before relying on these English documents.

| Reference | Inspected edition and evidence | Limitation / required confirmation |
| --- | --- | --- |
| [SFDA Guidance on Digital Health Products, MDS-G027](https://sfda.gov.sa/sites/default/files/2026-08/MDS-G027.pdf), linked from the [official guidance page](https://sfda.gov.sa/ar/guide/19247) | Current page download: v1.0, 11/8/2025, code MDS-G-027-V1/250811. Sections 1.1–1.2 and qualification figures address intended medical purpose, patient-specific data processing and SaMD/IVD pathways; section 3 refers qualifying products to MDS-REQ1. | The [older official indexed copy](https://www.sfda.gov.sa/sites/default/files/2025-08/MDS-G027_1.pdf) has v1.0, 10/8/2025, code ending 250810. Do not silently combine editions. Confirm controlling edition and applicability to this mixed-function product. |
| [SFDA Requirements for Medical Devices Marketing Authorization, MDS-REQ1](https://www.sfda.gov.sa/sites/default/files/2021-12/REQ1En.pdf), [official requirements page](https://www.sfda.gov.sa/en/regulations/requirements-medical-devices-marketing-authorization-mds-req-1) | Inspected official copy: v6.0, 19/12/2021. Annex 1 section 17 covers software reliability, lifecycle, risk management, information security, verification/validation, mobile display and environment considerations. Technical documentation includes software verification/validation evidence. | The page's `REQ1En_0.pdf` download could not be retrieved during this audit. The accessible alternate copy is evidence of published requirements, not proof that this edition is currently controlling. Confirm applicable classification rules, submission route and current requirements. |
| [SFDA Requirements for Safe Use of Medical Devices Inside Healthcare Facilities, MDS-REQ3](https://www.sfda.gov.sa/sites/default/files/2022-03/MDS-REQ3E.pdf) | v1, 20/03/2022. Addresses healthcare-facility safe use, including authorized devices, procedures, training and reporting responsibilities. | Confirm duties and applicability for web software, facility hosting, procurement, integration and supervised evaluation. Facility deployment is a separate governance question from product authorization. |
| [SFDA Requirements for Post-Market Surveillance of Medical Devices, MDS-REQ11](https://www.sfda.gov.sa/sites/default/files/2023-03/%28MDS-REQ%2011%29E_0.pdf) | v2, 23/03/2023; marked translated copy. Covers adverse-event/complaint reporting and investigation, safety alerts and corrective actions. | Confirm current authoritative requirements, accountable entities, reporting triggers and timelines; none are invented here. Plan these responsibilities before release, without suggesting the product is already authorized. |

## Separate regulatory decisions

| Decision | Preliminary question / proposal | Evidence needed and responsible role | Status |
| --- | --- | --- | --- |
| Medical-device / SaMD qualification | Do the intended claims, calculations and clinical reference functions qualify, and which functions form the regulated product? Is an IVD-related pathway relevant to laboratory-derived inputs? | Final intended use, claims, architecture and output inventory; Saudi medical-device regulatory specialist with legal/manufacturer owner; obtain SFDA clarification if needed. | PENDING — no definitive determination |
| Risk classification | Which current rules apply to the decisions supported, severity of consequences, patient populations and software scope? | Function-level hazard analysis and current classification rules reviewed by regulatory specialist and clinical safety lead. No class assigned. | PENDING |
| Marketing authorization | What authorization, technical dossier, quality-system and local representation requirements apply before making the product available for the intended purpose? | Current MDS-REQ1 assessment, identified legal manufacturer and responsible entity, evidence gap analysis and any required SFDA correspondence. | PENDING — no authorization claimed |
| Healthcare-facility deployment | What institutional approval, training, IT/security, clinical governance and safe-use controls are required? | Facility medical director/clinical governance, pharmacy, laboratory and IT review; applicable MDS-REQ3 obligations. | PENDING — deployment not authorized |
| Post-market responsibilities | Who receives, investigates and reports complaints/incidents and manages safety notices, rollback and field corrective actions? | Named accountable entity and operational procedures reviewed against current MDS-REQ11. | PENDING |

Qualification, classification, authorization and facility permission are distinct decisions. Passing software tests or receiving product-owner direction closes none of them.

## Manufacturer and responsibility questions

The audit has not established a signed legal-manufacturer assignment, a regulatory authorization record or a deployment approval. Repository authorship is insufficient evidence of these responsibilities.

- Which legal entity controls intended use, release, maintenance, hosting and distribution? Who accepts manufacturer duties, and is local representation required?
- Who is the clinical safety lead, laboratory authority, pharmacy authority and regulatory decision owner? Who has authority to stop deployment?
- Is the product a single device, separately governed modules or a mixed reference/calculation service? How do future algorithms and claims affect scope?
- Which institutions, users, populations, languages and network environments are intended? Does any integration change the boundaries or data responsibilities?
- What quality-system, cybersecurity, data-protection, supplier, change-control and post-market obligations apply? No compliance or certification is inferred from static source inspection.

## Acceptance criteria and blockers

Before any implementation authorization, record the legal owner, approved intended use and claims, signed regulatory pathway assessment with current editions, applicable obligations and an evidence plan. Clinical changes also require independent clinical/laboratory/pharmacy approval and specific implementation authorization. Regulatory uncertainty does not authorize work on clinical behavior.

Before clinical release, additionally require the applicable authorization evidence, facility permission, approved residual risks, verified and clinically validated functions, human-factors evidence, operational incident handling and a signed release decision. Any exception must be supported by a competent regulatory determination and institutional approval, not a developer assumption.

Priority blockers: owner/manufacturer unknown; qualification and classification unresolved; controlling reference editions unconfirmed; clinical risks and evidence gaps OPEN; authorization and facility deployment evidence absent from this assessment.

Reviewer fields: regulatory specialist **UNASSIGNED / PENDING**; legal/manufacturer owner **UNASSIGNED / PENDING**; facility governance **UNASSIGNED / PENDING**. Decision date, scope, evidence identifiers and signatures: **PENDING**.
