type Props = {
  first: string;
  second: string;
  kicker?: string;
};

/**
 * The slogan is a statement band, not a marquee. A scrolling ticker can never
 * guarantee the full sentence is readable, so the two clauses are laid out in
 * full and revealed with a masked rise once they enter the viewport.
 */
export function SloganBand({ first, second, kicker = "Manifesto" }: Props) {
  return (
    <section className="slogan" aria-labelledby="slogan-title">
      <div className="container slogan__inner">
        <div className="slogan__head">
          <p className="mono slogan__kicker">{kicker}</p>
          <p className="mono slogan__note">
            Tuned in Copenhagen · Measured, not claimed
          </p>
        </div>
        <h2 className="slogan__title" id="slogan-title">
          <span className="slogan__row" data-reveal>
            <span className="slogan__text">{first}</span>
          </span>
          <span className="slogan__row slogan__row--serif" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
            <span className="slogan__text">{second}</span>
          </span>
        </h2>
      </div>
    </section>
  );
}
