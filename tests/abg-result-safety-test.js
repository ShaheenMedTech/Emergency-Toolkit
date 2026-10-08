const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "../js/calculators/acid-base.js"), "utf8");
const baseline = {
    abgPH: "7.30", abgPCO2: "30", abgHCO3: "15",
    abgPaO2: "80", abgNa: "140", abgCl: "110"
};
const changes = { abgPH: "7.50", abgPCO2: "60", abgHCO3: "18", abgPaO2: "90", abgNa: "142", abgCl: "108" };
const outputs = ["abgAG", "abgPrimary", "abgCompensation", "abgOxygen"];
const elements = new Map();
const alerts = [];
function element() {
    const listeners = new Map();
    return {
        value: "", textContent: "", focus() {},
        addEventListener(type, handler) {
            if (!listeners.has(type)) listeners.set(type, []);
            listeners.get(type).push(handler);
        },
        removeEventListener(type, handler) {
            listeners.set(type, (listeners.get(type) || []).filter(item => item !== handler));
        },
        dispatch(type) { for (const handler of listeners.get(type) || []) handler({ target: this }); }
    };
}
const document = {
    activeElement: element(), addEventListener() {}, removeEventListener() {},
    getElementById: id => elements.get(id),
    body: { appendChild(modal) { elements.set(modal.id, modal); } },
    createElement() {
        const modal = element();
        const controls = [];
        const ids = [];
        Object.defineProperty(modal, "innerHTML", {
            set(markup) {
                for (const match of markup.matchAll(/<(input|button|strong)\b[^>]*\bid="([^"]+)"[^>]*>/g)) {
                    const el = element();
                    el.textContent = markup.slice(match.index + match[0].length).split(`</${match[1]}>`)[0].trim();
                    elements.set(match[2], el); ids.push(match[2]);
                    if (match[1] === "input") controls.push(el);
                }
            }
        });
        modal.querySelector = selector => selector.startsWith("#") ? elements.get(selector.slice(1)) : element();
        modal.querySelectorAll = selector => selector === "input" ? controls : [];
        modal.remove = () => { for (const id of ids) elements.delete(id); elements.delete(modal.id); };
        return modal;
    }
};
const context = { document, alert: message => alerts.push(message) };
vm.createContext(context);
vm.runInContext(source, context);
context.openABGCalculator();
const get = id => elements.get(id);
const set = values => { for (const [id, value] of Object.entries(values)) get(id).value = value; };
const inputValues = () => Object.fromEntries(Object.keys(baseline).map(id => [id, get(id).value]));
const result = () => outputs.map(id => get(id).textContent);
const cleared = () => assert.deepEqual(result(), outputs.map(() => "—"));
const calculate = () => get("calculateABG").dispatch("click");
const populated = () => assert.ok(result().every(value => value && value !== "—"));
let transitions = 0;
for (const [id, changed] of Object.entries(changes)) for (const event of ["input", "change"]) {
    alerts.length = 0; set(baseline); calculate(); populated();
    const previous = result();
    get(id).value = changed;
    const entered = inputValues();
    get(id).dispatch(event); cleared();
    assert.deepEqual(inputValues(), entered, "Invalidation must preserve every entered value");
    assert.equal(alerts.length, 0, "Editing must not trigger validation or calculation");
    calculate(); populated(); assert.equal(alerts.length, 0);
    assert.notDeepEqual(result(), previous, "Explicit recalculation must use changed inputs");
    const updated = result();
    get(id).value = ""; get(id).dispatch(event); cleared();
    calculate(); cleared(); assert.equal(alerts.length, 1);
    assert.equal(get(id).value, "");
    get(id).value = changed; get(id).dispatch(event); cleared();
    assert.equal(alerts.length, 1, "Correction alone must not calculate");
    calculate(); assert.deepEqual(result(), updated);
    transitions++;
}
// Keep invalid-recalculation clearing safe even when programmatic edits omit events.
for (const id of Object.keys(baseline)) {
    set(baseline); calculate(); populated(); alerts.length = 0;
    get(id).value = ""; calculate(); cleared(); assert.equal(alerts.length, 1);
    set(baseline); calculate(); populated();
}
get("resetABG").dispatch("click"); cleared();
assert.ok(Object.values(inputValues()).every(value => value === ""));
set(baseline); calculate(); populated();
get("closeABG").dispatch("click"); assert.equal(get("abgModal"), undefined);
context.openABGCalculator(); cleared();
assert.ok(Object.values(inputValues()).every(value => value === ""));
// Fresh dialogs must reattach both event handlers to every input.
for (const id of Object.keys(baseline)) for (const event of ["input", "change"]) {
    set(baseline); calculate(); populated();
    get(id).value = changes[id]; get(id).dispatch(event); cleared();
    assert.equal(get(id).value, changes[id]);
}
assert.equal(transitions, 12);
console.log("PASS — ABG all six inputs × both events: edit/invalid/corrected/recalculated transitions, input preservation, reset and reopen");
