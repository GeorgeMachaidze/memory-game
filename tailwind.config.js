/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors:{
        background: "#152938",
        yellow: "#FDA214",
        gray: "#BCCED9",
        tGray:"#7191A5"
      }
    },
  },
  plugins: [],
}

