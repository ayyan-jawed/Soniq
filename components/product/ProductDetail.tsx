"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-context";
import { QuantityStepper } from "@/components/cart/QuantityStepper";
import { Accordion } from "@/components/ui/Accordion";
import {
  ArrowRight,
  BagIcon,
  RefreshIcon,
  ShieldIcon,
  TruckIcon,
} from "@/components/ui/icons";
import { formatPrice, getGallery, SHIPPING_THRESHOLD, type Product } from "@/lib/products";

export function ProductDetail({ product }: { product: Product }) {
  const images = getGallery(product);
  const [activeImage, setActiveImage] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  const color = product.colorways[colorIndex];
  const current = images[activeImage] ?? images[0];

  function chooseColor(index: number) {
    setColorIndex(index);
    const target = product.colorways[index].image;
    const found = images.findIndex((image) => image.src === target);
    if (found >= 0) setActiveImage(found);
  }

  return (
    <div className="pdp">
      <div className="pdp__gallery">
        <div className="gallery">
          <div className="gallery__main">
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              width={1400}
              height={1050}
              sizes="(max-width: 900px) 100vw, 56vw"
              priority
              className="pdp__gallery-image"
            />
            <span className="gallery__index">
              {String(activeImage + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
          </div>
          <div className="gallery__thumbs" role="group" aria-label="Product images">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                className="gallery__thumb"
                aria-current={index === activeImage}
                aria-label={`Show image ${index + 1} of ${images.length}`}
                onClick={() => setActiveImage(index)}
              >
                <Image src={image.src} alt="" width={280} height={210} sizes="120px" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pdp__info">
        <div className="pdp__heading">
          <div className="pdp__kicker">
            <span className="mono">{product.categoryLabel}</span>
            {product.badge && <span className="badge badge--outline">{product.badge}</span>}
          </div>
          <h1 className="pdp__title">{product.name}</h1>
          <p className="pdp__tagline serif">{product.tagline}</p>
          <div className="pdp__price">
            <span>{formatPrice(product.price)}</span>
            {product.compareAt && <s>{formatPrice(product.compareAt)}</s>}
            {product.compareAt && (
              <span className="pdp__save">
                Save {formatPrice(product.compareAt - product.price)}
              </span>
            )}
          </div>
        </div>

        <p className="pdp__desc">{product.shortDescription}</p>

        <div className="pdp__colors">
          <div className="pdp__colors-head">
            <span className="mono">Finish</span>
            <span className="pdp__color-name">{color.name}</span>
            <span className="mono pdp__color-count">
              {colorIndex + 1} / {product.colorways.length}
            </span>
          </div>
          <div className="swatches" role="group" aria-label="Choose a finish">
            {product.colorways.map((c, index) => (
              <button
                key={c.name}
                type="button"
                className="swatch"
                aria-pressed={index === colorIndex}
                aria-label={c.name}
                title={c.name}
                onClick={() => chooseColor(index)}
              >
                <span className="swatch__inner" style={{ background: c.hex }} />
              </button>
            ))}
          </div>
          <p className="pdp__color-note mono">
            Photographed in {color.name}. Every finish uses the same driver and chamber.
          </p>
        </div>

        <div className="pdp__buy">
          <QuantityStepper value={qty} onChange={setQty} label={`${product.name} quantity`} />
          <button
            type="button"
            className="btn btn--lime pdp__add"
            onClick={() => add(product.slug, color.name, qty)}
          >
            <BagIcon width={16} height={16} />
            Add to bag — {formatPrice(product.price * qty)}
          </button>
        </div>

        <ul className="pdp__assurances">
          <li>
            <TruckIcon /> Free express shipping over ${SHIPPING_THRESHOLD}. Ships in 1–2 days.
          </li>
          <li>
            <RefreshIcon /> 30-day returns, even if you have opened the box.
          </li>
          <li>
            <ShieldIcon /> 2-year warranty including battery health.
          </li>
        </ul>

        <div className="pdp__accordions">
          <Accordion
            defaultOpen={0}
            items={[
              {
                title: "Technical specifications",
                content: (
                  <dl className="spec-list">
                    {product.specs.map((spec) => (
                      <div key={spec.label}>
                        <dt>{spec.label}</dt>
                        <dd>{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                ),
              },
              {
                title: "What's in the box",
                content: (
                  <ul className="simple-list">
                    {product.inBox.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ),
              },
              {
                title: "Delivery & returns",
                content: (
                  <div className="pdp__prose">
                    <p>
                      Orders placed before 14:00 are prepared the same working day. Standard
                      delivery is 3–5 working days and free above ${SHIPPING_THRESHOLD}; express is
                      1–2 working days at $19.
                    </p>
                    <p>
                      Returns are accepted for 30 days. This is a demo storefront: no order is
                      placed and nothing ships.
                    </p>
                    <Link href="/support/shipping-returns" className="link-arrow">
                      Full policy <ArrowRight />
                    </Link>
                  </div>
                ),
              },
              {
                title: "Care & repair",
                content: (
                  <div className="pdp__prose">
                    <p>
                      Pads mount on a bayonet ring and come off with a quarter turn. No adhesive is
                      used anywhere in the assembly. The battery is a service part on every model;
                      on PRO REFERENCE it is user-replaceable with the included tools.
                    </p>
                    <Link href="/support/product-support" className="link-arrow">
                      Product support <ArrowRight />
                    </Link>
                  </div>
                ),
              },
            ]}
          />
        </div>

        <div className="pdp__highlights">
          {product.highlights.map((item) => (
            <div key={item.label}>
              <span className="mono">{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
