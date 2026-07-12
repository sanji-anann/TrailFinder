# TrailFinder votes Worker

A tiny Cloudflare Worker that stores the "Was this information helpful?" vote
counts for each trail, so the count can be **shared across all visitors** (a
static site + localStorage can't do that on its own).

Data model: one KV entry per trail, `t:<trail_id>` → `{ "useful": N, "not_useful": M }`.

## Endpoints

- `GET /votes/:trailId` → `{ useful, not_useful }`
- `POST /vote` with JSON body `{ "trail_id": 172, "useful": true }` → updated `{ useful, not_useful }`

## Deploy (one time)

```bash
cd worker
npm install -g wrangler        # or: npx wrangler ...
wrangler login

# 1. Create the KV namespace and copy the printed id into wrangler.toml
wrangler kv namespace create VOTES

# 2. Ship it
wrangler deploy
```

`wrangler deploy` prints the public URL, e.g.
`https://trailfinder-votes.<your-subdomain>.workers.dev`.

## Point the site at it

In `web/`, set the base URL (no trailing slash) and rebuild:

```bash
# web/.env.local
VITE_VOTES_API=https://trailfinder-votes.<your-subdomain>.workers.dev
```

Without this var the site runs in **local-only mode**: it remembers each
visitor's own vote but shows no shared count. Once the var points at the
deployed Worker, the detail page shows `82% of 11 hikers found this useful`.

## Concurrency note

KV has no atomic increment, so writes are read-modify-write and a simultaneous
vote can occasionally be lost (a small undercount). Fine for low-traffic
feedback. For high volume, swap KV for D1 (`UPSERT ... count + 1`) or a Durable
Object — the client contract is unchanged, so only `index.js` changes.
