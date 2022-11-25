/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#007782",

          "secondary": "#0D0E0D",

          "base-100": "#F9F5FA",

          "info": "#05ffea",

          "success": "#32E284",

          "warning": "#EBC94C",

          "error": "#F96675",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
