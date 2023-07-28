import {
  defineNuxtModule,
  createResolver,
  addTemplate,
  addRouteMiddleware,
} from "@nuxt/kit";
import { consola } from "consola";
import { zcsv, parseCSVContent } from "zod-csv";
import { z } from "zod";
import { readFile } from "fs/promises";

// Module options TypeScript interface definition
export interface ModuleOptions {
  csv: string;
  trailingSlash: boolean;
  alwaysRedirect: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-redirects",
    configKey: "redirects",
  },
  // Default configuration options of the Nuxt module
  defaults: {
    csv: "redirects.csv",
    trailingSlash: false,
    alwaysRedirect: false,
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    const redirectsPath = await resolver.resolvePath(options.csv, {
      cwd: nuxt.options.srcDir,
    });

    // schema
    const redirectsSchema = z.object({
      code: zcsv.number(),
      from: zcsv.string(),
      to: zcsv.string(),
    });
    // reading csv
    const csv = await readFile(redirectsPath, { encoding: "utf8" }).catch(
      () => {
        throw new Error("Error reading redirects csv file");
      }
    );
    const parsedCsv = parseCSVContent(csv, redirectsSchema);

    // get valid rows and write them as a template inside nuxt dir
    // you can access it later importing redirects from '#build/nuxt-redirects/redirects'
    addTemplate({
      filename: "nuxt-redirects/redirects.ts",
      write: true,
      getContents: () => {
        return `
export const redirects = ${JSON.stringify(parsedCsv.validRows)} as const
`;
      },
    });

    const { dst } = addTemplate({
      filename: "nuxt-redirects/redirectsMiddleware.ts",
      write: true,
      options,
      src: await resolver.resolvePath("./runtime/redirectsMiddleware.global"),
    });

    addRouteMiddleware({
      name: "redirectsMiddleware",
      path: dst!,
      global: true,
    });

    // @ts-ignore
    consola.info(`Added ${parsedCsv.validRows.length} redirection rules`);
  },
});
