import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { trails, isYearRound, openRangeLabel } from '../data/trails'
import { TRAIL_PHOTOS } from '../data/trailPhotos'
import StatusBadge from '../components/StatusBadge'
import SeasonalHighlightTag from '../components/SeasonalHighlightTag'
import MonthBar from '../components/MonthBar'
import TrailMap from '../components/TrailMap'
import TrailFeedback from '../components/TrailFeedback'
import ShareButton from '../components/ShareButton'

export default function TrailDetail() {
  const { slug } = useParams()
  const [activePhoto, setActivePhoto] = useState(0)
  // Route geometry (OSM-sourced GeoJSON) is optional per trail: fetched lazily
  // from /data/routes/{slug}.geojson; trails without a file get null and the
  // map falls back to a single pin.
  const [route, setRoute] = useState(null)

  // Always open a trail at the top, regardless of where the list was scrolled.
  // Reset the gallery to the first photo whenever we open a different trail.
  useEffect(() => {
    window.scrollTo(0, 0)
    setActivePhoto(0)
  }, [slug])

  useEffect(() => {
    let alive = true
    setRoute(null)
    fetch(`/data/routes/${slug}.geojson`)
      .then((r) => (r.ok && (r.headers.get('content-type') || '').includes('json') ? r.json() : null))
      .catch(() => null)
      .then((gj) => { if (alive) setRoute(gj) })
    return () => { alive = false }
  }, [slug])

  const trail = trails.find((t) => t.slug === slug)

  if (!trail) {
    return (
      <div className="container page">
        <p>Trail not found. <Link to="/">Back to Browse</Link></p>
      </div>
    )
  }

  const photos = TRAIL_PHOTOS[trail.trail_id] ?? []
  const prevPhoto = () => setActivePhoto((i) => (i - 1 + photos.length) % photos.length)
  const nextPhoto = () => setActivePhoto((i) => (i + 1) % photos.length)

  return (
    <div className="container page trail-detail">
      <Link to="/" className="back-link">← Back to Browse</Link>

      {photos.length ? (
        <div className="trail-carousel">
          <div
            className="trail-detail-photo"
            style={{ backgroundImage: `url(${photos[activePhoto].url})` }}
          >
            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  className="carousel-arrow prev"
                  onClick={prevPhoto}
                  aria-label="Previous photo"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="carousel-arrow next"
                  onClick={nextPhoto}
                  aria-label="Next photo"
                >
                  ›
                </button>
                <span className="carousel-counter">{activePhoto + 1} / {photos.length}</span>
                <div className="carousel-dots">
                  {photos.map((p, i) => (
                    <button
                      key={p.url}
                      type="button"
                      className={`carousel-dot${i === activePhoto ? ' active' : ''}`}
                      onClick={() => setActivePhoto(i)}
                      aria-label={`Go to photo ${i + 1}: ${p.caption}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <p className="trail-gallery-credit">
            Photo: {photos[activePhoto].caption} ·{' '}
            {photos[activePhoto].credit} (
            <a href={photos[activePhoto].source} target="_blank" rel="noreferrer">
              {photos[activePhoto].license}
            </a>
            )
          </p>
        </div>
      ) : (
        <div
          className="trail-detail-photo"
          style={{ backgroundImage: `url(${trail.photo_url})` }}
        />
      )}

      <div className="trail-detail-header">
        <div className="trail-detail-title-row">
          <h1>{trail.name}</h1>
          <ShareButton title={trail.name} />
        </div>
        <p className="caption">{trail.region}, {trail.country}</p>
      </div>

      <div className="trail-detail-status">
        <StatusBadge status={trail.status} />
        <span className="open-window-tag">
          {isYearRound(trail) ? 'Open year-round' : `Open ${openRangeLabel(trail)}`}
        </span>
        <span className="caption">Checked {trail.status_last_checked}</span>
      </div>

      <p className="trail-detail-description">{trail.description}</p>

      <div className="stat-grid">
        <div className="stat">
          <span className="caption">Distance</span>
          <strong>{trail.distance_km} km</strong>
        </div>
        <div className="stat">
          <span className="caption">Duration</span>
          <strong>{formatDuration(trail.duration_hours)}</strong>
        </div>
        <div className="stat">
          <span className="caption">Elevation gain</span>
          <strong>{trail.elevation_gain_m} m</strong>
        </div>
        <div className="stat">
          <span className="caption">Difficulty</span>
          <strong>{trail.difficulty}</strong>
        </div>
      </div>

      <p className="difficulty-notes">{trail.difficulty_notes}</p>

      {trail.seasonal_highlights.length > 0 && (
        <section className="detail-section">
          <h2>Seasonal Highlights</h2>
          <div className="month-legend">
            <span className="month-legend-item"><i className="month-legend-swatch peak" /> Best</span>
            <span className="month-legend-item"><i className="month-legend-swatch open" /> Open</span>
            <span className="month-legend-item"><i className="month-legend-swatch closed" /> Closed</span>
          </div>
          <div className="highlight-list">
            {trail.seasonal_highlights.map((h) => (
              <div key={h.highlight_id} className="highlight-row">
                <div className="highlight-row-top">
                  <SeasonalHighlightTag highlight={h} />
                  <MonthBar trail={trail} highlight={h} />
                </div>
                <p>{h.highlight_description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="detail-section">
        <div className="detail-section-head">
          <h2>{route ? 'Location & Route' : 'Location'}</h2>
          {routeBadge(trail, route) && <span className="route-badge">{routeBadge(trail, route)}</span>}
        </div>
        <TrailMap trail={trail} route={route} />
        {route && (
          <p className="route-credit">
            Route: <a href={route.properties.source} target="_blank" rel="noreferrer">OpenStreetMap</a> (ODbL)
          </p>
        )}
      </section>

      <TrailFeedback trailId={trail.trail_id} />

      <div className="detail-links">
        <a href={trail.status_source_url} target="_blank" rel="noreferrer">
          Official status source
        </a>
        <a href={directionsUrl(trail, route)} target="_blank" rel="noreferrer">
          Directions to trailhead
        </a>
        {trail.alltrails_url && (
          <a href={trail.alltrails_url} target="_blank" rel="noreferrer">
            View on AllTrails
          </a>
        )}
      </div>
    </div>
  )
}

// "Loop · 8.4 km" — route type comes from the data when set (SK trails), or
// is derived from the geometry (a closed line) when a route file exists.
function routeBadge(trail, route) {
  const type = trail.route_type ?? (route?.properties?.closed ? 'Loop' : null)
  return type ? `${type} · ${trail.distance_km} km` : null
}

// Deep link to Google Maps directions — target the route's start point when we
// have geometry, otherwise the trail's own coordinates.
function directionsUrl(trail, route) {
  const [lat, lng] = route?.properties?.endpoints?.start ?? [trail.latitude, trail.longitude]
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
}

function formatDuration(hours) {
  if (hours < 1) return `${Math.round(hours * 60)} min`
  const whole = Math.floor(hours)
  const mins = Math.round((hours - whole) * 60)
  return mins === 0 ? `${whole} hr` : `${whole} hr ${mins} min`
}
