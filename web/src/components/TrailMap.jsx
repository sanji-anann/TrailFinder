import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Basemaps: topo (contours/terrain — the default) and street as a toggle.
const TILES = {
  topo: {
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution:
      'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM | Style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)',
  },
  street: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
}

const START_ICON = (label) =>
  L.divIcon({
    className: 'route-endpoint',
    html: `<span class="route-pin route-pin-start" title="${label}"><svg viewBox="0 0 24 24" width="10" height="10" fill="#fff" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg></span>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  })

const END_ICON = L.divIcon({
  className: 'route-endpoint',
  html: '<span class="route-pin route-pin-end" title="End"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4"/><path d="M5 4h11l-2.5 4L16 12H5"/></svg></span>',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
})

const FALLBACK_ICON = L.divIcon({
  className: 'route-endpoint',
  html: '<span class="route-pin route-pin-fallback"></span>',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
})

// `route` is the trail's GeoJSON Feature (or null when none exists — then we
// fall back to a single pin at the trail's coordinates, like the old map).
export default function TrailMap({ trail, route }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const tileRef = useRef(null)
  const routeLayersRef = useRef([])
  const [basemap, setBasemap] = useState('topo')

  // Create the map once.
  useEffect(() => {
    if (mapRef.current || !containerRef.current) return
    const map = L.map(containerRef.current, { zoomControl: false, tap: true, maxZoom: 17 })
    L.control.zoom({ position: 'bottomright' }).addTo(map)
    map.setView([trail.latitude, trail.longitude], 13)
    mapRef.current = map
    setTimeout(() => map.invalidateSize(), 0)
    return () => {
      map.remove()
      mapRef.current = null
      tileRef.current = null
      routeLayersRef.current = []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Swap tile layers when the basemap toggle changes.
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    if (tileRef.current) tileRef.current.remove()
    const t = TILES[basemap]
    tileRef.current = L.tileLayer(t.url, { maxZoom: 17, attribution: t.attribution }).addTo(map)
  }, [basemap])

  // Draw the route (with start/end markers) or the single-pin fallback.
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    map.invalidateSize()
    routeLayersRef.current.forEach((l) => l.remove())
    routeLayersRef.current = []

    if (route?.geometry) {
      // White casing under the terracotta line keeps it readable on topo tiles.
      const casing = L.geoJSON(route, { style: { color: '#fff', weight: 7, opacity: 0.85 } }).addTo(map)
      const line = L.geoJSON(route, { style: { color: '#c2582f', weight: 4, opacity: 0.95 } }).addTo(map)
      routeLayersRef.current.push(casing, line)

      const ep = route.properties?.endpoints
      if (ep) {
        if (route.properties.closed) {
          const m = L.marker(ep.start, { icon: START_ICON('Start / End') }).addTo(map)
          m.bindTooltip('Start / End', { direction: 'top', offset: [0, -12] })
          routeLayersRef.current.push(m)
        } else {
          const s = L.marker(ep.start, { icon: START_ICON('Start') }).addTo(map)
          s.bindTooltip('Start', { direction: 'top', offset: [0, -12] })
          const e = L.marker(ep.end, { icon: END_ICON }).addTo(map)
          e.bindTooltip('End', { direction: 'top', offset: [0, -12] })
          routeLayersRef.current.push(s, e)
        }
      }
      map.fitBounds(line.getBounds(), { padding: [30, 30] })
    } else {
      const m = L.marker([trail.latitude, trail.longitude], { icon: FALLBACK_ICON }).addTo(map)
      m.bindTooltip(trail.name, { direction: 'top', offset: [0, -12] })
      routeLayersRef.current.push(m)
      map.setView([trail.latitude, trail.longitude], 13)
    }
  }, [route, trail.latitude, trail.longitude, trail.name])

  return (
    <div className="trail-map">
      <div className="trail-map-canvas" ref={containerRef} />
      <div className="map-style-toggle" role="group" aria-label="Map style">
        <button
          type="button"
          className={basemap === 'topo' ? 'active' : ''}
          onClick={() => setBasemap('topo')}
        >
          Topo
        </button>
        <button
          type="button"
          className={basemap === 'street' ? 'active' : ''}
          onClick={() => setBasemap('street')}
        >
          Street
        </button>
      </div>
    </div>
  )
}
