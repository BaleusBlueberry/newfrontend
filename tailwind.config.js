import("tailwindcss").Config;

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--backround))",
      },
    },
  },
  plugins: [require("daisyui")],
  "editor.quickSuggestions": {
    strings: true,
  },
};
