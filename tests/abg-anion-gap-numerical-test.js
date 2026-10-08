const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { decimal, equal, gap, assertRawGap, observeRawGap } = require("./helpers/abg-numerical-reference");
const ids = ["abgPH", "abgPCO2", "abgHCO3", "abgPaO2", "abgNa", "abgCl"];
const outputs = ["abgAG", "abgPrimary", "abgCompensation", "abgOxygen"];
const elements = new Map([...ids, ...outputs].map(id => [id, { value: "", textContent: "—" }]));
const alerts = [];
const context = { document: { getElementById: id => elements.get(id) }, alert: text => alerts.push(text) };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/calculators/acid-base.js"), "utf8"), context);
const observed = observeRawGap(context);
function calculate(inputs) {
    ids.forEach((id, i) => elements.get(id).value = inputs[i]);
    alerts.length = 0; observed.length = 0; context.calculateABG();
}
// Literal independently evaluated decimal differences, followed by recorded
// binary/raw and display snapshots. Neither snapshots nor labels approve policy.
const vectors = [
    ["140", "105", "21.15", "13.85", 13.849999999999994, "13.8"],
    ["140", "105", "21.149999999999995", "13.850000000000005", 13.850000000000009, "13.9"],
    ["140", "105", "21.150000000000002", "13.849999999999998", 13.849999999999994, "13.8"],
    ["140", "105", "21.14999999999999", "13.85000000000001", 13.850000000000009, "13.9"],
    ["140", "105", "21.15000000000001", "13.84999999999999", 13.849999999999994, "13.8"],
    ["140", "105", "21.05", "13.95", 13.950000000000003, "14.0"],
    ["140", "105", "21.25", "13.75", 13.75, "13.8"],
    ["80", "80", "1.15", "-1.15", -1.1500000000000057, "-1.2"],
    ["80", "80", "1.25", "-1.25", -1.25, "-1.3"],
    ["140", "119", "20.99999999999997", "3e-14", 2.842170943040401e-14, "0.0"],
    ["140", "119", "21.00000000000003", "-3e-14", -2.842170943040401e-14, "-0.0"],
    ["140", "119", "21", "0", 0, "0.0"],
    ["220", "40", "1", "179", 179, "179.0"],
    ["80", "180", "60", "-160", -160, "-160.0"]
];
for (const [na, cl, hco3, exact, rawSnapshot, display] of vectors) {
    const reference = gap(na, cl, hco3);
    assert.ok(equal(reference, decimal(exact)), "Independent literal mathematical reference");
    calculate(["7.4", "40", hco3, "80", na, cl]);
    assert.equal(alerts.length, 0); assert.equal(observed.length, 1);
    assertRawGap(observed[0], reference, [na, cl, hco3]);
    assert.equal(observed[0], rawSnapshot, "Current binary snapshot — not exact arithmetic");
    assert.equal(elements.get("abgAG").textContent, display, "Current display snapshot — not approved rounding");
}
// Oracle sensitivity: catch an arithmetic error hidden by unchanged one-decimal display.
assert.equal((13.849999999999994 - 0.001).toFixed(1), "13.8");
assert.throws(() => assertRawGap(13.849999999999994 - 0.001, decimal("13.85"), ["140", "105", "21.15"]));
// Wide finite references exercise only the test oracle, never bypass production validation.
assert.ok(equal(gap("1e308", "1e308", "5e-324"), decimal("-5e-324")));
assert.ok(equal(gap("1e308", "0", "0"), decimal("1e308")));
const valid = ["7.4", "40", "21.15", "80", "140", "105"];
let invalidCases = 0;
for (let field = 0; field < ids.length; field++) {
    for (const invalid of ["", "NaN", "Infinity", "-Infinity", "not-a-number", "1e309", "1e308", "5e-324", "1e-324"]) {
        calculate(valid); assert.equal(observed.length, 1);
        const inputs = [...valid]; inputs[field] = invalid; calculate(inputs);
        assert.equal(alerts.length, 1); assert.equal(observed.length, 0, "Invalid data never reaches gap formatter");
        outputs.forEach(id => assert.equal(elements.get(id).textContent, "—", "Failure clears every prior result"));
        assert.deepEqual(ids.map(id => elements.get(id).value), inputs);
        calculate(valid); assert.equal(elements.get("abgAG").textContent, "13.8"); invalidCases++;
    }
}
// Exact endpoints accepted; immediate exterior binary values rejected, including range ties.
const ranges = [[6.5, 8], [5, 150], [1, 60], [1, 500], [80, 220], [40, 180]];
function neighbor(value, direction) {
    const view = new DataView(new ArrayBuffer(8)); view.setFloat64(0, value);
    view.setBigUint64(0, view.getBigUint64(0) + BigInt(direction)); return view.getFloat64(0);
}
for (let field = 0; field < ids.length; field++) {
    for (const [value, accepted] of [[ranges[field][0], true], [ranges[field][1], true], [neighbor(ranges[field][0], -1), false], [neighbor(ranges[field][1], 1), false]]) {
        calculate(valid); const inputs = [...valid]; inputs[field] = String(value); calculate(inputs);
        assert.equal(alerts.length, accepted ? 0 : 1);
        assert.equal(observed.length, accepted ? 1 : 0);
        if (!accepted) outputs.forEach(id => assert.equal(elements.get(id).textContent, "—"));
    }
}
console.log(`PASS — ${vectors.length} independent gap vectors, binary/display snapshots, ${invalidCases} invalid/recovery transitions, 24 input boundaries and oracle sensitivity; numerical policies remain PENDING`);
