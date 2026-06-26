import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

export interface Scenario {
  id: string
  label: string
  caption: string
  render: (reducedMotion: boolean) => React.ReactNode
}

interface ScenarioDiagramProps {
  scenarios: Scenario[]
  defaultId?: string
}

export function ScenarioDiagram({ scenarios, defaultId }: ScenarioDiagramProps) {
  const [activeId, setActiveId] = useState(defaultId ?? scenarios[0].id)
  const prefersReduced = useReducedMotion() ?? false

  const active = scenarios.find((s) => s.id === activeId)!

  return (
    <div className="my-8">
      {/* Toggle */}
      <div className="flex gap-2 mb-5 justify-center">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => setActiveId(scenario.id)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors border whitespace-nowrap ${
              scenario.id === activeId
                ? 'bg-accent-bg border-accent text-accent-soft'
                : 'border-border text-text-muted hover:text-text-primary hover:border-accent'
            }`}
          >
            {scenario.label}
          </button>
        ))}
      </div>

      {/* Diagram area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={prefersReduced ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReduced ? {} : { opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="bg-surface border border-border rounded-xl p-6 min-h-[300px] flex items-center justify-center"
        >
          {active.render(prefersReduced)}
        </motion.div>
      </AnimatePresence>

      {/* Caption */}
      <AnimatePresence mode="wait">
        <motion.p
          key={activeId + ':caption'}
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, delay: 0.1 }}
          className="mt-3 text-xs text-text-muted text-center leading-relaxed px-4"
        >
          {active.caption}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
