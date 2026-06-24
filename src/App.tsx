import { BrowserRouter, Routes, Route } from "react-router"
import { AppLayout } from "./components/layout/AppLayout"
import { Home } from "./pages/Home"
import { TrackPage } from "./pages/TrackPage"
import { LessonPage } from "./pages/LessonPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AppLayout />}>
          <Route path="/track/:trackId" element={<TrackPage />} />
          <Route path="/track/:trackId/lesson/:lessonId" element={<LessonPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
