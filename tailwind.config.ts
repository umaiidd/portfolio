import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        offwhite: "#F5F5F7",
        light: "#FBFBFD",
        gray: "#86868B",
        midgray: "#6E6E73",
        dark: "#1D1D1F",
        black: "#000000",
        blue: "#0071E3",
        "blue-hover": "#0077ED",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
    },
  },
  plugins: [],
};
export default config;
