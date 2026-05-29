export function Hud({ features, state, kbds }) {
  if (!state.hud?.active) return null;

  const active = Object.values(features).filter((f) =>
    state[f.name] && state[f.name].active && f.name !== "hud"
  );

  if (active.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed top-3 left-3 px-3 py-2 rounded-lg bg-black/35 backdrop-blur-sm flex flex-col gap-0.5"
      style={{ zIndex: 2147483645 }}
    >
      {active.map((f) => (
        <div key={f.name} className="flex items-center gap-2 text-[12px] leading-snug">
          <span className="w-1.5 h-1.5 rounded-full bg-pf-accent shrink-0" />
          <span className="text-white/95 font-medium">{f.label}</span>
          {kbds.get(f.name) && (
            <span className="font-mono text-white/55 text-[11px]">[{shortenKey(kbds.get(f.name))}]</span>
          )}
        </div>
      ))}
    </div>
  );
}

function shortenKey(code) {
  return code.replace(/^Key/, "").replace(/^Digit/, "").replace(/^Arrow/, "");
}