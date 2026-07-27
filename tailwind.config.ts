import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Verde eléctrico sobre negro
        brand: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d"
        },
        ink: {
          50: "#0b0f14",
          100: "#151b26",
          200: "#232c3b",
          300: "#334054",
          400: "#8593aa",
          500: "#9fabbf",
          600: "#b9c3d3",
          700: "#cfd7e3",
          800: "#e2e7ef",
          900: "#f1f4f8",
          950: "#060810"
        }
      },
      borderRadius: { xl2: "1.25rem" }
    }
  },
  plugins: []
};

export default config;
