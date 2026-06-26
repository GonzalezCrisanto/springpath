import { createContext, useContext, useState, useCallback } from 'react'

const STORAGE_KEY = 'springpath-progress'

function readFromStorage(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return new Set()
    return new Set(parsed as string[])
  } catch {
    return new Set()
  }
}

function writeToStorage(ids: Set<string>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ids)))
  } catch {
    // localStorage unavailable — silently ignore
  }
}

interface ProgressContextValue {
  completedIds: Set<string>
  markComplete: (lessonId: string) => void
  markIncomplete: (lessonId: string) => void
  isComplete: (lessonId: string) => boolean
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(() => readFromStorage())

  const markComplete = useCallback((lessonId: string) => {
    setCompletedIds((prev) => {
      if (prev.has(lessonId)) return prev
      const next = new Set(prev)
      next.add(lessonId)
      writeToStorage(next)
      return next
    })
  }, [])

  const markIncomplete = useCallback((lessonId: string) => {
    setCompletedIds((prev) => {
      if (!prev.has(lessonId)) return prev
      const next = new Set(prev)
      next.delete(lessonId)
      writeToStorage(next)
      return next
    })
  }, [])

  const isComplete = useCallback(
    (lessonId: string) => completedIds.has(lessonId),
    [completedIds],
  )

  return (
    <ProgressContext.Provider value={{ completedIds, markComplete, markIncomplete, isComplete }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used inside <ProgressProvider>')
  return ctx
}
