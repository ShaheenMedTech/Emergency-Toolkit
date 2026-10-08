// ========================================
// ABG / Acid-Base Calculator
// ========================================

function openABGCalculator() {

    const existing = document.getElementById("abgModal");

    if (existing) {
        existing.closeABGModal();
    }

    const modal = document.createElement("div");
    modal.id = "abgModal";

    modal.innerHTML = `
        <div class="abg-overlay">

            <div
                class="abg-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="abgTitle">

                <div class="abg-header">
                    <div>
                        <h2 id="abgTitle">🫁 ABG / Acid–Base Calculator</h2>
                        <p>Arterial blood gas analysis</p>
                    </div>

                    <button id="closeABG" class="abg-close">
                        ×
                    </button>
                </div>

                <div class="abg-body">

                    <div class="abg-grid">

                        <div class="abg-field">
                            <label for="abgPH">pH</label>
                            <input
                                id="abgPH"
                                type="number"
                                min="6.5"
                                max="8"
                                step="0.01"
                                placeholder="7.40"
                            >
                        </div>

                        <div class="abg-field">
                            <label for="abgPCO2">
                                PaCO₂
                                <span>mmHg</span>
                            </label>
                            <input
                                id="abgPCO2"
                                type="number"
                                min="5"
                                max="150"
                                step="1"
                                placeholder="40"
                            >
                        </div>

                        <div class="abg-field">
                            <label for="abgHCO3">
                                HCO₃⁻
                                <span>mmol/L</span>
                            </label>
                            <input
                                id="abgHCO3"
                                type="number"
                                min="1"
                                max="60"
                                step="0.1"
                                placeholder="24"
                            >
                        </div>

                        <div class="abg-field">
                            <label for="abgPaO2">
                                PaO₂
                                <span>mmHg</span>
                            </label>
                            <input
                                id="abgPaO2"
                                type="number"
                                min="1"
                                max="500"
                                step="1"
                                placeholder="100"
                            >
                        </div>

                        <div class="abg-field">
                            <label for="abgNa">
                                Na⁺
                                <span>mmol/L</span>
                            </label>
                            <input
                                id="abgNa"
                                type="number"
                                min="80"
                                max="220"
                                step="1"
                                placeholder="140"
                            >
                        </div>

                        <div class="abg-field">
                            <label for="abgCl">
                                Cl⁻
                                <span>mmol/L</span>
                            </label>
                            <input
                                id="abgCl"
                                type="number"
                                min="40"
                                max="180"
                                step="1"
                                placeholder="105"
                            >
                        </div>

                    </div>


                    <div class="abg-result">

                        <div class="abg-result-row">
                            <span>Anion Gap</span>
                            <strong id="abgAG">—</strong>
                        </div>

                        <div class="abg-result-row">
                            <span>Primary disorder</span>
                            <strong id="abgPrimary">—</strong>
                        </div>

                        <div class="abg-result-row">
                            <span>Compensation</span>
                            <strong id="abgCompensation">—</strong>
                        </div>

                        <div class="abg-result-row">
                            <span>PaO₂</span>
                            <strong id="abgOxygen">—</strong>
                        </div>

                    </div>


                    <div class="abg-note">
                        <strong>Clinical note:</strong>
                        <p>
                            This calculator is an adjunct to clinical
                            interpretation and should not replace
                            bedside assessment or local protocols.
                        </p>
                    </div>


                    <div class="abg-actions">

                        <button
                            id="resetABG"
                            class="abg-reset"
                        >
                            Reset
                        </button>

                        <button
                            id="calculateABG"
                            class="abg-calculate"
                        >
                            Analyze ABG
                        </button>

                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);


    // Close
    const dialog = modal.querySelector('[role="dialog"]');
    const closeButton = modal.querySelector("#closeABG");
    const previousFocus = document.activeElement;
    const listeners = [];
    let closed = false;

    function addABGListener(target, type, handler) {
        target.addEventListener(type, handler);
        listeners.push({ target, type, handler });
    }


    function closeABGModal() {

        if (closed) return;
        closed = true;
        listeners.forEach(({ target, type, handler }) => {
            target.removeEventListener(type, handler);
        });
        listeners.length = 0;

        modal.remove();

        if (
            previousFocus &&
            typeof previousFocus.focus === "function"
        ) {
            previousFocus.focus();
        }
    }

    modal.closeABGModal = closeABGModal;


    function handleABGKeydown(event) {

        if (event.key === "Escape") {
            event.preventDefault();
            closeABGModal();
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


    addABGListener(
        closeButton,
        "click",
        closeABGModal
    );

    addABGListener(
        document,
        "keydown",
        handleABGKeydown
    );

    closeButton.focus();


    // Calculate
    modal.querySelectorAll("input").forEach(input => {
        ["input", "change"].forEach(event => {
            addABGListener(input, event, clearABGResults);
        });
    });

    addABGListener(
        document.getElementById("calculateABG"),
        "click",
        calculateABG
    );


    // Reset
    addABGListener(document.getElementById("resetABG"), "click", () => {

        modal.querySelectorAll("input").forEach(input => {
            input.value = "";
        });

        clearABGResults();
    });

}


// ========================================
// ABG Analysis
// ========================================

function clearABGResults() {
    document.getElementById("abgAG").textContent = "—";
    document.getElementById("abgPrimary").textContent = "—";
    document.getElementById("abgCompensation").textContent = "—";
    document.getElementById("abgOxygen").textContent = "—";
}


function calculateABG() {

    const pH = Number(
        document.getElementById("abgPH").value
    );

    const pCO2 = Number(
        document.getElementById("abgPCO2").value
    );

    const HCO3 = Number(
        document.getElementById("abgHCO3").value
    );

    const pO2 = Number(
        document.getElementById("abgPaO2").value
    );

    const Na = Number(
        document.getElementById("abgNa").value
    );

    const Cl = Number(
        document.getElementById("abgCl").value
    );


    const validRanges = [
        ["pH", pH, 6.5, 8.0],
        ["PaCO₂", pCO2, 5, 150],
        ["HCO₃⁻", HCO3, 1, 60],
        ["PaO₂", pO2, 1, 500],
        ["Na⁺", Na, 80, 220],
        ["Cl⁻", Cl, 40, 180]
    ];

    const invalidField = validRanges.find(
        ([, value, min, max]) =>
            !Number.isFinite(value) ||
            value < min ||
            value > max
    );

    if (invalidField) {

        clearABGResults();

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


    // ----------------------------
    // Anion Gap
    // ----------------------------

    const anionGap =
        Na - (Cl + HCO3);


    document.getElementById("abgAG")
        .textContent =
        anionGap.toFixed(1);


    // ----------------------------
    // Primary disorder
    // ----------------------------

    let primary;

    if (pH < 7.35) {

        if (HCO3 < 22 && pCO2 <= 40) {
            primary = "Metabolic acidosis";
        }
        else if (pCO2 > 45 && HCO3 >= 22) {
            primary = "Respiratory acidosis";
        }
        else {
            primary = "Acidaemia — mixed or partially compensated disorder";
        }

    }
    else if (pH > 7.45) {

        if (HCO3 > 26 && pCO2 >= 40) {
            primary = "Metabolic alkalosis";
        }
        else if (pCO2 < 35 && HCO3 <= 26) {
            primary = "Respiratory alkalosis";
        }
        else {
            primary = "Alkalaemia — mixed or partially compensated disorder";
        }

    }
    else {

        primary =
            "pH within reference range — assess for compensated or mixed disorder";
    }


    document.getElementById("abgPrimary")
        .textContent = primary;


    // ----------------------------
    // Compensation
    // ----------------------------

    let compensation =
        "No specific compensation formula applied.";


    // Winter's formula
    // For metabolic acidosis:
    //
    // Expected PaCO2 =
    // 1.5 × HCO3 + 8 ± 2

    if (pH < 7.35 && HCO3 < 22) {

        const expectedPCO2 =
            (1.5 * HCO3) + 8;

        const lower =
            expectedPCO2 - 2;

        const upper =
            expectedPCO2 + 2;

        // Round-trip decimal bounds preserve the exact Number comparisons.
        const expectedInterval =
            `Expected PaCO₂ interval ${lower}–${upper} mmHg (inclusive)`;


        if (
            pCO2 >= lower &&
            pCO2 <= upper
        ) {

            compensation =
                `Appropriate respiratory compensation. ${expectedInterval}`;

        }
        else if (pCO2 < lower) {

            compensation =
                `Additional respiratory alkalosis. ${expectedInterval}`;

        }
        else {

            compensation =
                `Additional respiratory acidosis. ${expectedInterval}`;

        }
    }


    document.getElementById("abgCompensation")
        .textContent = compensation;


    document.getElementById("abgOxygen")
        .textContent =
        `PaO₂: ${pO2} mmHg — PaO₂ alone is not a standalone oxygenation assessment. Interpret with appropriate clinical and contextual information, including FiO₂, oxygen-delivery device, sample type, and local protocol.`;
}
