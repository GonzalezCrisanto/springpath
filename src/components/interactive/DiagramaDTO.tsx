import { motion } from 'framer-motion'
import { ScenarioDiagram } from './ScenarioDiagram'

interface SceneProps { reduced: boolean }

function SinDTOScene({ reduced }: SceneProps) {
  const leaked = ['passwordHash', 'createdAt', 'internalRole', 'updatedBy']

  return (
    <div className="flex flex-col items-center gap-2 py-2 w-full max-w-xs mx-auto">
      <motion.div
        className="border border-border bg-surface rounded-lg px-4 py-3 w-full"
        initial={reduced ? false : { opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? { duration: 0 } : { duration: 0.2 }}
      >
        <span className="text-xs font-medium text-text-secondary block mb-2">User (entidad JPA)</span>
        <div className="flex flex-col gap-1">
          {['id', 'email', 'name', ...leaked].map((field, i) => (
            <motion.div
              key={field}
              className={`text-xs font-mono px-2 py-0.5 rounded ${
                leaked.includes(field)
                  ? 'text-[#e57373] bg-[#3a1515]'
                  : 'text-text-muted'
              }`}
              initial={reduced ? false : { opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={reduced ? { duration: 0 } : { delay: i * 0.07 }}
            >
              {field}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="text-[#e57373]/60 text-sm"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? { duration: 0 } : { delay: 0.5 }}
      >↓ expuesto directo</motion.div>

      <motion.div
        className="border border-[#6b3a3a] bg-[#3a1515] rounded-lg px-4 py-2 w-full text-center"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? { duration: 0 } : { delay: 0.6, duration: 0.25 }}
      >
        <span className="text-xs text-[#e57373]">passwordHash visible en el JSON</span>
      </motion.div>
    </div>
  )
}

function ConDTOScene({ reduced }: SceneProps) {
  return (
    <div className="flex flex-col items-center gap-2 py-2 w-full max-w-xs mx-auto">
      <motion.div
        className="border border-border bg-surface rounded-lg px-4 py-3 w-full"
        initial={reduced ? false : { opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? { duration: 0 } : { duration: 0.2 }}
      >
        <span className="text-xs font-medium text-text-secondary block mb-2">User (entidad JPA)</span>
        <div className="flex flex-col gap-1">
          {['id', 'email', 'name', 'passwordHash', 'internalRole'].map((field) => (
            <div key={field} className="text-xs font-mono text-text-muted/50 px-2 py-0.5">
              {field}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="text-text-muted/40 text-sm"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? { duration: 0 } : { delay: 0.3 }}
      >↓ mapeás solo lo que querés exponer</motion.div>

      <motion.div
        className="border border-[var(--accent)] bg-[var(--accent-bg)] rounded-xl px-4 py-3 w-full"
        initial={reduced ? false : { opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? { duration: 0 } : { delay: 0.4, duration: 0.3 }}
      >
        <span className="text-xs font-medium text-accent-soft block mb-2">UserResponse (DTO)</span>
        <div className="flex flex-col gap-1">
          {['id', 'email', 'name'].map((field, i) => (
            <motion.div
              key={field}
              className="text-xs font-mono text-accent-soft/80 px-2 py-0.5"
              initial={reduced ? false : { opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={reduced ? { duration: 0 } : { delay: 0.5 + i * 0.1 }}
            >
              {field}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="text-accent/60 text-sm"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? { duration: 0 } : { delay: 0.8 }}
      >↓</motion.div>

      <motion.div
        className="border border-[var(--accent)] bg-[var(--accent-bg)] rounded px-4 py-2 w-full text-center"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? { duration: 0 } : { delay: 0.9, duration: 0.2 }}
      >
        <span className="text-xs text-accent-soft font-mono">JSON limpio · solo id, email, name</span>
      </motion.div>
    </div>
  )
}

export function DiagramaDTO() {
  const scenarios = [
    {
      id: 'sin-dto',
      label: 'Sin DTO',
      caption:
        'La entidad JPA va directo al JSON. Todo lo que tiene el objeto — incluyendo passwordHash y campos internos — queda expuesto al cliente.',
      render: (reduced: boolean) => <SinDTOScene reduced={reduced} />,
    },
    {
      id: 'con-dto',
      label: 'Con DTO',
      caption:
        'El DTO actúa como filtro: definís exactamente qué campos exponés. La entidad puede cambiar su estructura interna sin afectar el contrato de la API.',
      render: (reduced: boolean) => <ConDTOScene reduced={reduced} />,
    },
  ]

  return <ScenarioDiagram scenarios={scenarios} />
}
