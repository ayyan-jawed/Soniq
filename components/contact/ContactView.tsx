"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckIcon, ShieldIcon, TruckIcon, RefreshIcon, ArrowRight } from "@/components/ui/icons";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const TOPICS = [
  "Product advice",
  "Order support",
  "Warranty claim",
  "Returns",
  "Press & partnerships",
  "Something else",
];

export function ContactView() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    topic: "Product advice",
    order: "",
    message: "",
  });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function update(field: string, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: "" }));
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = "Tell us who you are.";
    if (!EMAIL_RE.test(values.email.trim())) next.email = "Enter a valid email address.";
    if (values.message.trim().length < 20) next.message = "Please add at least 20 characters so we can help.";
    if (!consent) next.consent = "Please confirm you understand this demo does not send messages.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  }

  return (
    <div className="container contact">
      <div className="contact__main">
        {sent ? (
          <div className="form-status form-status--ok contact__sent" role="status">
            <CheckIcon width={17} height={17} style={{ flex: "none", marginTop: "0.2rem" }} />
            <div>
              <strong>Form validated — nothing was sent.</strong>
              This demo has no email service or support desk, so your message did not leave the
              browser. In a production store this would open a ticket and return a reference number.
              <div style={{ marginTop: "1rem" }}>
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  onClick={() => {
                    setSent(false);
                    setValues({ name: "", email: "", topic: "Product advice", order: "", message: "" });
                    setConsent(false);
                  }}
                >
                  Fill the form again
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form className="contact__form" onSubmit={submit} noValidate>
            <div className="form-grid">
              <div className="field">
                <label className="field__label" htmlFor="contact-name">
                  Name
                </label>
                <input
                  id="contact-name"
                  className="input"
                  autoComplete="name"
                  value={values.name}
                  onChange={(event) => update("name", event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                />
                <p className="field__error" id="contact-name-error" role="alert">
                  {errors.name}
                </p>
              </div>
              <div className="field">
                <label className="field__label" htmlFor="contact-email">
                  Email
                </label>
                <input
                  id="contact-email"
                  className="input"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(event) => update("email", event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                />
                <p className="field__error" id="contact-email-error" role="alert">
                  {errors.email}
                </p>
              </div>
              <div className="field">
                <label className="field__label" htmlFor="contact-topic">
                  Topic
                </label>
                <select
                  id="contact-topic"
                  className="select"
                  value={values.topic}
                  onChange={(event) => update("topic", event.target.value)}
                >
                  {TOPICS.map((topic) => (
                    <option key={topic}>{topic}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label className="field__label" htmlFor="contact-order">
                  Order number <span>optional</span>
                </label>
                <input
                  id="contact-order"
                  className="input"
                  value={values.order}
                  onChange={(event) => update("order", event.target.value)}
                  placeholder="SONIQ-…"
                />
              </div>
              <div className="field form-grid__full">
                <label className="field__label" htmlFor="contact-message">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  className="textarea"
                  value={values.message}
                  onChange={(event) => update("message", event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  placeholder="What are you listening on, and what are you trying to solve?"
                />
                <p className="field__error" id="contact-message-error" role="alert">
                  {errors.message}
                </p>
              </div>
            </div>

            <label className="check contact__consent">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => {
                  setConsent(event.target.checked);
                  if (errors.consent) setErrors((current) => ({ ...current, consent: "" }));
                }}
              />
              <span>
                I understand this is a demonstration form. Nothing is transmitted, no ticket is
                created and no reply will be sent.
              </span>
            </label>
            <p className="field__error" role="alert">
              {errors.consent}
            </p>

            <button type="submit" className="btn btn--lime">
              Send message <ArrowRight />
            </button>
            <p className="form-note">
              Fields are validated in the browser only. There is no server-side handler in this
              project.
            </p>
          </form>
        )}
      </div>

      <aside className="contact__aside">
        <div className="contact__block">
          <p className="mono">Response times</p>
          <p>
            Product advice within one working day. Warranty claims within two. This is demo policy
            copy; no inbox is monitored.
          </p>
        </div>

        <div className="contact__block">
          <p className="mono">Email</p>
          <p className="contact__email">support@soniq.example</p>
          <p className="form-note">Example domain — deliberately not a real address.</p>
        </div>

        <div className="contact__block">
          <p className="mono">Before you write</p>
          <ul className="contact__links">
            <li>
              <Link href="/support/shipping-returns">
                <TruckIcon /> Shipping & returns
              </Link>
            </li>
            <li>
              <Link href="/support/warranty">
                <ShieldIcon /> Warranty terms
              </Link>
            </li>
            <li>
              <Link href="/support/faqs">
                <RefreshIcon /> FAQs
              </Link>
            </li>
          </ul>
        </div>

        <div className="contact__block contact__block--quiet">
          <p className="mono">No phone line</p>
          <p>
            We have not invented a phone number or a street address for this concept brand. Support
            is presented as a written channel only.
          </p>
        </div>
      </aside>
    </div>
  );
}
