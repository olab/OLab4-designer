const getFilterCallback = (level, queryStr) => ({ name, scopeLevel }) => (
  (level === 'All' || scopeLevel === level)
    && name.toLowerCase().includes(queryStr)
);

export default getFilterCallback;
