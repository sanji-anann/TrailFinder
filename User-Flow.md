# Trail Finder — User Flow

Status: Draft v1 — 2026-07-02
Based on: PRD.md, Sitemap.md

## Primary Flow: "I want to hike this weekend"

```
Land on Home
      │
      ├──────────────┐
      ▼              ▼
Search or filter   Seasons: pick month
      │              │
      └──────┬───────┘
             ▼
     Browse trail list
             ▼
      Tap a trail card
             ▼
     View trail & decide
```

Two entry points (search/filter on Home, or browsing by month on Seasons) both lead to the same trail list and detail experience — one consistent path to a decision.

## Screen-by-Screen

### 1. Home
- **User goal:** Find a trail I can hike, fast.
- **Pain point:** Normally has to check multiple websites and still isn't sure what's open.
- **Why this screen exists:** Single entry point — replaces the "scattered across many websites" problem.
- **Expected action:** Type a search, apply a filter, or switch to Seasons.
- **Success criteria:** User reaches a trail list within seconds of landing, no confusion about what to do first.

### 2. Seasons (alternate entry)
- **User goal:** Discover a good trail for right now, without knowing a specific trail name.
- **Pain point:** Doesn't know which season is best for which trail.
- **Why this screen exists:** Makes "best season" browsable and visual, not just a data point buried on a detail page.
- **Expected action:** Tap the current or a future month.
- **Success criteria:** Tapping a month instantly shows trails in season — no extra steps.

### 3. Trail List (part of Home / Seasons, not a separate page)
- **User goal:** Compare a few trails quickly.
- **Pain point:** Too much text-heavy info elsewhere makes comparing trails slow.
- **Why this screen exists:** Trail cards surface just enough to decide what's worth a closer look — status, difficulty, season tag.
- **Expected action:** Scan cards, tap one that looks right.
- **Success criteria:** User can tell open vs. closed at a glance, without reading paragraphs.

### 4. Trail Detail
- **User goal:** Confirm this is the right trail and it's actually hikeable now.
- **Pain point:** Even when info exists elsewhere, it's not trustworthy or current.
- **Why this screen exists:** One trustworthy answer — status + last-checked date + season + difficulty reason, all in one place.
- **Expected action:** Read status and season fit, then decide: go, or back to browsing.
- **Success criteria:** User can make a go/no-go decision without leaving the page or opening another website.

## Out of Scope for This Flow
- Saving/bookmarking a trail (no accounts yet — PRD section 5)
- Booking or permit steps
