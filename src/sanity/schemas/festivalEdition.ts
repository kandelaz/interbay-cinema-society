import { defineField, defineType } from "sanity";

const filmFields = [
  defineField({ name: "title", title: "Film Title", type: "string" }),
  defineField({ name: "director", title: "Director", type: "string" }),
  defineField({ name: "country", title: "Country", type: "string" }),
  defineField({ name: "year", title: "Year", type: "number" }),
  defineField({ name: "duration", title: "Duration (e.g. 6:09)", type: "string" }),
  defineField({ name: "format", title: "Format (e.g. 16mm | color | sound)", type: "string" }),
  defineField({ name: "description", title: "Synopsis", type: "text", rows: 3 }),
  defineField({ name: "image", title: "Film Still", type: "image", options: { hotspot: true } }),
];

export default defineType({
  name: "festivalEdition",
  title: "Festival Editions",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "year", title: "Year", type: "number", validation: (r) => r.required() }),
    defineField({ name: "active", title: "Current Edition (show front and center)", type: "boolean", initialValue: false }),
    defineField({ name: "description", title: "Short Description", type: "text", rows: 3 }),
    defineField({
      name: "posterImage",
      title: "Poster / Banner Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({ name: "trailerUrl", title: "Trailer URL (YouTube / Vimeo embed)", type: "url" }),
    defineField({ name: "dates", title: "Festival Dates", type: "string", description: "e.g. November 6–8, 2025" }),
    defineField({ name: "venue", title: "Venue", type: "string" }),
    defineField({ name: "filmCount", title: "Total Film Count", type: "number" }),
    defineField({ name: "countryCount", title: "Countries Represented", type: "number" }),
    defineField({ name: "submissionsOpen", title: "Film Submissions Open", type: "boolean", initialValue: false }),
    defineField({ name: "submissionDeadline", title: "Submission Deadline", type: "date" }),
    defineField({ name: "body", title: "Festival Notes", type: "array", of: [{ type: "block" }] }),

    // Screening programs — each program is one night's screening session
    defineField({
      name: "programs",
      title: "Screening Programs",
      type: "array",
      of: [{
        type: "object",
        name: "program",
        title: "Program",
        fields: [
          defineField({ name: "label", title: "Label (e.g. Program #1)", type: "string" }),
          defineField({ name: "title", title: "Program Title", type: "string" }),
          defineField({ name: "date", title: "Date", type: "string", description: "e.g. Thursday, November 8" }),
          defineField({ name: "time", title: "Time", type: "string", description: "e.g. 7pm" }),
          defineField({ name: "description", title: "Program Description", type: "text", rows: 3 }),
          defineField({ name: "venue", title: "Venue (if different from main venue)", type: "string" }),
          defineField({ name: "isSpecialEvent", title: "Special Event / Performance", type: "boolean", initialValue: false }),
          defineField({
            name: "films",
            title: "Films",
            type: "array",
            of: [{ type: "object", fields: filmFields, preview: { select: { title: "title", subtitle: "director" } } }],
          }),
        ],
        preview: {
          select: { title: "title", subtitle: "date" },
          prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
            return { title: title ?? "Untitled Program", subtitle };
          },
        },
      }],
    }),

    // Highlights shown on the main festival page (for the previous year's edition)
    defineField({
      name: "highlights",
      title: "Highlights (shown on homepage/festival landing)",
      type: "array",
      of: [{ type: "object", fields: filmFields, preview: { select: { title: "title", subtitle: "director" } } }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "year", media: "posterImage" },
  },
  orderings: [{ title: "Year, Newest", name: "yearDesc", by: [{ field: "year", direction: "desc" }] }],
});
