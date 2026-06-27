import { useState } from "react"
import { Link } from "react-router"
import { Navbar } from "../components/layout/Navbar"
import { Footer } from "../components/layout/Footer"
import { tracks } from "../content/tracks"
import { ComingSoonModal } from "../components/layout/ComingSoonModal"
import type { Track } from "../content/tracks"

function TrackCard({ track }: { track: Track }) {
  const [modalOpen, setModalOpen] = useState(false)
  const isLocked = track.order > 2 && import.meta.env.VITE_LOCK_TRACKS === "true"

  if (isLocked) {
    return (
      <>
        <button
          onClick={() => setModalOpen(true)}
          className="w-full text-left block p-4 rounded-lg bg-surface border border-border hover:border-border transition-colors group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-base font-medium text-text-secondary transition-colors">
              {track.title}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-muted">{track.lessons.length} lecciones</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="text-text-muted shrink-0"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-text-muted">Próximamente</p>
        </button>
        <ComingSoonModal
          track={track}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </>
    )
  }

  return (
    <Link
      to={`/track/${track.id}`}
      className="block p-4 rounded-lg bg-surface border border-border hover:border-accent transition-colors group"
    >
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-base font-medium text-text-primary group-hover:text-accent-soft transition-colors">
          {track.title}
        </h2>
        <span className="text-xs text-text-muted">
          {track.lessons.length} lecciones
        </span>
      </div>
      <p className="text-sm text-text-muted">
        Track {track.order}
      </p>
    </Link>
  )
}

export function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-page text-text-primary">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-[72ch] mx-auto px-6 py-16">
          <h1 className="text-3xl font-medium text-text-primary mb-3">
            Springpath
          </h1>
          <p className="text-text-secondary mb-12 text-lg">
            Aprendé el ecosistema Spring de forma interactiva — desde los fundamentos hasta microservicios en producción.
          </p>

          <div className="space-y-4">
            {tracks.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
