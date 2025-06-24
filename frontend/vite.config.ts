import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Porta fixa para facilitar configuração do backend (WebConfig.java)
    strictPort: true, // Garante erro se a porta estiver ocupada
  },
})
