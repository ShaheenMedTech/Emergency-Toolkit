// ========================================
// Adult Acute Coronary Syndrome Quick Reference
// ESC 2023 ACS Guideline aligned
// ========================================

function openACS() {

    const existing = document.getElementById("acsModal");

    if (existing) {
        existing.remove();
    }

    const modal = document.createElement("div");

    modal.id = "acsModal";

    modal.innerHTML = `
        <div class="acs-overlay">

            <div
                class="acs-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="acsTitle">

                <div class="acs-header">

                    <div>
                        <h2 id="acsTitle">❤️ Acute Coronary Syndrome</h2>
                        <p>Adult Recognition & Initial Management Quick Reference</p>
                    </div>

                    <button
                        aria-label="Close dialog" id="closeACS"
                        class="acs-close">
                        ×
                    </button>

                </div>


                <div class="acs-body">

                    <div class="acs-alert">

                        <strong>ACS is a time-critical cardiovascular emergency.</strong>

                        <p>
                            Obtain an early ECG, assess for STEMI or NSTE-ACS,
                            identify instability and activate the appropriate
                            reperfusion pathway without unnecessary delay.
                        </p>

                    </div>


                    <section class="acs-section">

    <h3>1. Immediate assessment</h3>

    <ol>
        <li>Assess airway, breathing and circulation.</li>
        <li>Assess haemodynamic stability and mental status.</li>
        <li>
            Obtain and interpret a 12-lead ECG within 10 minutes
            of first medical contact whenever possible.
        </li>
        <li>Establish continuous monitoring when appropriate.</li>
        <li>
            Obtain high-sensitivity cardiac troponin using the
            validated local assay and pathway.
        </li>
        <li>
            Ask about symptom onset and timing of the current episode.
        </li>
        <li>
            Review anticoagulants, antiplatelets, allergies
            and bleeding risk.
        </li>
    </ol>

</section>


                    <section class="acs-section">

    <h3>2. ECG assessment</h3>

    <div class="acs-card critical">

        <strong>Do not delay ECG interpretation.</strong>

        <ul>
            <li>
                Look for persistent ST-segment elevation or
                equivalent patterns.
            </li>

            <li>
                Assess for dynamic ST-T changes.
            </li>

            <li>
                Look for conduction abnormalities and arrhythmias.
            </li>

            <li>
                Repeat ECG when symptoms persist or the clinical
                picture changes.
            </li>

            <li>
                A normal initial ECG does not completely exclude ACS.
            </li>
        </ul>

    </div>

</section>


                    <section class="acs-section">

    <h3>3. STEMI / occlusive coronary emergency</h3>

    <div class="acs-card emergency">

        <strong>Activate the reperfusion pathway immediately.</strong>

        <ul>
            <li>
                Contact the appropriate cardiology / PCI service early.
            </li>

            <li>
                Primary PCI is the preferred reperfusion strategy
                when it can be delivered within the appropriate
                time window.
            </li>

            <li>
                If timely primary PCI cannot be performed within
                120 minutes from diagnosis, follow the local
                fibrinolysis pathway when eligible and within
                the appropriate symptom-onset window.
            </li>

            <li>
                Minimise transfer and treatment delays.
            </li>

            <li>
                Do not wait for routine laboratory results when they
                would delay urgent reperfusion.
            </li>
        </ul>

    </div>

</section>


                    <section class="acs-section">

    <h3>4. NSTE-ACS</h3>

    <div class="acs-card">

        <ul>
            <li>
                Assess clinical risk and haemodynamic stability.
            </li>

            <li>
                Use serial high-sensitivity troponin testing with
                a validated rapid 0/1-hour or 0/2-hour pathway
                according to the assay and local protocol.
            </li>

            <li>
                Assess for dynamic ECG changes.
            </li>

            <li>
                Identify very-high-risk features requiring
                immediate invasive management.
            </li>

            <li>
                High-risk patients may require an early invasive
                strategy, typically within 24 hours.
            </li>

            <li>
                Use a validated risk assessment tool as appropriate.
            </li>
        </ul>

    </div>

</section>


                    <section class="acs-section">

                        <h3>5. High-risk / unstable features</h3>

                        <div class="acs-grid">

                            <div class="acs-card critical">
                                <strong>Shock / instability</strong>
                                <p>
                                    Cardiogenic shock, severe hypotension or
                                    ongoing haemodynamic deterioration.
                                </p>
                            </div>

                            <div class="acs-card critical">
                                <strong>Ongoing refractory chest pain</strong>
                                <p>
                                    Persistent symptoms despite initial therapy.
                                </p>
                            </div>

                            <div class="acs-card emergency">
                                <strong>Life-threatening arrhythmia</strong>
                                <p>
                                    Ventricular arrhythmia or major conduction
                                    disturbance with instability.
                                </p>
                            </div>

                            <div class="acs-card emergency">
                                <strong>Acute heart failure</strong>
                                <p>
                                    Pulmonary oedema or progressive
                                    cardiac decompensation.
                                </p>
                            </div>

                        </div>

                    </section>


                    <section class="acs-section">

                        <h3>6. Antithrombotic pathway</h3>

                        <div class="acs-card warning">

                            <p>
                                Antiplatelet and anticoagulant treatment should
                                follow the current ACS pathway, balancing
                                ischaemic benefit against bleeding risk.
                            </p>

                            <ul>
                                <li>Check for active bleeding or major bleeding risk.</li>
                                <li>Review current anticoagulant and antiplatelet therapy.</li>
                                <li>Follow the local PCI / NSTE-ACS antithrombotic protocol.</li>
                            </ul>

                            <small>
                                Do not infer a drug dose from this quick reference;
                                use the current local ACS medication protocol.
                            </small>

                        </div>

                    </section>


                    <section class="acs-section">

                        <h3>7. Oxygen</h3>

                        <div class="acs-card">

                            <strong>Use oxygen selectively.</strong>

                            <p>
                                Assess oxygenation and give supplemental oxygen
                                when clinically indicated rather than routinely
                                to every patient with suspected ACS.
                            </p>

                        </div>

                    </section>


                    <section class="acs-section">

                        <h3>8. Important differential diagnoses</h3>

                        <div class="acs-grid">

                            <div class="acs-card warning">
                                <strong>Aortic dissection</strong>
                                <p>
                                    Consider tearing pain, pulse/BP asymmetry
                                    or other high-risk features.
                                </p>
                            </div>

                            <div class="acs-card warning">
                                <strong>Pulmonary embolism</strong>
                                <p>
                                    Consider when symptoms or physiology are
                                    disproportionate to the ACS picture.
                                </p>
                            </div>

                            <div class="acs-card warning">
                                <strong>Pneumothorax</strong>
                                <p>
                                    Consider sudden pleuritic pain or
                                    asymmetric respiratory findings.
                                </p>
                            </div>

                            <div class="acs-card warning">
                                <strong>Pericarditis / myocarditis</strong>
                                <p>
                                    Consider the overall clinical and ECG pattern.
                                </p>
                            </div>

                            <div class="acs-card warning">
                                <strong>Gastrointestinal causes</strong>
                                <p>
                                    Exclude important non-cardiac causes without
                                    prematurely dismissing ACS.
                                </p>
                            </div>

                            <div class="acs-card warning">
                                <strong>Other cardiac emergencies</strong>
                                <p>
                                    Consider acute heart failure, arrhythmia
                                    and mechanical complications.
                                </p>
                            </div>

                        </div>

                    </section>


                    <section class="acs-section">

                        <h3>9. Reassessment</h3>

                        <div class="acs-card reassess">

                            <strong>ACS assessment is dynamic.</strong>

                            <p>
                                Repeat symptoms, vital signs, ECG and relevant
                                investigations when the clinical condition
                                changes or initial findings are inconclusive.
                            </p>

                        </div>

                    </section>


                    <section class="acs-section">

                        <h3>10. Escalation</h3>

                        <div class="acs-card critical">

                            <ul>
                                <li>Activate cardiology / cath-lab pathways early when indicated.</li>
                                <li>Escalate unstable patients to senior and critical-care support.</li>
                                <li>Continue resuscitation while definitive management is arranged.</li>
                                <li>Follow the current local ACS protocol for reperfusion and antithrombotic therapy.</li>
                            </ul>

                        </div>

                    </section>


                    <div class="acs-note">

                        <strong>Clinical safety note</strong>

                        <p>
                            This is a point-of-care reference aid.
                            Follow the current local ACS, PCI, anticoagulation
                            and antiplatelet protocols. Verify indications,
                            contraindications, drug selection and dosing before
                            administration.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);

    let cleanupAccessibleModal;

    function closeACSModal() {

        if (cleanupAccessibleModal) {
            cleanupAccessibleModal();
        }

        modal.remove();
    }


    cleanupAccessibleModal =
        setupAccessibleModal(modal, {
            closeButton: modal.querySelector("#closeACS"),
            onEscape: closeACSModal
        });


    modal
        .querySelector("#closeACS")
        .addEventListener(
            "click",
            closeACSModal
        );
    document
        .querySelector(".acs-overlay")
        .addEventListener("click", (event) => {

            if (event.target.classList.contains("acs-overlay")) {
                closeACSModal();
            }

        });

}
