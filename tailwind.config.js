/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'forest-green': '#2D5016',
        'terracotta': '#C4704B',
        'warm-white': '#FAF7F2',
        'cream': '#FFFBF5',
        'emerald': {
          900: '#0D3B2E'
        }
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Plus Jakarta Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
};
