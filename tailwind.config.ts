import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        pitch: {
          950: "#06110d",
          900: "#081814",
          800: "#0d241d",
          700: "#12382d"
        },
        turf: "#00d6a3",
        gold: "#d4af37"
      },
      boxShadow: {
        glow: "0 0 40px rgba(0, 214, 163, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
