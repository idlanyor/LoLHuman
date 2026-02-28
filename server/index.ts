import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { swaggerUI } from '@hono/swagger-ui'
import { readFileSync, existsSync } from 'node:fs'
import scraper from './routes/scraper'
import otakudesu from './routes/otakudesu'
import info from './routes/info'
import neonime from './routes/neonime'

const app = new Hono()

app.use('/*', cors())

// Swagger UI
app.get('/ui', swaggerUI({ url: '/doc' }))

// Serve Swagger YAML
app.get('/doc', (c) => {
  try {
    const yamlContent = readFileSync('./server/swagger.yaml', 'utf-8')
    return c.text(yamlContent)
  } catch (e) {
    return c.text('Failed to load swagger.yaml', 500)
  }
})

app.route('/api', info)
app.route('/api/scraper', scraper)
app.route('/api/otakudesu', otakudesu)
app.route('/api/neonime', neonime)

// Serve static files from dist folder
app.use('/assets/*', serveStatic({ 
  root: './',
  rewriteRequestPath: (path) => `./dist${path}`
}))
app.use('/vite.svg', serveStatic({ path: './dist/vite.svg' }))

// SPA Fallback: Serve index.html for any other route (like /docs)
app.get('/*', (c) => {
  const path = c.req.path
  
  // Specific check for API/Doc routes to avoid catching frontend /docs
  const isApiRoute = path.startsWith('/api/') || path === '/api';
  const isDocRoute = path.startsWith('/doc/') || path === '/doc';
  const isUiRoute = path.startsWith('/ui/') || path === '/ui';

  if (isApiRoute || isDocRoute || isUiRoute) {
    return c.json({ error: 'Not Found' }, 404)
  }
  
  try {
    const html = readFileSync('./dist/index.html', 'utf-8')
    return c.html(html)
  } catch (e) {
    return c.json({ message: 'Welcome to Kanata Scraper API (Frontend not built)' })
  }
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
