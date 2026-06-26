import { motion } from 'framer-motion'
import { ScenarioDiagram, type Scenario } from './ScenarioDiagram'

interface SceneProps { reduced: boolean }

function SinAdviceScene({ reduced }: SceneProps) {
  const controllers = ['ProductController', 'OrderController', 'UserController']

  return (
    <div className="flex flex-col items-center gap-2 py-2 w-full max-w-sm mx-auto">
      <motion.div
        className="border border-border bg-surface rounded px-3 py-2 text-center w-full"
        initial={reduced ? false : { opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? { duration: 0 } : { duration: 0.2 }}
      >
        <span className="text-xs text-text-muted">request → excepción no manejada</span>
      </motion.div>

      <motion.div className="text-text-muted/40" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={reduced ? { duration: 0 } : { delay: 0.2 }}>↓</motion.div>

      <div className="flex flex-col gap-1.5 w-full">
        {controllers.map((name, i) => (
          <motion.div
            key={name}
            className="border border-[#6b3a3a] bg-[#3a1515] rounded px-3 py-2 w-full"
            initial={reduced ? false : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={reduced ? { duration: 0 } : { delay: 0.3 + i * 0.1 }}
          >
            <span className="text-xs text-[#e57373] font-medium block">{name}</span>
            <span className="text-[10px] text-[#e57373]/60">try/catch propio · formato distinto</span>
          </motion.div>
        ))}
      </div>

      <motion.div className="text-[#e57373]/60" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={reduced ? { duration: 0 } : { delay: 0.7 }}>↓</motion.div>

      <motion.div
        className="border border-[#6b3a3a] bg-[#3a1515] rounded px-3 py-2 w-full text-center"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? { duration: 0 } : { delay: 0.8 }}
      >
        <span className="text-xs text-[#e57373]">3 formatos distintos · stacktraces expuestos</span>
      </motion.div>
    </div>
  )
}

function ConAdviceScene({ reduced }: SceneProps) {
  const exceptions = ['ProductNotFoundException', 'MethodArgumentNotValidException', 'Exception']

  return (
    <div className="flex flex-col items-center gap-2 py-2 w-full max-w-sm mx-auto">
      <div className="flex gap-1.5 w-full">
        {['ProductCtrl', 'OrderCtrl', 'UserCtrl'].map((name, i) => (
          <motion.div
            key={name}
            className="border border-border bg-surface rounded px-2 py-2 text-center flex-1"
            initial={reduced ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : { delay: i * 0.08, duration: 0.2 }}
          >
            <span className="text-[10px] text-text-muted">{name}</span>
          </motion.div>
        ))}
      </div>

      <motion.div className="text-text-muted/40" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={reduced ? { duration: 0 } : { delay: 0.3 }}>
        <span className="text-[10px] text-text-muted/50">excepciones sin capturar</span>
        <div className="text-center">↓</div>
      </motion.div>

      <motion.div
        className="border border-[var(--accent)] bg-[var(--accent-bg)] rounded-xl px-3 py-3 w-full"
        initial={reduced ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={reduced ? { duration: 0 } : { delay: 0.4, duration: 0.3 }}
      >
        <span className="text-xs font-medium text-accent-soft block mb-2">@RestControllerAdvice</span>
        {exceptions.map((ex, i) => (
          <motion.div
            key={ex}
            className="text-[10px] font-mono text-accent-soft/70 py-0.5 truncate"
            initial={reduced ? false : { opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={reduced ? { duration: 0 } : { delay: 0.55 + i * 0.1 }}
          >
            @ExceptionHandler({ex})
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="text-accent/60" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={reduced ? { duration: 0 } : { delay: 0.9 }}>↓</motion.div>

      <motion.div
        className="border border-[var(--accent)] bg-[var(--accent-bg)] rounded px-3 py-2 w-full text-center"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? { duration: 0 } : { delay: 1, duration: 0.2 }}
      >
        <span className="text-xs text-accent-soft font-mono">formato único · status correcto · sin stacktrace</span>
      </motion.div>
    </div>
  )
}

export function DiagramaErrorHandling() {
  const scenarios = [
    {
      id: 'sin-advice',
      label: 'Sin @ControllerAdvice',
      caption: 'Cada controller maneja sus errores por separado. Formatos inconsistentes, stacktraces expuestos, lógica de error duplicada.',
      render: (reduced: boolean) => <SinAdviceScene reduced={reduced} />,
    },
    {
      id: 'con-advice',
      label: 'Con @ControllerAdvice',
      caption: 'Las excepciones fluyen sin capturar hasta el advice global. Un solo lugar maneja todos los errores con un formato consistente.',
      render: (reduced: boolean) => <ConAdviceScene reduced={reduced} />,
    },
  ]

  return <ScenarioDiagram scenarios={scenarios} />
}
