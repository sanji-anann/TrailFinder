/**
 * Trail Finder playful wordmark — the "field notes" lockup.
 *
 * Rounded bubble type (Baloo 2) in terracotta, flanked by a hand-drawn sun and
 * pine. Used on light (paper) surfaces: the header brand, and later the footer.
 * Scales with `fontSize`, but a `--wordmark-size` CSS variable (set on the
 * element via `className`) takes precedence — so callers can size it
 * responsively from CSS. All sub-parts use `em` units to scale together.
 * Set `showDoodles={false}` for a text-only variant.
 */
export default function Wordmark({ fontSize = 26, showDoodles = true, className, title = 'Trail Finder' }) {
  return (
    <span
      className={className}
      role="img"
      aria-label={title}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4em',
        fontSize: `var(--wordmark-size, ${fontSize}px)`,
      }}
    >
      {showDoodles && (
        <svg width="0.92em" height="0.92em" viewBox="0 0 40 40" aria-hidden="true">
          <circle cx="20" cy="20" r="8" fill="#C2582F" />
          <g stroke="#C2582F" strokeWidth="2.6" strokeLinecap="round">
            <path d="M20 3v4" /><path d="M20 33v4" /><path d="M3 20h4" /><path d="M33 20h4" />
            <path d="M8 8l3 3" /><path d="M29 29l3 3" /><path d="M32 8l-3 3" /><path d="M8 32l3-3" />
          </g>
        </svg>
      )}

      <span
        aria-hidden="true"
        style={{
          fontFamily: "'Baloo 2', var(--font-display)",
          fontWeight: 800,
          fontSize: '1em',
          lineHeight: 0.9,
          letterSpacing: '0.02em',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ color: '#C2582F' }}>TRAIL</span>
        <span style={{ color: '#A8461F' }}>&nbsp;FINDER</span>
      </span>

      {showDoodles && (
        <svg width="0.72em" height="0.95em" viewBox="0 0 40 44" aria-hidden="true">
          <path d="M20 6 L27 20 L13 20 Z M20 16 L30 34 L10 34 Z" fill="#C2582F" />
          <rect x="18" y="33" width="4" height="7" fill="#C2582F" />
        </svg>
      )}
    </span>
  )
}
