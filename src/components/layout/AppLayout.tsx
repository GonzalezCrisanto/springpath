import { Outlet } from "react-router"
import { Navbar } from "./Navbar"
import { Sidebar } from "./Sidebar"
import { Footer } from "./Footer"
import { tracks } from "../../content/tracks"

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-page text-text-primary">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar tracks={tracks} />

        {/* Center content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[72ch] mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>

        {/* Right TOC placeholder */}
        <aside
          className="w-48 shrink-0 hidden lg:block overflow-y-auto px-4 py-8 text-text-muted text-sm border-l border-border"
          aria-label="Table of contents"
        >
          <p className="font-medium text-text-muted">tabla de contenidos</p>
        </aside>
      </div>

      <Footer />
    </div>
  )
}
