const STATUS_STYLES = {
  Open: { label: 'Open', modifier: 'status-open' },
  'Partially Closed': { label: 'Partially Closed', modifier: 'status-gold' },
  Closed: { label: 'Closed', modifier: 'status-closed' },
}

// A seasonal closure is a real closure to the hiker standing there today, so an
// 'Open' status must not show as green outside the trail's access window. It
// stays gold rather than red because it is expected and temporary — the red
// 'Closed' is reserved for the indefinite kind (earthquake damage, volcanic
// gas). An explicit Closed/Partially Closed status still wins: that is the
// verified word from the park authority.
// Label kept to the length of 'Partially Closed', which the card header already
// lays out without wrapping the trail title.
const OUT_OF_SEASON_STYLE = { label: 'Seasonally Closed', modifier: 'status-gold' }

export default function StatusBadge({ status, outOfSeason = false }) {
  const style =
    outOfSeason && (status ?? 'Open') === 'Open'
      ? OUT_OF_SEASON_STYLE
      : STATUS_STYLES[status] ?? STATUS_STYLES.Open
  return (
    <span className={`status-badge ${style.modifier}`}>
      {style.label}
    </span>
  )
}
