# ABG Chromium CI checks

Phase 3B.9 addresses ENG-04 only. Production calculators and clinical policy are unchanged.

## Run locally or in GitHub Actions

```sh
python -B tests/chromium-runner-test.py
python tests/chromium-ci-test.py
```

Use `python tests/chromium-ci-test.py --browser /absolute/path/to/chromium` to select a browser explicitly. The runner detects `chromium`, `google-chrome`, or `chromium-browser`, fails if unavailable, and prints its version. GitHub's existing Ubuntu hosted image includes Chromium/Chrome; see the [official image inventory](https://github.com/actions/runner-images/blob/main/images/ubuntu/Ubuntu2404-Readme.md). No browser download, npm package, WebDriver, or additional Python dependency is installed by these test steps. Hosted image/browser versions can change; the emitted version identifies each run, but the browser build is not pinned.

The [workflow](../.github/workflows/tests.yml) retains its triggers, job timeout, Node/Python setup, structural test and every JavaScript regression. It adds JavaScript/inline-script syntax checks, runner failure-path checks and ABG browser execution.

## Harness coverage

| Harness | Required evidence |
| --- | --- |
| `abg-independent-fixtures-browser-test.html` | Actual 1280px and 390px viewports; 18 E1–E9 transitions, 30 primary boundaries, seven numerical display snapshots |
| `abg-result-safety-browser-test.html` | Actual 1280px and 390px viewports; 12 input/event transitions and seven Winter cases, including reset/reopening |
| `abg-modal-lifecycle-browser-test.html` | 390px and 1280px, light/dark; ten replacement cycles per combination, zero retained listeners |
| `abg-mobile-overflow-browser-test.html` | 320px, 360px, 390px and 1280px, light/dark; all eight combinations with positive client widths and no horizontal overflow |

None of these four harnesses ran in CI before this phase. The fixture and result-safety harnesses run in fixed-width iframes to avoid Chromium's minimum top-level window width. Lifecycle and overflow harnesses already embed the full application. Each invocation gets an isolated temporary browser profile; wrappers and profiles are removed afterward.

Tests use local `file:` assets. Browser DNS resolution is disabled, HTTP(S) traffic is routed to a non-serving loopback proxy, and background networking/component updates are disabled. Test execution needs no external network. Checkout and existing language-setup Actions still use the normal GitHub infrastructure.

## Failure contract and negative controls

`chromium-ci-test.py` requires exactly one JSON verification output, explicit `status: PASS`, the expected viewport/completion counts, and complete theme matrices. Browser nonzero exit, process timeout (30 seconds per invocation), FAIL/ERROR, RUNNING, malformed/missing/duplicate output, wrong viewport or partial evidence fail the command. A whole job remains subject to the existing five-minute workflow timeout.

The shared `browser-harness-guard.js` loads before fixture/calculator dependencies in every ABG harness. Captured load errors, uncaught script errors and rejected promises produce sticky ERROR output: later code cannot overwrite an error with PASS. A five-second virtual-time watchdog converts incomplete execution into ERROR; Chromium advances virtual time with an eight-second budget. If the guard itself fails to load, the runner still rejects missing/RUNNING output and enforces its process deadline.

`chromium-runner-test.py` verifies status/output/schema rejection, subprocess failure propagation, a real stalled-process timeout, and real Chromium negative controls for missing fixtures, runtime errors, rejected promises, never-completing execution and an attempted PASS after an error. Negative controls use temporary files and do not damage repository assets.

## Limits

All four ABG harnesses can be automated safely. `infusions-browser-test.html` remains outside this ABG-only change; it is automatable, not deemed unsafe. The earlier standalone lifecycle/overflow Python runners remain available; the unified runner is the CI entry point.

Desktop/mobile checks use CSS viewport widths, not physical mobile devices or touch emulation. Keyboard interaction is synthetic; screen-reader and clinical validity review remain separate. The guards observe their harness window; full-application iframe failures are detected through harness assertions and completion checks, not a comprehensive browser-console/CDP monitor. A deliberately falsified harness can still emit matching metadata; this runner cannot establish test quality or clinical truth independently of reviewed assertions.

Passing these regressions does not approve clinical interpretation, rounding policy or release authorization.
