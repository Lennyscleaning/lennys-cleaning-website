import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#2D5A3D',
          dark: '#1E3F2B',
          light: '#3A7350',
        },
        terra: {
          DEFAULT: '#C4704B',
          dark: '#A85C3A',
          hover: '#B86340',
          light: '#D4876A',
        },
        'warm-white': '#FDFAF6',
        cream: {
          DEFAULT: '#F5F0E8',
          dark: '#EDE6DA',
        },
        'gray-l': '#D4CFC7',
        'gray-m': '#8A8580',
        charcoal: {
          DEFAULT: '#2C2C2C',
          light: '#4A4A4A',
        },
        success: '#2D7A4F',
        error: '#C44B4B',
        warning: '#C4974B',
        info: '#4B7AC4',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Satoshi', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '24px',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(44, 44, 44, 0.06)',
        md: '0 4px 12px rgba(44, 44, 44, 0.08)',
        lg: '0 8px 30px rgba(44, 44, 44, 0.12)',
        hover: '0 8px 25px rgba(44, 44, 44, 0.15)',
      },
    },
  },
  plugins: [],
};

export default config;