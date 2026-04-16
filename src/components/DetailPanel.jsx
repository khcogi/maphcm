import { motion as Motion } from 'framer-motion'

const DETAIL_TEXT = {
  vi: {
    event: 'Sự kiện',
    idea: 'Tư tưởng hình thành',
    phase: 'Thuộc giai đoạn',
  },
  en: {
    event: 'Event',
    idea: 'Emerging idea',
    phase: 'Phase',
  },
}

function DetailPanel({ event, language }) {
  if (!event) return null
  const t = DETAIL_TEXT[language] ?? DETAIL_TEXT.vi

  return (
    <section id="detail" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-8 md:px-6">
  <Motion.div
        key={event.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-3xl border border-slate-700 bg-slate-900/70 p-6 shadow-xl shadow-black/20 md:p-8"
      >
        <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">{event.year}</p>
        <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">{event.title}</h2>
        <p className="mt-2 text-sm text-slate-300 md:text-base">{event.location}</p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">{t.event}</h3>
            <p className="mt-2 text-slate-200">{event.description}</p>
          </article>
          <article className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-violet-200">{t.idea}</h3>
            <p className="mt-2 text-violet-50">{event.idea}</p>
          </article>
        </div>

        <p className="mt-6 text-sm text-slate-400">
          {t.phase}: <span className="font-medium text-slate-200">{event.phase}</span>
        </p>
  </Motion.div>
    </section>
  )
}

export default DetailPanel
