/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        google: {
          bg: '#050505',
          surface: '#0d0d0d',
          border: 'rgba(255, 95, 31, 0.15)',
          blue: '#FF5F1F',
          blueLight: '#FFA726',
          red: '#FF3D00',
          redLight: '#FF8A50',
          yellow: '#FF8F00',
          yellowLight: '#FFB300',
          green: '#FF5F1F',
          greenLight: '#FFA726',
        },
        cyber: {
          bg: '#050505',
          card: 'rgba(13, 13, 13, 0.85)',
          border: 'rgba(255, 95, 31, 0.15)',
          neonCyan: '#FF5F1F',
          neonPurple: '#FF3D00',
          neonPink: '#FF8F00',
          emerald: '#FF5F1F',
          gold: '#FF8F00',
        }
      },
      fontFamily: {
        sans: ['Google Sans', 'Roboto', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Google Sans', 'Roboto', 'sans-serif']
      },
      boxShadow: {
        'google-blue': '0 4px 25px rgba(255, 95, 31, 0.35)',
        'google-red': '0 4px 25px rgba(255, 61, 0, 0.35)',
        'google-card': '0 4px 24px rgba(0, 0, 0, 0.8)',
        'neon-cyan': '0 4px 25px rgba(255, 95, 31, 0.35)',
        'neon-purple': '0 4px 25px rgba(255, 61, 0, 0.35)',
        'neon-pink': '0 4px 25px rgba(255, 143, 0, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.7)'
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
