// tailwind.config.js
export default {
  content: ["./app/**/*.{js,jsx,ts,tsx,html}"],

  theme: {
    extend: {
      colors: {
        "primary-blue": "var(--primary-blue)",
      },
    },
  },
  plugins: [],
};
