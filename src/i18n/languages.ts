export interface LanguageDef {
  code: string;
  englishName: string;
  nativeName: string;
  rtl?: boolean;
}

export const LANGUAGES: LanguageDef[] = [
  { code: "en", englishName: "English", nativeName: "English" },
  { code: "zh", englishName: "Mandarin Chinese", nativeName: "中文" },
  { code: "hi", englishName: "Hindi", nativeName: "हिन्दी" },
  { code: "es", englishName: "Spanish", nativeName: "Español" },
  { code: "fr", englishName: "French", nativeName: "Français" },
  { code: "ar", englishName: "Modern Standard Arabic", nativeName: "العربية", rtl: true },
  { code: "pt", englishName: "Portuguese", nativeName: "Português" },
  { code: "bn", englishName: "Bengali", nativeName: "বাংলা" },
  { code: "ru", englishName: "Russian", nativeName: "Русский" },
  { code: "ur", englishName: "Urdu", nativeName: "اردو", rtl: true },
  { code: "id", englishName: "Indonesian", nativeName: "Bahasa Indonesia" },
  { code: "de", englishName: "German", nativeName: "Deutsch" },
  { code: "ja", englishName: "Japanese", nativeName: "日本語" },
  { code: "pcm", englishName: "Nigerian Pidgin", nativeName: "Naijá" },
  { code: "arz", englishName: "Egyptian Arabic", nativeName: "مصري", rtl: true },
  { code: "mr", englishName: "Marathi", nativeName: "मराठी" },
  { code: "vi", englishName: "Vietnamese", nativeName: "Tiếng Việt" },
  { code: "te", englishName: "Telugu", nativeName: "తెలుగు" },
  { code: "tr", englishName: "Turkish", nativeName: "Türkçe" },
  { code: "pnb", englishName: "Western Punjabi", nativeName: "پنجابی", rtl: true },
  { code: "sw", englishName: "Swahili", nativeName: "Kiswahili" },
  { code: "tl", englishName: "Tagalog (Filipino)", nativeName: "Tagalog" },
  { code: "ta", englishName: "Tamil", nativeName: "தமிழ்" },
  { code: "yue", englishName: "Yue Chinese (Cantonese)", nativeName: "粵語" },
  { code: "wuu", englishName: "Wu Chinese", nativeName: "吴语" },
  { code: "ko", englishName: "Korean", nativeName: "한국어" },
  { code: "fa", englishName: "Persian (Farsi)", nativeName: "فارسی", rtl: true },
  { code: "ha", englishName: "Hausa", nativeName: "Hausa" },
  { code: "jv", englishName: "Javanese", nativeName: "Basa Jawa" },
  { code: "it", englishName: "Italian", nativeName: "Italiano" },
  { code: "si", englishName: "Sinhala", nativeName: "සිංහල" },
];

export const RTL_LANGUAGE_CODES = new Set(
  LANGUAGES.filter((l) => l.rtl).map((l) => l.code),
);

export const DEFAULT_LANGUAGE = "en";
