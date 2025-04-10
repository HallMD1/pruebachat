import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      srcDir: "src",
      filename: "service-worker.js",
      strategies: "injectManifest",
      registerType: "autoUpdate",
      manifest: {
        name: "Clínica Hall Chat",
        short_name: "CH Chat",
        start_url: "/",
        display: "standalone",
        theme_color: "#0d9488",
        icons: [
          {
            src: "icon.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
