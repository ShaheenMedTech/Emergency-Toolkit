const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "../js/calculators/infusions.js"), "utf8");
const units = ["mcgkgmin", "mcgmin", "mgkgmin", "mgmin"];
const labels = ["mcg/kg/min", "mcg/min", "mg/kg/min", "mg/min"];
const failure = "The entered values produce a result outside the calculator's supported numeric range. Please check the values and units.";
const baseline = {
    infusionWeight: "70", infusionDose: "0.1", infusionDoseType: "mcgkgmin",
    infusionDrugAmount: "4", infusionFinalVolume: "50"
};
const elements = new Map();
const alerts = [];
let modal;
function element() {
    const listeners = new Map();
    return {
        value: "", textContent: "", focus() {},
        addEventListener(type, handler) {
            if (!listeners.has(type)) listeners.set(type, []);
            listeners.get(type).push(handler);
        },
        dispatch(type) { for (const handler of listeners.get(type) || []) handler({ target: this }); }
    };
}
const document = {
    activeElement: element(), body: { appendChild() {} },
    getElementById: id => elements.get(id),
    querySelector: () => modal.overlay,
    addEventListener() {}, removeEventListener() {},
    createElement() {
        const controls = [];
        const ids = [];
        modal = element();
        modal.overlay = element();
        Object.defineProperty(modal, "innerHTML", {
            set(markup) {
                for (const match of markup.matchAll(/<(\w+)\b([^>]*\bid="([^"]+)"[^>]*)>/g)) {
                    const el = element();
                    el.tag = match[1];
                    el.textContent = markup.slice(match.index + match[0].length).split(`</${el.tag}>`)[0]
                        .replace(/<[^>]*>/g, "").trim();
                    if (el.tag === "select") el.value = "mcgkgmin";
                    elements.set(match[3], el); ids.push(match[3]);
                    if (["input", "select"].includes(el.tag)) controls.push(el);
                }
            }
        });
        modal.querySelector = selector => selector.startsWith("#")
            ? elements.get(selector.slice(1)) : element();
        modal.querySelectorAll = selector => controls.filter(el => selector.split(",").map(s => s.trim()).includes(el.tag));
        modal.remove = () => { for (const id of ids) elements.delete(id); elements.delete("infusionsModal"); };
        return modal;
    }
};
const context = { document, alert: message => alerts.push(message) };
vm.createContext(context);
vm.runInContext(source, context);
context.openInfusionsCalculator();
const get = id => elements.get(id);
const set = overrides => {
    for (const [id, value] of Object.entries({ ...baseline, ...overrides })) get(id).value = String(value);
    alerts.length = 0;
};
const calculate = () => get("calculateInfusion").dispatch("click");
const cleared = () => {
    assert.equal(get("infusionConcentration").textContent, "—");
    assert.equal(get("infusionRate").textContent, "—");
};

// Observe formatter arguments without rewriting formulas or intermediate arithmetic.
// Mathematical assertions use independently specified rational constants below.
const originalFormatter = context.formatInfusionValue;
let raw = [];
context.formatInfusionValue = (value, decimals) => {
    raw.push(value);
    return originalFormatter(value, decimals);
};
function mathematics(overrides, concentration, rate) {
    set(overrides); raw = []; calculate();
    assert.equal(alerts.length, 0);
    assert.equal(raw.length, 2);
    for (const [actual, [numerator, denominator]] of [[raw[0], concentration], [raw[1], rate]]) {
        const expected = Number(numerator) / Number(denominator);
        assert.ok(Math.abs(actual - expected) <= Math.abs(expected) * 1e-14,
            `mathematical result ${actual} differs from independent ${numerator}/${denominator}`);
    }
}

// Same numeric prescription, four different unit meanings. References are
// precomputed exact rationals, not a duplicate implementation of the calculator.
const rates = [[21, 4], [3, 40], [5250, 1], [75, 1]];
for (const [i, infusionDoseType] of units.entries()) {
    mathematics({ infusionDoseType }, [2, 25], rates[i]);
}
// Equivalent prescriptions must have identical mathematical rates.
for (const [i, infusionDose] of ["0.1", "7", "0.0001", "0.007"].entries()) {
    mathematics({ infusionDoseType: units[i], infusionDose }, [2, 25], [21, 4]);
}
// Different concentration and weight; includes a repeating rational rate.
for (const [i, infusionDoseType] of units.entries()) {
    mathematics({ infusionDoseType, infusionDose: "1", infusionWeight: "3",
        infusionDrugAmount: "9", infusionFinalVolume: "1" }, [9, 1],
    [[1, 50], [1, 150], [20, 1], [20, 3]][i]);
}
for (const infusionDoseType of ["mcgmin", "mgmin"]) {
    for (const infusionWeight of ["", "NaN", "501", "0.1"]) {
        mathematics({ infusionDoseType, infusionWeight }, [2, 25],
            infusionDoseType === "mcgmin" ? [3, 40] : [75, 1]);
    }
}
console.log("PASS — independent mathematical references for all four units and equivalent prescriptions");

// Separate display snapshots document UNRESOLVED defects. They deliberately
// assert a discrepancy, not acceptable accuracy, dose suitability or pump safety.
const defects = [
    ["rate", { infusionDose: "0.005", infusionDrugAmount: "60", infusionFinalVolume: "1000" }, [3, 50], [1, 200], "0.01 mL/hr", 1],
    ["rate", { infusionDose: "0.006", infusionDrugAmount: "60", infusionFinalVolume: "1000" }, [3, 50], [3, 500], "0.01 mL/hr", 2 / 3],
    ["rate", { infusionDose: "0.0149", infusionDrugAmount: "60", infusionFinalVolume: "1000" }, [3, 50], [149, 10000], "0.01 mL/hr", -49 / 149],
    ["concentration", { infusionDose: "0.001", infusionDrugAmount: "0.5", infusionFinalVolume: "1000" }, [1, 2000], [3, 25], "0.001 mg/mL", 1],
    ["rate", {}, [2, 25], [3, 40], "0.07 mL/hr", -1 / 15]
];
for (const [field, overrides, concentration, rate, display, expectedError] of defects) {
    mathematics({ infusionDoseType: "mcgmin", ...overrides }, concentration, rate);
    const output = get(field === "rate" ? "infusionRate" : "infusionConcentration").textContent;
    assert.equal(output, display, "UNRESOLVED display defect snapshot changed: review policy explicitly");
    const reference = field === "rate" ? rate : concentration;
    const exact = reference[0] / reference[1];
    const error = (Number.parseFloat(output) - exact) / exact;
    assert.ok(Math.abs(error - expectedError) < 1e-14);
    console.log(`UNRESOLVED — mathematical ${exact} ${field} displays ${output}; relative error ${(error * 100).toFixed(2)}% (not clinically approved)`);
}

let transitions = 0;
for (const from of units) for (const to of units) {
    if (from === to) continue;
    set({ infusionDoseType: from }); calculate();
    get("infusionDoseType").value = to;
    get("infusionDoseType").dispatch("change"); cleared();
    assert.equal(get("infusionDoseUnitLabel").textContent, labels[units.indexOf(to)]);
    assert.equal(alerts.length, 0);
    raw = []; calculate();
    const [n, d] = rates[units.indexOf(to)];
    assert.ok(Math.abs(raw[1] - n / d) <= (n / d) * 1e-14);
    transitions++;
}
assert.equal(transitions, 12);

// All four units, both edit event types, and every prescription/preparation field.
for (const infusionDoseType of units) {
    for (const id of Object.keys(baseline)) for (const event of ["input", "change"]) {
        set({ infusionDoseType }); calculate();
        get(id).value = id === "infusionDoseType" ? "unsupported" : "";
        get(id).dispatch(event); cleared();
        // Weight is optional for non-weight-based prescriptions, but its edits
        // still invalidate results. Use an invalid dose for the failure step.
        if (id === "infusionWeight" && !infusionDoseType.includes("kg")) get("infusionDose").value = "";
        calculate(); assert.equal(alerts.length, 1); cleared();
        set({ infusionDoseType }); get(id).dispatch(event); cleared();
        calculate(); assert.equal(alerts.length, 0);
    }
    for (const id of ["infusionDose", "infusionDrugAmount", "infusionFinalVolume", "infusionWeight"]) {
        if (id === "infusionWeight" && !infusionDoseType.includes("kg")) continue;
        const invalid = id === "infusionWeight"
            ? ["", "0", "-1", "NaN", "Infinity", "1e309", "abc", "0.099999", "500.000001"]
            : ["", "0", "-1", "NaN", "Infinity", "1e309", "abc", "0.000000999999"];
        for (const value of invalid) {
            set({ infusionDoseType }); calculate();
            get(id).value = value; calculate(); cleared();
            assert.equal(alerts.length, 1); assert.equal(get(id).value, value);
            set({ infusionDoseType }); calculate(); assert.equal(alerts.length, 0);
        }
    }
    for (const infusionWeight of ["0.1", "500"]) {
        set({ infusionDoseType, infusionWeight, infusionDose: "0.000001",
            infusionDrugAmount: "0.000001", infusionFinalVolume: "0.000001" });
        calculate(); assert.equal(alerts.length, 0);
    }
    // A different overflow path: enormous dose with tiny finite concentration.
    set({ infusionDoseType }); calculate();
    set({ infusionDoseType, infusionDose: "1e308", infusionWeight: "1",
        infusionDrugAmount: "0.000001", infusionFinalVolume: "1" });
    calculate(); assert.deepEqual(alerts, [failure]); cleared();
    set({ infusionDoseType }); calculate(); assert.equal(alerts.length, 0);
    get("resetInfusions").dispatch("click"); cleared();
    for (const id of Object.keys(baseline).filter(id => id !== "infusionDoseType")) assert.equal(get(id).value, "");
    assert.equal(get("infusionDoseType").value, "mcgkgmin");
    assert.equal(get("infusionDoseUnitLabel").textContent, "mcg/kg/min");
    set({ infusionDoseType }); calculate();
    get("closeInfusions").dispatch("click");
    assert.equal(get("infusionRate"), undefined);
    context.openInfusionsCalculator(); cleared();
    assert.equal(get("infusionDose").value, "");
    assert.equal(get("infusionDoseType").value, "mcgkgmin");
}
for (const infusionDoseType of ["", "unsupported", "MCGMIN", "mg/hr"]) {
    set({}); calculate(); set({ infusionDoseType }); calculate();
    assert.deepEqual(alerts, [failure]); cleared();
    assert.equal(get("infusionDoseType").value, infusionDoseType);
}
console.log("PASS — 12 ordered unit transitions, invalidation, validation boundaries, overflow, reset and reopen");
