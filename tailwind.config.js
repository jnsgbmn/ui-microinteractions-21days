// tailwind.config.js
module.exports = {
  darkMode: "class", // Enables dark mode via class (e.g., <html class="dark">)
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}", // Include all relevant files for purging
  ],
  theme: {
    extend: {
      // You can extend Tailwind's default theme here
      colors: {
        // Example: custom colors
        "black-100": "rgba(0, 0, 0, 0.1)",
      },
      fontFamily: {
        // Example: custom font family
        display: ["Basement", "sans-serif"],
      },
    },
  },
  plugins: [
    // Add Tailwind plugins here, e.g., require('@tailwindcss/forms')
  ],
};
