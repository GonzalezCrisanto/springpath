import { motion } from 'framer-motion'
import { ScenarioDiagram, type Scenario } from './ScenarioDiagram'

interface SceneProps { reduced: boolean }

function SingletonScene({ reduced }: SceneProps) {
  const callers = ['llamada 1', 'llamada 2', 'llamada 3']

  return (
    <div className="flex flex-col items-center gap-3 py-2 w-full max-w-xs mx-auto">
      <div className="flex gap-2 w-full">
        {callers.map((label, i) => (
          <motion.div
            key={label}
            className="border border-border bg-elevated rounded-lg px-2 py-2 text-center flex-1"
            initial={reduced ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : { delay: i * 0.1, duration: 0.25 }}
          >
            <span className="text-xs text-text-muted">{label}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex gap-6 text-text-muted/50 text-sm"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? { duration: 0 } : { delay: 0.4 }}
      >
        <span>↓</span><span>↓</span><span>↓</span>
      </motion.div>

      <motion.div
        className="border border-border bg-surface rounded-xl p-4 w-full"
        initial={reduced ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? { duration: 0 } : { delay: 0.55, duration: 0.3 }}
      >
        <span className="text-xs font-medium text-text-secondary uppercase tracking-wide block mb-2">
          OrderService
        </span>
        <div className="text-xs text-text-muted font-mono mb-2">scope: singleton</div>
        <div className="border border-border bg-elevated rounded px-3 py-1.5">
          <span className="text-xs text-text-muted">una sola instancia · compartida por todos</span>
        </div>
      </motion.div>
    </div>
  )
}

function PrototypeScene({ reduced }: SceneProps) {
  const instances = [1, 2, 3]

  return (
    <div className="flex flex-col gap-2 py-2 w-full max-w-xs mx-auto">
      {instances.map((n, i) => (
        <motion.div
          key={n}
          className="border border-border bg-surface rounded-lg px-4 py-3 w-full"
          initial={reduced ? false : { opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={reduced ? { duration: 0 } : { delay: i * 0.2, duration: 0.25 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-text-secondary">ReportBuilder</span>
              <div className="text-xs text-text-muted font-mono mt-0.5">scope: prototype</div>
            </div>
            <span className="text-xs text-text-muted/60 border border-border rounded px-2 py-0.5">
              instancia #{n}
            </span>
          </div>
        </motion.div>
      ))}

      <motion.p
        className="text-xs text-text-muted/60 text-center mt-1"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? { duration: 0 } : { delay: 0.7 }}
      >
        cada llamada recibe una nueva
      </motion.p>
    </div>
  )
}

export function DiagramaScopes() {
  const scenarios: Scenario[] = [
    {
      id: 'singleton',
      label: 'Singleton',
      caption:
        'Spring crea una sola instancia y la reutiliza para todas las llamadas. Todos los callers acceden al mismo objeto en memoria.',
      render: (reduced) => <SingletonScene reduced={reduced} />,
    },
    {
      id: 'prototype',
      label: 'Prototype',
      caption:
        'Spring crea una instancia nueva cada vez que alguien pide el bean. Cada caller recibe su propio objeto, sin compartir estado.',
      render: (reduced) => <PrototypeScene reduced={reduced} />,
    },
  ]

  return <ScenarioDiagram scenarios={scenarios} />
}
