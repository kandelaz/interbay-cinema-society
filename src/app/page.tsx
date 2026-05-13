import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLatestPosts } from "@/sanity/queries";

// Fallback posts used until Sanity content is populated
const fallbackPosts = [
  {
    _id: "1",
    title: "ICS Grants January 2026",
    slug: { current: "ics-grants-january-2026" },
    publishedAt: "2025-12-31",
    excerpt:
      "The Interbay Cinema Society is delighted to unveil our newest cycle of ICS Grants for January 2026.",
    mainImage: {
      asset: null,
      wpSrc:
        "https://i0.wp.com/interbaycinemasociety.org/wp-content/uploads/2025/12/grants-faq-bg.jpg",
      alt: "ICS Grants",
    },
  },
  {
    _id: "2",
    title: "Sound, Light, Movement: Solo Cello + Handmade Film",
    slug: { current: "sound-light-movement" },
    publishedAt: "2025-07-21",
    excerpt:
      "Experimental films with a live score by Lori Goldston — an evening of handmade celluloid work paired with improvised music.",
    mainImage: {
      asset: null,
      wpSrc:
        "https://i0.wp.com/interbaycinemasociety.org/wp-content/uploads/2025/02/top-banner-Lori-Goldston.jpg",
      alt: "Lori Goldston performance",
    },
  },
  {
    _id: "3",
    title: "ICS Grants July 2025",
    slug: { current: "ics-grants-july-2025" },
    publishedAt: "2025-07-01",
    excerpt:
      "The Interbay Cinema Society is delighted to unveil our newest cycle of ICS Grants for July 2025.",
    mainImage: {
      asset: null,
      wpSrc:
        "https://i0.wp.com/interbaycinemasociety.org/wp-content/uploads/2024/12/ICS-Zoom-BG.jpg",
      alt: "ICS Grants",
    },
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const programs = [
  {
    label: "Festival",
    title: "Engauge Experimental Film Festival",
    description:
      "An annual celebration of artist-made celluloid work from around the world, held each November in Seattle.",
    href: "/festival",
    cta: "View Festival",
  },
  {
    label: "Grants",
    title: "ICS Grants",
    description:
      "Bi-annual $1,000 grants supporting US and international filmmakers working with celluloid. Over $200K awarded to date.",
    href: "/grants",
    cta: "Apply for a Grant",
  },
  {
    label: "Store",
    title: "Film Supplies & Merch",
    description:
      "Super 8 and 16mm film supplies, ICS prints and merchandise, and festival passes — all supporting the organization.",
    href: "/store",
    cta: "Visit the Store",
  },
];

export default async function Home() {
  let posts: typeof fallbackPosts = [];
  try {
    const fetched = await getLatestPosts(3);
    posts = fetched.length ? fetched : fallbackPosts;
  } catch {
    posts = fallbackPosts;
  }

  return (
    <>
      <Header />

      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="relative grain overflow-hidden bg-[var(--background)] h-screen flex items-center">
          {/* Video background */}
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            >
              <source src="/assets/interbay-cinema-society-videhome-bg.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-[#0a0a0a]/60 to-[#0a0a0a]" />
          </div>

          {/* Sprocket-hole decoration */}
          <div className="absolute left-0 inset-y-0 w-8 hidden xl:flex flex-col justify-around py-6 pointer-events-none">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="mx-auto w-3 h-4 rounded-sm border border-[var(--border)] opacity-40" />
            ))}
          </div>
          <div className="absolute right-0 inset-y-0 w-8 hidden xl:flex flex-col justify-around py-6 pointer-events-none">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="mx-auto w-3 h-4 rounded-sm border border-[var(--border)] opacity-40" />
            ))}
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-8 pt-0 pb-20 text-center flex flex-col items-center">
            <Image
              src="/assets/logo-white.svg"
              alt="Interbay Cinema Society"
              width={510}
              height={510}
              className="opacity-90 -mt-[98px] -mb-[85px]"
            />
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-6">
              Seattle, WA &nbsp;·&nbsp; Est. 2017
            </p>
            <blockquote className="font-[family-name:var(--font-serif)] text-4xl sm:text-6xl font-normal italic leading-tight text-[var(--foreground)] mb-6 w-full">
              &ldquo;Keep making films and together we can make this world a better place.&rdquo;
            </blockquote>
            <p className="text-xs tracking-[0.25em] uppercase text-[var(--accent-dim)] mb-8">
              Jon Behrens &nbsp;·&nbsp; Founder &nbsp;·&nbsp; 1964–2022
            </p>
            <Link
              href="/about"
              className="px-8 py-3.5 border border-[var(--accent-dim)] text-[var(--accent)] text-xs font-semibold tracking-[0.2em] uppercase hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--background)] transition-all"
            >
              Our Mission
            </Link>
          </div>
        </section>

        {/* ── Mission strip ── */}
        <section className="bg-[var(--surface)] border-y border-[var(--border)]">
          <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-8 py-10 text-center">
            <p className="text-sm sm:text-base text-[var(--accent-dim)] leading-relaxed tracking-wide">
              Interbay Cinema Society provides material support for filmmakers working experimentally
              with celluloid film — through grants, festivals, education, and community.
            </p>
          </div>
        </section>

        {/* ── Programs feature strip ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)]">
            {programs.map((p) => (
              <div
                key={p.label}
                className="group bg-[var(--background)] p-8 sm:p-10 flex flex-col hover:bg-[var(--surface)] transition-colors"
              >
                <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-3">
                  {p.label}
                </p>
                <h3 className="font-[family-name:var(--font-serif)] text-xl font-semibold text-[var(--foreground)] mb-3 leading-snug">
                  {p.title}
                </h3>
                <p className="text-xs text-[var(--accent-dim)] leading-relaxed flex-1 mb-6">
                  {p.description}
                </p>
                <Link
                  href={p.href}
                  className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--accent)] hover:text-[var(--foreground)] transition-colors flex items-center gap-2"
                >
                  {p.cta}
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── Latest News ── */}
        <section className="bg-[var(--surface)] border-y border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex items-baseline justify-between mb-12">
              <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-semibold text-[var(--foreground)]">
                Latest News
              </h2>
              <Link
                href="/news"
                className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--accent-dim)] hover:text-[var(--accent)] transition-colors"
              >
                All Posts &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((post) => {
                const imgSrc =
                  (post.mainImage as { wpSrc?: string })?.wpSrc ??
                  "https://i0.wp.com/interbaycinemasociety.org/wp-content/uploads/2024/12/ICS-Zoom-BG.jpg";
                const postSlug =
                  typeof post.slug === "object" ? post.slug.current : post.slug;
                return (
                  <article key={post._id} className="group flex flex-col">
                    <div className="relative aspect-[3/2] overflow-hidden bg-[var(--surface-2)] mb-5">
                      <Image
                        src={imgSrc}
                        alt={post.mainImage?.alt ?? post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/60 to-transparent" />
                    </div>
                    <time className="text-[10px] font-medium tracking-[0.25em] uppercase text-[var(--accent-dim)] mb-2">
                      {formatDate(post.publishedAt)}
                    </time>
                    <h3 className="font-[family-name:var(--font-serif)] text-lg font-semibold text-[var(--foreground)] mb-2 leading-snug">
                      <Link
                        href={`/news/${postSlug}`}
                        className="hover:text-[var(--accent)] transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-[var(--accent-dim)] leading-relaxed flex-1 mb-4">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/news/${postSlug}`}
                      className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--accent)] hover:text-[var(--foreground)] transition-colors flex items-center gap-2"
                    >
                      Continue Reading
                      <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Donate CTA band ── */}
        <section className="relative grain overflow-hidden bg-[var(--surface-2)] border-b border-[var(--border)]">
          <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-8 py-20 text-center">
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-4">
              501(c)(3) Non-Profit
            </p>
            <h2 className="font-[family-name:var(--font-serif)] text-2xl sm:text-4xl font-semibold italic text-[var(--foreground)] mb-5">
              Support independent cinema.
            </h2>
            <p className="text-xs text-[var(--accent-dim)] leading-relaxed mb-8 max-w-md mx-auto">
              Every donation goes directly toward grants for filmmakers, festival programming, and hands-on education with analog film.
            </p>
            <a
              href="https://www.networkforgood.org/donation/MakeDonation.aspx?ORGID2=823819440"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 bg-[var(--red)] text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-red-500 transition-colors"
            >
              Make a Donation
            </a>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
