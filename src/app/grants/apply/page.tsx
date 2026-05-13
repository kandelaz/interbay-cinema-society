"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function GrantApplyPage() {
  return (
    <>
      <Header />

      <main className="flex-1">

        <section className="bg-[var(--surface)] border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-4">
              Grants Program
            </p>
            <h1 className="font-[family-name:var(--font-serif)] text-4xl sm:text-6xl font-semibold text-[var(--foreground)] leading-tight">
              Grant Application
            </h1>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* Sidebar */}
            <div className="space-y-10">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-4">
                  Deadlines
                </p>
                <div className="space-y-3">
                  {[{ cycle: "Winter Cycle", date: "January 1" }, { cycle: "Summer Cycle", date: "July 1" }].map((d) => (
                    <div key={d.cycle} className="flex items-baseline justify-between border-b border-[var(--border)] pb-3">
                      <span className="text-xs text-[var(--accent-dim)]">{d.cycle}</span>
                      <span className="font-[family-name:var(--font-serif)] text-base text-[var(--foreground)]">{d.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-4">
                  Grant Amount
                </p>
                <p className="font-[family-name:var(--font-serif)] text-3xl text-[var(--foreground)]">$1,000</p>
                <p className="text-xs text-[var(--accent-dim)] mt-1">per grant, ~10 awarded per cycle</p>
              </div>

              <div>
                <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-4">
                  Lab Partner
                </p>
                <p className="text-xs text-[var(--accent-dim)] leading-relaxed mb-3">
                  Grant funds are applied toward film digitization at Colormatters in Seattle.
                </p>
                <a
                  href="https://colormatters.tv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--accent)] hover:text-[var(--foreground)] transition-colors"
                >
                  colormatters.tv &rarr;
                </a>
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
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>

                {/* Applicant info */}
                <fieldset className="space-y-6">
                  <legend className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-4 block">
                    Applicant Information
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Field label="First Name" name="firstName" required />
                    <Field label="Last Name" name="lastName" required />
                  </div>
                  <Field label="Email Address" name="email" type="email" required />
                  <Field label="Country of Residence" name="country" required />
                  <Field label="Website / Portfolio (optional)" name="website" type="url" />
                </fieldset>

                {/* Film info */}
                <fieldset className="space-y-6">
                  <legend className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-4 block">
                    Film Information
                  </legend>
                  <Field label="Film Title" name="filmTitle" required />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <Field label="Year (or Expected)" name="year" type="number" />
                    <Field label="Duration (minutes)" name="duration" type="number" />
                    <div>
                      <label className="block text-[10px] font-semibold tracking-widest uppercase text-[var(--accent-dim)] mb-2">
                        Film Gauge <span className="text-[var(--red)]">*</span>
                      </label>
                      <select
                        name="gauge"
                        required
                        className="w-full bg-[var(--surface-2)] border border-[var(--border)] text-[var(--foreground)] text-xs px-4 py-3 focus:outline-none focus:border-[var(--accent-dim)] transition-colors appearance-none"
                      >
                        <option value="">Select</option>
                        <option>Super 8</option>
                        <option>16mm</option>
                        <option>35mm</option>
                        <option>Multiple gauges</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <Field label="Screener Link (Vimeo / Google Drive)" name="screenerUrl" type="url" required />
                  <Field label="Screener Password (if applicable)" name="screenerPassword" />
                  <div>
                    <label className="block text-[10px] font-semibold tracking-widest uppercase text-[var(--accent-dim)] mb-2">
                      Film Description / Artist Statement <span className="text-[var(--red)]">*</span>
                    </label>
                    <textarea
                      name="statement"
                      rows={6}
                      required
                      className="w-full bg-[var(--surface-2)] border border-[var(--border)] text-[var(--foreground)] text-xs px-4 py-3 placeholder-[var(--accent-dim)] focus:outline-none focus:border-[var(--accent-dim)] transition-colors resize-none"
                      placeholder="Describe your film and how the grant would support your work..."
                    />
                  </div>
                </fieldset>

                {/* Digitization needs */}
                <fieldset className="space-y-6">
                  <legend className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-4 block">
                    Digitization Details
                  </legend>
                  <div>
                    <label className="block text-[10px] font-semibold tracking-widest uppercase text-[var(--accent-dim)] mb-2">
                      Describe your digitization needs
                    </label>
                    <textarea
                      name="digitizationNeeds"
                      rows={4}
                      className="w-full bg-[var(--surface-2)] border border-[var(--border)] text-[var(--foreground)] text-xs px-4 py-3 placeholder-[var(--accent-dim)] focus:outline-none focus:border-[var(--accent-dim)] transition-colors resize-none"
                      placeholder="Footage length, format, any special scanning requirements..."
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold tracking-widest uppercase text-[var(--accent-dim)] mb-2">
                      Have you been in contact with Colormatters?
                    </label>
                    <div className="flex gap-6">
                      {["Yes", "No", "Not yet"].map((opt) => (
                        <label key={opt} className="flex items-center gap-2 text-xs text-[var(--accent-dim)] cursor-pointer">
                          <input type="radio" name="colormatterContact" value={opt} className="accent-[var(--accent)]" />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>
                </fieldset>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-12 py-4 bg-[var(--red)] text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-red-500 transition-colors"
                >
                  Submit Application
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

function Field({ label, name, type = "text", required = false }: {
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
