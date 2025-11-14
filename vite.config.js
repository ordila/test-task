import { fileURLToPath, URL } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@elements": fileURLToPath(new URL("./src/ui/elements", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/ui/components", import.meta.url)
      ),
      "@containers": fileURLToPath(
        new URL("./src/ui/containers", import.meta.url)
      ),
      "@hooks": fileURLToPath(new URL("./src/hooks", import.meta.url)),
      "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
      "@api": fileURLToPath(new URL("./src/api", import.meta.url)),
      "@config": fileURLToPath(new URL("./src/config", import.meta.url)),
      "@constants": fileURLToPath(new URL("./src/constants", import.meta.url)),
    },
  },
});
