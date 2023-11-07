import { type Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{md,mdx}",
    "./theme.config.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
