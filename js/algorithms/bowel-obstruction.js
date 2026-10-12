// ========================================
// Adult Bowel Obstruction Quick Reference
// Small / Large Bowel Obstruction
// ========================================

function openBowelObstruction() {

    const existing = document.getElementById("bowelObstructionModal");

    if (existing) {
        existing.remove();
    }

    const modal = document.createElement("div");

    modal.id = "bowelObstructionModal";

    modal.innerHTML = `
        <div class="bowel-obstruction-overlay">

            <div
                class="bowel-obstruction-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="bowelObstructionTitle">

                <div class="bowel-obstruction-header">

                    <div>
                        <h2 id="bowelObstructionTitle">🔄 Bowel Obstruction</h2>
                        <p>Adult Emergency Assessment Quick Reference</p>
                    </div>

                    <button
                        aria-label="Close dialog" id="closeBowelObstruction"
                        class="bowel-obstruction-close">
                        ×
                    </button>

                </div>


                <div class="bowel-obstruction-body">

                    <div class="bowel-obstruction-alert">

                        <strong>Bowel obstruction can progress to ischaemia, perforation and sepsis.</strong>

                        <p>
                            Assess physiological stability first, identify
                            complete obstruction or strangulation, begin
                            supportive treatment and involve the surgical team
                            early when indicated.
                        </p>

                    </div>


                    <section class="bowel-obstruction-section">

                        <h3>1. Recognise the presentation</h3>

                        <div class="bowel-obstruction-grid">

                            <div class="bowel-obstruction-card">
                                <strong>Abdominal pain</strong>
                                <p>
                                    Colicky pain is common; persistent severe
                                    pain should raise concern for ischaemia
                                    or another surgical complication.
                                </p>
                            </div>

                            <div class="bowel-obstruction-card">
                                <strong>Vomiting</strong>
                                <p>
                                    May be prominent, particularly with
                                    proximal small-bowel obstruction.
                                </p>
                            </div>

                            <div class="bowel-obstruction-card">
                                <strong>Distension</strong>
                                <p>
                                    More prominent in distal obstruction
                                    and large-bowel obstruction.
                                </p>
                            </div>

                            <div class="bowel-obstruction-card">
                                <strong>Failure to pass stool / flatus</strong>
                                <p>
                                    May occur with complete obstruction,
                                    but absence does not exclude partial
                                    obstruction.
                                </p>
                            </div>

                        </div>

                    </section>


                    <section class="bowel-obstruction-section">

                        <h3>2. Immediate assessment</h3>

                        <ol>
                            <li>Assess airway, breathing and circulation.</li>
                            <li>Measure heart rate, blood pressure, respiratory rate, SpO₂ and temperature.</li>
                            <li>Assess hydration and peripheral perfusion.</li>
                            <li>Assess pain severity and progression.</li>
                            <li>Examine for peritonism, hernia and abdominal distension.</li>
                            <li>Review previous abdominal surgery and known malignancy.</li>
                            <li>Review medications and relevant comorbidities.</li>
                        </ol>

                    </section>


                    <section class="bowel-obstruction-section">

                        <h3>3. Red flags for strangulation / ischaemia</h3>

                        <div class="bowel-obstruction-card critical">

                            <ul>
                                <li>Persistent or severe continuous pain.</li>
                                <li>Peritonism or marked abdominal tenderness.</li>
                                <li>Haemodynamic instability.</li>
                                <li>Fever or systemic toxicity.</li>
                                <li>Rising lactate or metabolic acidosis.</li>
                                <li>Leukocytosis with clinical deterioration.</li>
                                <li>Evidence of bowel ischaemia or perforation on imaging.</li>
                                <li>Clinical deterioration despite initial treatment.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="bowel-obstruction-section">

                        <h3>4. Important causes</h3>

                        <div class="bowel-obstruction-grid">

                            <div class="bowel-obstruction-card warning">
                                <strong>Adhesions</strong>
                                <p>
                                    A common cause of small-bowel obstruction,
                                    particularly after previous abdominal surgery.
                                </p>
                            </div>

                            <div class="bowel-obstruction-card warning">
                                <strong>Hernia</strong>
                                <p>
                                    Consider incarceration or strangulation.
                                    Examine all relevant hernial sites.
                                </p>
                            </div>

                            <div class="bowel-obstruction-card warning">
                                <strong>Malignancy</strong>
                                <p>
                                    Consider particularly in large-bowel
                                    obstruction or patients with relevant history.
                                </p>
                            </div>

                            <div class="bowel-obstruction-card warning">
                                <strong>Volvulus</strong>
                                <p>
                                    Consider with marked distension and
                                    compatible clinical or imaging findings.
                                </p>
                            </div>

                            <div class="bowel-obstruction-card warning">
                                <strong>Inflammatory / stricturing disease</strong>
                                <p>
                                    Consider Crohn's disease and other
                                    structural causes.
                                </p>
                            </div>

                            <div class="bowel-obstruction-card warning">
                                <strong>Other causes</strong>
                                <p>
                                    Consider intussusception, faecal impaction,
                                    post-operative complications and functional
                                    obstruction where appropriate.
                                </p>
                            </div>

                        </div>

                    </section>


                    <section class="bowel-obstruction-section">

                        <h3>5. Initial investigations</h3>

                        <div class="bowel-obstruction-card">

                            <ul>
                                <li>FBC and inflammatory markers as appropriate.</li>
                                <li>Urea, creatinine and electrolytes.</li>
                                <li>Blood gas and lactate when clinically indicated.</li>
                                <li>Group and save / crossmatch when surgery or major bleeding is possible.</li>
                                <li>Urinalysis when relevant.</li>
                                <li>Pregnancy testing when appropriate.</li>
                                <li>ECG when significant electrolyte or cardiovascular disturbance is possible.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="bowel-obstruction-section">

                        <h3>6. Imaging</h3>

                        <div class="bowel-obstruction-card emergency">

                            <strong>CT is often the key imaging study in adults.</strong>

                            <ul>
                                <li>Define the level and likely cause of obstruction.</li>
                                <li>Assess for closed-loop obstruction.</li>
                                <li>Look for bowel ischaemia, perforation or other complications.</li>
                                <li>Use imaging findings together with the clinical picture.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="bowel-obstruction-section">

                        <h3>7. Initial management</h3>

                        <div class="bowel-obstruction-card">

                            <ol>
                                <li>Keep the patient appropriately fasted when operative or procedural management is possible.</li>
                                <li>Establish IV access.</li>
                                <li>Correct dehydration and electrolyte abnormalities.</li>
                                <li>Provide appropriate analgesia and antiemetic therapy.</li>
                                <li>Consider nasogastric decompression when indicated, particularly with significant vomiting or distension.</li>
                                <li>Monitor urine output when clinically appropriate.</li>
                                <li>Involve the surgical team early when significant obstruction is suspected.</li>
                            </ol>

                        </div>

                    </section>


                    <section class="bowel-obstruction-section">

                        <h3>8. Non-operative pathway</h3>

                        <div class="bowel-obstruction-card reassess">

                            <p>
                                Selected patients with adhesive small-bowel
                                obstruction may be managed initially without
                                surgery when there is no evidence of
                                strangulation, ischaemia or another indication
                                for urgent operation.
                            </p>

                            <ul>
                                <li>Continue close clinical observation.</li>
                                <li>Correct fluid and electrolyte deficits.</li>
                                <li>Use appropriate decompression when indicated.</li>
                                <li>Follow the local surgical pathway for contrast-based assessment and timing of reassessment.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="bowel-obstruction-section">

                        <h3>9. When to escalate urgently</h3>

                        <div class="bowel-obstruction-card critical">

                            <ul>
                                <li>Peritonitis.</li>
                                <li>Suspected strangulation or bowel ischaemia.</li>
                                <li>Perforation.</li>
                                <li>Closed-loop obstruction.</li>
                                <li>Persistent haemodynamic instability.</li>
                                <li>Clinical deterioration despite resuscitation.</li>
                                <li>Failure of appropriate non-operative management.</li>
                            </ul>

                            <p>
                                Escalate immediately to senior surgical and
                                critical-care support when indicated.
                            </p>

                        </div>

                    </section>


                    <section class="bowel-obstruction-section">

                        <h3>10. Reassessment</h3>

                        <div class="bowel-obstruction-card reassess">

                            <strong>The patient must be reassessed serially.</strong>

                            <p>
                                Repeat abdominal examination, vital signs,
                                pain assessment, fluid balance, urine output
                                and relevant laboratory tests. Reassess
                                immediately if pain becomes continuous,
                                physiology deteriorates or new peritoneal
                                signs develop.
                            </p>

                        </div>

                    </section>


                    <div class="bowel-obstruction-note">

                        <strong>Clinical safety note</strong>

                        <p>
                            This is a point-of-care reference aid.
                            Management depends on the type and cause of
                            obstruction, presence of ischaemia or perforation,
                            comorbidity and local surgical protocols.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);

    let cleanupAccessibleModal;

    function closeBowelObstructionModal() {

        if (cleanupAccessibleModal) {
            cleanupAccessibleModal();
        }

        modal.remove();
    }


    cleanupAccessibleModal =
        setupAccessibleModal(modal, {
            closeButton: modal.querySelector(
                "#closeBowelObstruction"
            ),
            onEscape: closeBowelObstructionModal
        });


    modal
        .querySelector("#closeBowelObstruction")
        .addEventListener(
            "click",
            closeBowelObstructionModal
        );

    document
        .querySelector(".bowel-obstruction-overlay")
        .addEventListener("click", (event) => {

            if (event.target.classList.contains("bowel-obstruction-overlay")) {
                closeBowelObstructionModal();
            }

        });

}
