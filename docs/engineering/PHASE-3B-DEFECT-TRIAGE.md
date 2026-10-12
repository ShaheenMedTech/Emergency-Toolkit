# Phase 3B — Calculator defect triage and remediation plan

Document ENG-TRIAGE-001 · Version 1.0 DRAFT · 2026-10-12.
Baseline: `9955e92c856478fad26edd1003243083e312422b` on `docs/v1.3-clinical-governance`; working tree clean before this review. Supplied instructions and Ryoku vault reviewed; no additional repository AGENTS.md/CLAUDE.md found.

**Planning only. All clinical decisions PENDING. Clinical implementation NOT AUTHORIZED. Clinical release NO-GO.** Candidate GCS/NEWS2/Shock Index product decisions remain PENDING. Existing ABG D10–D12 product directions remain APPROVED without clinical/laboratory approval. No calculation, validator, threshold, warning, test or application behavior changes are authorized by this plan or its commit.

## Evidence and scope

The repository contains one [combined Phase 2D safety review](../clinical-safety/GCS-NEWS2-SHOCK-INDEX-SAFETY-REVIEW.md) covering the three calculators, not three separate safety-review files. Review inputs are that record; the [GCS](../clinical-validation/GCS-VERIFICATION-MATRIX.md), [NEWS2](../clinical-validation/NEWS2-VERIFICATION-MATRIX.md) and [Shock Index](../clinical-validation/SHOCK-INDEX-VERIFICATION-MATRIX.md) Phase 3A matrices; their [independent-review protocol](../clinical-validation/INDEPENDENT-REVIEW-PROTOCOL.md); and [risk register](../clinical-governance/RISK-REGISTER.md) H03/H04/H08/H10–H12. Clinical source versions, disputes, incomplete retrievals and rights questions retain their recorded status; this engineering review does not select a new clinical reference or policy.

Implementation references are [gcs.js](../../js/calculators/gcs.js) lines 269–363 and 389–475; [news2.js](../../js/calculators/news2.js) lines 8–12, 290–402 and 516–675; [shock-index.js](../../js/calculators/shock-index.js) lines 8–12 and 148–259. Read with [accuracy tests](../../tests/calculator-accuracy-test.js), [result-safety tests](../../tests/result-safety-test.js) and [structural smoke test](../../tests/smoke-test.py). Line numbers refer to the baseline above. Source hashes remain those recorded in the Phase 3A protocol.

Evidence layers remain separate: source inspection; synthetic execution of unchanged production JavaScript; actual browser interaction; independent clinical validation. Only the first two were performed in this phase. Node v26.11.1/Python 3.14.8 were used. There are no patient observations, independently signed clinical results or newly executed browser results here. Earlier mobile browser PASS reports do not establish closure of these findings.

## Reproduction method and limits

Temporary Node/VM probes outside the repository reuse the minimal DOM adapter at the start of `calculator-accuracy-test.js`, before its first test block. The production files are evaluated unchanged. The adapter was instrumented to retain document `keydown` callback identities in a Set, remove only the requested identity, count calls to `focus()`, register modal IDs and expose controls for explicit injection. These changes affect the temporary adapter only. The original adapter's document listener methods are no-ops; its passing lifecycle tests cannot prove listener cleanup.

For independent reproduction, instrument `document.addEventListener/removeEventListener` for `keydown`, register/remove each modal's ID in the fixture lookup, give parsed elements their IDs, and count element focus calls. Open a fresh fixture per sequence below. Dispatch events through registered handlers. For GCS, choose legal E/V/M radios, then mutate only the specified selected radio's string value and dispatch `change` for injection cases. For NEWS2, assign the complete baseline tuple below, override only named controls and dispatch Calculate. Record total, interpretation, all component outputs, alerts, callback identities and focus calls. Do not change application code or use these abnormal outputs as future clinical test oracles.

Executed temporary artifacts: `/tmp/phase2d-observations.cjs` (lifecycle/NEWS2), `/tmp/phase3b-controls.cjs` (fresh-close controls), and `/tmp/et-phase3a/observe.cjs` (replayed all 181 Phase 3A observations from its frozen case dataset). They are local diagnostic artifacts, not durable signed verification tooling. The tables below retain the relevant exact observations and reproduction sequences. A future authorized implementation must retain a controlled runner, raw evidence and source hashes; this phase does not add or alter repository tests.

The fixture does not emulate browser selection sanitization, layout, actual focus, event bubbling or assistive technology. Listener counts establish ownership leaks, not a demonstrated keyboard trap. Empty select values are explicitly injected, not available normal options. Programmatic replacement is a supported source branch but ordinary UI reachability while the dialog is open is unverified. A removed DOM node is a separate untested abnormal case; an empty value in an existing node is not evidence about missing-node handling.

## Confirmed observations

### Lifecycle reproduction and controls

Counts are calculator-owned document keydown callbacks, not all document listeners. No score inputs are necessary for these paths.

| ID / previous case | Exact sequence | Observed counts and focus | Reachability and classification |
| --- | --- | --- | --- |
| B3-L01 / F01, IV-GCS-033 | Open GCS → click backdrop itself (`gcsOverlay`) → invoke opener → close button | `1 → 1 → 2 → 1`; backdrop causes zero focus-restoration calls | Confirmed cleanup defect on ordinary backdrop-dismissal event path; source and synthetic event reproduction. Physical browser click/focus consequences unverified. Clicking dialog content is not the backdrop case. |
| B3-L02 / F02, IV-NEWS2-104 | Open NEWS2 → invoke `openNEWS2Calculator()` while open → close new dialog | `1 → 2 → 1` | Confirmed replacement cleanup defect. Programmatic invocation; ordinary UI replacement reachability unverified. |
| B3-L03 / F02, IV-SI-038 | Open SI → invoke `openShockIndexCalculator()` while open → close new dialog | `1 → 2 → 1` | Confirmed replacement cleanup defect with same reachability limitation. |
| B3-C01 / control | Fresh fixture for each of the three: open → close button, without earlier dismissal/replacement | Each `1 → 0`; each close restores focus once in the fixture | Positive control verifies the instrumentation distinguishes normal cleanup from bypassed cleanup. |

Cause: GCS backdrop calls `modal.remove()` instead of its existing close routine. NEWS2/SI replacement removes the previous element without disposing its associated callback. Close button/Escape source paths invoke cleanup; the fresh-close control above exercises the button, not real-browser Escape. Detached handlers still contain Escape/Tab logic and focus references. Focus theft, swallowed keys, interference across dialogs and cumulative retention are plausible consequences requiring browser evidence; no clinical calculation corruption or actual patient harm has been demonstrated from the leaks.

### GCS injected values

Inputs are categorical component points, not physical units. Normal choices offer E1–4, V1–5, M1–6 or NT. They do not offer the injected strings below. All rows returned no alert.

| ID / Phase 3A case | Injected E/V/M tuple | Exact total and interpretation |
| --- | --- | --- |
| B3-G01 / IV-GCS-025 | `0/5/6` | `11`; `Moderate impairment • GCS 9–12` |
| B3-G02 / IV-GCS-026 | `4/6/6` | `16`; `Mild impairment • GCS 13–15` |
| B3-G03 / IV-GCS-027 | `4/5/7` | `16`; `Mild impairment • GCS 13–15` |
| B3-G04 / IV-GCS-028 | `NaN/5/6` (literal string `NaN`) | `NaN`; `Severe impairment • GCS ≤8` |

Confirmed defensive-validation gap DG-ENUM: conversion and addition occur without checking component membership. A plausible total of 11 does not make E0 valid. NaN comparisons fail through to the final severe branch. These are malformed-state software outputs, not clinically meaningful scores or normal radio-entry defects. Do not impute, clamp, round, substitute NT or choose a nearby legal value to conceal them.

### NEWS2 abnormal, fractional and missing states

Baseline tuple: RR `18` breaths/min, SpO₂ `98` %, SBP `120` mmHg, pulse `80` bpm, temperature `37` °C, scale `1`, oxygen `0` (air), consciousness `0` (Alert). Baseline observed total is `0`, text `NEWS2 0 — routine monitoring`. This text is reported behavior, not approved advice.

| ID / Phase 3A case | Only overrides / sequence | Exact observed result | Classification |
| --- | --- | --- | --- |
| B3-N01 / IV-NEWS2-098 | SpO₂ `90`, scale empty string | `0`; `NEWS2 0 — routine monitoring`; no alert | Confirmed abnormal-state fallback F04: anything other than scale `1` uses Scale 2. Empty select is injected. |
| B3-N02 / IV-NEWS2-099 | Oxygen empty string | `0`; same routine-monitoring text; no alert | Confirmed abnormal-state fallback F04: anything other than `2` is treated as air. |
| B3-N03 / IV-NEWS2-100 | Consciousness empty string | `0`; same routine-monitoring text; no alert | Confirmed abnormal-state fallback F04: `Number('')` is zero. |
| B3-N04 / IV-NEWS2-095 | RR `8.5` | `1`; `LOW — continue monitoring (NEWS2 1–4)`; no alert | Confirmed off-step acceptance F03; clinical granularity/rejection/interpolation policy unresolved. |
| B3-N05 / IV-NEWS2-096 | SBP `219.5` | `3`; `URGENT — single parameter score of 3`; no alert | Same; not evidence that rounding to a chart integer is safe. |
| B3-N06 / IV-NEWS2-097 | Temperature `38.01` | `1`; LOW text as above; no alert | Same; no new precision policy selected. |
| B3-N07 / IV-NEWS2-101 | Calculate baseline → clear RR and Calculate → restore `18` and dispatch input → Calculate | `0 → — → — → 0`; invalid step says `Complete all observations`, clears all five component scores and alerts `Please enter a valid Respiratory rate.` | Ordinary missing numeric input is rejected, not scored as normal. Clearing/recovery reproduced; no stale result reproduced on this sequence. |

N04–06 can be represented by typing into number inputs; source click handlers do not call HTML validity checks. Synthetic values bypass browser behavior, so physical entry, stepMismatch and click behavior still require real-browser confirmation. Accepted fractional values are a confirmed behavior/policy gap, not proof that a particular alternative scoring rule is clinically correct.

N01–03 differ from ordinary defaults: Air/Alert defaults and a manually selected Scale 2 are available through normal controls. In IV-NEWS2-105–108, missing equipment, failed measurement, absent Scale 2 eligibility and unknown confusion baseline are contextual facts with no dedicated input fields. The current calculator cannot distinguish those contexts. Replayed output remains the Phase 3A observation; this is a workflow/source-policy gap, not a license to implement partial scores or new advice. Existing N5 source requirements and local reconciliation remain PENDING. Blank numeric fields do not share the empty-enum fallback.

## Triage, potential impact and approval boundary

All findings remain OPEN. Potential severity below describes possible consequences; it is not an assigned clinical severity class, likelihood estimate, patient incident or accepted residual risk. Qualified clinical safety review must determine clinical significance and disposition.

| Finding | Clinical-output impact / potential harm | Minimal remediation options for later authorization | Required approval and verification |
| --- | --- | --- | --- |
| B3-L01 (H04/H10) | No arithmetic change demonstrated; keyboard/focus disruption could delay or impede assessment | Route backdrop through the same idempotent dispose/close path as button/Escape; retain dialog-content click behavior and intended focus return | Technical lifecycle scope: engineering owner, independent verifier and accessibility reviewer; clinical safety reviews workflow impact. Separate implementation authorization still required. |
| B3-L02–03 (H04/H10) | No score defect shown; retained callbacks could interfere with current/reopened dialogs | Give each modal an owned cleanup callback, invoke it before replacement, detach only its own listener. Distinguish replacement focus transfer from final close. Alternatively disallow replacement by reusing the existing dialog only if product approves that behavior change | Prefer owned cleanup as smaller change; engineering/human-factors approval. Reuse/retaining inputs changes workflow and needs explicit product/safety review. |
| B3-G01–04 (H03/H08) | Invalid components acquire numeric/severity presentation; could mislead assessment if abnormal state reaches care use | Propose exact component allowlists before NT/arithmetic and withholding total/interpretation on invalid state; independently check finite/integer values. Do not silently correct inputs | Mechanism is engineering; approved invalid/missing/NT distinctions, retained entries, recovery and exact unavailable/error wording require GNS-D02/D08 clinical/product review before implementation. |
| B3-N01–03 (H03/H08) | Missing categorical observations become a plausible low result; potential false reassurance or delayed escalation | Propose explicit enum membership validation before scoring; invalidate all dependent outputs and require deliberate valid selection. No automatic Scale 1/2, Air/Alert or zero substitution | GNS-D03/D04/D08 clinical/product approval for unknown states, messaging and recovery; independent verifier verifies approved behavior. |
| B3-N04–06 (H03/H08) | Unapproved granularity may change points/response near boundaries; consequences not adjudicated | Compare rejection, supported measurement precision or explicitly approved mapping. HTML step enforcement alone is not a clinical specification | Clinical deterioration and measurement/POCT leads approve units/granularity and boundary oracle under GNS-D03/D06; no rounding, threshold or tolerance selected here. |
| B3-N07 and contextual gaps (H03/H08/H11) | Existing blank-field rejection works; incomplete observations/defaults/eligibility can still fail clinical workflow expectations | Preserve current rejection during lifecycle-only work. Separately specify missing versus unobtainable observations, eligibility, defaults and local response | Clinical/facility deterioration, respiratory and nursing leads; GNS-D03/D04/D06. A new partial-score or escalation policy cannot be treated as technical cleanup. |

The risk register already records all these supported mechanisms under H04/H08 and related hazards; no new hazard or justified risk-status change was identified. It is unchanged. H01 Infusions rounding remains UNRESOLVED; H05–H07 ABG clinical/laboratory policies remain PENDING. This triage does not waive those blockers for a future limited release.

## Proposed regression requirements

These are future test specifications, not test changes or clinical approvals. Engineering invariants can be specified separately from clinical expected messages. Freeze clinical expectations before implementation; do not copy current malformed outputs into a passing acceptance oracle.

| Proposed test ID | Required coverage | Proposed acceptance evidence / owner |
| --- | --- | --- |
| B3-T01 | Each calculator fresh close button/Escape; GCS backdrop versus inside-dialog click; NEWS2/SI replacement; repeat 20 cycles and cross-calculator sequences | Independent listener identity accounting: one owned callback per active instance, none after disposal, no growth. Twenty cycles is an engineering stress sample, not a clinical acceptance threshold. Verify unrelated handlers survive. Engineering reviewer. |
| B3-T02 | Actual browser Tab/Shift+Tab/Escape after dismissal/replacement; original trigger focus; replacement focus; removed trigger; active dialog ownership | No detached dialog handles keys; intended active focus target and reachable close action; no focus theft or prevented background key after all dialogs close. Browser evidence and accessibility sign-off required, not VM focus-call counts alone. |
| B3-T03 | GCS every legal triple, all 90 NT-containing combinations plus 120 numeric combinations; missing/NT transitions; each injected component zero/out-of-domain/fraction/nonfinite/nonnumeric/empty; malformed value combined with NT | Valid behavior preserved; invalid data never becomes an apparently valid total/label under the approved rejection policy. Preserve entered components and prove recovery/reset. Clinical reviewer approves missing/NT/error states; verifier independently derives legal expectations. |
| B3-T04 | NEWS2 each enum empty/unknown/removed selected option; missing element separately; combinations with otherwise valid/nonzero scores; invalidation and correction | No default-normal substitution under the approved policy. Assert total, text and every component, retained inputs and explicit recalculation. Missing-node handling requires its own bounded robustness specification; no result inferred from empty-string cases. |
| B3-T05 | NEWS2 every numerical bound/step and neighbors, representative fractional values; absent/unobtainable observations; Scale 2 eligibility; Air/Alert confirmation | Source-derived numerical anchors and clinically signed handling of unsupported/unavailable data. No new interpolation, partial score, default or response wording until approved. |
| B3-T06 | Existing accuracy/result-safety suites plus real DOM reset/reopen/input-change flows for all three; SI exact ratios and raw/display boundaries | Lifecycle-only change leaves formulas, accepted domains, outputs, warnings and valid-input behavior unchanged. Existing test PASS supplements independent cases; never substitutes for them. |

Run real-browser cases at 320/360/390/768/1280px, supported themes, keyboard and representative assistive technology. Repeated GCS invocation/duplicate IDs and browser numeric/select sanitization need separate exploratory evidence; they are not newly proven ordinary-UI defects in this phase. Retain source versions, exact build, environment, probe code, timestamped raw output and discrepancies with each verification record.

## Implementation order, gates and rollback

1. **Prepare authorization (now):** assign engineering owner, independent verifier, accessibility reviewer and clinical safety owner. Freeze baseline, reproduction cases and traceability; independently confirm browser reachability/impact. Approve a bounded lifecycle-only change request. This planning commit is not that authorization.
2. **GCS lifecycle (first technical candidate):** smallest owned cleanup change for the ordinary backdrop path. Require B3-T01/T02/T06, valid-output comparison and independent diff review before accepting the engineering fix. Keep clinical controls unchanged.
3. **NEWS2/SI replacement lifecycle:** isolate from GCS and from validators; explicitly review focus transfer and ownership. Same technical gate, including cross-dialog interactions. Do not introduce a general dialog rewrite or change input persistence incidentally.
4. **Defensive GCS and NEWS2 enum handling:** in parallel with steps 2–3, obtain GNS-D02/D03/D04/D08 decisions on unavailable output, messages and recovery. Only after signed requirements and separate authorization implement scoped changes with B3-T03/T04/T06. Engineering cannot approve the clinical policy by writing tests.
5. **Measurement/default/missing-observation policies:** obtain GNS-D03/D04/D06 clinical/facility decisions and source/rights reconciliation before any domain, precision, partial-score, eligibility or response change. Require B3-T05 and independent clinician scenario adjudication. Retain GCS/SI interpretation/population questions outside a lifecycle patch.
6. **Closure and release gate:** record reviewer signatures, exact commit, requirements-to-test results, unresolved discrepancies and qualified residual-risk disposition. Engineering closure of a listener leak does not close H08 or establish clinical validation. Clinical release remains NO-GO until the governance implementation, validation, regulatory and facility gates are independently satisfied.

For each future change, verification must show no unauthorized change to numerical output, accepted-input domain, warning/interpretation text, reset/recovery or focus ownership. Stop acceptance if any regression fails, any unauthorized clinical difference appears, a lifecycle leak remains, evidence is incomplete or browser behavior contradicts VM results. Do not relax assertions to make the change pass. Record and adjudicate the discrepancy.

Rollback planning: keep each authorized fix in an isolated, reviewable commit with its prior checkpoint recorded. If acceptance fails, withhold integration/release; revert the isolated future change in its authorized development branch and rerun scope/regression checks. Do not reset away unrelated work or change main. Confirm the restored build hash, owned listeners and documented known defects. Returning to the baseline restores known defects and does not make that baseline clinically safe or approved. Deployment rollback is a separate release-owner procedure and is not authorized here.

## Execution record and review checklist

Phase 3B re-executed the lifecycle/NEWS2 probes, fresh-close controls and 181-case observation replay. Relevant results match the earlier matrices, including GCS 16/NaN, all three listener leaks and NEWS2 blank-enum/step/missing recovery cases. This is repeat engineering observation, not 181 clinically validated PASS cases.

Executed unchanged: `node tests/calculator-accuracy-test.js` (PASS), `node tests/result-safety-test.js` (PASS: 93 transitions across Infusions/NEWS2/SI, no GCS coverage), and `python tests/smoke-test.py` (PASS: 30 scripts, 25 onclick functions, no static duplicate IDs). No other suite or browser test is claimed executed in Phase 3B. Static duplicate-ID PASS does not cover dynamic GCS duplication. No implementation defect is closed by these passes.

Documentation acceptance requires relative links resolve; all finding/test IDs remain traceable; exact tuples/outputs agree with probes; approval states remain explicit; `git diff --check` passes; and the staged diff contains only this new document. Existing clinical-safety decisions, matrices, risk register, source files, tests and workflows must remain unchanged.

Reviewer checklist for the later authorization meeting:

- Confirm normal, injected and programmatic paths separately; reproduce with controlled browser evidence.
- Confirm clinical significance remains unadjudicated; appoint the relevant clinical/measurement/facility reviewers.
- Approve lifecycle ownership/focus invariants separately from input/output policy.
- Resolve missing, invalid and NT distinctions, enums, precision and defaults without silent normalization.
- Freeze independent expected results, source editions, rights and recovery/message requirements before implementation.
- Review verification gaps, rollback trigger and all remaining release blockers; sign an exact scope/build and record residual-risk disposition.

Owner/reviewer identities, signatures and dates: **UNASSIGNED / PENDING**. Technical plan approval: **PENDING**. Clinical/product policy approval for these candidates: **PENDING**. Separate implementation authorization: **NOT AUTHORIZED**. Clinical release: **NO-GO**.
