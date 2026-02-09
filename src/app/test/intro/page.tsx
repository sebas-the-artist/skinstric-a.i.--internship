// src/app/test/intro/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TestIntroPage() {
  const router = useRouter();
  const [name, setName] = useState("");

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    if (!name.trim()) return;
    console.log("User name:", name);
    // router.push("/test/selfie");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleContinue();
    }
  };

  return (
    <>
      <main className="layout__main">
        <section className="intro__frame intro__frame--analysis intro__frame--expanded">
          {/* back button + header */}
          <div className="analysis-header">
            <div className="back-diamond" onClick={handleBack}>
              <div className="back-diamond-inner" />
            </div>
            <span className="analysis-header-label">To start analysis</span>
          </div>

          {/* ONLY the big center diamond */}
          <div className="analysis-diamond">
            <div className="analysis-diamond-inner">
              <div className="analysis-diamond-title">Introduce yourself</div>
              <div className="analysis-diamond-line" />
              
              <input
                className="analysis-input"
                placeholder="Type your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            </div>
          </div>
        </section>
      </main>

      {/* Keep the footer for continuity */}
      <footer className="layout__footer">
        <p className="footer__text">
          Skinstric developed an A.I. that creates a highly‑personalised routine
          tailored to what your skin needs.
        </p>
      </footer>
    </>
  );
}
