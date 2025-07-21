import type { Config } from "tailwindcss"
import animate from "tailwindcss-animate"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(15, 5, 32)",
        foreground: "rgb(255, 255, 255)",
        card: {
          DEFAULT: "rgba(30, 15, 60, 0.9)",
          foreground: "rgb(255, 255, 255)",
        },
        popover: {
          DEFAULT: "rgba(15, 5, 32, 0.95)",
          foreground: "rgb(255, 255, 255)",
        },
        primary: {
          DEFAULT: "rgb(139, 92, 246)",
          foreground: "rgb(255, 255, 255)",
        },
        secondary: {
          DEFAULT: "rgba(139, 92, 246, 0.2)",
          foreground: "rgb(255, 255, 255)",
        },
        muted: {
          DEFAULT: "rgba(139, 92, 246, 0.1)",
          foreground: "rgba(255, 255, 255, 0.8)",
        },
        accent: {
          DEFAULT: "rgb(168, 85, 247)",
          foreground: "rgb(255, 255, 255)",
        },
        destructive: {
          DEFAULT: "rgb(239, 68, 68)",
          foreground: "rgb(255, 255, 255)",
        },
        sidebar: {
          DEFAULT: "rgba(15, 5, 32, 0.9)",
          foreground: "rgb(255, 255, 255)",
          primary: "rgb(139, 92, 246)",
          "primary-foreground": "rgb(255, 255, 255)",
          accent: "rgba(139, 92, 246, 0.2)",
          "accent-foreground": "rgb(255, 255, 255)",
          border: "rgba(139, 92, 246, 0.3)",
          ring: "rgb(139, 92, 246)",
        },
      },
      backgroundImage: {
        "cosmic-gradient":
          "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.3) 0%, rgba(15, 5, 32, 1) 70%)",
        "cosmic-card":
          "linear-gradient(135deg, rgba(30, 15, 60, 0.9) 0%, rgba(20, 10, 45, 0.95) 100%)",
        "feature-glow":
          "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(168, 85, 247, 0.1) 100%)",
      },
      boxShadow: {
        cosmic: "0 0 30px rgba(139, 92, 246, 0.4)",
        "cosmic-lg": "0 0 50px rgba(139, 92, 246, 0.6)",
        "cosmic-card":
          "0 4px 20px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "cosmic-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(139, 92, 246, 0.8)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "cosmic-pulse": "cosmic-pulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
}

export default config
