import { Fragment, useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react'
import { Circle, MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import './InteractiveMap.css'

const MAP_TEXT = {
  vi: {
    title: 'Bản đồ hành trình tương tác',
    subtitle:
      'Chọn trực tiếp từng mốc trên bản đồ để xem nội dung sự kiện, tư tưởng và chuyển động hành trình ngay tại đây.',
    helper: 'Bản đồ được đặt trọng tâm Việt Nam. Bấm marker để mở nội dung sự kiện.',
  mapMainSubtitle: 'Bản đồ tương tác các dấu mốc lịch sử 1890 - 1969',
    backToOverview: 'Quay lại tổng quan',
    empty: 'Không có điểm bản đồ phù hợp với bộ lọc hiện tại.',
    location: 'Địa điểm',
    event: 'Sự kiện',
    idea: 'Tư tưởng',
    phase: 'Giai đoạn',
    prev: 'Mốc trước',
    next: 'Mốc sau',
    milestones: 'Các mốc trong bộ lọc',
    lineParty: 'Đường lối tư tưởng',
    historicalMeaning: 'Ý nghĩa lịch sử',
    mapTip: 'Bấm marker đỏ hoặc mốc thời gian để mở tab sự kiện trên bản đồ.',
    quizBtn: 'Làm Quiz',
  },
  en: {
    title: 'Interactive journey map',
    subtitle:
      'Select each marker directly on the map to view event details, ideas, and journey flow in one place.',
    helper: 'Map starts from a Vietnam-centric view. Click markers to open event details.',
  mapMainSubtitle: 'Interactive historical map of key milestones (1890 - 1969)',
    backToOverview: 'Back to overview',
    empty: 'No map points match current filters.',
    location: 'Location',
    event: 'Event',
    idea: 'Idea',
    phase: 'Phase',
    prev: 'Previous',
    next: 'Next',
    milestones: 'Milestones in current filter',
    lineParty: 'Ideological line',
    historicalMeaning: 'Historical significance',
    mapTip: 'Click red markers or milestone chips to open event panel directly on the map.',
    quizBtn: 'Open Quiz',
  },
}

const SOVEREIGNTY_MARKERS = [
  {
    name: 'Quần đảo Hoàng Sa',
    subtext: '(Paracel Islands)',
    country: 'VIỆT NAM',
    coords: [16.5, 112.0],
    radius: 80000,
  },
  {
    name: 'Quần đảo Trường Sa',
    subtext: '(Spratly Islands)',
    country: 'VIỆT NAM',
    coords: [10.0, 114.0],
    radius: 120000,
  },
]

function createSovereigntyIcon(name, subtext, country) {
  return new L.DivIcon({
    className: 'sovereignty-marker-icon',
    html: `<div class="sovereignty-label"><div class="sovereignty-flag">VN</div><div class="sovereignty-name">${name}</div><div class="sovereignty-subtext">${subtext}</div><div class="sovereignty-country">${country}</div></div>`,
    iconSize: [170, 72],
    iconAnchor: [85, 36],
  })
}

function createMarkerIcon(isActive) {
  if (isActive) {
    return new L.DivIcon({
      className: 'custom-div-icon',
      html: '<span class="marker-active">★</span>',
      iconSize: [38, 38],
      iconAnchor: [19, 19],
    })
  }

  return new L.DivIcon({
    className: 'custom-div-icon',
    html: '<span class="marker-default">✖</span>',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  })
}

function safeText(value) {
  if (!value) return ''
  return String(value).normalize('NFC')
}

function InteractiveMap({ events, selectedId, onSelect, language, onOpenQuiz }) {
  const t = MAP_TEXT[language] ?? MAP_TEXT.vi
  const selectedEvent = events.find((event) => event.id === selectedId) ?? null
  const selectedIndex = selectedEvent ? events.findIndex((event) => event.id === selectedEvent.id) : -1
  const path = events.map((item) => item.coords)
  const [expanded, setExpanded] = useState({ event: true, idea: true, significance: false })

  const center = selectedEvent?.coords ?? [16.2, 106.0]

  const markerIcons = useMemo(() => {
    return events.reduce((acc, event) => {
      acc[event.id] = createMarkerIcon(event.id === selectedId)
      return acc
    }, {})
  }, [events, selectedId])

  function FlyToSelected({ event }) {
    const map = useMap()

    useEffect(() => {
      if (!event?.coords) return
      const zoomLevel = Math.max(map.getZoom(), 4)
      map.flyTo(event.coords, zoomLevel, {
        animate: true,
        duration: 1.1,
      })
    }, [event, map])

    return null
  }

  return (
    <section id="map" className="relative left-1/2 w-screen -translate-x-1/2 scroll-mt-0 py-0">

      {events.length === 0 && (
        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-900/60 p-4 text-sm text-slate-300">
          {t.empty}
        </div>
      )}

      {events.length > 0 && (
        <div className="map-stage mx-auto mt-0 w-screen max-w-none overflow-hidden rounded-none border-y border-slate-700 border-x-0">
          <MapContainer
            center={center}
            zoom={selectedEvent ? 5 : 6}
            minZoom={3}
            scrollWheelZoom
            className="h-[calc(100vh-58px)] min-h-[680px] w-full"
          >
          <TileLayer
            attribution='&copy; OpenStreetMap, &copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          <FlyToSelected event={selectedEvent} />

          {SOVEREIGNTY_MARKERS.map((item) => (
            <Fragment key={item.name}>
              <Circle
                center={item.coords}
                radius={item.radius}
                pathOptions={{ color: '#da251d', dashArray: '8 5', opacity: 0.8, fillOpacity: 0.08 }}
              />
              <Marker
                position={item.coords}
                icon={createSovereigntyIcon(item.name, item.subtext, item.country)}
                interactive={false}
              />
            </Fragment>
          ))}

          <Polyline positions={path} pathOptions={{ color: '#eab308', weight: 2, opacity: 0.9 }} />

          {events.map((event) => (
            <Marker
              key={event.id}
              position={event.coords}
              icon={markerIcons[event.id]}
              eventHandlers={{ click: () => onSelect(event.id) }}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold">{event.year}</p>
                  <p>{event.title}</p>
                  <p className="text-xs text-slate-600">
                    {t.location}: {event.location}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <header className="map-header-overlay">
          <div className="map-header-content">
            <h3>VN · {t.title}</h3>
            <p>{t.mapMainSubtitle}</p>
          </div>

          <button type="button" className="map-quiz-btn" onClick={onOpenQuiz}>
            <Trophy size={15} />
            {t.quizBtn}
          </button>
        </header>

        <div className="map-stage-overlay-hint">{t.mapTip}</div>

        {selectedEvent && (
          <article className="event-overlay-card">
            <button
              type="button"
              className="overlay-close-btn"
              onClick={() => onSelect(null)}
              aria-label="Close event panel"
            >
              ✕
            </button>

            <div className="overlay-card-header-bar">
              <button type="button" className="overlay-back-btn" onClick={() => onSelect(null)}>
                ← {t.backToOverview}
              </button>
            </div>

            <div className="overlay-card-content">
              <div className="overlay-badge">★ {t.event}</div>
              <h3 className="overlay-title">{safeText(selectedEvent.title)}</h3>
              <p className="overlay-meta">{safeText(selectedEvent.year)} · {safeText(selectedEvent.location)}</p>

              <section className={`overlay-collapse ${expanded.event ? 'expanded' : ''}`}>
                <button type="button" onClick={() => setExpanded((prev) => ({ ...prev, event: !prev.event }))}>
                  <span>✦ {t.lineParty}</span>
                  <span>{expanded.event ? '▲' : '▼'}</span>
                </button>
                <div className="overlay-collapse-body">
                  <p>{safeText(selectedEvent.description)}</p>
                </div>
              </section>

              <section className={`overlay-collapse ${expanded.idea ? 'expanded' : ''}`}>
                <button type="button" onClick={() => setExpanded((prev) => ({ ...prev, idea: !prev.idea }))}>
                  <span>⚔ {t.idea}</span>
                  <span>{expanded.idea ? '▲' : '▼'}</span>
                </button>
                <div className="overlay-collapse-body">
                  <p>{safeText(selectedEvent.idea)}</p>
                </div>
              </section>

              <section className={`overlay-collapse ${expanded.significance ? 'expanded' : ''}`}>
                <button
                  type="button"
                  onClick={() => setExpanded((prev) => ({ ...prev, significance: !prev.significance }))}
                >
                  <span>🏆 {t.historicalMeaning}</span>
                  <span>{expanded.significance ? '▲' : '▼'}</span>
                </button>
                <div className="overlay-collapse-body">
                  <p>
                    {t.phase}: {safeText(selectedEvent.phase)}
                  </p>
                </div>
              </section>

              <div className="overlay-nav-row">
                <button
                  type="button"
                  onClick={() => {
                    if (events.length <= 1) return
                    const prevIndex = selectedIndex <= 0 ? events.length - 1 : selectedIndex - 1
                    onSelect(events[prevIndex].id)
                  }}
                >
                  <ChevronLeft size={14} /> {t.prev}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (events.length <= 1) return
                    const nextIndex = selectedIndex >= events.length - 1 ? 0 : selectedIndex + 1
                    onSelect(events[nextIndex].id)
                  }}
                >
                  {t.next} <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </article>
        )}

        {events.length > 0 && (
          <div className="overlay-milestone-row">
            <p>{t.milestones}</p>
            <div>
              {events.map((event) => (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => onSelect(event.id)}
                  className={selectedId === event.id ? 'active' : ''}
                >
                  {safeText(event.year)}
                </button>
              ))}
            </div>
          </div>
        )}
        </div>
      )}
    </section>
  )
}

export default InteractiveMap
