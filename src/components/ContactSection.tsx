"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    crop: "English Cucumber",
    qty: "",
    msg: "",
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.fromTo(
      container.querySelectorAll(".fade-up-contact"),
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
    setTimeout(() => {
      setFormState("success");
    }, 1500);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="contact-section"
      style={{
        position: "relative",
        backgroundColor: "var(--bg-secondary)",
        padding: "120px 6%",
        color: "#ffffff",
        zIndex: 2,
        overflow: "hidden",
      }}
    >
      <div className="grid-bg" />
      <div className="grid-bg-mask" />
      <div className="sun-glow-bg" style={{ top: "-150px", right: "20%" }} />

      <div
        className="contact-layout"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "60px",
          maxWidth: "1100px",
          margin: "0 auto",
          position: "relative",
          zIndex: 5,
        }}
      >
        {/* Info Side */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span
            className="fade-up-contact"
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
            Direct Inquiry
          </span>
          <h2
            className="fade-up-contact"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 4.5vw, 3rem)",
              fontWeight: "800",
              color: "#ffffff",
              marginBottom: "30px",
              lineHeight: "1.15",
            }}
          >
            Connect With Our <span className="text-gradient-green">Supply Desk</span>
          </h2>
          <p
            className="fade-up-contact"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.95rem",
              color: "var(--text-secondary)",
              lineHeight: "1.6",
              fontWeight: "300",
              marginBottom: "40px",
            }}
          >
            Looking to establish contract pricing or require immediate wholesale spot-buys? Drop our trading desk a note, or contact us directly via our direct corporate lines.
          </p>

          {/* Contact Methods */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {[
              {
                icon: <Phone size={20} style={{ color: "var(--accent-green)" }} />,
                label: "Call Supply Desk",
                val: "+91 7976785195",
                href: "tel:+917976785195"
              },
              {
                icon: <Mail size={20} style={{ color: "var(--accent-green)" }} />,
                label: "Email Purchase Orders",
                val: "supply@meenakrishifarm.com",
                href: "mailto:supply@meenakrishifarm.com"
              },
              {
                icon: <MapPin size={20} style={{ color: "var(--accent-green)" }} />,
                label: "Corporate Office & Farms",
                val: "Meena Krishi Farm, Sewad Chhoti, Post Sewad Badi, Sikar, Rajasthan, 332042",
                href: "https://www.google.com/maps/search/?api=1&query=HXPC%2B69%2C+Sewad+Chhoti%2C+Rajasthan+332041"
              },
              {
                icon: <Clock size={20} style={{ color: "var(--accent-green)" }} />,
                label: "Business Hours",
                val: "8 AM to 9 PM, All Days",
                href: null
              }
            ].map((method, idx) => (
              <div key={idx} className="fade-up-contact" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(16,185,129,0.05)",
                    border: "1px solid var(--border-green)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {method.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>{method.label}</span>
                  {method.href ? (
                    <a
                      href={method.href}
                      target={method.href.startsWith("http") ? "_blank" : undefined}
                      rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      style={{
                        fontSize: "0.95rem",
                        color: "#ffffff",
                        fontWeight: "500",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                        display: "inline-block",
                        lineHeight: "1.4"
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-green)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
                    >
                      {method.val}
                    </a>
                  ) : (
                    <span style={{ fontSize: "0.95rem", color: "#ffffff", fontWeight: "500", lineHeight: "1.4" }}>
                      {method.val}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Side */}
        <div className="fade-up-contact">
          <div className="glass-panel contact-form-panel" style={{ padding: "40px 30px", borderRadius: "20px" }}>
            {formState === "success" ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "40px 10px", gap: "20px" }}>
                <CheckCircle2 size={64} style={{ color: "var(--accent-green)" }} />
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: "700" }}>Inquiry Logged</h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.6", fontWeight: "300" }}>
                  A trade manager will reach out shortly with our latest price matrix sheet.
                </p>
                <button onClick={() => setFormState("idle")} className="btn-secondary">Submit New Quote Request</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div className="form-row-grid">
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "8px", fontWeight: "600" }}>Your Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input" style={{ width: "100%" }} placeholder="Aman Meena" />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "8px", fontWeight: "600" }}>Company</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} required className="form-input" style={{ width: "100%" }} placeholder="Exporters Ltd" />
                  </div>
                </div>

                <div className="form-row-grid">
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "8px", fontWeight: "600" }}>Business Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" style={{ width: "100%" }} placeholder="aman@exporters.com" />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "8px", fontWeight: "600" }}>Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="form-input" style={{ width: "100%" }} placeholder="+91 99999 99999" />
                  </div>
                </div>

                <div className="form-row-grid">
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "8px", fontWeight: "600" }}>Crop Interested</label>
                    <select name="crop" value={formData.crop} onChange={handleChange} className="form-input" style={{ width: "100%" }}>
                      <option value="English Cucumber">English Cucumber</option>
                      <option value="Truss Tomato">Truss Tomato</option>
                      <option value="Sweet Bell Capsicum">Sweet Bell Capsicum</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "8px", fontWeight: "600" }}>Required Qty</label>
                    <input type="text" name="qty" value={formData.qty} onChange={handleChange} required className="form-input" style={{ width: "100%" }} placeholder="e.g. 15 Tons" />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "8px", fontWeight: "600" }}>Specifications or Requirements</label>
                  <textarea name="msg" value={formData.msg} onChange={handleChange} rows={4} className="form-input" style={{ width: "100%", resize: "none" }} placeholder="Specify size metrics, packing requirements, delivery frequency target..." />
                </div>

                <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: "0.9rem" }}>
                  <Send size={16} />
                  Submit Price Request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}