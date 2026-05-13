import { defineField, defineType } from "sanity";

export default defineType({
  name: "grant",
  title: "Grants",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({
      name: "type",
      title: "Grant Type",
      type: "string",
      options: { list: [{ title: "ICS Grant", value: "ics" }] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "active", title: "Active / Open", type: "boolean", initialValue: true }),
    defineField({ name: "amount", title: "Grant Amount ($)", type: "number" }),
    defineField({ name: "deadline", title: "Application Deadline", type: "date" }),
    defineField({ name: "description", title: "Short Description", type: "text", rows: 3 }),
    defineField({
      name: "body",
      title: "Full Details",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "recipients",
      title: "Past Recipients",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "name", title: "Filmmaker Name", type: "string" }),
          defineField({ name: "project", title: "Project / Film", type: "string" }),
          defineField({ name: "year", title: "Year", type: "number" }),
          defineField({ name: "location", title: "Location", type: "string" }),
        ],
        preview: { select: { title: "name", subtitle: "project" } },
      }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "deadline" },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? `Deadline: ${subtitle}` : "No deadline set" };
    },
  },
});
