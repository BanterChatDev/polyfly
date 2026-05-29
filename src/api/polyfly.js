import { keybinds } from "./keybinds.js";
import { loadPersistedSettings, persistSettings } from "./storage.js";
import { physics } from "./physics.js";

const features = {};
const state = { keys: {} };
const featureChangeListeners = new Set();

function notifyFeatureChange(name) {
  for (const fn of featureChangeListeners) fn(name);
}

function collectWasmWrites() {
  const writes = {};
  const tickWrites = [];
  for (const def of Object.values(features)) {
    if (!def.wasm) continue;
    if (typeof def.wasm.compute === "function") {
      const out = def.wasm.compute(state);
      if (out && typeof out === "object") Object.assign(writes, out);
    }
    if (typeof def.wasm.tickWrites === "function") {
      const out = def.wasm.tickWrites(state);
      if (Array.isArray(out)) {
        for (const w of out) {
          if (w && typeof w.offset === "number" && typeof w.value === "number") {
            tickWrites.push(w);
          }
        }
      }
    }
  }
  return { writes, tickWrites };
}

function collectWorkerPatches() {
  const out = [];
  for (const def of Object.values(features)) {
    if (Array.isArray(def.workerPatches)) out.push(...def.workerPatches);
  }
  return out;
}

function collectWorkerInit() {
  const parts = [];
  for (const def of Object.values(features)) {
    if (typeof def.workerInit === "string") parts.push(def.workerInit);
  }
  return parts.join("\n");
}

function collectMainPatches() {
  const out = [];
  for (const def of Object.values(features)) {
    if (Array.isArray(def.mainPatches)) out.push(...def.mainPatches);
  }
  return out;
}

function broadcast() {
  for (const def of Object.values(features)) {
    if (typeof def.onState === "function") def.onState(state);
  }
  window.__polyflyWasmState = JSON.parse(JSON.stringify(state));
  const { writes, tickWrites } = collectWasmWrites();
  physics.setGlobals(writes);
  physics.setTickWrites(tickWrites);
  physics.setKeys(state.keys);
}

function dispatchToggleKey(code) {
  let any = false;
  for (const name of keybinds.featuresForCode(code)) {
    if (!features[name]) continue;
    if (features[name].toggleable === false) continue;
    state[name].active = !state[name].active;
    notifyFeatureChange(name);
    any = true;
  }
  if (any) broadcast();
}

export const polyfly = {
  registerFeature(name, opts = {}) {
    if (features[name]) {
      console.warn("[polyfly] already registered:", name);
      return;
    }
    const {
      label = name, description = "", category = "Misc",
      toggleKey = null, toggleable = true, settings = {},
    } = opts;

    const initial = { active: false };
    for (const [k, def] of Object.entries(settings)) initial[k] = def.default;
    const persisted = loadPersistedSettings()[name];
    if (persisted) {
      for (const k of Object.keys(settings)) {
        if (k in persisted) initial[k] = persisted[k];
      }
    }

    features[name] = {
      name, label, description, category, toggleKey,
      hasToggleKey: !!toggleKey, toggleable, settings,
      wasm: opts.wasm || null,
      onState: opts.onState || null,
      workerInit: typeof opts.workerInit === "string" ? opts.workerInit : null,
      workerPatches: Array.isArray(opts.workerPatches) ? opts.workerPatches : null,
      mainPatches: Array.isArray(opts.mainPatches) ? opts.mainPatches : null,
    };
    state[name] = initial;
    notifyFeatureChange(name);
    broadcast();
  },

  getFeatures() { return features; },
  getState() { return state; },
  physics,
  collectWasmWrites,
  collectWorkerPatches,
  collectWorkerInit,
  collectMainPatches,

  onFeatureChange(fn) {
    featureChangeListeners.add(fn);
    return () => featureChangeListeners.delete(fn);
  },

  setFeatureValue(name, key, value) {
    if (!features[name] || !(key in state[name])) return;
    state[name][key] = value;
    if (key in features[name].settings) persistSettings(features, state);
    notifyFeatureChange(name);
    broadcast();
  },

  addWorker(worker) {
    physics.attachWorker(worker);
    broadcast();
  },

  installControls() {
    const editable = el =>
      !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable);
    addEventListener("keydown", event => {
      if (editable(event.target)) return;
      const wasDown = state.keys[event.code];
      state.keys[event.code] = true;
      if (wasDown) return;
      dispatchToggleKey(event.code);
      broadcast();
    }, true);
    addEventListener("keyup", event => {
      const wasDown = state.keys[event.code];
      state.keys[event.code] = false;
      if (wasDown) broadcast();
    }, true);
    addEventListener("contextmenu", event => event.preventDefault(), true);
  },
};

broadcast();