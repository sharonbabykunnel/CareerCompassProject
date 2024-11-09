/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      flicker: {
        "0%, 100%": {
          borderColor: "#01ebfc",
          boxShadow: "0 0 100px #01ebfc, inset 0 0 10px #01ebfc, 0 0 5px #fff",
        },
        "5%, 25%": {
          borderColor: "transparent",
          boxShadow: "none",
        },
        "10%, 30%": {
          borderColor: "#01ebfc",
          boxShadow: "0 0 100px #01ebfc, inset 0 0 10px #01ebfc, 0 0 5px #fff",
        },
      },
      iconflicker: {
          '0%, 10%, 30%, 100%': { opacity: '1' },
          '5%, 25%': { opacity: '0.2' }
        },
      animation: {
        flicker: 'flicker 2s linear infinite',
        iconflicker: 'iconflicker 2s linear infinite',
        wave: "waveAnimation var(--wave-animation-duration) linear infinite",
      },
      keyframes: {
        waveAnimation: {
          "0%": { maskPosition: "0% 0%" },
          "100%": { maskPosition: "100% 0%" },
        },
      },
      colors: {
        user: "#390D72",
        user_lite: "#4B256B",
        lite_user: "#EFE5F7",
        admin_lite: "#DDDFFD",
      },
      transitionTimingFunction: {
        custom: "cubic-bezier(0.5, -0.35, 0.35, 1.5)",
      },
      transitionDelay: {
        "0s": "0s",
        "0.21s": "calc(0s + 0.35s * 0.6)",
        "0.105s": "calc(0s + 0.35s * 0.3)",
      },
      bottom: {
        "bar-top": "calc(50% + 11px + 2px)",
        "checked-bar-top": "calc(50% - 2px)",
      },
      top: {
        "bar-middle": "calc(50% - 2px)",
        "bar-bottom": "calc(50% + 11px + 2px)",
        "checked-bar-bottom": "calc(50% - 2px)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
