"use client";

import { useEffect, useState } from "react";
import { CloseIcon } from "@/components/ui/icons";

const MESSAGE_KEY = "soniq.announce.dismissed";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(MESSAGE_KEY) === "1") setDismissed(true);
    } catch {
      /* ignore */
    }
  }, []);

  if (dismissed) return null;

  function dismiss() {
    setDismissed(true);
    try {
      window.sessionStorage.setItem(MESSAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="announce">
      <div className="announce__inner">
        <span className="announce__dot" aria-hidden="true" />
        <p className="announce__message">
          <strong>Free express shipping over $150</strong> · 30-day returns
          <span className="announce__demo"> · Concept demo — nothing is sold</span>
        </p>
        <button type="button" className="announce__dismiss" onClick={dismiss}>
          Close
          <CloseIcon width={10} height={10} style={{ display: "inline", marginLeft: "0.35rem" }} />
        </button>
      </div>
    </div>
  );
}
