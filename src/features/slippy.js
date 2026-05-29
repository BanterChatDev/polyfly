import { KEYS } from "../config/keys.js";
import { STOCK } from "../config/carLayout.js";
import { physics } from "../api/physics.js";

export const slippy = {
  name: "slippy",
  label: "Slippy",
  description: "Reduce wheel grip for ice / drift feel",
  category: "Movement",
  toggleKey: KEYS.slippy,
  settings: {
    grip: { type: "number", label: "Grip (lower = slippier)", min: 0, max: 5, step: 0.05, default: 0.2 },
  },
  onState(state) {
    const s = state.slippy || { active: false, grip: STOCK.friction };
    if (s.active) physics.setFriction(Number(s.grip));
    else physics.resetFriction();
  },
};