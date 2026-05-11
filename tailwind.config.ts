import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Bebas Neue", "sans-serif"],
        body: ["Exo 2", "sans-serif"]
      },
      colors: {
        background: "#070709",
        foreground: "#f5f7fa",
        accent: "#d90000",
        panel: "#101217",
        borderGlow: "#3b3f48"
      },
      backgroundImage: {
        "grid-carbon": "radial-gradient(circle at 1px 1px, rgb(36 36 43) 1px, transparent 0)",
        "ambient-red": "radial-gradient(circle at 20% 15%, rgba(217,0,0,0.28), transparent 40%), radial-gradient(circle at 80% 10%, rgba(217,0,0,0.12), transparent 45%), linear-gradient(180deg, #090a0d 0%, #050507 100%)"
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 rgba(217,0,0,0)" },
          "50%": { boxShadow: "0 0 40px rgba(217,0,0,0.35)" }
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        shine: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" }
        }
      },
      animation: {
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
        shine: "shine 4s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
