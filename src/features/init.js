import { polyfly } from "../api/polyfly.js";
import { mach } from "./mach.js";
import { instaBrake } from "./instaBrake.js";
import { warp } from "./warp.js";
import { pauseTimer } from "./pauseTimer.js";
import { slippy } from "./slippy.js";
import { hud } from "./hud.js";

const FEATURES = [mach, instaBrake, warp, pauseTimer, slippy, hud];

export function registerAllFeatures() {
  for (const def of FEATURES) polyfly.registerFeature(def.name, def);
}