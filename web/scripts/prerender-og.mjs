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

// The raw hero path for a trail — prefer the self-hosted gallery hero, fall
// back to the card thumbnail, then the favicon. May be a site-relative path
// (/photos/…) or an absolute http URL.
function rawHero(trail) {
  return (TRAIL_PHOTOS[trail.trail_id] ?? [])[0]?.url || trail.photo_url || '/favicon.svg'
}

// Absolute URL for og:image. Relative paths resolve against the site origin.
function heroImage(trail) {
  const hero = rawHero(trail)
  return hero.startsWith('http') ? hero : BASE + hero
}

function mimeType(p) {
  if (/\.png$/i.test(p)) return 'image/png'
  if (/\.webp$/i.test(p)) return 'image/webp'
  if (/\.svg$/i.test(p)) return 'image/svg+xml'
  if (/\.jpe?g$/i.test(p)) return 'image/jpeg'
  return undefined
}

// Read intrinsic pixel dimensions straight from the file header — no deps.
function jpegSize(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null
  let off = 2
  while (off < buf.length) {
    if (buf[off] !== 0xff) { off++; continue }
    let marker = buf[off + 1]
    while (marker === 0xff) { off++; marker = buf[off + 1] }
    off += 2
    if (marker >= 0xd0 && marker <= 0xd9) continue // standalone markers, no length
    if (off + 2 > buf.length) break
    const len = buf.readUInt16BE(off)
    // SOF markers carry the frame size: C0–CF except C4/C8/CC (DHT/JPG/DAC).
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { height: buf.readUInt16BE(off + 3), width: buf.readUInt16BE(off + 5) }
    }
    off += len
  }
  return null
}

function pngSize(buf) {
  if (buf.length < 24 || buf.readUInt32BE(0) !== 0x89504e47) return null
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
}

// og:image:type/width/height for a trail's hero. Type is always known from the
// extension; width/height only for self-hosted images we can read on disk
// (remote heroes are left dimensionless rather than guessed).
async function imageMeta(rawPath) {
  const type = mimeType(rawPath)
  if (rawPath.startsWith('http')) return { type }
  try {
    const buf = await readFile(resolve(dist, rawPath.replace(/^\//, '')))
    const dims = /\.png$/i.test(rawPath) ? pngSize(buf) : jpegSize(buf)
    return dims ? { type, ...dims } : { type }
  } catch {
    return { type }
  }
}

// Delete a <meta property|name="key" ...> tag (with its leading whitespace).
function removeMeta(html, attr, key) {
  return html.replace(new RegExp(`\\s*<meta ${attr}="${key}" content="[^"]*" />`), '')
}

// Append a <meta …> just before </head>.
function addMeta(html, attr, key, value) {
  return html.replace('</head>', `    <meta ${attr}="${key}" content="${esc(value)}" />\n  </head>`)
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

  // Clear the homepage's image dimensions/type, then set this trail's own.
  html = removeMeta(html, 'property', 'og:image:type')
  html = removeMeta(html, 'property', 'og:image:width')
  html = removeMeta(html, 'property', 'og:image:height')
  const meta = await imageMeta(rawHero(trail))
  if (meta.type) html = addMeta(html, 'property', 'og:image:type', meta.type)
  if (meta.width && meta.height) {
    html = addMeta(html, 'property', 'og:image:width', meta.width)
    html = addMeta(html, 'property', 'og:image:height', meta.height)
  }

  const out = resolve(dist, 'trail', `${trail.slug}.html`)
  await mkdir(dirname(out), { recursive: true })
  await writeFile(out, html)
  count++
}

console.log(`prerendered OG head for ${count} trails -> dist/trail/*.html`)
