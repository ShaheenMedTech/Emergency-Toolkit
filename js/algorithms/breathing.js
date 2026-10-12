// ========================================
// Adult Emergency Breathing Quick Reference
// ========================================

function openBreathing() {

    const existing = document.getElementById("breathingModal");

    if (existing) {
        existing.remove();
    }

    const modal = document.createElement("div");

    modal.id = "breathingModal";

    modal.innerHTML = `
        <div class="breathing-overlay">

            <div
                class="breathing-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="breathingTitle">

                <div class="breathing-header">
                    <div>
                        <h2 id="breathingTitle">🫁 Adult Emergency Breathing</h2>
                        <p>Assessment & Management Quick Reference</p>
                    </div>

                    <button
                        aria-label="Close dialog" id="closeBreathing"
                        class="breathing-close">
                        ×
                    </button>
                </div>

                <div class="breathing-body">

                    <div class="breathing-alert">
                        <strong>Breathing problems can deteriorate rapidly.</strong>
                        <p>
                            Assess oxygenation, ventilation and work of breathing
                            immediately. Treat life-threatening abnormalities
                            while continuing reassessment.
                        </p>
                    </div>

                    <section class="breathing-section">
                        <h3>1. Immediate assessment</h3>

                        <ul>
                            <li>Assess respiratory effort and work of breathing.</li>
                            <li>Check respiratory rate and pattern.</li>
                            <li>Measure SpO₂ and assess for hypoxaemia.</li>
                            <li>Assess chest movement and symmetry.</li>
                            <li>Auscultate and consider percussion when appropriate.</li>
                            <li>Assess mental status and ability to protect the airway.</li>
                        </ul>
                    </section>

                    <section class="breathing-section">
                        <h3>2. Immediate actions</h3>

                        <div class="breathing-card critical">
                            <ol>
                                <li>Call for help early if severe respiratory compromise is present.</li>
                                <li>Position the patient to optimise breathing when appropriate.</li>
                                <li>Apply monitoring including SpO₂.</li>
                                <li>Give supplemental oxygen when clinically indicated and titrate to target.</li>
                                <li>Prepare assisted ventilation if ventilation is inadequate.</li>
                            </ol>
                        </div>
                    </section>

                    <section class="breathing-section">
                        <h3>3. Oxygenation targets</h3>

                        <div class="breathing-grid">

                            <div class="breathing-card oxygen">
                                <strong>Most adults</strong>
                                <p>
                                    Target SpO₂ approximately
                                    <strong>94–98%</strong>.
                                </p>
                            </div>

                            <div class="breathing-card warning">
                                <strong>Risk of hypercapnic respiratory failure</strong>
                                <p>
                                    Target SpO₂ approximately
                                    <strong>88–92%</strong>.
                                </p>
                            </div>

                        </div>
                    </section>

                    <section class="breathing-section">
                        <h3>4. Life-threatening causes</h3>

                        <div class="breathing-grid">

                            <div class="breathing-card emergency">
                                <strong>Tension pneumothorax</strong>
                                <p>
                                    Suspect with severe respiratory compromise,
                                    unilateral findings and haemodynamic deterioration.
                                </p>
                            </div>

                            <div class="breathing-card emergency">
                                <strong>Severe asthma</strong>
                                <p>
                                    Look for exhaustion, silent chest,
                                    worsening hypoxaemia or ventilatory failure.
                                </p>
                            </div>

                            <div class="breathing-card emergency">
                                <strong>Massive haemothorax</strong>
                                <p>
                                    Consider major thoracic bleeding with
                                    respiratory and circulatory compromise.
                                </p>
                            </div>

                            <div class="breathing-card emergency">
                                <strong>Acute pulmonary oedema</strong>
                                <p>
                                    Consider severe hypoxaemia, increased work
                                    of breathing and diffuse pulmonary findings.
                                </p>
                            </div>

                        </div>
                    </section>

                    <section class="breathing-section">
                        <h3>5. Ventilation failure</h3>

                        <div class="breathing-card">
                            <ul>
                                <li>Look for reduced consciousness or exhaustion.</li>
                                <li>Assess for inadequate chest movement.</li>
                                <li>Consider blood gas assessment when clinically appropriate.</li>
                                <li>Prepare assisted ventilation if spontaneous ventilation becomes inadequate.</li>
                                <li>Escalate early to an experienced airway/resuscitation team.</li>
                            </ul>
                        </div>
                    </section>

                    <section class="breathing-section">
                        <h3>6. Reassessment</h3>

                        <div class="breathing-card reassess">
                            <strong>Breathing assessment is continuous.</strong>

                            <p>
                                Reassess respiratory effort, SpO₂, ventilation,
                                mental status and response after every intervention
                                and whenever the patient's condition changes.
                            </p>
                        </div>
                    </section>

                    <section class="breathing-section">
                        <h3>7. Escalation</h3>

                        <ol>
                            <li>Recognise deterioration early.</li>
                            <li>Call for senior/resuscitation support.</li>
                            <li>Prepare advanced oxygenation or ventilation strategies.</li>
                            <li>Use local emergency respiratory protocols.</li>
                        </ol>
                    </section>

                    <div class="breathing-note">
                        <strong>Clinical safety note</strong>

                        <p>
                            This is a point-of-care reference aid.
                            Follow current local respiratory, oxygen,
                            ventilation and resuscitation protocols.
                        </p>
                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);

    let cleanupAccessibleModal;

    function closeBreathingModal() {

        if (cleanupAccessibleModal) {
            cleanupAccessibleModal();
        }

        modal.remove();
    }


    cleanupAccessibleModal =
        setupAccessibleModal(modal, {
            closeButton: modal.querySelector("#closeBreathing"),
            onEscape: closeBreathingModal
        });


    modal
        .querySelector("#closeBreathing")
        .addEventListener(
            "click",
            closeBreathingModal
        );

    document
        .querySelector(".breathing-overlay")
        .addEventListener("click", (event) => {

            if (event.target.classList.contains("breathing-overlay")) {
                closeBreathingModal();
            }

        });

}
