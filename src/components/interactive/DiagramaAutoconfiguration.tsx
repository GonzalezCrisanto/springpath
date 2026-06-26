import { motion } from 'framer-motion'
import { ScenarioDiagram, type Scenario } from './ScenarioDiagram'

interface SceneProps { reduced: boolean }

function FlowStep({
  label,
  sublabel,
  delay,
  reduced,
}: {
  label: string
  sublabel?: string
  delay: number
  reduced: boolean
}) {
  return (
    <motion.div
      className="border border-border bg-elevated rounded-lg px-4 py-2 text-center w-full"
      initial={reduced ? false : { opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduced ? { duration: 0 } : { duration: 0.25, delay }}
    >
      {sublabel && (
        <span className="text-xs text-text-muted block mb-0.5">{sublabel}</span>
      )}
      <span className="text-xs font-medium text-text-secondary">{label}</span>
    </motion.div>
  )
}

function Arrow({
  delay,
  reduced,
  dashed = false,
}: {
  delay: number
  reduced: boolean
  dashed?: boolean
}) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      {dashed ? (
        <motion.div
          className="w-0.5 h-7 border-l-2 border-dashed border-text-muted/40"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduced ? { duration: 0 } : { duration: 0.2, delay }}
        />
      ) : (
        <div className="relative w-0.5 h-7 bg-border/60 rounded overflow-hidden">
          <motion.div
            className="absolute inset-x-0 top-0 bg-text-muted/50 rounded"
            style={{ transformOrigin: 'top' }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={reduced ? { duration: 0 } : { duration: 0.2, delay, ease: 'easeOut' }}
          />
        </div>
      )}
      <motion.span
        className="text-text-muted/60 text-sm leading-none"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? { duration: 0 } : { delay: delay + 0.15 }}
      >↓</motion.span>
    </div>
  )
}

function SpringAutoconfiguraScene({ reduced }: SceneProps) {
  return (
    <div className="flex flex-col items-center gap-2 py-2 w-full max-w-xs mx-auto">
      <FlowStep label="spring-boot-starter-data-jpa" sublabel="en pom.xml" delay={0} reduced={reduced} />
      <Arrow delay={0.2} reduced={reduced} />
      <FlowStep label="HikariCP + Hibernate en classpath" sublabel="starter lo pone disponible" delay={0.35} reduced={reduced} />
      <Arrow delay={0.55} reduced={reduced} />
      <FlowStep label="@ConditionalOnClass ✓" sublabel="DataSource.class detectada" delay={0.7} reduced={reduced} />
      <Arrow delay={0.9} reduced={reduced} />
      <FlowStep label="@ConditionalOnMissingBean → sin bean propio" sublabel="ningún DataSource definido" delay={1.05} reduced={reduced} />
      <Arrow delay={1.25} reduced={reduced} />
      <FlowStep label="DataSource creado automáticamente" sublabel="resultado" delay={1.4} reduced={reduced} />
    </div>
  )
}

function VosDefinisScene({ reduced }: SceneProps) {
  return (
    <div className="flex flex-col items-center gap-2 py-2 w-full max-w-xs mx-auto">
      <FlowStep label="spring-boot-starter-data-jpa" sublabel="en pom.xml" delay={0} reduced={reduced} />
      <Arrow delay={0.2} reduced={reduced} />
      <FlowStep label="HikariCP + Hibernate en classpath" sublabel="starter lo pone disponible" delay={0.35} reduced={reduced} />
      <Arrow delay={0.55} reduced={reduced} />
      <FlowStep label="@ConditionalOnClass ✓" sublabel="DataSource.class detectada" delay={0.7} reduced={reduced} />
      <Arrow delay={0.9} reduced={reduced} />
      <FlowStep label="@ConditionalOnMissingBean → bean propio encontrado" sublabel="tu DataSource ya existe en el contexto" delay={1.05} reduced={reduced} />
      <Arrow delay={1.25} reduced={reduced} dashed />
      <FlowStep label="Autoconfiguration omitida — se usa el tuyo" sublabel="resultado" delay={1.4} reduced={reduced} />
    </div>
  )
}

export function DiagramaAutoconfiguration() {
  const scenarios: Scenario[] = [
    {
      id: 'spring-autoconfigura',
      label: 'Spring autoconfigura',
      caption:
        'No hay ningún bean del tipo requerido definido en tu código. Spring pasa todas las condiciones y crea el bean automáticamente.',
      render: (reduced) => <SpringAutoconfiguraScene reduced={reduced} />,
    },
    {
      id: 'vos-definís',
      label: 'Vos definís el bean',
      caption:
        'Ya existe un bean del mismo tipo en el contexto. @ConditionalOnMissingBean lo detecta y la autoconfiguration no hace nada — prevalece el tuyo.',
      render: (reduced) => <VosDefinisScene reduced={reduced} />,
    },
  ]

  return <ScenarioDiagram scenarios={scenarios} />
}
