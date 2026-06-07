"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Compass, Eye, ShieldCheck, ThermometerSnowflake, Activity, Navigation } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GrowingProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    if (!container || !line) return;

    // Timeline central path drawing animation
    gsap.fromTo(
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
    );

    // Fade in nodes individually
    const steps = container.querySelectorAll(".process-step-node");
    steps.forEach((step) => {
      const dot = step.querySelector(".timeline-dot");
      const content = step.querySelector(".step-content-card");
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: step,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      if (dot) {
        tl.fromTo(
          dot,
          { scale: 0, backgroundColor: "#1f2937", borderColor: "rgba(255,255,255,0.1)" },
          { scale: 1, backgroundColor: "#10b981", borderColor: "rgba(16,185,129,0.3)", duration: 0.4 }
        );
      }

      if (content) {
        tl.fromTo(
          content,
          { opacity: 0, x: (step.classList.contains("left-node") ? -40 : 40) },
          { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        );
      }
    });
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

      {/* Header */}
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
        style={{
          position: "relative",
          maxWidth: "1000px",
          margin: "0 auto",
          zIndex: 5,
        }}
      >
        {/* Central Vertical Line Track */}
        <div
          className="timeline-track-line"
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: "2px",
            backgroundColor: "rgba(255,255,255,0.05)",
            transform: "translateX(-50%)",
            zIndex: 1,
          }}
        />

        {/* Dynamic Glowing Line */}
        <div
          ref={lineRef}
          className="timeline-glow-line"
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            width: "2px",
            backgroundColor: "var(--accent-green)",
            boxShadow: "0 0 10px var(--accent-green)",
            transform: "translateX(-50%)",
            zIndex: 2,
          }}
        />

        {/* Node Loop */}
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`process-step-node flex flex-col md:flex-row mb-16 md:mb-24 relative ${
              step.side === "left" ? "left-node" : "right-node"
            }`}
            style={{
              display: "flex",
              justifyContent: step.side === "left" ? "flex-start" : "flex-end",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* Center Dot */}
            <div
              className="timeline-dot hidden md:block"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                backgroundColor: "#1f2937",
                transform: "translate(-50%, -50%)",
                zIndex: 10,
                boxShadow: "0 0 10px rgba(0,0,0,0.5)",
              }}
            />

            {/* Content Container */}
            <div
              style={{
                width: "100%",
                maxWidth: "450px",
                padding: "0 20px",
              }}
            >
              <div
                className="glass-panel step-content-card"
                style={{
                  padding: "30px",
                  position: "relative",
                  transition: "border-color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-green-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--glass-border)")}
              >
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