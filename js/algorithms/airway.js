// ========================================
// Adult Emergency Airway Quick Reference
// ========================================

function openAirway() {

    const existing = document.getElementById("airwayModal");

    if (existing) {
        existing.remove();
    }

    const modal = document.createElement("div");

    modal.id = "airwayModal";

    modal.innerHTML = `
        <div class="airway-overlay">

            <div
                class="airway-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="airwayTitle">

                <div class="airway-header">

                    <div>
                        <h2 id="airwayTitle">🫁 Adult Emergency Airway</h2>
                        <p>Assessment & Management Quick Reference</p>
                    </div>

                    <button
                        aria-label="Close dialog" id="closeAirway"
                        class="airway-close"
                    >
                        ×
                    </button>

                </div>


                <div class="airway-body">

                    <div class="airway-alert">
                        <strong>Airway first — but do not delay oxygenation.</strong>
                        <p>
                            Continuously reassess airway patency, oxygenation,
                            ventilation and clinical deterioration.
                        </p>
                    </div>


                    <section class="airway-section">

                        <h3>1. Recognise airway compromise</h3>

                        <ul>
                            <li>Stridor, gurgling, snoring or silence.</li>
                            <li>Unable to maintain or protect the airway.</li>
                            <li>Facial/oral trauma, blood, vomitus or secretions.</li>
                            <li>Reduced consciousness or severe agitation.</li>
                            <li>Progressive hypoxaemia or ventilatory failure.</li>
                        </ul>

                    </section>


                    <section class="airway-section">

                        <h3>2. Immediate actions</h3>

                        <div class="airway-card critical">

                            <ol>
                                <li>Call for help early.</li>
                                <li>Apply high-concentration oxygen when clinically indicated.</li>
                                <li>Suction secretions, blood or vomitus.</li>
                                <li>Perform appropriate airway-opening manoeuvres.</li>
                                <li>Prepare bag-mask ventilation if ventilation is inadequate.</li>
                            </ol>

                        </div>

                    </section>


                    <section class="airway-section">

                        <h3>3. Basic airway manoeuvres & adjuncts</h3>

                        <div class="airway-grid">

                            <div class="airway-card">

                                <strong>Manoeuvres</strong>

                                <ul>
                                    <li>Head tilt–chin lift when appropriate.</li>
                                    <li>Jaw thrust when cervical spine injury is a concern.</li>
                                    <li>Maintain manual airway opening as required.</li>
                                </ul>

                            </div>


                            <div class="airway-card">

                                <strong>Adjuncts</strong>

                                <ul>
                                    <li>Oropharyngeal airway.</li>
                                    <li>Nasopharyngeal airway when appropriate.</li>
                                    <li>Use according to indication and contraindications.</li>
                                </ul>

                            </div>

                        </div>

                    </section>


                    <section class="airway-section">

    <h3>4. Bag-mask ventilation</h3>

    <ul>
        <li>
            Preoxygenate whenever advanced airway management is anticipated.
        </li>

        <li>
            Use an appropriate mask size and effective seal.
        </li>

        <li>
            Optimise head and airway position.
        </li>

        <li>
            Use two-person technique when available and needed.
        </li>

        <li>
            Ventilate with visible chest movement while avoiding excessive ventilation.
        </li>

        <li>
            Reassess oxygenation and ventilation continuously.
        </li>
    </ul>

</section>

                    <section class="airway-section">

                        <h3>5. Supraglottic airway</h3>

                        <div class="airway-card">

                            <ul>
                                <li>Consider when BVM is inadequate or as an advanced airway strategy.</li>
                                <li>Confirm effective ventilation after insertion.</li>
                                <li>Be alert for leak and inadequate chest movement.</li>
                                <li>If ventilation is ineffective, revert to effective BVM or proceed to another appropriate airway strategy.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="airway-section">

    <h3>6. Tracheal intubation</h3>

    <div class="airway-card emergency">

        <strong>Intubate only when appropriate expertise, monitoring
        and rescue equipment are immediately available.</strong>

        <ul>
            <li>
                Preoxygenate and optimise the patient's position and physiology.
            </li>

            <li>
                Prepare suction, alternative airway devices and a clear rescue plan.
            </li>

            <li>
                Use direct or video laryngoscopy according to local protocol
                and operator experience.
            </li>

            <li>
                Minimise interruption to oxygenation and ventilation.
            </li>

            <li>
                Use continuous waveform capnography.
            </li>

            <li>
                Confirm a sustained ETCO₂ waveform consistent with tracheal
                tube placement.
            </li>

            <li>
                Limit repeated attempts and escalate early when intubation
                is proving difficult.
            </li>
        </ul>

    </div>

</section>


                    <section class="airway-section">

    <h3>7. Difficult / failed airway</h3>

    <div class="airway-card warning">

        <strong>Prioritise oxygenation rather than repeated attempts.</strong>

        <ol>
            <li>
                Recognise failed or difficult intubation early.
            </li>

            <li>
                Call for experienced additional help.
            </li>

            <li>
                Return to the most effective oxygenation strategy,
                including two-person BVM when required.
            </li>

            <li>
                Use an appropriate supraglottic airway / rescue device
                when indicated.
            </li>

            <li>
                Follow the local difficult-airway pathway and current
                DAS algorithm.
            </li>

            <li>
                If oxygenation cannot be maintained despite rescue measures,
                progress to emergency front-of-neck airway according to
                the relevant local protocol.
            </li>
        </ol>

    </div>

</section>


                    <section class="airway-section">

                        <h3>8. Confirmation & monitoring</h3>

                        <ul>
                            <li>Waveform capnography for an advanced airway whenever available.</li>
                            <li>Monitor SpO₂ continuously.</li>
                            <li>Assess chest movement and ventilation.</li>
                            <li>Reassess after every airway intervention or patient deterioration.</li>
                        </ul>

                    </section>


                    <div class="airway-note">

                        <strong>Clinical safety note</strong>

                        <p>
                            This is a point-of-care reference aid.
                            Follow your current local airway, difficult-airway,
                            anaesthesia and resuscitation protocols.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);


    let cleanupAccessibleModal;

    function closeAirwayModal() {

        if (cleanupAccessibleModal) {
            cleanupAccessibleModal();
        }

        modal.remove();
    }


    cleanupAccessibleModal =
        setupAccessibleModal(modal, {
            closeButton: modal.querySelector("#closeAirway"),
            onEscape: closeAirwayModal
        });


    modal
        .querySelector("#closeAirway")
        .addEventListener(
            "click",
            closeAirwayModal
        );


    document
        .querySelector(".airway-overlay")
        .addEventListener("click", (event) => {

            if (
                event.target.classList.contains("airway-overlay")
            ) {
                closeAirwayModal();
            }

        });

}
