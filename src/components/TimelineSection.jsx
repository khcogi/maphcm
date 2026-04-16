import { motion as Motion } from 'framer-motion'

const TIMELINE_TEXT = {
  vi: {
    title: 'Dòng thời gian tương tác',
    subtitle: 'Chạm vào từng mốc để xem chi tiết tư tưởng và vị trí địa lý.',
    idea: 'Ý tưởng',
    empty: 'Không có sự kiện phù hợp với bộ lọc hiện tại.',
  },
  en: {
    title: 'Interactive timeline',
    subtitle: 'Select each milestone to view details and geographic location.',
    idea: 'Idea',
    empty: 'No events match current filters.',
  },
}

function TimelineSection({ events, selectedId, onSelect, language }) {
  const t = TIMELINE_TEXT[language] ?? TIMELINE_TEXT.vi

  return (
    <section id="timeline" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 md:px-6">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white md:text-3xl">{t.title}</h2>
          <p className="mt-2 text-sm text-slate-300 md:text-base">{t.subtitle}</p>
        </div>
      </div>

      {events.length === 0 && (
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 text-sm text-slate-300">
          {t.empty}
        </div>
      )}

      <div className="relative border-l border-slate-700 pl-6">
        {events.map((event, index) => {
          const isActive = event.id === selectedId
          return (
            <Motion.button
              key={event.id}
              type="button"
              onClick={() => onSelect(event.id)}
              whileHover={{ x: 4 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.02 }}
              className={`group relative mb-5 w-full rounded-2xl border p-4 text-left transition md:p-5 ${
                isActive
                  ? 'border-cyan-400/70 bg-cyan-500/10 shadow-lg shadow-cyan-500/10'
                  : 'border-slate-700 bg-slate-900/60 hover:border-slate-500'
              }`}
            >
              <span
                className={`absolute -left-[2.07rem] top-5 h-3.5 w-3.5 rounded-full border-2 ${
                  isActive ? 'border-cyan-300 bg-cyan-400' : 'border-slate-500 bg-slate-800'
                }`}
              />

              <p className="text-xs uppercase tracking-widest text-cyan-200">{event.year}</p>
              <h3 className="mt-1 text-lg font-semibold text-white">{event.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{event.location}</p>
              <p className="mt-2 line-clamp-2 text-sm text-slate-400">{event.description}</p>

              <div className="mt-3 inline-flex rounded-lg border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-xs text-violet-200">
                {t.idea}: {event.idea}
              </div>
            </Motion.button>
          )
        })}
      </div>
    </section>
  )
}

export default TimelineSection
