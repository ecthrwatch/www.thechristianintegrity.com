/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    locale: import("@shared/i18n/translations").Locale;
    siteDomain: string;
    siteName: string;
    timelineShowAll: boolean;
  }
}
