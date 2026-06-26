import { Link } from "react-router"
import { ThemeToggle } from "./ThemeToggle"

interface NavbarProps {
  onMenuToggle?: () => void
}

export function Navbar({ onMenuToggle }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 h-14 flex items-center justify-between px-4 md:px-6 bg-surface border-b border-border">
      <div className="flex items-center gap-3">
        {onMenuToggle && (
          <button
            onClick={onMenuToggle}
            className="md:hidden p-1.5 rounded text-text-muted hover:text-text-primary hover:bg-elevated transition-colors"
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        )}
        <Link
          to="/"
          className="text-base font-medium text-text-primary hover:text-accent-soft transition-colors"
        >
          Springpath
        </Link>
      </div>
      <ThemeToggle />
    </header>
  )
}
