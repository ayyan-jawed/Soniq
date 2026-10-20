import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { AccountView } from "@/components/account/AccountView";
import "../pages.css";

export const metadata: Metadata = {
  title: "Account",
  description:
    "A clearly marked demo account interface for the SONIQ concept storefront. No authentication is performed.",
};

export default function AccountPage() {
  return (
    <>
      <PageHero
        kicker="Account — demo"
        title={
          <>
            Your
            <br />
            account<span className="lime">.</span>
          </>
        }
        lede="No sign-up, no passwords, no server. This page demonstrates the interface and says plainly what it is not."
      />
      <AccountView />
    </>
  );
}
