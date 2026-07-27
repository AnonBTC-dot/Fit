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
          50: "#f6f7f9",
          100: "#eceef2",
          200: "#d5dae2",
          300: "#b0bac9",
          400: "#8593aa",
          500: "#667690",
          600: "#515e77",
          700: "#424d61",
          800: "#394252",
          900: "#333a46",
          950: "#15181e"
        }
      },
      borderRadius: { xl2: "1.25rem" }
    }
  },
  plugins: []
};

export default config;
