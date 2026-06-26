import { motion } from 'framer-motion'
import { ScenarioDiagram, type Scenario } from './ScenarioDiagram'

interface SceneProps { reduced: boolean }

function SinJPAScene({ reduced }: SceneProps) {
  const lines = [
    'String sql = "SELECT * FROM products WHERE id = ?";',
    'PreparedStatement ps = conn.prepareStatement(sql);',
    'ps.setLong(1, id);',
    'ResultSet rs = ps.executeQuery();',
    'if (rs.next()) {',
    '  product.setName(rs.getString("name"));',
    '  product.setPrice(rs.getBigDecimal("price"));',
    '}',
  ]

  return (
    <div className="flex flex-col gap-2 py-2 w-full max-w-sm mx-auto">
      <motion.div
        className="border-2 border-dashed border-[#6b3a3a] bg-[#3a1515] rounded-xl p-3 w-full"
        initial={reduced ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={reduced ? { duration: 0 } : { duration: 0.25 }}
      >
        <span className="text-xs text-[#e57373] block mb-2 font-medium">JDBC manual</span>
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className="text-[10px] font-mono text-[#e57373]/70 leading-relaxed truncate"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={reduced ? { duration: 0 } : { delay: 0.1 + i * 0.06 }}
          >
            {line}
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="border border-[#6b3a3a] bg-[#3a1515] rounded px-3 py-1.5 text-center"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? { duration: 0 } : { delay: 0.7 }}
      >
        <span className="text-xs text-[#e57373]">boilerplate repetido en cada consulta</span>
      </motion.div>
    </div>
  )
}

function ConJPAScene({ reduced }: SceneProps) {
  const methods = [
    'findById(Long id)',
    'findByEmail(String email)',
    'findByCategoryAndPriceGreaterThan(...)',
    'save(Product product)',
    'deleteById(Long id)',
  ]

  return (
    <div className="flex flex-col items-center gap-2 py-2 w-full">
      <motion.div
        className="border border-[var(--accent)] bg-[var(--accent-bg)] rounded-xl p-3 w-full"
        initial={reduced ? false : { opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? { duration: 0 } : { duration: 0.25 }}
      >
        <span className="text-xs font-medium text-accent-soft block mb-2">
          ProductRepository <span className="font-normal text-text-muted">extends JpaRepository</span>
        </span>
        {methods.map((m, i) => (
          <motion.div
            key={m}
            className="text-[10px] font-mono text-accent-soft/80 py-0.5 border-b border-border/40 last:border-0 truncate"
            initial={reduced ? false : { opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={reduced ? { duration: 0 } : { delay: 0.2 + i * 0.1 }}
          >
            {m}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="text-accent/60 text-sm flex flex-col items-center gap-0"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? { duration: 0 } : { delay: 0.8 }}
      >
        <span className="text-xs text-text-muted/60">Spring genera la implementación</span>
        <span>↓</span>
      </motion.div>

      <motion.div
        className="border border-border bg-elevated rounded-lg px-3 py-2 w-full text-center"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? { duration: 0 } : { delay: 0.95, duration: 0.2 }}
      >
        <span className="text-xs text-text-muted font-mono">SQL generado automáticamente</span>
      </motion.div>
    </div>
  )
}

export function DiagramaJPA() {
  const scenarios = [
    {
      id: 'sin-jpa',
      label: 'JDBC manual',
      caption: 'Cada consulta requiere abrir conexión, escribir SQL, parsear el ResultSet y manejar excepciones. El mismo boilerplate repetido decenas de veces.',
      render: (reduced: boolean) => <SinJPAScene reduced={reduced} />,
    },
    {
      id: 'con-jpa',
      label: 'Spring Data JPA',
      caption: 'Declarás una interfaz con los métodos que necesitás. Spring genera la implementación completa en runtime — sin una línea de SQL ni un ResultSet.',
      render: (reduced: boolean) => <ConJPAScene reduced={reduced} />,
    },
  ]

  return <ScenarioDiagram scenarios={scenarios} />
}
