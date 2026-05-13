"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

type FormState = "idle" | "sending" | "sent" | "error";

const subjects = [
  "General Inquiry",
  "Grant Application Question",
  "Equipment Rental",
  "Training Session",
  "Film Submission",
  "Partnership / Sponsorship",
  "Press Inquiry",
  "Volunteer",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [state, setState] = useState<FormState>("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setState("sent");
    } catch {
      setState("error");
    }
  }

  return (
    <>
      <Header />

      <main className="flex-1">

        <PageHero
          src="/assets/hero-contact.jpg"
          alt="Interbay Cinema Society contact"
          eyebrow="Contact"
          title="Get in touch."
        />

        {/* ── Content ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* ── Left: info ── */}
            <div>
              <p className="text-sm text-[var(--accent-dim)] leading-relaxed mb-12 max-w-md">
                Whether you have a question about our grants, want to rent equipment, are interested in submitting to the festival, or just want to say hello — we&apos;d love to hear from you.
              </p>

              <div className="space-y-10">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-3">Email</p>
                  <a
                    href="mailto:info@interbaycinemasociety.org"
                    className="text-sm text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                  >
                    info@interbaycinemasociety.org
                  </a>
                </div>

                <div>
                  <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-3">Location</p>
                  <p className="text-sm text-[var(--accent-dim)] leading-relaxed">
                    Seattle, Washington
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-4">Follow</p>
                  <div className="flex gap-6">
                    <a
                      href="https://www.instagram.com/interbaycinema"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[var(--accent-dim)] hover:text-[var(--accent)] transition-colors tracking-wide"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://vimeo.com/interbaycinema"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[var(--accent-dim)] hover:text-[var(--accent)] transition-colors tracking-wide"
                    >
                      Vimeo
                    </a>
                    <a
                      href="https://www.facebook.com/interbaycinema"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[var(--accent-dim)] hover:text-[var(--accent)] transition-colors tracking-wide"
                    >
                      Facebook
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--border)]">
                  <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--accent-dim)] mb-3">Response Time</p>
                  <p className="text-xs text-[var(--accent-dim)] leading-relaxed">
                    We typically respond within 2–3 business days. For urgent grant or submission inquiries, please note the relevant deadline in your message.
                  </p>
                </div>
              </div>
            </div>

            {/* ── Right: form ── */}
            <div>
              {state === "sent" ? (
                <div className="border border-[var(--border)] bg-[var(--surface)] p-12 text-center">
                  <p className="font-[family-name:var(--font-serif)] text-2xl text-[var(--foreground)] mb-3">Message sent.</p>
                  <p className="text-xs text-[var(--accent-dim)] leading-relaxed max-w-xs mx-auto">
                    Thank you for reaching out. We&apos;ll get back to you within 2–3 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--accent-dim)] mb-2">
                        Name <span className="text-[var(--red)]">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full bg-[var(--surface)] border border-[var(--border)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--accent-dim)] focus:outline-none focus:border-[var(--accent-dim)] transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--accent-dim)] mb-2">
                        Email <span className="text-[var(--red)]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full bg-[var(--surface)] border border-[var(--border)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--accent-dim)] focus:outline-none focus:border-[var(--accent-dim)] transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--accent-dim)] mb-2">
                      Subject <span className="text-[var(--red)]">*</span>
                    </label>
                    <select
                      name="subject"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full bg-[var(--surface)] border border-[var(--border)] px-4 py-3 text-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--accent-dim)] transition-colors appearance-none"
                    >
                      <option value="" disabled>Select a subject</option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--accent-dim)] mb-2">
                      Message <span className="text-[var(--red)]">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={7}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full bg-[var(--surface)] border border-[var(--border)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--accent-dim)] focus:outline-none focus:border-[var(--accent-dim)] transition-colors resize-none"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>

                  {state === "error" && (
                    <p className="text-xs text-[var(--red)]">
                      Something went wrong. Please try again or email us directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="px-10 py-3.5 bg-[var(--red)] text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {state === "sending" ? "Sending…" : "Send Message"}
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
