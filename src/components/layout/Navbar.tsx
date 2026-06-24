import { Link } from "react-router"
import { ThemeToggle } from "./ThemeToggle"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 h-14 flex items-center justify-between px-6 bg-surface border-b border-border">
      <Link
        to="/"
        className="text-base font-medium text-text-primary hover:text-accent-soft transition-colors"
      >
        Springpath
      </Link>
      <ThemeToggle />
    </header>
  )
}
