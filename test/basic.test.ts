import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { setup, $fetch } from "@nuxt/test-utils";

describe("ssr", async () => {
  await setup({
    rootDir: fileURLToPath(new URL("./fixtures/basic", import.meta.url)),
  });

  it("redirects to /some-other page when visiting /some", async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch("/some");
    expect(html).toContain("<div>some other</div>");
  });

  it("redirects to /p-page page when visiting /t-page", async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch("/t-page");
    expect(html).toContain("p-page");
  });
});
