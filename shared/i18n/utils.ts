import { type Locale, translations } from "./translations";

export function getLocaleFromURL(url: URL): Locale {
  const segment = url.pathname.split("/")[1];
  if (segment in translations) {
    return segment as Locale;
  }
  return "en";
}

export function t(locale: Locale, key: string): string {
  return translations[locale][key] ?? key;
}
