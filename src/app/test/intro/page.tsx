//src/app/test/intro/page.tsx
"use client";

import "./styles.css";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Step = 0 | 1 | 2 | 3; // 0 name, 1 location, 2 loading, 3 thank you

export default function TestIntroPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [step, setStep] = useState<Step>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const goNext = () => {
    if (step === 0 && !name.trim()) return;
    if (step === 1 && !location.trim()) return;
    if (step < 3) setStep((prev) => (prev + 1) as Step);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") goNext();
  };

  const handleBack = () => {
    if (step === 0) {
      router.back();
    } else {
      setStep((prev) => (prev - 1) as Step);
    }
  };

  // Phase 1 API call when entering loading step
  useEffect(() => {
    if (step === 2) {
      const send = async () => {
        try {
          await fetch(
            "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, location }),
            }
          );
        } catch (err) {
          console.error("Phase 1 error", err);
        }
      };
      send();

      timerRef.current = setTimeout(() => {
        setStep(3);
      }, 2500);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [step, name, location]);

  const goToScan = () => {
    router.push("/test/scan");
  };

  return (
    <div className="layout__shell test-page">
      <main className="layout__main">
        <section className="intro__frame intro__frame--analysis">
          {/* Spinning diamond rings */}
          <div className="analysis-diamond-rings">
            <div className="analysis-ring-1" />
            <div className="analysis-ring-2" />
            <div className="analysis-ring-3" />
            <div className="analysis-ring-4" />
          </div>

          {/* Back button */}
          <div className="analysis-header analysis-header--bottom">
            <button type="button" className="back-diamond" onClick={handleBack}>
              <div className="back-diamond-inner">
                <span className="back-diamond-icon" />
                
              </div>
            </button>
            <span className="analysis-header-label">Back</span>
          </div>

          {/* Center diamond */}
          <div className="analysis-diamond">
            <div className="analysis-diamond-inner">
              {step === 0 && (
                <>
                  <div className="processing-title">Introduce yourself</div>
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
                </>
              )}

              {step === 1 && (
                <>
                  <div className="processing-title">Where are you located?</div>
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
                </>
              )}

              {step === 2 && (
                <>
                  <div className="processing-title">Processing submission</div>
                  <div className="processing-dots">
                    <span className="dot dot-1" />
                    <span className="dot dot-2" />
                    <span className="dot dot-3" />
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="processing-title">Thank you!</div>
                  <div className="processing-subtitle">
                    Proceed to start A.I. analysis
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Next button (diamond bottom-right) */}
          {step <= 2 && (
            <div className="proceed-wrapper">
              <span className="proceed-button-label">Next</span>
              <button
                type="button"
                className="proceed-diamond"
                onClick={goNext}
              >
                <div className="proceed-diamond-inner">
                  <span className="proceed-diamond-icon" />
                </div>
              </button>
            </div>
          )}

          {/* On thank you step, Next goes to /test/scan */}
          {step === 3 && (
            <div className="proceed-wrapper">
              <span className="proceed-button-label">Start A.I. analysis</span>
              <button
                type="button"
                className="proceed-diamond"
                onClick={goToScan}
              >
                <div className="proceed-diamond-inner">
                  <span className="proceed-diamond-icon" />
                </div>
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
