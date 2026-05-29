const SETTINGS_STORAGE_KEY = "POLYFLY_SETTINGS";

export function loadPersistedSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return (parsed && typeof parsed === "object") ? parsed : {};
  } catch (_) {
    return {};
  }
}

export function persistSettings(features, state) {
  try {
    const snap = {};
    for (const [name, def] of Object.entries(features)) {
      const sub = {};
      for (const key of Object.keys(def.settings)) sub[key] = state[name][key];
      snap[name] = sub;
    }
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(snap));
  } catch (e) {
    console.warn("[polyfly] settings persist failed:", e);
  }
}
