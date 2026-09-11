import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-cream-200 bg-cream-50 dark:border-ink-700 dark:bg-[#17130f]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <span className="font-display text-lg font-semibold text-ink-900 dark:text-cream-100">
              Globcompanion
            </span>
            <p className="mt-2 max-w-xs text-sm text-ink-700/70 dark:text-cream-200/60">
              {t("footer.tagline")}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-ink-900 dark:text-cream-100">
              {t("footer.explore")}
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-ink-700/70 dark:text-cream-200/60">
              <li><Link to="/countries" className="hover:text-clay-600 dark:hover:text-clay-300">{t("nav.countries")}</Link></li>
              <li><Link to="/search" className="hover:text-clay-600 dark:hover:text-clay-300">{t("nav.search")}</Link></li>
              <li><Link to="/favorites" className="hover:text-clay-600 dark:hover:text-clay-300">{t("nav.favorites")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-ink-900 dark:text-cream-100">
              {t("footer.company")}
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-ink-700/70 dark:text-cream-200/60">
              <li><Link to="/settings" className="hover:text-clay-600 dark:hover:text-clay-300">{t("nav.settings")}</Link></li>
              <li><Link to="/signin" className="hover:text-clay-600 dark:hover:text-clay-300">{t("nav.signIn")}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center gap-2 border-t border-cream-200 pt-6 text-xs text-ink-700/60 dark:border-ink-700 dark:text-cream-200/50 sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Globcompanion. {t("footer.rights")}
          </p>
          <p>
            {t("footer.developedBy")}{" "}
            <a
              href="https://hashanjanithwickramasooriya.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-clay-600 underline underline-offset-2 hover:text-clay-700 dark:text-clay-300 dark:hover:text-clay-200"
            >
              Hashan Wickramasooriya
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
