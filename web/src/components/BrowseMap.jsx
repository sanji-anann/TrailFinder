import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Map view of the filtered trails. Pins are green when the trail is in season
// for the selected month and muted otherwise. Tapping a pin calls onSelect;
// the pin matching `activeId` is enlarged and centered.
export default function BrowseMap({ trails, inSeasonIds, activeId, onSelect }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef(new Map())
  const onSelectRef = useRef(onSelect)
  onSelectRef.current = onSelect

  // Create the map once.
  useEffect(() => {
    if (mapRef.current || !containerRef.current) return
    const map = L.map(containerRef.current, {
      zoomControl: false,
      // Friendlier touch behaviour on phones: one-finger pan works, pinch zooms.
      tap: true,
    }).setView([10, 140], 2)
    L.control.zoom({ position: 'bottomright' }).addTo(map)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 17,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map)
    mapRef.current = map
    setTimeout(() => map.invalidateSize(), 0)
    return () => {
      map.remove()
      mapRef.current = null
      markersRef.current.clear()
    }
  }, [])

  // Rebuild pins when the filtered set or the season lens changes, then frame them.
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    map.invalidateSize()
    markersRef.current.forEach((m) => m.remove())
    markersRef.current.clear()

    const points = []
    trails.forEach((t) => {
      const seasonClass = inSeasonIds.has(t.trail_id) ? ' in-season' : ''
      const icon = L.divIcon({
        className: 'map-pin-wrap',
        html: `<span class="map-pin${seasonClass}"></span>`,
        // Generous hit area for touch; the visible dot is styled smaller in CSS.
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      })
      const marker = L.marker([t.latitude, t.longitude], { icon, riseOnHover: true })
        .addTo(map)
        .on('click', () => onSelectRef.current(t.trail_id))
      markersRef.current.set(t.trail_id, marker)
      points.push([t.latitude, t.longitude])
    })

    if (points.length) map.fitBounds(points, { padding: [45, 45], maxZoom: 10 })
  }, [trails, inSeasonIds])

  // Highlight + center the active pin.
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    markersRef.current.forEach((marker, id) => {
      const pin = marker.getElement()?.querySelector('.map-pin')
      if (pin) pin.classList.toggle('active', id === activeId)
      marker.setZIndexOffset(id === activeId ? 1000 : 0)
    })
    if (activeId != null) {
      const m = markersRef.current.get(activeId)
      if (m) map.panTo(m.getLatLng(), { animate: true })
    }
  }, [activeId])

  return <div className="browse-map" ref={containerRef} />
}
