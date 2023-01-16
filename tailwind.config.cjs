const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./src/*.js", "./test/*.{html,js}"],
  theme: {
      colors: {
        gray: colors.zinc,
        primary: colors.lime,
        secondary: colors.sky,
        current: 'currentColor',
        transparent: 'transparent',
        red: colors.red,
      }
  },
  plugins: [],
}

