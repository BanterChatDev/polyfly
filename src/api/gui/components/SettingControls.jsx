import { polyfly } from "../../polyfly.js";

export function SettingSlider({ featureName, settingKey, def, value }) {
  const min = def.min ?? 0;
  const max = def.max ?? 100;
  const step = def.step ?? 1;
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  return (
    <div className="py-2">
      <div className="flex justify-between items-center mb-1.5 text-[12px] text-pf-text-dim">
        <span>{def.label || settingKey}</span>
        <span className="text-pf-text font-mono">{value}</span>
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