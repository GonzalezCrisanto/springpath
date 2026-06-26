import { motion } from 'framer-motion'
import { ScenarioDiagram, type Scenario } from './ScenarioDiagram'

interface DiagramaIoCProps {
  labels?: {
    sinIoC?: string
    conIoC?: string
    captionSinIoC?: string
    captionConIoC?: string
  }
}

function SinIoCScene({ reduced }: { reduced: boolean }) {
  return (
    <div className="flex justify-center py-2">
      <div className="border-2 border-red-500/50 bg-red-500/5 rounded-xl p-5 w-full max-w-xs">
        <span className="text-xs font-medium text-red-400 uppercase tracking-wide">
          OrderService
        </span>

        {/* Dependencia atrapada adentro */}
        <motion.div
          className="mt-4 border border-red-500/40 bg-red-500/10 rounded-lg p-3"
          initial={reduced ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
        >
          <span className="text-xs font-medium text-red-400">StripePaymentGateway</span>
          <p className="text-xs text-red-400/60 mt-1 font-mono">= new StripePaymentGateway()</p>
        </motion.div>

        <p className="mt-4 text-xs text-red-400/50 text-center">
          ⚠ acoplado — no puede cambiarse desde afuera
        </p>
      </div>
    </div>
  )
}

function ConIoCScene({ reduced }: { reduced: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2 py-2 w-full max-w-xs mx-auto">
      {/* ApplicationContext */}
      <div className="border border-border bg-elevated rounded-xl p-4 text-center w-full">
        <span className="text-xs font-medium text-text-muted uppercase tracking-wide block mb-3">
          ApplicationContext
        </span>
        <div className="border border-border rounded-lg px-3 py-2">
          <span className="text-xs text-text-secondary">StripePaymentGateway</span>
        </div>
      </div>

      {/* Flecha vertical animada */}
      <div className="flex flex-col items-center gap-0.5">
        <div className="relative w-0.5 h-7 bg-border/40 rounded overflow-hidden">
          <motion.div
            className="absolute inset-x-0 top-0 bg-accent rounded"
            style={{ transformOrigin: 'top' }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={reduced ? { duration: 0 } : { duration: 0.35, delay: 0.1, ease: 'easeOut' }}
          />
        </div>
        <motion.span
          className="text-accent-soft text-sm leading-none"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduced ? { duration: 0 } : { delay: 0.38 }}
        >
          ↓
        </motion.span>
      </div>

      {/* OrderService */}
      <div className="border-2 border-accent/60 bg-accent-bg rounded-xl p-4 w-full">
        <span className="text-xs font-medium text-accent-soft uppercase tracking-wide block mb-3">
          OrderService
        </span>
        <motion.div
          className="border border-accent/40 bg-elevated rounded-lg px-3 py-2"
          initial={reduced ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? { duration: 0 } : { duration: 0.3, delay: 0.45 }}
        >
          <span className="text-xs text-accent-soft">PaymentGateway ✓</span>
        </motion.div>
      </div>
    </div>
  )
}

export function DiagramaIoC({ labels = {} }: DiagramaIoCProps) {
  const scenarios: [Scenario, Scenario] = [
    {
      id: 'sin-ioc',
      label: labels.sinIoC ?? 'Sin IoC',
      caption:
        labels.captionSinIoC ??
        'El servicio crea su propia dependencia: queda acoplado a Stripe para siempre. Si el día de mañana cambia el gateway, hay que modificar el servicio.',
      render: (reduced) => <SinIoCScene reduced={reduced} />,
    },
    {
      id: 'con-ioc',
      label: labels.conIoC ?? 'Con IoC',
      caption:
        labels.captionConIoC ??
        'El ApplicationContext crea el gateway y se lo entrega desde afuera. El servicio solo lo recibe: no sabe ni le importa quién lo implementa.',
      render: (reduced) => <ConIoCScene reduced={reduced} />,
    },
  ]

  return <ScenarioDiagram scenarios={scenarios} />
}
