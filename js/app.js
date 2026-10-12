// ================================
// Emergency Toolkit
// ================================

// Dark mode
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const darkMode = document.body.classList.toggle("dark-mode");
        themeToggle.setAttribute("aria-pressed", String(darkMode));
    });
}

// ================================
// CALCULATOR CARDS
// ================================

document.addEventListener("click", (event) => {

    const card = event.target.closest(".tool-card");

    if (!card) return;

    const title = card.querySelector("strong");

    if (!title) return;

    const name = title.textContent.trim();

    if (name === "GCS") {
        openGCSCalculator();
        return;
    }

    if (name === "NEWS2") {
        openNEWS2Calculator();
        return;
    }

    if (name === "Shock Index") {
        openShockIndexCalculator();
        return;
    }

    if (name === "ABG") {
        openABGCalculator();
        return;
    }

});
// ================================
// SHARED MODAL ACCESSIBILITY
// ================================

function setupAccessibleModal(modal, options = {}) {

    const dialog =
        options.dialog ||
        modal.querySelector('[role="dialog"]');

    const closeButton =
        options.closeButton ||
        dialog?.querySelector("button");

    if (!modal || !dialog || !closeButton) {

        console.warn(
            "Accessible modal setup skipped:",
            {
                modal,
                dialog,
                closeButton
            }
        );

        return () => {};
    }


    const previousFocus = document.activeElement;


    function getFocusableElements() {

        return Array.from(
            dialog.querySelectorAll(
                'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
            )
        ).filter(element =>
            !element.disabled &&
            element.offsetParent !== null
        );
    }


    function handleKeydown(event) {

        if (event.key === "Escape") {

            event.preventDefault();

            if (typeof options.onEscape === "function") {
                options.onEscape();
            }

            return;
        }


        if (event.key !== "Tab") {
            return;
        }


        const focusable =
            getFocusableElements();


        if (!focusable.length) {

            event.preventDefault();
            closeButton.focus();

            return;
        }


        const first = focusable[0];

        const last =
            focusable[focusable.length - 1];


        if (
            event.shiftKey &&
            document.activeElement === first
        ) {

            event.preventDefault();
            last.focus();

        }
        else if (
            !event.shiftKey &&
            document.activeElement === last
        ) {

            event.preventDefault();
            first.focus();
        }
    }


    document.addEventListener(
        "keydown",
        handleKeydown
    );


    closeButton.focus();


    function cleanupAccessibleModal() {

        document.removeEventListener(
            "keydown",
            handleKeydown
        );


        if (
            previousFocus &&
            typeof previousFocus.focus === "function" &&
            document.contains(previousFocus)
        ) {
            previousFocus.focus();
        }
    }


    return cleanupAccessibleModal;
}
