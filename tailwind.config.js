/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#eb2a4a',      // Liverpool Red
        'primary-dark': '#A00D25',  // Darker Red
        secondary: '#6A0DAD',    // Smino Purple
        accent: '#FDB827',       // Liverpool Gold
        background: '#1E1E24',   // Deep Charcoal
        surface: '#2A2A35',      // Slightly Lighter Background
        text: '#FFFFFF',         // White Text
        'text-secondary': '#98A2B3', // Muted Text
        success: '#FDB827',      // Liverpool Gold
        border: 'rgba(255, 255, 255, 0.08)', // Subtle Border
      },
    },
  },
  plugins: [],
};