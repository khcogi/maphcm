function JourneyProgressBar({ currentIndex, total }) {
  const safeIndex = Math.max(currentIndex, 0)
  const progress = total <= 1 ? 0 : Math.min(100, Math.round((safeIndex / (total - 1)) * 100))

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1 bg-slate-900/40 backdrop-blur">
      <div
        className="h-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-400 transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export default JourneyProgressBar
