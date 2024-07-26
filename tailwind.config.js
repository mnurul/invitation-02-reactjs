/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        "soft-white": "rgba(255,255,255,0.8)",
        "soft-white-1": "#ced3c5",
        "soft-green": "#606060",
        "dark-green": "#8e9775",
        "dark-green-1": "#4a503d",
        "dark-green-disabled": "#7a8363",
        "dark-green-1-disabled": "#353a2c",
      },
    },
  },
  plugins: [],
};
