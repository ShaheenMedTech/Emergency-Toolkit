# Phase 3C — Technical modal lifecycle verification

Date: 2026-10-12. Baseline: `2232dfb21424115d6e0f0422e7a8031400381b03`, verified clean on `docs/v1.3-clinical-governance`. Work branch: `fix/v1.3-modal-lifecycle`.

The Phase 3C user instruction authorizes these technical fixes and a local commit. It supersedes the planning-only implementation restriction for this bounded lifecycle work in [Phase 3B](PHASE-3B-DEFECT-TRIAGE.md). Clinical implementation remains **NOT AUTHORIZED**, clinical decisions **PENDING**, and clinical release **NO-GO**. This is engineering verification, not clinical validation or independent professional sign-off.

## Change and reproduced evidence

GCS backdrop dismissal now calls the existing close routine. Each of the three close routines has an idempotence guard. NEWS2 and Shock Index store their owned close routine on the modal; replacement calls that routine before creating the next modal. It removes only its own document keyboard callback and restores the original focus target before the new dialog captures it. Repeated calls from disposed close controls neither remove another instance's handler nor move focus.

No scoring, numerical formulas, thresholds, labels, warnings, validation policy, clinical references, Infusions or ABG files changed. Injected GCS values and NEWS2 empty-selection fallbacks remain unresolved and unchanged. No new dismissal gesture was added to NEWS2 or Shock Index.

Counts below exclude unrelated document listeners. Reproduction used the Phase 3B temporary instrumented VM probe before and after editing production code.

| Path | Before | After |
| --- | --- | --- |
| GCS open → backdrop → reopen → button close | `1 → 1 → 2 → 1`; backdrop focus restoration calls 0 | `1 → 0 → 1 → 0`; backdrop focus restoration calls 1 |
| NEWS2 open → replace → button close | `1 → 2 → 1` | `1 → 1 → 0` |
| Shock Index open → replace → button close | `1 → 2 → 1` | `1 → 1 → 0` |

## Automated coverage and results

New [Node regression](../../tests/modal-keyboard-lifecycle-test.js): **PASS**, 20 cycles per calculator. It checks listener ownership/counts, exactly one removal per owned callback, unrelated-listener preservation, GCS backdrop versus inside click, NEWS2/SI replacement, repeated disposal, stale close controls, Escape, forward/backward Tab wrapping, interior Tab, focus restoration and no detached keyboard interception after close. It executes production code with a purpose-built minimal DOM; layout and native browser focus are outside its evidence scope. Running it against the unmodified baseline fails on the GCS retained-handler assertion as expected.

All **11 pre-existing `tests/*test.js` suites PASS** unchanged, plus the new suite (12 total). This includes six ABG suites, calculator accuracy, result safety, both Infusions suites and the isolated precision prototype. Passing Infusions tests does not resolve the known rounding defects. Structural smoke: **PASS**, 30 scripts, 25 onclick functions and no static duplicate IDs. `git diff --check` and new browser harness JavaScript syntax check: **PASS**.

Clinical-output comparison: the temporary Phase 3A observer replayed all 181 cases. Output-bearing snapshots (including alerts, intermediate recovery/reset states and recorded controls) match the pre-change payload exactly. Listener/focus telemetry is excluded from equality because it is the intended change. Existing accuracy fixtures also pass, including 120 numeric GCS combinations, NT masks, NEWS2 scoring and SI boundaries. This establishes regression equivalence on those cases, not exhaustive clinical correctness; malformed-state outputs remain as documented.

## Browser evidence: PENDING

Installed Chromium was attempted with a fresh temporary profile, headless mode and normal web security. It exited `-5` before loading a page, reporting `setsockopt: Operation not permitted` from Crashpad. Starting a loopback HTTP server also failed with `PermissionError: [Errno 1] Operation not permitted`. No browser harness ran in this phase; existing browser tests and the new harness remain **PENDING** on this build. Earlier user-reported browser results are historical and are not reused as passes for these changes.

New [browser harness](../../tests/modal-keyboard-lifecycle-browser-test.html) is prepared for 320/360/390/768/1280px, light/dark, 20 cycles per calculator (600 total if fully executed). It instruments native document registration and checks focus, Tab/Escape, replacement/backdrop, idempotence and unrelated listeners. Its success marker is `#verification` JSON with `status: "PASS"` and 30 result rows, each reporting 20 cycles and zero remaining owned handlers. Syntax was checked; execution is unverified. Synthetic keyboard dispatch checks handlers, not OS-level keyboard navigation or screen-reader conformance.

Outside the sandbox, serve this checkout with `python -m http.server 8081 --bind 127.0.0.1`, open `http://127.0.0.1:8081/tests/modal-keyboard-lifecycle-browser-test.html` in Chromium, and inspect the completed JSON. Run the existing `python scripts/validate-mobile-browser.py` separately for its established ABG/Infusions browser inventory; it does not include the new harness. Retain full output, exact commit and browser version. Confirm native keyboard and assistive-technology behavior independently before accepting browser/human-factors verification.

## Remaining review

Independent engineering review should inspect callback ownership and replacement focus restoration, execute the real-browser checks and confirm no clinical diff. Clinical/input-policy gaps, GCS repeated simultaneous invocation beyond the supported dismissal sequence, wider human-factors review, Infusions defects, ABG policies and governance release gates remain open. Existing risk records and clinical decisions are unchanged; this technical commit does not claim residual-risk acceptance or close clinical hazards.
