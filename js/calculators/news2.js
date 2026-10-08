// ========================================
// NEWS2 Calculator
// Based on Royal College of Physicians NEWS2
// ========================================

function openNEWS2Calculator() {

    const existing = document.getElementById("news2Modal");

    if (existing) {
        existing.remove();
    }

    const modal = document.createElement("div");

    modal.id = "news2Modal";

    modal.innerHTML = `
        <div class="news2-overlay">

            <div
                class="news2-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="news2Title">

                <div class="news2-header">
                    <div>
                        <h2 id="news2Title">📊 NEWS2 Calculator</h2>
                        <p>National Early Warning Score 2</p>
                    </div>

                    <button id="closeNEWS2" class="news2-close">
                        ×
                    </button>
                </div>


                <div class="news2-body">

                    <!-- Respiratory Rate -->

                    <div class="news2-field">

                        <label for="newsResp">
                            Respiratory rate
                            <span>breaths/min</span>
                        </label>

                        <input
                            id="newsResp"
                            type="number"
                            min="1"
                            max="80"
                            step="1"
                            placeholder="e.g. 18"
                        >

                        <small id="newsRespScore"></small>

                    </div>


                    <!-- SpO2 Scale -->

                    <div class="news2-field">

                        <label for="newsSpOScale">
                            SpO₂ scale
                        </label>

                        <select id="newsSpOScale">

                            <option value="1">
                                Scale 1 — Standard
                            </option>

                            <option value="2">
                                Scale 2 — Target 88–92%
                            </option>

                        </select>

                        <small>
                            Use Scale 2 only when clinically indicated
                            for a target range of 88–92%.
                        </small>

                    </div>


                    <!-- SpO2 -->

                    <div class="news2-field">

                        <label for="newsSpO2">
                            SpO₂
                            <span>%</span>
                        </label>

                        <input
                            id="newsSpO2"
                            type="number"
                            min="50"
                            max="100"
                            step="1"
                            placeholder="e.g. 97"
                        >

                        <small id="newsSpO2Score"></small>

                    </div>


                    <!-- Oxygen -->

                    <div class="news2-field">

                        <label for="newsOxygen">
                            Air or oxygen?
                        </label>

                        <select id="newsOxygen">

                            <option value="0">
                                Air — no supplemental oxygen
                            </option>

                            <option value="2">
                                Oxygen — supplemental oxygen
                            </option>

                        </select>

                        <small>
                            Supplemental oxygen adds 2 points.
                        </small>

                    </div>


                    <!-- Systolic BP -->

                    <div class="news2-field">

                        <label for="newsSBP">
                            Systolic blood pressure
                            <span>mmHg</span>
                        </label>

                        <input
                            id="newsSBP"
                            type="number"
                            min="30"
                            max="300"
                            step="1"
                            placeholder="e.g. 120"
                        >

                        <small id="newsSBPScore"></small>

                    </div>


                    <!-- Pulse -->

                    <div class="news2-field">

                        <label for="newsPulse">
                            Pulse
                            <span>bpm</span>
                        </label>

                        <input
                            id="newsPulse"
                            type="number"
                            min="20"
                            max="250"
                            step="1"
                            placeholder="e.g. 84"
                        >

                        <small id="newsPulseScore"></small>

                    </div>


                    <!-- Consciousness -->

                    <div class="news2-field">

                        <label for="newsConsciousness">
                            Consciousness
                        </label>

                        <select id="newsConsciousness">

                            <option value="0">
                                Alert
                            </option>

                            <option value="3">
                                New confusion / CVPU
                            </option>

                        </select>

                        <small>
                            Score 3 for new confusion or reduced
                            consciousness.
                        </small>

                    </div>


                    <!-- Temperature -->

                    <div class="news2-field">

                        <label for="newsTemp">
                            Temperature
                            <span>°C</span>
                        </label>

                        <input
                            id="newsTemp"
                            type="number"
                            min="30"
                            max="45"
                            step="0.1"
                            placeholder="e.g. 37.0"
                        >

                        <small id="newsTempScore"></small>

                    </div>


                    <!-- Result -->

                    <div class="news2-result">

                        <div class="news2-total-label">
                            NEWS2 Total
                        </div>

                        <div
                            id="news2Total"
                            class="news2-total"
                        >
                            —
                        </div>

                        <div
                            id="news2Risk"
                            class="news2-risk"
                        >
                            Complete all observations
                        </div>

                    </div>


                    <div class="news2-actions">

                        <button
                            id="resetNEWS2"
                            class="news2-reset"
                        >
                            Reset
                        </button>

                        <button
                            id="calculateNEWS2"
                            class="news2-calculate"
                        >
                            Calculate NEWS2
                        </button>

                    </div>

                </div>
            </div>

        </div>
    `;

    document.body.appendChild(modal);
    const dialog = modal.querySelector('[role="dialog"]');
    const closeButton = modal.querySelector("#closeNEWS2");
    const previousFocus = document.activeElement;

    function closeNEWS2Modal() {

        document.removeEventListener(
            "keydown",
            handleNEWS2Keydown
        );

        modal.remove();

        if (
            previousFocus &&
            typeof previousFocus.focus === "function"
        ) {
            previousFocus.focus();
        }
    }


    function handleNEWS2Keydown(event) {

        if (event.key === "Escape") {
            event.preventDefault();
            closeNEWS2Modal();
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
        closeNEWS2Modal
    );

    document.addEventListener(
        "keydown",
        handleNEWS2Keydown
    );

    closeButton.focus();


    // ================================
    // Calculate
    // ================================

    document
        .getElementById("calculateNEWS2")
        .addEventListener("click", calculateNEWS2);

    modal.querySelectorAll("input, select").forEach(input => {
        ["input", "change"].forEach(event => {
            input.addEventListener(event, clearNEWS2Results);
        });
    });

    // ================================
    // Reset
    // ================================

    document
        .getElementById("resetNEWS2")
        .addEventListener("click", () => {

            modal.querySelectorAll("input").forEach(input => {
                input.value = "";
            });

            document.getElementById("newsSpOScale").value = "1";
            document.getElementById("newsOxygen").value = "0";
            document.getElementById("newsConsciousness").value = "0";

            clearNEWS2Results();

        });

}


// ========================================
// NEWS2 Scoring
// ========================================

function clearNEWS2Results() {
    document.getElementById("news2Total").textContent = "—";
    document.getElementById("news2Risk").textContent =
        "Complete all observations";
    [
        "newsRespScore", "newsSpO2Score", "newsSBPScore",
        "newsPulseScore", "newsTempScore"
    ].forEach(id => {
        document.getElementById(id).textContent = "";
    });
}


function scoreRespiratoryRate(value) {

    if (value <= 8) return 3;
    if (value <= 11) return 1;
    if (value <= 20) return 0;
    if (value <= 24) return 2;

    return 3;
}


function scoreSpO2Scale1(value) {

    if (value <= 91) return 3;
    if (value <= 93) return 2;
    if (value <= 95) return 1;

    return 0;
}


function scoreSpO2Scale2(value, onOxygen) {

    if (value <= 83) return 3;
    if (value <= 85) return 2;
    if (value <= 87) return 1;

    if (value >= 88 && value <= 92) {
        return 0;
    }

    if (value >= 93 && !onOxygen) {
        return 0;
    }

    if (value >= 93 && value <= 94 && onOxygen) {
        return 1;
    }

    if (value >= 95 && value <= 96 && onOxygen) {
        return 2;
    }

    if (value >= 97 && onOxygen) {
        return 3;
    }

    return 0;
}


function scoreSBP(value) {

    if (value <= 90) return 3;
    if (value <= 100) return 2;
    if (value <= 110) return 1;
    if (value <= 219) return 0;

    return 3;
}


function scorePulse(value) {

    if (value <= 40) return 3;
    if (value <= 50) return 1;
    if (value <= 90) return 0;
    if (value <= 110) return 1;
    if (value <= 130) return 2;

    return 3;
}


function scoreTemperature(value) {

    if (value <= 35.0) return 3;
    if (value <= 36.0) return 1;
    if (value <= 38.0) return 0;
    if (value <= 39.0) return 1;

    return 2;
}


// ========================================
// Calculate NEWS2
// ========================================

function calculateNEWS2() {

    const resp = Number(
        document.getElementById("newsResp").value
    );

    const spo2 = Number(
        document.getElementById("newsSpO2").value
    );

    const sbp = Number(
        document.getElementById("newsSBP").value
    );

    const pulse = Number(
        document.getElementById("newsPulse").value
    );

    const temp = Number(
        document.getElementById("newsTemp").value
    );

    const scale =
        document.getElementById("newsSpOScale").value;

    const onOxygen =
        document.getElementById("newsOxygen").value === "2";

    const consciousness =
        Number(
            document.getElementById("newsConsciousness").value
        );


const validRanges = [
    ["Respiratory rate", resp, 1, 80],
    ["SpO₂", spo2, 50, 100],
    ["Systolic blood pressure", sbp, 30, 300],
    ["Pulse", pulse, 20, 250],
    ["Temperature", temp, 30, 45]
];

const invalidField = validRanges.find(
    ([, value, min, max]) =>
        !Number.isFinite(value) ||
        value < min ||
        value > max
);

if (invalidField) {

    clearNEWS2Results();

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


    const respiratoryScore =
        scoreRespiratoryRate(resp);

    const spo2Score =
        scale === "1"
            ? scoreSpO2Scale1(spo2)
            : scoreSpO2Scale2(spo2, onOxygen);

    const oxygenScore =
        onOxygen ? 2 : 0;

    const sbpScore =
        scoreSBP(sbp);

    const pulseScore =
        scorePulse(pulse);

    const temperatureScore =
        scoreTemperature(temp);


    const total =
        respiratoryScore +
        spo2Score +
        oxygenScore +
        sbpScore +
        pulseScore +
        consciousness +
        temperatureScore;


    document.getElementById("newsRespScore")
        .textContent = `Score: ${respiratoryScore}`;

    document.getElementById("newsSpO2Score")
        .textContent = `Score: ${spo2Score}`;

    document.getElementById("newsSBPScore")
        .textContent = `Score: ${sbpScore}`;

    document.getElementById("newsPulseScore")
        .textContent = `Score: ${pulseScore}`;

    document.getElementById("newsTempScore")
        .textContent = `Score: ${temperatureScore}`;


    document.getElementById("news2Total")
        .textContent = total;


let risk;

const individualScores = [
    respiratoryScore,
    spo2Score,
    sbpScore,
    pulseScore,
    temperatureScore,
    consciousness
];

const hasSingleRedScore = individualScores.some(score => score === 3);

if (total >= 7) {
    risk =
        "HIGH — emergency clinical assessment (NEWS2 ≥7)";
} else if (total >= 5) {
    risk =
        "URGENT — clinical assessment required (NEWS2 5–6)";
} else if (hasSingleRedScore) {
    risk =
        "URGENT — single parameter score of 3";
} else if (total >= 1) {
    risk =
        "LOW — continue monitoring (NEWS2 1–4)";
} else {
    risk =
        "NEWS2 0 — routine monitoring";
}


    document.getElementById("news2Risk")
        .textContent = risk;
}
