"use client";

import React, { useEffect, useState } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";

interface ParallaxLayerProps {
  children: React.ReactNode;
  maxOffset?: number;
  className?: string;
}

export default function ParallaxLayer({
  children,
  maxOffset = 6,
  className = "",
}: ParallaxLayerProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Ultra-smooth spring physics for GPU-accelerated motion
  const springX = useSpring(mouseX, { stiffness: 90, damping: 20, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 20, mass: 0.4 });

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Enable only on fine-pointer desktop devices with no reduced motion preference
    const mediaQuery = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)"
    );

    const checkDesktop = () => {
      setIsDesktop(mediaQuery.matches && window.innerWidth >= 1024);
    };

    checkDesktop();
    mediaQuery.addEventListener("change", checkDesktop);
    window.addEventListener("resize", checkDesktop);

    const handleMouseMove = (e: MouseEvent) => {
      if (!mediaQuery.matches || window.innerWidth < 1024) return;
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const normY = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      mouseX.set(normX * maxOffset);
      mouseY.set(normY * maxOffset);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      mediaQuery.removeEventListener("change", checkDesktop);
      window.removeEventListener("resize", checkDesktop);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [maxOffset, mouseX, mouseY]);

  if (!isDesktop) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
