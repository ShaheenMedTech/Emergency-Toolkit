// ========================================
// Adult Diabetic Ketoacidosis Quick Reference
// ADA/EASD/JBDS/AACE/DTS Consensus 2024
// ========================================

function openDKA() {

    const existing = document.getElementById("dkaModal");

    if (existing) {
        existing.remove();
    }

    const modal = document.createElement("div");

    modal.id = "dkaModal";

    modal.innerHTML = `
        <div class="dka-overlay">

            <div
                class="dka-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="dkaTitle">

                <div class="dka-header">

                    <div>
                        <h2 id="dkaTitle">🩸 Diabetic Ketoacidosis (DKA)</h2>
                        <p>Adult Recognition & Initial Management Quick Reference</p>
                    </div>

                    <button
                        aria-label="Close dialog" id="closeDKA"
                        class="dka-close">
                        ×
                    </button>

                </div>


                <div class="dka-body">

                    <div class="dka-alert">

                        <strong>DKA is a time-critical metabolic emergency.</strong>

                        <p>
                            Identify DKA promptly, assess severity, begin
                            appropriate fluid and insulin therapy, monitor
                            electrolytes closely and identify the precipitating
                            cause.
                        </p>

                    </div>


                    <section class="dka-section">

                        <h3>1. Diagnostic criteria</h3>

                        <div class="dka-card critical">

                            <strong>All three components are required.</strong>

                            <ul>
                                <li>
                                    <strong>Diabetes / hyperglycaemia:</strong>
                                    glucose ≥ 11.1 mmol/L (200 mg/dL)
                                    or a known history of diabetes.
                                </li>

                                <li>
                                    <strong>Ketosis:</strong>
                                    blood β-hydroxybutyrate ≥ 3.0 mmol/L
                                    or significant urine ketones.
                                </li>

                                <li>
                                    <strong>Metabolic acidosis:</strong>
                                    pH < 7.30 and/or bicarbonate < 18 mmol/L.
                                </li>
                            </ul>

                            <p>
                                Blood β-hydroxybutyrate is preferred for
                                diagnosis and monitoring when available.
                            </p>

                        </div>

                    </section>


                    <section class="dka-section">

                        <h3>2. Do not miss euglycaemic DKA</h3>

                        <div class="dka-card warning">

                            <p>
                                DKA may occur with glucose below the traditional
                                hyperglycaemic range, particularly with
                                SGLT2-inhibitor use, reduced carbohydrate intake,
                                pregnancy or other states of relative insulin
                                deficiency.
                            </p>

                            <p>
                                Do not exclude DKA solely because the glucose
                                concentration is not markedly elevated.
                            </p>

                        </div>

                    </section>


                    <section class="dka-section">

                        <h3>3. Initial assessment</h3>

                        <ol>
                            <li>Assess airway, breathing and circulation.</li>
                            <li>Assess mental status and haemodynamic stability.</li>
                            <li>Measure capillary glucose and blood ketones.</li>
                            <li>Obtain venous blood gas where appropriate.</li>
                            <li>Check electrolytes, renal function and relevant laboratory tests.</li>
                            <li>Obtain ECG when potassium disturbance is suspected.</li>
                            <li>Identify the precipitating illness or treatment interruption.</li>
                        </ol>

                    </section>


                    <section class="dka-section">

                        <h3>4. Common precipitants</h3>

                        <div class="dka-grid">

                            <div class="dka-card warning">
                                <strong>Infection</strong>
                                <p>
                                    Look for infection as a precipitating
                                    cause and treat when clinically indicated.
                                </p>
                            </div>

                            <div class="dka-card warning">
                                <strong>Insulin omission</strong>
                                <p>
                                    Review missed doses, access to insulin
                                    and treatment adherence.
                                </p>
                            </div>

                            <div class="dka-card warning">
                                <strong>Acute illness</strong>
                                <p>
                                    Consider ACS, stroke, pancreatitis,
                                    surgery and other physiological stressors.
                                </p>
                            </div>

                            <div class="dka-card warning">
                                <strong>SGLT2 inhibitor</strong>
                                <p>
                                    Consider euglycaemic DKA in patients
                                    taking an SGLT2 inhibitor.
                                </p>
                            </div>

                        </div>

                    </section>


                    <section class="dka-section">

    <h3>5. Fluid resuscitation</h3>

    <div class="dka-card emergency">

        <strong>Restore circulating volume first.</strong>

        <ul>
            <li>
                Use isotonic saline or a balanced crystalloid according
                to haemodynamic status and local protocol.
            </li>

            <li>
                In adults without significant cardiac or renal impairment,
                an initial rate of approximately 500–1000 mL/hour for
                the first 2–4 hours may be appropriate.
            </li>

            <li>
                Reassess blood pressure, perfusion, urine output,
                electrolytes and fluid balance frequently.
            </li>

            <li>
                Use smaller fluid boluses and closer monitoring when
                significant heart failure, kidney failure or other
                fluid-overload risk is present.
            </li>

            <li>
                Avoid unnecessary fluid overload.
            </li>
        </ul>

    </div>

</section>

                        <div class="dka-card emergency">

                            <strong>Restore circulating volume first.</strong>

                            <ul>
                                <li>Use isotonic crystalloid according to haemodynamic status.</li>
                                <li>Assess for shock and treat circulatory compromise promptly.</li>
                                <li>Reassess blood pressure, perfusion, urine output and fluid balance.</li>
                                <li>Use more cautious fluid replacement when significant cardiac or renal impairment is present.</li>
                            </ul>

                            <p>
                                Avoid unnecessary fluid overload.
                            </p>

                        </div>

                    </section>


                    <section class="dka-section">

    <h3>6. Insulin therapy</h3>

    <div class="dka-card">

        <strong>Insulin stops ketogenesis.</strong>

        <ul>
            <li>
                Start fixed-rate IV insulin at approximately
                0.1 units/kg/hour according to the validated local DKA protocol.
            </li>

            <li>
                Continue insulin until ketoacidosis has resolved,
                not simply until plasma glucose normalises.
            </li>

            <li>
                When glucose falls below approximately 250 mg/dL
                (13.9 mmol/L), add dextrose-containing fluid as required
                so that insulin can continue until ketonaemia resolves.
            </li>

            <li>
                Once glucose has fallen and ketosis is improving,
                insulin may be reduced to approximately 0.05 units/kg/hour
                according to the clinical and biochemical response.
            </li>

            <li>
                Continue appropriate basal insulin when clinically indicated
                and according to the patient's established regimen.
            </li>
        </ul>

    </div>

</section>


                    <section class="dka-section">

    <h3>7. Potassium</h3>

    <div class="dka-card critical">

        <strong>Potassium management is essential.</strong>

        <ul>
            <li>
                Total body potassium is usually depleted even when
                the initial serum potassium appears normal or high.
            </li>

            <li>
                Monitor serum potassium frequently during treatment.
            </li>

            <li>
                If potassium is below approximately 3.5 mmol/L,
                delay insulin therapy while potassium replacement is started
                according to the local DKA protocol.
            </li>

            <li>
                Replace potassium during insulin therapy according to
                the measured serum concentration, aiming to maintain
                potassium approximately 4–5 mmol/L.
            </li>

            <li>
                Use continuous ECG monitoring when significant
                potassium disturbance is present.
            </li>
        </ul>

    </div>

</section>


                    <section class="dka-section">

                        <h3>8. Bicarbonate & phosphate</h3>

                        <div class="dka-grid">

                            <div class="dka-card warning">

                                <strong>Bicarbonate</strong>

                                <p>
                                    Bicarbonate is not routinely recommended
                                    for adult DKA and should only be considered
                                    in exceptional severe acidosis according
                                    to specialist/local protocol.
                                </p>

                            </div>

                            <div class="dka-card warning">

                                <strong>Phosphate</strong>

                                <p>
                                    Routine phosphate replacement is not
                                    generally indicated. Consider replacement
                                    only for selected severe deficiency or
                                    specific clinical indications.
                                </p>

                            </div>

                        </div>

                    </section>


                    <section class="dka-section">

    <h3>9. Monitoring</h3>

    <div class="dka-card">

        <ul>
            <li>
                Monitor capillary glucose every 1–2 hours during active treatment.
            </li>

            <li>
                Monitor blood β-hydroxybutyrate where available.
            </li>

            <li>
                Repeat electrolytes, creatinine, β-hydroxybutyrate and
                venous pH approximately every 4 hours until DKA resolves.
            </li>

            <li>
                Monitor potassium closely during insulin therapy.
            </li>

            <li>
                Monitor fluid balance and urine output.
            </li>

            <li>
                Reassess neurological status and haemodynamic condition regularly.
            </li>
        </ul>

    </div>

</section>


                    <section class="dka-section">

    <h3>10. Resolution of DKA</h3>

    <div class="dka-card reassess">

        <strong>Do not use glucose alone to determine resolution.</strong>

        <p>
            DKA is considered resolved when blood β-hydroxybutyrate
            is <strong>0.6 mmol/L</strong> and venous pH is
            <strong>≥ 7.3</strong> or bicarbonate is
            <strong>≥ 18 mmol/L</strong>.
        </p>

        <p>
            Continue insulin until ketoacidosis has resolved even after
            plasma glucose has normalised.
        </p>

        <p>
            Do not use urine ketones or the anion gap alone as the primary
            measure of DKA resolution when blood β-hydroxybutyrate is available.
        </p>

    </div>

</section>


                    <section class="dka-section">

                        <h3>11. Important complications</h3>

                        <div class="dka-grid">

                            <div class="dka-card critical">
                                <strong>Hypoglycaemia</strong>
                                <p>
                                    Can occur during continued insulin therapy
                                    and requires prompt recognition and treatment.
                                </p>
                            </div>

                            <div class="dka-card critical">
                                <strong>Hypokalaemia</strong>
                                <p>
                                    May develop rapidly during insulin and
                                    fluid treatment.
                                </p>
                            </div>

                            <div class="dka-card warning">
                                <strong>Fluid overload</strong>
                                <p>
                                    Higher risk in renal or cardiac impairment.
                                </p>
                            </div>

                            <div class="dka-card warning">
                                <strong>Cerebral complications</strong>
                                <p>
                                    Reassess patients with deteriorating
                                    neurological status urgently.
                                </p>
                            </div>

                        </div>

                    </section>


                    <section class="dka-section">

                        <h3>12. Escalation</h3>

                        <div class="dka-card critical">

                            <ul>
                                <li>Severe metabolic acidosis.</li>
                                <li>Altered consciousness.</li>
                                <li>Shock or persistent haemodynamic instability.</li>
                                <li>Severe electrolyte disturbance.</li>
                                <li>Significant renal or cardiac comorbidity.</li>
                                <li>Failure of expected biochemical improvement.</li>
                            </ul>

                            <p>
                                Escalate early to senior diabetes, emergency
                                and critical-care support when appropriate.
                            </p>

                        </div>

                    </section>


                    <div class="dka-note">

                        <strong>Clinical safety note</strong>

                        <p>
                            This is a point-of-care reference aid, not a
                            substitute for a validated DKA protocol.
                            Verify fluid type, insulin concentration, infusion
                            rate, potassium replacement and monitoring frequency
                            against the current institutional protocol before treatment.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);

    let cleanupAccessibleModal;

    function closeDKAModal() {

        if (cleanupAccessibleModal) {
            cleanupAccessibleModal();
        }

        modal.remove();
    }


    cleanupAccessibleModal =
        setupAccessibleModal(modal, {
            closeButton: modal.querySelector("#closeDKA"),
            onEscape: closeDKAModal
        });


    modal
        .querySelector("#closeDKA")
        .addEventListener(
            "click",
            closeDKAModal
        );

    document
        .querySelector(".dka-overlay")
        .addEventListener("click", (event) => {

            if (event.target.classList.contains("dka-overlay")) {
                closeDKAModal();
            }

        });

}
