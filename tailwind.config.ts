import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        login_bg: "url(/public/assets/splash.jpg)",
      },
      colors: {
        navbarBg: "var(--navbarBg)",
        bodyBg: "var(--bodyBg)",
        defaultColor: "var(--defaultColor)",
        formBorderColor: "var(--formBorderColor)",
        formBg: "var(--formBg)",
        formBgDisabled: "var(--formBgDisabled)",
        formButtonBg: "var(--formButtonBg)",
        formButtonBgDisabled: "var(--formButtonBgDisabled)",
        formButtonBorder: "var(--formButtonBorder)",
        formButtonBgHover: "var(--formButtonBgHover)",
        formButtonText: "var(--formButtonText)",
        formButtonTextDisabled: "var(--formButtonTextDisabled)",
        formButtonTextHover: "var(--formButtonTextHover)",
        colorWarning: "var(--colorWarning)",
        colorBrand: "var(--colorBrand)",
      },
    },
    screens: {
      tablet: "640px",
      desktop: "1024px",
    },
  },
  plugins: [],
};
export default config;
