import { defineConfig, type WxtViteConfig } from "wxt";
// import tailwindcss from "@tailwindcss/vite";
// import purgecss from "@fullhuman/postcss-purgecss";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-vue", "@wxt-dev/auto-icons"],
  autoIcons: {
    baseIconPath: "assets/icon.svg",
  },
  manifest: {
    name: "RazvitScript",
    permissions: ["storage", "userScripts"],
    host_permissions: ["<all_urls>"],
  },
  vite: () =>
    ({
      // plugins: [tailwindcss()],
      // css: {
      //   postcss: {
      //     plugins: [
      //       purgecss({
      //         content: [
      //           "./entrypoints/**/*.html",
      //           "./entrypoints/**/*.vue",
      //           "./components/**/*.vue",
      //         ],
      //         safelist: ["html", "body", "main", "h1", "h2", "h3"],
      //       }),
      //     ],
      //   },
      // },
    }) as WxtViteConfig,
});
