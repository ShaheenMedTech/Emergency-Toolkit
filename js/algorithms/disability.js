// ========================================
// Adult Emergency Disability Quick Reference
// Neurological Assessment & Management
// ========================================

function openDisability() {

    const existing = document.getElementById("disabilityModal");

    if (existing) {
        existing.remove();
    }

    const modal = document.createElement("div");

    modal.id = "disabilityModal";

    modal.innerHTML = `
        <div class="disability-overlay">

            <div
                class="disability-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="disabilityTitle">

                <div class="disability-header">
                    <div>
                        <h2 id="disabilityTitle">🧠 Adult Emergency Disability</h2>
                        <p>Neurological Assessment Quick Reference</p>
                    </div>

                    <button
                        aria-label="Close dialog" id="closeDisability"
                        class="disability-close">
                        ×
                    </button>
                </div>

                <div class="disability-body">

                    <div class="disability-alert">
                        <strong>Neurological deterioration is time-critical.</strong>
                        <p>
                            Identify reversible causes rapidly, assess
                            neurological function systematically and
                            escalate immediately when deterioration is present.
                        </p>
                    </div>

                    <section class="disability-section">

                        <h3>1. Immediate neurological assessment</h3>

                        <ul>
                            <li>Assess level of consciousness.</li>
                            <li>Record GCS and its individual components when appropriate.</li>
                            <li>Assess pupils for size, symmetry and reaction to light.</li>
                            <li>Assess limb movement and symmetry.</li>
                            <li>Look for focal neurological deficit.</li>
                            <li>Assess speech when clinically possible.</li>
                        </ul>

                    </section>

                    <section class="disability-section">

                        <h3>2. Check reversible causes</h3>

                        <div class="disability-grid">

                            <div class="disability-card critical">
                                <strong>Glucose</strong>
                                <p>
                                    Check blood glucose promptly in altered
                                    consciousness or neurological deterioration.
                                </p>
                            </div>

                            <div class="disability-card warning">
                                <strong>Oxygenation</strong>
                                <p>
                                    Reassess oxygenation and ventilation when
                                    reduced consciousness is present.
                                </p>
                            </div>

                            <div class="disability-card warning">
                                <strong>Temperature</strong>
                                <p>
                                    Consider hypothermia, hyperthermia and
                                    infection-related deterioration.
                                </p>
                            </div>

                            <div class="disability-card warning">
                                <strong>Drugs / toxins</strong>
                                <p>
                                    Consider medication effects, poisoning,
                                    intoxication or withdrawal.
                                </p>
                            </div>

                        </div>

                    </section>

                    <section class="disability-section">

                        <h3>3. GCS assessment</h3>

                        <div class="disability-card">

                            <ul>
                                <li>Document Eye, Verbal and Motor components.</li>
                                <li>Record the score clearly and reassess for change.</li>
                                <li>Use the GCS calculator in this toolkit when appropriate.</li>
                                <li>Document components separately when communication or assessment is limited.</li>
                            </ul>

                        </div>

                    </section>

                    <section class="disability-section">

                        <h3>4. Pupils</h3>

                        <div class="disability-card">

                            <ul>
                                <li>Compare pupil size and symmetry.</li>
                                <li>Assess direct and consensual response when possible.</li>
                                <li>Look for new anisocoria or abnormal reactivity.</li>
                                <li>Interpret findings in the clinical context.</li>
                            </ul>

                        </div>

                    </section>

                    <section class="disability-section">

                        <h3>5. Seizure activity</h3>

                        <div class="disability-card emergency">

                            <strong>Active or recurrent seizures require rapid assessment.</strong>

                            <ul>
                                <li>Protect the patient from injury.</li>
                                <li>Maintain airway and support oxygenation as required.</li>
                                <li>Check blood glucose.</li>
                                <li>Identify reversible causes.</li>
                                <li>Escalate according to the local seizure/status epilepticus pathway.</li>
                            </ul>

                        </div>

                    </section>

                    <section class="disability-section">

                        <h3>6. Red flags</h3>

                        <div class="disability-card emergency">

                            <ul>
                                <li>Rapid deterioration in consciousness.</li>
                                <li>New focal neurological deficit.</li>
                                <li>New unequal or poorly reactive pupils.</li>
                                <li>Repeated or prolonged seizures.</li>
                                <li>Sudden severe headache with neurological change.</li>
                                <li>Persistent unexplained altered mental status.</li>
                            </ul>

                        </div>

                    </section>

                    <section class="disability-section">

                        <h3>7. Reassessment & escalation</h3>

                        <div class="disability-card reassess">

                            <strong>Neurological status must be reassessed serially.</strong>

                            <p>
                                Repeat GCS, pupil assessment, glucose and
                                neurological examination after interventions
                                and whenever the patient's condition changes.
                            </p>

                        </div>

                    </section>

                    <div class="disability-note">

                        <strong>Clinical safety note</strong>

                        <p>
                            This is a point-of-care reference aid.
                            Follow current local neurological, seizure,
                            stroke, toxicology and resuscitation protocols.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);

    let cleanupAccessibleModal;

    function closeDisabilityModal() {

        if (cleanupAccessibleModal) {
            cleanupAccessibleModal();
        }

        modal.remove();
    }


    cleanupAccessibleModal =
        setupAccessibleModal(modal, {
            closeButton: modal.querySelector("#closeDisability"),
            onEscape: closeDisabilityModal
        });


    modal
        .querySelector("#closeDisability")
        .addEventListener(
            "click",
            closeDisabilityModal
        );

    document
        .querySelector(".disability-overlay")
        .addEventListener("click", (event) => {
            if (event.target.classList.contains("disability-overlay")) {
                closeDisabilityModal();
            }
        });
}
