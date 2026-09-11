import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "./ThemeToggle";
import { useAuthStore } from "../store/useAuthStore";

const navItems = [
  { to: "/", key: "nav.home" },
  { to: "/countries", key: "nav.countries" },
  { to: "/search", key: "nav.search" },
  { to: "/favorites", key: "nav.favorites" },
];

export function Header() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  function linkClass({ isActive }: { isActive: boolean }) {
    return `rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-clay-50 text-clay-700 dark:bg-clay-800/30 dark:text-clay-200"
        : "text-ink-700 hover:bg-cream-100 hover:text-ink-900 dark:text-cream-200/80 dark:hover:bg-ink-700 dark:hover:text-cream-100"
    }`;
  }

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-cream-200 bg-cream-50/90 backdrop-blur-sm dark:border-ink-700 dark:bg-[#17130f]/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-clay-500 text-white">
            <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5" aria-hidden="true">
              <path
                d="M4 11c0-3.9 3.6-7 8-7s8 3.1 8 7-3.6 7-8 7-8-3.1-8-7Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path d="M12 4v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
          <span className="font-display text-lg font-semibold text-ink-900 dark:text-cream-100">
            Globcompanion
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === "/"}>
              {t(item.key)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {user ? (
            <Link
              to="/settings"
              className="rounded-full bg-clay-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-clay-600"
            >
              {user.name.split(" ")[0]}
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="rounded-full bg-clay-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-clay-600"
            >
              {t("nav.signIn")}
            </button>
          )}
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-cream-200 text-ink-800 md:hidden dark:border-ink-700 dark:text-cream-100"
          onClick={() => setMenuOpen(true)}
          aria-label={t("nav.menu")}
          aria-expanded={menuOpen}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 ltr:right-0 rtl:left-0 flex w-[85%] max-w-sm flex-col gap-1 bg-cream-50 p-5 shadow-popover dark:bg-ink-800">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-display text-lg font-semibold text-ink-900 dark:text-cream-100">
                {t("nav.menu")}
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label={t("common.close")}
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink-700 hover:bg-cream-100 dark:text-cream-200 dark:hover:bg-ink-700"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
                  <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-base font-medium ${
                    isActive
                      ? "bg-clay-50 text-clay-700 dark:bg-clay-800/30 dark:text-clay-200"
                      : "text-ink-800 dark:text-cream-100"
                  }`
                }
              >
                {t(item.key)}
              </NavLink>
            ))}
            <NavLink
              to="/settings"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-4 py-3 text-base font-medium ${
                  isActive
                    ? "bg-clay-50 text-clay-700 dark:bg-clay-800/30 dark:text-clay-200"
                    : "text-ink-800 dark:text-cream-100"
                }`
              }
            >
              {t("nav.settings")}
            </NavLink>
            <div className="mt-4 flex items-center justify-between border-t border-cream-200 pt-4 dark:border-ink-700">
              <ThemeToggle />
              {user ? (
                <span className="text-sm font-medium text-ink-800 dark:text-cream-100">
                  {t("auth.welcomeBack", { name: user.name.split(" ")[0] })}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/signin");
                  }}
                  className="rounded-full bg-clay-500 px-4 py-2 text-sm font-medium text-white"
                >
                  {t("nav.signIn")}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
