import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

export const FilterList = ["year", "lang", "tag"] as const;
export type Filter = (typeof FilterList)[number];

type MapFunction<F extends Filter> = (
  entry: CollectionEntry<"projects">,
) => F extends "year" ? string : string[];

const MapFunctions: { [K in Filter]: MapFunction<K> } = {
  year: ({ data }) => {
    return transformFilterValue(data.year);
  },
  tag: ({ data }) => {
    return data.tags.map(transformFilterValue);
  },
  lang: ({ data }) => {
    return data.languages.map(transformFilterValue);
  },
};

export const transformFilterValue = (value: string): string =>
  value.toLowerCase().replaceAll(" ", "-");

export const getFilteredProjects = async (filter: Filter, value: string) => {
  return await getCollection("projects", (collection) => {
    return MapFunctions[filter](collection).includes(value);
  });
};

export const getFilterValues = async (filter: Filter) => {
  const projects = await getCollection("projects");

  return projects
    .map<string | string[]>(MapFunctions[filter])
    .flat()
    .reduce(
      (accum, cur) => {
        accum[cur] = (accum[cur] ?? 0) + 1;
        return accum;
      },
      {} as Record<string, number>,
    );
};

export const getAllFilterValues = async () => {
  const projects = await getCollection("projects");

  return projects
    .map((project) =>
      FilterList.map((filter) => ({
        filter,
        tags: MapFunctions[filter](project),
      })),
    )
    .reduce(
      (accum, cur) => {
        for (const { filter, tags } of cur) {
          if (Array.isArray(tags)) {
            accum.push(
              ...tags.map((value) => ({
                filter,
                value,
              })),
            );
          } else {
            accum.push({
              filter,
              value: tags,
            });
          }
        }
        return accum;
      },
      [] as { filter: Filter; value: string }[],
    );
};
