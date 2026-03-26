/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom hacker green shades
        "hacker": {
          DEFAULT: "#00ff41",
          dim:     "#00cc33",
          dark:    "#003b00",
          glow:    "rgba(0,255,65,0.4)",
        },
      },
      fontFamily: {
        mono: ['"Courier New"', "Courier", "monospace"],
      },
      animation: {
        "scan":       "scanLine 2.5s linear infinite",
        "glow-pulse": "glowPulse 2.5s ease-in-out infinite",
        "flicker":    "flicker 0.1s infinite alternate",
      },
    },
  },
  plugins: [],
};