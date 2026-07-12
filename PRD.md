# Trail Finder — PRD (Product Requirements Document)

Status: Draft v1 — 2026-07-02
Based on: Vision.md

## 1. Problem
Hikers in Australia and New Zealand can't quickly answer three questions: Is this trail open right now? What's the best season to hike it? Where's the reliable info — since it's scattered across parks websites, forums, and blogs?

## 2. Goal
Let a hiker go from "I want to hike" to "I know which trail, and it's open" in under 2 minutes.

## 3. Target Users
- Beginner/casual hikers (primary) — need simple, trustworthy answers, low jargon.
- Experienced hikers (secondary) — same data, but may want more detail later (elevation profile, technical difficulty).

## 4. MVP Features (v1)

| # | Feature | Solves | Priority |
|---|---------|--------|----------|
| 1 | Trail directory — browsable list of AU/NZ trails | Scattered info | Must have |
| 2 | Trail status (Open / Closed / Partially Closed + last-checked date) | Don't know what's open | Must have |
| 3 | Best season indicator per trail | Don't know best season | Must have |
| 4 | Trail detail page (distance, difficulty + why, elevation gain, duration, location, status, season, one photo) | Scattered info | Must have |
| 5 | Filter/search (by region, difficulty, season) | Planning takes too long | Should have |
| 6 | Simple map showing trail location | Planning takes too long | Should have |
| 7 | Seasonal Highlights — the most beautiful time to visit each trail, with a short reason (e.g. Jul: wildflowers in bloom, Oct: autumn foliage) | Don't know best season | Must have |
| 8 | Seasons page — tap any month, see which trails are open and in-season that month | Don't know best season | Must have |

### 4a. Seasonal Highlights — Detail
A trail can have one or more highlight periods, not just a single "best month." Each highlight needs:
- Month or month range (e.g. Jul, or Jul–Aug)
- A short tag (e.g. "Wildflowers", "Autumn colors", "Waterfalls at peak flow", "Snow-capped views")
- A one-line description (e.g. "Alpine wildflowers blanket the ridge")

This is stronger than a plain "best season" label because it tells the hiker *why* — which is more visual and more trustworthy. It also lets us later add a feature like "show trails blooming this month," which is a strong discovery hook.

## 5. Explicitly Out of Scope (v1)
- User accounts / login
- Reviews, ratings, comments
- Trip booking or permits
- Offline maps / GPS navigation
- Regions outside AU/NZ
- Native mobile app

### 4b. Seasons Page — Detail
A 12-month picker. Tapping a month filters to trails that are (a) currently marked Open/Partially Closed, and (b) have a Seasonal Highlight covering that month. Reuses the same trail card component as Home — no new UI pattern needed. Uses existing `month_start`/`month_end` fields on Seasonal Highlights (Database.md) — no schema change required.

## 6. Key Open Risk
Trail open/closed status must come from a trustworthy, updatable source (e.g. official park authority sites). This needs its own data-sourcing plan before we design the database — flagging for our next decision, not solving here.

## 7. Success Criteria (v1)
- A first-time visitor can find one open, in-season trail without leaving the site.
- Every trail listed has a status last-checked date visible (builds trust).
- Page loads feel instant (no heavy images, minimal clicks).

## 8. Open Questions
- Which official sources do we pull AU/NZ trail status from?
- How often does status get refreshed — manual or automated?
- Where do Seasonal Highlight facts come from initially — manual research per trail, or a data source? (Needs a plan before database design.)
