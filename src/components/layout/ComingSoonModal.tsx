import { useEffect } from "react"
import type { Track } from "../../content/tracks"

interface ComingSoonModalProps {
  track: Track
  open: boolean
  onClose: () => void
}

export function ComingSoonModal({ track, open, onClose }: ComingSoonModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Próximamente: ${track.title}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-md bg-elevated border border-border rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-border">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent-bg text-accent-soft w-fit">
              Próximamente
            </span>
            <h2 className="text-base font-medium text-text-primary mt-1">{track.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors shrink-0 ml-4 mt-0.5"
            aria-label="Cerrar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Lesson list */}
        <ul className="px-6 py-4 space-y-2 max-h-[60vh] overflow-y-auto">
          {track.lessons.map((lesson) => (
            <li key={lesson.id} className="flex items-center gap-2 text-sm text-text-secondary">
              <span className="text-text-muted shrink-0" aria-hidden="true">—</span>
              {lesson.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
