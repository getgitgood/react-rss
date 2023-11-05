import { RevalidateProps } from '../types';

const pathNormalizer = ({ currentUrl, nextUrl }: RevalidateProps) => {
  const currentPath = currentUrl.pathname.split('/').slice(0, -1).join('/');
  const nextPath = nextUrl.pathname.split('/').slice(0, -1).join('/');
  // console.log(currentUrl, nextUrl);
  return {
    currentUrl: currentPath,
    nextUrl: nextPath
  };
};

export const isPathChanged = (obj: RevalidateProps) => {
  const { currentUrl, nextUrl } = pathNormalizer(obj);
  console.log(currentUrl.length === nextUrl.length);
  return currentUrl !== nextUrl;
};

export const removeTags = (str: string) => {
  if (!str) return false;
  else str = str.toString();
  return str.replace(/(<([^>]+)>)/gi, '');
};
