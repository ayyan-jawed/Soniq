export function Marquee({ phrase, repeat = 4 }: { phrase: string; repeat?: number }) {
  const group = (
    <div className="marquee__group" aria-hidden="true">
      {Array.from({ length: repeat }).map((_, i) => (
        <span className="marquee__item" key={i}>
          {phrase}
          <span className="marquee__star" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee">
      <p className="sr-only">{phrase}</p>
      <div className="marquee__track">
        {group}
        {group}
      </div>
    </div>
  );
}
