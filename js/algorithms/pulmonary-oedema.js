// ========================================
// Adult Acute Pulmonary Oedema Quick Reference
// Acute Cardiogenic Pulmonary Oedema
// ========================================

function openPulmonaryOedema() {

    const existing = document.getElementById("pulmonaryOedemaModal");

    if (existing) {
        existing.remove();
    }

    const modal = document.createElement("div");

    modal.id = "pulmonaryOedemaModal";

    modal.innerHTML = `
        <div class="pulmonary-oedema-overlay">

            <div
                class="pulmonary-oedema-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="pulmonaryOedemaTitle">

                <div class="pulmonary-oedema-header">

                    <div>
                        <h2 id="pulmonaryOedemaTitle">🫀 Acute Pulmonary Oedema</h2>
                        <p>Adult Acute Cardiogenic Pulmonary Oedema Quick Reference</p>
                    </div>

                    <button
                        aria-label="Close dialog" id="closePulmonaryOedema"
                        class="pulmonary-oedema-close">
                        ×
                    </button>

                </div>


                <div class="pulmonary-oedema-body">

                    <div class="pulmonary-oedema-alert">

                        <strong>Acute pulmonary oedema is a time-critical emergency.</strong>

                        <p>
                            Assess oxygenation, work of breathing and haemodynamic
                            status immediately. Treat respiratory failure while
                            identifying and treating the underlying cause.
                        </p>

                    </div>


                    <section class="pulmonary-oedema-section">

                        <h3>1. Initial assessment</h3>

                        <ol>
                            <li>Assess airway and breathing using ABCDE.</li>
                            <li>Check respiratory rate, SpO₂, pulse and blood pressure.</li>
                            <li>Assess work of breathing and mental status.</li>
                            <li>Apply ECG monitoring and obtain a 12-lead ECG when appropriate.</li>
                            <li>Consider blood gas assessment in severe respiratory distress.</li>
                            <li>Look for evidence of acute heart failure or cardiogenic pulmonary oedema.</li>
                        </ol>

                    </section>


                    <section class="pulmonary-oedema-section">

                        <h3>2. Immediate supportive treatment</h3>

                        <div class="pulmonary-oedema-card emergency">

                            <ul>
                                <li>Position the patient to support breathing.</li>
                                <li>Give oxygen when hypoxaemia is present or clinically indicated.</li>
                                <li>Use continuous physiological monitoring.</li>
                                <li>Establish IV access and obtain appropriate investigations.</li>
                                <li>Reassess after every major intervention.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="pulmonary-oedema-section">

                        <h3>3. Non-invasive ventilation</h3>

                        <div class="pulmonary-oedema-card critical">

                            <strong>Consider CPAP / NIV early in severe respiratory distress.</strong>

                            <p>
                                Non-invasive positive-pressure ventilation can be
                                considered in acute cardiogenic pulmonary oedema
                                with significant respiratory distress or hypoxaemia,
                                while monitoring closely for response and
                                contraindications.
                            </p>

                            <ul>
                                <li>Monitor respiratory effort and gas exchange.</li>
                                <li>Ensure an experienced team is available.</li>
                                <li>Escalate to invasive ventilation if NIV fails or is contraindicated.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="pulmonary-oedema-section">

                        <h3>4. Vasodilator therapy</h3>

                        <div class="pulmonary-oedema-card">

                            <strong>Nitrates may be useful in selected patients.</strong>

                            <p>
                                Consider nitrate therapy particularly when there is
                                significant hypertension or a suitable blood
                                pressure for vasodilator treatment.
                            </p>

                            <p>
                                Verify blood pressure, contraindications,
                                formulation and local dosing protocol before
                                administration.
                            </p>

                        </div>

                    </section>


                    <section class="pulmonary-oedema-section">

                        <h3>5. Diuretic therapy</h3>

                        <div class="pulmonary-oedema-card warning">

                            <strong>Assess congestion before treatment.</strong>

                            <p>
                                IV loop diuretics are used when acute heart failure
                                is associated with clinically significant fluid
                                overload or congestion.
                            </p>

                            <p>
                                Review previous diuretic therapy, renal function
                                and response to treatment.
                            </p>

                        </div>

                    </section>


                    <section class="pulmonary-oedema-section">

                        <h3>6. Identify the precipitating cause</h3>

                        <div class="pulmonary-oedema-grid">

                            <div class="pulmonary-oedema-card warning">
                                <strong>ACS / myocardial ischaemia</strong>
                                <p>
                                    Obtain ECG and assess for acute coronary syndrome.
                                </p>
                            </div>

                            <div class="pulmonary-oedema-card warning">
                                <strong>Arrhythmia</strong>
                                <p>
                                    Look for rapid or slow arrhythmias contributing
                                    to haemodynamic deterioration.
                                </p>
                            </div>

                            <div class="pulmonary-oedema-card warning">
                                <strong>Hypertensive emergency</strong>
                                <p>
                                    Consider severe blood-pressure elevation as
                                    a precipitating factor.
                                </p>
                            </div>

                            <div class="pulmonary-oedema-card warning">
                                <strong>Valvular / mechanical cause</strong>
                                <p>
                                    Consider acute valve dysfunction or other
                                    mechanical cardiac pathology.
                                </p>
                            </div>

                            <div class="pulmonary-oedema-card warning">
                                <strong>Fluid overload / renal dysfunction</strong>
                                <p>
                                    Consider renal failure, missed dialysis or
                                    excessive fluid administration.
                                </p>
                            </div>

                            <div class="pulmonary-oedema-card warning">
                                <strong>Other causes</strong>
                                <p>
                                    Consider infection, myocarditis, toxins and
                                    other causes of acute cardiac decompensation.
                                </p>
                            </div>

                        </div>

                    </section>


                    <section class="pulmonary-oedema-section">

                        <h3>7. When to escalate</h3>

                        <div class="pulmonary-oedema-card critical">

                            <ul>
                                <li>Persistent severe hypoxaemia.</li>
                                <li>Worsening respiratory fatigue.</li>
                                <li>Reduced consciousness or inability to protect the airway.</li>
                                <li>Persistent haemodynamic instability.</li>
                                <li>Failure or intolerance of NIV.</li>
                            </ul>

                            <p>
                                Escalate early to senior critical-care /
                                anaesthetic support when respiratory or
                                cardiovascular failure is progressing.
                            </p>

                        </div>

                    </section>


                    <section class="pulmonary-oedema-section">

                        <h3>8. Reassessment</h3>

                        <div class="pulmonary-oedema-card reassess">

                            <strong>Reassess continuously.</strong>

                            <p>
                                Repeat respiratory rate, SpO₂, work of breathing,
                                blood pressure, heart rate, mental status and
                                response to treatment.
                            </p>

                        </div>

                    </section>


                    <div class="pulmonary-oedema-note">

                        <strong>Clinical safety note</strong>

                        <p>
                            This is a point-of-care reference aid.
                            Follow current acute heart-failure, oxygen,
                            NIV and local cardiology / critical-care protocols.
                            Verify blood pressure, contraindications, drug
                            preparation and route before administration.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);

    let cleanupAccessibleModal;

    function closePulmonaryOedemaModal() {

        if (cleanupAccessibleModal) {
            cleanupAccessibleModal();
        }

        modal.remove();
    }


    cleanupAccessibleModal =
        setupAccessibleModal(modal, {
            closeButton: modal.querySelector(
                "#closePulmonaryOedema"
            ),
            onEscape: closePulmonaryOedemaModal
        });


    modal
        .querySelector("#closePulmonaryOedema")
        .addEventListener(
            "click",
            closePulmonaryOedemaModal
        );

    document
        .querySelector(".pulmonary-oedema-overlay")
        .addEventListener("click", (event) => {

            if (event.target.classList.contains("pulmonary-oedema-overlay")) {
                closePulmonaryOedemaModal();
            }

        });

}
