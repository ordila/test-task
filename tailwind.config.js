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
          DEFAULT: "#2563eb",
          dark: "#1d4ed8",
          light: "#3b82f6",
        },
        accent: "#f97316",
      },
      fontFamily: {
        display: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 30px -15px rgba(37, 99, 235, 0.35)",
      },
    },
  },
  plugins: [],
}

