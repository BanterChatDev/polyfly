import { useState, useEffect } from "react";
import { polyfly } from "../../polyfly.js";

export function SettingSlider({ featureName, settingKey, def, value }) {
  const min = def.min ?? 0;
  const max = def.max ?? 100;
  const step = def.step ?? 1;
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  const [text, setText] = useState(String(value));
  useEffect(() => { setText(String(value)); }, [value]);

  const commit = (raw) => {
    const n = Number(raw);
    if (raw.trim() === "" || Number.isNaN(n)) { setText(String(value)); return; }
    const clamped = n > max ? max : n < min ? min : n;
    polyfly.setFeatureValue(featureName, settingKey, clamped);
    setText(String(clamped));
  };

  return (
    <div className="py-2">
      <div className="flex justify-between items-center mb-1.5 text-[12px] text-pf-text-dim">
        <span>{def.label || settingKey}</span>
        <input
          type="text"
          inputMode="decimal"
          value={text}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setText(e.target.value)}
          onBlur={(e) => commit(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") { commit(e.target.value); e.target.blur(); }
            else if (e.key === "Escape") { setText(String(value)); e.target.blur(); }
          }}
          className="w-16 bg-transparent text-right font-mono text-pf-text outline-none border-b border-transparent focus:border-pf-accent/50 focus:text-pf-accent transition-colors"
        />
      </div>
      <input
        type="range"
        className="pf-slider"
        style={{ "--pf-fill": pct + "%" }}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => polyfly.setFeatureValue(featureName, settingKey, Number(e.target.value))}
      />
    </div>
  );
}

export function SettingToggle({ featureName, settingKey, def, value }) {
  return (
    <div className="py-2">
      <div className="flex justify-between items-center text-[12px] text-pf-text-dim">
        <span>{def.label || settingKey}</span>
        <div
          onClick={(e) => {
            e.stopPropagation();
            polyfly.setFeatureValue(featureName, settingKey, !value);
          }}
          className={
            "w-10 h-[22px] rounded-full relative shrink-0 cursor-pointer transition-colors duration-150 " +
            (value ? "bg-pf-accent shadow-[0_0_10px_rgba(255,58,58,0.45)]" : "bg-white/10")
          }
        >
          <div
            className={
              "absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-transform duration-150 " +
              (value ? "translate-x-[20px]" : "translate-x-[2px]")
            }
          />
        </div>
      </div>
    </div>
  );
}