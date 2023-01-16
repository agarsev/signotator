const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./src/*.js", "./test/*.{html,js}"],
  theme: {
      colors: {
        gray: colors.zinc,
        signotatormain: colors.lime,
        signotatorbtns: colors.sky,
        current: 'currentColor',
        transparent: 'transparent',
        signotatorbg: colors.sky[50],
        red: colors.red,
      }
  },
  plugins: [],
}

