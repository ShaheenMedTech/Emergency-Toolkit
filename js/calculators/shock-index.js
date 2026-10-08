// ========================================
// Shock Index Calculator
// Shock Index = Heart Rate / Systolic BP
// ========================================

function openShockIndexCalculator() {

    const existing = document.getElementById("shockIndexModal");

    if (existing) {
        existing.remove();
    }

    const modal = document.createElement("div");

    modal.id = "shockIndexModal";

    modal.innerHTML = `
        <div class="shock-overlay">

            <div
                class="shock-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="shockTitle">

                <div class="shock-header">
                    <div>
                        <h2 id="shockTitle">❤️ Shock Index</h2>
                        <p>Heart Rate ÷ Systolic Blood Pressure</p>
                    </div>

                    <button id="closeShock" class="shock-close">
                        ×
                    </button>
                </div>


                <div class="shock-body">

                    <div class="shock-field">

                        <label for="shockHR">
                            Heart rate
                            <span>bpm</span>
                        </label>

                        <input
                            id="shockHR"
                            type="number"
                            min="20"
                            max="250"
                            step="1"
                            placeholder="e.g. 120"
                        >

                    </div>


                    <div class="shock-field">

                        <label for="shockSBP">
                            Systolic blood pressure
                            <span>mmHg</span>
                        </label>

                        <input
                            id="shockSBP"
                            type="number"
                            min="30"
                            max="300"
                            step="1"
                            placeholder="e.g. 100"
                        >

                    </div>


                    <div class="shock-result">

                        <div class="shock-total-label">
                            Shock Index
                        </div>

                        <div
                            id="shockTotal"
                            class="shock-total"
                        >
                            —
                        </div>

                        <div
                            id="shockInterpretation"
                            class="shock-interpretation"
                        >
                            Enter HR and SBP
                        </div>

                    </div>


                    <div class="shock-actions">

                        <button
                            id="resetShock"
                            class="shock-reset"
                        >
                            Reset
                        </button>

                        <button
                            id="calculateShock"
                            class="shock-calculate"
                        >
                            Calculate
                        </button>

                    </div>


                    <div class="shock-note">

                        <strong>Clinical note:</strong>

                        <p>
                            Shock Index is an adjunct to clinical
                            assessment and should not be used in
                            isolation.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);


    // ================================
    // Close
    // ================================

    const dialog = modal.querySelector('[role="dialog"]');
    const closeButton = modal.querySelector("#closeShock");
    const previousFocus = document.activeElement;


    function closeShockIndexModal() {

        document.removeEventListener(
            "keydown",
            handleShockIndexKeydown
        );

        modal.remove();

        if (
            previousFocus &&
            typeof previousFocus.focus === "function"
        ) {
            previousFocus.focus();
        }
    }


    function handleShockIndexKeydown(event) {

        if (event.key === "Escape") {
            event.preventDefault();
            closeShockIndexModal();
            return;
        }

        if (event.key !== "Tab") {
            return;
        }

        const focusableElements = Array.from(
            dialog.querySelectorAll(
                'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
            )
        ).filter(element =>
            !element.disabled &&
            element.offsetParent !== null
        );

        if (!focusableElements.length) {
            event.preventDefault();
            closeButton.focus();
            return;
        }

        const firstElement = focusableElements[0];

        const lastElement =
            focusableElements[focusableElements.length - 1];

        if (
            event.shiftKey &&
            document.activeElement === firstElement
        ) {
            event.preventDefault();
            lastElement.focus();
        }
        else if (
            !event.shiftKey &&
            document.activeElement === lastElement
        ) {
            event.preventDefault();
            firstElement.focus();
        }
    }


    closeButton.addEventListener(
        "click",
        closeShockIndexModal
    );

    document.addEventListener(
        "keydown",
        handleShockIndexKeydown
    );

    closeButton.focus();


    // ================================
    // Calculate
    // ================================

    document
        .getElementById("calculateShock")
        .addEventListener("click", calculateShockIndex);

    modal.querySelectorAll("input").forEach(input => {
        ["input", "change"].forEach(event => {
            input.addEventListener(event, clearShockIndexResults);
        });
    });

    // ================================
    // Reset
    // ================================

    document
        .getElementById("resetShock")
        .addEventListener("click", () => {

            document.getElementById("shockHR").value = "";

            document.getElementById("shockSBP").value = "";

            clearShockIndexResults();
        });
}


// ========================================
// Calculate Shock Index
// ========================================

function clearShockIndexResults() {
    document.getElementById("shockTotal").textContent = "—";
    document.getElementById("shockInterpretation").textContent =
        "Enter HR and SBP";
}


function formatShockIndex(si) {
    const rounded = si.toFixed(2);
    // Keep a value below a threshold visibly below it after rounding.
    const crossedThreshold = [0.5, 0.7, 0.9, 1.0].find(threshold =>
        si < threshold && Number(rounded) >= threshold
    );
    return crossedThreshold === undefined
        ? rounded
        : `<${crossedThreshold.toFixed(2)}`;
}


function calculateShockIndex() {

    const hr = Number(
        document.getElementById("shockHR").value
    );

    const sbp = Number(
        document.getElementById("shockSBP").value
    );


    const validRanges = [
        ["Heart rate", hr, 20, 250],
        ["Systolic blood pressure", sbp, 30, 300]
    ];

    const invalidField = validRanges.find(
        ([, value, min, max]) =>
            !Number.isFinite(value) ||
            value < min ||
            value > max
    );

    if (invalidField) {

        clearShockIndexResults();

        const [label, value, min, max] = invalidField;

        if (!Number.isFinite(value) || value === 0) {
            alert(`Please enter a valid ${label}.`);
        } else {
            alert(
                `${label} must be between ${min} and ${max}.`
            );
        }

        return;
    }


    const si = hr / sbp;

    const roundedSI = formatShockIndex(si);


    document.getElementById("shockTotal")
        .textContent = roundedSI;


    let interpretation;


    if (si < 0.5) {

        interpretation =
            "Below typical adult reference range";

    } else if (si < 0.7) {

        interpretation =
            "Typical adult reference range";

    } else if (si < 0.9) {

        interpretation =
            "Elevated — assess in clinical context";

    } else if (si < 1.0) {

        interpretation =
            "Markedly elevated — assess for haemodynamic compromise";

    } else {

        interpretation =
            "≥1.0 — markedly elevated; assess urgently in clinical context";
    }


    document.getElementById("shockInterpretation")
        .textContent = interpretation;
}
