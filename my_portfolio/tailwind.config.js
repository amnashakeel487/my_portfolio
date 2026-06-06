/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#7c3aed',
        'purple-text': '#a78bfa',
        'purple-light': '#c4b5fd',
        muted: '#6b5f8a',
        available: '#34d399',
        'bg-main': '#07051a',
        'card-surface': '#0f0c22',
        'navbar-bg': 'rgba(10,7,28,0.85)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #7c3aed, #a855f7)',
        'gradient-subtitle': 'linear-gradient(135deg, #7c3aed, #ec4899)',
      },
      borderRadius: {
        card: '16px',
      },
    },
  },
  plugins: [],
}
