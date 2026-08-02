import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BIRTH_MONTHS, birthMonthFor } from '../data/birthMonths'
import { trails, MONTH_NAMES } from '../data/trails'
import { domToBlob } from 'modern-screenshot'
import BirthMonthPostcard from './BirthMonthPostcard'

const THAI_MONTHS = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
]

const trailById = (id) => trails.find((t) => t.trail_id === id) ?? null

// A different tier than `prev`, chosen at random — so re-rolling shows a fresh
// trail and a visitor can cycle through all four for their month.
function pickTier(count, prev) {
  if (count <= 1) return 0
  let next = prev
  while (next === prev) next = Math.floor(Math.random() * count)
  return next
}

export default function BirthMonthModal({ onClose }) {
  const [lang, setLang] = useState('th')
  const [month, setMonth] = useState(null)
  const [pickIndex, setPickIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [sharing, setSharing] = useState(false)
  const timer = useRef(null)
  const cardRef = useRef(null)

  // Close on Escape, lock background scroll, and clear any pending reveal timer.
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      if (timer.current) clearTimeout(timer.current)
    }
  }, [onClose])

  const entry = month != null ? birthMonthFor(month) : null
  const pick = entry ? entry.trails[Math.min(pickIndex, entry.trails.length - 1)] : null
  const pickedTrail = pick ? trailById(pick.trailId) : null
  const t = (th, en) => (lang === 'th' ? th : en)

  const changeMonth = (m) => {
    if (timer.current) clearTimeout(timer.current)
    setMonth(m)
    setRevealed(false)
    setLoading(false)
  }

  // Little pause before the reveal, so there's a beat of anticipation.
  const runReveal = (delay, nextIndex) => {
    if (timer.current) clearTimeout(timer.current)
    setLoading(true)
    timer.current = setTimeout(() => {
      setPickIndex(nextIndex)
      setLoading(false)
      setRevealed(true)
    }, delay)
  }

  const surprise = () => {
    if (month == null) return
    const count = birthMonthFor(month)?.trails.length ?? 1
    runReveal(1100, Math.floor(Math.random() * count))
  }

  const showAnother = () => {
    const count = birthMonthFor(month)?.trails.length ?? 1
    runReveal(800, pickTier(count, pickIndex))
  }

  // Render the postcard face to a PNG and share it (native file-share where
  // available — e.g. straight to an IG story on mobile) or download it.
  const shareImage = async () => {
    const node = cardRef.current?.querySelector('.bmp')
    if (!node || sharing) return
    setSharing(true)
    try {
      const blob = await domToBlob(node, { scale: 3, backgroundColor: '#FDFAF2' })
      const file = new File([blob], `birth-month-trail-${pickedTrail.slug}.png`, { type: 'image/png' })
      const shareTitle = `${entry.personality[lang]} · ${pickedTrail.name}`
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: shareTitle })
      } else {
        const href = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = href
        a.download = file.name
        a.click()
        URL.revokeObjectURL(href)
      }
    } catch (err) {
      if (err?.name !== 'AbortError') console.error('Postcard share failed', err)
    } finally {
      setSharing(false)
    }
  }

  return (
    <div className="bmm-backdrop" onClick={onClose} role="presentation">
      <div
        className="bmm-panel"
        role="dialog"
        aria-modal="true"
        aria-label={t('เส้นทางตามเดือนเกิด', 'Your birth-month trail')}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bmm-bar">
          <span className="bmm-title">{t('เส้นทางตามเดือนเกิดของคุณ', 'Your birth-month trail')}</span>
          <div className="bmm-bar-right">
            <div className="bmm-lang" role="group" aria-label="Language">
              <button type="button" className={lang === 'th' ? 'on' : ''} onClick={() => setLang('th')}>ไทย</button>
              <button type="button" className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
            </div>
            <button type="button" className="bmm-close" onClick={onClose} aria-label={t('ปิด', 'Close')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
        </div>

        <div className="bmm-body">
          <p className="bmm-prompt">{t('เลือกเดือนเกิดของคุณ', 'Pick the month you were born')}</p>
          <div className="bmm-pick">
            <select
              className="bmm-select"
              required
              value={month ?? ''}
              onChange={(e) => changeMonth(e.target.value ? Number(e.target.value) : null)}
              aria-label={t('เดือนเกิด', 'Birth month')}
            >
              <option value="" disabled>{t('— เลือกเดือน —', '— Select a month —')}</option>
              {BIRTH_MONTHS.map((m) => (
                <option key={m.month} value={m.month}>
                  {lang === 'th' ? THAI_MONTHS[m.month - 1] : MONTH_NAMES[m.month - 1]}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="bmm-reveal-btn"
              onClick={surprise}
              disabled={month == null || loading}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4" /><circle cx="8" cy="8" r="1.4" fill="currentColor" stroke="none" /><circle cx="16" cy="8" r="1.4" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" /><circle cx="8" cy="16" r="1.4" fill="currentColor" stroke="none" /><circle cx="16" cy="16" r="1.4" fill="currentColor" stroke="none" /></svg>
              {t('สุ่มจับคู่', 'Surprise me')}
            </button>
          </div>

          {loading ? (
            <div className="bmm-loading" role="status" aria-live="polite">
              <span className="bmm-spinner" />
              <p>{t('กำลังจับคู่เส้นทางให้คุณ…', 'Finding your trail…')}</p>
            </div>
          ) : revealed && entry && pick ? (
            <div className="bmm-reveal">
              <div ref={cardRef}>
                <BirthMonthPostcard entry={entry} pick={pick} lang={lang} />
              </div>
              <div className="bmm-actions">
                {pickedTrail && (
                  <div className="bmm-actions-row">
                    <button type="button" className="share-btn" onClick={shareImage} disabled={sharing}>
                      <span aria-hidden="true">{sharing ? '⏳' : '↗'}</span>
                      {sharing ? t('กำลังสร้างรูป…', 'Preparing image…') : t('แชร์', 'Share')}
                    </button>
                  </div>
                )}
                <div className="bmm-actions-row">
                  <button type="button" className="bmm-again" onClick={showAnother}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5" /></svg>
                    {t('สุ่มเส้นทางอื่น', 'Show another trail')}
                  </button>
                  {pickedTrail && (
                    <Link to={`/trail/${pickedTrail.slug}`} className="bmm-seetrail" onClick={onClose}>
                      {t('ดูเส้นทางนี้', 'See the trail')}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="bmm-hint">{t('เลือกเดือน แล้วกด “สุ่มจับคู่” เพื่อดูเส้นทางของคุณ', 'Choose a month, then hit “Surprise me”.')}</p>
          )}
        </div>
      </div>
    </div>
  )
}
