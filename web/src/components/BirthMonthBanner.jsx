// Playful entry point for the Birth-Month Trail feature. Sits on the Home page
// between the filters and the results as a light, for-fun break — it opens the
// month picker + postcard modal. Wording leans fun on purpose: this is a
// personality match to share, not part of the core "what's in season" tool.
export default function BirthMonthBanner({ onOpen }) {
  return (
    <section className="bm-band" aria-label="Birth-Month Trail">
      <div className="bm-band-text">
        <span className="bm-band-eyebrow">Just for fun</span>
        <h2 className="bm-band-title">What’s your birth-month trail?</h2>
        <p className="bm-band-sub">
          Tell us the month you were born and meet the trail — and hiker personality —
          that matches it. Keep the postcard, or share it.
        </p>
        <button type="button" className="bm-band-cta" onClick={onOpen}>
          Find mine
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
      </div>
      <div className="bm-band-peek" aria-hidden="true">
        <div className="bm-peek-card">
          <img src="/photos/tour-du-mont-blanc-2.jpg" alt="" />
          <div className="bm-peek-body">
            <div className="bm-peek-eyebrow">May · The Independent Explorer</div>
            <div className="bm-peek-name">Tour du Mont Blanc</div>
          </div>
        </div>
        <img className="bm-peek-stamp" src="/stamps/stamp-05.png" alt="" />
      </div>
    </section>
  )
}
