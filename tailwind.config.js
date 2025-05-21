/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0066cc",
        "primary-dark": "#0052a3",
        secondary: "#f3f4f6",
        accent: "#4f46e5",
        "dark-bg": "#121212",
        "dark-card": "#1e1e1e",
        "dark-border": "#333333",
        "dark-text": "#e0e0e0",
        "dark-text-muted": "#a0a0a0",
      },
    },
  },
  plugins: [],
};
