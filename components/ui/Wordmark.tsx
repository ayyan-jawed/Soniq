"use client";

import Link from "next/link";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`wordmark ${className}`} aria-label="SONIQ — home">
      <span className="wordmark__mark" aria-hidden="true" />
      SONIQ
    </Link>
  );
}
