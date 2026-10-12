// ========================================
// Adult Emergency Electrolyte Disorders
// RCUK 2025 / UK Kidney Association aligned
// ========================================

function openElectrolytes() {

    const existing = document.getElementById("electrolytesModal");

    if (existing) {
        existing.remove();
    }

    const modal = document.createElement("div");

    modal.id = "electrolytesModal";

    modal.innerHTML = `
        <div class="electrolytes-overlay">

            <div
                class="electrolytes-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="electrolytesTitle">

                <div class="electrolytes-header">

                    <div>
                        <h2 id="electrolytesTitle">⚡ Electrolyte Emergencies</h2>
                        <p>Adult Recognition & Initial Management</p>
                    </div>

                    <button
                        aria-label="Close dialog" id="closeElectrolytes"
                        class="electrolytes-close">
                        ×
                    </button>

                </div>


                <div class="electrolytes-body">

                    <div class="electrolytes-alert">
                        <strong>Electrolyte emergencies can be immediately life-threatening.</strong>
                        <p>
                            Assess the clinical state, obtain an ECG when appropriate,
                            identify reversible causes and treat dangerous abnormalities
                            without delaying definitive care.
                        </p>
                    </div>


                    <section class="electrolytes-section">

                        <h3>1. Immediate assessment</h3>

                        <ol>
                            <li>Assess airway, breathing and circulation.</li>
                            <li>Assess mental status and haemodynamic stability.</li>
                            <li>Obtain an ECG when clinically indicated.</li>
                            <li>Check electrolytes promptly and repeat when required.</li>
                            <li>Review renal function and relevant medications.</li>
                            <li>Consider blood gas analysis in critically ill patients.</li>
                        </ol>

                    </section>


                    <section class="electrolytes-section">

    <h3>2. Hyperkalaemia</h3>

    <div class="electrolytes-grid">

        <div class="electrolytes-card emergency">

            <strong>Moderate: K⁺ 6.0–6.4 mmol/L</strong>

            <ul>
                <li>
                    Confirm the result and assess the clinical context,
                    including possible pseudohyperkalaemia.
                </li>

                <li>
                    Perform an ECG and establish cardiac monitoring.
                </li>

                <li>
                    Consider insulin/glucose treatment according to
                    the current hyperkalaemia protocol.
                </li>

                <li>
                    Use nebulised salbutamol as an adjunct.
                </li>

                <li>
                    Monitor potassium and blood glucose after treatment.
                </li>
            </ul>

        </div>


        <div class="electrolytes-card critical">

            <strong>Severe: K⁺ ≥ 6.5 mmol/L</strong>

            <ul>
                <li>
                    Urgent treatment and continuous cardiac monitoring.
                </li>

                <li>
                    Perform immediate ECG assessment.
                </li>

                <li>
                    Treat according to the current hyperkalaemia pathway.
                </li>

                <li>
                    Give IV calcium when severe hyperkalaemia is accompanied
                    by ECG changes.
                </li>

                <li>
                    Use insulin/glucose and nebulised salbutamol to shift
                    potassium intracellularly.
                </li>

                <li>
                    Consider potassium removal and urgent renal / critical-care
                    support when refractory.
                </li>
            </ul>

        </div>

    </div>

</section>


                    <section class="electrolytes-section">

                        <h3>3. Hyperkalaemia with ECG changes</h3>

                        <div class="electrolytes-card critical">

                            <strong>Stabilise the myocardium.</strong>

                            <p>
                                Give IV calcium according to the current local
                                hyperkalaemia protocol when severe hyperkalaemia
                                is accompanied by ECG changes.
                            </p>

                            <p>
                                RCUK 2025 specifies 10 mL of 10% calcium chloride
                                IV over 5 minutes; if calcium chloride is unavailable,
                                30 mL of 10% calcium gluconate IV over 10 minutes.
                            </p>

                        </div>

                    </section>


                    <section class="electrolytes-section">

    <h3>4. Shift potassium into cells</h3>

    <div class="electrolytes-card">

        <strong>Insulin + glucose</strong>

        <p>
            Give 10 units soluble insulin with 25 g glucose IV
            for moderate or severe hyperkalaemia according to
            the current protocol.
        </p>

        <p>
            If the blood glucose concentration before treatment
            is below 7.0 mmol/L, continue glucose infusion according
            to the current hyperkalaemia protocol to reduce the risk
            of hypoglycaemia.
        </p>

        <strong>Salbutamol</strong>

        <p>
            Give nebulised salbutamol 10–20 mg as an adjunct to
            insulin/glucose therapy.
        </p>

        <small>
            Monitor blood glucose and potassium after treatment.
        </small>

    </div>

</section>


                    <section class="electrolytes-section">

                        <h3>5. Remove potassium from the body</h3>

                        <div class="electrolytes-card warning">

                            <ul>
                                <li>Review and stop contributing medications when appropriate.</li>
                                <li>Consider potassium-binding therapy according to local protocol.</li>
                                <li>Consider urgent dialysis for refractory severe hyperkalaemia.</li>
                                <li>Escalate early to renal / critical-care support when required.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="electrolytes-section">

                        <h3>6. Hypokalaemia</h3>

                        <div class="electrolytes-card">

                            <ul>
                                <li>Assess severity, symptoms and ECG findings.</li>
                                <li>Identify the underlying cause.</li>
                                <li>Replace potassium according to the clinical situation and local protocol.</li>
                                <li>Check and correct magnesium deficiency when present.</li>
                                <li>Use continuous monitoring when clinically indicated.</li>
                            </ul>

                            <p>
                                Severe or symptomatic hypokalaemia requires
                                urgent management and careful monitoring of
                                replacement therapy.
                            </p>

                        </div>

                    </section>


                    <section class="electrolytes-section">

    <h3>7. Hypokalaemic cardiac arrest</h3>

    <div class="electrolytes-card critical">

        <strong>Urgent potassium replacement during cardiac arrest.</strong>

        <p>
            When cardiac arrest is caused by severe hypokalaemia,
            give IV/IO potassium according to the current specialist
            resuscitation protocol.
        </p>

        <p>
            RCUK 2025 specifies an initial 20 mmol potassium chloride
            IV/IO over 2–3 minutes, followed by 10 mmol over 2 minutes,
            with subsequent potassium measurement and adjustment.
        </p>

        <p>
            Use continuous ECG monitoring and follow the current
            electrolyte-related cardiac-arrest algorithm.
        </p>

    </div>

</section>


                    <section class="electrolytes-section">

                        <h3>8. Other electrolyte abnormalities</h3>

                        <div class="electrolytes-grid">

                            <div class="electrolytes-card">
                                <strong>Hyponatraemia</strong>
                                <p>
                                    Assess symptoms, acuity and underlying cause.
                                    Severe neurological symptoms require urgent
                                    specialist management.
                                </p>
                            </div>

                            <div class="electrolytes-card">
                                <strong>Hypernatraemia</strong>
                                <p>
                                    Assess volume status and cause. Correct
                                    carefully according to the clinical context.
                                </p>
                            </div>

                            <div class="electrolytes-card">
                                <strong>Calcium disorders</strong>
                                <p>
                                    Consider ECG and neurological/cardiac effects
                                    when clinically significant.
                                </p>
                            </div>

                            <div class="electrolytes-card">
                                <strong>Magnesium disorders</strong>
                                <p>
                                    Consider arrhythmia, neuromuscular and
                                    associated electrolyte abnormalities.
                                </p>
                            </div>

                        </div>

                    </section>


                    <section class="electrolytes-section">

                        <h3>9. Reassessment</h3>

                        <div class="electrolytes-card reassess">

                            <strong>Recheck after treatment.</strong>

                            <p>
                                Repeat ECG, potassium, glucose and other relevant
                                laboratory measurements according to the emergency
                                treatment pathway and clinical response.
                            </p>

                        </div>

                    </section>


                    <div class="electrolytes-note">

                        <strong>Clinical safety note</strong>

                        <p>
                            This is a point-of-care reference aid.
                            Electrolyte replacement and hyperkalaemia treatment
                            require verification of concentration, route, infusion
                            rate, ECG findings and current local protocol.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);


    let cleanupAccessibleModal;

    function closeElectrolytesModal() {

        if (cleanupAccessibleModal) {
            cleanupAccessibleModal();
        }

        modal.remove();
    }


    cleanupAccessibleModal =
        setupAccessibleModal(modal, {
            closeButton: modal.querySelector(
                "#closeElectrolytes"
            ),
            onEscape: closeElectrolytesModal
        });


    modal
        .querySelector("#closeElectrolytes")
        .addEventListener(
            "click",
            closeElectrolytesModal
        );


    document
        .querySelector(".electrolytes-overlay")
        .addEventListener("click", (event) => {

            if (event.target.classList.contains("electrolytes-overlay")) {
                closeElectrolytesModal();
            }

        });

}
