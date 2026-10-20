export type ContentSection = {
  heading: string;
  body?: string[];
  bullets?: string[];
};

export type ContentPage = {
  slug: string;
  title: string;
  kicker: string;
  intro: string;
  updated: string;
  sections: ContentSection[];
};

export const supportPages: ContentPage[] = [
  {
    slug: "shipping-returns",
    title: "Shipping & Returns",
    kicker: "Support",
    intro:
      "Everything below describes how this concept store is designed to work. No parcel will actually be dispatched — SONIQ is a demo brand and no order is processed.",
    updated: "1 October 2026",
    sections: [
      {
        heading: "Dispatch",
        body: [
          "Orders placed before 14:00 local time are prepared the same working day. This demo storefront has no warehouse, so the timings exist to show how the real service is specified rather than to promise a delivery.",
        ],
        bullets: [
          "Standard delivery — 3 to 5 working days, free above $150, otherwise $9.",
          "Express delivery — 1 to 2 working days, $19.",
          "Returns window — 30 days from delivery, unopened or lightly used.",
        ],
      },
      {
        heading: "Packaging",
        body: [
          "Headphones ship in a moulded recycled-fibre insert with no plastic film. The outer carton is unbleached and printed with a single ink. Cases are designed to be reused rather than recycled, which is the better outcome.",
        ],
      },
      {
        heading: "Returns",
        body: [
          "Start a return from the account area or write to the support address. We ask that you keep the original case and cables; a return without them is still accepted but takes longer to process.",
          "Refunds are issued to the original payment method within five working days of inspection. Nothing is charged in this demo, so the refund flow is illustrative only.",
        ],
      },
      {
        heading: "Warranty claims",
        body: [
          "If a driver fails or a hinge develops play, the warranty covers repair or replacement for two years. Battery health below 80% within that window is also covered.",
        ],
      },
    ],
  },
  {
    slug: "warranty",
    title: "Warranty",
    kicker: "Support",
    intro:
      "Two years on manufacturing defects. Replaceable parts sold at cost. This page describes demo policy and does not create a real contract.",
    updated: "1 October 2026",
    sections: [
      {
        heading: "What is covered",
        bullets: [
          "Driver failure or channel imbalance beyond 1 dB.",
          "Hinge, slider and yoke defects under normal use.",
          "Battery capacity below 80% of rated capacity within two years.",
          "Charging port failure that is not caused by liquid damage.",
        ],
      },
      {
        heading: "What is not covered",
        bullets: [
          "Wear on ear pads, headband covering or mesh after normal use.",
          "Damage from drops, liquid or unauthorised repair.",
          "Cosmetic marks that do not affect function.",
        ],
      },
      {
        heading: "Serviceable by design",
        body: [
          "On PRO REFERENCE, the battery, ear pads and headband are user-replaceable with the two tools in the box. On every other model, pads and cables are replaceable without tools; the battery is a service part.",
          "Spare pads are priced at cost plus shipping. We would rather sell you a $29 pad than a $349 headphone.",
        ],
      },
      {
        heading: "Making a claim",
        body: [
          "Write to support@soniq.example with the serial number from the inside of the headband and a short description. In a real store, a replacement would be reserved while the claim is reviewed. In this demo, the form simply validates and stops.",
        ],
      },
    ],
  },
  {
    slug: "product-support",
    title: "Product Support",
    kicker: "Support",
    intro:
      "Setup, pairing, firmware and the small things that are hard to find in a manual. Written for the whole SONIQ family.",
    updated: "12 September 2026",
    sections: [
      {
        heading: "Pairing a second device",
        body: [
          "Hold the power button for three seconds until the LED pulses lime, then pair from the second device. Multipoint is enabled by default on ONE, PRO and AIR; ONE SE and AIR LITE hold a single connection at a time.",
        ],
      },
      {
        heading: "Getting a proper seal",
        body: [
          "Noise cancelling depends more on the seal than on the electronics. Rotate the cups so the pad sits behind the jaw, then let the headband settle. If the low end disappears, the seal is broken — not the driver.",
        ],
      },
      {
        heading: "Firmware",
        body: [
          "Firmware updates are delivered over USB-C or through the companion app. This demo has no firmware service, so the update control in the account area is shown as disabled rather than pretending to work.",
        ],
      },
      {
        heading: "Replacing pads",
        body: [
          "Pads mount on a bayonet ring. Twist a quarter turn anticlockwise, lift, then seat the new pad and twist clockwise until it clicks. No adhesive is used anywhere in the assembly.",
        ],
      },
    ],
  },
];

export const legalPages: ContentPage[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    kicker: "Legal",
    intro:
      "This is a demonstration storefront. It runs entirely in your browser, has no accounts backend, no payment processor and no analytics. This policy describes exactly what happens to data here — which is very little.",
    updated: "1 October 2026",
    sections: [
      {
        heading: "What this site stores",
        bullets: [
          "Your cart and chosen finishes, in your browser's localStorage.",
          "A demo account flag, only if you use the demo sign-in form.",
          "Your announcement-bar dismissal, for the current browser session.",
        ],
        body: [
          "None of this leaves your device. There is no server-side database in this demo, and no third-party analytics or advertising script is loaded.",
        ],
      },
      {
        heading: "Forms",
        body: [
          "The newsletter, contact and checkout forms validate input in the browser and then stop. They do not transmit anything. The success messages say so explicitly rather than implying an email was sent.",
        ],
      },
      {
        heading: "Cookies",
        body: [
          "No cookies are set. Carts persist through localStorage, which you can clear from your browser settings at any time.",
        ],
      },
      {
        heading: "If this were a real store",
        body: [
          "A production version would need a lawful basis for order processing, a payment processor with PCI obligations, a retention schedule and a data-subject request process. This page would then be replaced by a reviewed policy — not a template.",
        ],
      },
      {
        heading: "Contact",
        body: [
          "Questions about this demo can go to privacy@soniq.example. That address is illustrative and is not monitored.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Service",
    kicker: "Legal",
    intro:
      "These terms govern a fictional storefront built to demonstrate a shopping experience. Nothing here forms a contract, creates an order, or obliges anyone to ship anything.",
    updated: "1 October 2026",
    sections: [
      {
        heading: "The demo",
        body: [
          "SONIQ is a concept brand created for a design and engineering demonstration. Products, prices, specifications, reviews and availability are fictional and internally consistent by design.",
          "Checkout is a demonstration. No payment details are collected, no card is charged, and no order is created. The confirmation screen says this in plain language.",
        ],
      },
      {
        heading: "Acceptable use",
        bullets: [
          "Do not present this demo as a live store or take payment through it.",
          "Do not reuse the product copy as genuine marketing claims.",
          "Do not attempt to load this demo as a real checkout for customers.",
        ],
      },
      {
        heading: "Intellectual property",
        body: [
          "The SONIQ name, wordmark, product names and copy are fictional and created for this demonstration. Product imagery was generated for the same purpose.",
        ],
      },
      {
        heading: "Liability",
        body: [
          "The demo is provided as is. There is no warranty of availability, accuracy or fitness for a particular purpose, because there is no service behind it.",
        ],
      },
    ],
  },
];

export function getSupportPage(slug: string) {
  return supportPages.find((p) => p.slug === slug);
}

export function getLegalPage(slug: string) {
  return legalPages.find((p) => p.slug === slug);
}

export const generalFaqs = [
  {
    q: "Is SONIQ a real brand?",
    a: "No. SONIQ is a fictional audio brand built for a design and engineering demonstration. The products, specifications and prices are invented but internally consistent across the site. Nothing can be purchased.",
  },
  {
    q: "How is the demo store honest about what it cannot do?",
    a: "Checkout states that no payment is taken and no order is placed. Forms say when nothing was transmitted. Testimonials are labelled as sample notes rather than verified reviews. Where a feature has no backend — firmware updates, for instance — the control is shown as unavailable rather than faked.",
  },
  {
    q: "Do the headphones ship anywhere?",
    a: "No. There is no inventory, warehouse or carrier integration. The shipping thresholds and delivery windows exist to demonstrate how the storefront presents policy, not to promise a parcel.",
  },
  {
    q: "Can I return something?",
    a: "There is nothing to return. The 30-day return policy is sample policy copy, and the returns flow is described but not implemented, because implementing it would require an order system that does not exist.",
  },
  {
    q: "How do I choose between the models?",
    a: "ONE is the all-day default, ONE SE is the lighter and cheaper take on it, PRO is for studio work, PRO REFERENCE is the flatter and serviceable version, AIR and AIR LITE are for travel, and FLOW is the louder, warmer lifestyle model. The comparison table on the homepage lines up the headline numbers.",
  },
  {
    q: "Are the product photos real?",
    a: "They are renders generated for this concept, styled to a single lighting and finish system so the family reads consistently. They are not photographs of a shipping product.",
  },
  {
    q: "Why does the site ask for an email if nothing is sent?",
    a: "Because a newsletter form is part of a complete storefront. The form validates the address, stores a confirmation in your browser, and states that no email was sent and no mailing list exists.",
  },
  {
    q: "Is any data collected?",
    a: "Nothing leaves your browser. The cart and demo account state live in localStorage. There is no analytics script, no database and no server-side form handler.",
  },
];

export const careers = {
  intro:
    "SONIQ is a fictional studio, but the working principles below are real opinions. If the brand were hiring, these are the roles it would open first — they are shown here as sample listings, not live vacancies.",
  values: [
    {
      title: "Build the thing you would keep",
      body: "Serviceable parts, replaceable pads, a battery you can change. Every decision is measured against whether it adds years to the product rather than features to the page.",
    },
    {
      title: "Measure, then argue",
      body: "We trust the anechoic room and the listening panel in that order. A tuning decision without a measurement behind it is a preference, and preferences are labelled as such.",
    },
    {
      title: "Fewer, better surfaces",
      body: "One material should do one job. If a seam is decorative, it should be removed. The restraint is the design.",
    },
    {
      title: "Ship the honest version",
      body: "If a feature is not ready, it says so. A demo that admits its limits is more convincing than one that pretends.",
    },
  ],
  roles: [
    {
      title: "Senior Acoustic Engineer",
      location: "Copenhagen · Hybrid",
      type: "Full-time",
      body: "Own the tuning of a next-generation driver from simulation to production. You will need a decade of transducer work and a strong opinion about chamber geometry.",
    },
    {
      title: "Product Designer, Hardware",
      location: "Copenhagen · On-site",
      type: "Full-time",
      body: "Take a headphone from sketch to tooling. You work in CAD daily, prototype in the workshop weekly, and can defend a 0.4 mm wall thickness.",
    },
    {
      title: "Frontend Engineer, Storefront",
      location: "Remote · Europe",
      type: "Full-time",
      body: "Build the storefront this demo is imitating: accessible, fast, and unafraid of hand-written CSS. TypeScript and a good eye required.",
    },
    {
      title: "Support Lead",
      location: "Remote · Europe",
      type: "Full-time",
      body: "Write the replies you would want to receive. You will own the knowledge base, the returns policy and the tone of every customer conversation.",
    },
  ],
};
