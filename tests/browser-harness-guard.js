// Install before dependencies: resource/script failures must not stay RUNNING.
(() => {
    const output = document.getElementById("verification");
    let failure;
    const report = message => {
        failure = { status: "ERROR", message };
        output.textContent = JSON.stringify(failure);
    };
    window.addEventListener("error", event => {
        report(event.message || `Failed to load ${event.target.src || event.target.href || "browser resource"}`);
    }, true);
    window.addEventListener("unhandledrejection", event => report(String(event.reason)));
    const timer = setTimeout(() => {
        try {
            if (["PASS", "FAIL", "ERROR"].includes(JSON.parse(output.textContent).status)) return;
        } catch (_) { /* RUNNING or malformed output is incomplete. */ }
        report("Browser harness timed out without a terminal result");
    }, 5000);
    new MutationObserver(() => {
        // An error is sticky: later harness code cannot overwrite it with PASS.
        if (failure) {
            const text = JSON.stringify(failure);
            if (output.textContent !== text) output.textContent = text;
            clearTimeout(timer);
        } else {
            try {
                if (["PASS", "FAIL", "ERROR"].includes(JSON.parse(output.textContent).status)) clearTimeout(timer);
            } catch (_) { /* Watchdog handles incomplete output. */ }
        }
    }).observe(output, { childList: true, characterData: true, subtree: true });
})();
