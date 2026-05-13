import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { getAboutPage } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

// Fallback content shown until Sanity is populated
const fallback = {
  missionStatement:
    "Interbay Cinema Society provides material support for filmmakers working experimentally with celluloid film — through grants, festivals, education, and community.",
  founder: {
    name: "Jon Behrens",
    years: "1964–2022",
    quote: "Keep making films and together we can make this world a better place.",
    bio: null,
    image: null,
  },
  pillars: [
    { title: "Grants", description: "Bi-annual $1,000 ICS Grants for experimental celluloid filmmakers worldwide — over $200,000 awarded to date.", icon: "◎" },
    { title: "Festival", description: "The Engauge Experimental Film Festival, held annually in Seattle, showcases artist-made celluloid work from around the world.", icon: "▷" },
    { title: "Education", description: "Hands-on workshops and community screenings that foster learning with analog film processes and build the next generation of celluloid artists.", icon: "◻" },
  ],
  team: [] as { name: string; role: string; bio: string; image: null }[],
  pressKitUrl: null,
  extraContent: null,
};

export default async function AboutPage() {
  let data = fallback;
  try {
    const fetched = await getAboutPage();
    if (fetched) data = { ...fallback, ...fetched };
  } catch {
    // use fallback
  }

  const { missionStatement, founder, pillars, team, pressKitUrl, extraContent } = data;

  return (
    <>
      <Header />

      <main className="flex-1">

        <PageHero
          src="/assets/hero-about.jpg"
          alt="Experimental film still"
          eyebrow="About"
          title="Supporting experimental cinema since 2017."
        />

        {/* ── Mission ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-6">
                Our Mission
              </p>
              <p className="font-[family-name:var(--font-serif)] text-xl sm:text-2xl text-[var(--foreground)] leading-relaxed">
                {missionStatement}
              </p>
            </div>
            <div className="lg:pt-8 border-l border-[var(--border)] pl-10 hidden lg:block">
              <p className="text-xs text-[var(--accent-dim)] leading-relaxed">
                ICS was founded in Seattle, WA in 2017 with the belief that experimental celluloid filmmaking deserves dedicated institutional support — not as a nostalgic curiosity, but as a living, vital art form.
              </p>
            </div>
          </div>
        </section>

        {/* ── Pillars ── */}
        {pillars?.length > 0 && (
          <section className="bg-[var(--surface)] border-y border-[var(--border)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-12">
                What We Do
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)]">
                {pillars.map((p) => (
                  <div key={p.title} className="bg-[var(--surface)] p-8 sm:p-10">
                    {p.icon && (
                      <span className="text-2xl text-[var(--accent-dim)] mb-5 block">{p.icon}</span>
                    )}
                    <h3 className="font-[family-name:var(--font-serif)] text-xl font-semibold text-[var(--foreground)] mb-3">
                      {p.title}
                    </h3>
                    <p className="text-xs text-[var(--accent-dim)] leading-relaxed">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Founder tribute ── */}
        {founder && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              {/* Photo */}
              <div className="relative">
                {founder.image ? (
                  <div className="relative aspect-[3/4] overflow-hidden bg-[var(--surface-2)]">
                    <Image
                      src={urlFor(founder.image).width(800).url()}
                      alt={(founder.image as { alt?: string }).alt ?? founder.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-[3/4] overflow-hidden bg-[var(--surface-2)]">
                    <Image
                      src="/assets/Jon-Behrens.webp"
                      alt="Jon Behrens"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-top"
                    />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[var(--background)] to-transparent">
                  <p className="font-[family-name:var(--font-serif)] text-lg font-semibold text-[var(--foreground)]">
                    {founder.name}
                  </p>
                  <p className="text-xs tracking-widest uppercase text-[var(--accent-dim)]">
                    Founder &nbsp;·&nbsp; {founder.years}
                  </p>
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col justify-center">
                <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-6">
                  In Memoriam
                </p>
                {founder.quote && (
                  <blockquote className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl italic text-[var(--foreground)] leading-snug mb-8 border-l-2 border-[var(--accent-dim)] pl-6">
                    &ldquo;{founder.quote}&rdquo;
                  </blockquote>
                )}
                {founder.bio ? (
                  <div className="prose prose-sm prose-invert text-[var(--accent-dim)] leading-relaxed">
                    <PortableText value={founder.bio} />
                  </div>
                ) : (
                  <p className="text-sm text-[var(--accent-dim)] leading-relaxed">
                    Jon Behrens founded Interbay Cinema Society in 2017 to provide goods and services
                    to filmmakers working outside the mainstream conception of filmmaking. A lifelong
                    champion of experimental celluloid film, Jon passed away in 2022 — but his vision
                    continues to guide everything ICS does.
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── Team ── */}
        {team?.length > 0 && (
          <section className="bg-[var(--surface)] border-y border-[var(--border)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-12">
                Team & Volunteers
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                {team.map((member) => (
                  <div key={member.name}>
                    <div className="aspect-square bg-[var(--surface-2)] border border-[var(--border)] mb-3 overflow-hidden">
                      {member.image ? (
                        <Image
                          src={urlFor(member.image).width(400).url()}
                          alt={member.name}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[var(--border)] text-4xl font-serif">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">{member.name}</p>
                    <p className="text-xs text-[var(--accent-dim)] tracking-wide">{member.role}</p>
                    {member.bio && <p className="text-xs text-[var(--accent-dim)] mt-1 leading-relaxed opacity-70">{member.bio}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Extra content ── */}
        {extraContent && (
          <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="prose prose-sm prose-invert text-[var(--accent-dim)] leading-relaxed">
              <PortableText value={extraContent} />
            </div>
          </section>
        )}

        {/* ── Press + CTA ── */}
        <section className="bg-[var(--surface-2)] border-y border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-2">
                Press & Media
              </p>
              <p className="text-xs text-[var(--accent-dim)] leading-relaxed max-w-sm">
                For press inquiries, interview requests, or festival coverage, download our media kit or get in touch.
              </p>
            </div>
            <div className="flex gap-4 flex-wrap">
              {pressKitUrl && (
                <a
                  href={pressKitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 text-xs font-semibold tracking-widest uppercase border border-[var(--accent-dim)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--background)] hover:border-[var(--accent)] transition-all"
                >
                  Download Press Kit
                </a>
              )}
              <Link
                href="/contact"
                className="px-6 py-2.5 text-xs font-semibold tracking-widest uppercase border border-[var(--border)] text-[var(--accent-dim)] hover:border-[var(--accent-dim)] hover:text-[var(--foreground)] transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
