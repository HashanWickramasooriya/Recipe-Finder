import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSearchHistoryStore } from "../store/useSearchHistoryStore";

interface SearchBarProps {
  initialValue?: string;
  onSearch?: (query: string) => void;
  className?: string;
  autoFocus?: boolean;
}

export function SearchBar({ initialValue = "", onSearch, className = "", autoFocus }: SearchBarProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState(initialValue);
  const navigate = useNavigate();
  const addSearch = useSearchHistoryStore((s) => s.addSearch);

  function submit(query: string) {
    addSearch(query);
    if (onSearch) {
      onSearch(query);
    } else {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit(value);
      }}
      className={`flex w-full items-center gap-2 rounded-full border border-cream-200 bg-white px-4 py-2.5 shadow-sm transition-colors focus-within:border-clay-400 dark:border-ink-700 dark:bg-ink-800 ${className}`}
      role="search"
    >
      <svg className="h-4.5 w-4.5 shrink-0 text-ink-700/50 dark:text-cream-200/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path strokeLinecap="round" d="m20 20-3.5-3.5" />
      </svg>
      <label htmlFor="site-search" className="sr-only">
        {t("search.placeholder")}
      </label>
      <input
        id="site-search"
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t("search.placeholder") ?? ""}
        autoFocus={autoFocus}
        className="w-full bg-transparent text-sm text-ink-900 outline-none placeholder:text-ink-700/50 dark:text-cream-100 dark:placeholder:text-cream-200/40"
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          aria-label={t("search.clearRecent") ?? "Clear"}
          className="shrink-0 text-ink-700/50 hover:text-ink-900 dark:text-cream-200/50 dark:hover:text-cream-100"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      )}
      <button
        type="submit"
        className="shrink-0 rounded-full bg-clay-500 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-clay-600"
      >
        {t("search.button")}
      </button>
    </form>
  );
}
