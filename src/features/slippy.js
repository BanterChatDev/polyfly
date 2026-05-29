import { KEYS } from "../config/keys.js";
import { STOCK } from "../config/carLayout.js";
import { physics } from "../api/physics.js";

const MAX_GRIP = 30;
const LOCK_VALUE = 1e6;

export const slippy = {
  name: "slippy",
  label: "Slippy",
  description: "Wheel grip control. Low = ice/drift, high = locked. Slider at max = infinite grip (no slip ever)",
  category: "Movement",
  toggleKey: KEYS.slippy,
  settings: {
    grip: { type: "number", label: "Grip (max = ∞ lock)", min: 0, max: MAX_GRIP, step: 0.1, default: 0.2 },
  },
  onState(state) {
    const s = state.slippy || { active: false, grip: STOCK.friction };
    if (!s.active) {
      physics.resetFriction();
      return;
    }
    const g = Number(s.grip) || 0;
    const v = g >= MAX_GRIP ? LOCK_VALUE : g;
    physics.setFriction(v);
  },
};