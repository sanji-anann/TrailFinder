# Trail Finder — Sitemap

Status: Draft v1 — 2026-07-02
Based on: PRD.md

Keep it to the fewest pages that get a hiker from question to answer. More pages = more clicks = slower planning, which goes against our philosophy.

## Pages (v1)

### 1. Home — "Discover"
- URL: `/`
- Purpose: entry point. Search, filter, and browse trails in one place.
- Contains: search bar, filters (region / difficulty / season), list of trail cards, each card shows name, photo, difficulty, status badge, seasonal highlight tag.

### 2. Trail Detail
- URL: `/trail/[trail-name]` (e.g. `/trail/overland-track`)
- Purpose: everything about one trail in one place — answers "should I hike this now?"
- Contains: name, photo, status badge + last-checked date, difficulty + why, distance/duration, elevation gain, seasonal highlights, location map, link to official source.

### 3. Seasons
- URL: `/seasons`
- Purpose: browse trails by time instead of by attribute — "what's good to hike this month?"
- Contains: 12-month picker (tap a month), filtered list reusing the same trail cards as Home, each showing why it's in season (e.g. "Wildflowers").

## Site Structure
```
Home  ⇄  Seasons
  ↓         ↓
   → Trail Detail ←
```
Trail Detail is reachable in one click from either Home or Seasons. Home and Seasons are one click apart from each other.

## Navigation
- Not a full nav bar — just a simple 2-way switch (Browse / Seasons) near the search bar, so it stays lightweight.
- A persistent search bar is available from Home and Trail Detail, so a hiker can always start a new search without going "back."
- Logo/site name always returns to Home.

## Considered but deferred (not v1)
- Separate "Search Results" page — folded into Home as filters instead, saves a click.
- About/Trust page explaining data sources — good for credibility later, not required to hit the MVP goal.
- Region landing pages (e.g. `/new-zealand`) — revisit only if the trail list grows large enough to need it.

## Open Question
- Does the map show on Home (all trails) or only on Trail Detail (one trail)? Recommendation: Trail Detail only for v1 — simpler to build, add a Home map later if it proves useful.
