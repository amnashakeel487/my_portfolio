/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#8a2ce2',
        secondary: '#d43f8d',
        'accent-pink': '#f472b6',
        'background-light': '#f7f6f8',
        'background-dark': '#191121',
        'surface-dark': '#251a30',
        'card-dark': '#1a1426',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
}
