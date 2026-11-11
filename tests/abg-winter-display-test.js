const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const elements = new Map();
const baseline = { abgPH: "7.29", abgPCO2: "30", abgHCO3: "15.1", abgPaO2: "80", abgNa: "140", abgCl: "110" };
for (const [id, value] of Object.entries(baseline)) elements.set(id, { value });
for (const id of ["abgAG", "abgPrimary", "abgCompensation", "abgOxygen"]) elements.set(id, { textContent: "" });
const alerts = [];
const context = { document: { getElementById: id => elements.get(id) }, alert: message => alerts.push(message) };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/calculators/acid-base.js"), "utf8"), context);
const appropriate = "Appropriate respiratory compensation.";
const alkalosis = "Additional respiratory alkalosis.";
const acidosis = "Additional respiratory acidosis.";
function calculate(hco3, pco2, expectedClassification) {
    elements.get("abgHCO3").value = String(hco3);
    elements.get("abgPCO2").value = String(pco2);
    alerts.length = 0;
    context.calculateABG();
    assert.equal(alerts.length, 0);
    const text = elements.get("abgCompensation").textContent;
    const match = /^(.*?) Expected PaCO₂ interval ([\d.e+-]+)–([\d.e+-]+) mmHg \(inclusive\)$/.exec(text);
    assert.ok(match, text);
    assert.ok(!text.includes("±"), "Do not reconstruct an interval from a rounded midpoint");
    const lower = Number(match[2]);
    const upper = Number(match[3]);
    const classificationFromDisplay = Number(pco2) < lower ? alkalosis : Number(pco2) > upper ? acidosis : appropriate;
    assert.equal(match[1], classificationFromDisplay, "Displayed inclusive bounds must agree with raw classification");
    if (expectedClassification) assert.equal(match[1], expectedClassification);
    return { lower, upper, text };
}
const buffer = new ArrayBuffer(8);
const view = new DataView(buffer);
function neighbor(value, direction) {
    view.setFloat64(0, value);
    view.setBigUint64(0, view.getBigUint64(0) + BigInt(direction));
    return view.getFloat64(0);
}
let cases = 0;
// Precomputed independent rational bounds; not expectations derived with production arithmetic.
for (const [hco3, lowerFraction, upperFraction] of [
    [1, [15, 2], [23, 2]], [12, [24, 1], [28, 1]],
    [15.1, [573, 20], [653, 20]], [15.25, [231, 8], [263, 8]],
    [21.5, [153, 4], [169, 4]], [21.9, [777, 20], [857, 20]]
]) {
    const expectedLower = lowerFraction[0] / lowerFraction[1];
    const expectedUpper = upperFraction[0] / upperFraction[1];
    for (const [pco2, label] of [
        [expectedLower - 0.000001, alkalosis], [expectedLower + 0.000001, appropriate],
        [expectedUpper - 0.000001, appropriate], [expectedUpper + 0.000001, acidosis]
    ]) {
        const result = calculate(hco3, pco2, label);
        assert.ok(Math.abs(result.lower - expectedLower) <= expectedLower * 1e-14);
        assert.ok(Math.abs(result.upper - expectedUpper) <= expectedUpper * 1e-14);
        cases++;
    }
    const { lower, upper } = calculate(hco3, expectedLower + 1);
    // Independently check inclusivity and adjacent binary values of displayed/raw bounds.
    for (const [pco2, label] of [
        [neighbor(lower, -1), alkalosis], [lower, appropriate], [neighbor(lower, 1), appropriate],
        [neighbor(upper, -1), appropriate], [upper, appropriate], [neighbor(upper, 1), acidosis]
    ]) { calculate(hco3, pco2, label); cases++; }
}
assert.equal(calculate(15.1, 32.63, appropriate).text,
    "Appropriate respiratory compensation. Expected PaCO₂ interval 28.65–32.65 mmHg (inclusive)");
assert.equal(calculate(15.1, 28.63, alkalosis).text,
    "Additional respiratory alkalosis. Expected PaCO₂ interval 28.65–32.65 mmHg (inclusive)");
// Frozen pre-change classification fixtures: preserve binary arithmetic artifacts.
calculate(21.9, 38.85, appropriate);
calculate(21.9, 42.85, acidosis);
// Many accepted fractional inputs: check all categories against displayed bounds.
for (const hco3 of [1.000000000001, 12.3456789, 15.100000000000001, 21.999999999999996]) {
    const { lower, upper } = calculate(hco3, 30);
    for (const pco2 of [neighbor(lower, -1), lower, neighbor(lower, 1), neighbor(upper, -1), upper, neighbor(upper, 1)]) {
        calculate(hco3, pco2); cases++;
    }
}
// Preserve the existing gate rather than adding new diagnostic algorithms.
for (const [pH, hco3] of [[7.35, 15.1], [7.45, 15.1], [7.29, 22]]) {
    elements.get("abgPH").value = String(pH); elements.get("abgHCO3").value = String(hco3);
    context.calculateABG();
    assert.equal(elements.get("abgCompensation").textContent, "No specific compensation formula applied.");
}
console.log(`PASS — Winter independent rational bounds, ${cases} boundary checks, fractional regressions, preserved raw classifications and gate`);
