"use client";

import { useId, useState, type ReactNode } from "react";
import { PlusIcon } from "@/components/ui/icons";

export type AccordionItem = {
  title: string;
  content: ReactNode;
};

export function Accordion({ items, defaultOpen = 0 }: { items: AccordionItem[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const id = useId();

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const expanded = open === index;
        const panelId = `${id}-panel-${index}`;
        const buttonId = `${id}-button-${index}`;
        return (
          <div className="accordion__item" key={item.title}>
            <h3>
              <button
                type="button"
                className="accordion__trigger"
                id={buttonId}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : index)}
              >
                {item.title}
                <PlusIcon className="accordion__icon" aria-hidden="true" />
              </button>
            </h3>
            <div
              className="accordion__panel"
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              data-open={expanded}
              hidden={!expanded}
            >
              <div className="accordion__inner">
                <div>{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
