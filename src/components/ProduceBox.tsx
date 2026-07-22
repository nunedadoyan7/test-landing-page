/**
 * Illustrated fresh-produce box used as the hero visual. Standing in for the
 * design's <image-slot> placeholder with an on-brand SVG so the hero renders
 * complete without a photography asset.
 */
export function ProduceBox() {
  return (
    <svg
      viewBox="0 0 400 500"
      role="img"
      aria-label="Illustration of a wooden crate filled with fresh produce"
      className="h-full w-full"
    >
      <rect width="400" height="500" fill="#eadfc8" />
      <circle cx="200" cy="150" r="120" fill="#f6f1e6" opacity="0.7" />

      {/* Crate */}
      <g>
        <rect x="70" y="300" width="260" height="150" rx="10" fill="#a9713f" />
        <rect x="70" y="300" width="260" height="150" rx="10" fill="#c56a34" opacity="0.35" />
        <rect x="70" y="330" width="260" height="8" fill="#8c5a30" opacity="0.5" />
        <rect x="70" y="392" width="260" height="8" fill="#8c5a30" opacity="0.5" />
      </g>

      {/* Leafy greens */}
      <g fill="#34502f">
        <ellipse cx="130" cy="280" rx="34" ry="52" transform="rotate(-18 130 280)" />
        <ellipse cx="180" cy="268" rx="30" ry="56" />
        <ellipse cx="235" cy="278" rx="34" ry="50" transform="rotate(16 235 278)" />
      </g>
      <g fill="#4a6b41">
        <ellipse cx="150" cy="286" rx="20" ry="40" transform="rotate(-10 150 286)" />
        <ellipse cx="210" cy="282" rx="20" ry="44" transform="rotate(12 210 282)" />
      </g>

      {/* Tomatoes */}
      <circle cx="110" cy="326" r="24" fill="#c56a34" />
      <circle cx="103" cy="318" r="6" fill="#d98a5c" />
      <circle cx="292" cy="330" r="22" fill="#b8562a" />

      {/* Citrus */}
      <circle cx="270" cy="320" r="20" fill="#e0932f" />
      <circle cx="270" cy="320" r="20" fill="#f0b25a" opacity="0.4" />

      {/* Root veg */}
      <g transform="translate(190 322)">
        <path d="M0 0 C 10 4 12 26 4 40 C -2 30 -8 12 0 0 Z" fill="#c56a34" />
        <path d="M-2 -2 l -6 -14 M2 -2 l 4 -14 M0 -3 l 0 -16" stroke="#4a6b41" strokeWidth="3" fill="none" />
      </g>

      {/* Berries */}
      <circle cx="150" cy="336" r="8" fill="#7a2f4a" />
      <circle cx="164" cy="342" r="7" fill="#8c3a56" />
      <circle cx="156" cy="350" r="6" fill="#6b283f" />
    </svg>
  )
}
