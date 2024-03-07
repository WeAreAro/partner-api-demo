/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
    mode: 'jit',
    theme: {
        extend: {
            colors: {
                primary: '#3b787b',
            }
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
