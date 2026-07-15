import { useState } from 'react'

// Share the current page. Uses the native share sheet where available
// (mobile + some desktop browsers); otherwise copies the link to the
// clipboard and briefly confirms.
export default function ShareButton({ title, text }) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url })
        return
      } catch (err) {
        // User dismissed the sheet — leave quietly, don't fall through to copy.
        if (err?.name === 'AbortError') return
      }
    }

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked (rare) — nothing else to do gracefully.
    }
  }

  return (
    <button
      type="button"
      className="share-btn"
      onClick={handleShare}
      aria-label={copied ? 'Link copied to clipboard' : 'Share this trail'}
    >
      <span aria-hidden="true">{copied ? '✓' : '↗'}</span>
      {copied ? 'Link copied' : 'Share'}
    </button>
  )
}
