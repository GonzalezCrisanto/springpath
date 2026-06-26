import { useState } from 'react'

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation?: string
}

interface QuizProps {
  questions: QuizQuestion[]
}

interface QuestionState {
  selected: number | null
}

export function Quiz({ questions }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [states, setStates] = useState<QuestionState[]>(() =>
    questions.map(() => ({ selected: null })),
  )

  const current = questions[currentIndex]
  const state = states[currentIndex]
  const answered = state.selected !== null
  const total = questions.length

  function handleSelect(optionIndex: number) {
    if (answered) return
    setStates((prev) => {
      const next = [...prev]
      next[currentIndex] = { selected: optionIndex }
      return next
    })
  }

  function optionClass(optionIndex: number): string {
    const base =
      'w-full text-left px-4 py-2 rounded border transition-colors mb-2 text-sm'

    if (!answered) {
      return `${base} border-border text-text-secondary hover:border-accent hover:text-text-primary`
    }

    if (optionIndex === current.correctIndex) {
      return `${base} border-accent bg-accent-bg text-accent-soft`
    }

    if (optionIndex === state.selected) {
      return `${base} border-red-500/50 bg-red-500/10 text-red-400`
    }

    return `${base} border-border text-text-muted opacity-60`
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-6 my-6">
      <p className="text-text-muted text-sm mb-2">
        Pregunta {currentIndex + 1} de {total}
      </p>

      <p className="text-text-primary font-medium mb-4">{current.question}</p>

      <div>
        {current.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={answered}
            className={optionClass(i)}
          >
            {option}
          </button>
        ))}
      </div>

      {answered && current.explanation && (
        <p className="mt-3 text-sm text-text-muted italic">{current.explanation}</p>
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentIndex((i) => i - 1)}
          disabled={currentIndex === 0}
          className="px-4 py-1.5 rounded text-sm font-medium text-text-muted hover:text-text-primary border border-border hover:border-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← Anterior
        </button>
        <button
          onClick={() => setCurrentIndex((i) => i + 1)}
          disabled={currentIndex === total - 1}
          className="px-4 py-1.5 rounded text-sm font-medium text-text-muted hover:text-text-primary border border-border hover:border-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Siguiente →
        </button>
      </div>
    </div>
  )
}
