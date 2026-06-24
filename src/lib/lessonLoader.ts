import type { ComponentType } from 'react'
import type { MDXProps } from '../types/mdx'

export type MDXComponent = ComponentType<MDXProps>

// Eager: all MDX modules are loaded at bundle time.
// This avoids lazy-import timing issues with React Refresh's circular self-import.
const modules = import.meta.glob('../content/lessons/**/*.mdx', { eager: true }) as Record<
  string,
  { default: MDXComponent }
>

export function loadLesson(trackId: string, lessonId: string): MDXComponent | null {
  const key = Object.keys(modules).find(
    (k) => k.endsWith(`/${lessonId}.mdx`) && k.includes(`-${trackId}/`)
  )
  if (!key) return null
  const mod = modules[key]
  return typeof mod.default === 'function' ? mod.default : null
}
