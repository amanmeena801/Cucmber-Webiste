"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShoppingBag, ChevronRight, Check } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CurrentCrops() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Fade in section header
    gsap.fromTo(
      container.querySelectorAll(".fade-up-header"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
        },
      }
    );

    // Cards staggered fade-in
    gsap.fromTo(
      container.querySelectorAll(".crop-card"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".crops-grid",
          start: "top 75%",
        },
      }
    );
  }, []);

  const handleOrder = () => {
    const contactSec = document.getElementById("contact");
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  const crops = [
    {
      name: "Premium English Cucumber",
      img: "/assets/cucumber.png",
      tag: "Year-Round",
      desc: "Uniform, seedless, dark-green cucumbers with crisp texture and thin bitter-free skin, preferred by high-end retail chains and luxury hotels.",
      specs: [
        { label: "Standard Length", val: "30cm - 35cm" },
        { label: "Average Weight", val: "350g - 400g" },
        { label: "Brix Sugar Level", val: "3.8% - 4.2%" },
        { label: "Greenhouse Temp", val: "18°C - 20°C" },
      ],
      color: "var(--accent-green)",
    },
    {
      name: "Vine-Ripened Truss Tomato",
      img: "/assets/tomato.png",
      tag: "High-Yield",
      desc: "Deep red beefsteak and truss varieties grown under optimized climate chambers. Packed with lycopene, featuring uniform sizing and long post-harvest shelf life.",
      specs: [
        { label: "Fruit Diameter", val: "75mm - 80mm" },
        { label: "Average Weight", val: "150g - 180g" },
        { label: "Brix Sugar Level", val: "4.8% - 5.5%" },
        { label: "Greenhouse Temp", val: "20°C - 22°C" },
      ],
      color: "var(--accent-green)",
    },
    {
      name: "Sweet Bell Capsicum",
      img: "/assets/capsicum.png",
      tag: "Export Grade",
      desc: "Blocky, thick-walled bell peppers in vibrant red, yellow, and orange. Naturally sweet, firm flesh with high water retention and superb shipping durability.",
      specs: [
        { label: "Standard Size", val: "85mm - 90mm" },
        { label: "Average Weight", val: "200g - 240g" },
        { label: "Brix Sugar Level", val: "5.0% - 6.0%" },
        { label: "Greenhouse Temp", val: "21°C - 23°C" },
      ],
      color: "var(--accent-green)",
    },
  ];

  return (
    <section
      id="current-crops"
      ref={containerRef}
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
      <div className="sun-glow-bg" style={{ top: "-150px", left: "10%" }} />

      {/* Header */}
      <div
        style={{
          maxWidth: "800px",
          marginBottom: "80px",
          position: "relative",
          zIndex: 5,
        }}
      >
        <span
          className="fade-up-header"
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
          Product Portfolio
        </span>
        <h2
          className="fade-up-header"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2rem, 4.5vw, 3rem)",
            fontWeight: "800",
            color: "#ffffff",
          }}
        >
          Our Premium Greenhouse <span className="text-gradient-green">Crops</span>
        </h2>
      </div>

      {/* Crops Cards Grid */}
      <div
        className="crops-grid"
        style={{
          position: "relative",
          zIndex: 5,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "30px",
          width: "100%",
        }}
      >
        {crops.map((crop, idx) => (
          <div
            key={idx}
            className="glass-panel crop-card"
            style={{
              display: "flex",
              flexDirection: "column",
              borderRadius: "20px",
              overflow: "hidden",
              transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.borderColor = "var(--border-green-hover)";
              const img = e.currentTarget.querySelector(".crop-img") as HTMLImageElement;
              if (img) img.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "var(--glass-border)";
              const img = e.currentTarget.querySelector(".crop-img") as HTMLImageElement;
              if (img) img.style.transform = "scale(1)";
            }}
          >
            {/* Image container */}
            <div
              style={{
                position: "relative",
                height: "240px",
                width: "100%",
                overflow: "hidden",
                backgroundColor: "rgba(255,255,255,0.02)",
                borderBottom: "1px solid var(--glass-border)",
              }}
            >
              <img
                className="crop-img"
                src={crop.img}
                alt={crop.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
              {/* Blur mask overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 40%)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  fontSize: "0.7rem",
                  fontWeight: "700",
                  letterSpacing: "0.1em",
                  padding: "5px 12px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backgroundColor: "rgba(10,10,10,0.6)",
                  backdropFilter: "blur(5px)",
                  textTransform: "uppercase",
                }}
              >
                {crop.tag}
              </span>
            </div>

            {/* Details */}
            <div
              style={{
                padding: "30px",
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.4rem",
                  fontWeight: "700",
                  color: "#ffffff",
                  marginBottom: "10px",
                }}
              >
                {crop.name}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  lineHeight: "1.5",
                  fontWeight: "300",
                  marginBottom: "24px",
                  minHeight: "4.5em",
                }}
              >
                {crop.desc}
              </p>

              {/* Specifications Table */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginBottom: "30px",
                  backgroundColor: "rgba(255,255,255,0.01)",
                  border: "1px solid rgba(255,255,255,0.03)",
                  borderRadius: "10px",
                  padding: "16px 20px",
                }}
              >
                {crop.specs.map((spec, sIdx) => (
                  <div
                    key={sIdx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.8rem",
                      borderBottom: sIdx < crop.specs.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
                      paddingBottom: sIdx < crop.specs.length - 1 ? "8px" : "0",
                    }}
                  >
                    <span style={{ color: "var(--text-muted)", fontWeight: "300" }}>{spec.label}</span>
                    <span style={{ color: "#ffffff", fontWeight: "500" }}>{spec.val}</span>
                  </div>
                ))}
              </div>

              {/* Order Button */}
              <button
                onClick={handleOrder}
                className="btn-primary"
                style={{
                  marginTop: "auto",
                  width: "100%",
                  justifyContent: "center",
                  fontSize: "0.85rem",
                  padding: "12px 24px",
                  backgroundColor: crop.color,
                  borderColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = "brightness(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = "none";
                }}
              >
                <ShoppingBag size={16} />
                Order Bulk Volume
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}