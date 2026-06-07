"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Snowflake, Scale, Award, HeartHandshake } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BulkSupply() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Fade up benefits
    gsap.fromTo(
      container.querySelectorAll(".fade-up-bulk"),
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

    // Continuous marquee translation using GSAP
    const marquee = marqueeRef.current;
    if (marquee) {
      const w = marquee.scrollWidth / 2;
      gsap.to(marquee, {
        x: -w,
        duration: 25,
        ease: "none",
        repeat: -1,
      });
    }
  }, []);

  const benefits = [
    {
      icon: <ShieldCheck size={26} style={{ color: "var(--accent-green)" }} />,
      title: "Contract volume security",
      desc: "Secure predictable supply structures. Lock in harvest yield allotments under annual supply contracts to hedge pricing shifts.",
    },
    {
      icon: <Snowflake size={26} style={{ color: "var(--accent-green)" }} />,
      title: "Strict cold-chain loop",
      desc: "Produce remains at optimal cooling settings (5°C to 12°C depending on crop type) from greenhouse sorting to dispatch.",
    },
    {
      icon: <Scale size={26} style={{ color: "var(--accent-green)" }} />,
      title: "Flexible dispatch schedule",
      desc: "Coordinate multiple drops weekly to cross-docking warehouses. Scale volume orders during peak consumer demand windows.",
    },
    {
      icon: <Award size={26} style={{ color: "var(--accent-green)" }} />,
      title: "Traceability compliance",
      desc: "Each palette is logged with seed origin, harvest dates, water reports, and pesticide compliance records.",
    },
  ];

  const partners = [
    "VITA-HEALTH MARKET",
    "GREENFIELD WHOLESALE",
    "ORGANIC DIRECT",
    "PREMIUM RETAIL STORES",
    "METRO FOOD CHAINS",
    "GLOBAL PRODUCE DIST",
  ];

  return (
    <section
      id="bulk-supply"
      ref={containerRef}
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
      <div className="green-glow-bg" style={{ bottom: "-100px", left: "-100px" }} />

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          position: "relative",
          zIndex: 5,
        }}
      >
        {/* Intro */}
        <div style={{ maxWidth: "800px", marginBottom: "80px" }}>
          <span
            className="fade-up-bulk"
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
            Supply Network
          </span>
          <h2
            className="fade-up-bulk"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 4.5vw, 3rem)",
              fontWeight: "800",
              color: "#ffffff",
              marginBottom: "20px",
            }}
          >
            B2B Commercial <span className="text-gradient-green">Capabilities</span>
          </h2>
        </div>

        {/* Benefits Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
            marginBottom: "80px",
          }}
        >
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="glass-panel fade-up-bulk"
              style={{
                padding: "35px 25px",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                transition: "border-color 0.4s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-green-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--glass-border)")}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(16, 185, 129, 0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid var(--border-green)",
                }}
              >
                {benefit.icon}
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "#ffffff",
                    marginBottom: "8px",
                  }}
                >
                  {benefit.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                    lineHeight: "1.5",
                    fontWeight: "300",
                  }}
                >
                  {benefit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Infinite Partners Marquee */}
        <div className="fade-up-bulk" style={{ position: "relative", width: "100%", overflow: "hidden", padding: "30px 0" }}>
          {/* Fading borders */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: "100px",
              background: "linear-gradient(to right, var(--bg-primary) 0%, transparent 100%)",
              zIndex: 10,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              width: "100px",
              background: "linear-gradient(to left, var(--bg-primary) 0%, transparent 100%)",
              zIndex: 10,
              pointerEvents: "none",
            }}
          />

          <div
            ref={marqueeRef}
            style={{
              display: "flex",
              gap: "60px",
              width: "max-content",
            }}
          >
            {/* Double the list to loop seamlessly */}
            {[...partners, ...partners].map((name, pIdx) => (
              <div
                key={pIdx}
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.2rem",
                  fontWeight: "800",
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.06)",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <HeartHandshake size={20} style={{ opacity: 0.3 }} />
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}