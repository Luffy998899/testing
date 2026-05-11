"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { whatsappProductMessage } from "@/lib/utils";

function ProductFilters({
  brands,
  onVehicle,
  onSeasonal,
  onBrand,
  onSize,
  onPrice
}: {
  brands: string[];
  onVehicle: (v: string) => void;
  onSeasonal: (v: string) => void;
  onBrand: (v: string) => void;
  onSize: (v: string) => void;
  onPrice: (v: number) => void;
}) {
  return (
    <div className="mb-6 grid gap-3 md:grid-cols-3 xl:grid-cols-5">
      <select onChange={(e) => onVehicle(e.target.value)} className="rounded-xl border border-white/20 bg-white/5 px-4 py-3">
        <option value="">Vehicle Type</option>
        <option value="Car">Car</option>
        <option value="SUV">SUV</option>
        <option value="Truck">Truck</option>
      </select>
      <select onChange={(e) => onSeasonal(e.target.value)} className="rounded-xl border border-white/20 bg-white/5 px-4 py-3">
        <option value="">Seasonal Tires</option>
        <option value="All Season">All Season</option>
        <option value="Summer">Summer</option>
        <option value="Winter">Winter</option>
      </select>
      <select onChange={(e) => onBrand(e.target.value)} className="rounded-xl border border-white/20 bg-white/5 px-4 py-3">
        <option value="">Brand</option>
        {brands.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>
      <input
        placeholder="Rim / Tire Size"
        onChange={(e) => onSize(e.target.value)}
        className="rounded-xl border border-white/20 bg-white/5 px-4 py-3"
      />
      <select onChange={(e) => onPrice(Number(e.target.value || 99999))} className="rounded-xl border border-white/20 bg-white/5 px-4 py-3">
        <option value="99999">Price Range</option>
        <option value="400">Up to $400</option>
        <option value="900">Up to $900</option>
        <option value="1400">Up to $1400</option>
        <option value="99999">All prices</option>
      </select>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article
      whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
      transition={{ type: "spring", stiffness: 180, damping: 16 }}
      className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] p-3"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative mb-4 h-56 overflow-hidden rounded-xl">
        <Image src={product.image} alt={product.name} fill className="object-cover transition duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-accent/50 px-2 py-1 text-xs">{product.brand}</span>
          {product.featured && <span className="rounded-full bg-accent/20 px-2 py-1 text-xs text-red-300">Featured</span>}
        </div>
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p className="text-sm text-slate-300">{product.specs}</p>
        <div className="flex items-center justify-between text-sm text-slate-300">
          <span>{product.size}</span>
          <span>{product.inStock ? "In Stock" : "Backorder"}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-metal">${product.price}</p>
          {product.onSale && <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs text-red-300">Sale</span>}
        </div>
        <a
          href={whatsappProductMessage({ name: product.name, size: product.size, price: `$${product.price}` })}
          target="_blank"
          rel="noreferrer"
        >
          <Button className="w-full">Buy on WhatsApp</Button>
        </a>
      </div>
    </motion.article>
  );
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [vehicle, setVehicle] = useState("");
  const [seasonal, setSeasonal] = useState("");
  const [brand, setBrand] = useState("");
  const [sizeQuery, setSizeQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(99999);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.data || []));
  }, []);

  const brands = useMemo(() => [...new Set(products.map((product) => product.brand))].sort(), [products]);

  const filtered = useMemo(
    () =>
      products.filter((product) => {
        if (vehicle && product.vehicleType !== vehicle) return false;
        if (seasonal && product.seasonal !== seasonal) return false;
        if (brand && product.brand !== brand) return false;
        if (sizeQuery && !product.size.toLowerCase().includes(sizeQuery.toLowerCase())) return false;
        if (product.price > maxPrice) return false;
        return true;
      }),
    [vehicle, seasonal, brand, sizeQuery, maxPrice]
  );

  return (
    <section id="shop" className="section-grid px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-red-300">Featured Collection</p>
            <h2 className="font-display text-3xl text-metal md:text-5xl">Tires. Rims. Performance Packages.</h2>
          </div>
        </div>
        <ProductFilters
          brands={brands}
          onVehicle={setVehicle}
          onSeasonal={setSeasonal}
          onBrand={setBrand}
          onSize={setSizeQuery}
          onPrice={setMaxPrice}
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
