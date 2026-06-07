"use client";

import React, { useState, useEffect } from "react";
import { Leaf, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "80px",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 6%",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        background: isScrolled || menuOpen ? "rgba(10, 10, 10, 0.95)" : "transparent",
        backdropFilter: isScrolled || menuOpen ? "var(--glass-blur)" : "none",
        WebkitBackdropFilter: isScrolled || menuOpen ? "var(--glass-blur)" : "none",
        borderBottom: isScrolled || menuOpen ? "1px solid var(--border-light)" : "1px solid transparent",
      }}
    >
      {/* Logo */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
          zIndex: 52,
        }}
      >
        <Leaf size={24} style={{ color: "var(--accent-green)" }} />
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.4rem",
            fontWeight: "800",
            letterSpacing: "0.15em",
            color: "#ffffff",
          }}
        >
          AERO<span style={{ color: "var(--accent-green)" }}>VERT</span>
        </span>
      </div>

      {/* Nav Links (Desktop) */}
      <div
        className="nav-links-desktop"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "35px",
          fontFamily: "var(--font-heading)",
          fontSize: "0.85rem",
          fontWeight: "500",
          letterSpacing: "0.05em",
        }}
      >
        {[
          { name: "Our Farm", id: "farm-intro" },
          { name: "Why Us", id: "why-choose-us" },
          { name: "Process", id: "growing-process" },
          { name: "Crops", id: "current-crops" },
          { name: "Sustainability", id: "sustainability" },
          { name: "Bulk Supply", id: "bulk-supply" },
        ].map((item) => (
          <span
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            style={{
              color: "var(--text-secondary)",
              cursor: "pointer",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-green)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            {item.name}
          </span>
        ))}
      </div>

      {/* CTA Button (Desktop) */}
      <div className="nav-cta-desktop">
        <button
          onClick={() => scrollToSection("contact")}
          className="btn-secondary"
          style={{
            fontSize: "0.8rem",
            padding: "8px 20px",
            borderWidth: "1px",
          }}
        >
          Get A Quote
        </button>
      </div>

      {/* Mobile Menu Toggle Button */}
      <div
        className="mobile-menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          cursor: "pointer",
          zIndex: 52,
          padding: "5px",
        }}
      >
        {menuOpen ? <X size={26} color="#ffffff" /> : <Menu size={26} color="#ffffff" />}
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(5, 5, 5, 0.98)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            zIndex: 51,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            padding: "80px 20px 20px 20px",
          }}
        >
          {[
            { name: "Our Farm", id: "farm-intro" },
            { name: "Why Us", id: "why-choose-us" },
            { name: "Process", id: "growing-process" },
            { name: "Crops", id: "current-crops" },
            { name: "Sustainability", id: "sustainability" },
            { name: "Bulk Supply", id: "bulk-supply" },
          ].map((item) => (
            <span
              key={item.id}
              onClick={() => {
                scrollToSection(item.id);
                setMenuOpen(false);
              }}
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.25rem",
                fontWeight: "600",
                letterSpacing: "0.05em",
                color: "var(--text-secondary)",
                cursor: "pointer",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-green)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              {item.name}
            </span>
          ))}

          <button
            onClick={() => {
              scrollToSection("contact");
              setMenuOpen(false);
            }}
            className="btn-primary"
            style={{
              marginTop: "20px",
              width: "220px",
              justifyContent: "center",
              fontSize: "0.9rem",
              padding: "12px 24px",
            }}
          >
            Get A Quote
          </button>
        </div>
      )}
    </nav>
  );
}