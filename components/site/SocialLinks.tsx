"use client";

import { useState } from "react";
import { InstagramIcon, SpotifyIcon, TiktokIcon, YoutubeIcon } from "@/components/ui/icons";

const SOCIALS = [
  { label: "Instagram", Icon: InstagramIcon },
  { label: "TikTok", Icon: TiktokIcon },
  { label: "YouTube", Icon: YoutubeIcon },
  { label: "Spotify", Icon: SpotifyIcon },
];

export function SocialLinks() {
  const [note, setNote] = useState<string | null>(null);

  return (
    <div>
      <div className="footer__socials">
        {SOCIALS.map(({ label, Icon }) => (
          <button
            key={label}
            type="button"
            className="social"
            aria-label={`${label} — not available in this demo`}
            onClick={() =>
              setNote(`${label} is not live. SONIQ is a fictional brand, so there is no profile to visit.`)
            }
          >
            <Icon />
          </button>
        ))}
      </div>
      <p className="form-note" aria-live="polite" style={{ marginTop: "0.7rem", maxWidth: "26ch" }}>
        {note ?? "Social profiles are intentionally not linked — this is a concept storefront."}
      </p>
    </div>
  );
}
