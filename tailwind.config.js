/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: '#06032c',
        lightPurple: '#eadaff',
        teal: '#27a68e',
      },
    },
  },
  plugins: [],
};
