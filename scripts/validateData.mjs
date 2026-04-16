import { timelineEvents } from '../src/data/timelineData.js'
import { quizQuestions } from '../src/data/quizData.js'

const requiredEventChecks = [
  ['Sinh tại Nghệ An', (e) => e.yearValue === 1890],
  ['Rời Việt Nam 1911', (e) => e.yearValue === 1911],
  ['Giai đoạn ở Pháp', (e) => String(e.year).includes('1917') || String(e.year).includes('1920')],
  ['Giai đoạn ở Liên Xô', (e) => e.location.includes('Liên Xô')],
  ['Giai đoạn ở Trung Quốc', (e) => e.location.includes('Trung Quốc')],
  ['Thành lập ĐCSVN 1930', (e) => e.yearValue === 1930],
  ['Trở về Việt Nam 1941', (e) => e.yearValue === 1941],
  ['Tuyên ngôn Độc lập 1945', (e) => e.yearValue === 1945 && e.title.includes('Tuyên ngôn Độc lập')],
  ['Giai đoạn kháng chiến', (e) => String(e.year).includes('1946 – 1954')],
  ['Qua đời 1969', (e) => e.yearValue === 1969],
]

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

assert(Array.isArray(timelineEvents) && timelineEvents.length >= 20, 'Timeline cần có ít nhất 20 sự kiện.')
assert(Array.isArray(quizQuestions) && quizQuestions.length === 5, 'Quiz phải có đúng 5 câu hỏi.')

for (const [label, predicate] of requiredEventChecks) {
  assert(timelineEvents.some(predicate), `Thiếu mốc bắt buộc: ${label}`)
}

for (let i = 1; i < timelineEvents.length; i += 1) {
  assert(
    timelineEvents[i].yearValue >= timelineEvents[i - 1].yearValue,
    `Timeline chưa đúng thứ tự năm tại vị trí ${i + 1}.`,
  )
}

for (const q of quizQuestions) {
  assert(q.correctIndex >= 0 && q.correctIndex < q.options.length, `Quiz câu ${q.id} có đáp án đúng không hợp lệ.`)
}

console.log('✅ Dữ liệu timeline và quiz hợp lệ.')
