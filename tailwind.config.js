module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'black-rgba': 'rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [require('daisyui'), require('tailwind-scrollbar')],
};
