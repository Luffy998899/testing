"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { damping: 20, stiffness: 110 });

  return <motion.div className="fixed left-0 top-0 z-[100] h-1 origin-left bg-accent" style={{ scaleX: width }} />;
}
