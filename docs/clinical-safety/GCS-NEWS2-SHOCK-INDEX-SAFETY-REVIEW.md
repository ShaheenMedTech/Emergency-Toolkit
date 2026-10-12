# GCS, NEWS2 and Shock Index clinical safety review — Phase 2D

Document ID: GNS-SAF-001 · Version: 1.0 DRAFT · Review date: 2026-10-12.
Baseline: `d434027bff3b183e57f7817ae4946b0e0b222e71`, branch `docs/v1.3-clinical-governance`, clean working tree before review. Supplied instructions and Ryoku vault read; no additional repository or ancestor AGENTS.md/CLAUDE.md found in the checked paths.

**Candidate functions only. Product-owner and clinical decisions for these functions: PENDING. Clinical implementation: NOT AUTHORIZED. Clinical release: NO-GO.** This document does not approve source selection, licensing, clinical validation, regulatory authorization, numerical limits or a limited release. No application, warning or test changes are made. Existing ABG product approvals and pending Infusions pharmacy decisions remain unchanged.

## 1. Scope and evidence boundary

Reviewed complete [GCS](../../js/calculators/gcs.js), [NEWS2](../../js/calculators/news2.js) and [Shock Index](../../js/calculators/shock-index.js) implementations, [calculator accuracy tests](../../tests/calculator-accuracy-test.js), [result-safety tests](../../tests/result-safety-test.js), [structural smoke test](../../tests/smoke-test.py), [clinical evidence matrix](../clinical-governance/CLINICAL-EVIDENCE-MATRIX.md) E01–E03, [intended-use draft](../clinical-governance/INTENDED-USE.md), [risk register](../clinical-governance/RISK-REGISTER.md) H03/H04/H08/H10–H12 and [V&V plan](../clinical-governance/VERIFICATION-VALIDATION-PLAN.md). The three functions are candidates for qualified emergency physicians in Saudi emergency departments; no approved population, local response pathway or clinical truth set was found.

Distinguish four layers throughout: **repository behavior** (source/tests), **published guidance/evidence** (sources below), **proposed verification/control requirements** (not approved), and **professional/product decisions** (PENDING). Current test expectations are behavioral contracts, not signed clinical requirements. A mathematically correct score does not establish reliable measurement, valid applicability or a safe response. No patient data, patient-care trial or independent clinician adjudication was used.

## 2. Current implementation inventory

### GCS — E01

Source: `gcs.js` radio choices lines 78–194, reset 244–258, close/focus 266–348, backdrop 354–363, input/change and calculation 366–477.

| Component | Current selectable scores and labels |
| --- | --- |
| Eye | 4 Spontaneous; 3 To speech; 2 To pain; 1 None; NT Not testable |
| Verbal | 5 Oriented; 4 Confused; 3 Inappropriate words; 2 Incomprehensible sounds; 1 None; NT Not testable |
| Motor | 6 Obeys commands; 5 Localizes pain; 4 Withdraws from pain; 3 Abnormal flexion; 2 Extension; 1 None; NT Not testable |

All groups start unselected. `input` clears total/breakdown/message; `change` clears then automatically recalculates. Missing any component produces `—`, the available component selections and “Select all three components.” Only after all three are selected does any NT produce total `NT`, retain all selections in the breakdown and explain why a total cannot be calculated. There is a verbal-only explanation when eye and motor are numeric, otherwise a generic NT explanation. NT is not imputed as zero or one.

For numeric choices, `Number(E)+Number(V)+Number(M)` gives an integer 3–15 and a separate E/V/M breakdown. Total 15 returns “Maximum GCS score: 15/15.” Totals 13–14 return “Mild impairment • GCS 13–15”; 9–12 “Moderate impairment • GCS 9–12”; 3–8 “Severe impairment • GCS ≤8”. These are actual labels, not approved severity classifications for all etiologies. No treatment recommendation, pupil score, age adjustment or longitudinal trend is calculated.

Radio markup constrains ordinary choices, but the calculation has no explicit membership, finite-number or integer checks for corrupted/injected radio values. There are no fields for NT reason, patient identity, observation time, sedation, language, examination reliability, baseline or pediatric adaptation. Reset unchecks every radio and clears all outputs. Close button/Escape remove the keyboard handler and restore previous focus. Backdrop dismissal bypasses that cleanup (F01). Opening again while already open has no existing-modal guard; duplicate IDs are possible by direct repeated invocation, with real-DOM consequences still to verify.

### NEWS2 — E02

Source: `news2.js` controls 36–241, lifecycle 283–402, clear/scoring helpers 414–509, calculation/validation 516–583, outputs/escalation 586–675.

| Input | Unit / choices | Inclusive software range / HTML step | Initial/reset state |
| --- | --- | --- | --- |
| Respiratory rate | breaths/min | 1–80 / 1 | Empty |
| SpO₂ | % | 50–100 / 1; explicit integer check | Empty |
| Systolic pressure | mmHg | 30–300 / 1 | Empty |
| Pulse | bpm | 20–250 / 1 | Empty |
| Temperature | °C | 30–45 / 0.1 | Empty |
| SpO₂ scale | 1 standard; 2 target 88–92% | Select, no enum validation in calculation | 1 |
| Supplemental oxygen | Air=0; oxygen=2 | Select; only string `2` means oxygen | Air |
| Consciousness | Alert=0; New confusion / CVPU=3 | Select converted with `Number()`, no enum validation | Alert |

All five numerical observations are required. `Number()` parsing plus finite/inclusive-range checks reports the first invalid field and clears total, risk text and five component displays; inputs remain. Blank/whitespace becomes zero and is rejected. Fractional SpO₂ is rejected with an explicit whole-percentage warning. Other numeric fields accept fractions despite HTML steps, including temperature finer than 0.1. The click handler does not invoke HTML validity checks. These bounds and granularity choices have no clinical approval record and are not reference intervals.

The following is a **code inventory**. Intervals use continuous inequalities to expose actual fractional handling; they are not a newly selected clinical scoring specification.

| Component | Implemented points by interval (within accepted inputs) |
| --- | --- |
| Respiratory rate | ≤8:3; (8,11]:1; (11,20]:0; (20,24]:2; >24:3 |
| SpO₂ scale 1, integers | ≤91:3; 92–93:2; 94–95:1; ≥96:0 |
| SpO₂ scale 2, integers | ≤83:3; 84–85:2; 86–87:1; 88–92:0; ≥93 on air:0; on oxygen 93–94:1, 95–96:2, ≥97:3 |
| Supplemental oxygen | Air:0; oxygen:2 in addition to saturation score |
| Systolic pressure | ≤90:3; (90,100]:2; (100,110]:1; (110,219]:0; >219:3 |
| Pulse | ≤40:3; (40,50]:1; (50,90]:0; (90,110]:1; (110,130]:2; >130:3 |
| Consciousness | Selected numeric 0 or 3 added directly |
| Temperature | ≤35:3; (35,36]:1; (36,38]:0; (38,39]:1; >39:2 |

Total adds all seven contributions (six physiological parameters plus oxygen), with ordinary-input extrema 0–20. Five individual numerical scores are displayed; oxygen/consciousness contributions are represented by their controls rather than separate score-output fields. Classification uses this order: ≥7 “HIGH — emergency clinical assessment (NEWS2 ≥7)”; ≥5 “URGENT — clinical assessment required (NEWS2 5–6)”; otherwise any physiological component score of 3 “URGENT — single parameter score of 3”; otherwise ≥1 “LOW — continue monitoring (NEWS2 1–4)”; else “NEWS2 0 — routine monitoring”. No monitoring interval, local responder/contact, trend, oxygen flow or override pathway is implemented.

Scale 2 helper text mentions clinical indication for target 88–92%, but does not express the full source eligibility/authorization conditions. No age, pregnancy, unreliable-observation, missing-equipment or unmeasurable-observation state exists. Air and Alert are defaults, not explicit confirmation that they were observed. All eight controls' input/change events clear results; Calculate is required again. Reset empties numeric fields and restores Scale 1/Air/Alert. Normal close/Escape performs cleanup; replacing an existing modal only removes its element (F02).

### Shock Index — E03

Source: `shock-index.js` inputs 37–77, clinical note 127–135, lifecycle/reset 148–259, clearing/formatting 267–283, calculation/labels 286–366.

HR is bpm, inclusive 20–250; SBP is mmHg, inclusive 30–300; both have HTML step 1 but fractions are accepted by the click handler. Both are mandatory, parsed with `Number()` and checked finite/in-range. Invalid entries alert for the first field, clear both outputs and preserve entries. Blank/whitespace and zero are rejected. Positive SBP bounds prevent zero denominator in the ordinary calculation; finite bounded operands prevent numerical overflow. There is no unit conversion, mean-arterial-pressure denominator or age multiplier. SI is the numerical HR/SBP ratio **using those declared input units**, not a unit-invariant physical quantity.

| Raw ratio | Current interpretation |
| --- | --- |
| <0.5 | Below typical adult reference range |
| ≥0.5 and <0.7 | Typical adult reference range |
| ≥0.7 and <0.9 | Elevated — assess in clinical context |
| ≥0.9 and <1.0 | Markedly elevated — assess for haemodynamic compromise |
| ≥1.0 | ≥1.0 — markedly elevated; assess urgently in clinical context |

Display normally uses `toFixed(2)`. If rounding would move a raw value below 0.5/0.7/0.9/1.0 onto that boundary, it displays `<0.50`, `<0.70`, `<0.90` or `<1.00`. Interpretation uses raw division, not the display. Accepted extrema are 20/300=1/15 (display 0.07) and 250/30=25/3 (8.33); those bounds are not clinical plausibility criteria. The clinical note says the index is an adjunct and should not be used alone. No history, age, pregnancy, medication, rhythm, measurement time/quality or perfusion finding is entered. Both event types clear results; reset empties inputs. Normal close/Escape cleans up; replacement retains an old handler (F02).

## 3. Authoritative sources, version and rights requirements

Sources accessed 2026-10-12. This is a focused appraisal, not a systematic evidence update. URLs identify reviewed evidence, not endorsed product claims. Full-text articles, current local protocols and intended-device instructions remain to be obtained where indicated. No reproduction permission is inferred from the repository's code license.

| ID | Primary/issuing-authority source and version | Contribution, limitations and remaining evidence |
| --- | --- | --- |
| G1 | Teasdale/Jennett, [Assessment of coma and impaired consciousness. A practical scale](https://pubmed.ncbi.nlm.nih.gov/4136544/), Lancet, 13 July 1974; DOI 10.1016/S0140-6736(74)91639-0 | Original provenance, bibliographic record only here; full original/version evolution must be appraised before claiming equivalence to today's scale. |
| G2 | Official [GCS Assessment Aid](https://glasgowcomascale.org/downloads/GCS-Assessment-Aid-English.pdf?v=3), © Sir Graham Teasdale 2015, one page | Modern response definitions/NT and structured examination. Code uses older speech/pain/withdrawal wording rather than all current terms; clinician must approve exact mapping and assessment instructions. No artifact copied into the app. |
| G3 | Official [GCS FAQ](https://www.glasgowcomascale.org/faq/), undated, sections 1–3 and 7 | Supports reporting components and no total with NT; describes interference and developmental limitations. Its severe-head-injury notation `<8` differs from G4's `≤8`; do not silently resolve that source discrepancy. It also cites older guidance; not a current local protocol. |
| G4 | NICE [NG232 recommendations](https://www.nice.org.uk/guidance/NG232/chapter/recommendations), current page accessed; sections 1.3 and GCS definition | Head-injury severity definition includes ≤8, 9–12, 13–15; does not validate generic “impairment” labels for every etiology. Components, baseline and pediatric assessment require context. Exact adopted revision and reuse terms require controlled review. |
| G5 | Official [GCS permissions](https://www.glasgowcomascale.org/permissions/), undated | States clinical/research use without a license or fee with acknowledgment of Glasgow University for GCS and Sir Graham Teasdale for the listed assessment aids/extensions. Owner/legal reviewer must document applicability to this software distribution, attribution and any adaptation/translation; no clearance claimed. |
| N1 | RCP [National Early Warning Score (NEWS) 2 resource and copyright conditions](https://www.rcp.ac.uk/resources/national-early-warning-score-news-2/), 19 December 2017 resource, current page | Requires acknowledgment and unchanged material; charts must use the high-quality colour versions, and translations require the stated non-endorsement disclaimer. Assess this calculator's shortened/adapted display with the rights owner where needed; free availability is not approval of the implementation. |
| N2 | RCP [NEWS2 updated working-party report](https://www.rcp.ac.uk/media/a4ibkkbf/news2-final-report_0_0.pdf), December 2017; recommendations and sections 5–7 | Defines adult scope from 16 years, excludes pregnancy/under-16 use, and cautions about spinal-cord-injury physiology. Clinical concern overrides the score. UK response assumptions require Saudi facility reconciliation, not automatic adoption. |
| N3 | RCP [Chart 1: scoring system](https://www.rcp.ac.uk/media/alxev00t/news2-chart-1_the-news-scoring-system_0_0.pdf), ©2017 | Compared with code: numeric bins match on whole RR/SpO₂/SBP/pulse and tenth-degree temperature inputs inside application bounds. This source comparison is not independent professional validation. Fractional/measurement policy remains unresolved. |
| N4 | RCP [Chart 4: clinical response to trigger thresholds](https://www.rcp.ac.uk/media/mrllczrj/news2-chart-4_clinical-response-to-news-trigger-thresholds_0.pdf), ©2017 | Specifies differentiated monitoring and response roles. App summaries omit much of that workflow and use URGENT for both a single 3 and total 5–6; approve local wording without obscuring their distinction. |
| N5 | RCP [Additional implementation guidance](https://rcp.ac.uk/media/umzn4ntq/news2_additional-guidance-002-_0.pdf), official [resource dated 21 April 2021](https://rcp.ac.uk/resources/news2-additional-implementation-guidance/), printed pp. 2–7 | Clarifies new confusion, Scale 2 and incomplete observations. Obtain controlled edition/updates; a one-time calculator does not implement the full deterioration system. |
| S1 | Allgöwer/Burri, [Shock index](https://pubmed.ncbi.nlm.nih.gov/5299769/), 27 October 1967; DOI 10.1055/s-0028-1106070 | Original German bibliographic record, not full-text appraisal or proof of today's five labels. |
| S2 | Rady et al., [A comparison of the shock index and conventional vital signs to identify acute, critical illness in the emergency department](https://pubmed.ncbi.nlm.nih.gov/8092595/), October 1994 | Indexed abstract: 275 adults, association with >0.9 and care/disposition outcomes. Index entry links an erratum; retrieve both full article and erratum. Does not settle exactly 0.9, 0.7 inclusivity, all populations or the code's complete band scheme. |
| S3 | King et al., [Shock index as a marker for significant injury in trauma patients](https://pubmed.ncbi.nlm.nih.gov/8922013/), November 1996; DOI 10.1111/j.1553-2712.1996.tb03351.x | Indexed abstract: retrospective trauma cohort, outcome-dependent cutoffs and exclusions including severe head injury and age <14. Results do not establish a universal threshold or rule-out test. Full appraisal/local applicability pending. |
| S4 | Kristensen et al., [Is Shock Index a Valid Predictor of Mortality in Emergency Department Patients With Hypertension, Diabetes, High Age, or Receipt of β- or Calcium Channel Blockers?](https://pubmed.ncbi.nlm.nih.gov/26144893/), January 2016 issue; online 3 July 2015 | Primary study identified for modifier review. Indexed title/design available; direct retrieval intermittent. No effect size or conclusion adopted here; obtain full text and assess medications/comorbidities/age for intended population. |

No source-selection, licensing or clinical approval is recorded. For GCS/NEWS2, the product/legal owner must retain dated terms, intended attribution and written clarification if the adapted digital presentation is not clearly covered. For Shock Index, distinguish numerical calculation from copyrighted article text, tables, images and any branded instrument; no special license requirement or exemption has been established. Reusing NICE material requires separate applicable rights review. No correspondence was sent to any rights owner.

## 4. Source comparison and clinical/workflow questions

| Requirement / source | Verified implementation comparison | Unresolved risk and proposed review requirement |
| --- | --- | --- |
| GCS components and NT, G2/G3 | All three groups support NT; no numeric total when a selected component is NT and all selections complete | NT reason, absent versus untestable and reliable examination are not encoded. Review sedation/paralysis, intubation, injuries and communication/developmental barriers; preserve component reporting. |
| GCS severity scope, G3/G4 | Arithmetic matches selected scores; generic impairment bands not limited to head injury; 15 described only as maximum | Do not infer diagnosis, prognosis, intact neurological function or airway decisions from sum alone. Decide scope/wording and resolve source boundary discrepancy independently. |
| NEWS2 scoring, N3 | Standard grid inputs agree; SpO₂ fractions rejected; other fractions accepted | E.g. RR8.5 and SBP219.5 occupy chart gaps unless measurement granularity is specified. Do not invent rounding or silently round a measurement. |
| Scale 2, N5 printed p.5 | Selector only says target 88–92% | Source requires confirmed hypercapnic respiratory failure and a documented competent clinical decision; target selection alone or COPD alone is insufficient. Determine how eligibility is established in intended workflow. |
| Missing NEWS2 observations, N5 printed p.7 | Every numerical field mandatory; missing observation clears all outputs | Guidance distinguishes absent equipment from failed measurement despite equipment; app has neither path. Approve incomplete-score/escalation scope without inventing normal observations or delaying care. |
| Consciousness and oxygen, N1/N5 | Defaults Alert/Air, binary oxygen; no explicit observation confirmation, flow or baseline | Review unknown versus normal state, baseline confusion versus acute change and oxygen escalation not captured by a binary contribution. No automatic mapping from GCS total to NEWS2. |
| NEWS2 escalation, N2/N4 | Threshold order retained; brief labels only | A low/zero total is not reassurance against concerning clinical findings. Decide responder, urgency, remeasurement, escalation override and handover within Saudi facility policy. No local schedule selected. |
| Shock Index evidence, S2/S3/S4 | HR/SBP formula; fixed adult labels and raw-boundary display guard | Threshold/outcome/population transfer unresolved. Age, pregnancy, arrhythmia, medication and baseline physiology require inclusion/exclusion review; additional primary evidence needed rather than importing a familiar range. |
| Observation quality, all functions | No patient/time/source/reliability metadata or trends | Proposed requirement: verified same-patient contemporaneous observations and method reliability. Define local measurement/recording rules (BP cuff/site/device, pulse/rhythm, SpO₂ signal/perfusion, temperature site, manual RR and trained neurological exam); obtain intended-device IFUs and local competence evidence. No timing window is selected. |
| Lifecycle and usability, governance V&V | Normal edit/reset/close paths covered by limited fixtures; F01/F02 uncovered | Demonstrate cleanup, no detached influence, correct focus and no stale/wrong-dialog output in actual DOM. Five widths, themes, keyboard, reader and clinician task review remain required. |

Population policy is PENDING for each function separately. N2 exclusions must be resolved explicitly in a NEWS2 scope proposal, not overridden by generic “adult” labeling. GCS pediatric adaptations are not present; preverbal or developmentally unable responses must not be treated automatically as clinical deterioration. Shock Index has no pediatric age adjustment, obstetric-specific path or approved special-population thresholds. Exclude unsupported uses from any future bounded release unless separately validated; this is a proposed safety gate, not approved product scope.

## 5. Confirmed findings versus potential hazards

| ID | Finding and reproducible evidence | Classification / consequence |
| --- | --- | --- |
| F01 | Open GCS in a fresh context, dismiss by clicking `gcsOverlay`, reopen, then use close button. Instrument document keydown add/remove: counts 1 → 1 → 2 → 1; backdrop caused zero focus-restoration calls. Source directly calls `modal.remove()` at line 360 instead of cleanup. | Confirmed lifecycle defect (source + instrumented VM). Retained handler/detached-dialog focus interference is a potential workflow hazard; no patient harm or real-browser effect demonstrated. |
| F02 | In fresh contexts call `openNEWS2Calculator()` twice without close, then click close; repeat for `openShockIndexCalculator()`. Instrumented keydown counts 1 → 2 → 1. Each opening removes old DOM at line 11 without removing its document handler. | Confirmed replacement-path lifecycle defects. Requires repeated opener invocation; ordinary user reachability and actual browser consequences remain to verify. Normal close/reopen PASS does not cover this path. |
| F03 | NEWS2 baseline RR18/SpO₂98/SBP120/pulse80/temp37, Scale1/Air/Alert gives0. Change only RR to8.5 →1/LOW; SBP to219.5 →3/single-parameter URGENT; temp to38.01 →1/LOW; no alerts. | Confirmed accepted off-step behavior. Correct clinical handling is unresolved, not an adjudicated scoring error; app continuously extends a discretely presented chart. |
| F04 | Same baseline but SpO₂90 and programmatically deselected scale (`value=''`) gives0/routine rather than Scale1's3/single-red. Deselecting oxygen or consciousness on the normal baseline also returns0 without alert. | Confirmed missing enum validation under injected/deselected state; ordinary choices do not offer this state. Potential false-normal fallback under abnormal state, not evidence of an ordinary-user scoring defect. |
| F05 | GCS 120 numeric combinations/seven NT masks, NEWS2 ordinary chart grid and Shock Index raw/display boundaries pass existing tests. SI149/300 displays `<0.50`, 140/201 `<0.70`, 179/200 `<0.90`, 200/201 `<1.00`. | No arithmetic defect reproduced in supported tested paths. Display inequality and clinical labels still need comprehension/threshold approval. |
| F06 | NEWS2 baseline with RR blank gives `—`, “Complete all observations”, and valid-RR alert; valid entries are retained. No incomplete-score or measurement-failure context. | Confirmed source-guidance coverage gap, not permission to implement partial scoring. Delayed escalation is a potential hazard, not an observed incident. |

F01/F02 instrumentation used the existing minimal DOM fixture with Set-backed document listener tracking, modal-ID registration/removal and focus-call counting, in a temporary script outside the repository. Production sources were evaluated unchanged. Existing fixtures stub document add/remove as no-ops and therefore cannot detect these leaks. Independent reproduction should start from a fresh page per case, instrument add/remove with callback identity, execute the sequences above and then test Escape/Tab/focus after removal and across calculators. Expected safe lifecycle after an authorized fix is zero document listeners owned by the dismissed modal instance after every dismissal; this is a proposed engineering acceptance condition, not a code change here.

F03/F04 were executed through the actual calculation function using synthetic DOM values. HTML number/select sanitization and real browser event order need separate checks. No normal edit-triggered stale-result failure was reproduced. GCS altered radio values lack defensive membership validation by source inspection only; no ordinary UI route to those values was demonstrated. Unmeasurable physiology, mislabeled units, incorrect examination, copied old observations and reliance on reassuring labels remain **potential clinical hazards**, not proven software arithmetic defects or reported patient events.

The register is updated only to add F01/F02 evidence to H04 and the supported Phase 2D limitations to H08; neither risk is closed. H03/H10/H11/H12 already cover input, usability, population and governance concerns. H01 infusion rounding and H05–H07 ABG policies remain OPEN.

## 6. Independent synthetic verification matrices

These are verification-ready case definitions and **proposed** acceptance targets for professional approval. “Current” expectations preserve observed behavior; they are not approved future requirements. No new test file or altered expectation is introduced. Independently derive score tables from the controlled source, not application helpers; retain literal values, component outputs, totals, messages, alert/clear state and scope evidence. Exact sums are integers; use rational HR/SBP anchors separately from binary/display expectations. Numerical equality cannot validate clinical interpretation.

### GCS cases

| ID | Inputs / transitions | Current arithmetic or state anchor; required extension |
| --- | --- | --- |
| G-V01 | Every E1–4 × V1–5 × M1–6 | All 120 totals/breakdowns; existing suite executed. Independent source-derived response mapping and realistic observations still need clinician adjudication. |
| G-V02 | E/V/M: 1/1/1; 2/2/4; 2/2/5; 3/4/5; 3/4/6; 4/4/6; 4/5/6 | Totals3,8,9,12,13,14,15; current labels severe,severe,moderate,moderate,mild,mild,maximum. Explicitly review 8/9,12/13,14/15 boundaries and claims. |
| G-V03 | Each of seven nonempty NT masks with other components at maxima; extend to every legal NT-containing combination | Existing seven masks give NT/no total. Full legal choice space is5×6×7=210, including90 NT-containing cases; 120 numeric + seven masks does not exhaust NT combinations. |
| G-V04 | Each group absent; absent plus NT; all absent; NT→numeric; numeric→NT; reset/reopen | No partial numeric total; missing takes precedence over NT total. Approve missing/untestable distinction and retained component communication. |
| G-V05 | Inject zero, out-of-enum, fractional, nonnumeric/Infinity radio values; malformed/no selection | Negative cases for defense/reliability; ordinary radio UI prevents these choices. Future rejection expectations require approved control requirements, not copied current fallback. |
| G-V06 | Same total different components (E4/V2/M6 versus E3/V4/M5, both12); intubated verbal NT, language barrier, sedation/paralysis, developmental inability, focal deficit | Arithmetic is not evidence of equal clinical state. Independent examiner-derived component expectations and limitations required; do not invent a numeric NT substitute. |

### NEWS2 cases

Use baseline **RR18, SpO₂98%, SBP120 mmHg, pulse80 bpm, temperature37°C, Scale1/Air/Alert** (total0). Change only indicated inputs unless stated. Arrow lists pair each input in order with its current component score.

| ID | Inputs / transitions | Independent anchor / required evidence |
| --- | --- | --- |
| N-V01 | RR8,9,11,12,20,21,24,25 | Scores3,1,1,0,0,2,2,3; derive from N3 separately. |
| N-V02 | Scale1 SpO₂91,92,93,94,95,96 | Scores3,2,2,1,1,0; enumerate50–100 for both oxygen states; oxygen adds2. |
| N-V03 | Scale2 SpO₂83,84,85,86,87,88,92,93,94,95,96,97 | Oxygen-state saturation scores3,2,2,1,1,0,0,1,1,2,2,3; add2. Air: identical through92, then0. Both scales × both states ×51 integer saturations=204 existing cases. |
| N-V04 | SBP90,91,100,101,110,111,219,220 | Scores3,2,2,1,1,0,0,3; scope/unit validation separate. |
| N-V05 | Pulse40,41,50,51,90,91,110,111,130,131 | Scores3,1,1,0,0,1,1,2,2,3. |
| N-V06 | Temperature35.0,35.1,36.0,36.1,38.0,38.1,39.0,39.1 | Scores3,1,1,0,0,1,1,2; probe ±0.01 and binary neighbors as numerical-policy cases, not approved chart interpolation. |
| N-V07 | Baseline; pulse100; RR21+SpO₂93; RR25; RR25+SpO₂93; RR25+SpO₂91; previous+pulse100 | Totals0,1,4,3,5,6,7; messages routine,low,low,single-red,urgent,urgent,high. Add total4 with a3 (RR25+pulse100), total6 without a3 (RR21+SpO₂93+SBP100), consciousness3 alone, oxygen2 alone and both together. |
| N-V08 | RR25/SpO₂83/SBP90/pulse131/temp35/Scale1/oxygen/ACVPU3 | Components3+3+2+3+3+3+3=20; check every component contributing3 independently, especially consciousness; confirm precedence for multiple red scores. |
| N-V09 | For each numeric field: min−step,min,min+step,max−step,max,max+step; blank/space/zero/negative/nonnumeric/Infinity/overflow; SpO₂50.1,83.5,92.5,99.9 | Bounds from inventory; any invalid current input clears all outputs and preserves entries. Fractional SpO₂ must currently reject, not round; add recovery then recalculation. Extreme real observations can be clinically important despite software rejection. |
| N-V10 | RR8.5/SBP219.5/temp38.01 separately; wrong units; every invalid/empty enum; all default select states | Current F03/F04 anchors versus future signed granularity, enum, unknown-state and unit policy; never treat default Air/Alert as verified observation. |
| N-V11 | Scale change at SpO₂90 (air:3→0); at98 on oxygen (total2→5); correct/incorrect scale eligibility; new/baseline/unknown confusion; missing equipment versus failed measurement | Independently approved scenarios for eligibility, incomplete/unavailable states and escalation; source-supported concern must not be dismissed by lower score. No numeric expected value assigned to missing observations. |

### Shock Index cases

| ID | Exact synthetic inputs (HR bpm / SBP mmHg) | Mathematical/display anchors and required review |
| --- | --- | --- |
| S-V01 | 60/100;120/100;20/300;250/30 | Ratios3/5,6/5,1/15,25/3; current displays0.60,1.20,0.07,8.33. Range acceptance is not physiological approval. |
| S-V02 | For boundary b=0.5,0.7,0.9,1: HR100b, SBP100; immediately below/above in exact decimal and adjacent binary inputs | Equality enters the higher current band; verify raw/display independently. Current suite uses ±1e−10 (not adjacent IEEE values); extend to representable neighbors and independent decimal references. No clinical epsilon selected. |
| S-V03 | 149/300;140/201;179/200;200/201 | Exact fractions below respective boundaries; current displays `<0.50`,`<0.70`,`<0.90`,`<1.00`. Comprehension of inequalities and loss of exact ratio requires clinician/human-factors review. |
| S-V04 | HR19,20,21,249,250,251 with SBP100; SBP29,30,31,299,300,301 with HR60; fractional values around each | Current endpoints accepted, outside cleared/alerted; granularity and clinically implausible extremes remain policy questions. |
| S-V05 | Each input blank/space/zero/negative/nonnumeric/Infinity/overflow; SBP0 with populated prior result; locale comma or kPa value | Reject invalid current values and clear; no divide-by-zero output. In-range wrong-unit numbers cannot be recognized from magnitude alone. Approve units/source handling separately. |
| S-V06 | 60/100 versus120/200 (both0.6); change either observation's time, quality, rhythm, medication/context or patient | Same ratio does not mean same clinical state. Obtain independent cases for intended population and explicit unsupported-population exclusions; no universal risk probability assigned. |

### Shared state and human-factors cases

**X-V01:** every editable field through input/change, invalid recalculation without edit events, correction without recalculation, reset, close button, Escape, backdrop where supported, replacement and reopen; repeat across calculators with F01/F02 listener/focus accounting. GCS automatically computes on change; the other two require Calculate. Do not impose one behavior on all three without product approval.

**X-V02:** actual browser numeric/select sanitization, duplicate GCS invocation, radio groups/keyboard, focus after backdrop/replacement, detached controls, alert recovery, 320/360/390/768/1280px, light/dark, zoom, screen readers and intended physician tasks. No new browser PASS is claimed. Earlier user-reported mobile passes have only their recorded scope in the [mobile audit](../ux/MOBILE-ACCESSIBILITY-AUDIT.md).

## 7. Decision and sign-off matrix

All IDs below are in the **GNS** namespace, separate from ABG/Infusions decisions. Roles are proposed; nobody is appointed or approved by this document. Each decision needs named owner, independent reviewer, selected scope/policy, source edition/section, rationale/conflicts, requirements-to-case/hazard mapping, evidence, residual risk, dated signatures and review/expiry triggers.

| Decision / accountable owner | Independent reviewer roles | Evidence and acceptance criterion | Status |
| --- | --- | --- | --- |
| GNS-D01 release scope / product and clinical safety owners | Saudi ED clinical lead, facility governance, pediatric/obstetric specialists as applicable | Approve per-function purpose, populations/exclusions, human oversight and meaning of “limited release”; resolve E01–E03 intended-use claims. Candidate naming is not approval. | Product/clinical PENDING |
| GNS-D02 GCS semantics / neurological clinical owner | Emergency/neurology/trauma, pediatric specialist if included | Controlled G1–G4 version; signed response mapping, NT/missing handling, labels and ≤8 discrepancy resolution; G-V01–06 clinician-derived cases and examiner reliability evidence. | PENDING |
| GNS-D03 NEWS2 eligibility/scoring / acute-care owner | Respiratory, emergency, nursing deterioration/POCT leads | Controlled N2/N3/N5; signed Scale2 eligibility, population exclusions, observations/units/granularity/defaults and enum/unavailable-state policy; N-V01–11 independent truth set. | PENDING |
| GNS-D04 NEWS2 response / facility deterioration owner | Emergency/acute-care, nursing leadership, respiratory and human factors | N4/N5 reconciliation with Saudi facility roles/resources; incomplete observations, concern override, single3 versus aggregate5/7, repeat assessment and handover; scenario evidence without unapproved local thresholds. | PENDING |
| GNS-D05 SI claims and precision / emergency/critical-care owner | Trauma, independent evidence-methods reviewer; population specialists as needed | Full S1–S4 including S2 erratum; outcome-specific threshold/inclusivity evidence or explicit numerical-only scope decision; S-V01–06 and understandable raw/display reporting. | PENDING |
| GNS-D06 measurement reliability / clinical operations owner | Nursing, POCT/biomedical, neurology/respiratory as applicable | Intended-device IFUs, measurement methods, trained observers, contemporaneous same-patient inputs and handling of unmeasurable/unreliable values; no tolerance/time window invented. | PENDING |
| GNS-D07 rights and attribution / product/legal owner | Independent licensing/legal review and rights holders where clarification needed | Dated G5/N1 terms and applicable NICE/publisher terms; confirm distribution/adaptation/translation scope and attribution. No implication of authority endorsement. | PENDING — no licensing clearance |
| GNS-D08 software controls / engineering owner | Independent verifier, clinical safety and human factors | Reproduce and disposition F01/F02; approved defensive-state/domain requirements for F03/F04; complete X-V01–02, boundary and invalid-input evidence on exact future build. No unresolved critical lifecycle defect accepted merely because regressions pass. | PENDING |
| GNS-D09 professional validation / clinical safety owner | Independent relevant clinicians, human factors, evidence reviewer | Signed intended-workflow protocol/results, resolved source disagreements, every in-scope claim traced to evidence, residual risks accepted by authorized owner; publish limitations and excluded claims. Software equality alone insufficient. | PENDING |
| GNS-D10 implementation/release gates / accountable release owner | Clinical safety, engineering, legal/regulatory and Saudi facility governance | Separate written implementation authorization after policy/control approval; later conformance, clinical/human-factors validation and applicable regulatory/facility gates before release. In-scope exclusions must prevent access/claims through other routes, not merely list exclusions in a document. | Implementation NOT AUTHORIZED; clinical release NO-GO |

Recommended queue: first appoint owners and define candidate scope (D01), resolve clinical/source and measurement policies (D02–06) with rights review (D07) in parallel; then approve independent expectations and bounded engineering controls (D08). F01/F02 require disposition before any affected-function release. Finish clinical/human-factors validation and residual-risk acceptance (D09), followed by distinct authorization gates (D10). Documentation acceptance and its local commit do not authorize defect fixes, clinical implementation or deployment.

Reviewer-ready checklist: confirm all inputs/source fields; independently annotate every scoring boundary and equality; distinguish observed/missing/untestable; review every message and severe/unreliable scenario; adjudicate exclusions and source disagreements; check rights/attribution; review lifecycle/browser evidence and all OPEN hazards; sign an exact scope/version with evidence links and limitations. Quantitative risk scores, clinical error tolerances, observation timing and diagnostic performance targets must not be supplied by engineering convenience.

## 8. Engineering evidence and remaining blockers

Executed with Node v26.11.1 and Python 3.14.8 on this checkpoint:

- All **11 existing `tests/*test.js` suites PASS**, unchanged: six ABG suites, `calculator-accuracy-test.js`, `result-safety-test.js`, `infusions-test.js`, `infusions-verification-test.js`, `infusion-precision-prototype-test.js`.
- Candidate-specific accuracy coverage: 120 numeric GCS combinations/seven NT masks; 204 NEWS2 integer SpO₂ combinations plus fractional rejection/escalation/reset; Shock Index threshold/display cases. Result-safety's 93 transitions span Infusions, NEWS2 and Shock Index, not 93 per function and not GCS coverage.
- `python tests/smoke-test.py` PASS: 30 script paths, 25 onclick functions and no duplicate IDs in static index. It does not detect repeated dynamically created GCS IDs or leaked modal handlers.
- Additional temporary source/VM observations reproduced F01–F04 and F06. They reveal uncovered defects/limitations; passing existing suites is not a defect-free conclusion. No repository test expectation changed, and the temporary probe is not independent clinical validation.
- Documentation checks: relative links, source traceability/access limitations, matrix IDs, arithmetic anchors, approval status and staged diff scope. Literal NEWS2 matrix boundary scores were additionally checked against current helpers; agreement is software evidence only. Only this review and justified H04/H08 risk evidence are changed.

**Open blockers:** named owners; signed populations/claims and local workflows; controlled primary-source versions/full appraisals and discrepancies; rights/attribution review; measurement/NT/missing/default/precision policies; F01/F02 lifecycle disposition and actual-browser verification; complete independent source-derived clinical truth sets and clinician task validation; accepted residual risks; separate implementation, regulatory/facility and release authorizations. Existing infusion rounding defects remain UNRESOLVED and ABG clinical/laboratory policies PENDING; a future limited scope cannot silently waive them if those functions remain accessible for care.

**GCS/NEWS2/Shock Index product-owner and clinical decisions PENDING. Clinical implementation NOT AUTHORIZED. Clinical release NO-GO.**
