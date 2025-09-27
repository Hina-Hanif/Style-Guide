/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          500: '#4B6EFF',
          600: '#3b5bdb',
          700: '#2d4ac7',
        },
        accent: {
          50: '#f0fdfc',
          100: '#ccfbf1',
          500: '#00C7B7',
          600: '#00b3a3',
          700: '#009f8f',
        },
        neutral: {
          50: '#FAFAFA',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
