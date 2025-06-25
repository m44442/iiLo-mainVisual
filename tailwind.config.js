/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        slideInDown:
          "slideInDown 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        expandFromCenter: "expandFromCenter 0.1s cubic-bezier(0.16, 1, 0.3, 1)",
        contractToCenter: "contractToCenter 0.1s ease-in-out",
        // Mission animations
        "slide-in-left":
          "slideInLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "tracking-in-expand":
          "trackingInExpand 0.7s cubic-bezier(0.215, 0.61, 0.355, 1) forwards",
        "tracking-in-expand-delay":
          "trackingInExpand 0.7s cubic-bezier(0.215, 0.61, 0.355, 1) 0.2s forwards",
        "tracking-in-expand-fwd-bottom":
          "trackingInExpandFwdBottom 0.8s cubic-bezier(0.215, 0.610, 0.355, 1.000) forwards",
        "tracking-in-expand-fwd-bottom-delayed":
          "trackingInExpandFwdBottom 0.8s cubic-bezier(0.215, 0.610, 0.355, 1.000) 0.2s forwards",
        "fade-in-scale": "fadeInScale 1.2s ease-out forwards",
        "simple-pulse": "simplePulse 0.2s ease-in-out 2",
        "fade-up": "fadeUp 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) forwards",
        "fade-up-delayed":
          "fadeUp 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0.2s forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        expandFromCenter: {
          "0%": {
            opacity: "0",
            clipPath: "polygon(0% 0%, 100% 100%, 100% 100%, 0% 0%)",
          },
          "15%": {
            opacity: "0.3",
            clipPath: "polygon(0% 0%, 100% 85%, 100% 100%, 0% 15%)",
          },
          "30%": {
            opacity: "0.5",
            clipPath: "polygon(0% 0%, 100% 70%, 100% 100%, 0% 30%)",
          },
          "45%": {
            opacity: "0.7",
            clipPath: "polygon(0% 0%, 100% 55%, 100% 100%, 0% 45%)",
          },
          "60%": {
            opacity: "0.8",
            clipPath: "polygon(0% 0%, 100% 40%, 100% 100%, 0% 60%)",
          },
          "75%": {
            opacity: "0.9",
            clipPath: "polygon(0% 0%, 100% 25%, 100% 100%, 0% 75%)",
          },
          "90%": {
            opacity: "0.95",
            clipPath: "polygon(0% 0%, 100% 10%, 100% 100%, 0% 90%)",
          },
          "100%": {
            opacity: "1",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          },
        },
        contractToCenter: {
          "0%": {
            opacity: "1",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          },
          "10%": {
            opacity: "0.95",
            clipPath: "polygon(0% 0%, 100% 10%, 100% 100%, 0% 90%)",
          },
          "25%": {
            opacity: "0.9",
            clipPath: "polygon(0% 0%, 100% 25%, 100% 100%, 0% 75%)",
          },
          "40%": {
            opacity: "0.8",
            clipPath: "polygon(0% 0%, 100% 40%, 100% 100%, 0% 60%)",
          },
          "55%": {
            opacity: "0.7",
            clipPath: "polygon(0% 0%, 100% 55%, 100% 100%, 0% 45%)",
          },
          "70%": {
            opacity: "0.5",
            clipPath: "polygon(0% 0%, 100% 70%, 100% 100%, 0% 30%)",
          },
          "85%": {
            opacity: "0.3",
            clipPath: "polygon(0% 0%, 100% 85%, 100% 100%, 0% 15%)",
          },
          "100%": {
            opacity: "0",
            clipPath: "polygon(0% 0%, 100% 100%, 100% 100%, 0% 0%)",
          },
        },
        openLine1: {
          "0%": {
            transform: "rotate(0deg)",
            top: "12px",
            left: "0",
            backgroundColor: "#000000",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-50%) rotate(45deg)",
            top: "50%",
            left: "50%",
            backgroundColor: "#E7E7E7",
          },
        },
        openLine2: {
          "0%": {
            transform: "rotate(0deg)",
            top: "20px",
            left: "0",
            backgroundColor: "#000000",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-50%) rotate(-45deg)",
            top: "50%",
            left: "50%",
            backgroundColor: "#E7E7E7",
          },
        },
        closeLine1: {
          "0%": {
            transform: "translateX(-50%) translateY(-50%) rotate(45deg)",
            top: "50%",
            left: "50%",
            backgroundColor: "#E7E7E7",
          },
          "100%": {
            transform: "rotate(0deg)",
            top: "12px",
            left: "0",
            backgroundColor: "#000000",
          },
        },
        closeLine2: {
          "0%": {
            transform: "translateX(-50%) translateY(-50%) rotate(-45deg)",
            top: "50%",
            left: "50%",
            backgroundColor: "#E7E7E7",
          },
          "100%": {
            transform: "rotate(0deg)",
            top: "20px",
            left: "0",
            backgroundColor: "#000000",
          },
        },
        // Mission animations keyframes
        slideInLeft: {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        trackingInExpand: {
          "0%": {
            letterSpacing: "-0.5em",
            opacity: "0",
          },
          "40%": {
            opacity: "0.6",
          },
          "100%": {
            opacity: "1",
            letterSpacing: "normal",
          },
        },
        trackingInExpandFwdBottom: {
          "0%": {
            letterSpacing: "-.5em",
            transform: "translateZ(-700px) translateY(500px)",
            opacity: "0",
          },
          "40%": {
            opacity: ".6",
          },
          "100%": {
            transform: "translateZ(0) translateY(0)",
            opacity: "1",
            letterSpacing: "normal",
          },
        },
        fadeInScale: {
          "0%": {
            opacity: "0",
            transform: "scale(0.8)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        simplePulse: {
          "0%, 100%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.05)",
          },
        },
        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      backgroundImage: {
        "text-highlight-white":
          "linear-gradient(to right, #ffffff 0%, #ffffff 100%)",
      },
      backgroundSize: {
        "size-highlight": "100% 0.8em",
      },
      backgroundPosition: {
        "pos-highlight": "0 0.2em",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [
    // 一時的にスコーププラグインを無効化
    // require("tailwindcss-scoped-preflight")({
    //   cssSelector: ".tw", // Tailwindのリセットを.twクラス内でのみ適用
    // }),
  ],
};
