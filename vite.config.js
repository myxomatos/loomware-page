import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // DENUE_TOKEN no lleva prefijo VITE_ a propósito: nunca entra al bundle.
  const { DENUE_TOKEN = '' } = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    build: {
      rollupOptions: {
        input: {
          main: 'index.html',
          prospectar: 'prospectar.html',
          gracias: 'gracias.html',
          aviso: 'aviso-de-privacidad.html',
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
