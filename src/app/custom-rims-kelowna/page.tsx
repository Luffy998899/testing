import { SeoLanding, buildSeoMetadata } from "@/components/sections/seo-landing";

export const metadata = buildSeoMetadata(
  "Custom Rims Kelowna",
  "Explore custom rims in Kelowna from top brands, with professional fitment and balancing at Formula 19."
);

export default function CustomRimsKelownaPage() {
  return (
    <SeoLanding
      title="Custom Rims Kelowna"
      body="Upgrade style and handling with premium forged and flow-formed wheels, tailored fitment guidance, and expert installation by Formula 19 in Kelowna."
    />
  );
}
