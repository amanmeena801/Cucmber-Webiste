"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Sun, Droplets, Truck } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FarmIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Fade in text elements
    gsap.fromTo(
      section.querySelectorAll(".fade-up"),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      }
    );

    // Stats counter animation
    const counters = countersRef.current?.querySelectorAll(".counter-number");
    if (counters) {
      counters.forEach((counter) => {
        const target = parseFloat(counter.getAttribute("data-target") || "0");
        const isFloat = counter.getAttribute("data-float") === "true";
        const suffix = counter.getAttribute("data-suffix") || "";
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            counter.textContent = isFloat
              ? obj.val.toFixed(1) + suffix
              : Math.floor(obj.val) + suffix;
          },
        });
      });
    }

    // Card parallax/tilt effect
    const cards = section.querySelectorAll(".intro-card");
    gsap.fromTo(
      cards,
      { opacity: 0, scale: 0.95, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: countersRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  const stats = [
    {
      icon: <Shield size={28} style={{ color: "var(--accent-green)" }} />,
      number: "10",
      suffix: " Acres",
      float: false,
      title: "Protected Cultivation",
      desc: "Fully glassmorphic, climate-controlled greenhouses shielding crops from contaminants.",
    },
    {
      icon: <Sun size={28} style={{ color: "var(--accent-green)" }} />,
      number: "365",
      suffix: " Days",
      float: false,
      title: "Year-Round Production",
      desc: "Completely independent of seasons, guaranteeing a consistent crop lifecycle.",
    },
    {
      icon: <Droplets size={28} style={{ color: "var(--accent-green)" }} />,
      number: "95",
      suffix: "%",
      float: false,
      title: "Water Conservation",
      desc: "Advanced closed-loop hydroponic systems reducing waste and recycling inputs.",
    },
    {
      icon: <Truck size={28} style={{ color: "var(--accent-green)" }} />,
      number: "24",
      suffix: " hrs",
      float: false,
      title: "Harvest-to-Ship Speed",
      desc: "Fresh produce harvested and shipped directly within hours of cooling.",
    },
  ];

  return (
    <section
      id="farm-intro"
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "var(--bg-primary)",
        padding: "120px 6%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        zIndex: 2,
        overflow: "hidden",
      }}
    >
      {/* Background gradients */}
      <div className="green-glow-bg" style={{ top: "-100px", right: "-100px" }} />
      <div className="grid-bg" />
      <div className="grid-bg-mask" />

      {/* Intro text */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          maxWidth: "850px",
          marginBottom: "80px",
        }}
      >
        <div
          className="fade-up"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "0.85rem",
            fontWeight: "700",
            letterSpacing: "0.2em",
            color: "var(--accent-green)",
            textTransform: "uppercase",
            marginBottom: "15px",
          }}
        >
          Operational Scale
        </div>
        <h2
          className="fade-up"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            fontWeight: "800",
            lineHeight: "1.15",
            letterSpacing: "-0.01em",
            color: "#ffffff",
            marginBottom: "30px",
          }}
        >
          10 Acres Of <span className="text-gradient-green">Greenhouse Excellence</span>
        </h2>
        <p
          className="fade-up"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(1rem, 1.25vw, 1.35rem)",
            lineHeight: "1.6",
            color: "var(--text-secondary)",
            fontWeight: "300",
          }}
        >
          Combining modern greenhouse technology with ecologically sustainable growing practices to produce premium vegetables of unmatched consistency and quality for wholesale and retail partners.
        </p>
      </div>

      {/* Grid of stats cards */}
      <div
        ref={countersRef}
        style={{
          position: "relative",
          zIndex: 5,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "24px",
          width: "100%",
        }}
      >
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="glass-panel intro-card"
            style={{
              padding: "40px 30px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.borderColor = "var(--border-green-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "var(--glass-border)";
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "12px",
                backgroundColor: "rgba(16, 185, 129, 0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid var(--border-green)",
              }}
            >
              {stat.icon}
            </div>

            <div>
              <div
                className="counter-number"
                data-target={stat.number}
                data-float={stat.float ? "true" : "false"}
                data-suffix={stat.suffix}
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "2.8rem",
                  fontWeight: "800",
                  color: "#ffffff",
                  lineHeight: "1",
                  marginBottom: "8px",
                }}
              >
                0{stat.suffix}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: "#ffffff",
                  marginBottom: "8px",
                }}
              >
                {stat.title}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  lineHeight: "1.5",
                  fontWeight: "300",
                }}
              >
                {stat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}