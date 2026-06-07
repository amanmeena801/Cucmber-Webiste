"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Loader2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [subtextIndex, setSubtextIndex] = useState(0);

  const totalFrames = 290;
  const textSequences = [
    { text: "Every Harvest Begins With A Single Seed", id: 0 },
    { text: "Sustainably Grown Inside Our Modern Greenhouses", id: 1 },
    { text: "Precision Farming. Consistent Quality.", id: 2 },
    { text: "Protected Growth. Reliable Supply.", id: 3 },
    { text: "Fresh Produce For Buyers Who Demand Excellence", id: 4 },
  ];

  const subtextOptions = [
    "🌱 Planting the first seed...",
    "🌿 Preparing the greenhouse...",
    "💧 Delivering nutrients...",
    "☀️ Optimizing growing conditions...",
    "🌼 Encouraging healthy flowering...",
    "🥒 Harvesting premium produce...",
    "🚜 Bringing the farm online...",
  ];

  // Rotate subtext during loading
  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setSubtextIndex((prev) => (prev + 1) % subtextOptions.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isLoading, subtextOptions.length]);

  // Preload Images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const pad = (n: number) => String(n).padStart(3, "0");

    const handleImageLoad = () => {
      loadedCount++;
      const progress = Math.round((loadedCount / totalFrames) * 100);
      setLoadProgress(progress);

      if (loadedCount === totalFrames) {
        setImages(loadedImages);
        setIsLoading(false);
      }
    };

    const handleImageError = (index: number) => {
      console.warn(`Failed to load frame ${index}`);
      handleImageLoad(); // Count it to prevent loading freeze, even if image fails
    };

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `/assets/ezgif-6c43115771289666-jpg/ezgif-frame-${pad(i)}.jpg`;
      img.onload = handleImageLoad;
      img.onerror = () => handleImageError(i);
      loadedImages.push(img);
    }
  }, []);

  // GSAP Scroll Animation
  useEffect(() => {
    if (isLoading || images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frameObj = { frame: 1 };

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(Math.round(frameObj.frame));
    };

    const drawFrame = (index: number) => {
      const imgIndex = Math.max(0, Math.min(totalFrames - 1, index - 1));
      const img = images[imgIndex];
      if (!img) return;

      const wr = canvas.width / img.width;
      const hr = canvas.height / img.height;
      const r = Math.max(wr, hr);
      const x = (canvas.width - img.width * r) / 2;
      const y = (canvas.height - img.height * r) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, img.width, img.height, x, y, img.width * r, img.height * r);
    };

    window.addEventListener("resize", resizeCanvas);
    
    // Set initial size and draw first frame
    resizeCanvas();

    // Main scrolling timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        pin: ".hero-sticky-element",
        pinSpacing: false,
      },
    });

    // Animate image frames
    tl.to(frameObj, {
      frame: totalFrames,
      ease: "none",
      duration: 1,
      onUpdate: () => {
        drawFrame(Math.round(frameObj.frame));
      },
    }, 0);

    // Animate Headings
    // Heading 1: 0 - 0.2
    tl.fromTo(
      ".hero-text-0",
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.08 },
      0.02
    ).to(
      ".hero-text-0",
      { opacity: 0, y: -30, scale: 1.02, ease: "power2.in", duration: 0.08 },
      0.14
    );

    // Heading 2: 0.2 - 0.4
    tl.fromTo(
      ".hero-text-1",
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.08 },
      0.22
    ).to(
      ".hero-text-1",
      { opacity: 0, y: -30, scale: 1.02, ease: "power2.in", duration: 0.08 },
      0.34
    );

    // Heading 3: 0.4 - 0.6
    tl.fromTo(
      ".hero-text-2",
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.08 },
      0.42
    ).to(
      ".hero-text-2",
      { opacity: 0, y: -30, scale: 1.02, ease: "power2.in", duration: 0.08 },
      0.54
    );

    // Heading 4: 0.6 - 0.8
    tl.fromTo(
      ".hero-text-3",
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.08 },
      0.62
    ).to(
      ".hero-text-3",
      { opacity: 0, y: -30, scale: 1.02, ease: "power2.in", duration: 0.08 },
      0.74
    );

    // Heading 5 & CTAs: 0.8 - 1.0
    tl.fromTo(
      ".hero-text-4",
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.08 },
      0.82
    );

    tl.fromTo(
      ".hero-ctas",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, ease: "power2.out", duration: 0.08 },
      0.88
    );

    // Toggle scroll indicator visibility based on scroll position (isolated scroll trigger)
    const indicatorTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top+=50 top",
      onEnter: () => {
        gsap.to(".hero-scroll-indicator", { opacity: 0, y: 15, duration: 0.3, ease: "power2.out" });
      },
      onLeaveBack: () => {
        gsap.to(".hero-scroll-indicator", { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
      },
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
      indicatorTrigger.kill();
    };
  }, [isLoading, images]);

  const handleExplore = () => {
    const nextSec = document.getElementById("farm-intro");
    if (nextSec) {
      nextSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContact = () => {
    const contactSec = document.getElementById("contact");
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        height: "500vh", // Scroll depth for scrubbing
        backgroundColor: "#050505",
      }}
    >
      {/* Preloader overlay */}
      {isLoading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            backgroundColor: "#050505",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            fontFamily: "var(--font-sans)",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "120px",
              height: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loader2 className="animate-spin text-emerald-500" size={48} style={{ color: "var(--accent-green)" }} />
            <div
              style={{
                position: "absolute",
                fontSize: "1rem",
                fontWeight: "600",
                color: "#ffffff",
                fontFamily: "var(--font-heading)",
              }}
            >
              {loadProgress}%
            </div>
          </div>
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.25rem",
              fontWeight: "500",
              letterSpacing: "0.08em",
              color: "#ffffff",
              textAlign: "center",
            }}
          >
            Growing Something Fresh...
            <div
              key={subtextIndex}
              style={{
                fontSize: "0.85rem",
                color: "var(--text-muted)",
                letterSpacing: "0.05em",
                marginTop: "10px",
                fontWeight: "300",
                fontFamily: "var(--font-sans)",
                animation: "pulse 2s infinite ease-in-out",
              }}
            >
              {subtextOptions[subtextIndex]}
            </div>
          </div>
        </div>
      )}

      {/* Sticky Canvas & content container */}
      <div
        className="hero-sticky-element"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Ambient Dark Gradients to ensure text readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at center, rgba(5,5,5,0.2) 0%, rgba(5,5,5,0.85) 90%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "30vh",
            background: "linear-gradient(to top, #050505 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "20vh",
            background: "linear-gradient(to bottom, #050505 70%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Floating elements inside Canvas overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 20px",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          {textSequences.map((seq) => (
            <div
              key={seq.id}
              className={`hero-text-${seq.id}`}
              style={{
                position: "absolute",
                maxWidth: "900px",
                opacity: 0,
                willChange: "transform, opacity",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Luxury indicator tag */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 16px",
                  borderRadius: "999px",
                  border: "1px solid var(--border-green)",
                  backgroundColor: "rgba(16, 185, 129, 0.05)",
                  backdropFilter: "var(--glass-blur)",
                  color: "var(--accent-green)",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                  boxShadow: "0 0 15px rgba(16,185,129,0.1)",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "var(--accent-green)",
                    boxShadow: "0 0 8px var(--accent-green)",
                  }}
                />
                Climate-Chamber 04 // Life Cycle
              </div>

              <h1
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
                  fontWeight: "800",
                  lineHeight: "1.1",
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                }}
              >
                {seq.id === 4 ? (
                  <>
                    Fresh Produce For Buyers Who{" "}
                    <span className="text-gradient-green">Demand Excellence</span>
                  </>
                ) : (
                  seq.text
                )}
              </h1>
            </div>
          ))}

          {/* End of Hero CTA */}
          <div
            className="hero-ctas"
            style={{
              position: "absolute",
              bottom: "12vh",
              left: 0,
              right: 0,
              margin: "0 auto",
              width: "max-content",
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              opacity: 0,
              pointerEvents: "auto",
              willChange: "transform, opacity",
            }}
          >
            <button
              onClick={handleContact}
              className="btn-primary"
              style={{
                fontSize: "0.95rem",
                padding: "14px 32px",
              }}
            >
              Request Bulk Pricing
            </button>
            <button
              onClick={handleExplore}
              className="btn-secondary"
              style={{
                fontSize: "0.95rem",
                padding: "14px 32px",
              }}
            >
              Explore Our Farm
            </button>
          </div>
        </div>

        {/* Scroll Indicator (Only active in the early frames) */}
        {!isLoading && (
          <div
            className="hero-scroll-indicator"
            style={{
              position: "absolute",
              bottom: "40px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              color: "var(--text-secondary)",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              pointerEvents: "none",
              zIndex: 2,
              willChange: "transform, opacity",
            }}
          >
            <div className="pulse-indicator-anim" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
              <span>Scroll to grow</span>
              <ArrowDown size={14} className="text-emerald-500" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}