/**
 * Slugify a tag name to match Hugo's URL pattern.
 * "Yuan Yang" → "yuan-yang"
 * "Application no. 50552-22" → "application-no.-50552-22"
 */
export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/['"\/]/g, "")
    .replace(/--+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Collect all unique tags from a set of timeline events.
 * Returns sorted array of { tag, slug, count }.
 */
export function collectTags(events: any[]): { tag: string; slug: string; count: number }[] {
  const map = new Map<string, { tag: string; count: number }>();

  for (const event of events) {
    const tags = event.data.tags || [];
    for (const tag of tags) {
      const key = tag.toLowerCase();
      const existing = map.get(key);
      if (existing) {
        existing.count++;
      } else {
        map.set(key, { tag, count: 1 });
      }
    }
  }

  return Array.from(map.values())
    .map((entry) => ({
      tag: entry.tag,
      slug: slugifyTag(entry.tag),
      count: entry.count,
    }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

/**
 * Filter events that have a specific tag (case-insensitive match).
 */
export function filterEventsByTag(events: any[], tagSlug: string): any[] {
  return events.filter((event) => {
    const tags = event.data.tags || [];
    return tags.some((t: string) => slugifyTag(t) === tagSlug);
  });
}
