import { useMemo, useState } from 'react'
import { Pause, Play, Volume2 } from 'lucide-react'

const AUDIO_TEXT = {
  vi: {
    title: 'Mini audio narration',
    subtitle: 'Nghe tóm tắt mốc lịch sử đang chọn bằng giọng đọc tự động của trình duyệt.',
    play: 'Phát',
    stop: 'Dừng',
    speed: 'Tốc độ',
    notSupported: 'Trình duyệt hiện tại chưa hỗ trợ đọc văn bản tự động.',
  },
  en: {
    title: 'Mini audio narration',
    subtitle: 'Listen to a quick narration of the selected milestone using browser speech synthesis.',
    play: 'Play',
    stop: 'Stop',
    speed: 'Speed',
    notSupported: 'Your current browser does not support speech synthesis.',
  },
}

function AudioNarration({ event, language }) {
  const t = AUDIO_TEXT[language] ?? AUDIO_TEXT.vi
  const [isPlaying, setIsPlaying] = useState(false)
  const [rate, setRate] = useState(1)

  const narrationText = useMemo(() => {
    if (!event) return ''
    if (language === 'en') {
      return `Year ${event.year}. Location: ${event.location}. Event: ${event.title}. ${event.description}. Key idea: ${event.idea}.`
    }
    return `Năm ${event.year}. Địa điểm: ${event.location}. Sự kiện: ${event.title}. ${event.description}. Tư tưởng hình thành: ${event.idea}.`
  }, [event, language])

  const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

  const handleStop = () => {
    if (!speechSupported) return
    window.speechSynthesis.cancel()
    setIsPlaying(false)
  }

  const handlePlay = () => {
    if (!speechSupported || !narrationText) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(narrationText)
    utterance.lang = language === 'en' ? 'en-US' : 'vi-VN'
    utterance.rate = rate
    utterance.onend = () => setIsPlaying(false)
    utterance.onerror = () => setIsPlaying(false)
    window.speechSynthesis.speak(utterance)
    setIsPlaying(true)
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-2 md:px-6">
      <div className="rounded-2xl border border-sky-400/30 bg-sky-500/10 p-4 md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-sky-100">
              <Volume2 size={18} />
              {t.title}
            </h3>
            <p className="mt-1 text-sm text-sky-100/80">{t.subtitle}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="text-xs text-sky-100/80">
              {t.speed}
              <select
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="ml-2 rounded border border-slate-500 bg-slate-900 px-2 py-1 text-slate-100"
              >
                <option value={0.8}>0.8x</option>
                <option value={1}>1.0x</option>
                <option value={1.2}>1.2x</option>
              </select>
            </label>

            <button
              type="button"
              onClick={handlePlay}
              disabled={!speechSupported}
              className="inline-flex items-center gap-1 rounded-lg bg-sky-300 px-3 py-1.5 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Play size={15} />
              {t.play}
            </button>

            <button
              type="button"
              onClick={handleStop}
              disabled={!speechSupported || !isPlaying}
              className="inline-flex items-center gap-1 rounded-lg border border-sky-300/50 px-3 py-1.5 text-sm font-semibold text-sky-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Pause size={15} />
              {t.stop}
            </button>
          </div>
        </div>

        {!speechSupported && <p className="mt-3 text-sm text-amber-100">{t.notSupported}</p>}
      </div>
    </section>
  )
}

export default AudioNarration
