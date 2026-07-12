import { Link, useLocation } from 'react-router-dom'
import { useHomeUi } from '../state/HomeUiContext'
import Wordmark from './Wordmark'

export default function Header() {
  const { view, setView } = useHomeUi()
  const isHome = useLocation().pathname === '/'

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="header-brand">
          <Wordmark fontSize={26} className="header-wordmark" />
        </Link>

        {isHome && (
          <div className="view-toggle" role="group" aria-label="Switch view">
            <button
              type="button"
              className={view === 'list' ? 'view-toggle-btn active' : 'view-toggle-btn'}
              onClick={() => setView('list')}
            >
              List
            </button>
            <button
              type="button"
              className={view === 'map' ? 'view-toggle-btn active' : 'view-toggle-btn'}
              onClick={() => setView('map')}
            >
              Map
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
