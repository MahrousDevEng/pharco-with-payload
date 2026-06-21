"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import InnerBanner from "@/components/InnerBanner";
import CTALink from "@/components/CTALink";
import { JOBS } from "../jobs-data";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const FADE_UP = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: EASE },
});

const DEPARTMENTS = [
  "Research & Development",
  "Manufacturing",
  "Quality Assurance",
  "Quality Control",
  "Regulatory Affairs",
  "Sales & Marketing",
  "Corporate",
  "Other",
];

export default function ApplyContent() {
  const params = useSearchParams();
  const jobId = params.get("id") ?? "";
  const isInternship = params.get("type") === "internship";

  const job = JOBS.find((j) => j.id === jobId) ?? null;

  const displayRole = isInternship ? "Pharco Internship Programme" : (job?.title ?? params.get("role") ?? "");
  const displayDept = isInternship ? "" : (job?.dept ?? params.get("dept") ?? "");

  return (
    <>
      <InnerBanner
        bg="/images/career.jpg"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
          { label: isInternship ? "Internship Programme" : (job?.title ?? "Apply") },
        ]}
        title={
          isInternship ? (
            <>Apply for the <span className="accent">Internship Programme</span></>
          ) : job ? (
            <>{job.title.split(",")[0].trim()} <span className="accent">{job.title.includes(",") ? `${job.title.split(",").slice(1).join(",").trim()}` : ""}</span></>
          ) : (
            <>Apply to <span className="accent">Pharco</span></>
          )
        }
        lede={
          isInternship
            ? "Apply for our structured internship programme and start your pharmaceutical career at Pharco."
            : job
            ? `${job.dept} · ${job.loc} · ${job.type} · ${job.lvl}`
            : "Submit your application and tell us about yourself. We'll be in touch within five working days."
        }
      />

      <section className="section apply-section">
        {/* decorative animated accent line */}
        <motion.div
          className="apply-accent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
        />
        <div className="container apply-stack">

          {/* ── Details on top ── */}
          {isInternship && (
            <div className="apply-detail">
              <motion.div className="apply-hero-media" {...FADE_UP(0)}>
                <img src="/images/2.jpg" alt="Life at Pharco" />
                <div className="apply-hero-media-overlay">
                  <span className="apply-hero-eyebrow">Internship Programme</span>
                  <h2 className="apply-hero-title">Start your career at Pharco</h2>
                </div>
              </motion.div>

              <motion.div className="job-section" {...FADE_UP(0.1)}>
                <ul className="job-list-items">
                  <li>Work inside real teams on live projects — not observation programmes</li>
                  <li>Mentorship from experienced professionals across R&amp;D, manufacturing and commercial functions</li>
                  <li>A pathway to full-time roles — many of Pharco&apos;s managers started as interns</li>
                </ul>
              </motion.div>
            </div>
          )}

          {/* ── General apply (no job, no internship param) ── */}
          {!job && !isInternship && (
            <div className="apply-detail">
              <motion.div className="apply-hero-media" {...FADE_UP(0)}>
                <img src="/images/career.jpg" alt="Life at Pharco" style={{ objectPosition: "center top" }} />
                <div className="apply-hero-media-overlay">
                  <span className="apply-hero-eyebrow">Open Application</span>
                  <h2 className="apply-hero-title">Tell us where you&apos;d fit</h2>
                </div>
              </motion.div>

              <motion.div className="job-section" {...FADE_UP(0.1)}>
                <ul className="job-list-items">
                  <li>Work inside real teams on live projects — not observation programmes</li>
                  <li>Mentorship from experienced professionals across R&amp;D, manufacturing and commercial functions</li>
                  <li>A pathway to full-time roles — many of Pharco&apos;s managers started as interns</li>
                </ul>
              </motion.div>
            </div>
          )}

          {/* ── Job detail ── */}
          {job && !isInternship && (
            <div className="apply-detail-split">
              {/* Left: all job info */}
              <div className="apply-detail-grid">
                <motion.div className="apply-role-card" {...FADE_UP(0)}>
                  <div className="apply-role-info">
                    <span className="apply-role-dept">{job.dept}</span>
                    <span className="apply-role-title">{job.title}</span>
                  </div>
                  <Link href="/careers" className="apply-role-back">← Other roles</Link>
                </motion.div>

                <motion.div className="job-meta-row" {...FADE_UP(0.06)}>
                  <div className="job-meta-pill"><span>Location</span>{job.loc}</div>
                  <div className="job-meta-pill"><span>Type</span>{job.type}</div>
                  <div className="job-meta-pill"><span>Level</span>{job.lvl}</div>
                </motion.div>

                <motion.div className="job-section" {...FADE_UP(0.1)}>
                  <h4 className="job-section-heading">Role Overview</h4>
                  <p className="job-overview-text">{job.overview}</p>
                </motion.div>

                <motion.div className="job-section" {...FADE_UP(0.14)}>
                  <h4 className="job-section-heading">Key Responsibilities</h4>
                  <ul className="job-list-items">
                    {job.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div className="job-section" {...FADE_UP(0.18)}>
                  <h4 className="job-section-heading">Requirements</h4>
                  <ul className="job-list-items">
                    {job.requirements.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </motion.div>

                {job.preferred.length > 0 && (
                  <motion.div className="job-section" {...FADE_UP(0.22)}>
                    <h4 className="job-section-heading">Nice to Have</h4>
                    <ul className="job-list-items preferred">
                      {job.preferred.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>

              {/* Right: sticky image alongside the full job info */}
              <motion.aside className="apply-detail-aside" {...FADE_UP(0.16)}>
                <div className="apply-detail-sticky">
                  <img src="/images/career.jpg" alt="Working at Pharco" />
                </div>
              </motion.aside>
            </div>
          )}

          {/* ── Application form (centered) ── */}
          <div className="apply-form-col">
            {isInternship && (
              <motion.div className="apply-role-card" {...FADE_UP(0)}>
                <div className="apply-role-info">
                  <span className="apply-role-title">Pharco Internship Programme</span>
                </div>
                <Link href="/careers" className="apply-role-back">← Other roles</Link>
              </motion.div>
            )}

            {!job && !isInternship && displayRole && (
              <motion.div className="apply-role-card" {...FADE_UP(0)}>
                <div className="apply-role-info">
                  {displayDept && <span className="apply-role-dept">{displayDept}</span>}
                  <span className="apply-role-title">{displayRole}</span>
                </div>
                <Link href="/careers" className="apply-role-back">← Other roles</Link>
              </motion.div>
            )}

            <motion.h2 className="apply-form-title" {...FADE_UP(0.05)}>
              Apply <span>Now</span>
            </motion.h2>

            <motion.div className="form-wrap" {...FADE_UP(0.1)}>
              <form>
                  <div className="form-row">
                    <div className="form-field">
                      <label>First name <span style={{ color: "var(--primary)" }}>*</span></label>
                      <input type="text" placeholder="Your first name" required />
                    </div>
                    <div className="form-field">
                      <label>Last name <span style={{ color: "var(--primary)" }}>*</span></label>
                      <input type="text" placeholder="Your last name" required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label>Email address <span style={{ color: "var(--primary)" }}>*</span></label>
                      <input type="email" placeholder="you@email.com" required />
                    </div>
                    <div className="form-field">
                      <label>Phone number</label>
                      <input type="tel" placeholder="+20 ..." />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label>Position applied for <span style={{ color: "var(--primary)" }}>*</span></label>
                      <input
                        type="text"
                        defaultValue={displayRole}
                        placeholder="Role title"
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>Department</label>
                      <select defaultValue={displayDept || ""}>
                        <option value="" disabled>Select department</option>
                        {DEPARTMENTS.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field full">
                      <label>LinkedIn profile URL <span style={{ color: "#aaa", fontWeight: 400 }}>(optional)</span></label>
                      <input type="url" placeholder="https://linkedin.com/in/your-profile" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field full">
                      <label>
                        Upload your CV <span style={{ color: "var(--primary)" }}>*</span>
                        <span style={{ fontWeight: 400, color: "#999", marginLeft: 6, textTransform: "none", letterSpacing: 0 }}>PDF or Word · max 5 MB</span>
                      </label>
                      <input type="file" accept=".pdf,.doc,.docx" required className="file-input" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field full">
                      <label>
                        Cover letter <span style={{ color: "#aaa", fontWeight: 400 }}>(optional)</span>
                      </label>
                      <textarea
                        placeholder="Tell us why you want to work at Pharco, what makes you a strong candidate, and what you're looking for in your next role..."
                        style={{ minHeight: 160 }}
                      />
                    </div>
                  </div>
                  <div className="form-row" style={{ marginTop: 4 }}>
                    <div className="form-field full apply-consent">
                      <input type="checkbox" id="privacy-consent" required />
                      <label htmlFor="privacy-consent" className="apply-consent-label">
                        I agree to Pharco&apos;s privacy policy. My information will be used solely for recruitment purposes and retained for 12 months.
                      </label>
                    </div>
                  </div>
                  <button type="submit" className="cta-solid" style={{ width: "100%", justifyContent: "center", marginTop: 12, fontSize: 15 }}>
                    Submit Application
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: 4 }}>
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </form>
              </motion.div>

              <motion.p
                style={{ textAlign: "center", color: "#888", fontSize: 13, marginTop: 24, lineHeight: 1.7 }}
                {...FADE_UP(0.2)}
              >
                Questions? Email{" "}
                <a href="mailto:careers@pharco-corp.com" style={{ color: "var(--primary)", fontWeight: 600 }}>
                  careers@pharco-corp.com
                </a>
              </motion.p>
            </div>
          </div>
      </section>

      <section className="py-16 bg-[#1a1a1a] relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 relative">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 block">
              Careers
            </span>
            <h3 className="text-white text-3xl md:text-4xl font-bold mb-4">
              Not ready to apply <span className="text-primary">yet?</span>
            </h3>
            <p className="text-white/65 text-sm leading-relaxed mb-8">
              Browse all open positions or learn more about life at Pharco before you decide.
            </p>
            <div className="flex justify-center">
              <CTALink href="/careers" variant="dark">Back to Careers</CTALink>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* Layout — single centered column, details on top */
        .apply-section { position: relative; overflow: visible; }
        .apply-accent {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          transform-origin: left center;
          background: linear-gradient(90deg, var(--primary), rgba(224,126,39,0.25) 70%, transparent);
        }
        .apply-stack {
          max-width: 1080px;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .apply-detail {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .apply-detail-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        .apply-detail-split {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 24px;
          align-items: stretch;
        }
        .apply-detail-aside {
          height: 100%;
        }
        @media (max-width: 720px) {
          .apply-detail-split { grid-template-columns: 1fr; }
          .apply-detail-aside { display: none; }
        }
        .apply-detail-sticky {
          position: sticky;
          top: 100px;
          border-radius: 16px;
          overflow: hidden;
          line-height: 0;
          box-shadow: 0 18px 50px -22px rgba(0,0,0,0.35);
        }
        .apply-detail-sticky img {
          width: 100%;
          height: 620px;
          object-fit: cover;
          object-position: center;
          transition: transform 1.1s ease;
        }
        .apply-detail-sticky:hover img { transform: scale(1.04); }
        .apply-form-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          max-width: 780px;
          margin-inline: auto;
        }
        .apply-form-title {
          font-family: 'DMSerifDisplay', serif;
          font-size: clamp(30px, 4vw, 44px);
          color: var(--secondary);
          line-height: 1.1;
          margin: 0;
          text-align: center;
        }
        .apply-form-title span { color: var(--primary); }

        /* Hero media header (internship / general) */
        .apply-hero-media {
          position: relative;
          border-radius: 22px;
          overflow: hidden;
          line-height: 0;
          box-shadow: 0 18px 50px -20px rgba(0,0,0,0.35);
        }
        .apply-hero-media img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          object-position: center;
          transition: transform 1.1s ease;
        }
        .apply-hero-media:hover img { transform: scale(1.05); }
        .apply-hero-media-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 28px;
          background: linear-gradient(to top, rgba(0,0,0,0.78), rgba(0,0,0,0.15) 55%, transparent);
        }
        .apply-hero-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--primary);
          margin-bottom: 8px;
        }
        .apply-hero-title {
          font-family: 'DMSerifDisplay', serif;
          font-size: clamp(24px, 4vw, 34px);
          color: #fff;
          margin: 0;
          line-height: 1.15;
        }

        /* Form header row */
        .apply-form-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }
        .apply-form-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          font-weight: 700;
          color: var(--primary);
          background: rgba(224,126,39,0.08);
          border: 1px solid rgba(224,126,39,0.22);
          padding: 5px 12px;
          border-radius: 999px;
          letter-spacing: 0.02em;
        }

        /* Role card */
        .apply-role-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          background: rgba(224, 126, 39, 0.06);
          border: 1px solid rgba(224, 126, 39, 0.28);
          border-radius: 14px;
          padding: 18px 24px;
          flex-wrap: wrap;
        }
        .apply-role-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .apply-role-dept {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--primary);
        }
        .apply-role-title {
          font-size: 17px;
          font-weight: 700;
          color: var(--secondary);
        }
        .apply-role-back {
          font-size: 13px;
          font-weight: 600;
          color: #777;
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.2s;
        }
        .apply-role-back:hover { color: var(--primary); }

        /* Job detail sections */
        .job-section {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 14px;
          padding: 22px 26px;
        }
        .job-section-heading {
          font-family: 'DMSerifDisplay', serif;
          font-size: 16px;
          color: var(--secondary);
          margin: 0 0 14px;
          padding-bottom: 10px;
          border-bottom: 2px solid rgba(224,126,39,0.18);
        }
        .job-overview-text {
          font-size: 14.5px;
          color: #444;
          line-height: 1.8;
          margin: 0;
        }
        .job-list-items {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .job-list-items li {
          font-size: 14px;
          color: #444;
          line-height: 1.65;
          padding-left: 20px;
          position: relative;
        }
        .job-list-items li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 8px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--primary);
          opacity: 0.75;
        }
        .job-list-items.preferred li::before {
          background: #aaa;
          opacity: 0.6;
        }
        .job-meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .job-meta-pill {
          display: flex;
          flex-direction: column;
          gap: 2px;
          background: #f7f3ec;
          border: 1px solid #e8dfc8;
          border-radius: 10px;
          padding: 10px 16px;
          flex: 1;
          min-width: 90px;
        }
        .job-meta-pill span {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--primary);
        }
        .job-meta-pill {
          font-size: 13px;
          font-weight: 700;
          color: var(--secondary);
        }

        /* File input */
        .file-input {
          padding: 10px 12px !important;
          cursor: pointer;
          background: #faf6ec !important;
        }
        .file-input::file-selector-button {
          background: var(--primary);
          color: #fff;
          border: none;
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          margin-right: 12px;
          letter-spacing: 0.04em;
          transition: background 0.2s;
        }
        .file-input::file-selector-button:hover { background: #c66c1c; }

        /* Consent */
        .apply-consent {
          flex-direction: row !important;
          align-items: flex-start;
          gap: 12px;
        }
        .apply-consent input[type="checkbox"] {
          margin-top: 3px;
          accent-color: var(--primary);
          flex-shrink: 0;
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
        .apply-consent-label {
          font-size: 12.5px !important;
          color: #666 !important;
          line-height: 1.6 !important;
          font-weight: 400 !important;
          letter-spacing: 0 !important;
          text-transform: none !important;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
