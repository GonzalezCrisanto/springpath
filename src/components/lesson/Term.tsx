import { useState } from 'react'

interface TermProps {
  children: React.ReactNode
  definition: string
}

export function Term({ children, definition }: TermProps) {
  const [visible, setVisible] = useState(false)

  return (
    <span className="relative inline-block">
      <span
        className="border-b border-dashed border-accent text-text-primary cursor-help"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onClick={() => setVisible((v) => !v)}
      >
        {children}
      </span>

      {visible && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 z-50 w-64 pointer-events-none">
          {/* Arrow */}
          <span className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-border" />
          {/* Card */}
          <span className="block bg-elevated border border-border rounded-lg px-3 py-2.5 text-sm text-text-secondary leading-relaxed shadow-lg">
            {definition}
          </span>
        </span>
      )}
    </span>
  )
}
