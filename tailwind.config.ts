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
