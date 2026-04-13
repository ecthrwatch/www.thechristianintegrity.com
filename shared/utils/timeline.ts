/**
 * Shared timeline utilities used across all sites.
 */

/**
 * Filters timeline events based on site configuration.
 * If timelineShowAll is true, returns all non-draft events.
 * Otherwise, filters by CONF_websites containing the site domain.
 */
export function filterTimelineEvents(
  allEvents: any[],
  siteDomain: string,
  timelineShowAll: boolean
) {
  return allEvents
    .filter((e) => !e.data.draft)
    .filter((e) => {
      if (timelineShowAll) return true;
      const websites = e.data.CONF_websites ?? "";
      return websites.includes(siteDomain);
    })
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function estimateReadingTime(description: string): number {
  const words = (description || "").trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
