"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const stats = [
  { label: "Fast Turnaround", value: 98, suffix: "%" },
  { label: "Same-Day Service", value: 240, suffix: "+ /month" },
  { label: "Experienced Technicians", value: 18, suffix: " years" },
  { label: "Customer Satisfaction", value: 4.9, suffix: "/5" }
];

export function WhyChooseUs() {
  const refs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    refs.current.forEach((node, i) => {
      if (!node) return;
      const obj = { value: 0 };
      gsap.to(obj, {
        value: stats[i].value,
        duration: 1.4,
        ease: "power2.out",
        onUpdate: () => {
          if (!node) return;
          node.innerText = `${obj.value.toFixed(stats[i].value % 1 ? 1 : 0)}${stats[i].suffix}`;
        }
      });
    });
  }, []);

  return (
    <section id="about" className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl rounded-3xl border border-white/15 bg-gradient-to-r from-white/5 to-white/[0.02] p-8 md:p-10">
        <p className="text-xs uppercase tracking-[0.22em] text-red-300">Why Choose Us</p>
        <h2 className="font-display text-3xl text-metal md:text-5xl">Built for Drivers Who Care About Details</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className="rounded-2xl border border-white/15 bg-black/30 p-5">
              <p ref={(el) => (refs.current[i] = el)} className="text-3xl font-bold text-accent">
                0
              </p>
              <p className="mt-2 text-slate-200">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
