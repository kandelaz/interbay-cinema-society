import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProgramAccordion from "./ProgramAccordion";
import { getFestivalBySlug, festivalEditions } from "@/data/festivalArchive";

export function generateStaticParams() {
  return festivalEditions.map((e) => ({ slug: e.slug }));
}

export const dynamicParams = false;

export default async function FestivalEditionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const edition = getFestivalBySlug(slug);

  if (!edition) notFound();

  const totalFilms =
    edition.filmCount ??
    edition.programs.reduce((sum, p) => sum + p.films.length, 0);
  const hasPrograms = edition.programs.length > 0;

  return (
    <>
      <Header />
      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="relative grain overflow-hidden bg-[var(--background)] min-h-[55vh] flex items-end">
          {edition.bannerImage && (
            <div className="absolute inset-0">
              <Image
                src={edition.bannerImage}
                alt={`Engauge ${edition.year}`}
                fill
                sizes="100vw"
                className="object-cover opacity-25"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/50 to-transparent" />
            </div>
          )}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-24 w-full">
            <Link
              href="/festival/archive"
              className="inline-block text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] hover:text-[var(--accent)] transition-colors mb-8"
            >
              &larr; All Editions
            </Link>
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-3">
              Engauge Experimental Film Festival &nbsp;&middot;&nbsp; {edition.venue}
            </p>
            <h1 className="font-[family-name:var(--font-serif)] text-6xl sm:text-9xl font-semibold text-[var(--foreground)] leading-none mb-4">
              {edition.year}
            </h1>
            <p className="text-xs tracking-widest uppercase text-[var(--accent-dim)]">{edition.dates}</p>
          </div>
        </section>

        {/* ── Overview ── */}
        <section className="bg-[var(--surface)] border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <p className="text-sm text-[var(--accent-dim)] leading-relaxed">{edition.description}</p>
                {edition.note && (
                  <p className="text-xs text-[var(--border)] mt-4 italic">{edition.note}</p>
                )}
              </div>
              <div className="flex flex-wrap lg:flex-col gap-8 lg:gap-6">
                {totalFilms > 0 && (
                  <div>
                    <p className="font-[family-name:var(--font-serif)] text-4xl text-[var(--foreground)]">{totalFilms}+</p>
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-[var(--accent-dim)] mt-1">Films</p>
                  </div>
                )}
                {edition.countryCount && (
                  <div>
                    <p className="font-[family-name:var(--font-serif)] text-4xl text-[var(--foreground)]">{edition.countryCount}</p>
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-[var(--accent-dim)] mt-1">Countries</p>
                  </div>
                )}
                {edition.programs.length > 0 && (
                  <div>
                    <p className="font-[family-name:var(--font-serif)] text-4xl text-[var(--foreground)]">{edition.programs.length}</p>
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-[var(--accent-dim)] mt-1">Programs</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Poster ── */}
        {edition.posterImage && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex justify-center">
              <div className="relative w-72 sm:w-96 shadow-2xl">
                <Image
                  src={edition.posterImage}
                  alt={`${edition.title} poster`}
                  width={600}
                  height={900}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </section>
        )}

        {/* ── Programs (client accordion) ── */}
        {hasPrograms && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="flex items-baseline justify-between mb-10">
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)]">
                {edition.year} Program
              </p>
              <p className="text-[10px] text-[var(--border)] tracking-wider hidden sm:block">
                Click a program to expand the film list
              </p>
            </div>
            <ProgramAccordion programs={edition.programs} />
          </section>
        )}

        {/* ── Footer nav ── */}
        <div className="border-t border-[var(--border)] bg-[var(--surface)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/festival/archive"
              className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] hover:text-[var(--accent)] transition-colors"
            >
              &larr; All Editions
            </Link>
            <Link
              href="/festival/submit"
              className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent)] hover:text-[var(--foreground)] transition-colors"
            >
              Submit to Engauge &rarr;
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
