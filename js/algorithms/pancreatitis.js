// ========================================
// Adult Acute Pancreatitis Quick Reference
// ACG 2024 / NICE aligned
// ========================================

function openPancreatitis() {

    const existing = document.getElementById("pancreatitisModal");

    if (existing) {
        existing.remove();
    }

    const modal = document.createElement("div");

    modal.id = "pancreatitisModal";

    modal.innerHTML = `
        <div class="pancreatitis-overlay">

            <div
                class="pancreatitis-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="pancreatitisTitle">

                <div class="pancreatitis-header">

                    <div>
                        <h2 id="pancreatitisTitle">🩺 Acute Pancreatitis</h2>
                        <p>Recognition & Initial Management Quick Reference</p>
                    </div>

                    <button
                        aria-label="Close dialog" id="closePancreatitis"
                        class="pancreatitis-close">
                        ×
                    </button>

                </div>

                <div class="pancreatitis-body">

                    <div class="pancreatitis-alert">

                        <strong>Acute pancreatitis can deteriorate rapidly.</strong>

                        <p>
                            Confirm the diagnosis, assess severity early,
                            identify the cause and reassess volume status
                            and organ function repeatedly.
                        </p>

                    </div>


                    <section class="pancreatitis-section">

                        <h3>1. Diagnosis</h3>

                        <div class="pancreatitis-card critical">

                            <strong>Think in terms of the diagnostic criteria.</strong>

                            <ul>
                                <li>Typical acute upper abdominal pain.</li>
                                <li>Characteristic elevation of pancreatic enzymes.</li>
                                <li>Imaging findings compatible with acute pancreatitis.</li>
                            </ul>

                            <p>
                                Acute pancreatitis is generally diagnosed when
                                at least two of the appropriate diagnostic
                                features are present.
                            </p>

                        </div>

                    </section>


                    <section class="pancreatitis-section">

                        <h3>2. Initial assessment</h3>

                        <ol>
                            <li>Assess airway, breathing and circulation.</li>
                            <li>Assess pain, vomiting and hydration status.</li>
                            <li>Check heart rate, blood pressure, respiratory rate and oxygen saturation.</li>
                            <li>Assess mental status and urine output when monitored.</li>
                            <li>Obtain appropriate laboratory investigations.</li>
                            <li>Assess renal function and markers of systemic inflammation.</li>
                            <li>Review for evidence of organ dysfunction.</li>
                        </ol>

                    </section>


                    <section class="pancreatitis-section">

                        <h3>3. Identify the cause</h3>

                        <div class="pancreatitis-grid">

                            <div class="pancreatitis-card warning">
                                <strong>Gallstones</strong>
                                <p>
                                    Consider biliary disease and obtain
                                    appropriate hepatobiliary imaging.
                                </p>
                            </div>

                            <div class="pancreatitis-card warning">
                                <strong>Alcohol</strong>
                                <p>
                                    Review alcohol history and other
                                    relevant risk factors.
                                </p>
                            </div>

                            <div class="pancreatitis-card warning">
                                <strong>Hypertriglyceridaemia</strong>
                                <p>
                                    Consider when gallstones and alcohol
                                    do not explain the presentation.
                                </p>
                            </div>

                            <div class="pancreatitis-card warning">
                                <strong>Other causes</strong>
                                <p>
                                    Consider drugs, metabolic causes,
                                    procedures and structural disease.
                                </p>
                            </div>

                        </div>

                    </section>


                    <section class="pancreatitis-section">

                        <h3>4. Severity assessment</h3>

                        <div class="pancreatitis-card emergency">

                            <strong>Look for evolving organ dysfunction.</strong>

                            <ul>
                                <li>Persistent hypotension or shock.</li>
                                <li>Acute kidney injury or worsening renal function.</li>
                                <li>Hypoxaemia or respiratory failure.</li>
                                <li>Altered mental status.</li>
                                <li>Persistent systemic inflammatory response.</li>
                                <li>High or rising BUN / haematocrit and other markers of severe disease.</li>
                            </ul>

                            <p>
                                Reassess repeatedly because severity may become
                                clearer over time.
                            </p>

                        </div>

                    </section>


                    <section class="pancreatitis-section">

                        <h3>5. Fluid resuscitation</h3>

                        <div class="pancreatitis-card">

                            <strong>Use goal-directed, reassessed fluid therapy.</strong>

                            <ul>
                                <li>Assess volume status early.</li>
                                <li>Use isotonic crystalloid when IV fluid therapy is indicated.</li>
                                <li>Reassess haemodynamics, urine output and relevant laboratory trends.</li>
                                <li>Avoid unnecessary fluid overload.</li>
                                <li>Escalate monitoring in patients with organ dysfunction.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="pancreatitis-section">

                        <h3>6. Analgesia & supportive care</h3>

                        <div class="pancreatitis-card">

                            <ul>
                                <li>Provide adequate analgesia.</li>
                                <li>Control nausea and vomiting.</li>
                                <li>Correct clinically significant electrolyte abnormalities.</li>
                                <li>Monitor glucose and renal function when appropriate.</li>
                                <li>Provide oxygen when clinically indicated.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="pancreatitis-section">

                        <h3>7. Nutrition</h3>

                        <div class="pancreatitis-card reassess">

                            <strong>Prefer enteral/oral feeding when tolerated.</strong>

                            <p>
                                In appropriate patients, avoid unnecessary
                                prolonged fasting. Use oral or enteral nutrition
                                according to severity and tolerance.
                            </p>

                            <p>
                                Patients with moderately severe or severe disease
                                may require enteral feeding when oral intake is
                                not adequate.
                            </p>

                        </div>

                    </section>


                    <section class="pancreatitis-section">

                        <h3>8. Biliary pancreatitis</h3>

                        <div class="pancreatitis-card emergency">

                            <ul>
                                <li>Assess for gallstone-related disease.</li>
                                <li>Perform appropriate hepatobiliary imaging.</li>
                                <li>Consider urgent ERCP when acute biliary pancreatitis is complicated by cholangitis.</li>
                                <li>In mild biliary pancreatitis, definitive treatment of gallstones should be planned appropriately during the index admission.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="pancreatitis-section">

                        <h3>9. Imaging</h3>

                        <div class="pancreatitis-card warning">

                            <ul>
                                <li>Use ultrasound when biliary aetiology is suspected.</li>
                                <li>Do not use CT routinely at presentation when the diagnosis is already clear and the patient is improving.</li>
                                <li>Consider CT when the diagnosis remains uncertain or there is failure to improve after approximately 48–72 hours.</li>
                                <li>Consider repeat or alternative imaging when complications are suspected.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="pancreatitis-section">

                        <h3>10. Complications & escalation</h3>

                        <div class="pancreatitis-grid">

                            <div class="pancreatitis-card critical">
                                <strong>Persistent organ failure</strong>
                                <p>
                                    Escalate to critical care when respiratory,
                                    cardiovascular or renal failure is evolving.
                                </p>
                            </div>

                            <div class="pancreatitis-card warning">
                                <strong>Necrosis / collections</strong>
                                <p>
                                    Suspect complications when the clinical course
                                    deteriorates or recovery is delayed.
                                </p>
                            </div>

                            <div class="pancreatitis-card warning">
                                <strong>Infection</strong>
                                <p>
                                    Do not use prophylactic antibiotics routinely;
                                    assess for a specific infectious indication.
                                </p>
                            </div>

                            <div class="pancreatitis-card warning">
                                <strong>Systemic complications</strong>
                                <p>
                                    Reassess for respiratory, renal,
                                    cardiovascular and metabolic deterioration.
                                </p>
                            </div>

                        </div>

                    </section>


                    <section class="pancreatitis-section">

                        <h3>11. Reassessment</h3>

                        <div class="pancreatitis-card reassess">

                            <strong>Reassess repeatedly.</strong>

                            <p>
                                Repeat clinical examination, haemodynamic
                                assessment, urine output, renal function and
                                other relevant laboratory markers according
                                to the patient's clinical course.
                            </p>

                        </div>

                    </section>


                    <div class="pancreatitis-note">

                        <strong>Clinical safety note</strong>

                        <p>
                            This is a point-of-care reference aid.
                            Follow the current local pancreatitis, GI,
                            surgical, endoscopy and critical-care pathways.
                            Management should be adapted to severity,
                            aetiology and organ dysfunction.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);

    let cleanupAccessibleModal;

    function closePancreatitisModal() {

        if (cleanupAccessibleModal) {
            cleanupAccessibleModal();
        }

        modal.remove();
    }


    cleanupAccessibleModal =
        setupAccessibleModal(modal, {
            closeButton: modal.querySelector("#closePancreatitis"),
            onEscape: closePancreatitisModal
        });


    modal
        .querySelector("#closePancreatitis")
        .addEventListener(
            "click",
            closePancreatitisModal
        );

    document
        .querySelector(".pancreatitis-overlay")
        .addEventListener("click", (event) => {

            if (event.target.classList.contains("pancreatitis-overlay")) {
                closePancreatitisModal();
            }

        });

}
