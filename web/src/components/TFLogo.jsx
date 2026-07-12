/**
 * Trail Finder "TF" mark — the square brand tile.
 *
 * Letters are stroke-drawn (not live text) so the mark is fully self-contained
 * and renders identically as an inline logo or a favicon, with no web-font
 * dependency. Two-tone: cream "T", sand "F", on a terracotta squircle.
 *
 * The sun + trail doodles are the playful detail from the hero wordmark; they
 * only read above ~56px, so they auto-hide below that (header / favicon size).
 */
export default function TFLogo({ size = 40, doodles, className, title = 'Trail Finder' }) {
  const showDoodles = doodles ?? size >= 56

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={title}
      className={className}
    >
      <rect width="100" height="100" rx="24" fill="#C2582F" />

      {showDoodles && (
        <g fill="none" stroke="#FDFAF2" strokeLinecap="round">
          {/* sun */}
          <circle cx="50" cy="17" r="4.5" fill="#FDFAF2" stroke="none" />
          <g strokeWidth="2.4">
            <path d="M50 10 V6.5" />
            <path d="M57 17 H61" />
            <path d="M43 17 H39" />
            <path d="M54.6 12.4 L57 10" />
            <path d="M45.4 12.4 L43 10" />
          </g>
          {/* winding trail */}
          <path d="M22 85 q7 -7 14 0 t14 0 t14 0" strokeWidth="3" />
        </g>
      )}

      {/* T — cream */}
      <g fill="none" stroke="#FDFAF2" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 34 H45" />
        <path d="M34 34 V66" />
      </g>

      {/* F — sand */}
      <g fill="none" stroke="#F3D9C4" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M60 34 V66" />
        <path d="M60 34 H78" />
        <path d="M60 50 H74" />
      </g>
    </svg>
  )
}
