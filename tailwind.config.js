/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "theme-bg": "var(--bg-color)",
        "theme-text": "var(--text-color)",
        "theme-hover": "var(--hover-color)",
        "theme-hint": "var(--hint-color)",
      },
    },
  },
  plugins: [],
}
