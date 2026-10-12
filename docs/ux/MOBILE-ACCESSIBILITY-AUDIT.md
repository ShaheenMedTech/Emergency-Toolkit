# v1.3 Mobile usability and accessibility audit

Prepared 2026-10-12 on `feat/v1.3-mobile-ux-accessibility` from `c837c3e5d8b283fceda1167d59827f46a0384576`. Expected original branch and clean working tree verified before branch creation. No repository AGENTS.md/CLAUDE.md found; supplied instructions and Ryoku vault read. Original clinical-safety branch remains at the baseline.

## Supported interface

The site declares English (`lang="en"`), contains English UI text and has no language picker or localization bundles. Light/dark themes are supported by `body.dark-mode`. Home tool-card buttons provide navigation into calculator/reference dialogs; no navigation menu or HTML tables were found. No additional languages or menu/table defects are asserted.

## Confirmed source-level defects and fixes

| Reproduction | Evidence | Presentation-only fix |
| --- | --- | --- |
| Inspect the theme toggle's accessible-name/state attributes | Home button contained only a moon emoji, no descriptive label/state | Stable `Dark theme` accessible name and `aria-pressed`, updated on toggle. |
| Open a tool and inspect the close control | Calculator/algorithm close buttons contained only × and no descriptive name | `Close dialog` accessible name in all 29 dialog templates. |
| Inspect close/theme dimensions | Theme 42px; most close controls 38px; GCS inline dimensions 36px | Shared minimum width/height 44px, no flex shrinking, including inline-sized GCS control. These are target-size improvements, not a claim that all prior targets violated WCAG minimums. |
| Inspect shared focus styling in light mode | No shared authored focus rule; dark-mode rule existed for dialog controls only | Shared `:focus-visible` outline for buttons, links, form controls and focusable elements, with light/dark colors. Native focus had not been removed; this improves consistency. |

All calculator/algorithm source changes are limited to close-button aria-label attributes. Input values, validation, clinical formulas/thresholds/classifications, result strings and clinical warning text are unchanged. Theme JavaScript changes only its UI pressed state.

## Validation and limitations — completion review 2026-10-12

Passed structural smoke test, JavaScript syntax checks and all 11 existing Node regression suites. Verified each calculator/algorithm file against baseline after removing the single added accessibility attribute: byte-for-byte equality. Verified original branch pointer and unchanged tests/workflows/clinical-safety documents. Diff whitespace check passed. No new clinical approval is implied; clinical release remains NO-GO.

A temporary Chromium audit harness was prepared to inspect home plus calculators/reference dialogs at 320, 360, 390, 768 and 1280 CSS pixels in both themes, including populated ABG long result labels. Chromium crashed before loading the harness: crashpad `setsockopt: Operation not permitted`, exit 133. Tool escalation was rejected by the environment's approval policy. No Codex browser assertion or screenshot succeeded in that sandbox attempt; this limitation is separate from the later user-reported results below.

### Tests executed by Codex

- Structural smoke test: PASS (30 scripts, 25 onclick functions, no duplicate HTML IDs).
- All 11 existing JavaScript regression suites: PASS (`abg-anion-gap-numerical`, `abg-independent-fixtures`, `abg-modal-lifecycle`, `abg-oxygenation`, `abg-result-safety`, `abg-winter-display`, `calculator-accuracy`, `infusion-precision-prototype`, `infusions`, `infusions-verification`, `result-safety`).
- Syntax for all JavaScript in js/tests and inline test-harness scripts: PASS.
- Ad hoc VM theme-toggle check: PASS; aria-pressed follows light → dark → light while the accessible name remains stable.
- Full diff audit: PASS; after removing added close aria-labels, all 29 calculator/algorithm files equal baseline exactly. Index change only theme name/state; app change only pressed-state update; CSS additions only focus/target styles. Clinical formulas, validation, warnings, patient-data behavior, tests, workflows and clinical-safety documents are untouched.
- ABG modal lifecycle browser wrapper: BLOCKED at Chromium startup (SIGTRAP); no browser assertions ran.
- Chromium runner test suite: 8 tests attempted; 7 completed without reported failure, one real-browser positive-startup prerequisite errored with SIGTRAP. Overall runner suite did not pass; its browser-dependent guard checks remain unverified. It is not clinical or browser-layout evidence.
- Git whitespace checks: PASS.

### Browser results reported by the user — validation checkpoint

The user executed `scripts/validate-mobile-browser.py` outside the Codex sandbox with real installed Chromium and reported **17/17 invocations PASS, exit code 0**, through the local HTTP procedure. Codex did not execute or independently inspect that browser run; browser version and raw logs were not supplied. These are user-reported regression results, not independent clinical validation.

| Existing harness | User-reported execution coverage | Scope limitation |
| --- | --- | --- |
| ABG independent fixtures | 5 invocations: 320/360/390/768/1280px | Baseline fixtures/counts and actual viewport; no full-site/theme/layout conformance implied. |
| ABG result safety | 5 invocations: 320/360/390/768/1280px | Existing invalidation/recovery and Winter assertions; no clinical applicability approval. |
| Infusions | 5 invocations: 320/360/390/768/1280px | Existing regression markers PASS; small-rate/concentration rounding defects explicitly remain **UNRESOLVED**. |
| ABG lifecycle | 1 invocation: internal 390/1280px × light/dark matrix | Existing cycles/listener/focus lifecycle assertions only; not keyboard or accessibility conformance for every dialog. |
| ABG E8 overflow | 1 invocation: internal 320/360/390/1280px × light/dark matrix | E8 populated modal overflow/text-selection assertions only; 768px not supported by this internal matrix. |

The earlier user-reported standalone E8 PASS is consistent with this batch report. No other browser harness, theme matrix or viewport is inferred. Passing existing display snapshots intentionally preserves known behavior; it does not resolve Infusions numerical policy or authorize clinical release.

Runner review: installed Chromium selection, explicit PASS JSON/count/viewport checks, per-test FAIL/BLOCKED reporting, bounded process execution and owned process-group cleanup, temporary same-origin wrapper cleanup and exact served-harness checks were inspected. No shell command interpolation, browser web-security override or browser-sandbox disabling flag is used. All five widths apply to the three adaptable harnesses; lifecycle/overflow internal matrices stay unchanged. Code duplication of harness completion contracts is intentional but must be updated when their expected counts/markers change. Temporary wrappers require repository scripts-directory write access and the checkout served at 127.0.0.1:8081.

Codex checkpoint checks: runner Python syntax, synthetic valid/incomplete/failed result handling, coverage checks, exit codes 0/1/2 and temporary-file cleanup; structural smoke test; all 11 JavaScript regressions; JavaScript/inline-script syntax and git whitespace checks. These are non-browser checks and do not independently reproduce the reported real Chromium results.

### Accessibility review and still-unverified checks

Static/VM review found no critical defect in these changes. Close controls remain native buttons with the same listeners, IDs and clinical-visible text. The stable `Dark theme` name describes a toggle whose pressed state matches activation. No tabindex or key handling was added, so existing focus trapping, Escape and focus return code remain unchanged. Shared focus styling does not remove native focus behavior. The more-specific preexisting dark dialog focus rule remains in effect where applicable. Minimum 44px dimensions override smaller width/height constraints, including GCS inline dimensions, and flex shrinking is disabled; this is a CSS review, not a rendered measurement.

Rendered touch-target geometry after cascade, focus visibility/clipping, real keyboard traversal and screen-reader behavior remain unverified beyond the reported harness assertions. The user-reported five-width fixtures/safety/infusion runs do not measure full-site responsive layout. E8 overflow at 768px, home navigation, other calculator/reference layouts, complete light/dark coverage outside the two built-in ABG matrices, 200% text resizing, browser zoom/reflow and contrast in context remain unverified. Table absence and English-only support remain source-inspection findings. Codex browser execution remains blocked by sandbox startup restrictions.

## Required follow-up audit

Retain the user-reported existing-harness PASS separately from the sandbox limitation. Review the full site at all five widths in both themes, including 768px populated E8 layout not covered by its fixed matrix. Test home navigation, all five calculator forms and reference dialogs; populate long ABG labels without changing clinical expectations. Verify keyboard Tab/Shift+Tab, Escape and focus return; 200% text resizing and browser zoom/reflow; contrast and visible focus; actual control bounds; page/modal overflow and scrolling; readable long headings/results. Use real keyboard and screen-reader review in addition to DOM assertions. Record exact reproduced defects before making further layout changes.

The UI change was committed as `0dd9717`; this browser-validation checkpoint records the reproducible runner and the user-reported 17/17 regression PASS separately from Codex checks and sandbox limitations. The complete rendered mobile/zoom/assistive-technology audit remains outstanding; this is not a claim of full accessibility conformance. No push, merge, rebase or change to main is authorized or performed. Clinical/laboratory approval remains PENDING; clinical implementation NOT AUTHORIZED; clinical release NO-GO.


## Exact original UI checkpoint file manifest (0dd9717)

- `css/style.css`
- `index.html`
- `js/algorithms/acs.js`
- `js/algorithms/acute-abdomen.js`
- `js/algorithms/airway.js`
- `js/algorithms/anaphylaxis.js`
- `js/algorithms/asthma.js`
- `js/algorithms/bowel-obstruction.js`
- `js/algorithms/breathing.js`
- `js/algorithms/cardiac-arrest.js`
- `js/algorithms/circulation.js`
- `js/algorithms/copd.js`
- `js/algorithms/disability.js`
- `js/algorithms/dka.js`
- `js/algorithms/electrolytes.js`
- `js/algorithms/emergency-drugs.js`
- `js/algorithms/exposure.js`
- `js/algorithms/gi-bleeding.js`
- `js/algorithms/paediatric.js`
- `js/algorithms/pancreatitis.js`
- `js/algorithms/pulmonary-oedema.js`
- `js/algorithms/seizures.js`
- `js/algorithms/sepsis.js`
- `js/algorithms/stroke.js`
- `js/algorithms/toxicology.js`
- `js/algorithms/trauma.js`
- `js/app.js`
- `js/calculators/acid-base.js`
- `js/calculators/gcs.js`
- `js/calculators/infusions.js`
- `js/calculators/news2.js`
- `js/calculators/shock-index.js`
- `docs/ux/MOBILE-ACCESSIBILITY-AUDIT.md`


## Browser-validation checkpoint change scope

Only `scripts/validate-mobile-browser.py` and this audit update are included. Clinical code, warning text, existing harnesses/tests/workflows, clinical-safety documents and the clinical-safety branch are unchanged. No push, merge, rebase or main change is performed. Clinical release remains **NO-GO**.
