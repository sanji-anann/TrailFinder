const CONTACT_EMAIL = 'sansanee.ji@gmail.com'
const REPORT_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('TrailFinder — feedback / report an issue')}`

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="footer-wordmark">TrailFinder</p>
        <p className="footer-contact">
          Found a mistake or a trail to add? Email me —{' '}
          <a href={REPORT_HREF}>{CONTACT_EMAIL}</a>
        </p>
        <p className="footer-fineprint">
          © {new Date().getFullYear()} TrailFinder · Photos via Wikimedia Commons under their
          respective licenses.
        </p>
      </div>
    </footer>
  )
}
