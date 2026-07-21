import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Bảng màu ánh kim (champagne/vàng) — hợp mệnh Kim
        brand: {
          50: "#fbf6e6",
          100: "#f6ead0",
          200: "#eed9a8",
          300: "#e6ce93",
          400: "#dcc07a",
          500: "#c6a25c",
          600: "#a9843f",
          700: "#87672f",
          800: "#5f4a24",
          900: "#3f3119",
        },
        cta: {
          400: "#fbefcb",
          500: "#e6ce93",
          600: "#c6a25c",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
