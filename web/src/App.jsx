import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import TrailDetail from './pages/TrailDetail'
import BirthMonthShare from './pages/BirthMonthShare'
import { HomeUiProvider } from './state/HomeUiContext'

function App() {
  return (
    <HomeUiProvider>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trail/:slug" element={<TrailDetail />} />
          <Route path="/birth-month/:month/:tier" element={<BirthMonthShare />} />
        </Routes>
      </main>
      <Footer />
    </HomeUiProvider>
  )
}

export default App
