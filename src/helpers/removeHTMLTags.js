const removeHTMLTags = (text) => {
  const regex = /(<([^>]+)>)/ig;
  const result = text.replace(regex, '');

  return result;
};

export default removeHTMLTags;
