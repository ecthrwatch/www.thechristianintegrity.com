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

const cases = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "../../content/cases/en" }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(""),
    date: z.coerce.date(),
    slug: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

const laws = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "../../content/laws/en" }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(""),
    date: z.coerce.date(),
    slug: z.string(),
  }),
});

const evidence = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "../../content/evidence/en" }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(""),
    date: z.coerce.date(),
    slug: z.string(),
  }),
});

export const collections = { timeline, cases, laws, evidence };
