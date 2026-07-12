# Trail Finder — Database Structure

Status: Draft v1 — 2026-07-02
Based on: PRD.md

Think of each table below as a spreadsheet. Rows = records. Columns = fields. Tables link to each other using ID numbers, so we never have to repeat the same info twice.

---

## Step 1: Trails table (the core table)

One row = one trail. Everything about a trail that has only ONE value lives here.

| Field | Type | Example | Notes |
|---|---|---|---|
| trail_id | number (auto) | 1 | Unique ID, auto-generated |
| name | text | "Overland Track" | |
| country | text | "Australia" | Australia or New Zealand |
| region | text | "Tasmania" | State / park region |
| distance_km | number | 65 | |
| duration_hours | number | 48 | Typical time to complete |
| difficulty | text | "Hard" | Easy / Moderate / Hard |
| route_type | text (optional) | "Loop" | Loop / Out & back / Point to point — shown as a badge on the detail map |
| difficulty_notes | text | "Steep, sustained climbs on loose rock" | One-line reason — builds trust, like Seasonal Highlights |
| elevation_gain_m | number | 1200 | Total climb, in meters |
| max_elevation_m | number | 1617 | Highest point on trail |
| description | text | "6-day alpine trek..." | Short summary |
| photo_url | text (link) | link to one photo | |
| latitude | number | -41.9 | For map pin |
| longitude | number | 145.9 | For map pin |
| status | text | "Open" | Open / Closed / Partially Closed |
| status_last_checked | date | 2026-06-28 | Builds trust — shown to hiker |
| status_source_url | text (link) | link to official source | Where we verified status |

---

## Step 2: Seasonal Highlights table (linked to Trails)

A trail can have MORE than one highlight (e.g. wildflowers in Nov, snow views in Aug). So this can't live in the Trails table directly — it needs its own table, linked back by `trail_id`.

| Field | Type | Example | Notes |
|---|---|---|---|
| highlight_id | number (auto) | 1 | Unique ID |
| trail_id | number | 1 | Links to Trails table |
| month_start | number (1-12) | 7 | July |
| month_end | number (1-12) | 8 | August |
| tag | text | "Wildflowers" | Short label |
| highlight_description | text | "Alpine wildflowers blanket the ridge" | One line, shown on trail card |

**Why a separate table:** if we put this in the Trails table, a trail with 2 highlights would need 2 rows of duplicate trail info. Splitting it out avoids that — one Trails row, many Highlights rows.

---

## Step 3: Regions table (optional lookup)

Only needed if we want to filter/browse "by region" (PRD feature #5). Keeps region names consistent instead of free-typed text.

| Field | Type | Example | Notes |
|---|---|---|---|
| region_id | number (auto) | 1 | Unique ID |
| region_name | text | "Tasmania" | |
| country | text | "Australia" | |

Trails table would then use `region_id` instead of a free-text `region` field, once we build this.

---

## How the tables connect

```
Regions (1) ──── (many) Trails (1) ──── (many) Seasonal Highlights
```
One region has many trails. One trail has many seasonal highlights.

---

## Route geometry (sidecar files, not a table)

Some trails have real route geometry (an OSM-sourced GeoJSON line with start/end
points) in `web/public/data/routes/{slug}.geojson`, lazy-loaded by the trail
detail map. Trails without a file fall back to a single map pin — we never draw
an invented route. Data © OpenStreetMap contributors (ODbL), credited on the page.

## Not building yet (future)
- Status history log (track how status changed over time)
- User accounts / saved trails
- Reviews or ratings table

## Open Questions
- Do we start with the Regions table, or keep `region` as plain text for now and simplify? (Recommendation: plain text for v1 — fewer moving parts. Add Regions table only if filtering gets complex.)
- Who enters this data, and how — a spreadsheet import, or a form? (Affects what we build first.)
