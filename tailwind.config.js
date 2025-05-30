/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        primary: {
          DEFAULT: "#3b82f6", // blue-500
          dark: "#60a5fa", // blue-400
        },
        secondary: {
          DEFAULT: "#8b5cf6", // violet-500
          dark: "#a78bfa", // violet-400
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
