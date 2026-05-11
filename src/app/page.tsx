import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { Services } from "@/components/sections/services";
import { WhyChooseUs } from "@/components/sections/why-us";
import { Gallery } from "@/components/sections/gallery";
import { Testimonials } from "@/components/sections/testimonials";
import { RimInventory } from "@/components/sections/rim-inventory";
import { BookingSection } from "@/components/sections/booking";
import { Footer } from "@/components/sections/footer";
import { FloatingActions } from "@/components/sections/floating-actions";
import { ClientOnly } from "@/components/providers/client-only";

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "Formula 19",
    image: "https://formula19.ca/og-image.jpg",
    telephone: "+1-778-999-8473",
    email: "formula19tires@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit 1, 715 Evans Ct",
      addressLocality: "Kelowna",
      addressRegion: "BC",
      postalCode: "V1X 6G4",
      addressCountry: "CA"
    },
    areaServed: "Kelowna",
    url: "https://formula19.ca"
  };

  return (
    <main className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ClientOnly>
        <Navbar />
        <Hero />
        <FeaturedProducts />
        <RimInventory />
        <Services />
        <WhyChooseUs />
        <Gallery />
        <Testimonials />
        <BookingSection />
        <Footer />
        <FloatingActions />
      </ClientOnly>
    </main>
  );
}
