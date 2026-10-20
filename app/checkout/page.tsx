import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { CheckoutView } from "@/components/checkout/CheckoutView";
import "../pages.css";

export const metadata: Metadata = {
  title: "Checkout demo",
  description:
    "A checkout demonstration with validation and an order summary. No payment is collected and no order is created.",
};

export default function CheckoutPage() {
  return (
    <>
      <PageHero
        kicker="Checkout — demonstration"
        title={
          <>
            Almost
            <br />
            yours<span className="lime">.</span>
          </>
        }
        lede="This is a working form, not a working shop. Validation and totals are real; payment, inventory and fulfilment are not."
      />
      <CheckoutView />
    </>
  );
}
