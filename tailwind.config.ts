import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-circular)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        // Bankrate Brand Colors
        blue: {
          50: "#F6FAFF",
          100: "#EAF1FF",
          200: "#D5E3FD",
          300: "#AAC7FE",
          400: "#80ABFF",
          500: "#548DFF",
          600: "#0157FF", // PRIMARY
          700: "#0049C0",
          800: "#013497",
          900: "#00143D",
        },
        lavender: {
          50: "#FBF9FB",
          100: "#F6EEF5",
          200: "#F0DCEF", // SECONDARY
          300: "#DEBCDB",
          400: "#C79FC5",
          500: "#B480AF",
          600: "#9B4F8F",
          700: "#8A2A7C",
          800: "#671B5C",
          900: "#270A23",
        },
        teal: {
          50: "#F3FBFA",
          100: "#E5F4F2",
          200: "#CDE8E3",
          300: "#9BD1C7",
          400: "#64BAAB",
          500: "#00A391", // OPPOSITIONAL
          600: "#007871",
          700: "#095C5D",
          800: "#07444A",
          900: "#001917",
        },
        yellow: {
          50: "#FFF9E7",
          100: "#FFF0CA",
          200: "#FFDD83", // HIGHLIGHT
          300: "#EFC138",
          400: "#D3A434",
          500: "#B7892C",
          600: "#8E6223",
          700: "#6E4C1C",
          800: "#4F3715",
          900: "#1D1407",
        },
        coral: {
          50: "#FFF7F6",
          100: "#FBEEED",
          200: "#F9DCDA",
          300: "#F1B6AC",
          400: "#EC9489",
          500: "#E5665E", // OPPOSITIONAL / NEGATIVE
          600: "#BA413E",
          700: "#9D2528",
          800: "#721B1D",
          900: "#2C0A0B",
        },
        // Semantic tokens
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        // Bankrate Brand Gradients
        "gradient-yellow-1": "linear-gradient(to right, #FFF9E7, #FFDD83)",
        "gradient-yellow-2": "linear-gradient(to right, #FFF0CA, #FFDD83)",
        "gradient-coral-1": "linear-gradient(to right, #FBEEED, #F9DCDA)",
        "gradient-coral-2": "linear-gradient(to right, #FBEEED, #F1B6AC)",
        "gradient-coral-3": "linear-gradient(to right, #F9DCDA, #F1B6AC)",
        "gradient-lavender-1": "linear-gradient(to right, #F6EEF5, #F0DCEF)",
        "gradient-lavender-2": "linear-gradient(to right, #F6EEF5, #C79FC5)",
        "gradient-lavender-3": "linear-gradient(to right, #F0DCEF, #C79FC5)",
        "gradient-blue-1": "linear-gradient(to right, #EAF1FF, #D5E3FD)",
        "gradient-blue-2": "linear-gradient(to right, #0157FF, #013497)",
        "gradient-blue-3": "linear-gradient(to right, #0157FF, #00143D)",
        "gradient-teal-1": "linear-gradient(to right, #CDE8E3, #9BD1C7)",
        "gradient-teal-2": "linear-gradient(to right, #9BD1C7, #64BAAB)",
        "gradient-teal-3": "linear-gradient(to right, #64BAAB, #095C5D)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
