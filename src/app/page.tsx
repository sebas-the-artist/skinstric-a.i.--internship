// src/app/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LandingPage() {
  const router = useRouter();

  const [hoverRight, setHoverRight] = useState(false);
  const [hoverLeft, setHoverLeft] = useState(false);

  const handleTakeTestClick = () => {
    // tiny delay so the headline can start its slide if you want
    setTimeout(() => {
      router.push("/test/intro");
    }, 200);
  };

  const headlineSlideClass = hoverRight
    ? "intro__headline-shell--left"
    : hoverLeft
    ? "intro__headline-shell--right"
    : "";

  return (
    <main className="layout__main">
      <section className="intro__frame">
        {/* big side rings */}
        <div
          className={[
            "diamond-ring diamond-ring--left",
            hoverRight ? "is-hidden-left" : ""
          ]
            .filter(Boolean)
            .join(" ")}
        />
        <div
          className={[
            "diamond-ring diamond-ring--right",
            hoverLeft ? "is-hidden-right" : ""
          ]
            .filter(Boolean)
            .join(" ")}
        />

        {/* left Discover AI diamond */}
        <button
          type="button"
          className={[
            "diamond-left-label",
            hoverRight ? "is-hidden-left" : ""
          ]
            .filter(Boolean)
            .join(" ")}
          onMouseEnter={() => setHoverLeft(true)}
          onMouseLeave={() => setHoverLeft(false)}
        >
          <div className="diamond-left-label-inner">Discover A.I.</div>
        </button>

        {/* right Take test diamond */}
        <button
          type="button"
          className={[
            "diamond-btn",
            hoverLeft ? "is-hidden-right" : ""
          ]
            .filter(Boolean)
            .join(" ")}
          onMouseEnter={() => setHoverRight(true)}
          onMouseLeave={() => setHoverRight(false)}
          onClick={handleTakeTestClick}
        >
          <div className="diamond-btn-inner">
            <span className="diamond-btn-label">Take test</span>
            <span className="diamond-btn-icon" />
          </div>
        </button>

        {/* center headline */}
        <div
          className={["intro__headline-shell", headlineSlideClass]
            .filter(Boolean)
            .join(" ")}
        >
          <h1 className="intro__headline">
            Sophisticated
            <br />
            skincare
          </h1>
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
