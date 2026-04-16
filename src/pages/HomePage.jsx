import HeroSection from '../components/HeroSection'

const HOME_TEXT = {
  vi: {
    mapBtn: 'Vào bản đồ tương tác',
    quizBtn: 'Làm quiz nhanh',
  },
  en: {
    mapBtn: 'Open interactive map',
    quizBtn: 'Take quick quiz',
  },
}

function HomePage({ language }) {
  const t = HOME_TEXT[language] ?? HOME_TEXT.vi

  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-950 text-slate-100">
      <HeroSection language={language} ctaHref="/map" />

      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
          <div className="flex flex-wrap gap-3">
            <a href="/map" className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950">
              {t.mapBtn}
            </a>
            <a href="/quiz" className="rounded-xl border border-slate-600 px-4 py-2 text-sm text-slate-200">
              {t.quizBtn}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
