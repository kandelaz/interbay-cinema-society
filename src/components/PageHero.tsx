"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type Props = {
  src: string;
  alt?: string;
  eyebrow: string;
  title: string;
  objectPosition?: string;
};

export default function PageHero({ src, alt = "", eyebrow, title, objectPosition = "center" }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    function update() {
      const section = sectionRef.current;
      const imgWrap = imgWrapRef.current;
      const overlay = overlayRef.current;
      if (!section || !imgWrap || !overlay) return;

      // starts immediately on first scroll (0 = no scroll; 1 = scrolled section height)
      const progress = Math.min(1, Math.max(0, window.scrollY / section.offsetHeight));

      // move image right + keep scale to push blurred edges outside the clip
      const movePx = progress * section.offsetWidth * 0.3;
      imgWrap.style.transform = `translateX(${movePx}px) scale(1.08)`;

      // scroll-driven overlay adds up to 0.3 more darkness on top of the permanent layer
      overlay.style.opacity = String(progress * 0.3);
    }

    function onScroll() {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // set initial state
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-[var(--border)] min-h-[40vh] sm:min-h-[52vh] flex items-end"
    >
      {/*
        Image wrapper is 160% wide and starts 30% to the left of the section.
        This gives 30% of extra image on the left side, so as translateX pushes
        it right by up to 30% of section width, it always covers the full section.
      */}
      <div
        ref={imgWrapRef}
        className="absolute will-change-transform"
        style={{ top: 0, bottom: 0, left: "-30%", width: "160%", filter: "blur(3px) brightness(0.75)" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="160vw"
          className="object-cover"
          style={{ objectPosition }}
          priority
        />
      </div>

      {/* Permanent dark overlay — matches homepage darkness */}
      <div className="absolute inset-0 bg-black/[0.275]" />

      {/* Gradient for text legibility at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/50 to-transparent" />

      {/* Scroll-driven dark overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ opacity: 0 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 w-full">
        <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-4">
          {eyebrow}
        </p>
        <h1 className="font-[family-name:var(--font-serif)] text-4xl sm:text-6xl font-semibold text-[var(--foreground)] max-w-3xl leading-tight">
          {title}
        </h1>
      </div>
    </section>
  );
}
