import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'
import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), WindiCSS()],
  optimizeDeps: {
    entries: ['react', 'react-dom', 'react-router-dom', 'react-leaflet'],
  },
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, '/src'),
    },
  },
})
