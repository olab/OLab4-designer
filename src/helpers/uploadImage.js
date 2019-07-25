const uploadImage = image => new Promise(
  (resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const { result: link } = e.target;
      resolve({ data: { link } });
    };

    reader.onerror = (e) => {
      reader.abort();
      reject(e);
    };

    reader.readAsDataURL(image);
  },
);

export default uploadImage;
