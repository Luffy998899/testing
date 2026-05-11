"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Product } from "@/lib/types";

export function RimInventory() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.data || []));
  }, []);

  const rims = useMemo(() => products.filter((item) => item.category === "Custom Rims").slice(0, 6), [products]);

  if (!rims.length) {
    return null;
  }

  return (
    <section className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.24em] text-red-300">Rim Stock Gallery</p>
        <h2 className="font-display text-3xl text-metal md:text-5xl">In-Stock Rims Ready For Install</h2>
        <p className="mt-3 max-w-2xl text-slate-300">These are live stock images from your product inventory. Add or remove rims in admin and this section updates automatically.</p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rims.map((rim, index) => (
            <motion.article
              key={rim.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03]"
            >
              <div className="relative h-56">
                <Image src={rim.image} alt={rim.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                <p className="text-sm uppercase tracking-wide text-red-300">{rim.brand}</p>
                <h3 className="mt-1 text-xl font-semibold text-slate-100">{rim.name}</h3>
                <p className="mt-1 text-sm text-slate-300">{rim.size}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
