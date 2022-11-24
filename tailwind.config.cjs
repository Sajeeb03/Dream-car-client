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

          "secondary": "#253341",

          "base-100": "#F9F5FA",

          "info": "#8192DA",

          "success": "#32E284",

          "warning": "#EBC94C",

          "error": "#F96675",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
