import type { Config } from "tailwindcss";
export default { darkMode: "media", content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { fontFamily: { sans: ["var(--font-inter)", "system-ui", "sans-serif"] } } }, plugins: [] } satisfies Config;
