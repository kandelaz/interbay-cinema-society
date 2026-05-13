"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function SubmitPage() {
  return (
    <>
      <Header />

      <main className="flex-1">

        <section className="bg-[var(--surface)] border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-4">
              Engauge Experimental Film Festival
            </p>
            <h1 className="font-[family-name:var(--font-serif)] text-4xl sm:text-6xl font-semibold text-[var(--foreground)] max-w-2xl leading-tight">
              Submit a Film
            </h1>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* Guidelines */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-4">
                  Eligibility
                </p>
                <ul className="space-y-2 text-xs text-[var(--accent-dim)] leading-relaxed">
                  {[
                    "Works must be shot and/or printed on celluloid film",
                    "Any gauge accepted (Super 8, 16mm, 35mm)",
                    "All lengths considered",
                    "Open to filmmakers worldwide",
                    "No entry fee",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-[var(--accent)] mt-0.5 shrink-0">◎</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-4">
                  Formats Accepted
                </p>
                <ul className="space-y-2 text-xs text-[var(--accent-dim)] leading-relaxed">
                  {[
                    "Digital screener (Vimeo / Google Drive)",
                    "Physical print (arranged after selection)",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-[var(--accent)] mt-0.5 shrink-0">▷</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-4">
                  Questions?
                </p>
                <Link href="/contact" className="text-xs text-[var(--accent)] hover:text-[var(--foreground)] transition-colors">
                  Contact us &rarr;
                </Link>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <p className="text-xs text-[var(--accent-dim)] leading-relaxed mb-10">
                Fill out the form below to submit your film for consideration. All celluloid works welcome — handmade, optically printed, direct animation, and beyond.
              </p>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label="First Name" name="firstName" required />
                  <Field label="Last Name" name="lastName" required />
                </div>
                <Field label="Email" name="email" type="email" required />
                <Field label="Film Title" name="filmTitle" required />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <Field label="Year Completed" name="year" type="number" />
                  <Field label="Duration (minutes)" name="duration" type="number" />
                  <div>
                    <label className="block text-[10px] font-semibold tracking-widest uppercase text-[var(--accent-dim)] mb-2">
                      Film Gauge
                    </label>
                    <select
                      name="gauge"
                      className="w-full bg-[var(--surface-2)] border border-[var(--border)] text-[var(--foreground)] text-xs px-4 py-3 focus:outline-none focus:border-[var(--accent-dim)] transition-colors appearance-none"
                    >
                      <option value="">Select</option>
                      <option>Super 8</option>
                      <option>16mm</option>
                      <option>35mm</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <Field label="Country of Origin" name="country" />
                <Field label="Screener Link (Vimeo / Google Drive)" name="screenerUrl" type="url" required />
                <Field label="Password (if screener is password protected)" name="password" />
                <div>
                  <label className="block text-[10px] font-semibold tracking-widest uppercase text-[var(--accent-dim)] mb-2">
                    Film Description / Director&apos;s Statement
                  </label>
                  <textarea
                    name="description"
                    rows={5}
                    className="w-full bg-[var(--surface-2)] border border-[var(--border)] text-[var(--foreground)] text-xs px-4 py-3 placeholder-[var(--accent-dim)] focus:outline-none focus:border-[var(--accent-dim)] transition-colors resize-none"
                    placeholder="Tell us about your film..."
                  />
                </div>
                <button
                  type="submit"
                  className="px-10 py-4 bg-[var(--red)] text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-red-500 transition-colors"
                >
                  Submit Film
                </button>
              </form>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

function Field({
  label, name, type = "text", required = false,
}: {
  label: string; name: string; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[10px] font-semibold tracking-widest uppercase text-[var(--accent-dim)] mb-2">
        {label}{required && <span className="text-[var(--red)] ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full bg-[var(--surface-2)] border border-[var(--border)] text-[var(--foreground)] text-xs px-4 py-3 placeholder-[var(--accent-dim)] focus:outline-none focus:border-[var(--accent-dim)] transition-colors"
      />
    </div>
  );
}
