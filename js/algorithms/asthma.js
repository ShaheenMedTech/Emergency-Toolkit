// ========================================
// Adult Acute Asthma Quick Reference
// RCUK 2025 aligned
// ========================================

function openAsthma() {

    const existing = document.getElementById("asthmaModal");

    if (existing) {
        existing.remove();
    }

    const modal = document.createElement("div");

    modal.id = "asthmaModal";

    modal.innerHTML = `
        <div class="asthma-overlay">

            <div
                class="asthma-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="asthmaTitle">

                <div class="asthma-header">

                    <div>
                        <h2 id="asthmaTitle">🫁 Acute Asthma</h2>
                        <p>Adult Severe / Life-Threatening Asthma Quick Reference</p>
                    </div>

                    <button
                        aria-label="Close dialog" id="closeAsthma"
                        class="asthma-close">
                        ×
                    </button>

                </div>


                <div class="asthma-body">

                    <div class="asthma-alert">

                        <strong>Acute severe asthma can deteriorate rapidly.</strong>

                        <p>
                            Assess using ABCDE, recognise severe or
                            life-threatening features early and escalate
                            promptly when response is poor.
                        </p>

                    </div>


                    <section class="asthma-section">

                        <h3>1. Initial assessment</h3>

                        <ol>
                            <li>Call for senior help if severe or life-threatening asthma is suspected.</li>
                            <li>Assess airway and breathing using ABCDE.</li>
                            <li>Check respiratory rate, SpO₂ and pulse.</li>
                            <li>Assess ability to speak and overall work of breathing.</li>
                            <li>Measure peak expiratory flow when practical.</li>
                            <li>Consider ABG in severe or life-threatening asthma.</li>
                        </ol>

                    </section>


                    <section class="asthma-section">

                        <h3>2. Features of severe asthma</h3>

                        <div class="asthma-card warning">

                            <ul>
                                <li>PEF 33–50% predicted or best.</li>
                                <li>Respiratory rate ≥ 25/min.</li>
                                <li>Heart rate ≥ 110/min.</li>
                                <li>Unable to complete sentences in one breath.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="asthma-section">

                        <h3>3. Life-threatening features</h3>

                        <div class="asthma-card critical">

                            <ul>
                                <li>SpO₂ < 92%.</li>
                                <li>PEF < 33% predicted or best.</li>
                                <li>Silent chest.</li>
                                <li>Cyanosis.</li>
                                <li>Poor respiratory effort.</li>
                                <li>Exhaustion.</li>
                                <li>Altered consciousness.</li>
                                <li>Hypotension or arrhythmia.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="asthma-section">

                        <h3>4. Immediate treatment</h3>

                        <div class="asthma-card emergency">

                            <ol>
                                <li>Give oxygen and titrate to the appropriate target when monitoring is available.</li>
                                <li>Give nebulised salbutamol.</li>
                                <li>Add nebulised ipratropium in severe or life-threatening asthma.</li>
                                <li>Start systemic corticosteroid therapy promptly.</li>
                                <li>Consider IV crystalloid when clinically indicated.</li>
                            </ol>

                        </div>

                    </section>


                    <section class="asthma-section">

                        <h3>5. Standard adult drug doses</h3>

                        <div class="asthma-drug">

                            <strong>Salbutamol</strong>

                            <p>
                                5 mg nebulised, with continuous nebulisation
                                considered in severe or life-threatening asthma.
                            </p>

                        </div>


                        <div class="asthma-drug">

                            <strong>Ipratropium bromide</strong>

                            <p>
                                500 micrograms nebulised.
                            </p>

                        </div>


                        <div class="asthma-drug">

                            <strong>Steroid therapy</strong>

                            <p>
                                100 mg IV hydrocortisone
                                <strong>or</strong>
                                40 mg oral prednisolone.
                            </p>

                        </div>

                    </section>


                    <section class="asthma-section">

                        <h3>6. Poor response</h3>

                        <div class="asthma-card emergency">

                            <ul>
                                <li>Continue frequent reassessment.</li>
                                <li>Give IV magnesium sulfate when response to initial therapy is inadequate.</li>
                                <li>Apply cardiac monitoring and check electrolytes when appropriate.</li>
                                <li>Escalate early to anaesthetics / critical care.</li>
                                <li>Consider IV salbutamol or IV aminophylline only after senior specialist discussion in life-threatening situations.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="asthma-section">

                        <h3>7. Magnesium sulfate</h3>

                        <div class="asthma-card">

                            <strong>IV magnesium sulfate</strong>

                            <p>
                                2 g IV over 20 minutes in severe or
                                life-threatening asthma with inadequate
                                response to initial therapy.
                            </p>

                        </div>

                    </section>


                    <section class="asthma-section">

                        <h3>8. Important complications</h3>

                        <div class="asthma-grid">

                            <div class="asthma-card critical">
                                <strong>Tension pneumothorax</strong>
                                <p>
                                    Actively consider when there is sudden
                                    deterioration or asymmetric chest findings.
                                </p>
                            </div>

                            <div class="asthma-card warning">
                                <strong>Dynamic hyperinflation</strong>
                                <p>
                                    Consider gas trapping and high airway
                                    pressures during advanced ventilation.
                                </p>
                            </div>

                            <div class="asthma-card warning">
                                <strong>Hypokalaemia</strong>
                                <p>
                                    Consider treatment-related potassium shift
                                    and monitor electrolytes when appropriate.
                                </p>
                            </div>

                            <div class="asthma-card warning">
                                <strong>Hypercapnia / fatigue</strong>
                                <p>
                                    Rising CO₂ or deteriorating mental status
                                    may indicate impending respiratory failure.
                                </p>
                            </div>

                        </div>

                    </section>


                    <section class="asthma-section">

                        <h3>9. Reassessment & escalation</h3>

                        <div class="asthma-card reassess">

                            <strong>Reassess after every intervention.</strong>

                            <p>
                                Repeat respiratory rate, SpO₂, pulse,
                                work of breathing, PEF when possible,
                                mental status and clinical response.
                            </p>

                        </div>

                    </section>


                    <div class="asthma-note">

                        <strong>Clinical safety note</strong>

                        <p>
                            This is a point-of-care reference aid.
                            Follow the current local asthma, oxygen,
                            airway and critical-care protocols. Verify
                            drug concentration, route and patient-specific
                            contraindications before administration.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);

    let cleanupAccessibleModal;

    function closeAsthmaModal() {

        if (cleanupAccessibleModal) {
            cleanupAccessibleModal();
        }

        modal.remove();
    }


    cleanupAccessibleModal =
        setupAccessibleModal(modal, {
            closeButton: modal.querySelector("#closeAsthma"),
            onEscape: closeAsthmaModal
        });


    modal
        .querySelector("#closeAsthma")
        .addEventListener(
            "click",
            closeAsthmaModal
        );

    document
        .querySelector(".asthma-overlay")
        .addEventListener("click", (event) => {

            if (event.target.classList.contains("asthma-overlay")) {
                closeAsthmaModal();
            }

        });

}
