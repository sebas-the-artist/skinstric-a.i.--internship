"use client";
import "./styles.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LandingPage() {
  const router = useRouter();
  const [hoverRight, setHoverRight] = useState(false);
  const [hoverLeft, setHoverLeft] = useState(false);
  const [expanding, setExpanding] = useState(false);

  const handleTakeTestClick = () => {
    setExpanding(true);
    setTimeout(() => {
      router.push("/test/intro");
    }, 600);
  };

  const headlineSlideClass = hoverRight
    ? "intro__headline-shell--left"
    : hoverLeft
    ? "intro__headline-shell--right"
    : "";

  return (
    <div className="layout__shell">
      <header className="nav__bar">
        <div className="nav__left">
          <a href="/" className="nav__logo">Skinstric</a>
          <span className="nav__section-label">[intro]</span>
        </div>
        <button type="button" className="nav__enter-code">Enter code</button>
      </header>

      <main className="layout__main">
        <section className={`intro__frame ${expanding ? "intro__frame--expanding" : ""}`}>
          <div className={[
            "diamond-ring diamond-ring--left",
            hoverRight || expanding ? "diamond-ring--peek-hide" : "",
            hoverLeft ? "diamond-ring--hover" : "",
          ].filter(Boolean).join(" ")} />
          
          <div 
            className={[
              "diamond-ring diamond-ring--right",
              hoverLeft || expanding ? "diamond-ring--peek-hide" : "",
              hoverRight ? "diamond-ring--hover" : "",
              expanding ? "diamond-ring--expanding" : "",
            ].filter(Boolean).join(" ")}
            onClick={handleTakeTestClick}
          />

          <button
            type="button"
            className={["diamond-btn-left", hoverRight || expanding ? "diamond-btn--fade-out" : ""].filter(Boolean).join(" ")}
            onMouseEnter={() => !expanding && setHoverLeft(true)}
            onMouseLeave={() => !expanding && setHoverLeft(false)}
          >
            <span className="diamond-btn-play-icon flip" />
            <div className="diamond-btn-label-diam">Discover A.I.</div>
          </button>

          <button
            type="button"
            className={["diamond-btn-right", hoverLeft || expanding ? "diamond-btn--fade-out" : ""].filter(Boolean).join(" ")}
            onMouseEnter={() => !expanding && setHoverRight(true)}
            onMouseLeave={() => !expanding && setHoverRight(false)}
            onClick={handleTakeTestClick}
          >
            <div className="diamond-label-diam-icon">
              <span className="diamond-btn-label-diam">Take test</span>
              <span className="diamond-btn-play-icon" />
            </div>
          </button>

          <div className={["intro__headline-shell", headlineSlideClass, expanding ? "intro__headline-shell--fading" : ""].filter(Boolean).join(" ")}>
            <h1 className="intro__headline">
              Sophisticated
              <br />
              skincare
            </h1>
          </div>
        </section>
      </main>

      <footer className="layout__footer">
        <p className="footer__text">
          Skinstric developed an A.I. that creates a highly‑personalised routine tailored to what your skin needs.
        </p>
      </footer>
    </div>
  );
}
