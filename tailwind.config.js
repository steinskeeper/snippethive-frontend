const colors = require("tailwindcss/colors");
module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
        paper: "#fffefc",
        lightblue: "#BFDAE4",
        lightgreen: '#AED6B',
        sanskrit: "#e6dfdb",
        graygray: "#424545",
      },
      fontFamily: {
        urban: ["Urbanist"],
      },
    },
  },
  variants: {
    extend: {},
    display: ["group-hover"],
  },
  plugins: [],
};
