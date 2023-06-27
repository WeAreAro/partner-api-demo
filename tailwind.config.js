/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  theme: {
    colors: {
      primary: '#3b787b',
      ...colors
    }
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    })
  ],
}
