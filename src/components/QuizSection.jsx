import { useMemo, useState } from 'react'
import { motion as Motion } from 'framer-motion'

const QUIZ_TEXT = {
  vi: {
    title: 'Quiz cuối hành trình (5 câu)',
    subtitle: 'Kiểm tra nhanh những gì bạn vừa khám phá qua hành trình 1890 – 1969.',
    questionPrefix: 'Câu',
    explanation: 'Giải thích',
    grade: 'Chấm điểm',
    reset: 'Làm lại',
    result: 'Kết quả',
  },
  en: {
    title: 'End-of-journey quiz (5 questions)',
    subtitle: 'Quickly test what you discovered across the 1890 – 1969 journey.',
    questionPrefix: 'Question',
    explanation: 'Explanation',
    grade: 'Submit score',
    reset: 'Reset',
    result: 'Result',
  },
}

function QuizSection({ questions, language }) {
  const t = QUIZ_TEXT[language] ?? QUIZ_TEXT.vi
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const score = useMemo(() => {
    return questions.reduce((acc, q) => {
      if (answers[q.id] === q.correctIndex) return acc + 1
      return acc
    }, 0)
  }, [answers, questions])

  const onSelectOption = (questionId, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }

  return (
    <section id="quiz" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 md:px-6">
  <Motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="rounded-3xl border border-slate-700 bg-slate-900/70 p-6 md:p-8"
      >
  <h2 className="text-2xl font-bold text-white md:text-3xl">{t.title}</h2>
  <p className="mt-2 text-slate-300">{t.subtitle}</p>

        <div className="mt-8 space-y-6">
          {questions.map((q, qIndex) => (
            <article key={q.id} className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4 md:p-5">
              <h3 className="font-semibold text-white">
                {t.questionPrefix} {qIndex + 1}: {language === 'en' ? q.questionEn ?? q.question : q.question}
              </h3>

              <div className="mt-3 space-y-2">
                {(language === 'en' ? q.optionsEn ?? q.options : q.options).map((option, optionIndex) => {
                  const isPicked = answers[q.id] === optionIndex
                  const showState = submitted
                  const isCorrectOption = optionIndex === q.correctIndex

                  return (
                    <button
                      key={`${q.id}-${option}`}
                      type="button"
                      onClick={() => onSelectOption(q.id, optionIndex)}
                      className={`w-full rounded-xl border px-3 py-2 text-left text-sm transition md:text-base ${
                        isPicked
                          ? 'border-cyan-400 bg-cyan-500/10 text-cyan-100'
                          : 'border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-500'
                      } ${
                        showState && isCorrectOption
                          ? '!border-emerald-400 !bg-emerald-500/15 !text-emerald-100'
                          : ''
                      }`}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>

              {submitted && (
                <p className="mt-3 text-sm text-slate-300">
                  {t.explanation}: {language === 'en' ? q.explanationEn ?? q.explanation : q.explanation}
                </p>
              )}
            </article>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-2 font-semibold text-slate-950 transition hover:brightness-110"
          >
            {t.grade}
          </button>

          <button
            type="button"
            onClick={() => {
              setAnswers({})
              setSubmitted(false)
            }}
            className="rounded-xl border border-slate-600 px-4 py-2 text-slate-200 hover:bg-slate-800"
          >
            {t.reset}
          </button>

          {submitted && (
            <p className="text-sm text-slate-200 md:text-base">
              {t.result}: <span className="font-bold text-white">{score}/{questions.length}</span>
            </p>
          )}
        </div>
  </Motion.div>
    </section>
  )
}

export default QuizSection
