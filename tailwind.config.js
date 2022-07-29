/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "th-bg": "var(--th-bg)",
        "th-text": "var(--th-text)",
        "th-hint": "var(--th-hint)",
        "th-hover": "var(--th-hover)",
        "th-active": "var(--th-active)",
        "th-correct": "var(--th-correct)",
        "th-error": "var(--th-error)",
      },
    },
  },
  plugins: [],
}
