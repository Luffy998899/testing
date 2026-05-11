"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryImage } from "@/lib/types";

export function Gallery() {
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const image = gallery.find((item) => item.id === selected);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => setGallery(data.data || []));
  }, []);

  return (
    <section id="gallery" className="section-grid px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.22em] text-red-300">Gallery</p>
        <h2 className="font-display text-3xl text-metal md:text-5xl">Installed Builds & Garage Moments</h2>
        <div className="mt-8 columns-1 gap-4 space-y-4 md:columns-2 xl:columns-3">
          {gallery.map((item) => (
            <motion.button
              whileHover={{ y: -4 }}
              key={item.id}
              onClick={() => setSelected(item.id)}
              className="group relative block w-full overflow-hidden rounded-2xl border border-white/15"
            >
              <Image src={item.image} alt={item.title} width={1200} height={900} className="h-auto w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent p-4 text-left">
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-slate-300">{item.caption}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] grid place-items-center bg-black/85 p-4"
          >
            <button className="absolute right-4 top-4 rounded-full bg-white/15 p-2" onClick={() => setSelected(null)}>
              <X />
            </button>
            <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/20">
              <Image src={image.image} alt={image.title} width={1800} height={1200} className="h-auto w-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
