import { trails, isYearRound, openRangeLabel, MONTH_NAMES } from '../data/trails'

// Thai month names, parallel to MONTH_NAMES (English) from the trail data.
const THAI_MONTHS = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
]

const trailById = (id) => trails.find((t) => t.trail_id === id) ?? null

// The shareable postcard face — deliberately clean (no toggle, no CTA); those
// live in the modal chrome so the card itself stays share-ready. `entry` is a
// BIRTH_MONTHS item, `pick` is the chosen { tier, trailId, blurb }, `lang` is
// 'th' | 'en'.
export default function BirthMonthPostcard({ entry, pick, lang }) {
  const trail = trailById(pick.trailId)
  if (!trail) return null

  const mm = String(entry.month).padStart(2, '0')
  const monthLabel = lang === 'th'
    ? `${THAI_MONTHS[entry.month - 1]} · ${MONTH_NAMES[entry.month - 1].toUpperCase()}`
    : MONTH_NAMES[entry.month - 1].toUpperCase()
  const season = isYearRound(trail) ? 'Year-round' : openRangeLabel(trail)

  return (
    <article className={`bmp lang-${lang}`}>
      <img className="bmp-stamp" src={`/stamps/stamp-${mm}.png`} alt="" aria-hidden="true" />

      <header className="bmp-head">
        <div className="bmp-eyebrow"><span className="bmp-rule" />Birth-Month Trail<span className="bmp-rule" /></div>
        <div className="bmp-month">{monthLabel}</div>
        <h3 className="bmp-persona">{entry.personality[lang]}</h3>
      </header>

      <figure className="bmp-photo">
        <img src={trail.photo_url} alt={trail.name} />
        <figcaption className="bmp-cap">{trail.name} · {trail.region}</figcaption>
      </figure>

      <div className="bmp-trail">
        <div className="bmp-trail-name">{trail.name}</div>
        <div className="bmp-meta">
          <span>{trail.country}</span>
          <span className="bmp-dot" /><span>{trail.distance_km} KM</span>
          <span className="bmp-dot" /><span>{trail.difficulty}</span>
          <span className="bmp-dot" /><span>{season}</span>
        </div>
      </div>

      <div className="bmp-divider">
        <span className="bmp-line" />
        <svg width="60" height="16" viewBox="0 0 60 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
          <path d="M2 14l9-9 6 6 8-11 7 14" /><path d="M31 14l8-8 5 5 6-9 6 12" opacity=".55" />
        </svg>
        <span className="bmp-line r" />
      </div>

      <p className="bmp-blurb">{pick.blurb[lang]}</p>

      <div className="bmp-quote">
        <div className="bmp-quote-line">{entry.quote[lang]}</div>
      </div>
    </article>
  )
}
