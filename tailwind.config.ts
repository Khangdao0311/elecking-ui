import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D70018',
        primaryDark: '#C00018',
        secondary: '#FEDE27',
        secondaryDark: '#D89907',
        thirdary: '#035FE6',
        thirdaryDark: '#003D8D',
      },
    },
  },
  plugins: [],
} satisfies Config;
