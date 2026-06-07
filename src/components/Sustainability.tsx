"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Droplet, Leaf, Lightbulb, Activity } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Sustainability() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Fade in text
    gsap.fromTo(
      container.querySelectorAll(".fade-up-sust"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
        },
      }
    );

    // SVG Stroke circle dashboard animation
    const circles = container.querySelectorAll(".sust-progress-circle");
    circles.forEach((circle) => {
      const circleEl = circle as SVGCircleElement;
      const targetPercent = parseFloat(circleEl.getAttribute("data-target") || "0");
      const radius = circleEl.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;

      // Set initial state of progress circle stroke-dasharray and dashoffset
      circleEl.style.strokeDasharray = `${circumference}`;
      circleEl.style.strokeDashoffset = `${circumference}`;

      const targetOffset = circumference - (targetPercent / 100) * circumference;

      gsap.to(circleEl, {
        strokeDashoffset: targetOffset,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: circleEl,
          start: "top 90%",
        },
      });
    });
  }, []);

  const items = [
    {
      icon: <Droplet size={24} style={{ color: "var(--accent-green)" }} />,
      percentage: "95",
      title: "Closed-Loop Irrigation",
      desc: "Water is completely recycled through active sterilization filters, saving 95% of water usage compared to standard open field agriculture.",
    },
    {
      icon: <Leaf size={24} style={{ color: "var(--accent-green)" }} />,
      percentage: "100",
      title: "Biological Pest Controls",
      desc: "Zero chemical runoff or synthetic pesticides. We rely on insect predators (ladybugs, mites) to balance greenhouse ecosystems organically.",
    },
    {
      icon: <Lightbulb size={24} style={{ color: "var(--accent-green)" }} />,
      percentage: "75",
      title: "Optimized LED Spectra",
      desc: "Greenhouse illumination is powered by smart spectrum LED grids, reducing electric footprint by 75% compared to sodium grow lamps.",
    },
    {
      icon: <Activity size={24} style={{ color: "var(--accent-green)" }} />,
      percentage: "99",
      title: "Consistent Microclimate",
      desc: "Constant automated sensor readings keep temperature, moisture, and airflow locked in, leading to a 99% grade-A premium harvest rate.",
    },
  ];

  return (
    <section
      id="sustainability"
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
      <div className="sun-glow-bg" style={{ bottom: "-150px", right: "10%" }} />

      <div
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
        {/* Intro */}
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 40px auto" }}>
          <span
            className="fade-up-sust"
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
            Ecological Vision
          </span>
          <h2
            className="fade-up-sust"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 4.5vw, 3rem)",
              fontWeight: "800",
              color: "#ffffff",
              marginBottom: "20px",
            }}
          >
            Sustainability <span className="text-gradient-green">In Every Loop</span>
          </h2>
          <p
            className="fade-up-sust"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1rem",
              color: "var(--text-secondary)",
              lineHeight: "1.6",
              fontWeight: "300",
            }}
          >
            AEROVERT operates under a closed circular ecological loop. We prove that premium quality produce does not require compromising resources. Through smart mechanics and organic protection, we grow healthy food responsibly.
          </p>
        </div>

        {/* Circular Gauges Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
            width: "100%",
          }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: "40px 30px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
                transition: "border-color 0.4s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-green-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--glass-border)")}
            >
              {/* SVG Gauge */}
              <div style={{ position: "relative", width: "120px", height: "120px" }}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                  {/* Track circle */}
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="6" />
                  {/* Progress circle */}
                  <circle
                    className="sust-progress-circle"
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="var(--accent-green)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    data-target={item.percentage}
                    transform="rotate(-90 60 60)"
                    style={{
                      transition: "stroke-dashoffset 0.1s ease",
                    }}
                  />
                </svg>
                {/* Center text */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(16, 185, 129, 0.05)",
                      border: "1px solid var(--border-green)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "4px",
                    }}
                  >
                    {item.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "0.95rem",
                      fontWeight: "700",
                      color: "#ffffff",
                    }}
                  >
                    {item.percentage}%
                  </span>
                </div>
              </div>

              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "#ffffff",
                    marginBottom: "10px",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                    lineHeight: "1.4",
                    fontWeight: "300",
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}