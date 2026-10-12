#!/usr/bin/env python3
"""Run existing harnesses over localhost HTTP; no browser security overrides.
Exit 0: all PASS; 1: assertion/incomplete result FAIL; 2: infrastructure BLOCKED.
Temporary same-origin wrapper files are created under scripts/ and removed.
"""
import argparse
from html.parser import HTMLParser
import json
import os
from pathlib import Path
import shutil
import signal
import subprocess
import tempfile
import urllib.error
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
BASE = "http://127.0.0.1:8081"
WIDTHS = (320, 360, 390, 768, 1280)
HARNESSES = {
    "fixtures": "abg-independent-fixtures-browser-test.html",
    "safety": "abg-result-safety-browser-test.html",
    "infusions": "infusions-browser-test.html",
    "lifecycle": "abg-modal-lifecycle-browser-test.html",
    "overflow": "abg-mobile-overflow-browser-test.html",
}
INFUSION_MARKERS = [
    "PASS — all 12 ordered unit transitions and current display snapshots",
    "PASS — explicit unsupported-unit rejection preserves failure message and inputs",
    "PASS — all-unit input invalidation, invalid/corrected recovery, overflow, reset and reopen",
    "UNRESOLVED — small-rate/concentration rounding defects reproduced; current displays are not clinical acceptance criteria",
]

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
        raise ValueError("missing/duplicate #verification; no completed result")
    result = json.loads(parser.results[0])
    if not isinstance(result, dict) or result.get("status") != "PASS":
        raise ValueError(f"non-PASS or incomplete harness result: {result}")
    return result


def validate(result, kind, width):
    if kind in ("fixtures", "safety", "infusions"):
        if result.get("viewport", [None])[0] != width:
            raise ValueError("actual iframe viewport does not match requested width")
        counts = ({"exampleTransitions": 18, "primaryBoundaries": 30, "numericalDisplayCases": 7}
                  if kind == "fixtures" else {"transitions": 12, "winterCases": 7})
        if kind == "infusions":
            if result.get("checks") != INFUSION_MARKERS:
                raise ValueError("incomplete infusion coverage/limitation markers")
        elif any(result.get(k) != v for k, v in counts.items()):
            raise ValueError("incomplete assertion counts")
    else:
        widths = (390, 1280) if kind == "lifecycle" else (320, 360, 390, 1280)
        expected = {(w, theme) for w in widths for theme in ("light", "dark")}
        checks = result.get("checks")
        if not isinstance(checks, list) or len(checks) != len(expected):
            raise ValueError("incomplete viewport/theme matrix")
        if {(c.get("width"), c.get("theme")) for c in checks} != expected:
            raise ValueError("incorrect viewport/theme matrix")
        for c in checks:
            if kind == "lifecycle":
                if c.get("cycles") != 10 or c.get("remainingListeners") != 0:
                    raise ValueError("lifecycle cycle/listener assertion failed")
            elif (not isinstance(c.get("clientWidth"), int) or c["clientWidth"] <= 0
                  or not isinstance(c.get("scrollWidth"), int)
                  or c["scrollWidth"] > c["clientWidth"]):
                raise ValueError("invalid layout geometry or horizontal overflow")


def wrapper(filename, width):
    # Same-origin served wrapper avoids file-access and web-security overrides.
    return f'''<!doctype html><meta charset="utf-8"><pre id="verification">RUNNING</pre>
<script src="/tests/browser-harness-guard.js"></script>
<iframe title="Existing harness at {width}px" style="width:{width}px;height:900px;border:0" src="/tests/{filename}"></iframe>
<script>const frame=document.querySelector('iframe');frame.addEventListener('load',()=>{{
 const output=frame.contentDocument.getElementById('verification');
 if(!output)throw Error('Missing child verification output');
 const copy=()=>document.getElementById('verification').textContent=output.textContent;
 new MutationObserver(copy).observe(output,{{childList:true,characterData:true,subtree:true}});copy();
}});</script>'''


def fetch_matches(relative, expected):
    # Ignore ambient proxies for this loopback-only validation procedure.
    opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
    with opener.open(BASE + "/" + relative, timeout=5) as response:
        if response.geturl() != BASE + "/" + relative or response.read() != expected:
            raise ValueError("HTTP server is not serving this checkout's exact file")


def run_browser(browser, url):
    with tempfile.TemporaryDirectory(prefix="toolkit-browser-") as profile:
        command = [browser, "--headless", "--disable-gpu", "--no-first-run",
                   "--no-default-browser-check", "--disable-background-networking",
                   "--disable-component-update", f"--user-data-dir={profile}",
                   "--window-size=1400,1100", "--virtual-time-budget=8000", "--dump-dom", url]
        with subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                              text=True, start_new_session=True) as process:
            try:
                stdout, stderr = process.communicate(timeout=30)
                if process.returncode:
                    raise RuntimeError(f"Chromium exit {process.returncode}: {stderr[-1500:]}")
                return stdout
            finally:
                try:
                    os.killpg(process.pid, signal.SIGKILL)
                except ProcessLookupError:
                    pass
                process.communicate(timeout=5)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--browser", help="installed Chromium executable (otherwise chromium/chromium-browser)")
    args = parser.parse_args()
    browser = shutil.which(args.browser) if args.browser else (shutil.which("chromium") or shutil.which("chromium-browser"))
    cases = [(kind, w) for kind in ("fixtures", "safety", "infusions") for w in WIDTHS]
    cases += [(kind, None) for kind in ("lifecycle", "overflow")]
    print("Existing fixtures/safety/infusions: actual iframe widths 320/360/390/768/1280; no theme/layout assertions implied.")
    print("Lifecycle: 390/1280 light+dark. E8 overflow: 320/360/390/1280 light+dark; 768 not supported by that harness.")
    print("No general mobile, zoom, contrast, touch-target or screen-reader conformance is asserted. Clinical release NO-GO.")
    failed = blocked = False
    for kind, width in cases:
        filename = HARNESSES[kind]
        label = f"{filename} {str(width)+'px' if width else 'built-in matrix'}"
        page = None
        try:
            if not browser:
                raise RuntimeError("installed Chromium not found; use --browser PATH")
            fetch_matches("tests/" + filename, (ROOT / "tests" / filename).read_bytes())
            url = BASE + "/tests/" + filename
            if width:
                fd, name = tempfile.mkstemp(prefix=".browser-validation-", suffix=".html", dir=ROOT / "scripts")
                page = Path(name)
                with os.fdopen(fd, "w") as handle:
                    handle.write(wrapper(filename, width))
                fetch_matches("scripts/" + page.name, page.read_bytes())
                url = BASE + "/scripts/" + page.name
            result = parse_result(run_browser(browser, url))
            validate(result, kind, width)
            print(f"PASS — {label}: {json.dumps(result, ensure_ascii=False)}", flush=True)
        except (json.JSONDecodeError, ValueError, KeyError, TypeError, IndexError) as error:
            failed = True
            print(f"FAIL — {label}: {error}", flush=True)
        except (OSError, RuntimeError, subprocess.SubprocessError) as error:
            blocked = True
            print(f"BLOCKED — {label}: {error}", flush=True)
        finally:
            if page:
                page.unlink(missing_ok=True)
    return 1 if failed else 2 if blocked else 0


if __name__ == "__main__":
    raise SystemExit(main())
