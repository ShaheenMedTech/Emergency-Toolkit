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

    context.resetInfusions(modal);
    for (const id of Object.keys(inputs)) assert.equal(elements.get(id).value, "");
    assert.equal(elements.get("infusionDoseType").value, "mcgkgmin");
    assert.equal(elements.get("infusionDoseUnitLabel").textContent, "mcg/kg/min");
    assert.equal(elements.get("infusionConcentration").textContent, "—");
    assert.equal(elements.get("infusionRate").textContent, "—");
}

console.log("PASS — infusion stale-result regression tests");
