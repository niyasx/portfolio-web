import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rajdhani: ["var(--font-rajdhani)"],
        poppins: ["var(--font-poppins)"],
      },
      screens: {
        "3xl": "1700px",
        xl2: "1150px",
      },
      colors: {
        primary: "#F3500F",
      },
      transitionTimingFunction: {
        jayden: "cubic-bezier(0.2, 0.65, 0.2, 1)",
      },
    },
  },
};

export default config;
