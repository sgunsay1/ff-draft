/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "row-tier-1": "#fee2e2",
        "row-tier-1-hover": "#fecaca",
        "row-tier-2": "#ffedd5",
        "row-tier-2-hover": "#fed7aa",
        "row-tier-3": "#fef9c3",
        "row-tier-3-hover": "#fef08a",
        "row-tier-4": "#ecfccb",
        "row-tier-4-hover": "#d9f99d",
        "row-tier-5": "#dcfce7",
        "row-tier-5-hover": "#bbf7d0",
        "row-tier-6": "#cffafe",
        "row-tier-6-hover": "#a5f3fc",
        "row-tier-7": "#dbeafe",
        "row-tier-7-hover": "#bfdbfe",
        "row-tier-8": "#ede9fe",
        "row-tier-8-hover": "#ddd6fe",
        "row-tier-9": "#f5d0fe",
        "row-tier-9-hover": "#f0abfc",
        "row-tier-10": "#fecdd3",
        "row-tier-10-hover": "#fda4af",
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: ["light"],
  },
};
