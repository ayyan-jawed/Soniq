import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { CartView } from "@/components/cart/CartView";
import "../pages.css";

export const metadata: Metadata = {
  title: "Your bag",
  description: "Review the SONIQ items in your bag before the demo checkout.",
};

export default function CartPage() {
  return (
    <>
      <PageHero
        kicker="Shopping bag"
        title={
          <>
            Your bag<span className="lime">.</span>
          </>
        }
        lede="Prices include the demo discount where one applies. Shipping is free above $150. Nothing here is charged."
      />
      <CartView />
    </>
  );
}
