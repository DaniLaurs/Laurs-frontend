/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#7C3AED",
        primaryHover: "#6D28D9",

        secondary: "#F3E8FF",
        secondaryHover: "#E9D5FF",

        success: "#10B981",
        successHover: "#059669",

        danger: "#EF4444",
        dangerHover: "#DC2626",

        warning: "#F59E0B",

        background: "#F8FAFC",
        surface: "#FFFFFF",

        text: "#111827",
        textLight: "#6B7280",

        border: "#E5E7EB",
      },

      boxShadow: {
        primary: "0 0 30px rgba(124,58,237,.35)",
      },

      borderRadius: {
        card: "1.5rem",
      },
    },
  },

  plugins: [],
};