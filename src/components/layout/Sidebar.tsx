import { useState } from "react"
import { Link, useParams } from "react-router"
import type { Track } from "../../content/tracks"
import { useProgress } from "../../contexts/ProgressContext"
import { ComingSoonModal } from "./ComingSoonModal"

interface SidebarProps {
  tracks: Track[]
  isOpen?: boolean
  onClose?: () => void
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
  onLinkClick?: () => void
}

function LockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function TrackSection({ track, activeTrackId, activeLessonId, onLinkClick }: TrackSectionProps) {
  const isActiveTrack = track.id === activeTrackId
  const [open, setOpen] = useState(isActiveTrack)
  const [modalOpen, setModalOpen] = useState(false)
  const { isComplete } = useProgress()

  const isLocked = track.order > 2 && import.meta.env.VITE_LOCK_TRACKS === "true"

  if (isLocked) {
    return (
      <div>
        <button
          onClick={() => setModalOpen(true)}
          className="w-full flex items-center justify-between gap-2 px-4 py-2 text-sm font-medium hover:text-text-primary hover:bg-elevated transition-colors text-left border-l-2 border-transparent text-text-secondary"
        >
          <span className="flex-1 truncate">{track.title}</span>
          <span className="text-text-muted shrink-0">
            <LockIcon />
          </span>
        </button>
        <ComingSoonModal
          track={track}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between gap-2 px-4 py-2 text-sm font-medium hover:text-text-primary hover:bg-elevated transition-colors text-left border-l-2 ${
          isActiveTrack
            ? "border-accent text-text-primary"
            : "border-transparent text-text-secondary"
        }`}
      >
        <Link
          to={`/track/${track.id}`}
          onClick={(e) => { e.stopPropagation(); onLinkClick?.() }}
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
                  onClick={onLinkClick}
                  className={`flex items-center gap-2 px-6 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "text-accent-soft bg-accent-bg"
                      : done
                        ? "text-text-muted hover:text-text-primary hover:bg-elevated"
                        : "text-text-muted hover:text-text-primary hover:bg-elevated"
                  }`}
                >
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

export function Sidebar({ tracks, isOpen = false, onClose }: SidebarProps) {
  const { trackId, lessonId } = useParams()

  return (
    <aside
      className={[
        "fixed top-14 bottom-0 left-0 z-40 w-72 bg-surface border-r border-border overflow-y-auto",
        "transform transition-transform duration-200 ease-in-out",
        "md:static md:top-auto md:bottom-auto md:z-auto md:w-64 md:shrink-0 md:translate-x-0 md:transition-none",
        isOpen ? "translate-x-0" : "-translate-x-full",
      ].join(" ")}
    >
      <nav aria-label="Course navigation">
        {tracks.map((track) => (
          <TrackSection
            key={track.id}
            track={track}
            activeTrackId={trackId}
            activeLessonId={lessonId}
            onLinkClick={onClose}
          />
        ))}
      </nav>
    </aside>
  )
}
