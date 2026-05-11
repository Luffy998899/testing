"use client";

import { motion } from "framer-motion";
import { Wrench, Cog, Gauge, ShieldCheck, CircleDot, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  { title: "Tire Installation & Mounting", icon: Wrench },
  { title: "Wheel Balancing", icon: Gauge },
  { title: "Seasonal Tire Changeovers", icon: CircleDot },
  { title: "Tire & Wheel Packages", icon: ShieldCheck },
  { title: "Flat Tire Repair", icon: Cog },
  { title: "TPMS Services", icon: Settings2 }
];

export function Services() {
  return (
    <section id="services" className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.25em] text-red-300">Services</p>
        <h2 className="font-display text-3xl text-metal md:text-5xl">Precision Garage Services</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              whileHover={{ y: -6 }}
              className="glass premium-border rounded-2xl p-6"
            >
              <service.icon className="mb-4 text-accent" />
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-2 text-slate-300">Certified installation with calibrated equipment and torque specs.</p>
              <Button variant="ghost" className="mt-5">
                Book Service
              </Button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
