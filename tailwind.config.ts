/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        light_red: {
          DEFAULT: "#ff6b6b",
          100: "#480000",
          200: "#910000",
          300: "#d90000",
          400: "#ff2323",
          500: "#ff6b6b",
          600: "#ff8989",
          700: "#ffa6a6",
          800: "#ffc4c4",
          900: "#ffe1e1",
        },
        gunmetal: {
          DEFAULT: "#292f36",
          100: "#d0d5db",
          200: "#a1acb8",
          300: "#728294",
          400: "#4d5966",
          500: "#292f36",
          600: "#21262c",
          700: "#191d21",
          800: "#111316",
          900: "#080a0b",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      height: {
        "screen-1/2": "50vh",
        "screen-1/4": "25vh",
        "screen-3/4": "75vh",
        "screen-2/3": "66vh",
        "screen-1/3": "33vh",
        "112": "28rem",
        "128": "32rem",
      },
      minHeight: {
        "screen-1/2": "50vh",
        "screen-1/4": "25vh",
        "screen-3/4": "75vh",
        "screen-2/3": "66vh",
        "screen-1/3": "33vh",
        "112": "28rem",
        "128": "32rem",
      },
      maxHeight: {
        "screen-1/2": "50vh",
        "screen-1/4": "25vh",
        "screen-3/4": "75vh",
        "screen-2/3": "66vh",
        "screen-1/3": "33vh",
        "112": "28rem",
        "128": "32rem",
      },
      width: {
        "112": "28rem",
        "128": "32rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
