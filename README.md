# Redirects Module

Redirects module to handle a csv file with redirections.
Uses zod-csv to validate redirects. It handles both punctual and regex redirects.
Examples given in `playground/reidrects.csv` file.

## Quick Setup

1. Add `@atoms-studio/nuxt-redirects` dependency to your project

```bash
# Using pnpm
pnpm add -D my-module

# Using yarn
yarn add --dev my-module

# Using npm
npm install --save-dev my-module
```

2. Add `@atoms-studio/nuxt-redirects` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ["@atoms-studio/nuxt-redirects"],
});
```

That's it! You can now use Nuxt redirects module in your Nuxt app ✨

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```
