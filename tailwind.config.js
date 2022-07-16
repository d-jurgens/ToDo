/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        success: "#059669",
        error: "#e11d48",
        warning: "#f59e0b",
        primary: "#8b5cf6",
        "primary-lighter": "#c4b5fd",
        "primary-darker": "#7c3aed",
        "dark-gray": "#334155",
        "medium-gray": "#64748b",
        "light-gray": "#cbd5e1",
        "lightest-gray": "#f1f5f9",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
