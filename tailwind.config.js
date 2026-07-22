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
          bg: '#202124',
          surface: '#2d2e31',
          border: '#3c4043',
          blue: '#4285F4',
          blueLight: '#8ab4f8',
          red: '#EA4335',
          redLight: '#f28b82',
          yellow: '#FBBC04',
          yellowLight: '#fdd663',
          green: '#34A853',
          greenLight: '#81c995',
        },
        cyber: {
          bg: '#202124',
          card: 'rgba(45, 46, 49, 0.85)',
          border: 'rgba(255, 255, 255, 0.12)',
          neonCyan: '#4285F4',
          neonPurple: '#EA4335',
          neonPink: '#FBBC04',
          emerald: '#34A853',
          gold: '#FBBC04',
        }
      },
      fontFamily: {
        sans: ['Google Sans', 'Roboto', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Google Sans', 'Roboto', 'sans-serif']
      },
      boxShadow: {
        'google-blue': '0 4px 20px rgba(66, 133, 244, 0.35)',
        'google-red': '0 4px 20px rgba(234, 67, 53, 0.35)',
        'google-card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'neon-cyan': '0 4px 20px rgba(66, 133, 244, 0.35)',
        'neon-purple': '0 4px 20px rgba(234, 67, 53, 0.35)',
        'neon-pink': '0 4px 20px rgba(251, 188, 4, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.4)'
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
