import { z, defineCollection } from 'astro:content';

const pages = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string()
    })
});


const projects = defineCollection({
    type: 'content',
    schema: z.object({
        name: z.string(),
        tagline: z.string(),
        description: z.string().optional(),
        links: z.record(z.string().url()).optional(),
        languages: z.array(z.string()),
        tags: z.array(z.string()),
        image: z.string().url().optional(),
        image_alt: z.string().url().optional(),
        demo: z.string().url().optional(),
        featured: z.number().optional(),
        year: z.string(),
    })
});


export const collections = {
    pages,
    projects,
}
