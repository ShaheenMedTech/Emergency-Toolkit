// ========================================
// Adult Major Trauma Quick Reference
// ========================================

function openTrauma() {

    const existing = document.getElementById("traumaModal");

    if (existing) {
        existing.remove();
    }

    const modal = document.createElement("div");

    modal.id = "traumaModal";

    modal.innerHTML = `
        <div class="trauma-overlay">

            <div
                class="trauma-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="traumaTitle">
                <div class="trauma-header">

                    <div>
                        <h2 id="traumaTitle">🩸 Adult Major Trauma</h2>
                        <p>ABCDE Quick Reference</p>
                    </div>

                    <button
                        aria-label="Close dialog" id="closeTrauma"
                        class="trauma-close"
                    >
                        ×
                    </button>

                </div>


                <div class="trauma-body">

                    <div class="trauma-alert">
                        <strong>Major trauma is time-critical.</strong>

                        <p>
                            Identify and treat immediately life-threatening
                            problems while continuously reassessing the patient.
                        </p>
                    </div>


                    <section class="trauma-section">

    <h3>0. Catastrophic haemorrhage</h3>

    <div class="trauma-card critical">

        <strong>Control life-threatening bleeding immediately.</strong>

        <ul>
            <li>Apply direct pressure.</li>
            <li>Use a haemostatic dressing when appropriate.</li>
            <li>Apply a tourniquet for life-threatening limb haemorrhage when indicated.</li>
            <li>Activate the local major haemorrhage protocol when indicated.</li>
            <li>Give IV tranexamic acid as early as possible when major trauma is associated with active or suspected active bleeding, according to local protocol.</li>
            <li>Use blood-component resuscitation and minimise unnecessary crystalloid in active major haemorrhage.</li>
        </ul>

    </div>

</section>


                    <section class="trauma-section">

                        <h3>A — Airway + cervical spine</h3>

                        <ul>
                            <li>Assess airway patency and ability to protect the airway.</li>
                            <li>Look for obstruction, facial trauma, blood or vomitus.</li>
                            <li>Use appropriate airway manoeuvres and suction.</li>
                            <li>Maintain spinal precautions when clinically indicated.</li>
                            <li>Escalate early if the airway cannot be maintained.</li>
                        </ul>

                    </section>


                    <section class="trauma-section">

    <h3>B — Breathing</h3>

    <div class="trauma-grid">

        <div class="trauma-card">

            <strong>Assess</strong>

            <ul>
                <li>Respiratory effort.</li>
                <li>Chest movement and symmetry.</li>
                <li>SpO₂.</li>
                <li>Auscultation and percussion.</li>
                <li>Look for penetrating or blunt chest injury.</li>
            </ul>

        </div>

        <div class="trauma-card emergency">

            <strong>Immediate threats</strong>

            <ul>
                <li>Tension pneumothorax.</li>
                <li>Open pneumothorax.</li>
                <li>Massive haemothorax.</li>
                <li>Airway-threatening chest injury.</li>
            </ul>

            <p>
                Do not delay life-saving intervention for imaging when
                tension pneumothorax is causing haemodynamic instability
                or severe respiratory compromise.
            </p>

        </div>

    </div>

</section>


                    <section class="trauma-section">

    <h3>C — Circulation / haemorrhage</h3>

    <ul>
        <li>Assess pulse, blood pressure and peripheral perfusion.</li>
        <li>Search systematically for external and internal bleeding.</li>
        <li>Establish appropriate IV/IO access.</li>
        <li>Send blood samples according to the local major trauma pathway.</li>
        <li>Use blood products and haemorrhage-control pathways when indicated.</li>
        <li>Consider pelvic haemorrhage in appropriate blunt high-energy trauma.</li>
        <li>Apply a purpose-made pelvic binder when pelvic fracture with haemorrhage is suspected.</li>
        <li>Reassess response continuously.</li>
    </ul>

</section>


                    <section class="trauma-section">

                        <h3>D — Disability</h3>

                        <ul>
                            <li>GCS / neurological assessment.</li>
                            <li>Pupils.</li>
                            <li>Check blood glucose.</li>
                            <li>Assess for focal neurological deficit.</li>
                            <li>Consider traumatic brain injury in the appropriate context.</li>
                        </ul>

                    </section>


                    <section class="trauma-section">

                        <h3>E — Exposure / environment</h3>

                        <ul>
                            <li>Expose the patient sufficiently to identify injuries.</li>
                            <li>Perform a systematic head-to-toe assessment.</li>
                            <li>Prevent hypothermia.</li>
                            <li>Maintain dignity and cover the patient when possible.</li>
                        </ul>

                    </section>


                    <section class="trauma-section">

                        <h3>Reassessment</h3>

                        <div class="trauma-card reassess">

                            <strong>ABCDE is continuous.</strong>

                            <p>
                                Reassess after every intervention and whenever
                                the patient's condition changes.
                            </p>

                        </div>

                    </section>


                    <section class="trauma-section">

    <h3>Imaging / further evaluation</h3>

    <ul>
        <li>
            Use imaging according to mechanism, examination and physiological status.
        </li>

        <li>
            Do not allow imaging to delay immediate treatment of
            life-threatening problems.
        </li>

        <li>
            Consider whole-body CT in appropriate adult blunt major trauma
            with suspected multiple injuries.
        </li>

        <li>
            Use local major trauma imaging pathways.
        </li>

        <li>
            Interpret imaging findings together with the patient's clinical
            and physiological status.
        </li>
    </ul>

</section>


                    <div class="trauma-note">

                        <strong>Clinical safety note</strong>

                        <p>
                            This is a point-of-care reference aid.
                            Follow local major trauma, haemorrhage,
                            airway and spinal injury protocols.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);


    let cleanupAccessibleModal;

    function closeTraumaModal() {

        if (cleanupAccessibleModal) {
            cleanupAccessibleModal();
        }

        modal.remove();
    }


    cleanupAccessibleModal =
        setupAccessibleModal(modal, {
            closeButton: modal.querySelector("#closeTrauma"),
            onEscape: closeTraumaModal
        });


    modal
        .querySelector("#closeTrauma")
        .addEventListener(
            "click",
            closeTraumaModal
        );


    document
        .querySelector(".trauma-overlay")
        .addEventListener("click", (event) => {

            if (
                event.target.classList.contains("trauma-overlay")
            ) {
                closeTraumaModal();
            }

        });

}
