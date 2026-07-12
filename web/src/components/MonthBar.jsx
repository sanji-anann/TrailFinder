import { MONTH_NAMES, openMonths } from '../data/trails'

function monthAbbrev(m) {
  return MONTH_NAMES[m - 1].slice(0, 3)
}

function isMonthInRange(month, start, end) {
  if (start <= end) return month >= start && month <= end
  // wraps around year end, e.g. Nov(11)–Feb(2)
  return month >= start || month <= end
}

// Three-tone strip: solid = best/peak months, light = open but off-peak,
// faint = closed/inaccessible. `trail` supplies the open window so year-round
// trails don't look "closed" outside their best season.
export default function MonthBar({ trail, highlight, activeMonth }) {
  const range = highlight.month_start === highlight.month_end
    ? monthAbbrev(highlight.month_start)
    : `${monthAbbrev(highlight.month_start)}–${monthAbbrev(highlight.month_end)}`

  const open = trail ? openMonths(trail) : null

  return (
    <span className="month-bar-wrap" title={`Best season to visit: ${range}`}>
      <span className="month-bar" role="img" aria-label={`Best season to visit: ${range}`}>
        {MONTH_NAMES.map((name, i) => {
          const month = i + 1
          const peak = isMonthInRange(month, highlight.month_start, highlight.month_end)
          const isOpen = open ? open.has(month) : true
          const current = month === activeMonth
          const cls =
            'month-bar-seg' +
            (peak ? ' active' : isOpen ? ' open' : '') +
            (current ? ' current' : '')
          return <span key={month} className={cls} title={name} />
        })}
      </span>
      <span className="month-bar-label">{range}</span>
    </span>
  )
}
