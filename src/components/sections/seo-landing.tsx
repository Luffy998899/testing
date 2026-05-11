import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function buildSeoMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: { title: `${title} | Formula 19`, description },
    twitter: { card: "summary_large_image", title: `${title} | Formula 19`, description }
  };
}

export function SeoLanding({
  title,
  body
}: {
  title: string;
  body: string;
}) {
  return (
    <main className="min-h-screen px-4 pb-20 pt-28 md:px-8">
      <section className="mx-auto max-w-5xl rounded-3xl border border-white/15 bg-white/[0.03] p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-red-300">Kelowna Local SEO</p>
        <h1 className="mt-2 font-display text-4xl text-metal">{title}</h1>
        <p className="mt-5 text-lg text-slate-300">{body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="tel:+17789998473">
            <Button>Call 778-999-8473</Button>
          </a>
          <a href="https://wa.me/17789998473" target="_blank" rel="noreferrer">
            <Button variant="outline">Chat on WhatsApp</Button>
          </a>
          <Link href="/">
            <Button variant="ghost">Back to Homepage</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
