import { Link } from "react-router"
import { Navbar } from "../components/layout/Navbar"
import { Footer } from "../components/layout/Footer"
import { tracks } from "../content/tracks"

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
              <Link
                key={track.id}
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
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
