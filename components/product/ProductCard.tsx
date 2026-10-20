import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";
import { ArrowUpRight } from "@/components/ui/icons";

type Props = {
  product: Product;
  sizes: string;
  priority?: boolean;
  showTagline?: boolean;
};

export function ProductCard({ product, sizes, priority, showTagline = true }: Props) {
  return (
    <article className="product-card">
      <Link
        href={`/product/${product.slug}`}
        className="product-card__media"
        aria-label={`${product.name} — ${formatPrice(product.price)}`}
        tabIndex={-1}
      >
        <Image
          src={product.image}
          alt={`${product.name} over-ear headphones in ${product.colorways[0].name}`}
          width={1200}
          height={900}
          sizes={sizes}
          priority={priority}
          style={{ objectFit: "cover" }}
        />
        {(product.badge || product.compareAt) && (
          <span className="product-card__badges">
            {product.compareAt && <span className="badge badge--lime">Save {formatPrice(product.compareAt - product.price)}</span>}
            {product.badge && !product.compareAt && <span className="badge">{product.badge}</span>}
          </span>
        )}
        <span className="product-card__quick" aria-hidden="true">
          <span className="badge badge--lime">
            View <ArrowUpRight width={11} height={11} />
          </span>
        </span>
      </Link>

      <div className="product-card__body">
        <div>
          <h3 className="product-card__name">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>
          {showTagline && <p className="product-card__tagline">{product.tagline}</p>}
          <div className="dots" aria-label={`${product.colorways.length} finishes`}>
            {product.colorways.map((color) => (
              <span
                key={color.name}
                className="dot"
                style={{ background: color.hex }}
                title={color.name}
              />
            ))}
            {product.colorways.length > 1 && (
              <span className="dots__count">{product.colorways.length} finishes</span>
            )}
          </div>
        </div>
        <p className="product-card__price">
          {formatPrice(product.price)}
          {product.compareAt && (
            <span className="product-card__compare">{formatPrice(product.compareAt)}</span>
          )}
        </p>
      </div>
    </article>
  );
}
