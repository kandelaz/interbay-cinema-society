import Link from "next/link";
import { PortableText } from "@portabletext/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { getGrants } from "@/sanity/queries";

type Grant = {
  _id: string;
  title: string;
  slug: { current: string };
  type: "ics";
  deadline?: string;
  description?: string;
  amount?: number;
  body?: unknown[];
};

type Recipient = {
  name: string;
  project?: string;
  year?: number;
  location?: string;
};

const fallbackGrants: Grant[] = [
  {
    _id: "ics",
    title: "ICS Grants",
    slug: { current: "ics-grants" },
    type: "ics",
    deadline: "2026-07-01",
    amount: 1000,
    description:
      "Bi-annual $1,000 grants for US and international filmmakers working experimentally with celluloid film. Funds go toward digitization of your work at Colormatters in Seattle.",
  },
];

const faq = [
  {
    q: "Who is eligible to apply?",
    a: "Any filmmaker working experimentally with celluloid film — US-based or international. There are no restrictions on experience level or nationality.",
  },
  {
    q: "What does the grant cover?",
    a: "Each $1,000 grant is intended to cover the cost of having your celluloid work digitized at Colormatters in Seattle. Funds are paid directly to the lab on your behalf.",
  },
  {
    q: "How many grants are awarded per cycle?",
    a: "Approximately 10 grants are awarded each cycle, twice per year — with deadlines on January 1st and July 1st.",
  },
  {
    q: "Can I apply in consecutive cycles?",
    a: "Yes. Previous recipients are welcome to apply again in future cycles. There is no limit on how many times you may receive a grant.",
  },
  {
    q: "When will I hear back?",
    a: "Recipients are notified within 6–8 weeks of the application deadline.",
  },
  {
    q: "Do I need to have completed my film to apply?",
    a: "No — works in progress are eligible. You'll need to submit a screener link showing at least a significant portion of the work.",
  },
];

function formatDeadline(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function daysUntil(iso: string) {
  const diff = new Date(iso).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export default async function GrantsPage() {
  let grants: Grant[] = fallbackGrants;
  let allRecipients: Recipient[] = [];

  try {
    const data = await getGrants();
    if (data?.active?.length) grants = data.active;
    if (data?.recipients?.length) {
      allRecipients = data.recipients.flatMap((g: { recipients?: Recipient[] }) => g.recipients ?? []);
    }
  } catch {
    // use fallbacks
  }

  return (
    <>
      <Header />

      <main className="flex-1">

        <PageHero
          src="/assets/hero-grants.jpg"
          alt="Filmmakers in a screening room"
          eyebrow="Grants Program"
          title="Funding experimental celluloid film."
        />

        {/* ── Deadline timeline ── */}
        <section className="border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-8">
              Upcoming Deadlines
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--border)]">
              {grants.map((grant) => {
                const days = grant.deadline ? daysUntil(grant.deadline) : null;
                const urgent = days !== null && days <= 30;
                return (
                  <div key={grant._id} className="bg-[var(--background)] p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                      <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-2">
                        ICS Grant
                      </p>
                      <p className="font-[family-name:var(--font-serif)] text-xl font-semibold text-[var(--foreground)]">
                        {grant.title}
                      </p>
                      {grant.deadline && (
                        <p className="text-xs text-[var(--accent-dim)] mt-1">
                          Deadline: {formatDeadline(grant.deadline)}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-6">
                      {days !== null && (
                        <div className="text-right">
                          <p className={`font-[family-name:var(--font-serif)] text-3xl font-semibold ${urgent ? "text-[var(--red)]" : "text-[var(--accent)]"}`}>
                            {days}
                          </p>
                          <p className="text-[10px] tracking-widest uppercase text-[var(--accent-dim)]">days left</p>
                        </div>
                      )}
                      <Link
                        href="/grants/apply"
                        className="px-6 py-2.5 bg-[var(--red)] text-white text-xs font-semibold tracking-widest uppercase hover:bg-red-500 transition-colors shrink-0"
                      >
                        Apply
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Grant details ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {grants.map((grant) => (
              <div key={grant._id} className="border-t-2 border-[var(--accent-dim)] pt-8">
                <div className="flex items-baseline justify-between mb-4">
                  <h2 className="font-[family-name:var(--font-serif)] text-2xl font-semibold text-[var(--foreground)]">
                    {grant.title}
                  </h2>
                  {grant.amount && (
                    <span className="text-xs font-semibold tracking-widest uppercase text-[var(--accent)]">
                      ${grant.amount.toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-sm text-[var(--accent-dim)] leading-relaxed mb-6">
                  {grant.description}
                </p>
                {grant.body && (
                  <div className="text-xs text-[var(--accent-dim)] leading-relaxed space-y-3 mb-6">
                    <PortableText value={grant.body as Parameters<typeof PortableText>[0]["value"]} />
                  </div>
                )}
                <Link
                  href="/grants/apply"
                  className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--accent)] hover:text-[var(--foreground)] transition-colors"
                >
                  Apply for this grant &rarr;
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── Colormatters partnership ── */}
        <section className="bg-[var(--surface)] border-y border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-2">
                Lab Partner
              </p>
              <p className="font-[family-name:var(--font-serif)] text-xl text-[var(--foreground)] mb-1">
                Film scanning in partnership with Colormatters
              </p>
              <p className="text-xs text-[var(--accent-dim)]">
                Seattle's premier celluloid film scanning and processing lab.
              </p>
            </div>
            <a
              href="https://colormatters.tv"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-6 py-2.5 text-xs font-semibold tracking-widest uppercase border border-[var(--accent-dim)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--background)] hover:border-[var(--accent)] transition-all"
            >
              Visit Colormatters &rarr;
            </a>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-12">
            Frequently Asked Questions
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10">
            {faq.map((item) => (
              <div key={item.q}>
                <h3 className="font-[family-name:var(--font-serif)] text-base font-semibold text-[var(--foreground)] mb-2">
                  {item.q}
                </h3>
                <p className="text-xs text-[var(--accent-dim)] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Recipients ── */}
        {allRecipients.length > 0 && (
          <section className="bg-[var(--surface)] border-y border-[var(--border)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
              <div className="flex items-baseline justify-between mb-12">
                <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)]">
                  Past Recipients
                </p>
                <Link
                  href="/grants/recipients"
                  className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--accent-dim)] hover:text-[var(--accent)] transition-colors"
                >
                  View All &rarr;
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)]">
                {allRecipients.slice(0, 9).map((r, i) => (
                  <div key={i} className="bg-[var(--surface)] px-6 py-5">
                    <p className="text-sm font-medium text-[var(--foreground)]">{r.name}</p>
                    {r.project && <p className="text-xs text-[var(--accent-dim)] mt-0.5 italic">{r.project}</p>}
                    {(r.location || r.year) && (
                      <p className="text-[10px] text-[var(--accent-dim)] opacity-60 mt-1 tracking-wide">
                        {[r.location, r.year].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Apply CTA ── */}
        <section className="bg-[var(--surface-2)] border-t border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <p className="font-[family-name:var(--font-serif)] text-2xl sm:text-4xl font-semibold italic text-[var(--foreground)] mb-4">
              Ready to apply?
            </p>
            <p className="text-xs text-[var(--accent-dim)] mb-8">
              Deadlines: January 1st and July 1st each year. No entry fee.
            </p>
            <Link
              href="/grants/apply"
              className="inline-block px-10 py-4 bg-[var(--red)] text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-red-500 transition-colors"
            >
              Apply for a Grant
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
