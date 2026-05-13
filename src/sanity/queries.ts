import { client } from "./client";

export async function getAboutPage() {
  return client.fetch(
    `*[_type == "aboutPage" && _id == "aboutPage"][0] {
      missionStatement,
      founder { name, years, quote, bio, image { asset, alt } },
      pillars[] { title, description, icon },
      team[] { name, role, bio, image { asset } },
      pressKitUrl,
      extraContent
    }`
  );
}

export async function getAllPosts() {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, publishedAt, excerpt,
      mainImage { asset, alt }
    }`
  );
}

export async function getPostBySlug(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, publishedAt, author, excerpt,
      mainImage { asset, alt },
      body
    }`,
    { slug }
  );
}

export async function getLatestPosts(count = 3) {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) [0...$count] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage { asset, alt }
    }`,
    { count: count - 1 }
  );
}

export async function getGrants() {
  return client.fetch(
    `{
      "active": *[_type == "grant" && active == true] | order(deadline asc) {
        _id, title, slug, type, deadline, description, amount, body
      },
      "recipients": *[_type == "grant"] | order(deadline desc) {
        _id, title, type,
        recipients[] { name, project, year, location }
      }
    }`
  );
}

export async function getCurrentFestival() {
  return client.fetch(
    `*[_type == "festivalEdition" && active == true][0] {
      _id, title, year, slug, description, dates, venue,
      trailerUrl, submissionsOpen, submissionDeadline,
      posterImage { asset, alt }, body,
      highlights[] { title, director, country, duration, format, description },
      programs[] {
        label, title, date, time, description, venue, isSpecialEvent,
        films[] { title, director, country, year, duration, format, description, image { asset, alt } }
      }
    }`
  );
}

export async function getFestivalBySlug(slug: string) {
  return client.fetch(
    `*[_type == "festivalEdition" && slug.current == $slug][0] {
      _id, title, year, slug, description, dates, venue,
      filmCount, countryCount,
      trailerUrl, submissionsOpen, submissionDeadline,
      posterImage { asset, alt }, body,
      highlights[] { title, director, country, duration, format, description },
      programs[] {
        label, title, date, time, description, venue, isSpecialEvent,
        films[] { title, director, country, year, duration, format, description, image { asset, alt } }
      }
    }`,
    { slug }
  );
}

export async function getFestivalArchive() {
  return client.fetch(
    `*[_type == "festivalEdition"] | order(year desc) {
      _id, title, year, slug, description, dates, venue, filmCount, countryCount,
      posterImage { asset, alt }
    }`
  );
}

export async function getWorkshops() {
  return client.fetch(
    `{
      "upcoming": *[_type == "workshop" && status == "upcoming"] | order(date asc) {
        _id, title, slug, date, instructor, location, description, image { asset, alt }, registrationUrl
      },
      "past": *[_type == "workshop" && status == "past"] | order(date desc) {
        _id, title, slug, date, instructor, description, image { asset, alt },
        archiveFilms[] { title, filmmaker, vimeoUrl }
      }
    }`
  );
}

export async function getStoreProducts(category?: string) {
  const filter = category
    ? `*[_type == "product" && category == $category]`
    : `*[_type == "product"]`;
  return client.fetch(
    `${filter} | order(_createdAt desc) {
      _id,
      title,
      slug,
      price,
      category,
      description,
      squareBuyButtonId,
      image { asset, alt }
    }`,
    { category }
  );
}
