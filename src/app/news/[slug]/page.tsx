import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPostBySlug, getAllPosts } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    return (posts ?? []).map((p: { slug: { current: string } }) => ({ slug: p.slug.current }));
  } catch {
    return [];
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

const portableTextComponents = {
  types: {
    image: ({ value }: { value: { asset: unknown; alt?: string } }) => (
      <div className="my-10 relative aspect-video overflow-hidden bg-[var(--surface-2)]">
        <Image
          src={urlFor(value).width(1200).url()}
          alt={value.alt ?? ""}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
        />
      </div>
    ),
  },
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-sm text-[var(--accent-dim)] leading-relaxed mb-5">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-[family-name:var(--font-serif)] text-2xl font-semibold text-[var(--foreground)] mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-[family-name:var(--font-serif)] text-xl font-semibold text-[var(--foreground)] mt-8 mb-3">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-2 border-[var(--accent-dim)] pl-6 my-8 font-[family-name:var(--font-serif)] text-lg italic text-[var(--foreground)]">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-[var(--foreground)]">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => <em>{children}</em>,
    link: ({ value, children }: { value?: { href: string }; children?: React.ReactNode }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--accent)] hover:text-[var(--foreground)] underline underline-offset-2 transition-colors"
      >
        {children}
      </a>
    ),
  },
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post = null;

  try {
    post = await getPostBySlug(slug);
  } catch {
    // fall through to notFound
  }

  if (!post) notFound();

  return (
    <>
      <Header />

      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="bg-[var(--surface)] border-b border-[var(--border)]">
          {post.mainImage && (
            <div className="relative w-full h-[50vh] overflow-hidden bg-[var(--surface-2)]">
              <Image
                src={urlFor(post.mainImage).width(1600).url()}
                alt={post.mainImage.alt ?? post.title}
                fill
                sizes="100vw"
                className="object-cover opacity-40"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] to-transparent" />
            </div>
          )}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link
              href="/news"
              className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] hover:text-[var(--accent)] transition-colors mb-6 inline-block"
            >
              &larr; All News
            </Link>
            <h1 className="font-[family-name:var(--font-serif)] text-3xl sm:text-5xl font-semibold text-[var(--foreground)] leading-tight mb-6">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-[10px] tracking-widest uppercase text-[var(--accent-dim)]">
              <time>{formatDate(post.publishedAt)}</time>
              {post.author && (
                <>
                  <span className="text-[var(--border)]">·</span>
                  <span>{post.author}</span>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ── Body ── */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {post.excerpt && !post.body && (
            <p className="text-base text-[var(--accent-dim)] leading-relaxed">{post.excerpt}</p>
          )}
          {post.body && (
            <PortableText value={post.body} components={portableTextComponents} />
          )}
        </article>

        {/* ── Back link ── */}
        <div className="border-t border-[var(--border)] bg-[var(--surface)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-between items-center">
            <Link
              href="/news"
              className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] hover:text-[var(--accent)] transition-colors"
            >
              &larr; All News
            </Link>
            <Link
              href="/grants/apply"
              className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent)] hover:text-[var(--foreground)] transition-colors"
            >
              Apply for a Grant &rarr;
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}
