/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      bp1: { max: '640px' },
      bp2: { max: '817px' },
      bp3: { max: '980px' },
    },
    extend: {
      colors: {
        darkBlue: '#0074CC',
        theme1: '#FBE353',
        theme2: '#1A1A1A',
        theme3: '#5A5A5A',
        theme4: '#F2F2F2',
        mainyellow: '#FBE353',
        mainblack: '#1A1A1A',
        maindarkgray: '#5A5A5A',
        maingray: '#F2F2F2',
      },
    },
  },
  plugins: [],
};
