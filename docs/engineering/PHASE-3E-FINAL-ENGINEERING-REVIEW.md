# Phase 3E — Final modal lifecycle engineering review

Reviewed 2026-10-12 on `fix/v1.3-modal-lifecycle`, clean starting tree at `576070d71101506653241678fbb32378f0dc7788`. Baseline: `2232dfb21424115d6e0f0422e7a8031400381b03`. Supplied instructions and repository instruction inventory reviewed; no additional repository AGENTS.md/CLAUDE.md found.

**Recommendation: PASS for integration into a non-production development branch, limited to the Phase 3C technical changes.** No integration was performed. This is a scoped engineering judgment, not independent clinical validation, accessibility certification, approval of clinical policies or permission to deploy. Clinical implementation **NOT AUTHORIZED**; clinical release **NO-GO**. The target branch must rerun checks after any integration/conflict resolution; this review does not establish target-branch compatibility.

## Scope and implementation assessment

Reviewed the complete six-file diff against baseline: three calculator files, two new lifecycle harnesses and the [Phase 3C verification record](PHASE-3C-MODAL-LIFECYCLE-VERIFICATION.md). Production differences are limited to GCS backdrop routing, NEWS2/Shock Index replacement cleanup and an idempotent close guard in each calculator. No ABG, Infusions, existing tests, algorithms, workflows, clinical-safety decisions or risk-register changes occur in that diff. This review adds only this document.

| Area | Assessment |
| --- | --- |
| Listener ownership | Each close routine removes its own captured keydown function using the existing registration options. Unrelated listeners survive. No global listener purge is introduced. |
| Idempotence | The closed flag is set before removal/focus restoration. Repeated close calls are inert; replacement invokes the old instance's close routine rather than merely removing its DOM. |
| Focus | GCS backdrop now restores the original target through the shared close path. Replacement restores the original target before the new instance captures it; final close can return there. Existing close-button focus on open remains. |
| Escape / Tab | Handler logic is unchanged. Escape uses the guarded close; Tab/Shift+Tab wrapping and interior Tab behavior are tested. Removed instances no longer intercept subsequent document keys in the tested sequences. |
| Detached controls | Retained old close buttons are tested and inert. Other detached controls are outside the cleanup claim: their element listeners are not removed and may use document-global IDs if externally retained and invoked. This is a pre-existing abnormal-state limitation, not demonstrated ordinary UI reachability or a newly fixed behavior. |
| Clinical scope | Calculation/validation suffixes and all template literals in all three files are byte-identical to baseline. Diff inspection confirms no scoring, thresholds, units, interpretations, warnings, accepted-input policy or reference changes. Invalid GCS and NEWS2 enum behavior remains unresolved and unchanged. |

No integration-blocking defect was identified in these bounded changes. Source references: [GCS](../../js/calculators/gcs.js), [NEWS2](../../js/calculators/news2.js), [Shock Index](../../js/calculators/shock-index.js). The [Phase 3B triage](PHASE-3B-DEFECT-TRIAGE.md) remains the record of broader unresolved findings.

## Evidence executed by Codex in Phase 3E

- **PASS:** all 12 `tests/*test.js` suites (11 pre-existing plus the new lifecycle suite). Existing clinical regression expectations were not edited.
- **PASS:** `python tests/smoke-test.py`: 30 scripts, 25 onclick functions, no static duplicate IDs. Dynamic modal duplication is not covered by that result.
- **PASS:** fresh 181-case executions against both git versions, using temporary extracted copies without switching or modifying branches. All output-bearing trace records compare exactly, including totals, labels, alerts, raw SI values and recorded reset controls; only listener/focus telemetry is excluded. Case counts: GCS 33, NEWS2 108, SI 40. This is regression equivalence, not a clinical truth-set approval.
- **PASS:** three separate negative controls, restoring each calculator alone to baseline in a temporary copy while retaining the new test and the other two fixed calculators. The lifecycle suite fails for each restored defect; it is sensitive to all three regressions rather than merely passing the new implementation.
- **PASS:** new browser harness inline JavaScript syntax, unchanged clinical sections/templates, baseline diff whitespace and document link/scope checks.

The comparison reuses the Phase 3A temporary dataset/observer, not a new independent clinical oracle. Dataset SHA256: `650c2cb888cbe666d3c262bcbedb6cbab0cdb277db57136681c0d5a938a9a662`. Fresh machine-readable outputs are `/tmp/phase3e/2232dfb.json` and `/tmp/phase3e/576070d.json`; diagnostic negative-control logs are in the same temporary directory. These are local, ephemeral engineering artifacts, not a committed evidence archive. Formal validation must retain a controlled runner, dataset, raw output and signed provenance. The matrix definitions remain in [Phase 3A](../clinical-validation/INDEPENDENT-REVIEW-PROTOCOL.md).

## Browser evidence and provenance

**User-reported, not independently witnessed by Codex:** the existing mobile/browser runner passed **17/17**; the new lifecycle harness passed with **30 rows × 20 cycles = 600 cycles**, zero remaining owned listeners. This supersedes the earlier PENDING status for user execution only; the historical Phase 3C record remains unchanged. No raw browser JSON/log, exact browser version or timestamped build attestation was supplied with this request or located in the reviewed repository inventory. Artifact paths were requested; no browser artifact is independently authenticated by this review.

Codex retried Chromium startup with a fresh temporary profile and normal security: exit `-5`, Crashpad `setsockopt: Operation not permitted`, before loading a harness. **Codex browser execution remains BLOCKED/PENDING.** No new browser PASS is claimed here.

Reproducible evidence follow-up: retain stdout from `python scripts/validate-mobile-browser.py`; save the full `#verification.textContent` JSON from [the new harness](../../tests/modal-keyboard-lifecycle-browser-test.html), served from this checkout. Record `git rev-parse HEAD`, clean-tree status, browser version, time and artifact hashes. Verify `status=PASS`, exactly 30 unique width/theme/calculator combinations (320/360/390/768/1280 × light/dark × GCS/NEWS2/SI), each with `cycles=20` and `remainingOwnedListeners=0`. The existing runner does not run the new harness. A bare PASS string is insufficient provenance; no fabricated JSON has been substituted for the user's report.

## Harness review and residual limitations

[Node harness](../../tests/modal-keyboard-lifecycle-test.js) independently observes listener registrations/removals rather than reading the production closed flag. It asserts an unrelated listener survives, 20 cycles per calculator, repeated cleanup, backdrop/inside click, replacement, focus, Escape and Tab. Its minimal DOM cannot establish native focus/layout/bubbling or assistive-technology correctness. The negative controls above strengthen regression sensitivity but do not make this same-agent work independent professional verification.

The browser harness forwards instrumented add/remove calls to the real document and checks actual activeElement and viewport width. Its counters exclude pre-existing uninstrumented listeners and do not model capture/options variants; current calculator registrations use the simple supported form. It includes assertion failure reporting and the existing parent-page error/watchdog guard. It does not establish comprehensive child-frame runtime-error monitoring. Synthetic key events test handler behavior, not native Tab navigation. Both harnesses omit explicit modal-disconnection/unique-dialog assertions; source inspection confirms removal, but future coverage should assert these directly. They also omit removed/disabled opener targets, empty focusable sets, simultaneous cross-calculator dialogs and externally invoked detached non-close controls. NEWS2/SI cycles always exercise replacement before final dismissal; ordinary close is additionally exercised by existing regressions.

These gaps do not invalidate the reproduced listener fixes, but are follow-up engineering/accessibility work. Programmatic duplicate GCS opens, arbitrary external DOM removal, a foreign modal with the same ID lacking its owned close method, and inaccessible original focus targets remain abnormal/unverified conditions; no broad dialog manager robustness is claimed. Native keyboard, screen readers, zoom, touch, contrast and clinical workflow comprehension remain outside this PASS. Persisting the user browser artifacts is recommended for audit traceability before integration is recorded.

The recommendation relies on reproducible Node evidence, narrow source review, exact output equivalence and explicitly attributed user browser reports. No unresolved clinical/input-policy or Infusions/ABG risk is accepted by it. Clinical/laboratory policies remain **PENDING**, clinical implementation **NOT AUTHORIZED**, and clinical release **NO-GO**. Only the local review-document commit is authorized in this phase; no merge, push, rebase or protected-branch change is performed.
