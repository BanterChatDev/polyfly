import { installWasmHook } from "./api/wasmHook.js";
import { installMainBundlePatcher } from "./api/mainBundlePatcher.js";
import { polyfly } from "./api/polyfly.js";
import { gui } from "./api/gui/index.js";
import { registerAllFeatures } from "./features/init.js";

registerAllFeatures();
installMainBundlePatcher();
installWasmHook();
polyfly.installControls();
gui.install();
