import { defineField, defineType } from "sanity";

export default defineType({
  name: "workshop",
  title: "Workshops & Events",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: [{ title: "Upcoming", value: "upcoming" }, { title: "Past", value: "past" }] },
      initialValue: "upcoming",
    }),
    defineField({ name: "date", title: "Date", type: "datetime" }),
    defineField({ name: "instructor", title: "Teaching Artist / Instructor", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "description", title: "Short Description", type: "text", rows: 3 }),
    defineField({
      name: "image",
      title: "Workshop Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({
      name: "body",
      title: "Full Details",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({ name: "registrationUrl", title: "Registration / RSVP URL", type: "url" }),
    defineField({
      name: "archiveFilms",
      title: "Archive Films (from this workshop)",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "Film Title", type: "string" }),
          defineField({ name: "filmmaker", title: "Filmmaker", type: "string" }),
          defineField({ name: "vimeoUrl", title: "Vimeo URL", type: "url" }),
        ],
        preview: { select: { title: "title", subtitle: "filmmaker" } },
      }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "date", media: "image" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : "No date set", media };
    },
  },
  orderings: [{ title: "Date, Newest", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
});
