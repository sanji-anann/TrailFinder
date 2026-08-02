// Post-build step: emit one static HTML file per birth-month postcard
// (/birth-month/<month>/<tier>) with og tags whose og:image is the pre-generated
// postcard image (public/og/birth-month-<month>-<tier>.jpg, produced by
// scripts/generate-birthmonth-og.mjs). So a pasted link previews as the card.
//
// Same mechanism as prerender-og.mjs: each file hydrates into the normal SPA
// (BirthMonthShare route); vercel.json cleanUrls serves /birth-month/<m>/<t>
// from the matching .html file.
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const web = resolve(__dirname, '..')
const dist = resolve(web, 'dist')
const BASE = (process.env.SITE_URL || 'https://trail-finder-eta.vercel.app').replace(/\/$/, '')

const { BIRTH_MONTHS } = await import(resolve(web, 'src/data/birthMonths.js'))
const { trails, MONTH_NAMES } = await import(resolve(web, 'src/data/trails.js'))
const trailById = (id) => trails.find((t) => t.trail_id === id) ?? null

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`)
  return re.test(html)
    ? html.replace(re, `$1${esc(value)}$2`)
    : html.replace('</head>', `    <meta ${attr}="${key}" content="${esc(value)}" />\n  </head>`)
}
function removeMeta(html, attr, key) {
  return html.replace(new RegExp(`\\s*<meta ${attr}="${key}" content="[^"]*" />`), '')
}
function addMeta(html, attr, key, value) {
  return html.replace('</head>', `    <meta ${attr}="${key}" content="${esc(value)}" />\n  </head>`)
}

const template = await readFile(resolve(dist, 'index.html'), 'utf8')

let count = 0
for (const entry of BIRTH_MONTHS) {
  const monthName = MONTH_NAMES[entry.month - 1]
  for (let t = 0; t < entry.trails.length; t++) {
    const pick = entry.trails[t]
    const trail = trailById(pick.trailId)
    if (!trail) continue
    const title = `${entry.personality.en} · ${trail.name} — TrailFinder`
    const desc = `${entry.quote.en}  Your ${monthName} birth-month trail.`
    const url = `${BASE}/birth-month/${entry.month}/${t}`
    const image = `${BASE}/og/birth-month-${entry.month}-${t}.jpg`

    let html = template.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    html = setMeta(html, 'name', 'description', desc)
    html = setMeta(html, 'property', 'og:type', 'article')
    html = setMeta(html, 'property', 'og:title', title)
    html = setMeta(html, 'property', 'og:description', desc)
    html = setMeta(html, 'property', 'og:url', url)
    html = setMeta(html, 'property', 'og:image', image)
    html = setMeta(html, 'property', 'og:image:alt', `${entry.personality.en} — ${trail.name} birth-month postcard`)
    html = removeMeta(html, 'property', 'og:image:type')
    html = removeMeta(html, 'property', 'og:image:width')
    html = removeMeta(html, 'property', 'og:image:height')
    html = addMeta(html, 'property', 'og:image:type', 'image/jpeg')
    html = addMeta(html, 'property', 'og:image:width', '1200')
    html = addMeta(html, 'property', 'og:image:height', '630')

    const out = resolve(dist, 'birth-month', String(entry.month), `${t}.html`)
    await mkdir(dirname(out), { recursive: true })
    await writeFile(out, html)
    count++
  }
}
console.log(`prerendered og head for ${count} birth-month postcards -> dist/birth-month/*/*.html`)
