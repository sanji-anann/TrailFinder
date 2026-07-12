import { Link } from 'react-router-dom'
import MonthBar from './MonthBar'
import { isYearRound, openRangeLabel } from '../data/trails'

// Compact card that slides up over the map when a pin is tapped.
// Kept slim so it works as a bottom sheet on phones.
export default function MapTrailCard({ trail, inSeason, month, highlight, onClose }) {
  const shownHighlight = highlight ?? trail.seasonal_highlights[0]

  return (
    <div className="map-card" role="dialog" aria-label={trail.name}>
      <button type="button" className="map-card-close" onClick={onClose} aria-label="Close">
        ×
      </button>
      <Link to={`/trail/${trail.slug}`} className="map-card-link">
        <div
          className="map-card-photo"
          style={{ backgroundImage: `url(${trail.photo_url})` }}
        />
        <div className="map-card-body">
          <h3 className="map-card-title">{trail.name}</h3>
          <p className="map-card-loc">{trail.region} · {trail.country}</p>
          <p className={`map-card-season${inSeason ? ' on' : ''}`}>
            {inSeason
              ? '✓ At its best now'
              : isYearRound(trail)
                ? 'Open year-round · off-peak now'
                : `Open ${openRangeLabel(trail)} · not now`}
          </p>
          <div className="map-card-meta">
            <span className="map-card-diff">{trail.difficulty}</span>
            <span>·</span>
            <span>{trail.distance_km} km</span>
            <span>·</span>
            <span>{trail.elevation_gain_m} m</span>
          </div>
          {shownHighlight && <MonthBar trail={trail} highlight={shownHighlight} activeMonth={month} />}
        </div>
      </Link>
    </div>
  )
}
