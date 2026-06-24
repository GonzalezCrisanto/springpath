import type { ComponentPropsWithoutRef } from 'react'

type CodeProps = ComponentPropsWithoutRef<'code'>
type PreProps = ComponentPropsWithoutRef<'pre'>
type AnchorProps = ComponentPropsWithoutRef<'a'>

function Code({ children, ...props }: CodeProps) {
  // Shiki block: children are spans (not plain text). Inline code is always a string.
  if (typeof children !== 'string') {
    return <code {...props}>{children}</code>
  }

  return (
    <code
      className="bg-elevated text-accent-soft px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  )
}

// Shiki injects className="shiki …" and style={} on <pre> — we strip both
// so our palette tokens apply instead of github-dark's hardcoded colors.
function Pre({ children }: PreProps) {
  return (
    <pre className="bg-code-bg rounded-lg border border-border overflow-x-auto my-4 p-4 text-sm font-mono leading-relaxed">
      {children}
    </pre>
  )
}

function Anchor({ children, ...props }: AnchorProps) {
  return (
    <a className="text-accent-soft hover:text-accent underline underline-offset-2" {...props}>
      {children}
    </a>
  )
}

export const mdxComponents = {
  h1: (props: ComponentPropsWithoutRef<'h1'>) => (
    <h1 className="text-2xl font-medium text-text-primary mt-8 mb-3" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<'h2'>) => (
    <h2 className="text-xl font-medium text-text-primary mt-6 mb-2" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <h3 className="text-base font-medium text-text-primary mt-4 mb-1" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p className="text-text-secondary leading-relaxed mb-4" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="list-disc list-inside text-text-secondary mb-4 space-y-1" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol className="list-decimal list-inside text-text-secondary mb-4 space-y-1" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<'li'>) => (
    <li className="text-text-secondary" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="text-text-primary font-medium" {...props} />
  ),
  code: Code,
  pre: Pre,
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="border-l-2 border-accent pl-4 text-text-muted italic my-4"
      {...props}
    />
  ),
  a: Anchor,
  hr: (props: ComponentPropsWithoutRef<'hr'>) => (
    <hr className="border-border my-6" {...props} />
  ),
}
