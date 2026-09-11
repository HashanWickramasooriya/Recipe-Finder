import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore, type DietaryPreference } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { useRecentlyViewedStore } from "../store/useRecentlyViewedStore";
import { useShoppingListStore } from "../store/useShoppingListStore";
import { LanguageSelector } from "../components/LanguageSelector";
import { useDocumentTitle } from "../lib/useDocumentTitle";

const DIETARY_OPTIONS: DietaryPreference[] = [
  "none",
  "vegetarian",
  "vegan",
  "gluten-free",
  "dairy-free",
  "halal",
  "pescatarian",
];

export default function Settings() {
  const { t } = useTranslation();
  useDocumentTitle("Settings", "Manage your language, appearance, and account.");
  const user = useAuthStore((s) => s.user);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const signOut = useAuthStore((s) => s.signOut);
  const mode = useThemeStore((s) => s.mode);
  const setMode = useThemeStore((s) => s.setMode);
  const navigate = useNavigate();

  const clearFavorites = useFavoritesStore((s) => s.clearFavorites);
  const clearRecent = useRecentlyViewedStore((s) => s.clearRecent);
  const clearShoppingList = useShoppingListStore((s) => s.clearList);

  const [displayName, setDisplayName] = useState(user?.name ?? "");
  const [saved, setSaved] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  if (!user) return <Navigate to="/signin" replace />;

  function handleSave() {
    updateProfile({ name: displayName });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleClearData() {
    clearFavorites();
    clearRecent();
    clearShoppingList();
    setConfirmClear(false);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-ink-900 dark:text-cream-100">
        {t("settings.title")}
      </h1>
      <p className="mt-1 text-sm text-ink-700/70 dark:text-cream-200/60">{t("settings.subtitle")}</p>

      <section className="mt-10 rounded-xl border border-cream-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-800">
        <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-cream-100">
          {t("settings.language")}
        </h2>
        <p className="mt-1 text-sm text-ink-700/70 dark:text-cream-200/60">{t("settings.languageHint")}</p>
        <div className="mt-4 max-w-sm">
          <LanguageSelector />
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-cream-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-800">
        <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-cream-100">
          {t("settings.appearance")}
        </h2>
        <p className="mt-1 text-sm text-ink-700/70 dark:text-cream-200/60">{t("settings.appearanceHint")}</p>
        <div className="mt-4 flex gap-2">
          {(["light", "dark", "system"] as const).map((option) => (
            <button
              key={option}
              onClick={() => setMode(option)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                mode === option
                  ? "bg-clay-500 text-white"
                  : "border border-cream-300 text-ink-800 dark:border-ink-600 dark:text-cream-100"
              }`}
            >
              {t(`settings.${option}`)}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-cream-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-800">
        <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-cream-100">
          {t("settings.profile")}
        </h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-700/70 dark:text-cream-200/60">
              {t("settings.displayName")}
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full rounded-lg border border-cream-200 bg-cream-50 px-3 py-2 text-sm text-ink-900 outline-none focus:border-clay-400 dark:border-ink-700 dark:bg-ink-900 dark:text-cream-100"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-700/70 dark:text-cream-200/60">
              {t("settings.email")}
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full rounded-lg border border-cream-200 bg-cream-100 px-3 py-2 text-sm text-ink-700/70 dark:border-ink-700 dark:bg-ink-900/60 dark:text-cream-200/60"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-700/70 dark:text-cream-200/60">
              {t("settings.dietaryPreference")}
            </label>
            <select
              value={user.dietaryPreference}
              onChange={(e) => updateProfile({ dietaryPreference: e.target.value as DietaryPreference })}
              className="w-full rounded-lg border border-cream-200 bg-cream-50 px-3 py-2 text-sm text-ink-900 outline-none focus:border-clay-400 dark:border-ink-700 dark:bg-ink-900 dark:text-cream-100"
            >
              {DIETARY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === "none" ? t("filters.anyDiet") : t(`filters.dietary.${opt}`)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="rounded-full bg-clay-500 px-5 py-2 text-sm font-medium text-white hover:bg-clay-600"
            >
              {t("settings.saveChanges")}
            </button>
            {saved && (
              <span className="text-sm text-sage-600 dark:text-sage-500">{t("settings.changesSaved")}</span>
            )}
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-cream-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-800">
        <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-cream-100">
          {t("settings.clearData")}
        </h2>
        <p className="mt-1 text-sm text-ink-700/70 dark:text-cream-200/60">{t("settings.clearDataHint")}</p>
        {confirmClear ? (
          <div className="mt-4 flex items-center gap-3">
            <span className="text-sm font-medium text-ink-900 dark:text-cream-100">
              {t("settings.clearDataConfirm")}
            </span>
            <button
              onClick={handleClearData}
              className="rounded-full bg-clay-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-clay-700"
            >
              {t("settings.clearDataButton")}
            </button>
            <button
              onClick={() => setConfirmClear(false)}
              className="rounded-full border border-cream-300 px-4 py-1.5 text-sm font-medium text-ink-800 dark:border-ink-600 dark:text-cream-100"
            >
              {t("common.cancel")}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmClear(true)}
            className="mt-4 rounded-full border border-cream-300 px-4 py-2 text-sm font-medium text-ink-800 hover:bg-cream-100 dark:border-ink-600 dark:text-cream-100 dark:hover:bg-ink-700"
          >
            {t("settings.clearDataButton")}
          </button>
        )}
      </section>

      <div className="mt-8 text-center">
        <button
          onClick={() => {
            signOut();
            navigate("/");
          }}
          className="text-sm font-medium text-clay-600 hover:text-clay-700 dark:text-clay-300"
        >
          {t("nav.signOut")}
        </button>
      </div>
    </div>
  );
}
