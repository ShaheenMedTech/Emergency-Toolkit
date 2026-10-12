// ========================================
// Adult Emergency Drugs Quick Reference
// RCUK 2025 aligned
// Adult / Acute Care
// ========================================

function openEmergencyDrugs() {

    const existing = document.getElementById("emergencyDrugsModal");

    if (existing) {
        existing.remove();
    }

    const modal = document.createElement("div");

    modal.id = "emergencyDrugsModal";

    modal.innerHTML = `
        <div class="drugs-overlay">

            <div
                class="drugs-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="drugsTitle">

                <div class="drugs-header">

                    <div>
                        <h2 id="drugsTitle">💊 Adult Emergency Drugs</h2>
                        <p>Acute Care Quick Reference</p>
                    </div>

                    <button
                        aria-label="Close dialog" id="closeEmergencyDrugs"
                        class="drugs-close">
                        ×
                    </button>

                </div>


                <div class="drugs-body">

                    <div class="drugs-alert">

                        <strong>Medication safety</strong>

                        <p>
                            Verify indication, dose, route, concentration,
                            contraindications and local protocol before
                            administration.
                        </p>

                    </div>


                    <section class="drugs-section">

                        <h3>🚨 Resuscitation</h3>

                        <div class="drug-card emergency">

                            <div class="drug-title">
                                <strong>Adrenaline</strong>
                                <span>Cardiac arrest</span>
                            </div>

                            <p>
                                <strong>Adult dose:</strong>
                                1 mg IV/IO during ALS.
                                Give as soon as possible for a
                                non-shockable rhythm, after the third shock
                                for a shockable rhythm, then every 3–5 minutes
                                while ALS continues.
                            </p>

                            <small>
                                RCUK 2025 ALS.
                            </small>

                        </div>


                        <div class="drug-card emergency">

                            <div class="drug-title">
                                <strong>Amiodarone</strong>
                                <span>Shockable cardiac arrest</span>
                            </div>

                            <p>
                                <strong>Adult dose:</strong>
                                300 mg IV after the third shock in VF/pVT.
                            </p>

                            <p>
                                <strong>Further dose:</strong>
                                150 mg IV after the fifth shock if VF/pVT
                                persists or recurs.
                            </p>

                            <small>
                                RCUK 2025 ALS.
                            </small>

                        </div>

                    </section>


                    <section class="drugs-section">

                        <h3>❤️ Peri-arrest / Arrhythmia</h3>

                        <div class="drug-card">

    <div class="drug-title">
        <strong>Adenosine</strong>
        <span>Regular narrow-complex tachycardia</span>
    </div>

    <p>
        Use vagal manoeuvres first when appropriate.
    </p>

    <p>
        <strong>Adult dose:</strong>
        6 mg rapid IV bolus.
    </p>

    <p>
        If unsuccessful, give 12 mg;
        if still unsuccessful, give 18 mg.
    </p>

    <p>
        Use adenosine only when appropriate for the rhythm and
        avoid it when pre-excitation is suspected in the relevant
        clinical context.
    </p>

    <small>
        Use according to the current tachyarrhythmia algorithm
        and clinical context.
    </small>

</div>


                        <div class="drug-card">

    <div class="drug-title">
        <strong>Atropine</strong>
        <span>Symptomatic bradycardia</span>
    </div>

    <p>
        <strong>Adult dose:</strong>
        500 micrograms IV.
        Repeat every 3–5 minutes if necessary,
        up to a total of 3 mg.
    </p>

    <p>
        Do not give atropine to patients with a cardiac transplant.
        Avoid atropine in high-degree AV block with a wide QRS.
    </p>

    <small>
        If ineffective, prepare for pacing and follow the current
        bradyarrhythmia algorithm.
    </small>

</div>


                        <div class="drug-card">

                            <div class="drug-title">
                                <strong>Magnesium sulfate</strong>
                                <span>Selected arrhythmias / special indications</span>
                            </div>

                            <p>
                                Use according to the specific indication,
                                such as torsades de pointes or relevant
                                electrolyte disturbance.
                            </p>

                            <small>
                                Dose and preparation should follow the
                                relevant local guideline and indication.
                            </small>

                        </div>

                    </section>


                    <section class="drugs-section">

                        <h3>⚠️ Important indications</h3>

                        <div class="drug-card warning">

                            <div class="drug-title">
                                <strong>Calcium</strong>
                                <span>Selected indications only</span>
                            </div>

                            <p>
                                Do not administer calcium routinely during
                                cardiac arrest. Use when there is a specific
                                indication and follow the relevant protocol.
                            </p>

                        </div>


                        <div class="drug-card warning">

                            <div class="drug-title">
                                <strong>Sodium bicarbonate</strong>
                                <span>Selected indications only</span>
                            </div>

                            <p>
                                Do not administer routinely during cardiac
                                arrest. Consider only for specific indications
                                according to local or specialist guidance.
                            </p>

                        </div>

                    </section>


                    <section class="drugs-section">

                        <h3>🫁 Anaphylaxis</h3>

                        <div class="drug-card critical">

                            <div class="drug-title">
                                <strong>Adrenaline IM</strong>
                                <span>Adult anaphylaxis</span>
                            </div>

                            <p>
                                <strong>Adult dose:</strong>
                                500 micrograms IM using adrenaline
                                1 mg/mL (1:1000).
                            </p>

                            <p>
                                Repeat after 5 minutes if there is no
                                improvement.
                            </p>

                            <small>
                                RCUK anaphylaxis guidance.
                            </small>

                        </div>

                    </section>


                    <div class="drugs-note">

                        <strong>Safety note</strong>

                        <p>
                            This toolkit is a point-of-care reference aid.
                            Always verify the current local formulary,
                            preparation, concentration, route and institutional
                            protocol before administration.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);


    let cleanupAccessibleModal;

    function closeEmergencyDrugsModal() {

        if (cleanupAccessibleModal) {
            cleanupAccessibleModal();
        }

        modal.remove();
    }


    cleanupAccessibleModal =
        setupAccessibleModal(modal, {
            closeButton: modal.querySelector("#closeEmergencyDrugs"),
            onEscape: closeEmergencyDrugsModal
        });


    modal
        .querySelector("#closeEmergencyDrugs")
        .addEventListener(
            "click",
            closeEmergencyDrugsModal
        );


    document
        .querySelector(".drugs-overlay")
        .addEventListener("click", (event) => {

            if (event.target.classList.contains("drugs-overlay")) {
            closeEmergencyDrugsModal();
            }

        });

}
