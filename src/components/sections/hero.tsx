"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HeroWheel } from "@/components/sections/hero-wheel";
import { SiteSettings } from "@/lib/types";
import { ArrowRight, GaugeCircle, ShieldCheck, Sparkles, Timer, Trophy, Wrench } from "lucide-react";
import Image from "next/image";

const features = [
  { label: "Precision Fitment", icon: GaugeCircle },
  { label: "Same-Day Slots", icon: Sparkles },
  { label: "Premium Warranty", icon: ShieldCheck }
];

const statCards = [
  { label: "Monthly Installs", value: "240+" },
  { label: "Customer Rating", value: "4.9/5" },
  { label: "Avg Turnaround", value: "95 min" }
];

const rims = [
  {
    id: "r1",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80",
    title: "Forged Satin Graphite"
  },
  {
    id: "r2",
    image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=1200&q=80",
    title: "Brushed Titanium Multi-Spoke"
  },
  {
    id: "r3",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80",
    title: "Matte Black Performance Series"
  }
];

const floatingSpecs = [
  { label: "Grip Index", value: "A+", sub: "Wet + Dry compound" },
  { label: "Install Time", value: "95 min", sub: "Average bay cycle" },
  { label: "Performance", value: "Race Tuned", sub: "Road legal setup" }
];

const showcaseTiles = [
  {
    id: "t1",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80",
    name: "Chrome Deep Dish"
  },
  {
    id: "t2",
    image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?auto=format&fit=crop&w=1000&q=80",
    name: "Brushed Titanium"
  },
  {
    id: "t3",
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1000&q=80",
    name: "Matte Black Forged"
  }
];

export function Hero() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [activeRim, setActiveRim] = useState(0);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data.data || null));
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveRim((prev) => (prev + 1) % rims.length);
    }, 3400);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative isolate overflow-hidden pb-16 pt-28 md:pt-32 xl:pb-20">
      <div className="absolute inset-0 -z-30">
        <Image
          src="https://images.unsplash.com/photo-1606220838315-056192d5e927?auto=format&fit=crop&w=2200&q=80"
          alt="Luxury wheel workshop"
          fill
          priority
          className="object-cover opacity-30"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(106deg,rgba(5,6,9,0.92)_0%,rgba(7,9,12,0.76)_42%,rgba(7,8,11,0.64)_100%)]" />
      <div className="pointer-events-none absolute -left-32 top-20 -z-10 h-80 w-80 rounded-full bg-red-700/25 blur-[78px]" />
      <div className="pointer-events-none absolute right-[-6rem] top-28 -z-10 h-64 w-64 rounded-full bg-blue-500/15 blur-[72px]" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-24 -z-10 h-px bg-gradient-to-r from-transparent via-red-500/85 to-transparent"
        animate={{ opacity: [0.1, 0.6, 0.1], x: ["-8%", "8%", "-8%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="pointer-events-none absolute inset-0 -z-10">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-[3px] w-[3px] rounded-full bg-white/45"
            style={{ left: `${8 + i * 5.6}%`, top: `${18 + ((i * 13) % 62)}%` }}
            animate={{ opacity: [0.1, 0.45, 0.1], y: [0, -10, 0] }}
            transition={{ duration: 3 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute -right-16 top-[18%] -z-10 h-[420px] w-[420px] rounded-full border border-white/10 bg-[conic-gradient(from_130deg,rgba(255,255,255,0.08),rgba(217,0,0,0.18),rgba(255,255,255,0.08))] opacity-55 blur-xl" />

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12 xl:gap-16">
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.p
            className="inline-flex items-center rounded-full border border-white/25 bg-black/35 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-slate-100 sm:text-xs"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            Motorsport Spec Showroom • Kelowna
          </motion.p>

          <motion.h1
            className="mt-5 max-w-[14.5ch] font-display text-4xl leading-[0.94] text-metal sm:text-5xl md:text-6xl xl:text-7xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            PREMIUM TIRES & CUSTOM WHEELS
          </motion.h1>

          <motion.p
            className="mt-5 max-w-xl text-base leading-relaxed text-slate-100/95 sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
          >
            {settings?.heroSubheadline ||
              "From street-dominating fitment to high-grip performance packages, Formula 19 delivers aggressive styling, reliable traction, and precision installation in one premium workflow."}
          </motion.p>

          <motion.div
            className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
          >
            <a href="#shop" className="sm:col-span-1">
              <Button className="w-full justify-center gap-2">
                Explore Inventory <ArrowRight size={16} />
              </Button>
            </a>
            <a href="#gallery" className="sm:col-span-1">
              <Button variant="ghost" className="w-full bg-white/8">
                View Builds
              </Button>
            </a>
            <a href="#contact" className="sm:col-span-1">
              <Button variant="outline" className="w-full">
                Reserve Installation
              </Button>
            </a>
          </motion.div>

          <motion.div
            className="mt-8 grid gap-3 sm:grid-cols-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28 }}
          >
            {features.map((feature) => (
              <div key={feature.label} className="rounded-2xl border border-white/20 bg-black/30 px-4 py-3 backdrop-blur-sm">
                <feature.icon className="mb-2 text-red-300" size={18} />
                <p className="text-sm font-semibold text-slate-100">{feature.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative z-10 space-y-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut", delay: 0.1 }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 18;
            setParallax({ x, y });
          }}
          onMouseLeave={() => setParallax({ x: 0, y: 0 })}
        >
          <motion.div
            className="absolute -top-5 right-8 h-28 w-28 rounded-full bg-red-600/25 blur-3xl"
            animate={{ x: parallax.x * 0.4, y: parallax.y * 0.4 }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
          />

          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-black/35 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.2em] text-red-300">Forged Collection</p>
              <span className="rounded-full border border-white/20 bg-black/55 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-slate-100">
                2026 Series
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {showcaseTiles.map((tile) => (
                <motion.article
                  key={tile.id}
                  whileHover={{ y: -4 }}
                  className="group overflow-hidden rounded-xl border border-white/15 bg-black/40"
                >
                  <div className="relative h-24">
                    <Image src={tile.image} alt={tile.name} fill className="object-cover transition duration-500 group-hover:scale-110" />
                  </div>
                  <p className="px-2 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-200">{tile.name}</p>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="relative grid gap-4">
            <motion.div
              className="relative"
              animate={{ x: parallax.x * -0.16, y: parallax.y * -0.16 }}
              transition={{ type: "spring", stiffness: 110, damping: 18 }}
            >
              <HeroWheel />

              <div className="pointer-events-none absolute -left-4 top-[16%] hidden w-40 rounded-2xl border border-white/20 bg-black/55 p-3 text-left backdrop-blur-sm lg:block">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-300">Grip Index</p>
                <p className="mt-1 text-xl font-bold text-metal">A+</p>
                <p className="text-[10px] text-slate-400">Wet + Dry tuned</p>
              </div>

              <div className="pointer-events-none absolute -right-4 top-[38%] hidden w-40 rounded-2xl border border-white/20 bg-black/55 p-3 text-left backdrop-blur-sm lg:block">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-300">Tire Spec</p>
                <p className="mt-1 text-xl font-bold text-metal">285/30ZR20</p>
                <p className="text-[10px] text-slate-400">XL • Y Rated</p>
              </div>

              <div className="pointer-events-none absolute -left-4 bottom-[14%] hidden w-40 rounded-2xl border border-white/20 bg-black/55 p-3 text-left backdrop-blur-sm lg:block">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-300">Install Time</p>
                <p className="mt-1 text-xl font-bold text-metal">95 min</p>
                <p className="text-[10px] text-slate-400">Average bay cycle</p>
              </div>
            </motion.div>

            <div className="overflow-x-auto pb-1 lg:hidden">
              <div className="flex min-w-max gap-3">
                {floatingSpecs.map((spec) => (
                  <div key={spec.label} className="w-44 rounded-2xl border border-white/20 bg-black/55 p-3 backdrop-blur-sm">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-300">{spec.label}</p>
                    <p className="mt-1 text-lg font-bold text-metal">{spec.value}</p>
                    <p className="text-[10px] text-slate-400">{spec.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/15 bg-black/40 p-3 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <motion.div className="rounded-xl border border-white/10 bg-white/[0.02] p-3" whileHover={{ y: -2 }}>
                <p className="text-[10px] uppercase tracking-[0.16em] text-slate-300">Queue</p>
                <p className="mt-1 text-lg font-bold text-metal">8 Bays</p>
              </motion.div>
              <motion.div className="rounded-xl border border-white/10 bg-white/[0.02] p-3" whileHover={{ y: -2 }}>
                <p className="text-[10px] uppercase tracking-[0.16em] text-slate-300">Installs</p>
                <p className="mt-1 text-lg font-bold text-metal">240+</p>
              </motion.div>
              <motion.div className="rounded-xl border border-white/10 bg-white/[0.02] p-3" whileHover={{ y: -2 }}>
                <p className="text-[10px] uppercase tracking-[0.16em] text-slate-300">Rating</p>
                <p className="mt-1 text-lg font-bold text-metal">4.9/5</p>
              </motion.div>
              <motion.div className="rounded-xl border border-white/10 bg-white/[0.02] p-3" whileHover={{ y: -2 }}>
                <p className="text-[10px] uppercase tracking-[0.16em] text-slate-300">Fitment</p>
                <p className="mt-1 text-lg font-bold text-metal">Race Spec</p>
              </motion.div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] uppercase tracking-[0.14em] text-slate-300">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-2 py-2">
                <Timer size={14} className="text-red-300" /> Fast Turnaround
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-2 py-2">
                <Wrench size={14} className="text-red-300" /> Precision Install
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-2 py-2">
                <Trophy size={14} className="text-red-300" /> Premium Brands
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
