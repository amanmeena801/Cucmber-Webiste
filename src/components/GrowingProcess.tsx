"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Compass,
  Eye,
  ShieldCheck,
  ThermometerSnowflake,
  Activity,
  Navigation,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GrowingProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const axisRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const axis = axisRef.current;
    const line = lineRef.current;
    if (!container || !axis || !line) return;

    // ── Measure dot positions and align the axis exactly ──────────────────
    // After render, getBoundingClientRect gives real positions.
    const allDots = Array.from(container.querySelectorAll<HTMLElement>(".timeline-dot"));
    const allCards = Array.from(container.querySelectorAll<HTMLElement>(".step-content-card"));
    if (allDots.length > 0 && allCards.length > 0) {
      const axisRect = axis.parentElement!.getBoundingClientRect();
      const firstDot = allDots[0].getBoundingClientRect();
      const lastCard = allCards[allCards.length - 1].getBoundingClientRect();

      // Top: align with centre of first dot
      const topOffset = firstDot.top + firstDot.height / 2 - axisRect.top;
      // Bottom: align with the bottom edge of the last card
      const bottomOffset = axisRect.bottom - lastCard.bottom;

      axis.style.top = `${topOffset}px`;
      axis.style.bottom = `${bottomOffset}px`;
      axis.style.height = "auto";
    }

    // Collect this component's triggers for isolated cleanup
    const ownTriggers: ScrollTrigger[] = [];

    // ── Draw the glowing line as user scrolls ──────────────────────────────
    const lineST = gsap.fromTo(
      line,
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 40%",
          end: "bottom 60%",
          scrub: true,
        },
      }
    ).scrollTrigger;
    if (lineST) ownTriggers.push(lineST);

    // ── Animate each phase node individually ───────────────────────────────
    const stepEls = container.querySelectorAll<HTMLElement>(".process-step-node");
    const isMobile = window.innerWidth <= 767;

    stepEls.forEach((step) => {
      const dot = step.querySelector<HTMLElement>(".timeline-dot");
      const content = step.querySelector<HTMLElement>(".step-content-card");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: step,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      if (tl.scrollTrigger) ownTriggers.push(tl.scrollTrigger);

      // Dot: scales up and turns green on enter
      if (dot) {
        tl.fromTo(
          dot,
          {
            scale: 1,
            backgroundColor: "#1f2937",
            borderColor: "rgba(255,255,255,0.25)",
            boxShadow: "0 0 0px transparent",
          },
          {
            scale: 1.35,
            backgroundColor: "#10b981",
            borderColor: "rgba(16,185,129,0.6)",
            boxShadow: "0 0 14px #10b981",
            duration: 0.4,
            ease: "back.out(1.7)",
          }
        );
      }

      // Card: slides + fades in
      if (content) {
        const xFrom = isMobile ? 0 : step.classList.contains("left-node") ? -40 : 40;
        const yFrom = isMobile ? 18 : 0;
        tl.fromTo(
          content,
          { opacity: 0, x: xFrom, y: yFrom },
          { opacity: 1, x: 0, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        );
      }
    });

    return () => {
      // Kill ONLY this component's triggers — no side effects on others
      ownTriggers.forEach((t) => t.kill());
    };
  }, []);

  const steps = [
    {
      icon: <Compass size={24} style={{ color: "var(--accent-green)" }} />,
      title: "Seed Selection & Germination",
      desc: "We source certified organic non-GMO cucumber, tomato, and capsicum seeds. Germination occurs in isolated nursery chambers with calibrated moisture cycles, ensuring perfect initial root development.",
      side: "left",
    },
    {
      icon: <Activity size={24} style={{ color: "var(--accent-green)" }} />,
      title: "Precision Hydroponic Feed",
      desc: "Plants are transferred to gutters where closed-loop water drip systems feed roots directly. Every drop is balanced with natural organic trace minerals, saving 95% of water by recycling runoff.",
      side: "right",
    },
    {
      icon: <ThermometerSnowflake size={24} style={{ color: "var(--accent-green)" }} />,
      title: "Climate Chamber Optimization",
      desc: "Our active automation engine regulates temperature, relative humidity, light spectrums, and air circulation. Sensors update venting grids every 60 seconds to simulate perfect growing seasons.",
      side: "left",
    },
    {
      icon: <Eye size={24} style={{ color: "var(--accent-green)" }} />,
      title: "Biological Pest Control",
      desc: "Instead of chemical pesticides, we introduce natural predators like ladybugs and predatory mites to manage pest cycles. This keeps our crops 100% clean, pesticide-free, and safe for direct consumption.",
      side: "right",
    },
    {
      icon: <ShieldCheck size={24} style={{ color: "var(--accent-green)" }} />,
      title: "Hand-Harvesting & Cooling",
      desc: "At peak Brix sugar levels, crops are hand-harvested by trained growers. They go instantly to our hydro-cooling chamber, reducing heat, stabilizing shelf-life, and securing maximum crispness.",
      side: "left",
    },
    {
      icon: <Navigation size={24} style={{ color: "var(--accent-green)" }} />,
      title: "Direct B2B Distribution",
      desc: "Crops are packaged in biodegradable ventilated crates, loaded onto cold-chain trucks, and dispatched directly. From our greenhouse vine to supermarket racks, the transit loop stays under 24 hours.",
      side: "right",
    },
  ];

  return (
    <section
      id="growing-process"
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
      <div className="green-glow-bg" style={{ bottom: "-100px", right: "-100px" }} />

      {/* Section Header */}
      <div
        style={{
          textAlign: "center",
          maxWidth: "800px",
          margin: "0 auto 100px auto",
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
          Visual Timeline
        </span>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2rem, 4.5vw, 3rem)",
            fontWeight: "800",
            color: "#ffffff",
          }}
        >
          Our Precision <span className="text-gradient-green">Growing Process</span>
        </h2>
      </div>

      {/* Timeline Tree */}
      <div
        className="timeline-tree"
        style={{
          position: "relative",
          maxWidth: "1000px",
          margin: "0 auto",
          zIndex: 5,
        }}
      >
        {/*
          .timeline-axis: a 2px wide column.
          - Desktop: centred with left 50% + translateX(-50%).
          - Mobile CSS: left 20px, transform none.
          - top/bottom are set by JS after render to span exactly
            from the first dot centre to the last dot centre.
        */}
        <div
          ref={axisRef}
          className="timeline-axis"
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: "2px",
            transform: "translateX(-50%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          {/* Dim background track — always full height of axis */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(255,255,255,0.07)",
            }}
          />
          {/* GSAP-driven glowing fill — starts at height 0% */}
          <div
            ref={lineRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "0%",
              backgroundColor: "var(--accent-green)",
              boxShadow: "0 0 10px var(--accent-green)",
            }}
          />
        </div>

        {/* Phase Nodes */}
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`process-step-node ${
              step.side === "left" ? "left-node" : "right-node"
            }`}
            style={{
              position: "relative",
              display: "flex",
              justifyContent: step.side === "left" ? "flex-start" : "flex-end",
              alignItems: "flex-start",
              width: "100%",
              marginBottom: "80px",
            }}
          >
            {/*
              Dot — sits on the axis line.
              "top: 22px" = vertically centres the dot on the 44px icon row
              (44px icon ÷ 2 = 22px to reach its centre).
              transform: translate(-50%, -50%) centres the 16px dot on that point.
              Mobile CSS overrides left to 20px to sit on the left rail.
            */}
            <div
              className="timeline-dot"
              style={{
                position: "absolute",
                left: "50%",
                top: "22px",
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.25)",
                backgroundColor: "#1f2937",
                transform: "translate(-50%, -50%)",
                zIndex: 10,
                flexShrink: 0,
              }}
            />

            {/* Card */}
            <div className="phase-card-wrapper">
              <div
                className="glass-panel step-content-card"
                style={{
                  padding: "30px",
                  position: "relative",
                  transition: "border-color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "var(--border-green-hover)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "var(--glass-border)")
                }
              >
                {/* Icon + Phase label row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    marginBottom: "15px",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(16, 185, 129, 0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid var(--border-green)",
                      flexShrink: 0,
                    }}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        color: "var(--accent-green)",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    >
                      Phase 0{idx + 1}
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.2rem",
                        fontWeight: "700",
                        color: "#ffffff",
                      }}
                    >
                      {step.title}
                    </h3>
                  </div>
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
                  {step.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}