import vituum from "vituum";
import pug from "@vituum/vite-plugin-pug";
import tailwindcss from "@tailwindcss/vite";

export default {
  plugins: [
    tailwindcss(),
    vituum(),
    pug({
      root: "./src",
      options: {
        pretty: true,
      },
    }),
  ],
  build: {
    modulePreload: {
      polyfill: false,
    },
    emptyOutDir: true,
    sourcemap: false,
    // cssCodeSplit: false,
    cssMinify: true,
    ssr: false,
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: (id) => (id.includes("node_modules") ? "vendor" : "app"),
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === "vendor"
            ? "assets/vendor.[hash].js"
            : "assets/[name].[hash].js";
        },
        assetFileNames: "assets/app.[name].[ext]",
      },
    },
  },
};
