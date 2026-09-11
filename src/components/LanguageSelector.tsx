import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../i18n/languages";
import { useOnClickOutside } from "../lib/useOnClickOutside";

interface LanguageSelectorProps {
  className?: string;
}

export function LanguageSelector({ className = "" }: LanguageSelectorProps) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(containerRef, () => setOpen(false));

  const current = LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LANGUAGES;
    return LANGUAGES.filter(
      (l) =>
        l.englishName.toLowerCase().includes(q) ||
        l.nativeName.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q),
    );
  }, [query]);

  function selectLanguage(code: string) {
    i18n.changeLanguage(code);
    setOpen(false);
    setQuery("");
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-cream-200 bg-white px-3 py-2.5 text-sm text-ink-900 shadow-sm transition-colors hover:border-clay-300 dark:border-ink-700 dark:bg-ink-800 dark:text-cream-100"
      >
        <span className="flex items-center gap-2">
          <GlobeIcon />
          <span>{current.nativeName}</span>
        </span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-72 max-w-[90vw] rounded-xl border border-cream-200 bg-white p-2 shadow-popover dark:border-ink-700 dark:bg-ink-800 ltr:left-0 rtl:right-0">
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("settings.searchLanguage") ?? ""}
            className="mb-2 w-full rounded-lg border border-cream-200 bg-cream-50 px-3 py-2 text-sm text-ink-900 outline-none focus:border-clay-400 dark:border-ink-700 dark:bg-ink-900 dark:text-cream-100"
          />
          <ul role="listbox" className="max-h-64 overflow-y-auto">
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-ink-700/60 dark:text-cream-200/60">
                {t("settings.noLanguageFound")}
              </li>
            )}
            {filtered.map((lang) => (
              <li key={lang.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={lang.code === current.code}
                  onClick={() => selectLanguage(lang.code)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-cream-100 dark:hover:bg-ink-700 ${
                    lang.code === current.code
                      ? "bg-clay-50 text-clay-700 dark:bg-clay-800/30 dark:text-clay-200"
                      : "text-ink-900 dark:text-cream-100"
                  }`}
                >
                  <span>{lang.nativeName}</span>
                  <span className="text-xs text-ink-700/50 dark:text-cream-200/50">
                    {lang.englishName}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M3 12h18M12 3c2.5 2.7 3.75 6 3.75 9s-1.25 6.3-3.75 9c-2.5-2.7-3.75-6-3.75-9S9.5 5.7 12 3Z" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
    </svg>
  );
}
