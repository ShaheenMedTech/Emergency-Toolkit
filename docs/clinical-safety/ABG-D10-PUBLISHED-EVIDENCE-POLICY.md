# D10 Published-Evidence Policy Review

Emergency Toolkit v1.3. Prepared and references accessed 2026-10-12.

**D10 product direction: APPROVED. D10 clinical/laboratory policy: PENDING. Implementation: NOT AUTHORIZED. Release: CLINICAL NO-GO.**

Published evidence supports a proposed safety approach; it does not establish an intended laboratory's rules or independent clinical approval. All proposed wording, numerical validity rules, intervals, specimen compatibility and workflow details remain subject to professional approval. No calculator, test or workflow changes are authorized here.

## 1. Repository verification, scope and existing decisions

Before changes: branch `review/v1.3-phase4a-abg-clinical-safety`; HEAD `c5b166f1b0170e7828f4836769fd41d86b0038cd`; working tree clean. Supplied AGENTS.md and Ryoku vault instructions were reviewed; no repository AGENTS.md/CLAUDE.md was found. This phase creates only this document and preserves all committed records. No commit, push, merge, rebase or change to `main` is performed.

Read with [Phase 4C review and decisions](ABG-ANION-GAP-CLINICAL-REVIEW.md) §7, [Phase 4D matrix](ABG-ANION-GAP-VALIDATION-MATRIX.md) VM01/VM02/VM05–VM11/VM15–VM17, [Phase 4E readiness](ABG-ANION-GAP-APPROVAL-READINESS.md), [safety specification](ABG-INTERPRETATION-SAFETY-SPEC.md) AC07–AC14, [Stage 1 preparation](ABG-STAGE1-VALIDATION-PREPARATION.md), [clinical decision review](ABG-CLINICAL-DECISION-REVIEW.md) D08/D09/D13 and [numerical evidence](ANION-GAP-NUMERICAL-TESTS.md).

Confirmed D10 product direction remains: potassium-excluded AG, numerical results with units and formula disclosure, no universal interval, future laboratory-specific intervals, and no claim that a normal uncorrected gap excludes important metabolic acidosis. This review does not reopen that direction or approve D11 correction/D12 delta parameters. Their existing product directions and professional-policy status remain unchanged.

Current [acid-base.js](../../js/calculators/acid-base.js) labels Na/Cl/HCO₃ in mmol/L (lines 67–125), requires all six fields through Number/range validation (333–389), calculates `Na − (Cl + HCO3)` and displays one decimal (396–402). It has no output unit/formula disclosure, reference profile, albumin or specimen/time metadata. Accepted operands permit gaps from −160 to 179; these are software-domain observations, not clinical limits.

## 2. Published evidence register

Source identifiers are specific to this document. Accessible abstracts are distinguished from full-text review. Published intervals and thresholds below are evidence examples only, never universal product defaults. All links were accessed on 2026-10-12.

| ID | Title, source and date | Evidence and access limitations |
| --- | --- | --- |
| R1 | [The fall of the serum anion gap](https://pubmed.ncbi.nlm.nih.gov/2302006/), Winter et al., Archives of Internal Medicine 150:311–313, February 1990 | Primary study, indexed abstract: excluded-potassium serum gap on Beckman ASTRA; a lower interval in one laboratory associated primarily with chloride measurement shift. Older instrumentation, not present-method verification. |
| R2 | [The serum anion gap. Has the reference interval really fallen?](https://pubmed.ncbi.nlm.nih.gov/9199620/), Roberts and Johnson, Archives of Pathology & Laboratory Medicine 121:568–572, June 1997 | Primary method comparison, indexed abstract/search-accessible text: excluded-potassium Na−Cl−total CO₂ intervals differed among three chemistry analyzers. Full article not appraised; page retrieval was intermittent. |
| R3 | [Serum anion gap revisited: a verified reference interval for contemporary use](https://pubmed.ncbi.nlm.nih.gov/34028972/), Chionh et al., Internal Medicine Journal 52:1531–1537, September 2022; DOI 10.1111/imj.15396 | Primary study, accessible abstract: 284 health-screening participants, excluded-potassium interval 10–18 mmol/L; authors limit transfer to labs with similar electrolyte intervals. Does not establish universal modern-analyzer interval or pediatric applicability. |
| R4 | [Evaluating a low anion gap: A practical approach](https://escholarship.org/content/qt6qp590tq/qt6qp590tq_noSplash_27658a7c634e815166ca41217ab6f07d.pdf), Haber et al., Cleveland Clinic Journal of Medicine 90:619–623, October 2023; DOI 10.3949/ccjm.90a.23035 | Full published review via university repository; journal-host fetch failed. Discusses repeat confirmation, protein/cation and analytical causes. Its low-gap threshold/interval are teaching conventions, not local policy. |
| R5 | [Data on the clinical, analytical, and laboratory factors associated with negative anion gaps at an academic medical center](https://pubmed.ncbi.nlm.nih.gov/35757515/), Laakman et al., Data in Brief 43:108357, published 6 June 2022; DOI 10.1016/j.dib.2022.108357 | Primary retrospective study, abstract: approximately 2.95 million specimens across chemistry/gas/POCT methods; describes clinical and analytical associations with negative gaps. Single-center associations are not causal diagnoses or universal frequencies. PMC full text had a verification barrier; no full-text-only statistic used. |
| R6 | [Estimation, prevention, and quality control of carbon dioxide loss during aerobic sample processing](https://pubmed.ncbi.nlm.nih.gov/6793263/), Bandi, Clinical Chemistry 27:1676–1681, October 1981 | Primary processing study, accessible abstract: CO₂ loss during serum handling, affected by filling and air exposure. Historical procedures support handling risk, not a modern local timing allowance or correction factor. |
| R7 | [Acid-Base Disorders](https://www.merckmanuals.com/professional/nephrology/acid-base-regulation-and-disorders/acid-base-disorders), Merck Manual Professional, reviewed March/updated April 2025 | Professional reference: excluded-potassium formula, calculated gas versus measured chemistry bicarbonate and mixed-disorder limitations. Not a local laboratory protocol. |
| R8 | [i-STAT CG8+ IFU ART-784173-00A](https://www.globalpointofcare.abbott/content/dam/ardx/globalpointofcare/apoc/support/i-stat-1/cti-ifu/english-us/ifu/ART-784173-00A.pdf), Abbott, 31 July 2025, US labeling, pp. 3–4 | Primary manufacturer example: HCO₃ and TCO₂ calculated from gas measurements and method-specific temperature conventions. Not the hospital analyzer or a complete AG panel; not evidence that locally entered chloride is compatible. |
| R9 | [Bicarbonate](https://pathology.royalcornwallhospitals.nhs.uk/viewTest.php?ID=183), Royal Cornwall Hospitals laboratory directory, updated 03-05-2024 | Identifies chemistry bicarbonate as total CO₂; comments favor arterial gas for acid–base status. Local directory, not transferable method-performance evidence. |
| R10 | [Anion Gap](https://www.nbt.nhs.uk/severn-pathology/requesting/test-information/anion-gap), North Bristol NHS laboratory directory, revision date not visible | Serum interval 3–11 mmol/L; equation unspecified. Its potassium convention cannot be inferred. |
| R11 | [Anion gap](https://pathology.uhsussex.nhs.uk/pug/biochemistry-immunology/biochemistry-tests/126-anion-gap), University Hospitals Sussex laboratory directory, updated 24 December 2025 | Explicit potassium-inclusive equation, clotted-blood specimen and interval 10–20 mmol/L. Not automatically compatible with selected excluded-potassium AG. |

## 3. Evidence-supported facts and their limits

### Formula, units and reference variation

Selected equation: **AGuncorrected = Na − (Cl + HCO₃)**, with potassium excluded (R7; confirmed product direction). For Na, Cl and HCO₃, monovalent mmol/L and mEq/L are numerically equivalent; declare the unit anyway. The result should identify uncorrected status and potassium convention. Albumin mass units are not electrolyte units. There is no basis for inserting a nominal potassium or converting to an inclusive gap by assumption.

R2's compared intervals were 5–10 mmol/L (Synchron CX3), 9–14 (Hitachi 717) and 8–13 (Vitros 950), demonstrating method-dependent variation with the same excluded-potassium expression. R1's lower gap with changed chloride measurement and R3's 10–18 contemporary interval show that neither historical intervals nor a blanket “modern ISE means low gap” rule is reliable. These findings motivate local verification, not selection of one published interval. R10/R11 additionally show differing laboratory conventions. Reference interval, clinical decision threshold and individual baseline are different quantities.

### Chemistry total CO₂ versus gas bicarbonate

Chemistry-panel total CO₂ includes bicarbonate and other CO₂ species; it commonly serves as the reported bicarbonate surrogate (R9). Gas actual HCO₃ is calculated from pH/PCO₂ (R7/R8). Standard bicarbonate is a different calculated quantity and must not silently replace actual HCO₃. R8 also calculates gas TCO₂: the label “TCO₂” alone does not prove an independently measured chemistry result.

A mathematically recomputed gas value is coupled to its pH/PCO₂ inputs, not an independent physiological measurement. Combining chemistry Na/Cl with gas HCO₃ needs a separately approved compatibility pathway. A chemistry reference interval does not automatically apply to a gas-derived gap. Discrepancy requires source/method/report and handling review; a universal equality or numerical difference allowance is not established here.

R7 prefers measured chemistry bicarbonate in a discrepancy; R9 cautions about serum total-CO₂ reliability and favors arterial gas for overall acid–base status. These statements address differing purposes; **the local source preference remains unresolved**. Reviewers must use actual paired-method evidence rather than silently select the more convenient source.

### Provenance, timing and low/negative/extreme results

Specimen identity, collection/analysis time, treatment between draws, gas sampling site, serum/plasma/whole-blood method and handling all participate in compatibility. R6 demonstrated processing-related CO₂ losses; if the entered total CO₂ is spuriously low, subtraction increases AG mathematically. The study does not justify an input adjustment, universal collection-time window or extrapolation to current methods. Gas and chemistry observations at different times cannot be deemed compatible merely because the resulting numbers fit a reference interval.

R4 emphasizes confirmation of unexpected low results and describes hypoalbuminemia, unmeasured cations, positively charged proteins, chloride overestimation and sodium underestimation. Chloride interference can conceal an elevated-gap process; a low gap is not proof of absent acidosis. R5 documents both analytical and clinical associations with negative gaps. Negative arithmetic is therefore neither automatically an invalid calculation nor a standalone disease diagnosis. Published evaluations support professional verification/review; the calculator must not silently clamp a negative value to zero or discard its sign.

R4's teaching low-gap threshold does not establish a local trigger. A low gap needs an applicable reference; a mathematically negative gap is simply less than zero. No universal extreme-gap accept/reject bound is established by these sources. Extreme results may reflect severe disease, reporting/input error or interference; local analytical measuring ranges and clinical review are required. Current gaps −160/179 are permitted mathematical combinations only. A correct numerical result, normal pH or expected respiratory compensation does not prove clinical validity or exclude other metabolic processes. Albumin correction remains a separate D11 approval dependency.

## 4. Evidence-supported policy proposal — NOT APPROVED CLINICALLY

These proposed rules follow the evidence but **are not local policies or implementation instructions**. Exact validity, compatibility, warning and retained-output decisions require C/L approval in section 7.

| Proposal | Evidence basis | Proposed safe behavior | Unresolved decision |
| --- | --- | --- | --- |
| PP1 / transparent arithmetic | R7; product direction | Label numerical result “Uncorrected Anion Gap (potassium excluded)”, disclose Na−(Cl+HCO₃), and show declared units. | Approved units/schema, rounding and source-specific presentation. |
| PP2 / no universal interval | R1–R3/R10/R11 | Without an approved matching lab profile, provide no high/normal/low category, color band or default interval; state reference comparison unavailable. | Future profile fields, verification/versioning, comparison scope and stale/mismatched-profile handling. |
| PP3 / distinguish measurands | R7–R9 | Identify chemistry measured TCO₂ versus gas actual HCO₃; do not silently substitute standard HCO₃ or calculated gas TCO₂. | Allowed method/specimen combinations and separate input/report linkage. |
| PP4 / uncertainty visible | R4–R6 and existing D08/D09 direction | Retain original entries; unknown method/time/provenance cannot be treated as validated or consistent. Explain unavailable compatibility assessment. | Whether arithmetic remains visible when provenance is unknown versus withholding it; dependencies and warning text. |
| PP5 / preserve signed findings | R4/R5 | Preserve signed arithmetic; recommend professional confirmation/review of unexpected results rather than automatically diagnosing an artifact or disease. | Low/extreme triggers, clinical action wording, warning versus blocking, lab flags and valid domains. |
| PP6 / disclose interpretation limits | R4/R7; product direction | Do not claim a normal uncorrected gap excludes acidosis; disclose missing albumin and incomplete mixed-process assessment. Basic AG does not require albumin under D11 direction. | Reviewed wording/placement, population scope and integration with D02–D09/D13. |

### Proposed behavior when laboratory metadata are unavailable

Distinguish missing reference metadata from unknown input provenance. The following is a candidate dependency model for approval; **no unconditional arithmetic fallback is approved**.

| Input/metadata state | Proposed output | Approval question |
| --- | --- | --- |
| Valid, compatible operands established; matching interval/profile unavailable | Uncorrected numerical arithmetic may remain visible with units/formula, explicit “laboratory reference comparison unavailable” and limitations; no categorization. | C/L must define how compatibility is established and approve this retained-output path. |
| Unit, bicarbonate measurand, specimen linkage or timing unknown | Withhold clinical/reference conclusions and explain unverified provenance. Whether a clearly marked arithmetic-only value may remain visible requires an explicit approved independent prerequisite path. | Select display versus withholding of arithmetic; do not infer missing metadata or silently call it normal. |
| Required operand missing, nonfinite, unsupported unit or affected by an approved inconsistency rule | No usable dependent result; clear affected prior outputs, preserve entries and show specific recovery/verification explanation. | Validity domains and dependency map; reconcile D08/D09/D13. |
| Valid inputs but unexpected signed/large result | Preserve signed value under an approved domain; indicate appropriate professional verification without etiologic diagnosis. | Approve warning/block/repeat wording and triggers; no source threshold automatically adopted. |

## 5. Unresolved clinical/laboratory questions — all PENDING

1. Which intended laboratories, analyzers/assays/software/report fields and populations are supported? Obtain applicable current IFUs, QC/bias/precision, measuring ranges and specimen procedures. Adult ABG/VBG/pediatric/chemistry paths cannot inherit one another's approval; existing non-neonatal staged scope remains as recorded, not clinically approved here.
2. Which bicarbonate measurand and electrolyte sources are compatible for each output? Resolve R7/R9 context difference with local paired reports; specify actual/standard/calculated-TCO₂ exclusions, temperature conventions and units.
3. What same-patient/report linkage, collection/analysis pairing, handling and intervening-treatment rules apply? No timing window or discrepancy allowance is invented.
4. Which local excluded-potassium interval is verified for each profile, if reference comparison is included? No universal interval, no automatic inclusive-to-exclusive conversion and no diagnosis from interval alone.
5. What input/result domains, lab flags and low/negative/extreme workflow are justified? Rejecting every negative result or accepting every finite result is not validated by publications.
6. Which missing/unverifiable states permit numerical arithmetic, and which withhold it? Specify each independent dependency path and retain original strings; missing albumin must not block the basic calculation solely by absence.
7. What numerical/reporting precision, signed-zero and boundary semantics are approved under D16? Mathematical error allowance is not clinical uncertainty or significant-inconsistency tolerance.
8. What exact warning/limitation wording and residual risks are acceptable? No automatic etiologic or mixed-disorder diagnoses; D11/D12 parameters remain outside D10 approval.

## 6. Independent numerical and boundary evidence required

The following anchors are independently derived arithmetic, not approved physiological examples or executable changes. Electrolytes and gaps use mmol/L. Future test expectations must separate exact math, current binary/display behavior and professionally approved validity/output state.

| Case | Independent numerical anchor or required cases | What must be reviewed |
| --- | --- | --- |
| T01 / convention | 140−(104+24)=12; measured K=4 would give inclusive 16 | Selected formula, unit-equivalent input pairs and incompatible inclusive profile; no assumed K. |
| T02 / source sensitivity | Na 140, Cl 105: entered chemistry TCO₂ 24 gives 11; entered gas HCO₃ 22 gives 13 | Mathematical difference 2 does not approve interchangeability or discrepancy threshold. Add actual paired local reports. |
| T03 / handling sensitivity | Na 140, Cl 105, total CO₂ 24→20 changes gap 11→15 | Synthetic subtraction example, not a processing correction or extrapolation of R6. |
| T04 / signed/zero | 80−(80+1.25)=−1.25; 140−(119+21)=0 | Negative/zero display and reviewed verification behavior; no clamping or absolute value. |
| T05 / software extrema | 80−(180+60)=−160; 220−(40+1)=179 | Current operand endpoints only; need independent justification for future domain, clinical severe cases and lab artifacts/flags. |
| T06 / decimal/binary | 140−(105+21.15)=13.85 exactly; current binary 13.849999999999994 displays 13.8; neighboring input in existing numerical evidence displays 13.9 | Preserve raw versus display distinctions; approve tie/digits/signed-zero policy separately. |
| T07 / future boundaries | Below/at/above every subsequently approved input/result bound, profile endpoint, timing/discrepancy threshold; exact decimal and adjacent binary values | Do not create arbitrary boundaries to complete a test list; record inclusivity and reporting uncertainty. |
| T08 / invalid/lifecycle | Each operand blank, whitespace, zero, negative, nonnumeric, nonfinite, overflow/underflow, unsupported/unknown unit, missing profile and flagged source | Approved validity/dependency states, no stale results, input preservation, explicit recalculation, edit/change/reset/reopen and recovery. |
| T09 / provenance | Different patients/specimens, adult ABG versus peripheral/central VBG, serum/plasma/whole-blood, different methods/times, unknown age/source and intervention between samples | Local compatible/incompatible/unverifiable truth set; no arithmetic-only proof of sample compatibility. |
| T10 / clinical limitations | Lab-confirmed low/negative, suspected interference, hypoalbumin, clinically coherent normal-pH/alkalemic mixed cases and valid severe results | C/L must review outcomes and limitations independently; baseline E1/E2/E5/E6/E9 are snapshots, not accepted diagnoses. |

Use independent integer-rational/decimal references over original strings plus a second evaluator, not production-generated expected values. Existing [rational oracle](../../tests/helpers/abg-numerical-reference.js) and [gap regression vectors](../../tests/abg-anion-gap-numerical-test.js) provide mathematical preparation only. Each future case needs source/profile/age/time metadata, exact selected policy/version, expected raw/display/unavailable states, calculation precision and named clinical/laboratory review. Published evidence and software tests cannot approve specimen compatibility, local intervals or safe clinical workflow.

## 7. Reviewer roles and proposed acceptance criteria

C = responsible emergency/critical-care clinical owner with nephrology/acid–base expertise. L = laboratory medicine/clinical biochemistry lead; POCT lead where relevant. Pediatric specialist required for included non-neonatal children. E verifies computation/conformance; usability reviewers evaluate qualified-user comprehension. These are roles only: no named approver, approval date or approval record is assigned.

| Gate | Required closure evidence | Required role / status |
| --- | --- | --- |
| A1 / scope and source | Signed intended-use/population/profile scope; local analyzer/report/IFU and paired-method evidence; resolved bicarbonate-source and provenance rules | C/L/POCT, pediatric specialist as applicable — PENDING |
| A2 / D10 specification | Exact units/schema, compatible pathways, domains/flags, negative/extreme actions, unknown-metadata/retained-arithmetic dependency map, formula/units and limitation wording | C/L; E/U for conformance/readability — PENDING |
| A3 / profile policy | If comparison included, verified excluded-potassium local intervals with method/specimen/age/version applicability and unavailable-profile behavior; explicit deferral otherwise | L/C/POCT — PENDING |
| A4 / independent evidence | T01–T10 and Phase 4D relevant V/VM rows traced to signed policies; second mathematical evaluation, local boundary/uncertainty cases and reviewed clinical limitations | C/L/POCT, relevant specialists; E — PENDING |
| A5 / reporting and residual risk | D16 raw/display semantics, intended-user review, missing-albumin/no-rule-out wording and accepted residual risks; reconcile D01/D08/D09/D13 | C/L/E/U — PENDING |
| A6 / authorization | Meet applicable Phase 4D AC-V01–AC-V07 and record exact scoped implementation permission separately under AC-V08; source appraisal alone is insufficient | Authorized implementation owner after professional sign-off — NOT AUTHORIZED |

Release additionally needs implementation conformance, required automated/browser and usability evidence, professional residual-risk acceptance and separate D17/D18 release authorization. Neither publication appraisal nor A1–A5 approval would itself authorize production implementation or release.

Priority blockers: identify local methods/reviewers and specimen/measurand scope first; then approve validity/metadata/negative-extreme workflows and reporting semantics; obtain profile verification if used; complete independent clinically reviewed evidence and communication review; finally seek separate authorization. Local method data, signed clinical/laboratory policies and independent acceptance records are still absent.

## 8. Documentation validation and outcome

Check relative links, citation dates/access limitations, exact numerical anchors, status distinctions and repository change scope. Existing documents remain unchanged. No production/test/workflow files or executable suites are changed/run. Only `docs/clinical-safety/ABG-D10-PUBLISHED-EVIDENCE-POLICY.md` is added, untracked and uncommitted.

**D10 product direction: APPROVED. D10 clinical/laboratory policy: PENDING. Implementation: NOT AUTHORIZED. Release: CLINICAL NO-GO.**
