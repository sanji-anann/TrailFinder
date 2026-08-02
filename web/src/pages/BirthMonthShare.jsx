import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import { birthMonthFor } from '../data/birthMonths'
import { trails, MONTH_NAMES } from '../data/trails'
import BirthMonthPostcard from '../components/BirthMonthPostcard'

const trailById = (id) => trails.find((t) => t.trail_id === id) ?? null

// Landing page for a shared birth-month postcard: /birth-month/:month/:tier
// (tier = 0..3, the Easy/Moderate/Hard/Challenging index). The prerender step
// gives each of these URLs an og:image of the postcard itself, so a pasted link
// previews as the card on Facebook/etc. `?og=1` switches to a bare 1200x630
// composition that the OG-image generator screenshots.
export default function BirthMonthShare() {
  const { month, tier } = useParams()
  const [params] = useSearchParams()
  const lang = params.get('lang') === 'en' ? 'en' : 'th'
  const ogMode = params.get('og') != null

  const m = Number(month)
  const ti = Number(tier)
  const entry = Number.isInteger(m) ? birthMonthFor(m) : null
  const pick = entry && Number.isInteger(ti) ? entry.trails[ti] : null
  const trail = pick ? trailById(pick.trailId) : null

  if (!entry || !pick || !trail) return <Navigate to="/" replace />

  const t = (th, en) => (lang === 'th' ? th : en)

  // 1200x630 composition captured by the OG generator.
  if (ogMode) {
    return (
      <div className="bmog">
        <div className="bmog-card">
          <BirthMonthPostcard entry={entry} pick={pick} lang={lang} />
        </div>
        <div className="bmog-side">
          <div className="bmog-eyebrow">Birth-Month Trail</div>
          <div className={`bmog-persona${lang === 'th' ? ' th' : ''}`}>{entry.personality[lang]}</div>
          <div className="bmog-trail">{trail.name}</div>
          <div className="bmog-meta">{MONTH_NAMES[m - 1]} · {trail.country}</div>
          <div className="bmog-brand"><span className="bmog-tf">TF</span> trailfinder</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container page bmshare">
      <p className="bmshare-kicker">{t('เส้นทางประจำเดือนเกิด', 'Birth-Month Trail')}</p>
      <div className="bmshare-card">
        <BirthMonthPostcard entry={entry} pick={pick} lang={lang} />
      </div>
      <div className="bmshare-actions">
        <Link to={`/trail/${trail.slug}`} className="bmshare-primary">
          {t('ดูเส้นทางนี้', 'See the trail')}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </Link>
        <Link to="/" className="bmshare-secondary">{t('หาเดือนเกิดของคุณ', 'Find your own month')}</Link>
      </div>
    </div>
  )
}
