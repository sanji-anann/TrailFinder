// Generate the Birth-Month postcard OG images (1200x630) by screenshotting the
// /birth-month/:month/:tier?og=1 route. Output is committed to web/public/og/
// as static assets, so the build has no headless-browser dependency — rerun
// this only when the postcards change:
//
//   npm run dev            # in one terminal (or `npm run preview` after build)
//   npm run og:birthmonth  # captures 12 months x 4 tiers -> public/og/*.jpg
//
// Override the target with OG_BASE (default http://localhost:5173).
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(__dirname, '..', 'public', 'og')
const BASE = (process.env.OG_BASE || 'http://localhost:5173').replace(/\/$/, '')

await mkdir(OUT, { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })

let n = 0
for (let m = 1; m <= 12; m++) {
  for (let t = 0; t < 4; t++) {
    const url = `${BASE}/birth-month/${m}/${t}?og=1`
    await page.goto(url, { waitUntil: 'networkidle' })
    await page.waitForSelector('.bmog', { timeout: 15000 })
    // Wait for fonts and every image inside the composition to finish loading.
    await page.evaluate(async () => {
      await document.fonts.ready
      await Promise.all([...document.images].map((img) =>
        img.complete ? null : new Promise((r) => { img.onload = img.onerror = r })))
    })
    await page.screenshot({
      path: resolve(OUT, `birth-month-${m}-${t}.jpg`),
      type: 'jpeg', quality: 86,
      clip: { x: 0, y: 0, width: 1200, height: 630 },
    })
    n++
  }
  process.stdout.write(`month ${m} done\n`)
}
await browser.close()
console.log(`\ngenerated ${n} OG images -> public/og/birth-month-<month>-<tier>.jpg`)
