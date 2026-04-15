import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import type { Locale } from "../i18n/translations";

// During build, process.cwd() is the site directory (e.g. sites/ecthrwatch.org/).
// The shared data files are at ../../shared/data/ relative to that.
const dataDir = path.join(process.cwd(), "..", "..", "shared", "data");

/**
 * Maps our locale codes to the directory names.
 * Consistent with the locale codes throughout the codebase.
 */
const localeToDir: Record<Locale, string> = {
  en: "en",
  fr: "fr",
  it: "it",
  "zh-cn": "zh-cn",
};

function loadYaml(filePath: string): Record<string, any> {
  const content = fs.readFileSync(filePath, "utf-8");
  return yaml.load(content) as Record<string, any>;
}

const cache = new Map<string, Record<string, any>>();

function getCached(filePath: string): Record<string, any> {
  if (!cache.has(filePath)) {
    cache.set(filePath, loadYaml(filePath));
  }
  return cache.get(filePath)!;
}

/**
 * Convert inline markdown links [text](url) to HTML <a> tags.
 * This is the only markdown syntax used in the YAML data files.
 */
export function renderInlineMarkdown(text: string): string {
  return text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2">$1</a>'
  );
}

/**
 * Look up a dictionary value.
 * Usage: getDict("en", "email", "from") → "From"
 */
export function getDict(locale: Locale, file: string, key: string): string {
  const dir = localeToDir[locale];
  const filePath = path.join(dataDir, "dictionaries", dir, `${file}.yaml`);
  const data = getCached(filePath);
  return data[key] ?? key;
}

/**
 * Look up a person entry.
 * Usage: getPerson("en", "rogalski_adam") → "[Adam Rogalski (...)](url)"
 */
export function getPerson(locale: Locale, key: string): string {
  const dir = localeToDir[locale];
  const filePath = path.join(dataDir, "persons", dir, "person.yaml");
  const data = getCached(filePath);
  return data[key] ?? key;
}

/**
 * Get the "original document" link prefix text.
 * Usage: getOriginalText("en", "email") → "Click on this link to visualize the original email: "
 */
export function getOriginalText(locale: Locale, docType: string): string {
  const dir = localeToDir[locale];
  const filePath = path.join(dataDir, "dictionaries", dir, "original.yaml");
  const data = getCached(filePath);
  return data[docType] ?? "";
}

/**
 * Get a signature block.
 * Usage: getSignature("en") → { linkedin: { text, url }, email: { text, address } }
 */
export function getSignature(
  locale: Locale,
  key = "signature-1-default"
): { linkedin: { text: string; url: string }; email: { text: string; address: string } } | null {
  const dir = localeToDir[locale];
  const filePath = path.join(dataDir, "signatures", dir, `${key}.yaml`);
  try {
    return getCached(filePath) as any;
  } catch {
    return null;
  }
}
