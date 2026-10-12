// ========================================
// Adult Seizures / Status Epilepticus
// NICE 2025 aligned
// ========================================

function openSeizures() {

    const existing = document.getElementById("seizuresModal");

    if (existing) {
        existing.remove();
    }

    const modal = document.createElement("div");

    modal.id = "seizuresModal";

    modal.innerHTML = `
        <div class="seizures-overlay">

            <div
                class="seizures-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="seizuresTitle">

                <div class="seizures-header">

                    <div>
                        <h2 id="seizuresTitle">🧠 Seizures & Status Epilepticus</h2>
                        <p>Recognition & Initial Management Quick Reference</p>
                    </div>

                    <button
                        aria-label="Close dialog" id="closeSeizures"
                        class="seizures-close">
                        ×
                    </button>

                </div>


                <div class="seizures-body">

                    <div class="seizures-alert">

                        <strong>Prolonged convulsive seizure is an emergency.</strong>

                        <p>
                            A convulsive seizure lasting 5 minutes or more
                            requires immediate emergency treatment. Protect
                            the patient, support ABC and treat promptly.
                        </p>

                    </div>


                    <section class="seizures-section">

                        <h3>1. Immediate assessment</h3>

                        <ol>
                            <li>Call for help and assess immediate safety.</li>
                            <li>Protect the patient from injury.</li>
                            <li>Assess airway and breathing.</li>
                            <li>Provide oxygen when clinically indicated.</li>
                            <li>Check circulation and vital signs.</li>
                            <li>Check capillary blood glucose.</li>
                            <li>Record seizure onset time.</li>
                            <li>Assess level of consciousness after the event.</li>
                        </ol>

                    </section>


                    <section class="seizures-section">

                        <h3>2. Is the seizure prolonged?</h3>

                        <div class="seizures-card critical">

                            <strong>Convulsive seizure ≥ 5 minutes</strong>

                            <p>
                                Treat as convulsive status epilepticus and
                                initiate the emergency treatment pathway.
                            </p>

                        </div>

                    </section>


                    <section class="seizures-section">

                        <h3>3. First-line treatment</h3>

                        <div class="seizures-card emergency">

                            <strong>Benzodiazepine</strong>

                            <p>
                                Give an appropriate benzodiazepine promptly
                                according to the patient's individualised
                                emergency plan or the current local protocol.
                            </p>

                            <ul>
                                <li>Use the appropriate route for the clinical setting.</li>
                                <li>Ensure airway and respiratory support are immediately available.</li>
                                <li>Monitor for respiratory depression.</li>
                                <li>Do not delay emergency treatment while waiting for non-essential investigations.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="seizures-section">

                        <h3>4. If the first dose fails</h3>

                        <div class="seizures-card warning">

                            <ul>
                                <li>Seek urgent expert / emergency support.</li>
                                <li>Reassess airway, breathing, circulation and glucose.</li>
                                <li>Give a second benzodiazepine dose when indicated by the treatment pathway.</li>
                                <li>Prepare for second-line antiseizure treatment.</li>
                            </ul>

                            <p>
                                If the seizure has not stopped after two
                                benzodiazepine doses, proceed to second-line
                                treatment under the appropriate clinical pathway.
                            </p>

                        </div>

                    </section>


                    <section class="seizures-section">

                        <h3>5. Second-line treatment</h3>

                        <div class="seizures-grid">

                            <div class="seizures-card">

                                <strong>Levetiracetam</strong>

                                <p>
                                    IV second-line treatment option when
                                    appropriate.
                                </p>

                            </div>

                            <div class="seizures-card">

                                <strong>Phenytoin</strong>

                                <p>
                                    IV second-line option under appropriate
                                    monitoring and local protocol.
                                </p>

                            </div>

                            <div class="seizures-card">

                                <strong>Sodium valproate</strong>

                                <p>
                                    IV second-line option when appropriate,
                                    with current safety precautions and
                                    contraindication review.
                                </p>

                            </div>

                        </div>

                    </section>


                    <section class="seizures-section">

                        <h3>6. Persistent / refractory status</h3>

                        <div class="seizures-card critical">

                            <strong>Escalate to expert management.</strong>

                            <ul>
                                <li>Call anaesthesia / critical-care / neurology support.</li>
                                <li>Prepare advanced airway and ventilation support.</li>
                                <li>Consider third-line treatment under expert guidance.</li>
                                <li>Consider general anaesthesia in refractory cases according to specialist protocol.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="seizures-section">

                        <h3>7. Look for reversible causes</h3>

                        <div class="seizures-grid">

                            <div class="seizures-card warning">
                                <strong>Hypoglycaemia</strong>
                                <p>Check and treat promptly when present.</p>
                            </div>

                            <div class="seizures-card warning">
                                <strong>Electrolyte / metabolic disturbance</strong>
                                <p>Assess clinically relevant biochemical abnormalities.</p>
                            </div>

                            <div class="seizures-card warning">
                                <strong>Alcohol / drug-related causes</strong>
                                <p>Consider withdrawal, intoxication or medication-related causes.</p>
                            </div>

                            <div class="seizures-card warning">
                                <strong>Structural / neurological cause</strong>
                                <p>Consider stroke, intracranial pathology, trauma or infection.</p>
                            </div>

                            <div class="seizures-card warning">
                                <strong>Eclampsia</strong>
                                <p>Consider in the appropriate obstetric context.</p>
                            </div>

                            <div class="seizures-card warning">
                                <strong>Antiseizure medication non-adherence</strong>
                                <p>Review adherence and recent medication changes.</p>
                            </div>

                        </div>

                    </section>


                    <section class="seizures-section">

                        <h3>8. When the seizure stops</h3>

                        <div class="seizures-card reassess">

                            <ul>
                                <li>Reassess airway, breathing and circulation.</li>
                                <li>Recheck glucose when clinically appropriate.</li>
                                <li>Assess consciousness and neurological status.</li>
                                <li>Look for ongoing subtle or non-convulsive seizure activity.</li>
                                <li>Identify the underlying cause.</li>
                                <li>Arrange an appropriate ongoing management plan.</li>
                            </ul>

                        </div>

                    </section>


                    <div class="seizures-note">

                        <strong>Clinical safety note</strong>

                        <p>
                            This is a point-of-care reference aid.
                            Follow the current local seizure/status epilepticus
                            pathway. Verify drug selection, dose, route,
                            contraindications and monitoring requirements before
                            administration.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);


    let cleanupAccessibleModal;

    function closeSeizuresModal() {

        if (cleanupAccessibleModal) {
            cleanupAccessibleModal();
        }

        modal.remove();
    }


    cleanupAccessibleModal =
        setupAccessibleModal(modal, {
            closeButton: modal.querySelector("#closeSeizures"),
            onEscape: closeSeizuresModal
        });


    modal
        .querySelector("#closeSeizures")
        .addEventListener(
            "click",
            closeSeizuresModal
        );


    document
        .querySelector(".seizures-overlay")
        .addEventListener("click", (event) => {

            if (event.target.classList.contains("seizures-overlay")) {
                closeSeizuresModal();
            }

        });

}
