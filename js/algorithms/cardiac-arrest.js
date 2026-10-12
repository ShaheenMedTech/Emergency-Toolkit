// ========================================
// Adult Cardiac Arrest Quick Reference
// ERC Guidelines 2025
// ========================================

function openCardiacArrest() {

    const existing = document.getElementById("cardiacArrestModal");

    if (existing) {
        existing.remove();
    }

    const modal = document.createElement("div");

    modal.id = "cardiacArrestModal";

    modal.innerHTML = `
        <div class="arrest-overlay">

            <div
                class="arrest-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="arrestTitle">

                <div class="arrest-header">
                    <div>
                        <h2 id="arrestTitle">🚨 Adult Cardiac Arrest</h2>
                        <p>ALS Quick Reference — ERC 2025</p>
                    </div>

                    <button
                        aria-label="Close dialog" id="closeCardiacArrest"
                        class="arrest-close">
                        ×
                    </button>
                </div>


                <div class="arrest-body">

                    <div class="arrest-alert">
                        <strong>Recognise cardiac arrest</strong>
                        <p>
                            Unresponsive + absent/abnormal breathing.
                            Start CPR immediately and attach the
                            defibrillator/monitor.
                        </p>
                    </div>


                    <section class="arrest-section">

                        <h3>1. Immediate actions</h3>

                        <ol>
                            <li>Call for help / resuscitation team.</li>
                            <li>Start high-quality CPR.</li>
                            <li>Attach defibrillator/monitor.</li>
                            <li>Assess rhythm.</li>
                        </ol>

                    </section>


                    <section class="arrest-section">

                        <h3>2. Shockable rhythm</h3>

                        <div class="arrest-card shockable">

                            <strong>VF / pulseless VT</strong>

                            <p>
                                Defibrillate early, then immediately
                                resume CPR for 2 minutes.
                            </p>

                            <ul>
                                <li>Reassess rhythm every 2 minutes.</li>
                                <li>Minimise interruptions to CPR.</li>
                                <li>
                                    After the 3rd shock:
                                    adrenaline + amiodarone.
                                </li>
                                <li>
                                    After the 5th shock:
                                    consider further amiodarone.
                                </li>
                            </ul>

                        </div>

                    </section>

<section class="arrest-section">

    <h3>3A. Defibrillation</h3>

    <div class="arrest-card shockable">

        <strong>Optimise defibrillator pad placement.</strong>

        <ul>
            <li>
                Use appropriate pad size and placement according to
                the defibrillator and local protocol.
            </li>

            <li>
                The lateral / apical pad should be placed below the
                armpit in the mid-axillary line.
            </li>

            <li>
                Minimise the peri-shock pause and immediately resume CPR.
            </li>
        </ul>

    </div>

</section>


                    <section class="arrest-section">

                        <h3>3. Non-shockable rhythm</h3>

                        <div class="arrest-card nonshockable">

                            <strong>PEA / Asystole</strong>

                            <p>
                                Continue CPR for 2-minute cycles
                                and give adrenaline early.
                            </p>

                            <ul>
                                <li>Adrenaline 1 mg IV/IO as soon as possible.</li>
                                <li>Repeat adrenaline every 3–5 minutes.</li>
                                <li>Reassess rhythm every 2 minutes.</li>
                            </ul>

                        </div>

                    </section>


                    <section class="arrest-section">

                        <h3>4. Airway, oxygenation &amp; ventilation</h3>

                        <ul>
                            <li>
                                Provide effective ventilation with the available
                                airway strategy.
                            </li>

                            <li>
                                Minimise interruptions to chest compressions.
                            </li>

                            <li>
                                Use high-concentration oxygen during active cardiac arrest.
                            </li>

                            <li>
                                Use waveform capnography when an advanced airway is in place.
                            </li>

                            <li>
                                After an advanced airway is established, provide continuous
                                chest compressions with appropriate ventilation.
                            </li>
                        </ul>

                    </section>


                    <section class="arrest-section">

                        <h3>5. Reversible causes</h3>

                        <div class="reversible-grid">

                            <div>
                                <strong>4 Hs</strong>
                                <ul>
                                    <li>Hypoxia</li>
                                    <li>Hypovolaemia</li>
                                    <li>Hypo-/hyperkalaemia & metabolic causes</li>
                                    <li>Hypothermia / hyperthermia</li>
                                </ul>
                            </div>

                            <div>
                                <strong>4 Ts</strong>
                                <ul>
                                    <li>Thrombosis</li>
                                    <li>Tamponade</li>
                                    <li>Tension pneumothorax</li>
                                    <li>Toxins</li>
                                </ul>
                            </div>

                        </div>

                    </section>


                    <section class="arrest-section">

                        <h3>6. ROSC</h3>

                        <div class="arrest-card rosc">

                            <strong>Immediate post-resuscitation care</strong>

                            <ul>
                                <li>ABCDE assessment.</li>
                                <li>Aim for SpO₂ 94–98%.</li>
                                <li>Aim for normal PaCO₂.</li>
                                <li>Aim for systolic blood pressure &gt; 100 mmHg.</li>
                                <li>Obtain a 12-lead ECG.</li>
                                <li>Identify and treat the cause of cardiac arrest.</li>
                                <li>Begin appropriate temperature control.</li>
                            </ul>

                        </div>

                    </section>


                    <div class="arrest-note">

                        <strong>Clinical safety note</strong>

                        <p>
                            This tool is a quick-reference aid.
                            Follow your current local resuscitation
                            protocol, drug concentrations, defibrillator
                            instructions, and institutional policies.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);


    const dialog = modal.querySelector('[role="dialog"]');
    const closeButton =
        modal.querySelector("#closeCardiacArrest");
    const previousFocus = document.activeElement;


    function closeCardiacArrestModal() {

        document.removeEventListener(
            "keydown",
            handleCardiacArrestKeydown
        );

        modal.remove();

        if (
            previousFocus &&
            typeof previousFocus.focus === "function"
        ) {
            previousFocus.focus();
        }
    }


    function handleCardiacArrestKeydown(event) {

        if (event.key === "Escape") {
            event.preventDefault();
            closeCardiacArrestModal();
            return;
        }

        if (event.key !== "Tab") {
            return;
        }

        const focusableElements = Array.from(
            dialog.querySelectorAll(
                'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
            )
        ).filter(element =>
            !element.disabled &&
            element.offsetParent !== null
        );

        if (!focusableElements.length) {
            event.preventDefault();
            closeButton.focus();
            return;
        }

        const firstElement = focusableElements[0];

        const lastElement =
            focusableElements[focusableElements.length - 1];

        if (
            event.shiftKey &&
            document.activeElement === firstElement
        ) {
            event.preventDefault();
            lastElement.focus();
        }
        else if (
            !event.shiftKey &&
            document.activeElement === lastElement
        ) {
            event.preventDefault();
            firstElement.focus();
        }
    }


    closeButton.addEventListener(
        "click",
        closeCardiacArrestModal
    );

    document.addEventListener(
        "keydown",
        handleCardiacArrestKeydown
    );

    closeButton.focus();


    document
        .querySelector(".arrest-overlay")
        .addEventListener("click", (event) => {

            if (event.target.classList.contains("arrest-overlay")) {
                closeCardiacArrestModal();
            }

        });

}
