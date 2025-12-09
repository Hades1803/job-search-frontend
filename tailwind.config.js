/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mine-shaft': {
          '50': '#f6f6f6',
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#6d6d6d',
          '600': '#5d5d5d',
          '700': '#4f4f4f',
          '800': '#454545',
          '900': '#3d3d3d',
          '950': '#2d2d2d',
        },
        'bright-sun': {
          '50': '#fffbeb',
          '100': '#fff4c6',
          '200': '#ffe688',
          '300': '#ffd140',
          '400': '#ffc020',
          '500': '#f99d07',
          '600': '#dd7602',
          '700': '#b75206',
          '800': '#943e0c',
          '900': '#7a340d',
          '950': '#461a02',
        },
      }
    },
  },
  plugins: [],
}