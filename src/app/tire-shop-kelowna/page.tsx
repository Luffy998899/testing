import { SeoLanding, buildSeoMetadata } from "@/components/sections/seo-landing";

export const metadata = buildSeoMetadata(
  "Tire Shop Kelowna",
  "Formula 19 is a premium Kelowna tire shop for same-day installation, balancing, TPMS, and performance tire upgrades."
);

export default function TireShopKelownaPage() {
  return (
    <SeoLanding
      title="Tire Shop Kelowna"
      body="Formula 19 delivers high-performance tire solutions in Kelowna with premium installation quality, fast turnaround times, and trusted wheel expertise for cars, SUVs, and trucks."
    />
  );
}
