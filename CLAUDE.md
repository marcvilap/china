# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single, self-contained HTML page (`viaje-china-2026_17.html`, ~2180 lines) presenting a family trip itinerary to China in 2026. All content is in **Spanish**, with Chinese characters used decoratively (city names). There is no build system, no package manager, no tests, and it is not a git repository.

## Running / previewing

Open the `.html` file directly in a browser. All dependencies load from CDNs at runtime, so an internet connection is required for styling, fonts, and the maps to render:
- **Tailwind CSS** via Play CDN (`cdn.tailwindcss.com`), configured inline in a `<script>` in `<head>`.
- **Leaflet 1.9.4** (CSS + JS from unpkg) for the interactive route maps.
- **Google Fonts** (Fraunces, Inter, Noto Serif SC, Space Mono) and **CARTO** tile basemaps.

## Architecture

Everything lives in one file: inline Tailwind config + custom `<style>` in the head, semantic `<section>`s in the body, and a series of vanilla-JS IIFEs at the very end. No frameworks, no modules, no transpilation.

### Page sections (each is `<section id="...">`, also the nav anchors)
- `#inicio` — hero
- `#ruta` — route overview
- `#itinerario` — day-by-day plan; the most complex section
- `#logistica` — logistics, contains the two map containers (`#map`, `#map-alt`)
- `#checklist` — preparation checklist with persisted state

### The two-plan system ("Plan actual" vs "Alternativa con Xi'an")
This is the central interaction pattern and spans both markup and JS:
- Tabs in `#planTabs` carry `data-tab="actual"` / `data-tab="alt"` and class `.js-tab`.
- Content blocks carry `data-plan="actual"` / `data-plan="alt"`. The selector IIFE shows/hides blocks by matching `data-plan` to the active tab, toggles `.is-active` on tabs, and on switch calls `invalidateSize()` + re-fits bounds on the relevant Leaflet map (maps don't render correctly while their container is hidden).
- Default plan on load is `actual`.

### City filter (within `#itinerario`)
Chips in `#cityFilter` carry `data-filter="<city>"`; itinerary items carry `data-city="<city>"`. The filter IIFE shows only matching items (`all` shows everything). **When adding an itinerary entry, set its `data-city` to match an existing filter chip**, or it won't be filterable.

### Maps (Leaflet)
The map IIFE defines two hardcoded arrays of stops — `stopsA` (current plan) and `stopsB` (Xi'an alternative) — each stop being `{ n, name, cn, lat, lng }`. `build(id, stops)` draws a polyline route + a dashed return leg + numbered `seal-marker` div-icons, and stores each map on `window.__maps.{actual,alt}` so the plan selector can refresh them. **Editing a route means editing these arrays, not just the markup.**

### Checklist (localStorage)
Checkboxes use class `.chk` and unique `id`s. The checklist IIFE persists checked state to `localStorage` under key `china2026_checklist` (keyed by checkbox `id`), updates the count/progress bar, and supports reset via `#chkReset`. **New checklist items need a unique `id`** to be saved/counted correctly.

## Conventions
- **Design tokens** are the custom Tailwind colors (`paper`, `cream`, `ink`, `inksoft`, `cinnabar`, `cinnabarDark`, `gold`, `jade`, `clay`) and font families (`display`=Fraunces, `body`=Inter, `cn`=Noto Serif SC, `mono`=Space Mono), all defined in the inline `tailwind.config`. Reuse these rather than raw hex/font values.
- All user-facing copy is Spanish; keep it that way. Chinese characters are decorative accents (often in `gold`).
- The filename carries a version suffix (`_17`). Preserve the established structure and token vocabulary when editing.
