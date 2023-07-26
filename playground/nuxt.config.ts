export default defineNuxtConfig({
  modules: ["../src/module"],
  redirects: {
    alwaysRedirect: false,
    trailingSlash: true,
  },
  devtools: { enabled: true },
});
