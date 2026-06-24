import { useState, useEffect } from "react"

type Theme = "dark" | "light"

function applyTheme(theme: Theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme") as Theme | null
    return saved === "light" ? "light" : "dark"
  })

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  return { theme, toggleTheme }
}
