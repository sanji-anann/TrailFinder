// Client wrapper for trail feedback votes ("Was this information helpful?").
//
// Votes live in a small external counter service (a Cloudflare Worker + KV by
// default — see /worker) so counts can be SHARED across visitors. Sharing is
// the whole point: localStorage alone can only remember one device's own vote,
// which can never tell another hiker whether a trail's info was useful.
//
// The service base URL is read from VITE_VOTES_API at build time. When it's
// unset (e.g. local dev, or before the Worker is deployed) the module degrades
// to LOCAL-ONLY mode: it still records the visitor's own vote in localStorage
// to lock the UI, but returns no community counts. We never invent numbers.

const API = import.meta.env.VITE_VOTES_API?.replace(/\/+$/, '') || null

export const hasBackend = Boolean(API)

const storageKey = (trailId) => `tf_vote_${trailId}`

// The visitor's own prior vote on this trail: 'useful' | 'not_useful' | null.
export function getMyVote(trailId) {
  try {
    return localStorage.getItem(storageKey(trailId))
  } catch {
    return null
  }
}

function rememberMyVote(trailId, choice) {
  try {
    localStorage.setItem(storageKey(trailId), choice)
  } catch {
    // Storage disabled / private mode — the vote still posts, we just can't
    // remember it locally to prevent a re-vote on this device.
  }
}

// Counts we can derive without a backend: just this device's own vote (0 or 1
// in one bucket). Real, not invented — it's what LOCAL-ONLY mode can honestly
// show so the number labels are always present. The deployed Worker replaces
// these with the shared, cross-visitor tally.
export function getLocalCounts(trailId) {
  const v = getMyVote(trailId)
  return { useful: v === 'useful' ? 1 : 0, not_useful: v === 'not_useful' ? 1 : 0 }
}

// Read counts for a trail. Always resolves to { useful, not_useful }: the shared
// tally when a backend is configured and reachable, otherwise the local fallback.
export async function fetchCounts(trailId) {
  if (!API) return getLocalCounts(trailId)
  try {
    const res = await fetch(`${API}/votes/${trailId}`)
    if (!res.ok) return getLocalCounts(trailId)
    return normalize(await res.json())
  } catch {
    return getLocalCounts(trailId)
  }
}

// Cast a vote (`useful` is a boolean). Records the local vote regardless, and
// returns the updated counts (shared when a backend exists, else the local
// fallback so the number labels still update).
export async function submitVote(trailId, useful) {
  rememberMyVote(trailId, useful ? 'useful' : 'not_useful')
  if (!API) return getLocalCounts(trailId)
  try {
    const res = await fetch(`${API}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trail_id: trailId, useful }),
    })
    if (!res.ok) return getLocalCounts(trailId)
    return normalize(await res.json())
  } catch {
    return getLocalCounts(trailId)
  }
}

function normalize(data) {
  return {
    useful: Number(data?.useful) || 0,
    not_useful: Number(data?.not_useful) || 0,
  }
}
