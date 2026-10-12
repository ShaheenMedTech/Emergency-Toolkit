// ========================================
// Adult Acute GI Bleeding Quick Reference
// NICE aligned
// ========================================

function openGIBleeding() {

    const existing = document.getElementById("giBleedingModal");

    if (existing) {
        existing.remove();
    }

    const modal = document.createElement("div");

    modal.id = "giBleedingModal";

    modal.innerHTML = `
        <div class="gi-bleeding-overlay">

            <div
                class="gi-bleeding-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="giBleedingTitle">

                <div class="gi-bleeding-header">

                    <div>
                        <h2 id="giBleedingTitle">🩸 Acute GI Bleeding</h2>
                        <p>Recognition & Initial Management Quick Reference</p>
                    </div>

                    <button
                        aria-label="Close dialog" id="closeGIBleeding"
                        class="gi-bleeding-close">
                        ×
                    </button>

                </div>


                <div class="gi-bleeding-body">

                    <div class="gi-bleeding-alert">

                        <strong>Acute GI bleeding is a time-critical emergency.</strong>

                        <p>
                            Assess haemodynamic status immediately, begin
                            appropriate resuscitation, identify the likely
                            bleeding source and involve the appropriate
                            endoscopy / surgical team early.
                        </p>

                    </div>


                    <section class="gi-bleeding-section">

                        <h3>1. Initial assessment</h3>

                        <ol>
                            <li>Assess airway, breathing and circulation.</li>
                            <li>Assess haemodynamic stability and ongoing blood loss.</li>
                            <li>Check mental status, pulse and blood pressure.</li>
                            <li>Look for haematemesis, coffee-ground vomiting, melaena or haematochezia.</li>
                            <li>Obtain IV access and appropriate blood tests.</li>
                            <li>Review anticoagulants, antiplatelets and relevant comorbidity.</li>
                        </ol>

                    </section>


                    <section class="gi-bleeding-section">

                        <h3>2. Risk assessment</h3>

                        <div class="gi-bleeding-card">

                            <strong>Glasgow-Blatchford Score</strong>

                            <p>
                                Use the Glasgow-Blatchford Score at first
                                assessment in acute upper GI bleeding.
                            </p>

                            <p>
                                The score helps identify patients at lower
                                risk and supports decisions regarding
                                further management.
                            </p>

                            <small>
                                A dedicated Blatchford calculator can be
                                added to the Calculators section later.
                            </small>

                        </div>

                    </section>


                    <section class="gi-bleeding-section">

                        <h3>3. Resuscitation</h3>

                        <div class="gi-bleeding-card critical">

                            <ul>
                                <li>Treat haemodynamic instability promptly.</li>
                                <li>Use blood products according to the clinical picture and local major-haemorrhage protocol.</li>
                                <li>Do not delay resuscitation while waiting for diagnostic procedures.</li>
                                <li>Reassess response to treatment continuously.</li>
                            </ul>

                            <p>
                                Avoid unnecessary over-transfusion and base
                                transfusion decisions on the full clinical
                                picture.
                            </p>

                        </div>

                    </section>


                    <section class="gi-bleeding-section">

                        <h3>4. Suspect upper GI bleeding</h3>

                        <div class="gi-bleeding-grid">

                            <div class="gi-bleeding-card warning">
                                <strong>Haematemesis</strong>
                                <p>
                                    Fresh blood or coffee-ground vomiting
                                    suggests an upper GI source.
                                </p>
                            </div>

                            <div class="gi-bleeding-card warning">
                                <strong>Melaena</strong>
                                <p>
                                    Black tarry stool is strongly suggestive
                                    of upper GI bleeding.
                                </p>
                            </div>

                            <div class="gi-bleeding-card warning">
                                <strong>Haematochezia</strong>
                                <p>
                                    Usually suggests lower GI bleeding,
                                    but may occur with brisk upper GI bleeding.
                                </p>
                            </div>

                            <div class="gi-bleeding-card warning">
                                <strong>Occult / ongoing blood loss</strong>
                                <p>
                                    Consider haemodynamic changes even when
                                    visible bleeding is limited.
                                </p>
                            </div>

                        </div>

                    </section>


                    <section class="gi-bleeding-section">

                        <h3>5. Medication review</h3>

                        <div class="gi-bleeding-card">

                            <ul>
                                <li>Identify anticoagulant therapy.</li>
                                <li>Identify antiplatelet therapy.</li>
                                <li>Assess relevant NSAID use.</li>
                                <li>Consider appropriate reversal strategy in life-threatening bleeding.</li>
                                <li>Follow current anticoagulation-reversal guidance and local protocols.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="gi-bleeding-section">

                        <h3>6. Endoscopy</h3>

                        <div class="gi-bleeding-card emergency">

                            <strong>Unstable severe upper GI bleeding</strong>

                            <p>
                                Offer endoscopy immediately after resuscitation
                                when the patient is unstable with severe acute
                                upper GI bleeding.
                            </p>

                            <p>
                                Timing and prioritisation should follow the
                                local endoscopy / GI bleeding pathway for
                                stable patients.
                            </p>

                        </div>

                    </section>


                    <section class="gi-bleeding-section">

                        <h3>7. Consider variceal bleeding</h3>

                        <div class="gi-bleeding-card critical">

                            <ul>
                                <li>Consider cirrhosis or portal hypertension.</li>
                                <li>Look for known liver disease or previous varices.</li>
                                <li>Escalate urgently to the appropriate GI / endoscopy team.</li>
                                <li>Follow the local variceal bleeding pathway.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="gi-bleeding-section">

                        <h3>8. Other important causes</h3>

                        <div class="gi-bleeding-grid">

                            <div class="gi-bleeding-card">
                                <strong>Peptic ulcer disease</strong>
                            </div>

                            <div class="gi-bleeding-card">
                                <strong>Gastritis / duodenitis</strong>
                            </div>

                            <div class="gi-bleeding-card">
                                <strong>Oesophageal pathology</strong>
                            </div>

                            <div class="gi-bleeding-card">
                                <strong>Malignancy</strong>
                            </div>

                            <div class="gi-bleeding-card">
                                <strong>Varices</strong>
                            </div>

                            <div class="gi-bleeding-card">
                                <strong>Lower GI source</strong>
                            </div>

                        </div>

                    </section>


                    <section class="gi-bleeding-section">

                        <h3>9. Reassessment & escalation</h3>

                        <div class="gi-bleeding-card reassess">

                            <strong>Reassess continuously.</strong>

                            <p>
                                Repeat haemodynamic assessment, monitor
                                ongoing bleeding, review laboratory results
                                and escalate early if instability persists.
                            </p>

                        </div>

                    </section>


                    <div class="gi-bleeding-note">

                        <strong>Clinical safety note</strong>

                        <p>
                            This is a point-of-care reference aid.
                            Follow the current local GI bleeding, transfusion,
                            anticoagulation reversal and endoscopy protocols.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);

    let cleanupAccessibleModal;

    function closeGIBleedingModal() {

        if (cleanupAccessibleModal) {
            cleanupAccessibleModal();
        }

        modal.remove();
    }


    cleanupAccessibleModal =
        setupAccessibleModal(modal, {
            closeButton: modal.querySelector("#closeGIBleeding"),
            onEscape: closeGIBleedingModal
        });


    modal
        .querySelector("#closeGIBleeding")
        .addEventListener(
            "click",
            closeGIBleedingModal
        );

    document
        .querySelector(".gi-bleeding-overlay")
        .addEventListener("click", (event) => {

            if (event.target.classList.contains("gi-bleeding-overlay")) {
                closeGIBleedingModal();
            }

        });

}
