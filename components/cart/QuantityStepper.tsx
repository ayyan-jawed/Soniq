"use client";

import { MinusIcon, PlusIcon } from "@/components/ui/icons";

type Props = {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  label: string;
  compact?: boolean;
};

export function QuantityStepper({ value, onChange, min = 1, max = 10, label, compact }: Props) {
  return (
    <div className="qty" style={compact ? { height: "1.85rem" } : undefined}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={`Decrease quantity of ${label}`}
      >
        <MinusIcon width={12} height={12} />
      </button>
      <span aria-live="polite" aria-label={`Quantity of ${label}: ${value}`}>
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={`Increase quantity of ${label}`}
      >
        <PlusIcon width={12} height={12} />
      </button>
    </div>
  );
}
