import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { ink: "#0a0a0a", panel: "#151513", line: "#282824", gold: "#d4af37", muted: "#a5a49e" },
      fontFamily: { display: ["var(--font-display)"], sans: ["var(--font-sans)"] }
    }
  },
  plugins: []
};
export default config;
