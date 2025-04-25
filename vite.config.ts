import { defineConfig } from "vite";
import { resolve } from "node:path";
import pugPlugin from "vite-plugin-pug-transformer";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

export default defineConfig({
  root,
  build: {
    outDir,
    emptyOutDir: true,
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        about: resolve(root, "about", "index.html"),
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name][extname]",
        // manualChunks(id) {
        //   if (id.includes("node_modules")) {
        //     return id
        //       .toString()
        //       .split("node_modules/")[1]
        //       .split("/")[0]
        //       .toString();
        //   }
        // },
      },
    },
  },
  plugins: [
    pugPlugin({
      pugOptions: {
        basedir: root,
        pretty: true,
        locals: {
          bundler: "Vite",
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": root,
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
});
