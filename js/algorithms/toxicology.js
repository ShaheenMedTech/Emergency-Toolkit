// ========================================
// Adult Emergency Toxicology Quick Reference
// RCUK 2025 aligned
// ========================================

function openToxicology() {

    const existing = document.getElementById("toxicologyModal");

    if (existing) {
        existing.remove();
    }

    const modal = document.createElement("div");

    modal.id = "toxicologyModal";

    modal.innerHTML = `
        <div class="toxicology-overlay">

            <div
                class="toxicology-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="toxicologyTitle">

                <div class="toxicology-header">

                    <div>
                        <h2 id="toxicologyTitle">☣️ Emergency Toxicology</h2>
                        <p>Poisoning & Overdose Quick Reference</p>
                    </div>

                    <button
                        aria-label="Close dialog" id="closeToxicology"
                        class="toxicology-close">
                        ×
                    </button>

                </div>


                <div class="toxicology-body">

                    <div class="toxicology-alert">

                        <strong>Protect yourself first.</strong>

                        <p>
                            Consider scene safety, secondary contamination,
                            airway protection and the possibility of a toxic
                            agent affecting the rescuer.
                        </p>

                    </div>


                    <section class="toxicology-section">

                        <h3>1. Initial approach</h3>

                        <ol>
                            <li>Ensure personal and team safety.</li>
                            <li>Remove or stop ongoing exposure when safely possible.</li>
                            <li>Assess airway, breathing and circulation.</li>
                            <li>Check consciousness and blood glucose.</li>
                            <li>Measure temperature.</li>
                            <li>Obtain ECG and appropriate monitoring.</li>
                            <li>Look for evidence of poisoning, overdose or toxic exposure.</li>
                        </ol>

                    </section>


                    <section class="toxicology-section">

                        <h3>2. Think toxidrome</h3>

                        <div class="toxicology-grid">

                            <div class="toxicology-card">
                                <strong>Opioid</strong>

                                <ul>
                                    <li>Reduced consciousness</li>
                                    <li>Respiratory depression</li>
                                    <li>Small pupils may be present</li>
                                </ul>

                            </div>


                            <div class="toxicology-card">
                                <strong>Sympathomimetic</strong>

                                <ul>
                                    <li>Agitation</li>
                                    <li>Tachycardia / hypertension</li>
                                    <li>Sweating and hyperthermia may occur</li>
                                </ul>

                            </div>


                            <div class="toxicology-card">
                                <strong>Anticholinergic</strong>

                                <ul>
                                    <li>Agitation or delirium</li>
                                    <li>Tachycardia</li>
                                    <li>Hot / dry skin may be present</li>
                                </ul>

                            </div>


                            <div class="toxicology-card">
                                <strong>Cholinergic</strong>

                                <ul>
                                    <li>Secretions</li>
                                    <li>Bronchospasm / bronchorrhoea</li>
                                    <li>Bradycardia may occur</li>
                                </ul>

                            </div>

                        </div>

                    </section>


                    <section class="toxicology-section">

                        <h3>3. Immediate supportive care</h3>

                        <div class="toxicology-card critical">

                            <ul>
                                <li>Prioritise airway protection and adequate ventilation.</li>
                                <li>Treat hypoxia promptly.</li>
                                <li>Correct immediately dangerous hypoglycaemia.</li>
                                <li>Treat seizures according to the local emergency pathway.</li>
                                <li>Manage severe temperature abnormalities.</li>
                                <li>Recognise and treat shock.</li>
                                <li>Identify and treat dysrhythmias and other life-threatening complications.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="toxicology-section">

                        <h3>4. ECG & investigations</h3>

                        <div class="toxicology-card">

                            <ul>
                                <li>Obtain a 12-lead ECG when clinically indicated.</li>
                                <li>Consider QRS and QT abnormalities.</li>
                                <li>Check glucose, electrolytes and renal function as appropriate.</li>
                                <li>Consider blood gas and lactate in critically ill patients.</li>
                                <li>Use targeted toxicology testing when it changes management.</li>
                                <li>Keep the history broad: prescribed drugs, recreational drugs, household chemicals and occupational exposures.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="toxicology-section">

                        <h3>5. Decontamination</h3>

                        <div class="toxicology-card warning">

                            <strong>Do not decontaminate routinely.</strong>

                            <p>
                                Consider the specific toxin, route of exposure,
                                timing, clinical condition and aspiration risk.
                            </p>

                            <ul>
                                <li>Remove contaminated clothing when appropriate.</li>
                                <li>Wash exposed skin when indicated.</li>
                                <li>Consider gastrointestinal decontamination only when specifically indicated.</li>
                                <li>Do not delay essential resuscitation for decontamination.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="toxicology-section">

                        <h3>6. Antidotes & enhanced elimination</h3>

                        <div class="toxicology-card emergency">

                            <ul>
                                <li>Identify whether a specific antidote exists.</li>
                                <li>Administer an appropriate antidote as soon as indicated.</li>
                                <li>Consider enhanced elimination for selected toxins.</li>
                                <li>Use regional / national poison-centre guidance for toxin-specific management.</li>
                            </ul>

                            <p>
                                <strong>Important:</strong>
                                Antidote selection and dosing are toxin-specific
                                and should be verified against the current
                                poison-centre or institutional protocol.
                            </p>

                        </div>

                    </section>


                    <section class="toxicology-section">

                        <h3>7. Poisoning with cardiac arrest</h3>

                        <div class="toxicology-card critical">

                            <ul>
                                <li>Start standard ALS immediately.</li>
                                <li>Actively search for reversible toxic causes.</li>
                                <li>Consider toxin-specific treatment early.</li>
                                <li>Be prepared for prolonged resuscitation in selected poisonings.</li>
                                <li>Seek specialist poison-centre advice early.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="toxicology-section">

                        <h3>8. Red flags</h3>

                        <div class="toxicology-grid">

                            <div class="toxicology-card emergency">
                                <strong>Reduced consciousness</strong>
                            </div>

                            <div class="toxicology-card emergency">
                                <strong>Respiratory depression</strong>
                            </div>

                            <div class="toxicology-card emergency">
                                <strong>Seizures</strong>
                            </div>

                            <div class="toxicology-card emergency">
                                <strong>Severe dysrhythmia</strong>
                            </div>

                            <div class="toxicology-card emergency">
                                <strong>Shock</strong>
                            </div>

                            <div class="toxicology-card emergency">
                                <strong>Severe temperature abnormality</strong>
                            </div>

                        </div>

                    </section>


                    <div class="toxicology-note">

                        <strong>Clinical safety note</strong>

                        <p>
                            This is a point-of-care reference aid.
                            Poisoning management is toxin-specific.
                            Verify antidotes, doses, decontamination and
                            enhanced-elimination strategies with current
                            local protocols and poison-centre guidance.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);


    let cleanupAccessibleModal;

    function closeToxicologyModal() {

        if (cleanupAccessibleModal) {
            cleanupAccessibleModal();
        }

        modal.remove();
    }


    cleanupAccessibleModal =
        setupAccessibleModal(modal, {
            closeButton: modal.querySelector("#closeToxicology"),
            onEscape: closeToxicologyModal
        });


    modal
        .querySelector("#closeToxicology")
        .addEventListener(
            "click",
            closeToxicologyModal
        );


    document
        .querySelector(".toxicology-overlay")
        .addEventListener("click", (event) => {

            if (event.target.classList.contains("toxicology-overlay")) {
                closeToxicologyModal();
            }

        });

}
