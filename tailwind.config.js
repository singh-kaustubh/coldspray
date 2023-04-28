const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          50: "#fdf8f6",
          100: "#f2e8e5",
          200: "#eaddd7",
          300: "#e0cec7",
          400: "#d2bab0",
          500: "#bfa094",
          600: "#a18072",
          700: "#977669",
          800: "#846358",
          900: "#43302b",
        },
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        midnight: "#121063",
        pink: colors.pink,
        metal: "#565584",
        tahiti: "#3ab7bf",
        silver: "#ecebff",
        "bubble-gum": "#ff77e9",
        bermuda: "#78dcca",
        black: colors.black,
        white: colors.white,
        footer: "#1B1212",
        yellow: "#ffeb3b",
        purple: "#3f3cbb",
        blue: colors.blue,
      },
    },
  },
  variants: {
    display: ["responsive", "dropdown"],
  },
  plugins: [require("tailwindcss-dropdown")],
};
