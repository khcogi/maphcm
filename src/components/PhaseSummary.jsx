import { motion as Motion } from 'framer-motion'

const PHASE_TEXT = {
  vi: {
    title: 'Những chuyển biến tư tưởng chính',
  },
  en: {
    title: 'Key ideological transformations',
  },
}

function PhaseSummary({ phases, language, phaseMap }) {
  const t = PHASE_TEXT[language] ?? PHASE_TEXT.vi

  return (
    <section className="mx-auto max-w-6xl px-4 py-6 md:px-6">
      <h2 className="text-2xl font-bold text-white md:text-3xl">{t.title}</h2>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {phases.map((phase, idx) => (
          <Motion.article
            key={phase.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4"
          >
            <h3 className="font-semibold text-cyan-200">
              {language === 'en' ? phaseMap?.[phase.title] ?? phase.title : phase.title}
            </h3>
            <p className="mt-2 text-sm text-slate-300 md:text-base">{phase.insight}</p>
          </Motion.article>
        ))}
      </div>
    </section>
  )
}

export default PhaseSummary
