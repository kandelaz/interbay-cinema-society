import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getArchiveEditions } from "@/data/festivalArchive";

const allEditions = getArchiveEditions();

// 2020 — no festival
const NO_FESTIVAL_YEARS = [2020];

export default function ArchivePage() {
  return (
    <>
      <Header />

      <main className="flex-1">

        {/* ── Page header ── */}
        <section className="bg-[var(--surface)] border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-4">Festival</p>
            <h1 className="font-[family-name:var(--font-serif)] text-4xl sm:text-6xl font-semibold text-[var(--foreground)] leading-tight">
              Archive.
            </h1>
            <p className="text-sm text-[var(--accent-dim)] leading-relaxed mt-4 max-w-xl">
              Eight years of sprocket-driven, artist-made experimental film from around the world.
            </p>
          </div>
        </section>

        {/* ── Edition grid ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {allEditions.map((edition) => (
              <Link
                key={edition.slug}
                href={`/festival/${edition.slug}`}
                className="group relative flex flex-col overflow-hidden border border-[var(--border)] hover:border-[var(--accent-dim)] transition-colors"
              >
                {/* Banner image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-[var(--surface-2)]">
                  <Image
                    src={edition.bannerImage}
                    alt={edition.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  {/* Year overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/90 to-transparent" />
                  <span className="absolute bottom-4 left-5 font-[family-name:var(--font-serif)] text-5xl font-semibold text-[var(--foreground)] leading-none">
                    {edition.year}
                  </span>
                </div>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-[10px] font-medium tracking-widest uppercase text-[var(--accent-dim)] mb-2">
                    {edition.dates}
                  </p>
                  <p className="text-xs text-[var(--accent-dim)] leading-relaxed flex-1 line-clamp-2">
                    {edition.description}
                  </p>
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[var(--border)]">
                    {edition.filmCount && (
                      <span className="text-[10px] text-[var(--border)]">{edition.filmCount}+ films</span>
                    )}
                    {edition.countryCount && (
                      <span className="text-[10px] text-[var(--border)]">{edition.countryCount} countries</span>
                    )}
                    <span className="ml-auto text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--accent)] group-hover:text-[var(--foreground)] transition-colors">
                      View &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}

            {/* 2020 — no festival card */}
            {NO_FESTIVAL_YEARS.map((year) => (
              <div
                key={year}
                className="relative flex flex-col overflow-hidden border border-[var(--border)] border-dashed opacity-50"
              >
                <div className="relative aspect-[16/9] bg-[var(--surface)] flex items-center justify-center">
                  <span className="font-[family-name:var(--font-serif)] text-5xl font-semibold text-[var(--border)]">
                    {year}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-medium tracking-widest uppercase text-[var(--border)] mb-2">No Festival</p>
                  <p className="text-xs text-[var(--border)] leading-relaxed">
                    Engauge {year} was cancelled due to the COVID-19 pandemic.
                  </p>
                </div>
              </div>
            ))}

          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-[var(--surface)] border-t border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-2">Next Edition</p>
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
