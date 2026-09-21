import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pine: {
          DEFAULT: "#183B2B",
          50: "#F2F7F4",
          100: "#E3ECE6",
          500: "#2A6147",
          700: "#183B2B",
          800: "#122C20",
          900: "#0C1D15",
        },
        graphite: {
          DEFAULT: "#11161B",
          50: "#F8F9FA",
          100: "#F1F3F5",
          200: "#E2E6E9",
          400: "#86929D",
          500: "#5F6B76",
          600: "#47515A",
          800: "#1E252B",
          900: "#11161B",
        },
        brass: {
          DEFAULT: "#C5A265",
          light: "#E5D2A6",
          muted: "#A6864B",
        },
        limestone: {
          DEFAULT: "#F4F6F8",
          alt: "#F8F9FA",
        },
      },
      borderRadius: {
        btn: "8px",
        input: "8px",
        card: "12px",
      },
      fontFamily: {
        sans: ["Manrope", "Golos Text", "Noto Sans Armenian", "sans-serif"],
        heading: ["Manrope", "Golos Text", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(17, 22, 27, 0.04)",
        card: "0 4px 16px -2px rgba(17, 22, 27, 0.05), 0 2px 6px -1px rgba(17, 22, 27, 0.02)",
        elevated: "0 10px 30px -10px rgba(17, 22, 27, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
