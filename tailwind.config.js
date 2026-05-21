/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#061928",
        ink: "#132233",
        cream: "#fff4df",
        paper: "#f7ead1",
        gold: "#f7b72d",
        orange: "#e87922",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 45px rgba(6, 25, 40, 0.16)",
      },
      typography: ({ theme }) => ({
        navy: {
          css: {
            "--tw-prose-body": theme("colors.navy"),
            "--tw-prose-headings": theme("colors.navy"),
            "--tw-prose-links": theme("colors.orange"),
            "--tw-prose-bold": theme("colors.navy"),
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
