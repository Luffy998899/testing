import { SeoLanding, buildSeoMetadata } from "@/components/sections/seo-landing";

export const metadata = buildSeoMetadata(
  "Winter Tires Kelowna",
  "Get winter tires in Kelowna with complete package options, TPMS services, and same-day mounting."
);

export default function WinterTiresKelownaPage() {
  return (
    <SeoLanding
      title="Winter Tires Kelowna"
      body="Stay prepared for BC winters with confidence-rated winter tire packages and professional installation from Formula 19."
    />
  );
}
