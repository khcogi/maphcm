import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AudioNarration from '../components/AudioNarration'
import InteractiveMap from '../components/InteractiveMap'
import JourneyProgressBar from '../components/JourneyProgressBar'
import RoleplayMode from '../components/RoleplayMode'
import { timelineEvents } from '../data/timelineData'

const MAP_PAGE_TEXT = {
  vi: {
    allPhases: 'Tất cả giai đoạn',
    showing: 'Đang hiển thị',
    events: 'mốc sự kiện',
    searchPlaceholder: 'Tìm theo năm hoặc từ khóa (VD: 1945, độc lập, Paris...)',
    noSearchResult: 'Không tìm thấy mốc phù hợp với bộ lọc hiện tại.',
    mapPickHint: 'Hãy bấm vào một mốc trên bản đồ để xem nội dung sự kiện chi tiết.',
  },
  en: {
    allPhases: 'All phases',
    showing: 'Showing',
    events: 'events',
    searchPlaceholder: 'Search by year or keyword (e.g., 1945, independence, Paris...)',
    noSearchResult: 'No matching events found for current filters.',
    mapPickHint: 'Click a marker on the map to view detailed event content.',
  },
}

const PHASE_TRANSLATION = {
  'Giai đoạn hình thành tư tưởng yêu nước (1890 – 1911)':
    'Formative patriotic period (1890 – 1911)',
  'Giai đoạn bôn ba tìm đường (1911 – 1920)': 'Global exploration period (1911 – 1920)',
  'Giai đoạn hoạt động cách mạng quốc tế (1921 – 1930)':
    'International revolutionary activities (1921 – 1930)',
  'Giai đoạn về nước lãnh đạo (1930 – 1945)': 'Return and national leadership (1930 – 1945)',
  'Giai đoạn kháng chiến và xây dựng đất nước (1945 – 1969)':
    'Resistance and nation-building (1945 – 1969)',
  'Kết thúc hành trình (1969)': 'Journey conclusion (1969)',
}

const EN_KEYWORD_ALIASES = {
  birth: 'sinh',
  france: 'phap',
  french: 'phap',
  soviet: 'lien xo',
  ussr: 'lien xo',
  china: 'trung quoc',
  return: 'tro ve',
  independence: 'doc lap',
  declaration: 'tuyen ngon',
  party: 'dang',
  resistance: 'khang chien',
  death: 'qua doi',
}

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function buildSearchQuery(rawQuery, language) {
  const query = normalizeText(rawQuery)
  if (language !== 'en') return query
  const aliases = Object.entries(EN_KEYWORD_ALIASES).reduce((acc, [en, vi]) => {
    if (query.includes(en)) return `${acc} ${vi}`
    return acc
  }, '')
  return `${query} ${aliases}`.trim()
}

function MapJourneyPage({ language }) {
  const navigate = useNavigate()
  const t = MAP_PAGE_TEXT[language] ?? MAP_PAGE_TEXT.vi

  const [activePhase, setActivePhase] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [isRoleplayEnabled, setIsRoleplayEnabled] = useState(false)

  const phaseOptions = useMemo(() => {
    const uniquePhases = [...new Set(timelineEvents.map((event) => event.phase))]
    return [
      { value: 'all', label: t.allPhases },
      ...uniquePhases.map((phase) => ({
        value: phase,
        label: language === 'en' ? PHASE_TRANSLATION[phase] ?? phase : phase,
      })),
    ]
  }, [language, t.allPhases])

  const phaseFilteredEvents = useMemo(() => {
    if (activePhase === 'all') return timelineEvents
    return timelineEvents.filter((event) => event.phase === activePhase)
  }, [activePhase])

  const filteredEvents = useMemo(() => {
    const query = buildSearchQuery(searchQuery, language)
    if (!query) return phaseFilteredEvents
    return phaseFilteredEvents.filter((event) => {
      const eventText = normalizeText(
        [event.year, event.title, event.location, event.description, event.idea, event.phase].join(' '),
      )
      return eventText.includes(query)
    })
  }, [language, phaseFilteredEvents, searchQuery])

  const safeSelectedId = useMemo(() => {
    if (filteredEvents.length === 0) return null
    if (filteredEvents.some((event) => event.id === selectedId)) return selectedId
    return null
  }, [filteredEvents, selectedId])

  const selectedEvent = useMemo(() => {
    if (!safeSelectedId) return null
    return filteredEvents.find((event) => event.id === safeSelectedId) ?? null
  }, [filteredEvents, safeSelectedId])

  const selectedIndex = selectedEvent
    ? filteredEvents.findIndex((event) => event.id === selectedEvent.id)
    : 0

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <JourneyProgressBar currentIndex={selectedIndex} total={filteredEvents.length} />

      <InteractiveMap
        events={filteredEvents}
        selectedId={safeSelectedId}
        onSelect={setSelectedId}
        language={language}
        onOpenQuiz={() => navigate('/quiz')}
      />

      <section className="mx-auto max-w-6xl px-4 pt-5 md:px-6">
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 md:p-5">
          <div className="flex flex-wrap items-center gap-2">
            {phaseOptions.map((phase) => {
              const isActive = activePhase === phase.value
              return (
                <button
                  key={phase.value}
                  type="button"
                  onClick={() => {
                    setActivePhase(phase.value)
                    setSearchQuery('')
                    const nextEvents =
                      phase.value === 'all'
                        ? timelineEvents
                        : timelineEvents.filter((event) => event.phase === phase.value)
                    if (!nextEvents.some((event) => event.id === selectedId)) {
                      setSelectedId(null)
                    }
                  }}
                  className={`rounded-full border px-3 py-1 text-xs transition md:text-sm ${
                    isActive
                      ? 'border-cyan-300 bg-cyan-500/15 text-cyan-100'
                      : 'border-slate-600 text-slate-300 hover:border-slate-400'
                  }`}
                >
                  {phase.label}
                </button>
              )
            })}
          </div>

          <div className="mt-3">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-xl border border-slate-600 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 outline-none ring-cyan-400 transition focus:ring"
            />
          </div>

          <p className="mt-3 text-xs text-slate-400 md:text-sm">
            {t.showing}: <span className="font-medium text-slate-200">{filteredEvents.length}</span> {t.events}
          </p>
        </div>
      </section>

      {selectedEvent ? (
        <>
          <RoleplayMode
            enabled={isRoleplayEnabled}
            onToggle={() => setIsRoleplayEnabled((prev) => !prev)}
            event={selectedEvent}
            language={language}
          />

          <AudioNarration event={selectedEvent} language={language} />
        </>
      ) : (
        <section className="mx-auto max-w-6xl px-4 py-6 md:px-6">
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 text-sm text-slate-300">
            {filteredEvents.length === 0 ? t.noSearchResult : t.mapPickHint}
          </div>
        </section>
      )}
    </main>
  )
}

export default MapJourneyPage
