"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Cycle = {
  period: string;
  month: "January" | "July";
  year: number;
  recipients: string[];
};

const cycles: Cycle[] = [
  {
    period: "July 2016", month: "July", year: 2016,
    recipients: ["Caryn Cline", "Andy Spletzer", "Doug Lane", "Joel Schlemowitz", "Jeanne Liotta", "Janice Findley", "Eric Ostrowski", "Brian Short", "Reed O'Beirne", "Don Meek"],
  },
  {
    period: "January 2017", month: "January", year: 2017,
    recipients: ["Pam Minty", "Luke Sieczek", "Webster Crowell", "Jason Gutz", "Linda Fenstermaker", "Steve Demas", "Ben Popp", "Denah Johnston", "Erik Hammen", "Ryan K. Adam"],
  },
  {
    period: "July 2017", month: "July", year: 2017,
    recipients: ["Mike Stoltz", "Cynthia Madansky", "Vanessa Renwick", "Dominic Angerame", "Mark Brunke", "Rodney Evans", "Laida Lertxundi", "Sam Hamilton", "Charles Chadwick", "Julie Murray"],
  },
  {
    period: "January 2018", month: "January", year: 2018,
    recipients: ["Devon Damonte", "Ruth Hayes", "Martha Coburn", "Richard Reeves", "Deborah Stratton", "Nisha Platzer", "Georg Kozulinski", "Mathias Bo", "Josh Weissbach", "Lori Iris"],
  },
  {
    period: "July 2018", month: "July", year: 2018,
    recipients: ["Vera Brunner-Sung", "Sandra Davis", "Carl George", "Lynn Marie Kirby", "Kerry Laitala", "Cynthia Madansky", "Andrew Mausert-Mooney", "Nina Menkes", "Linda Scobie", "Phil Solomon"],
  },
  {
    period: "January 2019", month: "January", year: 2019,
    recipients: ["Kate Brown", "Charles Cadkin", "Cathy Lee Crane", "Seth Fein", "Lyra Hill", "Anna Kipervaser", "Brigid McCaffrey", "Kristin Reeves", "Margaret Rorison", "Eric Theise"],
  },
  {
    period: "July 2019", month: "July", year: 2019,
    recipients: ["Stephen Broomer", "Kate Lain", "Raymond Rea", "Josh Gibson", "Robbie Land", "Alee Peoples", "Lisa Danker", "Janis Crystal Lipzin", "Deborah Shaffer", "Shane Eason"],
  },
  {
    period: "January 2020", month: "January", year: 2020,
    recipients: ["Luis Gutierrez Arias", "Tamer Hassan and Armand Tufenkien", "Leanna Kaiser", "Nicholas Kovats", "Sandy McLennan", "Margot Niederland", "Grace Sloan", "Scott Stark", "Michael Woods"],
  },
  {
    period: "July 2020", month: "July", year: 2020,
    recipients: ["Nicole Baker", "Craig Baldwin", "Chris Gude", "Colleen TungShuen Kwok", "Jean-Jacques Martinod and Bretta C. Walker", "Emma Piper-Burket", "Lourdes Portillo", "Wenhua Shi", "Janelle VankerKelen", "Brian Wilson"],
  },
  {
    period: "January 2021", month: "January", year: 2021,
    recipients: ["Stephanie Barber", "Sarah Bliss", "Carl Elsaesser", "Sandra Gibson + Luis Recoder", "Kamila Kuc", "Chris Lange", "Miles Sprietsma", "Michelle Trujillo", "Naomi Uman", "Danielle Wakin"],
  },
  {
    period: "July 2021", month: "July", year: 2021,
    recipients: ["Betzy Bromberg", "Sofia Canales", "Zachary Epcar", "Nina Fonoroff", "Serge Gregory", "Traci Hercher", "Andrew Kim + Ojoboca", "Alex Morelli", "Adam Sekular", "Jean Sousa"],
  },
  {
    period: "January 2022", month: "January", year: 2022,
    recipients: ["Mel Friedling", "Stefan Grabowski", "Diane Kitchen", "Daniel Maldonado", "Carleen Maur", "A. Moon", "Justin Rhody", "Fabio Roberti", "Barron Sherer", "Al Wong"],
  },
  {
    period: "July 2022", month: "July", year: 2022,
    recipients: ["Martín Baus", "Sandra Davis", "Sandro Del Rosario", "Karel Doing", "Anna Kipervaser", "Jesse Lerner", "Alex MacKenzie", "Tomonari Nishikawa", "Felicity Palma", "João Vieira"],
  },
  {
    period: "January 2023", month: "January", year: 2023,
    recipients: ["Amanda Thomson", "Charles Cadkin", "Devon Damonte", "Dominic Angerame", "Greta Snider", "Lilan Yang", "Lili Chin", "Lourdes Portillo", "Tetsuya Maruyama", "Ursula Brookbank"],
  },
  {
    period: "July 2023", month: "July", year: 2023,
    recipients: ["Bill Basquin", "Emily Chao", "Janice Findley", "Brittany Gravelly", "Kate E. Hinshaw", "Lynn Marie Kirby", "Robbie Land", "Ryan Marino", "Lindsay McIntyre", "Wenhua Shi"],
  },
  {
    period: "January 2024", month: "January", year: 2024,
    recipients: ["Patrick Connolly", "Lisa Danker", "Traci Hercher", "Christophe Katrib", "Benjamin Kujawski", "Kathleen Rugh", "Jeffrey Skoller", "Syl Sutton", "Moira Tierney", "Timoleon Wilkins"],
  },
  {
    period: "July 2024", month: "July", year: 2024,
    recipients: ["Sean Bokenkamp", "Madison Brookshire", "Jonathan Johnson", "Leanna Kaiser", "Abinadi Meza", "Pam Minty + Christi Denton", "Jenny Nirgends", "Danielle Watkin", "Doug Wendt", "Darryl Wharton-Rigby"],
  },
  {
    period: "January 2025", month: "January", year: 2025,
    recipients: ["James Edmonds", "Stephanie Gray", "Georg Kozulinski", "Saul Levine", "Shanna Maurizi", "Tomonari Nishikawa", "Dinorah Rodriguez", "Joel Singer", "Moira Tierney", "Mi-Sen Wu"],
  },
  {
    period: "July 2025", month: "July", year: 2025,
    recipients: ["Alexandra Gelis", "Angela Reginato", "Austen Lincoln-Vogel", "Ben Balcom", "Eileen Roscina", "Felipe Guerrero", "Liz Roberts", "James Harrar", "Julia Petrocelli", "Tianming Zhou"],
  },
  {
    period: "January 2026", month: "January", year: 2026,
    recipients: ["Yue Hua", "Sandy McLennan", "Robert Nelson (archive)", "Karl Nussbaum", "Tijana Petrovic", "Nisha Platzer", "Deborah Shaffer", "Abigail Smith", "Doug Wendt", "Michael Woods"],
  },
];

// Group cycles by year, newest first
const years = [...new Set(cycles.map((c) => c.year))].sort((a, b) => b - a);

function getCyclesForYear(year: number) {
  return cycles.filter((c) => c.year === year).sort((a, b) =>
    a.month === "January" ? -1 : 1
  );
}

const totalRecipients = cycles.reduce((sum, c) => sum + c.recipients.length, 0);

export default function RecipientsPage() {
  const [activeYear, setActiveYear] = useState(years[0]);
  const activeCycles = getCyclesForYear(activeYear);

  return (
    <>
      <Header />

      <main className="flex-1">

        {/* ── Page header ── */}
        <section className="bg-[var(--surface)] border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-4">
              Grants Program
            </p>
            <h1 className="font-[family-name:var(--font-serif)] text-4xl sm:text-6xl font-semibold text-[var(--foreground)] leading-tight mb-6">
              Past Recipients.
            </h1>
            <div className="flex flex-wrap gap-8 mt-2">
              <div>
                <span className="font-[family-name:var(--font-serif)] text-3xl text-[var(--foreground)]">{totalRecipients}</span>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--accent-dim)] ml-2">Recipients</span>
              </div>
              <div>
                <span className="font-[family-name:var(--font-serif)] text-3xl text-[var(--foreground)]">{cycles.length}</span>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--accent-dim)] ml-2">Grant Cycles</span>
              </div>
              <div>
                <span className="font-[family-name:var(--font-serif)] text-3xl text-[var(--foreground)]">2016</span>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--accent-dim)] ml-2">Est.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Year tab bar ── */}
        <div className="bg-[var(--surface)] border-b border-[var(--border)] sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto scrollbar-none">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className={`relative shrink-0 px-5 py-4 text-[10px] font-semibold tracking-[0.25em] uppercase transition-colors ${
                    activeYear === year
                      ? "text-[var(--foreground)]"
                      : "text-[var(--accent-dim)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {year}
                  {activeYear === year && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--red)]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Recipients panel ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className={`grid grid-cols-1 ${activeCycles.length === 2 ? "md:grid-cols-2" : ""} gap-12 md:gap-16`}>
            {activeCycles.map((cycle) => (
              <div key={cycle.period}>
                {/* Cycle header */}
                <div className="flex items-baseline gap-4 mb-8 pb-4 border-b border-[var(--border)]">
                  <h2 className="font-[family-name:var(--font-serif)] text-2xl font-semibold text-[var(--foreground)]">
                    {cycle.month}
                  </h2>
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--accent-dim)]">
                    ICS Grant · {cycle.recipients.length} recipients
                  </span>
                </div>

                {/* Recipient list */}
                <ol className="space-y-0">
                  {cycle.recipients.map((name, i) => (
                    <li
                      key={i}
                      className="flex items-baseline gap-4 py-3.5 border-b border-[var(--border)]"
                    >
                      <span className="font-mono text-[10px] text-[var(--border)] shrink-0 w-5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-[var(--foreground)] leading-snug">
                        {name}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-[var(--surface-2)] border-t border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="font-[family-name:var(--font-serif)] text-xl text-[var(--foreground)]">
              Ready to join this list?
            </p>
            <Link
              href="/grants/apply"
              className="px-8 py-3.5 bg-[var(--red)] text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-red-500 transition-colors"
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
