import { motion } from 'framer-motion'
import { ScenarioDiagram, type Scenario } from './ScenarioDiagram'

interface SceneProps { reduced: boolean }

function SinActuatorScene({ reduced }: SceneProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-2 w-full max-w-xs mx-auto">
      <motion.div
        className="flex items-center gap-2 border border-border bg-surface rounded px-3 py-2"
        initial={reduced ? false : { opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? { duration: 0 } : { duration: 0.25 }}
      >
        <span className="text-xs text-text-muted">Kubernetes</span>
        <span className="text-xs text-text-muted/50">→ ¿está viva?</span>
      </motion.div>

      <motion.div
        className="text-text-muted/40 text-lg"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? { duration: 0 } : { delay: 0.2 }}
      >
        ↓
      </motion.div>

      <motion.div
        className="border-2 border-dashed border-border bg-elevated rounded-xl p-4 w-full flex flex-col items-center gap-2"
        initial={reduced ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={reduced ? { duration: 0 } : { delay: 0.3, duration: 0.3 }}
      >
        <span className="text-xs font-medium text-text-secondary">Spring Boot App</span>
        <div className="flex gap-2 mt-1">
          {['JVM', 'DB', 'cache'].map((label, i) => (
            <div key={label} className="border border-border rounded px-2 py-1">
              <span className="text-xs text-text-muted">{label}</span>
            </div>
          ))}
        </div>
        <span className="text-xs text-text-muted/50 mt-1">estado interno oculto</span>
      </motion.div>

      <motion.div
        className="text-text-muted/40 text-lg"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? { duration: 0 } : { delay: 0.5 }}
      >
        ↓
      </motion.div>

      <motion.div
        className="border border-[#6b3a3a] bg-[#3a1515] rounded px-4 py-2 text-center"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? { duration: 0 } : { delay: 0.6, duration: 0.25 }}
      >
        <span className="text-xs text-[#e57373]">sin respuesta · reinicia el pod</span>
      </motion.div>
    </div>
  )
}

function ConActuatorScene({ reduced }: SceneProps) {
  const endpoints = ['/actuator/health', '/actuator/metrics']

  return (
    <div className="flex flex-col items-center gap-2 py-2 w-full max-w-xs mx-auto">
      <div className="flex gap-2 w-full">
        {['Kubernetes', 'Prometheus'].map((label, i) => (
          <motion.div
            key={label}
            className="border border-border bg-surface rounded px-2 py-2 text-center flex-1"
            initial={reduced ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : { delay: i * 0.1, duration: 0.25 }}
          >
            <span className="text-xs text-text-muted">{label}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex gap-6 text-accent/60 text-sm"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? { duration: 0 } : { delay: 0.3 }}
      >
        <span>↓</span><span>↓</span>
      </motion.div>

      <motion.div
        className="border border-[var(--accent)] bg-[var(--accent-bg)] rounded-xl p-3 w-full"
        initial={reduced ? false : { opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? { duration: 0 } : { delay: 0.4, duration: 0.3 }}
      >
        <span className="text-xs font-medium text-accent-soft block mb-2">Actuator endpoints</span>
        <div className="flex flex-col gap-1">
          {endpoints.map((ep, i) => (
            <motion.div
              key={ep}
              className="border border-border bg-elevated rounded px-2 py-1 font-mono"
              initial={reduced ? false : { opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={reduced ? { duration: 0 } : { delay: 0.5 + i * 0.1 }}
            >
              <span className="text-xs text-text-secondary">{ep}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="text-accent/60 text-sm"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? { duration: 0 } : { delay: 0.7 }}
      >
        ↓
      </motion.div>

      <motion.div
        className="border border-border bg-elevated rounded-xl p-3 w-full flex flex-col items-center gap-2"
        initial={reduced ? false : { opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? { duration: 0 } : { delay: 0.8, duration: 0.3 }}
      >
        <span className="text-xs font-medium text-text-secondary">Spring Boot App</span>
        <div className="flex gap-2">
          {['JVM', 'DB', 'cache'].map((label) => (
            <div key={label} className="border border-[var(--accent)] bg-[var(--accent-bg)] rounded px-2 py-1">
              <span className="text-xs text-accent-soft">{label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="border border-[var(--accent)] bg-[var(--accent-bg)] rounded px-4 py-2 text-center w-full"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? { duration: 0 } : { delay: 1, duration: 0.25 }}
      >
        <span className="text-xs text-accent-soft font-mono">status: "UP"</span>
      </motion.div>
    </div>
  )
}

export function DiagramaActuator() {
  const scenarios: Scenario[] = [
    {
      id: 'sin-actuator',
      label: 'Sin Actuator',
      caption:
        'La app es una caja negra. El orquestador pregunta si está viva, no obtiene respuesta útil, y reinicia el pod.',
      render: (reduced) => <SinActuatorScene reduced={reduced} />,
    },
    {
      id: 'con-actuator',
      label: 'Con Actuator',
      caption:
        'Actuator expone endpoints observables. Kubernetes consulta /health, Prometheus scrapeá /metrics — ambos obtienen respuestas estructuradas.',
      render: (reduced) => <ConActuatorScene reduced={reduced} />,
    },
  ]

  return <ScenarioDiagram scenarios={scenarios} />
}
