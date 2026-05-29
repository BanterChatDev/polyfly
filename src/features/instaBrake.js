import { KEYS } from "../config/keys.js";
import { CAR_OFFSETS } from "../config/carLayout.js";

const BRAKE_KEYS = ["KeyS", "ArrowDown"];
const ZERO_VEL = [
  { offset: CAR_OFFSETS.linVel.x,       value: 0 },
  { offset: CAR_OFFSETS.linVel.y,       value: 0 },
  { offset: CAR_OFFSETS.linVel.z,       value: 0 },
  { offset: CAR_OFFSETS.linVelMirror.x, value: 0 },
  { offset: CAR_OFFSETS.linVelMirror.y, value: 0 },
  { offset: CAR_OFFSETS.linVelMirror.z, value: 0 },
];

export const instaBrake = {
  name: "instaBrake",
  label: "InstaBrake",
  description: "Zero velocity while braking",
  category: "Movement",
  toggleKey: KEYS.instaBrake,
  settings: {},
  wasm: {
    tickWrites(state) {
      if (!state.instaBrake?.active) return [];
      return BRAKE_KEYS.some(k => state.keys[k]) ? ZERO_VEL : [];
    },
  },
};
