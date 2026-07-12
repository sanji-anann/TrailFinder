export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar-wrap">
      <svg
        className="search-bar-icon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="search"
        className="search-bar"
        placeholder="Search trails, regions or countries…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search trails"
      />
    </div>
  )
}
