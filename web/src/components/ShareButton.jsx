import { useState } from 'react'

// Share the current page. Uses the native share sheet where available
// (mobile + some desktop browsers); otherwise copies the link to the
// clipboard and briefly confirms.
//
// We deliberately share only { title, url } — no `text`. iMessage (and some
// other apps) will render a rich link-preview card only when the URL arrives
// essentially alone; adding a `text` body makes them drop the card and paste
// the description + link as plain text instead. The trail's own OG tags supply
// the preview's title, description, and photo, so the body text is redundant.
export default function ShareButton({ title, url, label = 'Share', copiedLabel = 'Link copied' }) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const shareUrl = url ?? window.location.href

    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl })
        return
      } catch (err) {
        // User dismissed the sheet — leave quietly, don't fall through to copy.
        if (err?.name === 'AbortError') return
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl)
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
      aria-label={copied ? copiedLabel : label}
    >
      <span aria-hidden="true">{copied ? '✓' : '↗'}</span>
      {copied ? copiedLabel : label}
    </button>
  )
}
