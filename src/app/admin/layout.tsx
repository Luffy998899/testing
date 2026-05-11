import { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-white/10 bg-black/50 px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <p className="font-display text-xl text-metal">Formula 19 Admin</p>
          <Link href="/" className="text-slate-300 hover:text-white">
            Back to Site
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">{children}</div>
    </div>
  );
}
