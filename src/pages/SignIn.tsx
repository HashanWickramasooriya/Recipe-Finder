import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useDocumentTitle } from "../lib/useDocumentTitle";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignIn() {
  const { t } = useTranslation();
  useDocumentTitle("Sign in", "Sign in to save favorites and personalize your experience.");
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const signIn = useAuthStore((s) => s.signIn);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  if (user) return <Navigate to="/" replace />;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors: typeof errors = {};
    if (!name.trim()) nextErrors.name = t("auth.nameRequired") ?? "";
    if (!EMAIL_PATTERN.test(email)) nextErrors.email = t("auth.emailRequired") ?? "";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    signIn(name.trim(), email.trim());
    navigate("/");
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
      <h1 className="text-center font-display text-3xl font-semibold text-ink-900 dark:text-cream-100">
        {t("auth.signInTitle")}
      </h1>
      <p className="mt-2 text-center text-sm text-ink-700/70 dark:text-cream-200/60">
        {t("auth.signInSubtitle")}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-ink-800 dark:text-cream-100">
            {t("auth.name")}
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("auth.namePlaceholder") ?? ""}
            className="w-full rounded-lg border border-cream-200 bg-white px-3 py-2.5 text-sm text-ink-900 outline-none focus:border-clay-400 dark:border-ink-700 dark:bg-ink-800 dark:text-cream-100"
          />
          {errors.name && <p className="mt-1 text-xs text-clay-600 dark:text-clay-300">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink-800 dark:text-cream-100">
            {t("auth.email")}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("auth.emailPlaceholder") ?? ""}
            className="w-full rounded-lg border border-cream-200 bg-white px-3 py-2.5 text-sm text-ink-900 outline-none focus:border-clay-400 dark:border-ink-700 dark:bg-ink-800 dark:text-cream-100"
          />
          {errors.email && <p className="mt-1 text-xs text-clay-600 dark:text-clay-300">{errors.email}</p>}
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-clay-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-clay-600"
        >
          {t("auth.continueButton")}
        </button>
      </form>
      <p className="mt-6 text-center text-xs text-ink-700/50 dark:text-cream-200/40">{t("auth.guestNotice")}</p>
    </div>
  );
}
