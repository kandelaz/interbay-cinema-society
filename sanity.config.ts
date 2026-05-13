import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";

export default defineConfig({
  basePath: "/studio",
  projectId: "9glqjsut",
  dataset: "production",
  title: "Interbay Cinema Society",
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singleton pages
            S.listItem().title("About Page").schemaType("aboutPage")
              .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
            S.divider(),
            // Collections
            S.listItem().title("News & Blog Posts").schemaType("post").child(S.documentTypeList("post")),
            S.listItem().title("Grants").schemaType("grant").child(S.documentTypeList("grant")),
            S.listItem().title("Festival Editions").schemaType("festivalEdition").child(S.documentTypeList("festivalEdition")),
            S.listItem().title("Workshops & Events").schemaType("workshop").child(S.documentTypeList("workshop")),
            S.listItem().title("Store Products").schemaType("product").child(S.documentTypeList("product")),
          ]),
    }),
    visionTool(),
  ],
});
