import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        'forest-green': '#2D5016',
        'terracotta': '#C45D3E',
        'warm-white': '#FAF8F5',
        'charcoal': '#2C2C2C',
        'soft-gold': '#D4A84B'
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif']
      },
      spacing: {
        '18': '4.5rem',
        '112': '28rem',
        '128': '32rem'
      }
    }
  },
  plugins: []
};

export default config;
