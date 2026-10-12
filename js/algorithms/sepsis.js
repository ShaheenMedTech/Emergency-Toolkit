// ========================================
// Adult Sepsis Quick Reference
// Surviving Sepsis Campaign
// ========================================

function openSepsis() {

    const existing = document.getElementById("sepsisModal");

    if (existing) {
        existing.remove();
    }

    const modal = document.createElement("div");

    modal.id = "sepsisModal";

    modal.innerHTML = `
        <div class="sepsis-overlay">

            <div
                class="sepsis-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="sepsisTitle">

                <div class="sepsis-header">

                    <div>
                        <h2 id="sepsisTitle">🦠 Adult Sepsis</h2>
                        <p>Recognition & Management Quick Reference</p>
                    </div>

                    <button
                        aria-label="Close dialog" id="closeSepsis"
                        class="sepsis-close"
                    >
                        ×
                    </button>

                </div>


                <div class="sepsis-body">

                    <div class="sepsis-alert">
                        <strong>Sepsis is a medical emergency.</strong>
                        <p>
                            Recognise infection with acute organ
                            dysfunction and escalate assessment
                            and treatment promptly.
                        </p>
                    </div>


                    <section class="sepsis-section">

                        <h3>1. Recognise & assess</h3>

                        <ul>
                            <li>Suspect or identify an infectious source.</li>
                            <li>Assess airway, breathing and circulation.</li>
                            <li>Assess mental status and peripheral perfusion.</li>
                            <li>Review blood pressure, heart rate, respiratory rate and SpO₂.</li>
                            <li>
    Use an appropriate local sepsis screening pathway;
    NEWS2, MEWS or SIRS may be used according to local policy.
</li>

<li>
    Do not use qSOFA as the sole screening tool for sepsis.
</li>
                        </ul>

                    </section>


                    <section class="sepsis-section">

                        <h3>2. Initial investigations</h3>

                        <div class="sepsis-card">

                            <ul>
                                <li>Measure lactate.</li>
<li>
    Obtain blood cultures as soon as possible and ideally before
    antimicrobial therapy.
</li>

                                <li>FBC / CBC.</li>
                                <li>U&E / renal function.</li>
                                <li>LFTs when clinically indicated.</li>
                                <li>Coagulation profile when indicated.</li>
                                <li>Obtain source-directed microbiology.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="sepsis-section">

    <h3>3. Antimicrobial therapy</h3>

    <div class="sepsis-card urgent">

        <strong>Time to antibiotics depends on clinical probability and shock.</strong>

        <ul>
            <li>
                For septic shock or probable/definite sepsis:
                start appropriate antimicrobials immediately,
                ideally within 1 hour of recognition.
            </li>

            <li>
                For possible sepsis without shock:
                perform a rapid assessment of infectious versus
                non-infectious causes.
            </li>

            <li>
                If concern for infection persists in possible sepsis
                without shock, start antimicrobials within 3 hours
                of sepsis being first suspected.
            </li>

            <li>
                Obtain cultures before antimicrobials when this does not
                cause a clinically meaningful delay.
            </li>

            <li>
                Tailor therapy to the suspected source, local resistance
                patterns and patient-specific factors.
            </li>
        </ul>

    </div>

</section>


                    <section class="sepsis-section">

    <h3>4. Initial fluid resuscitation</h3>

    <div class="sepsis-card fluid">

        <strong>Crystalloid is first-line.</strong>

        <ul>
            <li>
                In sepsis-induced hypoperfusion or septic shock,
                consider at least 30 mL/kg IV crystalloid during
                the initial 3 hours.
            </li>

            <li>
                Use frequent reassessment rather than automatic
                fluid administration.
            </li>

            <li>
                Balanced crystalloids are generally preferred
                over 0.9% saline when appropriate.
            </li>

            <li>
                Consider patient-specific factors and the risk of
                fluid overload.
            </li>

            <li>
                Use dynamic measures of fluid responsiveness when
                appropriate and available.
            </li>
        </ul>

    </div>

</section>


                    <section class="sepsis-section">

                        <h3>5. Reassess perfusion</h3>

                        <ul>
                            <li>Blood pressure and MAP.</li>
                            <li>Capillary refill / peripheral perfusion.</li>
                            <li>Urine output.</li>
                            <li>Mental status.</li>
                            <li>Serial lactate when clinically useful.</li>
                            <li>Use dynamic measures of fluid responsiveness when appropriate.</li>
                        </ul>

                    </section>


                    <section class="sepsis-section">

                        <h3>6. Persistent hypotension / septic shock</h3>

                        <div class="sepsis-card vasopressor">

                            <strong>Vasopressor strategy</strong>
<p>
    In septic shock, vasopressors may be started peripherally
    when needed rather than delaying treatment until central
    venous access is secured, according to local protocol.
</p>

                            <ol>
                                <li>
                                    Norepinephrine — first-line vasopressor.
                                </li>
                                <li>
                                    Add vasopressin when norepinephrine
                                    requirements are increasing or
                                    additional support is needed.
                                </li>
                                <li>
                                    Consider epinephrine when additional
                                    vasopressor support is required.
                                </li>
                            </ol>

                            <p>
                                Initial MAP target is approximately
                                <strong>65 mmHg</strong> for most adults,
                                adjusted to the clinical context.
                            </p>

                        </div>

                    </section>


                    <section class="sepsis-section">

    <h3>7. Source control</h3>

    <ul>
        <li>
            Rapidly identify an anatomical source requiring intervention.
        </li>

        <li>
            Achieve source control as early as medically and logistically
            practical.
        </li>

        <li>
            When a source requiring intervention is identified,
            aim for source control ideally within 6 hours.
        </li>

        <li>
            Coordinate with surgery, interventional radiology,
            endoscopy or other procedural teams when required.
        </li>
    </ul>

</section>


                    <section class="sepsis-section">

                        <h3>8. Ongoing management</h3>

                        <ul>
                            <li>Review antimicrobial therapy and narrow when appropriate.</li>
                            <li>Reassess fluid balance continuously.</li>
                            <li>Monitor organ function.</li>
                            <li>Escalate to critical care when indicated.</li>
                        </ul>

                    </section>


                    <div class="sepsis-note">

                        <strong>Clinical safety note</strong>

                        <p>
                            This is a point-of-care reference tool,
                            not a substitute for bedside assessment,
                            local antimicrobial guidance, or institutional
                            sepsis protocols.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);


    let cleanupAccessibleModal;

    function closeSepsisModal() {

        if (cleanupAccessibleModal) {
            cleanupAccessibleModal();
        }

        modal.remove();
    }


    cleanupAccessibleModal =
        setupAccessibleModal(modal, {
            closeButton: modal.querySelector("#closeSepsis"),
            onEscape: closeSepsisModal
        });


    modal
        .querySelector("#closeSepsis")
        .addEventListener(
            "click",
            closeSepsisModal
        );


    document
        .querySelector(".sepsis-overlay")
        .addEventListener("click", (event) => {

            if (
                event.target.classList.contains("sepsis-overlay")
            ) {
                closeSepsisModal();
            }

        });

}
