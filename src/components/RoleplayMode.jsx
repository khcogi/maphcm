import { UserRound } from 'lucide-react'

const ROLEPLAY_TEXT = {
  vi: {
    title: 'Chế độ “Bạn là Nguyễn Ái Quốc”',
    on: 'Tắt nhập vai',
    off: 'Bật nhập vai',
    hint: 'Bật chế độ để xem mỗi mốc lịch sử dưới góc nhìn ngôi thứ nhất, giúp trải nghiệm câu chuyện gần gũi hơn.',
  },
  en: {
    title: '“You are Nguyen Ai Quoc” mode',
    on: 'Disable roleplay',
    off: 'Enable roleplay',
    hint: 'Enable this mode to read each milestone in first-person perspective for a more immersive experience.',
  },
}

function RoleplayMode({ enabled, onToggle, event, language }) {
  const t = ROLEPLAY_TEXT[language] ?? ROLEPLAY_TEXT.vi

  return (
    <section className="mx-auto max-w-6xl px-4 py-6 md:px-6">
      <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-amber-200">
            <UserRound size={18} />
            <h3 className="font-semibold">{t.title}</h3>
          </div>

          <button
            type="button"
            onClick={onToggle}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              enabled
                ? 'bg-amber-300 text-amber-950 hover:bg-amber-200'
                : 'border border-amber-300/50 text-amber-100 hover:bg-amber-300/10'
            }`}
          >
            {enabled ? t.on : t.off}
          </button>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-amber-100/90">
          {enabled
            ? language === 'en'
              ? `“I am in ${event.location}. In ${event.year}, I ${event.description.charAt(0).toLowerCase()}${event.description.slice(1)}”`
              : `“Tôi đang ở ${event.location}. Năm ${event.year}, tôi ${event.description.charAt(0).toLowerCase()}${event.description.slice(1)}”`
            : t.hint}
        </p>
      </div>
    </section>
  )
}

export default RoleplayMode
