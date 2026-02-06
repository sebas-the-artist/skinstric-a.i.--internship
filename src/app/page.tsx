// src/app/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LandingPage() {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [analysisMode, setAnalysisMode] = useState(false);

  const handleTakeTestClick = () => {
    setAnalysisMode(true);
    setTimeout(() => {
      router.push("/test/intro");
    }, 600);
  };

  const handleBack = () => {
    setAnalysisMode(false);
  };

  return (
    <main className="layout__main">
      <section
        className={[
          "intro__frame",
          hovered ? "intro__frame--hover" : "",
          analysisMode ? "intro__frame--analysis intro__frame--expanded" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* LEFT hit zone + ring */}
        <div className="diamond-hit diamond-hit--left">
          <div className="diamond-ring" />
        </div>

        {/* RIGHT hit zone + ring */}
        <button
          type="button"
          className="diamond-hit diamond-hit--right"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={handleTakeTestClick}
        >
          <div className="diamond-ring" />
        </button>

        {/* inner left Discover AI diamond content */}
        <div className="diamond-left-label">
          <div className="diamond-left-label-inner">Discover A.I.</div>
        </div>

        {/* inner right Take test diamond content */}
        <div className="diamond-btn">
          <div className="diamond-btn-inner">
            <span className="diamond-btn-label">Take test</span>
            <span className="diamond-btn-icon" />
          </div>
        </div>

        {/* center headline */}
        <div
          className={[
            "intro__headline-shell",
            hovered || analysisMode
              ? "intro__headline-shell--pushed-left"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <h1 className="intro__headline">
            Sophisticated
            <br />
            skincare
          </h1>
        </div>

        {/* analysis header + back */}
        <div className="analysis-header">
          <div className="back-diamond" onClick={handleBack}>
            <div className="back-diamond-inner" />
          </div>
          <span className="analysis-header-label">To start analysis</span>
        </div>

        {/* central Introduce yourself diamond */}
        <div className="analysis-diamond">
          <div className="analysis-diamond-inner">
            <div className="analysis-diamond-title">Introduce yourself</div>
            <div className="analysis-diamond-line" />
          </div>
        </div>
      </section>

      <footer className="layout__footer">
        <p className="footer__text">
          Skinstric developed an A.I. that creates a highly‑personalised routine
          tailored to what your skin needs.
        </p>
      </footer>
    </main>
  );
}
