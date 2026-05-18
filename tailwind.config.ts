import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        phone: "420px",
        tablet: "768px",
        laptop: "1024px",
        desktop: "1280px",
      },
      colors: {
        brand: {
          ink: "#172033",
          muted: "#64748b",
          surface: "#f6f8fb",
          panel: "#ffffff",
          line: "#dbe3ef",
          primary: "#2563eb",
          accent: "#0f766e",
        },
      },
    },
  },
};

export default config;
