const convertFileToBase64String = async (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (!file) {
      return (e: Error) => reject(e);
    }
    reader.readAsDataURL(file);
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export { convertFileToBase64String };
