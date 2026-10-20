export type Category = "wireless" | "studio" | "travel" | "lifestyle";

export type FeatureKey =
  | "anc"
  | "spatial"
  | "hires"
  | "multipoint"
  | "foldable"
  | "wired"
  | "lowlatency"
  | "eq";

export type Colorway = {
  name: string;
  hex: string;
  image?: string;
};

export type Product = {
  slug: string;
  name: string;
  family: string;
  tagline: string;
  shortDescription: string;
  description: string[];
  price: number;
  compareAt?: number;
  category: Category;
  categoryLabel: string;
  collections: string[];
  colorways: Colorway[];
  image: string;
  detailImages: string[];
  badge?: string;
  releasedAt: string;
  battery: number;
  weight: number;
  ancDepth: number;
  connectivity: string;
  driver: string;
  codecs: string;
  charging: string;
  bestFor: string;
  features: FeatureKey[];
  highlights: { label: string; value: string }[];
  specs: { label: string; value: string }[];
  inBox: string[];
  notes: { quote: string; author: string; context: string }[];
  faqs: { q: string; a: string }[];
};

export const FEATURE_LABELS: Record<FeatureKey, string> = {
  anc: "Adaptive ANC",
  spatial: "Spatial audio",
  hires: "Hi-Res certified",
  multipoint: "Multipoint",
  foldable: "Folds flat",
  wired: "Wired option",
  lowlatency: "Low-latency mode",
  eq: "Custom EQ",
};

export const CATEGORY_LABELS: Record<Category, string> = {
  wireless: "Wireless",
  studio: "Studio",
  travel: "Travel",
  lifestyle: "Lifestyle",
};

const sharedFaqs = [
  {
    q: "How long does the battery actually last?",
    a: "Quoted figures are measured with adaptive noise cancelling on, at 60% volume, using AAC over Bluetooth. Expect roughly 10–15% less in very cold conditions or at high volume. Every figure on this site is demo data for the concept store.",
  },
  {
    q: "Can I use them wired?",
    a: "Yes where a 3.5 mm or USB-C audio input is listed in the specifications. Wired playback works with the headphones powered off, so a flat battery never ends a session.",
  },
  {
    q: "What is covered by the warranty?",
    a: "The demo warranty covers manufacturing defects for two years from dispatch, including drivers, hinges and battery health below 80%. Wear on ear pads and accidental damage are not covered.",
  },
];

export const products: Product[] = [
  {
    slug: "soniq-one",
    name: "SONIQ ONE",
    family: "ONE",
    tagline: "The everyday reference.",
    shortDescription:
      "A 268-gram over-ear that disappears on your head and refuses to compromise on detail.",
    description: [
      "ONE is the model we build everything else around: a single machined aluminium yoke, a 40 mm beryllium-coated driver and a sealed acoustic chamber tuned in our anechoic room rather than in a spreadsheet.",
      "Adaptive noise cancelling reads the room 48,000 times a second, so the cancellation follows the train, the cafe, the open-plan office. When you take them off, playback pauses before the cups touch your collarbone.",
      "Forty-two hours of playback with ANC on. Ten minutes on USB-C gives you six more. The rest is detail: a headband that distributes weight across the crown instead of the temples, and pads that stay cool through a full working day.",
    ],
    price: 349,
    compareAt: 399,
    category: "wireless",
    categoryLabel: "Wireless over-ear",
    collections: ["wireless", "new"],
    colorways: [
      { name: "Obsidian", hex: "#15181A", image: "/images/p-one.jpg" },
      { name: "Warm Ivory", hex: "#E7DFCC", image: "/images/p-one-se.jpg" },
      { name: "Signal Lime", hex: "#D7FF3F", image: "/images/p-one-lime.jpg" },
    ],
    image: "/images/p-one.jpg",
    detailImages: ["/images/detail-cup.jpg", "/images/detail-headband.jpg"],
    badge: "Best seller",
    releasedAt: "2026-03-12",
    battery: 42,
    weight: 268,
    ancDepth: 42,
    connectivity: "Bluetooth 5.4 · USB-C · 3.5 mm",
    driver: "40 mm beryllium-coated",
    codecs: "SBC · AAC · LDAC · LC3",
    charging: "USB-C, 10 min = 6 h",
    bestFor: "All-day listening",
    features: ["anc", "spatial", "hires", "multipoint", "wired", "eq"],
    highlights: [
      { label: "Playback", value: "42 h ANC on" },
      { label: "Weight", value: "268 g" },
      { label: "Cancelling", value: "−42 dB adaptive" },
      { label: "Spatial", value: "Head-tracked" },
    ],
    specs: [
      { label: "Driver", value: "40 mm beryllium-coated dynamic" },
      { label: "Frequency response", value: "5 Hz – 40 kHz" },
      { label: "Impedance", value: "32 Ω" },
      { label: "Noise cancelling", value: "Adaptive hybrid, up to −42 dB" },
      { label: "Microphones", value: "8 (6 ANC, 2 beamforming voice)" },
      { label: "Battery", value: "42 h ANC on · 60 h ANC off" },
      { label: "Fast charge", value: "10 minutes = 6 hours" },
      { label: "Connectivity", value: "Bluetooth 5.4, multipoint (2 devices)" },
      { label: "Codecs", value: "SBC, AAC, LDAC, LC3" },
      { label: "Wired", value: "USB-C audio, 3.5 mm analogue" },
      { label: "Weight", value: "268 g" },
      { label: "Materials", value: "Machined aluminium, memory foam, vegan leather" },
    ],
    inBox: [
      "SONIQ ONE headphones",
      "Recycled-fibre travel case",
      "USB-C to USB-C cable (1.2 m)",
      "3.5 mm analogue cable",
      "Airline adapter",
    ],
    notes: [
      {
        quote:
          "The midrange is honest. I heard the room on a record I have listened to for nine years — and then I heard the chair.",
        author: "Mara V.",
        context: "Mixing engineer, Lisbon · sample note",
      },
      {
        quote:
          "I wear them nine hours a day and forget they are there. The clamp is the whole story.",
        author: "Devin K.",
        context: "Product designer, Seoul · sample note",
      },
      {
        quote:
          "ANC that does not make the city feel like a vacuum. You still know where you are.",
        author: "Ana R.",
        context: "Student, Mexico City · sample note",
      },
    ],
    faqs: sharedFaqs,
  },
  {
    slug: "soniq-one-se",
    name: "SONIQ ONE SE",
    family: "ONE SE",
    tagline: "Everything essential, nothing extra.",
    shortDescription:
      "The ONE architecture in a lighter build. Same tuning philosophy, friendlier footprint.",
    description: [
      "ONE SE keeps the driver geometry and tuning curve of the ONE, then removes what most listeners never use: the head-tracking sensor, the aluminium outer plate, the second codec stack.",
      "What stays is the part that matters — a sealed chamber, a 40 mm bio-cellulose driver and a noise-cancelling system tuned for voices rather than engine noise, which makes it a better commuter and a better study companion.",
      "Thirty-six hours of playback, 248 grams, and a hinge that has been through 20,000 demo cycles on our test rig.",
    ],
    price: 279,
    category: "wireless",
    categoryLabel: "Wireless over-ear",
    collections: ["wireless"],
    colorways: [{ name: "Warm Ivory", hex: "#E7DFCC", image: "/images/p-one-se.jpg" }],
    image: "/images/p-one-se.jpg",
    detailImages: ["/images/detail-headband.jpg", "/images/detail-cup.jpg"],
    badge: "New",
    releasedAt: "2026-08-29",
    battery: 36,
    weight: 248,
    ancDepth: 36,
    connectivity: "Bluetooth 5.3 · USB-C · 3.5 mm",
    driver: "40 mm bio-cellulose",
    codecs: "SBC · AAC · LC3",
    charging: "USB-C, 15 min = 5 h",
    bestFor: "Commute & study",
    features: ["anc", "multipoint", "wired", "foldable", "eq"],
    highlights: [
      { label: "Playback", value: "36 h ANC on" },
      { label: "Weight", value: "248 g" },
      { label: "Cancelling", value: "−36 dB adaptive" },
      { label: "Built", value: "Recycled polymer" },
    ],
    specs: [
      { label: "Driver", value: "40 mm bio-cellulose dynamic" },
      { label: "Frequency response", value: "8 Hz – 40 kHz" },
      { label: "Impedance", value: "32 Ω" },
      { label: "Noise cancelling", value: "Adaptive hybrid, up to −36 dB" },
      { label: "Microphones", value: "6 (4 ANC, 2 voice)" },
      { label: "Battery", value: "36 h ANC on · 52 h ANC off" },
      { label: "Fast charge", value: "15 minutes = 5 hours" },
      { label: "Connectivity", value: "Bluetooth 5.3, multipoint (2 devices)" },
      { label: "Codecs", value: "SBC, AAC, LC3" },
      { label: "Wired", value: "USB-C audio, 3.5 mm analogue" },
      { label: "Weight", value: "248 g" },
      { label: "Materials", value: "Recycled polymer, aluminium yoke, vegan leather" },
    ],
    inBox: ["SONIQ ONE SE headphones", "Soft pouch", "USB-C cable (1 m)", "3.5 mm cable"],
    notes: [
      {
        quote: "It cancels the bus, not the announcement. That is exactly what I wanted.",
        author: "Theo B.",
        context: "Student, Manchester · sample note",
      },
      {
        quote: "Feels like a more expensive object than it is. The hinge is the giveaway — in a good way.",
        author: "Priya N.",
        context: "Industrial designer, Toronto · sample note",
      },
    ],
    faqs: sharedFaqs,
  },
  {
    slug: "soniq-pro",
    name: "SONIQ PRO",
    family: "PRO",
    tagline: "Studio truth, untethered.",
    shortDescription:
      "A 45 mm studio driver with a flat-leaning curve and a headband built for ten-hour sessions.",
    description: [
      "PRO started as a wired monitor and ended as a wireless one. The 45 mm beryllium driver sits in a machined housing with a woven steel grille, deliberately open enough to keep transients quick and closed enough to work in a shared room.",
      "The tuning is neutral with a gentle 2 dB lift above 8 kHz — a compromise we made after ninety hours of listening tests, because a truly flat curve is exhausting over a full day.",
      "Connect over Bluetooth 5.4, USB-C for 24-bit/96 kHz, or analogue with the included cable. Latency in wired mode is below 4 ms, so it doubles as a tracking headphone.",
    ],
    price: 499,
    category: "studio",
    categoryLabel: "Studio reference",
    collections: ["studio", "wireless"],
    colorways: [
      { name: "Graphite", hex: "#2E3134", image: "/images/p-pro.jpg" },
      { name: "Machined Silver", hex: "#B9BEC2", image: "/images/p-pro-reference.jpg" },
    ],
    image: "/images/p-pro.jpg",
    detailImages: ["/images/detail-cup.jpg", "/images/detail-headband.jpg"],
    releasedAt: "2025-11-18",
    battery: 50,
    weight: 318,
    ancDepth: 38,
    connectivity: "Bluetooth 5.4 · USB-C · 3.5 mm · 6.35 mm",
    driver: "45 mm beryllium",
    codecs: "SBC · AAC · LDAC · aptX Lossless",
    charging: "USB-C, 20 min = 8 h",
    bestFor: "Studio & production",
    features: ["anc", "hires", "multipoint", "wired", "lowlatency", "eq"],
    highlights: [
      { label: "Playback", value: "50 h ANC on" },
      { label: "Weight", value: "318 g" },
      { label: "Latency", value: "< 4 ms wired" },
      { label: "Resolution", value: "24-bit / 96 kHz" },
    ],
    specs: [
      { label: "Driver", value: "45 mm beryllium dynamic" },
      { label: "Frequency response", value: "4 Hz – 48 kHz" },
      { label: "Impedance", value: "38 Ω" },
      { label: "Noise cancelling", value: "Adaptive hybrid, up to −38 dB" },
      { label: "Microphones", value: "8 (6 ANC, 2 voice)" },
      { label: "Battery", value: "50 h ANC on · 70 h ANC off" },
      { label: "Fast charge", value: "20 minutes = 8 hours" },
      { label: "Connectivity", value: "Bluetooth 5.4, multipoint (2 devices)" },
      { label: "Codecs", value: "SBC, AAC, LDAC, aptX Lossless" },
      { label: "Wired", value: "USB-C 24/96, 3.5 mm, 6.35 mm adapter" },
      { label: "Weight", value: "318 g" },
      { label: "Materials", value: "Machined aluminium, woven steel, lambskin pads" },
    ],
    inBox: [
      "SONIQ PRO headphones",
      "Hard shell case",
      "USB-C cable (1.5 m)",
      "Coiled 3.5 mm cable",
      "6.35 mm adapter",
    ],
    notes: [
      {
        quote: "Transient detail without the fake air. I trusted the low end within a minute.",
        author: "Jonas H.",
        context: "Mastering engineer, Berlin · sample note",
      },
      {
        quote: "Heavy in the hand, light on the head. That is not easy to do.",
        author: "Elena S.",
        context: "Film composer, Barcelona · sample note",
      },
      {
        quote: "I use them for tracking because the latency claim held up.",
        author: "Rui M.",
        context: "Producer, São Paulo · sample note",
      },
    ],
    faqs: sharedFaqs,
  },
  {
    slug: "soniq-pro-reference",
    name: "SONIQ PRO REFERENCE",
    family: "PRO REFERENCE",
    tagline: "Flat. Honest. Yours for a decade.",
    shortDescription:
      "A reference-tuned PRO with a machined silver housing, hand-matched drivers and a serviceable battery.",
    description: [
      "Every PRO REFERENCE is assembled in matched pairs: two drivers measured within 0.4 dB of each other across the vocal band, then written into the serial record that ships with the headphones.",
      "The curve is flatter than PRO by design, with no high-shelf lift. If you mix on these, your work will translate; if you listen on these, you will hear decisions rather than polish.",
      "The battery, pads and headband are all user-replaceable with two tools, both included. We would rather you kept them than replaced them.",
    ],
    price: 579,
    category: "studio",
    categoryLabel: "Reference monitor",
    collections: ["studio"],
    colorways: [{ name: "Machined Silver", hex: "#B9BEC2", image: "/images/p-pro-reference.jpg" }],
    image: "/images/p-pro-reference.jpg",
    detailImages: ["/images/detail-headband.jpg", "/images/detail-cup.jpg"],
    badge: "Made to order",
    releasedAt: "2026-01-22",
    battery: 45,
    weight: 342,
    ancDepth: 40,
    connectivity: "Bluetooth 5.4 · USB-C · 3.5 mm · 6.35 mm",
    driver: "45 mm matched beryllium",
    codecs: "SBC · AAC · LDAC · aptX Lossless",
    charging: "USB-C, 20 min = 7 h",
    bestFor: "Reference mixing",
    features: ["anc", "hires", "wired", "lowlatency", "foldable", "eq"],
    highlights: [
      { label: "Playback", value: "45 h ANC on" },
      { label: "Weight", value: "342 g" },
      { label: "Matching", value: "±0.4 dB per pair" },
      { label: "Serviceable", value: "Battery & pads" },
    ],
    specs: [
      { label: "Driver", value: "45 mm matched beryllium dynamic" },
      { label: "Frequency response", value: "4 Hz – 48 kHz" },
      { label: "Impedance", value: "42 Ω" },
      { label: "Noise cancelling", value: "Adaptive hybrid, up to −40 dB" },
      { label: "Microphones", value: "8 (6 ANC, 2 voice)" },
      { label: "Battery", value: "45 h ANC on · 65 h ANC off" },
      { label: "Fast charge", value: "20 minutes = 7 hours" },
      { label: "Connectivity", value: "Bluetooth 5.4, multipoint (2 devices)" },
      { label: "Codecs", value: "SBC, AAC, LDAC, aptX Lossless" },
      { label: "Wired", value: "USB-C 24/96, 3.5 mm, 6.35 mm adapter" },
      { label: "Weight", value: "342 g" },
      { label: "Materials", value: "Machined aluminium, lambskin, replaceable modules" },
    ],
    inBox: [
      "SONIQ PRO REFERENCE headphones",
      "Serial measurement card",
      "Hard shell case",
      "USB-C cable (1.5 m)",
      "Coiled 3.5 mm cable",
      "Service tool set",
    ],
    notes: [
      {
        quote: "The pair arrived with a measurement card. I checked it. It was accurate.",
        author: "Sofia L.",
        context: "Acoustic engineer, Copenhagen · sample note",
      },
      {
        quote: "No excitement, no fatigue. Six hours in, I was still working.",
        author: "Malik D.",
        context: "Mixer, Los Angeles · sample note",
      },
    ],
    faqs: sharedFaqs,
  },
  {
    slug: "soniq-air",
    name: "SONIQ AIR",
    family: "AIR",
    tagline: "218 grams of quiet.",
    shortDescription:
      "A travel headphone that folds into its own case and cancels the cabin, not the city.",
    description: [
      "AIR is built around a titanium headband and a 38 mm driver, which is how it lands at 218 grams without feeling provisional. The clamp force is low enough to wear over a beanie and stable enough to walk through a station.",
      "The noise-cancelling profile is tuned for low-frequency rumble — engines, ventilation, the underground — with a transparency mode that keeps announcements intelligible.",
      "Folds flat into a case the size of a paperback. Thirty hours of playback, and a five-minute charge covers a short flight.",
    ],
    price: 299,
    category: "travel",
    categoryLabel: "Travel over-ear",
    collections: ["travel", "wireless", "new"],
    colorways: [{ name: "Warm Ivory", hex: "#E7DFCC", image: "/images/p-air.jpg" }],
    image: "/images/p-air.jpg",
    detailImages: ["/images/detail-headband.jpg", "/images/detail-cup.jpg"],
    releasedAt: "2026-09-08",
    battery: 30,
    weight: 218,
    ancDepth: 40,
    connectivity: "Bluetooth 5.4 · USB-C · 3.5 mm",
    driver: "38 mm titanium-coated",
    codecs: "SBC · AAC · LDAC",
    charging: "USB-C, 5 min = 4 h",
    bestFor: "Flights & trains",
    features: ["anc", "multipoint", "foldable", "wired", "hires"],
    highlights: [
      { label: "Playback", value: "30 h ANC on" },
      { label: "Weight", value: "218 g" },
      { label: "Folded", value: "172 × 148 mm" },
      { label: "Cancelling", value: "−40 dB adaptive" },
    ],
    specs: [
      { label: "Driver", value: "38 mm titanium-coated dynamic" },
      { label: "Frequency response", value: "10 Hz – 40 kHz" },
      { label: "Impedance", value: "28 Ω" },
      { label: "Noise cancelling", value: "Adaptive hybrid, up to −40 dB" },
      { label: "Microphones", value: "6 (4 ANC, 2 voice)" },
      { label: "Battery", value: "30 h ANC on · 45 h ANC off" },
      { label: "Fast charge", value: "5 minutes = 4 hours" },
      { label: "Connectivity", value: "Bluetooth 5.4, multipoint (2 devices)" },
      { label: "Codecs", value: "SBC, AAC, LDAC" },
      { label: "Wired", value: "USB-C audio, 3.5 mm analogue" },
      { label: "Weight", value: "218 g" },
      { label: "Materials", value: "Titanium headband, recycled polymer cups" },
    ],
    inBox: ["SONIQ AIR headphones", "Fold-flat case", "USB-C cable (0.8 m)", "Airline adapter"],
    notes: [
      {
        quote: "Twelve hours of flying and no hotspot behind my ears. That is the whole review.",
        author: "Yuki T.",
        context: "Photographer, Osaka · sample note",
      },
      {
        quote: "The case fits in a laptop sleeve. I stopped carrying a second bag.",
        author: "Noah F.",
        context: "Consultant, Amsterdam · sample note",
      },
    ],
    faqs: sharedFaqs,
  },
  {
    slug: "soniq-air-lite",
    name: "SONIQ AIR LITE",
    family: "AIR LITE",
    tagline: "Pack light. Hear everything.",
    shortDescription:
      "196 grams, 26 hours, and a hinge that folds into a jacket pocket.",
    description: [
      "AIR LITE is the smallest thing we make that still counts as an over-ear. The cups rotate ninety degrees and the headband folds through them, so it packs into a shape closer to a paperback than a case.",
      "We kept the low-frequency cancellation that makes travel bearable and removed the head-tracking and the codec stack. What remains is a light, quiet, slightly warm headphone that is easy to live with.",
      "Two hundred and twenty-nine dollars is not an accident: this is the model we want a first pair of good headphones to be.",
    ],
    price: 229,
    category: "travel",
    categoryLabel: "Compact travel",
    collections: ["travel"],
    colorways: [{ name: "Obsidian / Lime", hex: "#1B2418", image: "/images/p-air-lite.jpg" }],
    image: "/images/p-air-lite.jpg",
    detailImages: ["/images/detail-cup.jpg", "/images/detail-headband.jpg"],
    badge: "Entry",
    releasedAt: "2026-05-02",
    battery: 26,
    weight: 196,
    ancDepth: 32,
    connectivity: "Bluetooth 5.3 · USB-C · 3.5 mm",
    driver: "36 mm bio-cellulose",
    codecs: "SBC · AAC",
    charging: "USB-C, 10 min = 3 h",
    bestFor: "Everyday carry",
    features: ["anc", "foldable", "wired", "lowlatency"],
    highlights: [
      { label: "Playback", value: "26 h ANC on" },
      { label: "Weight", value: "196 g" },
      { label: "Folded", value: "148 × 132 mm" },
      { label: "Cancelling", value: "−32 dB adaptive" },
    ],
    specs: [
      { label: "Driver", value: "36 mm bio-cellulose dynamic" },
      { label: "Frequency response", value: "12 Hz – 40 kHz" },
      { label: "Impedance", value: "32 Ω" },
      { label: "Noise cancelling", value: "Adaptive hybrid, up to −32 dB" },
      { label: "Microphones", value: "4 (2 ANC, 2 voice)" },
      { label: "Battery", value: "26 h ANC on · 38 h ANC off" },
      { label: "Fast charge", value: "10 minutes = 3 hours" },
      { label: "Connectivity", value: "Bluetooth 5.3, single device" },
      { label: "Codecs", value: "SBC, AAC" },
      { label: "Wired", value: "USB-C audio, 3.5 mm analogue" },
      { label: "Weight", value: "196 g" },
      { label: "Materials", value: "Recycled polymer, steel sliders, vegan leather" },
    ],
    inBox: ["SONIQ AIR LITE headphones", "Fold-flat pouch", "USB-C cable (0.6 m)"],
    notes: [
      {
        quote: "For the price I expected plastic creak. I got a hinge that feels machined.",
        author: "Leo C.",
        context: "Cyclist, Melbourne · sample note",
      },
      {
        quote: "Not the quietest, but light enough to forget in a bag.",
        author: "Ines P.",
        context: "Journalist, Paris · sample note",
      },
    ],
    faqs: sharedFaqs,
  },
  {
    slug: "soniq-flow",
    name: "SONIQ FLOW",
    family: "FLOW",
    tagline: "Wear the signal.",
    shortDescription:
      "A louder silhouette with a warm-leaning curve, five-band EQ and a lime finish that is not asking permission.",
    description: [
      "FLOW is the extrovert of the family. The outer cup is a single anodised panel with a chamfered edge that catches light as you move, and the curve carries a deliberate lift in the low-mid so bass-heavy records feel physical without swallowing vocals.",
      "A five-band EQ lives in the companion app, with three tunings from our studio — Flat, Warm, Club — and a latency mode for gaming at 68 ms.",
      "It is not the most neutral headphone we make. It is the one people ask about on the train.",
    ],
    price: 319,
    compareAt: 359,
    category: "lifestyle",
    categoryLabel: "Lifestyle over-ear",
    collections: ["wireless", "new"],
    colorways: [
      { name: "Signal Lime", hex: "#D7FF3F", image: "/images/p-flow.jpg" },
      { name: "Ivory / Lime", hex: "#E7DFCC", image: "/images/p-flow-signal.jpg" },
    ],
    image: "/images/p-flow.jpg",
    detailImages: ["/images/detail-cup.jpg", "/images/detail-headband.jpg"],
    badge: "Sale",
    releasedAt: "2026-07-19",
    battery: 40,
    weight: 255,
    ancDepth: 35,
    connectivity: "Bluetooth 5.4 · USB-C · 3.5 mm",
    driver: "40 mm bio-cellulose",
    codecs: "SBC · AAC · LDAC",
    charging: "USB-C, 10 min = 5 h",
    bestFor: "Music & gaming",
    features: ["anc", "spatial", "multipoint", "lowlatency", "eq", "wired"],
    highlights: [
      { label: "Playback", value: "40 h ANC on" },
      { label: "Weight", value: "255 g" },
      { label: "Latency", value: "68 ms game mode" },
      { label: "EQ", value: "5-band, 3 presets" },
    ],
    specs: [
      { label: "Driver", value: "40 mm bio-cellulose dynamic" },
      { label: "Frequency response", value: "6 Hz – 40 kHz" },
      { label: "Impedance", value: "32 Ω" },
      { label: "Noise cancelling", value: "Adaptive hybrid, up to −35 dB" },
      { label: "Microphones", value: "6 (4 ANC, 2 voice)" },
      { label: "Battery", value: "40 h ANC on · 55 h ANC off" },
      { label: "Fast charge", value: "10 minutes = 5 hours" },
      { label: "Connectivity", value: "Bluetooth 5.4, multipoint (2 devices)" },
      { label: "Codecs", value: "SBC, AAC, LDAC" },
      { label: "Wired", value: "USB-C audio, 3.5 mm analogue" },
      { label: "Weight", value: "255 g" },
      { label: "Materials", value: "Anodised aluminium panel, vegan leather" },
    ],
    inBox: ["SONIQ FLOW headphones", "Soft case", "USB-C cable (1.2 m)", "3.5 mm cable"],
    notes: [
      {
        quote: "They sound like the colour they are. Loud, warm, a little rude.",
        author: "Kai J.",
        context: "DJ, Rotterdam · sample note",
      },
      {
        quote: "Game mode is genuinely usable. I stopped noticing the delay.",
        author: "Sam W.",
        context: "Streamer, Austin · sample note",
      },
    ],
    faqs: sharedFaqs,
  },
  {
    slug: "soniq-flow-signal",
    name: "SONIQ FLOW SIGNAL",
    family: "FLOW SIGNAL",
    tagline: "Limited finish. Same signal.",
    shortDescription:
      "The FLOW tuning in a warm ivory shell with a single lime band, built in one run of 1,200.",
    description: [
      "SIGNAL takes FLOW's driver and curve, then changes the shell to warm ivory with an anodised lime band running across the outer cup. The headband is black leather, the hardware is gunmetal, and the run is fixed at 1,200 pairs.",
      "The tuning is identical to FLOW, including the Club preset, which is the one most people leave on.",
      "When the run sells through, it does not come back. Demo notices apply — this store does not process real orders.",
    ],
    price: 339,
    category: "lifestyle",
    categoryLabel: "Limited edition",
    collections: ["wireless"],
    colorways: [{ name: "Ivory / Signal", hex: "#E7DFCC", image: "/images/p-flow-signal.jpg" }],
    image: "/images/p-flow-signal.jpg",
    detailImages: ["/images/detail-headband.jpg", "/images/detail-cup.jpg"],
    badge: "Limited",
    releasedAt: "2026-10-01",
    battery: 40,
    weight: 258,
    ancDepth: 35,
    connectivity: "Bluetooth 5.4 · USB-C · 3.5 mm",
    driver: "40 mm bio-cellulose",
    codecs: "SBC · AAC · LDAC",
    charging: "USB-C, 10 min = 5 h",
    bestFor: "Collectors",
    features: ["anc", "spatial", "multipoint", "lowlatency", "eq", "wired"],
    highlights: [
      { label: "Playback", value: "40 h ANC on" },
      { label: "Weight", value: "258 g" },
      { label: "Run size", value: "1,200 pairs" },
      { label: "Finish", value: "Anodised lime band" },
    ],
    specs: [
      { label: "Driver", value: "40 mm bio-cellulose dynamic" },
      { label: "Frequency response", value: "6 Hz – 40 kHz" },
      { label: "Impedance", value: "32 Ω" },
      { label: "Noise cancelling", value: "Adaptive hybrid, up to −35 dB" },
      { label: "Microphones", value: "6 (4 ANC, 2 voice)" },
      { label: "Battery", value: "40 h ANC on · 55 h ANC off" },
      { label: "Fast charge", value: "10 minutes = 5 hours" },
      { label: "Connectivity", value: "Bluetooth 5.4, multipoint (2 devices)" },
      { label: "Codecs", value: "SBC, AAC, LDAC" },
      { label: "Wired", value: "USB-C audio, 3.5 mm analogue" },
      { label: "Weight", value: "258 g" },
      { label: "Materials", value: "Anodised aluminium, ivory coating, leather" },
    ],
    inBox: ["SONIQ FLOW SIGNAL headphones", "Numbered soft case", "USB-C cable (1.2 m)"],
    notes: [
      {
        quote: "Bought it for the finish, kept it for the tuning.",
        author: "Rosa A.",
        context: "Graphic designer, Milan · sample note",
      },
    ],
    faqs: sharedFaqs,
  },
];

export const featuredProducts = ["soniq-one", "soniq-pro", "soniq-air", "soniq-flow"];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProducts(slugs: string[]): Product[] {
  return slugs
    .map((slug) => getProduct(slug))
    .filter((p): p is Product => Boolean(p));
}

export function getRelatedProducts(product: Product, count = 3): Product[] {
  const sameCategory = products.filter(
    (p) => p.slug !== product.slug && p.category === product.category,
  );
  const others = products.filter(
    (p) => p.slug !== product.slug && p.category !== product.category,
  );
  return [...sameCategory, ...others].slice(0, count);
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export const SHIPPING_THRESHOLD = 150;

export function getGallery(product: Product): { src: string; alt: string }[] {
  const colorShots = product.colorways
    .filter((c) => c.image)
    .map((c) => ({
      src: c.image as string,
      alt: `${product.name} over-ear headphones in ${c.name}`,
    }));

  const merged = [...colorShots];
  for (const src of product.detailImages) {
    if (!merged.some((m) => m.src === src)) {
      merged.push({
        src,
        alt:
          src.includes("cup")
            ? `${product.name} ear cup detail`
            : `${product.name} headband detail`,
      });
    }
  }
  if (!merged.length) merged.push({ src: product.image, alt: product.name });
  return merged;
}
