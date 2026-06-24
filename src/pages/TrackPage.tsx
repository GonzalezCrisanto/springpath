import { useParams, Link } from "react-router"
import { tracks } from "../content/tracks"

export function TrackPage() {
  const { trackId } = useParams<{ trackId: string }>()
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

  return (
    <div>
      <p className="text-text-muted text-sm mb-2">Track {track.order}</p>
      <h1 className="text-2xl font-medium text-text-primary mb-8">{track.title}</h1>

      <ul className="space-y-2">
        {track.lessons.map((lesson) => (
          <li key={lesson.id}>
            <Link
              to={`/track/${track.id}/lesson/${lesson.id}`}
              className="flex items-center justify-between gap-4 p-3 rounded-lg bg-surface border border-border hover:border-accent transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span aria-label={lesson.level === "dominas" ? "Dominás" : "Nuevo"}>
                  {lesson.level === "dominas" ? "✅" : "🆕"}
                </span>
                <span className="text-sm text-text-primary group-hover:text-accent-soft transition-colors truncate">
                  {lesson.title}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0 text-xs text-text-muted">
                {lesson.hasQuiz && (
                  <span className="px-2 py-0.5 rounded bg-accent-bg text-accent-soft">
                    quiz
                  </span>
                )}
                {lesson.estMinutes && <span>{lesson.estMinutes} min</span>}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
