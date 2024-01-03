/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // bg
        "p-light": "#ffffff",
        "s-light": "#f7f7f8",
        "p-dark": "#110f1a",
        "s-dark": "#1f1e24",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
