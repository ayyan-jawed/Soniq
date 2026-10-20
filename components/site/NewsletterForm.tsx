"use client";

import { useId, useState } from "react";
import { ArrowRight, CheckIcon } from "@/components/ui/icons";

type Props = {
  variant?: "footer" | "panel";
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function NewsletterForm({ variant = "panel" }: Props) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [consentError, setConsentError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    let valid = true;

    if (!EMAIL_RE.test(email.trim())) {
      setError("Enter a valid email address, for example name@domain.com.");
      valid = false;
    } else {
      setError(null);
    }

    if (!consent) {
      setConsentError("Please confirm you would like to hear from SONIQ.");
      valid = false;
    } else {
      setConsentError(null);
    }

    if (!valid) return;

    setDone(true);
  }

  if (done) {
    return (
      <div className="form-status form-status--ok" role="status">
        <CheckIcon width={16} height={16} style={{ flex: "none", marginTop: "0.15rem" }} />
        <div>
          <strong>Saved — locally, in this browser.</strong>
          This demo has no mailing backend, so no email was sent and no list was created. Nothing
          about this address left your device.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className={`newsletter newsletter--${variant}`}>
      <div className="newsletter__row">
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${id}-email`}
          className="input newsletter__input"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@domain.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) setError(null);
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-email-error` : undefined}
          required
        />
        <button type="submit" className="btn btn--ink newsletter__submit">
          Sign up
          <ArrowRight />
        </button>
      </div>
      <p className="field__error" id={`${id}-email-error`} role="alert">
        {error}
      </p>
      <label className="check newsletter__consent">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => {
            setConsent(event.target.checked);
            if (consentError) setConsentError(null);
          }}
          aria-describedby={consentError ? `${id}-consent-error` : undefined}
        />
        <span>
          I agree to receive occasional product notes from SONIQ. One email a month at most, no
          sharing with third parties, unsubscribe in one click.
        </span>
      </label>
      <p className="field__error" id={`${id}-consent-error`} role="alert">
        {consentError}
      </p>
      <p className="form-note">
        Demo only: the address is validated in your browser and never transmitted.
      </p>
    </form>
  );
}
