import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Serves /api/contact-us and /api/order-now during `npm run dev` / `npm run preview`
// using the same mailer the Vercel functions use, with credentials from .env.
function localMailApi() {
  const routes = { '/api/contact-us': 'contact', '/api/order-now': 'order' }
  const attach = (server) => {
    server.middlewares.use(async (req, res, next) => {
      const kind = routes[req.url?.split('?')[0]]
      if (!kind || req.method !== 'POST') return next()
      let raw = ''
      for await (const chunk of req) raw += chunk
      let data = {}
      try {
        data = JSON.parse(raw || '{}')
      } catch {
        /* fall through with empty body */
      }
      const { runHandler } = await import('./server/mailer.js')
      const result = await runHandler(kind, data)
      res.statusCode = result.status
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(result.body))
    })
  }
  return { name: 'local-mail-api', configureServer: attach, configurePreviewServer: attach }
}

export default defineConfig(({ mode }) => {
  // Expose non-VITE_ vars (SMTP_*) to the dev middleware only — never to the client bundle.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))
  return {
    plugins: [react(), tailwindcss(), localMailApi()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  }
})
