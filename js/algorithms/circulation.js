// ========================================
// Adult Emergency Circulation Quick Reference
// Assessment & Management of Shock
// ========================================

function openCirculation() {

    const existing = document.getElementById("circulationModal");

    if (existing) {
        existing.remove();
    }

    const modal = document.createElement("div");

    modal.id = "circulationModal";

    modal.innerHTML = `
        <div class="circulation-overlay">
            <div
                class="circulation-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="circulationTitle">


                <div class="circulation-header">
                    <div>
                        <h2 id="circulationTitle">❤️ Adult Emergency Circulation</h2>
                        <p>Assessment & Shock Management Quick Reference</p>
                    </div>

                    <button
                        aria-label="Close dialog" id="closeCirculation"
                        class="circulation-close">
                        ×
                    </button>
                </div>


                <div class="circulation-body">

                    <div class="circulation-alert">
                        <strong>Shock is a time-critical emergency.</strong>
                        <p>
                            Identify circulatory compromise early,
                            treat immediately reversible causes,
                            control bleeding and reassess continuously.
                        </p>
                    </div>


                    <section class="circulation-section">

                        <h3>1. Recognise circulatory compromise</h3>

                        <ul>
                            <li>Assess heart rate, blood pressure and pulse quality.</li>
                            <li>Assess capillary refill and peripheral perfusion.</li>
                            <li>Assess skin temperature and colour.</li>
                            <li>Assess mental status.</li>
                            <li>Look for reduced urine output when monitoring is available.</li>
                            <li>Consider lactate and blood gas assessment when clinically appropriate.</li>
                        </ul>

                    </section>


                    <section class="circulation-section">

                        <h3>2. Immediate actions</h3>

                        <div class="circulation-card critical">

                            <ol>
                                <li>Call for senior/resuscitation support when severe shock is suspected.</li>
                                <li>Identify and treat the underlying cause immediately.</li>
                                <li>Control external haemorrhage without delay.</li>
                                <li>Apply appropriate monitoring.</li>
                                <li>Establish reliable vascular access.</li>
                                <li>Reassess response after every intervention.</li>
                            </ol>

                        </div>

                    </section>


                    <section class="circulation-section">

                        <h3>3. Major haemorrhage</h3>

                        <div class="circulation-card emergency">

                            <strong>Control bleeding first.</strong>

                            <ul>
                                <li>Apply direct pressure and appropriate haemorrhage-control measures.</li>
                                <li>Use a tourniquet for life-threatening limb haemorrhage when indicated.</li>
                                <li>Activate the local major haemorrhage protocol when appropriate.</li>
                                <li>Move rapidly toward definitive haemorrhage control.</li>
                                <li>Use blood components according to the local major haemorrhage protocol.</li>
                            </ul>

                            <p>
                                In active traumatic bleeding, avoid delaying
                                definitive haemorrhage control with excessive
                                volume resuscitation.
                            </p>

                        </div>

                    </section>


                    <section class="circulation-section">

                        <h3>4. Vascular access</h3>

                        <div class="circulation-grid">

                            <div class="circulation-card">
                                <strong>Peripheral IV</strong>
                                <p>
                                    Establish appropriate large-bore peripheral
                                    access when rapid IV therapy is required.
                                </p>
                            </div>

                            <div class="circulation-card">
                                <strong>Intraosseous access</strong>
                                <p>
                                    Consider IO access when urgent vascular
                                    access is required and IV access is
                                    unsuccessful or not achievable promptly.
                                </p>
                            </div>

                        </div>

                    </section>


                    <section class="circulation-section">

                        <h3>5. Resuscitation</h3>

                        <div class="circulation-grid">

                            <div class="circulation-card fluid">
                                <strong>Volume therapy</strong>
                                <ul>
                                    <li>Choose fluid strategy according to the underlying cause.</li>
                                    <li>Use small, reassessed boluses when fluid resuscitation is appropriate.</li>
                                    <li>Avoid unmonitored or unnecessary fluid loading.</li>
                                </ul>
                            </div>

                            <div class="circulation-card blood">
                                <strong>Blood components</strong>
                                <ul>
                                    <li>Prioritise blood products in major haemorrhage according to local protocol.</li>
                                    <li>Activate the major haemorrhage pathway early when indicated.</li>
                                    <li>Monitor clinical response and laboratory parameters.</li>
                                </ul>
                            </div>

                        </div>

                    </section>


                    <section class="circulation-section">

                        <h3>6. Consider the cause of shock</h3>

                        <div class="circulation-grid">

                            <div class="circulation-card emergency">
                                <strong>Hypovolaemic</strong>
                                <p>
                                    Haemorrhage, fluid loss or other causes of
                                    reduced circulating volume.
                                </p>
                            </div>

                            <div class="circulation-card warning">
                                <strong>Distributive</strong>
                                <p>
                                    Consider sepsis, anaphylaxis and other
                                    causes of pathological vasodilation.
                                </p>
                            </div>

                            <div class="circulation-card warning">
                                <strong>Cardiogenic</strong>
                                <p>
                                    Consider acute myocardial dysfunction,
                                    arrhythmia or mechanical cardiac causes.
                                </p>
                            </div>

                            <div class="circulation-card warning">
                                <strong>Obstructive</strong>
                                <p>
                                    Consider tension pneumothorax, cardiac
                                    tamponade or major pulmonary obstruction.
                                </p>
                            </div>

                        </div>

                    </section>


                    <section class="circulation-section">

                        <h3>7. Persistent shock</h3>

                        <div class="circulation-card reassess">

                            <strong>Escalate and reassess.</strong>

                            <ul>
                                <li>Confirm that the underlying cause is being treated.</li>
                                <li>Reassess perfusion and haemodynamic response.</li>
                                <li>Use bedside ultrasound when appropriate and available.</li>
                                <li>Consider vasopressor or inotropic support according to the cause and local protocol.</li>
                                <li>Escalate to critical care or the appropriate specialist team when indicated.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="circulation-section">

                        <h3>8. Ongoing reassessment</h3>

                        <div class="circulation-card reassess">

                            <strong>Circulation assessment is continuous.</strong>

                            <p>
                                Reassess heart rate, blood pressure, perfusion,
                                mental status, urine output and response to
                                treatment after every major intervention.
                            </p>

                        </div>

                    </section>


                    <div class="circulation-note">

                        <strong>Clinical safety note</strong>

                        <p>
                            This is a point-of-care reference aid.
                            Follow current local haemorrhage, trauma,
                            resuscitation, transfusion and shock protocols.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);


    let cleanupAccessibleModal;

    function closeCirculationModal() {

        if (cleanupAccessibleModal) {
            cleanupAccessibleModal();
        }

        modal.remove();
    }


    cleanupAccessibleModal =
        setupAccessibleModal(modal, {
            closeButton: modal.querySelector("#closeCirculation"),
            onEscape: closeCirculationModal
        });


    modal
        .querySelector("#closeCirculation")
        .addEventListener(
            "click",
            closeCirculationModal
        );


    document
        .querySelector(".circulation-overlay")
        .addEventListener("click", (event) => {

            if (event.target.classList.contains("circulation-overlay")) {
                closeCirculationModal();
            }

        });

}
