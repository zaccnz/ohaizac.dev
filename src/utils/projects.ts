import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

export type Filter = 'year' | 'lang' | 'tag';

export const isFilter = (filter: string | undefined): filter is Filter => {
    if (!filter)
        return false;
    if (['year', 'lang', 'tag'].includes(filter))
        return true;
    return false;
}

type FilterValue = { value: string, count: number }

export const getFilterValues = async (filter: Filter): Promise<FilterValue[]> => {
    const projects = await getCollection('projects');

    const values = projects.map(entry => {
        switch (filter) {
            case 'year': return entry.data.year;
            case 'tag': return entry.data.tags.map(v => v.toLowerCase());
            case 'lang': return entry.data.languages.map(v => v.toLowerCase());
        }
    }).flat();
    return Object.entries(values.reduce((accum, cur, i) => {
        if (cur in accum) {
            accum[cur] += 1;
        } else {
            accum[cur] = 1;
        }
        return accum;
    }, {} as Record<string, number>)).map(([value, count]) => {
        return { value, count }
    });
}

export const getFilteredProjects = async (filter: Filter, value: string): Promise<CollectionEntry<'projects'>[]> => {
    return await getCollection('projects', ({ data }) => {
        switch (filter) {
            case 'year':
                return data.year == value;
            case 'lang':
                return data.languages.map(v => v.toLowerCase()).includes(value);
            case 'tag':
                return data.tags.map(v => v.toLowerCase()).includes(value);
        }
    });
}
