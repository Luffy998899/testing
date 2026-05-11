import { SeoLanding, buildSeoMetadata } from "@/components/sections/seo-landing";

export const metadata = buildSeoMetadata(
  "Tire Installation Kelowna",
  "Book precision tire installation in Kelowna with balancing, torque calibration, and quick turnaround."
);

export default function TireInstallationKelownaPage() {
  return (
    <SeoLanding
      title="Tire Installation Kelowna"
      body="Formula 19 provides professional tire installation and balancing for performance cars, daily commuters, SUVs, and trucks in Kelowna."
    />
  );
}
