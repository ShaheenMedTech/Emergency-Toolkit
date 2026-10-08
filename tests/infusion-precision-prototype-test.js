"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { formatInfusionPrototype: format } = require("./prototypes/infusion-formatter");

// Independent exact-rational oracle: decode IEEE-754 bits and parse decimal text.
// No production formatter or floating-point subtraction is used for error bounds.
const buffer = new ArrayBuffer(8);
const view = new DataView(buffer);
function bits(value) { view.setFloat64(0, value); return view.getBigUint64(0); }
function numberFromBits(value) { view.setBigUint64(0, value); return view.getFloat64(0); }
const nextDown = value => numberFromBits(bits(value) - 1n);
const nextUp = value => numberFromBits(bits(value) + 1n);
function binaryRational(value) {
    const encoding = bits(value);
    const exponent = Number((encoding >> 52n) & 2047n);
    const fraction = encoding & ((1n << 52n) - 1n);
    const numerator = exponent === 0 ? fraction : (1n << 52n) + fraction;
    const power = exponent === 0 ? -1074 : exponent - 1023 - 52;
    return power < 0 ? [numerator, 1n << BigInt(-power)] : [numerator << BigInt(power), 1n];
}
function decimalRational(text) {
    const match = /^(\d+)(?:\.(\d+))?(?:e([+-]?\d+))?$/.exec(text);
    assert.ok(match, `invalid decimal representation: ${text}`);
    const fraction = match[2] || "";
    const numerator = BigInt(match[1] + fraction);
    const power = Number(match[3] || 0) - fraction.length;
    return power < 0 ? [numerator, 10n ** BigInt(-power)] : [numerator * 10n ** BigInt(power), 1n];
}
function error(display, reference) {
    const [a, b] = decimalRational(display);
    const [n, d] = reference;
    const difference = a * d - n * b;
    return [difference < 0n ? -difference : difference, b * n];
}
// Check oracle endpoints independently against explicit binary mathematical values.
assert.deepEqual(binaryRational(Number.MIN_VALUE), [1n, 1n << 1074n]);
assert.deepEqual(binaryRational(Number.MAX_VALUE), [((1n << 53n) - 1n) << 971n, 1n]);
function approximateRatio([n, d]) { return Number((n * 10n ** 18n) / d) / 1e18; }
let worst = { relativeError: 0 };
let samples = 0;
function verify(value, expected) {
    const output = format(value);
    if (expected !== undefined) assert.equal(output, expected);
    const rational = decimalRational(output);
    assert.ok(rational[0] > 0n, "positive input must never display zero");
    const mantissa = output.split("e")[0];
    assert.ok(mantissa.replace(".", "").replace(/^0+|0+$/g, "").length <= 6);
    if (mantissa.includes(".")) assert.ok(!mantissa.endsWith("0"));
    if (!output.includes("e")) {
        assert.ok(rational[0] * 1000000n >= rational[1]);
        assert.ok(rational[0] < rational[1] * 1000000n);
    } else {
        assert.match(output, /^[1-9](?:\.\d*[1-9])?e(?:\+[1-9]\d*|-[1-9]\d*)$/);
        assert.ok(rational[0] * 1000000n < rational[1] || rational[0] >= rational[1] * 1000000n);
    }
    const measured = error(output, binaryRational(value));
    // Exact comparison to candidate 5e-6 relative FORMATTING error, not dosing accuracy.
    assert.ok(measured[0] * 200000n <= measured[1], `accuracy target missed: ${value} -> ${output}`);
    const relativeError = approximateRatio(measured);
    if (relativeError > worst.relativeError) worst = { value, output, relativeError };
    samples++;
    return output;
}

// Independently specified decimal/rational mathematical references for known defects.
const references = [
    [0.005, [1n, 200n], "0.005", 2],
    [0.006, [3n, 500n], "0.006", 2],
    [0.0149, [149n, 10000n], "0.0149", 2],
    [0.075, [3n, 40n], "0.075", 2],
    [0.0005, [1n, 2000n], "0.0005", 3]
];
const legacy = {};
vm.createContext(legacy);
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/calculators/infusions.js"), "utf8"), legacy);
for (const [value, reference, expected, decimals] of references) {
    const prototype = verify(value, expected);
    assert.equal(error(prototype, reference)[0], 0n);
    const current = legacy.formatInfusionValue(value, decimals);
    console.log(`COMPARE — ${value}: current=${current}, prototype=${prototype}, current absolute relative error=${(approximateRatio(error(current, reference)) * 100).toFixed(6)}%, prototype=0% against independent reference`);
}

// Exactly representable binary tie: 79/64 = 1.234375; adjacent doubles straddle it.
const [tieNumerator, tieDenominator] = binaryRational(1.234375);
assert.equal(tieNumerator * 64n, tieDenominator * 79n);
verify(nextDown(1.234375), "1.23437");
verify(1.234375, "1.23438");
verify(nextUp(1.234375), "1.23438");
// Decimal-looking ties follow the stored binary value, not the typed decimal intent.
verify(1.000005, "1.00001");
verify(nextDown(1.000005), "1");
verify(1.234565, "1.23456");
verify(nextUp(1.234565), "1.23457");
for (const [value, expected] of [
    [1e-7, "1e-7"], [1e-6, "0.000001"], [1e-5, "0.00001"],
    [1, "1"], [10, "10"], [100000, "100000"], [1e6, "1e+6"], [1e21, "1e+21"],
    [0.0000009999994, "9.99999e-7"], [0.0000009999996, "0.000001"],
    [999999.4, "999999"], [999999.6, "1e+6"],
    [9.999994, "9.99999"], [9.999996, "10"],
    [Number.MIN_VALUE, "4.94066e-324"], [Number.MAX_VALUE, "1.79769e+308"],
    [0.000123456789, "0.000123457"]
]) verify(value, expected);
for (const [value, reference, expected] of [
    [1 / 3, [1n, 3n], "0.333333"],
    [123456789, [123456789n, 1n], "1.23457e+8"]
]) {
    const measured = error(verify(value, expected), reference);
    assert.ok(measured[0] * 200000n <= measured[1]);
}
for (const boundary of [1e-6, 1e6, 1e21, 2 ** -1022, Number.MAX_VALUE]) {
    verify(nextDown(boundary)); verify(boundary);
    if (Number.isFinite(nextUp(boundary))) verify(nextUp(boundary));
}
for (let exponent = -323; exponent <= 308; exponent++) {
    for (const coefficient of [1, 1.000005, 1.234375, 9.999995]) {
        const value = Number(`${coefficient}e${exponent}`);
        if (Number.isFinite(value) && value > 0) {
            verify(value); if (nextDown(value) > 0) verify(nextDown(value));
            if (Number.isFinite(nextUp(value))) verify(nextUp(value));
        }
    }
}
// Reproducible bit-pattern coverage, including normals and subnormals.
let seed = 0x123456789abcdefn;
for (let i = 0; i < 2000; i++) {
    seed = (seed * 6364136223846793005n + 1442695040888963407n) & ((1n << 63n) - 1n);
    const value = numberFromBits(seed);
    if (Number.isFinite(value) && value > 0) verify(value);
}
for (const value of [0, -0, -1, NaN, Infinity, -Infinity, nextUp(Number.MAX_VALUE), 1e309,
    "0.005", null, undefined]) assert.throws(() => format(value), RangeError);

// Formatting is accurate to its raw input, but cannot restore arithmetic precision.
// The smallest accepted weighted microgram input / MAX concentration causes
// subnormal mL/min arithmetic. Its exact independent mathematical rate is
// (3 / 500000000) / MAX_VALUE; compare it separately from display error.
const subnormalRate = ((1e-6 * 0.1) / 1000 / Number.MAX_VALUE) * 60;
const [maxNumerator, maxDenominator] = binaryRational(Number.MAX_VALUE);
const subnormalReference = [3n * maxDenominator, 500000000n * maxNumerator];
const subnormalDisplay = verify(subnormalRate);
console.log(`LIMITATION — subnormal arithmetic example: ${subnormalDisplay}; total error versus exact mathematical reference=${approximateRatio(error(subnormalDisplay, subnormalReference))}`);
// Explicit counterexample: an upstream rounded subnormal loses input precision.
// Exact 2^-1075 rounds to zero (ties-to-even); the prototype rejects zero.
assert.equal(Number.MIN_VALUE / 2, 0);
assert.throws(() => format(Number.MIN_VALUE / 2), RangeError);
// Exact 3*2^-1075 rounds to 2*MIN_VALUE, producing about 1/3 total relative error.
const underflowReference = [3n, 1n << 1075n];
const quantized = Number.MIN_VALUE * 1.5;
const quantizedDisplay = verify(quantized);
assert.ok(error(quantizedDisplay, underflowReference)[0] * 200000n > error(quantizedDisplay, underflowReference)[1]);
console.log(`TARGET NOT ACHIEVED for mathematical total error — upstream subnormal quantization: ${quantizedDisplay}, relative error=${approximateRatio(error(quantizedDisplay, underflowReference))}; not reachable through current accepted infusion minima`);
console.log(`PASS — ${samples} finite-value formatting checks, exact rational error bound <=5e-6; worst sampled=${JSON.stringify(worst)}; ties, invalid/overflow and underflow checks passed`);
