import { KEYS } from "../config/keys.js";
import { STOCK, WASM_EXPORTS } from "../config/carLayout.js";

export const mach = {
  name: "mach",
  label: "Mach",
  description: "Engine force multiplier; anti-flip keeps the car level so all force goes forward",
  category: "Movement",
  toggleKey: KEYS.mach,
  settings: {
    mult:     { type: "number", label: "Speed multiplier", min: 1, max: 250, step: 0.1, default: 2.5 },
    antiFlip: { type: "bool",   label: "Anti-flip",        default: true },
  },
  wasm: {
    requires: [WASM_EXPORTS.engineForceMach],
    compute(state) {
      const m = state.mach || { active: false, mult: 1, antiFlip: true };
      const force = m.active ? STOCK.engineForce * (Number(m.mult) || 1) : STOCK.engineForce;
      const flip  = (m.active && m.antiFlip) ? 1 : 0;
      return {
        [WASM_EXPORTS.engineForceMach]: force,
        [WASM_EXPORTS.antiFlip]:        flip,
      };
    },
  },
};