"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

export function HeroWheel() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const spokes = useMemo(() => Array.from({ length: 12 }), []);

  const onMove = (x: number, y: number, width: number, height: number) => {
    const nx = (x / width - 0.5) * 2;
    const ny = (y / height - 0.5) * 2;
    setTilt({ x: ny * -7, y: nx * 9 });
  };

  return (
    <div
      className="relative aspect-square w-full overflow-hidden rounded-[1.8rem] border border-white/20 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.2),transparent_35%),radial-gradient(circle_at_82%_78%,rgba(188,13,34,0.28),transparent_45%),linear-gradient(170deg,rgba(18,21,28,0.96),rgba(6,7,10,0.98))] p-4 shadow-[0_35px_90px_rgba(0,0,0,0.55)] sm:p-7"
      style={{ perspective: "1200px" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        onMove(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height);
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div className="pointer-events-none absolute inset-x-10 bottom-8 h-9 rounded-full bg-black/60 blur-xl" />

      <motion.div
        className="relative flex h-full w-full items-center justify-center"
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 130, damping: 16, mass: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute left-1/2 top-1/2 h-[31%] w-[31%] -translate-x-[84%] -translate-y-1/2 rounded-[34%] bg-red-600 shadow-[0_0_30px_rgba(245,35,35,0.65)]"
          style={{ transform: "translateZ(6px) translate(-84%, -50%)" }}
        />

        <motion.div
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 11.5, repeat: Infinity, ease: "linear" }}
          className="relative h-[78%] w-[78%] rounded-full border-[16px] border-[#10141a] bg-[conic-gradient(from_110deg,#20252d,#545f70_24%,#edf2f8_50%,#7f8a9d_69%,#232830_88%,#d3dae4)] shadow-[inset_0_0_20px_rgba(255,255,255,0.22),0_28px_60px_rgba(0,0,0,0.52)] sm:border-[22px]"
          style={{ transform: "translateZ(28px)" }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="absolute inset-[7%] rounded-full border border-white/35" />
          <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle_at_30%_20%,#ffffff,#ccd5e2_42%,#7a8599_74%,#434d5c)]" />

          {spokes.map((_, i) => {
            const angle = (360 / spokes.length) * i;
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 h-[44%] w-[7px] -translate-x-1/2 -translate-y-[97%] rounded-full bg-[linear-gradient(to_bottom,#f4f7fc,#657083)] shadow-[0_0_12px_rgba(255,255,255,0.3)] sm:w-[9px]"
                style={{ transform: `translate(-50%, -97%) rotate(${angle}deg)`, transformOrigin: "50% 100%" }}
              />
            );
          })}

          <div className="absolute inset-[31%] rounded-full border border-black/20 bg-[radial-gradient(circle_at_35%_20%,#f6f8fa,#8f9aac_55%,#4d5666)]" />
          <div className="absolute left-1/2 top-1/2 h-[12%] w-[12%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#171b24] shadow-[0_0_0_4px_rgba(255,255,255,0.26)]" />
        </motion.div>

        <motion.div
          className="absolute right-[14%] top-[24%] h-8 w-8 rounded-full bg-red-500/70 blur-md"
          animate={{ opacity: [0.45, 0.8, 0.45], scale: [1, 1.08, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] border border-white/10" />
    </div>
  );
}
