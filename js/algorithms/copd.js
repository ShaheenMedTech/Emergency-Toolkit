// ========================================
// Adult COPD Exacerbation Quick Reference
// GOLD 2026 / NICE aligned
// ========================================

function openCOPD() {

    const existing = document.getElementById("copdModal");

    if (existing) {
        existing.remove();
    }

    const modal = document.createElement("div");

    modal.id = "copdModal";

    modal.innerHTML = `
        <div class="copd-overlay">

            <div
                class="copd-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="copdTitle">

                <div class="copd-header">

                    <div>
                        <h2 id="copdTitle">🫁 COPD Exacerbation</h2>
                        <p>Adult Acute Exacerbation Quick Reference</p>
                    </div>

                    <button
                        aria-label="Close dialog" id="closeCOPD"
                        class="copd-close">
                        ×
                    </button>

                </div>


                <div class="copd-body">

                    <div class="copd-alert">

                        <strong>Acute COPD exacerbation can cause respiratory failure.</strong>

                        <p>
                            Assess severity early, treat bronchospasm and
                            respiratory failure promptly, and actively look
                            for alternative or concurrent diagnoses.
                        </p>

                    </div>


                    <section class="copd-section">

                        <h3>1. Recognise the exacerbation</h3>

                        <ul>
                            <li>Increased breathlessness.</li>
                            <li>Increased cough.</li>
                            <li>Change in sputum volume and/or purulence.</li>
                            <li>Possible tachypnoea and tachycardia.</li>
                            <li>Assess baseline COPD severity and previous respiratory failure.</li>
                        </ul>

                    </section>


                    <section class="copd-section">

                        <h3>2. Look for alternative / concurrent diagnoses</h3>

                        <div class="copd-grid">

                            <div class="copd-card warning">
                                <strong>Pneumonia</strong>
                                <p>
                                    Consider fever, focal chest findings
                                    and systemic features.
                                </p>
                            </div>

                            <div class="copd-card warning">
                                <strong>Pulmonary embolism</strong>
                                <p>
                                    Consider when the presentation is
                                    disproportionate or atypical.
                                </p>
                            </div>

                            <div class="copd-card warning">
                                <strong>Acute heart failure</strong>
                                <p>
                                    Consider pulmonary oedema or cardiac
                                    decompensation as a concurrent process.
                                </p>
                            </div>

                            <div class="copd-card warning">
                                <strong>Pneumothorax</strong>
                                <p>
                                    Consider sudden deterioration or
                                    asymmetric chest findings.
                                </p>
                            </div>

                        </div>

                    </section>


                    <section class="copd-section">

                        <h3>3. Initial assessment</h3>

                        <ol>
                            <li>Assess airway, breathing and circulation.</li>
                            <li>Measure respiratory rate, pulse and blood pressure.</li>
                            <li>Monitor oxygen saturation.</li>
                            <li>Assess mental status and work of breathing.</li>
                            <li>Obtain blood gas assessment when clinically indicated.</li>
                            <li>Consider ECG and chest imaging when indicated by the presentation.</li>
                            <li>Review previous episodes of hypercapnic respiratory failure and home NIV when relevant.</li>
                        </ol>

                    </section>


                    <section class="copd-section">

                        <h3>4. Oxygen therapy</h3>

                        <div class="copd-card critical">

                            <strong>Controlled oxygen</strong>

                            <p>
                                In patients at risk of hypercapnic respiratory
                                failure, use controlled oxygen and target
                                the locally recommended saturation range,
                                commonly 88–92%.
                            </p>

                            <p>
                                Reassess clinically and with blood gas testing
                                when indicated.
                            </p>

                        </div>

                    </section>


                    <section class="copd-section">

                        <h3>5. Bronchodilators</h3>

                        <div class="copd-card emergency">

                            <ul>
                                <li>Use short-acting beta₂-agonist therapy as the initial bronchodilator.</li>
                                <li>Add a short-acting anticholinergic when appropriate.</li>
                                <li>Increase frequency according to severity and response.</li>
                                <li>Use a nebuliser or spacer according to the clinical situation and local protocol.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="copd-section">

                        <h3>6. Systemic corticosteroid</h3>

                        <div class="copd-card">

                            <strong>Short course</strong>

                            <p>
                                Systemic corticosteroids are recommended for
                                moderate or severe exacerbations, generally
                                for up to 5 days.
                            </p>

                            <p>
                                Verify the local formulary, dose and route
                                before administration.
                            </p>

                        </div>

                    </section>


                    <section class="copd-section">

                        <h3>7. Antibiotics</h3>

                        <div class="copd-card warning">

                            <strong>Not every exacerbation requires antibiotics.</strong>

                            <ul>
                                <li>Consider antibiotics when sputum is purulent and bacterial infection is suspected.</li>
                                <li>Consider them in patients with relevant previous sputum microbiology.</li>
                                <li>Consider antibiotics when mechanical ventilation is required, according to the clinical pathway.</li>
                                <li>Use local antimicrobial guidance and microbiology advice when appropriate.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="copd-section">

                        <h3>8. Acute hypercapnic respiratory failure</h3>

                        <div class="copd-card critical">

                            <strong>Consider NIV early.</strong>

                            <ul>
                                <li>Assess blood gas results and clinical response.</li>
                                <li>Use non-invasive ventilation when indicated and not contraindicated.</li>
                                <li>Continue close monitoring of respiratory effort and gas exchange.</li>
                                <li>Escalate to critical care / invasive ventilation when NIV fails or is contraindicated.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="copd-section">

                        <h3>9. Reassessment</h3>

                        <div class="copd-card reassess">

                            <strong>Reassess after every major intervention.</strong>

                            <p>
                                Repeat respiratory rate, work of breathing,
                                SpO₂, mental status and blood gas assessment
                                when appropriate.
                            </p>

                        </div>

                    </section>


                    <div class="copd-note">

                        <strong>Clinical safety note</strong>

                        <p>
                            This is a point-of-care reference aid.
                            Follow the current local COPD, oxygen, antimicrobial
                            and NIV protocols. Verify patient-specific
                            contraindications, drug dose, route and oxygen target
                            before treatment.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);

    let cleanupAccessibleModal;

    function closeCOPDModal() {

        if (cleanupAccessibleModal) {
            cleanupAccessibleModal();
        }

        modal.remove();
    }


    cleanupAccessibleModal =
        setupAccessibleModal(modal, {
            closeButton: modal.querySelector("#closeCOPD"),
            onEscape: closeCOPDModal
        });


    modal
        .querySelector("#closeCOPD")
        .addEventListener(
            "click",
            closeCOPDModal
        );

    document
        .querySelector(".copd-overlay")
        .addEventListener("click", (event) => {

            if (event.target.classList.contains("copd-overlay")) {
                closeCOPDModal();
            }

        });

}
