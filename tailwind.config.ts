import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        cream: '#faf7f2',
        ink: '#2d1b12',
        muted: '#7a6a5f',
        primary: {
          DEFAULT: '#c1272d',
          dark: '#9e1f24',
          light: '#e63946'
        },
        accent: '#f4a259',
        surface: '#ffffff',
        border: '#e8dfd3'
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
} satisfies Config;
