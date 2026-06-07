"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Zap, Heart, RefreshCw } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollSection = scrollRef.current;
    if (!container || !scrollSection) return;

    const cards = scrollSection.querySelectorAll(".why-card");

    const getScrollAmount = () => {
      return -(scrollSection.scrollWidth - window.innerWidth + window.innerWidth * 0.12);
    };

    const mm = gsap.matchMedia();

    // Desktop/Tablet: Horizontal Scroll Animation
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${scrollSection.scrollWidth - window.innerWidth + 400}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(scrollSection, {
        x: getScrollAmount,
        ease: "none",
      });

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.9, opacity: 0.6 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: "left 85%",
              end: "left 45%",
              scrub: true,
            },
          }
        );
      });
    });

    // Mobile: Sequential Staggered Fade Up
    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: scrollSection,
            start: "top 85%",
          },
        }
      );
    });

    return () => {
      mm.revert();
    };
  }, []);

  const points = [
    {
      icon: <Award size={36} style={{ color: "var(--accent-green)" }} />,
      tag: "Standards",
      title: "Consistent Quality",
      desc: "Our automated micro-climate controllers monitor temperature, humidity, lighting, and nutrient intake. Every crop harvested matches rigorous retail criteria, ensuring you receive identical grade-A vegetables, order after order.",
    },
    {
      icon: <Zap size={36} style={{ color: "var(--accent-green)" }} />,
      tag: "Logistics",
      title: "Reliable Supply",
      desc: "By growing inside 10 acres of protected greenhouses, we bypass seasonal temperature drops, floods, droughts, and pest cycles. We guarantee consistent volume agreements with retail chains and exporters 365 days a year.",
    },
    {
      icon: <Heart size={36} style={{ color: "var(--accent-green)" }} />,
      tag: "Ecology",
      title: "Sustainable Farming",
      desc: "Zero chemical runoff. By using biological pest controls (beneficial insects) instead of chemical pesticides and saving 95% of water compared to traditional soil farms, we offer produce that is healthy for both consumers and the planet.",
    },
    {
      icon: <RefreshCw size={36} style={{ color: "var(--accent-green)" }} />,
      tag: "Experience",
      title: "Fresh Harvest",
      desc: "We operate a strict pull-logistics schedule. Crops are harvested only after orders are finalized, instantly pre-cooled to lock in moisture and crispness, and shipped via climate-controlled vehicles directly to your hubs.",
    },
  ];

  return (
    <div
      ref={containerRef}
      id="why-choose-us"
      className="why-choose-us-container"
      style={{
        position: "relative",
        height: "100vh",
        backgroundColor: "var(--bg-secondary)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        zIndex: 2,
      }}
    >
      <div className="grid-bg" />
      <div className="grid-bg-mask" />
      <div className="sun-glow-bg" style={{ bottom: "-150px", left: "20%" }} />

      {/* Static header block */}
      <div
        style={{
          padding: "0 6%",
          marginBottom: "40px",
          position: "relative",
          zIndex: 5,
        }}
      >
        <span
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
          Value Proposition
        </span>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2rem, 4.5vw, 3rem)",
            fontWeight: "800",
            color: "#ffffff",
          }}
        >
          Why Commercial Buyers <span className="text-gradient-sun">Choose Us</span>
        </h2>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        className="why-scroll-track"
        style={{
          display: "flex",
          gap: "40px",
          paddingLeft: "6%",
          paddingRight: "15%",
          width: "max-content",
          position: "relative",
          zIndex: 5,
        }}
      >
        {points.map((point, idx) => (
          <div
            key={idx}
            className="glass-panel why-card"
            style={{
              width: "420px",
              padding: "50px 40px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              transition: "border-color 0.4s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--border-green-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--glass-border)";
            }}
          >
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "16px",
                backgroundColor: "rgba(16, 185, 129, 0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid var(--border-green)",
                boxShadow: "0 4px 15px rgba(16, 185, 129, 0.1)",
              }}
            >
              {point.icon}
            </div>

            <div>
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.75rem",
                  fontWeight: "700",
                  letterSpacing: "0.15em",
                  color: "var(--accent-green)",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                {point.tag}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.6rem",
                  fontWeight: "700",
                  color: "#ffffff",
                  marginBottom: "16px",
                }}
              >
                {point.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.95rem",
                  color: "var(--text-secondary)",
                  lineHeight: "1.6",
                  fontWeight: "300",
                }}
              >
                {point.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}