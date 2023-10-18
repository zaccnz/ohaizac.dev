import { z, defineCollection } from 'astro:content';

const pageCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string()
    })
});
const projectCollection = defineCollection({
    type: 'content',
    schema: z.object({
        name: z.string(),
        tagline: z.string(),
        links: z.object({
            github: z.string().url().optional(),
            demo: z.string().url().optional(),
            homepage: z.string().url().optional(),
        }).optional(),
        languages: z.array(z.string()),
        tags: z.array(z.string()),
        image: z.string().url().optional(),
        demo: z.string().url().optional(),
        featured: z.number().optional(),
        year: z.string(),
    })
});

export const collections = {
    'pages': pageCollection,
    'projects': projectCollection,
}
