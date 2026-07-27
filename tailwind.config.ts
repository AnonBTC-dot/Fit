import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fdf2f6",
          100: "#fce7ef",
          200: "#fbcfe0",
          300: "#f9a8c5",
          400: "#f4729d",
          500: "#ea4879",
          600: "#d92660",
          700: "#bc184c",
          800: "#9b1740",
          900: "#821739"
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
          950: "#1c2029"
        }
      },
      borderRadius: { xl2: "1.25rem" }
    }
  },
  plugins: []
};

export default config;
