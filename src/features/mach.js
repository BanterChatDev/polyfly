import { KEYS } from "../config/keys.js";
import { STOCK, WASM_EXPORTS } from "../config/carLayout.js";

export const mach = {
  name: "mach",
  label: "Mach",
  description: "Engine force multiplier",
  category: "Movement",
  toggleKey: KEYS.mach,
  settings: {
    mult: { type: "number", label: "Speed multiplier", min: 1, max: 250, step: 0.1, default: 2.5 },
  },
  wasm: {
    requires: [WASM_EXPORTS.engineForceMach],
    compute(state) {
      const m = state.mach || { active: false, mult: 1 };
      const force = m.active ? STOCK.engineForce * (Number(m.mult) || 1) : STOCK.engineForce;
      return { [WASM_EXPORTS.engineForceMach]: force };
    },
  },
};
