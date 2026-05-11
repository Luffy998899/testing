"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingIntro() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[120] grid place-items-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7 } }}
        >
          <div className="relative flex flex-col items-center gap-5">
            <motion.div
              className="h-24 w-24 rounded-full border-2 border-accent border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ ease: "linear", duration: 1, repeat: Infinity }}
            />
            <motion.h1
              className="font-display text-3xl tracking-[0.2em] text-metal"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              FORMULA 19
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
