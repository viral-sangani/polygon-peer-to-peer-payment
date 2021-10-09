module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      inconsolata: ["'Inconsolata'", "monospace"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
