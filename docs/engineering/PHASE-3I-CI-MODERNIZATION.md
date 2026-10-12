# Phase 3I — Non-production CI modernization

Baseline: `3dd23822ca1b040581a17b3522b23b783b6ccc32`, verified clean on `v1.3-development-reconciled`. Work branch: `chore/v1.3-ci-modernization`. Date: 2026-10-12. Clinical implementation **NOT AUTHORIZED**; clinical release **NO-GO**. No application, clinical policy, Pages or deployment changes.

## Configuration and coverage

The sole workflow, `.github/workflows/tests.yml`, retains push coverage for main and old development, adds reconciled development, and accepts PRs targeting main or either development branch. Permissions remain `contents: read`; no secrets or deployment steps. It retains Node 22/Python 3.13, all JS suites, structural checks, syntax checks and browser-runner negative controls. Existing five-minute job limit remains. The README badge is deliberately unchanged: its old-development reference is still supported, while this local workflow has not been integrated/published on the reconciled branch. Change the badge only after that workflow/branch pairing is available remotely.

The Chromium runner retains all six existing invocations: ABG fixtures and result safety at 390/1280px, ABG lifecycle at 390/1280 in light/dark (10 cycles), and ABG overflow at 320/360/390/1280 in light/dark. A seventh invocation adds the existing GCS/NEWS2/Shock Index lifecycle harness. Its acceptance requires exactly 30 unique tuples: five widths (320/360/390/768/1280), two themes, three calculators; each row requires integer 20 cycles and integer zero remaining owned keyboard handlers. Missing, duplicate, malformed or unexpected rows, incomplete cycles and retained handlers fail validation. The harness must first supply terminal PASS JSON; JSON alone without the expected matrix is insufficient.

Python exceptions propagate to a nonzero runner exit and fail the Actions step; no continue-on-error or browser skip is added. Added tests exercise matrix rejection, seventh-invocation wiring and CLI failure/evidence output. Fake executables and mocked outputs test runner plumbing only, never browser behavior. The separate local 17-invocation mobile runner remains unchanged; it is not the CI runner and does not automatically gain the new harness.

## Execution and evidence

Run from the repository root:

```sh
python tests/chromium-runner-test.py
python tests/chromium-ci-test.py --artifacts-dir /tmp/toolkit-chromium-evidence
```

Browser selection remains CHROME_BIN, then google-chrome, chromium or chromium-browser. No new package dependency or browser-security flag is introduced. The inherited runner uses headless file-origin execution with `--allow-file-access-from-files` and `--no-sandbox`, blocks external resolution/proxy traffic and uses disposable profiles. This requires a trusted ephemeral CI worker; it is not production browser configuration. It does not use `--disable-web-security`. Hosted browser availability/version is checked at runtime; absence/startup failure fails the job.

The workflow writes `artifacts/chromium/`, then uploads it with `if: always()`, read-only repository permissions and 14-day retention. It contains environment.json (commit, browser/version, STARTED marker), per-invocation raw DOM, stderr, parsed result.json when parsing succeeds, and validation.json PASS/FAIL. STARTED is not aggregate success. Judge completion by runner exit and all seven validation results. Execution stops at the first failure; later invocations are unexecuted, not passed. No artifact directory may exist if an earlier workflow step or browser discovery/version check fails; upload warns rather than masking the original failure. Actions logs retain that failure. Only synthetic browser evidence is captured; no patient data or secrets are introduced.

## Local validation and limitations

User-executed verification, reported before this finalization: actionlint 1.7.12 PASS; Chromium browser regression PASS; calculator lifecycle 30/30 matrix rows, 20 cycles each, zero retained owned listeners; full Python runner suite 11/11 PASS; `git diff --check` PASS. These are user-reported local results, not Codex-executed browser checks or GitHub-hosted CI results. They supersede the earlier local startup blockage for the commit gate.

Codex-executed finalization checks (2026-10-12): all 12 JavaScript regression suites PASS; structural smoke PASS (30 scripts, 25 onclick functions, zero duplicate IDs); syntax PASS for 46 JavaScript files, six inline harness scripts and five Python files (AST); actionlint 1.7.12 PASS. The ten non-browser runner tests PASS, including matrix rejection, seventh-invocation wiring, CLI failure/evidence and process cleanup. An additional 45 missing-field/malformed-value matrix controls were rejected. Codex did not rerun the real-browser guard test or Chromium regression in this finalization; browser execution evidence remains attributed to the user. Local runtimes were Node v26.11.1 and Python 3.14.8, rather than hosted Node 22/Python 3.13.

Earlier Codex browser attempts were infrastructure BLOCKED by Chromium startup SIGTRAP with Crashpad `setsockopt: Operation not permitted`; they were not browser passes. Earlier failure evidence was recorded at `/tmp/phase3i-chromium-evidence`. Actionlint is now available and its successful Codex run replaces the earlier pending YAML validation. GitHub-hosted execution remains unverified.

Browser harness assertions cover synthetic keyboard/focus/listener behavior, not native keyboard navigation, screen readers, comprehensive mobile accessibility or clinical suitability. The new branch's workflow runs on a PR to a listed target or after authorized integration; its own feature-branch pushes are not a new trigger. No push or integration is performed here.

Commit gate: user-reported browser verification and Codex-executed local checks support one local CI-only commit, subject to final working-tree and staged-diff whitespace checks. Only the workflow, two Python runner files and this report are included; generated Python caches are excluded. No push, merge, rebase or deployment is authorized or performed. Existing baseline/protected branches remain unchanged. Clinical implementation remains NOT AUTHORIZED; clinical policies remain PENDING and clinical release NO-GO.
