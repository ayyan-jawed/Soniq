import type { ReactNode } from "react";

type Props = {
  kicker: string;
  title: ReactNode;
  lede?: string;
  meta?: { label: string; value: string }[];
  children?: ReactNode;
};

export function PageHero({ kicker, title, lede, meta, children }: Props) {
  return (
    <header className="page-hero">
      <div className="container">
        <p className="eyebrow">{kicker}</p>
        <h1 className="page-hero__title">{title}</h1>
        {lede && <p className="page-hero__lede">{lede}</p>}
        {children}
        {meta && (
          <dl className="page-hero__meta">
            {meta.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </header>
  );
}
