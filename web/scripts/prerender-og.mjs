// Post-build step: emit one static HTML file per trail with trail-specific
// Open Graph / Twitter tags, so pasted links preview with the trail's photo,
// name, and description (and so search engines can index each trail).
//
// The SPA is unchanged — each generated file has the same <div id="root"> and
// module script as index.html, so it hydrates into the normal app. Only the
// <head> differs. vercel.json (cleanUrls) serves /trail/<slug> from the
// matching /trail/<slug>.html file.

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const web = resolve(__dirname, '..')
const dist = resolve(web, 'dist')

const BASE = (process.env.SITE_URL || 'https://trail-finder-eta.vercel.app').replace(/\/$/, '')

const { trails } = await import(resolve(web, 'src/data/trails.js'))
const { TRAIL_PHOTOS } = await import(resolve(web, 'src/data/trailPhotos.js'))

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

// Absolute URL for og:image — prefer the self-hosted gallery hero, fall back
// to the card thumbnail. Relative paths are resolved against the site origin.
function heroImage(trail) {
  const hero = (TRAIL_PHOTOS[trail.trail_id] ?? [])[0]?.url || trail.photo_url || '/favicon.svg'
  return hero.startsWith('http') ? hero : BASE + hero
}

// Swap the content of a <meta property|name="key" ...> tag, or the <title>.
function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`)
  return re.test(html)
    ? html.replace(re, `$1${esc(value)}$2`)
    : html.replace('</head>', `    <meta ${attr}="${key}" content="${esc(value)}" />\n  </head>`)
}

const template = await readFile(resolve(dist, 'index.html'), 'utf8')

let count = 0
for (const trail of trails) {
  const title = `${trail.name} — TrailFinder`
  const desc = trail.description
  const url = `${BASE}/trail/${trail.slug}`
  const image = heroImage(trail)

  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
  html = setMeta(html, 'name', 'description', desc)
  html = setMeta(html, 'property', 'og:type', 'article')
  html = setMeta(html, 'property', 'og:title', title)
  html = setMeta(html, 'property', 'og:description', desc)
  html = setMeta(html, 'property', 'og:url', url)
  html = setMeta(html, 'property', 'og:image', image)
  html = setMeta(html, 'property', 'og:image:alt', `${trail.name}, ${trail.region}, ${trail.country}`)

  const out = resolve(dist, 'trail', `${trail.slug}.html`)
  await mkdir(dirname(out), { recursive: true })
  await writeFile(out, html)
  count++
}

console.log(`prerendered OG head for ${count} trails -> dist/trail/*.html`)
