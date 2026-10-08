"""Independent negative controls for the Chromium runner and harness guard."""
import importlib.util
import json
import time
from pathlib import Path
import subprocess
import tempfile
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location("runner", Path(__file__).with_name("chromium-ci-test.py"))
runner = importlib.util.module_from_spec(spec)
spec.loader.exec_module(runner)

class FailureTests(unittest.TestCase):
    def test_shared_browser_selection(self):
        candidates = {"google-chrome": "/stable/chrome", "chromium": "/snapshot/chromium"}
        with patch.dict(runner.os.environ, {}, clear=True), patch.object(runner.shutil, "which", side_effect=candidates.get):
            self.assertEqual(runner.find_browser(), "/stable/chrome")
        with patch.dict(runner.os.environ, {"CHROME_BIN": "/configured/chrome"}, clear=True), patch.object(runner.shutil, "which", return_value="/configured/chrome"):
            self.assertEqual(runner.find_browser(), "/configured/chrome")
        with patch.dict(runner.os.environ, {"CHROME_BIN": "/missing/browser"}, clear=True), patch.object(runner.shutil, "which", return_value=None), self.assertRaises(ValueError):
            runner.find_browser()

    def test_status_and_output_rejection(self):
        for status in ("FAIL", "ERROR", "RUNNING", "TIMEOUT", None):
            with self.subTest(status=status), self.assertRaises(ValueError):
                runner.parse_result('<pre id="verification">' + json.dumps({"status": status}) + '</pre>')
        for dom in ("", '<pre id="verification">RUNNING</pre>', '<pre id="verification">{bad}</pre>', '<pre id="verification">[]</pre>', '<pre id="verification">{"status":"PASS"}</pre>' * 2):
            with self.subTest(dom=dom), self.assertRaises(ValueError):
                runner.parse_result(dom)

    def test_incomplete_pass_rejection(self):
        for kind in ("fixtures", "safety", "lifecycle", "overflow"):
            with self.subTest(kind=kind), self.assertRaises((ValueError, TypeError)):
                runner.validate({"status": "PASS"}, kind, 390)
        with self.assertRaises(ValueError):
            runner.validate({"status": "PASS", "viewport": [500, 900], "transitions": 12, "winterCases": 7}, "safety", 390)
        checks = [{"width": width, "theme": theme, "cycles": 10, "remainingListeners": 0} for width in (390, 1280) for theme in ("light", "dark")]
        checks[-1]["remainingListeners"] = 1
        with self.assertRaises(ValueError): runner.validate({"checks": checks}, "lifecycle")

    def test_process_failures(self):
        for error in (subprocess.TimeoutExpired("chromium", 30), subprocess.CalledProcessError(1, "chromium")):
            with self.subTest(error=type(error).__name__), patch.object(runner.subprocess, "Popen", side_effect=error), self.assertRaises(type(error)):
                runner.execute("browser", "file:///test", "/tmp")

    def test_real_process_timeout(self):
        with tempfile.TemporaryDirectory(prefix="abg-timeout-") as temp:
            browser = Path(temp) / "slow-browser"
            browser.write_text("#!/usr/bin/env python3\nimport time\ntime.sleep(5)\n")
            browser.chmod(0o700)
            with self.assertRaises(subprocess.TimeoutExpired):
                runner.execute(str(browser), "file:///test", temp, timeout=0.1)

    def test_timeout_cleans_up_children(self):
        with tempfile.TemporaryDirectory(prefix="abg-child-timeout-") as temp:
            browser = Path(temp) / "browser-with-child"
            pid_file = Path(temp) / "child.pid"
            browser.write_text("#!/usr/bin/env python3\nimport subprocess, time\n"
                "child = subprocess.Popen(['python3', '-c', 'import time; time.sleep(10)'])\n"
                f"open({str(pid_file)!r}, 'w').write(str(child.pid))\n"
                "print('deliberate startup stall', flush=True)\n"
                "time.sleep(10)\n")
            browser.chmod(0o700)
            with self.assertRaises(subprocess.TimeoutExpired) as raised:
                runner.execute(str(browser), "file:///test", temp, timeout=0.5)
            self.assertIn("deliberate startup stall", raised.exception.output)
            pid = int(pid_file.read_text())
            # Linux hosted/local target: a zombie has exited and cannot touch profiles.
            deadline = time.monotonic() + 2
            while time.monotonic() < deadline:
                stat = Path(f"/proc/{pid}/stat")
                if not stat.exists() or stat.read_text().split(") ")[1].startswith("Z"):
                    break
                time.sleep(0.01)
            else:
                self.fail("Browser child survived the runner timeout")

    def test_real_nonzero_exit(self):
        with tempfile.TemporaryDirectory(prefix="abg-exit-") as temp:
            browser = Path(temp) / "failed-browser"
            browser.write_text("#!/usr/bin/env python3\nimport sys\nprint('startup failure', file=sys.stderr)\nsys.exit(7)\n")
            browser.chmod(0o700)
            with self.assertRaises(subprocess.CalledProcessError) as raised:
                runner.execute(str(browser), "file:///test", temp)
            self.assertEqual(raised.exception.returncode, 7)
            self.assertIn("startup failure", raised.exception.stderr)

    def test_real_browser_guard_failures(self):
        browser = runner.find_browser()
        self.assertIsNotNone(browser, "Chromium/Chrome required; negative browser tests must not silently skip")
        guard = (Path(__file__).parent / "browser-harness-guard.js").resolve().as_uri()
        print(f"Negative controls browser: {browser}", flush=True)
        with tempfile.TemporaryDirectory(prefix="abg-positive-") as temp:
            page = Path(temp) / "success.html"
            page.write_text('<pre id="verification">{"status":"PASS"}</pre>')
            self.assertEqual(runner.execute(browser, page.as_uri(), temp)["status"], "PASS")
        scenarios = {
            "missing fixture": '<script src="missing-fixture.js"></script>',
            "runtime error": '<script>throw Error("deliberate runtime error")</script>',
            "rejected promise": '<script>Promise.reject(Error("deliberate rejection"))</script>',
            "never completes": '',
            "error then false PASS": '<script>setTimeout(()=>{throw Error("deliberate error")},0);setTimeout(()=>document.getElementById("verification").textContent=JSON.stringify({status:"PASS"}),10)</script>',
        }
        for name, script in scenarios.items():
            with self.subTest(name=name), tempfile.TemporaryDirectory(prefix="abg-negative-") as temp:
                page = Path(temp) / "failure.html"
                page.write_text(f'<pre id="verification">RUNNING</pre><script src="{guard}"></script>' + script)
                with self.assertRaisesRegex(ValueError, "ERROR"):
                    runner.execute(browser, page.as_uri(), temp)
                print(f"PASS — negative control rejected: {name}")

if __name__ == "__main__":
    unittest.main()
