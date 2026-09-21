import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { readdirSync } from 'node:fs'

// Una entrada por cada servicios/<slug>.html que genera scripts/generar-servicios.js
const paginasDe = (carpeta) =>
  Object.fromEntries(
    readdirSync(carpeta)
      .filter((f) => f.endsWith('.html'))
      .map((f) => [carpeta + '/' + f.replace('.html', ''), carpeta + '/' + f]),
  )
const servicios = { ...paginasDe('servicios'), ...paginasDe('industrias') }

export default defineConfig(({ mode }) => {
  // DENUE_TOKEN no lleva prefijo VITE_ a propósito: nunca entra al bundle.
  const { DENUE_TOKEN = '', VITE_GA_ID = '', VITE_GSC_VERIFICATION = '' } = loadEnv(mode, process.cwd(), '')

  // Google Analytics 4 y verificación de Search Console, sólo si hay ID.
  // Van en el HTML estático de todas las páginas; sin ID no se inyecta nada.
  const analitica = {
    name: 'loomware-analitica',
    transformIndexHtml() {
      const tags = []
      if (VITE_GSC_VERIFICATION) {
        tags.push({ tag: 'meta', attrs: { name: 'google-site-verification', content: VITE_GSC_VERIFICATION }, injectTo: 'head' })
      }
      if (VITE_GA_ID) {
        tags.push({ tag: 'script', attrs: { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${VITE_GA_ID}` }, injectTo: 'head' })
        tags.push({
          tag: 'script',
          children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${VITE_GA_ID}');`,
          injectTo: 'head',
        })
      }
      return tags
    },
  }

  return {
    plugins: [react(), analitica],
    build: {
      rollupOptions: {
        input: {
          main: 'index.html',
          prospectar: 'prospectar.html',
          gracias: 'gracias.html',
          aviso: 'aviso-de-privacidad.html',
          ...servicios,
        },
      },
    },
    server: {
      // Expuesto en la red local para probar desde un celular en el mismo Wi-Fi.
      host: true,
      // En desarrollo hace lo mismo que functions/api/denue: reenvía al INEGI
      // agregando el token del .env. En producción lo hace la Pages Function.
      proxy: {
        '/api/denue': {
          target: 'https://www.inegi.org.mx',
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(/^\/api\/denue/, '/app/api/denue/v1/consulta') + '/' + DENUE_TOKEN,
        },
      },
    },
  }
})
