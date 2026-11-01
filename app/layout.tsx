import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  IBM_Plex_Mono,
  Instrument_Sans,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";
import "./components.css";
import "./design.css";
import { CartProvider } from "@/components/cart/cart-context";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartToast } from "@/components/cart/CartToast";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://soniq.example"),
  title: {
    default: "SONIQ — Feel every frequency",
    template: "%s — SONIQ",
  },
  description:
    "SONIQ builds premium over-ear headphones for people who listen closely. A concept storefront: adaptive noise cancelling, spatial audio and custom-tuned drivers.",
  openGraph: {
    title: "SONIQ — Feel every frequency",
    description:
      "Premium over-ear headphones for Gen-Z listeners. A concept storefront with a full shopping experience.",
    type: "website",
    images: [{ url: "/images/hero.jpg", width: 2848, height: 1600, alt: "SONIQ over-ear headphones" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SONIQ — Feel every frequency",
    description: "Premium over-ear headphones. A concept storefront.",
    images: ["/images/hero.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0d0c",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <body>
        <CartProvider>
          <noscript>
            <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
          </noscript>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
          <CartDrawer />
          <CartToast />
        </CartProvider>
      </body>
    </html>
  );
}
