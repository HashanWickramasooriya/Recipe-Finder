import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import { DEFAULT_LANGUAGE, LANGUAGES, RTL_LANGUAGE_CODES } from "./languages";

export function applyDocumentDirection(lang: string) {
  const isRtl = RTL_LANGUAGE_CODES.has(lang);
  document.documentElement.dir = isRtl ? "rtl" : "ltr";
  document.documentElement.lang = lang;
}

const localeLoaders: Record<string, () => Promise<{ default: Record<string, unknown> }>> = {
  zh: () => import("./locales/zh.json"),
  hi: () => import("./locales/hi.json"),
  es: () => import("./locales/es.json"),
  fr: () => import("./locales/fr.json"),
  ar: () => import("./locales/ar.json"),
  pt: () => import("./locales/pt.json"),
  bn: () => import("./locales/bn.json"),
  ru: () => import("./locales/ru.json"),
  ur: () => import("./locales/ur.json"),
  id: () => import("./locales/id.json"),
  de: () => import("./locales/de.json"),
  ja: () => import("./locales/ja.json"),
  pcm: () => import("./locales/pcm.json"),
  arz: () => import("./locales/arz.json"),
  mr: () => import("./locales/mr.json"),
  vi: () => import("./locales/vi.json"),
  te: () => import("./locales/te.json"),
  tr: () => import("./locales/tr.json"),
  pnb: () => import("./locales/pnb.json"),
  sw: () => import("./locales/sw.json"),
  tl: () => import("./locales/tl.json"),
  ta: () => import("./locales/ta.json"),
  yue: () => import("./locales/yue.json"),
  wuu: () => import("./locales/wuu.json"),
  ko: () => import("./locales/ko.json"),
  fa: () => import("./locales/fa.json"),
  ha: () => import("./locales/ha.json"),
  jv: () => import("./locales/jv.json"),
  it: () => import("./locales/it.json"),
  si: () => import("./locales/si.json"),
};

const loadedLanguages = new Set<string>(["en"]);

/** Loads a locale's resource bundle on demand. Returns true if it just loaded new resources. */
export async function loadLanguage(lang: string): Promise<boolean> {
  if (loadedLanguages.has(lang)) return false;
  const loader = localeLoaders[lang];
  if (!loader) return false;
  const mod = await loader();
  i18n.addResourceBundle(lang, "translation", mod.default, true, true);
  loadedLanguages.add(lang);
  return true;
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en } },
    lng: undefined,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: LANGUAGES.map((l) => l.code),
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "rf_language",
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
    returnEmptyString: false,
  });

async function ensureLanguageLoaded(lang: string) {
  const justLoaded = await loadLanguage(lang);
  applyDocumentDirection(lang);
  // addResourceBundle doesn't trigger react-i18next's re-render on its own,
  // so re-emit languageChanged once the new strings are actually available.
  // Guarded by `justLoaded` so this only fires once per language, never recursively.
  if (justLoaded) {
    i18n.emit("languageChanged", lang);
  }
}

i18n.on("languageChanged", (lng) => {
  void ensureLanguageLoaded(lng);
});

void ensureLanguageLoaded(i18n.language || DEFAULT_LANGUAGE);

export default i18n;
