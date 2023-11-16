/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        'r1': '10rem',
        'r2': '15rem',
        'r3': '20rem',
        'r4': '25rem',
        'r5': '30rem',
        'r6': '40rem',
        'r7': '50rem',
        'r8': '70rem',
      },
      keyframes: {
        'float': {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(5%)' },
        }
      },
      animation: {
        'float-mid': 'float 2s alternate infinite'
      }
    },
    colors: {
      'hero_dark': "#0F1B30",
      'hero_actions-dark': "#2F7BA5",
      'hero_highlight-dark': "#4AA2B2",
      'hero_dark-100': "#152745",
      'hero_text-dark': "#657695",
      'gray-100': "#666768"
    },
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    }
  },
  plugins: [],
}

