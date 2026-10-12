// ========================================
// Adult Acute Stroke Quick Reference
// NICE / RCUK aligned
// ========================================

function openStroke() {

    const existing = document.getElementById("strokeModal");

    if (existing) {
        existing.remove();
    }

    const modal = document.createElement("div");

    modal.id = "strokeModal";

    modal.innerHTML = `
        <div class="stroke-overlay">

            <div
                class="stroke-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="strokeTitle">

                <div class="stroke-header">

                    <div>
                        <h2 id="strokeTitle">🧠 Acute Stroke</h2>
                        <p>Recognition & Initial Management Quick Reference</p>
                    </div>

                    <button
                        aria-label="Close dialog" id="closeStroke"
                        class="stroke-close">
                        ×
                    </button>

                </div>


                <div class="stroke-body">

                    <div class="stroke-alert">
                        <strong>Stroke is a medical emergency.</strong>
                        <p>
                            Recognise rapidly, establish the last-known-well
                            time, check glucose, activate the stroke pathway
                            and minimise delays to brain imaging.
                        </p>
                    </div>


                    <section class="stroke-section">

                        <h3>1. Recognise stroke</h3>

                        <div class="stroke-card critical">

                            <strong>FAST</strong>

                            <ul>
                                <li><strong>Face:</strong> new facial weakness or asymmetry.</li>
                                <li><strong>Arm:</strong> new unilateral weakness or drift.</li>
                                <li><strong>Speech:</strong> new speech or language disturbance.</li>
                                <li><strong>Time:</strong> determine when the patient was last known well.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="stroke-section">

                        <h3>2. Immediate assessment</h3>

                        <ol>
                            <li>Assess airway and breathing.</li>
                            <li>Check circulation and vital signs.</li>
                            <li>Check capillary blood glucose.</li>
                            <li>Assess level of consciousness and neurological deficit.</li>
                            <li>Record the exact time last known well.</li>
                            <li>Identify anticoagulant or antiplatelet use.</li>
                            <li>Establish the local stroke pathway immediately.</li>
                        </ol>

                    </section>


                    <section class="stroke-section">

                        <h3>3. Brain imaging</h3>

                        <div class="stroke-card emergency">

                            <strong>Do not delay definitive assessment.</strong>

                            <ul>
                                <li>
                                    Urgent non-contrast CT is used to distinguish
                                    haemorrhage from ischaemic stroke.
                                </li>

                                <li>
                                    Obtain vascular imaging when thrombectomy
                                    may be indicated according to the stroke pathway.
                                </li>

                                <li>
                                    Use advanced imaging when required by the
                                    applicable reperfusion pathway.
                                </li>
                            </ul>

                        </div>

                    </section>


                    <section class="stroke-section">

                        <h3>4. Reperfusion pathway</h3>

                        <div class="stroke-grid">

                            <div class="stroke-card">
                                <strong>Thrombolysis</strong>

                                <p>
                                    Assess eligibility urgently after appropriate
                                    brain imaging and according to the current
                                    stroke service protocol and treatment window.
                                </p>
                            </div>


                            <div class="stroke-card">
                                <strong>Thrombectomy</strong>

                                <p>
                                    Consider urgent endovascular assessment when
                                    a large-vessel occlusion and other eligibility
                                    criteria are present.
                                </p>
                            </div>

                        </div>

                    </section>


                    <section class="stroke-section">

                        <h3>5. Important information to obtain</h3>

                        <div class="stroke-grid">

                            <div class="stroke-card">
                                <strong>Time</strong>
                                <p>
                                    Last known well, symptom discovery and
                                    onset pattern.
                                </p>
                            </div>

                            <div class="stroke-card">
                                <strong>Medication</strong>
                                <p>
                                    Anticoagulants, antiplatelets and relevant
                                    recent medications.
                                </p>
                            </div>

                            <div class="stroke-card">
                                <strong>Baseline</strong>
                                <p>
                                    Pre-stroke functional status and relevant
                                    neurological history.
                                </p>
                            </div>

                            <div class="stroke-card">
                                <strong>Bleeding risk</strong>
                                <p>
                                    Recent surgery, bleeding disorders or other
                                    contraindication-relevant history.
                                </p>
                            </div>

                        </div>

                    </section>


                    <section class="stroke-section">

                        <h3>6. Common mimics / reversible causes</h3>

                        <div class="stroke-card warning">

                            <ul>
                                <li>Hypoglycaemia.</li>
                                <li>Seizure or post-ictal deficit.</li>
                                <li>Migraine with neurological features.</li>
                                <li>Intracranial haemorrhage.</li>
                                <li>Intoxication or metabolic disturbance.</li>
                                <li>Other acute neurological conditions.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="stroke-section">

                        <h3>7. When urgent imaging is especially important</h3>

                        <div class="stroke-card emergency">

                            <ul>
                                <li>Potential candidate for thrombolysis or thrombectomy.</li>
                                <li>Current anticoagulant treatment.</li>
                                <li>Known bleeding tendency.</li>
                                <li>Reduced level of consciousness.</li>
                                <li>Progressive or fluctuating neurological symptoms.</li>
                                <li>Severe headache at symptom onset.</li>
                                <li>Other clinical concern for intracranial pathology.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="stroke-section">

                        <h3>8. Ongoing care</h3>

                        <div class="stroke-card reassess">

                            <strong>Reassess continuously.</strong>

                            <p>
                                Repeat neurological observations, vital signs,
                                glucose and clinical status after every significant
                                intervention or deterioration.
                            </p>

                        </div>

                    </section>


                    <div class="stroke-note">

                        <strong>Clinical safety note</strong>

                        <p>
                            This is a point-of-care reference aid.
                            Follow the current local stroke pathway and specialist
                            advice for thrombolysis, thrombectomy, blood pressure
                            management and antithrombotic treatment.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);


    let cleanupAccessibleModal;

    function closeStrokeModal() {

        if (cleanupAccessibleModal) {
            cleanupAccessibleModal();
        }

        modal.remove();
    }


    cleanupAccessibleModal =
        setupAccessibleModal(modal, {
            closeButton: modal.querySelector("#closeStroke"),
            onEscape: closeStrokeModal
        });


    modal
        .querySelector("#closeStroke")
        .addEventListener(
            "click",
            closeStrokeModal
        );


    document
        .querySelector(".stroke-overlay")
        .addEventListener("click", (event) => {

            if (event.target.classList.contains("stroke-overlay")) {
                closeStrokeModal();
            }

        });

}
