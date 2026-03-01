//src/app/test/results/page.tsx
"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState, useCallback, useRef } from "react";
import "./results.css";

type Demographics = {
  race: Record<string, number>;
  age: Record<string, number>;
  gender: Record<string, number>;
};

export default function ResultsPage() {
  const [demographics, setDemographics] = useState<Demographics | null>(null);
  const [activeCategory, setActiveCategory] = useState<"race" | "age" | "gender">("race");
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [circlePercent, setCirclePercent] = useState(0);
  const isAnimatingRef = useRef(false);

  const animateToPercent = useCallback((targetPercent: number) => {
    if (isAnimatingRef.current) return;
    
    isAnimatingRef.current = true;
    const startPercent = circlePercent;
    const duration = 1000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 444);
      const currentPercent = startPercent + (targetPercent - startPercent) * easeOut;
      
      setCirclePercent(Math.round(currentPercent));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        isAnimatingRef.current = false;
      }
    };
    
    requestAnimationFrame(animate);
  }, [circlePercent]);

  useEffect(() => {
    const stored = localStorage.getItem("skinstric-demographics");
    if (stored) {
      try {
        const data = JSON.parse(stored) as Demographics;
        console.log("Loaded ", data);
        
        setDemographics(data);
        
        if (data.race) {
          const raceEntries = Object.entries(data.race);
          if (raceEntries.length > 0) {
            const [, highestPercent] = raceEntries.sort((a, b) => b[1] - a[1])[0];
            setTimeout(() => animateToPercent(Math.round(highestPercent * 100)), 300);
          }
        }
      } catch (e) {
        console.error("Failed to load demographics:", e);
      }
    }
  }, [animateToPercent]);

  const getTopGuess = (category: keyof Demographics) => {
    if (!demographics?.[category] || Object.keys(demographics[category]).length === 0) {
      return "Analyzing...";
    }
    const entries = Object.entries(demographics[category]);
    const [key] = entries.sort((a, b) => b[1] - a[1])[0];
    return key.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  };

  const handleCategoryClick = (category: "race" | "age" | "gender") => {
    setActiveCategory(category);
    setActiveItem(null);
    
    if (demographics?.[category] && Object.keys(demographics[category]).length > 0) {
      const entries = Object.entries(demographics[category]);
      const [, highest] = entries.sort((a, b) => b[1] - a[1])[0];
      animateToPercent(Math.round(highest * 100));
    }
  };

  const handleItemClick = (key: string, percent: number) => {
    setActiveItem(key);
    animateToPercent(percent);
  };

  const getCircleLabel = () => {
    if (activeItem) return activeItem.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
    return getTopGuess(activeCategory);
  };

  // FIXED: Show ALL items (even 0%) like screenshot
  const getSortedCategory = () => {
    if (!demographics?.[activeCategory]) return [];
    
    return Object.entries(demographics[activeCategory])
      .map(([key, value]) => ({
        key: key.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
        percent: Math.round(value * 100)
      }))
      .sort((a, b) => b.percent - a.percent);
  };

  const sortedData = getSortedCategory();
  const circleLabel = getCircleLabel();

  return (
    <div className="results-page">
      <div className="results-header">
        <div className="header-main">A.I. ANALYSIS</div>
        <div className="header-title">DEMOGRAPHICS</div>
        <div className="header-subtitle">PREDICTED RACE & AGE</div>
      </div>

      <div className="results-grid">
        <div className="results-left">
          {(['race', 'age', 'gender'] as const).map(category => (
            <div 
              key={category}
              className={`left-card ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              <div className="box-title">{category.toUpperCase()}</div>
              <div className="box-value">{getTopGuess(category)}</div>
            </div>
          ))}
        </div>

        <div className="results-middle">
          <div className="circle-section">
            <div className="circle-category">{activeCategory.toUpperCase()}</div>
            <div className="circle-label">{circleLabel}</div>
            
            <div className="circle-container">
              <svg className="circle-svg" viewBox="0 0 300 300">
                <circle className="circle-bg" cx="150" cy="150" r="120"/>
                {/* FIXED: Dynamic strokeDashoffset back */}
                <circle 
                  className="circle-progress"
                  cx="150" cy="150" 
                  r="120"
                  strokeDasharray="753.6"
                  strokeDashoffset={`${753.6 * (1 - circlePercent / 100)}`}
                />
              </svg>
              <div className="circle-inner">
                <div className="circle-number">{circlePercent}%</div>
              </div>
            </div>
            
            <div className="circle-caption">PREDICTED PROBABILITY</div>
          </div>
        </div>

        <div className="results-right">
          <div className="right-header">
            <span>AI CONFIDENCE</span>
            <span>%</span>
          </div>
          <div className="right-list">
            {sortedData.map((item, index) => (
              <div 
                key={index}
                className={`right-item ${activeItem === item.key ? 'active' : ''}`}
                onClick={() => handleItemClick(item.key, item.percent)}
              >
                <span>{item.key}</span>
                <span>{item.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
