// ========================================
// Adult Anaphylaxis Quick Reference
// RCUK 2025 aligned
// ========================================

function openAnaphylaxis() {

    const existing = document.getElementById("anaphylaxisModal");

    if (existing) {
        existing.remove();
    }

    const modal = document.createElement("div");

    modal.id = "anaphylaxisModal";

    modal.innerHTML = `
        <div class="anaphylaxis-overlay">

            <div
                class="anaphylaxis-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="anaphylaxisTitle">

                <div class="anaphylaxis-header">

                    <div>
                        <h2 id="anaphylaxisTitle">⚠️ Adult Anaphylaxis</h2>
                        <p>Recognition & Initial Management Quick Reference</p>
                    </div>

                    <button
                        aria-label="Close dialog" id="closeAnaphylaxis"
                        class="anaphylaxis-close">
                        ×
                    </button>

                </div>


                <div class="anaphylaxis-body">

                    <div class="anaphylaxis-alert">

                        <strong>Anaphylaxis is a medical emergency.</strong>

                        <p>
                            Suspect anaphylaxis when there are acute
                            airway, breathing or circulation problems,
                            with or without skin or mucosal changes.
                        </p>

                    </div>


                    <section class="anaphylaxis-section">

                        <h3>1. Recognise anaphylaxis</h3>

                        <div class="anaphylaxis-grid">

                            <div class="anaphylaxis-card critical">
                                <strong>Airway</strong>

                                <ul>
                                    <li>Swelling of tongue or throat</li>
                                    <li>Hoarse voice</li>
                                    <li>Stridor</li>
                                    <li>Difficulty swallowing</li>
                                </ul>
                            </div>


                            <div class="anaphylaxis-card critical">
                                <strong>Breathing</strong>

                                <ul>
                                    <li>Wheeze</li>
                                    <li>Increased work of breathing</li>
                                    <li>Hypoxaemia</li>
                                    <li>Cyanosis</li>
                                </ul>
                            </div>


                            <div class="anaphylaxis-card critical">
                                <strong>Circulation</strong>

                                <ul>
                                    <li>Hypotension</li>
                                    <li>Syncope or collapse</li>
                                    <li>Signs of shock</li>
                                    <li>Reduced consciousness</li>
                                </ul>
                            </div>


                            <div class="anaphylaxis-card warning">
                                <strong>Skin / GI features</strong>

                                <ul>
                                    <li>Urticaria or flushing</li>
                                    <li>Angioedema</li>
                                    <li>Abdominal pain</li>
                                    <li>Vomiting or diarrhoea</li>
                                </ul>
                            </div>

                        </div>

                    </section>


                    <section class="anaphylaxis-section">

                        <h3>2. Immediate actions</h3>

                        <div class="anaphylaxis-card critical">

                            <ol>
                                <li>Call for help and activate the emergency response.</li>
                                <li>Remove or stop the suspected trigger when safely possible.</li>
                                <li>Assess using ABCDE.</li>
                                <li>Give IM adrenaline immediately when anaphylaxis is suspected.</li>
                                <li>Apply monitoring including SpO₂, ECG and blood pressure.</li>
                                <li>Give oxygen when clinically indicated.</li>
                            </ol>

                        </div>

                    </section>


                    <section class="anaphylaxis-section">

                        <h3>3. Adrenaline — adult</h3>

                        <div class="anaphylaxis-card emergency">

                            <strong>IM adrenaline: 500 micrograms</strong>

                            <p>
                                Use adrenaline 1 mg/mL (1:1000),
                                injected into the anterolateral aspect
                                of the middle third of the thigh.
                            </p>

                            <p>
                                If there is no improvement, repeat the
                                IM dose after approximately 5 minutes.
                            </p>

                            <small>
                                IM adrenaline is the preferred initial route.
                            </small>

                        </div>

                    </section>


                    <section class="anaphylaxis-section">

    <h3>4. Position</h3>

    <div class="anaphylaxis-grid">

        <div class="anaphylaxis-card">
            <strong>Hypotension / shock</strong>
            <p>
                Lay the patient flat with the legs elevated when appropriate.
                Do not allow the patient to stand or walk suddenly.
            </p>
        </div>

        <div class="anaphylaxis-card">
            <strong>Breathing difficulty</strong>
            <p>
                Allow the patient to adopt a position that supports breathing,
                while avoiding sudden standing or walking.
            </p>
        </div>

    </div>

</section>


                    <section class="anaphylaxis-section">

                        <h3>5. Fluid resuscitation</h3>

                        <div class="anaphylaxis-card fluid">

                            <strong>Crystalloid</strong>

                            <p>
                                Give an IV crystalloid fluid bolus early
                                when there is significant cardiovascular
                                compromise and reassess the response.
                            </p>

                            <small>
                                Follow the current local anaphylaxis
                                and resuscitation protocol for fluid choice,
                                bolus volume and reassessment.
                            </small>

                        </div>

                    </section>


                    <section class="anaphylaxis-section">

    <h3>6. Persistent symptoms</h3>

    <div class="anaphylaxis-card warning">

        <p>
            If airway, breathing or circulation problems persist despite
            appropriate IM adrenaline, treat as refractory anaphylaxis
            and escalate urgently.
        </p>

        <ul>
            <li>Call experienced airway / critical care support.</li>
            <li>
                Repeat IM adrenaline after 5 minutes when indicated
                if airway, breathing or circulation problems persist.
            </li>
            <li>Prepare advanced resuscitation support.</li>
            <li>
                After two appropriate IM doses without adequate response,
                follow the specialist refractory anaphylaxis pathway.
            </li>
        </ul>

    </div>

</section>


                    <section class="anaphylaxis-section">

                        <h3>7. Specialist adrenaline</h3>

                        <div class="anaphylaxis-card emergency">

                            <strong>IV / IO adrenaline is specialist therapy.</strong>

                            <p>
                                IV adrenaline carries a significantly greater
                                risk of dosing and dilution errors. It should
                                only be used by experienced clinicians in the
                                appropriate setting and according to the
                                specialist protocol.
                            </p>

                        </div>

                    </section>


                    <section class="anaphylaxis-section">

    <h3>8. After initial treatment</h3>

    <div class="anaphylaxis-card reassess">

        <ul>
            <li>Continue clinical monitoring and reassessment.</li>
            <li>
                Consider observation according to clinical severity
                and local protocol.
            </li>
            <li>Document the suspected trigger and treatment given.</li>
            <li>
                Consider appropriate mast-cell tryptase sampling
                according to the current local / specialist protocol.
            </li>
            <li>
                Arrange appropriate allergy / specialist follow-up
                when indicated.
            </li>
        </ul>

    </div>

</section>


                    <div class="anaphylaxis-note">

                        <strong>Clinical safety note</strong>

                        <p>
                            This is a point-of-care reference aid.
                            Follow the current local anaphylaxis,
                            resuscitation and refractory-anaphylaxis
                            protocols. Verify drug concentration and
                            route before administration.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);


    let cleanupAccessibleModal;

    function closeAnaphylaxisModal() {

        if (cleanupAccessibleModal) {
            cleanupAccessibleModal();
        }

        modal.remove();
    }


    cleanupAccessibleModal =
        setupAccessibleModal(modal, {
            closeButton: modal.querySelector(
                "#closeAnaphylaxis"
            ),
            onEscape: closeAnaphylaxisModal
        });


    modal
        .querySelector("#closeAnaphylaxis")
        .addEventListener(
            "click",
            closeAnaphylaxisModal
        );


    document
        .querySelector(".anaphylaxis-overlay")
        .addEventListener("click", (event) => {

            if (event.target.classList.contains("anaphylaxis-overlay")) {
                closeAnaphylaxisModal();
            }

        });

}
