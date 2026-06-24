import { Link } from 'react-router'
import { useProgress } from '../../hooks/useProgress'
import { getPrevLesson, getNextLesson } from '../../lib/trackUtils'

interface LessonNavProps {
  trackId: string
  lessonId: string
}

export function LessonNav({ trackId, lessonId }: LessonNavProps) {
  const { markComplete, isComplete } = useProgress()
  const prev = getPrevLesson(trackId, lessonId)
  const next = getNextLesson(trackId, lessonId)
  const completed = isComplete(lessonId)

  return (
    <>
      <hr className="border-border mt-8 mb-6" />

      <div className="flex items-center justify-between gap-4">
        {/* Prev */}
        <div className="flex-1 min-w-0">
          {prev && (
            <Link
              to={`/track/${prev.track.id}/lesson/${prev.lesson.id}`}
              className="flex items-center gap-1 text-sm text-text-muted hover:text-text-primary transition-colors group"
            >
              <span className="shrink-0">←</span>
              <span className="truncate group-hover:text-text-primary">
                {prev.lesson.title}
              </span>
            </Link>
          )}
        </div>

        {/* Complete */}
        <div className="shrink-0">
          {completed ? (
            <span className="bg-accent-bg text-accent-soft px-4 py-2 rounded text-sm font-medium">
              ✅ Completado
            </span>
          ) : (
            <button
              onClick={() => markComplete(lessonId)}
              className="bg-accent text-white px-4 py-2 rounded text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Marcar como completado
            </button>
          )}
        </div>

        {/* Next */}
        <div className="flex-1 min-w-0 flex justify-end">
          {next && (
            <Link
              to={`/track/${next.track.id}/lesson/${next.lesson.id}`}
              className="flex items-center gap-1 text-sm text-text-muted hover:text-text-primary transition-colors group"
            >
              <span className="truncate group-hover:text-text-primary">
                {next.lesson.title}
              </span>
              <span className="shrink-0">→</span>
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
