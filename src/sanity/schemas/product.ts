import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Store Products",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Product Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Film Supplies", value: "film-supplies" },
          { title: "Merch & Prints", value: "merch" },
          { title: "Festival Tickets / Passes", value: "festival-tickets" },
          { title: "Gift Cards", value: "gift-cards" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "price", title: "Price ($)", type: "number", validation: (r) => r.required() }),
    defineField({ name: "inStock", title: "In Stock", type: "boolean", initialValue: true }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({
      name: "squareBuyButtonId",
      title: "Square Buy Button ID",
      type: "string",
      description: "Paste the Square Buy Button embed ID here once generated in your Square dashboard.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
    prepare({ title, subtitle, media }) {
      const labels: Record<string, string> = { "film-supplies": "Film Supplies", merch: "Merch & Prints", "festival-tickets": "Festival Tickets", "gift-cards": "Gift Cards" };
      return { title, subtitle: labels[subtitle] ?? subtitle, media };
    },
  },
});
