/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // <--- THIS IS STEP 5
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "system-ui", "sans-serif"],
      },
      colors: {
        "naangle-bg": "#e0f2ff",
      },
      boxShadow: {
        card: "0 32px 80px rgba(15, 23, 42, 0.25)",
      },
    },
  },
  plugins: [],
};