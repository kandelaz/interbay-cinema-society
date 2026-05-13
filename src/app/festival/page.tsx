import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCurrentFestival } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { getFestivalBySlug } from "@/data/festivalArchive";

const fallbackFestival = {
  title: "Engauge 2025",
  year: 2025,
  dates: "November 6–8, 2025",
  venue: "Northwest Film Forum, Seattle",
  description:
    "The Engauge Experimental Film Festival showcases artist-made celluloid work from around the world — handmade, optically printed, direct animation, and beyond. All work featured in the festival originates on film stock.",
  trailerUrl: null,
  submissionsOpen: true,
  submissionDeadline: "2025-08-15",
  posterImage: null,
  body: null,
  highlights: null as null | { title: string; director: string; country?: string; format?: string; description?: string }[],
};

function formatDeadline(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default async function FestivalPage() {
  let current = fallbackFestival;

  try {
    const cur = await getCurrentFestival();
    if (cur) current = { ...fallbackFestival, ...cur };
  } catch {
    // use fallback
  }

  // Pull previous year's highlights for the "looking back" section
  const prevYear = current.year - 1;
  const prevEdition = getFestivalBySlug(String(prevYear));

  return (
    <>
      <Header />

      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="relative grain overflow-hidden bg-[var(--background)] min-h-screen flex items-center">
          {current.posterImage ? (
            <div className="absolute inset-0">
              <Image
                src={urlFor(current.posterImage).width(1600).url()}
                alt={(current.posterImage as { alt?: string }).alt ?? current.title}
                fill sizes="100vw"
                className="object-cover opacity-30"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/60 to-transparent" />
            </div>
          ) : (
            <>
              <div
                className="absolute"
                style={{ inset: "-8px", filter: "blur(3px) brightness(0.75)" }}
              >
                <Image
                  src="/assets/hero-festival.jpg"
                  alt="Engauge Experimental Film Festival"
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-black/[0.275]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/60 to-transparent" />
            </>
          )}

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-6">
              Annual Festival &nbsp;·&nbsp; {current.venue}
            </p>
            <h1 className="font-[family-name:var(--font-serif)] leading-none mb-6">
              <span className="block text-[var(--foreground)] text-3xl sm:text-5xl font-semibold tracking-widest uppercase mb-1">Engauge Experimental Film Festival</span>
              <span className="block text-8xl sm:text-[10rem] font-semibold text-[var(--foreground)]">{current.year}</span>
            </h1>
            {current.dates && (
              <p className="text-xs tracking-widest uppercase text-[var(--accent-dim)] mb-10">{current.dates}</p>
            )}
            <div className="flex flex-wrap gap-4">
              {current.submissionsOpen && (
                <Link
                  href="/festival/submit"
                  className="px-8 py-3.5 bg-[var(--red)] text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-red-500 transition-colors"
                >
                  Submit a Film
                </Link>
              )}
              <Link
                href="/festival/archive"
                className="px-8 py-3.5 border border-[var(--accent-dim)] text-[var(--accent)] text-xs font-semibold tracking-[0.2em] uppercase hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--background)] transition-all"
              >
                Past Editions
              </Link>
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-4">About Engauge</p>
              <p className="text-sm sm:text-base text-[var(--accent-dim)] leading-relaxed mb-8">
                {current.description}
              </p>
              {current.body && (
                <div className="text-sm text-[var(--accent-dim)] leading-relaxed space-y-4">
                  <PortableText value={current.body} />
                </div>
              )}
            </div>

            {/* Submission card or trailer */}
            <div>
              {current.trailerUrl ? (
                <div className="relative aspect-video bg-[var(--surface-2)] overflow-hidden">
                  <iframe
                    src={(current.trailerUrl as string)
                      .replace("vimeo.com/", "player.vimeo.com/video/")
                      .replace("youtu.be/", "www.youtube.com/embed/")
                      .replace("watch?v=", "embed/")}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="bg-[var(--surface)] border border-[var(--border)] p-10 h-full flex flex-col justify-center">
                  <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-3">
                    Film Submissions
                  </p>
                  {current.submissionsOpen ? (
                    <>
                      <p className="font-[family-name:var(--font-serif)] text-2xl text-[var(--foreground)] mb-3">
                        Now accepting submissions.
                      </p>
                      {current.submissionDeadline && (
                        <p className="text-xs text-[var(--accent-dim)] mb-8">
                          Deadline: {formatDeadline(current.submissionDeadline)}
                        </p>
                      )}
                      <ul className="space-y-2 mb-8">
                        {["Work must originate on film stock", "All gauges welcome (Super 8, 16mm, 35mm)", "International submissions open", "No charge to submit"].map((item) => (
                          <li key={item} className="flex gap-3 text-xs text-[var(--accent-dim)]">
                            <span className="text-[var(--red)] shrink-0">◎</span>{item}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/festival/submit"
                        className="self-start px-8 py-3.5 bg-[var(--red)] text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-red-500 transition-colors"
                      >
                        Submit a Film &rarr;
                      </Link>
                    </>
                  ) : (
                    <>
                      <p className="font-[family-name:var(--font-serif)] text-2xl text-[var(--foreground)] mb-3">
                        Submissions open soon.
                      </p>
                      <p className="text-xs text-[var(--accent-dim)]">
                        Join our mailing list to be notified when the call for entries opens.
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Previous year highlights ── */}
        {prevEdition && (
          <section className="bg-[var(--surface)] border-y border-[var(--border)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-3">
                    Looking Back
                  </p>
                  <h2 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl font-semibold text-[var(--foreground)]">
                    Engauge {prevYear}
                  </h2>
                  <p className="text-xs text-[var(--accent-dim)] mt-2 tracking-wide">{prevEdition.dates}</p>
                </div>
                <Link
                  href={`/festival/${prevYear}`}
                  className="hidden sm:block text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--accent)] hover:text-[var(--foreground)] transition-colors shrink-0"
                >
                  Full Program &rarr;
                </Link>
              </div>

              {/* Highlights: image strip from previous festival */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
                {[
                  "/assets/festival-2024-banner.jpg",
                  "/assets/festival-2023-banner.jpg",
                  "/assets/festival-2022-banner.jpg",
                ].map((src, i) => (
                  <div key={i} className={`relative overflow-hidden bg-[var(--surface-2)] ${i === 0 ? "col-span-2 sm:col-span-1" : ""}`}>
                    <div className="aspect-video">
                      <Image
                        src={src}
                        alt={`Engauge ${prevYear - i} highlight`}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-sm text-[var(--accent-dim)] leading-relaxed max-w-2xl mb-6">
                {prevEdition.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/festival/${prevYear}`}
                  className="px-8 py-3.5 border border-[var(--accent-dim)] text-[var(--accent)] text-xs font-semibold tracking-[0.2em] uppercase hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--background)] transition-all"
                >
                  View {prevYear} Full Program
                </Link>
                <Link
                  href="/festival/archive"
                  className="px-8 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent-dim)] hover:text-[var(--foreground)] transition-colors"
                >
                  All Editions
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ── What to expect ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-10">What to Expect</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Sprocket-driven", body: "Every film screened at Engauge originates on physical film stock — Super 8, 16mm, or 35mm." },
              { label: "World Cinema", body: "Films from dozens of countries, from established artists and first-time filmmakers alike." },
              { label: "Expanded Cinema", body: "Multi-projector performances, live sound accompaniment, and immersive one-of-a-kind events." },
              { label: "Community", body: "Filmmakers, educators, and film lovers converging in Seattle for four nights each November." },
            ].map((item) => (
              <div key={item.label} className="border-t border-[var(--border)] pt-6">
                <p className="font-[family-name:var(--font-serif)] text-lg font-semibold text-[var(--foreground)] mb-3">{item.label}</p>
                <p className="text-xs text-[var(--accent-dim)] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Submit CTA ── */}
        <section className="bg-[var(--surface-2)] border-t border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-2">Filmmakers</p>
              <p className="font-[family-name:var(--font-serif)] text-xl sm:text-2xl text-[var(--foreground)]">
                Working with celluloid? We want to see your film.
              </p>
            </div>
            <Link
              href="/festival/submit"
              className="shrink-0 px-8 py-3.5 bg-[var(--red)] text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-red-500 transition-colors"
            >
              Submit a Film
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
