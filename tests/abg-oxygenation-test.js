const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(
    path.join(__dirname, "..", "js", "calculators", "acid-base.js"),
    "utf8"
);

const limitation =
    "PaO₂ alone is not a standalone oxygenation assessment. Interpret with appropriate clinical and contextual information, including FiO₂, oxygen-delivery device, sample type, and local protocol.";

function createElement() {
    return {
        value: "",
        textContent: "",
        handlers: {},
        addEventListener(type, handler) {
            this.handlers[type] = handler;
        },
        focus() {}
    };
}

function createCalculationContext(values) {
    const elements = new Map();
    const alerts = [];

    for (const [id, value] of Object.entries(values)) {
        const element = createElement();
        element.value = String(value);
        elements.set(id, element);
    }

    for (const id of [
        "abgAG",
        "abgPrimary",
        "abgCompensation",
        "abgOxygen"
    ]) {
        elements.set(id, createElement());
    }

    const context = {
        alert(message) {
            alerts.push(message);
        },
        document: {
            getElementById(id) {
                return elements.get(id);
            }
        }
    };

    vm.createContext(context);
    vm.runInContext(source, context);

    return { context, elements, alerts };
}

function calculateWithPaO2(pO2) {
    const test = createCalculationContext({
        abgPH: "7.30",
        abgPCO2: "30",
        abgHCO3: "15",
        abgPaO2: String(pO2),
        abgNa: "140",
        abgCl: "110"
    });

    test.context.calculateABG();
    return test;
}

for (const pO2 of [59, 60, 100, 101, 500]) {
    const { elements, alerts } = calculateWithPaO2(pO2);
    const oxygen = elements.get("abgOxygen").textContent;

    assert.equal(alerts.length, 0, `PaO₂ ${pO2} should be accepted`);
    assert.match(oxygen, new RegExp(`PaO₂: ${pO2} mmHg`));
    assert.ok(oxygen.includes(limitation));
    assert.doesNotMatch(
        oxygen,
        /Low PaO₂|Within typical range|Elevated PaO₂/
    );
}

{
    const { elements } = calculateWithPaO2(80);

    assert.equal(elements.get("abgAG").textContent, "15.0");
    assert.equal(
        elements.get("abgPrimary").textContent,
        "Metabolic acidosis"
    );
    assert.match(
        elements.get("abgCompensation").textContent,
        /^Appropriate respiratory compensation\./
    );
}

for (const pO2 of ["", 0, 501]) {
    const test = createCalculationContext({
        abgPH: "7.30",
        abgPCO2: "30",
        abgHCO3: "15",
        abgPaO2: String(pO2),
        abgNa: "140",
        abgCl: "110"
    });

    test.context.calculateABG();

    assert.equal(test.alerts.length, 1, `PaO₂ ${pO2} should be rejected`);
    assert.equal(test.elements.get("abgOxygen").textContent, "—");
}

for (const [id, outOfRange] of [
    ["abgPH", "8.1"], ["abgPCO2", "151"], ["abgHCO3", "61"],
    ["abgPaO2", "501"], ["abgNa", "221"], ["abgCl", "181"]
]) {
    for (const invalidValue of ["", outOfRange, "NaN"]) {
        const { context, elements, alerts } = calculateWithPaO2(80);
        const outputIds = ["abgAG", "abgPrimary", "abgCompensation", "abgOxygen"];
        const previous = outputIds.map(outputId => elements.get(outputId).textContent);
        assert.ok(previous.every(value => value !== "" && value !== "—"));
        const original = elements.get(id).value;
        elements.get(id).value = invalidValue;
        context.calculateABG();
        assert.equal(alerts.length, 1);
        for (const outputId of outputIds) {
            assert.equal(elements.get(outputId).textContent, "—", `${id}: ${outputId}`);
        }
        assert.equal(elements.get(id).value, invalidValue);
        elements.get(id).value = original;
        context.calculateABG();
        assert.deepEqual(outputIds.map(outputId => elements.get(outputId).textContent), previous);
    }
}

{
    const elements = new Map();
    const inputIds = new Set();
    const modal = createElement();
    const dialog = createElement();

    Object.defineProperty(modal, "innerHTML", {
        set(markup) {
            for (const match of markup.matchAll(/<(input|button|select|strong)[^>]*\bid="([^"]+)"/g)) {
                const element = createElement();
                elements.set(match[2], element);
                if (match[1] === "input") inputIds.add(match[2]);
            }
        }
    });

    modal.querySelector = selector => {
        if (selector === '[role="dialog"]') return dialog;
        if (selector.startsWith("#")) return elements.get(selector.slice(1));
        return null;
    };
    modal.querySelectorAll = selector =>
        selector === "input"
            ? [...inputIds].map(id => elements.get(id))
            : [];

    const document = {
        activeElement: createElement(),
        body: { appendChild() {} },
        addEventListener() {},
        removeEventListener() {},
        contains() { return true; },
        createElement() { return modal; },
        getElementById(id) { return elements.get(id); }
    };
    const context = { document };

    vm.createContext(context);
    vm.runInContext(source, context);
    context.openABGCalculator();

    const outputIds = ["abgAG", "abgPrimary", "abgCompensation", "abgOxygen"];
    for (const id of outputIds) elements.get(id).textContent = "previous result";
    for (const id of inputIds) elements.get(id).value = "80";
    elements.get("resetABG").handlers.click();

    for (const id of outputIds) assert.equal(elements.get(id).textContent, "—");
    for (const id of inputIds) assert.equal(elements.get(id).value, "");
}

console.log("PASS — ABG oxygenation regression tests");
