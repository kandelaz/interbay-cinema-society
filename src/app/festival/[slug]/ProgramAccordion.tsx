"use client";

import { useState } from "react";
import type { FestivalProgram } from "@/data/festivalArchive";

function ProgramBlock({ program }: { program: FestivalProgram }) {
  const [open, setOpen] = useState(false);
  const hasFilms = program.films.length > 0;

  return (
    <div className="border-b border-[var(--border)]">
      <button
        onClick={() => hasFilms && setOpen((o) => !o)}
        className={`w-full flex items-start justify-between gap-6 py-6 text-left group ${!hasFilms ? "cursor-default" : ""}`}
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            {program.label && (
              <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--accent-dim)]">
                {program.label}
              </span>
            )}
            {program.isSpecialEvent && (
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--red)]">
                Special Event
              </span>
            )}
          </div>
          <h3 className={`font-[family-name:var(--font-serif)] text-lg sm:text-xl font-semibold text-[var(--foreground)] transition-colors ${hasFilms ? "group-hover:text-[var(--accent)]" : ""}`}>
            {program.title}
          </h3>
          <div className="flex flex-wrap gap-4 mt-2">
            {program.date && (
              <span className="text-[10px] tracking-widest uppercase text-[var(--accent-dim)]">{program.date}</span>
            )}
            {program.time && (
              <span className="text-[10px] tracking-widest uppercase text-[var(--accent-dim)]">{program.time}</span>
            )}
            {program.venue && (
              <span className="text-[10px] tracking-widest uppercase text-[var(--accent-dim)] italic">{program.venue}</span>
            )}
            {hasFilms && (
              <span className="text-[10px] tracking-widest uppercase text-[var(--border)]">
                {program.films.length} {program.films.length === 1 ? "film" : "films"}
              </span>
            )}
          </div>
        </div>
        {hasFilms && (
          <span className={`text-[var(--accent-dim)] mt-1 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        )}
      </button>

      {program.description && (
        <p className="text-xs text-[var(--accent-dim)] leading-relaxed pb-4 max-w-2xl">{program.description}</p>
      )}

      {open && hasFilms && (
        <div className="pb-6">
          {program.films.map((film, i) => (
            <div key={i} className="flex gap-4 py-3.5 border-t border-[var(--border)]">
              <span className="font-mono text-[10px] text-[var(--border)] shrink-0 mt-0.5 w-6">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 mb-0.5">
                  <span className="font-[family-name:var(--font-serif)] text-sm font-semibold text-[var(--foreground)]">
                    {film.title}
                  </span>
                  <span className="text-xs text-[var(--accent-dim)]">{film.director}</span>
                  {film.country && <span className="text-[10px] text-[var(--border)]">{film.country}</span>}
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                  {film.year && <span className="text-[10px] text-[var(--border)]">{film.year}</span>}
                  {film.duration && <span className="text-[10px] text-[var(--accent-dim)]">{film.duration}</span>}
                  {film.format && <span className="text-[10px] text-[var(--accent-dim)] italic">{film.format}</span>}
                </div>
                {film.description && (
                  <p className="text-[11px] text-[var(--accent-dim)] leading-relaxed mt-1.5 opacity-75 max-w-xl">
                    {film.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProgramAccordion({ programs }: { programs: FestivalProgram[] }) {
  return (
    <div>
      {programs.map((program, i) => (
        <ProgramBlock key={i} program={program} />
      ))}
    </div>
  );
}
