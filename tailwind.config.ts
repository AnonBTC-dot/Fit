import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Amarillo eléctrico estilo Fuertafit
        brand: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#ffdf20",
          500: "#ffd200",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12"
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
