// ========================================
// Adult Acute Abdomen Quick Reference
// Emergency Assessment & Initial Management
// ========================================

function openAcuteAbdomen() {

    const existing = document.getElementById("acuteAbdomenModal");

    if (existing) {
        existing.remove();
    }

    const modal = document.createElement("div");

    modal.id = "acuteAbdomenModal";

    modal.innerHTML = `
        <div class="acute-abdomen-overlay">

            <div
                class="acute-abdomen-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="acuteAbdomenTitle">

                <div class="acute-abdomen-header">

                    <div>
                        <h2>🩺 Acute Abdomen</h2>
                        <p>Adult Emergency Assessment Quick Reference</p>
                    </div>

                    <button
                        aria-label="Close dialog" id="closeAcuteAbdomen"
                        class="acute-abdomen-close">
                        ×
                    </button>

                </div>


                <div class="acute-abdomen-body">

                    <div class="acute-abdomen-alert">

                        <strong>Acute abdominal pain can represent a surgical emergency.</strong>

                        <p>
                            Identify physiological instability first,
                            recognise peritonitis or major bleeding,
                            treat immediately reversible problems and
                            reassess frequently.
                        </p>

                    </div>


                    <section class="acute-abdomen-section">

                        <h3>1. Immediate assessment</h3>

                        <ol>
                            <li>Assess airway, breathing and circulation.</li>
                            <li>Check heart rate, blood pressure, respiratory rate, SpO₂ and temperature.</li>
                            <li>Assess mental status and peripheral perfusion.</li>
                            <li>Assess pain severity and trajectory.</li>
                            <li>Identify haemodynamic instability or shock.</li>
                            <li>Consider early senior surgical / emergency support when instability or a surgical abdomen is suspected.</li>
                        </ol>

                    </section>


                    <section class="acute-abdomen-section">

                        <h3>2. Red flags</h3>

                        <div class="acute-abdomen-grid">

                            <div class="acute-abdomen-card critical">
                                <strong>Peritonism</strong>
                                <p>
                                    Guarding, rigidity or marked rebound
                                    tenderness may indicate intra-abdominal
                                    inflammation, perforation or another
                                    surgical emergency.
                                </p>
                            </div>

                            <div class="acute-abdomen-card critical">
                                <strong>Shock</strong>
                                <p>
                                    Hypotension, tachycardia, poor perfusion
                                    or altered consciousness require immediate
                                    resuscitation and cause identification.
                                </p>
                            </div>

                            <div class="acute-abdomen-card emergency">
                                <strong>Severe / sudden pain</strong>
                                <p>
                                    Consider perforation, ischaemia, bleeding,
                                    torsion or other time-critical pathology.
                                </p>
                            </div>

                            <div class="acute-abdomen-card emergency">
                                <strong>GI bleeding</strong>
                                <p>
                                    Haematemesis, melaena or significant
                                    haematochezia require appropriate
                                    haemodynamic assessment.
                                </p>
                            </div>

                            <div class="acute-abdomen-card warning">
                                <strong>Persistent vomiting / obstruction</strong>
                                <p>
                                    Consider bowel obstruction, ileus,
                                    metabolic causes and surgical pathology.
                                </p>
                            </div>

                            <div class="acute-abdomen-card warning">
                                <strong>Absent / reduced bowel function</strong>
                                <p>
                                    Consider obstruction, ileus, ischaemia
                                    or other intra-abdominal pathology.
                                </p>
                            </div>

                        </div>

                    </section>


                    <section class="acute-abdomen-section">

                        <h3>3. Focused history</h3>

                        <div class="acute-abdomen-card">

                            <ul>
                                <li>Onset: sudden or gradual.</li>
                                <li>Site and radiation of pain.</li>
                                <li>Character and progression.</li>
                                <li>Vomiting, diarrhoea or constipation.</li>
                                <li>Haematemesis, melaena or rectal bleeding.</li>
                                <li>Urinary symptoms.</li>
                                <li>Fever or systemic symptoms.</li>
                                <li>Previous abdominal surgery.</li>
                                <li>Relevant medical history and medications.</li>
                                <li>Anticoagulant / antiplatelet therapy.</li>
                                <li>Last menstrual period and pregnancy possibility when relevant.</li>
                                <li>Previous episodes or known abdominal disease.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="acute-abdomen-section">

                        <h3>4. Examination</h3>

                        <div class="acute-abdomen-grid">

                            <div class="acute-abdomen-card">
                                <strong>General</strong>
                                <p>
                                    Appearance, hydration, distress,
                                    pallor, jaundice and overall perfusion.
                                </p>
                            </div>

                            <div class="acute-abdomen-card">
                                <strong>Abdomen</strong>
                                <p>
                                    Inspection, auscultation when appropriate,
                                    palpation, percussion and assessment
                                    for peritonism.
                                </p>
                            </div>

                            <div class="acute-abdomen-card">
                                <strong>Hernial orifices</strong>
                                <p>
                                    Consider incarcerated or strangulated
                                    hernia when clinically relevant.
                                </p>
                            </div>

                            <div class="acute-abdomen-card">
                                <strong>Extra-abdominal causes</strong>
                                <p>
                                    Consider chest, cardiac, metabolic,
                                    urological and gynaecological causes.
                                </p>
                            </div>

                        </div>

                    </section>


                    <section class="acute-abdomen-section">

                        <h3>5. Pregnancy consideration</h3>

                        <div class="acute-abdomen-card warning">

                            <strong>Consider pregnancy in patients of childbearing potential.</strong>

                            <ul>
                                <li>Ask sensitively about pregnancy possibility and last menstrual period.</li>
                                <li>Perform pregnancy testing when clinically appropriate.</li>
                                <li>Consider ectopic pregnancy in abdominal or pelvic pain with pregnancy possibility.</li>
                                <li>Escalate immediately if haemodynamic instability or suspected ruptured ectopic pregnancy is present.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="acute-abdomen-section">

                        <h3>6. Initial investigations</h3>

                        <div class="acute-abdomen-card">

                            <ul>
                                <li>FBC and relevant biochemistry.</li>
                                <li>Urea / creatinine and electrolytes.</li>
                                <li>Liver function tests when appropriate.</li>
                                <li>Amylase or lipase when pancreatitis is suspected.</li>
                                <li>Blood gas and lactate when clinically indicated.</li>
                                <li>Group and save / crossmatch when significant bleeding or surgery is possible.</li>
                                <li>Urinalysis when appropriate.</li>
                                <li>Pregnancy test when relevant.</li>
                                <li>ECG when cardiac or systemic causes are possible.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="acute-abdomen-section">

                        <h3>7. Imaging</h3>

                        <div class="acute-abdomen-grid">

                            <div class="acute-abdomen-card">
                                <strong>Ultrasound</strong>
                                <p>
                                    Useful for selected hepatobiliary,
                                    pelvic, vascular and other indications.
                                </p>
                            </div>

                            <div class="acute-abdomen-card">
                                <strong>CT</strong>
                                <p>
                                    Consider when cross-sectional imaging is
                                    required to define suspected intra-abdominal
                                    pathology or complications.
                                </p>
                            </div>

                            <div class="acute-abdomen-card">
                                <strong>Plain radiography</strong>
                                <p>
                                    Use selectively according to the clinical
                                    question and local imaging pathway.
                                </p>
                            </div>

                            <div class="acute-abdomen-card">
                                <strong>Bedside ultrasound</strong>
                                <p>
                                    Consider point-of-care ultrasound when it
                                    can answer an immediate focused question.
                                </p>
                            </div>

                        </div>

                    </section>


                    <section class="acute-abdomen-section">

                        <h3>8. Initial management</h3>

                        <div class="acute-abdomen-card emergency">

                            <ul>
                                <li>Provide appropriate analgesia.</li>
                                <li>Control vomiting and maintain appropriate fluid balance.</li>
                                <li>Give IV fluids when clinically indicated.</li>
                                <li>Keep the patient appropriately prepared for potential surgery or urgent intervention when indicated.</li>
                                <li>Do not delay definitive treatment in a deteriorating patient while waiting for non-essential investigations.</li>
                                <li>Start antimicrobial therapy when a relevant infectious or intra-abdominal indication is present and according to local protocol.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="acute-abdomen-section">

                        <h3>9. Time-critical diagnoses to consider</h3>

                        <div class="acute-abdomen-grid">

                            <div class="acute-abdomen-card critical">
                                <strong>Perforation / peritonitis</strong>
                            </div>

                            <div class="acute-abdomen-card critical">
                                <strong>Mesenteric ischaemia</strong>
                            </div>

                            <div class="acute-abdomen-card critical">
                                <strong>Ruptured ectopic pregnancy</strong>
                            </div>

                            <div class="acute-abdomen-card critical">
                                <strong>Major intra-abdominal haemorrhage</strong>
                            </div>

                            <div class="acute-abdomen-card emergency">
                                <strong>Strangulated obstruction / hernia</strong>
                            </div>

                            <div class="acute-abdomen-card emergency">
                                <strong>Acute pancreatitis with organ dysfunction</strong>
                            </div>

                        </div>

                    </section>


                    <section class="acute-abdomen-section">

                        <h3>10. Surgical escalation</h3>

                        <div class="acute-abdomen-card critical">

                            <ul>
                                <li>Immediate senior review for haemodynamic instability or suspected peritonitis.</li>
                                <li>Early surgical consultation when an operative cause is suspected.</li>
                                <li>Escalate to critical care when there is evolving organ dysfunction.</li>
                                <li>Continue resuscitation while definitive management is arranged.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="acute-abdomen-section">

                        <h3>11. Reassessment</h3>

                        <div class="acute-abdomen-card reassess">

                            <strong>A changing abdomen requires repeated assessment.</strong>

                            <p>
                                Repeat vital signs, abdominal examination,
                                pain assessment, urine output and relevant
                                laboratory or imaging assessment when the
                                clinical picture changes.
                            </p>

                        </div>

                    </section>


                    <div class="acute-abdomen-note">

                        <strong>Clinical safety note</strong>

                        <p>
                            This is a point-of-care reference aid.
                            Acute abdominal pain has a broad differential.
                            Use local surgical, radiology, emergency,
                            gynaecology and antimicrobial pathways where applicable.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);

    let cleanupAccessibleModal;

    function closeAcuteAbdomenModal() {

        if (cleanupAccessibleModal) {
            cleanupAccessibleModal();
        }

        modal.remove();
    }


    cleanupAccessibleModal =
        setupAccessibleModal(modal, {
            closeButton: modal.querySelector(
                "#closeAcuteAbdomen"
            ),
            onEscape: closeAcuteAbdomenModal
        });


    modal
        .querySelector("#closeAcuteAbdomen")
        .addEventListener(
            "click",
            closeAcuteAbdomenModal
        );

    document
        .querySelector(".acute-abdomen-overlay")
        .addEventListener("click", (event) => {

            if (event.target.classList.contains("acute-abdomen-overlay")) {
                closeAcuteAbdomenModal();
            }

        });

}
