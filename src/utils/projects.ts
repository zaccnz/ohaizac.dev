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

type MapFunction = (entry: CollectionEntry<'projects'>['data']) => (string | string[]);
const MapFunctions: Record<Filter, MapFunction> = {
    'year': (data) => {
        return data.year;
    },
    'tag': (data) => {
        return data.tags.map(v => v.toLowerCase().replace(' ', '_'));
    },
    'lang': (data) => {
        return data.languages.map(v => v.toLowerCase());
    },
};

type FilterValue = { value: string, count: number }

export const getFilterValues = async (filter: Filter): Promise<FilterValue[]> => {
    const projects = await getCollection('projects');

    const values = projects
        .map(value => value.data)
        .map(MapFunctions[filter])
        .flat();

    const tally = values
        .reduce((accum, cur) => {
            accum[cur] = (accum[cur] ?? 0) + 1;
            return accum;
        }, {} as Record<string, number>);

    const result = Object
        .entries(tally)
        .map(([value, count]) => {
            return { value, count };
        });

    return result;
}

export const getFilteredProjects = async (filter: Filter, value: string): Promise<CollectionEntry<'projects'>[]> => {
    return await getCollection('projects', ({ data }) => {
        return MapFunctions[filter](data).includes(value);
    });
}
