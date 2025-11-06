import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF8C00',
          light: '#FFD700',
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#000000',
        }
      },
      borderRadius: {
        card: '12px',
        button: '20px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.08)',
      }
    }
  },
  plugins: [],
} satisfies Config
