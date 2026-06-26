import { useParams, Link } from "react-router"
import { tracks } from "../content/tracks"
import { useProgress } from "../contexts/ProgressContext"

export function TrackPage() {
  const { trackId } = useParams<{ trackId: string }>()
  const { isComplete } = useProgress()
  const track = tracks.find((t) => t.id === trackId)

  if (!track) {
    return (
      <div className="text-text-muted">
        <p>Track no encontrado.</p>
        <Link to="/" className="text-accent-soft hover:underline">
          Volver al inicio
        </Link>
      </div>
    )
  }

  const total = track.lessons.length
  const completed = track.lessons.filter((l) => isComplete(l.id)).length
  const pct = total > 0 ? (completed / total) * 100 : 0

  return (
    <div>
      <p className="text-text-muted text-sm mb-2">Track {track.order}</p>
      <h1 className="text-2xl font-medium text-text-primary mb-4">{track.title}</h1>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-text-muted mb-1.5">
          <span>{completed} de {total} lecciones completadas</span>
          <span>{Math.round(pct)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-elevated overflow-hidden">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <ul className="space-y-2">
        {track.lessons.map((lesson) => {
          const done = isComplete(lesson.id)
          return (
            <li key={lesson.id}>
              <Link
                to={`/track/${track.id}/lesson/${lesson.id}`}
                className="flex items-center justify-between gap-4 p-3 rounded-lg bg-surface border border-border hover:border-accent transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`text-sm transition-colors truncate ${done ? "text-text-muted" : "text-text-primary group-hover:text-accent-soft"}`}>
                    {lesson.title}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0 text-xs text-text-muted">
                  {done && <span className="text-accent-soft">✓</span>}
                  {lesson.hasQuiz && !done && (
                    <span className="px-2 py-0.5 rounded bg-accent-bg text-accent-soft">quiz</span>
                  )}
                  {lesson.estMinutes && <span>{lesson.estMinutes} min</span>}
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
