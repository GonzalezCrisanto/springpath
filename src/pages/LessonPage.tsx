import { useParams, Link } from 'react-router'
import { tracks } from '../content/tracks'
import { loadLesson } from '../lib/lessonLoader'
import { mdxComponents } from '../components/lesson/mdxComponents'
import { LessonNav } from '../components/lesson/LessonNav'
import { useProgress } from '../hooks/useProgress'

export function LessonPage() {
  const { trackId, lessonId } = useParams<{ trackId: string; lessonId: string }>()
  const { isComplete } = useProgress()

  const track = tracks.find((t) => t.id === trackId)
  const lesson = track?.lessons.find((l) => l.id === lessonId)

  if (!track || !lesson) {
    return (
      <div className="text-text-muted">
        <p>Lección no encontrada.</p>
        <Link to="/" className="text-accent-soft hover:underline">
          Volver al inicio
        </Link>
      </div>
    )
  }

  const MDXContent = loadLesson(trackId!, lessonId!)

  return (
    <div className="max-w-prose">
      {/* Breadcrumb */}
      <p className="text-text-muted text-sm mb-4">
        <Link to={`/track/${track.id}`} className="hover:text-text-primary transition-colors">
          {track.title}
        </Link>
        {' → '}
        <span>{lesson.title}</span>
      </p>

      {/* Title */}
      <h1 className="text-2xl font-medium text-text-primary mb-2">{lesson.title}</h1>

      {/* Level badge + estimated time + completion */}
      <p className="text-sm text-text-muted mb-6">
        <span
          className="inline-block px-2 py-0.5 rounded bg-accent-bg text-accent-soft mr-3"
          aria-label={lesson.level === 'dominas' ? 'Dominás' : 'Nuevo'}
        >
          {lesson.level === 'dominas' ? '✅ dominás' : '🆕 nuevo'}
        </span>
        {lesson.estMinutes && <span className="mr-3">{lesson.estMinutes} min de lectura</span>}
        {isComplete(lessonId!) && (
          <span className="inline-block px-2 py-0.5 rounded bg-accent-bg text-accent-soft">
            ✅ completado
          </span>
        )}
      </p>

      <hr className="border-border mb-6" />

      {MDXContent ? (
        <MDXContent components={mdxComponents} />
      ) : (
        <p className="text-text-muted">Contenido no disponible.</p>
      )}

      <LessonNav trackId={trackId!} lessonId={lessonId!} />
    </div>
  )
}
