import { useEffect, useState } from 'react'
import { getMyVote, getLocalCounts, fetchCounts, submitVote } from '../state/votes'

// "Was this information helpful?" — a whole-trail thumbs vote. When a shared
// backend is configured, the aggregate result is shown to every visitor so it
// signals to other hikers whether a trail's info is trustworthy.
export default function TrailFeedback({ trailId }) {
  const [myVote, setMyVote] = useState(() => getMyVote(trailId))
  // Seed with the local counts synchronously so the numbers are visible on
  // first paint; the effect then upgrades them to the shared tally if a backend
  // responds.
  const [counts, setCounts] = useState(() => getLocalCounts(trailId))
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    setMyVote(getMyVote(trailId))
    setCounts(getLocalCounts(trailId))
    let alive = true
    fetchCounts(trailId).then((c) => { if (alive && c) setCounts(c) })
    return () => { alive = false }
  }, [trailId])

  async function vote(useful) {
    if (busy || myVote) return
    setBusy(true)
    setMyVote(useful ? 'useful' : 'not_useful')
    const updated = await submitVote(trailId, useful)
    if (updated) setCounts(updated)
    setBusy(false)
  }

  const voted = Boolean(myVote)
  const total = counts ? counts.useful + counts.not_useful : 0

  return (
    <section className="trail-feedback">
      <div className="trail-feedback-row">
        <span className="trail-feedback-q">
          {voted ? 'Thanks for your feedback!' : 'Was this information helpful?'}
        </span>
        <div className="trail-feedback-btns">
          <button
            type="button"
            className={`vote-btn${myVote === 'useful' ? ' chosen' : ''}`}
            onClick={() => vote(true)}
            disabled={voted || busy}
            aria-pressed={myVote === 'useful'}
          >
            <ThumbIcon /> Useful
            <span className="vote-count">{counts.useful}</span>
          </button>
          <button
            type="button"
            className={`vote-btn negative${myVote === 'not_useful' ? ' chosen' : ''}`}
            onClick={() => vote(false)}
            disabled={voted || busy}
            aria-pressed={myVote === 'not_useful'}
          >
            <ThumbIcon down /> Not useful
            <span className="vote-count">{counts.not_useful}</span>
          </button>
        </div>
      </div>

      {total > 0 && (
        <p className="trail-feedback-stat">
          {total} {total === 1 ? 'hiker has' : 'hikers have'} voted
        </p>
      )}
    </section>
  )
}

function ThumbIcon({ down = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={down ? { transform: 'rotate(180deg)' } : undefined}
    >
      <path d="M7 10v11" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  )
}
