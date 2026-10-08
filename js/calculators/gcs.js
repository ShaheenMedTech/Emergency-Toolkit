function openGCSCalculator() {

    const modal = document.createElement("div");

    modal.innerHTML = `
        <div id="gcsOverlay" style="
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.65);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            padding: 20px;
        ">

            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="gcsTitle"
                style="
                    background: white;
                    color: #222;
                    width: 100%;
                    max-width: 600px;
                    max-height: 90vh;
                    overflow-y: auto;
                    border-radius: 16px;
                    padding: 25px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                ">

                <div style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                ">

                    <div>
                        <h2 id="gcsTitle" style="margin:0;">
                            🧠 GCS Calculator
                        </h2>

                        <p style="
                            margin:5px 0 0;
                            color:#667085;
                        ">
                            Glasgow Coma Scale
                        </p>
                    </div>

                    <button id="closeGCS" style="
                        border:none;
                        background:#eee;
                        border-radius:50%;
                        width:36px;
                        height:36px;
                        font-size:24px;
                        cursor:pointer;
                    ">
                        ×
                    </button>

                </div>


                <!-- EYE -->

                <div style="
                    border:1px solid #ddd;
                    border-radius:12px;
                    padding:15px;
                    margin-bottom:15px;
                ">

                    <h3>👁 Eye Opening (E)</h3>

                    <label>
                        <input type="radio" name="gcsEye" value="4">
                        4 — Spontaneous
                    </label><br>

                    <label>
                        <input type="radio" name="gcsEye" value="3">
                        3 — To speech
                    </label><br>

                    <label>
                        <input type="radio" name="gcsEye" value="2">
                        2 — To pain
                    </label><br>

                    <label>
                        <input type="radio" name="gcsEye" value="1">
                        1 — None
                    </label><br>

                    <label>
                        <input type="radio" name="gcsEye" value="NT">
                        NT — Not testable
                    </label>

                </div>


                <!-- VERBAL -->

                <div style="
                    border:1px solid #ddd;
                    border-radius:12px;
                    padding:15px;
                    margin-bottom:15px;
                ">

                    <h3>🗣 Verbal Response (V)</h3>

                    <label>
                        <input type="radio" name="gcsVerbal" value="5">
                        5 — Oriented
                    </label><br>
                    <label>
    <input type="radio" name="gcsVerbal" value="NT">
    NT — Not testable
</label>

                    <label>
                        <input type="radio" name="gcsVerbal" value="4">
                        4 — Confused
                    </label><br>

                    <label>
                        <input type="radio" name="gcsVerbal" value="3">
                        3 — Inappropriate words
                    </label><br>

                    <label>
                        <input type="radio" name="gcsVerbal" value="2">
                        2 — Incomprehensible sounds
                    </label><br>

                    <label>
                        <input type="radio" name="gcsVerbal" value="1">
                        1 — None
                    </label>


                </div>


                <!-- MOTOR -->

                <div style="
                    border:1px solid #ddd;
                    border-radius:12px;
                    padding:15px;
                    margin-bottom:15px;
                ">

                    <h3>💪 Motor Response (M)</h3>

                    <label>
                        <input type="radio" name="gcsMotor" value="6">
                        6 — Obeys commands
                    </label><br>

                    <label>
                        <input type="radio" name="gcsMotor" value="5">
                        5 — Localizes pain
                    </label><br>

                    <label>
                        <input type="radio" name="gcsMotor" value="4">
                        4 — Withdraws from pain
                    </label><br>

                    <label>
                        <input type="radio" name="gcsMotor" value="3">
                        3 — Abnormal flexion
                    </label><br>

                    <label>
                        <input type="radio" name="gcsMotor" value="2">
                        2 — Extension
                    </label><br>

                    <label>
                        <input type="radio" name="gcsMotor" value="1">
                        1 — None
                    </label><br>

                    <label>
                        <input type="radio" name="gcsMotor" value="NT">
                        NT — Not testable
                    </label>

                </div>


                <!-- RESULT -->

                <div style="
                    text-align:center;
                    background:#f3f6fa;
                    border-radius:12px;
                    padding:20px;
                ">

                    <div style="
                        font-size:18px;
                        color:#667085;
                    ">
                        Total GCS
                    </div>

                    <div id="gcsTotal" style="
                        font-size:48px;
                        font-weight:bold;
                        margin:5px;
                    ">
                        —
                    </div>

                    <div id="gcsBreakdown">
                        E — &nbsp; V — &nbsp; M —
                    </div>

                    <div id="gcsInterpretation" style="
                        margin-top:10px;
                        font-weight:bold;
                    ">
                        Select all three components
                    </div>
                    <button id="resetGCS" style="
    margin-top:15px;
    padding:10px 20px;
    border:none;
    border-radius:8px;
    background:#e2e8f0;
    cursor:pointer;
">
    Reset
</button>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);
    document.getElementById("resetGCS").addEventListener("click", () => {

        modal.querySelectorAll('input[type="radio"]').forEach(input => {
            input.checked = false;
        });

        document.getElementById("gcsTotal").textContent = "—";

        document.getElementById("gcsBreakdown").textContent =
            "E —   V —   M —";

        document.getElementById("gcsInterpretation").textContent =
            "Select all three components";
    });


    const closeButton = modal.querySelector("#closeGCS");
    const dialog = modal.querySelector('[role="dialog"]');
    const previousFocus = document.activeElement;

    function closeGCSModal() {

        document.removeEventListener(
            "keydown",
            handleGCSKeydown
        );

        modal.remove();

        if (
            previousFocus &&
            typeof previousFocus.focus === "function"
        ) {
            previousFocus.focus();
        }
    }


    function handleGCSKeydown(event) {

        if (event.key === "Escape") {
            event.preventDefault();
            closeGCSModal();
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
        closeGCSModal
    );

    document.addEventListener(
        "keydown",
        handleGCSKeydown
    );

    closeButton.focus();


    // Click outside
    document
        .getElementById("gcsOverlay")
        .addEventListener("click", (event) => {

            if (event.target.id === "gcsOverlay") {
                modal.remove();
            }

        });


    // Calculate
    const inputs = modal.querySelectorAll(
        'input[type="radio"]'
    );

    inputs.forEach(input => {

        input.addEventListener("input", clearGCSResults);
        input.addEventListener("change", () => {
            clearGCSResults();
            calculateGCS();
        });

    });


    function clearGCSResults() {
        document.getElementById("gcsTotal").textContent = "—";
        document.getElementById("gcsBreakdown").textContent =
            "E —   V —   M —";
        document.getElementById("gcsInterpretation").textContent =
            "Select all three components";
    }


    function calculateGCS() {

        const eye = modal.querySelector(
            'input[name="gcsEye"]:checked'
        );

        const verbal = modal.querySelector(
            'input[name="gcsVerbal"]:checked'
        );

        const motor = modal.querySelector(
            'input[name="gcsMotor"]:checked'
        );


        if (!eye || !verbal || !motor) {
            document.getElementById("gcsTotal").textContent = "—";
            document.getElementById("gcsBreakdown").textContent =
                `E${eye ? eye.value : "—"} V${verbal ? verbal.value : "—"} M${motor ? motor.value : "—"}`;
            document.getElementById("gcsInterpretation").textContent =
                "Select all three components";
            return;
        }


if ([eye, verbal, motor].some(component => component.value === "NT")) {

    document.getElementById("gcsTotal").textContent = "NT";

document.getElementById("gcsBreakdown").textContent =
    `E${eye.value} V${verbal.value} M${motor.value}`;

    document.getElementById("gcsInterpretation").textContent =
        eye.value !== "NT" && motor.value !== "NT"
            ? "Verbal response not testable — total GCS cannot be calculated."
            : "One or more components not testable — total GCS cannot be calculated.";

    return;
}

const E = Number(eye.value);
const V = Number(verbal.value);
const M = Number(motor.value);

const total = E + V + M;

        document.getElementById("gcsTotal")
            .textContent = total;


        document.getElementById("gcsBreakdown")
            .textContent =
            `E ${E} + V ${V} + M ${M}`;


if (total === 15) {
    document.getElementById("gcsInterpretation").textContent =
        "Maximum GCS score: 15/15.";
    return;
}


       let interpretation;
let clinicalNote;

if (total >= 13) {
    interpretation = "Mild impairment";
    clinicalNote = "GCS 13–15";
}
else if (total >= 9) {
    interpretation = "Moderate impairment";
    clinicalNote = "GCS 9–12";
}
else {
    interpretation = "Severe impairment";
    clinicalNote = "GCS ≤8";
}

document.getElementById("gcsInterpretation").textContent =
    `${interpretation} • ${clinicalNote}`;


    }

}
