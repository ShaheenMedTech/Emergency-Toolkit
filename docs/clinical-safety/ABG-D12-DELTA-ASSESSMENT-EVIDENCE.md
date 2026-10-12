# D12 Delta Gap & Delta Ratio Published-Evidence Review

Emergency Toolkit v1.3. Prepared and references accessed 2026-10-12.

**D12 product direction: APPROVED. Clinical/laboratory policies: PENDING. Implementation: NOT AUTHORIZED. Release: CLINICAL NO-GO.**

This document separates published evidence, candidate calculation policy and unresolved professional requirements. It approves no formula, reference baseline, eligibility boundary, numerical safeguard or clinical interpretation. Numerical correctness alone does not establish laboratory compatibility or clinical validity.

## 1. Repository verification and preserved documents

Before changes: branch `review/v1.3-phase4a-abg-clinical-safety`; HEAD `c5b166f1b0170e7828f4836769fd41d86b0038cd`. The only working-tree items were the existing untracked D10/D11 evidence documents. Supplied AGENTS.md and Ryoku vault instructions were reviewed; no repository AGENTS.md/CLAUDE.md was found.

| Preserved file | SHA-256 before this review |
| --- | --- |
| [D10 published-evidence policy](ABG-D10-PUBLISHED-EVIDENCE-POLICY.md) | `49e5f5e9b6695aa2dd8b0f16cb44e2a6591294454ef0a57e0c1d2927083444f2` |
| [D11 albumin-correction evidence](ABG-D11-ALBUMIN-CORRECTION-EVIDENCE.md) | `8d779d0b8236e67d37a39c0997aae47d7d1a055aba795c29340a17c3110e7259` |

Read with [Phase 4C decisions](ABG-ANION-GAP-CLINICAL-REVIEW.md) §7, [Phase 4D matrix](ABG-ANION-GAP-VALIDATION-MATRIX.md) VM12–VM17/V12–V14/AC-V04, [Phase 4E readiness](ABG-ANION-GAP-APPROVAL-READINESS.md), [safety specification](ABG-INTERPRETATION-SAFETY-SPEC.md) §4.4/AC09, [clinical decision review](ABG-CLINICAL-DECISION-REVIEW.md) D08/D09 and [mixed-disorders review](ABG-MIXED-DISORDERS-COMPENSATION-REVIEW.md).

Confirmed D12 direction is **APPROVED**: numerical Delta Gap/Delta Ratio calculations only, explicit assumptions/limitations, no automatic mixed-disorder diagnosis/classification, and no implementation before independent clinical/laboratory validation. This does not approve a formula or justify implementing a generic educational ratio. D10 potassium exclusion/no universal interval and D11 optional correction/retained valid uncorrected AG remain as recorded.

Current [acid-base.js](../../js/calculators/acid-base.js) has potassium-excluded AG (396–402), primary labels (411–440) and Winter assessment under its existing gate (462–496), but no delta calculations, baselines, albumin or specimen metadata. This review does not modify that implementation, its thresholds or its existing labels.

## 2. Published evidence and access limitations

IDs below apply only to this document. Sources were accessed on 2026-10-12; abstract/search-index access is not full-study appraisal. Published diagnostic rules are evidence to review, not product behavior selected here.

| ID | Reference, title and publication date | Evidence and limits |
| --- | --- | --- |
| R1 | [Acid-Base Disorders](https://www.merckmanuals.com/professional/nephrology/acid-base-regulation-and-disorders/acid-base-disorders), Merck Manual Professional, reviewed March/updated April 2025 | Calls AG minus normal AG “delta gap,” then adds it to bicarbonate; distinguishes metabolic assessment from respiratory compensation. General professional teaching, not validated local baselines or product approval. |
| R2 | [The delta (delta) gap: an approach to mixed acid-base disorders](https://pubmed.ncbi.nlm.nih.gov/2240729/), Wrenn, Annals of Emergency Medicine 19:1310–1313, November 1990; DOI 10.1016/S0196-0644(05)82292-9 | Published approach compares AG rise with bicarbonate fall using their difference. Indexed abstract available through search; direct page retrieval incomplete. Teaching recommendations require clinical appraisal; no diagnostic thresholds adopted. |
| R3 | [Diagnosis of mixed acid-base disorders in diabetic ketoacidosis](https://pubmed.ncbi.nlm.nih.gov/8238083/), Paulson/Gadallah, American Journal of the Medical Sciences 306:295–300, November 1993; DOI 10.1097/00000441-199311000-00004 | Primary study abstract: 68 controls and 27 DKA admissions without mixed disorders; fixed ratio limits 0.8/1.2 overdiagnosed mixed disorders compared with the authors' regression approach. Neither bands nor alternative difference threshold are approved here. |
| R4 | [Anion gap-bicarbonate relation in diabetic ketoacidosis](https://pubmed.ncbi.nlm.nih.gov/3099570/), Paulson, American Journal of Medicine 81:995–1000, December 1986; DOI 10.1016/0002-9343(86)90394-3 | Primary study indexed abstract: wide prediction interval and volume depletion limited screening utility. Population-specific findings cannot define generic ratio eligibility or safeguards. Direct retrieval incomplete. |
| R5 | [The serum anion gap in the evaluation of acid-base disorders: what are its limitations and can its effectiveness be improved?](https://pubmed.ncbi.nlm.nih.gov/23833313/), Kraut/Nagami, CJASN 8:2018–2024, November 2013; DOI 10.2215/CJN.04040413 | Review abstract/index discusses retained-anion effects and limitations. Full-text access was constrained; no full-text-only claim relied upon. |
| R6 | [AJKD Blog: Test Your Knowledge — Anion Gap in Metabolic Acidosis](https://ajkdblog.org/wp-content/uploads/2014/08/ag-in-metabolic-acidosis-tyk1.pdf), Helbert Rondon; date not printed | Accessible educational explanation: intracellular buffering and urinary acid-anion losses affect delta/delta relation. Not a clinical acceptance truth set. |
| R7 | [Diagnosis and management of metabolic acidosis: guidelines from a French expert panel](https://link.springer.com/article/10.1186/s13613-019-0563-2), SRLF/SFMU, 15 August 2019 | R1.3 supports albumin-corrected AG for acid-load/base-deficit assessment with limited observational evidence. Does not independently validate this product's delta formula/domain or rule-out performance. |

A newer primary study, [The Δ Anion Gap/Δ Bicarbonate Ratio in Lactic Acidosis: Time for a New Baseline?](https://pubmed.ncbi.nlm.nih.gov/39037810/) (2024), is identified for reviewer appraisal because it examines individual versus mean-normal baselines. Direct PubMed retrieval was incomplete and PMC presented a verification barrier. Its findings are not adopted as policy or used to assign a new normal ratio. Full methods/results appraisal remains an evidence task, not a silent assumption.

## 3. Published definitions and terminology — not selected product formulas

Let `AGs` mean the AG selected for delta assessment, `AGref` its compatible reference baseline, `Hobs` the observed bicarbonate measurand and `Href` the selected bicarbonate baseline.

| Quantity | Candidate expression | Unit / terminology issue |
| --- | --- | --- |
| AG increment | `ΔAG = AGs − AGref` | mmol/L; R1 calls this delta gap. |
| Bicarbonate decrement | `ΔH = Href − Hobs` | mmol/L; positive means below the selected baseline, not proof of a metabolic cause. |
| Delta difference | `ΔAG − ΔH` | mmol/L; R2's delta-gap/delta-delta usage. Must not be confused with AG increment. |
| Delta Ratio | `ΔAG / ΔH` | Dimensionless; R3 assesses this relationship. Some sources use “delta-delta” for ratio rather than difference; disclose expression. |
| Reconstructed bicarbonate | `Hobs + ΔAG` | mmol/L; analytical estimate in R1's method, not measured bicarbonate or albumin-corrected AG. Separate scope decision if considered. |

Product owners approved numerical adjunct direction, **not which “Delta Gap” expression to use**. Proposed labels should name the exact quantity. An algebraic shortcut is not a new independent clinical method: for excluded-potassium uncorrected AG and identical Hobs, delta difference simplifies to `Na − Cl − AGref − Href`. That cancellation holds only for those assumptions; it cannot bypass bicarbonate validity/eligibility or disguise hard-coded baselines. Albumin correction adds its own term and dependencies.

## 4. Baseline assumptions and albumin-corrected versus uncorrected AG

Educational values such as AGref 12 and Href 24 mmol/L are illustrative only. A laboratory interval's upper endpoint, population mean and known patient baseline are not interchangeable. Choose and disclose the baseline source/version, potassium convention, specimen/assay and albumin reference. A baseline from a different method or physiological state can bias the result even with exact arithmetic. Do not silently use mean-normal values when individual baseline is unknown, or assume any old patient result is a valid pre-illness baseline.

R7 supports considering albumin-corrected AG for its specified metabolic assessment. Under an approved D11 pathway, valid compatible albumin data may support a corrected AGs when paired with a corresponding corrected reference convention. Corrected and uncorrected baselines must not be mixed. D11 coefficient/Aref/assay/domain/timing remain PENDING; a delta calculation cannot bypass those approvals.

Uncorrected delta arithmetic is mathematically possible but hypoalbuminemia can reduce its numerator and mask excess anions. If a future validated pathway permits it when albumin is unavailable, label it explicitly as uncorrected and disclose unassessed albumin; do not infer normal albumin or diagnostic completeness. Whether such a delta pathway is clinically eligible remains unresolved. If the selected method requires corrected AGs and compatible albumin is missing, delta is unavailable, while independently valid basic AGu remains displayed under D11 product direction. Do not silently switch between corrected and uncorrected numerator/baseline conventions.

## 5. Clinical applicability and limits

Published delta assessment principally concerns an established elevated-gap metabolic acidosis. Numerically positive ΔAG alone does not establish that context: laboratory method, albumin and other influences must be considered. Low bicarbonate alone can reflect a respiratory disorder's renal response. Normal or alkalemic pH can coexist with metabolic acidosis, so pH alone must not exclude applicability either. Clinical/laboratory reviewers must define the supported context and eligibility evidence; the software cannot invent a diagnostic label to enable the ratio.

Relative gap rise and bicarbonate depletion can inform clinicians considering concurrent metabolic processes, but the relation is approximate. R4–R6 describe why acid type, distribution/buffering, urinary acid-anion loss, volume state and time course affect it. Treatment can change both terms. Opposing metabolic processes can mask each other. A preserved bicarbonate baseline may relate to prior metabolic alkalosis or chronic respiratory compensation; delta numbers do not independently distinguish them.

Delta quantities do not assess respiratory compensation. R1 treats that as a separate assessment. A result inside a respiratory compensation estimate cannot exclude another metabolic process; a ratio cannot identify a respiratory disturbance or etiology. Existing E1/E2/E5/E6 demonstrate pending assessment/consistency concerns, not approved diagnoses. D12 numerical-only direction prohibits automatic mixed-process categories, color-coded diagnostic bands or “pure disorder” conclusions.

Application outside established elevated-gap metabolic acidosis, during isolated normal-gap acidosis, with negative AG, bicarbonate at/above baseline, unknown duration/context or unsupported age/specimen requires explicit professional policy. Mathematical availability is not clinical eligibility. Adult evidence cannot approve pediatric/VBG pathways; existing staged non-neonatal scope and separate validation requirements remain intact.

## 6. Proposed numerical safeguards and unavailable states — PENDING

| Input/domain state | Mathematical fact | Candidate policy requiring C/L approval |
| --- | --- | --- |
| `ΔH = 0`, including `ΔAG = 0` | Division by zero undefined; 0/0 also undefined | Ratio unavailable with reason; never Infinity/NaN. Delta difference could remain only if its own prerequisites/applicability are approved. |
| `ΔH < 0` | Quotient can be finite but does not represent ordinary depletion below baseline | Withhold routine ratio output under proposed domain; approve whether any separate arithmetic context is in scope. Do not take absolute denominator or reverse its sign. |
| Small positive `ΔH` | Small input/baseline changes can greatly change ratio | Use clinically/lab justified uncertainty/domain guard; no machine-epsilon-derived clinical threshold, arbitrary floor or silent denominator replacement. |
| `ΔAG ≤ 0` or no established elevated-gap context | Arithmetic may remain finite | No routine elevated-gap delta assessment unless independently validated eligibility policy permits it; no automatic normal-gap diagnosis. |
| Missing baseline/operand/unit or unknown provenance | No reliable selected calculation path | Delta unavailable with specific reason; no default 12/24 or assumed-normal albumin. Preserve original inputs. |
| Inconsistent/flagged/incompatible source or timing | Finite numbers do not prove compatibility | Withhold affected delta outputs under a future approved dependency map; D08/D09 rules remain pending. |
| Extreme finite operands/intermediates, conversion overflow or unsupported assay/domain | Finite output can be misleading; overflow can be nonfinite | Approved domain/flag checks before calculation; unavailable result for failures, no arbitrary clipping/saturation. |

For ratio `N/D`, numerical sensitivity involves both numerator and denominator uncertainty. AGs and ΔH can share Hobs, so their errors are correlated; treating them as independent measurements may misstate uncertainty. Original specimen/report resolutions and baseline uncertainty must be reviewed. A difference has no division hazard but retains baseline/source uncertainty and clinical eligibility requirements. A difference result must not be used as a workaround when ratio prerequisites fail.

## 7. Independent numerical examples and boundary evidence

All values are synthetic mathematical anchors, not clinical categories, approved baseline values or new executable tests. Electrolytes, AG and delta difference are mmol/L; ratio is dimensionless. Unless stated, use illustrative AGref 12/Href 24 and uncorrected excluded-potassium AG.

| ID | Independent calculation / family | Evidence purpose |
| --- | --- | --- |
| Z01 | Na 140, Cl 100, Hobs 12: AG 28; ΔAG 16; ΔH 12; difference 4; ratio 4/3; reconstructed H 28 | Distinguish all quantities and labels. |
| Z02 | Same inputs, AGref 8: ΔAG 20; difference 8; ratio 5/3. Href 22 with AGref 12: ΔH 10; difference 6; ratio 8/5 | Baseline sensitivity without changing patient inputs. No diagnostic classification. |
| Z03 | Na 140, Cl 110, Hobs 20: AGu 10. Illustrative D11 correction with Aref 4/A 2 g/dL and coefficient 2.5 gives AGc 15. With AGref 12/Href 24: uncorrected ratio −2/4 = −0.5; corrected ratio 3/4 = 0.75 | Correction/convention changes numerator; example does not establish eligibility or approve either ratio. |
| Z04 | Na 140, Cl 100, Hobs 24: AG 16; ΔAG 4; ΔH 0 | Ratio undefined; difference 4 mathematically. Review separate eligibility/output rules. |
| Z05 | Na 140, Cl 104, Hobs 24: AG 12; ΔAG 0; ΔH 0 | 0/0 undefined; not ratio zero or evidence of absent disease. |
| Z06 | Na 140, Cl 100, Hobs 26: AG 14; ΔAG 2; ΔH −2; quotient −1; difference 4 | Negative denominator is outside proposed routine depletion domain despite finite math. |
| Z07 | Na 140, Cl 100, Hobs 23.99: AG 16.01; ΔAG 4.01; ΔH 0.01; ratio 401; difference 4 | Tiny denominator magnification; 0.01 is illustrative, not approved safeguard. |
| Z08 | Na 140, Cl 108, Hobs 20: AG 12; ΔAG 0; ΔH 4; ratio 0; difference −4 | Ratio zero does not authorize diagnosis or routine elevated-gap eligibility. |
| Z09 | 140/105/21.15: exact AG 13.85; ΔAG 1.85; ΔH 2.85; exact ratio 37/57; difference −1 | Preserve exact math versus current binary/one-decimal gap display; do not derive delta from rounded AG. |
| Z10 | Future approved numerator/denominator guards, input/result bounds, timing/profile/age/reference boundaries | Below/at/above and ties, exact decimals/adjacent binary values, both denominator signs, signed zero, high/low albumin and eligible/ineligible context. Undefined policies cannot be invented for tests. |
| Z11 | Missing/invalid/overflow/underflow/unit-invalid operands or baselines; unknown sample/assay/time; flagged inputs; correction unavailable; extreme finite values | Approved reason-specific unavailable behavior and dependency independence from valid basic AGu. |
| Z12 | Populated delta → edit any operand/baseline/unit/albumin/source/time → unavailable → corrected explicit recalculation; reset/reopen | No stale numbers or labels; preserve inputs; neither automatic recalculation nor automatic diagnosis. |
| Z13 | Clinically coherent elevated-gap, normal-pH/alkalemic mixed, isolated respiratory/normal-gap, treatment evolution and unsupported age/sample cases | C/L independently determine eligibility/limitations. Existing fixtures are historical snapshots, not clinical truth. |

Use independent rational/decimal arithmetic over original strings, a second evaluator and literal precomputed values. Do not use production output to generate expected values. Each future fixture must contain formula and AG convention, baseline provenance, albumin dependency, unit/profile/age/specimen/time metadata, validity/eligibility state, raw/display/unavailable expectations, uncertainty, policy version and reviewers. Numerical error bounds and clinical uncertainty tolerances require separate justification under D16. No code or test changes occur here.

## 8. Proposed numerical-only interface

Candidate wording is **not professionally approved**:

- “Anion Gap increment (ΔAG): [value] mmol/L — [corrected/uncorrected] AG minus selected reference.”
- “Bicarbonate decrement (ΔHCO₃): [value] mmol/L — selected baseline minus observed [measurand].”
- If selected: “Delta Gap (difference): [value] mmol/L — ΔAG − ΔHCO₃.” If increment terminology is chosen instead, name that explicitly and do not reuse one label for both quantities.
- “Delta Ratio: [value] (unitless) — ΔAG / ΔHCO₃.”
- “Delta assessment unavailable — [missing baseline / incompatible specimen / uncertain applicability / denominator outside validated domain].”

Display selected AG convention, formula, actual baseline values/source/version, bicarbonate source and applicable correction assumptions. Draft limitation: “Numerical adjunct only. These calculations do not diagnose or classify mixed acid–base disorders or establish whether respiratory compensation is appropriate. Baselines, albumin and specimen compatibility affect the values.” No diagnostic bands, treatment suggestions or “normal/pure/mixed” classifications follow from the number. Labels must distinguish unassessed from normal; valid uncorrected AG must not disappear solely because a delta prerequisite is missing.

## 9. Disagreements and unresolved requirements — all PENDING

| Issue | Evidence-supported concern | Required professional decision |
| --- | --- | --- |
| Terminology | R1 delta gap is increment; R2 uses difference; delta-delta may mean ratio | Choose names/exact expressions and disclosed units; no silent substitution. |
| Baselines | Teaching normal values, local interval endpoints and patient baselines differ; recent baseline study needs appraisal | Select justified AGref/Href provenance and unknown-baseline behavior for each supported path. |
| Fixed diagnostic bands | R3 questions fixed 0.8/1.2 ratio rules; R4–R6 expose physiological variability | Do not import any band; numerical-only direction remains. Approve eligibility and limits, not automated diagnosis. |
| Albumin | Corrected numerator may improve acid-load assessment under R7 but D11 parameters/domain remain unapproved | Specify corrected versus uncorrected pathways and compatible baselines; independently validate any missing-albumin pathway. |
| Numerical safeguards | Division hazards are mathematical facts; useful clinical domain/uncertainty are not specified by those facts | Approve zero/near-zero/negative handling with local measurement and baseline evidence. |
| Specimen/population | Chemistry/gas source, timing, assay, intervention, age and chronic respiratory context affect applicability | Obtain local evidence and independent clinical review; no universal pairing/age/domain assumptions. |

## 10. Independent review and implementation authorization gates

Clinical owner: emergency/critical-care physician with nephrology/acid–base expertise. Laboratory owner: clinical biochemistry/laboratory medicine lead, plus POCT lead for gas/whole-blood paths. Pediatric specialist required for included children. Engineering verifies math/conformance; intended-user/usability reviewer assesses comprehension. No named reviewer, approval date or signed approval record is assigned.

| Gate | Required closure evidence | Roles / current status |
| --- | --- | --- |
| A1 / scope and applicability | Signed intended-use, age/specimen paths/exclusions and eligibility evidence; clarify delta assessment without diagnostic classification | Clinical/lab owners, relevant specialists — PENDING |
| A2 / definitions and baselines | Exact formulas/names/units, selected AG convention and reference/bicarbonate baseline provenance; corrected/missing-albumin policy tied to D10/D11 | Clinical/lab owners — PENDING |
| A3 / compatibility and domain | Intended-method IFUs/local paired reports, units, uncertainty/correlation model, timing and numerical guards; affected-result/unknown-context map under D08/D09 | Clinical/lab/POCT, E mathematical review — PENDING |
| A4 / independent validation | Z01–Z13 and Phase 4D V12–V14/VM12–VM17 with second independent computation, clinically reviewed eligible/ineligible truth set and lab compatibility evidence | Clinical/lab owners, pediatric reviewer as applicable; E — PENDING |
| A5 / communication and precision | Signed raw/display semantics, specific unavailable wording, explicit assumptions/limitations, no diagnostic classification and intended-user/residual-risk review | Clinical/lab owners, E/U — PENDING |
| A6 / scoped authorization | Close applicable Phase 4D AC-V01–AC-V07 and obtain separate explicit AC-V08 implementation permission with specification/evidence versions and verification plan | Authorized implementation owner after professional validation — NOT AUTHORIZED |

Review order: resolve D10/D11 source and validity dependencies and intended population first; review formula/baseline and domain together; then independent clinical/lab evidence, precision and UI; finally seek explicit authorization. D12 cannot inherit clinical validation from correct AG arithmetic or albumin conversion. Software testing cannot approve baseline meaning, applicability, compatibility, guard thresholds or residual risk.

Release additionally requires approved implementation conformance, required engineering/browser/usability evidence, final clinical/laboratory residual-risk acceptance and separate D17/D18 release authorization. No gate closes merely because this evidence document exists. Explicit feature/path deferral requires professionally reviewed unavailable behavior and cannot waive an included pathway's prerequisites.

## 11. Documentation validation and outcome

Check links, exact example arithmetic, citation/access limitations, status distinctions, D10/D11 preserved hashes and repository change scope. Only `docs/clinical-safety/ABG-D12-DELTA-ASSESSMENT-EVIDENCE.md` is created, untracked/uncommitted. No existing document, calculator, test or workflow is modified; no executable tests are run. No commit, push, merge, rebase or change to `main` is performed.

Remaining blockers: unselected formulas/baselines, unvalidated corrected/uncorrected eligibility, local specimen/assay/timing evidence, clinically justified numerical guards, population-specific truth sets, reviewed labels/uncertainty and absent signed professional/authorization records.

**D12 product direction: APPROVED. Clinical/laboratory policies: PENDING. Implementation: NOT AUTHORIZED. Release: CLINICAL NO-GO.**
