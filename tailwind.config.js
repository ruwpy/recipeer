/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        'dscreen': '100dvh'
      }
    },
  },
  plugins: [],
}