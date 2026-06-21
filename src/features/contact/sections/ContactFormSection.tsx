"use client";
import { useState } from "react";
import { Reveal } from "@/components/inner/Reveal";

export default function ContactFormSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("sent");
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_380px] gap-16">
          {/* Form */}
          <Reveal>
            <h2 className="font-bold text-[clamp(28px,4vw,42px)] text-secondary mb-8">
              Send us a <span className="text-primary">message</span>
            </h2>
            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-5 text-2xl">
                  ✓
                </div>
                <h3 className="font-bold text-xl text-secondary mb-2">Message received</h3>
                <p className="text-neutral-500">Thank you for reaching out. We&apos;ll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-1.5">First name</label>
                    <input
                      type="text"
                      required
                      className="w-full border border-neutral-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition"
                      placeholder="Ahmed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-1.5">Last name</label>
                    <input
                      type="text"
                      required
                      className="w-full border border-neutral-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition"
                      placeholder="Mohamed"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1.5">Email address</label>
                  <input
                    type="email"
                    required
                    className="w-full border border-neutral-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1.5">Subject</label>
                  <select className="w-full border border-neutral-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition bg-white">
                    <option>General Enquiry</option>
                    <option>Medical / Product Information</option>
                    <option>Business Partnership</option>
                    <option>Career Enquiry</option>
                    <option>Media / Press</option>
                    <option>Pharmacovigilance / Safety Report</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full border border-neutral-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-primary text-white font-semibold py-3.5 rounded-lg hover:bg-primary/90 transition disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </Reveal>

          {/* Sidebar */}
          <Reveal delay={0.15}>
            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-secondary mb-4">Head Office</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Pharco Corporation<br />
                  Industrial Zone, Abu Qir<br />
                  Alexandria, Egypt
                </p>
              </div>
              <div>
                <h3 className="font-bold text-secondary mb-4">Contact Details</h3>
                <div className="space-y-2 text-sm text-neutral-600">
                  <p>Tel: +20 3 560 1234</p>
                  <p>Fax: +20 3 560 5678</p>
                  <p>Email: info@pharco.com</p>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-secondary mb-4">Medical Information</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  For healthcare professionals seeking product information or to report an adverse event, please contact our Medical Affairs team directly at:
                </p>
                <p className="text-sm text-primary font-medium mt-2">medical@pharco.com</p>
              </div>
              <div>
                <h3 className="font-bold text-secondary mb-4">Business Hours</h3>
                <div className="space-y-1 text-sm text-neutral-600">
                  <p>Sunday to Thursday: 8:00 am to 5:00 pm</p>
                  <p>Friday to Saturday: Closed</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
