"""Run the ABG lifecycle regression in Chromium; require explicit PASS."""
import html
import json
from pathlib import Path
import re
import shutil
import subprocess
import tempfile

chromium = shutil.which("chromium")
if chromium is None:
    raise SystemExit("FAIL — Chromium is required for the ABG lifecycle regression")
harness = Path(__file__).with_suffix(".html").resolve()
with tempfile.TemporaryDirectory(prefix="abg-lifecycle-") as profile:
    result = subprocess.run(
        [chromium, "--headless", "--no-sandbox", "--disable-gpu",
         "--allow-file-access-from-files", f"--user-data-dir={profile}",
         "--virtual-time-budget=3000", "--dump-dom", harness.as_uri()],
        capture_output=True, text=True, timeout=30, check=True,
    )
match = re.search(r'<pre id="verification">(.*?)</pre>', result.stdout, re.S)
if match is None:
    raise SystemExit("FAIL — missing browser verification result")
try:
    evidence = json.loads(html.unescape(match.group(1)))
except json.JSONDecodeError as error:
    raise SystemExit("FAIL — browser verification did not complete") from error
if evidence.get("status") != "PASS":
    raise SystemExit(f"FAIL — {evidence}")
expected = {(width, theme) for width in (390, 1280) for theme in ("light", "dark")}
checks = evidence.get("checks", [])
if len(checks) != 4 or {(check["width"], check["theme"]) for check in checks} != expected:
    raise SystemExit("FAIL — incomplete viewport/theme coverage")
if any(check["remainingListeners"] != 0 or check["cycles"] != 10 for check in checks):
    raise SystemExit("FAIL — incomplete cycles or retained listeners")
print("PASS — ABG lifecycle: 40 replacement cycles, 390/1280px, light/dark, no retained listeners")
print(json.dumps(checks))
