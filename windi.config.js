import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: 'Work Sans, sans-serif',
    },
    colors: {
      blue: {
        DEFAULT: '#0071B6',
        75: '#0071B6bf',
        50: '#0071B680',
        25: '#0071B640',
      },
      orange: {
        DEFAULT: '#ff4800',
        75: '#ff4800bf',
        50: '#ff480080',
        25: '#ff480040',
      },
      yellow: {
        DEFAULT: '#ffb600',
        75: '#ffb600bf',
        50: '#ffb60080',
        25: '#ffb60040',
      },
      evergreen: {
        DEFAULT: '#31d0aa',
        75: '#31d0aabf',
        50: '#31d0aa80',
        25: '#31d0aa40',
      },
      onyx: '#0e0e2c',
      stale: {
        DEFAULT: '#4a4a68',
        light: '#8c8ca1',
      },
      dorian: '#ecf1f4',
      cloud: '#fafcfe',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '2rem',
      },
    },
  },
  plugins: [require('windicss/plugin/forms')],
})
