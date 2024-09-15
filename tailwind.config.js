// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Utiliser Poppins comme police principale
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow": {
          "text-shadow": "1px 1px 4px rgba(0, 0, 0, 0.4)",
        },
        ".text-shadow-md": {
          "text-shadow": "4px 4px 6px rgba(0, 0, 0, 0.4)",
        },
        ".text-shadow-lg": {
          "text-shadow": "6px 6px 8px rgba(0, 0, 0, 0.6)",
        },
        ".text-shadow-none": {
          "text-shadow": "none",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
