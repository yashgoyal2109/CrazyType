/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main_bg: "#323437",
        text_color: "#5f6164",
        heading_color: "#d1d0c5",
        number_color: "#e2b714",
        hover_bg: "#d1d0c5",
        dropdown_bg: "#2c2e31",
        hover_text: "#d1d0c5"
      },
      animation: {
        pulse: 'pulse 1.2s infinite',
      },
      keyframes: {
        pulse: {
          '0%': { transform: 'scale(1.2)', opacity: '0.2', },
          '50%': { transform: 'scale(1.2)', opacity: '0.7' },
          '100%': { transform: 'scale(1.2)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
