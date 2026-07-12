const STATUS_STYLES = {
  Open: { label: 'Open', modifier: 'status-open' },
  'Partially Closed': { label: 'Partially Closed', modifier: 'status-gold' },
  Closed: { label: 'Closed', modifier: 'status-closed' },
}

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.Open
  return (
    <span className={`status-badge ${style.modifier}`}>
      {style.label}
    </span>
  )
}
