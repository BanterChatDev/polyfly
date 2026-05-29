function Svg({ size = 16, className = "", children, viewBox = "0 0 24 24" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function ChevronIcon({ size = 16, className = "", open = false }) {
  return (
    <Svg size={size} className={className + " transition-transform duration-150 " + (open ? "rotate-90" : "")}>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function SearchIcon({ size = 16, className = "" }) {
  return (
    <Svg size={size} className={className}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

export function CloseIcon({ size = 16, className = "" }) {
  return (
    <Svg size={size} className={className}>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </Svg>
  );
}

export function MovementIcon({ size = 16, className = "" }) {
  return (
    <Svg size={size} className={className}>
      <path d="M4 12h10M4 7h14M4 17h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 14l4-2-4-2v4z" fill="currentColor" />
    </Svg>
  );
}

export function PhysicsIcon({ size = 16, className = "" }) {
  return (
    <Svg size={size} className={className}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="2.4" fill="currentColor" />
      <path d="M12 4v3M12 17v3M4 12h3M17 12h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

export function MiscIcon({ size = 16, className = "" }) {
  return (
    <Svg size={size} className={className}>
      <circle cx="6" cy="12" r="1.8" fill="currentColor" />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" />
      <circle cx="18" cy="12" r="1.8" fill="currentColor" />
    </Svg>
  );
}

export function HudIcon({ size = 16, className = "" }) {
  return (
    <Svg size={size} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M6 9h6M6 13h8M6 17h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  );
}

export const CATEGORY_ICON = {
  Movement: MovementIcon,
  Physics: PhysicsIcon,
  HUD: HudIcon,
  Misc: MiscIcon,
};
