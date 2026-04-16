import { Link } from 'react-router-dom'
import QuizSection from '../components/QuizSection'
import { quizQuestions } from '../data/quizData'

const QUIZ_PAGE_TEXT = {
  vi: {
    back: '← Quay lại bản đồ',
  },
  en: {
    back: '← Back to map',
  },
}

function QuizPage({ language }) {
  const t = QUIZ_PAGE_TEXT[language] ?? QUIZ_PAGE_TEXT.vi

  return (
    <main className="min-h-screen bg-slate-950 pt-6 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Link to="/map" className="inline-flex rounded-lg border border-slate-600 px-3 py-1.5 text-sm text-slate-200">
          {t.back}
        </Link>
      </div>
      <QuizSection questions={quizQuestions} language={language} />
    </main>
  )
}

export default QuizPage
