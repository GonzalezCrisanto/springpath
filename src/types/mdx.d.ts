import type { ComponentType } from 'react'

export interface MDXProps {
  components?: Record<string, ComponentType | ((props: Record<string, unknown>) => JSX.Element)>
  [key: string]: unknown
}

declare module '*.mdx' {
  const MDXContent: ComponentType<MDXProps>
  export default MDXContent
}
