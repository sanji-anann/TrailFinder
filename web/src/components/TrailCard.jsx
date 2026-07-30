import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge'
import SeasonalHighlightTag from './SeasonalHighlightTag'
import MonthBar from './MonthBar'
import { MONTH_NAMES, isTrailInMonth, highlightsForMonth, isYearRound, openRangeLabel, isOutOfSeason } from '../data/trails'

const STATUS_TINTS = {
  // Open trails show the photo untinted; the gold/red tints stay as a
  // status cue for trails that are closed or partly closed.
  Open: 'transparent',
  'Partially Closed': 'var(--trail-gold)',
  Closed: 'var(--brick-red)',
}

// `month` (1-12) puts the card in "season lens" mode: it highlights the given
// month in the strip and, when the trail is in season then, shows an
// In-season badge and surfaces that month's highlight.
export default function TrailCard({ trail, highlight, month }) {
  const inSeasonNow =
    month != null && trail.status !== 'Closed' && isTrailInMonth(trail, month)
  const shownHighlight =
    highlight ??
    (month != null ? highlightsForMonth(trail, month)[0] : null) ??
    trail.seasonal_highlights[0]
  const tint = STATUS_TINTS[trail.status] ?? STATUS_TINTS.Open
  // In season-lens mode the badge answers "could I walk it in the month I
  // picked?"; with no month picked it falls back to today.
  const outOfSeason = isOutOfSeason(trail, month ?? undefined)

  return (
    <Link to={`/trail/${trail.slug}`} className="trail-card">
      <div
        className="trail-card-photo"
        style={{ backgroundImage: `url(${trail.photo_url})` }}
      >
        <div className="trail-card-photo-tint" style={{ '--tint-color': tint }} />
        {inSeasonNow && (
          <span className="in-season-badge">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12.5l4.2 4.2L19 6.5" />
            </svg>
            At its best
          </span>
        )}
      </div>
      <div className="trail-card-body">
        <div className="trail-card-top">
          <h3>{trail.name}</h3>
          <StatusBadge status={trail.status} outOfSeason={outOfSeason} />
        </div>
        <p className="trail-card-location">{trail.region} · {trail.country}</p>

        <div className="trail-card-stats">
          <div className="trail-card-stat">
            <span className="trail-card-stat-label">Distance</span>
            <span className="trail-card-stat-value">{trail.distance_km} km</span>
          </div>
          <div className="trail-card-stat">
            <span className="trail-card-stat-label">Elevation</span>
            <span className="trail-card-stat-value">{trail.elevation_gain_m} m</span>
          </div>
        </div>

        <div className="trail-card-meta">
          <span className="difficulty-pill">{trail.difficulty}</span>
          {shownHighlight && <SeasonalHighlightTag highlight={shownHighlight} />}
        </div>
        {shownHighlight && (
          <div className="trail-card-footer">
            <span className={`trail-card-footer-label${inSeasonNow ? ' in-season' : ''}`}>
              {inSeasonNow
                ? `At its best · ${MONTH_NAMES[month - 1]}`
                : isYearRound(trail)
                  ? 'Open year-round · best'
                  : `Open ${openRangeLabel(trail)} · best`}
            </span>
            <MonthBar trail={trail} highlight={shownHighlight} activeMonth={month} />
          </div>
        )}
      </div>
    </Link>
  )
}
