// ========================================
// Adult Emergency Exposure Quick Reference
// Exposure, Environment & Secondary Survey
// ========================================

function openExposure() {

    const existing = document.getElementById("exposureModal");

    if (existing) {
        existing.remove();
    }

    const modal = document.createElement("div");

    modal.id = "exposureModal";

    modal.innerHTML = `
        <div class="exposure-overlay">

            <div
                class="exposure-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="exposureTitle">

                <div class="exposure-header">
                    <div>
                        <h2 id="exposureTitle">🌡️ Adult Emergency Exposure</h2>
                        <p>Exposure & Environment Quick Reference</p>
                    </div>

                    <button
                        aria-label="Close dialog" id="closeExposure"
                        class="exposure-close">
                        ×
                    </button>
                </div>

                <div class="exposure-body">

                    <div class="exposure-alert">
                        <strong>Expose enough to identify serious injury — prevent heat loss.</strong>
                        <p>
                            Perform a systematic examination while maintaining
                            dignity, privacy and temperature control.
                        </p>
                    </div>

                    <section class="exposure-section">

                        <h3>1. Controlled exposure</h3>

                        <ul>
                            <li>Expose the patient sufficiently to identify major injuries or abnormal findings.</li>
                            <li>Use a systematic head-to-toe examination.</li>
                            <li>Inspect the front, back and hidden areas when clinically indicated.</li>
                            <li>Remove or cut clothing when necessary for urgent assessment or treatment.</li>
                            <li>Preserve patient dignity and privacy throughout the examination.</li>
                        </ul>

                    </section>

                    <section class="exposure-section">

                        <h3>2. Prevent hypothermia</h3>

                        <div class="exposure-card critical">

                            <strong>Temperature control is part of resuscitation.</strong>

                            <ul>
                                <li>Minimise unnecessary exposure time.</li>
                                <li>Use blankets, warming devices or other appropriate measures.</li>
                                <li>Replace wet clothing or remove wet materials when appropriate.</li>
                                <li>Warm the clinical environment where possible.</li>
                                <li>Monitor temperature in patients at risk of hypo- or hyperthermia.</li>
                            </ul>

                        </div>

                    </section>

                    <section class="exposure-section">

                        <h3>3. Head-to-toe examination</h3>

                        <div class="exposure-grid">

                            <div class="exposure-card">
                                <strong>Head & face</strong>
                                <ul>
                                    <li>Scalp injury or bleeding.</li>
                                    <li>Facial injury.</li>
                                    <li>Signs of trauma or swelling.</li>
                                </ul>
                            </div>

                            <div class="exposure-card">
                                <strong>Neck</strong>
                                <ul>
                                    <li>Visible injury or swelling.</li>
                                    <li>External bleeding.</li>
                                    <li>Consider cervical spine injury in the appropriate context.</li>
                                </ul>
                            </div>

                            <div class="exposure-card">
                                <strong>Chest & abdomen</strong>
                                <ul>
                                    <li>Bruising, penetrating injury or deformity.</li>
                                    <li>Abdominal distension or tenderness.</li>
                                    <li>Consider occult bleeding or internal injury.</li>
                                </ul>
                            </div>

                            <div class="exposure-card">
                                <strong>Pelvis & perineum</strong>
                                <ul>
                                    <li>Assess for major pelvic injury when clinically indicated.</li>
                                    <li>Look for bleeding or significant soft-tissue injury.</li>
                                    <li>Maintain privacy and dignity during examination.</li>
                                </ul>
                            </div>

                            <div class="exposure-card">
                                <strong>Limbs</strong>
                                <ul>
                                    <li>Deformity, wounds or bleeding.</li>
                                    <li>Distal perfusion and neurological status.</li>
                                    <li>Assess for compartment or vascular concerns when appropriate.</li>
                                </ul>
                            </div>

                            <div class="exposure-card">
                                <strong>Back</strong>
                                <ul>
                                    <li>Inspect for wounds, bruising or deformity.</li>
                                    <li>Perform log-roll or repositioning only when clinically appropriate.</li>
                                    <li>Maintain spinal precautions when indicated.</li>
                                </ul>
                            </div>

                        </div>

                    </section>

                    <section class="exposure-section">

                        <h3>4. Secondary survey</h3>

                        <div class="exposure-card">

                            <ul>
                                <li>Obtain a focused history when the patient is stable enough to provide one.</li>
                                <li>Review mechanism of injury and relevant events.</li>
                                <li>Review medications, allergies and important medical history.</li>
                                <li>Identify additional injuries or conditions not found during the primary survey.</li>
                                <li>Repeat the examination as the patient's condition evolves.</li>
                            </ul>

                        </div>

                    </section>

                    <section class="exposure-section">

                        <h3>5. Environmental considerations</h3>

                        <div class="exposure-grid">

                            <div class="exposure-card warning">
                                <strong>Cold environment</strong>
                                <p>
                                    Minimise heat loss and actively prevent
                                    hypothermia.
                                </p>
                            </div>

                            <div class="exposure-card warning">
                                <strong>Heat exposure</strong>
                                <p>
                                    Consider environmental hyperthermia and
                                    associated physiological deterioration.
                                </p>
                            </div>

                            <div class="exposure-card warning">
                                <strong>Wet patient</strong>
                                <p>
                                    Remove wet materials when appropriate and
                                    dry and warm the patient.
                                </p>
                            </div>

                            <div class="exposure-card warning">
                                <strong>Privacy</strong>
                                <p>
                                    Limit unnecessary exposure and use
                                    appropriate draping.
                                </p>
                            </div>

                        </div>

                    </section>

                    <section class="exposure-section">

                        <h3>6. Reassessment</h3>

                        <div class="exposure-card reassess">

                            <strong>Exposure is not the end of the assessment.</strong>

                            <p>
                                Return to the primary survey and reassess the
                                patient whenever deterioration occurs or after
                                significant intervention.
                            </p>

                        </div>

                    </section>

                    <div class="exposure-note">

                        <strong>Clinical safety note</strong>

                        <p>
                            This is a point-of-care reference aid.
                            Follow current local trauma, environmental exposure,
                            temperature-control and resuscitation protocols.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);

    let cleanupAccessibleModal;

    function closeExposureModal() {

        if (cleanupAccessibleModal) {
            cleanupAccessibleModal();
        }

        modal.remove();
    }


    cleanupAccessibleModal =
        setupAccessibleModal(modal, {
            closeButton: modal.querySelector("#closeExposure"),
            onEscape: closeExposureModal
        });


    modal
        .querySelector("#closeExposure")
        .addEventListener(
            "click",
            closeExposureModal
        );

    document
        .querySelector(".exposure-overlay")
        .addEventListener("click", (event) => {

            if (event.target.classList.contains("exposure-overlay")) {
                closeExposureModal();
            }

        });

}
