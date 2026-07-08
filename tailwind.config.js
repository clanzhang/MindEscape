/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sage': '#8B9E8B',
        'cream': '#F5F0E8',
        'sunset': '#E8956A',
        'warm-white': '#FAFAF7',
        'deep-gray': '#2D2D2D',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'Georgia', 'serif'],
        'dm': ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 24px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
      },
    },
  },
  plugins: [],
}
