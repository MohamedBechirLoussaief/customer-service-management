/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  safelist: [
    'alert',
    'alert-success',
    'alert-error',
    'btn',
    'btn-secondary',
    'shadow-lg',
  ],
}

