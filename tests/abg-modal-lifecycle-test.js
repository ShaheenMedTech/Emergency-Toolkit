const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
// Independent event registry: observe listener ownership and dispatch, not cleanup implementation.
const targets = [];
let activeModal;
class Target {
    constructor(id = "") { this.id = id; this.listeners = new Map(); this.value = ""; this.textContent = "—"; this.disabled = false; this.offsetParent = {}; targets.push(this); }
    addEventListener(type, fn) { if (!this.listeners.has(type)) this.listeners.set(type, new Set()); this.listeners.get(type).add(fn); }
    removeEventListener(type, fn) { this.listeners.get(type)?.delete(fn); }
    dispatch(type, event = {}) { for (const fn of [...(this.listeners.get(type) || [])]) fn({ key: "", preventDefault() {}, ...event }); }
    focus() { document.activeElement = this; }
    remove() { if (activeModal === this) activeModal = undefined; }
    querySelector(selector) { return selector === '[role="dialog"]' ? this : this.children.find(child => child.id === selector.slice(1)); }
    querySelectorAll(selector) { return selector === "input" ? this.children.filter(child => ["abgPH", "abgPCO2", "abgHCO3", "abgPaO2", "abgNa", "abgCl"].includes(child.id)) : this.children.filter(child => ["closeABG", "calculateABG", "resetABG"].includes(child.id) || ["abgPH", "abgPCO2", "abgHCO3", "abgPaO2", "abgNa", "abgCl"].includes(child.id)); }
    set innerHTML(html) { this.children = [...html.matchAll(/id="([^"]+)"/g)].map(match => new Target(match[1])); }
}
const document = new Target();
const opener = new Target("opener");
document.activeElement = opener;
document.body = { appendChild(modal) { activeModal = modal; } };
document.createElement = () => new Target();
document.getElementById = id => id === "abgModal" ? activeModal : activeModal?.children.find(child => child.id === id);
const context = { document, console, alert() { throw Error("Unexpected validation"); } };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/calculators/acid-base.js"), "utf8"), context);
const count = target => [...target.listeners.values()].reduce((sum, set) => sum + set.size, 0);
const ownedCount = modal => count(modal) + modal.children.reduce((sum, target) => sum + count(target), 0);
const keyCount = () => document.listeners.get("keydown")?.size || 0;
for (let cycle = 0; cycle < 20; cycle++) {
    opener.focus(); context.openABGCalculator();
    const old = activeModal;
    const detachedReset = old.querySelector("#resetABG");
    assert.equal(keyCount(), 1);
    assert.equal(ownedCount(old), 15, "All element listeners registered exactly once");
    old.querySelector("#abgPH").focus();
    context.openABGCalculator();
    const current = activeModal;
    assert.notEqual(current, old);
    assert.equal(keyCount(), 1, "Replacement must not accumulate document handlers");
    assert.equal(ownedCount(old), 0, "Every replaced-modal listener removed");
    assert.equal(document.activeElement.id, "closeABG");
    document.getElementById("abgAG").textContent = "current result";
    detachedReset.dispatch("click");
    assert.equal(document.getElementById("abgAG").textContent, "current result", "Detached controls cannot affect replacement");
    const first = current.querySelector("#closeABG");
    // Determine actual markup order independently from registered handler logic.
    const focusable = current.querySelectorAll("focusable");
    const final = focusable[focusable.length - 1];
    final.focus(); let prevented = false;
    document.dispatch("keydown", { key: "Tab", preventDefault() { prevented = true; } });
    assert(prevented); assert.equal(document.activeElement, first);
    document.dispatch("keydown", { key: "Tab", shiftKey: true });
    assert.equal(document.activeElement, final);
    if (cycle % 2) first.dispatch("click");
    else document.dispatch("keydown", { key: "Escape" });
    assert.equal(activeModal, undefined);
    assert.equal(keyCount(), 0);
    assert.equal(ownedCount(current), 0);
    assert.equal(document.activeElement, opener, "Replacement preserves original focus restoration");
}
assert.equal(targets.reduce((sum, target) => sum + count(target), 0), 0, "No listeners accumulate across lifecycle cycles");
console.log("PASS — 20 ABG open/replace/close/reopen cycles, all listener cleanup, detached controls, Escape, Tab and focus restoration");
