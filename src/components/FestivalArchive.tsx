"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";

type Edition = {
  _id: string;
  title: string;
  year: number;
  slug: { current: string };
  description?: string;
  posterImage?: { asset: unknown; alt?: string };
};

const fallbackArchive: Edition[] = [
  { _id: "2024", title: "Engauge 2024", year: 2024, slug: { current: "2024" }, description: "The seventh edition of Engauge Experimental Film Festival." },
  { _id: "2023", title: "Engauge 2023", year: 2023, slug: { current: "2023" }, description: "Six years of celebrating artist-made celluloid film." },
  { _id: "2022", title: "Engauge 2022", year: 2022, slug: { current: "2022" } },
  { _id: "2021", title: "Engauge 2021", year: 2021, slug: { current: "2021" } },
  { _id: "2020", title: "Engauge 2020", year: 2020, slug: { current: "2020" } },
  { _id: "2019", title: "Engauge 2019", year: 2019, slug: { current: "2019" } },
  { _id: "2018", title: "Engauge 2018", year: 2018, slug: { current: "2018" }, description: "The inaugural Engauge Experimental Film Festival." },
];

export default function FestivalArchive({ editions }: { editions?: Edition[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const list = editions?.length ? editions : fallbackArchive;

  return (
    <div className="divide-y divide-[var(--border)]">
      {list.map((ed) => (
        <div key={ed._id}>
          <button
            onClick={() => setOpen(open === ed._id ? null : ed._id)}
            className="w-full flex items-center justify-between px-0 py-5 text-left group"
          >
            <div className="flex items-baseline gap-6">
              <span className="font-[family-name:var(--font-serif)] text-2xl font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                {ed.year}
              </span>
              <span className="text-xs tracking-widest uppercase text-[var(--accent-dim)]">
                {ed.title}
              </span>
            </div>
            <svg
              className={`w-4 h-4 text-[var(--accent-dim)] transition-transform duration-300 ${open === ed._id ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {open === ed._id && (
            <div className="pb-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {ed.posterImage && (
                <div className="relative aspect-[2/3] overflow-hidden bg-[var(--surface-2)]">
                  <Image
                    src={urlFor(ed.posterImage).width(400).url()}
                    alt={ed.posterImage.alt ?? ed.title}
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className={ed.posterImage ? "sm:col-span-2" : "sm:col-span-3"}>
                {ed.description && (
                  <p className="text-sm text-[var(--accent-dim)] leading-relaxed mb-6">{ed.description}</p>
                )}
                <Link
                  href={`/festival/${ed.slug.current}`}
                  className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--accent)] hover:text-[var(--foreground)] transition-colors"
                >
                  View Full Program &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
