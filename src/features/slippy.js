import { KEYS } from "../config/keys.js";
import { STOCK } from "../config/carLayout.js";
import { physics } from "../api/physics.js";

const LOCK_VALUE = 1e6;

export const slippy = {
  name: "slippy",
  label: "Slippy",
  description: "Wheel grip control. Low = ice/drift. Max grip = infinite (no slip ever)",
  category: "Movement",
  toggleKey: KEYS.slippy,
  settings: {
    grip: { type: "number", label: "Grip (lower = slippier)", min: 0, max: 25, step: 0.05, default: 0.2 },
    lock: { type: "bool",   label: "Max grip (∞)",            default: false },
  },
  onState(state) {
    const s = state.slippy || { active: false, grip: STOCK.friction, lock: false };
    if (!s.active) {
      physics.resetFriction();
      return;
    }
    physics.setFriction(s.lock ? LOCK_VALUE : Number(s.grip));
  },
};