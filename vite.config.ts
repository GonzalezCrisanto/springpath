import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import rehypeShiki from '@shikijs/rehype'

export default defineConfig({
  plugins: [
    tailwindcss(),
    {
      enforce: 'pre',
      ...mdx({
        jsxImportSource: 'react',
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          // @ts-ignore — tuple type mismatch between rehype plugin arrays and TS
          [rehypeShiki, { theme: 'github-dark' }],
        ],
      }),
    },
    react(),
  ],
})
