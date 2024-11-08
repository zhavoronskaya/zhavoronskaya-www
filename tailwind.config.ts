import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      menum: ["48px", "40px"],
      menut: ["96px", "80px"],
      menu: ["112px", "96px"],

      linkm: ["8px", "12px"],
      link: ["16px", "20px"],

      hintm: ["16px", "20px"],
      hintt: ["28px", "36px"],
      hint: ["40px", "48px"],

      remarkm: ["12px", "16px"],
      remarkt: ["16px", "20px"],
      remark: ["24px", "28px"],

      pillsmm: ["20px", "20px"],
      pillsmt: ["32px", "32px"],
      pillsm: ["48px", "48px"],

      pillm: ["32px", "32px"],
      pillt: ["56px", "56px"],
      pill: ["72px", "72px"],

      bodysm: ["16px", "24px"],
      bodyst: ["24px", "36px"],
      bodys: ["32px", "44px"],

      bodym: ["24px", "28px"],
      bodyt: ["44px", "48px"],
      body: ["56px", "60px"],

      bodylm: ["28px", "32px"],
      bodylt: ["48px", "48px"],
      bodyl: ["64px", "64px"],

      hxxsm: ["20px", "24px"],
      hxxst: ["36px", "40px"],
      hxxs: ["48px", "52px"],

      hxsm: ["24px", "28px"],
      hxst: ["44px", "48px"],
      hxs: ["56px", "60px"],

      hsm: ["28px", "32px"],
      hst: ["48px", "52px"],
      hs: ["64px", "68px"],

      hmm: ["36px", "40px"],
      hmt: ["64px", "72px"],
      hm: ["72px", "80px"],

      hlm: ["40px", "44px"],
      hlt: ["76px", "84px"],
      hl: ["88px", "96px"],

      hxlm: ["48px", "40px"],
      hxlt: ["96px", "80px"],
      hxl: ["200px", "162px"],

      labelm: ["40px", "36px"],
      labelt: ["88px", "76px"],
      label: ["128px", "112px"],

      gallerybodym: ["24px", "28px"],
      gallerybodyt: ["32px", "36px"],
      gallerybody: ["44px", "48px"],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "background-color": "var(--background-color)",
        "primary-color": "var(--primary-color)",
        "dissolve-color": "var(--dissolve-color)",
        "border-color": "var(--border-color)",
        "border-image-color": "var(--border-image-color)",
        "border-tag-color": "var(--border-tag-color)",

        "main-container-color": "var(--main-container-color)",
        "accent-color": "var(--accent-color)",
        "accent-color-active": "var(--accent-color-active)",
        "accent-color-transparent": "var(--accent-color-transparent)",
        "accent-purple": "var(--accent-purple)",
      },
    },
  },
  plugins: [],
};
export default config;
