// Small inline icons that hint at the *kind* of seasonal highlight.
// Icons inherit the tag's colour via `currentColor`.
const ICONS = {
  leaf: (
    <>
      <path d="M20 4C11 4 5 10 5 19c9 0 15-6 15-15z" />
      <path d="M5 19C10 14 14 10 18 7" />
    </>
  ),
  sprout: (
    <>
      <path d="M12 20v-8" />
      <path d="M12 12C12 8 9 6 5 6c0 4 3 6 7 6z" />
      <path d="M12 13c0-3.6 3-5.6 7-5.6 0 3.6-3 5.6-7 5.6z" />
    </>
  ),
  snow: (
    <>
      <path d="M12 2v20M4.2 7l15.6 10M19.8 7 4.2 17" />
      <path d="M12 6l2.2-2.2M12 6 9.8 3.8M12 18l2.2 2.2M12 18l-2.2 2.2" />
    </>
  ),
  water: <path d="M12 3s6.5 7 6.5 11a6.5 6.5 0 1 1-13 0C5.5 10 12 3 12 3z" />,
  tree: (
    <>
      <path d="M12 3 7 10h3l-4 6h12l-4-6h3z" />
      <path d="M12 16v4" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </>
  ),
  mountain: <path d="M3 18l5-8 3.5 5 2.5-3.5 5 6.5z" />,
}

// Ordered keyword → icon rules; first match wins.
const RULES = [
  [/winter|snow/, 'snow'],
  [/blossom|bloom|azalea|rhododendron|wildflower|flower|cherry|plum|cabbage|garden/, 'sprout'],
  [/autumn|foliage|beech/, 'leaf'],
  [/whale|swim|coast|reflection|pond|marsh|waterfall|sound|lake|calm|water/, 'water'],
  [/moss|cedar|forest|green/, 'tree'],
  [/summer|dry|warm|prime|access|great walk/, 'sun'],
]

function iconFor(tag) {
  const t = tag.toLowerCase()
  for (const [re, name] of RULES) if (re.test(t)) return ICONS[name]
  return ICONS.mountain
}

export default function SeasonalHighlightTag({ highlight }) {
  return (
    <span className="highlight-tag">
      <svg
        className="highlight-tag-icon"
        viewBox="0 0 24 24"
        width="13"
        height="13"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {iconFor(highlight.tag)}
      </svg>
      {highlight.tag}
    </span>
  )
}
