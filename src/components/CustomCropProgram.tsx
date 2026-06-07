"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CustomCropProgram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    desiredCrop: "English Cucumber",
    monthlyQuantity: "",
    location: "",
    notes: "",
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.fromTo(
      container.querySelectorAll(".fade-in-el"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
        },
      }
    );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    // Simulate API submission
    setTimeout(() => {
      setFormState("success");
    }, 1500);
  };

  return (
    <section
      id="custom-crop-program"
      ref={containerRef}
      className="contact-section"
      style={{
        position: "relative",
        backgroundColor: "var(--bg-primary)",
        padding: "120px 6%",
        color: "#ffffff",
        zIndex: 2,
        overflow: "hidden",
      }}
    >
      <div className="grid-bg" />
      <div className="grid-bg-mask" />
      <div className="green-glow-bg" style={{ top: "-100px", left: "-100px" }} />

      <div
        className="contact-layout"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "60px",
          maxWidth: "1100px",
          margin: "0 auto",
          position: "relative",
          zIndex: 5,
        }}
      >
        {/* Left Info Text */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span
            className="fade-in-el"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "0.85rem",
              fontWeight: "700",
              letterSpacing: "0.2em",
              color: "var(--accent-green)",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "10px",
            }}
          >
            B2B Cultivation
          </span>
          <h2
            className="fade-in-el"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 4.5vw, 3rem)",
              fontWeight: "800",
              color: "#ffffff",
              marginBottom: "20px",
              lineHeight: "1.15",
            }}
          >
            Custom Crop <span className="text-gradient-green">Partnership Program</span>
          </h2>
          <p
            className="fade-in-el"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1rem",
              color: "var(--text-secondary)",
              lineHeight: "1.6",
              fontWeight: "300",
              marginBottom: "24px",
            }}
          >
            For large retail chains, exporters, and commercial processors, we offer custom-dedicated greenhouse acreage. Set your specifications (size, length, sugar levels, and weekly delivery targets) and we will calibrate a dedicated climate zone exclusively for your supply chain.
          </p>
          <div
            className="fade-in-el"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              fontSize: "0.9rem",
              color: "var(--text-secondary)",
              fontFamily: "var(--font-sans)",
              fontWeight: "300",
            }}
          >
            {[
              "Dedicated climate-controlled acreage blocks",
              "Precision custom growth specs (Brix levels, sizes)",
              "Locked-in yearly pricing contract guarantees",
              "Exclusive harvest logs and tracking dashboards",
            ].map((text, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(16,185,129,0.1)",
                    border: "1px solid var(--border-green)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--accent-green)" }} />
                </div>
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Right Form Card */}
        <div className="fade-in-el">
          <div
            className="glass-panel contact-form-panel"
            style={{
              padding: "40px 30px",
              borderRadius: "20px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {formState === "success" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "40px 20px",
                  gap: "20px",
                }}
              >
                <CheckCircle2 size={64} style={{ color: "var(--accent-green)" }} />
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#ffffff",
                  }}
                >
                  Assessment Submitted Successfully
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                    lineHeight: "1.6",
                    fontWeight: "300",
                    maxWidth: "400px",
                  }}
                >
                  Thank you for submitting your specifications. Our agricultural engineers and supply managers will review your requirements and reach out within 24 hours to schedule a consultation.
                </p>
                <button onClick={() => setFormState("idle")} className="btn-secondary" style={{ marginTop: "10px" }}>
                  Submit Another Inward Spec
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div className="form-row-grid">
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "8px", fontWeight: "600" }}>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input" style={{ width: "100%" }} placeholder="John Doe" />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "8px", fontWeight: "600" }}>Company Name</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} required className="form-input" style={{ width: "100%" }} placeholder="Supermarket Corp" />
                  </div>
                </div>

                <div className="form-row-grid">
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "8px", fontWeight: "600" }}>Business Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" style={{ width: "100%" }} placeholder="buyer@company.com" />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "8px", fontWeight: "600" }}>Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="form-input" style={{ width: "100%" }} placeholder="+1 (555) 000-0000" />
                  </div>
                </div>

                <div className="form-row-grid">
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "8px", fontWeight: "600" }}>Desired Crop Type</label>
                    <select name="desiredCrop" value={formData.desiredCrop} onChange={handleChange} className="form-input" style={{ width: "100%", appearance: "none" }}>
                      <option value="English Cucumber">English Cucumber</option>
                      <option value="Truss Tomato">Truss Tomato</option>
                      <option value="Sweet Bell Capsicum">Sweet Bell Capsicum</option>
                      <option value="Other / Multiple">Other / Multiple</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "8px", fontWeight: "600" }}>Monthly Required Vol (Tons)</label>
                    <input type="text" name="monthlyQuantity" value={formData.monthlyQuantity} onChange={handleChange} required className="form-input" style={{ width: "100%" }} placeholder="e.g. 50 Tons" />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "8px", fontWeight: "600" }}>Delivery Location / Hubs</label>
                  <input type="text" name="location" value={formData.location} onChange={handleChange} required className="form-input" style={{ width: "100%" }} placeholder="City, Country / Warehouse Address" />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "8px", fontWeight: "600" }}>Custom Growing Specs & Packaging Request</label>
                  <textarea name="notes" value={formData.notes} onChange={handleChange} rows={4} className="form-input" style={{ width: "100%", resize: "none" }} placeholder="e.g. Custom packaging box layout, grade-A specs criteria, long term contracts, or greenhouse tours request." />
                </div>

                <button type="submit" disabled={formState === "submitting"} className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px 28px", fontSize: "0.9rem", marginTop: "10px" }}>
                  {formState === "submitting" ? "Registering Inquest..." : (
                    <>
                      <Send size={16} />
                      Register For Dedicated Acreage
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}