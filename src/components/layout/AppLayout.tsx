import { useState } from "react"
import { Outlet } from "react-router"
import { Navbar } from "./Navbar"
import { Sidebar } from "./Sidebar"
import { Footer } from "./Footer"
import { tracks } from "../../content/tracks"

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-page text-text-primary">
      <Navbar onMenuToggle={() => setSidebarOpen((prev) => !prev)} />

      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        <Sidebar
          tracks={tracks}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[92ch] mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
