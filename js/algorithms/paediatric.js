// ========================================
// Paediatric Emergency Quick Reference
// RCUK 2025
// ========================================

function openPaediatric() {

    const existing = document.getElementById("paediatricModal");

    if (existing) {
        existing.remove();
    }

    const modal = document.createElement("div");

    modal.id = "paediatricModal";

    modal.innerHTML = `
        <div class="paediatric-overlay">

            <div
                class="paediatric-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="paediatricTitle">

                <div class="paediatric-header">
                    <div>
                        <h2 id="paediatricTitle">👶 Paediatric Emergency</h2>
                        <p>Recognition & Initial Management Quick Reference</p>
                    </div>

                    <button
                        aria-label="Close dialog" id="closePaediatric"
                        class="paediatric-close">
                        ×
                    </button>
                </div>

                <div class="paediatric-body">

                    <div class="paediatric-alert">
                        <strong>Recognise the critically ill child early.</strong>
                        <p>
                            Use a structured assessment, call for help early,
                            treat life-threatening problems immediately and
                            reassess after every intervention.
                        </p>
                    </div>

                    <section class="paediatric-section">

                        <h3>1. First look</h3>

                        <div class="paediatric-grid">

                            <div class="paediatric-card">
                                <strong>Behaviour</strong>
                                <p>
                                    Assess alertness, interaction, response
                                    to surroundings and abnormal behaviour.
                                </p>
                            </div>

                            <div class="paediatric-card">
                                <strong>Breathing</strong>
                                <p>
                                    Look for increased work of breathing,
                                    abnormal sounds, cyanosis or apnoea.
                                </p>
                            </div>

                            <div class="paediatric-card">
                                <strong>Body colour / perfusion</strong>
                                <p>
                                    Look for pallor, mottling, cyanosis and
                                    signs of poor peripheral perfusion.
                                </p>
                            </div>

                        </div>

                    </section>


                    <section class="paediatric-section">

                        <h3>2. ABCDE assessment</h3>

                        <div class="paediatric-card critical">

                            <ol>
                                <li>
                                    <strong>Airway:</strong>
                                    assess patency and maintain the airway.
                                </li>

                                <li>
                                    <strong>Breathing:</strong>
                                    assess oxygenation, ventilation and work of breathing.
                                </li>

                                <li>
                                    <strong>Circulation:</strong>
                                    assess heart rate, perfusion, blood pressure
                                    and signs of shock.
                                </li>

                                <li>
                                    <strong>Disability:</strong>
                                    assess consciousness, pupils, seizures
                                    and blood glucose.
                                </li>

                                <li>
                                    <strong>Exposure:</strong>
                                    check temperature, rashes, injuries and
                                    relevant environmental findings.
                                </li>
                            </ol>

                        </div>

                    </section>


                    <section class="paediatric-section">

                        <h3>3. Breathing problems</h3>

                        <div class="paediatric-card emergency">

                            <ul>
                                <li>Assess respiratory rate and effort.</li>
                                <li>Assess chest movement and air entry.</li>
                                <li>Monitor oxygen saturation.</li>
                                <li>Give oxygen when clinically indicated.</li>
                                <li>Prepare assisted ventilation if breathing becomes inadequate.</li>
                                <li>Recognise impending respiratory failure early.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="paediatric-section">

    <h3>4. Circulation & shock</h3>

    <div class="paediatric-grid">

        <div class="paediatric-card">

            <strong>Assess</strong>

            <ul>
                <li>Heart rate.</li>
                <li>Peripheral perfusion and capillary refill.</li>
                <li>Blood pressure when appropriate.</li>
                <li>Mental status.</li>
                <li>Urine output and other signs of organ perfusion when available.</li>
            </ul>

        </div>


        <div class="paediatric-card warning">

            <strong>Shock</strong>

            <ul>
                <li>
                    Do not rely on a single sign; assess trends and the
                    overall clinical picture.
                </li>

                <li>
                    In hypovolaemic, obstructive or distributive shock,
                    give 10 mL/kg balanced isotonic crystalloid or 0.9% saline
                    and reassess after each bolus.
                </li>

                <li>
                    Consider smaller, more cautious fluid boluses in
                    cardiogenic shock or when there is significant risk
                    of fluid overload.
                </li>

                <li>
                    Consider vasoactive support and respiratory support
                    when repeated fluid boluses are required.
                </li>
            </ul>

        </div>

    </div>

</section>


                    <section class="paediatric-section">

                        <h3>5. Disability</h3>

                        <div class="paediatric-grid">

                            <div class="paediatric-card">
                                <strong>Consciousness</strong>
                                <p>
                                    Use AVPU, paediatric GCS or an appropriate
                                    neurological assessment.
                                </p>
                            </div>

                            <div class="paediatric-card critical">
                                <strong>Glucose</strong>
                                <p>
                                    Check blood glucose promptly in altered
                                    consciousness or neurological deterioration.
                                </p>
                            </div>

                            <div class="paediatric-card warning">
                                <strong>Seizures</strong>
                                <p>
                                    Recognise seizures as a neurological emergency
                                    and follow the local paediatric seizure pathway.
                                </p>
                            </div>

                        </div>

                    </section>


                    <section class="paediatric-section">

    <h3>6. Weight & drug safety</h3>

    <div class="paediatric-card">

        <ul>
            <li>
                Ask the parent or carer for an estimated weight whenever possible.
            </li>

            <li>
                Use a reliable length-based or validated weight-estimation method
                when an actual weight is unavailable.
            </li>

            <li>
                Verify the child's weight before calculating weight-based
                medication or fluid doses.
            </li>

            <li>
                Use a dedicated paediatric dosing reference or local
                paediatric emergency formulary when available.
            </li>

            <li>
                Check the calculated dose, concentration, route and maximum dose
                before administration.
            </li>
        </ul>

    </div>

</section>


                    <section class="paediatric-section">

                        <h3>7. Important reversible problems</h3>

                        <div class="paediatric-grid">

                            <div class="paediatric-card emergency">
                                <strong>Airway obstruction</strong>
                            </div>

                            <div class="paediatric-card emergency">
                                <strong>Respiratory failure</strong>
                            </div>

                            <div class="paediatric-card emergency">
                                <strong>Shock / major haemorrhage</strong>
                            </div>

                            <div class="paediatric-card emergency">
                                <strong>Hypoglycaemia</strong>
                            </div>

                            <div class="paediatric-card emergency">
                                <strong>Seizures</strong>
                            </div>

                            <div class="paediatric-card emergency">
                                <strong>Sepsis</strong>
                            </div>

                        </div>

                    </section>


                    <section class="paediatric-section">

    <h3>8. Cardiac arrest</h3>

    <div class="paediatric-card critical">

        <p>
            If the child is unresponsive and not breathing normally,
            activate the resuscitation response and begin paediatric
            basic life support immediately.
        </p>

        <ul>
            <li>
                Give 5 initial rescue breaths.
            </li>

            <li>
                Continue CPR according to the appropriate paediatric
                life-support algorithm.
            </li>

            <li>
                For healthcare professionals trained in paediatric
                life support, use the current paediatric CPR ratio
                and algorithm appropriate to the training level.
            </li>

            <li>
                Attach monitoring and defibrillation equipment as soon
                as available.
            </li>

            <li>
                Use high-concentration oxygen and effective ventilation
                when appropriate.
            </li>

            <li>
                Reassess rhythm and response according to the
                paediatric resuscitation algorithm.
            </li>
        </ul>

    </div>

</section>


                    <section class="paediatric-section">

                        <h3>9. Reassessment</h3>

                        <div class="paediatric-card reassess">

                            <strong>Reassess after every intervention.</strong>

                            <p>
                                Repeat ABCDE assessment whenever the child's
                                condition changes or there is uncertainty about
                                clinical stability.
                            </p>

                        </div>

                    </section>


                    <div class="paediatric-note">

                        <strong>Clinical safety note</strong>

                        <p>
                            This is a point-of-care reference aid.
                            Follow current local paediatric, resuscitation,
                            medication and safeguarding protocols.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);

    let cleanupAccessibleModal;

    function closePaediatricModal() {

        if (cleanupAccessibleModal) {
            cleanupAccessibleModal();
        }

        modal.remove();
    }


    cleanupAccessibleModal =
        setupAccessibleModal(modal, {
            closeButton: modal.querySelector("#closePaediatric"),
            onEscape: closePaediatricModal
        });


    modal
        .querySelector("#closePaediatric")
        .addEventListener(
            "click",
            closePaediatricModal
        );

    document
        .querySelector(".paediatric-overlay")
        .addEventListener("click", (event) => {

            if (event.target.classList.contains("paediatric-overlay")) {
                closePaediatricModal();
            }

        });

}
