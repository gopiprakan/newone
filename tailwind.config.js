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
        ivory: '#F7F5F1',
        charcoal: {
          DEFAULT: '#111820',
          muted: 'rgba(17, 24, 32, 0.7)',
          light: 'rgba(17, 24, 32, 0.5)',
        },
        vibrant: {
          orange: '#FF5722',
        },
        soft: {
          orange: '#FF8A50',
        },
        warmgrey: {
          DEFAULT: '#E9E5DE',
          light: '#F2EFEB',
        },
        // Backward compatibility mappings strictly aligned to the 6 palette colors
        google: {
          bg: '#F7F5F1',
          surface: '#FFFFFF',
          border: '#E9E5DE',
          blue: '#FF5722',
          blueLight: '#FF8A50',
          red: '#FF5722',
          redLight: '#FF8A50',
          yellow: '#FF8A50',
          yellowLight: '#FF8A50',
          green: '#FF5722',
          greenLight: '#FF8A50',
        },
        cyber: {
          bg: '#F7F5F1',
          card: '#FFFFFF',
          border: '#E9E5DE',
          neonCyan: '#FF5722',
          neonPurple: '#FF5722',
          neonPink: '#FF8A50',
          emerald: '#FF5722',
          gold: '#FF8A50',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Google Sans', 'Roboto', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Google Sans', 'Inter', 'Roboto', 'sans-serif']
      },
      boxShadow: {
        'card': '0 2px 8px 0 rgba(17, 24, 32, 0.04), 0 1px 2px 0 rgba(17, 24, 32, 0.02)',
        'card-hover': '0 12px 28px -4px rgba(17, 24, 32, 0.08), 0 4px 12px -2px rgba(255, 87, 34, 0.08)',
        'google-blue': '0 4px 16px rgba(255, 87, 34, 0.2)',
        'google-red': '0 4px 16px rgba(255, 87, 34, 0.2)',
        'google-card': '0 2px 12px rgba(17, 24, 32, 0.06)',
        'orange-glow': '0 4px 20px rgba(255, 87, 34, 0.25)',
        'glass': '0 8px 24px 0 rgba(17, 24, 32, 0.04)'
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
