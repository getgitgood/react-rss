export const removeTags = (text: string) => {
  if (!text) {
    return false;
  }
  const stringifiedText = text.toString();

  return stringifiedText.replace(/(<([^>]+)>)/gi, '');
};

export const sliceTrailingSlash = (param: string) => {
  if (!param) return param;

  return param.endsWith('/') ? param.slice(0, -1) : param;
};
