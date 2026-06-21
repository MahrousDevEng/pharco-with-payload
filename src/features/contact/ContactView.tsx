"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Factory,
  Truck,
  FlaskConical,
  Newspaper,
  Briefcase,
  HelpCircle,
  Send,
  CheckCircle2,
  Building2,
} from "lucide-react";
import InnerBanner from "@/components/InnerBanner";
import EditorialImage from "@/components/editorial/EditorialImage";
import { IMG } from "@/lib/editorialImages";

const EASE_OUT: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

function useReveal(margin: `${number}${"px" | "%"}` = "-80px") {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  return [ref, inView] as const;
}

type Topic = {
  key: string;
  title: string;
  icon: typeof HelpCircle;
  body: string;
  email?: string;
  phone?: string;
};

const TOPICS: Topic[] = [
  {
    key: "general",
    title: "General Enquiries",
    icon: HelpCircle,
    body: "For any general question about Pharco Corporation or the Pharco Group.",
    email: "Portfolio@pharco-corp.com",
    phone: "+20 28138422 (33) (44)",
  },
  {
    key: "manufacturing",
    title: "Manufacturing & CMO",
    icon: Factory,
    body: "For pharmaceutical contract manufacturing partnerships, licensing arrangements and production capacity enquiries, contact Business Development at Portfolio@pharco-corp.com.",
    email: "Portfolio@pharco-corp.com",
  },
  {
    key: "distribution",
    title: "Distribution Partnerships",
    icon: Truck,
    body: "For international distribution, co-marketing or in-market commercialisation enquiries across Africa, MENA, GCC, Europe, Latin America or Asia Pacific, contact Portfolio@pharco-corp.com.",
    email: "Portfolio@pharco-corp.com",
  },
  {
    key: "rd",
    title: "R&D & Licensing",
    icon: FlaskConical,
    body: "For licensing-in, licensing-out, co-development opportunities or research collaboration enquiries, contact Business Development at Portfolio@pharco-corp.com.",
    email: "Portfolio@pharco-corp.com",
  },
  {
    key: "media",
    title: "Media & PR",
    icon: Newspaper,
    body: "For press releases, interview requests, statements or factual queries from journalists, Pharco's Corporate Communications team coordinates all media contact.",
    email: "Portfolio@pharco-corp.com",
  },
  {
    key: "careers",
    title: "Careers",
    icon: Briefcase,
    body: "For job applications and internship enquiries, please use Pharco's recruitment portal. For general HR enquiries: HR@pharco-corp.com.",
    email: "HR@pharco-corp.com",
  },
];

const COUNTRIES = [
  "Egypt",
  "Saudi Arabia",
  "United Arab Emirates",
  "Jordan",
  "Other MENA",
  "Africa",
  "Europe",
  "Latin America",
  "Asia Pacific",
  "Americas",
  "Other",
];

/* --------------------------- COMPONENTS ------------------------------- */

function TopicCard({ t, index }: { t: Topic; index: number }) {
  const [ref, inView] = useReveal("-30px");
  const Icon = t.icon;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: EASE_OUT }}
      whileHover={{ y: -6 }}
      className="group relative rounded-3xl bg-white border border-neutral-100 hover:border-primary/40 p-7 hover:shadow-xl transition-all duration-400 overflow-hidden h-full flex flex-col"
    >
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-300">
        <Icon
          className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300"
          strokeWidth={1.5}
        />
      </div>
      <h3 className="text-lg font-bold text-secondary mb-3 group-hover:text-primary transition-colors duration-300">
        {t.title}
      </h3>
      <p className="text-neutral-600 leading-relaxed text-sm mb-5 flex-1">{t.body}</p>
      <div className="space-y-2 pt-4 border-t border-neutral-100 mt-auto">
        {t.email && (
          <a
            href={`mailto:${t.email}`}
            className="flex items-center gap-2 text-xs text-secondary hover:text-primary transition-colors duration-200"
          >
            <Mail className="w-3.5 h-3.5 text-primary" strokeWidth={1.8} />
            <span className="font-medium">{t.email}</span>
          </a>
        )}
        {t.phone && (
          <a
            href={`tel:${t.phone.replace(/\s|\(|\)/g, "")}`}
            className="flex items-center gap-2 text-xs text-secondary hover:text-primary transition-colors duration-200"
          >
            <Phone className="w-3.5 h-3.5 text-primary" strokeWidth={1.8} />
            <span className="font-medium">{t.phone}</span>
          </a>
        )}
      </div>
      <motion.span
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4 }}
        style={{ originX: 0 }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
      />
    </motion.div>
  );
}

function HQItem({
  icon: Icon,
  label,
  value,
  href,
  index,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
  index: number;
}) {
  const [ref, inView] = useReveal("-20px");
  const Inner = (
    <>
      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-primary" strokeWidth={1.6} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-500 mb-1">
          {label}
        </p>
        <p className="text-secondary text-sm font-medium leading-snug break-words">{value}</p>
      </div>
    </>
  );
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {href ? (
        <a href={href} className="flex items-start gap-4 group hover:opacity-80 transition-opacity duration-200">
          {Inner}
        </a>
      ) : (
        <div className="flex items-start gap-4">{Inner}</div>
      )}
    </motion.div>
  );
}

/* ------------------------------- VIEW --------------------------------- */

export default function ContactView() {
  const [activeTopic, setActiveTopic] = useState<string>("general");
  const [submitted, setSubmitted] = useState(false);

  const [introRef, introInView] = useReveal("-60px");
  const [routingHeaderRef, routingHeaderInView] = useReveal();
  const [formRef, formInView] = useReveal("-50px");
  const [hqRef, hqInView] = useReveal("-50px");
  const [mapRef, mapInView] = useReveal();

  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartLeft = useRef(0);

  function onDragStart(e: React.MouseEvent) {
    isDragging.current = true;
    dragStartX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollStartLeft.current = scrollRef.current?.scrollLeft ?? 0;
  }
  function onDragMove(e: React.MouseEvent) {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollStartLeft.current - (x - dragStartX.current) * 1.4;
  }
  function onDragEnd() { isDragging.current = false; }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <>
      <InnerBanner
        bg="/images/manifacure.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title={
          <>
            Contact <span className="accent">Us</span>
          </>
        }
        lede="One enquiry form. Six possible reasons. We'll route you correctly."
      />

      {/* INTRO */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4">
          <div ref={introRef} className="grid md:grid-cols-12 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE_OUT }}
              className="md:col-span-5"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-secondary leading-[1.05]">
                Get in Touch<br />
                <span className="text-primary">with Pharco</span>
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={introInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.4 }}
                style={{ originX: 0 }}
                className="h-1 w-16 bg-primary rounded-full mt-7"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
              className="md:col-span-7"
            >
              <p className="text-neutral-600 leading-relaxed text-lg">
                Whether you are a healthcare professional, a potential CMO partner, a distributor,
                a journalist, a student or someone with a question about a Pharco product,
                there is a way to reach us. Use the form below or contact the relevant team
                directly.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ENQUIRY ROUTING CARDS */}
      <section className="py-20 overflow-hidden relative">
        <div className="absolute inset-0">
          <EditorialImage
            src={IMG.office}
            alt=""
            w={1800}
            h={900}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-secondary/88" />
        </div>

        <div className="relative z-10">
          <div className="max-w-[1280px] mx-auto px-4">
            <motion.div
              ref={routingHeaderRef}
              initial={{ opacity: 0, y: 28 }}
              animate={routingHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="mb-14 max-w-2xl"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.1]">
<span className="text-primary">Enquiry Routing</span>
              </h2>
            </motion.div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-6 px-4 md:px-[max(1rem,calc((100vw-1280px)/2+1rem))] cursor-grab active:cursor-grabbing select-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
            onMouseDown={onDragStart}
            onMouseMove={onDragMove}
            onMouseLeave={onDragEnd}
            onMouseUp={onDragEnd}
          >
            {TOPICS.map((t, i) => (
              <div key={t.key} className="w-[300px] md:w-[340px] shrink-0 self-stretch">
                <TopicCard t={t} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4">
          <div ref={formRef} className="grid lg:grid-cols-12 gap-12">
            {/* LEFT:INFO */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE_OUT }}
              className="lg:col-span-5"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-secondary leading-[1.1] mb-6">
                How can we <span className="text-primary">help?</span>
              </h2>
              <p className="text-neutral-600 leading-relaxed text-sm mb-8">
                Tell us what your enquiry is about and we&apos;ll route your message to the right
                team within Pharco. We typically respond within two business days.
              </p>
              <div className="rounded-3xl bg-[#f4f2eb] p-7 space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" strokeWidth={1.8} />
                  <span className="text-sm text-secondary">
                    Routed directly to the correct internal team
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" strokeWidth={1.8} />
                  <span className="text-sm text-secondary">
                    Response within 2 business days
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" strokeWidth={1.8} />
                  <span className="text-sm text-secondary">
                    Confidentiality across every enquiry
                  </span>
                </div>
              </div>
            </motion.div>

            {/* RIGHT:FORM */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
              className="lg:col-span-7"
            >
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl bg-white border border-neutral-100 p-8 md:p-10 shadow-sm"
              >
                {/* TOPIC RADIO PILLS */}
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 mb-3">
                  I&apos;m reaching out about
                </p>
                <div className="flex flex-wrap gap-2 mb-7">
                  {TOPICS.map((t) => {
                    const active = activeTopic === t.key;
                    return (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => setActiveTopic(t.key)}
                        className={`relative px-4 py-2 rounded-full text-xs font-bold transition-colors duration-200 ${
                          active
                            ? "text-white"
                            : "text-secondary bg-neutral-100 hover:bg-neutral-200"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="topicPill"
                            className="absolute inset-0 rounded-full bg-primary"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">{t.title}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="grid md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                      First name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your first name"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-primary text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                      Last name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your last name"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-primary text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-primary text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+20 ..."
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-primary text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder="Organisation name"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-primary text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                      Country
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-primary text-sm transition-colors"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                    Your message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us a little more about your enquiry..."
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-primary text-sm transition-colors resize-none"
                  />
                </div>

                <p className="text-xs text-neutral-500 leading-relaxed mb-6">
                  By submitting this form, you agree to Pharco&apos;s privacy policy. Your data
                  will only be used to respond to your enquiry.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(true)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors duration-200"
                >
                  <Send className="w-4 h-4" strokeWidth={2} />
                  Send Message
                </button>

                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="mt-5 flex items-center gap-2 text-sm text-primary justify-center"
                    >
                      <CheckCircle2 className="w-4 h-4" strokeWidth={1.8} />
                      Thank you. We&apos;ll be in touch within 2 business days.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HEADQUARTERS INFO */}
      <section className="py-20 bg-[#f7f6f1] overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4">
          <div ref={hqRef} className="grid lg:grid-cols-12 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={hqInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE_OUT }}
              className="lg:col-span-5"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-secondary leading-[1.1] mb-6">
<span className="text-primary">Headquarters</span>
              </h2>
              <p className="text-neutral-600 leading-relaxed text-sm">
                Our corporate headquarters in New Cairo houses Pharco&apos;s executive, commercial,
                legal and corporate communications teams, and is the central coordination point
                for the wider Pharco Group.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={hqInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
              className="lg:col-span-7"
            >
              <div className="rounded-3xl bg-white border border-neutral-100 p-8 md:p-10 shadow-sm space-y-6">
                <div className="flex items-center gap-3 pb-5 border-b border-neutral-100">
                  <Building2 className="w-6 h-6 text-primary" strokeWidth={1.6} />
                  <span className="font-bold text-secondary">Pharco Corporation</span>
                </div>
                <HQItem
                  icon={MapPin}
                  label="Address"
                  value="Plot 208, North 90 St., 5th Settlement, New Cairo, Cairo, Egypt"
                  index={0}
                />
                <HQItem
                  icon={Phone}
                  label="Phone"
                  value="+20 28138422 (33) (44)"
                  href="tel:+202813842233"
                  index={1}
                />
                <HQItem
                  icon={Mail}
                  label="Email"
                  value="Portfolio@pharco-corp.com"
                  href="mailto:Portfolio@pharco-corp.com"
                  index={2}
                />
                <HQItem
                  icon={Globe}
                  label="Website"
                  value="www.pharco.org"
                  href="https://www.pharco.org"
                  index={3}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4">
          <motion.div
            ref={mapRef}
            initial={{ opacity: 0, y: 28 }}
            animate={mapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-12 max-w-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-secondary leading-[1.1]">
              Find Us on the <span className="text-primary">Map</span>
            </h2>
            <p className="text-neutral-600 leading-relaxed mt-5 text-sm">
              5th Settlement, New Cairo, approximately 30 minutes from Cairo International
              Airport.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={mapInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE_OUT }}
            className="rounded-3xl overflow-hidden border border-neutral-100 shadow-sm relative"
          >
            <iframe
              title="Pharco Corporation HQ, New Cairo"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.2!2d31.4339!3d30.0080!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNew%20Cairo!5e0!3m2!1sen!2seg!4v1700000000000"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
