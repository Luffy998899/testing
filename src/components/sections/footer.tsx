"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteSettings } from "@/lib/types";

export function Footer() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data.data || null));
  }, []);

  return (
    <footer className="border-t border-white/10 bg-black/40 px-4 py-12 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl text-metal">FORMULA 19</p>
          <p className="mt-2 text-slate-400">All About Tires</p>
        </div>
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-slate-300">Quick Links</p>
          <div className="grid gap-2 text-slate-400">
            <Link href="/#shop">Shop</Link>
            <Link href="/#services">Services</Link>
            <Link href="/#gallery">Gallery</Link>
            <Link href="/admin">Admin</Link>
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-slate-300">Contact</p>
          <p className="text-slate-400">{settings?.phone || "778-999-8473"}</p>
          <p className="text-slate-400">{settings?.email || "formula19tires@gmail.com"}</p>
          <p className="text-slate-400">{settings?.address || "Kelowna, BC"}</p>
        </div>
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-slate-300">Newsletter</p>
          <form className="flex gap-2">
            <input className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2" placeholder="Email" />
            <button className="rounded-lg bg-accent px-3 py-2">Join</button>
          </form>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-5 text-sm text-slate-400">
        © {new Date().getFullYear()} Formula 19. All rights reserved.
      </div>
    </footer>
  );
}
