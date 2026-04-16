import { useState } from 'react'
import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MapJourneyPage from './pages/MapJourneyPage'
import QuizPage from './pages/QuizPage'

const APP_TEXT = {
  vi: {
    navIntro: 'Giới thiệu',
    navMap: 'Bản đồ',
    navQuiz: 'Quiz',
    footer:
      '“Không có gì quý hơn độc lập, tự do.” — Hành trình lịch sử được tái hiện bằng trải nghiệm tương tác.',
  },
  en: {
    navIntro: 'Intro',
    navMap: 'Map',
    navQuiz: 'Quiz',
    footer:
      '“Nothing is more precious than independence and freedom.” — A historical journey retold through an interactive experience.',
  },
}

function App() {
  const Shell = () => {
    const location = useLocation()
    const isMapRoute = location.pathname === '/map'

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <header className="sticky top-0 z-50 border-b border-slate-700/70 bg-slate-950/85 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl flex-wrap gap-2 px-4 py-3 text-sm md:px-6">
            <Link to="/" className="rounded-lg border border-slate-700 px-3 py-1 text-slate-200">
              {t.navIntro}
            </Link>
            <Link to="/map" className="rounded-lg border border-slate-700 px-3 py-1 text-slate-200">
              {t.navMap}
            </Link>
            <Link to="/quiz" className="rounded-lg border border-slate-700 px-3 py-1 text-slate-200">
              {t.navQuiz}
            </Link>

            <div className="ml-auto flex items-center rounded-lg border border-slate-700 p-1">
              <button
                type="button"
                onClick={() => setLanguage('vi')}
                className={`rounded-md px-2 py-0.5 text-xs ${
                  language === 'vi' ? 'bg-cyan-500/20 text-cyan-100' : 'text-slate-300'
                }`}
              >
                VI
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`rounded-md px-2 py-0.5 text-xs ${
                  language === 'en' ? 'bg-cyan-500/20 text-cyan-100' : 'text-slate-300'
                }`}
              >
                EN
              </button>
            </div>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<HomePage language={language} />} />
          <Route path="/map" element={<MapJourneyPage language={language} />} />
          <Route path="/quiz" element={<QuizPage language={language} />} />
        </Routes>

        {!isMapRoute && (
          <footer className="mx-auto max-w-6xl px-4 pb-10 pt-5 text-sm text-slate-400 md:px-6">
            <p>{t.footer}</p>
          </footer>
        )}
      </div>
    )
  }

  const [language, setLanguage] = useState('vi')
  const t = APP_TEXT[language]

  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  )
}

export default App
