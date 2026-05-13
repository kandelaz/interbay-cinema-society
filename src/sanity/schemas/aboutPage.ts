import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  // Singleton — only one document of this type should exist
  fields: [
    defineField({ name: "missionStatement", title: "Mission Statement", type: "text", rows: 4 }),
    defineField({
      name: "founder",
      title: "Founder Section",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Name", type: "string" }),
        defineField({ name: "years", title: "Years (e.g. 1964–2022)", type: "string" }),
        defineField({ name: "quote", title: "Featured Quote", type: "text", rows: 2 }),
        defineField({ name: "bio", title: "Biography", type: "array", of: [{ type: "block" }] }),
        defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })] }),
      ],
    }),
    defineField({
      name: "pillars",
      title: "Organizational Pillars",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "Title", type: "string" }),
          defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
          defineField({ name: "icon", title: "Icon (optional label)", type: "string" }),
        ],
        preview: { select: { title: "title", subtitle: "description" } },
      }],
    }),
    defineField({
      name: "team",
      title: "Team & Volunteers",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "name", title: "Name", type: "string" }),
          defineField({ name: "role", title: "Role / Title", type: "string" }),
          defineField({ name: "bio", title: "Short Bio", type: "text", rows: 2 }),
          defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
        ],
        preview: { select: { title: "name", subtitle: "role" } },
      }],
    }),
    defineField({ name: "pressKitUrl", title: "Press Kit URL", type: "url" }),
    defineField({ name: "extraContent", title: "Additional Content", type: "array", of: [{ type: "block" }] }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});
