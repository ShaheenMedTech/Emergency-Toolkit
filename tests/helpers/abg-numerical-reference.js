const assert = require("node:assert/strict");
const vm = require("node:vm");

// Decimal/exponent parser uses integers exclusively; no production arithmetic.
function decimal(text) {
    const match = /^([+-]?)(\d+)(?:\.(\d*))?(?:e([+-]?\d+))?$/i.exec(String(text));
    assert.ok(match, `Finite decimal reference required: ${text}`);
    const fraction = match[3] || "";
    const power = Number(match[4] || 0) - fraction.length;
    const n = BigInt(match[2] + fraction) * (match[1] === "-" ? -1n : 1n);
    return power >= 0 ? [n * 10n ** BigInt(power), 1n] : [n, 10n ** BigInt(-power)];
}
const add = ([a, b], [c, d]) => [a * d + c * b, b * d];
const negate = ([a, b]) => [-a, b];
const equal = ([a, b], [c, d]) => a * d === c * b;
const gap = (na, cl, hco3) => add(add(decimal(na), negate(decimal(cl))), negate(decimal(hco3)));
function binary(value) {
    assert.ok(Number.isFinite(value));
    const data = new DataView(new ArrayBuffer(8)); data.setFloat64(0, value);
    const bits = data.getBigUint64(0), exponent = Number((bits >> 52n) & 2047n);
    const significand = (bits & ((1n << 52n) - 1n)) + (exponent ? 1n << 52n : 0n);
    const n = (bits >> 63n ? -1n : 1n) * significand;
    const power = exponent ? exponent - 1075 : -1074;
    return power >= 0 ? [n << BigInt(power), 1n] : [n, 1n << BigInt(-power)];
}
function assertRawGap(raw, reference, inputs) {
    // Conservative operand-scale engineering bound for input conversion and two
    // operations. This is NOT a clinical tolerance or a production rounding policy.
    const allowance = 8 * Number.EPSILON * Math.max(...inputs.map(value => Math.abs(Number(value))));
    const [n, d] = add(binary(raw), negate(reference));
    const [a, b] = binary(allowance);
    assert.ok((n < 0n ? -n : n) * b <= a * d, `Raw gap exceeds engineering error allowance: ${raw}`);
}
function observeRawGap(context) {
    context.rawGaps = [];
    // Observe the Number passed to the existing formatter without altering it.
    // Exactly one call at precision 1 is required by the caller for valid results.
    vm.runInContext(`const originalToFixed = Number.prototype.toFixed;
        Number.prototype.toFixed = function(digits) {
            if (digits === 1) rawGaps.push(this.valueOf());
            return originalToFixed.call(this, digits);
        };`, context);
    return context.rawGaps;
}
module.exports = { decimal, equal, gap, assertRawGap, observeRawGap };
