import type { Config } from "tailwindcss";

// Resolve a CSS variable colour while still supporting Tailwind opacity
// modifiers (e.g. bg-muted/50). color-mix keeps the exact source value
// (oklch or hex) and applies <alpha-value> as real transparency.
const c = (v: string) =>
  `color-mix(in srgb, var(${v}) calc(<alpha-value> * 100%), transparent)`;

export default {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: c("--background"),
        foreground: c("--foreground"),
        card: c("--card"),
        "card-foreground": c("--card-foreground"),
        popover: c("--popover"),
        "popover-foreground": c("--popover-foreground"),
        primary: c("--primary"),
        "primary-foreground": c("--primary-foreground"),
        secondary: c("--secondary"),
        "secondary-foreground": c("--secondary-foreground"),
        muted: c("--muted"),
        "muted-foreground": c("--muted-foreground"),
        accent: c("--accent"),
        "accent-foreground": c("--accent-foreground"),
        destructive: c("--destructive"),
        border: c("--border"),
        input: c("--input"),
        ring: c("--ring"),
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) * 0.8)",
        sm: "calc(var(--radius) * 0.6)",
      },
      fontFamily: {
        sans: ["var(--font-roboto)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 50px rgba(10, 10, 10, 0.06)",
      },
    },
  },
  plugins: [],
} satisfies Config;
