"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import InnerBanner from "@/components/InnerBanner";
import CTALink from "@/components/CTALink";

export default function ProductDetailClient() {
  const [n, setN] = useState("CIPROFAR");
  const [ta, setTa] = useState("Antimicrobial");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pn = params.get("n");
    const pt = params.get("ta");
    if (pn) setN(pn);
    if (pt) setTa(pt);
    document.title = `${pn || "Product"} · Pharco`;
  }, []);

  return (
    <>
      <InnerBanner
        bg="/images/manifacure.jpg"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products-overview" },
          { label: ta, href: "/products-therapeutic-areas" },
          { label: n },
        ]}
        title={<>{n} <span className="accent">· {ta}</span></>}
        lede="Brand information, indication summary, and prescribing details for this product."
      />

      <section className="pd-hero" data-screen-label="Product Detail · Hero">
        <div className="container">

          <div className="pd-grid">
            <div className="pd-pack reveal">
              <div className="ph">
                <div className="pill"></div>
                <div className="label">Pack shot · TBD</div>
              </div>
            </div>

            <div className="pd-info reveal delay-1">
              <span className="ta-tag">{ta}</span>
              <h1>{n}</h1>
              <p className="strap">Brand information, indication summary, and prescribing details below.</p>

              <div className="spec-table">
                <div className="spec-row"><span className="key">Brand Name</span><span className="val">{n}</span></div>
                <div className="spec-row"><span className="key">Active Ingredient</span><span className="val">To be supplied by Marketing team</span></div>
                <div className="spec-row"><span className="key">Strengths Available</span><span className="val">To be supplied by Marketing team</span></div>
                <div className="spec-row"><span className="key">Dosage Form</span><span className="val">To be supplied by Marketing team</span></div>
                <div className="spec-row"><span className="key">Pack Size(s)</span><span className="val">To be supplied by Marketing team</span></div>
                <div className="spec-row"><span className="key">ATC Code</span><span className="val">To be supplied by Regulatory team</span></div>
                <div className="spec-row"><span className="key">Therapeutic Area</span><span className="val">{ta}</span></div>
                <div className="spec-row"><span className="key">Rx / OTC</span><span className="val">To be confirmed</span></div>
                <div className="spec-row"><span className="key">Marketed In</span><span className="val">Egypt and select export markets</span></div>
              </div>

              <div className="pd-ctas">
                <CTALink href="/contact">Request Information</CTALink>
                <CTALink href="/products-overview">Back to all products</CTALink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
