import { useState } from 'react'

export interface GlossaryTerm {
  term: string
  definition: string
}

interface GlossaryProps {
  terms: GlossaryTerm[]
}

export function Glossary({ terms }: GlossaryProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="mt-8 pt-6 border-t border-border">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 text-sm text-text-muted hover:text-text-primary border border-border hover:border-accent rounded-lg px-4 py-2 transition-colors"
        >
          <span aria-hidden="true">📖</span>
          Glosario de esta lección
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Glosario"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <div className="relative z-10 w-full max-w-lg bg-elevated border border-border rounded-xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="text-base font-medium text-text-primary">Glosario</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label="Cerrar glosario"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <ul className="px-6 py-4 space-y-4 max-h-[60vh] overflow-y-auto">
              {terms.map(({ term, definition }) => (
                <li key={term}>
                  <span className="text-sm font-medium text-accent-soft">{term}</span>
                  <p className="text-sm text-text-secondary mt-0.5 leading-relaxed">{definition}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
