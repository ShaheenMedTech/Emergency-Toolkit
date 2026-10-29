const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

// Exercise the actual dialog event registrations without adding dependencies.
function openCalculator(file, openFunction) {
    const elements = new Map();
    const controls = [];
    const alerts = [];
    function element(tag = "div") {
        let text = "";
        const listeners = new Map();
        return {
            tag, value: "",
            get textContent() { return text; },
            set textContent(value) { text = String(value); },
            addEventListener(type, handler) {
                if (!listeners.has(type)) listeners.set(type, []);
                listeners.get(type).push(handler);
            },
            dispatch(type) {
                for (const handler of listeners.get(type) || []) {
                    handler({ target: this });
                }
            },
            focus() {},
            remove() {}
        };
    }
    const dialog = element();
    const overlay = element();
    const modal = element();
    Object.defineProperty(modal, "innerHTML", {
        set(markup) {
            for (const match of markup.matchAll(/<(\w+)\b([^>]*\bid="([^"]+)"[^>]*)>/g)) {
                const control = element(match[1]);
                elements.set(match[3], control);
                if (["input", "select"].includes(match[1])) controls.push(control);
                if (match[1] === "select") {
                    const rest = markup.slice(match.index + match[0].length);
                    control.value = rest.match(/<option\s+value="([^"]+)"/)[1];
                }
            }
        }
    });
    modal.querySelector = selector => {
        if (selector === '[role="dialog"]') return dialog;
        if (selector.startsWith("#")) return elements.get(selector.slice(1));
        return overlay;
    };
    modal.querySelectorAll = selector => controls.filter(control =>
        selector.split(",").map(tag => tag.trim()).includes(control.tag)
    );
    const document = {
        activeElement: element(),
        body: { appendChild() {} },
        createElement: () => modal,
        getElementById: id => elements.get(id),
        querySelector: () => overlay,
        addEventListener() {},
        removeEventListener() {}
    };
    const context = { document, alert: message => alerts.push(message) };
    vm.createContext(context);
    vm.runInContext(fs.readFileSync(
        path.join(__dirname, "..", "js", "calculators", file), "utf8"
    ), context);
    context[openFunction]();
    return { elements, alerts, context };
}

const cases = [
    {
        name: "Infusions", file: "infusions.js", open: "openInfusionsCalculator",
        calculate: "calculateInfusion", reset: "resetInfusions",
        inputs: {
            infusionWeight: "70", infusionDose: "0.1", infusionDoseType: "mcgkgmin",
            infusionDrugAmount: "4", infusionFinalVolume: "50"
        },
        changed: {
            infusionWeight: "80", infusionDose: "0.2", infusionDoseType: "mgkgmin",
            infusionDrugAmount: "8", infusionFinalVolume: "100"
        },
        valid: { infusionConcentration: "0.080 mg/mL", infusionRate: "5.25 mL/hr" },
        cleared: { infusionConcentration: "—", infusionRate: "—" },
        invalid: {
            infusionWeight: ["", "0", "-1", "501", "Infinity", "NaN"],
            infusionDose: ["", "0", "-1", "Infinity", "NaN"],
            infusionDrugAmount: ["", "0", "-1", "Infinity", "NaN"],
            infusionFinalVolume: ["", "0", "-1", "Infinity", "NaN"]
        }
    },
    {
        name: "NEWS2", file: "news2.js", open: "openNEWS2Calculator",
        calculate: "calculateNEWS2", reset: "resetNEWS2",
        inputs: {
            newsResp: "18", newsSpO2: "98", newsSBP: "120", newsPulse: "80",
            newsTemp: "37", newsSpOScale: "1", newsOxygen: "0", newsConsciousness: "0"
        },
        changed: {
            newsResp: "25", newsSpO2: "90", newsSBP: "90", newsPulse: "140",
            newsTemp: "40", newsSpOScale: "2", newsOxygen: "2", newsConsciousness: "3"
        },
        valid: {
            news2Total: "0", news2Risk: "NEWS2 0 — routine monitoring",
            newsRespScore: "Score: 0", newsSpO2Score: "Score: 0", newsSBPScore: "Score: 0",
            newsPulseScore: "Score: 0", newsTempScore: "Score: 0"
        },
        cleared: {
            news2Total: "—", news2Risk: "Complete all observations",
            newsRespScore: "", newsSpO2Score: "", newsSBPScore: "",
            newsPulseScore: "", newsTempScore: ""
        },
        invalid: {
            newsResp: ["", "0", "-1", "81", "Infinity", "NaN"],
            newsSpO2: ["", "0", "-1", "101", "Infinity", "NaN"],
            newsSBP: ["", "0", "-1", "301", "Infinity", "NaN"],
            newsPulse: ["", "0", "-1", "251", "Infinity", "NaN"],
            newsTemp: ["", "0", "-1", "46", "Infinity", "NaN"]
        }
    },
    {
        name: "Shock Index", file: "shock-index.js", open: "openShockIndexCalculator",
        calculate: "calculateShock", reset: "resetShock",
        inputs: { shockHR: "60", shockSBP: "120" },
        changed: { shockHR: "120", shockSBP: "60" },
        valid: { shockTotal: "0.50", shockInterpretation: "Typical adult reference range" },
        cleared: { shockTotal: "—", shockInterpretation: "Enter HR and SBP" },
        invalid: {
            shockHR: ["", "0", "-1", "251", "Infinity", "NaN"],
            shockSBP: ["", "0", "-1", "301", "Infinity", "NaN"]
        }
    }
];

let transitions = 0;
for (const config of cases) {
    const test = openCalculator(config.file, config.open);
    const get = id => test.elements.get(id);
    const calculate = () => get(config.calculate).dispatch("click");
    const setInputs = () => {
        for (const [id, value] of Object.entries(config.inputs)) get(id).value = value;
    };
    const expect = outputs => {
        for (const [id, text] of Object.entries(outputs)) {
            assert.equal(get(id).textContent, text, `${config.name}: ${id}`);
        }
    };
    const valid = () => {
        test.alerts.length = 0;
        calculate();
        assert.equal(test.alerts.length, 0);
        expect(config.valid);
    };

    // Every editable field, through both browser event types, invalidates results.
    for (const [id, changed] of Object.entries(config.changed)) {
        for (const event of ["input", "change"]) {
            setInputs();
            valid();
            get(id).value = changed;
            get(id).dispatch(event);
            expect(config.cleared);
            assert.equal(test.alerts.length, 0);
            assert.equal(get(id).value, changed, "Invalidation must not change the input");

            const invalidId = Object.keys(config.invalid)[0];
            get(invalidId).value = "";
            calculate();
            assert.equal(test.alerts.length, 1);
            expect(config.cleared);

            setInputs();
            get(invalidId).dispatch("input");
            expect(config.cleared); // Correction alone must not restore a prior result.
            valid();
            transitions++;
        }
    }

    // Invalid recalculation must clear a populated result even without edit events.
    for (const [id, invalidValues] of Object.entries(config.invalid)) {
        for (const value of invalidValues) {
            setInputs();
            valid();
            get(id).value = value;
            calculate();
            assert.equal(test.alerts.length, 1);
            expect(config.cleared);
            assert.equal(get(id).value, value);
            setInputs();
            valid();
            transitions++;
        }
    }

    if (config.name === "Infusions") {
        setInputs();
        valid();
        get("infusionDoseType").value = "mgkgmin";
        get("infusionDoseType").dispatch("change");
        expect(config.cleared);
        assert.equal(get("infusionDoseUnitLabel").textContent, "mg/kg/min");
        calculate();
        assert.equal(get("infusionRate").textContent, "5250.00 mL/hr");
        get("infusionDoseType").value = "mcgkgmin";
        get("infusionDoseType").dispatch("change");
        expect(config.cleared);
        assert.equal(get("infusionDoseUnitLabel").textContent, "mcg/kg/min");
        valid();
    }

    setInputs();
    valid();
    get(config.reset).dispatch("click");
    expect(config.cleared);
    for (const id of Object.keys(config.invalid)) assert.equal(get(id).value, "");
    setInputs();
    valid();
    console.log(`PASS — ${config.name} result-safety transitions and reset`);
}
console.log(`PASS — ${transitions} edit/invalid/recovery transitions; 1000-fold unit change`);
