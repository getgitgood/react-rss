import platformsSlugData from './platformsSlugData';

export const removeTags = (text: string) => {
  if (!text) return false;

  const stringifiedText = text.toString();

  return stringifiedText.replace(/(<([^>]+)>)/gi, '');
};

export const sliceTrailingSlash = (param: string) => {
  if (!param) return false;
  if (param.endsWith('/')) {
    return param.slice(0, -1);
  }
  return param;
};

export function changeClassName(slug: string, classes: Record<string, string>) {
  const platformsSlug = platformsSlugData;
  const currentClassName = platformsSlug[slug];

  return `${classes.platform_logo} ${currentClassName}`;
}
