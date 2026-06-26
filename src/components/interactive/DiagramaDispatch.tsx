import { motion } from 'framer-motion'
import { ScenarioDiagram, type Scenario } from './ScenarioDiagram'

interface SceneProps { reduced: boolean }

function SinSpringScene({ reduced }: SceneProps) {
  const routes = [
    { method: 'GET', path: '/products' },
    { method: 'POST', path: '/products' },
    { method: 'GET', path: '/products/{id}' },
  ]

  return (
    <div className="flex flex-col items-center gap-2 py-2 w-full max-w-xs mx-auto">
      <motion.div
        className="border border-border bg-surface rounded px-3 py-2 text-center w-full"
        initial={reduced ? false : { opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? { duration: 0 } : { duration: 0.2 }}
      >
        <span className="text-xs text-text-muted font-mono">HttpServlet.doGet() / doPost()</span>
      </motion.div>

      <motion.div
        className="text-text-muted/40"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? { duration: 0 } : { delay: 0.2 }}
      >↓</motion.div>

      <motion.div
        className="border-2 border-dashed border-[#6b3a3a] bg-[#3a1515] rounded-xl p-3 w-full"
        initial={reduced ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={reduced ? { duration: 0 } : { delay: 0.3, duration: 0.25 }}
      >
        <span className="text-xs text-[#e57373] block mb-2 font-medium">ruteo manual</span>
        {routes.map((r, i) => (
          <motion.div
            key={r.path + r.method}
            className="text-xs font-mono text-[#e57373]/70 py-0.5"
            initial={reduced ? false : { opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={reduced ? { duration: 0 } : { delay: 0.4 + i * 0.1 }}
          >
            if ({r.method} &amp;&amp; path.equals("{r.path}")) …
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

function ConSpringScene({ reduced }: SceneProps) {
  const steps = [
    { label: 'HTTP Request', sub: 'GET /products/42', color: 'border-border bg-surface' },
    { label: 'DispatcherServlet', sub: 'front controller', color: 'border-border bg-elevated' },
    { label: 'HandlerMapping', sub: 'resuelve → ProductController.getById()', color: 'border-[var(--accent)] bg-[var(--accent-bg)]' },
    { label: 'Respuesta JSON', sub: '{ "id": 42, "name": "…" }', color: 'border-[var(--accent)] bg-[var(--accent-bg)]' },
  ]

  return (
    <div className="flex flex-col items-center gap-1.5 py-2 w-full max-w-xs mx-auto">
      {steps.map((step, i) => (
        <div key={step.label} className="w-full flex flex-col items-center gap-1">
          <motion.div
            className={`border ${step.color} rounded-lg px-3 py-2 w-full`}
            initial={reduced ? false : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : { delay: i * 0.15, duration: 0.25 }}
          >
            <span className="text-xs font-medium text-text-secondary block">{step.label}</span>
            <span className="text-xs text-text-muted font-mono">{step.sub}</span>
          </motion.div>
          {i < steps.length - 1 && (
            <motion.span
              className="text-accent/60 text-sm"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={reduced ? { duration: 0 } : { delay: i * 0.15 + 0.1 }}
            >↓</motion.span>
          )}
        </div>
      ))}
    </div>
  )
}

export function DiagramaDispatch() {
  const scenarios: Scenario[] = [
    {
      id: 'sin-spring',
      label: 'Sin Spring MVC',
      caption:
        'Ruteo manual: un servlet gigante con if/else por cada combinación de método + path. Frágil y difícil de mantener.',
      render: (reduced) => <SinSpringScene reduced={reduced} />,
    },
    {
      id: 'con-spring',
      label: 'Con @RestController',
      caption:
        'DispatcherServlet recibe todos los requests y delega al método correcto según la anotación — sin un solo if.',
      render: (reduced) => <ConSpringScene reduced={reduced} />,
    },
  ]

  return <ScenarioDiagram scenarios={scenarios} />
}
