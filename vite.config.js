import { defineConfig } from "vite";
import solid from "solid-start";
import vercel from "solid-start-vercel";

export default defineConfig({
  plugins: [solid({ adapter: vercel() })],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles" as common;`,
        importer(...args) {
          if (args[0] !== "@/styles") {
            return;
          }

          return {
            file: `${path.resolve(__dirname, "./src/assets/styles")}`,
          };
        },
      },
    },
  },
});
