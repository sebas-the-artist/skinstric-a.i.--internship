// src/app/test/intro/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TestIntroPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [step, setStep] = useState<0 | 1 | 2>(0);

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => (prev - 1) as 0 | 1 | 2);
    } else {
      router.back();
    }
  };

  const goToNextStep = () => {
    if (step === 0 && !name.trim()) return;
    if (step === 1 && !location.trim()) return;
    setStep((prev) => (prev + 1) as 0 | 1 | 2);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      goToNextStep();
    }
  };

  return (
    <main className="layout__main">
      <section className="intro__frame intro__frame--analysis intro__frame--expanded">
        {/* Radiating rings behind the diamond area */}
        <div className="analysis-diamond-rings">
          <div className="analysis-ring-1" />
          <div className="analysis-ring-2" />
          <div className="analysis-ring-3" />
          <div className="analysis-ring-4" />
        </div>

        {/* BACK BUTTON (bottom left) */}
        <div className="analysis-header analysis-header--bottom">
          <div className="back-diamond" onClick={handleBack}>
            <div className="back-diamond-inner" />
          </div>
          <span className="analysis-header-label">Back</span>
        </div>

        {/* STEP 0 = Name */}
        {step === 0 && (
          <div className="analysis-diamond analysis-diamond--mono-shell">
            <div className="analysis-diamond-inner">
              <div className="analysis-input-wrapper">
                <input
                  className="analysis-input analysis-input--clean"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 1 = Location */}
        {step === 1 && (
          <div className="analysis-diamond analysis-diamond--mono-shell">
            <div className="analysis-diamond-inner">
              <div className="analysis-input-wrapper">
                <input
                  className="analysis-input analysis-input--clean"
                  placeholder="City, Country"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 = Face vs Gallery choice – TWO DIAMONDS */}
        {step === 2 && (
          <div className="analysis-diamond-split-shell">
            {/* LEFT DIAMOND – Selfie / Face scan */}
            <div className="analysis-diamond analysis-diamond--choice analysis-diamond--choice-left">
              <div className="analysis-diamond-inner">
                <div className="analysis-diamond-choice-ico">
                  <span className="camera-ico">📷</span>
                </div>
                <div className="analysis-diamond-choice-label">
                  ALLOW A.I. TO SCAN YOUR FACE
                </div>
              </div>
            </div>

            {/* RIGHT DIAMOND – Gallery */}
            <div className="analysis-diamond analysis-diamond--choice analysis-diamond--choice-right">
              <div className="analysis-diamond-inner">
                <div className="analysis-diamond-choice-ico">
                  <span className="gallery-ico">⛰️☀️</span>
                </div>
                <div className="analysis-diamond-choice-label">
                  ALLOW A.I. ACCESS GALLERY
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
