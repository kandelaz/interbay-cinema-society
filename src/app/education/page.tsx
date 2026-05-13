import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { getWorkshops } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

type Workshop = {
  _id: string;
  title: string;
  slug: { current: string };
  date?: string;
  instructor?: string;
  location?: string;
  description?: string;
  image?: object;
  registrationUrl?: string;
  archiveFilms?: { title: string; filmmaker?: string; vimeoUrl?: string }[];
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

export default async function EducationPage() {
  let upcoming: Workshop[] = [];
  let past: Workshop[] = [];

  try {
    const data = await getWorkshops();
    upcoming = data?.upcoming ?? [];
    past = data?.past ?? [];
  } catch {
    // empty — placeholder state shown
  }

  return (
    <>
      <Header />

      <main className="flex-1">

        <PageHero
          src="/assets/hero-education.jpg"
          alt="ICS workshop participants working with analog film"
          eyebrow="Education"
          title="Hands-on learning with analog film."
        />

        {/* ── Upcoming workshops ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-10">
            Upcoming Workshops
          </p>

          {upcoming.length === 0 ? (
            <div className="border border-[var(--border)] p-12 text-center">
              <p className="font-[family-name:var(--font-serif)] text-xl text-[var(--foreground)] mb-3">
                More workshops coming soon.
              </p>
              <p className="text-xs text-[var(--accent-dim)] mb-8">
                Subscribe to our newsletter to be notified when new workshops are announced.
              </p>
              <Link
                href="/#newsletter"
                className="px-8 py-3.5 border border-[var(--accent-dim)] text-[var(--accent)] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[var(--accent)] hover:text-[var(--background)] hover:border-[var(--accent)] transition-all"
              >
                Stay Notified
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcoming.map((w) => (
                <div key={w._id} className="group border border-[var(--border)] hover:border-[var(--accent-dim)] transition-colors">
                  {w.image && (
                    <div className="relative aspect-video overflow-hidden bg-[var(--surface-2)]">
                      <Image
                        src={urlFor(w.image).width(800).url()}
                        alt={(w.image as { alt?: string }).alt ?? w.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-8">
                    {w.date && (
                      <p className="text-[10px] font-semibold tracking-widest uppercase text-[var(--accent-dim)] mb-2">
                        {formatDate(w.date)}
                      </p>
                    )}
                    <h3 className="font-[family-name:var(--font-serif)] text-xl font-semibold text-[var(--foreground)] mb-2">
                      {w.title}
                    </h3>
                    {w.instructor && (
                      <p className="text-xs text-[var(--accent-dim)] mb-3">with {w.instructor}</p>
                    )}
                    {w.location && (
                      <p className="text-xs text-[var(--accent-dim)] mb-4 opacity-70">{w.location}</p>
                    )}
                    {w.description && (
                      <p className="text-xs text-[var(--accent-dim)] leading-relaxed mb-6">{w.description}</p>
                    )}
                    {w.registrationUrl && (
                      <a
                        href={w.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-2.5 bg-[var(--red)] text-white text-xs font-semibold tracking-widest uppercase hover:bg-red-500 transition-colors"
                      >
                        Register &rarr;
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Past workshops + archive ── */}
        {past.length > 0 && (
          <section className="bg-[var(--surface)] border-y border-[var(--border)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-10">
                Workshop Archive
              </p>
              <div className="space-y-12">
                {past.map((w) => (
                  <div key={w._id} className="grid grid-cols-1 lg:grid-cols-3 gap-8 border-t border-[var(--border)] pt-10">
                    <div>
                      {w.image && (
                        <div className="relative aspect-video overflow-hidden bg-[var(--surface-2)] mb-4">
                          <Image
                            src={urlFor(w.image).width(600).url()}
                            alt={(w.image as { alt?: string }).alt ?? w.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 33vw"
                            className="object-cover"
                          />
                        </div>
                      )}
                      {w.date && (
                        <p className="text-[10px] tracking-widest uppercase text-[var(--accent-dim)] opacity-60">
                          {new Date(w.date).getFullYear()}
                        </p>
                      )}
                      <h3 className="font-[family-name:var(--font-serif)] text-lg font-semibold text-[var(--foreground)] mt-1">
                        {w.title}
                      </h3>
                      {w.instructor && (
                        <p className="text-xs text-[var(--accent-dim)] mt-1">with {w.instructor}</p>
                      )}
                    </div>
                    {w.archiveFilms && w.archiveFilms.length > 0 && (
                      <div className="lg:col-span-2">
                        <p className="text-[10px] font-semibold tracking-widest uppercase text-[var(--accent-dim)] mb-4">
                          Films from this workshop
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {w.archiveFilms.map((film, i) => (
                            <div key={i} className="flex items-start justify-between gap-4 py-3 border-b border-[var(--border)]">
                              <div>
                                <p className="text-sm text-[var(--foreground)]">{film.title}</p>
                                {film.filmmaker && (
                                  <p className="text-xs text-[var(--accent-dim)]">{film.filmmaker}</p>
                                )}
                              </div>
                              {film.vimeoUrl && (
                                <a
                                  href={film.vimeoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[10px] font-semibold tracking-widest uppercase text-[var(--accent)] hover:text-[var(--foreground)] transition-colors shrink-0"
                                >
                                  Watch &rarr;
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Newsletter CTA ── */}
        <section className="bg-[var(--surface-2)] border-t border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-2">Stay in the Loop</p>
              <p className="font-[family-name:var(--font-serif)] text-xl text-[var(--foreground)]">
                New workshops announced by email first.
              </p>
            </div>
            <Link
              href="/#newsletter"
              className="shrink-0 px-8 py-3.5 border border-[var(--accent-dim)] text-[var(--accent)] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[var(--accent)] hover:text-[var(--background)] hover:border-[var(--accent)] transition-all"
            >
              Subscribe
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
