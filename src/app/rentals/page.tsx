"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

const bolexImages = [
  { src: "/assets/bolex-01.jpg", alt: "Bolex camera kit available for rent" },
  { src: "/assets/bolex-02.jpg", alt: "Bolex H16 camera" },
  { src: "/assets/bolex-03.jpg", alt: "Bolex accessories and lenses" },
];

function BolexCarousel() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  function prev() {
    setCurrent((c) => (c - 1 + bolexImages.length) % bolexImages.length);
  }
  function next() {
    setCurrent((c) => (c + 1) % bolexImages.length);
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) delta < 0 ? next() : prev();
    touchStartX.current = null;
  }

  return (
    <div className="relative select-none">
      {/* Image */}
      <div
        className="relative h-80 sm:h-96 overflow-hidden bg-[var(--surface-2)] cursor-grab active:cursor-grabbing"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {bolexImages.map((img, i) => (
          <div
            key={img.src}
            className={`absolute inset-0 transition-opacity duration-500 ${i === current ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Prev / Next arrows */}
        <button
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-black/75 text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Next image"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-black/75 text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {bolexImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to image ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-5 h-1.5 bg-[var(--red)]"
                : "w-1.5 h-1.5 bg-[var(--border)] hover:bg-[var(--accent-dim)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

const TABS = ["Equipment", "Competencies", "Training", "Volunteering"] as const;
type Tab = (typeof TABS)[number];

const bolexKit = [
  "Bolex cameras",
  "Lenses in various focal lengths",
  "Rewind keys",
  "Single frame triggers",
  "Light meter",
];

const competencies = [
  "Clean the body of the Bolex",
  "Remove and inspect the pressure plate, open and close it",
  "Inspect and clean the gate",
  "Set and release the loop formers properly",
  "Check the light trap",
  "Adjust the diopter for your eyesight",
  "Wind the camera",
  "Remove and mount the daylight spool",
  "Load film (a practice load is supplied), using the blade inside the camera",
  "Run a few feet of film to test",
  "Discuss and understand film ASA (what film do you plan to shoot with?)",
  "Check filter holder",
  "Mount 2 lenses",
  "Understand how to handle the turret — lock and unlocked positions",
  "What to do with turret caps and lens caps",
  "Check that the settings are correct: motor, fps",
  "Check variable shutter and know how/when to use it",
  "Adjust frame counter and know how/when to use it",
  "Check and know timed/instantaneous single frame setting",
  'Run film until footage counter is at "0"',
  "Clip and unload film",
  "Run motor until it stops",
  "Remove lenses",
  "(Optional) Load film you plan to use",
];

const volunteerEquivalencies = [
  { task: "Workshop attended", unit: "per hour of workshop", hours: 1 },
  { task: "Bolex rental (1 rental = 2 days)", unit: "per rental", hours: 8 },
  { task: "Other equipment or kit rental (1 rental = 2 days)", unit: "per rental", hours: 4 },
];

const volunteerNeeds = [
  "Clean and organize the ICS studio",
  "Help with ICS web presence as directed (ongoing)",
  "Manage digital and print traffic for Engauge as directed",
  "Set up before and clean up after workshops",
  "Handle basic training e.g. using projectors, found footage, etc.",
  "Training on equipment as directed (ongoing)",
];

export default function RentalsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Equipment");

  return (
    <>
      <Header />

      <main className="flex-1">

        <PageHero
          src="/assets/hero-rentals.jpg"
          alt="Bolex camera available for rental"
          eyebrow="Rentals"
          title="Bolex camera rental & training."
        />

        {/* ── Tab bar ── */}
        <div className="bg-[var(--surface)] border-b border-[var(--border)] sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto scrollbar-none">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    relative shrink-0 px-6 py-4 text-[10px] font-semibold tracking-[0.25em] uppercase transition-colors
                    ${activeTab === tab
                      ? "text-[var(--foreground)]"
                      : "text-[var(--accent-dim)] hover:text-[var(--foreground)]"
                    }
                  `}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--red)]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tab panels ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

          {/* Equipment */}
          {activeTab === "Equipment" && (
            <div>
              <div className="max-w-2xl mb-14">
                <p className="text-sm text-[var(--accent-dim)] leading-relaxed">
                  ICS equipment is only available to folks who have taken a Bolex workshop or a private training session, or demonstrated competencies with the equipment.{" "}
                  <a href="mailto:team@interbaycinemasociety.org" className="text-[var(--accent)] hover:text-[var(--foreground)] transition-colors">
                    Email us
                  </a>{" "}
                  for more information.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Kit list */}
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-6">
                    Bolex Kit Includes
                  </p>
                  <ul className="space-y-3 mb-10">
                    {bolexKit.map((item) => (
                      <li key={item} className="flex gap-4 text-sm text-[var(--accent-dim)]">
                        <span className="text-[var(--red)] shrink-0 mt-0.5">◎</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="inline-block px-8 py-3.5 bg-[var(--red)] text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-red-500 transition-colors"
                  >
                    Inquire About Rental
                  </Link>
                </div>

                {/* Photo carousel */}
                <BolexCarousel />
              </div>
            </div>
          )}

          {/* Competencies */}
          {activeTab === "Competencies" && (
            <div>
              <div className="max-w-2xl mb-14">
                <h2 className="font-[family-name:var(--font-serif)] text-2xl font-semibold text-[var(--foreground)] mb-4">
                  Bolex Competency Checklist
                </h2>
                <p className="text-sm text-[var(--accent-dim)] leading-relaxed">
                  You must demonstrate all of the following competencies in order to rent a Bolex from Interbay Cinema Society. No prior experience necessary — that&apos;s what training is for.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0 mb-14">
                {competencies.map((c, i) => (
                  <div
                    key={i}
                    className="flex gap-5 py-4 border-b border-[var(--border)]"
                  >
                    <span className="font-mono text-[10px] text-[var(--border)] shrink-0 mt-0.5 w-6">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-xs text-[var(--accent-dim)] leading-relaxed">{c}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[var(--surface)] border border-[var(--border)] p-8 max-w-lg">
                <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-3">
                  Need to qualify?
                </p>
                <p className="text-sm text-[var(--accent-dim)] leading-relaxed mb-6">
                  Schedule a training session — 4 hours at $30/hour — and we&apos;ll walk you through everything on this list.
                </p>
                <button
                  onClick={() => setActiveTab("Training")}
                  className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--accent)] hover:text-[var(--foreground)] transition-colors"
                >
                  View Training Details &rarr;
                </button>
              </div>
            </div>
          )}

          {/* Training */}
          {activeTab === "Training" && (
            <div>
              <div className="max-w-2xl mb-14">
                <h2 className="font-[family-name:var(--font-serif)] text-2xl font-semibold text-[var(--foreground)] mb-4">
                  Training Sessions
                </h2>
                <p className="text-sm text-[var(--accent-dim)] leading-relaxed">
                  Schedule a training session to qualify for a Bolex rental. Our instructors will guide you through the full competency checklist at a pace that works for you.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
                <div className="bg-[var(--surface)] border border-[var(--border)] p-8">
                  <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-3">Rate</p>
                  <p className="font-[family-name:var(--font-serif)] text-5xl text-[var(--foreground)] mb-1">$30</p>
                  <p className="text-xs text-[var(--accent-dim)]">per hour</p>
                </div>
                <div className="bg-[var(--surface)] border border-[var(--border)] p-8">
                  <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-3">Minimum</p>
                  <p className="font-[family-name:var(--font-serif)] text-5xl text-[var(--foreground)] mb-1">4 hrs</p>
                  <p className="text-xs text-[var(--accent-dim)]">per session</p>
                </div>
                <div className="bg-[var(--surface)] border border-[var(--border)] p-8">
                  <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-3">Session Total</p>
                  <p className="font-[family-name:var(--font-serif)] text-5xl text-[var(--foreground)] mb-1">$120</p>
                  <p className="text-xs text-[var(--accent-dim)]">minimum per booking</p>
                </div>
              </div>

              <div className="max-w-lg bg-[var(--surface)] border border-[var(--border)] p-8 mb-10">
                <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-4">What&apos;s Covered</p>
                <ul className="space-y-2">
                  {["Full Bolex competency checklist", "Equipment operation and safe handling", "Film loading and unloading", "Exposure and frame rate settings", "Q&A with your instructor"].map((item) => (
                    <li key={item} className="flex gap-3 text-xs text-[var(--accent-dim)]">
                      <span className="text-[var(--red)] shrink-0">◎</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-[var(--border)] pt-10">
                <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-3">
                  To Schedule
                </p>
                <p className="text-sm text-[var(--accent-dim)] leading-relaxed mb-6 max-w-md">
                  Send us an email and we&apos;ll find a time that works. Can&apos;t afford training? See our volunteer exchange program — volunteer hours can be credited toward your session.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="mailto:team@interbaycinemasociety.org"
                    className="px-8 py-3.5 bg-[var(--red)] text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-red-500 transition-colors"
                  >
                    Book a Session
                  </a>
                  <button
                    onClick={() => setActiveTab("Volunteering")}
                    className="px-8 py-3.5 border border-[var(--accent-dim)] text-[var(--accent)] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[var(--accent)] hover:text-[var(--background)] hover:border-[var(--accent)] transition-all"
                  >
                    Volunteer Exchange &rarr;
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Volunteering */}
          {activeTab === "Volunteering" && (
            <div>
              <div className="max-w-2xl mb-14">
                <h2 className="font-[family-name:var(--font-serif)] text-2xl font-semibold text-[var(--foreground)] mb-4">
                  Volunteer Exchange Program
                </h2>
                <p className="text-sm text-[var(--accent-dim)] leading-relaxed">
                  Volunteer your time with ICS and earn credit toward training sessions or equipment rentals. Send an email to{" "}
                  <a href="mailto:team@interbaycinemasociety.org" className="text-[var(--accent)] hover:text-[var(--foreground)] transition-colors">
                    team@interbaycinemasociety.org
                  </a>{" "}
                  to schedule.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Equivalencies */}
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-6 pb-4 border-b border-[var(--border)]">
                    Equivalencies
                  </p>
                  <div className="space-y-0">
                    {volunteerEquivalencies.map((row) => (
                      <div key={row.task} className="flex items-start justify-between gap-6 py-5 border-b border-[var(--border)]">
                        <div>
                          <p className="text-xs text-[var(--foreground)] mb-1">{row.task}</p>
                          <p className="text-[10px] text-[var(--accent-dim)] tracking-wide">{row.unit}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-[family-name:var(--font-serif)] text-xl text-[var(--foreground)]">{row.hours}h</p>
                          <p className="text-[10px] text-[var(--accent-dim)]">of work</p>
                        </div>
                      </div>
                    ))}
                    <div className="py-5">
                      <p className="text-xs text-[var(--accent-dim)] italic">Other equivalencies as negotiated.</p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <a
                      href="mailto:team@interbaycinemasociety.org"
                      className="px-8 py-3.5 bg-[var(--red)] text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-red-500 transition-colors inline-block"
                    >
                      Get Involved
                    </a>
                  </div>
                </div>

                {/* Volunteer needs */}
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-6 pb-4 border-b border-[var(--border)]">
                    Volunteer Needs
                  </p>
                  <ul className="space-y-0">
                    {volunteerNeeds.map((need, i) => (
                      <li key={i} className="flex gap-4 py-4 border-b border-[var(--border)]">
                        <span className="font-mono text-[10px] text-[var(--border)] shrink-0 mt-0.5 w-6">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-xs text-[var(--accent-dim)] leading-relaxed">{need}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
