import { createContext, useContext, useRef, useState } from 'react'

const CURRENT_MONTH = new Date().getMonth() + 1

const HomeUiContext = createContext(null)

// Holds the home page's browsing state (season, filters, view) above the router
// so it survives navigating to a trail and back — the filtered result stays put.
export function HomeUiProvider({ children }) {
  const [query, setQuery] = useState('')
  const [country, setCountry] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [iconic, setIconic] = useState(false)
  const [month, setMonth] = useState(CURRENT_MONTH)
  const [view, setView] = useState('list')
  // Remembered scroll position so back navigation lands where you were.
  const scrollYRef = useRef(0)

  const value = {
    query, setQuery,
    country, setCountry,
    difficulty, setDifficulty,
    iconic, setIconic,
    month, setMonth,
    view, setView,
    scrollYRef,
  }

  return <HomeUiContext.Provider value={value}>{children}</HomeUiContext.Provider>
}

export function useHomeUi() {
  const ctx = useContext(HomeUiContext)
  if (!ctx) throw new Error('useHomeUi must be used within HomeUiProvider')
  return ctx
}
