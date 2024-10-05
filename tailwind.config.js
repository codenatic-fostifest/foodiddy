/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors : {
        primary : "#347948"
      },
      fontFamily: {
        'flux-black': ['AfacadFlux-Black', 'sans-serif'], 
        'flux-regular': ['AfacadFlux-Regular', 'sans-serif'], 
        'flux-semibold': ['AfacadFlux-SemiBold', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}

