import { motion as Motion } from 'framer-motion'

const HERO_TEXT = {
  vi: {
    badge: 'Storytelling lịch sử tương tác · 1890 — 1969',
    title: 'Hành trình tìm đường cứu nước',
    description:
      'Khám phá hành trình của Nguyễn Ái Quốc - Hồ Chí Minh qua dòng thời gian, bản đồ thế giới và những dấu mốc tư tưởng định hình con đường giải phóng dân tộc Việt Nam.',
    cta: 'Bắt đầu hành trình',
  },
  en: {
    badge: 'Interactive historical storytelling · 1890 — 1969',
    title: 'The Journey to Find the Path of National Salvation',
    description:
      'Explore Nguyen Ai Quoc - Ho Chi Minh’s journey through timeline storytelling, a world map, and key ideological milestones shaping Vietnam’s path to liberation.',
    cta: 'Start the journey',
  },
}

function HeroSection({ language, ctaHref = '#timeline' }) {
  const text = HERO_TEXT[language] ?? HERO_TEXT.vi

  return (
    <section id="hero" className="relative overflow-hidden pt-28 pb-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.2),_transparent_40%)]" />
      <div className="mx-auto max-w-6xl px-4 md:px-6">
  <Motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-200"
        >
    {text.badge}
  </Motion.p>

  <Motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-4xl font-black leading-tight text-white md:text-6xl"
        >
    {text.title}
  </Motion.h1>

  <Motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300 md:text-lg"
        >
    {text.description}
  </Motion.p>

  <Motion.a
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          href={ctaHref}
          className="mt-8 inline-flex items-center rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
        >
    {text.cta}
  </Motion.a>
      </div>
    </section>
  )
}

export default HeroSection
