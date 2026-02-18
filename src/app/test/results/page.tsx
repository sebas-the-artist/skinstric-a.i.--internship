"use client";

import { useEffect, useState, useCallback } from "react";

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

  // SMOOTH ANIMATION
  const animateToPercent = useCallback((target: number) => {
    let start = 0;
    const duration = 1200;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3); // smooth easing
      const current = start + (target - start) * easeOut;
      
      setCirclePercent(Math.round(current));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    animate();
  }, []);

  // LOAD DATA
  useEffect(() => {
    const stored = localStorage.getItem("skinstric-demographics");
    if (stored) {
      try {
        setDemographics(JSON.parse(stored) as Demographics);
      } catch {}
    }
  }, []);

  // TOP GUESS FOR LEFT BOXES
  const getTopGuess = (category: keyof Demographics) => {
    if (!demographics?.[category]) return "Analyzing...";
    const entries = Object.entries(demographics[category]);
    const [key] = entries.sort((a, b) => b[1] - a[1])[0];
    return key.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  };

  // HANDLE LEFT CATEGORY CLICK
  const handleCategoryClick = (category: "race" | "age" | "gender") => {
    setActiveCategory(category);
    setActiveItem(null);
    const entries = Object.entries(demographics?.[category] || {});
    const [, highest] = entries.sort((a, b) => b[1] - a[1])[0];
    animateToPercent(Math.round(highest * 100));
  };

  // HANDLE RIGHT ITEM CLICK
  const handleItemClick = (key: string, percent: number) => {
    setActiveItem(key);
    animateToPercent(percent);
  };

  // DYNAMIC CIRCLE LABEL
  const getCircleLabel = () => {
    if (activeItem) return activeItem.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
    return getTopGuess(activeCategory);
  };

  // ALL DATA FOR RIGHT COLUMN
  const getSortedCategory = () => {
    if (!demographics?.[activeCategory]) return [];
    return Object.entries(demographics[activeCategory])
      .sort(([,a], [,b]) => b - a)
      .map(([key, value]) => ({
        key: key.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
        percent: Math.round(value * 100)
      }));
  };

  const sortedData = getSortedCategory();
  const circleLabel = getCircleLabel();

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f9fafb',
      padding: '40px',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {/* TOP HEADER */}
      <div style={{
        textAlign: 'left',
        marginBottom: '60px',
        maxWidth: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#666',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '8px'
        }}>
          A.I. ANALYSIS
        </div>
        <div style={{
          fontSize: '48px',
          fontWeight: '700',
          color: '#000',
          letterSpacing: '-0.05em',
          marginBottom: '4px'
        }}>
          DEMOGRAPHICS
        </div>
        <div style={{
          fontSize: '14px',
          color: '#999',
          letterSpacing: '0.05em'
        }}>
          PREDICTED RACE & AGE
        </div>
      </div>

      {/* 3-COLUMN GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '260px 1fr 320px',
        gap: '50px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* LEFT - CLICKABLE CATEGORIES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {(['race', 'age', 'gender'] as const).map(category => (
            <div 
              key={category}
              style={{
                width: '260px', height: '90px', background: '#f5f5f5',
                position: 'relative', padding: '20px',
                cursor: 'pointer',
                ...(activeCategory === category ? {
                  background: '#000',
                  color: '#fff'
                } : {})
              }}
              onClick={() => handleCategoryClick(category)}
            >
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, height: '2px',
                background: '#000'
              }} />
              <div style={{
                fontSize: '12px',
                fontWeight: '600',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '8px',
                color: activeCategory === category ? '#fff' : '#666'
              }}>
                {category.toUpperCase()}
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: '500',
                letterSpacing: '-0.02em',
                color: activeCategory === category ? '#fff' : '#000'
              }}>
                {getTopGuess(category)}
              </div>
            </div>
          ))}
        </div>

        {/* MIDDLE - ANIMATED CIRCLE */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '30px' }}>
            <div style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#666',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '10px'
            }}>
              {activeCategory.toUpperCase()}
            </div>
            <div style={{
              fontSize: '26px',
              fontWeight: '400',
              color: '#000',
              marginBottom: '30px'
            }}>
              {circleLabel}
            </div>
          </div>

          <div style={{
            position: 'relative',
            width: '300px',
            height: '300px',
            marginBottom: '20px'
          }}>
            <svg viewBox="0 0 300 300" style={{
              width: '100%',
              height: '100%',
              transform: 'rotate(-90deg)',
              transformOrigin: 'center'
            }}>
              <circle cx="150" cy="150" r="120" fill="none" stroke="#e5e7eb" strokeWidth="16"/>
              <circle cx="150" cy="150" r="120" fill="none" stroke="#000" strokeWidth="16"
                strokeDasharray="753.6" 
                strokeDashoffset={`${753.6 * (1 - circlePercent / 100)}`}
                strokeLinecap="round"/>
            </svg>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '180px',
              height: '180px',
              background: '#fff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                fontSize: '52px',
                fontWeight: '300',
                color: '#000'
              }}>
                {circlePercent}%
              </div>
            </div>
          </div>

          <div style={{
            fontSize: '13px',
            color: '#999',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            PREDICTED PROBABILITY
          </div>
        </div>

        {/* RIGHT - CLICKABLE LIST */}
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '12px',
            fontWeight: '600',
            color: '#666',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}>
            <span>AI CONFIDENCE</span>
            <span>%</span>
          </div>
          <div style={{
            background: '#f5f5f5',
            padding: '25px',
            minHeight: '400px'
          }}>
            {sortedData.map((item, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px 0',
                  fontSize: '15px',
                  /* color: '#333', */
                  borderBottom: index < sortedData.length - 1 ? '1px solid #e5e5e5' : 'none',
                  cursor: 'pointer',
                  background: activeItem === item.key ? '#000' : 'transparent',
                  color: activeItem === item.key ? '#fff' : '#333',
                  /* padding: '14px 0' */
                }}
                onClick={() => handleItemClick(item.key, item.percent)}
              >
                <span>{item.key}</span>
                <span style={{ 
                  fontWeight: '600', 
                  color: activeItem === item.key ? '#fff' : '#000' 
                }}>
                  {item.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
