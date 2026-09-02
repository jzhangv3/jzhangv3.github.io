import { SITE } from '@config';

const BASE_PATHNAME = SITE.base || '/';

/**
 * Trims whitespace or a specified character from the beginning and end of a string.
 * @param str - The string to trim.
 * @param ch - The character to trim (optional).
 * @returns The trimmed string.
 *
 * @hint use trimSlash() to trim leading and trailing slashes from a string.
 */
export const trim = (str = '', ch?: string) => {
  let start = 0,
    end = str.length || 0;
  while (start < end && (ch ? str[start] === ch : str[start] === ' ')) start++;
  while (end > start && (ch ? str[end - 1] === ch : str[end - 1] === ' ')) end--;
  return start > 0 || end < str.length ? str.substring(start, end) : str;
};

/**
 * Trims leading and trailing slashes from a string.
 * @param s - The string to trim.
 * @returns The trimmed string.
 *
 * @hint use createPath() to create a path with leading and trailing slashes based on the SITE.trailingSlash config.
 */
export const trimSlash = (s: string) => trim(trim(s, '/'));

const createPath = (...params: string[]) => {
  const paths = params
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
  return '/' + paths + (SITE.trailingSlash && paths ? '/' : '');
};

/**
 * Cleans a string to make it suitable for use as a URL slug.
 * @param text - The string to clean.
 * @returns The cleaned string.
 */
export const cleanSlug = (text = '') =>
  trimSlash(text)
    .split('/')
    .map((slug) =>
      slug
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
    )
    .join('/');

/**
 * Generates a canonical URL for a given path, ensuring it matches the SITE.trailingSlash configuration.
 * @param path - The path to generate the canonical URL for (optional for the home page).
 * @returns The canonical URL as a string or URL object.
 */
export const getCanonical = (path = ''): string | URL => {
  const url = String(new URL(path, SITE.site));
  if (SITE.trailingSlash === false && path && url.endsWith('/')) {
    return url.slice(0, -1);
  } else if (SITE.trailingSlash === true && path && !url.endsWith('/')) {
    return url + '/';
  }
  return url;
};

/**
 * Generates a permalink for a given slug and type.
 * @param slug - The slug to generate the permalink for.
 * @param type - The type of the permalink (default is 'page').
 * 	- 'home': Generates a permalink for the home page.
 * 	- 'asset': Generates a permalink for an asset.
 * 	- 'page': regular page permalink (default).
 * @returns The generated permalink.
 */
export const getPermalink = (slug = '', type = 'page'): string => {
  let permalink: string;

  if (
    slug.startsWith('https://') ||
    slug.startsWith('http://') ||
    slug.startsWith('://') ||
    slug.startsWith('#') ||
    slug.startsWith('javascript:')
  ) {
    return slug;
  }

  switch (type) {
    case 'home':
      permalink = getHomePermalink();
      break;

    case 'asset':
      permalink = getAsset(slug);
      break;

    case 'page':
    default:
      permalink = createPath(slug);
      break;
  }

  return createPath(BASE_PATHNAME, permalink);
};

export const getHomePermalink = (): string => getPermalink('/');

export const getAsset = (path: string): string =>
  '/' +
  [BASE_PATHNAME, path]
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
