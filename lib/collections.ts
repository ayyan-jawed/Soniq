import { products, type Product } from "./products";

export type Collection = {
  slug: string;
  name: string;
  shortName: string;
  kicker: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  accent: string;
};

export const collections: Collection[] = [
  {
    slug: "wireless",
    name: "Wireless Headphones",
    shortName: "Wireless",
    kicker: "Collection 01",
    tagline: "Cut the cable. Keep the detail.",
    description:
      "Five wireless models spanning the everyday ONE to the studio-grade PRO. Every one of them keeps a wired input for the day the battery does not.",
    image: "/images/life-commute.jpg",
    imageAlt: "Listener wearing SONIQ headphones on a night station platform",
    accent: "#D7FF3F",
  },
  {
    slug: "studio",
    name: "Studio Collection",
    shortName: "Studio",
    kicker: "Collection 02",
    tagline: "Built for the tenth hour, not the first.",
    description:
      "Flatter curves, heavier hardware, serviceable parts. Two models for people who listen for a living and would rather repair than replace.",
    image: "/images/life-studio.jpg",
    imageAlt: "Producer working at a mixing console wearing SONIQ studio headphones",
    accent: "#B9BEC2",
  },
  {
    slug: "travel",
    name: "Travel Collection",
    shortName: "Travel",
    kicker: "Collection 03",
    tagline: "Quiet, folded, under 250 grams.",
    description:
      "Two compact models tuned for engines and ventilation rather than offices. Both fold into a shape that fits a laptop sleeve.",
    image: "/images/p-air.jpg",
    imageAlt: "SONIQ AIR lightweight travel headphones in warm ivory",
    accent: "#E7DFCC",
  },
  {
    slug: "new",
    name: "New Arrivals",
    shortName: "New",
    kicker: "Collection 04",
    tagline: "The most recent four.",
    description:
      "Everything released in the last twelve months, newest first — including the limited FLOW SIGNAL run of 1,200 pairs.",
    image: "/images/p-one-lime.jpg",
    imageAlt: "SONIQ ONE headphones in Signal Lime",
    accent: "#D7FF3F",
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getCollectionProducts(slug: string): Product[] {
  if (slug === "new") {
    return [...products]
      .sort((a, b) => (a.releasedAt < b.releasedAt ? 1 : -1))
      .slice(0, 4);
  }
  return products.filter((p) => p.collections.includes(slug));
}

export const navCollections = collections;
