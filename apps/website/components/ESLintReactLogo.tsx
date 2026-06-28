export interface ESLintReactLogoProps {
  width?: number;
}

export function ESLintReactLogo({ width = 150 }: ESLintReactLogoProps) {
  return (
    <svg
      aria-label="ESLint React logo"
      role="img"
      viewBox="0 0 128 128"
      width={width}
    >
      <polygon
        fill="#000"
        fillOpacity="1"
        fillRule="nonzero"
        opacity="1"
        points="64,4 115.96152,34 115.96152,94 64,124 12.03848,94 12.03848,34"
        stroke="none"
      />
      <circle
        cx="64"
        cy="64"
        fill="#fff"
        fillOpacity="1"
        fillRule="nonzero"
        opacity="1"
        r="8"
        stroke="none"
      />
      <g
        fill="none"
        opacity="1"
        stroke="#fff"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="4"
        strokeOpacity="1"
        strokeWidth="1"
      >
        <ellipse cx="64" cy="64" rx="45.00" ry="17.32" />
        <ellipse cx="64" cy="64" rx="45.00" ry="17.32" transform="rotate(60, 64, 64)" />
        <ellipse cx="64" cy="64" rx="45.00" ry="17.32" transform="rotate(120, 64, 64)" />
      </g>
    </svg>
  );
}
