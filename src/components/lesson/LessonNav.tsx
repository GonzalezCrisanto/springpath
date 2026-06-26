import { Link } from 'react-router'
import { useProgress } from '../../contexts/ProgressContext'
import { getPrevLesson, getNextLesson } from '../../lib/trackUtils'

interface LessonNavProps {
  trackId: string
  lessonId: string
}

export function LessonNav({ trackId, lessonId }: LessonNavProps) {
  const { markComplete, markIncomplete, isComplete } = useProgress()
  const prev = getPrevLesson(trackId, lessonId)
  const next = getNextLesson(trackId, lessonId)
  const completed = isComplete(lessonId)

  return (
    <>
      <hr className="border-border mt-10 mb-6" />

      {/* Row 1: complete toggle — centrado */}
      <div className="flex justify-center mb-4">
        {completed ? (
          <button
            onClick={() => markIncomplete(lessonId)}
            className="flex items-center gap-2 text-sm text-accent-soft border border-accent/40 bg-accent-bg px-5 py-2 rounded-lg hover:border-accent hover:bg-accent-bg/80 transition-colors"
          >
            <span>✓</span>
            <span>Lección completada · deshacer</span>
          </button>
        ) : (
          <button
            onClick={() => markComplete(lessonId)}
            className="text-sm font-medium bg-accent text-white px-5 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            ✓ Marcar como completada
          </button>
        )}
      </div>

      {/* Row 2: prev / next */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          {prev ? (
            <Link
              to={`/track/${prev.track.id}/lesson/${prev.lesson.id}`}
              className="inline-flex items-center gap-2 text-sm border border-border text-text-muted px-4 py-2 rounded-lg hover:border-accent hover:text-text-primary transition-colors"
            >
              <span>←</span>
              <span className="truncate max-w-[160px]">Lección anterior</span>
            </Link>
          ) : (
            <div />
          )}
        </div>

        <div className="flex-1 flex justify-end">
          {next && (
            <Link
              to={`/track/${next.track.id}/lesson/${next.lesson.id}`}
              className="inline-flex items-center gap-2 text-sm font-medium border border-accent/60 text-accent-soft bg-accent-bg px-4 py-2 rounded-lg hover:border-accent hover:bg-accent-bg transition-colors"
            >
              <span className="truncate max-w-[160px]">Siguiente lección</span>
              <span>→</span>
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
