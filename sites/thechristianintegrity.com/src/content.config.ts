import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const timeline = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "../../content/timeline/en" }),
  schema: z.object({
    title: z.string().default(""),
    description: z.string().default(""),
    date: z.coerce.date(),
    lastmod: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    slug: z.string().default(""),
    authors: z.string().optional(),
    tags: z.array(z.string()).optional(),
    timelines: z.array(z.string()).optional(),
    featuredImage: z.string().optional(),
    translationKey: z.string().optional(),
    CONF_websites: z.string().optional(),
    toc: z.boolean().optional(),
    enableMath: z.boolean().optional(),
    aliases: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    series: z.array(z.string()).optional(),
  }),
});

export const collections = { timeline };
