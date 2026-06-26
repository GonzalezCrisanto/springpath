import { motion } from 'framer-motion'
import { ScenarioDiagram, type Scenario } from './ScenarioDiagram'

interface SceneProps { reduced: boolean }

function ConstructorScene({ reduced }: SceneProps) {
  return (
    <div className="flex flex-col items-center gap-2 py-2 w-full max-w-xs mx-auto">
      <motion.div
        className="border border-border bg-elevated rounded-lg px-4 py-2 text-center w-full"
        initial={reduced ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-xs text-text-muted block mb-0.5">dependencia externa</span>
        <span className="text-xs font-medium text-text-secondary">IPaymentGateway</span>
      </motion.div>

      <div className="flex flex-col items-center gap-0.5">
        <div className="relative w-0.5 h-7 bg-border/60 rounded overflow-hidden">
          <motion.div
            className="absolute inset-x-0 top-0 bg-text-muted/50 rounded"
            style={{ transformOrigin: 'top' }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={reduced ? { duration: 0 } : { duration: 0.3, delay: 0.25, ease: 'easeOut' }}
          />
        </div>
        <motion.span
          className="text-text-muted text-sm leading-none"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduced ? { duration: 0 } : { delay: 0.48 }}
        >↓</motion.span>
      </div>

      <div className="border border-border bg-surface rounded-xl p-4 w-full">
        <span className="text-xs font-medium text-text-secondary uppercase tracking-wide block mb-2">
          OrderService
        </span>
        <div className="text-xs text-text-muted font-mono mb-3">constructor(gateway)</div>
        <motion.div
          className="border border-border bg-elevated rounded-lg px-3 py-2"
          initial={reduced ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? { duration: 0 } : { duration: 0.25, delay: 0.52 }}
        >
          <span className="text-xs text-text-secondary">private <strong>final</strong> gateway</span>
        </motion.div>
      </div>
    </div>
  )
}

function SetterScene({ reduced }: SceneProps) {
  return (
    <div className="flex flex-col items-center gap-2 py-2 w-full max-w-xs mx-auto">
      <motion.div
        className="border border-border bg-elevated rounded-lg px-4 py-2 text-center w-full"
        initial={reduced ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-xs text-text-muted block mb-0.5">dependencia externa</span>
        <span className="text-xs font-medium text-text-secondary">IPaymentGateway</span>
      </motion.div>

      <div className="flex flex-col items-center gap-0.5">
        <div className="relative w-0.5 h-7 bg-border/60 rounded overflow-hidden">
          <motion.div
            className="absolute inset-x-0 top-0 bg-text-muted/50 rounded"
            style={{ transformOrigin: 'top' }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={reduced ? { duration: 0 } : { duration: 0.3, delay: 0.25, ease: 'easeOut' }}
          />
        </div>
        <motion.span
          className="text-text-muted text-sm leading-none"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduced ? { duration: 0 } : { delay: 0.48 }}
        >↓</motion.span>
      </div>

      <div className="border border-border bg-surface rounded-xl p-4 w-full">
        <span className="text-xs font-medium text-text-secondary uppercase tracking-wide block mb-2">
          OrderService
        </span>
        <div className="text-xs text-text-muted font-mono mb-3">setGateway(gateway)</div>
        <motion.div
          className="border border-border bg-elevated rounded-lg px-3 py-2"
          initial={reduced ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? { duration: 0 } : { duration: 0.25, delay: 0.52 }}
        >
          <span className="text-xs text-text-secondary">private gateway <span className="text-text-muted/60">(sin final, reemplazable)</span></span>
        </motion.div>
      </div>
    </div>
  )
}

function FieldScene({ reduced }: SceneProps) {
  return (
    <div className="flex flex-col items-center gap-2 py-2 w-full max-w-xs mx-auto">
      <motion.div
        className="border border-border bg-elevated rounded-lg px-4 py-2 text-center w-full"
        initial={reduced ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-xs text-text-muted block mb-0.5">ApplicationContext</span>
        <span className="text-xs font-medium text-text-secondary">Spring (reflexión)</span>
      </motion.div>

      <div className="flex flex-col items-center gap-0.5">
        <motion.div
          className="w-0.5 h-7 border-l-2 border-dashed border-text-muted/40"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduced ? { duration: 0 } : { duration: 0.3, delay: 0.25 }}
        />
        <motion.span
          className="text-text-muted text-sm leading-none"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduced ? { duration: 0 } : { delay: 0.48 }}
        >↓</motion.span>
      </div>

      <div className="border border-border bg-surface rounded-xl p-4 w-full">
        <span className="text-xs font-medium text-text-secondary uppercase tracking-wide block mb-2">
          OrderService
        </span>
        <div className="text-xs text-text-muted font-mono mb-1">@Autowired</div>
        <motion.div
          className="border border-border bg-elevated rounded-lg px-3 py-2"
          initial={reduced ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? { duration: 0 } : { duration: 0.25, delay: 0.52 }}
        >
          <span className="text-xs text-text-secondary">private gateway <span className="text-text-muted/60">(sin final)</span></span>
        </motion.div>
      </div>
    </div>
  )
}

interface DiagramaInyeccionProps {
  labels?: {
    porConstructor?: string
    porSetter?: string
    porCampo?: string
    captionConstructor?: string
    captionSetter?: string
    captionCampo?: string
  }
}

export function DiagramaInyeccion({ labels = {} }: DiagramaInyeccionProps) {
  const scenarios: Scenario[] = [
    {
      id: 'por-constructor',
      label: labels.porConstructor ?? 'Por constructor',
      caption:
        labels.captionConstructor ??
        'La dependencia llega como parámetro del constructor. El campo puede ser final. Si Spring no encuentra la dependencia, la app no arranca.',
      render: (reduced) => <ConstructorScene reduced={reduced} />,
    },
    {
      id: 'por-setter',
      label: labels.porSetter ?? 'Por setter',
      caption:
        labels.captionSetter ??
        'La dependencia llega a través de un método setter, después de que el objeto fue creado. El campo no puede ser final, pero puede reemplazarse.',
      render: (reduced) => <SetterScene reduced={reduced} />,
    },
    {
      id: 'por-campo',
      label: labels.porCampo ?? 'Por campo',
      caption:
        labels.captionCampo ??
        'Spring usa reflexión para escribir directamente en el campo privado, saltándose los modificadores de acceso. El campo no puede ser final.',
      render: (reduced) => <FieldScene reduced={reduced} />,
    },
  ]

  return <ScenarioDiagram scenarios={scenarios} />
}
