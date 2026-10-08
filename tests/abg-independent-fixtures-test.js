const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const fixtures = require("./fixtures/abg-baseline-fixtures");
const { observeRawGap, assertRawGap } = require("./helpers/abg-numerical-reference");
const elements = new Map();
const outputs = ["abgAG", "abgPrimary", "abgCompensation", "abgOxygen"];
for (const id of [...fixtures.ids, ...outputs]) elements.set(id, { value: "", textContent: "" });
const alerts = [];
const context = { document: { getElementById: id => elements.get(id) }, alert: message => alerts.push(message) };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/calculators/acid-base.js"), "utf8"), context);
const rawGaps = observeRawGap(context);
const get = id => elements.get(id);
const calculate = inputs => {
    fixtures.ids.forEach((id, i) => get(id).value = inputs[i]);
    alerts.length = 0; rawGaps.length = 0; context.calculateABG();
};
const limitation = "PaO₂ alone is not a standalone oxygenation assessment. Interpret with appropriate clinical and contextual information, including FiO₂, oxygen-delivery device, sample type, and local protocol.";

// Exact rational arithmetic over decimal inputs, independent of JavaScript's
// production Number arithmetic and classification branches.
function decimal(text) {
    const [integer, fraction = ""] = String(text).split(".");
    const negative = integer.startsWith("-");
    const magnitude = BigInt(integer.replace("-", "") + fraction);
    return [negative ? -magnitude : magnitude, 10n ** BigInt(fraction.length)];
}
const add = ([a, b], [c, d]) => [a * d + c * b, b * d];
const scale = ([a, b], n, d = 1n) => [a * n, b * d];
const equalRational = ([a, b], [c, d]) => a * d === c * b;
const asNumber = ([a, b]) => Number(a) / Number(b);
function gapReference(inputs) {
    // Charge difference evaluated exactly with rational arithmetic.
    return add(add(decimal(inputs[4]), scale(decimal(inputs[5]), -1n)), scale(decimal(inputs[2]), -1n));
}
function winterReference(hco3) {
    // Solve the independent linear endpoint equations 2L=3H+12, 2U=3H+20.
    const h = scale(decimal(hco3), 3n);
    return [scale(add(h, [12n, 1n]), 1n, 2n), scale(add(h, [20n, 1n]), 1n, 2n)];
}
// Frozen current-display snapshots are not an exact-decimal rounding policy.
const gapDisplays = {
    "140/100/12": "28.0", "140/90/48": "2.0", "140/105/27": "8.0",
    "140/100/21.8": "18.2", "140/105/12": "23.0", "140/110/15.1": "14.9",
    "140/105/21.9": "13.1", "140/105/21.999999": "13.0", "140/105/22": "13.0",
    "140/105/22.000001": "13.0", "140/105/25.999999": "9.0", "140/105/26": "9.0",
    "140/105/26.000001": "9.0", "140/105/24": "11.0", "140/105/20": "15.0",
    "140/105/30": "5.0", "140/105/1": "34.0", "140/105/9.25": "25.8",
    "140/105/15.1": "19.9", "140/105/15.25": "19.8", "140/105/21.8": "13.2"
};
function checkGap(inputs) {
    assert.equal(rawGaps.length, 1, "Observe exactly one raw gap before formatting");
    assertRawGap(rawGaps[0], gapReference(inputs), [inputs[4], inputs[5], inputs[2]]);
    const snapshot = gapDisplays[[inputs[4], inputs[5], inputs[2]].join("/")];
    assert.notEqual(snapshot, undefined, "Explicit current-display snapshot required");
    assert.equal(get("abgAG").textContent, snapshot, "BASELINE DISPLAY ONLY — not clinical rounding approval");
}
function checkWinterMath(hco3) {
    const match = /interval ([\d.e+-]+)–([\d.e+-]+) mmHg \(inclusive\)/.exec(get("abgCompensation").textContent);
    assert.ok(match, "Expected explicit baseline Winter bounds");
    const references = winterReference(hco3);
    references.forEach((reference, i) => {
        const expected = asNumber(reference);
        // Engineering allowance for binary representation only; NOT a clinical
        // consistency tolerance, diagnostic acceptance range, or threshold change.
        assert.ok(Math.abs(Number(match[i + 1]) - expected) <= Math.abs(expected) * 8 * Number.EPSILON);
    });
}

// Arithmetic assertions are separate from baseline clinical-label snapshots.
for (const fixture of fixtures.examples) {
    if (fixture.id === "E9") calculate(fixtures.examples[6].inputs); // prove populated-result failure clearing
    calculate(fixture.inputs);
    if (fixture.alert) {
        assert.deepEqual(alerts, [fixture.alert]);
        for (const id of outputs) assert.equal(get(id).textContent, "—");
    } else {
        assert.equal(alerts.length, 0);
        assert.ok(equalRational(gapReference(fixture.inputs), decimal(fixture.gap)));
        checkGap(fixture.inputs);
        // Snapshot only: current labels are not approved diagnostic expectations.
        assert.equal(get("abgPrimary").textContent, fixture.primary, `${fixture.id} BASELINE ONLY`);
        assert.equal(get("abgCompensation").textContent, fixture.compensation, `${fixture.id} BASELINE ONLY`);
        assert.equal(get("abgOxygen").textContent, `PaO₂: ${fixture.inputs[3]} mmHg — ${limitation}`);
        assert.doesNotMatch(get("abgOxygen").textContent, /Low PaO₂|Within typical range|Elevated PaO₂/);
        if (["E5", "E7", "E8"].includes(fixture.id)) checkWinterMath(fixture.inputs[2]);
    }
    assert.deepEqual(fixtures.ids.map(id => get(id).value), fixture.inputs);
    console.log(`BASELINE ONLY — ${fixture.id}; PENDING ${fixture.pending}`);
}

for (const row of fixtures.primaryBoundaries) {
    const inputs = [...row.slice(0, 3), "80", "140", "105"];
    calculate(inputs); assert.equal(alerts.length, 0); checkGap(inputs);
    assert.equal(get("abgPrimary").textContent, row[3], "Synthetic primary boundary snapshot; NOT clinical approval");
}

// Verify all three Winter classifications against precomputed rational endpoints.
let winterCases = 0;
for (const reference of fixtures.winterReferences) {
    const [lower, upper] = winterReference(reference.hco3);
    assert.ok(equalRational(lower, decimal(reference.lower)));
    assert.ok(equalRational(upper, decimal(reference.upper)));
    for (const [pco2, prefix] of [
        [asNumber(add(lower, [-1n, 1000000n])), "Additional respiratory alkalosis."],
        [asNumber(add(lower, [1n, 1000000n])), "Appropriate respiratory compensation."],
        [asNumber(add(upper, [-1n, 1000000n])), "Appropriate respiratory compensation."],
        [asNumber(add(upper, [1n, 1000000n])), "Additional respiratory acidosis."]
    ]) {
        const inputs = ["7.29", String(pco2), reference.hco3, "80", "140", "105"];
        calculate(inputs); checkWinterMath(reference.hco3); checkGap(inputs);
        assert.ok(get("abgCompensation").textContent.startsWith(prefix)); winterCases++;
    }
}
// E6 is accepted today despite an independently documented inconsistent buffer ratio.
// The equation is a reference observation; no clinical rejection tolerance is defined.
const e6 = fixtures.examples.find(f => f.id === "E6");
const denominator = scale(decimal(e6.inputs[1]), 3n, 100n);
const bicarbonate = decimal(e6.inputs[2]);
const ratio = [bicarbonate[0] * denominator[1], bicarbonate[1] * denominator[0]];
assert.ok(equalRational(ratio, [5n, 1n]));
const referencePH = 6.1 + Math.log10(asNumber(ratio));
assert.equal(referencePH.toFixed(2), "6.80");
calculate(e6.inputs); assert.equal(alerts.length, 0);
assert.equal(get("abgPrimary").textContent, e6.primary, "Document accepted inconsistency; do not approve the diagnosis");

// Mandatory oxygen data remains baseline behavior, including upper software bound.
calculate([...fixtures.examples[0].inputs.slice(0, 3), "501", "140", "100"]);
assert.deepEqual(alerts, ["PaO₂ must be between 1 and 500."]);
for (const id of outputs) assert.equal(get(id).textContent, "—");
console.log(`PASS — E1–E9 baseline fixtures, ${fixtures.primaryBoundaries.length} primary boundaries, ${winterCases} independent Winter checks, exact gap arithmetic and oxygenation safety; clinical decisions remain PENDING`);
