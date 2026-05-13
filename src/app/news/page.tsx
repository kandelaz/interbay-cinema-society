import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { getAllPosts } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  mainImage?: { asset: unknown; alt?: string };
};

const fallbackPosts: Post[] = [
  {
    _id: "1",
    title: "ICS Grants January 2026",
    slug: { current: "ics-grants-january-2026" },
    publishedAt: "2025-12-31",
    excerpt: "The Interbay Cinema Society is delighted to unveil our newest cycle of ICS Grants for January 2026.",
  },
  {
    _id: "2",
    title: "Sound, Light, Movement: Solo Cello + Handmade Film",
    slug: { current: "sound-light-movement" },
    publishedAt: "2025-07-21",
    excerpt: "Experimental films with a live score by Lori Goldston — an evening of handmade celluloid work paired with improvised music.",
  },
  {
    _id: "3",
    title: "ICS Grants July 2025",
    slug: { current: "ics-grants-july-2025" },
    publishedAt: "2025-07-01",
    excerpt: "The Interbay Cinema Society is delighted to unveil our newest cycle of ICS Grants for July 2025.",
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default async function NewsPage() {
  let posts: Post[] = fallbackPosts;
  try {
    const fetched = await getAllPosts();
    if (fetched?.length) posts = fetched;
  } catch {
    // use fallback
  }

  const [featured, ...rest] = posts;

  return (
    <>
      <Header />

      <main className="flex-1">

        <PageHero
          src="/assets/hero-news.jpg"
          alt="Interbay Cinema Society at Northwest Film Forum"
          eyebrow="News"
          title="Latest from ICS."
        />

        {/* ── Featured post ── */}
        {featured && (
          <section className="border-b border-[var(--border)]">
            <Link href={`/news/${featured.slug.current}`} className="group block">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="relative aspect-[16/9] overflow-hidden bg-[var(--surface-2)]">
                    {featured.mainImage ? (
                      <Image
                        src={urlFor(featured.mainImage).width(1200).url()}
                        alt={featured.mainImage.alt ?? featured.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        priority
                      />
                    ) : (
                      <Image
                        src="/assets/logo-white.svg"
                        alt="ICS"
                        width={80}
                        height={80}
                        className="absolute inset-0 m-auto opacity-10"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-3">
                      Latest Post
                    </p>
                    <h2 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl font-semibold text-[var(--foreground)] leading-snug mb-4 group-hover:text-[var(--accent)] transition-colors">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="text-sm text-[var(--accent-dim)] leading-relaxed mb-6">{featured.excerpt}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <time className="text-[10px] tracking-widest uppercase text-[var(--accent-dim)]">
                        {formatDate(featured.publishedAt)}
                      </time>
                      <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--accent)] group-hover:text-[var(--foreground)] transition-colors">
                        Read More &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* ── Post grid ── */}
        {rest.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((post) => (
                <article key={post._id} className="group flex flex-col">
                  <Link href={`/news/${post.slug.current}`} className="flex flex-col flex-1">
                    <div className="relative aspect-[3/2] overflow-hidden bg-[var(--surface-2)] mb-5">
                      {post.mainImage ? (
                        <Image
                          src={urlFor(post.mainImage).width(800).url()}
                          alt={post.mainImage.alt ?? post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                      ) : (
                        <Image
                          src="/assets/logo-white.svg"
                          alt="ICS"
                          width={50}
                          height={50}
                          className="absolute inset-0 m-auto opacity-10"
                        />
                      )}
                    </div>
                    <time className="text-[10px] font-medium tracking-[0.25em] uppercase text-[var(--accent-dim)] mb-2">
                      {formatDate(post.publishedAt)}
                    </time>
                    <h3 className="font-[family-name:var(--font-serif)] text-lg font-semibold text-[var(--foreground)] mb-2 leading-snug group-hover:text-[var(--accent)] transition-colors flex-1">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-xs text-[var(--accent-dim)] leading-relaxed mb-4">{post.excerpt}</p>
                    )}
                    <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--accent)] group-hover:text-[var(--foreground)] transition-colors">
                      Read More &rarr;
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

      </main>

      <Footer />
    </>
  );
}
