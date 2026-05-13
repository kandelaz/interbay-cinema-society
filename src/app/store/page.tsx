"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

const SQUARE_MERCH_URL = "https://interbay-cinema-society.square.site/merch";
const SQUARE_RENTALS_URL = "https://interbay-cinema-society.square.site/rentals";
const DONATE_URL = "https://www.networkforgood.org/donation/MakeDonation.aspx?ORGID2=823819440";

type MerchItem = {
  name: string;
  description: string;
  price: string;
  note?: string;
  sizes?: string[];
  images: string[];
};

const merchItems: MerchItem[] = [
  {
    name: "Engauge Experimental Film Festival Logo T-Shirt",
    description:
      "Black 100% cotton tee featuring the Engauge Experimental Film Festival logo. Show your support for analogue filmmaking in Seattle and beyond.",
    price: "$10",
    note: "+ $5 shipping & handling",
    sizes: ["S", "M", "L", "XL"],
    images: ["/assets/merch-tshirt-logo.jpg"],
  },
  {
    name: "Engauge 2019 Festival T-Shirt",
    description:
      "Commemorative tee from the 2019 Engauge festival — films from 20 countries, 5 programs, and a sold-out expanded cinema performance.",
    price: "$10",
    note: "+ $5 shipping & handling",
    sizes: ["S", "M", "L", "XL"],
    images: ["/assets/merch-tshirt-2019.jpg"],
  },
  {
    name: "Engauge 2018 (1st Year) Festival T-Shirt",
    description:
      "The original. Commemorating the very first Engauge Experimental Film Festival in Seattle. Printed on both sides. A piece of local film history.",
    price: "$10",
    note: "+ $5 shipping & handling",
    sizes: ["S", "M", "L", "XL"],
    images: ["/assets/merch-tshirt-2018-front.jpg", "/assets/merch-tshirt-2018-back.jpg"],
  },
  {
    name: "ICS Embroidered Patch",
    description:
      "A 4\" × 4\" embroidered ICS patch — white on black. Looks great on jackets, bags, and shirts. Each purchase directly funds ICS grants and programming.",
    price: "$6",
    note: "Includes shipping",
    images: ["/assets/merch-patch.jpg"],
  },
];

function ProductCard({ item }: { item: MerchItem }) {
  const [imgIndex, setImgIndex] = useState(0);
  const hasMultiple = item.images.length > 1;

  return (
    <div className="group flex flex-col border border-[var(--border)] hover:border-[var(--accent-dim)] transition-colors">
      {/* Image */}
      <div className="relative aspect-square bg-[var(--surface-2)] overflow-hidden">
        {item.images.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-400 ${i === imgIndex ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <Image
              src={src}
              alt={`${item.name}${hasMultiple ? (i === 0 ? " — front" : " — back") : ""}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        ))}

        {/* Front / Back toggle */}
        {hasMultiple && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {item.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setImgIndex(i)}
                className={`text-[9px] font-semibold tracking-widest uppercase px-3 py-1 transition-colors ${
                  i === imgIndex
                    ? "bg-white text-black"
                    : "bg-black/50 text-white hover:bg-black/75"
                }`}
              >
                {i === 0 ? "Front" : "Back"}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col flex-1">
        <h2 className="font-[family-name:var(--font-serif)] text-base font-semibold text-[var(--foreground)] mb-2 leading-snug">
          {item.name}
        </h2>
        <p className="text-xs text-[var(--accent-dim)] leading-relaxed mb-4 flex-1">
          {item.description}
        </p>

        {item.sizes && (
          <div className="flex gap-1.5 mb-5">
            {item.sizes.map((s) => (
              <span
                key={s}
                className="w-8 h-8 flex items-center justify-center border border-[var(--border)] text-[10px] font-semibold text-[var(--accent-dim)]"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
          <div>
            <span className="font-[family-name:var(--font-serif)] text-2xl text-[var(--foreground)]">
              {item.price}
            </span>
            {item.note && (
              <span className="text-[10px] text-[var(--accent-dim)] ml-2">{item.note}</span>
            )}
          </div>
          <a
            href={SQUARE_MERCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[var(--red)] text-white text-[10px] font-semibold tracking-widest uppercase hover:bg-red-500 transition-colors"
          >
            Buy
          </a>
        </div>
      </div>
    </div>
  );
}

export default function StorePage() {
  return (
    <>
      <Header />

      <main className="flex-1">

        <PageHero
          src="/assets/hero-store.jpg"
          alt="ICS merchandise"
          eyebrow="Store"
          title="Support the work."
          objectPosition="center 37%"
        />

        {/* ── Merch grid ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="flex items-baseline justify-between mb-12 pb-4 border-b border-[var(--border)]">
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)]">
              Merch &amp; Apparel
            </p>
            <a
              href={SQUARE_MERCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--accent)] hover:text-[var(--foreground)] transition-colors"
            >
              View all on Square &rarr;
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {merchItems.map((item) => (
              <ProductCard key={item.name} item={item} />
            ))}
          </div>
        </section>

        {/* ── Rental deposits ── */}
        <section className="bg-[var(--surface)] border-y border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="flex items-baseline justify-between mb-12 pb-4 border-b border-[var(--border)]">
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)]">
                Equipment Rental Deposits
              </p>
              <a
                href={SQUARE_RENTALS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--accent)] hover:text-[var(--foreground)] transition-colors"
              >
                View on Square &rarr;
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="grid grid-cols-2 gap-3">
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-2)] col-span-2">
                  <Image src="/assets/bolex-01.jpg" alt="Bolex H16 camera kit" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain" />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-2)]">
                  <Image src="/assets/bolex-02.jpg" alt="Bolex H16" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-contain" />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-2)]">
                  <Image src="/assets/bolex-03.jpg" alt="Bolex accessories" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-contain" />
                </div>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-serif)] text-3xl font-semibold text-[var(--foreground)] mb-4">
                  Bolex H16 Rental Deposit
                </h2>
                <p className="text-sm text-[var(--accent-dim)] leading-relaxed mb-8">
                  Pay your rental deposit securely through Square. Deposits are applied toward your rental. Equipment is available to filmmakers who have completed the Bolex competency checklist or a training session with ICS.
                </p>

                <div className="space-y-0 mb-8">
                  {[
                    { label: "Rental period", value: "2 days per rental" },
                    { label: "Training rate", value: "$30 / hour" },
                    { label: "Training minimum", value: "4 hours ($120)" },
                    { label: "Competency required", value: "Yes — see Rentals page" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-baseline py-3.5 border-b border-[var(--border)]">
                      <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--accent-dim)]">{row.label}</span>
                      <span className="text-xs text-[var(--foreground)]">{row.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={SQUARE_RENTALS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3.5 bg-[var(--red)] text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-red-500 transition-colors"
                  >
                    Pay Deposit on Square
                  </a>
                  <Link
                    href="/rentals"
                    className="px-8 py-3.5 border border-[var(--accent-dim)] text-[var(--accent)] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[var(--accent)] hover:text-[var(--background)] hover:border-[var(--accent)] transition-all"
                  >
                    Rental Info &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Donate strip ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="border border-[var(--border)] p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-3">
                Prefer to give directly?
              </p>
              <p className="font-[family-name:var(--font-serif)] text-xl sm:text-2xl text-[var(--foreground)] mb-2">
                Every dollar goes to the work.
              </p>
              <p className="text-xs text-[var(--accent-dim)] leading-relaxed max-w-md">
                ICS is a 501(c)(3) nonprofit. Donations support grants, festival programming, workshops, and equipment access for filmmakers.
              </p>
            </div>
            <a
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-8 py-3.5 border border-[var(--accent-dim)] text-[var(--accent)] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[var(--accent)] hover:text-[var(--background)] hover:border-[var(--accent)] transition-all"
            >
              Donate &rarr;
            </a>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
