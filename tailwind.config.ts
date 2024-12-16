import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      transitionTimingFunction: {
        "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        "fade-slide": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
            visibility: "hidden",
          },
          "1%": {
            visibility: "visible",
            opacity: "0",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
            visibility: "visible",
          },
        },
      },
      animation: {
        "fade-slide": "fade-slide 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
