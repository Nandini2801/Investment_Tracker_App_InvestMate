import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { ViteWebfontDownload } from "vite-plugin-webfont-dl";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),

    ViteWebfontDownload([
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap",
    ]),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: ["./src/Tests/setupTests.js"],
  },
});
