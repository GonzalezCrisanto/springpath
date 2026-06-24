import { useState } from "react"
import { Link, useParams } from "react-router"
import type { Track } from "../../content/tracks"
import { useProgress } from "../../hooks/useProgress"

interface SidebarProps {
  tracks: Track[]
}

function LevelBadge({ level }: { level: "dominas" | "nuevo" }) {
  return (
    <span aria-label={level === "dominas" ? "Dominás" : "Nuevo"}>
      {level === "dominas" ? "✅" : "🆕"}
    </span>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`transition-transform ${open ? "rotate-90" : ""}`}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

interface TrackSectionProps {
  track: Track
  activeTrackId: string | undefined
  activeLessonId: string | undefined
}

function TrackSection({ track, activeTrackId, activeLessonId }: TrackSectionProps) {
  const isActiveTrack = track.id === activeTrackId
  const [open, setOpen] = useState(isActiveTrack)
  const { isComplete } = useProgress()

  return (
    <div>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-elevated transition-colors text-left"
      >
        <Link
          to={`/track/${track.id}`}
          onClick={(e) => e.stopPropagation()}
          className="flex-1 truncate hover:text-accent-soft"
        >
          {track.title}
        </Link>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <ul>
          {track.lessons.map((lesson) => {
            const isActive = isActiveTrack && lesson.id === activeLessonId
            const done = isComplete(lesson.id)
            return (
              <li key={lesson.id}>
                <Link
                  to={`/track/${track.id}/lesson/${lesson.id}`}
                  className={`flex items-center gap-2 px-6 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "text-accent-soft bg-accent-bg"
                      : done
                        ? "text-text-muted hover:text-text-primary hover:bg-elevated"
                        : "text-text-muted hover:text-text-primary hover:bg-elevated"
                  }`}
                >
                  <LevelBadge level={lesson.level} />
                  <span className={`truncate ${!isActive && done ? "opacity-60" : ""}`}>
                    {!isActive && done && (
                      <span className="text-accent-soft mr-1">✓</span>
                    )}
                    {lesson.title}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export function Sidebar({ tracks }: SidebarProps) {
  const { trackId, lessonId } = useParams()

  return (
    <aside className="w-64 shrink-0 bg-surface border-r border-border overflow-y-auto">
      <nav aria-label="Course navigation">
        {tracks.map((track) => (
          <TrackSection
            key={track.id}
            track={track}
            activeTrackId={trackId}
            activeLessonId={lessonId}
          />
        ))}
      </nav>
    </aside>
  )
}
