/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        cinema: {
          bg: "#0f0a1a",
          surface: "#1a1329",
          surface2: "#251a3a",
          gold: "#d4a857",
          bronze: "#b87333",
          watchlist: "#6b8cf0",
          watched: "#5ec28d",
          dropped: "#e06c75",
        },
      },
      fontFamily: {
        display: ['"Lora"', "serif"],
        body: ['"Geist"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        gold: "0 0 20px rgba(212, 168, 87, 0.3)",
        "gold-sm": "0 0 10px rgba(212, 168, 87, 0.2)",
        watchlist: "0 0 15px rgba(107, 140, 240, 0.4)",
        watched: "0 0 15px rgba(94, 194, 141, 0.4)",
        dropped: "0 0 15px rgba(224, 108, 117, 0.4)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(212, 168, 87, 0.2)" },
          "50%": { boxShadow: "0 0 25px rgba(212, 168, 87, 0.4)" },
        },
      },
    },
  },
  plugins: [],
};
