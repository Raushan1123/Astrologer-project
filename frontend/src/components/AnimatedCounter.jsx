import React, { useState, useEffect, useRef } from 'react';

const AnimatedCounter = ({ end, duration = 1000, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  // Extract numeric value from string (e.g., "5000+" -> 5000, "95%" -> 95, "90-100" -> 100)
  const getNumericValue = (value) => {
    if (typeof value === 'number') return value;
    
    // Handle range format like "90-100"
    if (value.includes('-')) {
      const parts = value.split('-');
      return parseInt(parts[1].replace(/\D/g, ''), 10);
    }
    
    // Extract first number from string
    const match = value.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  // Get suffix from original value (e.g., "5000+" -> "+", "95%" -> "%")
  const getSuffix = (value) => {
    if (suffix) return suffix;
    if (typeof value === 'string') {
      if (value.includes('+')) return '+';
      if (value.includes('%')) return '%';
      if (value.includes('-')) {
        // For ranges like "90-100", return the full range format
        const parts = value.split('-');
        return `-${parts[1]}`;
      }
    }
    return '';
  };

  const numericEnd = getNumericValue(end);
  const displaySuffix = getSuffix(end);

  const animateCounter = () => {
    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateCounter = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Easing function for smooth animation (easeOutQuart)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      const currentCount = Math.floor(easeOutQuart * numericEnd);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(numericEnd);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  useEffect(() => {
    // Intersection Observer to trigger animation when element is visible
    const currentRef = counterRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounter();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAnimated]);

  // Format the display value
  const getDisplayValue = () => {
    if (displaySuffix.includes('-')) {
      // For ranges like "90-100", show the start value during animation
      const rangeStart = end.split('-')[0];
      if (count === numericEnd) {
        return end; // Show full range when animation completes
      }
      return `${rangeStart}-${count}`;
    }
    return `${prefix}${count}${displaySuffix}`;
  };

  return (
    <span ref={counterRef}>
      {getDisplayValue()}
    </span>
  );
};

export default AnimatedCounter;

