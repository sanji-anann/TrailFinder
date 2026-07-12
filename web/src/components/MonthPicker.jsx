import { MONTH_NAMES } from '../data/trails'

export default function MonthPicker({ selectedMonth, onSelect }) {
  return (
    <div className="month-picker">
      {MONTH_NAMES.map((name, i) => {
        const month = i + 1
        return (
          <button
            key={month}
            type="button"
            className={month === selectedMonth ? 'month-pill active' : 'month-pill'}
            onClick={() => onSelect(month)}
          >
            {name.slice(0, 3)}
          </button>
        )
      })}
    </div>
  )
}
