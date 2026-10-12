"""Dependency-free local Chromium runner. No external network is needed to execute tests."""
import argparse
from html.parser import HTMLParser
import json
import os
import signal
from pathlib import Path
import shutil
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]

def find_browser():
    # Hosted Ubuntu exports CHROME_BIN for its packaged Google Chrome. Prefer
    # that stable browser to the independently installed Chromium snapshot.
    configured = os.environ.get("CHROME_BIN")
    if configured:
        browser = shutil.which(configured)
        if not browser:
            raise ValueError(f"Configured CHROME_BIN is not executable: {configured}")
        return browser
    return shutil.which("google-chrome") or shutil.which("chromium") or shutil.which("chromium-browser")

class ResultParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.results = []
        self.active = False
    def handle_starttag(self, tag, attrs):
        if tag == "pre" and dict(attrs).get("id") == "verification":
            self.results.append("")
            self.active = True
    def handle_endtag(self, tag):
        if tag == "pre":
            self.active = False
    def handle_data(self, data):
        if self.active:
            self.results[-1] += data

def parse_result(dom):
    parser = ResultParser()
    parser.feed(dom)
    if len(parser.results) != 1:
        raise ValueError("Missing or duplicate verification output")
    result = json.loads(parser.results[0])
    if not isinstance(result, dict) or result.get("status") != "PASS":
        raise ValueError(f"Non-PASS or incomplete execution: {result}")
    return result

def validate(result, kind, width=None):
    if kind == "calculator-lifecycle":
        checks = result.get("checks")
        expected = {(w, theme, calculator) for w in (320, 360, 390, 768, 1280)
                    for theme in ("light", "dark")
                    for calculator in ("openGCSCalculator", "openNEWS2Calculator", "openShockIndexCalculator")}
        if (not isinstance(checks, list) or len(checks) != 30
                or any(not isinstance(c, dict) for c in checks)
                or {(c.get("width"), c.get("theme"), c.get("calculator")) for c in checks} != expected):
            raise ValueError("Incomplete calculator lifecycle matrix")
        for check in checks:
            if (type(check.get("width")) is not int
                    or type(check.get("cycles")) is not int or check["cycles"] != 20
                    or type(check.get("remainingOwnedListeners")) is not int
                    or check["remainingOwnedListeners"] != 0):
                raise ValueError("Incomplete calculator cycles or retained keyboard handlers")
    elif kind in ("fixtures", "safety"):
        if result.get("viewport", [None])[0] != width:
            raise ValueError("Wrong actual viewport")
        expected = {"exampleTransitions": 18, "primaryBoundaries": 30, "numericalDisplayCases": 7} if kind == "fixtures" else {"transitions": 12, "winterCases": 7}
        if any(result.get(key) != value for key, value in expected.items()):
            raise ValueError(f"Incomplete {kind} coverage")
    else:
        checks = result.get("checks")
        widths = (390, 1280) if kind == "lifecycle" else (320, 360, 390, 1280)
        expected = {(width, theme) for width in widths for theme in ("light", "dark")}
        if not isinstance(checks, list) or len(checks) != len(expected) or {(c.get("width"), c.get("theme")) for c in checks} != expected:
            raise ValueError("Incomplete viewport/theme coverage")
        for check in checks:
            if kind == "lifecycle":
                if check.get("cycles") != 10 or check.get("remainingListeners") != 0:
                    raise ValueError("Incomplete lifecycle or retained listeners")
            elif not isinstance(check.get("clientWidth"), int) or check["clientWidth"] <= 0 or not isinstance(check.get("scrollWidth"), int) or check["scrollWidth"] > check["clientWidth"]:
                raise ValueError("Invalid layout evidence or modal overflow")

def execute(browser, url, directory, timeout=30, evidence=None):
    command = [browser, "--headless", "--no-sandbox", "--disable-gpu", "--disable-background-networking",
         "--disable-component-update", "--no-first-run", "--no-default-browser-check",
         "--host-resolver-rules=MAP * ~NOTFOUND",
         "--proxy-server=http://127.0.0.1:9", "--proxy-bypass-list=<-loopback>",
         "--allow-file-access-from-files",
         f"--user-data-dir={directory}/profile", "--window-size=1400,1100",
         "--virtual-time-budget=8000", "--dump-dom", url]
    # Kill the owned process group before temporary-profile cleanup, including
    # children that could otherwise survive subprocess.run's parent-only kill.
    stdout = stderr = ""
    with subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                          text=True, start_new_session=True) as process:
        try:
            stdout, stderr = process.communicate(timeout=timeout)
            if process.returncode:
                raise subprocess.CalledProcessError(process.returncode, command, stdout, stderr)
        except subprocess.TimeoutExpired as error:
            try:
                os.killpg(process.pid, signal.SIGKILL)
            except ProcessLookupError:
                pass
            stdout, stderr = process.communicate(timeout=5)
            error.output, error.stderr = stdout, stderr
            print(f"Browser timeout: {browser} ({timeout}s); stderr: {stderr[-4000:]}", flush=True)
            raise
        finally:
            try:
                os.killpg(process.pid, signal.SIGKILL)
            except ProcessLookupError:
                pass
            if evidence is not None:
                evidence.mkdir(parents=True, exist_ok=True)
                (evidence / "dom.html").write_text(stdout)
                (evidence / "stderr.txt").write_text(stderr)
    return parse_result(stdout)

def wrapper(harness, width):
    # iframe content dimensions avoid Chromium's minimum top-level window width.
    return f'''<!doctype html><pre id="verification">RUNNING</pre>
<script src="{(ROOT / 'tests/browser-harness-guard.js').as_uri()}"></script>
<iframe width="{width}" height="900" src="{harness.as_uri()}"></iframe>
<script>const frame = document.querySelector('iframe'); frame.addEventListener('load', () => {{
    const output = frame.contentDocument.getElementById('verification');
    if (!output) throw Error('Missing child verification output');
    const copy = () => document.getElementById('verification').textContent = output.textContent;
    new MutationObserver(copy).observe(output, {{childList:true, characterData:true, subtree:true}}); copy();
}});</script>'''

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--browser", default=None)
    parser.add_argument("--artifacts-dir", type=Path)
    args = parser.parse_args()
    args.browser = args.browser or find_browser()
    if not args.browser:
        parser.error("Chromium/Chrome is required; use --browser PATH")
    version = subprocess.run([args.browser, "--version"], capture_output=True, text=True, check=True)
    print(f"Browser: {args.browser}; {version.stdout.strip()}", flush=True)
    evidence = args.artifacts_dir
    if evidence:
        evidence.mkdir(parents=True, exist_ok=True)
        revision = subprocess.run(["git", "rev-parse", "HEAD"], cwd=ROOT, capture_output=True, text=True, check=True)
        (evidence / "environment.json").write_text(json.dumps({
            "commit": revision.stdout.strip(), "browser": args.browser,
            "browserVersion": version.stdout.strip(), "status": "STARTED"
        }, indent=2) + "\n")
    cases = [("fixtures", "abg-independent-fixtures-browser-test.html", 1280),
             ("fixtures", "abg-independent-fixtures-browser-test.html", 390),
             ("safety", "abg-result-safety-browser-test.html", 1280),
             ("safety", "abg-result-safety-browser-test.html", 390),
             ("lifecycle", "abg-modal-lifecycle-browser-test.html", None),
             ("overflow", "abg-mobile-overflow-browser-test.html", None),
             ("calculator-lifecycle", "modal-keyboard-lifecycle-browser-test.html", None)]
    for kind, filename, width in cases:
        with tempfile.TemporaryDirectory(prefix="abg-ci-") as temp:
            harness = ROOT / "tests" / filename
            if width:
                page = Path(temp) / "wrapper.html"
                page.write_text(wrapper(harness, width))
                url = page.as_uri()
            else:
                url = harness.as_uri()
            case_evidence = evidence / f"{kind}-{width or 'matrix'}" if evidence else None
            try:
                result = execute(args.browser, url, temp, evidence=case_evidence)
                if case_evidence:
                    (case_evidence / "result.json").write_text(json.dumps(result, indent=2) + "\n")
                validate(result, kind, width)
            except (ValueError, KeyError, TypeError, IndexError, OSError, subprocess.SubprocessError) as error:
                if case_evidence:
                    case_evidence.mkdir(parents=True, exist_ok=True)
                    (case_evidence / "validation.json").write_text(json.dumps({"status": "FAIL", "error": str(error)}) + "\n")
                raise
            if case_evidence:
                (case_evidence / "validation.json").write_text('{"status": "PASS"}\n')
            print(f"PASS — {kind} {width or 'viewport/theme matrix'}: {json.dumps(result)}")

if __name__ == "__main__":
    try:
        main()
    except (ValueError, KeyError, TypeError, IndexError, OSError, subprocess.SubprocessError) as error:
        raise SystemExit(f"FAIL — Chromium regression: {error}") from error
