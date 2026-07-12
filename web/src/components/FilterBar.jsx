import { ICONIC_TRAIL_IDS } from '../data/trails'

const DIFFICULTIES = ['Easy', 'Moderate', 'Hard']

export default function FilterBar({
  countries,
  country,
  difficulty,
  iconic,
  onCountryChange,
  onDifficultyChange,
  onIconicToggle,
  onClear,
}) {
  const hasActiveFilter = country || difficulty || iconic

  return (
    <div className="filter-bar">
      <div className="filter-selects">
        <select
          value={country}
          onChange={(e) => onCountryChange(e.target.value)}
          aria-label="Filter by country"
        >
          <option value="">All countries</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="filter-chips" role="group" aria-label="Filter by difficulty">
        <button
          type="button"
          className={difficulty === '' ? 'filter-chip active' : 'filter-chip'}
          onClick={() => onDifficultyChange('')}
        >
          All
        </button>
        {DIFFICULTIES.map((d) => (
          <button
            key={d}
            type="button"
            className={difficulty === d ? 'filter-chip active' : 'filter-chip'}
            onClick={() => onDifficultyChange(d)}
          >
            {d}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={iconic ? 'filter-toggle active' : 'filter-toggle'}
        onClick={() => onIconicToggle(!iconic)}
        aria-pressed={iconic}
      >
        <svg
          className="filter-toggle-icon"
          viewBox="0 0 24 24"
          width="13"
          height="13"
          fill={iconic ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 4.5h14l2.5 4.5L12 21 2.5 9z" />
          <path d="M2.5 9h19" />
        </svg>
        {ICONIC_TRAIL_IDS.size} Iconic Trails
      </button>

      {hasActiveFilter && (
        <button type="button" className="filter-clear" onClick={onClear}>
          Clear filters
        </button>
      )}
    </div>
  )
}
