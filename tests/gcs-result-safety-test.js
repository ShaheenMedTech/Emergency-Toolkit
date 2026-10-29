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
            removeEventListener(type, handler) { handlers.set(type, (handlers.get(type) || []).filter(item => item !== handler)); },
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

const test = calculator("gcs.js", "openGCSCalculator");
const {get,choose}=test;
for (const event of ["input", "change"]) {
  choose("gcsEye",4); choose("gcsVerbal",5); choose("gcsMotor",6);
  assert.equal(get("gcsTotal").textContent,"15");
  const eye=test.context.document;
  choose("gcsEye",1,()=>assert.equal(get("gcsTotal").textContent,"—"));
  assert.equal(get("gcsTotal").textContent,"12");
}
for(let e=1;e<=4;e++) for(let v=1;v<=5;v++) for(let m=1;m<=6;m++){
 choose("gcsEye",e);choose("gcsVerbal",v);choose("gcsMotor",m);
 assert.equal(get("gcsTotal").textContent,String(e+v+m));
}
choose("gcsVerbal","NT");assert.equal(get("gcsTotal").textContent,"NT");
get("resetGCS").dispatch("click");
choose("gcsEye",4);assert.equal(get("gcsTotal").textContent,"—");
console.log("PASS — GCS input invalidation, incomplete selection, existing verbal NT and 120 numeric combinations");
