/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: '#1C88EC',
        primary_light: '#E5F1FF',
        primary_hover: '#205EAC',
        secondary: '#08172B',
        accent: '#A6A6A6',
        accent_light: '#F5FAFF',
        neutral: '#EAF1FB',
        disabled: '#C8D1DA'
      },
    },
  },
  plugins: [],
}