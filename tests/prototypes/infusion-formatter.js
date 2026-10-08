"use strict";

// EXPERIMENTAL: mathematical display only. Not imported by the application.
// Six significant digits, nearest rounding of the stored binary Number;
// exact positive ties go upward, as specified for Number.toExponential.
function formatInfusionPrototype(value) {
    if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
        throw new RangeError("Prototype formatter requires a positive finite Number.");
    }

    const [mantissa, exponentText] = value.toExponential(5).split("e");
    const exponent = Number(exponentText);
    const trimmed = mantissa.replace(/\.?0+$/, "");
    // Select notation AFTER rounding, without reparsing the rounded number.
    if (exponent < -6 || exponent >= 6) {
        return `${trimmed}e${exponent >= 0 ? "+" : ""}${exponent}`;
    }

    const digits = trimmed.replace(".", "");
    const point = exponent + 1;
    if (point <= 0) return `0.${"0".repeat(-point)}${digits}`;
    if (point >= digits.length) return digits + "0".repeat(point - digits.length);
    return `${digits.slice(0, point)}.${digits.slice(point)}`;
}

module.exports = { formatInfusionPrototype };
