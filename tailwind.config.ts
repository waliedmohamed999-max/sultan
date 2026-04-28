import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './data/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1a6b3c',
        primaryLight: '#2d8a52',
        accent: '#4caf50',
        surface: '#f5f5f0',
        sale: '#e53935'
      },
      fontFamily: {
        arabic: ['Cairo', 'Tajawal', 'Arial', 'sans-serif'],
        latin: ['Poppins', 'Montserrat', 'Arial', 'sans-serif']
      }
    }
  },
  plugins: []
}

export default config
