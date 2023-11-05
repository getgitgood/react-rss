export const removeTags = (text: string) => {
  if (!text) {
    return false;
  }
  const stringifiedText = text.toString();
  return stringifiedText.replace(/(<([^>]+)>)/gi, '');
};
