"use client";

import React from "react";
import { Leaf } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "#050505",
        borderTop: "1px solid var(--border-light)",
        padding: "80px 6% 40px 6%",
        color: "var(--text-muted)",
        fontFamily: "var(--font-sans)",
        fontSize: "0.85rem",
        zIndex: 2,
        position: "relative",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "40px",
          marginBottom: "60px",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Leaf size={20} style={{ color: "var(--accent-green)" }} />
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.2rem",
                fontWeight: "800",
                letterSpacing: "0.15em",
                color: "#ffffff",
              }}
            >
              Meenakrishi<span style={{ color: "var(--accent-green)" }}> Farm</span>
            </span>
          </div>
          <p style={{ lineHeight: "1.6", fontWeight: "300" }}>
            10 acres of fully automated climate-controlled greenhouse production delivering premium crops for high-end markets.
          </p>
        </div>

        {/* Crops Links */}
        <div>
          <h4
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "0.85rem",
              fontWeight: "600",
              color: "#ffffff",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "20px",
            }}
          >
            Crops Portfolio
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontWeight: "300" }}>
            <span>English Cucumber</span>
            <span>Truss Tomato</span>
            <span>Sweet Bell Capsicum</span>
            <span>Custom Farm Programs</span>
          </div>
        </div>

        {/* Legal Links */}
        <div>
          <h4
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "0.85rem",
              fontWeight: "600",
              color: "#ffffff",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "20px",
            }}
          >
            Compliance & Legal
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontWeight: "300" }}>
            <span>Pesticide-Free Certifications</span>
            <span>Water Recycling Reports</span>
            <span>Privacy Policy</span>
            <span>Terms of Procurement</span>
          </div>
        </div>

        {/* Location Links */}
        <div>
          <h4
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "0.85rem",
              fontWeight: "600",
              color: "#ffffff",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "20px",
            }}
          >
            Farm Location
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontWeight: "300" }}>
            <a
              href="https://www.google.com/maps/search/?api=1&query=HXPC%2B69%2C+Sewad+Chhoti%2C+Rajasthan+332041"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--text-muted)",
                textDecoration: "none",
                transition: "color 0.2s ease",
                lineHeight: "1.5",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-green)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              Meena Krishi Farm, Sewad Chhoti,
              <br />
              Post Sewad Badi, Sikar,
              <br />
              Rajasthan, 332042
            </a>
            <span>visits@meenakrishifarm.com</span>
            <span>8 AM to 9 PM, All Days</span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.03)",
          paddingTop: "30px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "15px",
          fontSize: "0.75rem",
          fontWeight: "300",
        }}
      >
        <span>© {currentYear} MEENAKRISHI FARM. All Rights Reserved.</span>
        <span>Corporate Identity: U01400HR2026PTC099120</span>
      </div>
    </footer>
  );
}