import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import Script from "next/script";
import { ScrollProvider } from "@/components/providers/scroll-provider";
import { LoadingIntro } from "@/components/ui/loading-intro";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export const metadata: Metadata = {
  metadataBase: new URL("https://formula19.ca"),
  title: {
    default: "Formula 19 | All About Tires",
    template: "%s | Formula 19"
  },
  description:
    "Kelowna premium tire shop for custom rims, tire installation, balancing, TPMS, and high-performance wheel packages.",
  keywords: [
    "Tire Shop Kelowna",
    "Custom Rims Kelowna",
    "Winter Tires Kelowna",
    "Tire Installation Kelowna",
    "Formula 19"
  ],
  openGraph: {
    title: "Formula 19 | Premium Tires & Custom Wheels",
    description: "Performance. Style. Reliability. Kelowna's premium tire and wheel experts.",
    type: "website",
    locale: "en_CA",
    siteName: "Formula 19"
  },
  twitter: {
    card: "summary_large_image",
    title: "Formula 19 | All About Tires",
    description: "Premium tires, custom wheels, and same-day service in Kelowna."
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-x-hidden" suppressHydrationWarning>
        <Script id="hydrate-attr-sanitizer" strategy="beforeInteractive">
          {`(function(){
            var attrs = [
              'bis_skin_checked',
              'bis_register',
              '__processed_a08c5569-f696-4701-9239-58350b918066__'
            ];

            function clean(root){
              var selector = attrs.map(function(a){ return '[' + a + ']'; }).join(',');
              var nodes = (root || document).querySelectorAll(selector);
              for (var i = 0; i < nodes.length; i++) {
                for (var j = 0; j < attrs.length; j++) {
                  nodes[i].removeAttribute(attrs[j]);
                }
              }
              for (var k = 0; k < attrs.length; k++) {
                document.documentElement.removeAttribute(attrs[k]);
                document.body && document.body.removeAttribute(attrs[k]);
              }
            }

            clean(document);

            var observer = new MutationObserver(function(){
              clean(document);
            });

            observer.observe(document.documentElement, {
              childList: true,
              subtree: true,
              attributes: true
            });
          })();`}
        </Script>
        <ScrollProvider>
          <LoadingIntro />
          <CursorGlow />
          <ScrollProgress />
          {children}
        </ScrollProvider>
      </body>
    </html>
  );
}
