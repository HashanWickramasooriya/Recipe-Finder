import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center sm:px-6">
      <span className="font-display text-6xl font-semibold text-clay-400 dark:text-clay-500">404</span>
      <h1 className="mt-4 font-display text-2xl font-semibold text-ink-900 dark:text-cream-100">
        {t("common.notFoundTitle")}
      </h1>
      <p className="mt-2 text-sm text-ink-700/70 dark:text-cream-200/60">{t("common.notFoundSubtitle")}</p>
      <Link
        to="/"
        className="mt-6 rounded-full bg-clay-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-clay-600"
      >
        {t("common.goHome")}
      </Link>
    </div>
  );
}
