# Trail Finder — UI Guidelines

Status: Draft v2 — 2026-07-03
Source: uploaded mockup file "Trail Guide Mockups (standalone).html" — Explore & Map screens, light + dark mode
Supersedes: v1 (topo-line / cool-blue concept)

## What changed and why
The uploaded mockup is a fully realized design in its own direction: warm, editorial, "printed field guide" — not the cool blue/topo-line concept we sketched earlier. Since this is now the real reference, this document replaces v1 rather than blending two styles (mixing them would break the "trustworthy, calm" principle through inconsistency). The mockup is built at phone width (402px) — that's fine, it's just the mobile view of our responsive website, not a native app (Vision.md still rules that out).

## 1. Design Direction
Editorial and tactile, like a printed trail guide, not a generic app. Warm paper backgrounds, a terracotta accent color, real trail photography, and status colors that also tint each trail photo — so "open/closed" reads at a glance, before you even see the badge text.

## 2. Color Palette (light mode — default)

| Name | Hex | Use |
|---|---|---|
| Paper | #FDFAF2 | Page background |
| Card surface | #F3ECDD | Cards, search bar, chips (slightly deeper than paper) |
| Ink | #23201A | Primary text, headings |
| Muted ink | #6F6553 | Secondary text, labels, captions |
| Hairline border | rgba(120,95,60,.14) | Card borders, dividers — warm, not cool gray |
| Terracotta (brand) | #C2582F | Primary buttons, active filter, selected map pin |
| Trail green | #2F7D4F | Status: Open |
| Brick red | #B0433A | Status: Closed |
| Trail gold | #C98A2A | Status: Opens soon |

**Rule carried over from v1:** status colors are reserved for status meaning only — green/red/gold never appear decoratively elsewhere.

**Shadows and borders are warm-tinted**, not neutral gray — e.g. `0 5px 18px rgba(80,60,30,.10)`. This is a small detail but it's what makes the palette feel cohesive instead of like a generic UI kit.

## 3. Typography
Two typefaces (Google Fonts — noted for later, when we get to code):
- **Space Grotesk** — headings, trail names, buttons, badges. Bold (700) for emphasis, 600 for UI labels.
- **Space Mono** — data and meta text only: stats ("DISTANCE", "14.2 km"), location lines, difficulty tags, small uppercase "eyebrow" labels. Always with slight letter-spacing when uppercase. This mono/display pairing is what gives it the "field guide" feel — treat Space Mono as the "field notes" voice and Space Grotesk as the "headline" voice.

## 4. Shape & Elevation
- Big, soft corners: cards 22px, search bar/buttons 15px, photo thumbnails 16px, chips/pills fully round, small icon buttons 13px, bottom sheet top corners 26px.
- Shadows and borders always warm-toned (see palette above), never flat gray.

## 5. Status System (core trust feature)

| Status | Badge color | Indicator | Example label |
|---|---|---|---|
| Open | Trail green | Small dot | "OPEN" |
| Closed | Brick red | X icon | "CLOSED" |
| Opens soon | Trail gold | Small dot | "OPENS JUN 1" |

Note the "opens soon" label uses a **specific date**, not a vague word like "Soon" — more useful and more trustworthy. We should do the same for our status field.

Each trail card's photo gets a subtle gradient tint matching its status color, so the card reads correctly even at a glance while scrolling.

## 6. Season Strip (maps directly to our Seasonal Highlights + Seasons page)
A 12-dot month strip where the "best" months are filled/accented and the rest are muted. This is exactly our Seasonal Highlights feature and Seasons page month-picker — we should reuse this one component in both places (Trail Detail screen and the Seasons page) instead of building two different month widgets.

## 7. Trail Card
- Photo header (~120px) with status-tinted gradient overlay.
- Status badge top-left (color + dot/icon + label). Difficulty badge top-right — dark translucent pill, e.g. "MODERATE".
- Trail name (Space Grotesk, bold, larger) + location line underneath (Space Mono, muted, e.g. "Yosemite NP · California").
- Stats row at the bottom: distance / elevation, small Space Mono label above a bold number.

## 8. Other Components (from the mockup)
- **Search bar:** 46px tall, rounded 15px, paper-cream fill, muted icon.
- **Filter chips:** pill-shaped. Active = terracotta fill + white text + small dot. Inactive = paper fill + hairline border.
- **Map markers:** start point = ring marker; minor stops = solid dot; selected trail = terracotta callout pill with the trail name and a pointer line down to the pin.
- **Bottom sheet (map screen):** slides up, rounded top corners, drag handle bar, trail thumbnail + stats.
- **Side FAB buttons** (map screen): 42px square, rounded 13px, paper fill, subtle shadow.

## 9. Dark Mode (captured for later — not urgent for v1)
The mockup includes a dark variant: near-black background, near-white text, and the accent color switches from terracotta to blue for primary actions. Status colors shift to slightly brighter tones so they still pop on a dark background. We don't need to build this now — noting it exists so we don't have to redesign from scratch later.

## 10. Tone of Voice (unchanged from v1)
- Short, plain sentences. No jargon.
- Lead with the answer: "Open now" not "Trail status: currently accessible."
- Always show freshness or specificity: "Checked Jun 28" and "Opens Jun 1" build more trust than bare labels.

## Next Step
Our earlier Home screen mockup used the old cool-blue palette — worth redoing it in this new style so all our references match. Suggest doing that next.
