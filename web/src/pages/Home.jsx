import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { trails, isIconic, isTrailInMonth, highlightsForMonth, MONTH_NAMES } from '../data/trails'
import { continentForCountry } from '../data/geography'
import { useHomeUi } from '../state/HomeUiContext'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'
import MonthPicker from '../components/MonthPicker'
import TrailCard from '../components/TrailCard'
import BrowseMap from '../components/BrowseMap'
import MapTrailCard from '../components/MapTrailCard'

export default function Home() {
  // Browsing state lives in context so it (and the scroll position) survive a
  // trip to a trail's detail page and back.
  const {
    query, setQuery,
    country, setCountry,
    difficulty, setDifficulty,
    iconic, setIconic,
    month, setMonth,
    view,
    scrollYRef,
  } = useHomeUi()
  const [selectedId, setSelectedId] = useState(null)

  // Restore the remembered scroll position on mount (e.g. after tapping back),
  // and keep it up to date while browsing.
  useLayoutEffect(() => {
    window.scrollTo(0, scrollYRef.current)
  }, [scrollYRef])

  useEffect(() => {
    const onScroll = () => { scrollYRef.current = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollYRef])

  const countries = useMemo(
    () => [...new Set(trails.map((t) => t.country))].sort(),
    [],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return trails.filter((t) => {
      // One friendly search box matches trail name, region, country or continent.
      const matchesQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.region.toLowerCase().includes(q) ||
        t.country.toLowerCase().includes(q) ||
        continentForCountry(t.country).toLowerCase().includes(q)
      const matchesCountry = !country || t.country === country
      const matchesDifficulty = !difficulty || t.difficulty === difficulty
      const matchesIconic = !iconic || isIconic(t)
      return matchesQuery && matchesCountry && matchesDifficulty && matchesIconic
    })
  }, [query, country, difficulty, iconic])

  // Split by whether each trail is in its best season for the selected month.
  const { inSeason, offSeason, inSeasonIds } = useMemo(() => {
    const on = []
    const off = []
    const ids = new Set()
    for (const t of filtered) {
      if (t.status !== 'Closed' && isTrailInMonth(t, month)) {
        on.push(t)
        ids.add(t.trail_id)
      } else {
        off.push(t)
      }
    }
    return { inSeason: on, offSeason: off, inSeasonIds: ids }
  }, [filtered, month])

  const monthName = MONTH_NAMES[month - 1]
  const selectedTrail = selectedId != null
    ? filtered.find((t) => t.trail_id === selectedId) ?? null
    : null

  const clearFilters = () => {
    setQuery('')
    setCountry('')
    setDifficulty('')
    setIconic(false)
  }

  return (
    <div className="container page">
      <section className="hero-copy season-hero">
        <h1>What's good to hike right now?</h1>
        <p className="hero-tagline">Hike it at its best</p>
      </section>

      <div className="month-primary">
        <span className="month-primary-label">Start here — pick a month</span>
        <MonthPicker selectedMonth={month} onSelect={setMonth} />
        <p className="season-summary">
          <strong>{inSeason.length}</strong>{' '}
          {inSeason.length === 1 ? 'trail is' : 'trails are'} at their best this{' '}
          <strong>{monthName}</strong>.
        </p>
      </div>

      <section className="refine refine-open" aria-label="Refine trails">
        <span className="refine-label">Refine by name, country or difficulty</span>
        <div className="refine-body">
          <div className="search-row">
            <SearchBar value={query} onChange={setQuery} />
          </div>
          <FilterBar
            countries={countries}
            country={country}
            difficulty={difficulty}
            iconic={iconic}
            onCountryChange={setCountry}
            onDifficultyChange={setDifficulty}
            onIconicToggle={setIconic}
            onClear={clearFilters}
          />
        </div>
      </section>

      {view === 'map' ? (
        <div className="map-view">
          <BrowseMap
            trails={filtered}
            inSeasonIds={inSeasonIds}
            activeId={selectedId}
            onSelect={setSelectedId}
          />
          <div className="map-legend" aria-hidden="true">
            <span className="map-legend-item"><span className="map-legend-dot on" /> At its best · {monthName}</span>
            <span className="map-legend-item"><span className="map-legend-dot" /> Better another month</span>
          </div>
          {selectedTrail ? (
            <MapTrailCard
              trail={selectedTrail}
              inSeason={inSeasonIds.has(selectedTrail.trail_id)}
              month={month}
              highlight={highlightsForMonth(selectedTrail, month)[0]}
              onClose={() => setSelectedId(null)}
            />
          ) : (
            <p className="map-hint">Tap a pin to see the trail</p>
          )}
        </div>
      ) : (
        <>
          <h2 className="section-heading">
            At its best in {monthName}
            <span className="section-count">{inSeason.length}</span>
          </h2>
          {inSeason.length > 0 ? (
            <div className="trail-grid">
              {inSeason.map((trail) => (
                <TrailCard
                  key={trail.trail_id}
                  trail={trail}
                  month={month}
                  highlight={highlightsForMonth(trail, month)[0]}
                />
              ))}
            </div>
          ) : (
            <p className="empty-state">
              No trails match your filters for {monthName}. Try another month or clear a filter.
            </p>
          )}

          {offSeason.length > 0 && (
            <>
              <h2 className="section-heading section-heading-muted">
                Better another month
                <span className="section-count">{offSeason.length}</span>
              </h2>
              <div className="trail-grid">
                {offSeason.map((trail) => (
                  <TrailCard key={trail.trail_id} trail={trail} month={month} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
