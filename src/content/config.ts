// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// 2. Define your collection(s)

const thingCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    snippet: z.string(),
    thumbnail: z.string(),
    date: z.date(),
    featured: z.boolean(),
    categories: z.array(z.string()),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  thing: thingCollection,
};
