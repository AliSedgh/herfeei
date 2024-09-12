/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        13: "3.25rem",
        15: "3.75rem",
        90: "22rem",
        100: "28rem",
        128: "32rem",
        144: "36rem",
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
      },
      colors: {
        primary: "#0361FF",
        secondary: "#B3D0FF",
        error: "#F75555",

        logo: "#00a2ea",
        mutedText: "#9C9C9C",
        grayText: "#757575",
      },
    },
    screens: {
      "3xs": "340px",
      // => @media (min-width: 300px) { ... }

      "2xs": "393px",
      // => @media (min-width: 510px) { ... }

      xs: "480px",
      // => @media (min-width: 510px) { ... }

      ss: "540px",
      // => @media (min-width: 510px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      mm: "896px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      xlp: "1450px",
      // => @media (min-width: 1450px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
      "-2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      "-xl": { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      "-lg": { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      "-md": { max: "767px" },
      // => @media (max-width: 767px) { ... }

      "-sm": { max: "639px" },
      // => @media (max-width: 639px) { ... }
      standalone: { raw: "(display-mode: standalone)" },
    },
  },
  plugins: [],

  corePlugins: {
    preflight: false,
  },
};
