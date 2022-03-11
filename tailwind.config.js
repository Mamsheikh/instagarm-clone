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
      gridTemplateColumns: {
        // Simple 16 column grid
        img: 'repeat(auto-fill, minmax(100px, 1fr))',

        // Complex site-specific column configuration
        // 'footer': '200px minmax(900px, 1fr) 100px',
      },
    },
  },
  plugins: [require('daisyui'), require('tailwind-scrollbar')],
};
