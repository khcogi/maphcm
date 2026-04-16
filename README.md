# Hành trình tìm đường cứu nước — Interactive Storytelling Website

Website một trang (SPA) bằng **React + TailwindCSS + Framer Motion + Leaflet** tái hiện hành trình của Nguyễn Ái Quốc - Hồ Chí Minh từ **1890 đến 1969**.

## Tính năng chính

- Hero section với tiêu đề: **Hành trình tìm đường cứu nước**
- Timeline tương tác đầy đủ theo giai đoạn lịch sử
- Bản đồ thế giới tương tác, nhấn marker để chọn sự kiện
- Detail panel hiển thị mô tả + tư tưởng hình thành ở mỗi mốc
- Thanh progress hành trình ở đầu trang
- Chế độ nhập vai: **“Bạn là Nguyễn Ái Quốc”**
- Quiz cuối hành trình: **5 câu hỏi**
- Giao diện dark hiện đại + smooth scrolling + animation

## Cấu trúc mã nguồn

- `src/App.jsx`: bố cục SPA và state điều phối tương tác
- `src/data/timelineData.js`: dữ liệu timeline chi tiết 1890–1969
- `src/data/quizData.js`: bộ câu hỏi quiz
- `src/components/HeroSection.jsx`: hero section
- `src/components/TimelineSection.jsx`: timeline tương tác
- `src/components/InteractiveMap.jsx`: bản đồ Leaflet
- `src/components/DetailPanel.jsx`: panel chi tiết sự kiện
- `src/components/JourneyProgressBar.jsx`: thanh tiến độ
- `src/components/RoleplayMode.jsx`: chế độ nhập vai
- `src/components/PhaseSummary.jsx`: tóm tắt chuyển biến tư tưởng
- `src/components/QuizSection.jsx`: quiz 5 câu
- `scripts/validateData.mjs`: script test dữ liệu timeline/quiz

## Chạy dự án

```powershell
npm.cmd install
npm.cmd run dev
```

## Quality checks

```powershell
npm.cmd run lint
npm.cmd run test
npm.cmd run build
```

## Ghi chú

- Bản đồ sử dụng OpenStreetMap tile qua Leaflet.
- Dữ liệu timeline được sắp xếp theo trục thời gian và bao gồm các mốc bắt buộc theo yêu cầu.
# maphcm
