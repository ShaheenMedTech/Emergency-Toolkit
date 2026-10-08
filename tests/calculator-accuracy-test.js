const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

// Minimal DOM fixture that runs the dialog markup and registered event handlers.
function calculator(file, open) {
    const elements = new Map();
    let activeModal;
    const alerts = [];
    function element(tag = "div") {
        let text = "";
        const handlers = new Map();
        return {
            tag, value: "", checked: false,
            get textContent() { return text; },
            set textContent(value) { text = String(value); },
            addEventListener(type, handler) {
                if (!handlers.has(type)) handlers.set(type, []);
                handlers.get(type).push(handler);
            },
            dispatch(type) {
                for (const handler of handlers.get(type) || []) handler({ target: this });
            },
            focus() {}
        };
    }
    const document = {
        activeElement: element(),
        body: { appendChild(modal) { activeModal = modal; } },
        getElementById: id => elements.get(id),
        addEventListener() {}, removeEventListener() {},
        createElement() {
            const modal = element();
            const controls = [];
            const ids = [];
            const dialog = element();
            Object.defineProperty(modal, "innerHTML", {
                set(markup) {
                    for (const match of markup.matchAll(/<(\w+)\b([^>]*)>/g)) {
                        const [, tag, attrs] = match;
                        const id = attrs.match(/\bid="([^"]+)"/)?.[1];
                        if (!id && tag !== "input") continue;
                        const el = element(tag);
                        el.name = attrs.match(/\bname="([^"]+)"/)?.[1];
                        el.value = attrs.match(/\bvalue="([^"]+)"/)?.[1] || "";
                        const rest = markup.slice(match.index + match[0].length);
                        if (tag === "select") el.value = rest.match(/<option\s+value="([^"]+)"/)[1];
                        if (tag !== "input") {
                            el.textContent = rest.split(`</${tag}>`)[0].replace(/<[^>]*>/g, "").trim();
                        }
                        if (id) { elements.set(id, el); ids.push(id); }
                        if (["input", "select"].includes(tag)) controls.push(el);
                    }
                }
            });
            modal.querySelector = selector => {
                if (selector === '[role="dialog"]') return dialog;
                if (selector.startsWith("#")) return elements.get(selector.slice(1));
                const name = selector.match(/name="([^"]+)"/)?.[1];
                return controls.find(el => el.name === name && el.checked);
            };
            modal.querySelectorAll = selector => controls.filter(el =>
                selector === 'input[type="radio"]'
                    ? Boolean(el.name)
                    : selector.split(",").map(s => s.trim()).includes(el.tag)
            );
            modal.remove = () => { for (const id of ids) elements.delete(id); };
            modal.controls = controls;
            return modal;
        }
    };
    const context = { document, alert: message => alerts.push(message) };
    vm.createContext(context);
    vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "js", "calculators", file), "utf8"), context);
    const reopen = () => context[open]();
    reopen();
    return {
        context, alerts, reopen, get: id => elements.get(id),
        choose(name, value, afterInput) {
            const group = activeModal.controls.filter(el => el.name === name);
            const selected = group.find(el => el.value === String(value));
            assert.ok(selected, `${name} must offer ${value}`);
            for (const el of group) el.checked = el === selected;
            selected.dispatch("input");
            if (afterInput) afterInput();
            selected.dispatch("change");
        }
    };
}

{
    const test = calculator("news2.js", "openNEWS2Calculator");
    const { get, context, alerts } = test;
    const baseline = () => {
        for (const [id, value] of Object.entries({
            newsResp: 18, newsSpO2: 98, newsSBP: 120, newsPulse: 80,
            newsTemp: 37, newsSpOScale: 1, newsOxygen: 0, newsConsciousness: 0
        })) get(id).value = String(value);
    };
    const cleared = () => {
        assert.equal(get("news2Total").textContent, "—");
        assert.equal(get("news2Risk").textContent, "Complete all observations");
        for (const id of ["newsRespScore", "newsSpO2Score", "newsSBPScore", "newsPulseScore", "newsTempScore"]) {
            assert.equal(get(id).textContent, "");
        }
    };
    const bands = (value, boundaries) => boundaries.find(([upper]) => value <= upper)[1];
    for (const scale of ["1", "2"]) for (const oxygen of ["0", "2"]) {
        for (let spo2 = 50; spo2 <= 100; spo2++) {
            baseline(); get("newsSpOScale").value = scale; get("newsOxygen").value = oxygen;
            get("newsSpO2").value = String(spo2); alerts.length = 0;
            get("calculateNEWS2").dispatch("click");
            const score = scale === "1"
                ? bands(spo2, [[91, 3], [93, 2], [95, 1], [100, 0]])
                : bands(spo2, [[83, 3], [85, 2], [87, 1], [92, 0],
                    [94, oxygen === "2" ? 1 : 0], [96, oxygen === "2" ? 2 : 0], [100, oxygen === "2" ? 3 : 0]]);
            assert.equal(alerts.length, 0);
            assert.equal(get("newsSpO2Score").textContent, `Score: ${score}`);
            assert.equal(get("news2Total").textContent, String(score + Number(oxygen)));
        }
        for (const spo2 of [50.1, 83.5, 85.5, 87.5, 91.5, 92.5, 93.5, 94.5, 95.5, 96.5, 99.9]) {
            baseline(); get("newsSpOScale").value = scale; get("newsOxygen").value = oxygen;
            get("calculateNEWS2").dispatch("click");
            get("newsSpO2").value = String(spo2); alerts.length = 0;
            get("calculateNEWS2").dispatch("click");
            assert.deepEqual(alerts, ["SpO₂ must be a whole percentage. Fractional values are not supported."]);
            assert.equal(get("newsSpO2").value, String(spo2));
            cleared();
            get("newsSpO2").value = "98";
            get("newsSpO2").dispatch("input"); cleared();
            alerts.length = 0; get("calculateNEWS2").dispatch("click");
            assert.equal(alerts.length, 0);
        }
    }
    // Preserve aggregate and single-red escalation thresholds.
    for (const [overrides, total, risk] of [
        [{}, "0", "NEWS2 0 — routine monitoring"],
        [{ newsPulse: 100 }, "1", "LOW — continue monitoring (NEWS2 1–4)"],
        [{ newsResp: 21, newsSpO2: 93 }, "4", "LOW — continue monitoring (NEWS2 1–4)"],
        [{ newsResp: 25 }, "3", "URGENT — single parameter score of 3"],
        [{ newsResp: 25, newsSpO2: 93 }, "5", "URGENT — clinical assessment required (NEWS2 5–6)"],
        [{ newsResp: 25, newsSpO2: 91 }, "6", "URGENT — clinical assessment required (NEWS2 5–6)"],
        [{ newsResp: 25, newsSpO2: 91, newsPulse: 100 }, "7", "HIGH — emergency clinical assessment (NEWS2 ≥7)"]
    ]) {
        baseline(); for (const [id, value] of Object.entries(overrides)) get(id).value = String(value);
        context.calculateNEWS2();
        assert.equal(get("news2Total").textContent, total);
        assert.equal(get("news2Risk").textContent, risk);
    }
    get("resetNEWS2").dispatch("click"); cleared();
    get("closeNEWS2").dispatch("click"); test.reopen();
    assert.equal(get("newsSpO2").value, "");
    assert.equal(get("news2Total").textContent, "—");
    console.log("PASS — NEWS2 integer bands, fractional rejection, escalation, reset and reopen");
}

{
    const test = calculator("shock-index.js", "openShockIndexCalculator");
    const { get, context } = test;
    const interpretations = [
        "Below typical adult reference range", "Typical adult reference range",
        "Elevated — assess in clinical context", "Markedly elevated — assess for haemodynamic compromise",
        "≥1.0 — markedly elevated; assess urgently in clinical context"
    ];
    for (const [index, threshold] of [0.5, 0.7, 0.9, 1].entries()) {
        for (const [value, category, display] of [
            [threshold - 1e-10, index, `<${threshold.toFixed(2)}`],
            [threshold, index + 1, threshold.toFixed(2)],
            [threshold + 1e-10, index + 1, threshold.toFixed(2)]
        ]) {
            get("shockHR").value = String(value * 100); get("shockSBP").value = "100";
            context.calculateShockIndex();
            assert.equal(get("shockTotal").textContent, display);
            assert.equal(get("shockInterpretation").textContent, interpretations[category]);
        }
    }
    for (const [hr, sbp, display] of [[149, 300, "<0.50"], [140, 201, "<0.70"], [179, 200, "<0.90"], [200, 201, "<1.00"], [60, 100, "0.60"], [120, 100, "1.20"]]) {
        get("shockHR").value = String(hr); get("shockSBP").value = String(sbp);
        get("calculateShock").dispatch("click");
        assert.equal(get("shockTotal").textContent, display);
    }
    get("shockHR").dispatch("input"); assert.equal(get("shockTotal").textContent, "—");
    get("calculateShock").dispatch("click");
    get("resetShock").dispatch("click");
    assert.equal(get("shockTotal").textContent, "—");
    assert.equal(get("shockInterpretation").textContent, "Enter HR and SBP");
    get("closeShock").dispatch("click"); test.reopen();
    assert.equal(get("shockTotal").textContent, "—");
    console.log("PASS — Shock Index raw boundaries, bounded display, reset and reopen");
}

{
    const test = calculator("gcs.js", "openGCSCalculator");
    const { get, choose } = test;
    const select = (e, v, m) => {
        choose("gcsEye", e); choose("gcsVerbal", v); choose("gcsMotor", m);
    };
    const cleared = () => {
        assert.equal(get("gcsTotal").textContent, "—");
        assert.equal(get("gcsBreakdown").textContent, "E —   V —   M —");
        assert.equal(get("gcsInterpretation").textContent, "Select all three components");
    };
    for (const [name, maximum] of [["gcsEye", 4], ["gcsVerbal", 5], ["gcsMotor", 6]]) {
        select(4, 5, 6);
        choose(name, 1, cleared);
        choose(name, "NT", cleared);
        assert.equal(get("gcsTotal").textContent, "NT");
        choose(name, maximum, cleared);
        assert.equal(get("gcsTotal").textContent, "15");
        assert.equal(get("gcsInterpretation").textContent, "Maximum GCS score: 15/15.");
    }
    for (let e = 1; e <= 4; e++) for (let v = 1; v <= 5; v++) for (let m = 1; m <= 6; m++) {
        select(e, v, m);
        const total = e + v + m;
        assert.equal(get("gcsTotal").textContent, String(total));
        assert.equal(get("gcsBreakdown").textContent, `E ${e} + V ${v} + M ${m}`);
        assert.equal(get("gcsInterpretation").textContent, total === 15
            ? "Maximum GCS score: 15/15."
            : total >= 13 ? "Mild impairment • GCS 13–15"
                : total >= 9 ? "Moderate impairment • GCS 9–12" : "Severe impairment • GCS ≤8");
    }
    for (let mask = 1; mask <= 7; mask++) {
        select(4, 5, 6);
        const values = [mask & 1 ? "NT" : 4, mask & 2 ? "NT" : 5, mask & 4 ? "NT" : 6];
        select(...values);
        assert.equal(get("gcsTotal").textContent, "NT");
        assert.equal(get("gcsBreakdown").textContent, `E${values[0]} V${values[1]} M${values[2]}`);
        assert.equal(get("gcsInterpretation").textContent, mask === 2
            ? "Verbal response not testable — total GCS cannot be calculated."
            : "One or more components not testable — total GCS cannot be calculated.");
        select(4, 5, 6);
        assert.equal(get("gcsTotal").textContent, "15");
    }
    get("resetGCS").dispatch("click");
    choose("gcsEye", "NT");
    assert.equal(get("gcsTotal").textContent, "—");
    assert.equal(get("gcsBreakdown").textContent, "ENT V— M—");
    assert.equal(get("gcsInterpretation").textContent, "Select all three components");
    get("resetGCS").dispatch("click");
    assert.equal(get("gcsTotal").textContent, "—");
    assert.equal(get("gcsInterpretation").textContent, "Select all three components");
    get("closeGCS").dispatch("click"); test.reopen();
    assert.equal(get("gcsTotal").textContent, "—");
    select(4, 5, 6);
    assert.equal(get("gcsInterpretation").textContent, "Maximum GCS score: 15/15.");
    console.log("PASS — GCS 120 numeric combinations, seven NT combinations, transitions, reset and reopen");
}
