// Engineering lifecycle checks only; this fixture does not validate browser layout.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function fixture(file, open) {
    const ids = new Map(), keys = new Set(), removals = new Map();
    let modal;
    const doc = {
        addEventListener(type, handler) { if (type === 'keydown') keys.add(handler); },
        removeEventListener(type, handler) {
            if (type === 'keydown') {
                removals.set(handler, (removals.get(handler) || 0) + 1);
                keys.delete(handler);
            }
        },
        getElementById: id => ids.get(id),
        body: { appendChild(el) { modal = el; if (el.id) ids.set(el.id, el); } }
    };
    function element() {
        const events = new Map();
        return {
            value: '', textContent: '', offsetParent: {}, disabled: false,
            addEventListener(type, fn) { if (!events.has(type)) events.set(type, []); events.get(type).push(fn); },
            click(target = this) { for (const fn of events.get('click') || []) fn({ target }); },
            focus() { doc.activeElement = this; }
        };
    }
    const trigger = element(); trigger.focus();
    doc.createElement = () => {
        const el = element(), children = [], controls = [];
        const dialog = element();
        dialog.querySelectorAll = () => controls;
        Object.defineProperty(el, 'innerHTML', { set(html) {
            for (const match of html.matchAll(/<(\w+)\b([^>]*)>/g)) {
                const [, tag, attrs] = match;
                const id = attrs.match(/\bid="([^"]+)"/)?.[1];
                if (!id && !['input', 'button', 'select'].includes(tag)) continue;
                const child = element(); child.id = id; child.tag = tag;
                if (id) ids.set(id, child);
                children.push(child);
                if (['input', 'button', 'select'].includes(tag)) controls.push(child);
            }
        } });
        el.querySelector = selector => selector === '[role="dialog"]' ? dialog : ids.get(selector.slice(1));
        el.querySelectorAll = selector => controls.filter(c => selector.includes(c.tag));
        el.remove = () => {
            if (el.id) ids.delete(el.id);
            for (const child of children) if (ids.get(child.id) === child) ids.delete(child.id);
            for (const control of controls) control.offsetParent = null;
        };
        el.controls = controls;
        return el;
    };
    const ctx = vm.createContext({ document: doc, alert() {} });
    vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/calculators', file), 'utf8'), ctx);
    return { doc, keys, removals, trigger, open: () => ctx[open](), get modal() { return modal; },
        key(key, shiftKey = false) {
            const event = { key, shiftKey, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; } };
            for (const fn of [...keys]) if (keys.has(fn)) fn(event);
            return event;
        }
    };
}

for (const [file, open, close, replace] of [
    ['gcs.js', 'openGCSCalculator', 'closeGCS', false],
    ['news2.js', 'openNEWS2Calculator', 'closeNEWS2', true],
    ['shock-index.js', 'openShockIndexCalculator', 'closeShock', true]
]) {
    const t = fixture(file, open);
    const unrelated = () => {};
    t.doc.addEventListener('keydown', unrelated);
    for (let cycle = 0; cycle < 20; cycle++) {
        t.trigger.focus(); t.open(); assert.equal(t.keys.size, 2);
        let closeButton = t.doc.getElementById(close);
        if (replace) {
            t.modal.controls[1].focus();
            t.open(); assert.equal(t.keys.size, 2, 'replacement owns only one handler');
            const currentFocus = t.doc.activeElement;
            closeButton.click();
            assert.equal(t.doc.activeElement, currentFocus, 'disposed close cannot steal focus');
            assert.equal(t.keys.size, 2);
            closeButton = t.doc.getElementById(close);
        }
        const controls = t.modal.controls;
        controls.at(-1).focus();
        assert.equal(t.key('Tab').defaultPrevented, true);
        assert.equal(t.doc.activeElement, controls[0]);
        assert.equal(t.key('Tab', true).defaultPrevented, true);
        assert.equal(t.doc.activeElement, controls.at(-1));
        controls[1].focus(); assert.equal(t.key('Tab').defaultPrevented, false);
        assert.equal(t.key('a').defaultPrevented, false);
        if (!replace && cycle % 3 === 0) {
            const overlay = t.doc.getElementById('gcsOverlay');
            overlay.click(closeButton); assert.equal(t.keys.size, 2, 'inside click does not dismiss');
            overlay.click();
        } else if (cycle % 2) closeButton.click();
        else assert.equal(t.key('Escape').defaultPrevented, true);
        assert.equal(t.keys.size, 1);
        assert.ok(t.keys.has(unrelated));
        assert.equal(t.doc.activeElement, t.trigger);
        closeButton.click(); // Repeated disposal must be inert.
        assert.equal(t.key('Tab').defaultPrevented, false);
        assert.equal(t.key('Escape').defaultPrevented, false);
        assert.equal(t.keys.size, 1);
    }
    assert.ok([...t.removals.values()].every(n => n === 1), 'each owned listener removed exactly once');
    console.log(`PASS — ${file}: 20 cycles, cleanup ownership, replacement/backdrop, Escape, Tab and focus`);
}
