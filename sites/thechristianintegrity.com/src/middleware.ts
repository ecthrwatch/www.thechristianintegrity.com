import { defineMiddleware } from "astro:middleware";
import type { Locale } from "@shared/i18n/translations";
import { languages } from "@shared/i18n/translations";
import { siteConfig } from "./site-config";

/**
 * Determines the active locale for each request.
 *
 * Dev mode:  port -> locale (4321=en, 4322=fr, 4323=zh-cn)
 * Build:     LOCALE env var (e.g. LOCALE=fr npm run build)
 * Fallback:  "en"
 */
const portToLocale: Record<number, Locale> = {
  4321: "en",
  4322: "fr",
  4323: "zh-cn",
};

function resolveLocale(url: URL): Locale {
  // 1. Environment variable (used during static builds)
  const envLocale = import.meta.env.LOCALE || process.env.LOCALE;
  if (envLocale && envLocale in languages) {
    return envLocale as Locale;
  }

  // 2. Port-based detection (used during dev)
  const port = url.port ? Number(url.port) : 4321;
  if (port in portToLocale) {
    return portToLocale[port];
  }

  // 3. Fallback
  return "en";
}

export const onRequest = defineMiddleware((context, next) => {
  context.locals.locale = resolveLocale(context.url);
  context.locals.siteDomain = import.meta.env.SITE_DOMAIN || process.env.SITE_DOMAIN || siteConfig.domain;
  context.locals.siteName = siteConfig.name;
  context.locals.timelineShowAll = siteConfig.timelineShowAll ?? false;
  return next();
});
