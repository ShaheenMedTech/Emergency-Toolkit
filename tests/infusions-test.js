const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(
    path.join(__dirname, "..", "js", "calculators", "infusions.js"), "utf8"
);

for (const [doseType, expectedRate] of [
    ["mcgkgmin", "5.25 mL/hr"], ["mcgmin", "0.07 mL/hr"],
    ["mgkgmin", "5250.00 mL/hr"], ["mgmin", "75.00 mL/hr"]
]) {
    const inputs = {
        infusionWeight: "70", infusionDose: "0.1",
        infusionDrugAmount: "4", infusionFinalVolume: "50"
    };
    const elements = new Map(Object.entries({
        ...inputs, infusionDoseType: doseType, infusionDoseUnitLabel: "",
        infusionConcentration: "", infusionRate: ""
    }).map(([id, value]) => [id, { value, textContent: "" }]));
    const modal = {
        querySelector: selector => elements.get(selector.slice(1)),
        querySelectorAll: () => Object.keys(inputs).map(id => elements.get(id))
    };
    const alerts = [];
    const context = { alert: message => alerts.push(message) };
    vm.createContext(context);
    vm.runInContext(source, context);

    function assertValidResult() {
        assert.equal(elements.get("infusionConcentration").textContent, "0.080 mg/mL");
        assert.equal(elements.get("infusionRate").textContent, expectedRate);
    }

    for (const id of Object.keys(inputs)) {
        if (id === "infusionWeight" && !doseType.includes("kg")) continue;
        for (const invalidValue of ["", "-1", "Infinity"]) {
            context.calculateInfusion(modal);
            assertValidResult();
            elements.get(id).value = invalidValue;
            alerts.length = 0;
            context.calculateInfusion(modal);
            assert.equal(alerts.length, 1);
            assert.equal(elements.get("infusionConcentration").textContent, "—");
            assert.equal(elements.get("infusionRate").textContent, "—");
            assert.equal(elements.get(id).value, invalidValue);
            elements.get(id).value = inputs[id];
            context.calculateInfusion(modal);
            assertValidResult();
        }
    }

    if (!doseType.includes("kg")) {
        elements.get("infusionWeight").value = "";
        alerts.length = 0;
        context.calculateInfusion(modal);
        assert.equal(alerts.length, 0);
        assertValidResult();
    }

    function setInputs(overrides = {}) {
        for (const [id, value] of Object.entries({ ...inputs, ...overrides })) {
            elements.get(id).value = String(value);
        }
        alerts.length = 0;
    }

    const numericFailures = [
        // Finite required dose divided by overflowed concentration becomes zero.
        ["concentration overflow", {
            infusionDose: 1, infusionDrugAmount: 1e308, infusionFinalVolume: 0.1
        }],
        ["division overflow", {
            infusionDose: 1, infusionWeight: 1,
            infusionDrugAmount: 1e-6, infusionFinalVolume: 1e308
        }],
        ["final multiplication overflow", {
            infusionDose: doseType.startsWith("mcg") ? 1e308 : 1e307,
            infusionWeight: 1,
            infusionDrugAmount: doseType.startsWith("mcg") ? 0.01 : 1,
            infusionFinalVolume: 1
        }]
    ];
    if (doseType.includes("kg")) {
        numericFailures.push(
            ["required dose/intermediate overflow with representable final rate", {
                infusionDose: 1e308, infusionWeight: 100,
                infusionDrugAmount: 1e308, infusionFinalVolume: 1
            }],
            ["Infinity divided by Infinity produces NaN", {
                infusionDose: 1e308, infusionWeight: 100,
                infusionDrugAmount: 1e308, infusionFinalVolume: 0.1
            }]
        );
    }

    for (const [name, overrides] of numericFailures) {
        setInputs();
        context.calculateInfusion(modal);
        assertValidResult();
        setInputs(overrides);
        context.calculateInfusion(modal);
        assert.deepEqual(alerts, [
            "The entered values produce a result outside the calculator's supported numeric range. Please check the values and units."
        ], `${doseType}: ${name}`);
        assert.equal(elements.get("infusionConcentration").textContent, "—", name);
        assert.equal(elements.get("infusionRate").textContent, "—", name);
        for (const [id, value] of Object.entries(overrides)) {
            assert.equal(elements.get(id).value, String(value), name);
        }
        setInputs();
        context.calculateInfusion(modal);
        assert.equal(alerts.length, 0);
        assertValidResult();
    }

    setInputs({
        infusionDose: 1, infusionWeight: 1,
        infusionDrugAmount: 0.01, infusionFinalVolume: 100
    });
    context.calculateInfusion(modal);
    assert.equal(alerts.length, 0);
    assert.equal(elements.get("infusionConcentration").textContent, "1e-4 mg/mL");
    assert.equal(elements.get("infusionRate").textContent,
        doseType.startsWith("mcg") ? "600.00 mL/hr" : "600000.00 mL/hr");

    setInputs({
        infusionDose: 0.01, infusionWeight: 1,
        infusionDrugAmount: 1000, infusionFinalVolume: 1
    });
    context.calculateInfusion(modal);
    assert.equal(alerts.length, 0);
    assert.equal(elements.get("infusionConcentration").textContent, "1000.000 mg/mL");
    assert.equal(elements.get("infusionRate").textContent,
        doseType.startsWith("mcg") ? "6e-7 mL/hr" : "6e-4 mL/hr");

    // With accepted input minima and finite concentration, the smallest
    // required dose / largest concentration remains nonzero (about 5.6e-319).
    // Exercise subnormal arithmetic; genuine underflow to zero is unreachable.
    setInputs({
        infusionDose: 1e-6, infusionWeight: 0.1,
        infusionDrugAmount: Number.MAX_VALUE, infusionFinalVolume: 1
    });
    context.calculateInfusion(modal);
    assert.equal(alerts.length, 0);
    const tinyRate = elements.get("infusionRate").textContent;
    assert.match(tinyRate, /e-\d+ mL\/hr$/);
    assert.ok(Number.parseFloat(tinyRate) > 0);
    assert.ok(Number.parseFloat(tinyRate) < 1e-300);

    for (const [value, decimals, expected] of [
        [0.004999999999999999, 2, "5e-3"],
        [0.005, 2, "0.01"],
        [0.005000000000000001, 2, "0.01"],
        [0.0004999999999999999, 3, "5e-4"],
        [0.0005, 3, "0.001"],
        [0.0005000000000000001, 3, "0.001"],
        [0.0001234, 3, "1.234e-4"],
        [0.000123456789, 3, "1.23457e-4"],
        [Number.MIN_VALUE, 2, "4.94066e-324"],
        [Number.MIN_VALUE, 3, "4.94066e-324"]
    ]) {
        assert.equal(context.formatInfusionValue(value, decimals), expected);
    }

    context.resetInfusions(modal);
    for (const id of Object.keys(inputs)) assert.equal(elements.get(id).value, "");
    assert.equal(elements.get("infusionDoseType").value, "mcgkgmin");
    assert.equal(elements.get("infusionDoseUnitLabel").textContent, "mcg/kg/min");
    assert.equal(elements.get("infusionConcentration").textContent, "—");
    assert.equal(elements.get("infusionRate").textContent, "—");
}

console.log("PASS — infusion stale-result and numeric-output safety regression tests");
