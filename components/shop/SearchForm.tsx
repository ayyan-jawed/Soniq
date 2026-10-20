"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/components/ui/icons";

export function SearchForm({ initialQuery = "" }: { initialQuery?: string }) {
  const [value, setValue] = useState(initialQuery);
  const router = useRouter();

  return (
    <form
      className="search-page__form"
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        const q = value.trim();
        router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
      }}
    >
      <SearchIcon aria-hidden="true" />
      <label htmlFor="search-page-input" className="sr-only">
        Search the catalogue
      </label>
      <input
        id="search-page-input"
        className="search-page__input"
        type="search"
        placeholder="Search models, finishes, use cases…"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        autoComplete="off"
      />
      <button type="submit" className="btn btn--lime btn--sm">
        Search
      </button>
    </form>
  );
}
