import { tracks } from '../content/tracks'
import type { Lesson, Track } from '../content/tracks'

export interface LessonRef {
  track: Track
  lesson: Lesson
}

function flatLessons(): LessonRef[] {
  const sorted = [...tracks].sort((a, b) => a.order - b.order)
  return sorted.flatMap((track) =>
    track.lessons.map((lesson) => ({ track, lesson })),
  )
}

export function getPrevLesson(trackId: string, lessonId: string): LessonRef | null {
  const flat = flatLessons()
  const index = flat.findIndex(
    (ref) => ref.track.id === trackId && ref.lesson.id === lessonId,
  )
  if (index <= 0) return null
  return flat[index - 1]
}

export function getNextLesson(trackId: string, lessonId: string): LessonRef | null {
  const flat = flatLessons()
  const index = flat.findIndex(
    (ref) => ref.track.id === trackId && ref.lesson.id === lessonId,
  )
  if (index === -1 || index >= flat.length - 1) return null
  return flat[index + 1]
}
