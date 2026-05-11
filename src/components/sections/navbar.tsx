"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SiteSettings } from "@/lib/types";

const links = ["Home", "Shop", "Services", "Gallery", "Testimonials", "About", "Contact"];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data.data || null));
  }, []);

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-4 py-3 md:px-8">
      <nav
        className={`mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl px-4 transition duration-300 md:h-[74px] md:px-6 ${
          scrolled
            ? "border border-white/25 bg-black/50 shadow-[0_18px_45px_rgba(0,0,0,0.5)] backdrop-blur-xl"
            : "border border-white/15 bg-black/35 backdrop-blur-md"
        }`}
      >
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-[0.14em] text-metal md:text-[2rem]">FORMULA 19</span>
          <span className="hidden rounded-full border border-white/20 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-slate-300 xl:inline-flex">
            Performance
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link}
              href={link === "Home" ? "#home" : `#${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="group relative text-sm font-semibold uppercase tracking-[0.12em] text-slate-100"
            >
              {link}
              <span className="absolute -bottom-[7px] left-0 h-[2px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <Link href="/admin/login" className="group relative text-sm font-semibold uppercase tracking-[0.12em] text-slate-100">
            Admin Login
            <span className="absolute -bottom-[7px] left-0 h-[2px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={`tel:+${(settings?.phone || "778-999-8473").replace(/[^\d]/g, "")}`}>
            <Button variant="outline" className="h-10 gap-2 rounded-full px-4">
              <Phone size={16} /> Call
            </Button>
          </a>
          <a href={`https://wa.me/${settings?.whatsapp || "17789998473"}`} target="_blank" rel="noreferrer">
            <Button className="h-10 rounded-full px-5">WhatsApp</Button>
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/30 text-slate-100 lg:hidden"
          aria-label="Open menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/20 bg-black/65 p-4 backdrop-blur-xl lg:hidden"
          >
            <div className="grid gap-3">
              {links.map((link) => (
                <a
                  key={link}
                  href={link === "Home" ? "#home" : `#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-white/10 px-3 py-2 text-sm uppercase tracking-[0.12em] hover:bg-white/10"
                >
                  {link}
                </a>
              ))}
              <Link href="/admin/login" onClick={() => setOpen(false)} className="rounded-xl border border-white/10 px-3 py-2 text-sm uppercase tracking-[0.12em] hover:bg-white/10">
                Admin Login
              </Link>
              <a href={`https://wa.me/${settings?.whatsapp || "17789998473"}`} target="_blank" rel="noreferrer">
                <Button className="mt-1 w-full">WhatsApp Quote</Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
