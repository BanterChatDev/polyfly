(function () {
  try {
    const url = chrome.runtime.getURL("assets/bin/polytrack_mod.wasm");
    document.documentElement.dataset.polyflyWasmUrl = url;
  } catch (e) {
    console.error("[polyfly-wasmproof] urlBridge failed:", e);
  }
})();
