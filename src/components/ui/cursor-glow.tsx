"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function CursorGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 170, damping: 32 });
  const sy = useSpring(y, { stiffness: 170, damping: 32 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      x.set(e.clientX - 120);
      y.set(e.clientY - 120);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[70] hidden h-60 w-60 rounded-full bg-[radial-gradient(circle,rgba(217,0,0,0.22)_0%,rgba(217,0,0,0.02)_60%,transparent_72%)] lg:block"
      style={{ x: sx, y: sy }}
    />
  );
}
