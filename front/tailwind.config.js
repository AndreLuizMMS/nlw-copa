const { url } = require('inspector');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*tsx'],
  theme: {
    extend: {
      backgroundImage: {
        app: 'url(/app-bg.png)'
      },
      fontFamily: {
        sans: 'Roboto, sans-serif'
      },
      colors: {
        gray: {
          900: '#121214'
        }
      }
    }
  },
  plugins: []
};
