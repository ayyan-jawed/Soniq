import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { ContactView } from "@/components/contact/ContactView";
import "../pages.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the SONIQ demonstration store. The form validates input and clearly states that nothing is sent.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title={
          <>
            Talk to
            <br />
            us<span className="lime">.</span>
          </>
        }
        lede="A real support channel needs a real backend. This one demonstrates the form, the validation and the tone — and tells you exactly where it stops."
      />
      <ContactView />
    </>
  );
}
