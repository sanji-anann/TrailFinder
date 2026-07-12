// Cloudflare Worker — TrailFinder "Was this information helpful?" vote counter.
//
// Storage: one KV entry per trail — key `t:<trail_id>` → {"useful":N,"not_useful":M}.
//
// Endpoints (CORS-open so the static site can call it from any origin):
//   GET  /votes/:trailId   → { useful, not_useful }
//   POST /vote  {trail_id, useful:boolean}   → updated { useful, not_useful }
//
// NOTE ON CONCURRENCY: KV has no atomic increment, so a vote is a
// read-modify-write. Under simultaneous votes on the same trail a write can be
// lost (a small undercount) — acceptable for low-traffic feedback. If this ever
// gets heavy traffic, move the counter to D1 (SQL `UPSERT ... count + 1`) or a
// Durable Object, both of which give true atomicity. The client contract stays
// identical, so only this file changes.

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  })

async function readCounts(env, id) {
  const raw = await env.VOTES.get(`t:${id}`)
  const c = raw ? JSON.parse(raw) : {}
  return { useful: c.useful || 0, not_useful: c.not_useful || 0 }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS })
    }

    // GET /votes/:id
    const match = url.pathname.match(/^\/votes\/([\w-]+)$/)
    if (request.method === 'GET' && match) {
      return json(await readCounts(env, match[1]))
    }

    // POST /vote
    if (request.method === 'POST' && url.pathname === '/vote') {
      let body
      try {
        body = await request.json()
      } catch {
        return json({ error: 'invalid JSON body' }, 400)
      }

      const id = String(body.trail_id ?? '').trim()
      if (!/^[\w-]+$/.test(id)) return json({ error: 'bad trail_id' }, 400)
      if (typeof body.useful !== 'boolean') {
        return json({ error: 'useful must be a boolean' }, 400)
      }

      const counts = await readCounts(env, id)
      counts[body.useful ? 'useful' : 'not_useful'] += 1
      await env.VOTES.put(`t:${id}`, JSON.stringify(counts))
      return json(counts)
    }

    return json({ error: 'not found' }, 404)
  },
}
