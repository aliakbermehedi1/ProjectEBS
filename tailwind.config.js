/** @type {import('tailwindcss').Config} */

// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure this is present
  ],
  darkMode: "class", // This enables class-based dark mode
  theme: {
    extend: {},
  },
  plugins: [],
};
