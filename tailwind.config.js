/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Otras extensiones de plugins...
    ({ addUtilities }) => {
      const utilities = {
        '.vertical-lr': {
          writingMode: 'vertical-lr',
        },
      };

      addUtilities(utilities, ['responsive', 'hover']);
    },
  ],
}

